"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionEnterOrbitalCameraOptionHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbEnterOrbitalCameraControlByMove_1 = require("./FbEnterOrbitalCameraControlByMove");
class UnionEnterOrbitalCameraOptionHelper {
  static GetUnionEnterOrbitalCameraOptionObject(t) {
    if (t === fb_action_1.UnionEnterOrbitalCameraOption.EnterOrbitalCameraControlByMove) {
      return new fb_action_1.EnterOrbitalCameraControlByMove();
    }
  }
  static ReadUnionEnterOrbitalCameraOption(t, e) {
    if (e !== undefined && t === fb_action_1.UnionEnterOrbitalCameraOption.EnterOrbitalCameraControlByMove) {
      return FbEnterOrbitalCameraControlByMove_1.FbEnterOrbitalCameraControlByMove.Create(e);
    } else {
      return undefined;
    }
  }
}
exports.UnionEnterOrbitalCameraOptionHelper = UnionEnterOrbitalCameraOptionHelper;
//# sourceMappingURL=UnionEnterOrbitalCameraOptionHelper.js.map