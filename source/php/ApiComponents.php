<?php

namespace ModularityMyPages;

class ApiComponents
{
    private $restNamespace = 'modularity-mypages/v1';
    private $components = [];
    private $viewPath   = MODULARITY_MY_PAGES_VIEW_PATH . 'js/';

    public function __construct()
    {
        add_action('rest_api_init', array($this, 'registerEndpoint'));
    }

    public function registerEndpoint()
    {
        register_rest_route(
            $this->restNamespace,
            'getComponent',
            array(
                'methods' => ['GET', 'POST'],
                'callback' => array($this, 'render'),
            )
        );
    }

    public function render()
    {
        if (isset($_REQUEST) && !empty($_REQUEST) && is_array($_REQUEST)) {

            foreach ($_REQUEST as $key => $component) {

                if (is_array($component) && !empty($component)) {
                    if (!isset($component['component']) || isset($component['component']) && $component['component'] == '') {
                        return wp_send_json([
                            'error' => true,
                            'message' => 'Component is required for: ' . $key
                        ]);
                    }

                    if (!isset($component['props']) || isset($component['props']) && !is_array($component['props'])) {
                        return wp_send_json([
                            'error' => true,
                            'message' => 'Props is required for: ' . $key
                        ]);
                    }

                    $return[$key] = [
                        'key' => $key,
                        'html' => $this->renderView(
                            'js.api.' . $component['component'],
                            [
                                'props' => (array) $component['props']
                            ]
                        )
                    ];
                }
            }

            return wp_send_json($return);
        }

        return wp_send_json([
            'error' => true,
            'message' => 'Malformed request. Component specification should be a multidomentsional array.'
        ]);
    }

    /**
     * Render blade view
     *
     * @param string  $view       The view path
     * @param array   $data       Data required to render view (default: [])
     * @param boolean $compress   If true, compress the output (default: true)
     * @return string
     */
    private function renderView(string $view, array $data = [], bool $compress = true): string
    {
        if (function_exists('modularity_mypages_render_blade_view')) {
            return modularity_mypages_render_blade_view(
                $this->sanitizeViewPath($view),
                $data,
                $compress
            );
        }

        throw new \RuntimeException('modularity_mypages_render_blade_view() does not exist');
    }

    /**
     * View path sanitizer
     *
     * @param string  $view   The full path
     * @return string $view   The relative path
     */
    private function sanitizeViewPath(string $view): string
    {
        return str_replace(
            ".blade.php",
            "",
            str_replace(MODULARITY_MY_PAGES_VIEW_PATH, "", $view)
        );
    }
}
