"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTalkOptionRogueRandomEvent = undefined;
class FbTalkOptionRogueRandomEvent {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.KQ_ = false;
    this.XQ_ = 0;
  }
  static Create(t) {
    if (t) {
      return new FbTalkOptionRogueRandomEvent(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get OptionId() {
    if (!this.KQ_) {
      this.KQ_ = true;
      this.XQ_ = this.FbDataInternal.optionId();
    }
    return this.XQ_;
  }
}
exports.FbTalkOptionRogueRandomEvent = FbTalkOptionRogueRandomEvent;
//# sourceMappingURL=FbTalkOptionRogueRandomEvent.js.map