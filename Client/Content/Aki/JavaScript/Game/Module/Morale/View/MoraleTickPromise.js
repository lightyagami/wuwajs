"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleTickPromise = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
class MoraleTickPromise {
  constructor() {
    this.Promise = undefined;
    this.IsPlaying = undefined;
    this.AddDeltaTime = undefined;
    this.TotalTime = undefined;
    this.PlayStartCallback = undefined;
    this.PlayTickCallback = undefined;
    this.PlayEndCallback = undefined;
  }
  static Create(i) {
    var s = new MoraleTickPromise();
    s.PlayStartCallback = i.StartCallback;
    s.PlayTickCallback = i.TickCallback;
    s.PlayEndCallback = i.EndCallback;
    return s;
  }
  async PlayStart(i) {
    if (!this.IsPlaying) {
      await this.Promise?.Promise;
      this.Promise = new CustomPromise_1.CustomPromise();
      this.IsPlaying = true;
      this.AddDeltaTime = 0;
      this.TotalTime = i;
      this.PlayStartCallback?.();
      await this.Promise?.Promise;
    }
  }
  Tick(i) {
    if (this.IsPlaying && (this.AddDeltaTime += i, i = this.AddDeltaTime >= this.TotalTime, this.PlayTickCallback?.(i ? this.TotalTime : this.AddDeltaTime), i)) {
      this.$ne();
    }
  }
  $ne() {
    this.IsPlaying = false;
    this.AddDeltaTime = this.TotalTime;
    this.Promise?.SetResult();
    this.PlayEndCallback?.();
  }
  Stop() {
    if (this.IsPlaying) {
      this.$ne();
    }
  }
  Destroy() {
    this.PlayStartCallback = undefined;
    this.PlayTickCallback = undefined;
    this.PlayEndCallback = undefined;
    this.Stop();
  }
}
exports.MoraleTickPromise = MoraleTickPromise;
//# sourceMappingURL=MoraleTickPromise.js.map