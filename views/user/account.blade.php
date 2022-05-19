<?php
use ModularityMyPages\Helper\Settings;
echo '<div data-mypages-login data-endpoint="', Settings::getEndpoint() ,'" data-apikey="', Settings::getApikey() ,'" data-session-cookie="', Settings::getSessionCookie() ,'"></div>';