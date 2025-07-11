"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityControllerBase = undefined;
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiManager_1 = require("../../Ui/UiManager");
class ActivityControllerBase {
  Init() {
    var e = this.OnInit();
    this.OnRegisterNetEvent();
    this.OnAddEvents();
    return e;
  }
  Clear() {
    this.OnUnRegisterNetEvent();
    this.OnRemoveEvents();
    return this.OnClear();
  }
  GetActivityResource(e) {
    e = this.OnGetActivityResource(e);
    return ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
  }
  CreateSubPageComponent(e) {
    return this.OnCreateSubPageComponent(e);
  }
  OpenView(e) {
    this.OnOpenView(e);
  }
  async OpenViewByViewName(e) {
    return await this.OnOpenSubView(e);
  }
  CreateActivityData(e) {
    var t = this.OnCreateActivityData(e);
    t.Init(e);
    return t;
  }
  GetIsOpeningActivityRelativeView() {
    return this.OnGetIsOpeningActivityRelativeView();
  }
  OnRegisterNetEvent() {}
  OnUnRegisterNetEvent() {}
  OnAddEvents() {}
  OnRemoveEvents() {}
  OnInit() {
    return true;
  }
  OnClear() {
    return true;
  }
  async OnOpenSubView(e) {
    return Promise.resolve(false);
  }
  GetActivityLevelUnlockState(e) {
    return true;
  }
  GetActivityMapMarkState(e) {
    return false;
  }
  OnActivityFirstUnlock(e) {
    if (e.LocalConfig && e.LocalConfig.ShowUnlockTip) {
      UiManager_1.UiManager.OpenView("ActivityUnlockTipView", e);
    }
  }
}
exports.ActivityControllerBase = ActivityControllerBase;
//# sourceMappingURL=ActivityControllerBase.js.map