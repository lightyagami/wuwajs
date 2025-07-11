"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const LogicDataBase_1 = require("./LogicDataBase");
class LogicDataSpeedReduce extends LogicDataBase_1.default {
  constructor() {
    super(...arguments);
    this.SpeedDampingRatio = -0;
    this.IsNotThroughObstacles = false;
    this.MinSpeed = -0;
  }
  Constructor() {
    super.Constructor();
  }
}
exports.default = LogicDataSpeedReduce;
//# sourceMappingURL=LogicDataSpeedReduce.js.map