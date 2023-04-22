<?php
class WPCBApi
{
	function __construct()
	{
		add_action('rest_api_init', array($this, 'wpcb_api_endpoints'));
	}

	function wpcb_api_endpoints() {
		// Debug
		register_rest_route('wpcb', 'debug', array(
			'methods' => WP_REST_Server::READABLE,
			'callback' => array($this, 'wpcb_debug')
		));
		// Table columns
		register_rest_route('wpcb', 'booking_list_columns', array(
			'methods' => WP_REST_Server::READABLE,
			'callback' => array($this, 'wpcb_table_columns')
		));
		// Bookings
		register_rest_route('wpcb', 'bookings', array(
			'methods' => WP_REST_Server::READABLE,
			'callback' => array($this, 'wpcb_all_bookings')
		));
		// Calendars
		register_rest_route('wpcb', 'calendars', array(
			'methods' => WP_REST_Server::READABLE,
			'callback' => array($this, 'wpcb_all_calendars')
		));
		// Get calendar data dates
		register_rest_route('wpcb', 'calendar_data/(?P<calendar_id>\d+)(?:/(?P<book_id>\d+))?', array(
			'methods' => 'GET',
			'callback' => array($this, 'wpcb_get_calendar_data'),
			'args' => [
				'calendar_id',
				'book_id'
			]
		));
		// Save calendar data dates
		register_rest_route('wpcb', 'calendar_data', array(
			'methods' => WP_REST_Server::EDITABLE,
			'callback' => array($this, 'wpcb_update_calendar'),
		));
		// Custom Fields
		register_rest_route('wpcb', 'booking_fields(?:/(?P<book_id>\d+))?', array(
			'methods' => WP_REST_Server::READABLE,
			'callback' => array($this, 'wpcb_get_booking_fields'),
			'args' => [
				'book_id'
			],
		));
		// Customer Field
		register_rest_route('wpcb', 'customer_field', array(
			'methods' => WP_REST_Server::READABLE,
			'callback' => array($this, 'wpcb_customer_field')
		));
		// Add / Update Booking Post
		register_rest_route('wpcb', 'update_booking_post', array(
			'methods' => WP_REST_Server::EDITABLE,
			'callback' => array($this, 'wpcb_update_booking_post')
		));
		// Delete Post
		register_rest_route('wpcb', 'delete_posts', array(
			'methods' => WP_REST_Server::EDITABLE,
			'callback' => array($this, 'wpcb_delete_posts')
		));


		/*******************************
		 * SETTINGS
		********************************/
		// Get settting fields and values
		register_rest_route('wpcb', 'setting_fields', array(
			'methods' => WP_REST_Server::READABLE,
			'callback' => array($this, 'wpcb_get_setting_fields')
		));

		// Get settings
		register_rest_route('wpcb', 'get_settings', array(
			'methods' => WP_REST_Server::EDITABLE,
			'callback' => array($this, 'wpcb_get_settings')
		));

		// Save setting fields
		register_rest_route('wpcb', 'save_setting', array(
			'methods' => WP_REST_Server::EDITABLE,
			'callback' => array($this, 'wpcb_save_setting')
		));
		// Get Status list
		register_rest_route('wpcb', 'status_list', array(
			'methods' => WP_REST_Server::READABLE,
			'callback' => array($this, 'wpcb_get_status_list')
		));

		/*******************************
		 * CUSTOMERS
		********************************/
		register_rest_route('wpcb', 'customers', array(
			'methods' => WP_REST_Server::READABLE,
			'callback' => array($this, 'wpcb_get_customers')
		));

		/*******************************
		 * STATISTICS
		********************************/
		register_rest_route('wpcb', 'statistics', array(
			'methods' => WP_REST_Server::READABLE,
			'callback' => array($this, 'wpcb_statistics')
		));

		/*******************************
		 * REPORT
		********************************/
		register_rest_route('wpcb', 'report_data', array(
			'methods' => WP_REST_Server::EDITABLE,
			'callback' => array($this, 'wpcb_report_data')
		));
	}

