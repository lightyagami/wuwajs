"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TsUiNavigationBehaviorListener = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const GlobalData_1 = require("../../../GlobalData");
const NavigationSelectableCreator_1 = require("./Selectable/NavigationSelectableCreator");
const UiNavigationCursorModule_1 = require("./UiNavigationCursorModule");
const UiNavigationGlobalData_1 = require("./UiNavigationGlobalData");
const UiNavigationLogic_1 = require("./UiNavigationLogic");
const UiNavigationModeModule_1 = require("./UiNavigationModeModule");
const UiNavigationViewManager_1 = require("./UiNavigationViewManager");
class TsUiNavigationBehaviorListener extends UE.UINavigationBehaviour {
  constructor() {
    super(...arguments);
    this.GroupName = "";
    this.TagArray = undefined;
    this.ExitTagPriority = 0;
    this.ShieldHotKeyIndexArray = undefined;
    this.ScrollViewActor = undefined;
    this.GridBaseActor = undefined;
    this.LayoutActor = undefined;
    this.HotKeyTipsTextIdMap = undefined;
    this.ClickPivot = new UE.Vector2D(0.5, 0.5);
    this.InsideGroupActor = undefined;
    this.InsideActorMap = undefined;
    this.ScrollbarIndex = 0;
    this.InteractiveTag = "";
    this.InteractiveParam = undefined;
    this.DynamicTag = "";
    this.OpenAdsorbed = false;
    this.AdsorbedDistance = 0;
    this.AdsorbedPivot = new UE.Vector2D(0.5, 0.5);
    this.IsUsePool = false;
    this.NavigateTolerance = 0;
    this.ScrollView = undefined;
    this.LayoutBase = undefined;
    this.TextChangeComponent = undefined;
    this.PanelConfig = undefined;
    this.InNavigation = false;
    this.ChildTagMap = undefined;
    this.NavigationComponent = undefined;
    this.IsAwakeCalled = false;
    this.IsStartCalled = false;
    this.IsInitLayout = false;
    this.IsInitScroll = false;
    this.IsFocusScrollbar = false;
    this.AnimController = undefined;
    this.IsInitAnimController = false;
    this.NavigationMode = undefined;
    this.ModeModule = undefined;
    this.Cursor = undefined;
    this.CursorModule = undefined;
  }
  Constructor() {
    this.ScrollView = undefined;
    this.LayoutBase = undefined;
    this.TextChangeComponent = undefined;
    this.PanelConfig = undefined;
    this.InNavigation = false;
    this.ChildTagMap = undefined;
    this.NavigationComponent = undefined;
    this.IsAwakeCalled = false;
    this.IsStartCalled = false;
    this.IsInitLayout = false;
    this.IsInitScroll = false;
    this.IsFocusScrollbar = false;
    this.AnimController = undefined;
    this.IsInitAnimController = false;
    this.ModeModule = undefined;
    this.CursorModule = undefined;
  }
  AwakeBP() {
    if (GlobalData_1.GlobalData.GameInstance) {
      this.AwakeInit();
    }
  }
  StartBP() {
    if (GlobalData_1.GlobalData.GameInstance) {
      this.StartInit();
    }
  }
  OnNotifyNavigationEnterBP(i) {
    if (!!GlobalData_1.GlobalData.GameInstance && !StringUtils_1.StringUtils.IsBlank(this.GroupName)) {
      if (this.PanelConfig?.IsAllowNavigate() && this.NavigationComponent.HandlePointerEnter(i)) {
        this.SetListenerInNavigation();
      }
    }
  }
  OnNotifyNavigationSelectBP(i) {
    if (!!GlobalData_1.GlobalData.GameInstance && !StringUtils_1.StringUtils.IsBlank(this.GroupName)) {
      if (this.PanelConfig?.IsAllowNavigate()) {
        if (this.NavigationComponent.HandlePointerSelect(i)) {
          this.SetListenerInNavigation();
        } else {
          UiNavigationLogic_1.UiNavigationLogic.UpdateSameNavigationListener(this);
        }
      }
    }
  }
  OnCheckCanSetNavigationBP() {
    if (!this.ScrollView || !(this.ScrollView instanceof UE.UILoopScrollViewComponent) || this.ScrollView.NavigationIndex === -1) {
      return this.InNavigation;
    } else if (UiNavigationGlobalData_1.UiNavigationGlobalData.IsAllowLoopScrollInteractHighlight) {
      return this.ScrollView.NavigationIndex === this.LoopScrollViewGridIndex && this.InNavigation;
    } else {
      return this.ScrollView.NavigationIndex !== this.LoopScrollViewGridIndex && this.InNavigation;
    }
  }
  OnCheckLoopScrollChangeNavigationBP() {
    return !!this.ScrollView && !!this.ScrollView.IsChangeNavigation && (this.ScrollView.ResetIsChangeNavigation(), true);
  }
  OnEnableBP() {
    if (GlobalData_1.GlobalData.GameInstance) {
      this.TryReStartInit();
      UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKey();
      this.RefreshPanelConfig();
      this.TryFindScrollbar();
    }
  }
  OnDisableBP() {
    if (GlobalData_1.GlobalData.GameInstance) {
      UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKey();
      this.DisActiveHandle();
    }
  }
  OnNotifyInteractiveBP() {
    if (GlobalData_1.GlobalData.GameInstance) {
      this.NavigationComponent.SetIsInteractive(true);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("UiNavigation", 10, "导航对象可交互", ["name", this.RootUIComp.displayName]);
      }
      UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKey();
    }
  }
  OnNotifyNotInteractiveBP() {
    if (GlobalData_1.GlobalData.GameInstance) {
      this.NavigationComponent.SetIsInteractive(false);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("UiNavigation", 10, "导航对象不可交互", ["name", this.RootUIComp.displayName]);
      }
      UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKey();
      this.DisActiveHandle();
    }
  }
  OnDestroyBP() {
    if (GlobalData_1.GlobalData.GameInstance) {
      this.DisActiveHandle();
      this.UnBindLoopScrollView();
      this.UnRegisterListenerToPanel();
      this.NavigationComponent?.Clear();
      this.PanelConfig = undefined;
      this.LayoutBase = undefined;
      this.ScrollView = undefined;
    }
  }
  AwakeInit() {
    if (!this.IsAwakeCalled) {
      this.InNavigation = false;
      this.ModeModule = new UiNavigationModeModule_1.UiNavigationModeModule(this);
      this.CursorModule = new UiNavigationCursorModule_1.UiNavigationCursorModule(this.Cursor);
      this.ChildTagMap = new Map();
      this.CreateNavigationComponent();
      this.RegisterListenerToPanel();
      this.IsAwakeCalled = true;
    }
  }
  StartInit() {
    if (!this.IsStartCalled) {
      this.SetTextChangeComponent();
      this.InitInsideGroupActor();
      this.NotifyParentListener(this);
      this.RegisterListenerToPanel();
      this.InitScrollViewAndLayout();
      UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKey();
      this.RefreshPanelConfig();
      this.IsStartCalled = true;
    }
  }
  TryReStartInit() {
    if (!!this.IsUsePool && !!this.IsStartCalled && !!this.PanelConfig && (!this.PanelConfig.IsValid() || !this.PanelConfig.RootUIComp?.IsValid())) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiNavigation", 10, "可能存在从对象池获取的情况[TsUiNavigationBehaviorListener]", ["GroupName", this.GroupName], ["Name", this.RootUIComp.displayName]);
      }
      this.IsStartCalled = false;
      this.IsInitScroll = false;
      this.IsInitLayout = false;
      this.PanelConfig = undefined;
      this.StartInit();
    }
  }
  InitScrollViewAndLayout() {
    this.InitScrollView();
    this.InitLayout();
  }
  InitAnimController() {
    var i;
    if (!this.IsInitAnimController) {
      this.IsInitAnimController = true;
      if (this.ScrollView) {
        i = this.ScrollView?.GetContent();
        this.AnimController = i?.GetComponentByClass(UE.UIInturnAnimController.StaticClass());
      }
      if (this.LayoutBase) {
        this.AnimController = this.LayoutBase?.GetOwner().GetComponentByClass(UE.UIInturnAnimController.StaticClass());
      }
    }
  }
  InitScrollView() {
    if (!!this.ScrollViewActor && !this.IsInitScroll && !(this.ScrollView = this.ScrollViewActor.GetComponentByClass(UE.UIScrollViewWithScrollbarComponent.StaticClass()), this.BindLoopScrollView(), this.IsInitScroll = true, this.ScrollView)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiNavigation", 10, "找不到滚动列表组件", ["节点", this.RootUIComp.displayName]);
      }
    }
  }
  InitLayout() {
    if (!!this.LayoutActor && !this.IsInitLayout && !(this.LayoutBase = this.LayoutActor.GetComponentByClass(UE.UILayoutBase.StaticClass()), this.IsInitLayout = true, this.LayoutBase)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiNavigation", 10, "找不到循环滚动列表组件", ["节点", this.RootUIComp.displayName]);
      }
    }
  }
  TryFindScrollbar() {
    if (this.PanelConfig) {
      this.PanelConfig.TryFindScrollbar();
    }
  }
  DisActiveHandle() {
    if (this.PanelConfig && (this.InNavigation && (this.InNavigation = false, this.PanelConfig.ReFindNavigation()), this.IsFocusScrollbar)) {
      this.PanelConfig.ReFindScrollbar();
    }
  }
  SetTextChangeComponent() {
    this.TextChangeComponent = this.GetOwner().GetComponentByClass(UE.TsUiNavigationTextChangeListener_C.StaticClass());
  }
  NotifyParentListener(i) {
    var t = UiNavigationLogic_1.UiNavigationLogic.FindUpNavigationListener(this.GetOwner());
    if (t) {
      t.RegisterChildListener(i);
    }
  }
  RegisterChildListener(s) {
    for (let i = 0, t = s.TagArray.Num(); i < t; ++i) {
      var h = s.TagArray.Get(i);
      this.ChildTagMap.set(h, s);
    }
    this.NotifyParentListener(s);
  }
  InitInsideGroupActor() {
    this.InsideGroupActor ||= this.GetOwner();
  }
  BindLoopScrollView() {
    var i;
    if (this.HasLoopScrollView()) {
      i = this.GetSelectableComponent();
      this.ScrollView.BindParentUIItem(i);
    }
  }
  UnBindLoopScrollView() {
    var i;
    if (this.HasLoopScrollView() && this.ScrollView.IsValid()) {
      i = this.GetSelectableComponent();
      this.ScrollView.UnBindParentUIItem(i);
    }
  }
  HasNormalScrollView() {
    return !!this.ScrollView && !this.HasLoopScrollView() && !this.HasDynamicScrollView();
  }
  HasLoopScrollView() {
    return !!this.ScrollView && this.ScrollView instanceof UE.UILoopScrollViewComponent;
  }
  HasDynamicScrollView() {
    return !!this.ScrollView && this.ScrollView instanceof UE.UIDynScrollViewComponent;
  }
  RegisterListenerToPanel() {
    if (!this.PanelConfig) {
      this.PanelConfig = UiNavigationLogic_1.UiNavigationLogic.FindUiNavigationPanelConfig(this.GetOwner());
      if (this.PanelConfig) {
        this.PanelConfig.RegisterNavigationListener(this);
        this.PanelConfig.DynamicListenerConfigHandle(this);
      }
    }
  }
  UnRegisterListenerToPanel() {
    if (this.PanelConfig) {
      this.PanelConfig.UnRegisterNavigationListener(this);
    }
  }
  RefreshPanelConfig() {
    if (!StringUtils_1.StringUtils.IsBlank(this.GroupName)) {
      if (this.PanelConfig) {
        this.PanelConfig.FindNavigationInNoneState();
      }
    }
  }
  CreateNavigationComponent() {
    var s = [];
    for (let i = 0, t = this.InteractiveParam.Num(); i < t; ++i) {
      var h = this.InteractiveParam.Get(i);
      s.push(h);
    }
    this.NavigationComponent = NavigationSelectableCreator_1.NavigationSelectableCreator.CreateNavigationBehavior(this.GetOwner(), this.InteractiveTag, s);
    this.NavigationComponent.SetListener(this);
    this.NavigationComponent.Init();
  }
  GetNavigationComponent() {
    if (!this.NavigationComponent) {
      this.CreateNavigationComponent();
    }
    return this.NavigationComponent;
  }
  GetSelectableComponent() {
    return this.GetBehaviorComponent();
  }
  GetBehaviorComponent() {
    return this.GetNavigationComponent().GetSelectable();
  }
  GetSceneComponent() {
    return this.GetBehaviorComponent().GetRootComponent();
  }
  GetChildListenerByTag(i) {
    return this.ChildTagMap.get(i);
  }
  IsScrollOrLayoutActor() {
    this.InitScrollViewAndLayout();
    return !!(this.ScrollView ?? this.LayoutBase);
  }
  GetScrollOrLayoutActor() {
    return this.ScrollViewActor || this.LayoutActor || undefined;
  }
  IsScrollOrLayoutActive() {
    this.InitScrollViewAndLayout();
    if (this.ScrollView) {
      return this.ScrollView.RootUIComp.IsUIActiveInHierarchy();
    } else {
      return !!this.LayoutBase && this.LayoutBase.RootUIComp.IsUIActiveInHierarchy();
    }
  }
  IsInScrollOrLayoutAnimation() {
    this.InitAnimController();
    return this.AnimController?.IsPlaying() ?? false;
  }
  IsInNormalScrollDisplayByGridActor() {
    var i;
    var t;
    return !this.HasNormalScrollView() || !this.GridBaseActor || (i = (0, puerts_1.$ref)(3), t = (0, puerts_1.$ref)(3), this.ScrollView.GetOutOfBottomBoundsType(this.GridBaseActor.GetUIItem(), i, t), this.ScrollView.Vertical ? (0, puerts_1.$unref)(i) === 0 : (0, puerts_1.$unref)(t) === 0);
  }
  IsInLoopScrollDisplay() {
    var i;
    return !this.HasLoopScrollView() || (i = this.ScrollView).NavigationIndex === -1 || i.NavigationIndex === this.LoopScrollViewGridIndex;
  }
  IsInLoopScrollDisplayByGridActor() {
    if (!this.HasLoopScrollView()) {
      return true;
    }
    var i = this.ScrollView;
    var t = (0, puerts_1.$ref)(3);
    var s = (0, puerts_1.$ref)(3);
    var h = this.GetErrorTolerance(i.Vertical);
    let e = undefined;
    e = this.GridBaseActor ? this.GridBaseActor.GetUIItem() : this.RootUIComp;
    i.GetOutOfBottomBoundsType(e, t, s, h);
    if (i.Vertical) {
      return (0, puerts_1.$unref)(t) === 0;
    } else {
      return (0, puerts_1.$unref)(s) === 0;
    }
  }
  GetErrorTolerance(i) {
    var t;
    var s = this.RootUIComp.RelativeScale3D;
    let h = MathUtils_1.MathUtils.KindaSmallNumber;
    if (i && s.Y > 1) {
      t = s.Y - 1;
      h += t * this.RootUIComp.Height / 2;
    } else if (!i && s.X > 1) {
      t = s.X - 1;
      h += t * this.RootUIComp.Width / 2;
    }
    return h;
  }
  IsInDynScrollDisplay() {
    if (!this.HasDynamicScrollView()) {
      return true;
    }
    var i = this.ScrollView;
    var t = (0, puerts_1.$ref)(3);
    var s = (0, puerts_1.$ref)(3);
    var h = this.GetErrorTolerance(i.Vertical);
    let e = undefined;
    e = this.GridBaseActor ? this.GridBaseActor.GetUIItem() : this.RootUIComp;
    i.GetOutOfBottomBoundsType(e, t, s, h);
    if (i.Vertical) {
      return (0, puerts_1.$unref)(t) === 0;
    } else {
      return (0, puerts_1.$unref)(s) === 0;
    }
  }
  IsInScrollOrLayoutCanFocus() {
    return !!this.NavigationComponent && this.NavigationComponent.CanFocusInScrollOrLayout();
  }
  IsCanFocus() {
    return !!this.NavigationComponent && this.NavigationComponent.CanFocus();
  }
  IsRegisterToPanelConfig() {
    return this.IsStartCalled;
  }
  IsListenerActive() {
    return !!this.NavigationComponent && this.NavigationComponent.IsActive();
  }
  IsIgnoreScrollOrLayoutCheckInSwitchGroup() {
    return !!this.NavigationComponent && this.NavigationComponent.IsIgnoreScrollOrLayoutCheckInSwitchGroup();
  }
  ResetNavigationState() {
    this.InNavigation = false;
    this.UpdateNavigationState();
    this.UpdateLoopNavigationIndex(-1);
    this.NotifyUnFocusListener();
  }
  ActiveNavigationState(i) {
    this.InNavigation = true;
    this.UpdateNavigationState();
    this.UpdateLoopNavigationIndex(this.LoopScrollViewGridIndex);
    this.NotifyFocusListener(i);
  }
  UpdateNavigationState() {
    var i = this.GetBehaviorComponent();
    if (i?.IsValid() && i instanceof UE.UISelectableComponent) {
      i.SetSelectionState(i.GetSelectionState());
      i.ApplySelectionState(true);
    }
  }
  UpdateLoopNavigationIndex(i) {
    if (this.ScrollViewActor && this.ScrollView instanceof UE.UILoopScrollViewComponent) {
      this.ScrollView.SetNavigationIndex(i);
    }
  }
  NotifyUnFocusListener() {
    var i = this.GetBehaviorComponent();
    if (i instanceof UE.UISelectableComponent) {
      i.NotifyUnFocusListener();
    }
  }
  NotifyFocusListener(i) {
    var t = this.GetNavigationComponent();
    t.NotifyFocusListener(i);
    var i = t.GetSelectable();
    if (i instanceof UE.UISelectableComponent) {
      i.NotifyFocusListener();
    }
  }
  SetListenerInNavigation() {
    if (UiNavigationGlobalData_1.UiNavigationGlobalData.IsAllowCrossNavigationGroup) {
      UiNavigationGlobalData_1.UiNavigationGlobalData.IsAllowCrossNavigationGroup = false;
      this.PanelConfig.NotifyListenerFocus(this);
    } else if (!this.InNavigation || !this.IsInLoopScrollDisplay()) {
      this.PanelConfig.NotifyListenerFocus(this);
    }
  }
  GetNavigationGroup() {
    return this.PanelConfig?.GetNavigationGroup(this.GroupName);
  }
  IsSelectedToggle() {
    var i = this.GetSelectableComponent();
    return !!i && i.ToggleState === 1;
  }
  NotifyTextChangeByComponent(i) {
    if (this.PanelConfig) {
      this.PanelConfig.UpdateHotKeyTextForce(this.TagArray, i);
    }
  }
  GetTipsTextIdByState() {
    return this.NavigationComponent.GetTipsTextId();
  }
  GetTextChangeComponent() {
    return this.TextChangeComponent;
  }
  FindNavigation(i) {
    var t;
    if (i === 0) {
      return this.GetSceneComponent();
    } else if (i === 6) {
      if ((t = this.ModeModule.FindActorByDirection(1)) && t !== this.GetSceneComponent()) {
        return t;
      } else {
        return this.ModeModule.FindActorByDirection(3);
      }
    } else if (i === 5) {
      if ((t = this.ModeModule.FindActorByDirection(2)) && t !== this.GetSceneComponent()) {
        return t;
      } else {
        return this.ModeModule.FindActorByDirection(4);
      }
    } else {
      return this.ModeModule.FindActorByDirection(i);
    }
  }
  GetCursorOffset() {
    return this.CursorModule.GetCursorOffset();
  }
  GetBoundOffset() {
    return this.CursorModule.GetBoundOffset();
  }
}
exports.TsUiNavigationBehaviorListener = TsUiNavigationBehaviorListener;
exports.default = TsUiNavigationBehaviorListener; //# sourceMappingURL=TsUiNavigationBehaviorListener.js.map