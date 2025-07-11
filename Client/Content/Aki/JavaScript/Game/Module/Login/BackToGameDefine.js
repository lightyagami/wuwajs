"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackToGameLoginData = exports.BackToGameLoadingViewData = exports.BackToGameData = exports.BACK_TO_GAME_KEY = exports.LOADING_WIDGET_KEY = undefined;
exports.LOADING_WIDGET_KEY = "loading_widget";
exports.BACK_TO_GAME_KEY = "back_to_game";
class BackToGameData {
  constructor() {
    this.BackToGameType = 0;
    this.Progress = 0;
    this.LoadingWidget = undefined;
    this.LoadingTexturePath = undefined;
    this.LoadingTitle = undefined;
    this.LoadingTips = undefined;
    this.BackToGameLoginData = undefined;
  }
}
exports.BackToGameData = BackToGameData;
class BackToGameLoadingViewData {
  constructor() {
    this.LoadingWidget = undefined;
  }
  RebootFinished() {
    this.LoadingWidget.RebootFinished();
  }
  SetProgress(t) {
    this.LoadingWidget.UpdateOtherLoadingProgerss(t);
  }
  Close() {
    if (this.LoadingWidget?.IsValid()) {
      this.LoadingWidget.RemoveFromParent();
    }
  }
}
exports.BackToGameLoadingViewData = BackToGameLoadingViewData;
class BackToGameLoginData {
  constructor() {
    this.Uid = undefined;
    this.UserName = undefined;
    this.Token = undefined;
    this.SelectServerId = undefined;
    this.SelectServerIp = undefined;
  }
}
exports.BackToGameLoginData = BackToGameLoginData;
//# sourceMappingURL=BackToGameDefine.js.map