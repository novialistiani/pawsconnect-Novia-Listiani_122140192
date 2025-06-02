from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from .meta import Base
import datetime

class Adoption(Base):
    __tablename__ = 'adoptions'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    cat_id = Column(Integer, ForeignKey('cats.id'), nullable=False)
    reason = Column(String(255))
    date_requested = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship('User', back_populates='adoptions')
    cat = relationship('Cat', back_populates='adoptions')
