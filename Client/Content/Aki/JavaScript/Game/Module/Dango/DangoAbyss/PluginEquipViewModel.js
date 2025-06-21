"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PluginEquipViewModel = void 0;
class ViewModelBase {
  constructor() {
    this.DataMap = new Map, this.CallbackList = []
  }
  SetData(t, e, i) {
    this.DataMap.set(t, e), i || this.Notify(t)
  }
  GetData(t) {
    return this.DataMap.get(t)
  }
  Bind(t) {
    this.CallbackList.includes(t) || this.CallbackList.push(t)
  }
  UnBind(t) {
    t = this.CallbackList.indexOf(t); - 1 !== t && this.CallbackList.splice(t, 1)
  }
  Clear() {
    this.CallbackList = []
  }
  Notify(e) {
    this.CallbackList.forEach(t => {
      t(e)
    })
  }
}
class PluginEquipViewModel extends ViewModelBase {
  constructor() {
    super(), this.DataMap.set(0, 0), this.DataMap.set(1, -1), this.DataMap.set(2, void 0)
  }
  SetDangoId(t, e) {
    this.SetData(0, t, e)
  }
  SetSlotIndex(t, e) {
    this.SetData(1, t, e)
  }
  SetPluginItem(t, e) {
    this.SetData(2, t, e)
  }
  GetDangoId() {
    return this.GetData(0)
  }
  GetSlotIndex() {
    return this.GetData(1)
  }
  GetPluginItem() {
    return this.GetData(2)
  }
}
exports.PluginEquipViewModel = PluginEquipViewModel;
//# sourceMappingURL=PluginEquipViewModel.js.map