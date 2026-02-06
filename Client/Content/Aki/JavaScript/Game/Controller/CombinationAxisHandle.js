"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CombinationAxisHandle = undefined;
const Info_1 = require("../../Core/Common/Info");
const Log_1 = require("../../Core/Common/Log");
const TimeUtil_1 = require("../Common/TimeUtil");
const Global_1 = require("../Global");
const InputSettings_1 = require("../InputSettings/InputSettings");
const InputSettingsManager_1 = require("../InputSettings/InputSettingsManager");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const InputDistributeDefine_1 = require("../Ui/InputDistribute/InputDistributeDefine");
class CombinationAxisHandle {
  constructor() {
    this.Hde = undefined;
    this.PressMainKeyTimeStamp = 0;
    this.Jde = undefined;
    this.w7g = new Set();
    this.InCombinationAxis = false;
    this.M7a = new Set();
  }
  Clear() {
    this.Jde = undefined;
  }
  PressAnyKey(t) {
    if (this.Hde) {
      if (this.w7g.size > 0) {
        this.w7g.add(t);
      }
    } else if (InputSettingsManager_1.InputSettingsManager.IsCombinationAxisMainKey(t)) {
      this.Xde(t);
    } else {
      this.w7g.add(t);
    }
  }
  ReleaseAnyKey(t) {
    if (this.Hde === t) {
      this.Yde();
    } else {
      this.w7g.delete(t);
    }
  }
  Xde(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("InputSettings", 10, "[Input]按下组合Axis主键", ["MainKeyName", t]);
    }
    this.Hde = t;
    this.PressMainKeyTimeStamp = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    this.Jde = InputSettingsManager_1.InputSettingsManager.GetCombinationAxisBindingMapByMainKeyName(t);
  }
  Yde() {
    for (const i of this.Jde.values()) {
      for (const e of i) {
        var t = e.GetAxisName();
        ControllerHolder_1.ControllerHolder.InputDistributeController.InputAxis(t, 0);
      }
    }
    this.Jde = undefined;
    this.Hde = undefined;
    this.PressMainKeyTimeStamp = 0;
  }
  Tick(t) {
    if (this.w7g.size > 0) {
      this.InCombinationAxis = false;
    } else if (this.Jde) {
      if (this.Jde.size <= 0) {
        this.InCombinationAxis = false;
      } else {
        let t = false;
        var i = Global_1.Global.CharacterController;
        if (Info_1.Info.AxisInputOptimize) {
          this.M7a.clear();
          for (var [e, s] of this.Jde) {
            var n = InputSettings_1.InputSettings.GetUeKey(e);
            var r = i.GetInputAnalogKeyState(n);
            for (const p of s) {
              var o;
              var a = p.GetAxisName();
              if (a && !this.M7a.has(a)) {
                if (r !== 0) {
                  this.M7a.add(a);
                }
                o = r * p.GetSourceAxisValue(e);
                t = t || Math.abs(o) > InputDistributeDefine_1.AXIS_TOLERANCE;
                ControllerHolder_1.ControllerHolder.InputDistributeController.InputAxis(a, o);
              }
            }
          }
        } else {
          for (var [h, u] of this.Jde) {
            var l = InputSettings_1.InputSettings.GetUeKey(h);
            var _ = i.GetInputAnalogKeyState(l);
            for (const I of u) {
              var f = I.GetAxisName();
              var g = _ * I.GetSourceAxisValue(h);
              t = t || Math.abs(g) > InputDistributeDefine_1.AXIS_TOLERANCE;
              ControllerHolder_1.ControllerHolder.InputDistributeController.InputAxis(f, g);
            }
          }
        }
        this.InCombinationAxis = t;
      }
    } else {
      this.InCombinationAxis = false;
    }
  }
  CheckCombinationAxis(t) {
    if (this.Hde && this.InCombinationAxis) {
      var i = InputSettingsManager_1.InputSettingsManager.GetAxisBinding(t);
      if (i) {
        var e = [];
        i.GetKeyNameList(e);
        for (const s of e) {
          if (InputSettingsManager_1.InputSettingsManager.IsCombinationAxis(this.Hde, s)) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("InputSettings", 10, "[Input]当前已经按下组合键Axis主键，现在按下了任意组合键Axis副键，不会执行副键自己的Axis输入", ["axisName", t], ["keyName", s]);
            }
            return false;
          }
        }
      }
    }
    return true;
  }
}
exports.CombinationAxisHandle = CombinationAxisHandle;
//# sourceMappingURL=CombinationAxisHandle.js.map