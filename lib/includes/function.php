<?php
function wpcb_allowed_html_tags() {
    return array(
        'i' => array('class' => array()),
        'br' => array('id' => array(), 'class' => array()), 
        'p' => array('id' => array(), 'class' => array(), 'style' => array(), 'data' => array(), 'data-item' => array()), 
        'strong' => array('id' => array(), 'class' => array(), 'style' => array(), 'data' => array(), 'data-item' => array()),
        'a' => array('id' => array(), 'class' => array(), 'href' => array(), 'style' => array(), 'target' => array(), 'data' => array(), 'data-item' => array()),
        'ul' => array('id' => array(), 'class' => array(), 'style' => array(), 'data' => array(), 'data-item' => array()),
        'li' => array('id' => array(), 'class' => array(), 'style' => array(), 'data' => array(), 'data-item' => array()),
        'ol' => array('id' => array(), 'class' => array(), 'style' => array(), 'data' => array(), 'data-item' => array()),
        'span' => array('id' => array(), 'class' => array(), 'style' => array(), 'data' => array(), 'data-item' => array()),
        'div' => array('id' => array(), 'class' => array(), 'style' => array(), 'data' => array(), 'data-item' => array()),
        'h1' => array('id' => array(), 'class' => array(), 'style' => array(), 'data' => array(), 'data-item' => array()),
        'h2' => array('id' => array(), 'class' => array(), 'style' => array(), 'data' => array(), 'data-item' => array()),
        'h3' => array('id' => array(), 'class' => array(), 'style' => array(), 'data' => array(), 'data-item' => array()),
        'h4' => array('id' => array(), 'class' => array(), 'style' => array(), 'data' => array(), 'data-item' => array()),
        'h5' => array('id' => array(), 'class' => array(), 'style' => array(), 'data' => array(), 'data-item' => array()),
        'h6' => array('id' => array(), 'class' => array(), 'style' => array(), 'data' => array(), 'data-item' => array()),
        'table' => array('id' => array(), 'class' => array(), 'style' => array(), 'width'=> array(), 'border' => array(), 'data' => array(), 'data-item' => array()),
        'thead' => array('id' => array(), 'class' => array(), 'style' => array(), 'data' => array(), 'data-item' => array()),
        'tbody' => array('id' => array(), 'class' => array(), 'style' => array(), 'data' => array(), 'data-item' => array()),
        'tfooter' => array('id' => array(), 'class' => array(), 'style' => array(), 'data' => array(), 'data-item' => array()),
        'tr' => array('id' => array(), 'class' => array(), 'style' => array(), 'align' => array(), 'data' => array(), 'data-item' => array()),
        'th' => array('id' => array(), 'class' => array(), 'style' => array(), 'align' => array(), 'width'=> array(), 'border' => array(), 'data' => array(), 'data-item' => array()),
        'td' => array('id' => array(), 'class' => array(), 'style' => array(), 'align' => array(), 'width'=> array(), 'border' => array(), 'data' => array(), 'data-item' => array()),
        'img' => array('src' => array(), 'height' => array(), 'style' => array(), 'width' => array(), 'data' => array(), 'data-item' => array()),
        'input' => array('id' => array(), 'class' => array(), 'style' => array(), 'type' => array(), 'data' => array(), 'data-item' => array()),
    );
}

function wpcb_date_format() {
    return wpcb_sanitize_data(apply_filters('wpcb_date_format', "Y-m-d"));
}

function wpcb_get_booking_status($book_id=0) {
    return $book_id ? get_post_meta($book_id, 'wpcb_booking_status', true) : '';
}

function wpcb_booking_default_status()
{
    global $WPCBSetting;
    $default = $WPCBSetting->get_setting('general', 'default_status', 'New');
    return apply_filters('wpcb_booking_default_status', $default);
}

function wpcb_gen_booking_number() {
    $prefix = apply_filters('wpcb_prefix_booking_number', 'BOOK');
    $suffix = apply_filters('wpcb_suffix_booking_number', '');
    $gen_booking_length = apply_filters('gen_booking_length', 4);
    $rand_numbers = gen_rand_numbers($gen_booking_length);
    $booking_number = $prefix.$rand_numbers.$suffix;
    if (wpcb_is_booking_number_exist($booking_number)) {
        wpcb_gen_booking_number();
    }
    return apply_filters('wpcb_generate_booking_number', $booking_number);
}

function gen_rand_numbers($length=4) {   
    $min = str_pad("", $length, "00");
    $max = pow(10, $length)-1;
    return str_pad(mt_rand($min, $max), $length, "0", STR_PAD_LEFT);
}

function wpcb_is_booking_number_exist($booking_number) {
    global $wpdb;
    $sql = "SELECT * FROM `{$wpdb->prefix}posts` WHERE post_title = %s AND post_type = 'wpcb_booking' LIMIT 1";
    $result = $wpdb->get_var($wpdb->prepare($sql, $booking_number));
    return !empty($result);
}

