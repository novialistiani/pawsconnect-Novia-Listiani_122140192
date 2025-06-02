from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import HTTPBadRequest, HTTPNotFound
from sqlalchemy.exc import DBAPIError
from ..models import Cat, User
from ..models.meta import DBSession


@view_config(route_name='profile_added_cats', renderer='json', request_method='GET')
def get_added_cats(request):
    user_email = request.params.get('email')
    if not user_email:
        return HTTPBadRequest(json_body={'error': 'Email is required'})

    try:
        user = DBSession.query(User).filter_by(email=user_email).first()
        if not user:
            return HTTPNotFound(json_body={'error': 'User not found'})

        added_cats = [
            {
                'id': cat.id,
                'name': cat.name,
                'age': cat.age,
                'breed': cat.breed,
            } for cat in user.added_cats
        ]
        return {'added_cats': added_cats}
    except DBAPIError:
        return Response(json_body={'error': 'Database error'}, status=500)


@view_config(route_name='profile_liked_cats', renderer='json', request_method='GET')
def get_liked_cats(request):
    user_email = request.params.get('email')
    if not user_email:
        return HTTPBadRequest(json_body={'error': 'Email is required'})

    try:
        user = DBSession.query(User).filter_by(email=user_email).first()
        if not user:
            return HTTPNotFound(json_body={'error': 'User not found'})

        liked_cats = [
            {
                'id': cat.id,
                'name': cat.name,
                'age': cat.age,
                'breed': cat.breed,
            } for cat in user.liked_cats
        ]
        return {'liked_cats': liked_cats}
    except DBAPIError:
        return Response(json_body={'error': 'Database error'}, status=500)


@view_config(route_name='delete_cat', renderer='json', request_method='DELETE')
def delete_cat(request):
    cat_id = request.matchdict.get('id')
    if not cat_id:
        return HTTPBadRequest(json_body={'error': 'Cat ID is required'})

    try:
        cat = DBSession.query(Cat).filter_by(id=cat_id).first()
        if not cat:
            return HTTPNotFound(json_body={'error': 'Cat not found'})

        DBSession.delete(cat)
        DBSession.flush()
        return {'message': 'Cat deleted successfully'}
    except DBAPIError:
        return Response(json_body={'error': 'Database error'}, status=500)
