"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsLegMatchData = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RacingBetsDefine_1 = require("../RacingBetsDefine");
class RacingBetsLegMatchData {
  constructor() {
    this.FFe = 0;
    this.KIc = false;
    this.XIc = 0;
    this.YIc = 0;
    this.zIc = 0;
    this.JIc = 0;
    this.PM1 = false;
    this.ZIc = 0;
    this.eTc = StringUtils_1.EMPTY_STRING;
    this.tTc = 0;
    this.Qs1 = 0;
    this.iTc = 0;
    this.rTc = 0;
    this.oTc = 0;
    this.nTc = 0;
    this.sTc = undefined;
    this.aTc = [];
    this.Uxc = undefined;
    this.Bxc = [];
  }
  get Id() {
    return this.FFe;
  }
  get Name() {
    return this.sTc.Name;
  }
  get Type() {
    return this.sTc.Type;
  }
  get GroupMatchType() {
    return this.Uxc.MatchType;
  }
  get ParentGroupMatchData() {
    return this.Uxc;
  }
  get BetsStartTime() {
    return this.iTc;
  }
  get BetsEndTime() {
    return this.rTc;
  }
  get MatchStartTime() {
    return this.oTc;
  }
  get MatchEndTime() {
    return this.nTc;
  }
  get HasBetting() {
    return this.KIc;
  }
  get BetDangoId() {
    return this.XIc;
  }
  get MatchBtnBgPath() {
    return this.sTc.BtnBgPath;
  }
  GetBetDangoRank() {
    if (this.aTc.length < 0) {
      return 0;
    }
    let e = 0;
    for (let t = 0; t < this.aTc.length; ++t) {
      if (this.BetDangoId === this.aTc[t]) {
        e = t + 1;
        break;
      }
    }
    return e;
  }
  get BetGearId() {
    return this.YIc;
  }
  get BetGearCash() {
    return this.zIc;
  }
  get NextOddsRateRefreshTime() {
    return this.JIc;
  }
  get IsFinalOddsRefresh() {
    return this.PM1;
  }
  get Odds() {
    return this.ZIc;
  }
  get OddsVersion() {
    return this.eTc;
  }
  get LeaveCancelNum() {
    return this.tTc;
  }
  get OddsReward() {
    return this.Qs1;
  }
  Init(t, e) {
    this.FFe = t.s5n;
    this.sTc = ConfigManager_1.ConfigManager.RacingBetsConfig.GetRacingBetsLegMatches(this.FFe);
    this.Uxc = e;
    this.iTc = Number(MathUtils_1.MathUtils.LongToBigInt(t.Zz_.cps));
    this.rTc = Number(MathUtils_1.MathUtils.LongToBigInt(t.Zz_.dps));
    this.oTc = Number(MathUtils_1.MathUtils.LongToBigInt(t.Jz_.cps));
    this.nTc = Number(MathUtils_1.MathUtils.LongToBigInt(t.Jz_.dps));
    this.Refresh(t);
  }
  RefreshBetInfo(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RacingBets", 58, "RacingBetsLegMatchData刷新下注信息", ["Id", this.Id], ["BetDangoId", t.Kz_], ["BetGearId", t.Xz_], ["BetGearCash", t.Yz_], ["Odds", t.YZ_], ["OddsVersion", t.zZ_], ["LeaveCancelNum", t.sJ_], ["OddsReward", t.pn1]);
    }
    this.KIc = t.Kz_ > 0;
    this.XIc = t.Kz_;
    this.YIc = t.Xz_;
    this.zIc = t.Yz_;
    this.ZIc = t.YZ_;
    this.eTc = t.zZ_;
    this.tTc = t.sJ_;
    this.Qs1 = t.pn1;
  }
  RefreshLegMatchResultNotify(t) {
    this.XIc = t.I8c;
    this.zIc = t.T8c;
    this.Qs1 = t.DS_;
  }
  Refresh(t) {
    this.aTc = t.eJ_;
    var e = Number(MathUtils_1.MathUtils.LongToBigInt(t.JZ_));
    var i = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    this.PM1 = e <= i;
    this.JIc = e;
    this.eTc = t.zZ_;
    this.kxc(t.zz_);
  }
  RefreshDangoOdds(t) {
    var e = Number(MathUtils_1.MathUtils.LongToBigInt(t.JZ_));
    var i = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    this.PM1 = e <= i;
    this.JIc = e;
    this.eTc = t.zZ_;
    this.kxc(t.zz_);
  }
  kxc(e) {
    if (this.Bxc.length <= 0) {
      for (let t = 0; t < e.length; t++) {
        var i = e[t];
        var s = this.Uxc.MatchType === 1 ? "DangoCase" + (t + 1) : "DangoCase" + (t + 2);
        var a = this.Uxc.MatchType === 1 ? "Camera_DangoFocus_" + (t + 1) : "Camera_DangoFocus_" + (t + 2);
        var h = this.Uxc.MatchType === 1 ? RacingBetsDefine_1.racingBetsDangoOddsOffsetList[t] : RacingBetsDefine_1.racingBetsDangoOddsOffsetList[t + 1];
        var i = {
          UiModelUseWay: 14,
          DangoId: i.s5n,
          Odds: i.YZ_,
          DangoPointCase: s,
          DangoCamera: a,
          DangoOffset: h
        };
        this.Bxc.push(i);
      }
    } else {
      for (const r of e) {
        var t = this.GetDangoActorData(r.s5n);
        if (t) {
          t.Odds = r.YZ_;
        }
      }
    }
  }
  RefreshLegMatchResult(t) {
    this.aTc = t.eJ_;
  }
  GetLegMatchState() {
    var t = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    if (t < this.iTc || this.Bxc.length <= 0) {
      return 0;
    } else if (t < this.rTc) {
      return 1;
    } else if (t < this.oTc) {
      return 2;
    } else if (this.aTc.length <= 0 && t < this.nTc) {
      return 3;
    } else {
      return 4;
    }
  }
  GetLegRemindTime() {
    var t;
    var e = ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
    if (e) {
      if ((t = TimeUtil_1.TimeUtil.GetServerTimeStamp()) < this.iTc || this.Bxc.length <= 0) {
        return TimeUtil_1.TimeUtil.SetTimeSecond(this.iTc - t);
      } else if (t < this.rTc) {
        return TimeUtil_1.TimeUtil.SetTimeSecond(this.rTc - t);
      } else if (t < this.oTc) {
        return TimeUtil_1.TimeUtil.SetTimeSecond(this.oTc - t);
      } else if (this.aTc.length <= 0 && t < this.nTc) {
        return TimeUtil_1.TimeUtil.SetTimeSecond(this.nTc - t);
      } else if (e = e.GetNextLegMatchData(this.FFe)) {
        return TimeUtil_1.TimeUtil.SetTimeSecond(e.iTc - t);
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }
  IsLegMatchFinished() {
    return this.GetLegMatchState() === 4;
  }
  GetLegMatchResultList() {
    var e = this.Uxc.GetPromoteDangoList();
    var i = [];
    var s = ModelManager_1.ModelManager.RacingBetsModel.IsFinalLegMatch(this.FFe);
    for (let t = 0; t < this.aTc.length; t++) {
      var a = this.aTc[t];
      var h = e.includes(a);
      var a = {
        DangoId: a,
        Rank: t + 1,
        HasAdvanced: h,
        LegMatchType: this.Type,
        IsChampion: s && t === 0
      };
      i.push(a);
    }
    return i;
  }
  GetChampionDangoId() {
    if (this.aTc.length <= 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RacingBets", 58, "半场赛没有排名数据", ["LegMatchId", this.Id]);
      }
      return 0;
    } else {
      return this.aTc[0];
    }
  }
  GetDangoActorData(t) {
    for (const e of this.Bxc) {
      if (e.DangoId === t) {
        return e;
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RacingBets", 58, "RacingBetsLegMatchData Invalid DangoId", ["MatchId", this.Id], ["DangoId", t]);
    }
  }
  GetDangoActorDataList() {
    return this.Bxc;
  }
  GetOddsRewardCount() {
    return Math.ceil(this.BetGearCash * this.Odds / 100);
  }
  GetRacingBetsMainViewActorShowType(t) {
    if (this.aTc.length > 0 && t === 4) {
      return 0;
    } else if (this.Uxc.MatchType === 1) {
      return 2;
    } else {
      return 1;
    }
  }
  GetMainViewCameraHandleName(t) {
    if (t === 0) {
      return RacingBetsDefine_1.CAMERA_DANGO_PREVIEW_ONE_PLAYER;
    } else if (t === 1) {
      return RacingBetsDefine_1.CAMERA_DANGO_PREVIEW_FOUR_PLAYER;
    } else {
      return RacingBetsDefine_1.CAMERA_DANGO_PREVIEW_SIX_PLAYER;
    }
  }
  GetChampionDangoActorData() {
    if (!(this.aTc.length <= 0)) {
      return {
        UiModelUseWay: 13,
        DangoId: this.aTc[0],
        Odds: 0,
        DangoPointCase: RacingBetsDefine_1.DANGO_PREVIEW_POINT_CASE_ONE_PLAYER,
        DangoCamera: StringUtils_1.EMPTY_STRING,
        DangoOffset: 0
      };
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RacingBets", 58, "半场赛没有排名数据", ["LegMatchId", this.Id]);
    }
  }
  GetDangoBroadcastText() {
    let t = 0;
    t = this.aTc.length > 0 ? this.aTc[0] : (a = Math.floor(Math.random() * this.Bxc.length), this.Bxc[a].DangoId);
    var e;
    var i;
    var s;
    var a = ConfigManager_1.ConfigManager.RacingBetsConfig.GetRacingBetsDangoBroadcast(t);
    if (a) {
      e = this.GetLegMatchState();
      i = this.Uxc.MatchType;
      s = Math.floor(Math.random() * 2);
      if (i === 1) {
        if (e === 4) {
          return a.GroupStageChampText;
        } else if (s === 0) {
          return a.GroupStageCheerText1;
        } else {
          return a.GroupStageCheerText2;
        }
      } else if (i === 2) {
        if (e === 4) {
          return a.AdvanceStageChampText;
        } else if (s === 0) {
          return a.AdvanceStageCheerText1;
        } else {
          return a.AdvanceStageCheerText2;
        }
      } else if (e === 4) {
        return a.FinalStageChampText;
      } else if (s === 0) {
        return a.FinalStageCheerText1;
      } else {
        return a.FinalStageCheerText2;
      }
    } else {
      return StringUtils_1.EMPTY_STRING;
    }
  }
}
exports.RacingBetsLegMatchData = RacingBetsLegMatchData;
//# sourceMappingURL=RacingBetsLegMatchData.js.map