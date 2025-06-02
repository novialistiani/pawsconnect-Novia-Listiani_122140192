from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy.exc import NoResultFound
from ..models.cat import Cat

@view_config(route_name='delete_cat', request_method='DELETE', renderer='json')
def delete_cat_view(request):
    cat_id = request.matchdict.get('id')
    try:
        cat = request.dbsession.query(Cat).filter(Cat.id == int(cat_id)).one()
        request.dbsession.delete(cat)
        request.dbsession.flush()
        return {"message": "Cat deleted successfully."}
    except NoResultFound:
        request.response.status = 404
        return {"error": "Cat not found."}
    except Exception as e:
        request.response.status = 500
        return {"error": str(e)}
