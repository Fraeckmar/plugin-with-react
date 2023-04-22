<?php

class WPCBField
{
	function fields($booking_id=0)
    {
        $wpcb_customer_name = $booking_id ? wpcb_sanitize_data(get_post_meta($booking_id, 'wpcb_customer_name', true)) : '';
        $wpcb_customer_email = $booking_id ? sanitize_email(get_post_meta($booking_id, 'wpcb_customer_email', true)) : '';
        $wpcb_customer_phone_number = $booking_id ? wpcb_sanitize_data(get_post_meta($booking_id, 'wpcb_customer_phone_number', true)) : '';

        $wpcb_booking_fields = array(
            'Personal Information' => array(
                'wpcb_customer_name' => array(
                    'key' => 'wpcb_customer_name',
                    'label' => esc_html__('Name', 'wpcb_booking'),
                    'type' => 'text',
                    'required' => true,
                    'placeholder' => 'Your full name',
                    'class' => 'form-control',
                    'options' => array(),
                    'value' => $wpcb_customer_name
                ),
                'wpcb_customer_email' => array(
                    'key' => 'wpcb_customer_email',
                    'label' => esc_html__('Email', 'wpcb_booking'),
                    'type' => 'email',
                    'required' => true,
                    'placeholder' => 'example@gmail.com',
                    'class' => 'form-control',
                    'options' => array(),
                    'value' => $wpcb_customer_email
                ),
                'wpcb_customer_phone_number' => array(
                    'key' => 'wpcb_customer_phone_number',
                    'label' => esc_html__('Phone Number', 'wpcb_booking'),
                    'type' => 'text',
                    'required' => true,
                    'placeholder' => '',
                    'class' => 'form-control',
                    'options' => array(),
                    'value' => $wpcb_customer_phone_number
                )
            )
        );
        return apply_filters('wpcb_booking_fields', $wpcb_booking_fields, $booking_id);
    } 

	function wpcb_booking_status_fields($booking_id=0) {
		global $WPCBSetting;
		$status = $booking_id ? wpcb_get_booking_status($booking_id) : wpcb_booking_default_status();
		$fields = array(
			'wpcb_booking_status' => array(
				'key' => 'wpcb_booking_status',
				'type' => 'select',
				'label' => __('Status', 'wpcb_booking'),
				'value' => $status,
				'options' => $WPCBSetting->wpcb_status_list(),
                'class' => 'form-select'
			)
		);
		return apply_filters('wpcb_booking_status_fields', $fields);
	}

    function setting_section_labels() {
        $labels = array(
            'general' => __('Gneral', 'wpcb_booking'),
            'email_admin' => __('Admin Email', 'wpcb_booking'),
            'email_client' => __('Client Email', 'wpcb_booking')
        );
        return apply_filters('setting_section_labels', $labels);
    }

