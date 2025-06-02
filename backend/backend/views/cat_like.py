from pyramid.view import view_config
from pyramid.response import Response
from pyramid.security import authenticated_userid
from sqlalchemy.exc import DBAPIError
from ..models.cat import Cat, CatLike
from ..models import DBSession
import json

@view_config(route_name='like_cat', request_method='POST', renderer='json', permission='authenticated')
def like_cat(request):
    user_id = authenticated_userid(request)
    if not user_id:
        return Response(json.dumps({'error': 'Unauthorized'}), status=401)
    
    try:
        data = request.json_body
        cat_id = data.get('cat_id')
        if not cat_id:
            return {'error': 'cat_id is required'}
        
        # cek kucing ada gak
        cat = DBSession.query(Cat).filter_by(id=cat_id).first()
        if not cat:
            return {'error': 'Cat not found'}
        
        # cek apakah user sudah like kucing ini
        like = DBSession.query(CatLike).filter_by(cat_id=cat_id, user_id=user_id).first()
        if like:
            # unlike
            DBSession.delete(like)
            return {'success': True, 'liked': False}
        else:
            # like
            new_like = CatLike(cat_id=cat_id, user_id=user_id)
            DBSession.add(new_like)
            return {'success': True, 'liked': True}

    except Exception as e:
        return {'error': str(e)}
