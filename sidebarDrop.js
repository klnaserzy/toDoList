// **按鈕元素的選取**
// 取得頁面中控制不同功能的按鈕元素
const closeSidebarButton = document.getElementById('close-sidebar-button') // 控制側邊欄的顯示/隱藏
const dropAddButton = document.getElementById('drop-add-button') // 控制 "新增待辦事項" 的顯示/隱藏
const dropLeastEventsButton = document.getElementById('drop-least-events-button') // 控制 "最少事件" 的顯示/隱藏
const sidebarButtons = document.getElementById('sidebar-buttons') // 側邊欄內的按鈕容器
const showAll = document.getElementById('show-all') // 顯示所有內容的按鈕
const hiddenAll = document.getElementById('hidden-all') // 隱藏當前內容的按鈕
const chooseFontSize = document.getElementById('choose-font-size') // 控制字體大小選項的按鈕

// **控制的主要區域元素**
// 取得頁面中主要控制的 DOM 元素
const home = document.getElementById('home') // 主頁區域
const imgGallery = document.getElementById('img-gallery') // 圖片展示區域
const fillInTodo = document.getElementById('fill-in-todo') // 新增待辦事項表單
const leastEvents = document.getElementById('least-events') // 顯示最少事件的區域
const leftContainer = document.getElementById('left-container') // 左側容器（包含側邊欄）
const sidebar = document.getElementById('sidebar') // 側邊欄
const fontSizeContainer = document.getElementById('font-size-container') // 字體大小調整的容器

// **隱藏當前內容按鈕事件**
hiddenAll.addEventListener('click', () => {
    const hash = window.location.hash || '#home'; // 確保取得當前的 hash 或預設為主頁
    const activePage = document.querySelector(hash); // 透過 hash 選取當前顯示的頁面

    activePage.classList.add('hidden'); // 隱藏當前頁面
    showAll.classList.remove('hidden'); // 顯示 "顯示全部" 按鈕
})

// **顯示當前內容按鈕事件**
showAll.addEventListener('click', () => {
    const hash = window.location.hash || '#home'; // 確保取得當前的 hash 或預設為主頁
    const activePage = document.querySelector(hash); // 透過 hash 選取當前顯示的頁面

    activePage.classList.remove('hidden'); // 顯示當前頁面
    showAll.classList.add('hidden'); // 隱藏 "顯示全部" 按鈕
})

// **關閉側邊欄按鈕事件**
closeSidebarButton.addEventListener('click', () => {
    leftContainer.classList.toggle('hidden'); // 切換左側容器的顯示/隱藏

    // 根據側邊欄的最小寬度調整外觀
    if (sidebar.style.minWidth === '250px' || sidebar.style.minWidth === '') {
        sidebar.style.minWidth = '60px'; // 縮小側邊欄
        sidebarButtons.style.flexDirection = 'column'; // 改為垂直排列按鈕
    } else {
        sidebar.style.minWidth = '250px'; // 恢復側邊欄大小
        sidebarButtons.style.flexDirection = 'row'; // 恢復水平排列按鈕
    }
})

// **選擇字體大小按鈕事件**
chooseFontSize.addEventListener('click', () => {
    fontSizeContainer.classList.toggle('hidden'); // 切換字體大小選項的顯示/隱藏
})

// **顯示/隱藏新增待辦事項表單**
dropAddButton.addEventListener('click', () => fillInTodo.classList.toggle('hidden'))

// **顯示/隱藏最少事件區域**
dropLeastEventsButton.addEventListener('click', () => leastEvents.classList.toggle('hidden'))
