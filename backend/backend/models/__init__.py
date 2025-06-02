from .meta import Base, DBSession
from .adoption import Adoption
from .user import User
from .mymodel import cat  # ganti dengan nama model kucing kalau beda

# Relasi dua arah supaya bisa akses adoptions di User dan Cat
User.adoptions = relationship('Adoption', back_populates='user', cascade='all, delete-orphan')
Cat.adoptions = relationship('Adoption', back_populates='cat', cascade='all, delete-orphan')
