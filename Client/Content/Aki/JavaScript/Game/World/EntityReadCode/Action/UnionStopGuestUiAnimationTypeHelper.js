"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionStopGuestUiAnimationTypeHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbStopGuestCartethyia_1 = require("./FbStopGuestCartethyia");
class UnionStopGuestUiAnimationTypeHelper {
  static GetUnionStopGuestUiAnimationTypeObject(t) {
    if (t === fb_action_1.UnionStopGuestUiAnimationType.StopGuestCartethyia) {
      return new fb_action_1.StopGuestCartethyia();
    }
  }
  static ReadUnionStopGuestUiAnimationType(t, e) {
    if (e !== undefined && t === fb_action_1.UnionStopGuestUiAnimationType.StopGuestCartethyia) {
      return FbStopGuestCartethyia_1.FbStopGuestCartethyia.Create(e);
    } else {
      return undefined;
    }
  }
}
exports.UnionStopGuestUiAnimationTypeHelper = UnionStopGuestUiAnimationTypeHelper;
//# sourceMappingURL=UnionStopGuestUiAnimationTypeHelper.js.map