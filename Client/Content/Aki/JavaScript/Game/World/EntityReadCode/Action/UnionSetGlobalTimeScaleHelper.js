"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionSetGlobalTimeScaleHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbCloseGlobalTimeScale_1 = require("./FbCloseGlobalTimeScale");
const FbOpenGlobalTimeScale_1 = require("./FbOpenGlobalTimeScale");
class UnionSetGlobalTimeScaleHelper {
  static GetUnionSetGlobalTimeScaleObject(e) {
    switch (e) {
      case fb_action_1.UnionSetGlobalTimeScale.CloseGlobalTimeScale:
        return new fb_action_1.CloseGlobalTimeScale();
      case fb_action_1.UnionSetGlobalTimeScale.OpenGlobalTimeScale:
        return new fb_action_1.OpenGlobalTimeScale();
      default:
        return;
    }
  }
  static ReadUnionSetGlobalTimeScale(e, l) {
    if (l !== undefined) {
      switch (e) {
        case fb_action_1.UnionSetGlobalTimeScale.CloseGlobalTimeScale:
          return FbCloseGlobalTimeScale_1.FbCloseGlobalTimeScale.Create(l);
        case fb_action_1.UnionSetGlobalTimeScale.OpenGlobalTimeScale:
          return FbOpenGlobalTimeScale_1.FbOpenGlobalTimeScale.Create(l);
        default:
          return;
      }
    }
  }
}
exports.UnionSetGlobalTimeScaleHelper = UnionSetGlobalTimeScaleHelper;
//# sourceMappingURL=UnionSetGlobalTimeScaleHelper.js.map