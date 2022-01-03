function checkResponse(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}, ${res.statusMessage}`)
}

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-5',
  headers: {
    authorization: 'bd868286-b540-4323-aa0c-2f039f089353',
    'Content-Type': 'application/json'
  }
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(checkResponse)
}

export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(checkResponse)
}

export const postCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(checkResponse)
}

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(checkResponse)
}

export const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(checkResponse)
}

export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkResponse)
}


export const editUserData = (userName, userAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userAbout
    })
  })
  .then(checkResponse)
}

export const editUserAvatar = (userAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: userAvatar
    })
  })
  .then(checkResponse)
}


fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });

fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
  });

