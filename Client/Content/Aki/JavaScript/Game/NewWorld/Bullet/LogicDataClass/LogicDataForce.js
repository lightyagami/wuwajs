"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const LogicDataBase_1 = require("./LogicDataBase");
class LogicDataForce extends LogicDataBase_1.default {
  constructor() {
    super(...arguments);
    this.ForceBase = -0;
    this.ForceDampingRatio = -0;
    this.InnerRadius = -0;
    this.OuterRadius = -0;
    this.LimitWeight = 0;
    this.ConstantForce = false;
    this.TowardsBullet = false;
    this.HaveTopArea = false;
    this.TopAreaHeight = 0;
    this.ContinueTime = 0;
    this.ContinueTimeCurve = undefined;
    this.IsLaunching = false;
    this.WorkHaveTag = undefined;
    this.IsResetOnLast = false;
    this.Group = 0;
    this.ImmuneStopDuration = 0;
  }
  Constructor() {
    super.Constructor();
  }
}
exports.default = LogicDataForce;
//# sourceMappingURL=LogicDataForce.js.map