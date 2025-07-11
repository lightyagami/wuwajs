"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerHeadData = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
class PlayerHeadData {
  constructor(t) {
    this.Id = undefined;
    this.Config = undefined;
    this.d3l = true;
    this.m3l = undefined;
    this.Id = t.Id;
    if ((this.Config = t).RoleSkinId > 0) {
      this.m3l = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(t.RoleSkinId);
    }
  }
  set Lock(t) {
    this.d3l = t;
  }
  get Lock() {
    return this.d3l;
  }
  GetName() {
    return (this.m3l ? this.m3l.GetRoleSkinConfig() : this.Config).Name;
  }
  GetRoleHeadIconLarge() {
    return (this.m3l ? this.m3l.GetRoleSkinConfig() : this.Config).RoleHeadIconLarge;
  }
  GetRoleHeadIcon() {
    return (this.m3l ? this.m3l.GetRoleSkinConfig() : this.Config).RoleHeadIcon;
  }
  GetRoleCardHeadIcon() {
    return (this.m3l ? this.m3l.GetRoleSkinConfig() : this.Config).Card;
  }
  GetRoleHeadIconCircle() {
    return (this.m3l ? this.m3l.GetRoleSkinConfig() : this.Config).RoleHeadIconCircle;
  }
}
exports.PlayerHeadData = PlayerHeadData;
//# sourceMappingURL=PlayerHeadData.js.map