"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionSetJigsawItemHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbMoveJigsawItem_1 = require("./FbMoveJigsawItem");
class UnionSetJigsawItemHelper {
  static GetUnionSetJigsawItemObject(e) {
    if (e === fb_action_1.UnionSetJigsawItem.MoveJigsawItem) {
      return new fb_action_1.MoveJigsawItem();
    }
  }
  static ReadUnionSetJigsawItem(e, t) {
    if (t !== undefined && e === fb_action_1.UnionSetJigsawItem.MoveJigsawItem) {
      return FbMoveJigsawItem_1.FbMoveJigsawItem.Create(t);
    } else {
      return undefined;
    }
  }
}
exports.UnionSetJigsawItemHelper = UnionSetJigsawItemHelper;
//# sourceMappingURL=UnionSetJigsawItemHelper.js.map