function wpcb_sanitize_data($data, $type='') {
    if (is_array($data)) {
        array_walk($data, function(&$value) use ($type){
            if ($type == 'email') {
                $value = !is_array($value) ? sanitize_email($value) : $value;
            } else {
                $value = !is_array($value) ? sanitize_text_field($value) : $value;
            }            
        });
    } else {
        if ($type == 'email') {
            $data = sanitize_email($data);
        } else {
            $data = sanitize_text_field($data);
        }   
    }
    return $data;
}

function wpcb_number_format($value, $currency=false, $decimals_count=2) {
    if (!is_numeric($value)) {
        return false;
    }
    $formatted_number = apply_filters('wpcb_number_format', number_format($value, $decimals_count));
    if ($currency) {
        $currency_symbol = wpcb_get_currency();
        $formatted_number = $currency_symbol.$formatted_number;
    }
    return sanitize_text_field($formatted_number);
}
function wpcb_has_decimal_value($value) {
    return fmod($value, 1) != 0;
}
function wpcb_get_currency() {
    return function_exists('get_woocommerce_currency_symbol') ? get_woocommerce_currency_symbol() : '';
}
function wpcb_allow_multiple_booking() {
    global $WPCBSetting;
    return strtolower($WPCBSetting->get_setting('advanced_setting', 'allow_multiple_booking')) == 'yes';
}

function wpcb_plugin_slug() {
    return 'manage-booking';
}

function wpcb_legend_bg_colors()
{
    global $WPCBSetting;
    $colors = array(
        'selected' => $WPCBSetting->get_setting('advanced_setting', 'bg_selected', '#33d298'),
        'available' => $WPCBSetting->get_setting('advanced_setting', 'bg_available', '#d8fcde'),
        'unavailable' => $WPCBSetting->get_setting('advanced_setting', 'bg_unavailable', '#ffccc9'),
        'booked' => $WPCBSetting->get_setting('advanced_setting', 'bg_booked', '#379aff')
    );
    return apply_filters('wpcb_legend_bg_colors', $colors);
}

function wpcb_legend_fg_colors()
{
    global $WPCBSetting;
    $colors = array(
        'selected' => $WPCBSetting->get_setting('advanced_setting', 'fg_selected', '#fff'),
        'available' => $WPCBSetting->get_setting('advanced_setting', 'fg_available', '#000'),
        'unavailable' => $WPCBSetting->get_setting('advanced_setting', 'fg_unavailable', '#000'),
        'booked' => $WPCBSetting->get_setting('advanced_setting', 'fg_booked', '#fff')
    );
    return apply_filters('wpcb_legend_fg_colors', $colors);
}

function wpcb_calendar_day_name_color()
{
    global $WPCBSetting;
    return $WPCBSetting->get_setting('advanced_setting', 'calendar_day_name_color', '#33d298');
}

function wpcb_show_legend_form()
{
    global $WPCBSetting;
    return $WPCBSetting->get_setting('advanced_setting', 'show_legend', 'Yes') == 'Yes';
}

function wpcb_table_list_columns() {
    $columns = array(
        'post_title' => __('Booking #'),
        'wpcb_customer_name' => __('Customer Name', 'wpcb_booking'),
        'wpcb_customer_email' => __('Email', 'wpcb_booking'),
        'wpcb_customer_phone_number' => __('Phone Number', 'wpcb_booking'),
        'booked_dates' => __('Booked Date(s)', 'wpcb_booking'),
        'wpcb_booking_status' => __('Status', 'wpcb_booking'),
        'post_date' => __('Date Created', 'wpcb_booking')
    );

    return apply_filters('wpcb_table_list_columns', $columns);
}

function wpcb_default_enabled_days() {
    return array('Mon', 'Tue', 'Wed', 'Thu', 'Fri');
}

function wpcb_notify_before() {
    global $WPCBSetting;
    return $WPCBSetting->get_setting('general', 'notify_before', 30);
}

function wpcb_get_user_data($user_id, $retrieve_field='') {
    $userInfo = get_userdata($user_id)->data;
    $userInfo = (array)$userInfo;
    if (!empty($retrieve_field)) {
        $retrieve_value = '';
        if (array_key_exists($retrieve_field, $userInfo)) {
            $retrieve_value = $userInfo[$retrieve_field];
        }
        $userInfo = $retrieve_value;
    }
    return $userInfo;
}

