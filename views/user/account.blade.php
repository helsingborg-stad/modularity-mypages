@includeWhen(isset($_GET['authenticated']), 'user.state.authenticated')
@includeWhen(!isset($_GET['authenticated']), 'user.state.unanthenticated')