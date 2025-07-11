"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbShowTalkFrameEventPosition = undefined;
class FbShowTalkFrameEventPosition {
  constructor(t) {
    this.FbDataInternal = t;
    this.mph = false;
    this.Cph = 0;
    this.Kdh = false;
    this.$dh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbShowTalkFrameEventPosition(t);
    }
  }
  get TalkItemId() {
    if (!this.mph) {
      this.mph = true;
      this.Cph = this.FbDataInternal.talkItemId();
    }
    return this.Cph;
  }
  get Offset() {
    if (!this.Kdh) {
      this.Kdh = true;
      this.$dh = this.FbDataInternal.offset();
    }
    return this.$dh;
  }
}
exports.FbShowTalkFrameEventPosition = FbShowTalkFrameEventPosition;
//# sourceMappingURL=FbShowTalkFrameEventPosition.js.map