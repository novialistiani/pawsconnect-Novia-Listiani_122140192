from sqlalchemy import (
    Column,
    Integer,
    Text,
    String,
    ForeignKey,
)
from sqlalchemy.orm import relationship
from .meta import Base

class Cat(Base):
    __tablename__ = 'cats'
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    breed = Column(String(100))
    age = Column(Integer)
    description = Column(Text)
    image = Column(String(255))  # Path ke gambar

    adoptions = relationship("Adoption", back_populates="cat")

class Adoption(Base):
    __tablename__ = 'adoptions'
    id = Column(Integer, primary_key=True)
    full_name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    phone = Column(String(20))
    reason = Column(Text)
    cat_id = Column(Integer, ForeignKey('cats.id'))

    cat = relationship("Cat", back_populates="adoptions")
