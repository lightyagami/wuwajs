"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionModifyActorMaterialTypeHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbChangeActorMaterialData_1 = require("./FbChangeActorMaterialData");
const FbChangeActorMPC_1 = require("./FbChangeActorMPC");
class UnionModifyActorMaterialTypeHelper {
  static GetUnionModifyActorMaterialTypeObject(e) {
    switch (e) {
      case fb_action_1.UnionModifyActorMaterialType.ChangeActorMaterialData:
        return new fb_action_1.ChangeActorMaterialData();
      case fb_action_1.UnionModifyActorMaterialType.ChangeActorMPC:
        return new fb_action_1.ChangeActorMPC();
      default:
        return;
    }
  }
  static ReadUnionModifyActorMaterialType(e, t) {
    if (t !== undefined) {
      switch (e) {
        case fb_action_1.UnionModifyActorMaterialType.ChangeActorMaterialData:
          return FbChangeActorMaterialData_1.FbChangeActorMaterialData.Create(t);
        case fb_action_1.UnionModifyActorMaterialType.ChangeActorMPC:
          return FbChangeActorMPC_1.FbChangeActorMPC.Create(t);
        default:
          return;
      }
    }
  }
}
exports.UnionModifyActorMaterialTypeHelper = UnionModifyActorMaterialTypeHelper;
//# sourceMappingURL=UnionModifyActorMaterialTypeHelper.js.map