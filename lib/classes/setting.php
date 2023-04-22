<?php

class WPCBSetting
{
    function __construct()
    {
        //update_option('wpcb_settings', []);
    }
	function wpcb_settings() {
        $settings = get_option('wpcb_settings');
        return !empty($settings) ? $settings : array();
    }

    function update_setting($setting_key, $value) {
        $settings = $this->wpcb_settings();
        $settings[$setting_key] = $value;
        update_option('wpcb_settings', $settings);
    }

    function wpcb_status_list() {
        $status_list = array(
            wpcb_booking_default_status(),
            esc_html__('Booked', 'wpcb_booking'),
            esc_html__('Approved', 'wpcb_booking')
        );
        $setting_status =  $this->get_setting('general', 'booking_status_list', array());
        $status_list = array_unique(array_merge($status_list, $setting_status));
        return wpcb_sanitize_data(apply_filters('wpcb_status_list', $status_list));
    }

    function get_setting($setting_key='', $field='', $default_value='', $all_fields=false) {
        $defaults = $this->wpcb_default_settings();
        $settings = $this->wpcb_settings();

        if (empty($settings)) {
            $settings = $defaults;
        }

        if ($setting_key) {
            foreach ($defaults as $_sett_key => $_values) {
                if (!array_key_exists($_sett_key, $settings)) {
                    $settings[$_sett_key] = $_values;
                }
                foreach ($_values as $_key => $_value) {
                    if ($setting_key == $_sett_key && $_key == $field) {
                        $default_value = $_value;
                    }
                }
            }
        }
       
        
        $result = ($all_fields) ? $settings : $default_value;
        if ($setting_key && array_key_exists($setting_key, $settings)) {
            $result = $settings[$setting_key];
            if ($field) {
                $result = array_key_exists($field, $result) ? $result[$field] : $default_value;
            }
        }
        return is_array($result) ? array_filter(wpcb_sanitize_data($result)) : wpcb_sanitize_data($result);
    }

    function get_setting_html($setting_key='', $field='', $default_value='', $all_fields=false) {
        $defaults = $this->wpcb_default_settings();
        $wpcb_settings = $this->wpcb_settings();
        $result = ($all_fields) ? (empty($settings) ? $defaults : $settings) : $default_value;
        
        if (empty($result) && empty($field)) {
            $result = array();         
        }

        if (!$result && $setting_key) {
            $result = $defaults[$setting_key];
            if ($field) {
                $result = array_key_exists($field, $result) ? $result[$field] : $default_value;
            }
        }

        if (!empty($wpcb_settings)) {
            if (array_key_exists($setting_key, $wpcb_settings)) {
                $settings = $wpcb_settings[$setting_key];
                if (array_key_exists($field, $settings) && !empty($settings[$field])) {
                    $result = $settings[$field];
                } else if (!empty($setting_key) && empty($field)){
                    $result = $settings;
                }
            }
        }  

        $html_result = $result;      
        if (!empty($result)) {
            if (is_array($result)) {
                foreach ($result as $key => $_value) {
                    if (!is_array($_value)) {
                        $html_result[$key] = wp_kses($_value, wpcb_allowed_html_tags());
                    } else {
                        foreach ($_value as $__key => $__value) {
                            $html_result[$key][$__key] = wp_kses($__value, wpcb_allowed_html_tags());
                        }
                    }                    
                }
            } else {
                $html_result = wp_kses($result, wpcb_allowed_html_tags());
            }
        }        
        return $html_result;
    }

    function get_week_days() {
        $week_days = array(
            0 => 'Sun',
            1 => 'Mon',
            2 => 'Tue',
            3 => 'Wed',
            4 => 'Thu',
            5 => 'Fri',
            6 => 'Sat'
        );
        $week_starts = $this->get_setting('general', 'week_starts', 0);
        $week_starts = $week_starts;
        $new_weeks = [];
        $cutted_days = [];
        foreach ($week_days as $idx => $day) {
            if ($idx >= $week_starts) {
                $new_weeks[] = $day;
            } else {
                $cutted_days[$idx] = $day;
            }
        }
        if (!empty($cutted_days)) {
            foreach ($cutted_days as $day) {
                $new_weeks[] = $day;
            }
        }
        return apply_filters('wpcb_booking_week_days', $new_weeks);
    }

