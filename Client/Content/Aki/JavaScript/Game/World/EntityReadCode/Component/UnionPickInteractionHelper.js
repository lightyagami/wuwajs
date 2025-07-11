"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionPickInteractionHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbChessmanPickInteraction_1 = require("./FbChessmanPickInteraction");
class UnionPickInteractionHelper {
  static GetUnionPickInteractionObject(n) {
    if (n === fb_component_1.UnionPickInteraction.ChessmanPickInteraction) {
      return new fb_component_1.ChessmanPickInteraction();
    }
  }
  static ReadUnionPickInteraction(n, e) {
    if (e !== undefined && n === fb_component_1.UnionPickInteraction.ChessmanPickInteraction) {
      return FbChessmanPickInteraction_1.FbChessmanPickInteraction.Create(e);
    } else {
      return undefined;
    }
  }
}
exports.UnionPickInteractionHelper = UnionPickInteractionHelper;
//# sourceMappingURL=UnionPickInteractionHelper.js.map