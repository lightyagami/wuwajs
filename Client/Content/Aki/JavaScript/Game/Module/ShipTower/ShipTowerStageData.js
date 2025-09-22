"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerStageData = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const ShipTowerDefine_1 = require("./ShipTowerDefine");
const ShipTowerTeamData_1 = require("./ShipTowerTeamData");
class ShipTowerStageData {
  constructor() {
    this.Id = 0;
    this.OrderIndex = 1;
    this.StageType = 0;
    this.Season = 0;
    this.IsEndLess = false;
    this.IsQuickPass = false;
    this.InstIds = [];
    this.PreLevel = [];
    this.TitleKey = "";
    this.DescKey = "";
    this.TargetScoreList = [];
    this.ScoreStageList = [];
    this.CurrentScore = 0;
    this.PassScore = 0;
    this.PassReward = 0;
    this.cs_ = [];
    this.TeamDataList = [];
    this.ProtoIsUnLocked = false;
    this.NewChallengeScore = 0;
    this.IsHaveProtoData = false;
    this.LastIsPass = false;
    this.LastScore = 0;
    this.IsNeedSureScore = false;
    this.BelongToSeason = 0;
    this.ProtoIsPassed = false;
    this.TeamRecommendList = [];
    this.CurSelectTeamIndex = 0;
  }
  Init(e) {
    this.Id = e.Id;
    this.Season = e.Season;
    this.IsEndLess = e.EndLess;
    this.InstIds = e.InstIds;
    this.PreLevel = e.PreLevel;
    this.PassScore = e.PassScore;
    this.PassReward = e.LevelPassReward;
    this.TitleKey = e.Title;
    this.DescKey = e.Desc;
    this.TargetScoreList = e.TargetScore;
    this.ScoreStageList = e.ScoreStage;
    this.BelongToSeason = e.Season;
    this.us_();
  }
  us_() {
    if (this.IsEndLess) {
      this.StageType = 2;
    } else if (this.Season === 0) {
      this.StageType = 0;
    } else {
      this.StageType = 1;
    }
    this.InstIds.forEach((e, t) => {
      var i = new ShipTowerTeamData_1.ShipTowerTeamData();
      i.Init(e, t, this.Id);
      this.TeamDataList.push(i);
    });
  }
  IsUnLocked() {
    if (this.IsHaveProtoData) {
      return this.ProtoIsUnLocked;
    } else {
      return this.PreLevel.length === 0 || this.PreLevel.every(e => ModelManager_1.ModelManager.ShipTowerModel.GetStageDataById(e).IsPassed());
    }
  }
  IsPassed() {
    if (this.IsHaveProtoData) {
      return this.ProtoIsPassed;
    } else {
      return this.CurrentIsPassed();
    }
  }
  CurrentIsPassed() {
    return this.CurrentScore >= this.PassScore;
  }
  CanReset() {
    return this.IsTeamSetRoleFinish();
  }
  IsNewRecord(e) {
    return (e ?? this.CurrentScore) > this.LastScore;
  }
  IsNotChallenge() {
    return !this.IsTeamSetBuffFinish() || !this.IsTeamSetRoleFinish();
  }
  SetOrderIndex(e) {
    this.OrderIndex = e;
  }
  IsCurrent() {
    return this.IsUnLocked() && !this.IsPassed();
  }
  OpenViewStageDesc() {
    var e;
    if (this.IsUnLocked()) {
      ModelManager_1.ModelManager.ShipTowerModel.OpenViewDesc({
        StageId: this.Id
      });
    } else {
      e = ShipTowerDefine_1.shipTowerTextKey.StageNotUnLock;
      e = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(e, e);
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(e);
    }
  }
  OpenViewPassBuffShow() {
    ModelManager_1.ModelManager.ShipTowerModel.OpenViewPassBuffShow({
      StageData: this
    });
  }
  OpenViewTeamRecommend() {
    ModelManager_1.ModelManager.ShipTowerModel.OpenViewTeamRecommend({
      StageData: this
    });
  }
  OpenViewMonsterDesc(e) {
    ModelManager_1.ModelManager.ShipTowerModel.OpenViewMonsterDesc({
      StageData: this,
      InstId: e
    });
  }
  GetTargetScoreInfoList() {
    var e = [];
    var t = this.ZH_();
    if (t) {
      e.push(t);
    }
    var t = this.e9_();
    e.push(t);
    return e;
  }
  ZH_() {
    var e;
    var t;
    if (!this.IsEndLess) {
      e = ShipTowerDefine_1.shipTowerTextKey.PassTarget;
      t = ShipTowerDefine_1.shipTowerTextKey.ScoreTarget;
      return {
        Title: ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(e, e),
        TargetList: [{
          Title: ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(t, t),
          ScoreTarget: this.PassScore,
          IsFinish: this.CurrentIsPassed()
        }]
      };
    }
  }
  e9_() {
    const i = ShipTowerDefine_1.shipTowerTextKey.ScoreTarget;
    var e = ShipTowerDefine_1.shipTowerTextKey.ChallengeTarget;
    const s = [];
    e = {
      Title: ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(e, e),
      TargetList: s
    };
    this.TargetScoreList.forEach((e, t) => {
      t = ModelManager_1.ModelManager.ShipTowerModel.GetStageGradeResId(this.ScoreStageList[t]);
      s.push({
        Title: ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(i, i),
        ScoreTarget: e,
        IsFinish: this.CurrentScore >= e,
        ScoreGradeRes: t
      });
    });
    return e;
  }
  GetStageGradeResIdByScore(e) {
    return ModelManager_1.ModelManager.ShipTowerModel.GetStageGradeResIdByScore(e, this.TargetScoreList, this.ScoreStageList);
  }
  GetPassUnlockBuffList() {
    if (this.PassReward > 0 && this.cs_.length === 0) {
      ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(this.PassReward)?.DropPreview.forEach((e, t) => {
        this.cs_.push([{
          ItemId: t,
          IncId: 0
        }, 0]);
      });
    }
    return this.cs_;
  }
  UpdateCurSelectTeamIndex(e) {
    if (this.CurSelectTeamIndex === e) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ShipTower", 78, "UpdateCurSelectTeamIndex", ["index", e]);
      }
    } else {
      this.CurSelectTeamIndex = e;
    }
  }
  UpdateOtherTeamRoleToModel(t) {
    ModelManager_1.ModelManager.ShipTowerModel.ClearOtherTeamRoleData();
    this.TeamDataList.forEach(e => {
      if (e.Index !== t) {
        e.UpdateOtherTeamRoleToShipTowerModel();
        e.UpdateRoleIndexInAllTeam();
      }
    });
  }
  UpdateAllTeamRoleToModel() {
    ModelManager_1.ModelManager.ShipTowerModel.ClearAllTeamRoleData();
    this.TeamDataList.forEach(e => {
      e.UpdateAllTeamRoleToShipTowerModel();
    });
  }
  UpdateOtherTeamRoleRepeat(t, i) {
    const s = this.TeamDataList[t];
    let r = false;
    this.TeamDataList.forEach(e => {
      if (e.Index !== t) {
        r = e.UpdateOtherTeamRoleRepeat(s) || r;
        e.RemoveRoleIdEdit(i);
      }
    });
    this.UpdateOtherTeamRoleToModel(t);
    return r;
  }
  ExchangeTeamData() {
    var e = this.TeamDataList.every(e => e.TeamIsEmpty());
    if (!e) {
      const t = this.GetCurSelectTeamData();
      e = this.TeamDataList.find(e => e !== t);
      if (t && e) {
        t.ExChangeTeamData(e);
        this.UpdateOtherTeamRoleToModel(t.Index);
        this.UpdateAllTeamRoleToModel();
      }
    }
  }
  StartChallenge() {
    if (this.IsTeamSetRoleFinishEdit()) {
      if (this.IsTeamSetBuffFinishEdit()) {
        ModelManager_1.ModelManager.ShipTowerModel.StartChallenge(this);
        return true;
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(ShipTowerDefine_1.shipTowerTextKey.BuffNotFull);
        return false;
      }
    } else {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(ShipTowerDefine_1.shipTowerTextKey.TeamNotFull);
      return false;
    }
  }
  IsTeamSetRoleFinish() {
    return this.TeamDataList.every(e => e.IsSetRoleFinish());
  }
  IsTeamSetRoleFinishEdit() {
    return this.TeamDataList.every(e => e.IsSetRoleFinishEdit());
  }
  IsTeamSetBuffFinish() {
    return this.TeamDataList.every(e => e.IsSetBuffFinish());
  }
  IsTeamSetBuffFinishEdit() {
    return this.TeamDataList.every(e => e.IsSetBuffFinishEdit());
  }
  GetAllTeamBuffIdList() {
    return this.TeamDataList.map(e => e.BuffDataEdit?.Id ?? 0);
  }
  GetChallengeInstId() {
    return this.InstIds[0];
  }
  Cs_() {
    let t = 0;
    this.TeamDataList.forEach(e => {
      t += e.CurrentScore;
    });
    this.CurrentScore = t;
  }
  pD_() {
    this.Cs_();
    this.SaveLastData();
  }
  ProtoUpdateDataBase(e) {
    this.IsHaveProtoData = true;
    this.ProtoIsUnLocked = e.MT_;
    this.ProtoIsPassed = e.nA_;
    const i = this.TeamDataList[0];
    const s = this.TeamDataList[1];
    this.IsQuickPass = e.EKc;
    e.UL_?.RL_.forEach((e, t) => {
      i.ProtoSetRole(e, t);
    });
    i.ProtoSetBuff(e.UL_?.AL_);
    i.UpdateCurrentScore(e.PL_);
    e.DL_?.RL_.forEach((e, t) => {
      s.ProtoSetRole(e, t);
    });
    s.ProtoSetBuff(e.DL_?.AL_);
    s.UpdateCurrentScore(e.xL_);
  }
  ProtoNotifyInitData(e) {
    this.ProtoUpdateDataBase(e);
    this.Cs_();
    this.SaveLastData();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ShipTowerStageUpdate, this.Id);
  }
  ProtoNotifyUpdateData(e) {
    this.ProtoUpdateDataBase(e);
    this.Cs_();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ShipTowerStageUpdate, this.Id);
  }
  SaveLastData() {
    this.LastIsPass = this.IsPassed();
    this.LastScore = this.CurrentScore;
    this.IsNeedSureScore = this.LastScore > 0;
  }
  CheckPass(e = 0) {
    return e >= this.PassScore;
  }
  SureResultFromInstance() {
    ModelManager_1.ModelManager.ShipTowerModel.OpenViewMain({
      StageId: this.Id,
      IsOpenStageDesc: true,
      IsOpenCover: true,
      IsFromInstanceDungeon: true
    });
  }
  GotoDescFromInstance() {
    ModelManager_1.ModelManager.ShipTowerModel.OpenViewMain({
      StageId: this.Id,
      IsOpenStageDesc: true,
      IsFromInstanceDungeon: true
    });
  }
  GotoNextDescFromInstance(e) {
    ModelManager_1.ModelManager.ShipTowerModel.OpenViewMain({
      StageId: e.Id,
      IsOpenStageDesc: true,
      IsFromInstanceDungeon: true,
      ApplyTeamEditStageId: this.Id
    });
  }
  async SureResetStage() {
    await ControllerHolder_1.ControllerHolder.ShipTowerController.SlashAndTowerResetRequest(this.Id);
  }
  ResetStage() {
    this.TeamDataList.forEach(e => {
      e.ResetStage();
    });
    this.I3d();
    this.pD_();
  }
  async SureCoverChallenge() {
    await ControllerHolder_1.ControllerHolder.ShipTowerController.SlashAndTowerSaveRecordRequest(this.Id);
  }
  CoverChallenge() {
    this.TeamDataList.forEach(e => {
      e.CoverChallenge();
    });
    this.I3d();
    this.pD_();
  }
  UpdateNewChallengeScore() {
    this.NewChallengeScore = 0;
    this.TeamDataList.forEach(e => {
      this.NewChallengeScore += e.NewChallengeScore;
    });
  }
  UpdateToEdit() {
    this.TeamDataList.forEach(e => {
      e.UpdateToEdit();
    });
  }
  CopyTeamRoleToEdit(e) {
    const i = ModelManager_1.ModelManager.ShipTowerModel.GetStageDataById(e);
    this.TeamDataList.forEach((e, t) => {
      e.CopyTeamRoleToEdit(i.TeamDataList[t]);
    });
  }
  ProtoTeamEditFromResult(e) {
    var t = this.TeamDataList[0];
    var i = this.TeamDataList[1];
    t.ProtoTeamEditFromResult(e.sA_);
    i.ProtoTeamEditFromResult(e.aA_);
    var s = e.GL_ + e.FL_;
    var e = e.NL_ + e.VL_;
    t.ProtoSetNewChallengeScore(s);
    i.ProtoSetNewChallengeScore(e);
    this.UpdateNewChallengeScore();
  }
  async RequestTeamRecommendList() {
    await ControllerHolder_1.ControllerHolder.ShipTowerController.SlashAndTowerRecommendRequest(this.Id);
  }
  ProtoUpdateTeamRecommendList(e) {
    this.TeamRecommendList.length = 0;
    e.Iuc.forEach((e, t) => {
      const i = [];
      const s = [];
      e.Muc?.RL_.forEach(e => {
        i.push({
          Id: e,
          Count: 0
        });
      });
      e.Euc?.RL_.forEach(e => {
        s.push({
          Id: e,
          Count: 0
        });
      });
      t = {
        UseRate: e.PGs / 100,
        Name: "" + (t + 1),
        RoleIdList1: i,
        RoleIdList2: s,
        Buff1: e.Muc?.AL_ ?? 0,
        Buff2: e.Euc?.AL_ ?? 0,
        StageData: this
      };
      this.TeamRecommendList.push(t);
    });
  }
  UseTeamRecommend(e) {
    var t = this.TeamDataList[0];
    var i = this.TeamDataList[1];
    t.CopyIdsToEdit(e.RoleIdList1.map(e => e.Id));
    i.CopyIdsToEdit(e.RoleIdList2.map(e => e.Id));
    t.CopyBuffIdToEdit(e.Buff1, this.Id);
    i.CopyBuffIdToEdit(e.Buff2, this.Id);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ShipTowerTeamRecommendApplyFinish, this.Id);
    return true;
  }
  IsCanApplyTeamRecommend(e) {
    return !!ModelManager_1.ModelManager.ShipTowerModel.GetBuffDataByBuffId(e.Buff1)?.IsCanUse(this.Id) || !!ModelManager_1.ModelManager.ShipTowerModel.GetBuffDataByBuffId(e.Buff2)?.IsCanUse(this.Id) || !!e.RoleIdList1.some(e => ModelManager_1.ModelManager.ShipTowerModel.IsCanUseRole(e.Id)) || e.RoleIdList2.some(e => ModelManager_1.ModelManager.ShipTowerModel.IsCanUseRole(e.Id));
  }
  UpdateMainRoleToEdit() {
    this.TeamDataList.forEach(e => {
      e.UpdateMainRoleToEdit();
    });
  }
  IsOldSeasonData() {
    return !!this.IsTeamSetRoleFinish() && !this.IsTeamSetBuffFinish() || this.TeamDataList.some(e => !!e.BuffData && ModelManager_1.ModelManager.ShipTowerModel?.IsOldSeason(e.BuffData.Season));
  }
  GetCurrentTeamData() {
    const t = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    var e = this.TeamDataList.findIndex(e => e.InstId === t);
    return this.TeamDataList[e >= 0 ? e : 0];
  }
  GetCurSelectTeamData() {
    return this.TeamDataList[this.CurSelectTeamIndex];
  }
  I3d() {
    this.IsQuickPass = false;
  }
}
exports.ShipTowerStageData = ShipTowerStageData;
//# sourceMappingURL=ShipTowerStageData.js.map