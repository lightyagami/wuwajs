"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RacingBetsLegMatchData = void 0;
const Log_1 = require("../../../../Core/Common/Log"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RacingBetsDefine_1 = require("../RacingBetsDefine");
class RacingBetsLegMatchData {
  constructor() {
    this.FFe = 0, this.KIc = !1, this.XIc = 0, this.YIc = 0, this.zIc = 0, this.JIc = 0, this.aM1 = !1, this.ZIc = 0, this.eTc = StringUtils_1.EMPTY_STRING, this.tTc = 0, this.Rs1 = 0, this.iTc = 0, this.rTc = 0, this.oTc = 0, this.nTc = 0, this.sTc = void 0, this.aTc = [], this.Uxc = void 0, this.Bxc = []
  }
  get Id() {
    return this.FFe
  }
  get Name() {
    return this.sTc.Name
  }
  get Type() {
    return this.sTc.Type
  }
  get GroupMatchType() {
    return this.Uxc.MatchType
  }
  get ParentGroupMatchData() {
    return this.Uxc
  }
  get BetsStartTime() {
    return this.iTc
  }
  get BetsEndTime() {
    return this.rTc
  }
  get MatchStartTime() {
    return this.oTc
  }
  get MatchEndTime() {
    return this.nTc
  }
  get HasBetting() {
    return this.KIc
  }
  get BetDangoId() {
    return this.XIc
  }
  get MatchBtnBgPath() {
    return this.sTc.BtnBgPath
  }
  GetBetDangoRank() {
    if (this.aTc.length < 0) return 0;
    let e = 0;
    for (let t = 0; t < this.aTc.length; ++t)
      if (this.BetDangoId === this.aTc[t]) {
        e = t + 1;
        break
      } return e
  }
  get BetGearId() {
    return this.YIc
  }
  get BetGearCash() {
    return this.zIc
  }
  get NextOddsRateRefreshTime() {
    return this.JIc
  }
  get IsFinalOddsRefresh() {
    return this.aM1
  }
  get Odds() {
    return this.ZIc
  }
  get OddsVersion() {
    return this.eTc
  }
  get LeaveCancelNum() {
    return this.tTc
  }
  get OddsReward() {
    return this.Rs1
  }
  Init(t, e) {
    this.FFe = t.s5n, this.sTc = ConfigManager_1.ConfigManager.RacingBetsConfig.GetRacingBetsLegMatches(this.FFe), this.Uxc = e, this.iTc = Number(MathUtils_1.MathUtils.LongToBigInt(t.Zz_.cps)), this.rTc = Number(MathUtils_1.MathUtils.LongToBigInt(t.Zz_.dps)), this.oTc = Number(MathUtils_1.MathUtils.LongToBigInt(t.Jz_.cps)), this.nTc = Number(MathUtils_1.MathUtils.LongToBigInt(t.Jz_.dps)), this.Refresh(t)
  }
  RefreshBetInfo(t) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("RacingBets", 58, "RacingBetsLegMatchData刷新下注信息", ["Id", this.Id], ["BetDangoId", t.Kz_], ["BetGearId", t.Xz_], ["BetGearCash", t.Yz_], ["Odds", t.YZ_], ["OddsVersion", t.zZ_], ["LeaveCancelNum", t.sJ_], ["OddsReward", t.zo1]), this.KIc = 0 < t.Kz_, this.XIc = t.Kz_, this.YIc = t.Xz_, this.zIc = t.Yz_, this.ZIc = t.YZ_, this.eTc = t.zZ_, this.tTc = t.sJ_, this.Rs1 = t.zo1
  }
  RefreshLegMatchResultNotify(t) {
    this.XIc = t.I8c, this.zIc = t.T8c, this.Rs1 = t.DS_
  }
  Refresh(t) {
    this.aTc = t.eJ_;
    var e = Number(MathUtils_1.MathUtils.LongToBigInt(t.JZ_)),
      i = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    this.aM1 = e <= i, this.JIc = e, this.eTc = t.zZ_, this.kxc(t.zz_)
  }
  RefreshDangoOdds(t) {
    var e = Number(MathUtils_1.MathUtils.LongToBigInt(t.JZ_)),
      i = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    this.aM1 = e <= i, this.JIc = e, this.eTc = t.zZ_, this.kxc(t.zz_)
  }
  kxc(e) {
    if (this.Bxc.length <= 0)
      for (let t = 0; t < e.length; t++) {
        var i = e[t],
          s = 1 === this.Uxc.MatchType ? "DangoCase" + (t + 1) : "DangoCase" + (t + 2),
          a = 1 === this.Uxc.MatchType ? "Camera_DangoFocus_" + (t + 1) : "Camera_DangoFocus_" + (t + 2),
          h = 1 === this.Uxc.MatchType ? RacingBetsDefine_1.racingBetsDangoOddsOffsetList[t] : RacingBetsDefine_1.racingBetsDangoOddsOffsetList[t + 1],
          i = {
            UiModelUseWay: 14,
            DangoId: i.s5n,
            Odds: i.YZ_,
            DangoPointCase: s,
            DangoCamera: a,
            DangoOffset: h
          };
        this.Bxc.push(i)
      } else
        for (const r of e) {
          var t = this.GetDangoActorData(r.s5n);
          t && (t.Odds = r.YZ_)
        }
  }
  RefreshLegMatchResult(t) {
    this.aTc = t.eJ_
  }
  GetLegMatchState() {
    var t = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    return t < this.iTc || this.Bxc.length <= 0 ? 0 : t < this.rTc ? 1 : t < this.oTc ? 2 : this.aTc.length <= 0 && t < this.nTc ? 3 : 4
  }
  GetLegRemindTime() {
    var t, e = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
    return e ? (t = TimeUtil_1.TimeUtil.GetServerTimeStamp()) < this.iTc || this.Bxc.length <= 0 ? TimeUtil_1.TimeUtil.SetTimeSecond(this.iTc - t) : t < this.rTc ? TimeUtil_1.TimeUtil.SetTimeSecond(this.rTc - t) : t < this.oTc ? TimeUtil_1.TimeUtil.SetTimeSecond(this.oTc - t) : this.aTc.length <= 0 && t < this.nTc ? TimeUtil_1.TimeUtil.SetTimeSecond(this.nTc - t) : (e = e.GetNextLegMatchData(this.FFe)) ? TimeUtil_1.TimeUtil.SetTimeSecond(e.iTc - t) : 0 : 0
  }
  IsLegMatchFinished() {
    return 4 === this.GetLegMatchState()
  }
  GetLegMatchResultList() {
    var e = this.Uxc.GetPromoteDangoList(),
      i = [],
      s = ModelManager_1.ModelManager.RacingBetsModel.IsFinalLegMatch(this.FFe);
    for (let t = 0; t < this.aTc.length; t++) {
      var a = this.aTc[t],
        h = e.includes(a),
        a = {
          DangoId: a,
          Rank: t + 1,
          HasAdvanced: h,
          LegMatchType: this.Type,
          IsChampion: s && 0 === t
        };
      i.push(a)
    }
    return i
  }
  GetChampionDangoId() {
    return this.aTc.length <= 0 ? (Log_1.Log.CheckError() && Log_1.Log.Error("RacingBets", 58, "半场赛没有排名数据", ["LegMatchId", this.Id]), 0) : this.aTc[0]
  }
  GetDangoActorData(t) {
    for (const e of this.Bxc)
      if (e.DangoId === t) return e;
    Log_1.Log.CheckError() && Log_1.Log.Error("RacingBets", 58, "RacingBetsLegMatchData Invalid DangoId", ["MatchId", this.Id], ["DangoId", t])
  }
  GetDangoActorDataList() {
    return this.Bxc
  }
  GetOddsRewardCount() {
    return Math.ceil(this.BetGearCash * this.Odds / 100)
  }
  GetRacingBetsMainViewActorShowType(t) {
    return 0 < this.aTc.length && 4 === t ? 0 : 1 === this.Uxc.MatchType ? 2 : 1
  }
  GetMainViewCameraHandleName(t) {
    return 0 === t ? RacingBetsDefine_1.CAMERA_DANGO_PREVIEW_ONE_PLAYER : 1 === t ? RacingBetsDefine_1.CAMERA_DANGO_PREVIEW_FOUR_PLAYER : RacingBetsDefine_1.CAMERA_DANGO_PREVIEW_SIX_PLAYER
  }
  GetChampionDangoActorData() {
    if (!(this.aTc.length <= 0)) return {
      UiModelUseWay: 13,
      DangoId: this.aTc[0],
      Odds: 0,
      DangoPointCase: RacingBetsDefine_1.DANGO_PREVIEW_POINT_CASE_ONE_PLAYER,
      DangoCamera: StringUtils_1.EMPTY_STRING,
      DangoOffset: 0
    };
    Log_1.Log.CheckError() && Log_1.Log.Error("RacingBets", 58, "半场赛没有排名数据", ["LegMatchId", this.Id])
  }
  GetDangoBroadcastText() {
    let t = 0;
    t = 0 < this.aTc.length ? this.aTc[0] : (a = Math.floor(Math.random() * this.Bxc.length), this.Bxc[a].DangoId);
    var e, i, s, a = ConfigManager_1.ConfigManager.RacingBetsConfig.GetRacingBetsDangoBroadcast(t);
    return a ? (e = this.GetLegMatchState(), i = this.Uxc.MatchType, s = Math.floor(2 * Math.random()), 1 === i ? 4 === e ? a.GroupStageChampText : 0 === s ? a.GroupStageCheerText1 : a.GroupStageCheerText2 : 2 === i ? 4 === e ? a.AdvanceStageChampText : 0 === s ? a.AdvanceStageCheerText1 : a.AdvanceStageCheerText2 : 4 === e ? a.FinalStageChampText : 0 === s ? a.FinalStageCheerText1 : a.FinalStageCheerText2) : StringUtils_1.EMPTY_STRING
  }
}
exports.RacingBetsLegMatchData = RacingBetsLegMatchData;
//# sourceMappingURL=RacingBetsLegMatchData.js.map