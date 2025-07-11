"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionToggleMapMarkStateHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbDisableMapMark_1 = require("./FbDisableMapMark");
const FbHideMapMark_1 = require("./FbHideMapMark");
const FbShowMapMark_1 = require("./FbShowMapMark");
class UnionToggleMapMarkStateHelper {
  static GetUnionToggleMapMarkStateObject(a) {
    switch (a) {
      case fb_action_1.UnionToggleMapMarkState.DisableMapMark:
        return new fb_action_1.DisableMapMark();
      case fb_action_1.UnionToggleMapMarkState.HideMapMark:
        return new fb_action_1.HideMapMark();
      case fb_action_1.UnionToggleMapMarkState.ShowMapMark:
        return new fb_action_1.ShowMapMark();
      default:
        return;
    }
  }
  static ReadUnionToggleMapMarkState(a, e) {
    if (e !== undefined) {
      switch (a) {
        case fb_action_1.UnionToggleMapMarkState.DisableMapMark:
          return FbDisableMapMark_1.FbDisableMapMark.Create(e);
        case fb_action_1.UnionToggleMapMarkState.HideMapMark:
          return FbHideMapMark_1.FbHideMapMark.Create(e);
        case fb_action_1.UnionToggleMapMarkState.ShowMapMark:
          return FbShowMapMark_1.FbShowMapMark.Create(e);
        default:
          return;
      }
    }
  }
}
exports.UnionToggleMapMarkStateHelper = UnionToggleMapMarkStateHelper;
//# sourceMappingURL=UnionToggleMapMarkStateHelper.js.map