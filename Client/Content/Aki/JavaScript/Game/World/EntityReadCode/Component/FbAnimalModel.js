"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAnimalModel = undefined;
const UnionAnimalModelTypeHelper_1 = require("./UnionAnimalModelTypeHelper");
class FbAnimalModel {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.$Qh = false;
    this.XQh = undefined;
    this.Cc1 = false;
    this.pc1 = undefined;
    this._Kh = false;
    this.cKh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbAnimalModel(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get BlueprintPath() {
    if (!this.$Qh) {
      this.$Qh = true;
      this.XQh = this.FbDataInternal.blueprintPath();
    }
    return this.XQh;
  }
  get AnimalModel() {
    var t;
    var i;
    if (!this.Cc1 && (this.Cc1 = true, t = this.FbDataInternal.animalModelType(), i = UnionAnimalModelTypeHelper_1.UnionAnimalModelTypeHelper.GetUnionAnimalModelTypeObject(t))) {
      this.pc1 = UnionAnimalModelTypeHelper_1.UnionAnimalModelTypeHelper.ReadUnionAnimalModelType(t, this.FbDataInternal.animalModel(i));
    }
    return this.pc1;
  }
  get Abp() {
    if (!this._Kh) {
      this._Kh = true;
      this.cKh = this.FbDataInternal.abp();
    }
    return this.cKh;
  }
}
exports.FbAnimalModel = FbAnimalModel;
//# sourceMappingURL=FbAnimalModel.js.map