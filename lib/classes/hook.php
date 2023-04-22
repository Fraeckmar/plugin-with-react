<?php
class WPCBHook
{
	function __construct()
	{
		add_action('wpcb_after_booking_send_email', array($this, 'wpcb_send_email_notification'), 10, 3);
	}

	function wpcb_send_email_notification($booking_id, $data, $old_status) {
		$this->wpcb_admin_send_email_notification($booking_id);
        $this->wpcb_client_send_email_notification($booking_id, $data, $old_status);
	}

	function wpcb_admin_send_email_notification($booking_id) {
        global $WPCBSetting;
        $mail_setting = $WPCBSetting->get_setting_html('email_admin');
        $is_enabled = array_key_exists('admin_enable', $mail_setting) ? strtolower($mail_setting['admin_enable']) == 'yes' : true;
        if (get_post_status($booking_id) != 'publish' || !$is_enabled) {
            return false;
        }
        
        $booking_status = sanitize_text_field(get_post_meta($booking_id, 'wpcb_booking_status', true));
        $website_mail = sanitize_email(get_option('admin_email'));
        $shortcode_values = $WPCBSetting->wpcb_get_shortcode_values($booking_id);
        
        if (!in_array($booking_status, wpcb_send_admin_email_in_status_list())) {
            return false;
        }

        if (!empty($mail_setting) && !empty($shortcode_values)) {
            foreach ($shortcode_values as $shortcode => $shortcode_val) {
                foreach ($mail_setting as $setting => $setting_val) {
                    if (empty($setting_val) && in_array($setting, array('admin_body', 'admin_footer'))) {
                        if ($setting == 'admin_body') {
                            $setting_val = wpcb_get_default_admin_mail_body();
                        }
                        if ($setting == 'admin_footer') {
                            $setting_val = wpcb_get_default_admin_mail_footer();
                        }
                    }
                    $mail_setting[$setting] = str_replace($shortcode, $shortcode_val, $setting_val);
                }
            }            
        }
        
        $mail_to = array_key_exists('admin_mail_to', $mail_setting) && !empty($mail_setting['admin_mail_to']) ? implode(',', wpcb_sanitize_data($mail_setting['admin_mail_to'], 'email')) : '';
        $mail_to = apply_filters('wpcb_admin_mail_to', $mail_to, $booking_id);
        $cc = array_key_exists('admin_cc', $mail_setting) && !empty($mail_setting['admin_cc']) ? implode(',', wpcb_sanitize_data($mail_setting['admin_cc'], 'email')) : '';
        $bcc = array_key_exists('admin_bcc', $mail_setting) && !empty($mail_setting['admin_bcc']) ? implode(',', wpcb_sanitize_data($mail_setting['admin_bcc'], 'email')) : '';
        $subject = array_key_exists('admin_subject', $mail_setting) ? $mail_setting['admin_subject'] : '';
        $body = array_key_exists('admin_body', $mail_setting) ? $mail_setting['admin_body'] : '';
        $footer = array_key_exists('admin_footer', $mail_setting) ? $mail_setting['admin_footer'] : '';
        $mail_content = wp_kses(wpcb_construct_mail_body($body, $footer), wpcb_allowed_html_tags());

        $attachments = apply_filters('wpcb_admin_mail_attachments', array(), $booking_id);
        $headers = array('Content-Type: text/html; charset=UTF-8');
        $headers[] = "From: " .get_bloginfo('name'). " <".sanitize_email($website_mail).">\r\n";

        if(!empty($cc)){
            $headers[] = "cc: {$cc} \r\n";
        }
        if(!empty($bcc)){
            $headers[] = "Bcc: {$bcc} \r\n";
        }
        if (!empty($mail_to)) {
            return wp_mail($mail_to, $subject, $mail_content, $headers, $attachments);
        }
        return false;
    }

    function wpcb_client_send_email_notification($booking_id, $data, $old_status) {
        if (get_post_status($booking_id) != 'publish') {
            return false;
        }
        global $WPCBSetting;
        $site_mail = sanitize_email(get_option('admin_email'));
        $shortcode_values = $WPCBSetting->wpcb_get_shortcode_values($booking_id);
        $booking_status = sanitize_text_field(get_post_meta($booking_id, 'wpcb_booking_status', true));
        $mail_setting = $WPCBSetting->get_setting_html('email_client');

        $is_enabled = array_key_exists('client_enable', $mail_setting) ? strtolower($mail_setting['client_enable']) == 'yes' : true;
        if (!$is_enabled || $booking_status == $old_status || !in_array($booking_status, wpcb_send_client_email_in_status_list())) {
            return false;
        }

        if (!empty($mail_setting) && !empty($shortcode_values)) {
            foreach ($shortcode_values as $shortcode => $shortcode_val) {
                foreach ($mail_setting as $setting => $setting_val) {
                    if (empty($setting_val) && in_array($setting, array('client_body', 'client_footer'))) {
                        if ($setting == 'client_body') {
                            $setting_val = wpcb_get_default_client_mail_body();
                        }
                        if ($setting == 'client_footer') {
                            $setting_val = wpcb_get_default_client_mail_footer();
                        }
                    }
                    $mail_setting[$setting] = str_replace($shortcode, $shortcode_val, $setting_val);
                }               
            }            
        }
        
        $mail_to = array_key_exists('client_mail_to', $mail_setting) && !empty($mail_setting['client_mail_to']) ? implode(',', wpcb_sanitize_data($mail_setting['client_mail_to'], 'email')) : '';
        $mail_to = apply_filters('wpcb_client_mail_to', $mail_to, $booking_id);
        $cc = array_key_exists('client_cc', $mail_setting) && !empty($mail_setting['client_cc']) ? implode(',', wpcb_sanitize_data($mail_setting['client_cc'], 'email')) : '';
        $bcc = array_key_exists('client_bcc', $mail_setting) && !empty($mail_setting['client_bcc']) ? implode(',', wpcb_sanitize_data($mail_setting['client_bcc'], 'email')) : '';
        $subject = array_key_exists('client_subject', $mail_setting) && !empty($mail_setting['client_subject']) ? $mail_setting['client_subject'] : '';
        $body = array_key_exists('client_body', $mail_setting) ? $mail_setting['client_body'] : '';
        $footer = array_key_exists('client_footer', $mail_setting) ? $mail_setting['client_footer'] : '';
        $mail_content = wp_kses(wpcb_construct_mail_body($body, $footer), wpcb_allowed_html_tags());

        $headers = array('Content-Type: text/html; charset=UTF-8');
        $headers[] = "From: " .get_bloginfo('name'). " <".sanitize_email($site_mail).">\r\n";
        $attachments = apply_filters('wpcb_client_mail_attachments', array(), $booking_id);

        if(!empty($cc)){
            $headers[] = "cc: {$cc} \r\n";
        }
        if(!empty($bcc)){
            $headers[] = "Bcc: {$bcc} \r\n";
        }
        if (!empty($mail_to)) {
            return wp_mail($mail_to, $subject, $mail_content, $headers, $attachments);
        }
        return false;
    }
}

$WPCBHook = new WPCBHook;