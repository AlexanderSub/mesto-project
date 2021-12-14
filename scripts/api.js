const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-5',
  headers: {
    authorization: '54341bda-522b-4250-8ddd-e4327b14cb34',
    'Content-Type': 'application/json'
  }
}

// export const getInitialCards = () => {
//   return fetch(`${config.baseUrl}/cards`, {
//     config.headers
//   })
//     .then(res => {
//       if (res.ok) {
//         return res.json();
//       }

//       // если ошибка, отклоняем промис
//       return Promise.reject(`Ошибка: ${res.status}`);
//     });
// }
