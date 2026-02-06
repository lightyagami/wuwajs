"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindSunSpiritGuideLine = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../../GlobalData");
class FindSunSpiritGuideLine {
  constructor() {
    this.Hnr = undefined;
    this.zie = undefined;
    this._9r = undefined;
    this.tat = "";
    this.rvi = 0;
    this.P9f = undefined;
    this.A9f = () => {
      this.P9f = undefined;
      if (EffectSystem_1.EffectSystem.IsValid(this.rvi)) {
        EffectSystem_1.EffectSystem.StopEffectById(this.rvi, "[FindSunSpiritGuideLine.Clear]", false);
      }
    };
  }
  Init(t) {
    if (this.Hnr?.IsValid()) {
      this.Hnr.D_K2_SetActorTransform(t.ToUeTransform(), false, undefined, true);
    } else {
      t = ActorSystem_1.ActorSystem.Get(UE.BP_BasePathLine_C.StaticClass(), t.ToUeTransform());
      (t = (this.Hnr = t).GetComponentByClass(UE.SplineComponent.StaticClass())).ClearSplinePoints();
      this.zie = t;
      this._9r = UE.NewArray(UE.VectorDouble);
    }
  }
  Clear() {
    this.zie = undefined;
    this._9r = undefined;
    this.P9f?.Remove();
    this.P9f = undefined;
    var t = () => {
      if (this.Hnr?.IsValid()) {
        ActorSystem_1.ActorSystem.Put("FindSunSpiritGuideLine.Clear", this.Hnr);
        this.Hnr = undefined;
      }
    };
    var i = this.rvi;
    if (EffectSystem_1.EffectSystem.IsValid(i)) {
      EffectSystem_1.EffectSystem.AddFinishCallback(i, t);
      EffectSystem_1.EffectSystem.StopEffectById(i, "[FindSunSpiritGuideLine.Clear]", false);
    } else {
      t();
    }
  }
  SpawnGuideLine(t, i, e) {
    if (this.Hnr?.IsValid()) {
      if (EffectSystem_1.EffectSystem.IsValid(this.rvi)) {
        if (t === this.tat) {
          this.D9f(i);
          this.P9f?.Remove();
          this.P9f = TimerSystem_1.GameplayTimerSystem.Delay(this.A9f, e);
          return;
        }
        EffectSystem_1.EffectSystem.StopEffectById(this.rvi, "[FindSunSpiritGuideLine.Clear]", false);
      }
      var s = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, MathUtils_1.MathUtils.DefaultTransformDouble, t, "[FindSunSpiritGuideLine.SpawnGuideLine]", new EffectContext_1.EffectContext(undefined, this.Hnr));
      if (EffectSystem_1.EffectSystem.IsValid(s)) {
        this.rvi = s;
        this.tat = t;
        EffectSystem_1.EffectSystem.GetEffectActor(s).K2_AttachToActor(this.Hnr, undefined, 2, 2, 2, false);
        this.D9f(i);
        this.P9f = TimerSystem_1.GameplayTimerSystem.Delay(this.A9f, e);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelPlay", 48, "虚影找日灵SpawnGuideLine失败");
      }
    }
  }
  D9f(t) {
    this._9r.Empty();
    for (const i of t) {
      this._9r.Add(i.ToUeVector());
    }
    this.zie.D_SetSplinePoints(this._9r, 1, true);
  }
}
exports.FindSunSpiritGuideLine = FindSunSpiritGuideLine;
//# sourceMappingURL=FindSunSpiritGuideLine.js.map