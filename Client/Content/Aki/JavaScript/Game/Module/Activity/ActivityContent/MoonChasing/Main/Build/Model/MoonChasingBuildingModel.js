"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoonChasingBuildingModel = undefined;
const CommonParamById_1 = require("../../../../../../../../Core/Define/ConfigCommon/CommonParamById");
const ModelBase_1 = require("../../../../../../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../../Manager/ModelManager");
const MoonChasingPopularityUpData_1 = require("../../Business/Model/MoonChasingPopularityUpData");
const BuildingData_1 = require("./BuildingData");
class MoonChasingBuildingModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.JOe = new Map();
    this.efa = undefined;
  }
  OnInit() {
    var e = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingAll();
    if (e) {
      for (const i of e) {
        var t = new BuildingData_1.BuildingData(i.Id);
        this.JOe.set(i.Id, t);
      }
    }
    return true;
  }
  SetAllBuildingData(e) {
    for (const t of e) {
      this.SetBuildingData(t);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrackMoonHandbookUpdate);
  }
  SetBuildingData(e) {
    var t = this.JOe.get(e.W6n);
    t.IsUnlock = e.K6n;
    t.Level = e.F6n;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MoonChasingRefreshBuildingRedDot);
  }
  ConditionUnlockBuildingData(e) {
    this.SetBuildingData(e);
  }
  LevelUpBuildingData(e, t, i) {
    this.SetBuildingData(e);
    this.InitPopularityData(t, i, true);
  }
  GetBuildingDataById(e) {
    return this.JOe.get(e);
  }
  UnlockBuildingData(e, t, i) {
    e = this.JOe.get(e);
    e.IsUnlock = true;
    e.Level = 1;
    this.InitPopularityData(t, i, false);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrackMoonHandbookUpdate);
  }
  GetBuildingDataSize() {
    return this.JOe.size;
  }
  GetAllBuildingData() {
    return Array.from(this.JOe.values());
  }
  GetBuiltBuildingCount() {
    let e = 0;
    for (var [, t] of this.JOe) {
      if (t.IsBuild) {
        e++;
      }
    }
    return e;
  }
  InitPopularityData(e, t, i) {
    var n = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetPopularityConfigByValue(t);
    var a = ModelManager_1.ModelManager.MoonChasingBusinessModel.GetPlayerRoleId();
    var o = ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender() === 1;
    var i = i ? "Moonfiesta_Title4" : "Moonfiesta_Title3";
    var a = new MoonChasingPopularityUpData_1.MoonChasingPopularityUpData(a, e, t, o ? n.NpcDialog : n.NpcDialogGirl, i);
    this.SetPopularityUpData(a);
  }
  SetPopularityUpData(e) {
    this.efa = e;
  }
  GetPopularityUpData() {
    return this.efa;
  }
  CheckAllBuildingRedDotState() {
    for (const e of this.JOe.values()) {
      if (this.CheckBuildingRedDotState(e)) {
        return true;
      }
    }
    return false;
  }
  GetFirstUnLockBuildingData() {
    for (const e of this.JOe.values()) {
      if (e.IsUnlock && e.Level === 0 && e.IsCanLevelUp) {
        return e;
      }
    }
  }
  GetFirstCanLevelUpBuildingId() {
    for (const e of this.JOe.values()) {
      if (e.IsAvailableLevelUp && this.CheckBuildingRedDotState(e)) {
        return e.Id;
      }
    }
  }
  CheckBuildingRedDotState(e) {
    var t = ModelManager_1.ModelManager.MoonChasingModel.GetCoinValue();
    return !!e.IsUnlock && !e.IsMax && t >= e.GetConsumeCount();
  }
  GetBuildingConfigListBySort() {
    var e = [...ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingAll()];
    e.sort((e, t) => e.Sort < t.Sort ? -1 : 1);
    return e;
  }
  CheckPlotInfoValid(t) {
    var e;
    var i;
    var n;
    return ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingAll().find(e => e.FlowListName === t.FlowListName && e.FlowId === t.FlowId && e.StateId === t.StateId) !== undefined || (e = CommonParamById_1.configCommonParamById.GetStringConfig("MoonChasingBuildLastFlowName"), i = CommonParamById_1.configCommonParamById.GetIntConfig("MoonChasingBuildLastFlowIdF"), n = CommonParamById_1.configCommonParamById.GetIntConfig("MoonChasingBuildLastFlowIdC"), e === t.FlowListName && i === t.FlowId && n === t.StateId);
  }
  GetBuildingIdByRoleId(t) {
    var e = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingAll().find(e => e.AssociateRole === t);
    if (e === undefined) {
      return -1;
    } else {
      return e.Id;
    }
  }
}
exports.MoonChasingBuildingModel = MoonChasingBuildingModel;
//# sourceMappingURL=MoonChasingBuildingModel.js.map