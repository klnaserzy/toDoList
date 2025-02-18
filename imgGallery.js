// 從外部模組引入背景圖片數據
import { backgroundImages as backgroundImagePath } from "./fetchBackgroundImg.js";

// DOM 元素
const gallery = document.getElementById("gallery");  // 圖片展示區
const imgBox = document.getElementsByClassName("imgBox");  // 單個圖片容器
const modalContainer = document.getElementById("modal-container");  // 模態框容器
const modalClose = document.getElementById("modal-close");  // 關閉模態框按鈕
const modal = document.getElementById("modal");  // 模態框內容區

// 點擊模態框外部或關閉按鈕，隱藏模態框
window.onclick = (event) => {
    if (event.target === modalContainer || event.target === modalClose) {
        modalContainer.style.display = "none";  // 隱藏模態框
        modal.innerHTML = ``;  // 清空模態框內容
    }
};

// 初始化圖片展示區
gallery.innerHTML = ``;

// 將每張圖片及其攝影師信息渲染到圖片展示區
backgroundImagePath.map(el => {
    gallery.insertAdjacentHTML('beforeend', `    
        <span class="imgBox">
            <img class="galleryImg" src="${el.imgPath}" alt="Gallery Image" />
            <p>${el.photographer}</p>
        </span>
    `);
});

// 為每個圖片容器添加點擊事件，顯示模態框
gallery.addEventListener("click", (event) => {
    if (event.target.classList.contains("galleryImg")) {
        const index = Array.from(gallery.children).indexOf(event.target.parentElement);
        const { imgPath, imgUrl, photographer_url, photographer } = backgroundImagePath[index];

        modalContainer.style.display = "block";
        modal.innerHTML = `
            <img id="modalImg" src="${imgPath}" alt="landscape">
            <div id="gotoLink">
                <a href="https://www.pexels.com/zh-tw/" class="pexelsLink" target="_blank">
                    <img style="width: 100px;" src="https://images.pexels.com/lib/api/pexels-white.png" alt="Pexels Logo" />
                </a>
                <a href="${imgUrl}" class="imgUrl" target="_blank">
                    <i class="fa fa-solid fa-image fa-2xl" title="View Image"></i>
                    <p>photo</p>
                </a>
                <a href="${photographer_url}" class="photographer" target="_blank">
                    <i class="fa-solid fa-user fa-2xl"></i>
                    <p>${photographer}</p>
                </a>
            </div>
        `;
    }
});