function wpcb_get_all_bookings() {
    global $wpdb;
    $sql = "SELECT p.post_title, p.post_date, pm.post_id, pm.meta_value, pm.meta_key FROM `{$wpdb->prefix}posts` p 
            INNER JOIN `{$wpdb->prefix}postmeta` pm ON p.ID = pm.post_id
            WHERE p.post_status = 'publish' AND p.post_type = %s
            ORDER BY p.ID DESC";
    $prepared_sql = $wpdb->prepare($sql, 'wpcb_booking');
    $prepared_sql = apply_filters('wpcb_all_bookings_sql', $prepared_sql);
    $results = $wpdb->get_results($prepared_sql);
    $table_columns = wpcb_table_list_columns();
    $bookings = array();
    
    if (!empty($results)) {
        foreach ($results as $data) {
            if (array_key_exists($data->meta_key, $table_columns)) {
                $value = maybe_unserialize($data->meta_value);
                $bookings[$data->post_id][$data->meta_key] = $value;
            }	
            if (array_key_exists('post_date', $table_columns)) {
                $bookings[$data->post_id]['post_date'] = date(wpcb_date_format(), strtotime($data->post_date));
            }
            if (array_key_exists('post_title', $table_columns)) {
                $bookings[$data->post_id]['post_title'] = $data->post_title;
            }			
        }
    }
    return apply_filters('wpcb_all_bookings_results', $bookings);
}

function wpcb_get_customers() {
    $customers = array();
    $customer_key = wpcb_customer_field('key');
    $email_key = wpcb_customer_email_field('key');
    $bookings = array_reverse(wpcb_get_all_bookings(), true);
    if (empty($bookings)) {
        return $customers;
    }

    $admin_users = get_users(array('role__in' => array('administrator')));
    $client_users = get_users(array('role__in' => array('wpcb_client')));
    $admin_emails = array();
    $client_emails = array();
    if (!empty($admin_users)) {
        foreach ($admin_users as $user) {
            $admin_emails[] = $user->data->user_email;
        }
    }
    if (!empty($client_users)) {
        foreach ($client_users as $user) {
            $client_emails[] = $user->data->user_email;
        }
    }

    foreach ($bookings as $book_id => $meta_values) {
        $unique_key = $meta_values[$customer_key].$meta_values[$email_key];
        $unique_key = preg_replace('/\s+/', '', $unique_key);
        if (!in_array($unique_key, $customers)) {  
            $meta_values['is_registered'] = array(
                'status' => in_array($meta_values[$email_key], $client_emails),
                'icon' => in_array($meta_values[$email_key], $client_emails) ? '<i className="fa fa-circle-check"></i>' : '<i className="fa fa-circle-xmark"></i>'
            );
            $customers[$unique_key] = $meta_values;          
        }        
    }

    return apply_filters('wpcb_get_customers', $customers);
}

function wpcb_get_calendar_dates($calendar_id, $booking_id=null, $include_booking_html=false) {
    $dates = array();
    if ($booking_id) {
        $booked_dates = get_post_meta($booking_id, 'booked_dates', true);
        $saved_cal_id = get_post_meta($booking_id, 'calendar_id', true);
        if ($saved_cal_id != $calendar_id) {
            $booked_dates = array();
        }
        if (!empty($booked_dates)) {
            foreach ($booked_dates as $booked_date) {
                $year_month = date('Y-m', strtotime($booked_date));
                $dates[$year_month][$booked_date]['status'] = 'booked';
            }
        }
    } else {
        $dates = !empty($calendar_id) ? get_post_meta($calendar_id, 'dates', true) : array();
        if (!empty($dates)) {
            foreach ($dates as $_month => $month_dates) {
                foreach ($month_dates as $_date => $data) {
                    $booking_ids = array_key_exists('booking_ids', $data) ? array_unique((array)$data['booking_ids']) : array();
                    $booking_ids = $booking_ids ? wpcb_get_exist_booking_ids($booking_ids) : array();
                    $booking_numbers = [];
                    if ($data['status'] == 'booked' && !empty($booking_ids)) {
                        foreach ($booking_ids as $booking_id) {
                            if (get_post_status($booking_id) != 'publish') {
                                $booking_id_idx = array_search($booking_id, $booking_ids);
                                unset($booking_ids[$booking_id_idx]);
                            }
                        }
                    }
                    if (empty($data['description']) && empty($booking_ids)) {
                        $data['status'] = 'available';
                    }
                    
                    if ($include_booking_html && $booking_ids) {
                        foreach ($booking_ids as $_book_id) {
                            $booking_numbers[] = get_the_title($_book_id);
                        }                        
                    }
                    
                    $data['booking_ids'] = $booking_ids;
                    $data['booking_numbers'] = $booking_numbers;
                    $month_dates[$_date] = $data;
                }
                $dates[$_month] = $month_dates;
            }
        }
    }
    return $dates;
}

function get_next_shortcode_id() {
    global $wpdb;
    $sql = $wpdb->prepare("SELECT DISTINCT pm.meta_value FROM `{$wpdb->prefix}posts` p 
            JOIN `{$wpdb->prefix}postmeta` pm ON p.ID = pm.post_id 
            WHERE p.post_type = %s AND pm.meta_key = 'shortcode_id' ORDER BY pm.meta_value DESC LIMIT 1",
            'wpcb_calendar');
    $result = $wpdb->get_var($sql);
    $result = $result ? ++$result : 1;
    return $result;
}

