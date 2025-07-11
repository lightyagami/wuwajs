"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRaceStrategy = undefined;
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbRaceStrategy {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.f_h = false;
    this.X6o = undefined;
    this.kuh = false;
    this.Guh = 0;
    this.o2h = false;
    this.n2h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbRaceStrategy(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Condition() {
    if (!this.f_h) {
      this.f_h = true;
      this.X6o = FbConditionGroup_1.FbConditionGroup.Create(this.FbDataInternal.condition());
    }
    return this.X6o;
  }
  get SplineEntityId() {
    if (!this.kuh) {
      this.kuh = true;
      this.Guh = this.FbDataInternal.splineEntityId();
    }
    return this.Guh;
  }
  get CommonConfig() {
    if (!this.o2h) {
      this.o2h = true;
      this.n2h = this.FbDataInternal.commonConfig();
    }
    return this.n2h;
  }
}
exports.FbRaceStrategy = FbRaceStrategy;
//# sourceMappingURL=FbRaceStrategy.js.map