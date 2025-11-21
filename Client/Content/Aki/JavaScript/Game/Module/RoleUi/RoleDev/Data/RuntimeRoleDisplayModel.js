"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RuntimeRoleDisplayModel = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RoleDevUtils_1 = require("../RoleDevUtils");
const RoleDevDisplayModelBase_1 = require("./RoleDevDisplayModelBase");
class RuntimeRoleDisplayModel extends RoleDevDisplayModelBase_1.RoleDisplayModelBase {
  constructor() {
    super(...arguments);
    this.ovd = undefined;
  }
  InitByRoleData(e) {
    var a = e.GetDataId();
    var l = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(a, {
      ParamType: 0
    }) !== undefined;
    var i = RoleDevUtils_1.RoleDevUtils.GetRoleTypeTagByRoleId(a);
    var o = e.GetRoleConfig();
    this.InitBase({
      Id: a,
      Name: o.Name,
      SkinId: e.GetRoleSkinId(),
      ElementId: o.ElementId,
      Level: e.GetLevelData().GetLevel(),
      IsInTeam: l,
      IsTrial: false,
      IsNew: e.GetIsNew(),
      TypeTag: i
    });
    this.ovd = e;
  }
  InitByRoleId(e) {
    var a = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(e, {
      ParamType: 0
    }) !== undefined;
    var l = RoleDevUtils_1.RoleDevUtils.GetRoleTypeTagByRoleId(e);
    var i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    this.InitBase({
      Id: e,
      Name: i.Name,
      SkinId: i.SkinId,
      ElementId: i.ElementId,
      Level: 0,
      IsInTeam: a,
      IsTrial: false,
      IsNew: false,
      TypeTag: l
    });
  }
  get SourceType() {
    return 0;
  }
  get OriginRoleData() {
    return this.ovd;
  }
}
exports.RuntimeRoleDisplayModel = RuntimeRoleDisplayModel;
//# sourceMappingURL=RuntimeRoleDisplayModel.js.map