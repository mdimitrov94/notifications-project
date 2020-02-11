const url = 'https:///notf-26b35.firebaseio.com/.json'



async function loadData() {

    let data = await fetch(url)
        .then(data => data.json())
    data = Object.values(data)

    let notifications = data.filter(e => e.type !== 'bonus')

    let src = await fetch('https://raw.githubusercontent.com/mdimitrov94/notifications-project/master/notifications.hbs')
        .then(res => res.text())
    const compile = Handlebars.compile(src);
    document.getElementById('root').innerHTML = compile({ data, notifications })

    document.getElementById('btn').addEventListener('click', openMenu)
    document.querySelector(".addBtn").addEventListener('click', addMenu)
    document.getElementById('submit').addEventListener('click', getData)
}
loadData()
function openMenu() {

    let menu = document.querySelector(".notification2")
    let add = document.querySelector(".addBtn")
    if (menu.style.display === 'block') {
        menu.style.display = 'none'
        add.style.display = 'none'

    } else {
        menu.style.display = 'block'
        add.style.display = 'block'
    }
}

function addMenu() {
    let addtoMenu = document.querySelector('.addMenu')
    if (addtoMenu.style.display === 'flex') {
        addtoMenu.style.display = 'none'

    } else {
        addtoMenu.style.display = 'flex'
    }
}

async function getData() {
    let type = document.getElementById('type').value
    let text = document.getElementById('text').value
    let title = document.getElementById('title').value
    if (!text && !title) {
        alert('Fields cannot be empty!')
    }
    let image
    if (type === 'bonus') {
        image = 'https://www.freeiconspng.com/uploads/birthday-present-png-icon-26.png'
    } else if (type === 'promotion') {
        image = 'https://www.freeiconspng.com/uploads/leistungen-promotion-icon-png-0.png'
    } else {
        image = 'https://www.freeiconspng.com/uploads/message-icon-png-0.png'
    }

    let header = {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ type, text, title, image })
    }

    await fetch(url, header)
    await loadData()
    document.querySelector('.addMenu').style.display = 'none'
    document.getElementById('type').value = ''
    document.getElementById('text').value = ''
    document.getElementById('title').value = ''
}
