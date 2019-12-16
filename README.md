# GOALZ

## Summary
**GOALZ** is a simple, (mostly) single page webapp that allows users to create, update, read, and delete goals they've added to a database. 

## Technologies

Python, Flask, SQLAlchemy, Jinja2, HTML, Javascript, JQuery, AJAX, JSON

## Installation

#### Requirements:
- PostgreSQL
- Python 3.6.8

To get this up & running on your local computer, please follow the steps below:

1. Clone this repo 👯‍♀️ <br>
```$ git clone https://github.com/k3llymariee/hackbright-take-home.git```

2. Create & activate a virtual environment 🤖 <br>
```$ virtualenv venv``` <br>
```$ source venv/bin/activate```

3. Install dependencies 🖇️ <br>
```$ pip3 install -r requirements.txt```

4. Create a database `goals` 💫<br>
```$ createdb goals```

5. Create the DB tables 💾<br>
```$ python3 -i model.py```<br>
```>>> db.create_all()```

6. Run the app from the command line 💻<br>
```$ python3 server.py```

7. You can now navigate to `localhost:5000/` to access GOALZ 🎉