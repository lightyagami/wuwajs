"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbMonsterFormation = undefined;
class FbMonsterFormation {
  constructor(t) {
    this.FbDataInternal = t;
    this.tWh = false;
    this.iWh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbMonsterFormation(t);
    }
  }
  get FormationPosConfig() {
    if (!this.tWh) {
      this.tWh = true;
      this.iWh = new Array();
      var s = this.FbDataInternal.formationPosConfigLength();
      if (s) {
        for (let t = 0; t < s; ++t) {
          this.iWh.push(this.FbDataInternal.formationPosConfig(t));
        }
      }
    }
    return this.iWh;
  }
}
exports.FbMonsterFormation = FbMonsterFormation;
//# sourceMappingURL=FbMonsterFormation.js.map