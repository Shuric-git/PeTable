'use strict'

let mainMenu = document.querySelector('.main_menu')
let sega = document.getElementById('sega')
let infoContainer = document.querySelector('.info_container')
let search = document.querySelector('.search')
let searchButton = document.querySelector('.search_button')
let infoListItem = document.querySelector('info_list-item')

mainMenu.addEventListener('click', function (ev) {
    ev.preventDefault();
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('active')
    }
    fetch('../data.json')
        .then(function(response) {
            // let responseJson = JSON.stringify(response.status)
            return response.json();
        })
        .then(function (response) {
            while (infoContainer.firstChild) {
                infoContainer.firstChild.remove();
          }
            for (let prop in response.sega) {
                const ul = document.createElement('ul')
                ul.className = 'info_list'
                for (let key in response.sega[prop]) {
                    const li = document.createElement('li');
                    li.className = 'info_list-item'
                    const text = document.createTextNode(response.sega[prop][key]);
                    li.prepend(text);
                    infoContainer.append(ul)
                    ul.append(li)
                    // console.log(response.sega[prop][key])
                }

            }

        })
    });

searchButton.addEventListener('click', function (ev) {
    ev.preventDefault();
    let infoListItemCollection = document.querySelectorAll('.info_list-item')
    let infoListCollection = document.querySelectorAll('.info_list')
    infoListCollection.forEach( (infoListCollection) => {
        infoListItemCollection.forEach( (infoListItemCollection) => {
            if (search.value === infoListItemCollection.innerHTML) {
                // infoListCollection.style.border = '1px solid red'
                infoListCollection.classList.toggle('searched')
            }
        });
    })

})
    
// load_button.addEventListener('click', function (ev) {
//     ev.preventDefault();


//     // fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
//     // .then(response => response.json())
//     // .then(commits => alert(commits[0].author.login));
    
//     fetch('http://192.168.0.34:8080/data.json')
//         .then(function(response) {
//             console.log(response)
//             // let responseJson = JSON.stringify(response.status)
//             console.log(response.status) 
//             return response.json();
//         })
//         .then(function(response) {
//             document.querySelector('.project')
//             .innerHTML = response.project;
//             document.querySelector('.course')
//             .innerHTML = response.course;
//             document.querySelector('.module')
//             .innerHTML = response.module;
//             document.querySelector('.teacher')
//             .innerHTML = response.teacher;
//         })
          
// });