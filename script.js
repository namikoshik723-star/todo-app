let currentDate = new Date();


// =========================
// 日付
// =========================

function getDateKey(date) {

    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            date.getDate()
        ).padStart(2, "0");

    return (
        year +
        "-" +
        month +
        "-" +
        day
    );
}


// =========================
// 日付表示
// =========================

function displayDate() {

    const year =
        currentDate.getFullYear();

    const month =
        currentDate.getMonth() + 1;

    const day =
        currentDate.getDate();


    document.getElementById(
        "today"
    ).textContent =
        year +
        "年" +
        month +
        "月" +
        day +
        "日";


    displayTasks();
}


// =========================
// 今日
// =========================

function goToday() {

    currentDate =
        new Date();

    displayDate();
}


// =========================
// 日付変更
// =========================

function changeDate(days) {

    currentDate.setDate(
        currentDate.getDate() + days
    );

    displayDate();
}


// =========================
// データ取得
// =========================

function getTasks() {

    const key =
        getDateKey(currentDate);


    const data =
        localStorage.getItem(
            "tasks_" + key
        );


    return data
        ? JSON.parse(data)
        : [];
}


// =========================
// データ保存
// =========================

function saveTasks(tasks) {

    const key =
        getDateKey(currentDate);


    localStorage.setItem(

        "tasks_" + key,

        JSON.stringify(tasks)

    );
}


// =========================
// タスク表示
// =========================

function displayTasks() {

    const taskList =
        document.getElementById(
            "taskList"
        );


    taskList.innerHTML = "";


    const tasks =
        getTasks();


    tasks.forEach(
        function(taskData, index) {

            const task =
                document.createElement(
                    "div"
                );


            task.className =
                "task " +
                taskData.status;


            // 文字

            const text =
                document.createElement(
                    "span"
                );


            text.textContent =
                taskData.text;


            task.appendChild(text);


            // =====================
            // 操作ボタン
            // =====================

            const buttons =
                document.createElement(
                    "div"
                );


            buttons.className =
                "task-buttons";


            // できた

            const doneButton =
                document.createElement(
                    "button"
                );


            doneButton.textContent =
                "できた";


            doneButton.addEventListener(
                "click",
                function(event) {

                    event.stopPropagation();

                    tasks[index].status =
                        "green";

                    saveTasks(tasks);

                    displayTasks();

                }
            );


            // できなかった

            const failedButton =
                document.createElement(
                    "button"
                );


            failedButton.textContent =
                "できなかった";


            failedButton.addEventListener(
                "click",
                function(event) {

                    event.stopPropagation();

                    tasks[index].status =
                        "red";

                    saveTasks(tasks);

                    displayTasks();

                }
            );


            // 削除

            const deleteButton =
                document.createElement(
                    "button"
                );


            deleteButton.textContent =
                "削除";


            deleteButton.addEventListener(
                "click",
                function(event) {

                    event.stopPropagation();

                    tasks.splice(
                        index,
                        1
                    );

                    saveTasks(tasks);

                    displayTasks();

                }
            );


            buttons.appendChild(
                doneButton
            );

            buttons.appendChild(
                failedButton
            );

            buttons.appendChild(
                deleteButton
            );


            task.appendChild(
                buttons
            );


            // =====================
            // 長押し
            // =====================

            let timer = null;


            task.addEventListener(
                "pointerdown",
                function() {

                    timer =
                        setTimeout(
                            function() {

                                task.classList.add(
                                    "show-buttons"
                                );

                            },
                            600
                        );

                }
            );


            task.addEventListener(
                "pointerup",
                function() {

                    clearTimeout(timer);

                }
            );


            task.addEventListener(
                "pointercancel",
                function() {

                    clearTimeout(timer);

                }
            );


            task.addEventListener(
                "pointerleave",
                function() {

                    clearTimeout(timer);

                }
            );


            taskList.appendChild(
                task
            );

        }
    );
}


// =========================
// タスク追加
// =========================

function addTask() {

    const input =
        document.getElementById(
            "taskInput"
        );


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

    displayTasks();


    input.value = "";

}


// =========================
// ☰ メニューを開く
// =========================

function toggleMenu() {

    const menu =
        document.getElementById(
            "sideMenu"
        );


    const overlay =
        document.getElementById(
            "menuOverlay"
        );


    menu.classList.toggle(
        "open"
    );


    overlay.classList.toggle(
        "open"
    );
}


// =========================
// メニューを閉じる
// =========================

function closeMenu() {

    const menu =
        document.getElementById(
            "sideMenu"
        );


    const overlay =
        document.getElementById(
            "menuOverlay"
        );


    menu.classList.remove(
        "open"
    );


    overlay.classList.remove(
        "open"
    );
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
        document.getElementById(
            "mainContent"
        );


    main.innerHTML = `

        <div class="info-page">

            <h2>📅 履歴</h2>

            <p>
                過去の日付ごとの<br>
                タスク履歴を表示します。
            </p>

            <button
                class="back-button"
                onclick="showHome()"
            >
                ホームに戻る
            </button>

        </div>

    `;
}


// =========================
// 集計
// =========================

function showStatistics() {

    closeMenu();


    const main =
        document.getElementById(
            "mainContent"
        );


    main.innerHTML = `

        <div class="info-page">

            <h2>📊 集計</h2>

            <p>
                できた数<br>
                できなかった数<br>
                達成率
            </p>

            <button
                class="back-button"
                onclick="showHome()"
            >
                ホームに戻る
            </button>

        </div>

    `;
}


// =========================
// 大事な予定
// =========================

function showImportant() {

    closeMenu();


    const main =
        document.getElementById(
            "mainContent"
        );


    main.innerHTML = `

        <div class="info-page">

            <h2>⭐ 大事な予定</h2>

            <p>
                大事なタスクを<br>
                まとめて表示します。
            </p>

            <button
                class="back-button"
                onclick="showHome()"
            >
                ホームに戻る
            </button>

        </div>

    `;
}


// =========================
// 通知
// =========================

function showNotification() {

    closeMenu();


    const main =
        document.getElementById(
            "mainContent"
        );


    main.innerHTML = `

        <div class="info-page">

            <h2>🔔 通知</h2>

            <p>
                指定した時間に<br>
                通知する機能です。
            </p>

            <button
                class="back-button"
                onclick="showHome()"
            >
                ホームに戻る
            </button>

        </div>

    `;
}


// =========================
// 設定
// =========================

function showSettings() {

    closeMenu();


    const main =
        document.getElementById(
            "mainContent"
        );


    main.innerHTML = `

        <div class="info-page">

            <h2>⚙ 設定</h2>

            <p>
                文字サイズ<br>
                表示設定<br>
                データ管理
            </p>

            <button
                class="back-button"
                onclick="showHome()"
            >
                ホームに戻る
            </button>

        </div>

    `;
}


// =========================
// 最初に表示
// =========================

displayDate();
