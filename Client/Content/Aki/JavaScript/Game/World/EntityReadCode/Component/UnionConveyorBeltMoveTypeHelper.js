"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionConveyorBeltMoveTypeHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbFixSpeed_1 = require("./FbFixSpeed");
class UnionConveyorBeltMoveTypeHelper {
  static GetUnionConveyorBeltMoveTypeObject(e) {
    if (e === fb_component_1.UnionConveyorBeltMoveType.FixSpeed) {
      return new fb_component_1.FixSpeed();
    }
  }
  static ReadUnionConveyorBeltMoveType(e, o) {
    if (o !== undefined && e === fb_component_1.UnionConveyorBeltMoveType.FixSpeed) {
      return FbFixSpeed_1.FbFixSpeed.Create(o);
    } else {
      return undefined;
    }
  }
}
exports.UnionConveyorBeltMoveTypeHelper = UnionConveyorBeltMoveTypeHelper;
//# sourceMappingURL=UnionConveyorBeltMoveTypeHelper.js.map