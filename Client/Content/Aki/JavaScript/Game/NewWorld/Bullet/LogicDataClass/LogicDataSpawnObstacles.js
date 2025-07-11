"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const LogicDataBase_1 = require("./LogicDataBase");
class LogicDataSpawnObstacles extends LogicDataBase_1.default {
  constructor() {
    super(...arguments);
    this.Model = 0;
    this.Mesh = undefined;
    this.Size = undefined;
    this.ProfileName = undefined;
    this.ShowModel = false;
    this.NeedAttach = false;
    this.CanStandOn = false;
  }
  Constructor() {
    super.Constructor();
  }
}
exports.default = LogicDataSpawnObstacles;
//# sourceMappingURL=LogicDataSpawnObstacles.js.map