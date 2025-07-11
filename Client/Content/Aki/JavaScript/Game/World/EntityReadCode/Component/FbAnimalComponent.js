"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAnimalComponent = undefined;
const UnionSpecialAnimalConfigHelper_1 = require("./UnionSpecialAnimalConfigHelper");
class FbAnimalComponent {
  constructor(i) {
    this.FbDataInternal = i;
    this.q_h = false;
    this.k_h = false;
    this.s4h = false;
    this.a4h = false;
    this.p8h = false;
    this.v8h = 0;
    this.y8h = false;
    this.S8h = 0;
    this.M8h = false;
    this.E8h = false;
    this.I8h = false;
    this.T8h = undefined;
  }
  static Create(i) {
    if (i) {
      return new FbAnimalComponent(i);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get IsStare() {
    if (!this.s4h) {
      this.s4h = true;
      this.a4h = this.FbDataInternal.isStare();
    }
    return this.a4h;
  }
  get AnimalAttackRange() {
    if (!this.p8h) {
      this.p8h = true;
      this.v8h = this.FbDataInternal.animalAttackRange();
    }
    return this.v8h;
  }
  get MoveRange() {
    if (!this.y8h) {
      this.y8h = true;
      this.S8h = this.FbDataInternal.moveRange();
    }
    return this.S8h;
  }
  get CanKillSelf() {
    if (!this.M8h) {
      this.M8h = true;
      this.E8h = this.FbDataInternal.canKillSelf();
    }
    return this.E8h;
  }
  get SpecialAnimalConfig() {
    var i;
    var t;
    if (!this.I8h && (this.I8h = true, i = this.FbDataInternal.specialAnimalConfigType(), t = UnionSpecialAnimalConfigHelper_1.UnionSpecialAnimalConfigHelper.GetUnionSpecialAnimalConfigObject(i))) {
      this.T8h = UnionSpecialAnimalConfigHelper_1.UnionSpecialAnimalConfigHelper.ReadUnionSpecialAnimalConfig(i, this.FbDataInternal.specialAnimalConfig(t));
    }
    return this.T8h;
  }
}
exports.FbAnimalComponent = FbAnimalComponent;
//# sourceMappingURL=FbAnimalComponent.js.map