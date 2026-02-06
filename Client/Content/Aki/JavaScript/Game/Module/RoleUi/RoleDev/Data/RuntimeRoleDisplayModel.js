"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RuntimeRoleDisplayModel = undefined;
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
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
    var i = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(a, {
      ParamType: 0
    }) !== undefined;
    var l = RoleDevUtils_1.RoleDevUtils.GetRoleTypeTagByRoleId(a);
    var r = e.GetRoleConfig();
    this.InitBase({
      Id: a,
      Name: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r.Name),
      SkinId: e.GetRoleSkinId(),
      ElementId: r.ElementId,
      Level: e.GetLevelData().GetLevel(),
      IsInTeam: i,
      IsTrial: false,
      IsNew: e.GetIsNew(),
      TypeTag: l
    });
    this.ovd = e;
  }
  InitByRoleId(e) {
    var a = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(e, {
      ParamType: 0
    }) !== undefined;
    var i = RoleDevUtils_1.RoleDevUtils.GetRoleTypeTagByRoleId(e);
    var l = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    this.InitBase({
      Id: e,
      Name: MultiTextLang_1.configMultiTextLang.GetLocalTextNew(l.Name),
      SkinId: l.SkinId,
      ElementId: l.ElementId,
      Level: 0,
      IsInTeam: a,
      IsTrial: false,
      IsNew: false,
      TypeTag: i
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