	function wpcb_debug() {
		global $WPCBSetting;
		$mail_setting = $WPCBSetting->get_setting_html('email_client');
		return $mail_setting;
		$is_enabled = array_key_exists('client_enable', $mail_setting) ? $mail_setting['client_enable'] : true;
        if (!$is_enabled) {
            return false;
        }
	}

	function wpcb_table_columns() {
		return wpcb_table_list_columns();
	}

	function wpcb_all_bookings() {
		$bookings = wpcb_get_all_bookings();		
		return array(
			'bookings' => $bookings,
			'booking_ids' => array_keys($bookings)
		);
	}

	function wpcb_customer_field() {
		return wpcb_customer_field();
	}

	function wpcb_get_booking_fields(WP_REST_Request $data) {
		global $WPCBField, $WPCBSetting;
		$params = $data->get_url_params();
		$book_id = !empty($params) && array_key_exists('book_id', $params) ? $params['book_id'] : 0;
		$calendar_id = $book_id ? get_post_meta($book_id, 'calendar_id', true) : 0;
		$booked_dates = $calendar_id && $book_id ? wpcb_get_calendar_dates($calendar_id, $book_id) : array();
		$rate_type = $book_id ? get_post_meta($book_id, 'rate_type', false) : 'default';

		return array(
			'fields' => $WPCBField->fields($book_id),
			'status_fields' => $WPCBField->wpcb_booking_status_fields($book_id),
			'wpcb_booking_status' =>  $book_id ? wpcb_get_booking_status($book_id) : wpcb_booking_default_status(),
			'post_title' => $book_id ? get_the_title($book_id) : wpcb_gen_booking_number(),
			'status_list' => $WPCBSetting->wpcb_status_list(),
			'calendar_id' => $calendar_id,
			'booked_dates' => $booked_dates,
			'rate_type' => $rate_type ?: 'default'
		);
	}

	// Calendar
	function wpcb_all_calendars() {
		global $wpdb;
		$sql = "SELECT p.post_title, p.post_date, p.post_author, pm.* FROM `{$wpdb->prefix}posts` p 
				INNER JOIN `{$wpdb->prefix}postmeta` pm ON p.ID = pm.post_id
				WHERE p.post_status = 'publish' AND p.post_type = %s";
		$prepared_sql = $wpdb->prepare($sql, 'wpcb_calendar');
		$prepared_sql = apply_filters('wpcb_all_calendar_sql', $prepared_sql);
		$results = $wpdb->get_results($prepared_sql);
		$results = apply_filters('wpcb_all_calendar_results', $results);
		$calendars = [];
		if (!empty($results)) {
			foreach ($results as $data) {	
				$calendars[$data->post_id]['post_title'] = $data->post_title;
				$calendars[$data->post_id]['post_date'] = date(wpcb_date_format(), strtotime($data->post_date));
				$calendars[$data->post_id]['post_author'] = wpcb_get_user_data($data->post_author, 'display_name');
				$calendars[$data->post_id][$data->meta_key] = maybe_unserialize($data->meta_value);		
			}
		}
		return $calendars;
	}

	function wpcb_delete_posts(WP_REST_Request $req) {
		$params = (array)json_decode($req->get_body());
		$post_ids = array_key_exists('ids', $params) ? $params['ids'] : array();
		return wpcb_delete_posts($post_ids);
	}

	function wpcb_get_settings(WP_REST_Request $req) {
		global $WPCBSetting;
		$params = (array)json_decode($req->get_body());
		$setting = array_key_exists('setting', $params) ? wpcb_sanitize_data($params['setting']) : '';
		$field = array_key_exists('field', $params) ? wpcb_sanitize_data($params['field']) : '';
		$default = array_key_exists('default', $params) ? wpcb_sanitize_data($params['default']) : '';
		$all_fields = array_key_exists('all_fields', $params) ? wpcb_sanitize_data($params['all_fields']) : false;
		return $WPCBSetting->get_setting($setting, $field, $default, $all_fields);
	}

