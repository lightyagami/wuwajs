"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const LogicDataBase_1 = require("./LogicDataBase");
class LogicDataRebound extends LogicDataBase_1.default {
  constructor() {
    super(...arguments);
    this.BulletRowName = undefined;
    this.EffectRebound = undefined;
    this.PositionOffset = undefined;
    this.RotationOffset = undefined;
    this.ScreenShake = undefined;
    this.CameraModified = undefined;
    this.ReboundBitMask = 0;
  }
  Constructor() {
    super.Constructor();
  }
}
exports.default = LogicDataRebound;
//# sourceMappingURL=LogicDataRebound.js.map