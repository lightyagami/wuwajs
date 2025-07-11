"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSceneBulletGroup = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbSceneBulletGroup {
  constructor(t) {
    this.FbDataInternal = t;
    this._vh = false;
    this.cvh = undefined;
    this.p0h = false;
    this.nXs = 0;
    this.M_h = false;
    this.E_h = undefined;
    this.Kdh = false;
    this.$dh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSceneBulletGroup(t);
    }
  }
  get EntityState() {
    if (!this._vh) {
      this._vh = true;
      this.cvh = this.FbDataInternal.entityState();
    }
    return this.cvh;
  }
  get BulletId() {
    if (!this.p0h) {
      this.p0h = true;
      this.nXs = Number(this.FbDataInternal.bulletId());
    }
    return this.nXs;
  }
  get Range() {
    if (!this.M_h) {
      this.M_h = true;
      this.E_h = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.range());
    }
    return this.E_h;
  }
  get Offset() {
    if (!this.Kdh) {
      this.Kdh = true;
      this.$dh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.offset());
    }
    return this.$dh;
  }
}
exports.FbSceneBulletGroup = FbSceneBulletGroup;
//# sourceMappingURL=FbSceneBulletGroup.js.map