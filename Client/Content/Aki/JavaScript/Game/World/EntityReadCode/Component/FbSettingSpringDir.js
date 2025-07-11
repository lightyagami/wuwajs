"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSettingSpringDir = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbSettingSpringDir {
  constructor(t) {
    this.FbDataInternal = t;
    this.Uqh = false;
    this.Dqh = false;
    this.Bqh = false;
    this.qqh = false;
    this.kqh = false;
    this.Gqh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSettingSpringDir(t);
    }
  }
  get IsSettingDir() {
    if (!this.Uqh) {
      this.Uqh = true;
      this.Dqh = this.FbDataInternal.isSettingDir();
    }
    return this.Dqh;
  }
  get IsRotator() {
    if (!this.Bqh) {
      this.Bqh = true;
      this.qqh = this.FbDataInternal.isRotator();
    }
    return this.qqh;
  }
  get SpringDir() {
    if (!this.kqh) {
      this.kqh = true;
      this.Gqh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.springDir());
    }
    return this.Gqh;
  }
}
exports.FbSettingSpringDir = FbSettingSpringDir;
//# sourceMappingURL=FbSettingSpringDir.js.map