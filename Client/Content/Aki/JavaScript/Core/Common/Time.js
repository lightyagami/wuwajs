"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Time = undefined;
const cpp_1 = require("cpp");
const NetInfo_1 = require("../Net/NetInfo");
class Time {
  static get ServerTimeStamp() {
    return cpp_1.KuroTime.GetMilliseconds64() + Time.A9;
  }
  static SetServerTimeStamp(t) {
    this.A9 = t + NetInfo_1.NetInfo.RttMs / 2 - cpp_1.KuroTime.GetMilliseconds64();
  }
  static SetServerFlowTimeStamp(t) {
    this.K$a = t + NetInfo_1.NetInfo.RttMs / 2 - Time.FlowTime;
  }
  static SyncTime(t, e, i, s) {
    Time.SetServerTimeStamp(t);
    Time.SetServerTimeOffset(t - Time.Now);
    Time.SetServerStopTimeOffset(s);
    Time.SetServerFlowTimeStamp(e);
    Time._P_ = i;
  }
  static get TimeDilation() {
    return this.R9;
  }
  static get FlowTimeDilation() {
    return this.cP_;
  }
  static get InverseSelfCenteredTimeDilation() {
    return this.V8c;
  }
  static get ServerStopTimeStamp() {
    return this.U9 + this.WorldTime + NetInfo_1.NetInfo.RttMs / 2;
  }
  static get ServerFlowTimeStamp() {
    return this.K$a + this.FlowTime + NetInfo_1.NetInfo.RttMs / 2;
  }
  static get ServerCombatStopTime() {
    return Math.floor(this._P_ + this.FlowTime + NetInfo_1.NetInfo.RttMs / 2);
  }
  static get CombatServerTime() {
    return Math.floor(this.P9 + this.Now + NetInfo_1.NetInfo.RttMs / 2);
  }
  static SetServerTimeOffset(t) {
    this.P9 = t;
  }
  static SetServerStopTimeOffset(t) {
    this.U9 = t;
  }
  static SetTimeDilation(t) {
    this.R9 = t;
  }
  static SetFlowTimeDilation(t) {
    this.cP_ = t;
  }
  static SetInverseSelfCenteredTimeDilation(t) {
    this.V8c = t;
  }
  static get DeltaTime() {
    return this.x9;
  }
  static get DeltaTimeSeconds() {
    return this.x9 * Time.w9;
  }
  static get Frame() {
    return this.B9;
  }
  static get Now() {
    return this.b9;
  }
  static get NowSeconds() {
    return this.b9 * Time.w9;
  }
  static get PlayerTime() {
    return this.$5u;
  }
  static get PlayerTimeSeconds() {
    return this.$5u * Time.w9;
  }
  static get WorldTime() {
    return this.q9;
  }
  static get WorldTimeSeconds() {
    return this.q9 * Time.w9;
  }
  static get PlayerWorldTime() {
    return this.kUu;
  }
  static get PlayerWorldTimeSeconds() {
    return this.kUu * Time.w9;
  }
  static get FlowTime() {
    return this.uP_;
  }
  static get SystemNow() {
    return this.F8c;
  }
  static get SystemNowSeconds() {
    return this.F8c * Time.w9;
  }
  static get IsAfterPrePhysicTick() {
    return this.qv1 === this.Frame;
  }
  static AfterTickPriority1(t) {
    this.qv1 = this.B9;
  }
  static Initialize() {
    this.B9 = 0;
    this.b9 = 0;
    this.q9 = 0;
    this.uP_ = 0;
    this.x9 = 0;
    this.F8c = 0;
    this.N8c = new Date().getTime();
    Time.OriginTimeDilation = 1;
    this.R9 = 1;
    this.cP_ = 1;
  }
  static Tick(t) {
    this.x9 = t;
    this.B9 += 1;
    this.b9 += t;
    this.$5u += t * this.V8c;
    this.q9 += t * this.R9;
    this.kUu += t * this.R9 * this.V8c;
    this.uP_ += t * this.R9 * this.cP_;
    this.F8c = new Date().getTime() - this.N8c;
  }
}
(exports.Time = Time).w9 = 0.001;
Time.B9 = 0;
Time.b9 = 0;
Time.$5u = 0;
Time.q9 = 0;
Time.kUu = 0;
Time.uP_ = 0;
Time.x9 = 0;
Time.F8c = 0;
Time.N8c = 0;
Time.A9 = 0;
Time.K$a = 0;
Time.U9 = 0;
Time.P9 = 0;
Time._P_ = 0;
Time.R9 = 1;
Time.cP_ = 1;
Time.V8c = 1;
Time.OriginTimeDilation = 1;
Time.LastPauseTimeFrame = 0;
Time.LastResumeTimeFrame = 0;
Time.qv1 = 0; //# sourceMappingURL=Time.js.map