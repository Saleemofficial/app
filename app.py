from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

tasks = []

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/tasks", methods=["GET"])
def get_tasks():
    return jsonify(tasks)

@app.route("/tasks", methods=["POST"])
def add_task():
    data = request.get_json()
    task_text = data.get("task", "").strip()

    if task_text:
        tasks.append({"text": task_text, "done": False})

    return jsonify({"message": "Task added successfully", "tasks": tasks})

@app.route("/tasks/<int:index>", methods=["PUT"])
def update_task(index):
    if 0 <= index < len(tasks):
        tasks[index]["done"] = not tasks[index]["done"]
        return jsonify({"message": "Task updated", "tasks": tasks})
    return jsonify({"error": "Task not found"}), 404

@app.route("/tasks/<int:index>", methods=["DELETE"])
def delete_task(index):
    if 0 <= index < len(tasks):
        tasks.pop(index)
        return jsonify({"message": "Task deleted", "tasks": tasks})
    return jsonify({"error": "Task not found"}), 404

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5009)