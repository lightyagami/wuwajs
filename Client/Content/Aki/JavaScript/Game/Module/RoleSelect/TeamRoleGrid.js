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
const TowerData_1 = require("../TowerDetailUi/TowerData");
class TeamRoleGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.IsHighlightIndex = undefined;
    this.IsShowGray = undefined;
  }
  OnRefresh(o, e, a) {
    var r = o.GetLevelData();
    var l = o.GetDataId();
    var t = ModelManager_1.ModelManager.EditFormationModel;
    var i = ModelManager_1.ModelManager.RoleSelectModel.GetRoleIndex(l);
    let d = false;
    var M = o.IsTrialRole();
    if (!M && !ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation() && !ControllerHolder_1.ControllerHolder.LordGymController.IsInLordGymDungeon() && !ModelManager_1.ModelManager.MowingTowerModel.IsOpenMowingTowerFormation() && !ControllerHolder_1.ControllerHolder.MapRogueController.CheckInMapRogueInstance()) {
      d = t.IsRoleDead(l);
    }
    var t = this.IsHighlightIndex?.(i);
    let n = false;
    let s = false;
    if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId) {
      var g = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId);
      let e = g.RecommendRole;
      n = e.includes(o.GetRoleId());
      e = g.RecommendRoleBottom;
      s = e.includes(o.GetRoleId());
    }
    var g = ModelManager_1.ModelManager.MowingTowerModel.OtherHalfAreaRoleList?.includes(l ?? -1) ? {
      BelongTo: 1 - ModelManager_1.ModelManager.MowingTowerModel.CurrentOptionArea
    } : undefined;
    var _ = this.IsShowGray?.(o.GetDataId()) ?? false;
    let h = undefined;
    if (ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation() && !_) {
      m = ModelManager_1.ModelManager.TowerModel.GetRoleRemainCost(l, ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties);
      h = {
        Cost: m,
        Color: m >= TowerData_1.HIGH_COST ? TowerData_1.highColor : TowerData_1.lowColor
      };
    }
    var m = {
      Type: 2,
      ItemConfigId: l,
      SkinId: o.GetRoleSkinId(),
      IsTrialRoleVisible: M,
      BottomTextId: "Text_LevelShow_Text",
      BottomTextParameter: [r.GetLevel()],
      Index: i > 0 ? i : undefined,
      HighlightIndex: t,
      ElementId: o.GetRoleConfig().ElementId,
      ShowCostData: h,
      Data: o,
      IsDisable: d,
      IsRecommendVisible: n,
      HalfAreaInfo: g,
      IsShowWeeklyRogueTag: ModelManager_1.ModelManager.WeeklyRogueModel.IsWeeklyRogueOpen() && ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsRecommendRole(l),
      IsRecommendBottomVisible: s
    };
    this.Apply(m);
    if (o.IsTrialRole()) {
      this.SetLevelAndLock();
    } else {
      M = !o || !ModelManager_1.ModelManager.EditBattleTeamModel.CanAddRoleToEditTeam(l);
      this.SetLevelAndLock(undefined, M);
    }
    var r = o.GetLevelData().GetLevel() < ModelManager_1.ModelManager.MowingTowerModel.AddLevel[0];
    if (ModelManager_1.ModelManager.MowingTowerModel.AddLevel[0] !== -1 && r) {
      this.SetAddLevelComponent(ModelManager_1.ModelManager.MowingTowerModel.AddLevel[0], r);
    }
    var i = o.GetLevelData().GetLevel() < ModelManager_1.ModelManager.HonamiStoryModel.AddLevel[0];
    if (ModelManager_1.ModelManager.HonamiStoryModel.AddLevel[0] !== -1 && i) {
      this.SetAddLevelComponent(ModelManager_1.ModelManager.HonamiStoryModel.AddLevel[0], i);
    }
    if (_) {
      this.SetIsDisable(true);
    } else {
      this.SetIsDisable(false);
      t = ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.has(l);
      this.SetSelected(t, true);
    }
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