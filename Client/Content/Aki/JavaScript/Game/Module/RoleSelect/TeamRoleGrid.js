"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeamRoleGrid = undefined;
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../Common/MediumItemGrid/LoopScrollMediumItemGrid");
const RoguelikeSelectRoleView_1 = require("../Roguelike/View/RoguelikeSelectRoleView");
class TeamRoleGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.IsHighlightIndex = undefined;
  }
  OnRefresh(e, o, r) {
    var a = e.GetLevelData();
    var l = e.GetDataId();
    var i = ModelManager_1.ModelManager.EditFormationModel;
    var t = ModelManager_1.ModelManager.RoleSelectModel.GetRoleIndex(l);
    let d = false;
    var n = e.IsTrialRole();
    if (!n && !ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation() && !ModelManager_1.ModelManager.MowingTowerModel.IsOpenMowingTowerFormation() && !ControllerHolder_1.ControllerHolder.MapRogueController.CheckInMapRogueInstance()) {
      d = i.IsRoleDead(l);
    }
    var i = this.IsHighlightIndex?.(t);
    let M = false;
    if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId) {
      g = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId).RecommendRole;
      M = g.includes(e.GetRoleId());
    }
    var g = ModelManager_1.ModelManager.MowingTowerModel.OtherHalfAreaRoleList?.includes(l ?? -1) ? {
      BelongTo: 1 - ModelManager_1.ModelManager.MowingTowerModel.CurrentOptionArea
    } : undefined;
    var n = {
      Type: 2,
      ItemConfigId: l,
      SkinId: e.GetRoleSkinId(),
      IsTrialRoleVisible: n,
      BottomTextId: "Text_LevelShow_Text",
      BottomTextParameter: [a.GetLevel()],
      Index: t > 0 ? t : undefined,
      HighlightIndex: i,
      ElementId: e.GetRoleConfig().ElementId,
      IsShowCost: ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation(),
      Data: e,
      IsDisable: d,
      IsRecommendVisible: M,
      HalfAreaInfo: g,
      IsShowWeeklyRogueTag: ModelManager_1.ModelManager.WeeklyRogueModel.IsWeeklyRogueOpen() && ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsRecommendRole(l)
    };
    this.Apply(n);
    if (e.IsTrialRole()) {
      this.SetLevelAndLock();
    } else {
      a = !e || !ModelManager_1.ModelManager.EditBattleTeamModel.CanAddRoleToEditTeam(l);
      this.SetLevelAndLock(undefined, a);
    }
    var t = e.GetLevelData().GetLevel() < ModelManager_1.ModelManager.MowingTowerModel.AddLevel[0];
    if (ModelManager_1.ModelManager.MowingTowerModel.AddLevel[0] !== -1 && t) {
      this.SetAddLevelComponent(ModelManager_1.ModelManager.MowingTowerModel.AddLevel[0], t);
    }
    var i = ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.has(l);
    this.SetSelected(i, true);
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
  SetAddLevelComponent(e, o) {
    var r = this.Data.GetLevelData().GetLevel();
    var r = Math.max(r, e);
    var e = this.RefreshComponent(RoguelikeSelectRoleView_1.RogueAddLevelComponent, true, r);
    this.SetComponentVisible(e, o);
    if (r) {
      this.SetBottomTextVisible(false);
    }
  }
}
exports.TeamRoleGrid = TeamRoleGrid;
//# sourceMappingURL=TeamRoleGrid.js.map