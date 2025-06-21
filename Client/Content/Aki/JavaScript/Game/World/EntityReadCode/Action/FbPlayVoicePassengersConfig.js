"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbPlayVoicePassengersConfig = void 0;
class FbPlayVoicePassengersConfig {
  constructor(s) {
    this.FbDataInternal = s, this.goc = !1, this.Coc = void 0, this.poc = !1, this.voc = !1
  }
  static Create(s) {
    if (s) return new FbPlayVoicePassengersConfig(s)
  }
  get Passengers() {
    if (!this.goc) {
      this.goc = !0, this.Coc = new Array;
      var t = this.FbDataInternal.passengersLength();
      if (t)
        for (let s = 0; s < t; ++s) this.Coc.push(this.FbDataInternal.passengers(s))
    }
    return this.Coc
  }
  get MatchNone() {
    return this.poc || (this.poc = !0, this.voc = this.FbDataInternal.matchNone()), this.voc
  }
}
exports.FbPlayVoicePassengersConfig = FbPlayVoicePassengersConfig;
//# sourceMappingURL=FbPlayVoicePassengersConfig.js.map