from flask import Flask, render_template

# Create the application instance
app = Flask(__name__)

# Create a URL route mainpage
@app.route('/')
def home():
    """
    This function responds to the browser ULR localhost:5000/

    :return:        the rendered template 'home.html'
    """
    return render_template('home.html')

# If we're running in stand alone mode, run the application
if __name__ == '__main__':
    # Remove debug for demo
    app.debug = True
    app.run(host='0.0.0.0')