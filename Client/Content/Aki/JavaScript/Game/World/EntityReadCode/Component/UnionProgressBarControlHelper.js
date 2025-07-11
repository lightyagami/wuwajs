"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionProgressBarControlHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbCaptureStrategicPoint_1 = require("./FbCaptureStrategicPoint");
const FbCaptureStrategicPoint2_1 = require("./FbCaptureStrategicPoint2");
const FbChargingDevice_1 = require("./FbChargingDevice");
const FbTimedStrikeDevice_1 = require("./FbTimedStrikeDevice");
class UnionProgressBarControlHelper {
  static GetUnionProgressBarControlObject(e) {
    switch (e) {
      case fb_component_1.UnionProgressBarControl.CaptureStrategicPoint:
        return new fb_component_1.CaptureStrategicPoint();
      case fb_component_1.UnionProgressBarControl.CaptureStrategicPoint2:
        return new fb_component_1.CaptureStrategicPoint2();
      case fb_component_1.UnionProgressBarControl.ChargingDevice:
        return new fb_component_1.ChargingDevice();
      case fb_component_1.UnionProgressBarControl.TimedStrikeDevice:
        return new fb_component_1.TimedStrikeDevice();
      default:
        return;
    }
  }
  static ReadUnionProgressBarControl(e, t) {
    if (t !== undefined) {
      switch (e) {
        case fb_component_1.UnionProgressBarControl.CaptureStrategicPoint:
          return FbCaptureStrategicPoint_1.FbCaptureStrategicPoint.Create(t);
        case fb_component_1.UnionProgressBarControl.CaptureStrategicPoint2:
          return FbCaptureStrategicPoint2_1.FbCaptureStrategicPoint2.Create(t);
        case fb_component_1.UnionProgressBarControl.ChargingDevice:
          return FbChargingDevice_1.FbChargingDevice.Create(t);
        case fb_component_1.UnionProgressBarControl.TimedStrikeDevice:
          return FbTimedStrikeDevice_1.FbTimedStrikeDevice.Create(t);
        default:
          return;
      }
    }
  }
}
exports.UnionProgressBarControlHelper = UnionProgressBarControlHelper;
//# sourceMappingURL=UnionProgressBarControlHelper.js.map