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
  static TBo(i, e, t) {
    var a;
    var n;
    if (i?.HasNormalScrollView() && !e && (a = i.ScrollView, i = i.GetNavigationGroup(), this.oj1(n = t === 2 || t === 4, i)) && this.efc(a, t)) {
      a?.SetScrollProgress(!n ? 0 : 1);
      ModelManager_1.ModelManager.UiNavigationModel?.RepeatMove();
      UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKey();
    }
    if (e?.HasDynamicScrollView()) {
      i = e.GetNavigationGroup();
      a = e.ScrollView.Horizontal ? i.HorizontalWrapMode : i.VerticalWrapMode;
      n = e.ScrollView;
      i = (t === 2 || t === 4) !== UiNavigationModeModule_1.UiNavigationModeModule.FindOppositeNavigationResult.IsOppositeNavigationPositive;
      n.NavigateScrollToUIItem(e?.GetRootComponent(), i, a);
    }
  }
  static LBo(i) {
    if (i) {
      AudioSystem_1.AudioSystem.PostEvent("play_ui_gamepad_navigation_common");
    }
  }
  static DBo(e, t) {
    if (e && e.PanelConfig?.IsAllowNavigate() && e.GetNavigationComponent().CheckFindNavigationBefore()) {
      let i = undefined;
      var a = e.GetNavigationGroup();
      i = a?.GroupType === 0 ? UiNavigationLogic.RBo(e, t, a.AllowNavigationInSelfDynamic) : e.FindNavigation(t);
      var a = UiNavigationLogic.UBo(i);
      if (e.GetNavigationComponent().CheckFindNavigationAfter(a)) {
        return a;
      }
    }
  }
  static RBo(i, e, t) {
    e = i.FindNavigation(e);
    if (!t && (t = this.UBo(e)) && (i.ScrollViewActor === undefined && t.ScrollViewActor === undefined && i.LayoutActor === undefined && t.LayoutActor === undefined || i.ScrollViewActor !== t.ScrollViewActor || i.LayoutActor !== t.LayoutActor)) {
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
    let t = undefined;
    while (e !== undefined && !(t = e.GetComponentByClass(UE.TsUiNavigationPanelConfig_C.StaticClass()))) {
      e = e.GetAttachParentActor();
    }
    return t;
  }
  static FindUpNavigationListener(i) {
    let e = i.GetAttachParentActor();
    let t = undefined;
    while (e !== undefined) {
      if (e.GetComponentByClass(UE.TsUiNavigationPanelConfig_C.StaticClass())) {
        break;
      }
      if (t = e.GetComponentByClass(UE.TsUiNavigationBehaviorListener_C.StaticClass())) {
        break;
      }
      e = e.GetAttachParentActor();
    }
    return t;
  }
  static BindHotKeyComponentAction(i, e) {
    var t;
    var a = ModelManager_1.ModelManager.UiNavigationModel;
    if (a && (t = i.GetActionName())) {
      a = a.GetOrAddActionHotKeyComponentSet(t);
      if (e) {
        if (a.size <= 0) {
          InputDistributeController_1.InputDistributeController.BindAction(t, UiNavigationLogic.bMe);
        }
        if (!a.has(i)) {
          a.add(i);
        }
      } else if (!(a.size <= 0)) {
        a.delete(i);
        if (a.size <= 0) {
          InputDistributeController_1.InputDistributeController.UnBindAction(t, UiNavigationLogic.bMe);
        }
      }
    }
  }
  static BindHotKeyComponentAxis(i, e) {
    var t;
    var a = ModelManager_1.ModelManager.UiNavigationModel;
    if (a && (t = i.GetAxisName())) {
      a = a.GetOrAddAxisHotKeyComponentsSet(t);
      if (e) {
        if (a.size <= 0) {
          InputDistributeController_1.InputDistributeController.BindAxis(t, UiNavigationLogic.ABo);
        }
        if (!a.has(i)) {
          a.add(i);
        }
      } else if (!(a.size <= 0)) {
        a.delete(i);
        if (a.size <= 0) {
          InputDistributeController_1.InputDistributeController.UnBindAxis(t, UiNavigationLogic.ABo);
        }
      }
    }
  }
  static HasActiveListenerInGroup(t) {
    if (t) {
      for (let i = 0, e = t.ListenerList.length; i < e; ++i) {
        if (t.ListenerList[i].IsListenerActive()) {
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
    var t = LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystemActor;
    if (t && t.GetPointerEventData(0)) {
      i = !(i = UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle()) || i.GetCurrentPanel()?.AllowNavigateInKeyBoard;
      if (e) {
        t.SetIsUseMouse(false);
        t.SwitchToNavigationInputType();
        t.UpdateNavigationListener(undefined);
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
  static ExecuteInterfaceMethod(i, e, ...t) {
    if (e in i && typeof i[e] == "function") {
      i[e](...t);
    }
  }
}
exports.UiNavigationLogic = UiNavigationLogic;
(_a = UiNavigationLogic).TryFindNavigationDelegate = (i, e) => {
  var t;
  if (i !== 0 || e) {
    if (UiNavigationGlobalData_1.UiNavigationGlobalData.IsBlockNavigation) {
      return undefined;
    } else {
      e = e ? e.GetRootComponent() : LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystem.navigationComponent;
      e = UiNavigationLogic.UBo(e);
      t = UiNavigationLogic.DBo(e, i);
      _a.TBo(e, t, i);
      _a.LBo(t);
      return t?.GetSceneComponent();
    }
  } else {
    return LguiEventSystemManager_1.LguiEventSystemManager.LguiEventSystem.navigationComponent;
  }
};
UiNavigationLogic.bMe = (e, t) => {
  var a = ModelManager_1.ModelManager.UiNavigationModel;
  if (a) {
    a = a.GetActionHotKeyComponentSet(e);
    let i = 0;
    var n = a.size;
    for (const o of a) {
      if (i >= n) {
        break;
      }
      i++;
      if (o.IsHotKeyActive()) {
        if (t === 0) {
          o.Press();
        } else {
          o.Release();
        }
      }
    }
  }
};
UiNavigationLogic.ABo = (e, t) => {
  var a = ModelManager_1.ModelManager.UiNavigationModel;
  if (a) {
    a = a.GetAxisHotKeyComponentSet(e);
    let i = 0;
    var n = a.size;
    for (const o of a) {
      if (i >= n) {
        break;
      }
      i++;
      if (o.IsAllowTickContinue()) {
        o.InputAxis(e, t);
      }
    }
  }
};
UiNavigationLogic.wut = false; //# sourceMappingURL=UiNavigationLogic.js.map