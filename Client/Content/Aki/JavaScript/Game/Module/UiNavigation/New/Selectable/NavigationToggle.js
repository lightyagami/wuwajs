"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationToggle = undefined;
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiNavigationViewManager_1 = require("../UiNavigationViewManager");
const NavigationSelectableBase_1 = require("./NavigationSelectableBase");
class NavigationToggle extends NavigationSelectableBase_1.NavigationSelectableBase {
  constructor() {
    super(...arguments);
    this.gBo = e => {
      UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKeyTextId();
    };
    this.Bke = e => {
      this.OnToggleClick(e);
    };
  }
  OnInit() {
    this.fBo();
    this.pBo();
  }
  OnClear() {
    this.vBo();
    this.MBo();
  }
  fBo() {
    var e = this.Selectable;
    if (this.Listener.HotKeyTipsTextIdMap.Num() > 0) {
      e.OnStateChange.Add(this.gBo);
    }
  }
  vBo() {
    var e = this.Selectable;
    if (this.Listener.HotKeyTipsTextIdMap.Num() > 0) {
      e.OnStateChange.Remove(this.gBo);
    }
  }
  pBo() {
    if (this.NeedAddToggleClick()) {
      this.Selectable.OnStateChange.Add(this.Bke);
    }
  }
  MBo() {
    if (this.NeedAddToggleClick()) {
      this.Selectable.OnStateChange.Remove(this.Bke);
    }
  }
  OnToggleClick(e) {}
  ScrollToSelectableComponent(e) {
    if (!this.Listener.HasDynamicScrollView()) {
      if (this.Listener.ScrollView) {
        this.Listener.ScrollView.ScrollToSelectableComponent(e);
      }
    }
  }
  NeedAddToggleClick() {
    return this.GetType() !== "Toggle";
  }
  OnCanFocusInScrollOrLayout() {
    var e;
    return !!this.IsInteractive && ((e = this.Selectable).ToggleState === 1 || !e.bCheckToggleSelected) && !!this.Selectable.RootUIComp.IsUIActiveInHierarchy();
  }
  OnGetTipsTextId() {
    if (this.Selectable.ToggleState === 1) {
      return this.Listener.HotKeyTipsTextIdMap.Get(2);
    } else {
      return this.Listener.HotKeyTipsTextIdMap.Get(1);
    }
  }
  OnHandlePointerEnter(e) {
    return !this.Selectable.bToggleOnSelect;
  }
  OnHandlePointerSelect(e) {
    var t;
    return !!this.OnHandlePointerSelectInheritance(e) && ((t = this.Selectable).ToggleState === 0 ? (e && e.inputType === 1 && t.bToggleOnSelect && t.SetToggleState(1, true), this.ScrollToSelectableComponent(t)) : t.ToggleState === 2 ? (this.ScrollToSelectableComponent(t), e && e.inputType === 1 && t.bToggleOnSelect && ControllerHolder_1.ControllerHolder.UiNavigationNewController.SimulateClickItem(t.RootUIComp)) : this.ScrollToSelectableComponent(t), !!this.IsAllowNavigationByGroup());
  }
  OnHandlePointerSelectInheritance(e) {
    return true;
  }
}
exports.NavigationToggle = NavigationToggle;
//# sourceMappingURL=NavigationToggle.js.map