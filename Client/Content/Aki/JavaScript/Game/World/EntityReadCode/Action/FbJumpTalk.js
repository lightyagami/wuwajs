"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbJumpTalk = undefined;
class FbJumpTalk {
  constructor(t) {
    this.FbDataInternal = t;
    this.yuh = false;
    this.Suh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbJumpTalk(t);
    }
  }
  get TalkId() {
    if (!this.yuh) {
      this.yuh = true;
      this.Suh = this.FbDataInternal.talkId();
    }
    return this.Suh;
  }
}
exports.FbJumpTalk = FbJumpTalk;
//# sourceMappingURL=FbJumpTalk.js.map