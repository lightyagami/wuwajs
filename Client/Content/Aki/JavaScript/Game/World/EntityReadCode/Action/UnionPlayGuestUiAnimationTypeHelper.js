"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionPlayGuestUiAnimationTypeHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbPlayGuestCartethyia_1 = require("./FbPlayGuestCartethyia");
class UnionPlayGuestUiAnimationTypeHelper {
  static GetUnionPlayGuestUiAnimationTypeObject(t) {
    if (t === fb_action_1.UnionPlayGuestUiAnimationType.PlayGuestCartethyia) {
      return new fb_action_1.PlayGuestCartethyia();
    }
  }
  static ReadUnionPlayGuestUiAnimationType(t, e) {
    if (e !== undefined && t === fb_action_1.UnionPlayGuestUiAnimationType.PlayGuestCartethyia) {
      return FbPlayGuestCartethyia_1.FbPlayGuestCartethyia.Create(e);
    } else {
      return undefined;
    }
  }
}
exports.UnionPlayGuestUiAnimationTypeHelper = UnionPlayGuestUiAnimationTypeHelper;
//# sourceMappingURL=UnionPlayGuestUiAnimationTypeHelper.js.map