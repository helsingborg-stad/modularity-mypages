<?php

namespace ModularityMyPages\Helper;

class PageCache
{
     /**
     * Bypass cache
     *
     * @return void
     */
    public static function bypass() //: void
    {
        $headers = wp_get_nocache_headers();
        if (!empty($headers) && is_array($headers)) {

            //Add custom header, to inidcate what's
            //bypassing the cache
            $headers = array_merge($headers, [
                'X-MyPages-Bypass-Cache' => 'true'
            ]);

            foreach ($headers as $header => $value) {
                header($header . ": " . $value);
            }
        }
    }
}
