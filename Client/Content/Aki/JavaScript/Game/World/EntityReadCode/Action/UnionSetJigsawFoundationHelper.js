"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionSetJigsawFoundationHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbSetPieceState_1 = require("./FbSetPieceState");
class UnionSetJigsawFoundationHelper {
  static GetUnionSetJigsawFoundationObject(e) {
    if (e === fb_action_1.UnionSetJigsawFoundation.SetPieceState) {
      return new fb_action_1.SetPieceState();
    }
  }
  static ReadUnionSetJigsawFoundation(e, t) {
    if (t !== undefined && e === fb_action_1.UnionSetJigsawFoundation.SetPieceState) {
      return FbSetPieceState_1.FbSetPieceState.Create(t);
    } else {
      return undefined;
    }
  }
}
exports.UnionSetJigsawFoundationHelper = UnionSetJigsawFoundationHelper;
//# sourceMappingURL=UnionSetJigsawFoundationHelper.js.map