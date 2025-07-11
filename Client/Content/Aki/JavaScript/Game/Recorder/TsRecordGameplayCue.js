"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const ResourceSystem_1 = require("../../Core/Resource/ResourceSystem");
const Rotator_1 = require("../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const GlobalData_1 = require("../GlobalData");
const tmpVector = Vector_1.Vector.Create();
const tmpVector2 = Vector_1.Vector.Create();
class TsRecordGameplayCue extends UE.KuroRecordEffect {
  constructor() {
    super(...arguments);
    this.Path = "";
    this.Position0 = new UE.Vector();
    this.BeamData = undefined;
    this.CurrentTime = 0;
    this.CurrentIndex = 0;
    this.SplineComponent = undefined;
  }
  Constructor() {
    this.CurrentTime = 0;
    this.CurrentIndex = 0;
    this.SplineComponent = undefined;
  }
  ReceiveBeginPlay() {
    this.SetActorTickEnabled(false);
  }
  ReceiveEndPlay(t) {
    this.OnStop();
  }
  OnPlay() {
    this.SpawnHookActorRecord();
  }
  OnStop() {
    var e = this.K2_GetComponentsByClass(UE.NiagaraComponent.StaticClass());
    for (let t = e.Num() - 1; t >= 0; --t) {
      this.K2_DestroyComponent(e.Get(t));
    }
    this.SetActorTickEnabled(false);
  }
  ReceiveTick(t) {
    this.CurrentTime += t;
    if (this.BeamData) {
      var e = this.BeamData.TimeLine.Num();
      if (!(e < 1)) {
        while (this.CurrentIndex < e && this.BeamData.TimeLine.Get(this.CurrentIndex) < this.CurrentTime) {
          ++this.CurrentIndex;
        }
        var i;
        var s;
        var r;
        var t = this.BeamData.PointPositions.Get(this.CurrentIndex);
        if (this.BeamData.TimeLine.Get(this.CurrentIndex) < this.CurrentTime) {
          this.SetSpline(1, t, t);
        } else if (this.CurrentIndex > 1) {
          i = this.BeamData.PointPositions.Get(this.CurrentIndex - 1);
          s = this.BeamData.TimeLine.Get(this.CurrentIndex - 1);
          r = this.BeamData.TimeLine.Get(this.CurrentIndex);
          this.SetSpline((this.CurrentTime - s) / (r - s), i, t);
        }
      }
    }
  }
  SpawnHookActorRecord() {
    var t;
    var e = ResourceSystem_1.ResourceSystem.Load(this.Path, UE.NiagaraSystem);
    if (e?.IsValid() && this.IsValid()) {
      (t = this.AddComponentByClass(UE.NiagaraComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false)).SetAsset(e);
      if (this.BeamData) {
        this.SetActorTickEnabled(true);
        this.SplineComponent = this.AddComponentByClass(UE.SplineComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
        this.SplineComponent.ClearSplinePoints();
        UE.KuroRenderingRuntimeBPPluginBPLibrary.SetNiagaraSplineComponent(t, "NewSpline", this.SplineComponent);
      } else {
        this.SetActorTickEnabled(false);
        e = UE.KismetMathLibrary.WD_WorldToLocal(GlobalData_1.GlobalData.World, new UE.VectorDouble(this.Position0));
        t.SetNiagaraVariableVec3("End", e);
      }
    }
  }
  SetSpline(e, i, s) {
    if (this.SplineComponent) {
      var r = this.SplineComponent.GetNumberOfSplinePoints();
      var h = i.Vectors.Num();
      var o = s.Vectors.Num();
      if (h !== 0 && o !== 0) {
        var a = Math.max(h, o);
        if (r < a) {
          for (let t = r; t < a; ++t) {
            var c = t;
            var c = new UE.SplinePoint(c, Vector_1.Vector.ZeroVector, Vector_1.Vector.ZeroVector, Vector_1.Vector.ZeroVector, Rotator_1.Rotator.ZeroRotator, Vector_1.Vector.OneVector, 0);
            this.SplineComponent.AddPoint(c);
          }
        } else if (a < r) {
          for (let t = r - 1; t >= a; --t) {
            this.SplineComponent.RemoveSplinePoint(t);
          }
        }
        for (let t = 0; t < a; ++t) {
          tmpVector.FromUeVector(i.Vectors.Get(Math.min(t, h - 1)));
          tmpVector2.FromUeVector(s.Vectors.Get(Math.min(t, o - 1)));
          Vector_1.Vector.Lerp(tmpVector, tmpVector2, e, tmpVector);
          this.SplineComponent.D_SetLocationAtSplinePoint(t, tmpVector.ToUeVector(), 1);
        }
      }
    }
  }
}
exports.default = TsRecordGameplayCue;
//# sourceMappingURL=TsRecordGameplayCue.js.map