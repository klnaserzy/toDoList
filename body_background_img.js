import { backgroundImages as backgroundImagePath } from "./fetchBackgroundImg.js";

// DOM 元素
const photographer = document.getElementById("photographer");
const nowDate = document.getElementById("nowDate");
const yearMon = document.getElementById("yearMon");

// 定義月份名稱
const allMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// 背景圖片數據

    const update_time_per_second = () => {
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        
        hours = String(hours).padStart(2, '0');
        minutes = String(minutes).padStart(2, '0');
        seconds = String(seconds).padStart(2, '0');
        
        nowDate.textContent = `${hours}:${minutes}:${seconds}`; // 更新時間顯示
    }

// 更新時間和背景圖片
const update_time_and_background = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    const set_background_change_time = 5;  //設定背景變換的秒數
    let change_background_timer = 0;  //計時器
    let background_Image_index = 0;

    // 更新年月日顯示
    yearMon.textContent = `${allMonth[month]} ${date}, ${year}`;

    // 預加載下一張背景圖片
    const preloadImages = () => {
        const nextIndex = (background_Image_index + 1) % backgroundImagePath.length;
        const nextImage = new Image();
        nextImage.src = backgroundImagePath[nextIndex].imgPath;
    };


    
    // 每秒執行更新時間和背景圖片
    setInterval(() => {
        // 更新時間
        update_time_per_second()

        // 更新背景圖片
        const update_background = () => {
            if(!(++change_background_timer % set_background_change_time)){
                change_background_timer = 0;
                ++background_Image_index;
                background_Image_index %= backgroundImagePath.length;
                // 更改背景圖片和攝影師信息
                document.body.style.backgroundImage = `url(${backgroundImagePath[background_Image_index]["imgPath"]})`;
                photographer.innerHTML = `<a href="${backgroundImagePath[background_Image_index]["photographer_url"]}" target="_blank">photographer: ${backgroundImagePath[background_Image_index]["photographer"]}</a>`;
                preloadImages(); // 預加載下一張背景圖片
            }
        }

        update_time_per_second(); // 呼叫更新時間函數
        update_background(); // 呼叫更新背景函數

    }, 1000); // 設定每秒執行一次

    preloadImages(); // 呼叫預加載函數
}

update_time_per_second(); // 第一次更新時間
update_time_and_background();  // 呼叫更新時間和背景函數