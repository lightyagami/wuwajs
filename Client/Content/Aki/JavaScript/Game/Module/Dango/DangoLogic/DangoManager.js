"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DangoManager = void 0;
const DangoData_1 = require("./DangoData");
class DangoManager {
  static GetDangoData(a) {
    var t;
    return this.zTc.has(a) ? this.zTc.get(a) : (t = DangoData_1.DangoData.Create(a), this.zTc.set(a, t), t)
  }
}(exports.DangoManager = DangoManager).zTc = new Map;
//# sourceMappingURL=DangoManager.js.map