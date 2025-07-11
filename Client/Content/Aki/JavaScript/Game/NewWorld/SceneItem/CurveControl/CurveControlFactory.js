"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CurveControlFactory = undefined;
const CurveControlDefine_1 = require("./CurveControlDefine");
class CurveControlFactory {
  static CreateCurveControl(e) {
    if (e !== undefined && (e = this.Sb1.get(e))) {
      return new e();
    } else {
      return undefined;
    }
  }
}
(exports.CurveControlFactory = CurveControlFactory).Sb1 = new Map([["ChargeSlash", CurveControlDefine_1.ChargeSlashCurveControl]]);
//# sourceMappingURL=CurveControlFactory.js.map