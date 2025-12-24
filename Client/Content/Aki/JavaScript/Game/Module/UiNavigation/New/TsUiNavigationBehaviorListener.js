"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TsUiNavigationBehaviorListener = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const GlobalData_1 = require("../../../GlobalData");
const UiNavigationScrollProxy_1 = require("./Scroll/UiNavigationScrollProxy");
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
    this.IsUseDrag = false;
    this.IsUsePool = false;
    this.NavigateTolerance = 0;
    this.NavigateToleranceReverse = 0;
    this.ScrollProxy = undefined;
    this.LayoutBase = undefined;
    this.TextChangeComponent = undefined;
    this.PanelConfig = undefined;
    this.InNavigation = false;
    this.ChildTagMap = undefined;
    this.NavigationComponent = undefined;
    this.IsAwakeCalled = false;
    this.IsStartCalled = false;
    this.IsInitLayout = false;
    this.IsFocusScrollbar = false;
    this.AnimController = undefined;
    this.IsInitAnimController = false;
    this.DynamicGridActor = undefined;
    this.InstanceId = 0;
    this.NavigationMode = undefined;
    this.ModeModule = undefined;
    this.Cursor = undefined;
    this.CursorModule = undefined;
  }
  Constructor() {
    this.ScrollProxy = undefined;
    this.LayoutBase = undefined;
    this.TextChangeComponent = undefined;
    this.PanelConfig = undefined;
    this.InNavigation = false;
    this.ChildTagMap = undefined;
    this.NavigationComponent = undefined;
    this.IsAwakeCalled = false;
    this.IsStartCalled = false;
    this.IsInitLayout = false;
    this.IsFocusScrollbar = false;
    this.AnimController = undefined;
    this.IsInitAnimController = false;
    this.DynamicGridActor = undefined;
    this.InstanceId = 0;
    this.ModeModule = undefined;
    this.CursorModule = undefined;
  }
  AwakeBP() {
    if (GlobalData_1.GlobalData.GameInstance) {
      this.InstanceId = UiNavigationGlobalData_1.UiNavigationGlobalData.GetListenerInstanceId();
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
      if (this.PanelConfig?.IsAllowNavigate() && this.GetNavigationComponent().HandlePointerEnter(i)) {
        this.SetListenerInNavigation();
      }
    }
  }
  OnNotifyNavigationSelectBP(i) {
    if (!!GlobalData_1.GlobalData.GameInstance && !StringUtils_1.StringUtils.IsBlank(this.GroupName)) {
      if (this.PanelConfig?.IsAllowNavigate()) {
        if (this.GetNavigationComponent().HandlePointerSelect(i)) {
          this.SetListenerInNavigation();
        } else {
          UiNavigationLogic_1.UiNavigationLogic.UpdateSameNavigationListener(this);
        }
      }
    }
  }
  OnCheckCanSetNavigationBP() {
    var i;
    if (!this.ScrollProxy || !this.ScrollProxy.HasLoopScrollView() || (i = this.ScrollProxy.GetLoopScrollViewNavigationIndex()) === -1) {
      return this.InNavigation;
    } else if (UiNavigationGlobalData_1.UiNavigationGlobalData.IsAllowLoopScrollInteractHighlight) {
      return i === this.LoopScrollViewGridIndex && this.InNavigation;
    } else {
      return i !== this.LoopScrollViewGridIndex && this.InNavigation;
    }
  }
  OnCheckLoopScrollChangeNavigationBP() {
    return !!this.ScrollProxy && this.ScrollProxy.CheckLoopScrollChangeNavigation();
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
      this.GetNavigationComponent().SetIsInteractive(true);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("UiNavigation", 10, "导航对象可交互", ["name", this.RootUIComp.displayName]);
      }
      UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKey();
    }
  }
  OnNotifyNotInteractiveBP() {
    if (GlobalData_1.GlobalData.GameInstance) {
      this.GetNavigationComponent().SetIsInteractive(false);
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
      this.ScrollProxy = undefined;
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
    if (!this.IsInitAnimController) {
      this.IsInitAnimController = true;
      if (this.ScrollProxy) {
        this.AnimController = this.ScrollProxy.GetInturnAnimController();
      }
      if (this.LayoutBase) {
        this.AnimController = this.LayoutBase?.GetOwner().GetComponentByClass(UE.UIInturnAnimController.StaticClass());
      }
    }
  }
  InitScrollView() {
    if (!!this.ScrollViewActor && !this.ScrollProxy && !(this.ScrollProxy = new UiNavigationScrollProxy_1.UiNavigationScrollProxy(), this.ScrollProxy.InitScrollView(this.ScrollViewActor, this.RootUIComp), this.DynamicGridActor = this.ScrollProxy.GetDynamicGridActor(), this.BindLoopScrollView(), this.ScrollProxy.ScrollView)) {
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
    if (this.ScrollProxy) {
      i = this.GetSelectableComponent();
      this.ScrollProxy.BindScrollView(i);
    }
  }
  UnBindLoopScrollView() {
    var i;
    if (this.ScrollProxy) {
      i = this.GetSelectableComponent();
      this.ScrollProxy.UnBindScrollView(i);
    }
  }
  HasNormalScrollView() {
    return !!this.ScrollProxy && this.ScrollProxy.HasNormalScrollView();
  }
  HasLoopScrollView() {
    return !!this.ScrollProxy && this.ScrollProxy.HasLoopScrollView();
  }
  HasDynamicScrollView() {
    return !!this.ScrollProxy && this.ScrollProxy.HasDynamicScrollView();
  }
  HasMultiTemplateScrollView() {
    return !!this.ScrollProxy && this.ScrollProxy.HasMultiTemplateScrollView();
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
    if (!this.NavigationComponent) {
      var s = [];
      for (let i = 0, t = this.InteractiveParam.Num(); i < t; ++i) {
        var h = this.InteractiveParam.Get(i);
        s.push(h);
      }
      this.NavigationComponent = NavigationSelectableCreator_1.NavigationSelectableCreator.CreateNavigationBehavior(this.GetOwner(), this.InteractiveTag, s);
      this.NavigationComponent.SetListener(this);
      this.NavigationComponent.Init();
    }
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
    return !!(this.ScrollProxy?.ScrollView ?? this.LayoutBase);
  }
  GetScrollOrLayoutActor() {
    return this.ScrollViewActor || this.LayoutActor || undefined;
  }
  IsScrollOrLayoutActive() {
    this.InitScrollViewAndLayout();
    if (this.ScrollProxy) {
      return this.ScrollProxy.IsScrollViewActive();
    } else {
      return !!this.LayoutBase && this.LayoutBase.RootUIComp.IsUIActiveInHierarchy();
    }
  }
  IsInScrollOrLayoutAnimation() {
    this.InitAnimController();
    return this.AnimController?.IsPlaying() ?? false;
  }
  IsInNormalScrollDisplayByGridActor() {
    return !this.HasNormalScrollView() || !this.GridBaseActor || this.ScrollProxy.IsInNormalScrollDisplayByGridActor(this.GridBaseActor);
  }
  IsInLoopScrollDisplay() {
    return !this.ScrollProxy || this.ScrollProxy.IsInLoopScrollDisplay(this.LoopScrollViewGridIndex);
  }
  IsInLoopScrollDisplayByGridActor() {
    return !this.ScrollProxy || this.ScrollProxy.IsInLoopScrollDisplayByGridActor(this.GridBaseActor);
  }
  IsInDynScrollDisplay() {
    return !this.ScrollProxy || this.ScrollProxy.IsInDynScrollDisplay(this.GridBaseActor);
  }
  IsInScrollDisplayByGridActor() {
    return !this.ScrollProxy || this.ScrollProxy.IsScrollDisplayByGridActor(this.GridBaseActor);
  }
  IsInScrollOrLayoutCanFocus() {
    var i = this.GetNavigationComponent();
    return !!i && i.CanFocusInScrollOrLayout();
  }
  IsCanFocus() {
    var i = this.GetNavigationComponent();
    return !!i && i.CanFocus();
  }
  IsRegisterToPanelConfig() {
    return this.IsStartCalled;
  }
  IsListenerActive() {
    var i = this.GetNavigationComponent();
    return !!i && i.IsActive();
  }
  IsIgnoreScrollOrLayoutCheckInSwitchGroup() {
    var i = this.GetNavigationComponent();
    return !!i && i.IsIgnoreScrollOrLayoutCheckInSwitchGroup();
  }
  ResetNavigationState() {
    this.InNavigation = false;
    this.PanelConfig?.ViewHandle?.ResetNavigationDirty(this.InstanceId);
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
    if (this.ScrollViewActor && this.ScrollProxy) {
      this.ScrollProxy.SetLoopScrollViewNavigationIndex(i);
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
    return this.GetNavigationComponent().GetTipsTextId();
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