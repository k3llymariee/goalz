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

1. Clone this repo 👯‍♀️
```$ git clone https://github.com/k3llymariee/hackbright-take-home.git```

2. Create & activate a virtual environment 🤖 
```virtualenv venv```
```source venv/bin/activate```

3. Install dependencies 🖇️
```pip3 install -r requirements.txt```

4. Create a database `goals` 💫
```createdb goals```

5. Create the DB tables 💾
```python3 -i model.py```
```>>> db.create_all()```

6. Run the app from the command line 💻
```python3 server.py```

7. You can now navigate to 'localhost:5000/' to access GOALZ 🎉