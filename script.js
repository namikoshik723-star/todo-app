// ==============================
// 現在表示している日付
// ==============================

let currentDate = new Date();


// ==============================
// 日付を YYYY-MM-DD にする
// ==============================

function getDateKey(date) {

    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    return year + "-" + month + "-" + day;
}


// ==============================
// 日付を表示する
// ==============================

function displayDate() {

    const year = currentDate.getFullYear();

    const month = currentDate.getMonth() + 1;

    const day = currentDate.getDate();

    document.getElementById("today").textContent =
        year + "年" + month + "月" + day + "日";

    displayTasks();
}


// ==============================
// 今日の日付に戻る
// ==============================

function goToday() {

    currentDate = new Date();

    displayDate();
}


// ==============================
// 前の日・次の日
// ==============================

function changeDate(days) {

    currentDate.setDate(
        currentDate.getDate() + days
    );

    displayDate();
}


// ==============================
// 今見ている日の予定を読み込む
// ==============================

function getTasks() {

    const dateKey = getDateKey(currentDate);

    const savedTasks =
        localStorage.getItem("tasks_" + dateKey);

    return savedTasks
        ? JSON.parse(savedTasks)
        : [];
}


// ==============================
// 今見ている日の予定を保存
// ==============================

function saveTasks(tasks) {

    const dateKey = getDateKey(currentDate);

    localStorage.setItem(
        "tasks_" + dateKey,
        JSON.stringify(tasks)
    );
}


// ==============================
// 予定を表示
// ==============================

function displayTasks() {

    const taskList =
        document.getElementById("taskList");

    taskList.innerHTML = "";

    const tasks = getTasks();


    tasks.forEach(function(taskData, index) {

        // タスク本体
        const task =
            document.createElement("div");

        task.className =
            "task " + taskData.status;


        // タスク名
        const text =
            document.createElement("span");

        text.className = "task-text";

        text.textContent =
            taskData.text;


        // ボタン
        const buttons =
            document.createElement("div");

        buttons.className =
            "task-buttons";


        // ==========================
        // できた
        // ==========================

        const doneButton =
            document.createElement("button");

        doneButton.textContent =
            "できた";

        doneButton.onclick = function(event) {

            event.stopPropagation();

            tasks[index].status =
                "green";

            saveTasks(tasks);

            displayTasks();
        };


        // ==========================
        // できなかった
        // ==========================

        const failedButton =
            document.createElement("button");

        failedButton.textContent =
            "できなかった";

        failedButton.onclick = function(event) {

            event.stopPropagation();

            tasks[index].status =
                "red";

            saveTasks(tasks);

            displayTasks();
        };


        // ==========================
        // 削除
        // ==========================

        const deleteButton =
            document.createElement("button");

        deleteButton.textContent =
            "削除";

        deleteButton.onclick = function(event) {

            event.stopPropagation();

            tasks.splice(index, 1);

            saveTasks(tasks);

            displayTasks();
        };


        // ボタンを追加
        buttons.appendChild(doneButton);

        buttons.appendChild(failedButton);

        buttons.appendChild(deleteButton);


        // タスクに追加
        task.appendChild(text);

        task.appendChild(buttons);


        // ==========================
        // 長押し処理
        // ==========================

        let pressTimer;

        function startPress(event) {

            event.preventDefault();

            pressTimer = setTimeout(function() {

                task.classList.add(
                    "show-buttons"
                );

            }, 600);
        }


        function cancelPress() {

            clearTimeout(pressTimer);
        }


        // スマホ
        task.addEventListener(
            "touchstart",
            startPress,
            { passive: false }
        );

        task.addEventListener(
            "touchend",
            cancelPress
        );

        task.addEventListener(
            "touchmove",
            cancelPress
        );


        // パソコン
        task.addEventListener(
            "mousedown",
            startPress
        );

        task.addEventListener(
            "mouseup",
            cancelPress
        );

        task.addEventListener(
            "mouseleave",
            cancelPress
        );


        // 画面に追加
        taskList.appendChild(task);

    });
}


// ==============================
// 予定を追加
// ==============================

function addTask() {

    const input =
        document.getElementById("taskInput");

    const taskText =
        input.value.trim();


    // 空欄なら何もしない
    if (taskText === "") {

        return;
    }


    const tasks = getTasks();


    // 新しい予定
    tasks.push({

        text: taskText,

        // 最初は未完了
        status: "yellow"

    });


    // 保存
    saveTasks(tasks);


    // 表示
    displayTasks();


    // 入力欄を空にする
    input.value = "";
}


// ==============================
// 最初に表示
// ==============================

displayDate();
