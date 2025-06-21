"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleTickPromise = void 0;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
class MoraleTickPromise {
  constructor() {
    this.Promise = void 0, this.IsPlaying = void 0, this.AddDeltaTime = void 0, this.TotalTime = void 0, this.PlayStartCallback = void 0, this.PlayTickCallback = void 0, this.PlayEndCallback = void 0
  }
  static Create(i) {
    var s = new MoraleTickPromise;
    return s.PlayStartCallback = i.StartCallback, s.PlayTickCallback = i.TickCallback, s.PlayEndCallback = i.EndCallback, s
  }
  async PlayStart(i) {
    this.IsPlaying || (await this.Promise?.Promise, this.Promise = new CustomPromise_1.CustomPromise, this.IsPlaying = !0, this.AddDeltaTime = 0, this.TotalTime = i, this.PlayStartCallback?.(), await this.Promise?.Promise)
  }
  Tick(i) {
    this.IsPlaying && (this.AddDeltaTime += i, i = this.AddDeltaTime >= this.TotalTime, this.PlayTickCallback?.(i ? this.TotalTime : this.AddDeltaTime), i) && this.$ne()
  }
  $ne() {
    this.IsPlaying = !1, this.AddDeltaTime = this.TotalTime, this.Promise?.SetResult(), this.PlayEndCallback?.()
  }
  Stop() {
    this.IsPlaying && this.$ne()
  }
  Destroy() {
    this.PlayStartCallback = void 0, this.PlayTickCallback = void 0, this.PlayEndCallback = void 0, this.Stop()
  }
}
exports.MoraleTickPromise = MoraleTickPromise;
//# sourceMappingURL=MoraleTickPromise.js.map