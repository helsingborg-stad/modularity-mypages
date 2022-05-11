<?php

namespace ModularityMyPages;

const API_URL = 'https://e0rmbakcci.execute-api.eu-north-1.amazonaws.com/dev/';
const API_KEY = 'XV1z4BJs9p8b6GliroylfQfDtsKPZuB6XItJwq5b';
const AUTH_COOKIE_NAME = 'session';

class SessionHandler {
    public static function login() {
        $callBackUrlParts = parse_url($_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . '/auth');
        parse_str($callBackUrlParts['query'], $params);
        
        if (isset($url_parts['query'])) {
            parse_str($url_parts['query'], $params);
        } else {
            $params = array();
        }

        $params['callbackUrl'] = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . '/mitt-helsingborg/mina-sidor/?authenticated=true';
        $callBackUrlParts['query'] = http_build_query($params);
        $callBackUrl = $callBackUrlParts['scheme'] . '://' . $_SERVER['HTTP_HOST'] . $callBackUrlParts['path'] . '?' . $callBackUrlParts['query'];

        $payload = (object) [
            'callbackUrl' => $callBackUrl,
        ];
        $headers = array(                                                                          
            'Accept: application/json',
            'x-api-key:' . API_KEY,
            'Content-Type: application/json'
        );

        $request = curl_init(API_URL . 'auth/login');        

        curl_setopt($request, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
        curl_setopt($request, CURLOPT_POSTFIELDS, json_encode($payload));                                                                  
        curl_setopt($request, CURLOPT_RETURNTRANSFER, true);                                                                      
        curl_setopt($request, CURLOPT_HTTPHEADER, $headers); 

        $redirectUrl =  json_decode(curl_exec ($request), true)['data']['redirectUrl'];
        
        wp_redirect($redirectUrl);
    }

    public static function authenticate($sessionId, $callbackUrl) {
        $payload = (object) [
            'sessionId' => $sessionId,
        ];

        $headers = array(                                                                          
            'Accept: application/json',
            'x-api-key:' . API_KEY,
            'Content-Type: application/json'
        );

        $request = curl_init(API_URL . 'auth/session');        

        curl_setopt($request, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
        curl_setopt($request, CURLOPT_POSTFIELDS, json_encode($payload));                                                                  
        curl_setopt($request, CURLOPT_RETURNTRANSFER, true);                                                                      
        curl_setopt($request, CURLOPT_HTTPHEADER, $headers); 

        $response =  json_decode(curl_exec ($request), true);

        http_response_code(302);
        header("Location: $callbackUrl");
        setcookie('session', $response['data']['sessionToken'], $response['data']['timestamp'], '', '', true);
    }

    /**
     * Check and validate authentication token.
     *
     * @return boolean
     */
    public static function isAuthenticated(): bool
    {
        if (isset($_COOKIE[AUTH_COOKIE_NAME])) {
            return SessionHandler::authTokenIsValid(
                $_COOKIE[AUTH_COOKIE_NAME]
            );
        }
        return false;
    }

    /**
     * Validate auth token string.
     * TODO: This should validate jwt token.
     *       State: Insecure
     *
     * @param string $token
     * @return boolean
     */
    private static function authTokenIsValid(string $token): bool
    {
        return true;
    }
}
