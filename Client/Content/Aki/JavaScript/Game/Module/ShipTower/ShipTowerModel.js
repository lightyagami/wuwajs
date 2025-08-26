"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerModel = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const UiModel_1 = require("../../Ui/UiModel");
const ActivityShipTowerController_1 = require("../Activity/ActivityContent/ShipTower/ActivityShipTowerController");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const EditFormationData_1 = require("../EditFormation/EditFormationData");
const EditFormationDefine_1 = require("../EditFormation/EditFormationDefine");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const ShipTowerBuffData_1 = require("./ShipTowerBuffData");
const ShipTowerDefine_1 = require("./ShipTowerDefine");
const ShipTowerStageData_1 = require("./ShipTowerStageData");
class ShipTowerModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Z7_ = false;
    this.Zn_ = [];
    this.es_ = new Map();
    this.DebugParallaxSub = false;
    this.ts_ = [];
    this.is_ = new Map();
    this.rs_ = new Map();
    this.os_ = [];
    this.ns_ = new Map();
    this.xG_ = new Map();
    this.cA_ = 0;
    this.UG_ = 0;
    this.DG_ = false;
    this.BG_ = false;
    this.uA_ = [];
    this.dA_ = new Set();
    this.mA_ = 0;
    this.RecordList = [];
    this.rq_ = 0;
    this.oq_ = 0;
    this.ChallengeStageData = undefined;
    this.ChallengeBuffIdList = [];
    this.ReviewList = [];
    this.ReviewProgressList = [];
    this.kG_ = [];
    this.ShowBuffIdList = [];
    this.qV_ = undefined;
    this.QH_ = undefined;
    this.KH_ = undefined;
    this.CurSelectBuffData = undefined;
    this.PlayerGetBuffSet = new Set();
    this.IsShowLeftTeamPanel = false;
    this.IsOpenedSeasonUpdate = false;
    this.AddNormalStackChildView = (e, t) => {
      if (e) {
        UiModel_1.UiModel.NormalStack.Peek()?.AddChildViewById(t);
      }
    };
    this.CheckCanOpen = () => {
      var e;
      var t;
      if (ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel()) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("ErrorCode_600064_Text");
        return false;
      } else {
        if (!(e = this.IsOpen())) {
          if ((t = ConfigManager_1.ConfigManager.FunctionConfig.GetFunctionCondition(10081)?.OpenConditionId) && (t = ConfigManager_1.ConfigManager.ConditionConfig.GetConditionGroupConfig(t))?.HintText) {
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(t.HintText);
          }
        }
        return e;
      }
    };
    this.XH_ = () => {
      if (!this.LeaveBattle()) {
        this.CloseMainView();
      }
    };
    this.LeaveBattle = () => !!this.CheckInBattleShipTower() && (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ResetToBattleView), ModelManager_1.ModelManager.TowerModel.CurrentTowerId = -1, ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon(), true);
  }
  get CurSeason() {
    return this.cA_;
  }
  get CurSeasonCfg() {
    var e = ConfigManager_1.ConfigManager.ShipTowerConfig.GetSeasonCfgById(this.CurSeason);
    if (e) {
      return e;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("ShipTower", 78, "ShipTowerModel cfg is null", ["season", this.CurSeason]);
    }
  }
  get CurSeasonEndTime() {
    return this.UG_;
  }
  get CurIsHaveRecord() {
    return this.DG_;
  }
  get TowerStageDataList() {
    return this.Zn_;
  }
  get TowerStageDataMap() {
    return this.es_;
  }
  get GetRewardTotalNum() {
    return this.oq_;
  }
  OnInit() {
    UiManager_1.UiManager.AddOpenViewCheckFunction("ShipTowerView", this.CheckCanOpen, "ShipTowerModel.CheckCanOpen");
    return true;
  }
  OnClear() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("ShipTowerView", this.CheckCanOpen);
    this.Zn_.length = 0;
    this.es_.clear();
    this.ts_.length = 0;
    this.is_.clear();
    return true;
  }
  OnLeaveLevel() {
    return true;
  }
  InitData() {
    if (!this.Z7_) {
      this.Z7_ = true;
      this.l5_();
      this.fA_();
      this.UW_();
    }
  }
  UW_() {
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ShipTowerGetBuffSet);
    if (e) {
      Array.from(e).forEach(e => {
        this.PlayerGetBuffSet.add(e);
      });
    }
  }
  AddPlayerGetBuff(e) {
    this.PlayerGetBuffSet.add(e);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ShipTowerGetBuffSet, this.PlayerGetBuffSet);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ShipTowerBuffNewUpdate);
  }
  l5_() {
    this._5_(ShipTowerDefine_1.SHIP_TOWER_ZERO_SEASON);
  }
  _5_(e) {
    ConfigManager_1.ConfigManager.ShipTowerConfig.GetBuffCfgBySeason(e)?.forEach(e => {
      this.c5_(e);
    });
    this.u5_();
  }
  CheckOldSeasonBuffQualityList() {
    this.ts_.forEach(e => {
      var t;
      if (e.BuffList.some(e => this.d5_(e)) && (t = e.BuffList.filter(e => !this.d5_(e)), e.BuffList.unshift(...t), e.BuffList.splice(t.length), e.BuffList.length === 0)) {
        this.is_.delete(e.Quality);
      }
    });
  }
  d5_(e) {
    return this.IsOldSeason(e.Season);
  }
  IsOldSeason(e) {
    return e !== ShipTowerDefine_1.SHIP_TOWER_ZERO_SEASON && e !== this.CurSeason;
  }
  c5_(e) {
    var t;
    if (!this.rs_.has(e.Id)) {
      (t = new ShipTowerBuffData_1.ShipTowerBuffData()).Init(e);
      this.rs_.set(e.Id, t);
      if (this.is_.has(t.Quality)) {
        this.is_.get(t.Quality).BuffList.push(t);
      } else {
        e = {
          Quality: t.Quality,
          Title: t.GetQualityTitle(),
          BuffList: [t]
        };
        this.is_.set(t.Quality, e);
      }
    }
  }
  u5_() {
    this.ts_.length = 0;
    this.ts_.push(...Array.from(this.is_.values()));
    this.ts_.sort((e, t) => t.Quality - e.Quality);
  }
  async CheckInitProto() {
    if (this.qG_()) {
      await ControllerHolder_1.ControllerHolder.ShipTowerController.SlashAndTowerInfoRequest();
    }
  }
  qG_() {
    return !!this.IsOpen() && (!this.TowerStageDataList[0]?.IsHaveProtoData || !!this.TimeIsOver() || !!UiManager_1.UiManager.IsViewOpen("ShipTowerReviewView"));
  }
  fA_() {
    this.uA_.length = 0;
    this.uA_.push(this.CreateAreaDataById(ShipTowerDefine_1.SHIP_TOWER_ZERO_SEASON));
  }
  CreateDefaultStageDataList() {
    if (!this.TowerStageDataList.length) {
      [0, 1].forEach(e => {
        ConfigManager_1.ConfigManager.ShipTowerConfig.GetStageCfgBySeason(e)?.forEach(e => {
          this.ss_(e);
        });
      });
    }
  }
  as_(e) {
    var t = ConfigManager_1.ConfigManager.ShipTowerConfig.GetStageCfgById(e);
    if (t) {
      return this.ss_(t);
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("ShipTower", 69, "CreateStageDataById", ["id", e]);
    }
  }
  ss_(e) {
    if (this.es_.has(e.Id)) {
      const t = this.es_.get(e.Id);
      if (!this.Zn_.includes(t)) {
        this.Zn_.push(t);
      }
      return t;
    }
    const t = new ShipTowerStageData_1.ShipTowerStageData();
    t.Init(e);
    t.SetOrderIndex(this.Zn_.length + 1);
    this.Zn_.push(t);
    this.es_.set(e.Id, t);
    return t;
  }
  GetStageDataById(e) {
    return this.es_.get(e);
  }
  GetBuffQualityList(e = false) {
    if (e) {
      this.hs_();
    }
    return this.ts_;
  }
  hs_() {
    this.ts_.forEach(e => {
      e.BuffList.sort((e, t) => e.Id - t.Id);
    });
  }
  GetBuffDataByBuffId(e) {
    return this.rs_.get(e);
  }
  SelectDefaultBuff(t) {
    for (const i of this.GetBuffQualityList(true)) {
      var e = i.BuffList.find(e => e.IsCanUse(t));
      if (e) {
        e.SetSelected(true);
        return;
      }
    }
    this.GetBuffQualityList()[0]?.BuffList[0]?.SetSelected(true);
  }
  GetRecommendLevelByInstId(e) {
    return ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(e, ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel);
  }
  GetTeamTabList() {
    if (!this.os_.length) {
      this.os_.push({
        TabType: 0,
        Title: ShipTowerDefine_1.shipTowerTextKey.RoleList
      });
      this.os_.push({
        TabType: 1,
        Title: ShipTowerDefine_1.shipTowerTextKey.UseTeam
      });
    }
    return this.os_;
  }
  IsOtherTeamRoleData(e) {
    return this.ns_.has(e);
  }
  GetOtherTeamRoleData(e) {
    return this.ns_.get(e);
  }
  AddOtherTeamRoleData(e) {
    this.ns_.set(e.RoleIdEdit, e);
  }
  GetAllTeamRoleData(e) {
    return this.xG_.get(e);
  }
  AddAllTeamRoleData(e) {
    this.xG_.set(e.RoleIdEdit, e);
  }
  ClearAllTeamRoleData() {
    this.xG_.clear();
  }
  ClearOtherTeamRoleData() {
    this.ns_.clear();
  }
  GetNextChallengeStageData(t) {
    return this.Zn_.find(e => !e.IsPassed() && e.IsUnLocked() && e !== t) ?? this.Zn_[this.Zn_.length - 1];
  }
  OpenViewMain(e) {
    UiManager_1.UiManager.OpenView("ShipTowerView", e);
  }
  OpenViewDesc(e, i) {
    UiManager_1.UiManager.OpenView("ShipTowerDescView", e, (e, t) => {
      this.AddNormalStackChildView(e, t);
      i?.(e, t);
    });
  }
  OpenViewBuff(e) {
    UiManager_1.UiManager.OpenView("ShipTowerBuffView", e, this.AddNormalStackChildView);
  }
  OpenViewCover(e) {
    UiManager_1.UiManager.OpenView("ShipTowerCoverView", e, this.AddNormalStackChildView);
  }
  OpenViewReset(e) {
    UiManager_1.UiManager.OpenView("ShipTowerResetView", e, this.AddNormalStackChildView);
  }
  OpenViewReward(e) {
    UiManager_1.UiManager.OpenView("ShipTowerRewardView", e, this.AddNormalStackChildView);
  }
  OpenViewPassBuffShow(e) {
    UiManager_1.UiManager.OpenView("ShipTowerPassBuffShowView", e, this.AddNormalStackChildView);
  }
  OpenViewTeamRecommend(e) {
    UiManager_1.UiManager.OpenView("ShipTowerTeamRecommendView", e, this.AddNormalStackChildView);
  }
  OpenViewMonsterDesc(e) {
    UiManager_1.UiManager.OpenView("ShipTowerMonsterDescView", e, this.AddNormalStackChildView);
  }
  OpenViewRecord(e) {
    UiManager_1.UiManager.OpenView("ShipTowerRecordView", e, this.AddNormalStackChildView);
  }
  OpenViewReview(e) {
    UiManager_1.UiManager.OpenView("ShipTowerReviewView", e, this.AddNormalStackChildView);
  }
  ls_(e, t, i = true) {
    return !e || e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && (Log_1.Log.CheckInfo() && Log_1.Log.Info("ShipTower", 69, "CheckErrorCode", ["ErrorCode", e.Q4n], ["MsgId", t]), i && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, t), true);
  }
  UpdateSeasonNotify(e) {
    this.JH_();
  }
  UpdateResultNotify(e) {
    var t;
    var i;
    var r;
    var s;
    var a = this.GetStageDataById(e.ELl);
    if (a) {
      if (!this.CheckIsNeedShowConfirmSeasonUpdate()) {
        a.ProtoTeamEditFromResult(e);
        t = a.NewChallengeScore;
        i = a.IsNewRecord(t);
        s = ShipTowerDefine_1.shipTowerTextKey.MonsterScore;
        r = ShipTowerDefine_1.shipTowerTextKey.TimeScore;
        s = [{
          TotalTitle: a.TeamDataList[0].AreaName,
          TitleA: s,
          TitleB: r,
          ScoreA: e.GL_,
          ScoreB: e.FL_
        }, {
          TotalTitle: a.TeamDataList[1].AreaName,
          TitleA: s,
          TitleB: r,
          ScoreA: e.NL_,
          ScoreB: e.VL_
        }];
        UiManager_1.UiManager.OpenView("ShipTowerFightFinishView", {
          TotalScore: t,
          GradeResId: this.GetStageGradeResIdByStageId(a.Id, t),
          IsNewRecord: i,
          ButtonList: this.OV_(a, t),
          AreaList: s
        });
      }
    } else {
      this.LeaveBattle();
    }
  }
  OV_(e, t) {
    var i;
    var r = [{
      ButtonTextId: ShipTowerDefine_1.shipTowerTextKey.Leave,
      DescriptionTextId: undefined,
      IsTimeDownCloseView: true,
      IsClickedCloseView: true,
      OnClickedCallback: this.OpenViewMain.bind(this, {
        StageId: e.Id,
        IsFromInstanceDungeon: true
      })
    }, {
      ButtonTextId: ShipTowerDefine_1.shipTowerTextKey.ConfirmResult,
      DescriptionTextId: undefined,
      IsTimeDownCloseView: true,
      IsClickedCloseView: true,
      OnClickedCallback: undefined
    }];
    if (e.IsNeedSureScore) {
      r[0] = undefined;
      r[1].OnClickedCallback = e.SureResultFromInstance.bind(e);
    } else {
      if (e.IsEndLess) {
        r[1].ButtonTextId = ShipTowerDefine_1.shipTowerTextKey.Retry;
        r[1].OnClickedCallback = e.GotoDescFromInstance.bind(e);
      } else if (e.CheckPass(t)) {
        t = this.GetNextChallengeStageData(e);
        i = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(t.TitleKey);
        r[1].ButtonTextId = ShipTowerDefine_1.shipTowerTextKey.Continue;
        r[1].DescriptionTextId = ShipTowerDefine_1.shipTowerTextKey.GoOnTower;
        r[1].DescriptionArgs = [i, t.OrderIndex];
        r[1].OnClickedCallback = e.GotoNextDescFromInstance.bind(e, t);
      } else {
        r[1].ButtonTextId = ShipTowerDefine_1.shipTowerTextKey.Retry;
        r[1].DescriptionTextId = ShipTowerDefine_1.shipTowerTextKey.NotFinished;
        r[1].OnClickedCallback = e.GotoDescFromInstance.bind(e);
      }
      e.SaveLastData();
    }
    return r;
  }
  UpdateLevelPlayNotify(e) {
    e.BL_.forEach(e => {
      var t = this.GetStageDataById(e.s5n);
      t?.ProtoNotifyUpdateData(e);
      if (t?.IsEndLess && !this.IsOldSeason(t.BelongToSeason) && t.IsTeamSetRoleFinish()) {
        this.DG_ = true;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ShipTowerEndlessRecordUpdate);
      }
    });
    this.CA_();
  }
  SlashAndTowerInfoResponse(e) {
    if (!this.ls_(e, 29202, false)) {
      this.Zn_.length = 0;
      e?.BL_.forEach(e => {
        this.as_(e.s5n);
      });
      this.cA_ = this.Zn_[this.Zn_.length - 1]?.BelongToSeason ?? 1;
      this.UG_ = MathUtils_1.MathUtils.LongToNumber(e.dG_);
      this.DG_ = !!e.fG_;
      this.BG_ = !!e.mG_;
      this.CheckOldSeasonBuffQualityList();
      this._5_(this.CurSeason);
      e?.BL_.forEach(e => {
        this.GetStageDataById(e.s5n)?.ProtoNotifyInitData(e);
      });
      this.dA_.clear();
      e?.kL_.forEach(e => {
        this.dA_.add(e);
      });
      this.Pac(e?.Mac ?? []);
      this.ClearAreaList();
      this.GetAreaList();
    }
  }
  SlashAndTowerScoreRewardResponse(e) {
    if (!this.ls_(e, 25264)) {
      e.cOl.forEach(e => {
        this.dA_.add(e);
      });
      this.CA_();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ShipTowerRewardReceive, this.mA_);
    }
  }
  EndLessHistoryResponse(e) {
    if (!this.ls_(e, 28203)) {
      this.RecordList.length = 0;
      this.nq_(ShipTowerDefine_1.shipTowerTextKey.CurrentRecord, e.qL_);
      this.nq_(ShipTowerDefine_1.shipTowerTextKey.HistoryRecord, e.OL_);
    }
  }
  nq_(e, t) {
    if (t && t?.s5n !== 0) {
      var i = ShipTowerDefine_1.shipTowerTextKey.ReachDate;
      var r = MathUtils_1.MathUtils.LongToNumber(t.uG_);
      const s = {
        Id: 0,
        Name: e,
        Desc: ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(i, i),
        TimeContent: TimeUtil_1.TimeUtil.DateFormat4String(r),
        RecordList: []
      };
      e = (e, t) => {
        if (t) {
          var i = t.TL_?.RL_ ?? [];
          const r = t.cG_ ?? [];
          e = {
            Title: ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(e, e),
            Score: t.tBs,
            Wave: t.bL_,
            TeamList: i.map((e, t) => ({
              Id: e,
              Count: r[t] ?? 0
            })),
            BuffId: t.TL_?.AL_ ?? 0
          };
          s.RecordList.push(e);
        }
      };
      e(ShipTowerDefine_1.shipTowerTextKey.TeamName1, t.LL_);
      e(ShipTowerDefine_1.shipTowerTextKey.TeamName2, t.wL_);
      this.RecordList.push(s);
    }
  }
  SlashAndTowerSaveRecordResponse(e, t) {
    if (!this.ls_(t, 15212)) {
      this.GetStageDataById(e)?.CoverChallenge();
      this.CA_();
      this.SetChallengeStageDataNull();
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(ShipTowerDefine_1.shipTowerTextKey.CoverChallenge);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ShipTowerSureCoverChallenge, e);
    }
  }
  SlashAndTowerResetResponse(e, t) {
    if (!this.ls_(t, 17218)) {
      this.GetStageDataById(e)?.ResetStage();
      this.CA_();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ShipTowerSureResetStage, e);
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(ShipTowerDefine_1.shipTowerTextKey.ResetStage);
    }
  }
  SlashAndTowerRecommendResponse(e, t) {
    if (!this.ls_(t, 18714)) {
      this.GetStageDataById(e)?.ProtoUpdateTeamRecommendList(t);
    }
  }
  SlashAndTowerReviewResponse(e) {
    if (!this.ls_(e, 24281)) {
      this.ReviewList.length = 0;
      e?.CG_.forEach(e => {
        var t = e.gG_;
        var i = e.SMs;
        this.ReviewList.push({
          Title: this.GetStageNameById(t),
          Score: i,
          Grade: this.GetStageGradeResIdByStageId(t, i),
          StageId: t,
          IsQuickPass: e.qcd
        });
      });
      this.ReviewProgressList.length = 0;
      this.ReviewProgressList.push(e._fc);
      this.ReviewProgressList.push(e.lfc);
    }
  }
  GetPlayerTeamList() {
    var t = [];
    for (let e = 1; e <= EditFormationDefine_1.MAX_FORMATION_ID; e++) {
      var i = ModelManager_1.ModelManager.EditFormationModel.GetFormationData(e);
      t.push(i || new EditFormationData_1.EditFormationData(e));
    }
    return t;
  }
  UpdateToEdit() {
    this.Zn_.forEach(e => {
      e.UpdateToEdit();
    });
  }
  GetAreaList() {
    var e;
    if (!(this.uA_.length >= 2)) {
      e = Math.max(this.CurSeason, 1);
      this.uA_.push(this.CreateAreaDataById(e));
      this.uA_.push(this.CreateAreaDataById(e, true));
      this.CA_();
    }
    return this.uA_;
  }
  CreateAreaDataById(e, t = false) {
    var i = this.GetRewardListByAreaId(e, t);
    let r = ShipTowerDefine_1.shipTowerTextKey.AreaNameShallow;
    if (e !== ShipTowerDefine_1.SHIP_TOWER_ZERO_SEASON) {
      r = t ? ShipTowerDefine_1.shipTowerTextKey.AreaNameDead : ShipTowerDefine_1.shipTowerTextKey.AreaNameDeep;
    }
    return {
      Id: e,
      Index: this.uA_.length,
      Name: r,
      Desc: "",
      RewardList: i,
      IsEndless: t,
      MaxScore: i[i.length - 1]?.TotalScore ?? 0
    };
  }
  GetRewardListByAreaId(e, t = false) {
    const r = [];
    ConfigManager_1.ConfigManager.ShipTowerConfig.GetChallengeRewardCfgBySeason(e)?.forEach(e => {
      if (t === e.EndLessReward) {
        const i = [];
        ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e.RewardId)?.DropPreview.forEach((e, t) => {
          i.push([{
            ItemId: t,
            IncId: 0
          }, e]);
        });
        r.push({
          Id: e.Id,
          TitleKey: e.Desc,
          TotalScore: e.SumScore,
          RewardList: i,
          IsReceive: false,
          IsProgress: false,
          IsCompleted: false
        });
      }
    });
    return r;
  }
  ClearAreaList() {
    for (let e = this.uA_.length - 1; e >= 0; e--) {
      if (this.uA_[e].Id !== ShipTowerDefine_1.SHIP_TOWER_ZERO_SEASON) {
        this.uA_.splice(e, 1);
      }
    }
  }
  CA_() {
    this.rq_ = 0;
    this.oq_ = 0;
    this.uA_.forEach(e => {
      const s = e.Id;
      const a = e.IsEndless;
      const i = this.TowerStageDataList.reduce((e, t) => {
        var i = t.BelongToSeason === s;
        var r = t.IsEndLess === a;
        return e + (i && r ? t.CurrentScore : 0);
      }, 0);
      e.Desc = `<color=#fee488ff>${i}</color>/${e.MaxScore}`;
      let r = true;
      let o = false;
      e.RewardList.forEach(e => {
        var t = this.dA_.has(e.Id);
        e.IsReceive = !t && i >= e.TotalScore;
        e.IsProgress = !t && i < e.TotalScore;
        e.IsCompleted = t;
        if (!e.IsCompleted) {
          r = false;
        }
        if (e.IsReceive) {
          o = true;
          this.rq_++;
        }
        this.oq_++;
      });
      e.IsFinish = r;
      e.IsRedPoint = o;
      e.RewardList?.sort((e, t) => e.IsReceive !== t.IsReceive ? e.IsReceive ? -1 : 1 : e.IsProgress !== t.IsProgress ? e.IsProgress ? -1 : 1 : e.Id - t.Id);
    });
    this.uA_.sort((e, t) => e.IsFinish !== t.IsFinish ? e.IsFinish ? 1 : -1 : e.Index - t.Index);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateShipTowerReward);
    ActivityShipTowerController_1.ActivityShipTowerController.RefreshActivityRedDot();
  }
  async ReceiveAward(e, t) {
    this.mA_ = e;
    await ControllerHolder_1.ControllerHolder.ShipTowerController.SlashAndTowerScoreRewardRequest(e, t);
  }
  GetRewardProgressText(e = true) {
    let t = 0;
    let i = 0;
    const r = this.IsPassZeroSeason();
    this.uA_.filter(e => {
      e = e.Id === ShipTowerDefine_1.SHIP_TOWER_ZERO_SEASON;
      if (r) {
        return !e;
      } else {
        return e;
      }
    }).forEach(e => {
      t += e.RewardList.filter(e => e.IsCompleted).length;
      i += e.RewardList.length;
    });
    if (e) {
      return `<color=#fadf85>${t}</color>/${i}`;
    } else {
      return t + "/" + i;
    }
  }
  GetRemainTime() {
    if (this.CurSeasonEndTime <= 0) {
      return 0;
    } else {
      return this.CurSeasonEndTime - TimeUtil_1.TimeUtil.GetServerTime();
    }
  }
  TimeIsOver() {
    return this.GetRemainTime() <= 0;
  }
  GetRewardCountDownDesc() {
    var e = ShipTowerDefine_1.shipTowerTextKey.RewardCountDownDesc;
    var t = this.GetRemainTime();
    var t = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(t);
    return ConfigManager_1.ConfigManager.TextConfig.GetMultiText(e, t.CountDownText);
  }
  IsCanReceiveAward() {
    return this.rq_ > 0;
  }
  IsEndlessRecordOpen() {
    return this.CurIsHaveRecord;
  }
  IsCanUseRole(e) {
    return !!ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e);
  }
  async RequestRecord() {
    await ControllerHolder_1.ControllerHolder.ShipTowerController.EndLessHistoryRequest();
  }
  IsOpen() {
    return ModelManager_1.ModelManager.FunctionModel.IsOpen(10081);
  }
  CheckInBattleShipTower() {
    var e;
    return !!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && !(e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(), !(e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e))) && e.InstSubType === 27;
  }
  CheckIsScoreBattle() {
    var e;
    return !!this.CurSeasonCfg && !!this.CurSeasonCfg.IsOpenHot && !!(e = this.ChallengeStageData) && e.StageType !== 0;
  }
  StartChallenge(e) {
    var t = (this.ChallengeStageData = e).TeamDataList.map(e => e.BuffDataEdit?.Id ?? 0);
    this.Pac(t);
    ControllerHolder_1.ControllerHolder.ShipTowerController.RequestChallenge(e);
  }
  Pac(e) {
    this.ChallengeBuffIdList.length = 0;
    this.ChallengeBuffIdList.push(...e);
  }
  AgainChallenge() {
    var e;
    if (!this.CheckIsNeedShowConfirmSeasonUpdate()) {
      if (this.sq_() && !ModelManager_1.ModelManager.SceneTeamModel.IsAllDid()) {
        e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
        e = this.ChallengeStageData?.TeamDataList[1].InstId === e;
        ControllerHolder_1.ControllerHolder.ShipTowerController.RequestChallenge(this.ChallengeStageData, e, true);
      }
    }
  }
  OpenViewMainFromFight() {
    var e;
    if (this.sq_()) {
      e = this.ChallengeStageData.Id;
      this.OpenViewMain({
        StageId: e,
        IsFromInstanceDungeon: true
      });
    }
  }
  sq_() {
    if (!this.ChallengeStageData) {
      const t = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
      var e = this.Zn_.find(e => e.InstIds.includes(t));
      if (!e) {
        return false;
      }
      this.ChallengeStageData = e;
    }
    return true;
  }
  ClearChallengeStageData() {
    if (this.ChallengeStageData) {
      this.ChallengeStageData.UpdateToEdit();
      this.SetChallengeStageDataNull();
    }
  }
  SetChallengeStageDataNull() {
    this.ChallengeStageData = undefined;
  }
  async CheckIsNeedShowSeasonReview() {
    if (!this.QH_ || this.QH_.IsFulfilled()) {
      if (this.TimeIsOver()) {
        await this.CheckInitProto();
      }
      if (!this.BG_) {
        return false;
      }
      await ControllerHolder_1.ControllerHolder.ShipTowerController.SlashAndTowerReviewRequest();
      this.QH_ = new CustomPromise_1.CustomPromise();
      this.OpenViewReview({
        SeasonId: this.CurSeason,
        Promise: this.QH_
      });
      this.BG_ = false;
      this.btc();
      await this.CheckInitProto();
    }
    await this.QH_.Promise;
    return true;
  }
  btc() {
    var e = this.Zn_.filter(e => e.IsOldSeasonData());
    if (e.length) {
      e.forEach(e => {
        e.ResetStage();
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ShipTowerStageUpdate, e.Id);
      });
      this.CA_();
    }
  }
  GetStageGradeResId(e) {
    e = ShipTowerDefine_1.shipTowerScoreGradeMap[e];
    return (e || ShipTowerDefine_1.shipTowerScoreGradeMap.D).ResId;
  }
  GetStageGradeResIdByStageId(e, t) {
    var i = this.GetStageDataById(e);
    if (i) {
      return i.GetStageGradeResIdByScore(t);
    } else if (i = ConfigManager_1.ConfigManager.ShipTowerConfig.GetStageCfgById(e)) {
      return this.GetStageGradeResIdByScore(t, i.TargetScore, i.ScoreStage);
    } else {
      return undefined;
    }
  }
  GetStageGradeResIdByScore(t, i, r) {
    for (let e = i.length - 1; e >= 0; e--) {
      if (t >= i[e]) {
        return this.GetStageGradeResId(r[e]);
      }
    }
  }
  GetStageNameById(e) {
    var t = this.GetStageDataById(e);
    let i = undefined;
    if (t) {
      i = t.TitleKey;
    }
    t = ConfigManager_1.ConfigManager.ShipTowerConfig.GetStageCfgById(e);
    if (i = t ? t.Title : i) {
      return ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(i, i);
    } else {
      return "";
    }
  }
  GetStageOrderIndexById(e) {
    var t = this.GetStageDataById(e);
    let i = 0;
    if (t) {
      i = t.OrderIndex;
    }
    t = ConfigManager_1.ConfigManager.ShipTowerConfig.GetStageCfgById(e);
    return i = t ? t.OrderIndex : i;
  }
  GetStageIsEndlessById(e) {
    var t = this.GetStageDataById(e);
    if (t) {
      return t.IsEndLess;
    } else {
      return !!(t = ConfigManager_1.ConfigManager.ShipTowerConfig.GetStageCfgById(e)) && t.EndLess;
    }
  }
  GetInTheBattleBuffInfo() {
    var e = this.sq_() ? this.ChallengeStageData : this.Zn_[0];
    const t = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    var e = e?.TeamDataList.findIndex(e => e.InstId === t) ?? 0;
    var e = this.ChallengeBuffIdList[e];
    var e = ConfigManager_1.ConfigManager.ShipTowerConfig?.GetBuffCfgById(e)?.ItemId ?? this.rs_.values().next().value.ItemId;
    var i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(e);
    var r = i.Name;
    var s = i.ObtainedShowDescription;
    return {
      TitleKey: r,
      SubTitleKey: "GhostShipItemQuality_Text" + i.QualityId,
      ItemInfo: {
        ItemConfigId: e,
        Data: undefined,
        Type: 4
      },
      DescInfoList: [{
        DescKey: s,
        DescUseChangeColor: true
      }],
      DescTitleKey: ShipTowerDefine_1.shipTowerTextKey.BattleBuffSkillTitle
    };
  }
  AddShowBuffId(e, t = true) {
    this.kG_.push(e);
    if (t) {
      this.ShowBuffIdList.push(e);
      if (!UiManager_1.UiManager.IsViewOpen("ShipTowerShowBuffView")) {
        UiManager_1.UiManager.OpenView("ShipTowerShowBuffView");
      }
    }
  }
  async CheckShowGetBuff() {
    if (!this.KH_ || this.KH_.IsFulfilled()) {
      if (this.kG_.length <= 0) {
        return false;
      }
      this.KH_ = new CustomPromise_1.CustomPromise();
      UiManager_1.UiManager.OpenView("ShipTowerGetBuffView", {
        ItemDataList: this.YH_(),
        Promise: this.KH_
      });
      this.kG_.length = 0;
    }
    await this.KH_.Promise;
    return true;
  }
  ClearGetBuffIdList() {
    this.kG_.length = 0;
  }
  YH_() {
    const i = [];
    const r = new Map();
    this.kG_.forEach(e => {
      var t;
      var e = this.GetBuffDataByBuffId(e);
      if (e) {
        if (r.has(e.ItemId)) {
          r.get(e.ItemId)[1]++;
        } else {
          t = [{
            ItemId: e.ItemId,
            IncId: 0
          }, 0];
          i.push(t);
          r.set(e.ItemId, t);
        }
      }
    });
    return i;
  }
  async OpenWelcomeView() {
    if (!this.qV_ || !!this.qV_.IsFulfilled()) {
      this.qV_ = new CustomPromise_1.CustomPromise();
      UiManager_1.UiManager.OpenView("ShipTowerWelcomeView", {
        Promise: this.qV_
      });
    }
    await this.qV_.Promise;
  }
  CloseWelcomeView() {
    UiManager_1.UiManager.CloseView("ShipTowerWelcomeView");
  }
  CloseMainView() {
    UiManager_1.UiManager.CloseView("ShipTowerView");
  }
  GetSeasonCountDownData() {
    let e = this.GetRemainTime();
    var t = (e = e <= 1 ? 1 : e) >= CommonDefine_1.SECOND_PER_DAY ? 3 : e >= CommonDefine_1.SECOND_PER_HOUR ? 2 : 1;
    var i = e >= CommonDefine_1.SECOND_PER_DAY ? 2 : e >= CommonDefine_1.SECOND_PER_HOUR ? 1 : 0;
    return TimeUtil_1.TimeUtil.GetCountDownDataFormat2(e, t, i);
  }
  GetStageAreaName(e) {
    const t = e === undefined ? this.GetCurrentStage() : this.GetStageDataById(e) ?? this.Zn_[0];
    const i = this.Zn_.findIndex(e => e.Id === t?.Id);
    e = ConfigManager_1.ConfigManager.ShipTowerConfig.GetAllShowStageCfg().find(e => e.OutIndex >= i);
    if (e) {
      return ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(e.Name, e.Name);
    } else {
      return "";
    }
  }
  GetCurrentStageSeasonName() {
    if (this.GetCurrentStage()?.BelongToSeason === ShipTowerDefine_1.SHIP_TOWER_ZERO_SEASON || !this.IsOpen()) {
      const e = ShipTowerDefine_1.shipTowerTextKey.OneTimeSeasonName;
      return ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(e, e);
    }
    const e = ShipTowerDefine_1.shipTowerTextKey.RefreshSeasonName;
    return ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(e, e);
  }
  GetCurrentStageSeasonName2() {
    if (this.GetCurrentStage()?.BelongToSeason === ShipTowerDefine_1.SHIP_TOWER_ZERO_SEASON) {
      const e = ShipTowerDefine_1.shipTowerTextKey.AreaNameShallow;
      return ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(e, e);
    }
    const e = ShipTowerDefine_1.shipTowerTextKey.AreaNameRefresh;
    return ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(e, e);
  }
  GetCurrentStage() {
    for (let e = this.Zn_.length - 1; e >= 0; e--) {
      var t = this.Zn_[e];
      if (t.IsUnLocked()) {
        return t;
      }
    }
    return this.Zn_[0];
  }
  IsPassZeroSeason() {
    return !!this.IsOpen() && this.GetCurrentStage()?.BelongToSeason !== ShipTowerDefine_1.SHIP_TOWER_ZERO_SEASON;
  }
  GetEndlessStageData() {
    return this.Zn_.find(e => e.IsEndLess) ?? this.Zn_[0];
  }
  CheckIsNeedShowConfirmSeasonUpdate(e) {
    return !!this.zH_() && (this.JH_(e), true);
  }
  zH_() {
    return !!this.BG_ || !!this.TimeIsOver();
  }
  JH_(e) {
    var t;
    var i;
    if (!this.IsOpenedSeasonUpdate) {
      this.IsOpenedSeasonUpdate = true;
      (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(256)).FunctionMap.set(1, i = () => {
        (e ?? this.XH_)?.();
        this.IsOpenedSeasonUpdate = false;
      });
      t.FunctionMap.set(2, i);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
    }
  }
  OpenConfirmBackWorld() {
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(254);
    e.FunctionMap.set(2, this.LeaveBattle);
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
  }
  IsExistFirstGetBuff() {
    return this.ts_.some(e => e.BuffList.some(e => e.IsFirstGet()));
  }
  GetCurrentStageTeamData() {
    return this.GetCurrentStage()?.GetCurrentTeamData();
  }
}
exports.ShipTowerModel = ShipTowerModel;
//# sourceMappingURL=ShipTowerModel.js.map