from jinja2 import StrictUndefined
from flask import Flask, render_template, request, flash, redirect, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from model import *

app = Flask(__name__)

# Required to use Flask sessions and the debug toolbar
app.secret_key = "super-secret"

# raise an error in Jinja2 when using an undefined variable
app.jinja_env.undefined = StrictUndefined

debug = '\n' * 3


@app.route('/')
def index():
    """Defaults user view to today's log entries"""

    return render_template('home.html')


@app.route('/register', methods=['GET'])
def register_form():
    """Show form for user signup"""

    return render_template('login.html')


@app.route('/register', methods=['POST'])
def register_process():
    """Create new user in the database"""

    register_form = request.form 

    if User.query.filter(User.email == register_form['email']).first():
        flash('Email already exists within our userbase')
        return redirect('/register')

    elif register_form['password'] != register_form['confirm_password']:
        flash('Passwords do not match')
        return redirect('/register')

    else:
        new_user = User(email=register_form['email'],
                        password=register_form['password'])
        db.session.add(new_user)
        db.session.commit()
        flash('Added new user')

        session['user_id'] = new_user.id
        flash('Successfully logged in')
        return redirect('/')


@app.route('/login', methods=['POST'])
def process_login():
    """Log a user in if the user is in the database and provides correct password"""

    login_attempt = request.form

    user = User.query.filter(User.email == login_attempt['email']).first()

    # check if a user exists in the database
    if not user:
        flash('Incorrect email or password')
        return redirect("/login")

    # check if their password matches
    elif user.password != login_attempt['password']:
        flash('Incorrect password or email')
        return redirect("/login")

    # if yes to both above, add user_id to session data
    else:
        session['user_id'] = user.id
        flash('Successfully logged in')
        return redirect('/')


@app.route('/logout')
def process_logout():
    """Log a user out by deleting their session variable"""

    del session['user_id']
    flash('Successfully logged out')
    return redirect("/register")


@app.route('/api/goals', methods=['GET'])
def read_goals():
    """Returns a list of goals for the logged in user"""

    user_id = session['user_id']
    goal_query = Goal.query.filter(Goal.user_id == user_id).all()

    goals = []
    for goal in goal_query:
        goals.append({'goal_id': goal.id, 'description': goal.description})

    print('\n\n\n\n')
    print('GOALS', goals)

    return jsonify(goals)


@app.route('/api/goals', methods=['POST'])
def add_goal():
    """Adds a new goal to the database for the logged in user"""

    user_id = session['user_id']
    description = request.form.get('goal_description')

    new_goal = Goal(user_id=user_id, description=description)
    db.session.add(new_goal)
    db.session.commit()

    return "New goal has been added!"


if __name__ == '__main__':

    # Remove debug for demo
    app.debug = True


    connect_to_db(app)

    # Use the DebugToolbar
    DebugToolbarExtension(app)

    app.run(host='0.0.0.0')