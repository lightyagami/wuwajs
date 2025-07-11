"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionPatrolCycleOptionHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbPatrolCycleLooply_1 = require("./FbPatrolCycleLooply");
const FbPatrolCycleOncely_1 = require("./FbPatrolCycleOncely");
class UnionPatrolCycleOptionHelper {
  static GetUnionPatrolCycleOptionObject(e) {
    switch (e) {
      case fb_component_1.UnionPatrolCycleOption.PatrolCycleLooply:
        return new fb_component_1.PatrolCycleLooply();
      case fb_component_1.UnionPatrolCycleOption.PatrolCycleOncely:
        return new fb_component_1.PatrolCycleOncely();
      default:
        return;
    }
  }
  static ReadUnionPatrolCycleOption(e, o) {
    if (o !== undefined) {
      switch (e) {
        case fb_component_1.UnionPatrolCycleOption.PatrolCycleLooply:
          return FbPatrolCycleLooply_1.FbPatrolCycleLooply.Create(o);
        case fb_component_1.UnionPatrolCycleOption.PatrolCycleOncely:
          return FbPatrolCycleOncely_1.FbPatrolCycleOncely.Create(o);
        default:
          return;
      }
    }
  }
}
exports.UnionPatrolCycleOptionHelper = UnionPatrolCycleOptionHelper;
//# sourceMappingURL=UnionPatrolCycleOptionHelper.js.map