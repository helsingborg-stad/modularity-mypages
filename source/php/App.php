<?php

namespace ModularityMyPages;

use ModularityMyPages\Helper\CacheBust;

class App
{
    public function __construct()
    {

        //Init admin 
        new Admin\Settings();

        //Init frontend
        new ProtectedPages();
        new ComponentsApi();
        new ComponentsJs();

        //Register module
        add_action('plugins_loaded', array($this, 'registerModule'));

        // Add view paths
        add_filter('Municipio/blade/view_paths', array($this, 'addViewPaths'), 1, 1);

        // Load global scripts / styles
        add_action('wp_enqueue_scripts', array($this, 'script'));
        add_action('wp_enqueue_scripts', array($this, 'style'));
    }

    /**
     * Style - Register & adding css
     * @return void
     */
    public function style()
    {

        //Register custom css
        wp_register_style(
            'modularity-mypages',
            MODULARITY_MY_PAGES_URL . '/dist/' . CacheBust::name('css/modularity-mypages.css'),
            null,
            '1.0.0'
        );

        //Enqueue
        wp_enqueue_style('modularity-mypages');
    }

    /**
     * Script - Register & adding scripts
     * @return void
     */
    public function script()
    {
        //Register custom css
        wp_register_script(
            'modularity-mypages',
            MODULARITY_MY_PAGES_URL . '/dist/' . CacheBust::name('js/modularity-mypages.js'),
            null,
            '1.0.0'
        );

        wp_localize_script(
            'modularity-mypages',
            'myPagesLang',
            [
                'bankIdLogin' => __('BankID login', 'modularity-mypages'),
                'bankIdThisDevice' => __('Login on this device', 'modularity-mypages'),
            ]
        );

        //Enqueue
        wp_enqueue_script('modularity-mypages');
    }

    /**
     * Register the module
     * @return void
     */
    public function registerModule()
    {
        if (function_exists('modularity_register_module')) {
            foreach (['Profile', 'Service', 'Tasks'] as $module) {
                modularity_register_module(
                    MODULARITY_MY_PAGES_MODULE_PATH . "/" . $module,
                    $module
                );
            }
        }
    }

    /**
     * Add searchable blade template paths
     * @param array  $array Template paths
     * @return array        Modified template paths
     */
    public function addViewPaths($array)
    {
        // If child theme is active, insert plugin view path after child views path.
        if (is_child_theme()) {
            array_splice($array, 2, 0, array(MODULARITY_MY_PAGES_VIEW_PATH));
        } else {
            // Add view path first in the list if child theme is not active.
            array_unshift($array, MODULARITY_MY_PAGES_VIEW_PATH);
        }

        return $array;
    }
}
