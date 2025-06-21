"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaEntranceViewModel = void 0;
const Log_1 = require("../../../../../Core/Common/Log");
class ViewModelBase {
  constructor() {
    this.DataMap = new Map, this.CallbackList = []
  }
  SetData(e, t, a) {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("PhantomArena", 75, `SetData ${e}, ` + t), this.DataMap.set(e, t), a || this.Notify(e)
  }
  GetData(e) {
    return Log_1.Log.CheckDebug() && Log_1.Log.Debug("PhantomArena", 75, `GetData ${e}, ` + this.DataMap.get(e)), this.DataMap.get(e)
  }
  Bind(e) {
    this.CallbackList.includes(e) || this.CallbackList.push(e)
  }
  UnBind(e) {
    e = this.CallbackList.indexOf(e); - 1 !== e && this.CallbackList.splice(e, 1)
  }
  Clear() {
    this.CallbackList = []
  }
  Notify(t) {
    this.CallbackList.forEach(e => {
      e(t)
    })
  }
}
const tabViewList = ["PhantomArenaEntranceGymTabView", "PhantomArenaEntranceRepeatTabView"];
class PhantomArenaEntranceViewModel extends ViewModelBase {
  constructor() {
    super(), this.DataMap.set(0, "PhantomArenaEntranceGymTabView")
  }
  SetTabView(e, t) {
    tabViewList.includes(e) && this.SetData(0, e, t)
  }
  GetTabView() {
    return this.GetData(0)
  }
  GetRepeatChallenge() {
    return this.GetData(1)
  }
  SetRepeatChallenge(e, t) {
    this.SetData(1, e, t)
  }
}
exports.PhantomArenaEntranceViewModel = PhantomArenaEntranceViewModel;
//# sourceMappingURL=PhantomArenaEntranceViewModel.js.map