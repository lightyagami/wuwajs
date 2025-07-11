"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbLevelAIState = undefined;
const UnionLevelAIBehaviourHelper_1 = require("./UnionLevelAIBehaviourHelper");
const FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbLevelAIState {
  constructor(t) {
    this.FbDataInternal = t;
    this.Q_h = false;
    this.K_h = 0;
    this.ewh = false;
    this.twh = undefined;
    this.f_h = false;
    this.X6o = undefined;
    this.iwh = false;
    this.rwh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbLevelAIState(t);
    }
  }
  get StateId() {
    if (!this.Q_h) {
      this.Q_h = true;
      this.K_h = this.FbDataInternal.stateId();
    }
    return this.K_h;
  }
  get StateName() {
    if (!this.ewh) {
      this.ewh = true;
      this.twh = this.FbDataInternal.stateName();
    }
    return this.twh;
  }
  get Condition() {
    if (!this.f_h) {
      this.f_h = true;
      this.X6o = FbConditionGroup_1.FbConditionGroup.Create(this.FbDataInternal.condition());
    }
    return this.X6o;
  }
  get Behaviour() {
    var t;
    var i;
    if (!this.iwh && (this.iwh = true, t = this.FbDataInternal.behaviourType(), i = UnionLevelAIBehaviourHelper_1.UnionLevelAIBehaviourHelper.GetUnionLevelAIBehaviourObject(t))) {
      this.rwh = UnionLevelAIBehaviourHelper_1.UnionLevelAIBehaviourHelper.ReadUnionLevelAIBehaviour(t, this.FbDataInternal.behaviour(i));
    }
    return this.rwh;
  }
}
exports.FbLevelAIState = FbLevelAIState;
//# sourceMappingURL=FbLevelAIState.js.map