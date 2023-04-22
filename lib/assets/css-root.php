<?php 
global $WPCBSetting;
$calendar_width = sanitize_text_field($WPCBSetting->get_setting('general', 'width'));
$calendar_unit = sanitize_text_field($WPCBSetting->get_setting('general', 'width_unit')) ?? '%';
$legends_bg = wpcb_legend_bg_colors();
$legends_fg = wpcb_legend_fg_colors();
if (!$calendar_width) {
    $calendar_width = 100;
    $calendar_unit = '%';
}
$dates_width = ($calendar_unit == 'px') ? ($calendar_width-42) / 7 : 14.28;
$day_name_font_size = sanitize_text_field($WPCBSetting->get_setting('general', 'day_name_font_size'));
$date_nos_font_size = sanitize_text_field($WPCBSetting->get_setting('general', 'date_nos_font_size'));
?>
<style>
    :root {
        --calendar-width : <?php esc_html_e($calendar_width.$calendar_unit); ?>;
        --date-width: <?php esc_html_e($dates_width.$calendar_unit); ?>;
        --date-name-fsize: <?php echo !empty($day_name_font_size) ? esc_html($day_name_font_size.'px') : 'inherit'; ?>; 
        --date-nos-fsize: <?php echo !empty($date_nos_font_size) ? esc_html($date_nos_font_size.'px') : 'inherit'; ?>; 

        --date-selected-bg: <?php echo !empty($legends_bg) ? $legends_bg['selected'] : '#33d298'; ?>;
        --date-available-bg: <?php echo !empty($legends_bg) ? $legends_bg['available'] : '#d8fcde'; ?>;
        --date-unavailable-bg: <?php echo !empty($legends_bg) ? $legends_bg['unavailable'] : '#ffccc9'; ?>;
        --date-booked-bg: <?php echo !empty($legends_bg) ? $legends_bg['booked'] : '#379aff'; ?>;

        --date-selected-fg: <?php echo !empty($legends_fg) ? $legends_fg['selected'] : '#fff'; ?>;
        --date-available-fg: <?php echo !empty($legends_fg) ? $legends_fg['available'] : '#000'; ?>;
        --date-unavailable-fg: <?php echo !empty($legends_fg) ? $legends_fg['unavailable'] : '#000'; ?>;
        --date-booked-fg: <?php echo !empty($legends_fg) ? $legends_fg['booked'] : '#fff'; ?>;

        --day-name-fg: <?php echo wpcb_calendar_day_name_color() ?>;
    }
</style>