"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckIsGramophonePlayingMusic = undefined;
const FbGramophoneCheckCondition_1 = require("./FbGramophoneCheckCondition");
class FbCheckIsGramophonePlayingMusic {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.xbc = false;
    this.Ubc = 0;
    this.Dbc = false;
    this.Bbc = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCheckIsGramophonePlayingMusic(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get TargetGramophone() {
    if (!this.xbc) {
      this.xbc = true;
      this.Ubc = this.FbDataInternal.targetGramophone();
    }
    return this.Ubc;
  }
  get CheckCondition() {
    if (!this.Dbc) {
      this.Dbc = true;
      this.Bbc = FbGramophoneCheckCondition_1.FbGramophoneCheckCondition.Create(this.FbDataInternal.checkCondition());
    }
    return this.Bbc;
  }
}
exports.FbCheckIsGramophonePlayingMusic = FbCheckIsGramophonePlayingMusic;
//# sourceMappingURL=FbCheckIsGramophonePlayingMusic.js.map