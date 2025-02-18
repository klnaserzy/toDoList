// DOM 元素取得與初始化
const todoTitle = document.getElementById("todoTitle");  // 取得任務標題輸入框
const describeTextarea = document.getElementById("describeTextarea");  // 取得任務描述的輸入框
const deadLine = document.getElementById("deadLine");  // 取得任務截止日期的輸入框
const addTodoBtn = document.getElementById("addTodoBtn");  // 取得新增任務的按鈕
const todoTask = document.getElementById("todoTask");  // 取得任務列表的容器
const events = document.getElementById("events");  // 取得顯示即將到期任務的容器
const eventsAndTime = [1, 3, 2, 41, 34, 1234, 1, 2];  // 用於儲存任務名稱和日期的臨時陣列

// 初始化本地儲存資料，如果 localStorage 中有 "todo"，則解析為陣列，否則初始化為空陣列
const todoLocalStorage = JSON.parse(localStorage.getItem("todo")) || [];

// 新增任務函式
const addTodo = () => {
    const title = todoTitle.value.replace(/ /g, "_").trim();  // 將標題中的空白替換為底線，並移除前後空白
    const describeText = describeTextarea.value;  // 取得描述內容
    const deadLineDate = deadLine.value.replace(/-/g, "/") || "0000/00/00";  // 格式化日期為 yyyy/MM/dd，若無輸入則為預設值

    // 檢查年份的合理性，避免不合理的日期值
    if (parseInt(deadLineDate) > 10000) {
        if (!confirm("Are you sure this website will still work by then?")) {
            deadLine.value = "";  // 清空不合理日期
            return;
        }
        console.log(deadLineDate);
    } else if (parseInt(deadLineDate) > 2200) {
        if (!confirm("Perhaps reconsider the date, or you may need to discuss it with your child.")) {
            deadLine.value = "";  // 清空不合理日期
            return;
        }
    }

    // 將新任務加入本地儲存陣列
    todoLocalStorage.push({
        id: title + Date.now(),  // 使用標題加上時間戳作為唯一 ID
        title: title,
        date: deadLineDate,
        describe: describeText,
        state: "to-do"  // 預設任務狀態為 "to-do"
    });

    // 清空輸入框的值，準備新增下一個任務
    todoTitle.value = "";
    describeTextarea.value = "";
    deadLine.value = "";

    // 更新本地儲存
    localStorage.setItem("todo", JSON.stringify(todoLocalStorage));
};

// 更新任務列表的函式
const updateYourList = () => {
    todoTask.innerHTML = "";  // 清空現有的任務列表

    // 生成每個任務的 HTML 並插入到任務容器中
    todoLocalStorage.forEach(todo => {
        todoTask.insertAdjacentHTML('afterbegin',
        `
            <div class="td">
                <p>${todo.title ? todo.title : "title"}</p>
            </div>
            <div class="td">
                <p>${todo.date}</p>
            </div>
            <div id="describe" class="td">
                <p>${todo.describe}</p>
            </div>
            <div class="td">
                <select id="select-${todo.id}" class="select" name="${todo.id}">
                    <option ${todo.state === "to-do" ? "selected" : ""} value="to-do">to-do</option>
                    <option ${todo.state === "in-progress" ? "selected" : ""} value="in-progress">in progress</option>
                    <option ${todo.state === "done" ? "selected" : ""} value="done">done</option>
                </select>
            </div>
            <div id=delete-${todo.id} class="td">
                <button>delete</button>
            </div>
        `);
    });

    // 針對動態生成的元素添加事件監聽器
    addSelectEventListeners();
    addDeleteEventListeners();
    updateLeastTimeEvent();  // 更新即將到期的任務顯示
};

// 更新即將到期的任務顯示
const updateLeastTimeEvent = () => {
    eventsAndTime.splice(0, eventsAndTime.length);  // 清空現有數據

    // 提取任務標題與日期
    todoLocalStorage.forEach(todo => {
        const { title, date } = todo;
        eventsAndTime.push([title, date]);
    });

    // 過濾日期為未來的任務並按日期排序
    const filteredSortedEvents = eventsAndTime
        .filter(data => {
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();

            const formattedDate = `${year}/${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}`;
            return data[1] > formattedDate;
        }).sort((a, b) => {
            return new Date(a[1]) - new Date(b[1]);  // 按日期升序排列
        });

    // 更新顯示的即將到期任務
    events.innerHTML = "";
    filteredSortedEvents.forEach(data => {
        events.innerHTML += `<span class="event">${data[0].length > 20 ? data[0].slice(0, 20) + "..." : data[0]}</span>`;
    });
};

// 為動態生成的 select 元素添加變更事件
const addSelectEventListeners = () => {
    todoLocalStorage.forEach(todo => {
        const selectEl = document.getElementById(`select-${todo.id}`);
        selectEl.addEventListener("change", () => {
            todoLocalStorage.forEach(innerTodo => {
                if (innerTodo.id === todo.id) {
                    innerTodo.state = selectEl.value;  // 更新狀態
                }
            });
            localStorage.setItem("todo", JSON.stringify(todoLocalStorage));  // 更新本地儲存
        });
    });
};

// 為動態生成的刪除按鈕添加點擊事件
const addDeleteEventListeners = () => {
    todoLocalStorage.forEach(todo => {
        const deleteEl = document.getElementById(`delete-${todo.id}`);
        deleteEl.addEventListener("click", () => {
            const deleteIndex = todoLocalStorage.findIndex(innerTodo => innerTodo.id === todo.id);
            if (confirm("Are you sure you want to delete this todo?")) {
                todoLocalStorage.splice(deleteIndex, 1);  // 從陣列中移除
                localStorage.setItem("todo", JSON.stringify(todoLocalStorage));  // 更新本地儲存
                updateYourList();  // 更新列表顯示
            }
        });
    });
};

// 新增任務按鈕點擊事件
addTodoBtn.addEventListener("click", (e) => {
    e.preventDefault();  // 防止表單預設行為
    addTodo();  // 新增任務
    updateYourList();  // 更新列表
});

// 初始執行更新顯示
updateLeastTimeEvent();
updateYourList();
