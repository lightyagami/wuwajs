"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpineAnimationQueue = undefined;
class SpineAnimationQueue {
  constructor(i) {
    this.Kxg = i;
    this.Xxg = undefined;
    this.Yxg = undefined;
    this.zxg = () => {
      var i;
      this.Yxg = undefined;
      if (this.Xxg && this.Xxg.length > 0) {
        i = this.Xxg.shift();
        this.Yxg = this.Kxg?.SetAnimation(i.LayerIndex, i.AnimationName, i.Loop);
        this.Yxg?.AnimationComplete.Add(this.zxg);
      }
    };
  }
  PushAnimation(i, t, s) {
    if (this.Kxg) {
      if (this.Yxg) {
        this.Xxg ||= [];
        this.Xxg?.push({
          LayerIndex: i,
          AnimationName: t,
          Loop: s
        });
      } else {
        this.Yxg = this.Kxg.SetAnimation(i, t, s);
        this.Yxg?.AnimationComplete.Add(this.zxg);
      }
    }
  }
}
exports.SpineAnimationQueue = SpineAnimationQueue;
//# sourceMappingURL=SpineAnimationQueue.js.map