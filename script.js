const input = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

// 保存されている予定を読み込む
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// 画面に表示する
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.textContent = task.text;

        // 完了している場合は緑
        if (task.completed) {
            li.classList.add("completed");
        }

        // クリックで完了・未完了を切り替え
        li.addEventListener("click", function () {
            tasks[index].completed = !tasks[index].completed;

            saveTasks();
            displayTasks();
        });

        taskList.appendChild(li);
    });
}

// 保存する
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 「追加」ボタン
addButton.addEventListener("click", function () {

    const text = input.value.trim();

    if (text === "") {
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks();

    input.value = "";

    displayTasks();
});

// 最初に表示
displayTasks();
