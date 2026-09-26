// 今日の日付を表示
const today = new Date();

const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();

document.getElementById("today").textContent =
    year + "年" + month + "月" + day + "日";


// 保存されている予定を読み込む
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// 画面に予定を表示
function displayTasks() {

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach(function(taskData, index) {

        // タスク本体
        const task = document.createElement("div");

        task.className = "task " + taskData.status;


        // タスク名
        const text = document.createElement("span");

        text.textContent = taskData.text;


        // ボタンを入れる場所
        const buttons = document.createElement("div");

        buttons.className = "task-buttons";


        // できたボタン
        const doneButton = document.createElement("button");

        doneButton.textContent = "できた";

        doneButton.onclick = function() {

            tasks[index].status = "green";

            saveTasks();

            displayTasks();
        };


        // できなかったボタン
        const failedButton = document.createElement("button");

        failedButton.textContent = "できなかった";

        failedButton.onclick = function() {

            tasks[index].status = "red";

            saveTasks();

            displayTasks();
        };


        // 削除ボタン
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "削除";

        deleteButton.onclick = function() {

            tasks.splice(index, 1);

            saveTasks();

            displayTasks();
        };


        // ボタンを画面に追加
        buttons.appendChild(doneButton);

        buttons.appendChild(failedButton);

        buttons.appendChild(deleteButton);


        // タスクに文字とボタンを追加
        task.appendChild(text);

        task.appendChild(buttons);


        // タスク一覧に追加
        taskList.appendChild(task);
    });
}


// 予定を追加する
function addTask() {

    const input = document.getElementById("taskInput");

    const taskText = input.value.trim();


    // 空欄なら追加しない
    if (taskText === "") {

        return;
    }


    // 新しい予定を追加
    tasks.push({

        text: taskText,

        status: "green"

    });


    // 保存
    saveTasks();


    // 画面を更新
    displayTasks();


    // 入力欄を空にする
    input.value = "";
}


// 予定を保存する
function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}


// アプリを開いたときに予定を表示
displayTasks();