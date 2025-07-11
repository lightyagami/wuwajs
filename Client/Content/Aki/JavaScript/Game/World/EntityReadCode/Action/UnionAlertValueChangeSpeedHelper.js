"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionAlertValueChangeSpeedHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbAddOrSubAlertValueChangeSpeed_1 = require("./FbAddOrSubAlertValueChangeSpeed");
const FbCustomAlertValueChangeSpeed_1 = require("./FbCustomAlertValueChangeSpeed");
class UnionAlertValueChangeSpeedHelper {
  static GetUnionAlertValueChangeSpeedObject(e) {
    switch (e) {
      case fb_action_1.UnionAlertValueChangeSpeed.AddOrSubAlertValueChangeSpeed:
        return new fb_action_1.AddOrSubAlertValueChangeSpeed();
      case fb_action_1.UnionAlertValueChangeSpeed.CustomAlertValueChangeSpeed:
        return new fb_action_1.CustomAlertValueChangeSpeed();
      default:
        return;
    }
  }
  static ReadUnionAlertValueChangeSpeed(e, t) {
    if (t !== undefined) {
      switch (e) {
        case fb_action_1.UnionAlertValueChangeSpeed.AddOrSubAlertValueChangeSpeed:
          return FbAddOrSubAlertValueChangeSpeed_1.FbAddOrSubAlertValueChangeSpeed.Create(t);
        case fb_action_1.UnionAlertValueChangeSpeed.CustomAlertValueChangeSpeed:
          return FbCustomAlertValueChangeSpeed_1.FbCustomAlertValueChangeSpeed.Create(t);
        default:
          return;
      }
    }
  }
}
exports.UnionAlertValueChangeSpeedHelper = UnionAlertValueChangeSpeedHelper;
//# sourceMappingURL=UnionAlertValueChangeSpeedHelper.js.map