<?php

namespace ModularityMyPages;

/**
 * Class ModularityMyPages
 * @package ModularityMyPages
 */
class ProtectedPages
{
    private $authenticationCookieName   = 'myPagesAuthenticated';
    private $protectedPostIDs           = null; //Cache

    public function __construct()
    {
        add_action('template_redirect', array($this, 'templateRedirect'));
    }

    /**
     * Redirect to main page, if authentication is required on id.
     * Check auth.
     *
     * @return void
     */
    public function templateRedirect() //: void
    {
        if (in_array((int) get_queried_object_id(), $this->protectedPostIDs())) {
            $this->bypassCache();
            if (!$this->isAuthenticated()) {
                wp_redirect(home_url('/?signedOut=true'));
                die;
            }
        }
    }

    /**
     * Bypass cache
     *
     * @return void
     */
    public function bypassCache() //: void
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

    /**
     * Get array of protected post ids.
     *
     * @return array
     */
    private function protectedPostIDs(): array
    {
        if (!is_null($this->protectedPostIDs)) {
            return $this->protectedPostIDs;
        }

        return $this->protectedPostIDs = (array) get_field(
            'mypages_protected_post_ids',
            'option'
        );
    }

    /**
     * Check and validate authentication token.
     *
     * @return boolean
     */
    private function isAuthenticated(): bool
    {
        if (isset($_COOKIE[$this->authenticationCookieName])) {
            return $this->authTokenIsValid(
                $_COOKIE[$this->authenticationCookieName]
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
    private function authTokenIsValid(string $token): bool
    {
        return true;
    }
}
