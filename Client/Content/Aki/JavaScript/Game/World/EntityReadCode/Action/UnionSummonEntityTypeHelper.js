"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionSummonEntityTypeHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbSummonVehicle_1 = require("./FbSummonVehicle");
class UnionSummonEntityTypeHelper {
  static GetUnionSummonEntityTypeObject(e) {
    if (e === fb_action_1.UnionSummonEntityType.SummonVehicle) {
      return new fb_action_1.SummonVehicle();
    }
  }
  static ReadUnionSummonEntityType(e, t) {
    if (t !== undefined && e === fb_action_1.UnionSummonEntityType.SummonVehicle) {
      return FbSummonVehicle_1.FbSummonVehicle.Create(t);
    } else {
      return undefined;
    }
  }
}
exports.UnionSummonEntityTypeHelper = UnionSummonEntityTypeHelper;
//# sourceMappingURL=UnionSummonEntityTypeHelper.js.map