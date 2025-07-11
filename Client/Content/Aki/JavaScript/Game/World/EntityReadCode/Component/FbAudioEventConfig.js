"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAudioEventConfig = undefined;
class FbAudioEventConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.Q5h = false;
    this.K5h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbAudioEventConfig(t);
    }
  }
  get CollectAkEvent() {
    if (!this.Q5h) {
      this.Q5h = true;
      this.K5h = this.FbDataInternal.collectAkEvent();
    }
    return this.K5h;
  }
}
exports.FbAudioEventConfig = FbAudioEventConfig;
//# sourceMappingURL=FbAudioEventConfig.js.map