    function setting_fields() {
        global $WPCBSetting;
        $pages = wpcb_get_pages();
        $booking_status_list = $WPCBSetting->wpcb_status_list();
        $admin_default_email = sanitize_email(get_option('new_admin_email'));
        $wpcb_setting_fields = array(
            'general' => array(
                array(
                    'fields' => array(
                        array(
                            'key' => 'company_logo',
                            'label' => esc_html__('Company Logo', 'wpcb_booking'),
                            'placeholder' => 'https://www.yourdomain.com/image/sample.jpg',
                            'description' => 'Image url only.',
                            'type' => 'text',
                            'required' => false,
                            'class' => 'form-control',
                            'value' => $WPCBSetting->get_setting('general', 'company_logo'),
                            'setting' => 'general'
                        ),
                        array(
                            'key' => 'thankyou_page',
                            'label' => esc_html__('Thank you Page', 'wpcb_booking'),
                            'type' => 'select',
                            'required' => false,
                            'class' => 'form-control selectize',
                            'description' =>__('Redirect customer to this page after booking.', 'wpcb_booking'),
                            'options' => $pages,
                            'value' => $WPCBSetting->get_setting('general', 'thankyou_page', 0),
                            'setting' => 'general'
                        )
                    )
                ),
                array(
                    'heading' => esc_html__('Booking', 'wpcb_booking'),
                    'fields' => array(
                        array(
                            'key' => 'default_status',
                            'label' => esc_html__('Default Status', 'wpcb_booking'),
                            'type' => 'select',
                            'required' => false,
                            'class' => 'selectize rounded border form-control',
                            'options' => $booking_status_list,
                            'value' => wpcb_booking_default_status(),
                            'setting' => 'general'
                        )
                    )
                ),
                array(
                    'heading' => esc_html__('Calendar', 'wpcb_booking'),
                    'fields' => array(
                        array(
                            'key' => 'width',
                            'label' => esc_html__('Width', 'wpcb_booking'),
                            'type' => 'number',
                            'class' => 'form-control xw-100 flex-grow-1 rounded-0 rounded-start',
                            'options' => array(),
                            'value' => $WPCBSetting->get_setting('general', 'width'),
                            'setting' => 'general',
                            'show_in_form' => false
                        ),
                        array(
                            'key' => 'width_unit',
                            'label' => esc_html__('Unit', 'wpcb_booking'),
                            'type' => 'select',
                            'class' => 'rounded-0 rounded-end',
                            'options' => array('px', '%'),
                            'value' => $WPCBSetting->get_setting('general', 'width_unit'),
                            'setting' => 'general',
                            'show_in_form' => false
                        ),
                        array(
                            'key' => 'day_name_font_size',
                            'label' => esc_html__('Day name font size (px)', 'wpcb_booking'),
                            'type' => 'number',
                            'required' => false,
                            'placeholder' => 'auto',
                            'class' => 'form-control',
                            'options' => array(),
                            'value' => $WPCBSetting->get_setting('general', 'day_name_font_size'),
                            'setting' => 'general',
                            'extras' => ''
                        ),
                        array(
                            'key' => 'date_nos_font_size',
                            'label' => esc_html__('Date numbers font size (px)', 'wpcb_booking'),
                            'type' => 'number',
                            'required' => false,
                            'placeholder' => 'auto',
                            'class' => 'form-control',
                            'options' => array(),
                            'value' => $WPCBSetting->get_setting('general', 'date_nos_font_size'),
                            'setting' => 'general',
                            'extras' => ''
                        ),
                        // array(
                        //     'key' => 'can_select_nultiple',
                        //     'label' => __('Allow customer can select multiple dates?', 'wpcb_booking'),
                        //     'type' => 'checkbox',
                        //     'required' => false,
                        //     'placeholder' => '',
                        //     'class' => 'form-check-input',
                        //     'options' => array('Yes' => 'Yes'),
                        //     'value' => $this->get_setting('general', 'can_select_nultiple') ?? array(),
                        //     'setting' => 'general',
                        //     'extras' => ''
                        // ),
                        array(
                            'key' => 'booking_status_list',
                            'label' => esc_html__('Add Calendar Status', 'wpcb_booking'),
                            'type' => 'select',
                            'required' => false,
                            'placeholder' => '',
                            'description' => '<strong>Note:</strong> Type and select to add new item',
                            'class' => 'selectize rounded border form-control',
                            'options' => $booking_status_list,
                            'value' => $booking_status_list,
                            'setting' => 'general',
                            'multiple' => true,
                            'creatable' => true
                        )
                    ),
                ),
                array(
                    'heading' => esc_html__('Availability', 'wpcb_booking'),
                    'fields' => array(
                        array(
                            'key' => 'enable_days',
                            'label' => esc_html__('Enable days', 'wpcb_booking'),
                            'type' => 'checkbox',
                            'required' => false,
                            'placeholder' => '',
                            'options' => $WPCBSetting->get_week_days(),
                            'value' => $WPCBSetting->get_setting('general', 'enable_days', array()),
                            'setting' => 'general',
                        )
                    )
                )
            ),
            'email_admin' => array(
                array(
                    'heading' => esc_html__('Admin Email Setting', 'wpcb_booking'),
                    'fields' => array(
                        array(
                            'key' => 'admin_enable',
                            'label' => esc_html__('Enable?', 'wpcb_booking'),
                            'type' => 'radio',
                            'required' => true,
                            'class' => '',
                            'group_class' => 'form-check-inline',
                            'options' => array('Yes', 'No'),
                            'value' => $WPCBSetting->get_setting('email_admin', 'admin_enable', ''),
                            'setting' => 'email_admin'
                        ),
                        array(
                            'key' => 'enabled_statuses',
                            'label' => esc_html__('Send notification when status are:', 'wpcb_booking'),
                            'type' => 'checkbox',
                            'options' => $booking_status_list,
                            'value' => wpcb_send_admin_email_in_status_list(),
                            'setting' => 'email_admin'
                        ),
                        array(
                            'key' => 'admin_mail_to',
                            'label' => esc_html__('Mail To', 'wpcb_booking'),
                            'type' => 'select',
                            'required' => true,
                            'class' => 'selectize',
                            'options' => $WPCBSetting->get_setting('email_admin', 'admin_mail_to', array($admin_default_email)),
                            'value' => $WPCBSetting->get_setting('email_admin', 'admin_mail_to', array()),
                            'placeholder' => 'sample@gmail.com',
                            'description' => '<strong>Note:</strong> Type and select to add new item',
                            'multiple' => true,
                            'creatable' => true,
                            'setting' => 'email_admin',
                        ),
                        array(
                            'key' => 'admin_cc',
                            'label' => esc_html__('Cc', 'wpcb_booking'),
                            'type' => 'select',
                            'required' => false,
                            'class' => 'selectize',
                            'options' => $WPCBSetting->get_setting('email_admin', 'admin_cc'),
                            'value' => $WPCBSetting->get_setting('email_admin', 'admin_cc'),
                            'placeholder' => 'sample@gmail.com',
                            'description' => '<strong>Note:</strong> Type and select to add new item',
                            'multiple' => true,
                            'creatable' => true,
                            'setting' => 'email_admin',
                        ),
                        array(
                            'key' => 'admin_bcc',
                            'label' => esc_html__('Bcc', 'wpcb_booking'),
                            'type' => 'select',
                            'required' => false,
                            'class' => 'selectize',
                            'options' => $WPCBSetting->get_setting('email_admin', 'admin_bcc'),
                            'value' => $WPCBSetting->get_setting('email_admin', 'admin_bcc'),
                            'description' => '<strong>Note:</strong> Type and select to add new item',
                            'placeholder' => 'sample@gmail.com',
                            'multiple' => true,
                            'creatable' => true,
                            'setting' => 'email_admin',
                        ),
                        array(
                            'key' => 'admin_subject',
                            'label' => esc_html__('Subject', 'wpcb_booking'),
                            'type' => 'text',
                            'required' => true,
                            'class' => 'form-control',
                            'value' => $WPCBSetting->get_setting_html('email_admin', 'admin_subject'),     
                            'placeholder' => 'New Booking',                    
                            'setting' => 'email_admin',
                        ),
                        array(
                            'key' => 'admin_body',
                            'label' => esc_html__('Body', 'wpcb_booking'),
                            'type' => 'textarea',
                            'required' => true,
                            'class' => 'form-control',
                            'value' => $WPCBSetting->get_setting_html('email_admin', 'admin_body'),     
                            'placeholder' => wpcb_get_default_admin_mail_body(),                       
                            'rows' => 6,
                            'allow_html' => true,
                            'setting' => 'email_admin',
                        ),
                        array(
                            'key' => 'admin_footer',
                            'label' => esc_html__('Footer', 'wpcb_booking'),
                            'type' => 'textarea',
                            'required' => true,
                            'class' => 'form-control',
                            'value' => $WPCBSetting->get_setting_html('email_admin', 'admin_footer'),
                            'placeholder' => wpcb_get_default_admin_mail_footer(),
                            'allow_html' => true,
                            'setting' => 'email_admin',
                        )
                    )
                )
            ),
            'email_client' => array(
                array(
                    'heading' => esc_html__('Client Email Setting', 'wpcb_booking'),
                    'fields' => array(
                        array(
                            'key' => 'client_enable',
                            'label' => esc_html__('Enable?', 'wpcb_booking'),
                            'type' => 'radio',
                            'required' => true,
                            'class' => '',
                            'group_class' => 'form-check-inline',
                            'options' => array('Yes', 'No'),
                            'value' => $WPCBSetting->get_setting('email_client', 'client_enable'),
                            'setting' => 'email_client'
                        ),
                        array(
                            'key' => 'enabled_statuses',
                            'label' => esc_html__('Send notification when status are:', 'wpcb_booking'),
                            'type' => 'checkbox',
                            'options' => $booking_status_list,
                            'value' => wpcb_send_client_email_in_status_list(),
                            'setting' => 'email_client'
                        ),
                        array(
                            'key' => 'client_mail_to',
                            'label' => esc_html__('Mail To', 'wpcb_booking'),
                            'type' => 'select',
                            'required' => true,
                            'class' => 'selectize',
                            'options' => $WPCBSetting->get_setting('email_client', 'client_mail_to', array('{wpcb_customer_email}')),
                            'value' => $WPCBSetting->get_setting('email_client', 'client_mail_to', array()),
                            'placeholder' => 'sample@gmail.com',
                            'description' => '<strong>Note:</strong> Type and select to add new item',
                            'multiple' => true,
                            'creatable' => true,
                            'setting' => 'email_client',
                        ),
                        array(
                            'key' => 'client_cc',
                            'label' => esc_html__('Cc', 'wpcb_booking'),
                            'type' => 'select',
                            'required' => false,
                            'class' => 'selectize',
                            'options' => $WPCBSetting->get_setting('email_client', 'client_cc'),
                            'value' => $WPCBSetting->get_setting('email_client', 'client_cc', array()),
                            'placeholder' => 'sample@gmail.com',
                            'description' => '<strong>Note:</strong> Type and select to add new item',
                            'multiple' => true,
                            'creatable' => true,
                            'setting' => 'email_client',
                        ),
                        array(
                            'key' => 'client_bcc',
                            'label' => esc_html__('Bcc', 'wpcb_booking'),
                            'type' => 'select',
                            'required' => false,
                            'class' => 'selectize',
                            'options' => $WPCBSetting->get_setting('email_client', 'client_bcc'),
                            'value' => $WPCBSetting->get_setting('email_client', 'client_bcc'),
                            'description' => '<strong>Note:</strong> Type and select to add new item',
                            'placeholder' => 'sample@gmail.com',
                            'multiple' => true,
                            'creatable' => true,
                            'setting' => 'email_client',
                        ),
                        array(
                            'key' => 'client_subject',
                            'label' => esc_html__('Subject', 'wpcb_booking'),
                            'type' => 'text',
                            'required' => true,
                            'class' => 'form-control',
                            'value' => $WPCBSetting->get_setting_html('email_client', 'client_subject'),     
                            'placeholder' => 'Booking Number #{wpcb_booking_number}',                   
                            'setting' => 'email_client',
                        ),
                        array(
                            'key' => 'client_body',
                            'label' => esc_html__('Body', 'wpcb_booking'),
                            'type' => 'textarea',
                            'required' => true,
                            'class' => 'form-control',
                            'value' => $WPCBSetting->get_setting_html('email_client', 'client_body'),     
                            'placeholder' => wpcb_get_default_client_mail_body(),                       
                            'rows' => 6,
                            'allow_html' => true,
                            'setting' => 'email_client',
                        ),
                        array(
                            'key' => 'client_footer',
                            'label' => esc_html__('Footer', 'wpcb_booking'),
                            'type' => 'textarea',
                            'required' => true,
                            'class' => 'form-control',
                            'value' => $WPCBSetting->get_setting_html('email_client', 'client_footer'),
                            'placeholder' => wpcb_get_default_client_mail_footer(),
                            'allow_html' => true,
                            'setting' => 'email_client',
                        )
                    )
                )
            ),
        );
        return apply_filters('wpcb_setting_fields', $wpcb_setting_fields);
    }
    
    function wpcb_customer_columns() {
        $columns = array();
        $fields = $this->fields();
        if (empty($fields)) {
            return $columns;
        }
        foreach ($fields as $section => $sec_fields) {
            foreach ($sec_fields as $key => $field) {
                $columns[$field['key']] = $field['label'];
            }
        }
        $columns['is_registered'] = __('Registered', 'wpcb_booking');
        return apply_filters('wpcb_customer_columns', $columns);
    }
}

$WPCBField = new WPCBField;