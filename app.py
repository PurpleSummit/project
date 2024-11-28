import matplotlib.pyplot as plt
import numpy as np
from flask import Flask, render_template, request, send_file
from io import BytesIO

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/cliff", methods=["GET", "POST"])
def cliff():
    if request.method == "POST":
        height = request.form["height"]
        d_unit = request.form["d_unit"]
        t_unit = request.form["t_unit"]
        try:
            height = float(height)
        except ValueError:
            return "The given value must be a valid number."
        if height <= 0:
            return "The given value must be a positive real number."

        if d_unit == "feet":
            a = 32
        elif d_unit == "meters":
            a = 9.8
        time = ((2 * a * height) ** 0.5) / a
        x = np.linspace(0, time, num=50)
        y = height - x**2 * 0.5 * a
        fig, ax = plt.subplots()
        ax.plot(x, y)

        ax.set(
            xlabel=f"time ({t_unit})",
            ylabel=f"height ({d_unit})",
            title="Course of falling",
        )
        ax.grid()
        img = BytesIO()
        plt.savefig(img, format="png")
        img.seek(0)
        return send_file(img, mimetype="image/png")

    return render_template("cliff.html")


@app.route("/cannon")
def cannon():
    return render_template("cannon.html")
