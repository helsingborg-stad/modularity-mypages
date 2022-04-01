<div class="u-margin__left--2">
  @includeWhen(isset($_GET['authenticated']), 'user.state.authenticated')
  @includeWhen(!isset($_GET['authenticated']), 'user.state.unanthenticated')
</div>