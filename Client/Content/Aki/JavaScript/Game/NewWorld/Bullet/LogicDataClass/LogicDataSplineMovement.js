"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const LogicDataBase_1 = require("./LogicDataBase");
class LogicDataSplineMovement extends LogicDataBase_1.default {
  constructor() {
    super(...arguments);
    this.Duration = 0;
    this.EffectOnReach = undefined;
    this.IsDestroyReach = false;
    this.IsForwardTangent = false;
    this.IsSummonOnReach = false;
    this.Rotate = 0;
    this.Length = 0;
    this.Height = 0;
    this.MaxSpeed = 0;
    this.MinSpeed = 0;
    this.SelfHeight = 0;
    this.SelfLength = 0;
    this.SelfRotate = 0;
    this.SplineTrace = undefined;
    this.UseTargetLocation = false;
  }
  Constructor() {
    super.Constructor();
  }
}
exports.default = LogicDataSplineMovement;
//# sourceMappingURL=LogicDataSplineMovement.js.map