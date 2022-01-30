export default class UserInfo {
  constructor(userNameSelector, userAboutSelector, userAvatarSelector) {
    this._userNameElement = userNameSelector
    this._userAboutElement = userAboutSelector
    this._userAvatarElement = userAvatarSelector
  }

  _setUserInfo({name, about}) {
    this._userNameElement.textContent = name
    this._userAboutElement.textContent = about
  }

  _setUserAvatar({avatar}) {
    this._userAvatarElement.src = avatar
  }

  _getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userAbout: this._userAboutElement.textContent,
      userAvatar: this._userAvatarElement.src
    }
  }
}
