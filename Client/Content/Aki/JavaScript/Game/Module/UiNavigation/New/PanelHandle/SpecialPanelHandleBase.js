"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialPanelHandleBase = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const UiNavigationNewController_1 = require("../UiNavigationNewController");
class SpecialPanelHandleBase {
  constructor(t) {
    this.DefaultNavigationListener = [];
    this.hBo = new Set();
    this.Npo = new Map();
    this.E9 = "Default";
    this.E9 = t;
  }
  SetNavigationGroupDefaultListener(t) {
    var i = this.GetNavigationGroup(t.GroupName);
    if (i) {
      i.DefaultListener ||= t;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiNavigation", 10, "找不到导航组信息", ["导航组名字", t.GroupName], ["导航监听对象", t.RootUIComp.displayName]);
    }
  }
  GetNavigationGroup(t) {
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      return this.Npo.get(t);
    }
  }
  Init() {
    this.OnInit();
  }
  SetGroupMap(t) {
    this.Npo = t;
  }
  AddListener(t) {
    this.hBo.add(t);
  }
  DeleteListener(t) {
    this.hBo.delete(t);
  }
  GetListenerListByTag(t) {
    var i = [];
    for (const e of this.hBo) {
      if (e.TagArray.Contains(t)) {
        i.push(e);
      }
    }
    return i;
  }
  GetListenerSet() {
    return this.hBo;
  }
  SetDefaultNavigationListenerList(t) {
    this.OnDefaultNavigationListenerList(t);
  }
  ReplaceDefaultNavigationListener(t, i) {
    if (this.DefaultNavigationListener.length <= i) {
      this.DefaultNavigationListener.push(t);
    } else {
      this.DefaultNavigationListener[i] = t;
    }
    this.SetNavigationGroupDefaultListener(t);
  }
  GetSuitableNavigationListenerList(t) {
    return this.OnGetSuitableNavigationListenerList(t);
  }
  NotifyFindResult(t) {
    this.OnNotifyFindResult(t);
  }
  GetLoopOrLayoutListener(t) {
    return this.OnGetLoopOrLayoutListener(t);
  }
  GetSuitableListenerWithoutLayout(t) {
    t = this.GetNavigationGroup(t.GroupName);
    return UiNavigationNewController_1.UiNavigationNewController.FindSuitableListenerWithoutLayout(t);
  }
  ResetGroupConfigMemory() {
    for (const t of this.Npo.values()) {
      if (t.SelectableMemory) {
        t.LastSelectListener = undefined;
      }
    }
  }
  IsFirstFindFromSubPanel() {
    return this.OnIsFirstFindFromSubPanel();
  }
  CanOverrideFindNavigation(t, i, e) {
    return this.OnCanOverrideFindNavigation(t, i, e);
  }
  HandleOverrideFindNavigation(t, i, e) {
    return this.OnHandleOverrideFindNavigation(t, i, e);
  }
  HandleAfterFindOpposite(t, i, e, r) {
    return this.OnHandleAfterFindOpposite(t, i, e, r);
  }
  OnGetSuitableNavigationListenerList(t) {
    return this.DefaultNavigationListener;
  }
  OnDefaultNavigationListenerList(e) {
    var r = [];
    for (let t = 0, i = e.Num(); t < i; ++t) {
      var n = e.Get(t)?.GetComponentByClass(UE.TsUiNavigationBehaviorListener_C.StaticClass());
      r.push(n);
      if (n) {
        this.SetNavigationGroupDefaultListener(n);
      }
    }
    this.DefaultNavigationListener = r;
  }
  OnGetLoopOrLayoutListener(t) {
    t = this.GetNavigationGroup(t.GroupName);
    return UiNavigationNewController_1.UiNavigationNewController.FindLoopOrDynListener(t);
  }
  OnNotifyFindResult(t) {}
  OnIsFirstFindFromSubPanel() {
    return false;
  }
  OnCanOverrideFindNavigation(t, i, e) {
    return false;
  }
  OnHandleOverrideFindNavigation(t, i, e) {}
  OnHandleAfterFindOpposite(t, i, e, r) {
    return e;
  }
  Clear() {
    this.OnClear();
    this.Npo.clear();
    this.hBo?.clear();
  }
  GetType() {
    return this.E9;
  }
  OnInit() {}
  OnClear() {}
}
exports.SpecialPanelHandleBase = SpecialPanelHandleBase;
//# sourceMappingURL=SpecialPanelHandleBase.js.map