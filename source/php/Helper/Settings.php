<?php

namespace ModularityMyPages\Helper;

class Settings {
    public static function getEndpoint() {
        return get_field(
            'mod_mypages_endpoint',
            'option'
        );
    }
    public static function getApikey() {
        return get_field(
            'mod_mypages_apikey',
            'option'
        );
    }
    public static function getSessionCookie() {
        return get_field(
            'mod_mypages_session_cookie',
            'option'
        );
    }
}
