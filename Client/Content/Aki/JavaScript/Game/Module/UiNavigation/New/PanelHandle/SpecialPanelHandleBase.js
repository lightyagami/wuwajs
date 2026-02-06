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
    var e = this.GetNavigationGroup(t.GroupName);
    if (e) {
      e.DefaultListener ||= t;
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
    var e = [];
    for (const i of this.hBo) {
      if (i.TagArray.Contains(t)) {
        e.push(i);
      }
    }
    return e;
  }
  GetListenerSet() {
    return this.hBo;
  }
  SetDefaultNavigationListenerList(t) {
    this.OnDefaultNavigationListenerList(t);
  }
  ReplaceDefaultNavigationListener(t, e) {
    if (this.DefaultNavigationListener.length <= e) {
      this.DefaultNavigationListener.push(t);
    } else {
      this.DefaultNavigationListener[e] = t;
    }
    this.SetNavigationGroupDefaultListener(t);
  }
  GetDefaultListenerIndex(t) {
    return this.DefaultNavigationListener.indexOf(t);
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
  CanOverrideFindNavigation(t, e, i) {
    return this.OnCanOverrideFindNavigation(t, e, i);
  }
  HandleOverrideFindNavigation(t, e, i) {
    return this.OnHandleOverrideFindNavigation(t, e, i);
  }
  HandleAfterFindOpposite(t, e, i, r) {
    return this.OnHandleAfterFindOpposite(t, e, i, r);
  }
  TryRemoveListener(i) {
    this.DeleteListener(i);
    var t;
    var r = this.GetNavigationGroup(i.GroupName);
    if (r) {
      for (let t = 0, e = r.ListenerList.length; t < e; ++t) {
        if (r.ListenerList[t].GetOwner() === i.GetOwner()) {
          r.RemoveListenerByIndex(t);
          break;
        }
      }
      if (r.ListenerList.length > 0 && ((t = this.GetDefaultListenerIndex(i)) !== -1 && this.ReplaceDefaultNavigationListener(r.ListenerList[0], t), r.DefaultListener) && r.DefaultListener === i) {
        r.DefaultListener = r.ListenerList[0];
      }
    }
  }
  OnGetSuitableNavigationListenerList(t) {
    return this.DefaultNavigationListener;
  }
  OnDefaultNavigationListenerList(i) {
    var r = [];
    for (let t = 0, e = i.Num(); t < e; ++t) {
      var n = i.Get(t)?.GetComponentByClass(UE.TsUiNavigationBehaviorListener_C.StaticClass());
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
  OnCanOverrideFindNavigation(t, e, i) {
    return false;
  }
  OnHandleOverrideFindNavigation(t, e, i) {}
  OnHandleAfterFindOpposite(t, e, i, r) {
    return i;
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