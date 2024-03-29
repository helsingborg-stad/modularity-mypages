<?php 


if (function_exists('acf_add_local_field_group')) {

    acf_add_local_field_group(array(
    'key' => 'group_624d8216a1b87',
    'title' => __('Settings', 'modularity-mypages'),
    'fields' => array(
        0 => array(
            'key' => 'field_624d821e9b234',
            'label' => __('Protected Pages', 'modularity-mypages'),
            'name' => 'mypages_protected_post_ids',
            'type' => 'relationship',
            'instructions' => '',
            'required' => 0,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'post_type' => '',
            'taxonomy' => '',
            'filters' => array(
                0 => 'search',
            ),
            'elements' => '',
            'min' => '',
            'max' => 10,
            'return_format' => 'id',
        ),
        1 => array(
            'key' => 'endpoint',
            'label' => __('Endpoint for Mitt Helsingborg', 'modularity-mypages'),
            'name' => 'mod_mypages_endpoint',
            'type' => 'url',
            'instructions' => __('You can get the endpoint from the Mitt Helsingborg Team.', 'modularity-mypages'),
            'required' => 1,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'placeholder' => '',
        ),
        2 => array(
            'key' => 'apikey',
            'label' => __('Apikey for Mitt Helsingborg', 'modularity-mypages'),
            'name' => 'mod_mypages_apikey',
            'type' => 'text',
            'instructions' => __('You can get the endpoint from the Mitt Helsingborg Team.', 'modularity-mypages'),
            'required' => 1,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'placeholder' => '',
        ),
        3 => array(
            'key' => 'session_cookie',
            'label' => __('Session cookie name for Mitt Helsingborg', 'modularity-mypages'),
            'name' => 'mod_mypages_session_cookie',
            'type' => 'text',
            'instructions' => __('You can get the cookie name from the Mitt Helsingborg Team.', 'modularity-mypages'),
            'required' => 1,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'placeholder' => '',
        ),
    ),
    'location' => array(
        0 => array(
            0 => array(
                'param' => 'options_page',
                'operator' => '==',
                'value' => 'modularity-mypages-settings',
            ),
        ),
    ),
    'menu_order' => 0,
    'position' => 'normal',
    'style' => 'default',
    'label_placement' => 'top',
    'instruction_placement' => 'label',
    'hide_on_screen' => '',
    'active' => true,
    'description' => '',
));

}