function wpcb_get_calendar_id($shortcode_id) {
    global $wpdb;
    $sql = $wpdb->prepare("SELECT p.ID 
                            FROM `{$wpdb->prefix}posts` p 
                            JOIN `{$wpdb->prefix}postmeta` pm ON p.ID = pm.post_id
                            WHERE p.post_type = 'wpcb_calendar' AND p.post_status = 'publish' AND pm.meta_key = 'shortcode_id' AND pm.meta_value = %d", 
    $shortcode_id);
    $result = $wpdb->get_var($sql);
    return wpcb_sanitize_data($result);
}

function wpcb_get_new_calendar_dates($calendar_id, $booking_id, $selected_dates) {
    $calendar_dates = get_post_meta($calendar_id, 'dates', true);
    $calendar_dates = empty($calendar_dates) ? array() : (array)$calendar_dates;
    foreach ($selected_dates as $selected_date) {
        $_date = date('Y-m-d', strtotime($selected_date));
        $_yr_mo = date('Y-m', strtotime($selected_date));
        $calendar_dates[$_yr_mo][$_date]['status'] = 'booked';
        $calendar_dates[$_yr_mo][$_date]['booking_ids'][] = $booking_id;
    }

    if (!empty($calendar_dates)) {
        foreach ($calendar_dates as $_yr_mo => $dates) {
            foreach ($dates as $_date => $_data) {
                // if ($_data['status'] == 'booked' && !in_array($_date, $selected_dates)) {
                if (!in_array($_date, $selected_dates)) {
                    $booking_ids = $_data['booking_ids'] ? array_filter($_data['booking_ids'], function($val) use ($booking_id){
                        return $val != $booking_id && $val;
                    }) : array();

                    if ($_data['status'] == 'booked' && !count($booking_ids)) {
                        $calendar_dates[$_yr_mo][$_date] = array(
                            'status' => 'available',
                            'booking_ids' => array()
                        );
                    } else {
                        $exist_booking_ids = wpcb_get_exist_booking_ids($booking_ids);
                        foreach ($booking_ids as $_book_id) {
                            if (!in_array($_book_id, $exist_booking_ids)) {
                                $remove_idx = array_search($_book_id, $booking_ids);
                                unset($booking_ids[$remove_idx]);
                            }
                        }
                        $calendar_dates[$_yr_mo][$_date]['booking_ids'] = array_unique($booking_ids);
                    }                    
                }
            }
        }
    }
    return $calendar_dates;
}

function wpcb_get_exist_booking_ids($booking_ids) {
    global $wpdb;
    if (empty($booking_ids)) {
        return $booking_ids;
    }
    $booking_ids = implode(',', $booking_ids);
    $sql = "SELECT ID from `{$wpdb->prefix}posts`
            WHERE post_status = 'publish' AND ID IN ($booking_ids)";
    return array_column($wpdb->get_results($sql, ARRAY_A), 'ID');    
}

function wpcb_get_pages() {
    global $wpdb;
    $sql = "SELECT ID, post_title FROM `{$wpdb->prefix}posts` WHERE post_status = 'publish' AND post_type = %s ORDER BY post_title";
    $results = $wpdb->get_results($wpdb->prepare($sql, 'page'));
    $pages = array();
    if (!empty($results)) {
        foreach ($results as $page) {
            $pages[$page->ID] = $page->post_title;
        }
    }
    return !empty($pages) ? $pages : array();
}

function wpcb_get_default_admin_mail_body()
{
    $body = "<p>Dear Admin,</p>\n";
    $body .= "<p>New booking was created <strong>#{wpcb_booking_number}</strong></p>";
    return $body;
}
function wpcb_get_default_admin_mail_footer()
{
    $footer = "<p>Your Company Address here..</p>";
    return $footer;
}
function wpcb_get_default_client_mail_body()
{
    $body = "<p> Hi {".esc_html(wpcb_customer_field('key'))."},</p>\n";
    $body .= "<p>Your booking number <strong>#{wpcb_booking_number}</strong> was place to {wpcb_booking_status} status.</p>\n";
    $body .= "<p>Thank you for getting in touch with us.</p>";
    return $body;
}
function wpcb_get_default_client_mail_footer()
{
    $footer = "<p>Your Company Address here..</p>";
    return $footer;
}

function wpcb_customer_email_field($retrieve_field='') {
    $field = [
        'key' => 'wpcb_customer_email',
        'label' => esc_html__('Email', 'wpcb_booking')
    ];
    if (!empty($retrieve_field)) {
        if (array_key_exists($retrieve_field, $field)) {
            $field = $field[$retrieve_field];
        }
    }
    return apply_filters('wpcb_customer_email_field', $field);
}

