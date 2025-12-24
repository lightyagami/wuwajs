"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationSelectableBase = undefined;
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const FindMultiTemplateNavigationListener_1 = require("../FindAction/FindMultiTemplateNavigationListener");
const TsUiNavigationBehaviorListener_1 = require("../TsUiNavigationBehaviorListener");
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
  CheckFindOpposite() {
    return !!this.Listener.IsCanFocus() && this.OnCheckFindOpposite();
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
  FindMultiTemplateScrollViewNavigationComponent(t, i, e, r, n, s) {
    t = this.OnFindMultiTemplateScrollViewNavigationComponent(t, i, e, n, s);
    i = t[0]?.GetOwner()?.GetComponentByClass(TsUiNavigationBehaviorListener_1.default.StaticClass());
    e = this.Listener.PanelConfig?.HandleAfterFindOpposite(r, this.Listener, i, t[1]);
    if (t[2] !== -1 && !e) {
      (n = new FindMultiTemplateNavigationListener_1.FindMultiTemplateNavigationListener()).PanelConfig = this.Listener.PanelConfig;
      n.AddParam([this.Listener, t[2]]);
      this.Listener.PanelConfig?.SetFindNavigationAction(n);
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.MarkViewHandleRefreshNavigationDirty();
    }
    s = e?.GetSelectableComponent();
    return s;
  }
  MultiTemplateScrollViewScrollToIndex(t, i) {
    this.Listener.ScrollProxy.ScrollView.TryScrollToGridIndex(t, i);
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
  OnCheckFindOpposite() {
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
  OnFindLoopScrollViewNavigationComponent(e, r) {
    let n = undefined;
    if (this.Listener.HasLoopScrollView()) {
      let t = 0;
      let i = this.Listener;
      while (t < 20 && (n = this.Listener.ScrollProxy.ScrollView.FindNavigationComponent(i.GetSelectableComponent(), e, r)) !== undefined && (i = n?.GetOwner()?.GetComponentByClass(TsUiNavigationBehaviorListener_1.default.StaticClass()), t++, !i?.IsCanFocus()));
    }
    return n;
  }
  OnFindMultiTemplateScrollViewNavigationComponent(t, i, e, r, n) {
    let s = undefined;
    let o = true;
    let a = -1;
    var h;
    var l;
    if (this.Listener.HasMultiTemplateScrollView() && (l = (h = this.Listener.ScrollProxy.ScrollView).GetGridIndexByChildComponent(this.Listener.GetSelectableComponent()), (a = h.FindNavigationIndex(this.Listener.GetSelectableComponent(), t, i, e, r, n)) !== -1)) {
      s = h.IsInDisplayRange(a) ? h.GetNavigationComponentByGridIndex(a) : undefined;
      o = this.Listener.ScrollProxy.GetMultiTemplateScrollPositiveFind(t, l, a);
      this.Listener.ScrollProxy.TryMultiTemplateScrollToGridIndex(l, a);
    }
    return [s, o, a];
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