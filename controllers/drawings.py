from flask import Blueprint, request, jsonify, abort
from pony.orm import db_session
from marshmallow import ValidationError
from app import db
from models.Drawing import Drawing, DrawingSchema


router = Blueprint(__name__, 'drawings')

@router.route('/drawings', methods=['GET'])
@db_session
def index():
    schema = DrawingSchema(many=True)
    drawings = Drawing.select()
    return schema.dumps(drawings)


@router.route('/drawings', methods=['POST'])
@db_session
def create():

    schema = DrawingSchema()

    try:

        data = schema.load(request.get_json())

        drawing = Drawing(**data)

        db.commit()
    except ValidationError as err:

        return jsonify({'message': 'Validation failed', 'errors': err.messages}), 422

    return schema.dumps(drawing), 201


@router.route('/drawings/<int:drawing_id>', methods=['GET'])
@db_session
def show(drawing_id):
    schema = DrawingSchema()
    drawing = Drawing.get(id=drawing_id)

    if not drawing:
        abort(404)

    return schema.dumps(drawing)


@router.route('/drawings/<int:drawing_id>', methods=['PUT'])
@db_session
def update(drawing_id):
    schema = DrawingSchema()
    drawing = Drawing.get(id=drawing_id)

    if not drawing:
        abort(404)

    try:
        data = schema.load(request.get_json())
        drawing.set(**data)
        db.commit()
    except ValidationError as err:
        return jsonify({'message': 'Validation failed', 'errors': err.messages}), 422

    return schema.dumps(drawing)


@router.route('/drawings/<int:drawing_id>', methods=['DELETE'])
@db_session
def delete(drawing_id):
    drawing = Drawing.get(id=drawing_id)

    if not drawing:
        abort(404)

    drawing.delete()
    db.commit()

    return '', 204
