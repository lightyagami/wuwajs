"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckVehicleCondition = undefined;
const UnionVehicleConditionHelper_1 = require("./UnionVehicleConditionHelper");
class FbCheckVehicleCondition {
  constructor(i) {
    this.FbDataInternal = i;
    this.u_h = false;
    this.f8o = undefined;
    this.f_h = false;
    this.X6o = undefined;
  }
  static Create(i) {
    if (i) {
      return new FbCheckVehicleCondition(i);
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
    var i;
    var e;
    if (!this.f_h && (this.f_h = true, i = this.FbDataInternal.conditionType(), e = UnionVehicleConditionHelper_1.UnionVehicleConditionHelper.GetUnionVehicleConditionObject(i))) {
      this.X6o = UnionVehicleConditionHelper_1.UnionVehicleConditionHelper.ReadUnionVehicleCondition(i, this.FbDataInternal.condition(e));
    }
    return this.X6o;
  }
}
exports.FbCheckVehicleCondition = FbCheckVehicleCondition;
//# sourceMappingURL=FbCheckVehicleCondition.js.map