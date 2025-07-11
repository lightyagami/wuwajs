"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionPasserbyNpcMoveHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbPasserbyNpcSplineMove_1 = require("./FbPasserbyNpcSplineMove");
class UnionPasserbyNpcMoveHelper {
  static GetUnionPasserbyNpcMoveObject(e) {
    if (e === fb_component_1.UnionPasserbyNpcMove.PasserbyNpcSplineMove) {
      return new fb_component_1.PasserbyNpcSplineMove();
    }
  }
  static ReadUnionPasserbyNpcMove(e, o) {
    if (o !== undefined && e === fb_component_1.UnionPasserbyNpcMove.PasserbyNpcSplineMove) {
      return FbPasserbyNpcSplineMove_1.FbPasserbyNpcSplineMove.Create(o);
    } else {
      return undefined;
    }
  }
}
exports.UnionPasserbyNpcMoveHelper = UnionPasserbyNpcMoveHelper;
//# sourceMappingURL=UnionPasserbyNpcMoveHelper.js.map