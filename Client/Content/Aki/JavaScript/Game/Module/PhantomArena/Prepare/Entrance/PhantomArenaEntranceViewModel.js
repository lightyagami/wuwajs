"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaEntranceViewModel = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
class ViewModelBase {
  constructor() {
    this.DataMap = new Map();
    this.CallbackList = [];
  }
  SetData(e, t, a) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("PhantomArena", 75, `SetData ${e}, ${t}`);
    }
    this.DataMap.set(e, t);
    if (!a) {
      this.Notify(e);
    }
  }
  GetData(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("PhantomArena", 75, `GetData ${e}, ${this.DataMap.get(e)}`);
    }
    return this.DataMap.get(e);
  }
  Bind(e) {
    if (!this.CallbackList.includes(e)) {
      this.CallbackList.push(e);
    }
  }
  UnBind(e) {
    e = this.CallbackList.indexOf(e);
    if (e !== -1) {
      this.CallbackList.splice(e, 1);
    }
  }
  Clear() {
    this.CallbackList = [];
  }
  Notify(t) {
    this.CallbackList.forEach(e => {
      e(t);
    });
  }
}
const tabViewList = ["PhantomArenaEntranceGymTabView", "PhantomArenaEntranceRepeatTabView"];
class PhantomArenaEntranceViewModel extends ViewModelBase {
  constructor() {
    super();
    this.DataMap.set(0, "PhantomArenaEntranceGymTabView");
  }
  SetTabView(e, t) {
    if (tabViewList.includes(e)) {
      this.SetData(0, e, t);
    }
  }
  GetTabView() {
    return this.GetData(0);
  }
  GetRepeatChallenge() {
    return this.GetData(1);
  }
  SetRepeatChallenge(e, t) {
    this.SetData(1, e, t);
  }
}
exports.PhantomArenaEntranceViewModel = PhantomArenaEntranceViewModel;
//# sourceMappingURL=PhantomArenaEntranceViewModel.js.map