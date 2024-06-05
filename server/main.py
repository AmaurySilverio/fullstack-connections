from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import json
import os
from dotenv import load_dotenv

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
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')

# Disable modification tracking (saves resources).
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Initialize the SQLAlchemy object with the app.
db = SQLAlchemy(app)

# client_folder = os.path.join(os.cwd(),"..","client")
# dist_folder = os.path.join(client_folder,"dist")

# react_app
# @app.route("/",defaults={"filename":""})
# @app.route("/<path:filename>")
# def index(filename):
#     if not filename:
#         filename = "index.html"
#     return send_from_directory(dist_folder,filename)
# Model for the titles.
class Title(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    author = db.Column(db.String(80), nullable=True)
    cards = db.relationship('Card', backref='title', lazy=True)

    def __repr__(self):
        return f"<Title {self.title}>"

# Model for the cards.
class Card(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title_id = db.Column(db.Integer, db.ForeignKey('title.id'), nullable=False)
    name = db.Column(db.String(80), nullable=False)
    category = db.Column(db.String(120), nullable=False)
    difficulty = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return f"<Card {self.name}>"

@app.route('/api/cards', methods=['POST'])
def create_game():
    if request.is_json:
        data = request.get_json()
        title = data.get('title')
        author = data.get('author')
        if not title or not author:
            return jsonify({"error": "'title' and 'author' fields are required"}), 400
        
        new_title = Title(title=title, author=author)
        db.session.add(new_title)
        
        # Check if cards are provided
        cards = data.get('cards', [])
        for card_data in cards:
            name = card_data.get('name')
            category = card_data.get('category')
            difficulty = card_data.get('difficulty')
            
            if not name or not category or not difficulty:
                return jsonify({"error": "'name', 'category', and 'difficulty' fields are required for each connection"}), 400
            
            new_card = Card(name=name, category=category, difficulty=difficulty, title=new_title)
            db.session.add(new_card)
        
        db.session.commit()
        saved_title = Title.query.get(new_title.id)

        return jsonify({"message": "Title and cards created successfully", "id": saved_title.id}), 201
    else:
        return jsonify({"error": "Request must be JSON"}), 400

@app.route('/api/cards', methods=['GET'])
def get_title():
    titles = Title.query.all()
    result = []
    for title in titles:
        title_data = {
            'id': title.id,
            'title': title.title,
            'author': title.author,
            'cards': []
        }
        for card in title.cards:
            card_data = {
                'id': card.id,
                'title_id': card.title_id,
                'name': card.name,
                'category': card.category,
                'difficulty': card.difficulty
            }
            title_data['cards'].append(card_data)
        result.append(title_data)
    return jsonify(result), 200

@app.route('/api/cards/<int:title_id>', methods=['GET'])
def get_game(title_id):
    title = Title.query.get_or_404(title_id)
    title_data = {
        'id': title.id,
        'title': title.title,
        'author': title.author,
        'cards': []
    }
    for card in title.cards:
        card_data = {
            'id': card.id,
            'name': card.name,
            'category': card.category,
            'difficulty': card.difficulty
        }
        title_data['cards'].append(card_data)
    return jsonify(title_data), 200

if __name__ == "__main__":
    # Create database tables
    with app.app_context():
        db.create_all()
    app.run(debug=False, port=8000)    