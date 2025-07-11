"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const LogicDataBase_1 = require("./LogicDataBase");
class LogicDataShakeScreen extends LogicDataBase_1.default {
  constructor() {
    super(...arguments);
    this.Count = 0;
    this.Epicenter = "";
    this.Falloff = 0;
    this.InnerRadius = 0;
    this.Interval = 0;
    this.OrientShakeTowardsEpicenter = false;
    this.OuterRadius = 0;
    this.Shake = undefined;
  }
  Constructor() {
    super.Constructor();
  }
}
exports.default = LogicDataShakeScreen;
//# sourceMappingURL=LogicDataShakeScreen.js.map