"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerInputHandle = undefined;
const Info_1 = require("../../Core/Common/Info");
const Log_1 = require("../../Core/Common/Log");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const InputSettings_1 = require("../InputSettings/InputSettings");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const LguiEventSystemManager_1 = require("../Ui/LguiEventSystem/LguiEventSystemManager");
const TouchFingerManager_1 = require("../Ui/TouchFinger/TouchFingerManager");
const CombinationActionHandle_1 = require("./CombinationActionHandle");
const CombinationAxisHandle_1 = require("./CombinationAxisHandle");
const CustomKeyActionData_1 = require("./CustomKeyActionData");
class PlayerInputHandle {
  constructor() {
    this.Zde = new Map();
    this.IsPrintKeyName = false;
    this.IsRecording = false;
    this.eCe = undefined;
    this.tCe = undefined;
    this.wDa = new Map();
    this.JQa = new Map();
    this.mq1 = new CustomKeyActionData_1.CustomKeyActionData();
    this.ZQa = false;
    this.QJa = false;
    this.fZt = e => {
      if (this.ZQa !== e && (this.ZQa = e)) {
        this.QJa = true;
      }
    };
    this.$Q_ = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("MobileInputSwitch", 10, "手柄断开,清理输入缓存");
      }
      for (const e of this.wDa) {
        ControllerHolder_1.ControllerHolder.InputDistributeController.InputAxis(e[0], 0);
      }
      this.wDa.clear();
      for (const t of this.JQa) {
        ControllerHolder_1.ControllerHolder.InputDistributeController.InputAxis(t[0], 0);
      }
      this.JQa.clear();
    };
    this.fq1 = e => {
      this.mq1.DisableCustomInputData(e);
    };
    this.gq1 = e => {
      this.mq1.EnableCustomInputData(e);
    };
    this.N9u = e => {
      this.IsRecording = e;
    };
  }
  Initialize() {
    this.eCe = new CombinationActionHandle_1.CombinationActionHandle();
    this.tCe = new CombinationAxisHandle_1.CombinationAxisHandle();
    if (Info_1.Info.AxisInputOptimize) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnShowMouseCursor, this.fZt);
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MobileGamepadDisconnect, this.$Q_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DisableCustomInputData, this.fq1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EnableCacheCustomInputData, this.gq1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EnableActionRecord, this.N9u);
  }
  Clear() {
    this.eCe.Clear();
    this.eCe = undefined;
    this.tCe.Clear();
    this.tCe = undefined;
    this.wDa.clear();
    this.mq1.Clear();
    if (Info_1.Info.AxisInputOptimize) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnShowMouseCursor, this.fZt);
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MobileGamepadDisconnect, this.$Q_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DisableCustomInputData, this.fq1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EnableCacheCustomInputData, this.gq1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EnableActionRecord, this.N9u);
  }
  Tick(e) {
    this.tCe?.Tick(e);
    if (Info_1.Info.AxisInputOptimize) {
      if (this.QJa) {
        this.QJa = false;
        for (const t of this.wDa) {
          ControllerHolder_1.ControllerHolder.InputDistributeController.InputAxis(t[0], 0);
        }
        for (const n of this.JQa) {
          ControllerHolder_1.ControllerHolder.InputDistributeController.InputAxis(n[0], 0);
        }
      } else {
        for (const o of this.wDa) {
          ControllerHolder_1.ControllerHolder.InputDistributeController.InputAxis(o[0], o[1]);
        }
        if (ModelManager_1.ModelManager.InputModel.LastClearAxisValue) {
          for (const i of this.JQa) {
            ControllerHolder_1.ControllerHolder.InputDistributeController.InputAxis(i[0], i[1], true);
          }
          ModelManager_1.ModelManager.InputModel.ResetLastTemporaryClearAxisValues();
        }
      }
    }
  }
  InputAction(e, t, n) {
    var o;
    if (this.mq1.IsActionEnable(e) && (o = n.KeyName.toString(), this.c$a(o)) && this.iCe(o)) {
      if (this.IsRecording && (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CharInputAction, e, t, n), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Test", 89, "Record:" + e + t);
      }
      if (this.m$a(e)) {
        ControllerHolder_1.ControllerHolder.InputDistributeController.InputAction(e, t);
      } else {
        this.yF_(e, t);
      }
    }
  }
  InputAxis(e, t, n = false) {
    if (!Info_1.Info.IsMobileInputModel() || !Info_1.Info.IsInTouch()) {
      if (Info_1.Info.AxisInputOptimize) {
        if (n) {
          this.wDa.set(e, t);
        } else {
          this.JQa.set(e, t);
          ControllerHolder_1.ControllerHolder.InputDistributeController.InputAxis(e, t);
        }
      } else {
        ControllerHolder_1.ControllerHolder.InputDistributeController.InputAxis(e, t);
      }
    }
  }
  TouchBegin(e, t) {
    var e = Number(e);
    var n = {
      TouchType: 0,
      TouchId: e,
      TouchPosition: this.oCe(e, t)
    };
    TouchFingerManager_1.TouchFingerManager.StartTouch(e, t);
    LguiEventSystemManager_1.LguiEventSystemManager.InputTouchTrigger(true, e, t);
    ControllerHolder_1.ControllerHolder.InputDistributeController.InputTouch(e, n);
  }
  TouchEnd(e, t) {
    var e = Number(e);
    var n = {
      TouchType: 1,
      TouchId: e,
      TouchPosition: this.oCe(e, t)
    };
    TouchFingerManager_1.TouchFingerManager.EndTouch(e);
    LguiEventSystemManager_1.LguiEventSystemManager.InputTouchTrigger(false, e, t);
    ControllerHolder_1.ControllerHolder.InputDistributeController.InputTouch(e, n);
  }
  TouchMove(e, t) {
    var e = Number(e);
    var n = {
      TouchType: 2,
      TouchId: e,
      TouchPosition: this.oCe(e, t)
    };
    TouchFingerManager_1.TouchFingerManager.MoveTouch(e, t);
    LguiEventSystemManager_1.LguiEventSystemManager.InputLguiTouchMove(e, t);
    ControllerHolder_1.ControllerHolder.InputDistributeController.InputTouch(e, n);
  }
  PressAnyKey(e) {
    var t;
    if (!Info_1.Info.IsMobileInputModel() || !Info_1.Info.IsInTouch() || !ModelManager_1.ModelManager.PlatformModel?.IsKeyFromGamepadKey(e.KeyName.toString())) {
      t = e.KeyName.toString();
      this.eCe.PressAnyKey(t);
      this.tCe.PressAnyKey(t);
      this.d$a(t, true);
      if (this.IsPrintKeyName && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("InputSettings", 10, "按下按键", ["KeyName", t]);
      }
      ControllerHolder_1.ControllerHolder.InputDistributeController.InputKey(t, true);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnInputAnyKey, true, e);
    }
  }
  ReleaseAnyKey(e) {
    var t;
    if (!Info_1.Info.IsMobileInputModel() || !Info_1.Info.IsInTouch() || !ModelManager_1.ModelManager.PlatformModel?.IsKeyFromGamepadKey(e.KeyName.toString())) {
      t = e.KeyName.toString();
      this.eCe.ReleaseAnyKey(t);
      this.tCe.ReleaseAnyKey(t);
      this.d$a(t, false);
      if (this.IsPrintKeyName && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("InputSettings", 10, "抬起按键", ["KeyName", t]);
      }
      ControllerHolder_1.ControllerHolder.InputDistributeController.InputKey(t, false);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnInputAnyKey, false, e);
    }
  }
  d$a(e, t) {
    var n = this.mq1.GetCustomActionName(e);
    if (n && this.c$a(e) && this.iCe(e)) {
      for (const o of n) {
        if (!this.m$a(o) && t) {
          return;
        }
        ControllerHolder_1.ControllerHolder.InputDistributeController.InputAction(o, t);
      }
    }
  }
  c$a(e) {
    if (Info_1.Info.IsMobileInputModel()) {
      if (InputSettings_1.InputSettings.IsKeyboardKey(e) || InputSettings_1.InputSettings.IsMouseButton(e)) {
        return false;
      }
      if (Info_1.Info.IsInTouch() && ModelManager_1.ModelManager.PlatformModel?.IsKeyFromGamepadKey(e)) {
        return false;
      }
      if (Info_1.Info.IsInGamepad() && !ModelManager_1.ModelManager.PlatformModel?.IsKeyFromGamepadKey(e)) {
        return false;
      }
    }
    return true;
  }
  m$a(e) {
    return this.eCe.CheckCombinationAction(e);
  }
  yF_(e, t) {
    if (!t) {
      if (ModelManager_1.ModelManager.InputDistributeModel.IsActionInPress(e)) {
        ControllerHolder_1.ControllerHolder.InputDistributeController.InputAction(e, false);
      }
    }
  }
  rCe(e) {
    return this.Zde.get(e);
  }
  oCe(e, t) {
    var n = this.rCe(e);
    if (n) {
      n.Set(t.X, t.Y, t.Z);
      return n;
    } else {
      return this.nCe(e, t);
    }
  }
  nCe(e, t) {
    t = Vector_1.Vector.Create(t);
    this.Zde.set(e, t);
    return t;
  }
  iCe(e) {
    return !!Info_1.Info.IsGmLockGamepad || (!Info_1.Info.IsInGamepad() || !InputSettings_1.InputSettings.IsKeyboardKey(e)) && (!Info_1.Info.IsInKeyBoard() || !InputSettings_1.InputSettings.IsGamepadKey(e));
  }
  SetCustomAction(e, t) {
    this.mq1.SetCustomAction(e, t);
  }
  ResetAllCustomAction(e) {
    this.d$a(e, false);
    this.mq1.ResetAllCustomAction(e);
  }
  ResetCustomAction(e, t) {
    this.mq1.ResetCustomAction(e, t);
  }
  GetCurrentPlatformCustomActionKeyNameList(e) {
    return this.mq1.GetCurrentPlatformCustomActionKeyNameList(e);
  }
  SetActionEnable(e, t) {
    this.mq1.SetActionEnable(e, t);
  }
}
exports.PlayerInputHandle = PlayerInputHandle;
//# sourceMappingURL=PlayerInputHandle.js.map