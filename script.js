const input = document.getElementById("taskInput");
const addButton = document.querySelector(".add-button");
const taskList = document.getElementById("taskList");


// =========================
// タスク保存
// =========================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// =========================
// タスク表示
// =========================

function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.textContent = task.text;

        // 完了したら緑
        if (task.completed) {
            li.classList.add("completed");
        }

        // クリックで完了・未完了
        li.addEventListener("click", function () {

            tasks[index].completed = !tasks[index].completed;

            saveTasks();

            displayTasks();

        });

        taskList.appendChild(li);

    });
}


// =========================
// タスク保存
// =========================

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


// =========================
// 追加ボタン
// =========================

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


// =========================
// 日付
// =========================

const todayElement =
    document.getElementById("today");

let currentDate = new Date();


// 日付を表示
function displayDate() {

    const year =
        currentDate.getFullYear();

    const month =
        currentDate.getMonth() + 1;

    const day =
        currentDate.getDate();

    todayElement.textContent =
        `${year}年${month}月${day}日`;

}


// 前の日・次の日
function changeDate(days) {

    currentDate.setDate(
        currentDate.getDate() + days
    );

    displayDate();

}


// 今日に戻る
function goToday() {

    currentDate = new Date();

    displayDate();

}


// =========================
// メモ保存
// =========================

const memo =
    document.getElementById("memo");


// 保存したメモを読み込む
memo.value =
    localStorage.getItem("memo") || "";


// メモを書くたびに保存
memo.addEventListener("input", function () {

    localStorage.setItem(
        "memo",
        memo.value
    );

});


// =========================
// 最初に表示
// =========================

displayTasks();

displayDate();
