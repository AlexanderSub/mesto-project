export default class UserInfo {
  constructor(userNameSelector, userAboutSelector, userAvatarSelector) {
    this._userNameElement = userNameSelector
    this._userAboutElement = userAboutSelector
    this._userAvatarElement = userAvatarSelector
  }

  _setUserInfo({newName, newAbout}) {
    this._userNameElement.textcontent = newName
    this._userAboutElement.textcontent = newAbout
  }

  _setUserAvatar({newAvatar}) {
    this._userAvatarElement.src = newAvatar
  }

  _getUserInfo() {
    return {
      userName: this._userNameElement.textcontent,
      userAbout: this._userAboutElement.textcontent,
      userAvatar: this._userAvatarElement.src
    }
  }
}
