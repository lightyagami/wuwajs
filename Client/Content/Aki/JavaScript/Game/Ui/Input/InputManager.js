"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputManager = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Global_1 = require("../../../Game/Global");
const ModelManager_1 = require("../../../Game/Manager/ModelManager");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const UiConfig_1 = require("../Define/UiConfig");
const UiLayerType_1 = require("../Define/UiLayerType");
const InputMappingsDefine_1 = require("../InputDistribute/InputMappingsDefine");
const LguiEventSystemManager_1 = require("../LguiEventSystem/LguiEventSystemManager");
const UiManager_1 = require("../UiManager");
const ViewHotKeyHandleDefine_1 = require("./Handle/ViewHotKeyHandleDefine");
const Input_1 = require("./Input");
const InputExtraShowCursorCenter_1 = require("./InputExtraShowCursorCenter");
const InputViewRecord_1 = require("./InputViewRecord");
const ViewHotKeyHandleContainer_1 = require("./ViewHotKeyHandleContainer");
const UiModel_1 = require("../UiModel");
class InputManager {
  static Init() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UiManagerInit, this.il);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UiManagerDestroy, this.ht);
  }
  static qzc(e) {
    var t;
    if (!this.$ya.IsDataExist(e.Id)) {
      t = {
        ConfigId: e.Id,
        ActionName: e.ActionName,
        InputControllerType: e.InputControllerType,
        ViewName: e.ViewName,
        ViewParam: e.ViewParam,
        IsPressTrigger: e.IsPressTrigger,
        PressStartTime: e.PressStartTime,
        PressTriggerTime: e.PressTriggerTime,
        IsReleaseTrigger: e.IsReleaseTrigger,
        ReleaseInvalidTime: e.ReleaseInvalidTime,
        IsPressClose: e.IsPressClose,
        IsReleaseClose: e.IsReleaseClose,
        IsAllowOpenViewByShortcutKey: () => this.IsAllowOpenViewByShortcutKey(),
        IsAllowCloseViewByShortcutKey: () => this.IsAllowCloseViewByShortcutKey()
      };
      (t = ViewHotKeyHandleDefine_1.ViewHotKeyHandleFactory.CreateViewHotKeyHandle(t, e.HandleType)).Bind();
      this.$ya.Add(t);
    }
  }
  static Gzc(e) {
    e = this.$ya.Get(e.ViewName);
    if (e) {
      for (const t of e) {
        this.$ya.Remove(t);
      }
    }
  }
  static AddViewHotKeyActionByType(e) {
    e = ConfigManager_1.ConfigManager.ViewHotKeyConfig.GetConfigListByEffectiveType(e);
    if (e) {
      for (const t of e) {
        this.qzc(t);
      }
    }
  }
  static RemoveViewHotKeyActionByType(e) {
    e = ConfigManager_1.ConfigManager.ViewHotKeyConfig.GetConfigListByEffectiveType(e);
    if (e) {
      for (const t of e) {
        this.Gzc(t);
      }
    }
  }
  static RegisterOpenViewFunc(e, t) {
    this.$ya.RegisterOpenViewFunc(e, t);
    e = this.$ya.Get(e);
    if (e) {
      for (const n of e) {
        n.BindOpenViewCallback(t);
      }
    }
  }
  static RegisterCloseViewFunc(e, t) {
    this.$ya.RegisterCloseViewFunc(e, t);
    e = this.$ya.Get(e);
    if (e) {
      for (const n of e) {
        n.BindCloseViewCallback(t);
      }
    }
  }
  static GetViewHotKeyHandle(e) {
    return this.$ya.Get(e);
  }
  static GetAllViewHotKeyHandle() {
    return this.$ya.GetAll();
  }
  static smr() {
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.Gm指令, this.amr);
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.显示鼠标, this.hmr);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenView, this.FQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ResetModuleByResetToBattleView, this.REt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCursor, this.umr);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MoveCursorToRightDown, this.sX1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.RefreshStateOnPlatformChanged);
  }
  static Bfe() {
    ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.Gm指令, this.amr);
    ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.显示鼠标, this.hmr);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenView, this.FQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ResetModuleByResetToBattleView, this.REt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCursor, this.umr);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MoveCursorToRightDown, this.sX1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.RefreshStateOnPlatformChanged);
  }
  static mmr(e) {
    InputManager.dmr(e);
    InputManager.Cmr(e);
    InputManager.gmr(e);
  }
  static fmr(e) {
    InputManager.pmr(e);
    InputManager.vmr(e);
    InputManager.Mmr(e);
  }
  static gmr(e) {
    var t = UiConfig_1.UiConfig.TryGetViewInfo(e);
    if (t && !t.CanOpenViewByShortcutKey && (t = this.DisableShortcutKeyViewRecord.Add(e), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("InputManager", 10, "添加不允许打开界面快捷键的界面", ["viewName", e], ["length", this.DisableShortcutKeyViewRecord.Size()], ["count", t]);
    }
  }
  static vmr(e) {
    var t;
    if (this.DisableShortcutKeyViewRecord.Has(e) && (t = this.DisableShortcutKeyViewRecord.Remove(e), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("InputManager", 10, "删除不允许打开界面快捷键的界面", ["viewName", e], ["length", this.DisableShortcutKeyViewRecord.Size()], ["count", t ?? 0]);
    }
  }
  static IsAllowOpenViewByShortcutKey() {
    return !this.DisableShortcutKeyViewRecord.HasAny();
  }
  static IsAllowCloseViewByShortcutKey() {
    return !this.DisableCloseViewByShortcutKeyViewRecord.HasAny();
  }
  static SetMouseCursorVisibleType(e) {
    switch (this.ymr = e) {
      case 1:
        this.SetShowCursor(true);
        break;
      case 2:
        this.SetShowCursor(false);
        break;
      default:
        this.Imr();
    }
  }
  static dmr(e) {
    var t;
    if (e === UiModel_1.UiModel.MainViewName) {
      InputManager.Tmr();
    } else if (InputManager.Lmr() && (t = InputManager.IsShowMouseCursor(), InputManager.Dmr(e)) && !t) {
      InputManager.MoveCursorToCenter();
    }
  }
  static Cmr(e) {
    var t = UiConfig_1.UiConfig.TryGetViewInfo(e);
    if (t && t.IsShortKeysExitView && t.Type !== UiLayerType_1.ELayerType.Normal) {
      this.DisableCloseViewByShortcutKeyViewRecord.Add(e);
    }
  }
  static Mmr(e) {
    this.DisableCloseViewByShortcutKeyViewRecord.Remove(e);
  }
  static Dmr(e) {
    var t;
    var n = UiConfig_1.UiConfig.TryGetViewInfo(e);
    return !!n && !(n.ShowCursorType === 2 ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("InputManager", 10, "打开界面时显示鼠标 失败，原因是因为此界面的显示鼠标类型为：不影响鼠标显隐", ["viewName", e]), 1) : n.ShowCursorType === 0 ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("InputManager", 10, "打开界面时显示鼠标 失败，原因是因为此界面的显示鼠标类型为：隐藏鼠标", ["viewName", e]), this.Zpc(e), 1) : (t = this.Umr.Add(e), InputManager.ymr !== 0 || (Log_1.Log.CheckInfo() && Log_1.Log.Info("InputManager", 10, "打开界面时尝试显示鼠标成功", ["ViewName", e], ["ShowCursorType", n.ShowCursorType], ["count", t]), this.Zpc(e), 0)));
  }
  static pmr(e) {
    var t = UiConfig_1.UiConfig.TryGetViewInfo(e);
    if (t) {
      if (t.ShowCursorType === 2) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("InputManager", 10, "关闭界面时尝试隐藏失败，原因是因为UI表中，此界面的显示鼠标类型为：不影响鼠标显隐藏", ["viewName", e]);
        }
      } else if (InputManager.ymr !== 0) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("InputManager", 10, "关闭界面时尝试隐藏失败，原因是因为运行了总是显示鼠标的GM指令");
        }
      } else if (this.Umr.Has(e)) {
        this.Umr.Remove(e);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("InputManager", 10, "关闭界面时尝试隐藏鼠标成功", ["viewName", e], ["ShowCursorType", t.ShowCursorType]);
        }
        this.Zpc(e);
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("InputManager", 10, "关闭界面时尝试隐藏失败，原因是因为此界面没有再显示鼠标界面列表中", ["viewName", e], ["ShowMouseViewList", this.Umr]);
      }
    }
  }
  static Zpc(e) {
    var t = this.Umr.HasAny();
    this.SetAlwaysShowCursor(t);
    if (e !== "NetWorkMaskView") {
      if (t) {
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.TemporaryDisableFrameGeneration("CursorVisialbe");
      } else {
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.CancelTemporaryDisableFrameGeneration("CursorVisialbe");
      }
    }
  }
  static Imr() {
    var e = this.Umr.HasAny();
    this.SetAlwaysShowCursor(e);
  }
  static Tmr() {
    InputManager.Umr.Clear();
    InputManager.SetAlwaysShowCursor(false);
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.CancelTemporaryDisableFrameGeneration("CursorVisialbe");
  }
  static SetAlwaysShowCursor(e) {
    var t;
    if (InputExtraShowCursorCenter_1.InputExtraShowCursorCenter.HasExtraShowCursorData()) {
      t = InputExtraShowCursorCenter_1.InputExtraShowCursorCenter.CheckShowCursorData();
      this.Amr = t;
    } else {
      this.Amr = e;
    }
    if (this.Amr !== this.Pmr && (t = ModelManager_1.ModelManager.LoadingModel) && !t.IsLoading) {
      this.SetShowCursor(this.Amr);
    }
  }
  static SetShowCursor(e, t = true) {
    var n;
    var a;
    if (this.Lmr()) {
      this.Pmr = e;
      n = this.Pmr && !Info_1.Info.IsInGamepad();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("InputManager", 10, "实际设置鼠标可见性", ["realSetValue", n], ["value", e]);
      }
      a = Global_1.Global.CharacterController;
      if (n) {
        a.bShowMouseCursor = true;
        this.g9s();
      } else {
        a.bShowMouseCursor = false;
        this.f9s();
      }
      if (t) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnShowMouseCursor, e);
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InputManager", 10, "设置鼠标可见性失败，因为PlayerController不可用", ["value", e]);
    }
  }
  static g9s() {
    var e = Global_1.Global.CharacterController;
    if (!this.m9s && !UE.KuroInputFunctionLibrary.HasInputModeReply(this.m9s)) {
      this.m9s = UE.KuroInputFunctionLibrary.SetGameAndUIInputMode(e, "InputManager设置输入模式");
    }
  }
  static f9s() {
    var e;
    if (this.m9s) {
      e = Global_1.Global.CharacterController;
      UE.KuroInputFunctionLibrary.ReplyInputMode(e, this.m9s);
      this.m9s = undefined;
    }
  }
  static Bmr() {
    var e;
    var t;
    var n;
    if (this.Lmr()) {
      e = Global_1.Global.CharacterController;
      t = (0, puerts_1.$ref)(0);
      n = (0, puerts_1.$ref)(0);
      e.GetViewportSize(t, n);
      return {
        X: (0, puerts_1.$unref)(t) / 2,
        Y: (0, puerts_1.$unref)(n) / 2
      };
    }
  }
  static MoveCursorToCenter() {
    var e;
    if (this.IsAutoMoveCursorToCenter && (e = this.Bmr())) {
      InputManager.Fud(e);
    }
  }
  static aX1() {
    var e;
    var t;
    var n;
    if (this.Lmr()) {
      e = Global_1.Global.CharacterController;
      t = (0, puerts_1.$ref)(0);
      n = (0, puerts_1.$ref)(0);
      e.GetViewportSize(t, n);
      return {
        X: (0, puerts_1.$unref)(t),
        Y: (0, puerts_1.$unref)(n)
      };
    }
  }
  static SetEventDataPrevPosition(e) {
    if (e) {
      LguiEventSystemManager_1.LguiEventSystemManager.SetEventDataPrevPosition(e.X, e.Y);
    }
  }
  static IsShowMouseCursor() {
    return !!this.Lmr() && Global_1.Global.CharacterController.bShowMouseCursor;
  }
  static Lmr() {
    var e = Global_1.Global.CharacterController;
    return !!e && !!e.IsValid();
  }
  static Fud(e) {
    Global_1.Global.CharacterController.SetMouseLocation(e.X, e.Y);
    InputManager.SetEventDataPrevPosition(e);
  }
  static SetInputRespondToKey(e) {
    if (e !== "") {
      Input_1.Input.OnlyRespondToKey = e;
    }
  }
  static ResetInputRespondToKey(e) {
    if (e === Input_1.Input.OnlyRespondToKey) {
      Input_1.Input.OnlyRespondToKey = "";
    }
  }
}
exports.InputManager = InputManager;
(_a = InputManager).ymr = 0;
InputManager.Amr = false;
InputManager.Pmr = false;
InputManager.gU = false;
InputManager.Umr = new InputViewRecord_1.InputViewRecord();
InputManager.DisableShortcutKeyViewRecord = new InputViewRecord_1.InputViewRecord();
InputManager.DisableCloseViewByShortcutKeyViewRecord = new InputViewRecord_1.InputViewRecord();
InputManager.m9s = undefined;
InputManager.$ya = new ViewHotKeyHandleContainer_1.ViewHotKeyHandleContainer();
InputManager.IsAutoMoveCursorToCenter = true;
InputManager.IsAltPress = false;
InputManager.il = () => {
  if (!InputManager.gU) {
    InputManager.smr();
    InputManager.gU = true;
    InputManager.Umr.Clear();
    InputManager.DisableShortcutKeyViewRecord.Clear();
    InputManager.DisableCloseViewByShortcutKeyViewRecord.Clear();
    InputManager.IsAltPress = false;
  }
  UE.KuroInputFunctionLibrary.ClearInputModeReply();
};
InputManager.ht = () => {
  if (InputManager.gU) {
    InputManager.Bfe();
    InputManager.Umr.Clear();
    InputManager.DisableShortcutKeyViewRecord.Clear();
    InputManager.DisableCloseViewByShortcutKeyViewRecord.Clear();
    InputManager.$ya?.Clear();
    InputManager.gU = false;
    InputManager.IsAltPress = false;
  }
};
InputManager.amr = (e, t) => {
  if (t === 1 && ModelManager_1.ModelManager.SundryModel.GmBlueprintGmIsOpen && ModelManager_1.ModelManager.SundryModel.CanOpenGmView) {
    if (UiManager_1.UiManager.IsViewOpen("GmView")) {
      UiManager_1.UiManager.CloseView("GmView");
    } else {
      UiManager_1.UiManager.OpenView("GmView");
    }
  }
};
InputManager.hmr = (e, t) => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("InputManager", 10, "按Alt尝试显示鼠标", ["是否通过GM总是显示鼠标", InputManager.ymr], ["是否已经打开总是显示鼠标界面", InputManager.Amr], ["是否尝试显示鼠标", t === 0]);
  }
  var n = t === 0;
  if (n !== InputManager.IsAltPress) {
    InputManager.IsAltPress = n;
    ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
  }
  if (InputManager.ymr !== 1) {
    n = t === 0;
    if (InputManager.Amr) {
      if (n) {
        InputManager.SetShowCursor(true);
      }
    } else {
      InputManager.MoveCursorToCenter();
      InputManager.SetShowCursor(n);
    }
  }
};
InputManager.FQe = e => {
  InputManager.mmr(e);
};
InputManager.$Ge = e => {
  InputManager.fmr(e);
};
InputManager.REt = () => {
  InputManager.Tmr();
  InputManager.DisableShortcutKeyViewRecord.Clear();
  InputManager.DisableCloseViewByShortcutKeyViewRecord.Clear();
};
InputManager.umr = () => {
  InputManager.Imr();
};
InputManager.sX1 = () => {
  var e = _a.aX1();
  if (e) {
    InputManager.Fud(e);
  }
};
InputManager.nye = () => {
  InputManager.Tmr();
};
InputManager.RefreshStateOnPlatformChanged = () => {
  _a.SetShowCursor(_a.Pmr);
}; //# sourceMappingURL=InputManager.js.map