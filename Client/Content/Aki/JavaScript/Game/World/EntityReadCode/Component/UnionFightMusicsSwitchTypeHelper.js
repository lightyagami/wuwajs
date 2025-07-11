"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionFightMusicsSwitchTypeHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbFightMusicsSwitchByTagList_1 = require("./FbFightMusicsSwitchByTagList");
class UnionFightMusicsSwitchTypeHelper {
  static GetUnionFightMusicsSwitchTypeObject(t) {
    if (t === fb_component_1.UnionFightMusicsSwitchType.FightMusicsSwitchByTagList) {
      return new fb_component_1.FightMusicsSwitchByTagList();
    }
  }
  static ReadUnionFightMusicsSwitchType(t, i) {
    if (i !== undefined && t === fb_component_1.UnionFightMusicsSwitchType.FightMusicsSwitchByTagList) {
      return FbFightMusicsSwitchByTagList_1.FbFightMusicsSwitchByTagList.Create(i);
    } else {
      return undefined;
    }
  }
}
exports.UnionFightMusicsSwitchTypeHelper = UnionFightMusicsSwitchTypeHelper;
//# sourceMappingURL=UnionFightMusicsSwitchTypeHelper.js.map