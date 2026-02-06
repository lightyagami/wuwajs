"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CombinationActionHandle = undefined;
const Log_1 = require("../../Core/Common/Log");
const TimeUtil_1 = require("../Common/TimeUtil");
const InputSettingsManager_1 = require("../InputSettings/InputSettingsManager");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
class CombinationActionHandle {
  constructor() {
    this.Hde = undefined;
    this.jde = undefined;
    this.Wde = 0;
    this.Kde = undefined;
  }
  Clear() {
    this.Kde = undefined;
  }
  PressAnyKey(t) {
    if (this.Hde) {
      var i = InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByKeyName(this.Hde, t);
      if (!i || i.size <= 0) {
        return;
      }
      var e = [];
      for (const n of i.values()) {
        if (n.HasCombinationAction(this.Hde, t)) {
          e.push(n);
        }
      }
      if (e.length <= 0) {
        return undefined;
      } else {
        if (this.jde && this.jde !== t) {
          this.ReleaseAnyKey(this.jde);
        }
        this.jde = t;
        this.Qde(e);
        return;
      }
    }
    if (InputSettingsManager_1.InputSettingsManager.IsCombinationActionMainKey(t)) {
      this.Xde(t);
    }
  }
  ReleaseAnyKey(t) {
    if (this.jde === t && this.Kde) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("InputSettings", 10, "[Input]先抬起组合键副键,广播Action抬起", ["MainKeyName", this.Hde], ["SecondaryKeyName", this.jde]);
      }
      this.$de();
      this.jde = undefined;
    } else if (this.Hde === t) {
      this.Yde();
    }
  }
  Xde(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InputSettings", 10, "[Input]按下组合Action主键", ["MainKeyName", t]);
    }
    this.Hde = t;
    this.Wde = TimeUtil_1.TimeUtil.GetServerTimeStamp();
  }
  Yde() {
    if (this.jde && this.Kde) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("InputSettings", 10, "[Input]先抬起组合主副键,若副键还没抬起，则也会广播Action抬起", ["MainKeyName", this.Hde], ["SecondaryKeyName", this.jde]);
      }
      this.$de();
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InputSettings", 10, "[Input]抬起组合Action主键", ["MainKeyName", this.Hde]);
    }
    this.Kde = undefined;
    this.Hde = undefined;
    this.Wde = 0;
    this.jde = undefined;
  }
  Qde(t) {
    for (const n of this.Kde = t) {
      var i = n.GetActionName();
      var e = n.GetSecondaryKeyValidTime();
      if (e > 0) {
        if (TimeUtil_1.TimeUtil.GetServerTimeStamp() - this.Wde > e) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("InputSettings", 10, "[Input]当按下主键超过此时间没有按下副键时，再按下副键不会广播副键的按下和抬起", ["MainKeyName", this.Hde], ["SecondaryKeyName", this.jde], ["ActionName", i], ["secondaryKeyValidTime", e]);
          }
          continue;
        }
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("InputSettings", 10, "[Input]按下组合Action", ["MainKeyName", this.Hde], ["SecondaryKeyName", this.jde], ["ActionName", i]);
      }
      ControllerHolder_1.ControllerHolder.InputDistributeController.InputAction(i, true);
    }
  }
  $de() {
    if (this.Kde) {
      for (const i of this.Kde) {
        var t = i.GetActionName();
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("InputSettings", 10, "[Input]抬起组合Action", ["MainKeyName", this.Hde], ["SecondaryKeyName", this.jde], ["ActionName", t]);
        }
        try {
          ControllerHolder_1.ControllerHolder.InputDistributeController.InputAction(t, false);
        } catch (t) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("InputSettings", 10, "抬起组合Action时出现异常");
          }
        }
      }
    }
  }
  CheckCombinationAction(t) {
    if (this.Hde) {
      var i = InputSettingsManager_1.InputSettingsManager.GetActionBinding(t);
      var e = i.GetActionMappingConfig();
      if (!e || !e.IsIdleAction) {
        e = [];
        i.GetKeyNameList(e);
        for (const n of e) {
          if (InputSettingsManager_1.InputSettingsManager.IsCombinationAction(this.Hde, n)) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("InputSettings", 10, "[Input]当前已经按下组合键主键，现在按下了任意组合键副键，不会执行副键自己的Action输入", ["actionName", t], ["keyName", n]);
            }
            return false;
          }
        }
      }
    }
    return true;
  }
  CheckCombinationActionByAxisName(t) {
    if (this.Hde) {
      var i = InputSettingsManager_1.InputSettingsManager.GetAxisBinding(t);
      if (i) {
        var e = [];
        i.GetKeyNameList(e);
        for (const n of e) {
          if (InputSettingsManager_1.InputSettingsManager.IsCombinationAction(this.Hde, n)) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("InputSettings", 10, "[Input]当前已经按下组合键主键，现在按下了任意组合键副键，不会执行副键自己的Action输入", ["axisName", t], ["keyName", n]);
            }
            return false;
          }
        }
      }
    }
    return true;
  }
}
exports.CombinationActionHandle = CombinationActionHandle;
//# sourceMappingURL=CombinationActionHandle.js.map