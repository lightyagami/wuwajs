"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbHeadStyleMonsterDisplay = undefined;
class FbHeadStyleMonsterDisplay {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Pmh = false;
    this.Umh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbHeadStyleMonsterDisplay(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get MonsterDisplayId() {
    if (!this.Pmh) {
      this.Pmh = true;
      this.Umh = this.FbDataInternal.monsterDisplayId();
    }
    return this.Umh;
  }
}
exports.FbHeadStyleMonsterDisplay = FbHeadStyleMonsterDisplay;
//# sourceMappingURL=FbHeadStyleMonsterDisplay.js.map