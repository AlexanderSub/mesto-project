(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/plus-cohort-5",headers:{authorization:"bd868286-b540-4323-aa0c-2f039f089353","Content-Type":"application/json"}},t={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__save-button",disabledButtonClass:"popup__save-button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"},n=document.querySelectorAll(".popup"),r=document.querySelector(".popup_profile-edit"),o=document.forms.profileEdit,c=document.querySelector(".popup_place-add"),a=c.querySelector(".popup__form"),i=document.querySelector(".popup_place-picture"),u=document.querySelector(".popup_delete-card"),l=document.querySelector(".popup_delete-card-form"),s=document.querySelector(".popup_change-avatar"),d=document.forms.editAvatar,p=document.querySelector(".profile__edit-button"),f=document.querySelector(".profile__name"),m=o.elements.profile_name,v=document.querySelector(".profile__description"),b=o.elements.profile_description,_=document.querySelector(".profile__avatar"),h=d.elements.profile_avatar,y=document.querySelector(".profile__overlay"),S=document.querySelector(".profile__add-button"),g=c.querySelector(".popup__input_place"),C=c.querySelector(".popup__input_pic"),q=i.querySelector(".popup__image"),k=i.querySelector(".popup__image-description"),E=document.querySelector(".cards"),L=document.querySelector(".card__template").content.querySelector(".card");function x(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status,", ").concat(e.statusMessage))}var A=function(t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:"PUT",headers:e.headers}).then(x)},O=function(t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:"DELETE",headers:e.headers}).then(x)},U=["formSelector"];var j=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.disabledButtonClass),t.removeAttribute("disabled")):(t.classList.add(n.disabledButtonClass),t.setAttribute("disabled",!0))},w=function(e){var t=e.formSelector,n=function(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}(e,U);Array.from(document.querySelectorAll(t)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);j(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t){t.validity.valid?function(e,t){e.querySelector(".".concat(t.id,"-error")).textContent=""}(e,t):function(e,t,n){e.querySelector(".".concat(t.id,"-error")).textContent=n}(e,t,t.validationMessage)}(e,o),j(n,r,t)}))}))}(e,n)}))},I=function(e){e.classList.add("popup_opened"),document.addEventListener("keydown",P)},B=function(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",P)},P=function(e){if("Escape"===e.code){var t=document.querySelector(".popup_opened");t&&B(t)}};n.forEach((function(e){e.addEventListener("click",(function(t){t.target.classList.contains("popup_opened")&&B(e),t.target.classList.contains("popup__close-icon")&&B(e)}))}));var T,M=function(e){return{likeCounter:e.likes.length,likedByMe:Boolean(e.likes.find((function(e){return e._id===T}))),cardId:e._id,name:e.name,link:e.link,isMine:e.owner._id===T}},D=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.cardId,n=void 0===t?"":t,r=e.link,o=void 0===r?"":r,c=e.name,a=void 0===c?"":c,s=e.likeCounter,d=void 0===s?0:s,p=e.isMine,f=void 0!==p&&p,m=e.likedByMe,v=void 0!==m&&m,b=L.cloneNode(!0);b.cardID=n;var _=b.querySelector(".card__image");_.src=o,_.alt=a,b.querySelector(".card__title").textContent=a,_.addEventListener("click",(function(e){q.src=e.target.src,q.alt=e.target.alt,k.textContent=e.target.alt,I(i)}));var h=b.querySelector(".card__delete");f||h.remove(),h.addEventListener("click",(function(){l.cardId=n,l.currentCard=b,I(u)}));var y=b.querySelector(".card__like");return y.addEventListener("click",(function(){H(b,y,n)})),J(y,v),b.querySelector(".card__like-counter").textContent=d,b},N=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:E;t.prepend(e)},J=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];t?e.classList.add("card__like_active"):e.classList.remove("card__like_active")},H=function(e,t,n){(t.classList.contains("card__like_active")?O:A)(n).then((function(n){var r=M(n);J(t,r.liked),z(e,r.likeCounter)})).catch((function(e){return console.log(e)}))},z=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;e.querySelector(".card__like-counter").textContent=t};function $(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}u.addEventListener("submit",(function(t){t.preventDefault(),t.submitter.textContent="Удаление...",t.submitter.disabled=!0;var n,r=t.target.currentCard;(n=t.target.cardId,fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(x)).then((function(){r.remove(),B(u),t.submitter.textContent="Да",t.submitter.disabled=!1})).catch((function(e){console.log(e),t.submitter.textContent="Ошибка! Попробуйте ещё раз",t.submitter.disabled=!1}))})),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(x),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(x)]).then((function(e){var n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c=[],a=!0,i=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(c.push(r.value),!t||c.length!==t);a=!0);}catch(e){i=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(i)throw o}}return c}}(n,r)||function(e,t){if(e){if("string"==typeof e)return $(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?$(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],a=o[1];T=c._id,f.textContent=c.name,v.textContent=c.about,_.src=c.avatar,m.value=c.name,b.value=c.about,a.forEach((function(e){var t=M(e);!function(e){(arguments.length>1&&void 0!==arguments[1]?arguments[1]:E).append(e)}(D(t))})),w(t)})).catch((function(e){return console.log(e)})),p.addEventListener("click",(function(){I(r)})),S.addEventListener("click",(function(){I(c)})),y.addEventListener("click",(function(){I(s)})),r.addEventListener("submit",(function(t){t.submitter.textContent="Сохранение...",t.submitter.disabled=!0,function(t,n){return fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:t,about:n})}).then(x)}(m.value,b.value).then((function(e){f.textContent=e.name,v.textContent=e.about,B(r)})).catch((function(e){console.log(e),t.submitter.textContent="Ошибка! Попробуйте ещё раз",t.submitter.disabled=!1})).finally((function(){t.submitter.textContent="Сохранить",t.submitter.disabled=!1}))})),c.addEventListener("submit",(function(t){var n,r;t.submitter.textContent="Сохранение...",t.submitter.disabled=!0,(n=g.value,r=C.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:n,link:r})}).then(x)).then((function(e){[e].forEach((function(e){var t=M(e);N(D(t))})),B(c),a.reset()})).catch((function(e){console.log(e),t.submitter.textContent="Ошибка! Попробуйте ещё раз",t.submitter.disabled=!1})).finally((function(){t.submitter.textContent="Сохранить",t.submitter.classList.add("popup__save-button_disabled"),t.submitter.disabled=!0}))})),s.addEventListener("submit",(function(t){t.submitter.textContent="Сохранение...",t.submitter.disabled=!0,function(t){return fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:t})}).then(x)}(h.value).then((function(e){_.src=e.avatar,B(s),d.reset()})).catch((function(e){console.log(e),t.submitter.textContent="Ошибка! Попробуйте ещё раз",t.submitter.disabled=!1}))}))})();