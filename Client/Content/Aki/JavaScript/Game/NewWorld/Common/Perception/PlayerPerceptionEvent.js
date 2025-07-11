"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerPerceptionEvent = undefined;
const cpp_1 = require("cpp");
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
class PlayerPerceptionEvent {
  constructor() {
    this.w_e = undefined;
    this.$or = undefined;
    this.pGo = undefined;
    this.Xor = undefined;
    this.EventTokenInternal = 0;
    this.RBa = -1;
    this.UBa = -1;
    this.xBa = 0;
    this.PBa = undefined;
    this.err = () => {
      if (this.w_e) {
        this.w_e();
      }
    };
    this.trr = () => {
      if (this.$or) {
        this.$or();
      }
    };
    this.Zor = () => !this.Xor || this.Xor();
    this.Iea = () => {
      this.EventTokenInternal = 0;
      this.xBa = 0;
      if (this.pGo) {
        this.pGo();
        this.pGo = undefined;
      }
    };
  }
  IsValid() {
    return this.EventTokenInternal > 0;
  }
  get EventToken() {
    return this.EventTokenInternal;
  }
  Init(i, t, s = undefined, h = undefined, o = undefined, e = undefined, r = -1, v = undefined) {
    if (this.EventTokenInternal !== 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Perception", 36, "重复初始化主角感知事件");
      }
    } else if (s || h) {
      if (t) {
        this.RBa = i;
        this.UBa = r;
        this.xBa = t;
        this.PBa = v;
        this.w_e = s;
        this.$or = h;
        this.pGo = o;
        this.Xor = e;
        this.EventTokenInternal = cpp_1.FKuroPerceptionInterface.RegisterPlayerPerceptionEvent(i, r, t, this, this.Xor ? this.Zor : undefined, this.w_e ? this.err : undefined, this.$or ? this.trr : undefined, v && !v.Equals(Vector_1.Vector.ZeroVectorProxy) ? v.ToUeVectorOld() : undefined, this.Iea);
        if (this.EventTokenInternal === 0 && Log_1.Log.CheckError()) {
          Log_1.Log.Error("Perception", 36, "初始化感知事件失败");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Perception", 36, "初始化的主角感知事件时传入的时间预算管理Token非法");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Perception", 36, "初始化的主角感知事件没有意义");
    }
  }
  Register(i) {
    if (this.EventTokenInternal !== 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Perception", 36, "重新注册时，仍然还存在感知事件");
      }
    } else {
      this.xBa = i;
      this.EventTokenInternal = cpp_1.FKuroPerceptionInterface.RegisterPlayerPerceptionEvent(this.RBa, this.UBa, this.xBa, this, this.Xor ? this.Zor : undefined, this.w_e ? this.err : undefined, this.$or ? this.trr : undefined, this.PBa && !this.PBa.Equals(Vector_1.Vector.ZeroVectorProxy) ? this.PBa.ToUeVectorOld() : undefined, this.Iea);
      if (this.EventTokenInternal === 0 && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Perception", 36, "重新注册感知事件失败");
      }
    }
  }
  Unregister() {
    if (this.EventTokenInternal === 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Perception", 36, "临时注销感知事件时，感知事件不存在");
      }
    } else {
      cpp_1.FKuroPerceptionInterface.UnregisterPlayerPerceptionEvent(this.EventTokenInternal);
      this.EventTokenInternal = 0;
    }
  }
  Clear() {
    this.w_e = undefined;
    this.$or = undefined;
    this.pGo = undefined;
    this.Xor = undefined;
    this.RBa = -1;
    this.UBa = -1;
    this.xBa = 0;
    this.PBa = undefined;
    if (this.EventTokenInternal !== 0) {
      cpp_1.FKuroPerceptionInterface.UnregisterPlayerPerceptionEvent(this.EventTokenInternal);
      this.EventTokenInternal = 0;
    }
  }
  UpdateDistance(i, t = -1) {
    this.RBa = i;
    this.UBa = t;
    if (this.EventTokenInternal !== 0) {
      cpp_1.FKuroPerceptionInterface.UpdatePerceptionEventDistance(this.EventTokenInternal, i, t);
    }
  }
}
exports.PlayerPerceptionEvent = PlayerPerceptionEvent;
//# sourceMappingURL=PlayerPerceptionEvent.js.map