	function wpcb_get_calendar_data(WP_REST_Request $data) {
		
		$params = $data->get_url_params();
		$calendar_id = $params['calendar_id'];
		$book_id = array_key_exists('book_id', $params) ? $params['book_id'] : 0;

		if (!$calendar_id) {
			return new WP_Error( 'invalid_parameter', 'Invalid Calendar ID', array( 'status' => 404 ) );
		}
		$other_booked_dates = wpcb_get_calendar_dates($calendar_id, null, true);
		$current_booked_dates = $book_id ? wpcb_get_calendar_dates($calendar_id, $book_id) : array();
		
		$data = array(
			'calendar_title' => $calendar_id ? get_the_title($calendar_id) : '',
			'other_booked_dates' => $other_booked_dates,
			'current_booked_dates' => $current_booked_dates
		);

		return $data;
	}

	function wpcb_update_calendar(WP_REST_Request $req) {
		$params = (array)json_decode($req->get_body());
		$calendar_id = array_key_exists('calendar_id', $params) ? wpcb_sanitize_data($params['calendar_id']) : 0;
		$action = array_key_exists('action', $params) ? strtolower(wpcb_sanitize_data($params['action'])) : 'new';
		$dates = $params['dates'];
		$user_id = $params['user_id'] ?: 0;

		if ($action) {
			$post_args = array(
				'post_title' => sanitize_text_field($params['calendar_title'])
			);

			if ($action == 'edit') {
				if ($calendar_id) {
					$post_args['ID'] = $calendar_id;
					$calendar_id = wp_update_post($post_args);
				}                    
			} else if ($action == 'new') {
				$post_args['post_type'] = 'wpcb_calendar';
				$post_args['post_status'] = 'publish';
				$post_args['post_author'] = $user_id;
				$calendar_id = wp_insert_post($post_args);
				if ($calendar_id) {
					update_post_meta($calendar_id, 'shortcode_id', get_next_shortcode_id());
				}
			}

			$calendar_dates = get_post_meta($calendar_id, 'dates', true);
			$calendar_dates = !empty($calendar_dates) ? $calendar_dates : [];

			foreach ($dates as $_date => $_data) {
				$_data = (array) $_data;
				$_date = date('Y-m-d', strtotime($_date));
				$_yr = date('Y', strtotime($_date));
				$_mo = date('m', strtotime($_date));
				$calendar_dates["{$_yr}-{$_mo}"][$_date]['status'] = $_data['status'] ?? '';
				$calendar_dates["{$_yr}-{$_mo}"][$_date]['description'] = $_data['description'] ?? '';
			}

			update_post_meta($calendar_id, 'dates', $calendar_dates);
			do_action('wpcb_after_save_calendar', $params);
			return $calendar_id;
		}
	}

