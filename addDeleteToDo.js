const todoTitle = document.getElementById("todoTitle");  // 取得任務標題
const describeTextarea = document.getElementById("describeTextarea");  // 任務描述
const deadLine = document.getElementById("deadLine");  // 期限
const addTodoBtn = document.getElementById("addTodoBtn");  // 確認加入
const todoTask = document.getElementById("todoTask")  // 放任務的容器
const events = document.getElementById("events")  // 顯示期限最短的任務排序
const eventsAndTime = [1,3,2,41,34,1234,1,2];

const todoLocalStorage = JSON.parse(localStorage.getItem("todo")) || [];
//用localStorage儲存
const addTodo = () => {
    const title = todoTitle.value.replace(/ /g, "_").trim();  //移除或修改空白
    const describeText = describeTextarea.value;
    const deadLineDate = deadLine.value.replace(/-/g, "/") || "0000/00/00";  //2024-03-04 -> 2024/03/04

    //年份較大時
    //年份有點太大了
    if(parseInt(deadLineDate) > 10000){
        if(!confirm("Are you sure this website will still work by then?")){
            deadLine.value = "";
            return ;
        }
        console.log(deadLineDate)
    }else if(parseInt(deadLineDate) > 2200){
        if(!confirm("Perhaps reconsider the date, or you may need to discuss it with your child.")){
            deadLine.value = "";
            return ;
        }
    }

    todoLocalStorage.push({
        id: title + Date.now(),
        title: title,
        date: deadLineDate,
        describe: describeText,
        state: "to-do"
    })

    todoTitle.value = "";
    describeTextarea.value = "";
    deadLine.value = "";

    localStorage.setItem("todo", JSON.stringify(todoLocalStorage));
};
//紀錄: localStorage、indexDB

//更新Your list
const updateYourList = () => {
    todoTask.innerHTML = "";
    // 在元素上如果直接新增事件會產生錯誤 例:<select onchange="change()"></select>
    // 這個js為module 裡面的資料不為全域 所以用監聽器
    todoLocalStorage.forEach(todo => {
        todoTask.innerHTML += 
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
                <select id="select-${todo.id}" class="select" name="${todo.id}" >
                    <option ${todo.state === "to-do" ? "selected" : ""} value="to-do">to-do</option>
                    <option ${todo.state === "in-progress" ? "selected" : ""} value="in-progress">in progress</option>
                    <option ${todo.state === "done" ? "selected" : ""} value="done">done</option>
                </select>
            </div>
            <div id=delete-${todo.id} class="td">
                <button>delete</button>
            </div>
        `;

    })

    // 放在for迴圈建立同時生成會導致事件無法接到元素上
    addSelectEventListeners();
    addDeleteEventListeners();
    updateLeastTimeEvent();
};

const updateLeastTimeEvent = () => {
    eventsAndTime.splice(0,eventsAndTime.length);
    
    todoLocalStorage.forEach(todo => {
        const {title, date} = todo;
        
        eventsAndTime.push([title, date]);
    })
    
    const filteredSortedEvents = eventsAndTime
        .filter(data => {
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();

            const formattedDate = `${year}/${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}`;

            return data[1] > formattedDate;
        }).sort((a, b) => {
            const aDate = new Date(a[1]);
            const bDate = new Date(b[1]);
            const aMilliseconds = aDate.getTime();
            const bMilliseconds = bDate.getTime();
            
            return a[1] > b[1] ? 1 : -1;
        })
    
    events.innerHTML = "";

    filteredSortedEvents.forEach(data => {
        events.innerHTML += `<span class="event">${data[0].length > 20 ? data[0].slice(0, 20) + "..." : data[0]}</span>`;
    })
};


// 為動態生成的select元素添加事件監聽器
const addSelectEventListeners = () => {
    todoLocalStorage.forEach(todo => {
        const selectEl = document.getElementById(`select-${todo.id}`);

        selectEl.addEventListener("change", () => {
            todoLocalStorage.forEach(innerTodo => {
                if(innerTodo.id === todo.id){
                    innerTodo.state = selectEl.value;
                }
            });
            
            localStorage.setItem("todo", JSON.stringify(todoLocalStorage));
        });
    });
};

const addDeleteEventListeners = () => {
    todoLocalStorage.forEach(todo => {
        const deleteEl = document.getElementById(`delete-${todo.id}`);

        deleteEl.addEventListener("click", () => {
            const deleteIndex = todoLocalStorage.findIndex(innerTodo => innerTodo.id === todo.id);
            if(confirm("Are you sure you want to delete this todo?")){
                todoLocalStorage.splice(deleteIndex, 1);
                localStorage.setItem("todo", JSON.stringify(todoLocalStorage));
                updateYourList();
            }
        });
    });
}


addTodoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addTodo();
    updateYourList();
});

updateLeastTimeEvent();
updateYourList();