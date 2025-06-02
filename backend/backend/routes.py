def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    config.add_route('like_cat', '/cats/{id}/like')
    config.add_route('get_liked_cats', '/users/{email}/liked')
    config.add_route('get_added_cats', '/users/{email}/added')
    config.add_route('delete_cat', '/cats/{id}')

