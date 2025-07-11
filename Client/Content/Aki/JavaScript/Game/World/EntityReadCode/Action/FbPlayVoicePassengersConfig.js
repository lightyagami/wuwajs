"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPlayVoicePassengersConfig = undefined;
class FbPlayVoicePassengersConfig {
  constructor(s) {
    this.FbDataInternal = s;
    this.goc = false;
    this.Coc = undefined;
    this.poc = false;
    this.voc = false;
  }
  static Create(s) {
    if (s) {
      return new FbPlayVoicePassengersConfig(s);
    }
  }
  get Passengers() {
    if (!this.goc) {
      this.goc = true;
      this.Coc = new Array();
      var t = this.FbDataInternal.passengersLength();
      if (t) {
        for (let s = 0; s < t; ++s) {
          this.Coc.push(this.FbDataInternal.passengers(s));
        }
      }
    }
    return this.Coc;
  }
  get MatchNone() {
    if (!this.poc) {
      this.poc = true;
      this.voc = this.FbDataInternal.matchNone();
    }
    return this.voc;
  }
}
exports.FbPlayVoicePassengersConfig = FbPlayVoicePassengersConfig;
//# sourceMappingURL=FbPlayVoicePassengersConfig.js.map