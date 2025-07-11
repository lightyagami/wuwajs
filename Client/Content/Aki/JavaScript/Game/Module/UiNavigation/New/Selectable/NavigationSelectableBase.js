"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationSelectableBase = undefined;
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const UiNavigationGlobalData_1 = require("../UiNavigationGlobalData");
class NavigationSelectableBase {
  constructor(t, i, e) {
    this.IsInteractive = true;
    this.Selectable = undefined;
    this.Listener = undefined;
    this.PanelHandle = undefined;
    this.E9 = "Button";
    this.ParamList = [];
    this.Selectable = t;
    this.E9 = i;
    this.ParamList = e;
  }
  Init() {
    this.OnInit();
  }
  Start() {
    this.OnStart();
  }
  Clear() {
    this.OnClear();
  }
  CanFocus() {
    return !!this.IsInteractive && !!this.Selectable.IsValid() && !!this.Selectable.RootUIComp.IsUIActiveInHierarchy();
  }
  CanFocusInScrollOrLayout() {
    return this.OnCanFocusInScrollOrLayout();
  }
  IsActive() {
    return !!this.IsInteractive && !!this.Selectable.IsValid() && !!this.Selectable.RootUIComp.IsUIActiveInHierarchy();
  }
  SetIsInteractive(t) {
    this.IsInteractive = t;
  }
  GetSelectable() {
    return this.Selectable;
  }
  SetListener(t) {
    this.Listener = t;
  }
  SetPanelHandle(t) {
    this.PanelHandle = t;
  }
  GetTipsTextId() {
    return this.OnGetTipsTextId();
  }
  CheckFindNavigationBefore() {
    return !UiLayer_1.UiLayer.IsInMask() && this.OnCheckFindNavigationBefore();
  }
  CheckFindOpposite(t) {
    return this.Listener !== t && !!this.Listener.IsCanFocus() && this.OnCheckFindOpposite(t);
  }
  CheckFindNavigationAfter(t) {
    return this.OnCheckFindNavigationAfter(t);
  }
  HandlePointerEnter(t) {
    return !!this.IsAllowNavigationByGroup() && !!this.IsAllowNavigationBySelfParam(t) && !!this.cBo() && this.OnHandlePointerEnter(t);
  }
  HandlePointerSelect(t) {
    return !!this.cBo() && this.OnHandlePointerSelect(t);
  }
  IsIgnoreScrollOrLayoutCheckInSwitchGroup() {
    return this.OnIsIgnoreScrollOrLayoutCheck();
  }
  FindLoopScrollViewNavigationComponent(t, i) {
    return this.OnFindLoopScrollViewNavigationComponent(t, i);
  }
  NotifyFocusListener(t) {
    this.OnNotifyFocusListener(t);
  }
  IsAllowNavigationByGroup() {
    var t;
    return !StringUtils_1.StringUtils.IsEmpty(this.Listener.GroupName) && !!(t = this.Listener.PanelConfig.GetNavigationGroup(this.Listener.GroupName)) && t.GroupType === 0;
  }
  OnGetTipsTextId() {
    return this.Listener.HotKeyTipsTextIdMap.Get(1);
  }
  OnCheckFindNavigationBefore() {
    return true;
  }
  OnCheckFindOpposite(t) {
    return true;
  }
  OnCheckFindNavigationAfter(t) {
    return true;
  }
  IsAllowNavigationBySelfParam(t) {
    return true;
  }
  OnCanFocusInScrollOrLayout() {
    return !!this.IsInteractive && !!this.Selectable.RootUIComp.IsUIActiveInHierarchy();
  }
  OnHandlePointerEnter(t) {
    return true;
  }
  OnIsIgnoreScrollOrLayoutCheck() {
    return false;
  }
  OnFindLoopScrollViewNavigationComponent(t, i) {
    let e = undefined;
    return e = this.Listener.HasLoopScrollView() ? this.Listener.ScrollView.FindNavigationComponent(this.Listener.GetSelectableComponent(), t, i) : e;
  }
  cBo() {
    var t;
    var i;
    return !!this.Listener.PanelConfig && (!!UiNavigationGlobalData_1.UiNavigationGlobalData.IsAllowCrossNavigationGroup || !(t = this.Listener.PanelConfig.GetFocusListener()) || !!(i = this.Listener.PanelConfig.GetNavigationGroup(t.GroupName)) && i.GroupName === this.Listener.GroupName && (!!i.AllowNavigationInSelfDynamic || (this.Listener.ScrollViewActor !== undefined || t.ScrollViewActor !== undefined || this.Listener.LayoutActor !== undefined || t.LayoutActor !== undefined) && this.Listener.ScrollViewActor === t.ScrollViewActor && this.Listener.LayoutActor === t.LayoutActor));
  }
  OnNotifyFocusListener(t) {}
  OnInit() {}
  OnStart() {}
  OnClear() {}
  GetType() {
    return this.E9;
  }
}
exports.NavigationSelectableBase = NavigationSelectableBase;
//# sourceMappingURL=NavigationSelectableBase.js.map