function wpcb_customer_field($retrieve_field='')
{
    $field = [
        'key' => 'wpcb_customer_name',
        'label' => esc_html__('Customer', 'wpcb_booking')
    ];
    if (class_exists('wpcf_admin')) {
        $customer_field_id = wpcf_get_setting_value('customer_field');
        if ($customer_field_id) {
            $customer_field = wpcf_get_custom_field_data($customer_field_id);
            if (!empty($customer_field)) {
                $field['key'] = sanitize_key($customer_field['field_key']);
                $field['label'] = sanitize_text_field($customer_field['label']);
            }
            
        }
    }
    if (!empty($retrieve_field)) {
        if (array_key_exists($retrieve_field, $field)) {
            $field = $field[$retrieve_field];
        }
    }
    return apply_filters('wpcb_customer_field', $field);
}

function wpcb_send_admin_email_in_status_list() {
    global $WPCBSetting;
    return  $WPCBSetting->get_setting('email_admin', 'enabled_statuses');
}

function wpcb_send_client_email_in_status_list() {
    global $WPCBSetting;
    return  $WPCBSetting->get_setting('email_client', 'enabled_statuses');
}

// Email Setting
function wpcb_construct_mail_body($email_body, $footer_html) {
    global $WPCBSetting;
    $footer_html = wpcb_get_email_footer_html($footer_html);
    $email_header = wpcb_get_email_header_html();

    $html = "<table width='100%' style='font-family: sans-serif; border-collapse: collapse;'>";
        $html .= "<tr>";
            $html .= "<td'>{$email_header}</td>";
        $html .= "</tr>";
        $html .= "<tr>";
            $html .= "<td style='padding: 25px 5px'>{$email_body}</td>";
        $html .= "</tr>";
        $html .= "<tr>";
            $html .= "<td>{$footer_html}</td>";
        $html .= "</tr>";
    $html .= "</table>";
    return wp_kses(apply_filters('wpcb_email_content_html', $html), wpcb_allowed_html_tags());
}

function wpcb_get_email_header_html()
{
    global $WPCBSetting;
    $legends_bg = wpcb_legend_bg_colors();
    $legends_fg = wpcb_legend_fg_colors();

    $company_logo = esc_url($WPCBSetting->get_setting('general', 'company_logo'));
    $html = "<table width='100%' style='background-color: ".$legends_bg['selected']."; color: ".$legends_fg['selected'].";'>";
        $html .= "<tr>";
            $html .= "<td align='center' style='padding: 10px;'>";
            if (!empty($company_logo)) {
                $html .= "<table style='width: 90px; margin-bottom: 8px; height: 90px; border-radius: 50%; background-color: #ffffff; overflow: hidden;'>";
                    $html .= "<tr>";
                        $html .= "<td align='center'>";
                        $html .= "<img src='{$company_logo}' width='90%' height='auto' style='background-color:#ffffff' />";
                        $html .= "</td>";
                    $html .= "</tr>";
                $html .= "</table>";
            }                
            $html .= "<div style='font-size: 28px;'><span>".get_bloginfo('name')."</span></div>";
            $html .= "</td>";
        $html .= "</tr>";        
    $html .= "</table>";

    return apply_filters('wpcb_email_header_html', $html, $company_logo);
}

function wpcb_get_email_footer_html($email_footer) {
    $legends_bg = wpcb_legend_bg_colors();
    $legends_fg = wpcb_legend_fg_colors();
    $footer = "<table width='100%' style='background-color: ".$legends_bg['selected']."; color: ".$legends_fg['selected'].";'>";
        $footer .= "<tr>";
            $footer .= "<td align='center'>{$email_footer}</td>";
        $footer .= "</tr>";
    $footer .= "</table>";
    return apply_filters('wpcb_email_header_html', $footer);
}

function wpcb_obj_to_array($obj) {
    // Not an object or array
    if (!is_object($obj) /*&& !is_array($obj)*/) {
        return $obj;
    }

    // Parse array
    foreach ($obj as $key => $value) {
        $arr[$key] = wpcb_obj_to_array($value);
    }

    // Return parsed array
    return $arr;
}

function wpcb_delete_posts($post_ids) {
    global $wpdb;
    if (!$post_ids) {
        return new WP_Error( 'invalid_parameter', 'No Calendar ID found.', array( 'status' => 404 ) );
    }
    $post_ids = implode(',',  $post_ids);
    $sql = "DELETE p, pm FROM `{$wpdb->prefix}posts` p
            INNER JOIN `{$wpdb->prefix}postmeta` pm ON p.ID = pm.post_id
            WHERE p.ID IN ({$post_ids})";
    return $wpdb->query($sql);
}

