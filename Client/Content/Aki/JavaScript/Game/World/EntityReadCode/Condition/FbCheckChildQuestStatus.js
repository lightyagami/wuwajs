"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckChildQuestStatus = undefined;
class FbCheckChildQuestStatus {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.$ch = false;
    this.Xch = 0;
    this.Dzh = false;
    this.h0i = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCheckChildQuestStatus(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get NodeId() {
    if (!this.$ch) {
      this.$ch = true;
      this.Xch = this.FbDataInternal.nodeId();
    }
    return this.Xch;
  }
  get Status() {
    if (!this.Dzh) {
      this.Dzh = true;
      this.h0i = this.FbDataInternal.status();
    }
    return this.h0i;
  }
}
exports.FbCheckChildQuestStatus = FbCheckChildQuestStatus;
//# sourceMappingURL=FbCheckChildQuestStatus.js.map