"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionNpcRideInVehiclePerformTypeHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbNpcRideInAutoGongduolaPerform_1 = require("./FbNpcRideInAutoGongduolaPerform");
const FbNpcRideInGongduolaPerform_1 = require("./FbNpcRideInGongduolaPerform");
class UnionNpcRideInVehiclePerformTypeHelper {
  static GetUnionNpcRideInVehiclePerformTypeObject(e) {
    switch (e) {
      case fb_component_1.UnionNpcRideInVehiclePerformType.NpcRideInAutoGongduolaPerform:
        return new fb_component_1.NpcRideInAutoGongduolaPerform();
      case fb_component_1.UnionNpcRideInVehiclePerformType.NpcRideInGongduolaPerform:
        return new fb_component_1.NpcRideInGongduolaPerform();
      default:
        return;
    }
  }
  static ReadUnionNpcRideInVehiclePerformType(e, o) {
    if (o !== undefined) {
      switch (e) {
        case fb_component_1.UnionNpcRideInVehiclePerformType.NpcRideInAutoGongduolaPerform:
          return FbNpcRideInAutoGongduolaPerform_1.FbNpcRideInAutoGongduolaPerform.Create(o);
        case fb_component_1.UnionNpcRideInVehiclePerformType.NpcRideInGongduolaPerform:
          return FbNpcRideInGongduolaPerform_1.FbNpcRideInGongduolaPerform.Create(o);
        default:
          return;
      }
    }
  }
}
exports.UnionNpcRideInVehiclePerformTypeHelper = UnionNpcRideInVehiclePerformTypeHelper;
//# sourceMappingURL=UnionNpcRideInVehiclePerformTypeHelper.js.map