"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionVehicleFeatureHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbAudioVehicleFeature_1 = require("./FbAudioVehicleFeature");
const FbBattleVehicleFeature_1 = require("./FbBattleVehicleFeature");
const FbMovementVehicleFeature_1 = require("./FbMovementVehicleFeature");
class UnionVehicleFeatureHelper {
  static GetUnionVehicleFeatureObject(e) {
    switch (e) {
      case fb_component_1.UnionVehicleFeature.AudioVehicleFeature:
        return new fb_component_1.AudioVehicleFeature();
      case fb_component_1.UnionVehicleFeature.BattleVehicleFeature:
        return new fb_component_1.BattleVehicleFeature();
      case fb_component_1.UnionVehicleFeature.MovementVehicleFeature:
        return new fb_component_1.MovementVehicleFeature();
      default:
        return;
    }
  }
  static ReadUnionVehicleFeature(e, t) {
    if (t !== undefined) {
      switch (e) {
        case fb_component_1.UnionVehicleFeature.AudioVehicleFeature:
          return FbAudioVehicleFeature_1.FbAudioVehicleFeature.Create(t);
        case fb_component_1.UnionVehicleFeature.BattleVehicleFeature:
          return FbBattleVehicleFeature_1.FbBattleVehicleFeature.Create(t);
        case fb_component_1.UnionVehicleFeature.MovementVehicleFeature:
          return FbMovementVehicleFeature_1.FbMovementVehicleFeature.Create(t);
        default:
          return;
      }
    }
  }
}
exports.UnionVehicleFeatureHelper = UnionVehicleFeatureHelper;
//# sourceMappingURL=UnionVehicleFeatureHelper.js.map