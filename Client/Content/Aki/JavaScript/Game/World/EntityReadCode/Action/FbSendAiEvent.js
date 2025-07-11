"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSendAiEvent = undefined;
class FbSendAiEvent {
  constructor(t) {
    this.FbDataInternal = t;
    this.a_h = false;
    this.I9o = 0;
    this.iEh = false;
    this.rEh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSendAiEvent(t);
    }
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
  get EventType() {
    if (!this.iEh) {
      this.iEh = true;
      this.rEh = this.FbDataInternal.eventType();
    }
    return this.rEh;
  }
}
exports.FbSendAiEvent = FbSendAiEvent;
//# sourceMappingURL=FbSendAiEvent.js.map