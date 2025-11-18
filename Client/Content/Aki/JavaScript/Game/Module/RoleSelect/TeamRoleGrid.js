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
  OnRefresh(o, e, a) {
    var r = o.GetLevelData();
    var l = o.GetDataId();
    var i = ModelManager_1.ModelManager.EditFormationModel;
    var t = ModelManager_1.ModelManager.RoleSelectModel.GetRoleIndex(l);
    let d = false;
    var M = o.IsTrialRole();
    if (!M && !ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation() && !ModelManager_1.ModelManager.MowingTowerModel.IsOpenMowingTowerFormation() && !ControllerHolder_1.ControllerHolder.MapRogueController.CheckInMapRogueInstance()) {
      d = i.IsRoleDead(l);
    }
    var i = this.IsHighlightIndex?.(t);
    let n = false;
    let g = false;
    if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId) {
      var s = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId);
      let e = s.RecommendRole;
      n = e.includes(o.GetRoleId());
      e = s.RecommendRoleBottom;
      g = e.includes(o.GetRoleId());
    }
    s = ModelManager_1.ModelManager.MowingTowerModel.OtherHalfAreaRoleList?.includes(l ?? -1) ? {
      BelongTo: 1 - ModelManager_1.ModelManager.MowingTowerModel.CurrentOptionArea
    } : undefined;
    M = {
      Type: 2,
      ItemConfigId: l,
      SkinId: o.GetRoleSkinId(),
      IsTrialRoleVisible: M,
      BottomTextId: "Text_LevelShow_Text",
      BottomTextParameter: [r.GetLevel()],
      Index: t > 0 ? t : undefined,
      HighlightIndex: i,
      ElementId: o.GetRoleConfig().ElementId,
      IsShowCost: ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation(),
      Data: o,
      IsDisable: d,
      IsRecommendVisible: n,
      HalfAreaInfo: s,
      IsShowWeeklyRogueTag: ModelManager_1.ModelManager.WeeklyRogueModel.IsWeeklyRogueOpen() && ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsRecommendRole(l),
      IsRecommendBottomVisible: g
    };
    this.Apply(M);
    if (o.IsTrialRole()) {
      this.SetLevelAndLock();
    } else {
      r = !o || !ModelManager_1.ModelManager.EditBattleTeamModel.CanAddRoleToEditTeam(l);
      this.SetLevelAndLock(undefined, r);
    }
    t = o.GetLevelData().GetLevel() < ModelManager_1.ModelManager.MowingTowerModel.AddLevel[0];
    if (ModelManager_1.ModelManager.MowingTowerModel.AddLevel[0] !== -1 && t) {
      this.SetAddLevelComponent(ModelManager_1.ModelManager.MowingTowerModel.AddLevel[0], t);
    }
    i = o.GetLevelData().GetLevel() < ModelManager_1.ModelManager.HonamiStoryModel.AddLevel[0];
    if (ModelManager_1.ModelManager.HonamiStoryModel.AddLevel[0] !== -1 && i) {
      this.SetAddLevelComponent(ModelManager_1.ModelManager.HonamiStoryModel.AddLevel[0], i);
    }
    s = ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.has(l);
    this.SetSelected(s, true);
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
    var a = this.Data.GetLevelData().GetLevel();
    var a = Math.max(a, e);
    var e = this.RefreshComponent(RoguelikeSelectRoleView_1.RogueAddLevelComponent, true, a);
    this.SetComponentVisible(e, o);
    if (a) {
      this.SetBottomTextVisible(false);
    }
  }
}
exports.TeamRoleGrid = TeamRoleGrid;
//# sourceMappingURL=TeamRoleGrid.js.map