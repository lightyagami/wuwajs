"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerTeamData = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const EditFormationDefine_1 = require("../EditFormation/EditFormationDefine");
const ShipTowerDefine_1 = require("./ShipTowerDefine");
class ShipTowerTeamData {
  constructor() {
    this.InstId = 0;
    this.Index = 0;
    this.RoleList = [];
    this.BuffData = undefined;
    this.BuffDataEdit = undefined;
    this.StageId = 0;
    this.CurrentScore = 0;
    this.NewChallengeScore = 0;
    this.TeamInstName = "";
    this.AreaName = "";
    this.TeamName = "";
  }
  Init(e, t, i) {
    this.InstId = e;
    this.Index = t;
    this.StageId = i;
    this.TeamInstName = this.GetInstanceDungeonCfg()?.MapName ?? "MapName";
    e = t === 0 ? ShipTowerDefine_1.shipTowerTextKey.TeamName1 : ShipTowerDefine_1.shipTowerTextKey.TeamName2;
    this.TeamName = e;
    i = t === 0 ? ShipTowerDefine_1.shipTowerTextKey.TeamAreaNameUp : ShipTowerDefine_1.shipTowerTextKey.TeamAreaNameDown;
    this.AreaName = i;
    for (let e = 0; e < EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; e++) {
      var o = {
        RoleId: 0,
        RoleIdEdit: 0,
        TeamIndex: t,
        TeamId: 0,
        PositionIndex: e,
        BelongTo: t === 0 ? 0 : 1
      };
      this.RoleList.push(o);
    }
  }
  GetUseRoleList() {
    return this.RoleList;
  }
  UpdateToEdit() {
    this.RoleList.forEach(e => {
      this.pA_(e, e.RoleId);
    });
    this.vA_(this.BuffData);
  }
  CopyTeamRoleToEdit(i) {
    this.RoleList.forEach((e, t) => {
      t = i.RoleList[t].RoleIdEdit;
      this.pA_(e, t);
    });
  }
  CopyIdsToEdit(i) {
    this.RoleList.forEach((e, t) => {
      this.pA_(e, i[t], true);
    });
  }
  UpdateRoleListByModel() {
    const i = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap;
    this.RoleList.forEach(e => {
      var t = this.GetRoleIndexInAllTeam(e.PositionIndex + 1);
      var t = i.get(t)?.GetDataId() ?? 0;
      this.pA_(e, t);
    });
  }
  UpdateRoleListByFormationData(i) {
    ModelManager_1.ModelManager.RoleSelectModel.ClearData();
    this.RoleList.forEach((e, t) => {
      t = i.GetRoleIdList[t] ?? 0;
      this.pA_(e, t);
      this.yA_(e);
    });
  }
  UpdateRoleListToRoleSelectModel() {
    ModelManager_1.ModelManager.RoleSelectModel.ClearData();
    this.RoleList.forEach(e => {
      this.yA_(e);
    });
  }
  yA_(e, t = true) {
    var i = this.GetRoleIndexInAllTeam(e.PositionIndex + 1);
    if (e.RoleIdEdit) {
      if ((e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e.RoleIdEdit)) && (ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap.set(i, e), t)) {
        ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.add(e.GetDataId());
      }
    } else {
      ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap.delete(i);
    }
  }
  GetRoleIndexInAllTeam(e) {
    return this.Index * EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM + e;
  }
  UpdateOtherTeamRoleToShipTowerModel() {
    this.RoleList.forEach(e => {
      ModelManager_1.ModelManager.ShipTowerModel.AddOtherTeamRoleData(e);
    });
  }
  UpdateAllTeamRoleToShipTowerModel() {
    this.RoleList.forEach(e => {
      ModelManager_1.ModelManager.ShipTowerModel.AddAllTeamRoleData(e);
    });
  }
  UpdateOtherTeamRoleRepeat(e) {
    const t = e.GetRoleIdListEdit();
    let i = false;
    this.RoleList.forEach(e => {
      if (e.RoleIdEdit && t.includes(e.RoleIdEdit)) {
        this.pA_(e, 0);
        i = true;
      }
    });
    return i;
  }
  RemoveRoleIdEdit(t) {
    if (t) {
      this.RoleList.forEach(e => {
        if (e.RoleIdEdit === t) {
          this.pA_(e, 0);
        }
      });
    }
  }
  UpdateRoleIndexInAllTeam() {
    this.RoleList.forEach(e => {
      this.yA_(e, false);
    });
  }
  UseBuff(e) {
    this.vA_(e);
  }
  IsSetRoleFinish() {
    return this.RoleList.every(e => e.RoleId > 0);
  }
  IsSetRoleFinishEdit() {
    return this.RoleList.every(e => e.RoleIdEdit > 0);
  }
  IsSetBuffFinish() {
    return this.BuffData !== undefined;
  }
  IsSetBuffFinishEdit() {
    return this.BuffDataEdit !== undefined;
  }
  TeamIsEmpty() {
    return !this.IsSetBuffFinishEdit() && this.RoleList.every(e => e.RoleIdEdit === 0);
  }
  ExChangeTeamData(e) {
    var t = this.BuffDataEdit?.Id;
    this.vA_(e.BuffDataEdit);
    e.UpdateBuffIdEdit(t);
    var t = this.GetRoleIdListEdit();
    this.CopyIdsToEdit(e.GetRoleIdListEdit());
    e.CopyIdsToEdit(t);
    this.UpdateRoleListToRoleSelectModel();
  }
  ProtoSetRole(e, t) {
    var i = this.RoleList[t];
    if (i) {
      this.SA_(i, e);
      this.pA_(i, e);
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ShipTower", 69, "ProtoSetRole", ["index", t]);
    }
  }
  ProtoSetBuff(e = 0) {
    e = ModelManager_1.ModelManager.ShipTowerModel.GetBuffDataByBuffId(e);
    this.MA_(e);
    this.vA_(e);
  }
  UpdateCurrentScore(e) {
    this.CurrentScore = e;
  }
  GetRoleIdList() {
    return this.RoleList.map(e => e.RoleId);
  }
  GetRoleIdListEdit() {
    return this.RoleList.map(e => e.RoleIdEdit);
  }
  ResetStage() {
    this.RoleList.forEach(e => {
      this.SA_(e, 0);
      this.pA_(e, 0);
    });
    this.MA_(undefined);
    this.vA_(undefined);
    this.UpdateCurrentScore(0);
  }
  CoverChallenge() {
    this.RoleList.forEach(e => {
      this.SA_(e, e.RoleIdEdit);
    });
    this.MA_(this.BuffDataEdit);
    this.UpdateCurrentScore(this.NewChallengeScore);
  }
  SA_(e, t = 0) {
    e.RoleId = t;
  }
  pA_(e, t = 0, i = false) {
    if ((e.RoleIdEdit = t) <= 0) {
      e.RoleIdEdit = 0;
    } else if (i) {
      e.RoleIdEdit = ModelManager_1.ModelManager.ShipTowerModel.IsCanUseRole(t) ? t : 0;
    } else if (ModelManager_1.ModelManager.RoleModel?.IsMainRole(t)) {
      e.RoleIdEdit = ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleId() ?? t;
    }
  }
  MA_(e) {
    this.BuffData = e;
  }
  vA_(e) {
    this.BuffDataEdit = e;
  }
  UpdateBuffIdEdit(e = 0) {
    e = ModelManager_1.ModelManager.ShipTowerModel.GetBuffDataByBuffId(e);
    this.vA_(e);
  }
  CopyBuffIdToEdit(e, t) {
    e = ModelManager_1.ModelManager.ShipTowerModel.GetBuffDataByBuffId(e);
    if (e?.IsCanUse(t)) {
      this.vA_(e);
    } else {
      this.vA_(undefined);
    }
  }
  ProtoTeamEditFromResult(e) {
    e?.RL_.forEach((e, t) => {
      this.pA_(this.RoleList[t], e);
    });
    this.UpdateBuffIdEdit(e?.AL_);
  }
  ProtoSetNewChallengeScore(e) {
    this.NewChallengeScore = e;
  }
  GetInstanceDungeonCfg(e) {
    return ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e ?? this.InstId);
  }
  GetShipTowerStageCfg() {
    return ConfigManager_1.ConfigManager.ShipTowerConfig.GetStageInfoCfgByInstId(this.InstId);
  }
  GetInfoAttr() {
    var e = this.GetInstanceDungeonCfg();
    var t = ShipTowerDefine_1.shipTowerTextKey.StageMechanism;
    var e = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(e.DungeonDesc, e.DungeonDesc);
    return {
      Title: ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(t, t),
      InfoList: [{
        Desc: e
      }]
    };
  }
  GetInfoWord() {
    var e = this.GetShipTowerStageCfg();
    const i = [];
    e?.BuffId?.forEach(e => {
      var t = ConfigManager_1.ConfigManager.ShipTowerConfig.GetWordInfoCfgById(e);
      if (t) {
        e = this.OG_(e, t);
        t = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(t.Desc, t.Desc);
        i.push({
          Desc: t,
          ...e
        });
      }
    });
    if (!i.length) {
      e = ShipTowerDefine_1.shipTowerTextKey.WordNull;
      e = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(e, e);
      i.push({
        Desc: e
      });
    }
    e = ShipTowerDefine_1.shipTowerTextKey.MonsterWord;
    return {
      Title: ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(e, e),
      InfoList: i
    };
  }
  GetMonsterListItemData() {
    var e = ShipTowerDefine_1.shipTowerTextKey.MonsterList;
    return {
      Title: ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(e, e),
      MonsterInfoList: this.GetMonsterInfoList()
    };
  }
  GetMonsterInfoList() {
    const i = [];
    var e = this.InstId;
    var t = this.GetShipTowerStageCfg();
    var o = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel;
    const a = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(e, o);
    t?.MonsterId.forEach(e => {
      var t = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(e);
      var e = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterIcon(e);
      var e = {
        Title: t?.Name ?? "",
        Level: a,
        MonsterIcon: e,
        ElementList: t?.ElementIdArray ?? []
      };
      i.push(e);
    });
    return i;
  }
  GetWordInfoList() {
    var e = this.GetShipTowerStageCfg();
    const t = [];
    e?.BuffId.forEach(e => {
      e = this.OG_(e);
      if (e) {
        t.push(e);
      }
    });
    return t;
  }
  OG_(e, t) {
    t = t ?? ConfigManager_1.ConfigManager.ShipTowerConfig.GetWordInfoCfgById(e);
    if (t) {
      return {
        Title: ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(t.Name, t.Name),
        IconPath: t.Path,
        TitleColor: t.Color
      };
    }
  }
  UpdateMainRoleToEdit() {
    this.RoleList.forEach(e => {
      if (e.RoleIdEdit > 0 && ModelManager_1.ModelManager.RoleModel?.IsMainRole(e.RoleIdEdit)) {
        this.pA_(e, e.RoleIdEdit);
      }
    });
  }
}
exports.ShipTowerTeamData = ShipTowerTeamData;
//# sourceMappingURL=ShipTowerTeamData.js.map