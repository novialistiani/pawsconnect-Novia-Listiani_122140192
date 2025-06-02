from sqlalchemy import Column, Integer, String, ForeignKey, Table, Text
from sqlalchemy.orm import relationship
from .base import Base

user_liked_cat = Table(
    'user_liked_cat',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id')),
    Column('cat_id', Integer, ForeignKey('cats.id'))
)

class Cat(Base):
    __tablename__ = 'cats'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    age = Column(Integer)
    breed = Column(String)
    description = Column(Text)    # Tambah ini
    image = Column(String)        # Tambah ini

    owner_id = Column(Integer, ForeignKey('users.id'))
    owner = relationship('User', back_populates='added_cats')

    liked_by = relationship('User', secondary=user_liked_cat, back_populates='liked_cats')
