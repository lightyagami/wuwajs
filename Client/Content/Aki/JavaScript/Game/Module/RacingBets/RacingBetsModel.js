"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsModel = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiLayer_1 = require("../../Ui/UiLayer");
const UiManager_1 = require("../../Ui/UiManager");
const CreatureController_1 = require("../../World/Controller/CreatureController");
const InstanceDungeonEntranceController_1 = require("../InstanceDungeon/InstanceDungeonEntranceController");
const UiSceneDangoActorManager_1 = require("../UiComponent/UiSceneDangoActorManager");
const DangoDungeonCommandFactory_1 = require("./Command/DangoDungeonCommandFactory");
const DangoDungeonCommandQueue_1 = require("./Command/DangoDungeonCommandQueue");
const RacingBetsDungeonDangoInfo_1 = require("./Data/RacingBetsDungeonDangoInfo");
const RacingBetsDefine_1 = require("./RacingBetsDefine");
class RacingBetsModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.ETc = undefined;
    this.Pe1 = undefined;
    this.UseGmState = false;
    this.gkc = new Map();
    this.Ckc = [];
    this._kc = new DangoDungeonCommandQueue_1.DangoDungeonCommandQueue();
    this.WFc = undefined;
    this.IsDungeonPlaying = false;
    this.DungeonMatchId = 0;
    this.IsReplayDungeon = false;
    this.LeaveDungeonOnEnd = false;
    this.OnDangoDungeonEnd = e => {
      UiSceneDangoActorManager_1.UiSceneDangoActorManager.SetAllActorVisible(true);
      this.j01();
      UiManager_1.UiManager.CloseView("RacingBetsGamePlayView", () => {
        this.N11();
      });
      this.IsDungeonPlaying = false;
      if (this.LeaveDungeonOnEnd) {
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest();
      }
    };
    this.OnDangoDungeonPreviewEnd = e => {
      this.IsDungeonPlaying = false;
      if (this.LeaveDungeonOnEnd) {
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest();
      }
    };
    this.ne1 = [];
    this.Nx1 = undefined;
    this.Od1 = undefined;
    this.yO1 = false;
    this.Hz1 = 0;
    this.$z1 = 0;
  }
  OnClear() {
    this.Fd1();
    return true;
  }
  OnPlayerInfoUpdate(e) {
    if (this.ETc) {
      this.ETc.RefreshPlayerData(e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RacingBets", 58, "OnPlayerInfoUpdate SeasonData is not undefined");
    }
  }
  OnRacingBetsTaskNotify(e) {
    if (this.ETc) {
      this.ETc.RefreshRewardData(e.CJ_);
    }
  }
  OnRacingBetsMatchResultNotify(e) {
    var t;
    if (this.ETc && (this.Pe1 = e) && (t = e.mJ_, t = this.ETc.GetLegMatchData(t))) {
      t.RefreshLegMatchResultNotify(e);
    }
  }
  OnRacingBetsOddsUpdate(e) {
    var t;
    if (this.ETc && (t = this.ETc.GetLegMatchData(e.mJ_))) {
      t.RefreshDangoOdds(e);
    }
  }
  RefreshLegMatchResult(e) {
    var t;
    if (this.ETc && (t = this.ETc.GetLegMatchData(e.mJ_))) {
      t.RefreshLegMatchResult(e);
      if (e.YP1 > 0) {
        t.ParentGroupMatchData.RefreshGroupMatchResult(e);
      }
      this.CheckMatchRedDot();
    }
  }
  GetRacingBetsSeasonData() {
    return this.ETc;
  }
  SetRacingBetsSeasonData(e) {
    if (this.ETc !== undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RacingBets", 58, "SetRacingBetsSeasonData SeasonData is not undefined");
      }
    } else {
      this.ETc = e;
    }
  }
  GetRacingBetsLegMatchData(e) {
    if (this.ETc) {
      return this.ETc.GetLegMatchData(e);
    }
  }
  GetLegMatchResultData() {
    return this.Pe1;
  }
  SetLegMatchResultData(e) {
    this.Pe1 = e;
  }
  GetRacingBetsGroupMatchData(e) {
    if (this.ETc) {
      return this.ETc.GetGroupMatchData(e);
    }
  }
  GetRacingBetsGearList() {
    if (this.ETc) {
      return ConfigManager_1.ConfigManager.RacingBetsConfig.GetRacingBettingGearList(this.ETc.Id);
    }
  }
  GetRacingBetsBulletScreen(e) {
    if (!this.ETc) {
      return [];
    }
    var t = [];
    for (const a of ConfigManager_1.ConfigManager.RacingBetsConfig.GetRacingBetsBulletScreenList(this.ETc.Id)) {
      if (a.Type === e && (a.DangoId === 0 || !!this.GetDungeonDangoInfo(a.DangoId))) {
        t.push(a);
      }
    }
    return t;
  }
  IsFinalLegMatch(e) {
    return !!this.ETc && this.ETc.IsFinalLegMatch(e);
  }
  RacingBetsMatchStart(t, a) {
    if (this.IsDungeonPlaying) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RacingBets", 58, "RacingBets玩法重复开始");
      }
    } else {
      this.IsDungeonPlaying = true;
      this.DungeonMatchId = t;
      this.IsReplayDungeon = a.Ep1;
      this.pkc(a.zz_);
      this.H01(t);
      this._kc.Init();
      this._kc.BindCommandQueueEndCallBack(this.OnDangoDungeonEnd);
      this.vkc(this.Ckc);
      this.ykc();
      for (let e = 0; e < a.BJ_.length; e++) {
        var n = a.BJ_[e];
        this.RacingBetsMatchRoundRefresh(t, n, e === a.BJ_.length - 1);
      }
      this._kc.Execute();
    }
  }
  pkc(e) {
    this.Ckc = [];
    this.gkc.clear();
    for (const a of e) {
      var t = new RacingBetsDungeonDangoInfo_1.RacingBetsDungeonDangoInfo(a);
      this.gkc.set(t.DangoId, t);
      this.Ckc.push(t);
    }
    this.Ckc.sort((e, t) => e.CurPoint !== t.CurPoint ? t.CurPoint - e.CurPoint : t.High - e.High);
    for (let e = 0; e < this.Ckc.length; e++) {
      this.Ckc[e].Rank = e + 1;
    }
  }
  RacingBetsMatchRoundRefresh(e, t, a) {
    var n;
    this.RacingBetsMatchRoundActionRefresh(t);
    if (t.gBc) {
      this.RefreshLegMatchResult(t.j7n);
      n = this.ETc.GetLegMatchData(e);
      this.Qv1(n);
    } else if (a) {
      this.V11(this.ETc.Id, e, t.AJ_ + 1);
    }
  }
  RacingBetsMatchPreview(e, t) {
    if (this.IsDungeonPlaying) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RacingBets", 58, "RacingBets玩法重复开始");
      }
    } else {
      this.IsDungeonPlaying = true;
      this.DungeonMatchId = e;
      this.pkc(t.zz_);
      this.H01(e);
      this._kc.Init();
      this._kc.BindCommandQueueEndCallBack(this.OnDangoDungeonPreviewEnd);
      this.vkc(this.Ckc);
      this.j11();
      this._kc.Execute();
    }
  }
  RacingBetsMatchRoundActionRefresh(t) {
    for (const a of t.ga1) {
      let e = undefined;
      switch (a.n3s) {
        case Protocol_1.Aki.Protocol.Ca1.Proto_MatchStart:
          e = this.Skc();
          break;
        case Protocol_1.Aki.Protocol.Ca1.da1:
          e = this.Za1();
          break;
        case Protocol_1.Aki.Protocol.Ca1.DangoRoundStart:
          e = this.eh1(a.ma1.Kz_);
          break;
        case Protocol_1.Aki.Protocol.Ca1.Proto_MatchRoundDice:
          e = this.Ekc(t.AJ_, a.ca1.ca1);
          break;
        case Protocol_1.Aki.Protocol.Ca1.Proto_DangoMove:
          e = this.Tkc(a.TJ_);
          break;
        case Protocol_1.Aki.Protocol.Ca1.Proto_DangoSkill:
          e = this.bkc(a.LJ_);
          break;
        case Protocol_1.Aki.Protocol.Ca1.Proto_DangoChangeHigh:
          e = this.Lkc(a.wJ_);
          break;
        case Protocol_1.Aki.Protocol.Ca1.fa1:
          e = this.rn1(a.fa1.Kz_);
          break;
        case Protocol_1.Aki.Protocol.Ca1.Yy1:
          e = this.yS1(a.Yy1.Kz_);
          break;
        case Protocol_1.Aki.Protocol.Ca1.fI1:
          e = this.mT1(a.fI1.Kz_);
      }
      e.ActionIndex = a.mTs;
      e.PushBulletScreenTimes(a.vNc);
    }
  }
  RefreshBetsDangoRankInfo(t) {
    let a = false;
    for (let e = 0; e < t.length; e++) {
      var n = t[e];
      var n = this.gkc.get(n);
      if (n) {
        if (n.Rank !== e + 1) {
          a = true;
        }
        n.LastRank = n.Rank;
        n.Rank = e + 1;
      }
    }
    if (a) {
      this.Ckc.sort((e, t) => e.Rank - t.Rank);
    }
    return a;
  }
  vkc(e) {
    var t = ConfigManager_1.ConfigManager.RacingBetsConfig.GetRacingBetMapPointList(this.ETc.Id);
    var e = DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsInitDungeonCommand(e, t);
    this._kc.AddCommand(e);
    return e;
  }
  ykc() {
    var e = DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateOpenRacingBetsGameplayView();
    this._kc.AddCommand(e);
    return e;
  }
  j11() {
    var e = DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateOpenRacingBetsGamePlayPreviewView();
    this._kc.AddCommand(e);
    return e;
  }
  Skc() {
    var e = DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsDungeonBeginCommand();
    this._kc.AddCommand(e);
    return e;
  }
  Za1() {
    var e = DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsRoundStartCommand();
    this._kc.AddCommand(e);
    return e;
  }
  eh1(e) {
    e = DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsDangoRoundStartCommand(e);
    this._kc.AddCommand(e);
    return e;
  }
  Ekc(e, t) {
    e = DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsDiceCommand(e, t);
    this._kc.AddCommand(e);
    return e;
  }
  bkc(e) {
    e = DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsSkillCommand(e);
    this._kc.AddCommand(e);
    return e;
  }
  Tkc(e) {
    e = DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsDangoMoveCommand(e);
    this._kc.AddCommand(e);
    return e;
  }
  Lkc(e) {
    e = DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsDangoChangeHighCommand(e);
    this._kc.AddCommand(e);
    return e;
  }
  rn1(e) {
    e = DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsChangeDangoCameraBlendCommand(e);
    this._kc.AddCommand(e);
    return e;
  }
  V11(e, t, a) {
    e = DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsNextRoundRequestCommand(e, t, a);
    this._kc.AddCommand(e);
    return e;
  }
  Qv1(e) {
    e = DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateOpenRacingBetsDungeonResultView(e);
    this._kc.AddCommand(e);
    return e;
  }
  yS1(e) {
    e = DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsDangoDestinationCommand(e);
    this._kc.AddCommand(e);
    return e;
  }
  mT1(e) {
    e = DangoDungeonCommandFactory_1.DangoDungeonCommandFactory.CreateRacingBetsDangoRankChangeCommand(e);
    this._kc.AddCommand(e);
    return e;
  }
  CloseDangoGamePlayPreviewView() {
    UiLayer_1.UiLayer.SetShowMaskLayer("RacingBetsGamePlayPreviewView", true);
    UiSceneDangoActorManager_1.UiSceneDangoActorManager.SetAllActorVisible(true);
    this.j01();
    UiManager_1.UiManager.CloseView("RacingBetsGamePlayPreviewView", () => {
      this.N11();
      UiLayer_1.UiLayer.SetShowMaskLayer("RacingBetsGamePlayPreviewView", false);
    });
  }
  N11() {
    ModelManager_1.ModelManager.ChessModel.ClearAll();
    for (const t of this.Ckc) {
      var e = ModelManager_1.ModelManager.CreatureModel.GetEntity(t.EntityId);
      if (e) {
        CreatureController_1.CreatureController.SetEntityEnable(e.Entity, false, "RacingBetsModel inactive dango");
      }
    }
  }
  RacingBetsAbortDungeon() {
    this._kc?.Abort();
  }
  H01(e) {
    e = this.ETc.GetLegMatchData(e);
    if (e.GroupMatchType === 3) {
      AudioSystem_1.AudioSystem.SetState(RacingBetsDefine_1.RACING_BETS_AUDIO_STATE_GROUP, "race_finals");
    } else if (e.Type === 1) {
      AudioSystem_1.AudioSystem.SetState(RacingBetsDefine_1.RACING_BETS_AUDIO_STATE_GROUP, "race_groupstage");
    } else {
      AudioSystem_1.AudioSystem.SetState(RacingBetsDefine_1.RACING_BETS_AUDIO_STATE_GROUP, "race_matchpoint");
    }
  }
  j01() {
    if (this.ETc.GetCurLegMatchData().GetLegMatchState() === 4) {
      AudioSystem_1.AudioSystem.SetState(RacingBetsDefine_1.RACING_BETS_AUDIO_STATE_GROUP, "race_finals");
    } else {
      AudioSystem_1.AudioSystem.SetState(RacingBetsDefine_1.RACING_BETS_AUDIO_STATE_GROUP, "none");
    }
  }
  GetDungeonDangoList() {
    return this.Ckc;
  }
  GetDungeonDangoInfo(e) {
    return this.gkc.get(e);
  }
  GetDungeonDangoEntityId(e) {
    var t = this.gkc.get(e);
    if (t) {
      return t.EntityId;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RacingBets", 58, "团子副本无团子数据", ["dangoId", e]);
      }
      return 0;
    }
  }
  IsDungeonBettingDango(e) {
    var t = this.GetRacingBetsLegMatchData(this.DungeonMatchId);
    return !!t && t.BetDangoId === e;
  }
  GetCommandActionIndex() {
    return this._kc.CurCommandActionIndex;
  }
  async LoadDiceMaterialParameterCollection() {
    if (!this.WFc) {
      const t = new CustomPromise_1.CustomPromise();
      ResourceSystem_1.ResourceSystem.LoadAsync(RacingBetsDefine_1.MPC_DICE_DATE_PATH, UE.MaterialParameterCollection, e => {
        this.WFc = e;
        t.SetResult(undefined);
      }, 102);
      await t.Promise;
    }
    return this.WFc;
  }
  CheckInRacingBetsDungeon() {
    return ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(ModelManager_1.ModelManager.CreatureModel.GetInstanceId())?.InstSubType === 31 && ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance();
  }
  GetIsFromActivityOpenDungeon() {
    var e = this.yO1;
    this.yO1 = false;
    return e;
  }
  SetIsFromActivityOpenDungeon() {
    this.yO1 = true;
  }
  GetRankData() {
    return this.ne1;
  }
  GetSelfRank() {
    return this.Nx1;
  }
  RacingBetsRankRefresh(e) {
    this.ne1 = [];
    if (e.f91) {
      var t = e.H6n;
      this.Nx1 = {
        RankStatus: t,
        RankNum: 0,
        HeadIcon: e.f91.lJ_,
        Name: e.f91.H8n,
        HitNum: e.f91.aJ_,
        CashNum: e.f91._J_
      };
      if (t === Protocol_1.Aki.Protocol.R8c.Proto_Top50) {
        this.Nx1.RankNum = e.E8c;
      }
      var a = ModelManager_1.ModelManager.PlayerInfoModel?.GetId();
      for (const i of e.jRs) {
        var n = {
          PlayerId: i.W5n,
          PlayerHeadPhoto: i.lJ_,
          RankNum: i.cJ_,
          Name: i.H8n,
          HitNum: i.aJ_,
          CashNum: i._J_
        };
        if (t === Protocol_1.Aki.Protocol.R8c.cJ_ && n.PlayerId === a) {
          this.Nx1.RankNum = n.RankNum;
        }
        this.ne1.push(n);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RacingBets", 78, "团子排行榜数据异常，没有自身数据", ["data", e]);
    }
  }
  GetRacingBetsHistoryData() {
    if (this.ETc) {
      var e = [];
      for (const t of this.ETc.GetReverseLegMatchList()) {
        if (t.BetDangoId !== 0) {
          e.push(t);
        }
      }
      return e;
    }
  }
  SetViewRedDotState(e) {
    let t = LocalStorage_1.LocalStorage.GetPlayer(e);
    if (t) {
      t.HasViewed = true;
    } else {
      t = this.CreateDefaultRedDotState();
    }
    LocalStorage_1.LocalStorage.SetPlayer(e, t);
  }
  CreateDefaultRedDotState() {
    return {
      HasViewed: true,
      LastViewedData: 0
    };
  }
  qd1(e) {
    this.Od1 = TimerSystem_1.RealTimeTimerSystem.EmitOnTime(() => {
      this.CheckRankRedDot();
    }, e * TimeUtil_1.TimeUtil.InverseMillisecond + TimerSystem_1.MIN_TIME);
  }
  Fd1() {
    if (this.Od1) {
      TimerSystem_1.RealTimeTimerSystem.Remove(this.Od1);
      this.Od1 = undefined;
    }
  }
  CheckRankRedDot() {
    var e;
    var t;
    var a;
    var n;
    var i;
    if (this.ETc) {
      this.Fd1();
      e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsRankViewRecord) ?? ModelManager_1.ModelManager.RacingBetsModel.CreateDefaultRedDotState();
      t = (a = this.ETc.GetCurLegMatchRankOpenTime())[0];
      a = a[1];
      n = TimeUtil_1.TimeUtil.GetServerTimeStamp();
      i = e.HasViewed;
      if (e.LastViewedData < t) {
        if (n < t) {
          this.qd1(t - n + 1);
        } else {
          e.HasViewed = false;
          e.LastViewedData = t;
          LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsRankViewRecord, e);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRacingBetsRedDotUpdate);
          if (a !== 0 && n < a) {
            this.qd1(a - n + 1);
          }
        }
      } else if (i && a !== 0 && n < a) {
        this.qd1(a - n + 1);
      }
    }
  }
  CheckMatchRedDot() {
    if (this.ETc) {
      var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsMatchViewRecord) ?? ModelManager_1.ModelManager.RacingBetsModel.CreateDefaultRedDotState();
      let e = 0;
      var a;
      var n = this.ETc.GetCurLegMatchData();
      if (n) {
        a = n.Id;
        e = n.IsLegMatchFinished() ? a : Math.max(0, a - 1);
      }
      if (!t.HasViewed || e > t.LastViewedData) {
        t.HasViewed = false;
        t.LastViewedData = e;
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsMatchViewRecord, t);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRacingBetsRedDotUpdate);
      }
    }
  }
  GetRacingBetsBulletScreenAlpha() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsBulletScreenAlphaRecord) ?? RacingBetsDefine_1.RACING_BETS_BULLET_SCREEN_MAX_ALPHA;
  }
  SetRacingBetsBulletScreenAlpha(e) {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsBulletScreenAlphaRecord, e);
  }
  GetRacingBetsBulletScreenShowType() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsBulletScreenShowTypeRecord) ?? 2;
  }
  SetRacingBetsBulletScreenShowType(e) {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsBulletScreenShowTypeRecord, e);
  }
  get RayTracingShadowsValue() {
    return this.Hz1;
  }
  get DlssValue() {
    return this.$z1;
  }
  SetVisionValue(e, t) {
    this.Hz1 = e;
    this.$z1 = t;
  }
}
exports.RacingBetsModel = RacingBetsModel;
//# sourceMappingURL=RacingBetsModel.js.map