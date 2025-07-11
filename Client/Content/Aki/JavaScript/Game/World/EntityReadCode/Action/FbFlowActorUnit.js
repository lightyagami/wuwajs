"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFlowActorUnit = undefined;
const FbActorInitialState_1 = require("./FbActorInitialState");
class FbFlowActorUnit {
  constructor(t) {
    this.FbDataInternal = t;
    this.a_h = false;
    this.I9o = 0;
    this.HMh = false;
    this.WMh = 0;
    this.QMh = false;
    this.KMh = false;
    this.$Mh = false;
    this.XMh = false;
    this.YMh = false;
    this.zMh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbFlowActorUnit(t);
    }
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
  get TalkerId() {
    if (!this.HMh) {
      this.HMh = true;
      this.WMh = this.FbDataInternal.talkerId();
    }
    return this.WMh;
  }
  get IsPlayer() {
    if (!this.QMh) {
      this.QMh = true;
      this.KMh = this.FbDataInternal.isPlayer();
    }
    return this.KMh;
  }
  get IsResetPosition() {
    if (!this.$Mh) {
      this.$Mh = true;
      this.XMh = this.FbDataInternal.isResetPosition();
    }
    return this.XMh;
  }
  get InitialState() {
    if (!this.YMh) {
      this.YMh = true;
      this.zMh = FbActorInitialState_1.FbActorInitialState.Create(this.FbDataInternal.initialState());
    }
    return this.zMh;
  }
}
exports.FbFlowActorUnit = FbFlowActorUnit;
//# sourceMappingURL=FbFlowActorUnit.js.map