function wpcb_get_booking_details($booking_id) {
    global $wpdb;
    $sql = "SELECT * FROM `{$wpdb->prefix}postmeta` WHERE post_id = %d";
    $results = $wpdb->get_results($wpdb->prepare($sql, $booking_id));
    $details = [];
    if (!empty($results)) {
        foreach ($results as $result) {
            $details[$result->meta_key] = maybe_unserialize($result->meta_value);
        }
    }
    return $details;
}

function wpcb_get_order_details_html($booking_id, $email_tpl=false) {
    $order_id = get_post_meta($booking_id, 'order_id', true)?? 0;
    $rate_type = strtolower(get_post_meta($booking_id, 'rate_type', true));
    $booked_rates = get_post_meta($booking_id, "booked_{$rate_type}", true);
    $booked_extras = get_post_meta($booking_id, "booked_extras", true) ?? array();
    $booked_amount = get_post_meta($booking_id, 'booked_amount', true) ?? 0;
    $booked_dates = get_post_meta($booking_id, 'booked_dates', true);
    $extras_label = function_exists('wpcr_order_summary_extras_label') ? wpcr_order_summary_extras_label() : 'Extras';
    if (function_exists('wpcr_is_enable_payment') && wpcr_is_enable_payment()) {
        $booked_dates = array();
    }

    if ($order_id && class_exists('WC_Order')) {
        $order = new WC_Order($order_id);
        $order_edit_url = esc_url($order->get_edit_order_url());
        $order_number = $order->get_order_number();
        $booked_amount = $order->get_total();
    }

    $html = "<table class='table table-bordered p-0 m-0'>";
        $html .= "<tbody class='border-0'>";
            if ($order_id && class_exists('WC_Order') && !$email_tpl) {
                $html .= "<tr>";
                    $html .= "<td width='40%'><strong>".esc_html__('WooCommerce Order', 'wpcr_rates')."</strong></td>";
                    $html .= "<td width='60%'><a href='".esc_url($order_edit_url)."'>#".esc_html($order_number)."</a></td>";
                $html .= "</tr>";
            }        
            if (!empty($booked_rates)) {
                $html .= "<tr>";
                    $html .= "<td style='vertical-align: top;'><strong>" .esc_html__('Selected Date/Time', 'wpcb_booking'). "</strong></td>";
                    $html .= "<td style='vertical-align: top;'>";
                    if ($rate_type == 'hourly') {
                        foreach ($booked_rates as $_date => $_hourly) {
                            $html .= "<p class='mb-1' style='margin: 0;>".date('F d', strtotime($_date)) ."</p>";
                            $html .= "<ul class='bullets'>";
                            foreach ($_hourly as $_hour) {
                                $html .= "<li class='mb-1''>".esc_html($_hour['from'])." - ".esc_html($_hour['to']);
                                    if (!$email_tpl) {
                                        $html .= "(".esc_html(wpcb_number_format($_hour['rate'], true)).")";
                                    }
                                $html .= "</li>";
                            }
                            $html .= "</ul>";
                        }            
                    } else {
                        $html .= "<ul class='bullets m-0'>";
                        foreach ($booked_rates as $_date => $_rate) {            
                            $html .= "<li class='mb-0'>".date('F d', strtotime($_date))." - ".esc_html(wpcb_number_format($_rate, true))."</li>"; 
                        }
                        $html .= "</ul>";
                    }
                    $html .= "</td>";
                $html .= "</tr>";
            } 
            if (!empty($booked_dates)) {
                $html .= "<tr>";
                    $html .= "<td><strong>" .esc_html__('Booked Dates', 'wpcb_booking'). "</strong></td>";
                    $html .= "<td>";
                        $html .= "<ul class='bullets m-0'>";
                        foreach ($booked_dates as $_date) {            
                            $html .= "<li class='mb-0'>".date('F d', strtotime($_date))."</li>"; 
                        }
                        $html .= "</ul>";
                    $html .= "</td>";
                $html .= "</tr>";
            }  
            if (!empty($booked_extras)) {
                $html .= "<tr>";
                    $html .= "<td><strong>" .esc_html($extras_label). "</strong></td>";
                    $html .= "<td>";
                        $html .= "<ul class='bullets m-0'>";
                        foreach ($booked_extras as $label => $price) {                    
                            $html .= "<li class='mb-0'> ".esc_html($label)." - ".esc_html(wpcb_number_format($price, true))."</li>";                    
                        }
                        $html .= "</ul>";
                    $html .= "</td>";
                $html .= "</tr>";
            }     
            if (empty($booked_dates) && !$email_tpl) {
                $html .= "<tr>";
                    $html .= "<td><strong>".esc_html__('Total', 'wpcr_rates')."</strong></td>";
                    $html .= "<td><strong>".esc_html(wpcb_number_format($booked_amount, true) ?? 0)."</strong></td>";
                $html .= "</tr>";
            }            
        $html .= "</tbody>";
    $html .= "</table>";
    return $html;
}

