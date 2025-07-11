"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionNpcLeisureInteractOpHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbNpcSitDown_1 = require("./FbNpcSitDown");
class UnionNpcLeisureInteractOpHelper {
  static GetUnionNpcLeisureInteractOpObject(e) {
    if (e === fb_action_1.UnionNpcLeisureInteractOp.NpcSitDown) {
      return new fb_action_1.NpcSitDown();
    }
  }
  static ReadUnionNpcLeisureInteractOp(e, t) {
    if (t !== undefined && e === fb_action_1.UnionNpcLeisureInteractOp.NpcSitDown) {
      return FbNpcSitDown_1.FbNpcSitDown.Create(t);
    } else {
      return undefined;
    }
  }
}
exports.UnionNpcLeisureInteractOpHelper = UnionNpcLeisureInteractOpHelper;
//# sourceMappingURL=UnionNpcLeisureInteractOpHelper.js.map