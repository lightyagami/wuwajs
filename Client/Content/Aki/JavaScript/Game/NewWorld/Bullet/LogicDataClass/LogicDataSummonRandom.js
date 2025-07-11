"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const LogicDataBase_1 = require("./LogicDataBase");
class LogicDataSummonRandom extends LogicDataBase_1.default {
  constructor() {
    super(...arguments);
    this.SummonIndex = 0;
    this.SkillId = 0;
    this.IsVisible = true;
    this.DestroySummonOnDestroy = false;
  }
  Constructor() {
    super.Constructor();
  }
}
exports.default = LogicDataSummonRandom;
//# sourceMappingURL=LogicDataSummonRandom.js.map