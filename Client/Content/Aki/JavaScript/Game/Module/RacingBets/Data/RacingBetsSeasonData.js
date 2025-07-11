"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsSeasonData = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ActivityData_1 = require("../../Activity/ActivityData");
const RacingBetsController_1 = require("../RacingBetsController");
const RacingBetsGroupMatchData_1 = require("./RacingBetsGroupMatchData");
const RacingBetsGroupRewardData_1 = require("./RacingBetsGroupRewardData");
const RacingBetsRewardData_1 = require("./RacingBetsRewardData");
const OPEN_TIP_KEY = 1;
class RacingBetsSeasonData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.cTc = 0;
    this.uTc = undefined;
    this.dTc = undefined;
    this.mTc = 0;
    this.fTc = new Map();
    this.gTc = new Map();
    this.$Ic = [];
    this.CTc = new Map();
    this.nJs = new Map();
    this.Bd1 = [];
    this.zR1 = new Map();
    this.vO1 = false;
    this.gU = false;
  }
  PhraseEx(t) {
    t = t.Wz_;
    if (t === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RacingBets", 78, "RacingBetsSeasonData初始化 无效activityInfo");
      }
    } else if (this.gU) {
      this.bl(t);
    } else {
      this.dTc = ConfigManager_1.ConfigManager.RacingBetsConfig.GetRacingBetsSeasonConfig(this.Id);
      this.pTc(t.dJ_);
      this.RefreshPlayerData(t.jRs);
      this.vTc(t.CJ_);
      this.kd1(t.ud1);
      ModelManager_1.ModelManager.RacingBetsModel.CheckMatchRedDot();
      ModelManager_1.ModelManager.RacingBetsModel.CheckRankRedDot();
      this.gU = true;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRacingBetsDataRefresh, this);
    }
  }
  bl(t) {
    this.GO1(t.dJ_);
    this.RefreshPlayerData(t.jRs);
    this.RefreshRewardData(t.CJ_);
    this.kd1(t.ud1);
    ModelManager_1.ModelManager.RacingBetsModel.CheckMatchRedDot();
    ModelManager_1.ModelManager.RacingBetsModel.CheckRankRedDot();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRacingBetsDataRefresh, this);
  }
  OnActivityClose() {
    RacingBetsController_1.RacingBetsController.TryLeaveRacingBetsDungeon();
  }
  GetExDataRedPointShowState() {
    for (const i of this.nJs.values()) {
      if (i.CanReceiveReward()) {
        return true;
      }
    }
    var t;
    var e;
    var a = this.GetCurLegMatchData();
    return !!a && ((t = a.GetLegMatchState()) === 1 && a.BetDangoId === 0 || (e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsWatchGameRecord) ?? 0, t === 3 && a.Id > e) || (e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsReplayGameRecord) ?? 0, t === 4 && a.Id > e));
  }
  pTc(t) {
    if (!t || t.length <= 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RacingBets", 78, "RacingBetsSeasonData初始化 无效matchInfos");
      }
    } else {
      this.fTc.clear();
      this.gTc.clear();
      this.$Ic = [];
      for (const i of t) {
        var e = new RacingBetsGroupMatchData_1.RacingBetsGroupMatchData();
        e.Init(i);
        var a = e.GetLegMatchList();
        this.fTc.set(e.Id, e);
        this.JR1(e);
        if (!a || a.length <= 0) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("RacingBets", 78, "RacingBetsSeasonData初始化 无效legMatchList");
          }
        } else {
          for (const r of a) {
            this.gTc.set(r.Id, r);
            this.$Ic.push(r);
          }
        }
      }
      this.$Ic.sort((t, e) => t.BetsStartTime - e.BetsStartTime);
      this.vO1 = true;
    }
  }
  GO1(t) {
    if (!t || t.length <= 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RacingBets", 78, "RacingBetsSeasonData刷新 无效matchInfos");
      }
    } else {
      for (const e of t) {
        this.GetGroupMatchData(e.ZZ_).Refresh(e);
        for (const a of e.tJ_) {
          this.GetLegMatchData(a.s5n).Refresh(a);
        }
      }
    }
  }
  RefreshPlayerData(t) {
    this.uTc = [{
      ItemId: this.dTc.Id,
      IncId: 0
    }, t.rJ_];
    this.cTc = t.oJ_;
    this.mTc = t.aJ_;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RacingBets", 58, "RacingBetsSeasonData刷新玩家数据", ["AccumulateBetsCashCount", this.cTc], ["HitNum", this.mTc]);
    }
    this.yTc(t.eic);
  }
  yTc(t) {
    for (const e of t) {
      this.GetLegMatchData(e.Qz_).RefreshBetInfo(e);
    }
  }
  vTc(t) {
    this.nJs.clear();
    this.CTc.clear();
    for (const a of t) {
      var e = new RacingBetsRewardData_1.RacingBetsRewardData(a.s5n);
      e.Refresh(a);
      this.nJs.set(a.s5n, e);
      this.GetGroupRewardData(e.GetRewardType()).AddRewardData(e);
    }
  }
  RefreshRewardData(t) {
    for (const e of t) {
      this.GetRewardData(e.s5n).Refresh(e);
    }
  }
  kd1(e) {
    var a = e.length;
    this.Bd1.length = a;
    for (let t = 0; t < a; t++) {
      this.Bd1[t] = MathUtils_1.MathUtils.LongToNumber(e[t]);
    }
  }
  JR1(t) {
    var e;
    var a;
    if (!this.vO1 && t) {
      if (a = ConfigManager_1.ConfigManager.RacingBetsConfig.GetRacingBetsGroupMatch(t.Id)) {
        e = a.NextMatchId;
        a = a.Id;
        if (this.zR1.has(e)) {
          this.zR1.get(e).push(a);
        } else {
          this.zR1.set(e, [a]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RacingBets", 78, "RacingBetsSeasonData 无效groupMatchId", ["groupMatchId", t.Id]);
      }
    }
  }
  GetBetItemData() {
    return this.uTc;
  }
  GetSeasonConfig() {
    return this.dTc;
  }
  GetTotalBetCount() {
    return this.cTc;
  }
  GetGroupMatchData(t) {
    var e = this.fTc.get(t);
    if (e === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("RacingBets", 58, "RacingBetsSeasonData 无效matchId", ["matchId", t]);
    }
    return e;
  }
  GetLegMatchData(t) {
    var e = this.gTc.get(t);
    if (e === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("RacingBets", 58, "RacingBetsSeasonData 无效legMatchId", ["legMatchId", t]);
    }
    return e;
  }
  GetCurLegMatchData() {
    var t = this.GetCurLegMatchDataIndex();
    return this.GetLegMatchDataByIndex(t);
  }
  GetCurLegMatchDataIndex() {
    for (let t = this.$Ic.length - 1; t >= 0; t--) {
      if (this.$Ic[t].GetLegMatchState() !== 0) {
        return t;
      }
    }
    return this.$Ic.length - 1;
  }
  GetLegMatchDataByIndex(t) {
    if (!(t < 0) && !(t > this.$Ic.length)) {
      return this.$Ic[t];
    }
  }
  GetCurLegMatchRankOpenTime() {
    var t = this.GetCurLegMatchDataIndex();
    if (t >= this.Bd1.length) {
      return [0, 0];
    } else {
      return [this.Bd1[t], t + 1 < this.Bd1.length ? this.Bd1[t + 1] : 0];
    }
  }
  GetNextRankUpdateTime() {
    var t = TimeUtil_1.TimeUtil.GetServerTime();
    for (const e of this.Bd1) {
      if (t < e) {
        return e;
      }
    }
    return -1;
  }
  CheckRankOpen() {
    var t = TimeUtil_1.TimeUtil.GetServerTime();
    return !(this.Bd1.length <= 0) && this.Bd1[0] <= t;
  }
  GetReverseLegMatchList() {
    if (this.$Ic && !(this.$Ic.length <= 0)) {
      var e = [];
      for (let t = this.$Ic.length - 1; t >= 0; t--) {
        e.push(this.$Ic[t]);
      }
      return e;
    }
  }
  IsFinalLegMatch(t) {
    var e = this.GetLegMatchData(t);
    if (e) {
      var a = this.$Ic.length;
      for (let t = 0; t < a; t++) {
        if (e === this.$Ic[t]) {
          return t === a - 1;
        }
      }
    }
    return false;
  }
  GetNextLegMatchIndex(e) {
    for (let t = 0; t < this.$Ic.length; t++) {
      if (this.$Ic[t].Id === e) {
        return t + 1;
      }
    }
    return -1;
  }
  GetNextLegMatchData(t) {
    t = this.GetNextLegMatchIndex(t);
    return this.GetLegMatchDataByIndex(t);
  }
  GetRewardData(t) {
    var e = this.nJs.get(t);
    if (e === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("RacingBets", 58, "RacingBetsSeasonData 无效rewardId", ["rewardId", t]);
    }
    return e;
  }
  GetGroupRewardData(t) {
    const e = this.CTc.get(t);
    if (e) {
      return e;
    }
    {
      const e = new RacingBetsGroupRewardData_1.RacingBetsGroupRewardData(t);
      this.CTc.set(t, e);
      return e;
    }
  }
  GetHitNum() {
    return this.mTc;
  }
  GetCurrencyItemId() {
    return this.dTc.MoneyId;
  }
  GetCurrencyCount() {
    return ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(this.dTc.MoneyId);
  }
  GetBetCostCount(t) {
    var e = this.GetCurrencyCount();
    return Math.ceil(e * t.Odds / 100);
  }
  GetActivityTipNeedShowState() {
    return !!this.CheckIfInOpenTime() && !!this.CheckIfInShowTime() && ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, OPEN_TIP_KEY, 0, 0) === 0;
  }
  GetLastGroupMatchIdList(t) {
    return this.zR1.get(t) ?? [];
  }
}
exports.RacingBetsSeasonData = RacingBetsSeasonData;
//# sourceMappingURL=RacingBetsSeasonData.js.map