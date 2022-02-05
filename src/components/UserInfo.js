export default class UserInfo {
  constructor(userNameSelector, userAboutSelector, userAvatarSelector) {
    this._userNameElement = document.querySelector(userNameSelector)
    this._userAboutElement = document.querySelector(userAboutSelector)
    this._userAvatarElement = document.querySelector(userAvatarSelector)
  }

  setUserInfo({name, about, avatar}) {
    if (name) this._userNameElement.textContent = name
    if (about) this._userAboutElement.textContent = about
    if (avatar) this._userAvatarElement.src = avatar
  }

  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userAbout: this._userAboutElement.textContent,
      userAvatar: this._userAvatarElement.src
    }
  }
}
