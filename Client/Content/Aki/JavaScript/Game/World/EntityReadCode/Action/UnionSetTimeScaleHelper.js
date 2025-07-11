"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionSetTimeScaleHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbSetGlobalTimeScale_1 = require("./FbSetGlobalTimeScale");
class UnionSetTimeScaleHelper {
  static GetUnionSetTimeScaleObject(e) {
    if (e === fb_action_1.UnionSetTimeScale.SetGlobalTimeScale) {
      return new fb_action_1.SetGlobalTimeScale();
    }
  }
  static ReadUnionSetTimeScale(e, t) {
    if (t !== undefined && e === fb_action_1.UnionSetTimeScale.SetGlobalTimeScale) {
      return FbSetGlobalTimeScale_1.FbSetGlobalTimeScale.Create(t);
    } else {
      return undefined;
    }
  }
}
exports.UnionSetTimeScaleHelper = UnionSetTimeScaleHelper;
//# sourceMappingURL=UnionSetTimeScaleHelper.js.map