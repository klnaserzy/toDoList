// buttons
const closeSidebarButton = document.getElementById('close-sidebar-button')
const dropAddButton = document.getElementById('drop-add-button')
const dropLeastEventsButton = document.getElementById('drop-least-events-button')
const sidebarButtons = document.getElementById('sidebar-buttons')
const showAll = document.getElementById('show-all')
const hiddenAll = document.getElementById('hidden-all')
const chooseFontSize = document.getElementById('choose-font-size');

// control element
const home = document.getElementById('home')
const imgGallery = document.getElementById('img-gallery')
const fillInTodo = document.getElementById('fill-in-todo')
const leastEvents = document.getElementById('least-events')
const leftContainer = document.getElementById('left-container')
const sidebar = document.getElementById('sidebar')
const fontSizeContainer = document.getElementById('font-size-container')


hiddenAll.addEventListener('click', () => {
    const hash = window.location.hash || '#home';
    const activePage = document.querySelector(hash);

    activePage.classList.add('hidden');
    showAll.classList.remove('hidden');
})

showAll.addEventListener('click', () => {
    const hash = window.location.hash || '#home';
    const activePage = document.querySelector(hash);

    activePage.classList.remove('hidden')
    showAll.classList.add('hidden')
})

closeSidebarButton.addEventListener('click', () => {
    leftContainer.classList.toggle('hidden')

    if (sidebar.style.minWidth === '250px' || sidebar.style.minWidth === '') {
        sidebar.style.minWidth = '60px';
        sidebarButtons.style.flexDirection = 'column'
    } else {
        sidebar.style.minWidth = '250px';
        sidebarButtons.style.flexDirection = 'row'
    }
})

chooseFontSize.addEventListener('click', () => {
    fontSizeContainer.classList.toggle('hidden')
})

dropAddButton.addEventListener('click', () => fillInTodo.classList.toggle('hidden'))
dropLeastEventsButton.addEventListener('click', () => leastEvents.classList.toggle('hidden'))
