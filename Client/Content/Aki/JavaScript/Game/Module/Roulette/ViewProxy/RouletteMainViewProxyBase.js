"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouletteMainViewProxyBase = undefined;
class RouletteMainViewProxyBase {
  constructor() {
    this.RouletteType = 0;
    this.CanSwitchType = false;
    this.ActionType = 1;
    this.TouchId = undefined;
    this.View = undefined;
  }
  RegisterView(t) {
    this.View = t;
  }
  async BeforeStartAsync() {
    await this.OnBeforeStartAsync();
  }
  Start() {
    this.RouletteType = this.GetRouletteType();
    this.CanSwitchType = this.GetCanSwitchType();
    this.OnStart();
  }
  BeforeShow() {
    this.OnBeforeShow();
  }
  AddEventListenerByStart() {
    this.OnAddEventListenerByStart();
  }
  RemoveEventListenerByStart() {
    this.OnRemoveEventListenerByStart();
  }
  AddEventListener() {
    this.OnAddEventListener();
  }
  RemoveEventListener() {
    this.OnRemoveEventListener();
  }
  CanOpenView() {
    return this.OnCanOpenView();
  }
  GetRouletteComponent() {
    return this.OnGetRouletteComponent();
  }
  GetRouletteType() {
    return this.OnGetRouletteType();
  }
  GetCanSwitchType() {
    return this.OnGetCanSwitchType();
  }
  GetPanelSwitchOpen() {
    return this.OnGetPanelSwitchOpen();
  }
  RouletteTypeSwitch() {
    this.OnRouletteTypeSwitch();
  }
  GetToggle1State() {}
  GetToggle2State() {}
  GetCanOpenAssembly(t) {
    return this.OnGetCanOpenAssembly(t);
  }
  GetExploreRouletteDataMap() {
    return this.OnGetExploreRouletteDataMap();
  }
  GetRouletteGridId(t, e) {
    return this.OnGetRouletteGridId(t, e);
  }
  GetActionName() {
    return this.OnGetActionName();
  }
  RefreshTips() {
    this.OnRefreshTips();
  }
  Destroy() {
    this.OnDestroy();
  }
  async OnBeforeStartAsync() {}
  OnStart() {}
  OnBeforeShow() {}
  OnAddEventListenerByStart() {}
  OnRemoveEventListenerByStart() {}
  OnAddEventListener() {}
  OnRemoveEventListener() {}
  OnRouletteTypeSwitch() {}
  OnRefreshTips() {}
}
exports.RouletteMainViewProxyBase = RouletteMainViewProxyBase;
//# sourceMappingURL=RouletteMainViewProxyBase.js.map