"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbWalkingPatternComponent = undefined;
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbWalkingPatternComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.kuh = false;
    this.Guh = 0;
    this.zYh = false;
    this.JYh = 0;
    this.ZYh = false;
    this.ezh = undefined;
    this.tzh = false;
    this.izh = 0;
    this.rzh = false;
    this.ozh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbWalkingPatternComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get SplineEntityId() {
    if (!this.kuh) {
      this.kuh = true;
      this.Guh = this.FbDataInternal.splineEntityId();
    }
    return this.Guh;
  }
  get EndEntityId() {
    if (!this.zYh) {
      this.zYh = true;
      this.JYh = this.FbDataInternal.endEntityId();
    }
    return this.JYh;
  }
  get ScoreVar() {
    var t;
    var i;
    if (!this.ZYh && (this.ZYh = true, t = this.FbDataInternal.scoreVarType(), i = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) {
      this.ezh = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.scoreVar(i));
    }
    return this.ezh;
  }
  get SpineEffectExistDuration() {
    if (!this.tzh) {
      this.tzh = true;
      this.izh = this.FbDataInternal.spineEffectExistDuration();
    }
    return this.izh;
  }
  get ReplaySpineEffect() {
    if (!this.rzh) {
      this.rzh = true;
      this.ozh = this.FbDataInternal.replaySpineEffect();
    }
    return this.ozh;
  }
}
exports.FbWalkingPatternComponent = FbWalkingPatternComponent;
//# sourceMappingURL=FbWalkingPatternComponent.js.map