from pyramid.config import Configurator


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    with Configurator(settings=settings) as config:
        config.include('pyramid_jinja2')
        config.include('.routes')
        config.include('.models')
        config.scan()
        config.add_route('cats', '/api/cats')
        config.add_route('cats_like', '/api/cats/like')
        config.add_route('profile_cats', '/api/profile/cats')
        config.add_route('add_cat', '/cats/add')
        config.add_route('delete_cat', '/cats/delete/{cat_id}')
        config.add_route('like_cat', '/cats/like')
        config.add_route('added_cats', '/api/added-cats')
        config.add_route('liked_cats', '/api/liked-cats')
        config.add_route('like_cat', '/api/cats/{cat_id}/like')
        config.add_route('delete_cat', '/api/cats/{cat_id}')
        config.add_route('delete_cat', '/cats/{cat_id}')
        config.add_route('delete_cat', '/api/cats/{id}')
        





    return config.make_wsgi_app()
