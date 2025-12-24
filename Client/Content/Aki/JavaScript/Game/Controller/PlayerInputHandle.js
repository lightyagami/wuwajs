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
    this.fZt = t => {
      if (this.ZQa !== t && (this.ZQa = t)) {
        this.QJa = true;
      }
    };
    this.$Q_ = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("MobileInputSwitch", 10, "手柄断开,清理输入缓存");
      }
      for (const t of this.wDa) {
        ControllerHolder_1.ControllerHolder.InputDistributeController.InputAxis(t[0], 0);
      }
      this.wDa.clear();
      for (const e of this.JQa) {
        ControllerHolder_1.ControllerHolder.InputDistributeController.InputAxis(e[0], 0);
      }
      this.JQa.clear();
    };
    this.fq1 = t => {
      this.mq1.DisableCustomInputData(t);
    };
    this.gq1 = t => {
      this.mq1.EnableCustomInputData(t);
    };
    this.N9u = t => {
      this.IsRecording = t;
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
  Tick(t) {
    this.tCe?.Tick(t);
    if (Info_1.Info.AxisInputOptimize) {
      if (this.QJa) {
        this.QJa = false;
        for (const e of this.wDa) {
          ControllerHolder_1.ControllerHolder.InputDistributeController.InputAxis(e[0], 0);
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
  InputAction(t, e, n) {
    var o;
    if (this.mq1.IsActionEnable(t) && (o = n.KeyName.toString(), this.c$a(o)) && this.iCe(o)) {
      if (this.IsRecording && (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CharInputAction, t, e, n), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Test", 89, "Record:" + t + e);
      }
      if (this.m$a(t)) {
        ControllerHolder_1.ControllerHolder.InputDistributeController.InputAction(t, e);
      } else {
        this.yF_(t, e);
      }
    }
  }
  InputAxis(t, e, n = false) {
    if (!Info_1.Info.IsMobileInputModel() || !Info_1.Info.IsInTouch()) {
      if (this.tCe.CheckCombinationAxis(t)) {
        if (Info_1.Info.AxisInputOptimize) {
          if (n) {
            this.wDa.set(t, e);
          } else {
            this.JQa.set(t, e);
            ControllerHolder_1.ControllerHolder.InputDistributeController.InputAxis(t, e);
          }
        } else {
          ControllerHolder_1.ControllerHolder.InputDistributeController.InputAxis(t, e);
        }
      } else {
        this.f5f(t, e, n);
      }
    }
  }
  TouchBegin(t, e) {
    var t = Number(t);
    var n = {
      TouchType: 0,
      TouchId: t,
      TouchPosition: this.oCe(t, e)
    };
    TouchFingerManager_1.TouchFingerManager.StartTouch(t, e);
    LguiEventSystemManager_1.LguiEventSystemManager.InputTouchTrigger(true, t, e);
    ControllerHolder_1.ControllerHolder.InputDistributeController.InputTouch(t, n);
  }
  TouchEnd(t, e) {
    var t = Number(t);
    var n = {
      TouchType: 1,
      TouchId: t,
      TouchPosition: this.oCe(t, e)
    };
    TouchFingerManager_1.TouchFingerManager.EndTouch(t);
    LguiEventSystemManager_1.LguiEventSystemManager.InputTouchTrigger(false, t, e);
    ControllerHolder_1.ControllerHolder.InputDistributeController.InputTouch(t, n);
  }
  TouchMove(t, e) {
    var t = Number(t);
    var n = {
      TouchType: 2,
      TouchId: t,
      TouchPosition: this.oCe(t, e)
    };
    TouchFingerManager_1.TouchFingerManager.MoveTouch(t, e);
    LguiEventSystemManager_1.LguiEventSystemManager.InputLguiTouchMove(t, e);
    ControllerHolder_1.ControllerHolder.InputDistributeController.InputTouch(t, n);
  }
  PressAnyKey(t) {
    var e;
    if (!Info_1.Info.IsMobileInputModel() || !Info_1.Info.IsInTouch() || !ModelManager_1.ModelManager.PlatformModel?.IsKeyFromGamepadKey(t.KeyName.toString())) {
      e = t.KeyName.toString();
      this.eCe.PressAnyKey(e);
      this.tCe.PressAnyKey(e);
      this.d$a(e, true);
      if (this.IsPrintKeyName && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("InputSettings", 10, "按下按键", ["KeyName", e]);
      }
      ControllerHolder_1.ControllerHolder.InputDistributeController.InputKey(e, true);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnInputAnyKey, true, t);
    }
  }
  ReleaseAnyKey(t) {
    var e;
    if (!Info_1.Info.IsMobileInputModel() || !Info_1.Info.IsInTouch() || !ModelManager_1.ModelManager.PlatformModel?.IsKeyFromGamepadKey(t.KeyName.toString())) {
      e = t.KeyName.toString();
      this.eCe.ReleaseAnyKey(e);
      this.tCe.ReleaseAnyKey(e);
      this.d$a(e, false);
      if (this.IsPrintKeyName && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("InputSettings", 10, "抬起按键", ["KeyName", e]);
      }
      ControllerHolder_1.ControllerHolder.InputDistributeController.InputKey(e, false);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnInputAnyKey, false, t);
    }
  }
  d$a(t, e) {
    var n = this.mq1.GetCustomActionName(t);
    if (n && this.c$a(t) && this.iCe(t)) {
      for (const o of n) {
        if (!this.m$a(o) && e) {
          return;
        }
        ControllerHolder_1.ControllerHolder.InputDistributeController.InputAction(o, e);
      }
    }
  }
  c$a(t) {
    if (Info_1.Info.IsMobileInputModel()) {
      if (InputSettings_1.InputSettings.IsKeyboardKey(t) || InputSettings_1.InputSettings.IsMouseButton(t)) {
        return false;
      }
      if (Info_1.Info.IsInTouch() && ModelManager_1.ModelManager.PlatformModel?.IsKeyFromGamepadKey(t)) {
        return false;
      }
      if (Info_1.Info.IsInGamepad() && !ModelManager_1.ModelManager.PlatformModel?.IsKeyFromGamepadKey(t)) {
        return false;
      }
    }
    return true;
  }
  m$a(t) {
    return this.eCe.CheckCombinationAction(t);
  }
  yF_(t, e) {
    if (!e) {
      if (ModelManager_1.ModelManager.InputDistributeModel.IsActionInPress(t)) {
        ControllerHolder_1.ControllerHolder.InputDistributeController.InputAction(t, false);
      }
    }
  }
  f5f(t, e, n) {
    if (e !== 0 && ModelManager_1.ModelManager.InputDistributeModel.IsAxisInPress(t)) {
      if (Info_1.Info.AxisInputOptimize) {
        if (n) {
          this.wDa.set(t, 0);
        } else {
          this.JQa.set(t, 0);
          ControllerHolder_1.ControllerHolder.InputDistributeController.InputAxis(t, 0);
        }
      } else {
        ControllerHolder_1.ControllerHolder.InputDistributeController.InputAxis(t, 0);
      }
    }
  }
  rCe(t) {
    return this.Zde.get(t);
  }
  oCe(t, e) {
    var n = this.rCe(t);
    if (n) {
      n.Set(e.X, e.Y, e.Z);
      return n;
    } else {
      return this.nCe(t, e);
    }
  }
  nCe(t, e) {
    e = Vector_1.Vector.Create(e);
    this.Zde.set(t, e);
    return e;
  }
  iCe(t) {
    return !!Info_1.Info.IsGmLockGamepad || (!Info_1.Info.IsInGamepad() || !InputSettings_1.InputSettings.IsKeyboardKey(t)) && (!Info_1.Info.IsInKeyBoard() || !InputSettings_1.InputSettings.IsGamepadKey(t));
  }
  SetCustomAction(t, e) {
    this.mq1.SetCustomAction(t, e);
  }
  ResetAllCustomAction(t) {
    this.d$a(t, false);
    this.mq1.ResetAllCustomAction(t);
  }
  ResetCustomAction(t, e) {
    this.mq1.ResetCustomAction(t, e);
  }
  GetCurrentPlatformCustomActionKeyNameList(t) {
    return this.mq1.GetCurrentPlatformCustomActionKeyNameList(t);
  }
  SetActionEnable(t, e) {
    this.mq1.SetActionEnable(t, e);
  }
}
exports.PlayerInputHandle = PlayerInputHandle;
//# sourceMappingURL=PlayerInputHandle.js.map