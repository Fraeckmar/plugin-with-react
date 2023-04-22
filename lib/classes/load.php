<?php

class WPCBLoad
{

	function __construct()
	{
		add_action('activated_plugin', array($this, 'add_roles'));
		add_action('in_plugin_update_message-booking-calendar-and-notification/booking-calendar.php', array($this, 'wpcb_update_message'), 10, 2 );
	}

	function add_roles() {
		// Client
        $client_role = get_role('wpcb_client');
        if (!$client_role) {
            add_role('wpcb_client', 'Booking Calendar Client', array(
                'read' => true,
            ));
        }
	}

    public static function wpcb_booking_add_custom_page() {
		global $wpdb;
		$sql = "SELECT `ID` FROM `{$wpdb->prefix}posts` WHERE `post_type` = %s LIMIT 1";
		$calender_id = $wpdb->get_var( $wpdb->prepare( $sql, 'wpcb_calendar') );
		if (!$calender_id) {
			$calendar_agrs = array(
				'post_title'    => esc_html('Sample Calendar'),
				'post_name' => 'sample-calendar',
				'post_type'     => 'wpcb_calendar',
				'post_status'   => 'publish',
				'post_author' => get_current_user_id(),
				'post_date' => date('Y-m-d H:i:s'),
				'comment_status' => 'closed',
				'ping_status' => 'closed',
			);
			$calender_id = wp_insert_post( $calendar_agrs );
			if ($calender_id) {
				update_post_meta($calender_id, 'shortcode_id', 1);
			}
		}
	}

	static function wpcb_booking_load_textdomain() {
		load_plugin_textdomain( 'wpcb_booking', false, '/languages' );
	}

	function wpcb_update_message( $data, $response ) {
		printf(
			'<div class="update-message"><p><strong>%s</strong></p></div>',
			__( 'This version has a lot of changes, you can backup your plugin before updating.', 'wpcb_booking' )
		);
	}
}

new WPCBLoad;