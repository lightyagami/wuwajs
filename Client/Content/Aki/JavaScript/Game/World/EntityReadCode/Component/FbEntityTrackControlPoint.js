"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEntityTrackControlPoint = undefined;
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbEntityTrackControlPoint {
  constructor(t) {
    this.FbDataInternal = t;
    this.Bch = false;
    this.Cbo = undefined;
    this._Hh = false;
    this.cHh = undefined;
    this.uHh = false;
    this.dHh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEntityTrackControlPoint(t);
    }
  }
  get State() {
    if (!this.Bch) {
      this.Bch = true;
      this.Cbo = this.FbDataInternal.state();
    }
    return this.Cbo;
  }
  get LeftCondition() {
    if (!this._Hh) {
      this._Hh = true;
      this.cHh = FbConditionGroup_1.FbConditionGroup.Create(this.FbDataInternal.leftCondition());
    }
    return this.cHh;
  }
  get RightCondition() {
    if (!this.uHh) {
      this.uHh = true;
      this.dHh = FbConditionGroup_1.FbConditionGroup.Create(this.FbDataInternal.rightCondition());
    }
    return this.dHh;
  }
}
exports.FbEntityTrackControlPoint = FbEntityTrackControlPoint;
//# sourceMappingURL=FbEntityTrackControlPoint.js.map