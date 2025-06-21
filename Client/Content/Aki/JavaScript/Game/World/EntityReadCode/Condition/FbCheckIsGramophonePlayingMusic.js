"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbCheckIsGramophonePlayingMusic = void 0;
const FbGramophoneCheckCondition_1 = require("./FbGramophoneCheckCondition");
class FbCheckIsGramophonePlayingMusic {
  constructor(t) {
    this.FbDataInternal = t, this.u_h = !1, this.f8o = void 0, this.xbc = !1, this.Ubc = 0, this.Dbc = !1, this.Bbc = void 0
  }
  static Create(t) {
    if (t) return new FbCheckIsGramophonePlayingMusic(t)
  }
  get Type() {
    return this.u_h || (this.u_h = !0, this.f8o = this.FbDataInternal.type()), this.f8o
  }
  get TargetGramophone() {
    return this.xbc || (this.xbc = !0, this.Ubc = this.FbDataInternal.targetGramophone()), this.Ubc
  }
  get CheckCondition() {
    return this.Dbc || (this.Dbc = !0, this.Bbc = FbGramophoneCheckCondition_1.FbGramophoneCheckCondition.Create(this.FbDataInternal.checkCondition())), this.Bbc
  }
}
exports.FbCheckIsGramophonePlayingMusic = FbCheckIsGramophonePlayingMusic;
//# sourceMappingURL=FbCheckIsGramophonePlayingMusic.js.map