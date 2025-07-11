"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetAudioState = undefined;
const FbAudioState_1 = require("./FbAudioState");
class FbSetAudioState {
  constructor(t) {
    this.FbDataInternal = t;
    this.KAh = false;
    this.$Ah = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSetAudioState(t);
    }
  }
  get AudioConfig() {
    if (!this.KAh) {
      this.KAh = true;
      this.$Ah = FbAudioState_1.FbAudioState.Create(this.FbDataInternal.audioConfig());
    }
    return this.$Ah;
  }
}
exports.FbSetAudioState = FbSetAudioState;
//# sourceMappingURL=FbSetAudioState.js.map