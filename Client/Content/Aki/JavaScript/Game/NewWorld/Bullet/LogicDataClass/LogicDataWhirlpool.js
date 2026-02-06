"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const LogicDataBase_1 = require("./LogicDataBase");
class LogicDataWhirlpool extends LogicDataBase_1.default {
  constructor() {
    super(...arguments);
    this.MoveTime = 0;
    this.WeightLimit = 0;
    this.VelocityCurve = 0;
    this.TagNeed = undefined;
    this.AttackerSocketName = undefined;
    this.CancelByHit = false;
  }
  Constructor() {
    super.Constructor();
  }
}
exports.default = LogicDataWhirlpool;
//# sourceMappingURL=LogicDataWhirlpool.js.map