    function wpcb_get_shortcode_list($w_heading=false)
    {
        global $WPCBField;
        $shortcodes = array(
            'general' => array(
                '{wpcb_booking_number}' => 'Booking Number',
                '{wpcb_booking_status}' => 'Booking Status',
                '{booked_dates}' => 'Booked Date(s)',
            )
        );
        if ($w_heading) {
            $shortcodes = array(
                'general' => array(
                    'heading' => 'General',
                    'fields' => array(
                        '{wpcb_booking_number}' => 'Booking Number',
                        '{wpcb_booking_status}' => 'Booking Status',
                        '{booked_dates}' => 'Booked Date(s)',
                    )
                )
            );
        }
        
        if ($custom_fields = $WPCBField->fields()) {
            foreach ($custom_fields as $section => $fields) {
                if (empty($fields)) {
                    continue;
                }
                if ($section == 'Personal Information') {
                    $section = 'Customer Information';
                }
                $section_key = strtolower(str_replace(' ', '_', $section));
                $section_fields = array();
                foreach ($fields as $field_key => $field) {
                    $section_fields['{'.$field_key.'}'] = $field['label'];
                }   
                if ($w_heading) {
                    $shortcodes[$section_key] = array(
                        'heading' => $section,
                        'fields' => $section_fields
                    );
                } else {
                    $shortcodes[$section_key] = $section_fields;
                }             
            }
        }
        return apply_filters('wpcb_shortcode_list', $shortcodes);
    }

    function wpcb_get_shortcode_values($booking_id)
    {
        $meta_values = wpcb_get_booking_details($booking_id);
        $shortcodes_list = $this->wpcb_get_shortcode_list();
        $shortcodes_data = [];
        if (!empty($shortcodes_list)) {
            foreach ($shortcodes_list as $heading => $shortcodes) {
                if (empty($shortcodes)) { continue; }
                foreach ($shortcodes as $shortcode => $description) {
                    $shortcode = str_replace(['{','}'], '', $shortcode);
                    $shortcode_value = array_key_exists($shortcode, $meta_values) ? $meta_values[$shortcode] : '{'.$shortcode.'}';
                    if ($shortcode == 'wpcb_booking_number') {
                        $shortcode_value = get_the_title($booking_id);
                    }
                    if ($shortcode == 'booked_dates') {
                        $shortcode_value = wpcb_get_order_details_html($booking_id, true);
                    }
                    if (is_array($shortcode_value)) {
                        $str_value = "<ul style='list-style-type: disc; list-style-position: inside;'>";
                        foreach ($shortcode_value as $_value) {
                            $str_value .= "<li> - ".esc_html($_value)."</li>";
                        }
                        $str_value .= '</ul>';
                        $shortcode_value = $str_value;
                    }
                    $shortcodes_data['{'.$shortcode.'}'] = $shortcode_value;
                }
            }
        }
        return apply_filters('wpcb_shortcode_values', $shortcodes_data, $booking_id);
    }

    function wpcb_default_settings() {
        $admin_default_email = sanitize_email(get_option('new_admin_email'));
        $defaults = array(
            'general' => array(
                'default_status' => 'New',
                'booking_status_list' => array( 'New', 'Booked', 'Approved' ),
                'enable_days' => wpcb_default_enabled_days(),
                'width' => 100,
                'width_unit' => '%'
            ),
            'email_admin' => array(
                'admin_enable' => 'Yes',
                'enabled_statuses' => array( 'New', 'Booked', 'Approved' ),
                'admin_mail_to' => array($admin_default_email),
                'admin_subject' => 'New Booking',
                'admin_body' => wpcb_get_default_admin_mail_body(),
                'admin_footer' => wpcb_get_default_admin_mail_footer()
            ),
            'email_client' => array(
                'client_enable' => 'Yes',
                'enabled_statuses' => array('New'),
                'client_mail_to' => array('{wpcb_customer_email}'),
                'client_subject' => 'Booking Number #{wpcb_booking_number}',
                'client_body' => wpcb_get_default_client_mail_body(),
                'client_footer' => wpcb_get_default_client_mail_footer()
            )
        );
        return apply_filters('wpcb_default_settings' ,$defaults);
    }
}

$WPCBSetting = new WPCBSetting;