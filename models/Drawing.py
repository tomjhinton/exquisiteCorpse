from datetime import datetime, timedelta

from pony.orm import Required, Set, Optional
from marshmallow import Schema, fields, post_load, validates_schema, ValidationError
from app import db



class Drawing(db.Entity):
    first = Required(str)
    second = Required(str)
    third = Required(str)



class DrawingSchema(Schema):
    id = fields.Int(dump_only=True)
    first = fields.String(required=True)
    second = fields.String(required=True)
    third = fields.String(required=True)
