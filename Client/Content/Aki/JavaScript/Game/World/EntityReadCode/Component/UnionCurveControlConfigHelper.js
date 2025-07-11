"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionCurveControlConfigHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbChargeSlashControl_1 = require("./FbChargeSlashControl");
class UnionCurveControlConfigHelper {
  static GetUnionCurveControlConfigObject(o) {
    if (o === fb_component_1.UnionCurveControlConfig.ChargeSlashControl) {
      return new fb_component_1.ChargeSlashControl();
    }
  }
  static ReadUnionCurveControlConfig(o, e) {
    if (e !== undefined && o === fb_component_1.UnionCurveControlConfig.ChargeSlashControl) {
      return FbChargeSlashControl_1.FbChargeSlashControl.Create(e);
    } else {
      return undefined;
    }
  }
}
exports.UnionCurveControlConfigHelper = UnionCurveControlConfigHelper;
//# sourceMappingURL=UnionCurveControlConfigHelper.js.map