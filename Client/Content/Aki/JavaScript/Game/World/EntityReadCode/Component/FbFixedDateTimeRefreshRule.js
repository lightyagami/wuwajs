"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFixedDateTimeRefreshRule = undefined;
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbFixedDateTimeRefreshRule {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.ZDh = false;
    this.eBh = 0;
    this.tBh = false;
    this.iBh = 0;
    this.rBh = false;
    this.oBh = 0;
    this.nBh = false;
    this.sBh = 0;
    this.f_h = false;
    this.X6o = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbFixedDateTimeRefreshRule(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Hours() {
    if (!this.ZDh) {
      this.ZDh = true;
      this.eBh = this.FbDataInternal.hours();
    }
    return this.eBh;
  }
  get Minutes() {
    if (!this.tBh) {
      this.tBh = true;
      this.iBh = this.FbDataInternal.minutes();
    }
    return this.iBh;
  }
  get Seconds() {
    if (!this.rBh) {
      this.rBh = true;
      this.oBh = this.FbDataInternal.seconds();
    }
    return this.oBh;
  }
  get RefreshRate() {
    if (!this.nBh) {
      this.nBh = true;
      this.sBh = this.FbDataInternal.refreshRate();
    }
    return this.sBh;
  }
  get Condition() {
    if (!this.f_h) {
      this.f_h = true;
      this.X6o = FbConditionGroup_1.FbConditionGroup.Create(this.FbDataInternal.condition());
    }
    return this.X6o;
  }
}
exports.FbFixedDateTimeRefreshRule = FbFixedDateTimeRefreshRule;
//# sourceMappingURL=FbFixedDateTimeRefreshRule.js.map