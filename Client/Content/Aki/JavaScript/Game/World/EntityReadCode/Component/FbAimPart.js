"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAimPart = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbAimPart {
  constructor(t) {
    this.FbDataInternal = t;
    this.dOh = false;
    this.z8o = undefined;
    this.Kdh = false;
    this.$dh = undefined;
    this.mOh = false;
    this.COh = 0;
    this.gOh = false;
    this.fOh = 0;
    this.pOh = false;
    this.vOh = 0;
    this.yOh = false;
    this.SOh = 0;
    this.MOh = false;
    this.EOh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbAimPart(t);
    }
  }
  get BoneName() {
    if (!this.dOh) {
      this.dOh = true;
      this.z8o = this.FbDataInternal.boneName();
    }
    return this.z8o;
  }
  get Offset() {
    if (!this.Kdh) {
      this.Kdh = true;
      this.$dh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.offset());
    }
    return this.$dh;
  }
  get RadiusIn() {
    if (!this.mOh) {
      this.mOh = true;
      this.COh = this.FbDataInternal.radiusIn();
    }
    return this.COh;
  }
  get RadiusOut() {
    if (!this.gOh) {
      this.gOh = true;
      this.fOh = this.FbDataInternal.radiusOut();
    }
    return this.fOh;
  }
  get RadiusOutOnStart() {
    if (!this.pOh) {
      this.pOh = true;
      this.vOh = this.FbDataInternal.radiusOutOnStart();
    }
    return this.vOh;
  }
  get MobileCorrect() {
    if (!this.yOh) {
      this.yOh = true;
      this.SOh = this.FbDataInternal.mobileCorrect();
    }
    return this.SOh;
  }
  get GamePadCorrect() {
    if (!this.MOh) {
      this.MOh = true;
      this.EOh = this.FbDataInternal.gamePadCorrect();
    }
    return this.EOh;
  }
}
exports.FbAimPart = FbAimPart;
//# sourceMappingURL=FbAimPart.js.map