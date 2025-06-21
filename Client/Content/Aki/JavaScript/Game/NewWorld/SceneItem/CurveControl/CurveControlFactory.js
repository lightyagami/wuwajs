"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CurveControlFactory = void 0;
const CurveControlDefine_1 = require("./CurveControlDefine");
class CurveControlFactory {
  static CreateCurveControl(e) {
    return void 0 !== e && (e = this.XT1.get(e)) ? new e : void 0
  }
}(exports.CurveControlFactory = CurveControlFactory).XT1 = new Map([
  ["ChargeSlash", CurveControlDefine_1.ChargeSlashCurveControl]
]);
//# sourceMappingURL=CurveControlFactory.js.map