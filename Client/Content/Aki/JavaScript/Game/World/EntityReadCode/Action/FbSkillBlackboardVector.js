"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSkillBlackboardVector = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbSkillBlackboardVector {
  constructor(t) {
    this.FbDataInternal = t;
    this.ubh = false;
    this.dbh = undefined;
    this.kmh = false;
    this.Gmh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSkillBlackboardVector(t);
    }
  }
  get Key() {
    if (!this.ubh) {
      this.ubh = true;
      this.dbh = this.FbDataInternal.key();
    }
    return this.dbh;
  }
  get Value() {
    if (!this.kmh) {
      this.kmh = true;
      this.Gmh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.value());
    }
    return this.Gmh;
  }
}
exports.FbSkillBlackboardVector = FbSkillBlackboardVector;
//# sourceMappingURL=FbSkillBlackboardVector.js.map