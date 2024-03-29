<?php

namespace ModularityMyPages;

use ModularityMyPages\Helper\PageCache as PageCache;
use ModularityMyPages\Helper\Settings as Settings;

class Authentication {
    public function __construct()
    {
        add_action('template_redirect', array($this, 'execute'), 5);
    }

    public function execute() {
        global $wp;
        $current_url = home_url(add_query_arg(array($_GET), $wp->request));
        $parsedUrl = parse_url($current_url);

        if($parsedUrl['path'] == '/auth') {
            PageCache::bypass();
            parse_str($parsedUrl['query'], $params);
            if($callbackUrl = self::authenticate($params['ts_session_id'], $params['callbackUrl'])) {
                if( is_wp_error( $callbackUrl)) {
                    wp_die($callbackUrl->get_error_message());
                };

                wp_redirect($callbackUrl);
            }
        };
    }

    public static function authenticate($sessionId, $callbackUrl) {
        $payload = (object) [
            'sessionId' => $sessionId,
        ];

        $headers = array(                                                                          
            'Accept: application/json',
            'x-api-key:' . Settings::getApikey(),
            'Content-Type: application/json'
        );

        $request = curl_init(Settings::getEndpoint() . 'auth/session');        

        curl_setopt($request, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
        curl_setopt($request, CURLOPT_POSTFIELDS, json_encode($payload));                                                                  
        curl_setopt($request, CURLOPT_RETURNTRANSFER, true);                                                                      
        curl_setopt($request, CURLOPT_HTTPHEADER, $headers); 

        $response =  json_decode(curl_exec ($request), true);

        if(!setcookie(Settings::getSessionCookie(), $response['data']['sessionToken'], $response['data']['timestamp'], '/')) {
            return new WP_Error( 'mypages', __( "Could not set cookie", "modularity-mypages" ) );
        };

        return $callbackUrl;
    }

    /**
     * Check and validate authentication token.
     *
     * @return boolean
     */
    public static function isAuthenticated(): bool
    {
        return isset($_COOKIE[Settings::getSessionCookie()]);
    }
}
