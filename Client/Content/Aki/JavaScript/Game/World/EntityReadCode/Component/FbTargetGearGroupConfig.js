"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTargetGearGroupConfig = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbCheckGearHit_1 = require("./FbCheckGearHit");
const UnionGroupFinishConfigHelper_1 = require("./UnionGroupFinishConfigHelper");
const UnionTargetGearGroupFailureConditionHelper_1 = require("./UnionTargetGearGroupFailureConditionHelper");
const UnionTargetGearGroupSuccessConditionHelper_1 = require("./UnionTargetGearGroupSuccessConditionHelper");
class FbTargetGearGroupConfig {
  constructor(i) {
    this.FbDataInternal = i;
    this.ROh = false;
    this.wOh = undefined;
    this.POh = false;
    this.UOh = undefined;
    this.DOh = false;
    this.BOh = undefined;
    this.qOh = false;
    this.kOh = undefined;
    this.GOh = false;
    this.OOh = undefined;
  }
  static Create(i) {
    if (i) {
      return new FbTargetGearGroupConfig(i);
    }
  }
  get Entitys() {
    if (!this.ROh) {
      this.ROh = true;
      this.wOh = new Array();
      var e = this.FbDataInternal.entitysLength();
      if (e) {
        for (let i = 0; i < e; ++i) {
          this.wOh.push(this.FbDataInternal.entitys(i));
        }
      }
    }
    return this.wOh;
  }
  get SuccessCondition() {
    var i;
    var e;
    if (!this.POh && (this.POh = true, i = this.FbDataInternal.successConditionType(), e = UnionTargetGearGroupSuccessConditionHelper_1.UnionTargetGearGroupSuccessConditionHelper.GetUnionTargetGearGroupSuccessConditionObject(i))) {
      this.UOh = UnionTargetGearGroupSuccessConditionHelper_1.UnionTargetGearGroupSuccessConditionHelper.ReadUnionTargetGearGroupSuccessCondition(i, this.FbDataInternal.successCondition(e));
    }
    return this.UOh;
  }
  get FailureConditions() {
    if (!this.DOh) {
      this.DOh = true;
      this.BOh = new Array();
      var e = this.FbDataInternal.failureConditionsLength();
      if (e) {
        for (let i = 0; i < e; ++i) {
          var r = this.FbDataInternal.failureConditionsType(i);
          var t = UnionTargetGearGroupFailureConditionHelper_1.UnionTargetGearGroupFailureConditionHelper.GetUnionTargetGearGroupFailureConditionObject(r);
          if (t && (r = UnionTargetGearGroupFailureConditionHelper_1.UnionTargetGearGroupFailureConditionHelper.ReadUnionTargetGearGroupFailureCondition(r, this.FbDataInternal.failureConditions(i, t))) !== undefined) {
            this.BOh.push(r);
          }
        }
      }
    }
    return this.BOh;
  }
  get CheckGears() {
    if (!this.qOh) {
      this.qOh = true;
      this.kOh = new Array();
      var e = this.FbDataInternal.checkGearsLength();
      if (e) {
        for (let i = 0; i < e; ++i) {
          var r = this.FbDataInternal.checkGears(i, new fb_component_1.CheckGearHit());
          this.kOh.push(FbCheckGearHit_1.FbCheckGearHit.Create(r));
        }
      }
    }
    return this.kOh;
  }
  get FinishConfig() {
    var i;
    var e;
    if (!this.GOh && (this.GOh = true, i = this.FbDataInternal.finishConfigType(), e = UnionGroupFinishConfigHelper_1.UnionGroupFinishConfigHelper.GetUnionGroupFinishConfigObject(i))) {
      this.OOh = UnionGroupFinishConfigHelper_1.UnionGroupFinishConfigHelper.ReadUnionGroupFinishConfig(i, this.FbDataInternal.finishConfig(e));
    }
    return this.OOh;
  }
}
exports.FbTargetGearGroupConfig = FbTargetGearGroupConfig;
//# sourceMappingURL=FbTargetGearGroupConfig.js.map