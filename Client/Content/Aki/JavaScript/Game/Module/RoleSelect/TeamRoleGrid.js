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
  OnRefresh(o, e, r) {
    var l = o.GetLevelData();
    var a = o.GetDataId();
    var i = ModelManager_1.ModelManager.EditFormationModel;
    var t = ModelManager_1.ModelManager.RoleSelectModel.GetRoleIndex(a);
    let d = false;
    var n = o.IsTrialRole();
    if (!n && !ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation() && !ModelManager_1.ModelManager.MowingTowerModel.IsOpenMowingTowerFormation() && !ControllerHolder_1.ControllerHolder.MapRogueController.CheckInMapRogueInstance()) {
      d = i.IsRoleDead(a);
    }
    var i = this.IsHighlightIndex?.(t);
    let M = false;
    let s = false;
    if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId) {
      var g = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId);
      let e = g.RecommendRole;
      M = e.includes(o.GetRoleId());
      e = g.RecommendRoleBottom;
      s = e.includes(o.GetRoleId());
    }
    g = ModelManager_1.ModelManager.MowingTowerModel.OtherHalfAreaRoleList?.includes(a ?? -1) ? {
      BelongTo: 1 - ModelManager_1.ModelManager.MowingTowerModel.CurrentOptionArea
    } : undefined;
    n = {
      Type: 2,
      ItemConfigId: a,
      SkinId: o.GetRoleSkinId(),
      IsTrialRoleVisible: n,
      BottomTextId: "Text_LevelShow_Text",
      BottomTextParameter: [l.GetLevel()],
      Index: t > 0 ? t : undefined,
      HighlightIndex: i,
      ElementId: o.GetRoleConfig().ElementId,
      IsShowCost: ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation(),
      Data: o,
      IsDisable: d,
      IsRecommendVisible: M,
      HalfAreaInfo: g,
      IsShowWeeklyRogueTag: ModelManager_1.ModelManager.WeeklyRogueModel.IsWeeklyRogueOpen() && ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsRecommendRole(a),
      IsRecommendBottomVisible: s
    };
    this.Apply(n);
    if (o.IsTrialRole()) {
      this.SetLevelAndLock();
    } else {
      l = !o || !ModelManager_1.ModelManager.EditBattleTeamModel.CanAddRoleToEditTeam(a);
      this.SetLevelAndLock(undefined, l);
    }
    t = o.GetLevelData().GetLevel() < ModelManager_1.ModelManager.MowingTowerModel.AddLevel[0];
    if (ModelManager_1.ModelManager.MowingTowerModel.AddLevel[0] !== -1 && t) {
      this.SetAddLevelComponent(ModelManager_1.ModelManager.MowingTowerModel.AddLevel[0], t);
    }
    i = ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.has(a);
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