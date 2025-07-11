"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleTeamRoleGrid = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class RogueBattleTeamRoleGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  OnRefresh(e, o, r) {
    var t = e.RoleData.GetDataId();
    var d = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t);
    var a = d.GetRoleConfig();
    var l = ModelManager_1.ModelManager.RogueBattleModel.GetIncIdByRoleId(t);
    var l = ModelManager_1.ModelManager.RogueBattleModel.GetRoleInfoById(l);
    var i = ModelManager_1.ModelManager.RoleSelectModel.GetRoleIndex(t);
    var d = d.GetRoleSkinId();
    var l = {
      Star: l.F6n
    };
    var d = {
      Type: 2,
      ItemConfigId: t,
      SkinId: d,
      Index: i > 0 ? i : undefined,
      ElementId: a.ElementId,
      FrameEffect: e.IsLinkOn,
      LvAndStar: l,
      Data: e
    };
    this.Apply(d);
    var i = ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.has(t);
    this.SetSelected(i, true);
  }
  OnSelected(e) {
    this.SetSelected(true);
  }
  OnDeselected(e) {
    this.SetSelected(false);
  }
  OnForceSelected(e) {
    this.SetSelected(e, true);
  }
}
exports.RogueBattleTeamRoleGrid = RogueBattleTeamRoleGrid;
//# sourceMappingURL=RogueBattleTeamRoleGrid.js.map