"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigCurveUtils = undefined;
const UE = require("ue");
const CurveUtils_1 = require("../../Core/Utils/Curve/CurveUtils");
class ConfigCurveUtils {
  static CreateCurveByBaseCurve(e) {
    return CurveUtils_1.CurveUtils.CreateCurveByStruct(this.pgr(e));
  }
  static pgr(e) {
    this.BaseCurve ||= new UE.SBaseCurve();
    switch (e.Type) {
      case 1:
        this.BaseCurve.CurveType = 1;
        break;
      case 2:
        this.BaseCurve.CurveType = 2;
        break;
      case 3:
        this.BaseCurve.CurveType = 3;
        break;
      case 4:
        this.BaseCurve.CurveType = 4;
        break;
      case 5:
        this.BaseCurve.CurveType = 5;
        break;
      case 6:
        this.BaseCurve.CurveType = 6;
        break;
      default:
        this.BaseCurve.CurveType = 0;
    }
    this.BaseCurve.N = e.N;
    return this.BaseCurve;
  }
}
(exports.ConfigCurveUtils = ConfigCurveUtils).BaseCurve = undefined;
//# sourceMappingURL=ConfigCurveUtils.js.map