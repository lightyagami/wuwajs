"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RacingBetsModel = void 0;
const UE = require("ue"),
  AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiLayer_1 = require("../../Ui/UiLayer"),
  UiManager_1 = require("../../Ui/UiManager"),
  CreatureController_1 = require("../../World/Controller/CreatureController"),
  InstanceDungeonEntranceController_1 = require("../InstanceDungeon/InstanceDungeonEntranceController"),
  UiSceneDangoActorManager_1 = require("../UiComponent/UiSceneDangoActorManager"),
  DangoDungeonCommandFactory_1 = require("./Command/DangoDungeonCommandFactory"),
  DangoDungeonCommandQueue_1 = require("./Command/DangoDungeonCommandQueue"),
  RacingBetsDungeonDangoInfo_1 = require("./Data/RacingBetsDungeonDangoInfo"),
  RacingBetsDefine_1 = require("./RacingBetsDefine");
class RacingBetsModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), this.ETc = void 0, this.ue1 = void 0, this.UseGmState = !1, this.gkc = new Map, this.Ckc = [], this._kc = new DangoDungeonCommandQueue_1.DangoDungeonCommandQueue, this.WFc = void 0, this.IsDungeonPlaying = !1, this.DungeonMatchId = 0, this.IsReplayDungeon = !1, this.LeaveDungeonOnEnd = !1, this.OnDangoDungeonEnd = e => {
      UiSceneDangoActorManager_1.UiSceneDangoActorManager.SetAllActorVisible(!0), this.v01(), UiManager_1.UiManager.CloseView("RacingBetsGamePlayView", () => {
        this.p11()
      }), this.IsDungeonPlaying = !1, this.LeaveDungeonOnEnd && InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest()
    }, this.OnDangoDungeonPreviewEnd = e => {
      this.IsDungeonPlaying = !1, this.LeaveDungeonOnEnd && InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest()
    }, this.ijc = [], this.cx1 = void 0, this.md1 = void 0, this.jk1 = !1, this.zY1 = 0, this.JY1 = 0
  }
  OnClear() {
    return this.Cd1(), !0
  }
  OnPlayerInfoUpdate(e) {
    this.ETc ? this.ETc.RefreshPlayerData(e) : Log_1.Log.CheckError() && Log_1.Log.Error("RacingBets", 58, "OnPlayerInfoUpdate SeasonData is not undefined")
  }
  OnRacingBetsTaskNotify(e) {
    this.ETc && this.ETc.RefreshRewardData(e.CJ_)
  }
  OnRacingBetsMatchResultNotify(e) {
    var t;
    this.ETc && (this.ue1 = e) && (t = e.mJ_, t = this.ETc.GetLegMatchData(t)) && t.RefreshLegMatchResultNotify(e)
  }
  OnRacingBetsOddsUpdate(e) {
    var t;
    this.ETc && (t = this.ETc.GetLegMatchData(e.mJ_)) && t.RefreshDangoOdds(e)
  }
  RefreshLegMatchResult(e) {
    var t;
    this.ETc && (t = this.ETc.GetLegMatchData(e.mJ_)) && (t.RefreshLegMatchResult(e), 0 < e.MP1 && t.ParentGroupMatchData.RefreshGroupMatchResult(e), this.CheckMatchRedDot())
  }
  GetRacingBetsSeasonData() {
    return this.ETc
  }
  SetRacingBetsSeasonData(e) {
    void 0 !== this.ETc ? Log_1.Log.CheckError() && Log_1.Log.Error("RacingBets", 58, "SetRacingBetsSeasonData SeasonData is not undefined") : this.ETc = e
  }
  GetRacingBetsLegMatchData(e) {
    if (this.ETc) return this.ETc.GetLegMatchData(e)
  }
  GetLegMatchResultData() {
    return this.ue1
  }
  SetLegMatchResultData(e) {
    this.ue1 = e
  }
  GetRacingBetsGroupMatchData(e) {
    if (this.ETc) return this.ETc.GetGroupMatchData(e)
  }
  GetRacingBetsGearList() {
    if (this.ETc) return ConfigManager_1.ConfigManager.RacingBetsConfig.GetRacingBettingGearList(this.ETc.Id)
  }
  GetRacingBetsBulletScreen(e) {
    if (!this.ETc) return [];
    var t = [];
    for (const a of ConfigManager_1.ConfigManager.RacingBetsConfig.GetRacingBetsBulletScreenList(this.ETc.Id)) a.Type !== e || 0 !== a.DangoId && !this.GetDungeonDangoInfo(a.DangoId) || t.push(a);
    return t
  }
  IsFinalLegMatch(e) {
    return !!this.ETc && this.ETc.IsFinalLegMatch(e)
  }
  RacingBetsMatchStart(t, a) {
    if (this.IsDungeonPlaying) Log_1.Log.CheckError() && Log_1.Log.Error("RacingBets", 58, "RacingBets玩法重复开始");
    else {
      this.IsDungeonPlaying = !0, this.DungeonMatchId = t, this.IsReplayDungeon = a.ep1, this.pkc(a.zz_), this.y01(t), this._kc.Init(), this._kc.BindCommandQueueEndCallBack(this.OnDangoDungeonEnd), this.vkc(this.Ckc), this.ykc();
      for (let e = 0; e < a.BJ_.length; e++) {
        var n = a.BJ_[e];
        this.RacingBetsMatchRoundRefresh(t, n, e === a.BJ_.length - 1)
      }
      this._kc.Execute()
    }
  }
  pkc(e) {
    this.Ckc = [], this.gkc.clear();
    for (const a of e) {
      var t = new RacingBetsDungeonDangoInfo_1.RacingBetsDungeonDangoInfo(a);
      this.gkc.set(t.DangoId, t), this.Ckc.push(t)
    }
    this.Ckc.sort((e, t) => e.CurPoint !== t.CurPoint ? t.CurPoint - e.CurPoint : t.High - e.High);
    for (let e = 0; e < this.Ckc.length; e++) this.Ckc[e].Rank = e + 1
  }
  RacingBetsMatchRoundRefresh(e, t, a) {
    var n;
    this.RacingBetsMatchRoundActionRefresh(t), t.gBc ? (this.RefreshLegMatchResult(t.j7n), n = this.ETc.GetLegMatchData(e), this.Ev1(n)) : a && this.v11(this.ETc.Id, e, t.AJ_ + 1)
  }
  RacingBetsMatchPreview(e, t) {
    this.IsDungeonPlaying ? Log_1.Log.CheckError() && Log_1.Log.Error("RacingBets", 58, "RacingBets玩法重复开始") : (this.IsDungeonPlaying = !0, this.DungeonMatchId = e, this.pkc(t.zz_), this.y01(e), this._kc.Init(), this._kc.BindCommandQueueEndCallBack(this.OnDangoDungeonPreviewEnd), this.vkc(this.Ckc), this.y11(), this._kc.Execute())
  }
  RacingBetsMatchRoundActionRefresh(t) {
    for (const a of t.Qs1) {
      let e = void 0;
      switch (a.n3s) {
        case Protocol_1.Aki.Protocol.Ks1.Proto_MatchStart:
          e = this.Skc();
          break;
        case Protocol_1.Aki.Protocol.Ks1.Hs1:
          e = this.Aa1();
          break;
        case Protocol_1.Aki.Protocol.Ks1.DangoRoundStart:
          e = this.Pa1(a.$s1.Kz_);
          break;
        case Protocol_1.Aki.Protocol.Ks1.Proto_MatchRoundDice:
          e = this.Ekc(t.AJ_, a.Vs1.Vs1);
          break;
        case Protocol_1.Aki.Protocol.Ks1.Proto_DangoMove:
          e = this.Tkc(a.TJ_);
          break;
        case Protocol_1.Aki.Protocol.Ks1.Proto_DangoSkill:
          e = this.bkc(a.LJ_);
          break;
        case Protocol_1.Aki.Protocol.Ks1.Proto_DangoChangeHigh:
          e = this.Lkc(a.wJ_);
          break;
        case Protocol_1.Aki.Protocol.Ks1.Ws1:
          e = this.ko1(a.Ws1.Kz_);
          break;
        case Protocol_1.Aki.Protocol.Ks1.by1:
          e = this.Yy1(a.by1.Kz_);
          break;
        case Protocol_1.Aki.Protocol.Ks1.HE1:
          e = this.VI1(a.HE1.Kz_)
      }
      e.ActionIndex = a.mTs, e.PushBulletScreenTimes(a.vNc)
    }
  }
  RefreshBetsDangoRankInfo(t) {
    let a = !1;
    for (let e = 0; e < t.length; e++) {
      var n = t[e],
        n = this.gkc.get(n);
      n && (n.Rank !== e + 1 && (a = !0), n.LastRank = n.Rank, n.Rank = e + 1)
    }
    return a && this.Ckc.sort((e, t) => e.Rank - t.Rank), a
  }
  vkc(e) {
    var t = ConfigManager_1.ConfigManager.RacingBetsConfig.GetRacingBetMapPointList(this.ETc.Id),
      e = DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsInitDungeonCommand(e, t);
    return this._kc.AddCommand(e), e
  }
  ykc() {
    var e = DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateOpenRacingBetsGameplayView();
    return this._kc.AddCommand(e), e
  }
  y11() {
    var e = DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateOpenRacingBetsGamePlayPreviewView();
    return this._kc.AddCommand(e), e
  }
  Skc() {
    var e = DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsDungeonBeginCommand();
    return this._kc.AddCommand(e), e
  }
  Aa1() {
    var e = DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsRoundStartCommand();
    return this._kc.AddCommand(e), e
  }
  Pa1(e) {
    e = DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsDangoRoundStartCommand(e);
    return this._kc.AddCommand(e), e
  }
  Ekc(e, t) {
    e = DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsDiceCommand(e, t);
    return this._kc.AddCommand(e), e
  }
  bkc(e) {
    e = DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsSkillCommand(e);
    return this._kc.AddCommand(e), e
  }
  Tkc(e) {
    e = DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsDangoMoveCommand(e);
    return this._kc.AddCommand(e), e
  }
  Lkc(e) {
    e = DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsDangoChangeHighCommand(e);
    return this._kc.AddCommand(e), e
  }
  ko1(e) {
    e = DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsChangeDangoCameraBlendCommand(e);
    return this._kc.AddCommand(e), e
  }
  v11(e, t, a) {
    e = DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsNextRoundRequestCommand(e, t, a);
    return this._kc.AddCommand(e), e
  }
  Ev1(e) {
    e = DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateOpenRacingBetsDungeonResultView(e);
    return this._kc.AddCommand(e), e
  }
  Yy1(e) {
    e = DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsDangoDestinationCommand(e);
    return this._kc.AddCommand(e), e
  }
  VI1(e) {
    e = DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsDangoRankChangeCommand(e);
    return this._kc.AddCommand(e), e
  }
  CloseDangoGamePlayPreviewView() {
    UiLayer_1.UiLayer.SetShowMaskLayer("RacingBetsGamePlayPreviewView", !0), UiSceneDangoActorManager_1.UiSceneDangoActorManager.SetAllActorVisible(!0), this.v01(), UiManager_1.UiManager.CloseView("RacingBetsGamePlayPreviewView", () => {
      this.p11(), UiLayer_1.UiLayer.SetShowMaskLayer("RacingBetsGamePlayPreviewView", !1)
    })
  }
  p11() {
    ModelManager_1.ModelManager.ChessModel.ClearAll();
    for (const t of this.Ckc) {
      var e = ModelManager_1.ModelManager.CreatureModel.GetEntity(t.EntityId);
      e && CreatureController_1.CreatureController.SetEntityEnable(e.Entity, !1, "RacingBetsModel inactive dango")
    }
  }
  RacingBetsAbortDungeon() {
    this._kc?.Abort()
  }
  y01(e) {
    e = this.ETc.GetLegMatchData(e);
    3 === e.GroupMatchType ? AudioSystem_1.AudioSystem.SetState(RacingBetsDefine_1.RACING_BETS_AUDIO_STATE_GROUP, "race_finals") : 1 === e.Type ? AudioSystem_1.AudioSystem.SetState(RacingBetsDefine_1.RACING_BETS_AUDIO_STATE_GROUP, "race_groupstage") : AudioSystem_1.AudioSystem.SetState(RacingBetsDefine_1.RACING_BETS_AUDIO_STATE_GROUP, "race_matchpoint")
  }
  v01() {
    4 === this.ETc.GetCurLegMatchData().GetLegMatchState() ? AudioSystem_1.AudioSystem.SetState(RacingBetsDefine_1.RACING_BETS_AUDIO_STATE_GROUP, "race_finals") : AudioSystem_1.AudioSystem.SetState(RacingBetsDefine_1.RACING_BETS_AUDIO_STATE_GROUP, "none")
  }
  GetDungeonDangoList() {
    return this.Ckc
  }
  GetDungeonDangoInfo(e) {
    return this.gkc.get(e)
  }
  GetDungeonDangoEntityId(e) {
    var t = this.gkc.get(e);
    return t ? t.EntityId : (Log_1.Log.CheckError() && Log_1.Log.Error("RacingBets", 58, "团子副本无团子数据", ["dangoId", e]), 0)
  }
  IsDungeonBettingDango(e) {
    var t = this.GetRacingBetsLegMatchData(this.DungeonMatchId);
    return !!t && t.BetDangoId === e
  }
  GetCommandActionIndex() {
    return this._kc.CurCommandActionIndex
  }
  async LoadDiceMaterialParameterCollection() {
    if (!this.WFc) {
      const t = new CustomPromise_1.CustomPromise;
      ResourceSystem_1.ResourceSystem.LoadAsync(RacingBetsDefine_1.MPC_DICE_DATE_PATH, UE.MaterialParameterCollection, e => {
        this.WFc = e, t.SetResult(void 0)
      }, 102), await t.Promise
    }
    return this.WFc
  }
  CheckInRacingBetsDungeon() {
    return 31 === ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(ModelManager_1.ModelManager.CreatureModel.GetInstanceId())?.InstSubType && ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
  }
  GetIsFromActivityOpenDungeon() {
    var e = this.jk1;
    return this.jk1 = !1, e
  }
  SetIsFromActivityOpenDungeon() {
    this.jk1 = !0
  }
  GetRankData() {
    return this.ijc
  }
  GetSelfRank() {
    return this.cx1
  }
  RacingBetsRankRefresh(e) {
    if (this.ijc = [], e.c71) {
      var t = e.H6n,
        a = (this.cx1 = {
          RankStatus: t,
          RankNum: 0,
          HeadIcon: e.c71.lJ_,
          Name: e.c71.H8n,
          HitNum: e.c71.aJ_,
          CashNum: e.c71._J_
        }, t === Protocol_1.Aki.Protocol.R8c.Proto_Top50 && (this.cx1.RankNum = e.E8c), ModelManager_1.ModelManager.PlayerInfoModel?.GetId());
      for (const i of e.jRs) {
        var n = {
          PlayerId: i.W5n,
          PlayerHeadPhoto: i.lJ_,
          RankNum: i.cJ_,
          Name: i.H8n,
          HitNum: i.aJ_,
          CashNum: i._J_
        };
        t === Protocol_1.Aki.Protocol.R8c.cJ_ && n.PlayerId === a && (this.cx1.RankNum = n.RankNum), this.ijc.push(n)
      }
    } else Log_1.Log.CheckError() && Log_1.Log.Error("RacingBets", 78, "团子排行榜数据异常，没有自身数据", ["data", e])
  }
  GetRacingBetsHistoryData() {
    if (this.ETc) {
      var e = [];
      for (const t of this.ETc.GetReverseLegMatchList()) 0 !== t.BetDangoId && e.push(t);
      return e
    }
  }
  SetViewRedDotState(e) {
    let t = LocalStorage_1.LocalStorage.GetPlayer(e);
    t ? t.HasViewed = !0 : t = this.CreateDefaultRedDotState(), LocalStorage_1.LocalStorage.SetPlayer(e, t)
  }
  CreateDefaultRedDotState() {
    return {
      HasViewed: !0,
      LastViewedData: 0
    }
  }
  fd1(e) {
    this.md1 = TimerSystem_1.RealTimeTimerSystem.EmitOnTime(() => {
      this.CheckRankRedDot()
    }, e * TimeUtil_1.TimeUtil.InverseMillisecond + TimerSystem_1.MIN_TIME)
  }
  Cd1() {
    this.md1 && (TimerSystem_1.RealTimeTimerSystem.Remove(this.md1), this.md1 = void 0)
  }
  CheckRankRedDot() {
    var e, t, a, n, i;
    this.ETc && (this.Cd1(), e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsRankViewRecord) ?? ModelManager_1.ModelManager.RacingBetsModel.CreateDefaultRedDotState(), t = (a = this.ETc.GetCurLegMatchRankOpenTime())[0], a = a[1], n = TimeUtil_1.TimeUtil.GetServerTimeStamp(), i = e.HasViewed, e.LastViewedData < t ? n < t ? this.fd1(t - n + 1) : (e.HasViewed = !1, e.LastViewedData = t, LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsRankViewRecord, e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRacingBetsRedDotUpdate), 0 !== a && n < a && this.fd1(a - n + 1)) : i && 0 !== a && n < a && this.fd1(a - n + 1))
  }
  CheckMatchRedDot() {
    if (this.ETc) {
      var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsMatchViewRecord) ?? ModelManager_1.ModelManager.RacingBetsModel.CreateDefaultRedDotState();
      let e = 0;
      var a, n = this.ETc.GetCurLegMatchData();
      n && (a = n.Id, e = n.IsLegMatchFinished() ? a : Math.max(0, a - 1)), (!t.HasViewed || e > t.LastViewedData) && (t.HasViewed = !1, t.LastViewedData = e, LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsMatchViewRecord, t), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRacingBetsRedDotUpdate))
    }
  }
  GetRacingBetsBulletScreenAlpha() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsBulletScreenAlphaRecord) ?? RacingBetsDefine_1.RACING_BETS_BULLET_SCREEN_MAX_ALPHA
  }
  SetRacingBetsBulletScreenAlpha(e) {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsBulletScreenAlphaRecord, e)
  }
  GetRacingBetsBulletScreenShowType() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsBulletScreenShowTypeRecord) ?? 2
  }
  SetRacingBetsBulletScreenShowType(e) {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsBulletScreenShowTypeRecord, e)
  }
  get RayTracingShadowsValue() {
    return this.zY1
  }
  get DlssValue() {
    return this.JY1
  }
  SetVisionValue(e, t) {
    this.zY1 = e, this.JY1 = t
  }
}
exports.RacingBetsModel = RacingBetsModel;
//# sourceMappingURL=RacingBetsModel.js.map