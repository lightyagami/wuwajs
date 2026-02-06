"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var o;
  var f = arguments.length;
  var h = f < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, e, i, s);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (o = t[r]) {
        h = (f < 3 ? o(h) : f > 3 ? o(e, i, h) : o(e, i)) || h;
      }
    }
  }
  if (f > 3 && h) {
    Object.defineProperty(e, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiModelEffectComponent = exports.UiModelEffectPlayContext = undefined;
const UE = require("ue");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../../GlobalData");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
const UiModelComponentInterface_1 = require("../UiModelComponentInterface");
class UiModelEffectPlayContext {
  constructor() {
    this.EffectPath = undefined;
    this.Transform = MathUtils_1.MathUtils.DefaultTransformDouble;
    this.AttachTargetComponent = undefined;
    this.Attached = true;
    this.AttachLocationOnly = false;
    this.SocketName = FNameUtil_1.FNameUtil.EMPTY;
    this.IsForceShow = true;
    this.Location = Vector_1.Vector.ZeroVectorDouble;
    this.Rotator = Rotator_1.Rotator.ZeroRotator;
    this.Scale = Vector_1.Vector.OneVectorDouble;
    this.LocationRule = 0;
    this.RotationRule = 0;
    this.ScaleRule = 0;
    this.EffectType = 1;
    this.Callback = undefined;
  }
  Reset() {
    this.EffectPath = undefined;
    this.Transform = MathUtils_1.MathUtils.DefaultTransformDouble;
    this.AttachTargetComponent = undefined;
    this.Attached = true;
    this.AttachLocationOnly = false;
    this.SocketName = FNameUtil_1.FNameUtil.EMPTY;
    this.IsForceShow = true;
    this.Location = Vector_1.Vector.ZeroVectorDouble;
    this.Rotator = Rotator_1.Rotator.ZeroRotator;
    this.Scale = Vector_1.Vector.OneVectorDouble;
    this.LocationRule = 0;
    this.RotationRule = 0;
    this.ScaleRule = 0;
    this.EffectType = 1;
    this.Callback = undefined;
  }
}
exports.UiModelEffectPlayContext = UiModelEffectPlayContext;
let UiModelEffectComponent = class UiModelEffectComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments);
    this.led = new Set();
    this.Ywr = new Map();
    this.Jwr = undefined;
    this.rb1 = undefined;
    this.Zla = true;
    this.e1a = 0.5;
    this.t1a = 0.5;
    this.OnAnsBegin = t => {
      this.PlayEffectByAnsContext(t);
    };
    this.OnAnsEnd = t => {
      var e = t.EffectContext.AnsSlotName;
      if (!!e && !e.op_Equality(FNameUtil_1.FNameUtil.NONE) && !this.EBd(t)) {
        this.HideEffectByAnsContext(t);
      }
      this.StopEffectByAnsContext(t);
    };
  }
  OnInit() {
    this.Jwr = this.Owner.CheckGetComponent(6);
    this.rb1 = this.Owner.CheckGetComponent(0);
  }
  OnStart() {
    this.Jwr?.RegisterAnsTrigger("UiEffectAnsContext", this.OnAnsBegin, this.OnAnsEnd);
    ControllerHolder_1.ControllerHolder.UiModelEffectController.SetEffectAdditionTimeScaleEnable(true, this.Owner.Id);
  }
  OnEnd() {
    ControllerHolder_1.ControllerHolder.UiModelEffectController.SetEffectAdditionTimeScaleEnable(false, this.Owner.Id);
    this.DestroyAllEffect();
  }
  OnModelVisibleChange(t) {
    var e = this.rb1.GetDitherEffectValue();
    if (t && !this.Zla && e > this.e1a) {
      this.Zla = true;
      this.SetAllEffectShowState(this.Zla);
    }
    if (!t && this.Zla) {
      this.Zla = false;
      this.SetAllEffectShowState(this.Zla);
    }
    if (t) {
      this.VCm();
    } else {
      this.jCm();
    }
  }
  OnModelDitherEffectChange(t) {
    var e = this.rb1.GetVisible();
    if (t > this.e1a && !this.Zla && e) {
      this.Zla = true;
      this.SetAllEffectShowState(this.Zla);
    }
    if (t < this.t1a && this.Zla) {
      this.Zla = false;
      this.SetAllEffectShowState(this.Zla);
    }
  }
  PlayEffectOnRoot(t, e, i, s) {
    this.PlayEffectByPath(t, e, i, true, false, Vector_1.Vector.ZeroVectorDouble, Rotator_1.Rotator.ZeroRotator, Vector_1.Vector.OneVectorDouble, s);
  }
  PlayEffectByPath(t, i, s, o, f, h, r, n, a, e, c) {
    t = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, MathUtils_1.MathUtils.DefaultTransformDouble, t, "[RoleAnimStateEffectManager.PlayEffect]", e || new EffectContext_1.EffectContext(undefined, i), 1, t => {
      var e;
      var t = EffectSystem_1.EffectSystem.GetEffectActor(t);
      if (t && t.IsValid()) {
        if (o && !f) {
          t.K2_AttachToComponent(i, s, 0, 0, 0, false);
          e = new UE.TransformDouble(r, h, n);
          t.D_K2_SetActorRelativeTransform(e, false, undefined, true);
        } else {
          e = i.D_GetSocketTransform(s, 0);
          t.D_K2_SetActorLocationAndRotation(e.TransformPosition(h), e.TransformRotation(r.Quaternion()).Rotator(), false, undefined, true);
          t.D_SetActorScale3D(n);
        }
        t.SetActorHiddenInGame(!this.Zla && !a);
      }
    }, c);
    if (EffectSystem_1.EffectSystem.IsValid(t)) {
      this.led.add(t);
    }
    return t;
  }
  PlayEffectByContext(i) {
    var t = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, i.Transform, i.EffectPath, "[RoleAnimStateEffectManager.PlayEffect]", new EffectContext_1.EffectContext(undefined, i.AttachTargetComponent), i.EffectType, t => {
      var e;
      var t = EffectSystem_1.EffectSystem.GetEffectActor(t);
      if (t && t.IsValid()) {
        if (i.Attached && !i.AttachLocationOnly) {
          t.K2_AttachToComponent(i.AttachTargetComponent, i.SocketName, i.LocationRule, i.RotationRule, i.ScaleRule, false);
          e = new UE.TransformDouble(i.Rotator, i.Location, i.Scale);
          t.D_K2_SetActorRelativeTransform(e, false, undefined, true);
        } else {
          e = i.AttachTargetComponent.D_GetSocketTransform(i.SocketName, 0);
          t.D_K2_SetActorLocationAndRotation(e.TransformPosition(i.Location), e.TransformRotation(i.Rotator.Quaternion()).Rotator(), false, undefined, true);
          t.D_SetActorScale3D(i.Scale);
        }
        t.SetActorHiddenInGame(!this.Zla && !i.IsForceShow);
      }
    }, i.Callback);
    if (EffectSystem_1.EffectSystem.IsValid(t)) {
      this.led.add(t);
    }
    return t;
  }
  PlayEffectByAnsContext(t) {
    var e;
    if (!this.Ywr.has(t) && !t.PlayOnEnd) {
      e = this.PlayEffectByPath(t.EffectPath, t.MeshComponent, t.Socket, t.Attached, t.AttachLocationOnly, t.Location, t.Rotation, t.Scale, false, t.EffectContext);
      if (t.OnEffectSpawn) {
        t.OnEffectSpawn(t.MeshComponent, e);
      }
      this.Ywr.set(t, e);
      t.Handle = e;
    }
  }
  StopEffectByAnsContext(t) {
    var e;
    if (t.PlayOnEnd) {
      this.PlayEffectByPath(t.EffectPath, t.MeshComponent, t.Socket, t.Attached, t.AttachLocationOnly, t.Location, t.Rotation, t.Scale, false, t.EffectContext);
    } else if (e = this.Ywr.get(t)) {
      this.StopEffect(e, t.FasterStop);
      this.Ywr.delete(t);
    }
  }
  HideEffectByAnsContext(t) {
    t = this.Ywr.get(t);
    if (t) {
      EffectSystem_1.EffectSystem.SetEffectHidden(t, true);
    }
  }
  DestroyAllEffect() {
    if (this.led && this.led.size !== 0) {
      this.led.forEach(t => {
        if (EffectSystem_1.EffectSystem.IsValid(t)) {
          EffectSystem_1.EffectSystem.SetEffectHidden(t, true);
          EffectSystem_1.EffectSystem.StopEffectById(t, "[RoleAnimStateEffectManager.RecycleEffect]", true);
        }
      });
      this.led.clear();
      this.Ywr.clear();
    }
  }
  SetAllEffectShowState(e) {
    this.led.forEach(t => {
      EffectSystem_1.EffectSystem.SetEffectHidden(t, !e);
    });
  }
  VCm() {
    this.led.forEach(t => {
      EffectSystem_1.EffectSystem.SetAdditionTimeScale(18, t, 1);
    });
  }
  jCm() {
    this.led.forEach(t => {
      EffectSystem_1.EffectSystem.SetAdditionTimeScale(18, t, 0);
    });
  }
  StopEffect(t, e = true) {
    if (EffectSystem_1.EffectSystem.IsValid(t)) {
      EffectSystem_1.EffectSystem.StopEffectById(t, "[RoleAnimStateEffectManager.StopEffect]", e);
      this.led.delete(t);
    }
  }
  EBd(t) {
    var e = t.EffectContext.AnsSlotName;
    if (e !== undefined && !e.op_Equality(FNameUtil_1.FNameUtil.NONE)) {
      for (const s of this.Jwr.GetAnsContextSet("UiEffectAnsContext").AnsContextSet) {
        if (s !== t) {
          var i = s;
          if (i.ExistCount > 0 && i.EffectContext.AnsSlotName && i.EffectContext.AnsSlotName.op_Equality(e)) {
            return true;
          }
        }
      }
    }
    return false;
  }
};
UiModelEffectComponent = __decorate([(0, UiModelComponentInterface_1.RegisterUiModelComponentImplements)(0, 1), (0, UiModelComponentDefine_1.RegisterUiModelComponent)(4)], UiModelEffectComponent);
exports.UiModelEffectComponent = UiModelEffectComponent; //# sourceMappingURL=UiModelEffectComponent.js.map