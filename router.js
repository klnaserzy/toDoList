// 函數來切換頁面
function navigate() {
    const pages = document.querySelectorAll('.page');
    const hash = window.location.hash || '#home'; // 默認為 home

    pages.forEach(page => {
        page.classList.remove('active'); // 隱藏所有頁面
    });

    const activePage = document.querySelector(hash);
    if (activePage) {
        activePage.classList.add('active'); // 顯示當前頁面
    }
}

// 監聽 hash 變化，並觸發導航
window.addEventListener('hashchange', navigate);

// 初次加載時也觸發導航
navigate();