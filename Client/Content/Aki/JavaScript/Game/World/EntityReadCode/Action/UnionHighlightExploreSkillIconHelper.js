"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionHighlightExploreSkillIconHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbHideHighlightExploreSkillIcon_1 = require("./FbHideHighlightExploreSkillIcon");
const FbShowHighlightExploreSkillIcon_1 = require("./FbShowHighlightExploreSkillIcon");
class UnionHighlightExploreSkillIconHelper {
  static GetUnionHighlightExploreSkillIconObject(i) {
    switch (i) {
      case fb_action_1.UnionHighlightExploreSkillIcon.HideHighlightExploreSkillIcon:
        return new fb_action_1.HideHighlightExploreSkillIcon();
      case fb_action_1.UnionHighlightExploreSkillIcon.ShowHighlightExploreSkillIcon:
        return new fb_action_1.ShowHighlightExploreSkillIcon();
      default:
        return;
    }
  }
  static ReadUnionHighlightExploreSkillIcon(i, e) {
    if (e !== undefined) {
      switch (i) {
        case fb_action_1.UnionHighlightExploreSkillIcon.HideHighlightExploreSkillIcon:
          return FbHideHighlightExploreSkillIcon_1.FbHideHighlightExploreSkillIcon.Create(e);
        case fb_action_1.UnionHighlightExploreSkillIcon.ShowHighlightExploreSkillIcon:
          return FbShowHighlightExploreSkillIcon_1.FbShowHighlightExploreSkillIcon.Create(e);
        default:
          return;
      }
    }
  }
}
exports.UnionHighlightExploreSkillIconHelper = UnionHighlightExploreSkillIconHelper;
//# sourceMappingURL=UnionHighlightExploreSkillIconHelper.js.map