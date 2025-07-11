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
class CombinationAxisHandle {
  constructor() {
    this.Hde = undefined;
    this.PressMainKeyTimeStamp = 0;
    this.Jde = undefined;
    this.zde = false;
    this.M7a = new Set();
  }
  Clear() {
    this.Jde = undefined;
  }
  PressAnyKey(t) {
    if (!this.Hde) {
      if (InputSettingsManager_1.InputSettingsManager.IsCombinationAxisMainKey(t)) {
        this.Xde(t);
      } else {
        this.zde = true;
      }
    }
  }
  ReleaseAnyKey(t) {
    if (this.Hde === t) {
      this.Yde();
    } else {
      this.zde = false;
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
    for (const e of this.Jde.values()) {
      for (const i of e) {
        var t = i.GetAxisName();
        ControllerHolder_1.ControllerHolder.InputDistributeController.InputAxis(t, 0);
      }
    }
    this.Jde = undefined;
    this.Hde = undefined;
    this.PressMainKeyTimeStamp = 0;
  }
  Tick(t) {
    if (!this.zde && this.Jde && !(this.Jde.size <= 0)) {
      var e = Global_1.Global.CharacterController;
      if (Info_1.Info.AxisInputOptimize) {
        this.M7a.clear();
        for (var [i, o] of this.Jde) {
          var s = InputSettings_1.InputSettings.GetUeKey(i);
          var r = e.GetInputAnalogKeyState(s);
          for (const p of o) {
            var n;
            var a = p.GetAxisName();
            if (a && !this.M7a.has(a)) {
              if (r !== 0) {
                this.M7a.add(a);
              }
              n = r * p.GetSourceAxisValue(i);
              ControllerHolder_1.ControllerHolder.InputDistributeController.InputAxis(a, n);
            }
          }
        }
      } else {
        for (var [l, h] of this.Jde) {
          var _ = InputSettings_1.InputSettings.GetUeKey(l);
          var u = e.GetInputAnalogKeyState(_);
          for (const v of h) {
            var g = v.GetAxisName();
            var f = u * v.GetSourceAxisValue(l);
            ControllerHolder_1.ControllerHolder.InputDistributeController.InputAxis(g, f);
          }
        }
      }
    }
  }
}
exports.CombinationAxisHandle = CombinationAxisHandle;
//# sourceMappingURL=CombinationAxisHandle.js.map