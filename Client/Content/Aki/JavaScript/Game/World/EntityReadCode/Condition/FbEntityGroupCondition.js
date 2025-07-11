"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEntityGroupCondition = undefined;
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition");
const FbEntityEventCondition_1 = require("./FbEntityEventCondition");
class FbEntityGroupCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.luh = false;
    this.v4i = 0;
    this._ch = false;
    this.cch = undefined;
    this.ich = false;
    this.rch = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEntityGroupCondition(t);
    }
  }
  get Count() {
    if (!this.luh) {
      this.luh = true;
      this.v4i = this.FbDataInternal.count();
    }
    return this.v4i;
  }
  get Compare() {
    if (!this._ch) {
      this._ch = true;
      this.cch = this.FbDataInternal.compare();
    }
    return this.cch;
  }
  get Conditions() {
    if (!this.ich) {
      this.ich = true;
      this.rch = new Array();
      var i = this.FbDataInternal.conditionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var n = this.FbDataInternal.conditions(t, new fb_condition_1.EntityEventCondition());
          this.rch.push(FbEntityEventCondition_1.FbEntityEventCondition.Create(n));
        }
      }
    }
    return this.rch;
  }
}
exports.FbEntityGroupCondition = FbEntityGroupCondition;
//# sourceMappingURL=FbEntityGroupCondition.js.map