function wpcb_thankyou_msg() {
    return apply_filters('wpcb_thankyou_msg', __('Submit successfully. Thank you for booking with us.', 'wpcb_booking'));
}


function wpcb_get_start_end_date_of_week($format='Y-m-d', $day_off_week=1) {
    $dateTime = new DateTime();
    $dateTime->setISODate(date('Y'), date('W'), $day_off_week);
    $result['start_date'] = $dateTime->format($format);
    $dateTime->modify('+6 days');
    $result['end_date'] = $dateTime->format($format);
    return $result;
}

// Statistics
function wpcb_get_statistics()
{
    global $wpdb;
    require_once WPCB_BOOKING_PLUGIN_PATH. 'lib/classes/calendar.php';
    $calendar = new Calendar();
    $months = $calendar->get_months();
    $min_count = 5; // Minimun records

    // Monthly
    $monthly_sql = "SELECT count(ID) AS month_count, MONTH(post_date) AS month_val, MONTHNAME(post_date) AS month_name FROM `{$wpdb->prefix}posts` WHERE post_status = 'publish' AND post_type = %s AND YEAR(post_date) = %d GROUP BY month_val";
    $monthly_result = $wpdb->get_results($wpdb->prepare($monthly_sql, 'wpcb_booking', date('Y')));
    $monthly = array();
    if (!empty($monthly_result)) {
        foreach ($monthly_result as $_monthly) {
            $monthly[$_monthly->month_name] = $_monthly->month_count;
        }
    }
    if ($monthly_result && count($monthly_result) < $min_count) {
        $last_month_obj = !empty($monthly_result) ? end($monthly_result) : new stdClass;
        $last_month = !empty($last_month_obj) ? $last_month_obj->month_val : date('n');
        
        // Get prev months of current year
        if ($last_month != 1) {     
            $new_months = array();       
            for ($i=$min_count-1; $i>0; $i--) {
                $append_month = str_pad($last_month-$i, 2, '0', STR_PAD_LEFT);
                if (array_key_exists($append_month, $months)) {
                    $new_months[$months[$append_month]] = 0;
                }                
            }
            $monthly = array_merge($new_months, $monthly);
        }        
    }

    // Yearly
    $yearly_sql = "SELECT count(ID) AS year_count, YEAR(post_date) AS year_val FROM `{$wpdb->prefix}posts` WHERE post_status = 'publish' AND post_type = %s GROUP BY year_val";
    $yearly_result = $wpdb->get_results($wpdb->prepare($yearly_sql, 'wpcb_booking'));
    $yearly = array();
    if (!empty($yearly_result)) {
        foreach ($yearly_result as $_year) {
            $yearly[$_year->year_val] = $_year->year_count;
        }
    }

    $year_count = count($yearly);
    if ($year_count < $min_count) {         
        $last_year = !empty($yearly) ? key(array_slice(array_reverse($yearly, true), 0, 1, true)) : date('Y');
        $new_years = array();

        for ($i=$min_count-1; $i>0; $i--) {
            $total_years_count = count($new_years) + count($yearly);
            if ($total_years_count < $min_count) {
                $prev_year = $last_year-$i;
                $new_years[$prev_year] = 0;

            }                       
        }
        if (!empty($yearly)) {
            foreach ($yearly as $_year => $_val) {
                $new_years[$_year] = $_val;
            }
        }  
        $yearly = $new_years;
    }
    
    $statistics = array(
        'monthly' => $monthly,
        'yearly' => $yearly
    );
    return $statistics;
}

function wpcb_get_summary()
{
    global $wpdb;
    $week_dates = wpcb_get_start_end_date_of_week();
    // Daily
    $daily_sql = "SELECT count(ID) FROM `{$wpdb->prefix}posts` WHERE post_status = 'publish' AND post_type = %s AND DATE(post_date) = %s";
    $daily = $wpdb->get_var($wpdb->prepare($daily_sql, 'wpcb_booking', date('Y-m-d')));

    // Weekly
    $weekly_sql = "SELECT count(ID) FROM `{$wpdb->prefix}posts` WHERE post_status = 'publish' AND post_type = %s AND DATE(post_date) >= %s AND DATE(post_date) <= %s";
    $weekly = $wpdb->get_var($wpdb->prepare($weekly_sql, 'wpcb_booking', $week_dates['start_date'], $week_dates['end_date']));

    // Monthly
    $monthy_sql = "SELECT count(ID) FROM `{$wpdb->prefix}posts` WHERE post_status = 'publish' AND post_type = %s AND MONTH(post_date) = %d";
    $monthly = $wpdb->get_var($wpdb->prepare($monthy_sql, 'wpcb_booking', date('n')));

    // Yearly
    $yearly_sql = "SELECT count(ID) FROM `{$wpdb->prefix}posts` WHERE post_status = 'publish' AND post_type = %s AND YEAR(post_date) = %d";
    $yearly = $wpdb->get_var($wpdb->prepare($yearly_sql, 'wpcb_booking', date('Y')));

    $summary = array(
        'daily' => $daily ?? 0,
        'weekly' => $weekly ?? 0,
        'monthly' => $monthly ?? 0,
        'yearly' => $yearly ?? 0
    );
    return $summary;
}

