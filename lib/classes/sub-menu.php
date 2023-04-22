<?php

class WPCBSubMenu
{
    function __construct()
    {
        add_action('admin_menu', array($this, 'wpcb_register_admin_menu'));
    }

    function wpcb_register_admin_menu() {
        add_menu_page(
            __('Booking Calendar', 'wpcb_booking'),
            __('Booking Calendar', 'wpcb_booking'),
            'manage_options',
            'manage-booking',
            array($this, 'wpcb_online_booking_callback'),
            'dashicons-calendar',
            3
        );

    }

    function wpcb_online_booking_callback() {
        $current_user_id = get_current_user_id();
        $plugin_slug = wpcb_plugin_slug();
        $site_url = site_url();
        if (!isset($_GET['page']) && wpcb_sanitize_data($_GET['page']) != $plugin_slug) { 
            return false; 
        }
        echo "<input type='hidden' id='wpcb_current_user' value='{$current_user_id}'>";
        echo "<input type='hidden' id='wpcb_site_url' value='{$site_url}'>";
		echo "<div id='root-admin' class='booking'></div>";
        echo "<div id='root' class='booking'></div>";
    }
}

new WPCBSubMenu;