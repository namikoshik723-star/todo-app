let currentDate = new Date();


// 日付を保存用の形にする
function getDateKey(date) {

    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    return year + "-" + month + "-" + day;
}


// 日付を表示
function displayDate() {

    const year = currentDate.getFullYear();

    const month = currentDate.getMonth() + 1;

    const day = currentDate.getDate();

    document.getElementById("today").textContent =
        year + "年" + month + "月" + day + "日";

    displayTasks();
}


// 今日に戻る
function goToday() {

    currentDate = new Date();

    displayDate();
}


// 前の日・次の日
function changeDate(days) {

    currentDate.setDate(
        currentDate.getDate() + days
    );

    displayDate();
}


// 今の日付の予定を取得
function getTasks() {

    const key = getDateKey(currentDate);

    const data =
        localStorage.getItem("tasks_" + key);

    return data ? JSON.parse(data) : [];
}


// 今の日付の予定を保存
function saveTasks(tasks) {

    const key = getDateKey(currentDate);

    localStorage.setItem(
        "tasks_" + key,
        JSON.stringify(tasks)
    );
}


// 予定を表示
function displayTasks() {

    const taskList =
        document.getElementById("taskList");

    taskList.innerHTML = "";

    const tasks = getTasks();


    tasks.forEach(function(taskData, index) {

        const task =
            document.createElement("div");

        task.className =
            "task " + taskData.status;


        // 予定の文字
        const text =
            document.createElement("span");

        text.textContent =
            taskData.text;


        task.appendChild(text);


        // =========================
        // 長押ししたときだけ出る部分
        // =========================

        const buttons =
            document.createElement("div");

        buttons.className =
            "task-buttons";


        // できた
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


        // できなかった
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


        // 削除
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


        buttons.appendChild(doneButton);

        buttons.appendChild(failedButton);

        buttons.appendChild(deleteButton);

        task.appendChild(buttons);


        // =========================
        // 長押し
        // =========================

        let timer;


        // スマホで長押し
        task.addEventListener(
            "touchstart",
            function(event) {

                event.preventDefault();

                timer = setTimeout(function() {

                    task.classList.add(
                        "show-buttons"
                    );

                }, 600);
            },
            { passive: false }
        );


        task.addEventListener(
            "touchend",
            function() {

                clearTimeout(timer);

            }
        );


        task.addEventListener(
            "touchmove",
            function() {

                clearTimeout(timer);

            }
        );


        // パソコンで長押し
        task.addEventListener(
            "mousedown",
            function() {

                timer = setTimeout(function() {

                    task.classList.add(
                        "show-buttons"
                    );

                }, 600);

            }
        );


        task.addEventListener(
            "mouseup",
            function() {

                clearTimeout(timer);

            }
        );


        task.addEventListener(
            "mouseleave",
            function() {

                clearTimeout(timer);

            }
        );


        taskList.appendChild(task);

    });
}


// 予定を追加
function addTask() {

    const input =
        document.getElementById("taskInput");

    const text =
        input.value.trim();


    if (text === "") {

        return;

    }


    const tasks = getTasks();


    tasks.push({

        text: text,

        status: "yellow"

    });


    saveTasks(tasks);

    displayTasks();


    input.value = "";
}


// 最初に表示
displayDate();
