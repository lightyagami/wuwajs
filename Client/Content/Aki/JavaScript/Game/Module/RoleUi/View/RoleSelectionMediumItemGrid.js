"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSelectionMediumItemGrid = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
const RoleDataBase_1 = require("../RoleData/RoleDataBase");
class RoleSelectionMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.f1a = false;
  }
  SetNeedShowTrial(e) {
    this.f1a = e;
  }
  OnRefresh(e, t, o) {
    var i = e.GetDataId();
    var i = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(i, {
      ParamType: 0
    }) !== undefined;
    var i = {
      Type: 2,
      Data: e,
      ItemConfigId: e.GetDataId(),
      SkinId: e.GetRoleSkinId(),
      BottomTextId: "Text_LevelShow_Text",
      BottomTextParameter: [e.GetLevelData().GetLevel()],
      IsInTeam: i,
      ElementId: e.GetRoleConfig().ElementId,
      IsTrialRoleVisible: e.IsTrialRole() && this.f1a,
      IsNewVisible: e.GetIsNew()
    };
    this.Apply(i);
    this.SetSelected(t);
  }
  OnSelected(e) {
    this.SetSelected(true);
    this.SetNewVisible(false);
    if (this.Data instanceof RoleDataBase_1.RoleDataBase) {
      this.Data.TryRemoveNewFlag();
    }
  }
  OnDeselected(e) {
    this.SetSelected(false, true);
  }
}
exports.RoleSelectionMediumItemGrid = RoleSelectionMediumItemGrid;
//# sourceMappingURL=RoleSelectionMediumItemGrid.js.map