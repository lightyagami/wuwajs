"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleResonancePanelHandle = undefined;
const SpecialPanelHandleBase_1 = require("./SpecialPanelHandleBase");
const MAX_NUM = 6;
class RoleResonancePanelHandle extends SpecialPanelHandleBase_1.SpecialPanelHandleBase {
  constructor() {
    super(...arguments);
    this.GroupName = "";
    this.sBo = undefined;
    this.Goh = [];
    this.koh = false;
    this.Noh = [];
    this.Foh = false;
  }
  get Voh() {
    if (this.koh) {
      this.koh = false;
      this.Goh.sort((t, e) => {
        t = t.IsValid() ? t.RootUIComp.flattenHierarchyIndex : 0;
        e = e.IsValid() ? e.RootUIComp.flattenHierarchyIndex : 0;
        if (t === e || t < e) {
          return -1;
        } else {
          return 1;
        }
      });
    }
    return this.Goh;
  }
  get Hoh() {
    if (this.Foh) {
      this.Foh = false;
      this.Noh.sort((t, e) => {
        t = t.IsValid() ? t.RootUIComp.flattenHierarchyIndex : 0;
        e = e.IsValid() ? e.RootUIComp.flattenHierarchyIndex : 0;
        if (t === e || t < e) {
          return -1;
        } else {
          return 1;
        }
      });
    }
    return this.Noh;
  }
  OnGetSuitableNavigationListenerList(t) {
    if (this.sBo) {
      if (this.sBo.IsCanFocus()) {
        return [this.sBo];
      }
      var e = MAX_NUM - this.Voh.length;
      let i = 0;
      for (let t = 0, e = this.Voh.length; t < e; ++t) {
        if (this.Voh[t] === this.sBo) {
          i = t;
          break;
        }
      }
      return [this.Hoh[e + i]];
    }
    return [];
  }
  SetToggleSelectByGroupName(t) {
    var i = this.GetNavigationGroup(t);
    if (i) {
      this.GroupName = t;
      for (let t = 0, e = i.ListenerList.length; t < e; ++t) {
        i.ListenerList[t].GetBehaviorComponent().bToggleOnSelect = true;
      }
    }
  }
  ResetToggleSelect() {
    var i = this.GetNavigationGroup(this.GroupName);
    if (i) {
      this.GroupName = "";
      for (let t = 0, e = i.ListenerList.length; t < e; ++t) {
        i.ListenerList[t].GetBehaviorComponent().bToggleOnSelect = false;
      }
    }
  }
  SetDefaultNavigationListener(t) {
    this.sBo = t;
  }
  AddLockNavigationListener(t) {
    this.Goh.push(t);
    this.koh = true;
  }
  AddUnLockNavigationListener(t) {
    this.Noh.push(t);
    this.Foh = true;
  }
}
exports.RoleResonancePanelHandle = RoleResonancePanelHandle;
//# sourceMappingURL=RoleResonancePanelHandle.js.map