'use strict'

let mainMenu = document.querySelector('.main_menu')
let sega = document.getElementById('sega')
let infoContainer = document.querySelector('.info_container')
let search = document.querySelector('.search')
let searchButton = document.querySelector('.search_button')
let infoListItem = document.querySelector('info_list-item')

mainMenu.addEventListener('click', function (ev) {
    ev.preventDefault();
    let clicked = ev.target.id
    let mainMenuItem = document.querySelectorAll('.main_menu-item')
    for (let i = 0; i < mainMenuItem.length; i++ ) {
        if (mainMenuItem[i].classList.contains('active')) {
        mainMenuItem[i].classList.remove('active')
        }
    }
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('active')
    }
    fetch('../data.json')
        .then(function(response) {
            return response.json();
        })
        .then(function (response) {
            while (infoContainer.firstChild) {
                infoContainer.firstChild.remove();
          }
            function createTree(infoContainer, response) {
                const ul = document.createElement('ul')
                ul.className = 'info_list'
                const li = document.createElement('li');
                li.className = 'info_list-item'
                for (let prop in response) {
                if (prop === clicked) {
                    let companies = response[prop]
                    for (let key in companies) {
                    const ul = document.createElement('ul')
                    ul.className = 'info_list'
                        let consoles = companies[key]
                        for ( let i in consoles) {
                            const li = document.createElement('li');
                            li.className = 'info_list-item'
                            const text = document.createTextNode(consoles[i]);
                            li.prepend(text);
                            infoContainer.append(ul)
                            ul.append(li)
                        }
                    }
                }   
            }
        }
        createTree(infoContainer, response)
    })
});

searchButton.addEventListener('click', function (ev) {
    ev.preventDefault();
    let infoListItem = document.querySelectorAll('.info_list-item')
    for (let i = 0; i < infoListItem.length; i++ ) {
        if (infoListItem[i].classList.contains('searched')) {
        infoListItem[i].classList.remove('searched')
        }
    }
    for (let i of infoListItem) { console.log(i.innerHTML)
        let searchValue = search.value.toLowerCase()
        let searchedString = i.innerHTML.toLowerCase()
        if (searchValue === searchedString || searchedString.indexOf(searchValue) != -1) {
            i.classList.toggle('searched')
            i.scrollIntoView()
        }
    }
})

