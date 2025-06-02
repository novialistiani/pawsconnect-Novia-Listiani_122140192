from pyramid.view import view_config
from pyramid.response import Response
from pyramid.security import authenticated_userid
from sqlalchemy.exc import DBAPIError
from ..models.cat import Cat
from ..models.user import User
from ..models import DBSession
import json

@view_config(route_name='add_cat', request_method='POST', renderer='json', permission='authenticated')
def add_cat(request):
    user_id = authenticated_userid(request)
    if not user_id:
        return Response(json.dumps({'error': 'Unauthorized'}), status=401)
    
    try:
        data = request.json_body
        name = data.get('name')
        age = data.get('age')
        breed = data.get('breed')
        description = data.get('description')
        image_url = data.get('image_url')

        if not name or not image_url:
            return {'error': 'Name and image_url are required.'}
        
        cat = Cat(
            name=name,
            age=age,
            breed=breed,
            description=description,
            image_url=image_url,
            owner_id=user_id
        )
        DBSession.add(cat)
        DBSession.flush()  # supaya dapat id langsung

        return {'success': True, 'cat_id': cat.id}

    except Exception as e:
        return {'error': str(e)}

@view_config(route_name='delete_cat', request_method='DELETE', renderer='json', permission='authenticated')
def delete_cat(request):
    user_id = authenticated_userid(request)
    if not user_id:
        return Response(json.dumps({'error': 'Unauthorized'}), status=401)

    try:
        cat_id = int(request.matchdict.get('cat_id'))
        cat = DBSession.query(Cat).filter_by(id=cat_id, owner_id=user_id).first()
        if not cat:
            return {'error': 'Cat not found or not authorized.'}
        
        DBSession.delete(cat)
        return {'success': True, 'message': 'Cat deleted.'}
    except Exception as e:
        return {'error': str(e)}
