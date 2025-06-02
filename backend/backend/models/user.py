from sqlalchemy import Column, Integer, String
from .meta import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    liked_cats = relationship('Cat', secondary='user_liked_cat', back_populates='liked_by')
    added_cats = relationship('Cat', back_populates='owner')
