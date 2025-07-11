"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SolarSpeedProtocolContext = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const ActivityData_1 = require("../../../ActivityData");
var Proto_ActivityTaskState = Protocol_1.Aki.Protocol.I$s;
const ModelManager_1 = require("../../../../../Manager/ModelManager");
class SolarSpeedProtocolContext extends ActivityData_1.ActivityBaseData {
  constructor(t) {
    super();
    this.i5l = undefined;
    this.w3_ = new Map();
    this.R3_ = new Map();
    this.CurrentRankPointsCache = 0;
    this.CurrentDistancePointsCache = 0;
    this.PlayerSettleMsgCache = new Map();
    this.i5l = t;
  }
  Dispose() {
    this.w3_.clear();
    this.R3_.clear();
  }
  PhraseEx(t) {
    t = t.i3_;
    if (t) {
      this.ZVa(t);
    }
  }
  GetExDataRedPointShowState() {
    return this.i5l.HasRewardRedDot || this.i5l.HasLevelRedDot;
  }
  ZVa(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SolarSpeed", 64, "解析联机跑酷活动信息", ["data", t]);
    }
    this.w3_.clear();
    this.R3_.clear();
    for (const e of t.o3_) {
      this.w3_.set(e.gG_, e);
    }
    if (t.n3_ !== undefined) {
      for (const r of t.n3_.E$s) {
        this.R3_.set(r.s5n, r);
      }
    }
  }
  ParseTeamParkourTaskNotify(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SolarSpeed", 64, "解析联机跑酷活动任务数据", ["msg", t]);
    }
    t = t.T$s;
    if (t !== undefined) {
      this.R3_.set(t.s5n, t);
    }
  }
  ParseTeamParkourSettleNotify(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SolarSpeed", 64, "解析联机跑酷结算信息", ["msg", t]);
    }
    this.ResetTeamParkourSettleCache();
    var e;
    var r;
    var o = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    for (const s of t.c3_) {
      this.PlayerSettleMsgCache.set(s.W5n, s);
      if (o === s.W5n && (this.CurrentRankPointsCache = s.l3_, this.CurrentDistancePointsCache = s._3_, (e = this.w3_.get(t.gG_)) !== undefined) && ((e.r3_ === 0 || s.r3_ < e.r3_) && (e.r3_ = s.r3_), (r = s.l3_ + s._3_) > e.SMs && (e.SMs = r), e.tY_ === 0 || s.s3_ !== 0 && s.s3_ < e.tY_)) {
        e.tY_ = s.s3_;
      }
    }
  }
  ResetTeamParkourSettleCache() {
    this.CurrentRankPointsCache = 0;
    this.CurrentDistancePointsCache = 0;
    this.PlayerSettleMsgCache.clear();
  }
  GetScoreById(t) {
    return this.w3_.get(t)?.SMs ?? 0;
  }
  GetRankingById(t) {
    return this.w3_.get(t)?.r3_ ?? 0;
  }
  GetStartTime(t) {
    return this.w3_.get(t)?.Mps ?? 0;
  }
  GetLapRecord(t) {
    return this.w3_.get(t)?.tY_ ?? 0;
  }
  GetCurrentProgressById(t) {
    return this.R3_.get(t)?.lMs ?? 0;
  }
  GetCurrentProgressTargetById(t) {
    return this.R3_.get(t)?.j6n ?? 0;
  }
  GetTaskStateById(t) {
    return this.R3_.get(t)?.H6n;
  }
  SetTaskStateRewardedById(t) {
    t = this.R3_.get(t);
    if (t !== undefined) {
      t.H6n = Proto_ActivityTaskState.Proto_ActivityTaskTaken;
    }
  }
}
exports.SolarSpeedProtocolContext = SolarSpeedProtocolContext;
//# sourceMappingURL=SolarSpeedProtocolContext.js.map