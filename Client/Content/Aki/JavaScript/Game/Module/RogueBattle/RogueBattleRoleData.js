"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleRoleData = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const RoleDataBase_1 = require("../RoleUi/RoleData/RoleDataBase");
class RogueBattleRoleData extends RoleDataBase_1.RoleDataBase {
  constructor(e) {
    super(e);
  }
  IsTrialRole() {
    return false;
  }
  GetName(e) {
    return this.GetRoleInstanceData().GetName(e);
  }
  GetRoleId() {
    return this.Id;
  }
  IsOnlineRole() {
    return false;
  }
  CanChangeName() {
    return false;
  }
  GetRoleCreateTime() {
    return 0;
  }
  GetIsNew() {
    return false;
  }
  GetRoleSkinId() {
    return this.GetRoleInstanceData().GetRoleSkinId();
  }
  GetRoleInstanceData() {
    return ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.GetRoleId());
  }
}
exports.RogueBattleRoleData = RogueBattleRoleData;
//# sourceMappingURL=RogueBattleRoleData.js.map