"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionChooseMainPanelHandle = undefined;
const UiNavigationGlobalData_1 = require("../UiNavigationGlobalData");
const SpecialPanelHandleBase_1 = require("./SpecialPanelHandleBase");
class VisionChooseMainPanelHandle extends SpecialPanelHandleBase_1.SpecialPanelHandleBase {
  constructor() {
    super(...arguments);
    this.O8a = undefined;
    this.IsFindChangeListenerList = false;
  }
  get ChangeListenerList() {
    var i;
    if (!this.O8a) {
      this.O8a = [...this.DefaultNavigationListener];
      if (this.O8a.length >= 2) {
        i = this.O8a[0];
        this.O8a[0] = this.O8a[1];
        this.O8a[1] = i;
      }
    }
    return this.O8a;
  }
  OnGetSuitableNavigationListenerList(i) {
    if (this.IsFindChangeListenerList) {
      return this.ChangeListenerList;
    } else if (i) {
      if (UiNavigationGlobalData_1.UiNavigationGlobalData.VisionReplaceViewFindDefault) {
        if (i = this.C8a(this.DefaultNavigationListener[0])) {
          return [i];
        } else {
          return this.DefaultNavigationListener;
        }
      } else {
        return this.ChangeListenerList;
      }
    } else {
      return this.DefaultNavigationListener;
    }
  }
  OnNotifyFindResult(i) {
    if (!i.IsInLoopingProcess()) {
      UiNavigationGlobalData_1.UiNavigationGlobalData.VisionReplaceViewFindDefault = true;
      this.IsFindChangeListenerList = false;
    }
  }
  C8a(e) {
    let a = undefined;
    var s = this.GetNavigationGroup(e.GroupName);
    for (let i = 0, t = s.ListenerList.length; i < t; ++i) {
      const e = s.ListenerList[i];
      if (!a && e.IsCanFocus()) {
        a = e;
      }
      if (e.IsInScrollOrLayoutCanFocus()) {
        return e;
      }
    }
    return a;
  }
}
exports.VisionChooseMainPanelHandle = VisionChooseMainPanelHandle;
//# sourceMappingURL=VisionChooseMainPanelHandle.js.map