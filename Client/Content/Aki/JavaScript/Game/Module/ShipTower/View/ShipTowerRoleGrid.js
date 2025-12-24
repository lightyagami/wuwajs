"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerRoleGrid = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class ShipTowerRoleGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.IsHighlightIndex = undefined;
  }
  OnRefresh(e, o, t) {
    var r = e.GetLevelData();
    var i = e.GetDataId();
    var r = {
      Type: 2,
      ItemConfigId: i,
      SkinId: e.GetRoleSkinId(),
      IsTrialRoleVisible: e.IsTrialRole(),
      BottomTextId: "Text_LevelShow_Text",
      BottomTextParameter: [r.GetLevel()],
      ElementId: e.GetRoleConfig().ElementId,
      Data: e,
      IsRecommendVisible: false,
      HalfAreaInfo: ModelManager_1.ModelManager.ShipTowerModel.GetAllTeamRoleData(i)
    };
    this.Apply(r);
    if (e.IsTrialRole()) {
      this.SetLevelAndLock();
    } else {
      r = !e || !ModelManager_1.ModelManager.EditBattleTeamModel.CanAddRoleToEditTeam(i);
      this.SetLevelAndLock(undefined, r);
    }
    var e = ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.has(i);
    this.SetSelected(e, true);
  }
  OnForceSelected() {
    this.SetSelected(true, true);
  }
  OnSelected(e) {
    this.SetSelected(true);
  }
  OnDeselected(e) {
    this.SetSelected(false);
  }
}
exports.ShipTowerRoleGrid = ShipTowerRoleGrid;
//# sourceMappingURL=ShipTowerRoleGrid.js.map