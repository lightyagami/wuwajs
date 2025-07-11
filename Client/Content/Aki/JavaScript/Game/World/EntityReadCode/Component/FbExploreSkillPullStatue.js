"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbExploreSkillPullStatue = undefined;
const FbCategoryMatchingCondition_1 = require("./FbCategoryMatchingCondition");
class FbExploreSkillPullStatue {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.f_h = false;
    this.X6o = undefined;
    this.VWh = false;
    this.jWh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbExploreSkillPullStatue(t);
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
      this.X6o = FbCategoryMatchingCondition_1.FbCategoryMatchingCondition.Create(this.FbDataInternal.condition());
    }
    return this.X6o;
  }
  get StatueInteractPointId() {
    if (!this.VWh) {
      this.VWh = true;
      this.jWh = this.FbDataInternal.statueInteractPointId();
    }
    return this.jWh;
  }
}
exports.FbExploreSkillPullStatue = FbExploreSkillPullStatue;
//# sourceMappingURL=FbExploreSkillPullStatue.js.map