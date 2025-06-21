"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.TabViewComponent = void 0;
const Log_1 = require("../../../../Core/Common/Log"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  UiTabViewStorage_1 = require("../../../Ui/UiTabViewStorage");
class TabViewComponent {
  constructor(i, e = 0) {
    this.Hbt = i, this.FO1 = 0, this.NO1 = void 0, this.y9 = void 0, this.jbt = new Map, this.Wbt = (i, e) => {
      var t = this.NO1 ?? this.y9;
      e.DynamicTabName === t && (e = this.jbt.get(t)) && i.ViewData.SetAttachedView(e)
    }, this.FO1 = e, EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GuideFocusNeedUiTabView, this.Wbt)
  }
  Kbt(i, e) {
    i?.RegisterViewModule?.(e)
  }
  Qbt() {
    for (const i of this.jbt.values()) i.Destroy();
    this.jbt.clear()
  }
  HideCurrentTabView() {
    var i = this.jbt.get(this.NO1);
    i && (i.IsCreateOrCreating || i.IsStarting ? Log_1.Log.CheckInfo() && Log_1.Log.Info("UiTabModule", 10, "异步加载中,不执行页签隐藏", ["TabViewName", this.NO1]) : (i.HideUiTabView(!0), this.NO1 = void 0))
  }
  ToggleCallBack(i, e, t = void 0, o = void 0, s = void 0) {
    const r = this.VO1(e, s);
    void 0 !== this.NO1 && this.HideCurrentTabView(), this.NO1 = r;
    let h = this.jbt.get(r);
    h ? (h.SetParams(i), h.SetExtraParams(o)) : (s = UiTabViewStorage_1.UiTabViewStorage.GetUiTabViewBase(e), (h = new s.CreateUiTabView).SetTabViewName(e), h.SetParams(i), h.SetExtraParams(o), this.Kbt(t, h), this.jbt.set(r, h), h.CreateByResourceIdAsync(s.ResourceId, this.Hbt).then(() => {
      this.NO1 === r ? h?.ShowUiTabViewFromToggle() : h?.HideUiTabView(!0)
    })), h.IsCreateOrCreating || h.IsStarting || h.ShowUiTabViewFromToggle()
  }
  VO1(i, e = void 0) {
    return 1 === this.FO1 && void 0 === e ? (Log_1.Log.CheckError() && Log_1.Log.Error("UiTabModule", 27, "索引模式下必须传入索引"), "") : 1 === this.FO1 ? StringUtils_1.StringUtils.Format("{0}_{1}", i, e.toString()) : i
  }
  GetCurrentTabViewName(i = void 0) {
    var e;
    if (1 !== this.FO1 || void 0 !== i) return 1 === this.FO1 ? 2 !== (e = this.NO1?.split("_"))?.length ? void(Log_1.Log.CheckError() && Log_1.Log.Error("UiTabModule", 27, "索引模式下Key不符合规范")) : e[1] !== i?.toString() ? void(Log_1.Log.CheckError() && Log_1.Log.Error("UiTabModule", 27, "索引模式下Key索引不一致")) : e[0] : this.NO1;
    Log_1.Log.CheckError() && Log_1.Log.Error("UiTabModule", 27, "索引模式下必须传入索引")
  }
  GetCurrentTabView() {
    return this.jbt.get(this.NO1)
  }
  GetTabViewByTabKey(i, e = void 0) {
    return this.jbt.get(this.VO1(i, e))
  }
  SetCurrentTabViewState(i) {
    var e;
    this.NO1 && (e = this.jbt.get(this.NO1)) && (i && e.IsHideOrHiding ? e.ShowUiTabViewFromView() : i || e.IsHideOrHiding || e.HideUiTabView(!1))
  }
  DestroyTabViewComponent() {
    this.Qbt(), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GuideFocusNeedUiTabView, this.Wbt)
  }
}
exports.TabViewComponent = TabViewComponent;
//# sourceMappingURL=TabViewComponent.js.map