	function wpcb_update_booking_post(WP_REST_Request $req) {
		global $WPCBField, $WPCBSetting;
		try {
			$params = (array)json_decode($req->get_body());
			$action = array_key_exists('action', $params) ? strtolower($params['action']) : 'new';
			$calendar_id = array_key_exists('calendar_id', $params) ? $params['calendar_id'] : 0;
			$booking_id = array_key_exists('booking_id', $params) ? $params['booking_id'] : 0;
			$user_id = array_key_exists('user_id', $params) ? $params['user_id'] : 0;
			$fields = array_key_exists('fields', $params) ? $params['fields'] : new stdClass;
			$selected_dates = array_key_exists('selected_dates', $params) ? (array)$params['selected_dates'] : array();
			$booking_fields = $WPCBField->fields();
			$from_customer = array_key_exists('from_customer', $params) ? $params['from_customer'] : false;

			if ($booking_id && !$user_id) {
				throw new Exception('User ID not defined.');
			}
			if (!$calendar_id) {
				throw new Exception('Calendar not defined.');
			}
			if (empty($action)) {
				throw new Exception('Form action not defined.');
			}
			if (empty($fields)) {
				throw new Exception('Form custom fields not defined.');
			}
			if ($action == 'edit' && !$booking_id) {
				throw new Exception('Book ID not defined.');
			}
			if (empty($selected_dates)) {
				throw new Exception('No selected date.');
			}
			$old_status = '';
			$post_args = array(
				'post_title' => $from_customer ? wpcb_gen_booking_number() : $params['post_title']
			);

			if ($action == 'edit') {
				$post_args['ID'] = $booking_id;
				wp_update_post($post_args);
				$old_status = get_post_meta($booking_id, 'wpcb_booking_status',  true);                  
			} else if ($action == 'new') {
				$post_args['post_type'] = 'wpcb_booking';
				$post_args['post_status'] = 'publish';
				$post_args['post_author'] = $user_id;
				$booking_id = wp_insert_post($post_args);

				update_post_meta($booking_id, 'calendar_id', $calendar_id);
			}

			$calendar_dates = wpcb_sanitize_data(wpcb_get_new_calendar_dates($calendar_id, $booking_id, $selected_dates));			
			update_post_meta($calendar_id, 'dates', $calendar_dates);
			update_post_meta($booking_id, 'booked_dates', $selected_dates);

			if (!empty($booking_fields)) {
				foreach ($booking_fields as $section => $sec_fields) {
					foreach ($sec_fields as $field) {
						$meta_key = $field['key'];
						$meta_value = wpcb_sanitize_data($fields->$meta_key);
						update_post_meta($booking_id, sanitize_key($meta_key), $meta_value);
					}
				}
			}
			
			if ($action == 'new' && !array_key_exists('wpcb_booking_status', (array)$fields)) {
				update_post_meta($booking_id, 'wpcb_booking_status', wpcb_booking_default_status());
			} else if (array_key_exists('wpcb_booking_status', (array)$fields)) {
				update_post_meta($booking_id, 'wpcb_booking_status', wpcb_sanitize_data($fields->wpcb_booking_status));
			}			

			$notif_action = $action == 'edit' ? $action : 'added';
			$booking_title = get_the_title($booking_id);

			do_action('wpcb_after_save_booking_post', $booking_id, $params, $old_status);
			do_action('wpcb_after_booking_send_email', $booking_id, $params, $old_status);

			if ($from_customer) {
				$thankyou_page =  $WPCBSetting->get_setting('general', 'thankyou_page', 0);
				return array(
					'thankyou_page' => $thankyou_page ? get_permalink($thankyou_page) : '',
					'thankyou_msg' => wpcb_thankyou_msg()
				);
			}

			return array(
				'status' => 'success',
				'message' => "{$booking_title} {$notif_action} successfully!"
			);
		} catch (Exception $e) {
			return new WP_Error( 'invalid_parameter', $e->getMessage(), array( 'status' => 404 ) );
		}
	}
	
	function wpcb_get_setting_fields() {
		global $WPCBField, $WPCBSetting;
		return array(
			'fields' => $WPCBField->setting_fields(),
			'labels' => $WPCBField->setting_section_labels(),
			'shortcodes' => $WPCBSetting->wpcb_get_shortcode_list(true)
		);
	}

	function wpcb_save_setting(WP_REST_Request $req) {
		global $WPCBSetting;
		$request = (array) json_decode($req->get_body());
		try {
			$setting = $request['setting'];
			$fields_data = $request['fields_data'];
			if (empty($setting)) {
				throw new Exception('Setting key not defined.');
			}
			if (empty($fields_data)) {
				throw new Exception('Form data is empty.');
			}
			$WPCBSetting->update_setting($setting, wpcb_obj_to_array($fields_data));
		} catch (Exception $e) {
			return new WP_Error( 'invalid_parameter', $e->getMessage(), array( 'status' => 404 ) );
		}
		return $request;
	}

	function wpcb_get_customers() {
		global $WPCBField;
		return array(
			'columns' => $WPCBField->wpcb_customer_columns(),
			'bookings' => wpcb_get_customers()
		);
	}

	function wpcb_get_status_list() {
		global $WPCBSetting;
		return $WPCBSetting->wpcb_status_list();
	}

	// Summary
	function wpcb_statistics() {
		$statistics = wpcb_get_statistics();
		$summary = wpcb_get_summary();
		return array(
			'statistics' => $statistics,
			'summary' => $summary
		);
	}

	// Generate Report
	function wpcb_report_data($req) {
		$request = (array)json_decode($req->get_body());
		return wpcb_get_report_data($request);
	}
}

new WPCBApi;