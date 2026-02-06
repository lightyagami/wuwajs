"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiNavigationNewController = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputDistributeDefine_1 = require("../../../Ui/InputDistribute/InputDistributeDefine");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const LguiEventSystemManager_1 = require("../../../Ui/LguiEventSystem/LguiEventSystemManager");
const UiLayer_1 = require("../../../Ui/UiLayer");
const HotKeyViewDefine_1 = require("../HotKeyViewDefine");
const UiNavigationJoystickInput_1 = require("../Module/UiNavigationJoystickInput");
const TsUiNavigationBehaviorListener_1 = require("./TsUiNavigationBehaviorListener");
const TsUiNavigationPanelConfig_1 = require("./TsUiNavigationPanelConfig");
const UiNavigationDefine_1 = require("./UiNavigationDefine");
const UiNavigationGlobalData_1 = require("./UiNavigationGlobalData");
const UiNavigationLogic_1 = require("./UiNavigationLogic");
const UiNavigationViewManager_1 = require("./UiNavigationViewManager");
class UiNavigationNewController extends UiControllerBase_1.UiControllerBase {
  static KBo() {
    var i = UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle();
    if (i) {
      return i.GetScrollbarData();
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiNavigation", 10, "[GetCurrentNavigationScrollbarData]查找不到当前的导航句柄");
    }
  }
  static GetCurrentNavigationActiveListenerByTag(i, t = false) {
    var a = UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle();
    if (a) {
      if (a.GetIsActive()) {
        var e = a.GetActiveListenerByTag(i);
        if (e || t) {
          return e;
        }
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiNavigation", 10, "[GetCurrentNavigationActiveListenerByTag]查找不到对应的按钮", ["Tag", i], ["ViewName", a.ViewName]);
        }
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiNavigation", 10, "[GetCurrentNavigationActiveListenerByTag]当前的导航句柄不在显示中", ["Tag", i], ["ViewName", a.ViewName]);
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiNavigation", 10, "[GetCurrentNavigationActiveListenerByTag]查找不到当前的导航句柄");
    }
  }
  static GetCurrentNavigationFocusListener() {
    var i = UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle();
    if (i) {
      i = i.GetFocusListener();
      if (i) {
        return i;
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiNavigation", 10, "[GetCurrentNavigationFocusListener]查找不到当前的导航句柄");
    }
  }
  static QBo() {
    var i = this.GetCurrentNavigationFocusListener();
    if (i) {
      UiNavigationLogic_1.UiNavigationLogic.MemoryGroupConfigLastSelect(i);
      i = i.GetNavigationGroup();
      if (i) {
        return i;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiNavigation", 10, "[GetCurrentNavigationListenerGroup]查找不到当前导航的导航组,逻辑上有问题");
      }
    }
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LoadLguiEventSystemActor, this.aGe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DestroyLguiEventSystemActor, this.Yfe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerMainTypeChange, this.cEa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PointerInputTypeChange, this.$Bo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyUiNavigationNewControllerSetNavigationFocusForView, UiNavigationNewController.SetNavigationFocusForView);
    InputDistributeController_1.InputDistributeController.BindActions([InputMappingsDefine_1.actionMappings.Ui方向上, InputMappingsDefine_1.actionMappings.Ui方向下, InputMappingsDefine_1.actionMappings.Ui方向左, InputMappingsDefine_1.actionMappings.Ui方向右], this.YBo);
    InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.手柄引导下一步, this.JBo);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LoadLguiEventSystemActor, this.aGe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DestroyLguiEventSystemActor, this.Yfe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerMainTypeChange, this.cEa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PointerInputTypeChange, this.$Bo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyUiNavigationNewControllerSetNavigationFocusForView, UiNavigationNewController.SetNavigationFocusForView);
    InputDistributeController_1.InputDistributeController.UnBindActions([InputMappingsDefine_1.actionMappings.Ui方向上, InputMappingsDefine_1.actionMappings.Ui方向下, InputMappingsDefine_1.actionMappings.Ui方向左, InputMappingsDefine_1.actionMappings.Ui方向右], this.YBo);
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.手柄引导下一步, this.JBo);
  }
  static OnTick(i) {
    UiNavigationJoystickInput_1.UiNavigationJoystickInput.Tick(i);
    ModelManager_1.ModelManager.UiNavigationModel.Tick(i);
  }
  static HotKeyCloseView() {
    var i = this.GetCurrentNavigationActiveListenerByTag(HotKeyViewDefine_1.EXIT_TAG, true);
    if (Info_1.Info.IsInGamepad() && this.JumpNavigationGroup(6)) {
      UiNavigationLogic_1.UiNavigationLogic.ExecuteInterfaceMethod(i.GetNavigationComponent(), "InteractClickPrevGroup");
    } else if (i) {
      this.Dje(i);
    }
  }
  static ClickButton(i) {
    i = this.GetCurrentNavigationActiveListenerByTag(i, true);
    if (i) {
      this.Dje(i);
    }
  }
  static SimulateClickItem(i, t) {
    var a = LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor;
    return !!a && a.SimulateClickButton(UiNavigationDefine_1.GAMEPAD_POINT_ID, i, t);
  }
  static Dje(i) {
    if (!this.yMd()) {
      if (this.SimulateClickItem(i.GetBehaviorComponent().RootUIComp, i.ClickPivot)) {
        UiNavigationLogic_1.UiNavigationLogic.ExecuteInterfaceMethod(i.GetNavigationComponent(), "InteractClickHandle");
        ModelManager_1.ModelManager.UiNavigationModel?.RepeatMove();
      } else {
        UiNavigationLogic_1.UiNavigationLogic.ExecuteInterfaceMethod(i.GetNavigationComponent(), "InteractClickFailHandle");
      }
    }
  }
  static ClickButtonInside(t) {
    var a = this.GetCurrentNavigationFocusListener();
    if (a) {
      let i = UiNavigationNewController.GetFocusListenerInsideListenerByTag(a, t);
      if (i = i || a.GetChildListenerByTag(t)) {
        this.Dje(i);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiNavigation", 10, "[ClickButtonInside]查找不到对应的热键按钮", ["Tag", t]);
      }
    }
  }
  static Interact(i) {
    var t = this.GetCurrentNavigationFocusListener();
    return !!t && (i ? this.zBo(t.GetSelectableComponent(), true) : this.zBo(t.GetSelectableComponent(), false));
  }
  static InteractClick() {
    var i = this.GetCurrentNavigationFocusListener();
    this.InteractClickByListener(i);
  }
  static InteractClickByListener(i) {
    if (i) {
      UiNavigationGlobalData_1.UiNavigationGlobalData.IsAllowLoopScrollInteractHighlight = true;
      this.Dje(i);
      UiNavigationGlobalData_1.UiNavigationGlobalData.IsAllowLoopScrollInteractHighlight = false;
    }
  }
  static FindScrollbar(i) {
    var t = this.KBo();
    if (t) {
      if (i) {
        t.FindNextScrollbar();
      } else {
        t.FindPrevScrollbar();
      }
    }
  }
  static ScrollBarChangeSchedule(i) {
    var t = this.KBo();
    if (t) {
      t = t.GetCurrentScrollbar();
      this.ZBo(t, i);
    }
  }
  static ScrollBarChangeScheduleByListener(i, t) {
    i = i.GetBehaviorComponent();
    if (i) {
      this.ZBo(i, t);
    }
  }
  static VerticalScrollBarChangeSchedule(i) {
    var t = this.KBo();
    if (t &&= t.GetCurrentScrollbar()) {
      this._nm(t, i);
    }
  }
  static HorizontalScrollBarChangeSchedule(i) {
    var t = this.KBo();
    if (t) {
      t = t.GetCurrentScrollbar();
      this.unm(t, i);
    }
  }
  static BookMarkNavigation(e, i) {
    const n = this.GetCurrentNavigationActiveListenerByTag(i);
    if (n) {
      var r = n.GetNavigationGroup();
      if (r) {
        let a = undefined;
        for (let i = 0, t = r.ListenerList.length; i < t; ++i) {
          const n = r.ListenerList[i];
          if (n.IsCanFocus() && n.IsSelectedToggle()) {
            a = n.GetSelectableComponent();
            break;
          }
        }
        const o = UiNavigationLogic_1.UiNavigationLogic.TryFindNavigationDelegate(e, a);
        let t = o?.GetOwner()?.GetComponentByClass(UE.UIExtendToggle.StaticClass());
        if (!t || a === t) {
          let i = undefined;
          switch (e) {
            case 3:
              i = 1;
              break;
            case 4:
              i = 2;
              break;
            case 1:
              i = 3;
              break;
            case 2:
              i = 4;
              break;
            default:
              i = 0;
          }
          const o = UiNavigationLogic_1.UiNavigationLogic.TryFindNavigationDelegate(i, a);
          t = o?.GetOwner()?.GetComponentByClass(UE.UIExtendToggle.StaticClass());
        }
        if (t && (e = t.GetOwner().GetComponentByClass(UE.TsUiNavigationBehaviorListener_C.StaticClass()), t?.bAutoScrollOnSelected && e?.ScrollProxy?.ScrollView?.IsValid() && this.ebo(e), this.Dje(e), r.RefreshNavigation)) {
          this.MarkViewHandleRefreshNavigationDirty();
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiNavigation", 10, "[BookMarkNavigation]查找不到对应的导航组", ["Tag", i]);
      }
    }
  }
  static MarkViewHandleRefreshNavigationDirty() {
    UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle()?.MarkRefreshNavigationDirty();
  }
  static MarkViewHandleRefreshNavigationDirtyByGroupItem(i) {
    i = i.GetOwner().GetComponentByClass(UE.TsUiNavigationPanelConfig_C.StaticClass());
    if (i) {
      i.ViewHandle?.MarkRefreshNavigationDirty();
    }
  }
  static JumpNavigationGroupByTag(i) {
    var t = this.QBo();
    return !!t && (StringUtils_1.StringUtils.IsBlank(i) ? this.JumpNavigationGroup(5) : (i = t.GroupNameMap.Get(i), this.JumpNavigationGroupByName(t.GroupName, i)));
  }
  static JumpNavigationGroupByName(i, t) {
    var a = UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle();
    var e = this.tbo(a, t);
    if (e && (a = a.GetActiveNavigationGroupByNameCheckAll(t))) {
      a.PrevGroupName = i;
    }
    return e;
  }
  static JumpNavigationGroup(i) {
    var t = this.QBo();
    if (!t) {
      return false;
    }
    var a = UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle();
    switch (i) {
      case 5:
        return this.tbo(a, t.NextGroupName);
      case 6:
        var e = this.tbo(a, t.PrevGroupName);
        if (e && t.SelectableMemory) {
          t.LastSelectListener = undefined;
        }
        return e;
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiNavigation", 10, "导航组跳转方向错误", ["direction", i]);
        }
        return false;
    }
  }
  static tbo(i, t) {
    return !UiNavigationGlobalData_1.UiNavigationGlobalData.IsBlockNavigation && !!(i = i.GetActiveNavigationGroupByNameCheckAll(t)) && !((i = this.ibo(i)) ? (this.ebo(i), this.SwitchNavigationFocus(i), 0) : (Log_1.Log.CheckInfo() && Log_1.Log.Info("UiNavigation", 10, "[ChangeFocusListenerByGroupName]找不到可跳转的导航对象", ["GroupName", t]), 1));
  }
  static ebo(i) {
    var t;
    if (i.ScrollProxy?.ScrollView && (t = i.GetSelectableComponent())) {
      i.ScrollProxy.ScrollView.ScrollTo(t.GetRootComponent());
    }
  }
  static ibo(i) {
    if (i) {
      if (i.SelectableMemory && i.LastSelectListener) {
        var t = i.LastSelectListener;
        if (t.IsCanFocus()) {
          return t;
        }
      }
      return this.obo(i);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiNavigation", 10, "[GetActiveListenerInGroup]找不到导航组");
    }
  }
  static obo(i) {
    if (i.DefaultListener) {
      var t = i.DefaultListener;
      if (t.IsIgnoreScrollOrLayoutCheckInSwitchGroup()) {
        return this.Mjg(i);
      }
      if (!t.IsScrollOrLayoutActor() && t.IsCanFocus()) {
        return t;
      }
    }
    return this.FindLoopOrDynListener(i);
  }
  static FindLoopOrDynListener(i) {
    var t = i.DefaultListener;
    if (t) {
      t = this.nbo(i, t);
      if (t) {
        return t;
      }
    }
    return this.Mjg(i);
  }
  static uFf(a, i) {
    let e = undefined;
    var n = (i.ScrollProxy?.ScrollView).DisplayItemArray;
    for (let i = 0, t = n.Num(); i < t; ++i) {
      var r = n.Get(i);
      var o = UiNavigationNewController.hBd(r, a);
      if (o.length !== 0) {
        for (let i = 0, t = o.length; i < t; ++i) {
          var s = o[i];
          if (!e && s.IsCanFocus()) {
            e = s;
          }
          if (s.IsInDynScrollDisplay() && s.IsInScrollOrLayoutCanFocus()) {
            return s;
          }
        }
      }
    }
    return e;
  }
  static Ejg(i, t) {
    let a = undefined;
    var e = t.GetScrollOrLayoutActor();
    var n = i.MultiTemplateScrollSortListenerList;
    for (let i = 0, t = n.length; i < t; ++i) {
      var r = n[i];
      if (!a && r.IsCanFocus()) {
        a = r;
      }
      if (r.IsInScrollDisplayByGridActor() && (!e || r.GetScrollOrLayoutActor() === e) && r.IsInScrollOrLayoutCanFocus()) {
        return r;
      }
    }
    return a;
  }
  static rbo(i, t) {
    if (t.HasDynamicScrollView()) {
      return UiNavigationNewController.uFf(i, t);
    } else if (t.HasMultiTemplateScrollView()) {
      return UiNavigationNewController.Ejg(i, t);
    } else if (t.IsInScrollOrLayoutCanFocus()) {
      return t;
    } else {
      return undefined;
    }
  }
  static Mjg(a) {
    let e = undefined;
    for (let i = 0, t = a.ListenerList.length; i < t; ++i) {
      var n = a.ListenerList[i];
      if (!e && n.IsCanFocus()) {
        e = n;
      }
      var n = UiNavigationNewController.rbo(a, n);
      if (n) {
        return n;
      }
    }
    return e;
  }
  static nbo(i, t) {
    if (t.HasDynamicScrollView()) {
      return UiNavigationNewController.AWs(i, t);
    } else if (t.HasMultiTemplateScrollView()) {
      return UiNavigationNewController.PUf(i, t);
    } else {
      return UiNavigationNewController.UWs(i, t);
    }
  }
  static hBd(i, t) {
    var a = UE.LGUIBPLibrary.GetComponentsInChildren(i, UE.TsUiNavigationBehaviorListener_C.StaticClass(), true);
    var e = [];
    for (let i = a.Num() - 1; i >= 0; --i) {
      var n = a.Get(i);
      if (n.GroupName === t.GroupName && n.IsCanFocus()) {
        e.push(n);
      }
    }
    return e;
  }
  static AWs(a, i) {
    let e = undefined;
    var n = (i.ScrollProxy?.ScrollView).DisplayItemArray;
    for (let i = 0, t = n.Num(); i < t; ++i) {
      var r = n.Get(i);
      var o = UiNavigationNewController.hBd(r, a);
      if (o.length !== 0) {
        for (let i = 0, t = o.length; i < t; ++i) {
          var s = o[i];
          if (s.IsInDynScrollDisplay() && s.IsScrollOrLayoutActor() && (!e && s.IsCanFocus() && (e = s), s.IsInScrollOrLayoutCanFocus())) {
            return s;
          }
        }
      }
    }
    return e;
  }
  static UWs(i, t) {
    let a = undefined;
    var e = t.GetScrollOrLayoutActor();
    var n = i.LoopScrollSortListenerList;
    for (let i = 0, t = n.length; i < t; ++i) {
      var r = n[i];
      if (r.IsScrollOrLayoutActor() && r.IsInNormalScrollDisplayByGridActor() && r.IsInLoopScrollDisplayByGridActor() && (!a && r.IsCanFocus() && (a = r), !e || r.GetScrollOrLayoutActor() === e) && r.IsInScrollOrLayoutCanFocus()) {
        return r;
      }
    }
    return a;
  }
  static PUf(i, t) {
    let a = undefined;
    var e = t.GetScrollOrLayoutActor();
    var n = i.MultiTemplateScrollSortListenerList;
    for (let i = 0, t = n.length; i < t; ++i) {
      var r = n[i];
      if (r.IsScrollOrLayoutActor() && r.IsInScrollDisplayByGridActor() && (!a && r.IsCanFocus() && (a = r), !e || r.GetScrollOrLayoutActor() === e) && r.IsInScrollOrLayoutCanFocus()) {
        return r;
      }
    }
    return a;
  }
  static FindSuitableListenerWithoutLayout(a) {
    let e = undefined;
    for (let i = 0, t = a.ListenerList.length; i < t; ++i) {
      var n = a.ListenerList[i];
      if (!e && n.IsCanFocus()) {
        e = n;
      }
      if (n.IsInScrollOrLayoutCanFocus()) {
        return n;
      }
    }
    return e;
  }
  static GetCanFocusInsideListener(i) {
    var a = i.GetNavigationGroup().InsideGroupNameSet;
    var e = UE.LGUIBPLibrary.GetComponentsInChildrenWithHirerarchyIndex(i.InsideGroupActor, UE.TsUiNavigationBehaviorListener_C.StaticClass(), true);
    if (e) {
      for (let i = 0, t = e.Num(); i < t; ++i) {
        var n = e.Get(i);
        if (!StringUtils_1.StringUtils.IsEmpty(n.GroupName) && a.has(n.GroupName) && n.IsCanFocus()) {
          return n;
        }
      }
    }
  }
  static GetCanFocusInsideListenerList(i) {
    var a = i.GetNavigationGroup().InsideGroupNameSet;
    var e = UE.LGUIBPLibrary.GetComponentsInChildrenWithHirerarchyIndex(i.InsideGroupActor, UE.TsUiNavigationBehaviorListener_C.StaticClass(), true);
    if (!e) {
      return [];
    }
    var n = [];
    for (let i = 0, t = e.Num(); i < t; ++i) {
      var r = e.Get(i);
      if (!StringUtils_1.StringUtils.IsEmpty(r.GroupName)) {
        if (a.has(r.GroupName) && r.IsCanFocus()) {
          n.push(r);
        }
      }
    }
    return n;
  }
  static IsInFocusInsideListenerList(i, t) {
    var a;
    return !StringUtils_1.StringUtils.IsEmpty(t.GroupName) && (a = i.GetNavigationGroup().InsideGroupNameSet, !!(i = UE.LGUIBPLibrary.GetComponentsInChildren(i.InsideGroupActor, UE.TsUiNavigationBehaviorListener_C.StaticClass(), true))) && !!a.has(t.GroupName) && i.Contains(t);
  }
  static JumpInsideNavigationGroup() {
    var i;
    var t = this.QBo();
    if (t) {
      i = this.GetCurrentNavigationFocusListener();
      if (i = this.GetCanFocusInsideListener(i)) {
        this.SwitchNavigationFocus(i);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiNavigation", 10, "[JumpInsideNavigationGroup]查找不到内部有可导航对象", ["InsideGroupName", Array.from(t.InsideGroupNameSet)]);
      }
    }
  }
  static SimulationPointUp(i) {
    var i = this.GetCurrentNavigationActiveListenerByTag(i, true);
    if (i) {
      this.zBo(i.GetSelectableComponent(), false);
    } else if (i = LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor) {
      i.ResetNowIsTriggerPressed(UiNavigationDefine_1.GAMEPAD_POINT_ID);
    }
  }
  static SimulationPointUpInside(i) {
    var t = this.GetCurrentNavigationFocusListener();
    if (t) {
      if (t = t.GetChildListenerByTag(i)) {
        this.zBo(t.GetSelectableComponent(), false);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiNavigation", 10, "[SimulationPointUpInside]查找不到对应的热键按钮", ["Tag", i]);
      }
    }
  }
  static zBo(i, t) {
    var a;
    return !this.yMd() && !!(a = LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor) && a.SimulationPointerDownUp(UiNavigationDefine_1.GAMEPAD_POINT_ID, i.RootUIComp, t);
  }
  static GamepadInteractSimulationPointer(i, t) {
    var a;
    return !!i && !!(a = LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor) && a.SimulationPointerDownUp(0, i.RootUIComp, t);
  }
  static SimulationPointDown(i) {
    i = this.GetCurrentNavigationActiveListenerByTag(i, true);
    if (i) {
      this.zBo(i.GetSelectableComponent(), true);
    }
  }
  static SimulationPointDownInside(i) {
    var t = this.GetCurrentNavigationFocusListener();
    if (t) {
      if (t = t.GetChildListenerByTag(i)) {
        this.zBo(t.GetSelectableComponent(), true);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiNavigation", 10, "[SimulationPointDownInside]查找不到对应的热键按钮", ["Tag", i]);
      }
    }
  }
  static FindTarget(i) {
    var t = this.GetCurrentNavigationFocusListener();
    if (t && (t = t.GetSelectableComponent(), (i = UiNavigationLogic_1.UiNavigationLogic.TryFindNavigationDelegate(i, t)) !== t.RootUIComp)) {
      t = i.GetOwner().GetComponentByClass(UE.TsUiNavigationBehaviorListener_C.StaticClass());
      this.ebo(t);
    }
  }
  static SliderComponentSetValue(i, t) {
    i = this.GetCurrentNavigationActiveListenerByTag(i);
    if (i) {
      this.sbo(i.GetSelectableComponent(), t);
    }
  }
  static SliderInsideComponentSetValue(i, t) {
    var a = this.GetCurrentNavigationFocusListener();
    if (a) {
      if (a = this.GetFocusListenerInsideListenerByTag(a, i)) {
        this.sbo(a.GetSelectableComponent(), t);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiNavigation", 10, "[SliderInsideComponentSetValue]查找不到对应的热键按钮", ["Tag", i]);
      }
    }
  }
  static ScrollbarInsideComponentSetValue(i, t) {
    var a = this.GetCurrentNavigationFocusListener();
    if (a) {
      if (a = this.GetFocusListenerInsideListenerByTag(a, i)) {
        this.ZBo(a.GetBehaviorComponent(), t);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiNavigation", 10, "[ScrollbarInsideComponentSetValue]查找不到对应的热键按钮", ["Tag", i]);
      }
    }
  }
  static ZBo(i, t) {
    if (i) {
      if (i.Vertical) {
        i.SetVelocity(t * UiNavigationDefine_1.SCROLLBAR_INTERVAL);
      } else {
        i.SetVelocity(-t * UiNavigationDefine_1.SCROLLBAR_INTERVAL);
      }
    }
  }
  static _nm(i, t) {
    if (i) {
      i.SetVerticalVelocity(t * UiNavigationDefine_1.SCROLLBAR_INTERVAL);
    }
  }
  static unm(i, t) {
    if (i) {
      i.SetHorizontalVelocity(t * UiNavigationDefine_1.SCROLLBAR_INTERVAL);
    }
  }
  static sbo(i, t) {
    var a;
    if (i && (a = i.Value, i.SetProgressIncrement(t, i.WholeNumbers, true), a === i.Value)) {
      if (t > 0 && a !== i.MaxValue) {
        i.SetValueWithAudio(a + 1);
      } else if (t < 0 && a !== i.MinValue) {
        i.SetValueWithAudio(a - 1);
      }
    }
  }
  static DraggableComponentNavigate(i, t) {
    i = this.GetCurrentNavigationActiveListenerByTag(i);
    if (i) {
      this.abo(i.GetSelectableComponent(), t);
    }
  }
  static DraggableInsideComponentNavigate(i, t) {
    var a = this.GetCurrentNavigationFocusListener();
    if (a) {
      if (a = this.GetFocusListenerInsideListenerByTag(a, i)) {
        this.abo(a.GetSelectableComponent(), t);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiNavigation", 10, "[ScrollbarInsideComponentSetValue]查找不到对应的热键按钮", ["Tag", i]);
      }
    }
  }
  static abo(i, t) {
    if (i) {
      if (t) {
        i.NotifyNavigateToNext();
      } else {
        i.NotifyNavigateToPrev();
      }
    }
  }
  static SwitchNavigationFocus(i) {
    const t = UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle();
    if (t && !t.HasGamepadControlMouse()) {
      if (!LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystem.navigationComponent) {
        if (!this.GetCurrentNavigationFocusListener() && !i) {
          return;
        }
      }
      UiNavigationGlobalData_1.UiNavigationGlobalData.IsAllowCrossNavigationGroup = true;
      if (!LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystem.navigationComponent) {
        a = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0);
        LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystem?.SetSelectComponent(undefined, a, 0);
      }
      var a = LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor;
      var e = i?.GetSceneComponent();
      a?.UpdateNavigationListener(e);
      if (!i) {
        const t = UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle();
        t.UpdateFocus(undefined);
      }
      UiNavigationGlobalData_1.UiNavigationGlobalData.IsAllowCrossNavigationGroup = false;
    }
  }
  static SwitchNavigationFocusWithDirtyCheck(i) {
    var t = i?.PanelConfig?.ViewHandle;
    if (t) {
      t?.MarkSwitchNavigationFocusDirty(i);
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiNavigation", 10, "[SwitchNavigationFocusWithDirtyCheck]查找不到当前的导航句柄");
    }
  }
  static SetNavigationFocusForView(i, t = false, a = false) {
    var e;
    if (!Info_1.Info.IsInTouch()) {
      if (a) {
        UiNavigationViewManager_1.UiNavigationViewManager.SetNavigationFocusForView(i, t);
      } else if (i?.IsValid() && (a = i?.GetOwner()?.GetComponentByClass(TsUiNavigationBehaviorListener_1.default.StaticClass())) && !StringUtils_1.StringUtils.IsBlank(a.GroupName) && (e = a.GetNavigationGroup()) && e.GroupType !== 2) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiNavigation", 10, "业务设置了导航对象", ["名字", i.displayName]);
        }
        if (t) {
          UiNavigationNewController.SwitchNavigationFocusWithDirtyCheck(a);
        } else {
          UiNavigationNewController.SwitchNavigationFocus(a);
        }
      }
    }
  }
  static SetNavigationFocusForViewByRootItem(a, e, n = false) {
    if (Info_1.Info.IsInGamepad() && a.IsValid()) {
      var r = UE.LGUIBPLibrary.GetComponentsInChildren(a.GetOwner(), UE.TsUiNavigationBehaviorListener_C.StaticClass(), true);
      if (r.Num() !== 0) {
        for (let i = 0, t = r.Num(); i < t; ++i) {
          var o = r.Get(i);
          if (!StringUtils_1.StringUtils.IsBlank(o.GroupName) && o.GroupName === e) {
            var s = o.GetNavigationGroup();
            if (s && s.GroupType !== 2) {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("UiNavigation", 10, "业务设置了导航对象", ["名字", a.displayName]);
              }
              if (n) {
                this.SwitchNavigationFocusWithDirtyCheck(o);
              } else {
                this.SwitchNavigationFocus(o);
              }
              break;
            }
          }
        }
      }
    }
  }
  static ResetNavigationFocusForViewWithDirtyCheck() {
    if (!Info_1.Info.IsInTouch()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiNavigation", 10, "业务重置了导航对象");
      }
      this.SwitchNavigationFocus(undefined);
    }
  }
  static SetNavigationFocusForViewSameGroup(i) {
    var t;
    var a;
    if (Info_1.Info.IsInGamepad() && i?.IsValid()) {
      if (!!(t = i?.GetOwner()?.GetComponentByClass(TsUiNavigationBehaviorListener_1.default.StaticClass())) && !StringUtils_1.StringUtils.IsBlank(t.GroupName) && !!(a = t.GetNavigationGroup()) && a.GroupType !== 2 && (!(a = this.GetCurrentNavigationFocusListener()) || a.GroupName === t.GroupName)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiNavigation", 10, "业务设置了导航对象", ["名字", i.displayName]);
        }
        this.SwitchNavigationFocus(t);
      }
    }
  }
  static JBa(i) {
    var t = UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle();
    if (t && t.HasGamepadControlMouse()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiNavigation", 10, "引导设置了光标位置", ["名字", i.displayName]);
      }
      t.UpdateMousePositionForGuide(i);
    }
  }
  static SetNavigationFocusForGuide(i) {
    var t;
    var a;
    if (Info_1.Info.IsInGamepad() && i?.IsValid()) {
      if (t = i?.GetOwner()?.GetComponentByClass(TsUiNavigationBehaviorListener_1.default.StaticClass())) {
        if ((a = UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle()) && a.HasGamepadControlMouse()) {
          this.JBa(i);
        }
        if (!StringUtils_1.StringUtils.IsBlank(t.GroupName)) {
          if ((a = t.GetNavigationGroup()) && a.GroupType !== 2) {
            if (a.GroupType === 0) {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("UiNavigation", 10, "引导设置了导航对象", ["名字", i.displayName]);
              }
              this.SwitchNavigationFocus(t);
            } else {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("UiNavigation", 10, "引导设置了非导航对象", ["名字", i.displayName]);
              }
              ModelManager_1.ModelManager.UiNavigationModel.SetGuideFocusListener(t);
            }
          }
        }
      } else {
        this.JBa(i);
      }
    }
  }
  static SetNavigationMousePositionForView(i) {
    var t;
    if (Info_1.Info.IsInGamepad() && i?.IsValid() && (t = UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle()) && t.HasGamepadControlMouse()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiNavigation", 10, "业务设置了模拟光标位置", ["名字", i.displayName]);
      }
      t.UpdateMousePositionByItem(i);
    }
  }
  static MarkViewHandleRefreshNavigationDirtyByItem(i) {
    var t;
    var a;
    if (!Info_1.Info.IsInTouch()) {
      if (i?.IsValid() && (t = i?.GetOwner()?.GetComponentByClass(TsUiNavigationBehaviorListener_1.default.StaticClass())) && !StringUtils_1.StringUtils.IsBlank(t.GroupName) && (a = t.GetNavigationGroup()) && a.GroupType !== 2) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiNavigation", 10, "业务刷新界面导航对象查找", ["名字", i.displayName]);
        }
        t.PanelConfig?.ViewHandle?.MarkRefreshNavigationDirty();
      }
    }
  }
  static MarkViewHandleRefreshNavigationDirtyByListener(i) {
    if (!Info_1.Info.IsInTouch()) {
      if (i) {
        i.PanelConfig?.ViewHandle?.MarkRefreshNavigationDirty();
      }
    }
  }
  static ResetNavigationFocusForGuide() {
    var i;
    if (Info_1.Info.IsInGamepad()) {
      if (i = UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle()) {
        i.ResetNavigationFocusForGuide();
      }
      ModelManager_1.ModelManager.UiNavigationModel.ResetGuideFocusListener();
    }
  }
  static GetNoneTagNavigateItemByUiItem(i) {
    var t = UE.LGUIBPLibrary.GetComponentsInChildren(i.GetOwner(), UE.TsUiNavigationBehaviorListener_C.StaticClass(), true);
    if (t) {
      for (let i = t.Num() - 1; i >= 0; --i) {
        var a = t.Get(i);
        if (a.TagArray && !(a.TagArray.Num() > 0) && a.IsCanFocus()) {
          return a.RootUIComp;
        }
      }
    }
  }
  static GetFocusListenerInsideListenerByTag(i, t) {
    let a = i.InsideActorMap?.Get(t);
    a = a || i.GetOwner();
    var e = UE.LGUIBPLibrary.GetComponentsInChildren(a, UE.TsUiNavigationBehaviorListener_C.StaticClass(), true);
    if (e) {
      for (let i = e.Num() - 1; i >= 0; --i) {
        var n = e.Get(i);
        if (n.TagArray?.Contains(t) && n.IsCanFocus()) {
          return n;
        }
      }
    }
  }
  static GetMarkBookActiveListenerList(a) {
    if (!a) {
      return [];
    }
    if (a?.GroupType !== 1) {
      return [];
    }
    var e = [];
    for (let i = 0, t = a.ListenerList.length; i < t; ++i) {
      var n = a.ListenerList[i];
      if (n.IsListenerActive()) {
        e.push(n);
      }
    }
    return e;
  }
  static ActiveTextInput(i) {
    i = this.GetCurrentNavigationActiveListenerByTag(i);
    if (i) {
      i.GetBehaviorComponent().ActivateInputText();
    }
  }
  static ActiveTextInputInside(i) {
    var t = this.GetCurrentNavigationFocusListener();
    if (t &&= this.GetFocusListenerInsideListenerByTag(t, i)) {
      t.GetBehaviorComponent().ActivateInputText();
    }
  }
  static HandleCommonConsumeNavigation(i) {
    var t;
    var a;
    var e;
    if (!StringUtils_1.StringUtils.IsBlank(i)) {
      if (a = this.QBo()) {
        i = i ? a.GroupNameMap.Get(i) : a.NextGroupName;
        if (!StringUtils_1.StringUtils.IsEmpty(i)) {
          if (t = (e = UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle()).GetActiveNavigationGroupByNameCheckAll(i)) {
            if (t.ActiveListenerList.length > 1) {
              if (this.tbo(e, i)) {
                t.PrevGroupName = a.GroupName;
              }
            } else if (t.ActiveListenerList.length === 1 && (a = (i = e.GetFocusListener()).IsInScrollOrLayoutCanFocus(), e = t.ActiveListenerList[0], this.Dje(e), a) && !i.IsInScrollOrLayoutCanFocus()) {
              this.MarkViewHandleRefreshNavigationDirty();
            }
          }
        }
      }
    }
  }
  static HandleCommonConsumeNavigationInside() {
    var i;
    var t;
    var a = this.GetCurrentNavigationFocusListener();
    if (a) {
      if ((t = this.GetCanFocusInsideListenerList(a)).length > 1) {
        i = t[0];
        this.SwitchNavigationFocus(i);
      } else if (t.length === 1 && (i = a.IsInScrollOrLayoutCanFocus(), t = t[0], this.Dje(t), i) && !a.IsInScrollOrLayoutCanFocus()) {
        this.MarkViewHandleRefreshNavigationDirty();
      }
    }
  }
  static IsGamepadHitListenerUseDrag() {
    return !!Info_1.Info.IsInGamepad() && UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle().IsGamepadHitListenerUseDrag();
  }
  static SimulationPointerTrigger(i) {
    var t = LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor;
    if (t) {
      t.SimulationPointerTrigger(0, i);
      UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle()?.SetGamepadMouseTrigger(i);
    }
  }
  static GamepadControlMouseMoveForward(i) {
    var t = UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle();
    if (t) {
      t.SetGamepadMouseMoveForward(i);
    }
  }
  static GamepadControlMouseMoveRight(i) {
    var t = UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle();
    if (t) {
      t.SetGamepadMouseMoveRight(i);
    }
  }
  static RepeatCursorMove() {
    if (Info_1.Info.IsInGamepad()) {
      ModelManager_1.ModelManager.UiNavigationModel?.RepeatMove();
    }
  }
  static yMd() {
    return UiLayer_1.UiLayer.IsInMask() || !ModelManager_1.ModelManager.ReConnectModel.IsRpcEmpty();
  }
  static GetDynamicScrollListenerListByListener(i) {
    var a = i.GetNavigationGroup();
    if (!a) {
      return [];
    }
    var e = (i.ScrollProxy?.ScrollView).DisplayItemArray;
    var n = [];
    for (let i = 0, t = e.Num(); i < t; ++i) {
      var r = e.Get(i);
      var r = UiNavigationNewController.hBd(r, a);
      n.push(...r);
    }
    return n;
  }
  static NotifyNavigationMousePositionDragState(i) {
    var t;
    if (!Info_1.Info.IsInTouch()) {
      if (t = UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle()) {
        t.NotifyNavigationMousePositionDragState(i);
      }
    }
  }
  static IsNavigationMousePositionDragging() {
    var i;
    return !Info_1.Info.IsInTouch() && !!(i = UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle()) && i.IsNavigationMousePositionDragging();
  }
  static SetLockUseDragState(i) {
    var t;
    if (!Info_1.Info.IsInTouch()) {
      if (t = UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle()) {
        t.SetLockUseDragState(i);
      }
    }
  }
  static SetLockUseDragStateByPanelItem(i, t) {
    if (!Info_1.Info.IsInTouch()) {
      if (i?.IsValid() && (i = i?.GetOwner()?.GetComponentByClass(TsUiNavigationPanelConfig_1.TsUiNavigationPanelConfig.StaticClass()))) {
        i.ViewHandle?.SetLockUseDragState(t);
      }
    }
  }
  static GetMouseViewportPosition() {
    if (Info_1.Info.IsInGamepad()) {
      var i = UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle();
      if (i) {
        return i.GetMouseViewportPosition();
      }
    }
  }
}
exports.UiNavigationNewController = UiNavigationNewController;
(_a = UiNavigationNewController).IsTickEvenPausedInternal = true;
UiNavigationNewController.aGe = () => {
  var i = LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystem;
  if (i) {
    UiNavigationLogic_1.UiNavigationLogic.InitNavigationDelegate(LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystem);
    i.HighlightWhenMouseMoveOut = ConfigManager_1.ConfigManager.UiNavigationConfig.GetHighlightWhenMouseMoveOut();
    UE.UISelectableComponent.SetShieldMobileHighlight(ConfigManager_1.ConfigManager.UiNavigationConfig.GetMobileHighlight());
    UE.UISelectableComponent.SetShieldPCPress(ConfigManager_1.ConfigManager.UiNavigationConfig.GetPcPress());
    ModelManager_1.ModelManager.InputDistributeModel?.AddInputDistributeTagChangedListener(InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.NavigationTag, UiNavigationNewController.jk_);
  }
};
UiNavigationNewController.Yfe = () => {
  UiNavigationLogic_1.UiNavigationLogic.ClearNavigationDelegate(LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystem);
  ModelManager_1.ModelManager.InputDistributeModel?.RemoveInputDistributeTagChangedListener(InputDistributeDefine_1.inputDistributeTagDefine.UiInputRoot.NavigationTag, UiNavigationNewController.jk_);
  return true;
};
UiNavigationNewController.jk_ = (i, t) => {
  if (!t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiNavigation", 10, "导航的输入分发被删除,需要抬起持续输入的按钮");
    }
    UiNavigationJoystickInput_1.UiNavigationJoystickInput.ResetJoystickActionInput();
  }
};
UiNavigationNewController.cEa = (i, t) => {
  if (i === 2 || i === 1) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiNavigation", 10, "输入总类型发生变更,需要抬起持续输入的按钮");
    }
    UiNavigationJoystickInput_1.UiNavigationJoystickInput.ResetJoystickActionInput();
  }
};
UiNavigationNewController.XBo = (i, t) => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("UiNavigation", 10, "[InputChange]输入类型改变!", ["last", i], ["now", t]);
  }
  ModelManager_1.ModelManager.UiNavigationModel.InputControllerModeChange();
  UiNavigationLogic_1.UiNavigationLogic.HandleInputControllerTypeChange();
  UiNavigationLogic_1.UiNavigationLogic.ForceChangeInputType();
};
UiNavigationNewController.$Bo = i => {
  if (!Info_1.Info.IsInGamepad()) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiNavigation", 10, "[InputChange]输入类型改变!", ["InputType", i]);
    }
    UiNavigationLogic_1.UiNavigationLogic.HandleInputControllerTypeChange();
  }
};
UiNavigationNewController.YBo = (i, t) => {
  UiNavigationJoystickInput_1.UiNavigationJoystickInput.TriggerActionInputTick(i, t);
};
UiNavigationNewController.JBo = () => {
  var i = ModelManager_1.ModelManager.UiNavigationModel;
  if (i && i.GuideFocusListener) {
    _a.Dje(i.GuideFocusListener);
    _a.ResetNavigationFocusForGuide();
  }
}; //# sourceMappingURL=UiNavigationNewController.js.map