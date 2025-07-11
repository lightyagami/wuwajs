"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbConditionBubbleData = undefined;
const FbBubbleData_1 = require("../Action/FbBubbleData");
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbConditionBubbleData {
  constructor(t) {
    this.FbDataInternal = t;
    this.f_h = false;
    this.X6o = undefined;
    this.F_h = false;
    this.N_h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbConditionBubbleData(t);
    }
  }
  get Condition() {
    if (!this.f_h) {
      this.f_h = true;
      this.X6o = FbConditionGroup_1.FbConditionGroup.Create(this.FbDataInternal.condition());
    }
    return this.X6o;
  }
  get Flow() {
    if (!this.F_h) {
      this.F_h = true;
      this.N_h = FbBubbleData_1.FbBubbleData.Create(this.FbDataInternal.flow());
    }
    return this.N_h;
  }
}
exports.FbConditionBubbleData = FbConditionBubbleData;
//# sourceMappingURL=FbConditionBubbleData.js.map