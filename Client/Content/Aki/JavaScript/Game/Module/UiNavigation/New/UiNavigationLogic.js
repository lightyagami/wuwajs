"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiNavigationLogic = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const LguiEventSystemManager_1 = require("../../../Ui/LguiEventSystem/LguiEventSystemManager");
const TsUiNavigationBehaviorListener_1 = require("./TsUiNavigationBehaviorListener");
const UiNavigationGlobalData_1 = require("./UiNavigationGlobalData");
const UiNavigationModeModule_1 = require("./UiNavigationModeModule");
const UiNavigationViewManager_1 = require("./UiNavigationViewManager");
class UiNavigationLogic {
  static InitNavigationDelegate(i) {
    i.TryFindNavigationDelegate.Bind(UiNavigationLogic.TryFindNavigationDelegate);
  }
  static ClearNavigationDelegate(i) {
    i.TryFindNavigationDelegate.Unbind();
  }
  static efc(i, e) {
    if (i.Horizontal) {
      if (e === 2 || e === 1) {
        return true;
      }
    } else if (e === 4 || e === 3) {
      return true;
    }
    return false;
  }
  static oj1(i, e) {
    return !!e && (!!e.SlideToRightOrDown && !!i || !!e.SlideToLeftOrTop && !i);
  }
  static FBm(i, e, a) {
    var t = i.ScrollProxy?.ScrollView;
    var i = i.GetNavigationGroup();
    var n = a === 2 || a === 4;
    if (this.oj1(n, i) && this.efc(t, a)) {
      if (e) {
        if (!UiNavigationModeModule_1.UiNavigationModeModule.FindOppositeNavigationResult.IsOppositeNavigationPositive) {
          t?.SetScrollProgress(n ? 0 : 1);
          ModelManager_1.ModelManager.UiNavigationModel?.RepeatMove();
          UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKey();
        }
      } else {
        t?.SetScrollProgress(!n ? 0 : 1);
        ModelManager_1.ModelManager.UiNavigationModel?.RepeatMove();
        UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKey();
      }
    }
  }
  static NBm(i, e, a) {
    var t = e.GetNavigationGroup();
    var t = e.ScrollProxy?.ScrollView?.Horizontal ? t.HorizontalWrapMode : t.VerticalWrapMode;
    var n = e.ScrollProxy?.ScrollView;
    var a = (a === 2 || a === 4) !== UiNavigationModeModule_1.UiNavigationModeModule.FindOppositeNavigationResult.IsOppositeNavigationPositive;
    n.NavigateScrollToUIItem(e?.GetRootComponent(), a, t);
  }
  static TBo(i, e, a) {
    if (i?.HasNormalScrollView()) {
      UiNavigationLogic.FBm(i, e, a);
    }
    if (e?.HasDynamicScrollView()) {
      UiNavigationLogic.NBm(i, e, a);
    }
  }
  static LBo(i) {
    if (i) {
      AudioSystem_1.AudioSystem.PostEvent("play_ui_gamepad_navigation_common");
    }
  }
  static DBo(e, a) {
    if (e && e.PanelConfig?.IsAllowNavigate() && e.GetNavigationComponent().CheckFindNavigationBefore()) {
      let i = undefined;
      var t = e.GetNavigationGroup();
      i = t?.GroupType === 0 ? UiNavigationLogic.RBo(e, a, t.AllowNavigationInSelfDynamic) : e.FindNavigation(a);
      var t = UiNavigationLogic.UBo(i);
      if (e.GetNavigationComponent().CheckFindNavigationAfter(t)) {
        return t;
      }
    }
  }
  static RBo(i, e, a) {
    e = i.FindNavigation(e);
    if (!a && (a = this.UBo(e)) && (i.ScrollViewActor === undefined && a.ScrollViewActor === undefined && i.LayoutActor === undefined && a.LayoutActor === undefined || i.ScrollViewActor !== a.ScrollViewActor || i.LayoutActor !== a.LayoutActor)) {
      return i.GetSceneComponent();
    } else {
      return e;
    }
  }
  static UBo(i) {
    return i?.GetOwner()?.GetComponentByClass(TsUiNavigationBehaviorListener_1.TsUiNavigationBehaviorListener.StaticClass());
  }
  static FindUiNavigationPanelConfig(i) {
    let e = i.GetAttachParentActor();
    let a = undefined;
    while (e !== undefined && !(a = e.GetComponentByClass(UE.TsUiNavigationPanelConfig_C.StaticClass()))) {
      e = e.GetAttachParentActor();
    }
    return a;
  }
  static FindUpNavigationListener(i) {
    let e = i.GetAttachParentActor();
    let a = undefined;
    while (e !== undefined) {
      if (e.GetComponentByClass(UE.TsUiNavigationPanelConfig_C.StaticClass())) {
        break;
      }
      if (a = e.GetComponentByClass(UE.TsUiNavigationBehaviorListener_C.StaticClass())) {
        break;
      }
      e = e.GetAttachParentActor();
    }
    return a;
  }
  static BindHotKeyComponentAction(i, e) {
    var a;
    var t = ModelManager_1.ModelManager.UiNavigationModel;
    if (t && (a = i.GetActionName())) {
      t = t.GetOrAddActionHotKeyComponentSet(a);
      if (e) {
        if (t.size <= 0) {
          InputDistributeController_1.InputDistributeController.BindAction(a, UiNavigationLogic.bMe);
        }
        if (!t.has(i)) {
          t.add(i);
        }
      } else if (!(t.size <= 0)) {
        t.delete(i);
        if (t.size <= 0) {
          InputDistributeController_1.InputDistributeController.UnBindAction(a, UiNavigationLogic.bMe);
        }
      }
    }
  }
  static BindHotKeyComponentAxis(i, e) {
    var a;
    var t = ModelManager_1.ModelManager.UiNavigationModel;
    if (t && (a = i.GetAxisName())) {
      t = t.GetOrAddAxisHotKeyComponentsSet(a);
      if (e) {
        if (t.size <= 0) {
          InputDistributeController_1.InputDistributeController.BindAxis(a, UiNavigationLogic.ABo);
        }
        if (!t.has(i)) {
          t.add(i);
        }
      } else if (!(t.size <= 0)) {
        t.delete(i);
        if (t.size <= 0) {
          InputDistributeController_1.InputDistributeController.UnBindAxis(a, UiNavigationLogic.ABo);
        }
      }
    }
  }
  static HasActiveListenerInGroup(a) {
    if (a) {
      for (let i = 0, e = a.ListenerList.length; i < e; ++i) {
        if (a.ListenerList[i].IsListenerActive()) {
          return true;
        }
      }
    }
    return false;
  }
  static UpdateNavigationListener(i) {
    var e = ModelManager_1.ModelManager.UiNavigationModel;
    if (e) {
      LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystem.navigationComponent = i?.RootUIComp;
      e.SetCursorFollowItem(i);
      this.MemoryGroupConfigLastSelect(i);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateNavigationListener);
    }
  }
  static UpdateSameNavigationListener(i) {
    var e;
    if (LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystem.navigationComponent === i.RootUIComp && (e = ModelManager_1.ModelManager.UiNavigationModel)) {
      e.SetCursorFollowItem(i);
      this.MemoryGroupConfigLastSelect(i);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateNavigationListener);
    }
  }
  static MemoryGroupConfigLastSelect(i) {
    var e;
    if (i) {
      if (e = i.GetNavigationGroup()) {
        if (e.SelectableMemory) {
          e.LastSelectListener = i;
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiNavigation", 10, "[MemoryGroupConfigLastSelect]查找不到当前导航的导航组,逻辑上有问题");
      }
    }
  }
  static HandleInputControllerTypeChange() {
    var i;
    var e = Info_1.Info.IsInGamepad();
    var a = LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor;
    if (a && a.GetPointerEventData(0)) {
      i = !(i = UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle()) || i.GetCurrentPanel()?.AllowNavigateInKeyBoard;
      if (e) {
        a.SetIsUseMouse(false);
        a.SwitchToNavigationInputType();
        a.UpdateNavigationListener(undefined);
        ModelManager_1.ModelManager.UiNavigationModel.SetIsUseMouse(false);
        if (!i) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ResetNavigationListener);
        }
      } else if (i) {
        ModelManager_1.ModelManager.UiNavigationModel.SetIsUseMouse(!e);
      } else {
        ModelManager_1.ModelManager.UiNavigationModel.SetIsUseMouse(true);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ResetNavigationListener);
      }
    } else {
      ModelManager_1.ModelManager.UiNavigationModel.SetIsUseMouse(!e);
    }
  }
  static ForceChangeInputType() {
    var i;
    if (Info_1.Info.IsInKeyBoard() && (i = UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle()) && !i.GetCurrentPanel().IsAllowNavigate() && (i = LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor) && i.GetPointerEventData(0).inputType === 1) {
      i.SetIsForceChange(true);
    }
  }
  static ExecuteInputNavigation(i, e) {
    if (e === 1) {
      if (this.wut) {
        this.wut = false;
        LguiEventSystemManager_1.LguiEventSystemManager.InputNavigation(i, 1);
      }
    } else if ((e = UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle()) && e.GetFocusListener()) {
      this.wut = true;
      LguiEventSystemManager_1.LguiEventSystemManager.InputNavigation(i, 0);
    }
  }
  static ExecuteInterfaceMethod(i, e, ...a) {
    if (e in i && typeof i[e] == "function") {
      i[e](...a);
    }
  }
}
exports.UiNavigationLogic = UiNavigationLogic;
(_a = UiNavigationLogic).TryFindNavigationDelegate = (i, e) => {
  var a;
  if (i !== 0 || e) {
    if (UiNavigationGlobalData_1.UiNavigationGlobalData.IsBlockNavigation) {
      return undefined;
    } else {
      e = e ? e.GetRootComponent() : LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystem.navigationComponent;
      e = UiNavigationLogic.UBo(e);
      a = UiNavigationLogic.DBo(e, i);
      return (e.PanelConfig?.CanOverrideFindNavigation(i, e, a) ? e.PanelConfig?.HandleOverrideFindNavigation(i, e, a) : (_a.TBo(e, a, i), _a.LBo(a), a))?.GetSceneComponent();
    }
  } else {
    return LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystem.navigationComponent;
  }
};
UiNavigationLogic.bMe = (i, e) => {
  var a = ModelManager_1.ModelManager.UiNavigationModel;
  if (a) {
    a = a.GetActionHotKeyComponentSet(i);
    for (const t of new Set(a)) {
      if (t.IsHotKeyActive()) {
        if (e === 0) {
          t.Press();
        } else {
          t.Release();
        }
      }
    }
  }
};
UiNavigationLogic.ABo = (i, e) => {
  var a = ModelManager_1.ModelManager.UiNavigationModel;
  if (a) {
    a = a.GetAxisHotKeyComponentSet(i);
    for (const t of new Set(a)) {
      if (t.IsAllowTickContinue()) {
        t.InputAxis(i, e);
      }
    }
  }
};
UiNavigationLogic.wut = false; //# sourceMappingURL=UiNavigationLogic.js.map