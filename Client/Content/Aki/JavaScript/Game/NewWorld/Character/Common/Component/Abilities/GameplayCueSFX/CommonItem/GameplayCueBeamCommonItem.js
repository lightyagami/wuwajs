"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayCueBeamCommonItem = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../../../../../Core/Actor/ActorSystem");
const ResourceSystem_1 = require("../../../../../../../../Core/Resource/ResourceSystem");
const Rotator_1 = require("../../../../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../../../../../GlobalData");
const RecorderBlueprintFunctionLibrary_1 = require("../../../../../../../Recorder/RecorderBlueprintFunctionLibrary");
class GameplayCueBeamCommonItem {
  constructor(t, e) {
    this.OQt = t;
    this.Path = e;
    this.a$o = undefined;
    this.h$o = 0;
    this.dce = false;
    this.CurrentPoints = undefined;
  }
  static Spawn(t, e) {
    t = new this(t, e);
    t.dce = true;
    t.a$o = t.l$o();
    return t;
  }
  Tick(e, t) {
    this.CurrentPoints = e;
    this.a$o.GetOwner().D_K2_SetActorLocation(this.OQt.D_K2_GetActorLocation(), false, undefined, true);
    var r = e.length;
    if (r !== this.h$o) {
      this._$o(r);
    }
    for (let t = 0; t < r; t++) {
      this.a$o.D_SetLocationAtSplinePoint(t, e[t], 1);
    }
  }
  Destroy() {
    if (RecorderBlueprintFunctionLibrary_1.default.Recording) {
      RecorderBlueprintFunctionLibrary_1.default.StopRecordGameplayCueHook(this);
    }
    this.dce = false;
    if (this.a$o.GetOwner()) {
      ActorSystem_1.ActorSystem.Put("GameplayCueBeamCommonItem.Destroy", this.a$o.GetOwner());
    }
  }
  GetOwner() {
    return this.a$o.GetOwner();
  }
  l$o() {
    const r = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), this.OQt.D_GetTransform());
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      r.SetActorLabel(this.OQt.GetActorLabel() + ":" + GameplayCueBeamCommonItem.name);
    }
    const i = r.AddComponentByClass(UE.SplineComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
    i.ClearSplinePoints();
    ResourceSystem_1.ResourceSystem.LoadAsync(this.Path, UE.NiagaraSystem, t => {
      var e;
      if (this.dce && t?.IsValid() && r?.IsValid() && ((e = r.AddComponentByClass(UE.NiagaraComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false)).SetAsset(t), UE.KuroRenderingRuntimeBPPluginBPLibrary.SetNiagaraSplineComponent(e, "NewSpline", i), RecorderBlueprintFunctionLibrary_1.default.Recording)) {
        RecorderBlueprintFunctionLibrary_1.default.StartRecordGameplayCueHook(r, this);
      }
    });
    return i;
  }
  _$o(e) {
    if (e > this.h$o) {
      for (let t = 0; t < e - this.h$o; t++) {
        var r = this.h$o + t;
        var r = new UE.SplinePoint(r, Vector_1.Vector.ZeroVector, Vector_1.Vector.ZeroVector, Vector_1.Vector.ZeroVector, Rotator_1.Rotator.ZeroRotator, Vector_1.Vector.OneVector, 0);
        this.a$o.AddPoint(r);
      }
    } else {
      for (let t = this.h$o - 1; t >= e; t--) {
        this.a$o.RemoveSplinePoint(t);
      }
    }
    this.h$o = e;
  }
}
exports.GameplayCueBeamCommonItem = GameplayCueBeamCommonItem;
//# sourceMappingURL=GameplayCueBeamCommonItem.js.map