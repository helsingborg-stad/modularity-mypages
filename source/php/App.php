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

        add_action('init', function() {
            add_rewrite_endpoint('auth', EP_ROOT);
        });

        add_action('template_redirect', function() {
            global $wp;  
            $current_url = home_url(add_query_arg(array($_GET), $wp->request));
            $parsedUrl = parse_url($current_url);
            if($parsedUrl['path'] == '/auth') {
                parse_str($parsedUrl['query'], $params);
                $sessionId = $params['ts_session_id'];
                echo '<script>console.log("query: ' ,  $sessionId , ' ")</script>';
                
                $url = 'https://e0rmbakcci.execute-api.eu-north-1.amazonaws.com/dev/auth/session';

                $data = (object) [
                    'sessionId' => $sessionId,
                ];
 
                $additional_headers = array(                                                                          
                    'Accept: application/json',
                    'x-api-key: XV1z4BJs9p8b6GliroylfQfDtsKPZuB6XItJwq5b',
                    'Content-Type: application/json'
                );

                $ch = curl_init($url);        

                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
                curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));                                                                  
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                      
                curl_setopt($ch, CURLOPT_HTTPHEADER, $additional_headers); 

                $server_output = curl_exec ($ch);

                echo  $server_output;

                http_response_code(302);
                header('Location: http://localhost:8888/mina-sidor');
                setcookie('session', json_encode($server_output));
            }
        });
    }

    /**
     * Style - Register & adding css
     * @return void
     */
    public function style()
    {

        return; // Deactivate style

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
            foreach (['Profile', 'Welcome', 'Service', 'Tasks'] as $module) {
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
