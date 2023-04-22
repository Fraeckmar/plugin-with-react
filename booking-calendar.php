<?php
/*
 * Plugin Name: Booking Calendar and Notification
 * Description: Booking Calendar and Notification is a plug-in designed for easy booking to your business. Set and display your date(s) whether it is available, unavailable or booked. Manage bookings from your customer with statistical graphs.
 * Author: <a href="https://join.skype.com/invite/yT6ad4cNTTJM">wpshiptrack</a>
 * Text Domain: wpcb_booking
 * Domain Path: /languages
 * Version: 4.0.1
 */

 /** 
  * Booking Calendar and Notification
  * Copyright (C) 2022  WP Booking Calendar
  */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/** Defined constant */
define('WPCB_BOOKING_TEXTDOMAIN', 'wpcb_booking');
define('WPCB_BOOKING_VERSION', '4.0.1');
define('WPCB_BOOKING_DB_VERSION', '1.0.0');
define('WPCB_BOOKING_FILE_DIR', __FILE__);
define('WPCB_BOOKING_PLUGIN_URL', plugin_dir_url( WPCB_BOOKING_FILE_DIR ));
define('WPCB_BOOKING_PLUGIN_PATH', plugin_dir_path( WPCB_BOOKING_FILE_DIR ));

/** enqueue scipts */

require_once(WPCB_BOOKING_PLUGIN_PATH. 'lib/classes/load.php');
require_once(WPCB_BOOKING_PLUGIN_PATH. 'lib/includes/function.php');
require_once(WPCB_BOOKING_PLUGIN_PATH. 'lib/classes/field.php');
require_once(WPCB_BOOKING_PLUGIN_PATH. 'lib/classes/setting.php');
require_once(WPCB_BOOKING_PLUGIN_PATH. 'lib/classes/asset.php'); 
require_once(WPCB_BOOKING_PLUGIN_PATH. 'lib/classes/hook.php');
require_once(WPCB_BOOKING_PLUGIN_PATH. 'lib/classes/shortcode.php');
require_once(WPCB_BOOKING_PLUGIN_PATH. 'lib/classes/api.php');


if (is_admin()) {
  require_once(WPCB_BOOKING_PLUGIN_PATH. 'lib/classes/sub-menu.php');
}

/** Load text Domain */
add_action('plugins_loaded', array('WPCBLoad','wpcb_booking_load_textdomain'));

//** Create Booking Form page
register_activation_hook(WPCB_BOOKING_FILE_DIR, array( 'WPCBLoad', 'wpcb_booking_add_custom_page'));
