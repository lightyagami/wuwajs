"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEntityStateAudioConfig = undefined;
const FbAudioFade_1 = require("./FbAudioFade");
class FbEntityStateAudioConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.Bch = false;
    this.Cbo = undefined;
    this.zfh = false;
    this.Jfh = undefined;
    this.H8h = false;
    this.W8h = undefined;
    this.Q8h = false;
    this.K8h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEntityStateAudioConfig(t);
    }
  }
  get State() {
    if (!this.Bch) {
      this.Bch = true;
      this.Cbo = this.FbDataInternal.state();
    }
    return this.Cbo;
  }
  get AkEvent() {
    if (!this.zfh) {
      this.zfh = true;
      this.Jfh = this.FbDataInternal.akEvent();
    }
    return this.Jfh;
  }
  get LeaveAkEvent() {
    if (!this.H8h) {
      this.H8h = true;
      this.W8h = this.FbDataInternal.leaveAkEvent();
    }
    return this.W8h;
  }
  get AudioFade() {
    if (!this.Q8h) {
      this.Q8h = true;
      this.K8h = FbAudioFade_1.FbAudioFade.Create(this.FbDataInternal.audioFade());
    }
    return this.K8h;
  }
}
exports.FbEntityStateAudioConfig = FbEntityStateAudioConfig;
//# sourceMappingURL=FbEntityStateAudioConfig.js.map