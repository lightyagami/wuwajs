"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoManager = undefined;
const DangoData_1 = require("./DangoData");
class DangoManager {
  static GetDangoData(a) {
    var t;
    if (this.zTc.has(a)) {
      return this.zTc.get(a);
    } else {
      t = DangoData_1.DangoData.Create(a);
      this.zTc.set(a, t);
      return t;
    }
  }
}
(exports.DangoManager = DangoManager).zTc = new Map();
//# sourceMappingURL=DangoManager.js.map