"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RogueBattleRoleData = void 0;
const ModelManager_1 = require("../../Manager/ModelManager"),
  RoleDataBase_1 = require("../RoleUi/RoleData/RoleDataBase");
class RogueBattleRoleData extends RoleDataBase_1.RoleDataBase {
  constructor(e) {
    super(e)
  }
  IsTrialRole() {
    return !1
  }
  GetName(e) {
    return this.GetRoleInstanceData().GetName(e)
  }
  GetRoleId() {
    return this.Id
  }
  IsOnlineRole() {
    return !1
  }
  CanChangeName() {
    return !1
  }
  GetRoleCreateTime() {
    return 0
  }
  GetIsNew() {
    return !1
  }
  GetRoleSkinId() {
    return this.GetRoleInstanceData().GetRoleSkinId()
  }
  GetRoleInstanceData() {
    return ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.GetRoleId())
  }
}
exports.RogueBattleRoleData = RogueBattleRoleData;
//# sourceMappingURL=RogueBattleRoleData.js.map