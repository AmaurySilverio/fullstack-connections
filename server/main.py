from flask import Flask, request, jsonify
from flask_cors import CORS
# from flask_sqlalchemy import SQLAlchemy
from flask_pymongo import PyMongo
from pymongo import MongoClient
import json
import os
from dotenv import load_dotenv
from bson.objectid import ObjectId

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)
cors = CORS(app, origins='*')
# cors = CORS(app, origins=os.getenv('CORS_ORIGINS', '*'))


# Determine the environment
# env = os.getenv('FLASK_ENV', 'development')

# if env == 'production':
#     # Allow only specific origins in production
#     cors = CORS(app, origins=['https://example.com', 'https://www.example.com'],
                # "methods": ["GET", "POST"],
                # "allow_headers": ["Content-Type"])
# else:
#     # Allow all origins in development
#     cors = CORS(app, origins='*')

# Set up the database URI. This example uses PostgreSQL.
# app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
mongo_uri = os.getenv('MONGO_URI')
print("MONGO_URI:", mongo_uri)  # Debug print

try:
    client = MongoClient(mongo_uri)
    db = client["connection-games"]  # Specify your database name
    print("Database instance:", db)  # Debug print
    # Check if a collection exists to verify the connection
    collections = db.list_collection_names()
    print("Collections:", collections)
except Exception as e:
    print("Error connecting to MongoDB:", e)

# Disable modification tracking (saves resources).
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Initialize the SQLAlchemy object with the app.
# db = SQLAlchemy(app)

# Model for the titles.
class Title:
    def __init__(self, title, author):
        self.title = title
        self.author = author

    @staticmethod
    def from_dict(data):
        return Title(data['title'], data['author'])

    def to_dict(self):
        return {
            'title': self.title,
            'author': self.author
        }

# Model for the cards.
class Card:
    def __init__(self, title_id, name, category, difficulty):
        self.title_id = title_id
        self.name = name
        self.category = category
        self.difficulty = difficulty

    @staticmethod
    def from_dict(data):
        return Card(data['title_id'], data['name'], data['category'], data['difficulty'])

    def to_dict(self):
        return {
            'title_id': self.title_id,
            'name': self.name,
            'category': self.category,
            'difficulty': self.difficulty
        }
 
@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/api/cards', methods=['POST'])
def create_game():
    if request.is_json:
        data = request.get_json()
        title = data.get('title')
        author = data.get('author')
        if not title or not author:
            return jsonify({"error": "'title' and 'author' fields are required"}), 400

        new_title = Title(title=title, author=author)
        title_id = db.titles.insert_one(new_title.to_dict()).inserted_id

        # Check if cards are provided
        cards = data.get('cards', [])
        for card_data in cards:
            name = card_data.get('name')
            category = card_data.get('category')
            difficulty = card_data.get('difficulty')

            if not name or not category or not difficulty:
                return jsonify({"error": "'name', 'category', and 'difficulty' fields are required for each connection"}), 400

            new_card = Card(title_id=title_id, name=name, category=category, difficulty=difficulty)
            db.cards.insert_one(new_card.to_dict())

        saved_title = db.titles.find_one({"_id": ObjectId(title_id)})

        return jsonify({"message": "Title and cards created successfully", "id": str(saved_title['_id'])}), 201
    else:
        return jsonify({"error": "Request must be JSON"}), 400

@app.route('/api/cards', methods=['GET'])
def get_title():
    titles = db.titles.find()
    result = []
    for title in titles:
        title_data = {
            'id': str(title['_id']),
            'title': title['title'],
            'author': title['author'],
            'cards': []
        }
        cards = db.cards.find({'title_id': title['_id']})
        for card in cards:
            card_data = {
                'id': str(card['_id']),
                'title_id': str(card['title_id']),
                'name': card['name'],
                'category': card['category'],
                'difficulty': card['difficulty']
            }
            title_data['cards'].append(card_data)
        result.append(title_data)
    return jsonify(result), 200

@app.route('/api/cards/<string:title_id>', methods=['GET'])
def get_game(title_id):
    title = db.titles.find_one({"_id": ObjectId(title_id)})
    if not title:
        return jsonify({"error": "Title not found"}), 404

    title_data = {
        'id': str(title['_id']),
        'title': title['title'],
        'author': title['author'],
        'cards': []
    }
    cards = db.cards.find({'title_id': ObjectId(title_id)})
    for card in cards:
        card_data = {
            'id': str(card['_id']),
            'name': card['name'],
            'category': card['category'],
            'difficulty': card['difficulty']
        }
        title_data['cards'].append(card_data)
    return jsonify(title_data), 200

@app.route('/api/cards/<string:title_id>', methods=['DELETE'])
def delete_game(title_id):
    title = db.titles.find_one({"_id": ObjectId(title_id)})
    
    if not title:
        return jsonify({"error": "Title not found"}), 404

    db.cards.delete_many({'title_id': ObjectId(title_id)})
    db.titles.delete_one({"_id": ObjectId(title_id)})
    
    return jsonify({"message": "Title and associated cards deleted successfully"}), 200

if __name__ == "__main__":
    app.run(debug=False, port=8000) 