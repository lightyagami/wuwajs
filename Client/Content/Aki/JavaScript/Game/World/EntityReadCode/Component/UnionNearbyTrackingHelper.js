"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionNearbyTrackingHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbAudioPointNearbyTracking_1 = require("./FbAudioPointNearbyTracking");
const FbCompassTracking_1 = require("./FbCompassTracking");
const FbIconNearbyTracking_1 = require("./FbIconNearbyTracking");
class UnionNearbyTrackingHelper {
  static GetUnionNearbyTrackingObject(e) {
    switch (e) {
      case fb_component_1.UnionNearbyTracking.AudioPointNearbyTracking:
        return new fb_component_1.AudioPointNearbyTracking();
      case fb_component_1.UnionNearbyTracking.CompassTracking:
        return new fb_component_1.CompassTracking();
      case fb_component_1.UnionNearbyTracking.IconNearbyTracking:
        return new fb_component_1.IconNearbyTracking();
      default:
        return;
    }
  }
  static ReadUnionNearbyTracking(e, n) {
    if (n !== undefined) {
      switch (e) {
        case fb_component_1.UnionNearbyTracking.AudioPointNearbyTracking:
          return FbAudioPointNearbyTracking_1.FbAudioPointNearbyTracking.Create(n);
        case fb_component_1.UnionNearbyTracking.CompassTracking:
          return FbCompassTracking_1.FbCompassTracking.Create(n);
        case fb_component_1.UnionNearbyTracking.IconNearbyTracking:
          return FbIconNearbyTracking_1.FbIconNearbyTracking.Create(n);
        default:
          return;
      }
    }
  }
}
exports.UnionNearbyTrackingHelper = UnionNearbyTrackingHelper;
//# sourceMappingURL=UnionNearbyTrackingHelper.js.map