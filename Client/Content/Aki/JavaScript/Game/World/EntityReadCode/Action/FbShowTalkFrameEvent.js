"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbShowTalkFrameEvent = undefined;
const FbSequenceFrameEvent_1 = require("./FbSequenceFrameEvent");
const FbShowTalkFrameEventPosition_1 = require("./FbShowTalkFrameEventPosition");
class FbShowTalkFrameEvent {
  constructor(e) {
    this.FbDataInternal = e;
    this.cph = false;
    this.uph = undefined;
    this.dph = false;
    this.Cqn = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbShowTalkFrameEvent(e);
    }
  }
  get FrameEvent() {
    if (!this.cph) {
      this.cph = true;
      this.uph = FbSequenceFrameEvent_1.FbSequenceFrameEvent.Create(this.FbDataInternal.frameEvent());
    }
    return this.uph;
  }
  get Position() {
    if (!this.dph) {
      this.dph = true;
      this.Cqn = FbShowTalkFrameEventPosition_1.FbShowTalkFrameEventPosition.Create(this.FbDataInternal.position());
    }
    return this.Cqn;
  }
}
exports.FbShowTalkFrameEvent = FbShowTalkFrameEvent;
//# sourceMappingURL=FbShowTalkFrameEvent.js.map