function wpcb_get_report_data($data)
{
    global $WPCBField;
    $customer = isset($data['customer']) ? sanitize_text_field($data['customer']) : '';
    $status = isset($data['status']) ? sanitize_text_field($data['status']) : '';
    $date_from = isset($data['date_from']) ? date('Y-m-d', strtotime(sanitize_text_field($data['date_from']))) : '';
    $date_to = isset($data['date_to']) ? date('Y-m-d', strtotime(sanitize_text_field($data['date_to']))) : '';
    $result = array('headers' => array(), 'data' => array());

    $meta_query = array();
    if (!empty($customer)) {
        $meta_query[] = array(
            'key' => wpcb_customer_field('key'),
            'value' => $customer,
            'compare' => '='
        );
    }
    if (!empty($status)) {
        $meta_query[] = array(
            'key' => 'wpcb_booking_status',
            'value' => $status,
            'compare' => '='
        );
    }
    $args = array(
        'post_type' => 'wpcb_booking',
        'post_status' => 'publish',
        'posts_per_page' => -1,
        'meta_query' => array(
            'relation' => 'AND',
            $meta_query
        )
    );

    if (empty($date_from) && empty($date_to)) {
        return $result;
    }

    $args['date_query'] = array();
    if (!empty($date_from)) {
        $args['date_query']['after'] = array(
            'year' => date('Y', strtotime($date_from)),
            'month' => date('m', strtotime($date_from)),
            'day' => date('d', strtotime($date_from))
        );
    }
    if (!empty($date_to)) {
        $args['date_query']['before'] = array(
            'year' => date('Y', strtotime($date_to)),
            'month' => date('m', strtotime($date_to)),
            'day' => date('d', strtotime($date_to))
        );
    }
    $args['date_query']['inclusive'] = true;

    $posts = get_posts($args);
    if (empty($posts)) {
        return $result;
    }

    $custom_fields = $WPCBField->fields();
    $report_headers = array(
        'booking_number' => array('key' => 'booking_number', 'label' => esc_html__('Booking Number', 'wpcb_booking')),
        'post_date' => array('key' => 'post_date', 'label' => esc_html__('Date Created', 'wpcb_booking')),
        'status' => array('key' => 'status', 'label' => esc_html__('Status', 'wpcb_booking')),
    );
    $report_data = array();

    if (!empty($posts) && !empty($custom_fields)) {
        foreach ($posts as $post) {
            $meta_values = wpcb_get_booking_details($post->ID);
            $report_data[$post->ID]['booking_number'] = $post->post_title;
            $report_data[$post->ID]['post_date'] = date(wpcb_date_format(), strtotime($post->post_date));
            $report_data[$post->ID]['status'] = get_post_meta($post->ID, 'wpcb_booking_status', true);
            foreach ($custom_fields as $section => $fields) {
                foreach ($fields as $field) {
                    $meta_value = array_key_exists($field['key'], $meta_values) ? $meta_values[$field['key']] : '';
                    $meta_value = apply_filters('wpcb_report_data', $meta_value, $field['key'], $post->ID);
                    $report_data[$post->ID][$field['key']] = $meta_value;
                    if (!in_array($field['label'], $report_headers)) {
                        $report_headers[$field['key']] = array('key' => $field['key'], 'label' => $field['label']);
                    }
                }
            }
           
            $booked_dates = array_key_exists('booked_dates', $meta_values) ? $meta_values['booked_dates'] : ''; 
            $booked_dates_str = !empty($booked_dates) ? implode(' | ', $booked_dates) : '';
            $report_data[$post->ID]['booked_dates'] = $booked_dates_str;
            $report_data[$post->ID]['booked_amount'] = array_key_exists('booked_amount', $meta_values) ? wpcb_number_format($meta_values['booked_amount']) : ''; 
        }
        $report_headers['booked_dates'] = array('key' => 'booked_dates', 'label' => esc_html__('Booked Date(s)', 'wpcb_booking'));
        $report_headers['booked_amount'] = array('key' => 'booked_amount', 'label' => esc_html__('Amount', 'wpcb_booking'));
    }
    $report_headers = wpcb_sanitize_data(apply_filters('wpcb_report_hearders', $report_headers, $custom_fields));
    $report_data = wpcb_sanitize_data(apply_filters('wpcb_report_data', $report_data, $posts));
    $result = array(
        'headers' => $report_headers,
        'data' => $report_data
    );
    return $result;
}