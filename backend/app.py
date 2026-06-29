from flask import Flask, jsonify, request
from flask_cors import CORS
from database import get_db, init_db

app = Flask(__name__)
CORS(app)

init_db()

@app.route('/api/ping')
def ping():
    return jsonify({'status': 'ok', 'message': 'radiocalico Flask API'})

@app.route('/api/ping-db')
def ping_db():
    db = get_db()
    row = db.execute('SELECT sqlite_version() AS version').fetchone()
    return jsonify({'sqlite_version': row['version']})

@app.route('/api/users', methods=['GET'])
def get_users():
    db = get_db()
    rows = db.execute('SELECT id, name, email FROM users').fetchall()
    return jsonify([dict(r) for r in rows])

@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()
    name = (data.get('name') or '').strip()
    email = (data.get('email') or '').strip()

    if not name or not email:
        return jsonify({'error': 'name and email are required'}), 400

    db = get_db()
    try:
        cur = db.execute('INSERT INTO users (name, email) VALUES (?, ?)', (name, email))
        db.commit()
        return jsonify({'id': cur.lastrowid, 'name': name, 'email': email}), 201
    except Exception:
        return jsonify({'error': 'email already exists'}), 409

if __name__ == '__main__':
    app.run(debug=True, port=5000, use_reloader=False)
