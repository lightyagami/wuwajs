"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionCenterTextShowAnimHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbICenterTextFadeOut_1 = require("./FbICenterTextFadeOut");
const FbICenterTextShowAll_1 = require("./FbICenterTextShowAll");
const FbICenterTextTypeWriter_1 = require("./FbICenterTextTypeWriter");
class UnionCenterTextShowAnimHelper {
  static GetUnionCenterTextShowAnimObject(e) {
    switch (e) {
      case fb_action_1.UnionCenterTextShowAnim.ICenterTextFadeOut:
        return new fb_action_1.ICenterTextFadeOut();
      case fb_action_1.UnionCenterTextShowAnim.ICenterTextShowAll:
        return new fb_action_1.ICenterTextShowAll();
      case fb_action_1.UnionCenterTextShowAnim.ICenterTextTypeWriter:
        return new fb_action_1.ICenterTextTypeWriter();
      default:
        return;
    }
  }
  static ReadUnionCenterTextShowAnim(e, t) {
    if (t !== undefined) {
      switch (e) {
        case fb_action_1.UnionCenterTextShowAnim.ICenterTextFadeOut:
          return FbICenterTextFadeOut_1.FbICenterTextFadeOut.Create(t);
        case fb_action_1.UnionCenterTextShowAnim.ICenterTextShowAll:
          return FbICenterTextShowAll_1.FbICenterTextShowAll.Create(t);
        case fb_action_1.UnionCenterTextShowAnim.ICenterTextTypeWriter:
          return FbICenterTextTypeWriter_1.FbICenterTextTypeWriter.Create(t);
        default:
          return;
      }
    }
  }
}
exports.UnionCenterTextShowAnimHelper = UnionCenterTextShowAnimHelper;
//# sourceMappingURL=UnionCenterTextShowAnimHelper.js.map