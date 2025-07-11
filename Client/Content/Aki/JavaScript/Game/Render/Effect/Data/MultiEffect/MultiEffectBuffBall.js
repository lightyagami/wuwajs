"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiEffectBuffBall = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const MultiEffectBase_1 = require("./MultiEffectBase");
class MultiEffectBuffBall extends MultiEffectBase_1.default {
  constructor() {
    super(...arguments);
    this.BaseNum = 0;
    this.SpinSpeed = -0;
    this.Radius = -0;
    this.Zlr = -0;
    this.BaseAngle = -0;
    this.TempUeVector = undefined;
  }
  Init(t) {
    super.Init(t);
    this.BaseNum = t.get("BaseNum");
    this.SpinSpeed = t.get("SpinSpeed");
    this.Radius = t.get("Radius");
    this.TempUeVector = new UE.VectorDouble();
    this.Zlr = 0.01;
    this.BaseAngle = 0;
  }
  GetDesiredNum(t) {
    return Math.ceil(this.BaseNum * t - this.Zlr);
  }
  Update(t, s, e) {
    var i = e.length;
    this.BaseAngle -= t * this.SpinSpeed;
    var t = this.BaseNum * s;
    var s = Math.floor(t);
    var t = t - s;
    var h = Math.PI * 2 / MathUtils_1.MathUtils.Lerp(s, s + 1, t);
    var f = Math.min(s, i);
    for (let t = 0; t < f; t++) {
      var a = h * t + this.BaseAngle;
      this.TempUeVector.Set(Math.cos(a) * this.Radius, Math.sin(a) * this.Radius, 0);
      var a = e[t];
      if (EffectSystem_1.EffectSystem.IsValid(a)) {
        EffectSystem_1.EffectSystem.GetEffectActor(a).D_K2_SetActorRelativeLocation(this.TempUeVector, false, undefined, true);
      }
    }
    if (f < i && (s = h * f + this.BaseAngle, i = (2 - t) * t * this.Radius, this.TempUeVector.Set(Math.cos(s) * i, Math.sin(s) * i, 0), t = e[f], EffectSystem_1.EffectSystem.IsValid(t))) {
      EffectSystem_1.EffectSystem.GetEffectActor(t).D_K2_SetActorRelativeLocation(this.TempUeVector, false, undefined, true);
    }
  }
}
exports.MultiEffectBuffBall = MultiEffectBuffBall;
//# sourceMappingURL=MultiEffectBuffBall.js.map