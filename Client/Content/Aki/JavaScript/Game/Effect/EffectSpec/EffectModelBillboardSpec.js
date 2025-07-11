"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectModelBillboardSpec = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const EffectSpec_1 = require("./EffectSpec");
class EffectModelBillboardSpec extends EffectSpec_1.EffectSpec {
  constructor() {
    super(...arguments);
    this.BillboardComponent = undefined;
    this.t0e = false;
  }
  OnInit() {
    var t = this.Handle.GetSureEffectActor();
    var s = new UE.Transform();
    this.BillboardComponent = t.AddComponentByClass(UE.KuroBillboardComponent.StaticClass(), false, s, false);
    this.t0e = this.BillboardComponent.IsComponentTickEnabled();
    this.BillboardComponent.SetComponentTickEnabled(false);
    return true;
  }
  OnStart() {
    if (this.BillboardComponent) {
      this.BillboardComponent.SetActive(false, true);
    }
    return true;
  }
  OnClear() {
    this.BillboardComponent?.K2_DestroyComponent(this.Handle.GetSureEffectActor());
    return true;
  }
  OnStop(t, s) {
    if (this.BillboardComponent?.IsValid()) {
      this.BillboardComponent.SetComponentTickEnabled(false);
    }
  }
  OnPlay() {
    if (this.BillboardComponent?.IsValid()) {
      this.BillboardComponent.Initialize();
      this.BillboardComponent.SetComponentTickEnabled(this.t0e);
      this.BillboardComponent.SetActive(true, true);
      this.BillboardComponent.IsUpdateEveryFrame = this.EffectModel.IsUpdateEveryFrame;
      this.BillboardComponent.OrientAxis = this.EffectModel.OrientAxis;
      this.BillboardComponent.IsFixSize = this.EffectModel.IsFixSize;
      this.BillboardComponent.ScaleSize = this.EffectModel.ScaleSize;
      this.BillboardComponent.MaxDistance = this.EffectModel.MaxDistance;
      this.BillboardComponent.MinSize = this.EffectModel.MinSize;
    }
  }
  OnTick(t) {
    this.BillboardComponent.Update();
  }
  IsOverrideTick() {
    return true;
  }
  RegisterToKuroEffectSystem() {
    var t;
    if (this.Handle && this.BillboardComponent && this.EffectModel && (t = this.Handle.GetSureEffectActor())) {
      this.HasInitTickOptimize = true;
      cpp_1.FKuroEffectSystemInterface.RegisterEffectCommonHandle(this.Handle.Id, this.Handle.Parent?.Id ?? 0, this.EffectModel, t, this.BillboardComponent);
    }
  }
}
exports.EffectModelBillboardSpec = EffectModelBillboardSpec;
//# sourceMappingURL=EffectModelBillboardSpec.js.map