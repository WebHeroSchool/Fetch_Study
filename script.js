let preloader = document.getElementById('preloader');

setTimeout (() => {
	preloader.classList.add('hidden');
}, 3000)

const getDate = new Promise((resolve, reject) => {
	let date = new Date();
	setTimeout(() => date ? resolve(document.querySelector('.date').innerHTML = `Дата и время: ${date}`) : reject('Время не определено'), 2000);
});


let login = window.location.search.split('=')[1] || 'Alexandr886';

fetch(`https://api.github.com/users/${login}`)
  .then(res => {
    if (res.status === 404) {
      throw new Error()
    }
    return res.json()
  })

  .then(json => {

    let userName = document.querySelector('.userName');
    userName.innerHTML = `Пользователь: ${json.name}`;
    userName.href = json.html_url;

    if (json.bio == null) {
      document.querySelector('.userDescription').innerHTML = 'Описание пользователя: не заполнено';
    } else {
      document.querySelector('.userDescription').innerHTML = `Описание пользователя: ${json.bio}`;
    }

    let img = new Image();
    img.src = json.avatar_url;
    document.body.append(img);
    img.classList.add('userAva');

  })
  .catch(err => {
    document.querySelector('.userName').innerHTML = `Пользователь не найден: ${err}`;
    document.querySelector('.userDescription').innerHTML = `Пользователь не найден: ${err}`;
  })
