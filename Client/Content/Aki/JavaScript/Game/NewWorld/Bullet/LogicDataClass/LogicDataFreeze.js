"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const LogicDataBase_1 = require("./LogicDataBase");
class LogicDataFreeze extends LogicDataBase_1.default {
  constructor() {
    super(...arguments);
    this.Target = 0;
    this.Tags = undefined;
    this.FreezeTime = -0;
  }
  Constructor() {
    super.Constructor();
  }
}
exports.default = LogicDataFreeze;
//# sourceMappingURL=LogicDataFreeze.js.map