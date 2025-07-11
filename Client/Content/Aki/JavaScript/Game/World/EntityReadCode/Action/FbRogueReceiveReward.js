"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRogueReceiveReward = undefined;
class FbRogueReceiveReward {
  constructor(e) {
    this.FbDataInternal = e;
    this.w5_ = false;
    this.R5_ = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbRogueReceiveReward(e);
    }
  }
  get RogueRewardReceiveType() {
    if (!this.w5_) {
      this.w5_ = true;
      this.R5_ = this.FbDataInternal.rogueRewardReceiveType();
    }
    return this.R5_;
  }
}
exports.FbRogueReceiveReward = FbRogueReceiveReward;
//# sourceMappingURL=FbRogueReceiveReward.js.map