"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectModelMultiEffectSpec = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const EffectEnvironment_1 = require("../../Core/Effect/EffectEnvironment");
const EffectModelHelper_1 = require("../Render/Effect/Data/EffectModelHelper");
const MultiEffectBuffBall_1 = require("../Render/Effect/Data/MultiEffect/MultiEffectBuffBall");
const CustomMap_1 = require("../World/Define/CustomMap");
const EffectSpec_1 = require("./EffectSpec/EffectSpec");
const EffectSystem_1 = require("./EffectSystem");
class EffectModelMultiEffectSpec extends EffectSpec_1.EffectSpec {
  constructor() {
    super(...arguments);
    this.EffectSpecMap = new CustomMap_1.CustomMap();
    this.GroupComponent = undefined;
    this.MultiEffect = undefined;
  }
  OnInit() {
    var t = this.Handle.GetSureEffectActor();
    var e = this.Handle.Parent;
    var e = e ? e.GetEffectSpec()?.GetSceneComponent() : undefined;
    var t = EffectModelHelper_1.EffectModelHelper.AddSceneComponent(t, UE.SceneComponent.StaticClass(), e, undefined, false, this.EffectModel);
    this.SceneComponent = t;
    this.GroupComponent = t;
    return true;
  }
  OnStart() {
    var t = new Map();
    if (this.EffectModel.Type === 0) {
      t.set("BaseNum", this.EffectModel.BaseNum);
      t.set("SpinSpeed", this.EffectModel.SpinSpeed);
      t.set("Radius", this.EffectModel.Radius);
      this.MultiEffect = new MultiEffectBuffBall_1.MultiEffectBuffBall();
      this.MultiEffect.Init(t);
    }
    return true;
  }
  OnTick(t) {
    var e = this.EffectSpecMap.GetItems();
    var f = this.MultiEffect.GetDesiredNum(this.LifeTime.PassTime);
    this.AdjustNumber(f);
    this.MultiEffect.Update(t, this.LifeTime.PassTime, e);
    var i = this.Handle.GetSureEffectActor()?.bHidden ?? false;
    for (const c of e) {
      var s = EffectSystem_1.EffectSystem.GetSureEffectActor(c);
      if (s?.IsValid() && s.bHidden !== i) {
        EffectSystem_1.EffectSystem.SetEffectHidden(c, i, "EffectModelMultiEffectSpec.Tick");
      }
    }
  }
  OnEnd() {
    this.GroupComponent.GetOwner().K2_DestroyComponent(this.GroupComponent);
    return true;
  }
  OnStop(t) {
    var e = new Array();
    for (const f of this.EffectSpecMap.GetItems()) {
      if (EffectSystem_1.EffectSystem.IsValid(f)) {
        e.push(f);
      }
    }
    for (const i of e) {
      EffectSystem_1.EffectSystem.StopEffectById(i, t, true);
    }
    this.EffectSpecMap.Clear();
  }
  OnClear() {
    for (const t of this.EffectSpecMap.GetItems()) {
      if (EffectSystem_1.EffectSystem.IsValid(t)) {
        EffectSystem_1.EffectSystem.StopEffectById(t, "[EffectModelMultiEffectSpec.OnClear]", true);
      }
    }
    this.EffectSpecMap.Clear();
    return true;
  }
  AdjustNumber(t) {
    var e = this.EffectSpecMap.Size();
    if (e < t) {
      var f = this.Handle.GetSureEffectActor();
      var i = UE.KismetSystemLibrary.GetPathName(this.GetEffectModel().EffectData);
      const s = EffectSystem_1.EffectSystem.SpawnEffect(f.GetOuter(), f.D_GetTransform(), i, "[EffectModelMultiEffectSpec.EffectModelGroupSpec]", this.Handle.GetContext());
      if (EffectSystem_1.EffectSystem.IsValid(s) && (this.EffectSpecMap.Set(s, s), EffectSystem_1.EffectSystem.AddFinishCallback(s, t => {
        this.EffectSpecMap.Remove(t);
        if (EffectEnvironment_1.EffectEnvironment.OpenTickOptimize && this.Handle) {
          cpp_1.FKuroEffectSystemInterface.RemoveMultiEffect(this.Handle.Id, s);
        }
      }), EffectSystem_1.EffectSystem.GetEffectActor(s).K2_AttachToActor(this.Handle.GetSureEffectActor(), undefined, 1, 1, 1, false), EffectEnvironment_1.EffectEnvironment.OpenTickOptimize) && this.Handle) {
        cpp_1.FKuroEffectSystemInterface.AddMultiEffect(this.Handle.Id, s);
      }
    } else if (t < e && (i = this.EffectSpecMap.GetByIndex(f = e - 1)) && (this.EffectSpecMap.RemoveByIndex(f), EffectSystem_1.EffectSystem.StopEffectById(i, "[EffectModelMultiEffectSpec.AdjustNumber]", true), EffectEnvironment_1.EffectEnvironment.OpenTickOptimize) && this.Handle) {
      cpp_1.FKuroEffectSystemInterface.RemoveMultiEffect(this.Handle.Id, i);
    }
  }
  IsOverrideTick() {
    return true;
  }
}
exports.EffectModelMultiEffectSpec = EffectModelMultiEffectSpec;
//# sourceMappingURL=EffectModelMultiEffectSpec.js.map