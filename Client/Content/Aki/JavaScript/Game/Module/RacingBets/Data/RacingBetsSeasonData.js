"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RacingBetsSeasonData = void 0;
const Log_1 = require("../../../../Core/Common/Log"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ActivityData_1 = require("../../Activity/ActivityData"),
  RacingBetsController_1 = require("../RacingBetsController"),
  RacingBetsGroupMatchData_1 = require("./RacingBetsGroupMatchData"),
  RacingBetsGroupRewardData_1 = require("./RacingBetsGroupRewardData"),
  RacingBetsRewardData_1 = require("./RacingBetsRewardData"),
  OPEN_TIP_KEY = 1;
class RacingBetsSeasonData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments), this.cTc = 0, this.uTc = void 0, this.dTc = void 0, this.mTc = 0, this.fTc = new Map, this.gTc = new Map, this.$Ic = [], this.CTc = new Map, this.nJs = new Map, this.ud1 = [], this.TR1 = new Map, this.Vk1 = !1, this.gU = !1
  }
  PhraseEx(t) {
    t = t.Wz_;
    void 0 === t ? Log_1.Log.CheckError() && Log_1.Log.Error("RacingBets", 78, "RacingBetsSeasonData初始化 无效activityInfo") : this.gU ? this.bl(t) : (this.dTc = ConfigManager_1.ConfigManager.RacingBetsConfig.GetRacingBetsSeasonConfig(this.Id), this.pTc(t.dJ_), this.RefreshPlayerData(t.jRs), this.vTc(t.CJ_), this.dd1(t.ku1), ModelManager_1.ModelManager.RacingBetsModel.CheckMatchRedDot(), ModelManager_1.ModelManager.RacingBetsModel.CheckRankRedDot(), this.gU = !0, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRacingBetsDataRefresh, this))
  }
  bl(t) {
    this.hO1(t.dJ_), this.RefreshPlayerData(t.jRs), this.RefreshRewardData(t.CJ_), this.dd1(t.ku1), ModelManager_1.ModelManager.RacingBetsModel.CheckMatchRedDot(), ModelManager_1.ModelManager.RacingBetsModel.CheckRankRedDot(), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRacingBetsDataRefresh, this)
  }
  OnActivityClose() {
    RacingBetsController_1.RacingBetsController.TryLeaveRacingBetsDungeon()
  }
  GetExDataRedPointShowState() {
    for (const i of this.nJs.values())
      if (i.CanReceiveReward()) return !0;
    var t, e, a = this.GetCurLegMatchData();
    return !!a && (1 === (t = a.GetLegMatchState()) && 0 === a.BetDangoId || (e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsWatchGameRecord) ?? 0, 3 === t && a.Id > e) || (e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.RacingBetsReplayGameRecord) ?? 0, 4 === t && a.Id > e))
  }
  pTc(t) {
    if (!t || t.length <= 0) Log_1.Log.CheckError() && Log_1.Log.Error("RacingBets", 78, "RacingBetsSeasonData初始化 无效matchInfos");
    else {
      this.fTc.clear(), this.gTc.clear(), this.$Ic = [];
      for (const i of t) {
        var e = new RacingBetsGroupMatchData_1.RacingBetsGroupMatchData,
          a = (e.Init(i), e.GetLegMatchList());
        if (this.fTc.set(e.Id, e), this.bR1(e), !a || a.length <= 0) Log_1.Log.CheckError() && Log_1.Log.Error("RacingBets", 78, "RacingBetsSeasonData初始化 无效legMatchList");
        else
          for (const r of a) this.gTc.set(r.Id, r), this.$Ic.push(r)
      }
      this.$Ic.sort((t, e) => t.BetsStartTime - e.BetsStartTime), this.Vk1 = !0
    }
  }
  hO1(t) {
    if (!t || t.length <= 0) Log_1.Log.CheckError() && Log_1.Log.Error("RacingBets", 78, "RacingBetsSeasonData刷新 无效matchInfos");
    else
      for (const e of t) {
        this.GetGroupMatchData(e.ZZ_).Refresh(e);
        for (const a of e.tJ_) this.GetLegMatchData(a.s5n).Refresh(a)
      }
  }
  RefreshPlayerData(t) {
    this.uTc = [{
      ItemId: this.dTc.Id,
      IncId: 0
    }, t.rJ_], this.cTc = t.oJ_, this.mTc = t.aJ_, Log_1.Log.CheckInfo() && Log_1.Log.Info("RacingBets", 58, "RacingBetsSeasonData刷新玩家数据", ["AccumulateBetsCashCount", this.cTc], ["HitNum", this.mTc]), this.yTc(t.eic)
  }
  yTc(t) {
    for (const e of t) this.GetLegMatchData(e.Qz_).RefreshBetInfo(e)
  }
  vTc(t) {
    this.nJs.clear(), this.CTc.clear();
    for (const a of t) {
      var e = new RacingBetsRewardData_1.RacingBetsRewardData(a.s5n);
      e.Refresh(a), this.nJs.set(a.s5n, e), this.GetGroupRewardData(e.GetRewardType()).AddRewardData(e)
    }
  }
  RefreshRewardData(t) {
    for (const e of t) this.GetRewardData(e.s5n).Refresh(e)
  }
  dd1(e) {
    var a = e.length;
    this.ud1.length = a;
    for (let t = 0; t < a; t++) this.ud1[t] = MathUtils_1.MathUtils.LongToNumber(e[t])
  }
  bR1(t) {
    var e, a;
    !this.Vk1 && t && ((a = ConfigManager_1.ConfigManager.RacingBetsConfig.GetRacingBetsGroupMatch(t.Id)) ? (e = a.NextMatchId, a = a.Id, this.TR1.has(e) ? this.TR1.get(e).push(a) : this.TR1.set(e, [a])) : Log_1.Log.CheckError() && Log_1.Log.Error("RacingBets", 78, "RacingBetsSeasonData 无效groupMatchId", ["groupMatchId", t.Id]))
  }
  GetBetItemData() {
    return this.uTc
  }
  GetSeasonConfig() {
    return this.dTc
  }
  GetTotalBetCount() {
    return this.cTc
  }
  GetGroupMatchData(t) {
    var e = this.fTc.get(t);
    return void 0 === e && Log_1.Log.CheckError() && Log_1.Log.Error("RacingBets", 58, "RacingBetsSeasonData 无效matchId", ["matchId", t]), e
  }
  GetLegMatchData(t) {
    var e = this.gTc.get(t);
    return void 0 === e && Log_1.Log.CheckError() && Log_1.Log.Error("RacingBets", 58, "RacingBetsSeasonData 无效legMatchId", ["legMatchId", t]), e
  }
  GetCurLegMatchData() {
    var t = this.GetCurLegMatchDataIndex();
    return this.GetLegMatchDataByIndex(t)
  }
  GetCurLegMatchDataIndex() {
    for (let t = this.$Ic.length - 1; 0 <= t; t--)
      if (0 !== this.$Ic[t].GetLegMatchState()) return t;
    return this.$Ic.length - 1
  }
  GetLegMatchDataByIndex(t) {
    if (!(t < 0 || t > this.$Ic.length)) return this.$Ic[t]
  }
  GetCurLegMatchRankOpenTime() {
    var t = this.GetCurLegMatchDataIndex();
    return t >= this.ud1.length ? [0, 0] : [this.ud1[t], t + 1 < this.ud1.length ? this.ud1[t + 1] : 0]
  }
  GetNextRankUpdateTime() {
    var t = TimeUtil_1.TimeUtil.GetServerTime();
    for (const e of this.ud1)
      if (t < e) return e;
    return -1
  }
  CheckRankOpen() {
    var t = TimeUtil_1.TimeUtil.GetServerTime();
    return !(this.ud1.length <= 0) && this.ud1[0] <= t
  }
  GetReverseLegMatchList() {
    if (this.$Ic && !(this.$Ic.length <= 0)) {
      var e = [];
      for (let t = this.$Ic.length - 1; 0 <= t; t--) e.push(this.$Ic[t]);
      return e
    }
  }
  IsFinalLegMatch(t) {
    var e = this.GetLegMatchData(t);
    if (e) {
      var a = this.$Ic.length;
      for (let t = 0; t < a; t++)
        if (e === this.$Ic[t]) return t === a - 1
    }
    return !1
  }
  GetNextLegMatchIndex(e) {
    for (let t = 0; t < this.$Ic.length; t++)
      if (this.$Ic[t].Id === e) return t + 1;
    return -1
  }
  GetNextLegMatchData(t) {
    t = this.GetNextLegMatchIndex(t);
    return this.GetLegMatchDataByIndex(t)
  }
  GetRewardData(t) {
    var e = this.nJs.get(t);
    return void 0 === e && Log_1.Log.CheckError() && Log_1.Log.Error("RacingBets", 58, "RacingBetsSeasonData 无效rewardId", ["rewardId", t]), e
  }
  GetGroupRewardData(t) {
    const e = this.CTc.get(t);
    if (e) return e;
    {
      const e = new RacingBetsGroupRewardData_1.RacingBetsGroupRewardData(t);
      return this.CTc.set(t, e), e
    }
  }
  GetHitNum() {
    return this.mTc
  }
  GetCurrencyItemId() {
    return this.dTc.MoneyId
  }
  GetCurrencyCount() {
    return ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(this.dTc.MoneyId)
  }
  GetBetCostCount(t) {
    var e = this.GetCurrencyCount();
    return Math.ceil(e * t.Odds / 100)
  }
  GetActivityTipNeedShowState() {
    return !(!this.CheckIfInOpenTime() || !this.CheckIfInShowTime()) && 0 === ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(this.Id, 0, OPEN_TIP_KEY, 0, 0)
  }
  GetLastGroupMatchIdList(t) {
    return this.TR1.get(t) ?? []
  }
}
exports.RacingBetsSeasonData = RacingBetsSeasonData;
//# sourceMappingURL=RacingBetsSeasonData.js.map