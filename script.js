// =========================
// 現在の日付
// =========================

let currentDate = new Date();


// =========================
// 日付を保存用の文字にする
// 例：2026-09-29
// =========================

function getDateKey(date) {

    const year = date.getFullYear();

    const month = String(
        date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


// =========================
// 日付を画面に表示
// =========================

function displayDate() {

    const year = currentDate.getFullYear();

    const month = currentDate.getMonth() + 1;

    const day = currentDate.getDate();

    document.getElementById("today").textContent =
        `${year}年${month}月${day}日`;

    displayTasks();

    displayMemo();
}


// =========================
// 今日に戻る
// =========================

function goToday() {

    currentDate = new Date();

    displayDate();
}


// =========================
// 日付を前後に移動
// =========================

function changeDate(days) {

    currentDate.setDate(
        currentDate.getDate() + days
    );

    displayDate();
}


// =========================
// タスクを取得
// =========================

function getTasks() {

    const key =
        "tasks_" + getDateKey(currentDate);

    const saved =
        localStorage.getItem(key);

    if (saved) {

        return JSON.parse(saved);

    }

    return [];
}


// =========================
// タスクを保存
// =========================

function saveTasks(tasks) {

    const key =
        "tasks_" + getDateKey(currentDate);

    localStorage.setItem(
        key,
        JSON.stringify(tasks)
    );
}


// =========================
// タスクを表示
// =========================

function displayTasks() {

    const taskList =
        document.getElementById("taskList");

    taskList.innerHTML = "";

    const tasks = getTasks();


    tasks.forEach((task, index) => {

        const taskDiv =
            document.createElement("div");

        taskDiv.className =
            "task " + task.status;


        // =========================
        // タスク文字
        // =========================

        const taskText =
            document.createElement("div");

        taskText.textContent =
            task.text;

        taskDiv.appendChild(taskText);


        // =========================
        // 操作ボタン
        // =========================

        const actions =
            document.createElement("div");

        actions.className =
            "task-actions";


        // できたボタン

        const doneButton =
            document.createElement("button");

        doneButton.textContent =
            "できた";

        doneButton.onclick = function () {

            tasks[index].status =
                "green";

            saveTasks(tasks);

            displayTasks();
        };


        // できなかったボタン

        const failedButton =
            document.createElement("button");

        failedButton.textContent =
            "できなかった";

        failedButton.onclick = function () {

            tasks[index].status =
                "red";

            saveTasks(tasks);

            displayTasks();
        };


        // 削除ボタン

        const deleteButton =
            document.createElement("button");

        deleteButton.textContent =
            "削除";

        deleteButton.onclick = function () {

            tasks.splice(index, 1);

            saveTasks(tasks);

            displayTasks();
        };


        actions.appendChild(doneButton);

        actions.appendChild(failedButton);

        actions.appendChild(deleteButton);

        taskDiv.appendChild(actions);


        // =========================
        // 長押し
        // =========================

        let pressTimer = null;

        let longPressed = false;


        taskDiv.addEventListener(
            "pointerdown",
            function () {

                longPressed = false;

                pressTimer = setTimeout(
                    function () {

                        longPressed = true;

                        actions.style.display =
                            actions.style.display === "flex"
                                ? "none"
                                : "flex";

                    },
                    600
                );

            }
        );


        taskDiv.addEventListener(
            "pointerup",
            function () {

                clearTimeout(pressTimer);

            }
        );


        taskDiv.addEventListener(
            "pointercancel",
            function () {

                clearTimeout(pressTimer);

            }
        );


        taskDiv.addEventListener(
            "pointerleave",
            function () {

                clearTimeout(pressTimer);

            }
        );


        // 最初は操作ボタンを隠す

        actions.style.display = "none";


        taskList.appendChild(taskDiv);

    });
}


// =========================
// タスク追加
// =========================

function addTask() {

    const input =
        document.getElementById("taskInput");

    const text =
        input.value.trim();


    if (text === "") {

        return;
    }


    const tasks =
        getTasks();


    tasks.push({

        text: text,

        status: "yellow"

    });


    saveTasks(tasks);


    input.value = "";


    displayTasks();
}


// =========================
// Enterキーでも追加
// =========================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const input =
            document.getElementById("taskInput");


        if (input) {

            input.addEventListener(
                "keydown",
                function (event) {

                    if (event.key === "Enter") {

                        addTask();

                    }

                }
            );

        }

    }
);


// =========================
// メニューを開く・閉じる
// =========================

function toggleMenu() {

    const menu =
        document.getElementById("sideMenu");

    const overlay =
        document.getElementById("menuOverlay");


    menu.classList.toggle("open");

    overlay.classList.toggle("open");
}


// =========================
// メニューを閉じる
// =========================

function closeMenu() {

    const menu =
        document.getElementById("sideMenu");

    const overlay =
        document.getElementById("menuOverlay");


    menu.classList.remove("open");

    overlay.classList.remove("open");
}


// =========================
// ホーム
// =========================

function showHome() {

    closeMenu();

    location.reload();
}


// =========================
// 履歴
// =========================

function showHistory() {

    closeMenu();

    const main =
        document.getElementById("mainContent");


    main.innerHTML = `

        <h2>📅 履歴</h2>

        <p>
            保存されているタスクを確認できます。
        </p>

        <button onclick="showHome()">
            ホームに戻る
        </button>

    `;
}


// =========================
// 集計
// =========================

function showStatistics() {

    closeMenu();

    const main =
        document.getElementById("mainContent");


    main.innerHTML = `

        <h2>📊 集計</h2>

        <p>
            ここにタスクの集計機能を追加できます。
        </p>

        <button onclick="showHome()">
            ホームに戻る
        </button>

    `;
}


// =========================
// 大事な予定
// =========================

function showImportant() {

    closeMenu();

    const main =
        document.getElementById("mainContent");


    main.innerHTML = `

        <h2>⭐ 大事な予定</h2>

        <p>
            ここに大事な予定を表示できます。
        </p>

        <button onclick="showHome()">
            ホームに戻る
        </button>

    `;
}


// =========================
// 通知
// =========================

function showNotification() {

    closeMenu();

    const main =
        document.getElementById("mainContent");


    main.innerHTML = `

        <h2>🔔 通知</h2>

        <p>
            ここに通知機能を追加できます。
        </p>

        <button onclick="showHome()">
            ホームに戻る
        </button>

    `;
}


// =========================
// 設定
// =========================

function showSettings() {

    closeMenu();

    const main =
        document.getElementById("mainContent");


    main.innerHTML = `

        <h2>⚙ 設定</h2>

        <p>
            ここに設定機能を追加できます。
        </p>

        <button onclick="showHome()">
            ホームに戻る
        </button>

    `;
}


// =========================
// メモを保存
// =========================

function saveMemo() {

    const memo =
        document.querySelector(".memo");

    if (!memo) {

        return;
    }


    const key =
        "memo_" + getDateKey(currentDate);


    localStorage.setItem(
        key,
        memo.value
    );
}


// =========================
// メモを表示
// =========================

function displayMemo() {

    const memo =
        document.querySelector(".memo");

    if (!memo) {

        return;
    }


    const key =
        "memo_" + getDateKey(currentDate);


    const saved =
        localStorage.getItem(key);


    memo.value =
        saved || "";


    // 入力されたら自動保存

    memo.oninput =
        function () {

            saveMemo();

        };
}


// =========================
// 最初に日付を表示
// =========================

displayDate();
