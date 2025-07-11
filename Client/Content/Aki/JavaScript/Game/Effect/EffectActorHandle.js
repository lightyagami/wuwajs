"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectActorHandle = undefined;
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const Time_1 = require("../../Core/Common/Time");
const Quat_1 = require("../../Core/Utils/Math/Quat");
const Transform_1 = require("../../Core/Utils/Math/Transform");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const NiagaraComponentHandle_1 = require("./NiagaraComponentHandle");
const REFRESH_ACTOR_LOCATION_INTERVAL = 60;
class EffectActorAction {
  DoAction(t, i) {}
}
class EffectActor_K2_AttachToComponent extends EffectActorAction {
  constructor() {
    super(...arguments);
    this.Parent = undefined;
    this.SocketName = undefined;
    this.LocationRule = 0;
    this.RotationRule = 0;
    this.ScaleRule = 0;
    this.WeldSimulatedBodies = false;
    this.RelativeTransform = undefined;
    this.GCe = 0;
    this.NCe = undefined;
  }
  DoAction(t, i) {
    if (this.Parent) {
      t.K2_AttachToComponent(this.Parent, this.SocketName, this.LocationRule, this.RotationRule, this.ScaleRule, this.WeldSimulatedBodies);
    }
  }
  UpdateChildTransform(t = false) {
    if (!this.NCe || this.GCe < Time_1.Time.Frame || t) {
      this.GCe = Time_1.Time.Frame;
      this.NCe = this.RelativeTransform.op_Multiply(this.Parent.D_GetSocketTransform(this.SocketName));
    }
  }
  GetLocation(t = 0) {
    this.UpdateChildTransform();
    return this.NCe.GetLocation();
  }
  GetRotation() {
    this.UpdateChildTransform();
    return this.NCe.Rotator();
  }
  GetScale() {
    this.UpdateChildTransform();
    return this.NCe.GetScale3D();
  }
  InitRelativeTransform(t, i) {
    this.RelativeTransform = i.GetRelativeTransform(this.Parent.D_GetSocketTransform(this.SocketName));
    if (this.LocationRule === 0) {
      if (t?.RelativeTransform) {
        this.RelativeTransform.SetLocation(t.RelativeTransform.GetLocation());
      } else {
        this.RelativeTransform.SetLocation(i.GetLocation());
      }
    } else if (this.LocationRule === 2) {
      this.RelativeTransform.SetLocation(Vector_1.Vector.ZeroVectorDouble);
    }
    if (this.RotationRule === 0) {
      if (t?.RelativeTransform) {
        this.RelativeTransform.SetRotation(t.RelativeTransform.GetRotation());
      } else {
        this.RelativeTransform.SetRotation(i.GetRotation());
      }
    } else if (this.RotationRule === 2) {
      this.RelativeTransform.SetRotation(Quat_1.Quat.Identity);
    }
    if (this.ScaleRule === 0) {
      if (t?.RelativeTransform) {
        this.RelativeTransform.SetScale3D(t.RelativeTransform.GetScale3D());
      } else {
        this.RelativeTransform.SetScale3D(i.GetScale3D());
      }
    } else if (this.ScaleRule === 2) {
      this.RelativeTransform.SetScale3D(Vector_1.Vector.OneVectorDouble);
    }
  }
}
class EffectActor_K2_AttachToActor extends EffectActor_K2_AttachToComponent {
  constructor() {
    super(...arguments);
    this.ParentActor = undefined;
  }
}
class EffectActorBeAttachedAction extends EffectActorAction {
  constructor() {
    super(...arguments);
    this.OCe = undefined;
    this.kCe = undefined;
    this.FCe = 0;
  }
  Init(t, i, s) {
    this.OCe = t;
    this.kCe = i;
    this.FCe = s;
  }
  DoAction(t, i) {
    i.ExecuteAttachToEffectSkeletalMesh(this.OCe, this.kCe, this.FCe);
  }
}
class EffectActorHandle {
  constructor() {
    this.ege = undefined;
    this.Transform = undefined;
    this.n8 = "";
    this.VCe = undefined;
    this.HCe = undefined;
    this.jCe = undefined;
    this.WCe = undefined;
    this.Fdc = undefined;
    this.KCe = undefined;
    this.QCe = true;
    this.XCe = -1;
  }
  get $Ce() {
    if (this.VCe) {
      if (!this.VCe.Parent?.IsValid()) {
        this.VCe = undefined;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("RenderEffect", 36, "AttachAction parent is inValid", ["path", this.n8]);
        }
      }
      return this.VCe;
    }
  }
  Init(t, i) {
    var s;
    if (t) {
      (s = Transform_1.Transform.Create()).FromUeTransform(t);
      this.Transform = s.ToUeTransform();
    } else {
      this.Transform = new UE.TransformDouble();
    }
    this.n8 = i;
    this.ege = undefined;
  }
  get NiagaraComponent() {
    this.jCe ||= new NiagaraComponentHandle_1.NiagaraComponentHandle();
    return this.jCe;
  }
  get NiagaraComponents() {
    this.WCe ||= new NiagaraComponentHandle_1.NiagaraComponentHandle();
    return this.WCe;
  }
  SetBeAttached(t, i, s) {
    this.HCe ||= new Array();
    var h = new EffectActorBeAttachedAction();
    h.Init(t, i, s);
    this.HCe.push(h);
  }
  IsValid() {
    return true;
  }
  SetActorHiddenInGame(t) {
    if (this.ege?.IsValid()) {
      this.ege.SetActorHiddenInGame(t);
    } else {
      this.Fdc = t;
    }
  }
  K2_AttachToActor(t, i, s, h, o, e) {
    var r;
    var n;
    var c;
    if (this.ege?.IsValid()) {
      this.ege.K2_AttachToActor(t, i, s, h, o, e);
    } else if (t) {
      if ((r = UE.KuroEffectLibrary.GetActorDefaultAttachComponent(t))?.IsValid()) {
        n = new EffectActor_K2_AttachToActor();
        c = this.VCe;
        n.ParentActor = t;
        n.Parent = r;
        n.SocketName = i;
        n.LocationRule = s;
        n.RotationRule = h;
        n.ScaleRule = o;
        n.WeldSimulatedBodies = e;
        this.VCe = n;
        this.VCe.InitRelativeTransform(c, this.Transform);
        this.JCe();
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderEffect", 36, "EffectActor_K2_AttachToActor attachComponent is null");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RenderEffect", 36, "EffectActor_K2_AttachToActor parent is null");
    }
  }
  K2_AttachToComponent(t, i, s, h, o, e) {
    var r;
    var n;
    if (this.ege?.IsValid()) {
      this.ege.K2_AttachToComponent(t, i, s, h, o, e);
    } else if (t?.IsValid) {
      r = new EffectActor_K2_AttachToComponent();
      n = this.VCe;
      r.Parent = t;
      r.SocketName = i;
      r.LocationRule = s;
      r.RotationRule = h;
      r.ScaleRule = o;
      r.WeldSimulatedBodies = e;
      this.VCe = r;
      this.VCe.InitRelativeTransform(n, this.Transform);
      this.JCe();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RenderEffect", 36, "EffectActor_K2_AttachToComponent parent is null");
    }
  }
  YCe() {
    this.QCe = true;
    if (this.$Ce) {
      this.$Ce.RelativeTransform = this.Transform.GetRelativeTransform(this.$Ce.Parent.D_GetSocketTransform(this.$Ce.SocketName));
    }
  }
  GetActorLocation() {
    if (this.$Ce) {
      this.XCe--;
    }
    if (this.XCe < 0) {
      this.QCe = true;
      this.XCe = REFRESH_ACTOR_LOCATION_INTERVAL;
    }
    if (this.QCe) {
      this.QCe = false;
      this.KCe = this.D_K2_GetActorLocation();
    }
    return this.KCe;
  }
  D_K2_GetActorLocation() {
    if (this.ege?.IsValid()) {
      return this.ege.D_K2_GetActorLocation();
    }
    let t = this.$Ce?.GetLocation();
    return t = t || this.Transform.GetLocation();
  }
  K2_GetActorRotation() {
    if (this.ege?.IsValid()) {
      return this.ege.K2_GetActorRotation();
    }
    let t = this.$Ce?.GetRotation();
    return t = t || this.Transform.GetRotation().Rotator();
  }
  GetActorScale3D() {
    if (this.ege?.IsValid()) {
      return this.ege.GetActorScale3D();
    }
    let t = this.$Ce?.GetScale();
    t = t || this.Transform.GetScale3D();
    return UE.KismetMathLibrary.Conv_VectorDoubleToVector(t);
  }
  D_GetActorScale3D() {
    if (this.ege?.IsValid()) {
      return this.ege.D_GetActorScale3D();
    }
    let t = this.$Ce?.GetScale();
    return t = t || this.Transform.GetScale3D();
  }
  K2_SetActorLocation(t, i, s, h) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RenderEffect", 38, "函数不允许再被调用!,请使用 D_ 版本。");
    }
    return false;
  }
  D_K2_SetActorLocation(t, i, s, h) {
    if (this.ege?.IsValid()) {
      return this.ege.D_K2_SetActorLocation(t, i, s, h);
    } else {
      return !!t && (this.Transform.SetLocation(t), this.JCe(true), this.YCe(), true);
    }
  }
  K2_SetActorRotation(t, i) {
    if (this.ege?.IsValid()) {
      return this.ege.K2_SetActorRotation(t, i);
    } else {
      return !!t && (this.Transform.SetRotation(t.Quaternion()), this.JCe(false, true), this.YCe(), true);
    }
  }
  SetActorScale3D(t) {
    if (this.ege?.IsValid()) {
      this.ege.SetActorScale3D(t);
    } else if (t) {
      t = UE.KismetMathLibrary.Conv_VectorToVectorDouble(t);
      this.Transform.SetScale3D(t);
      this.JCe(false, false, true);
      this.YCe();
    }
  }
  D_SetActorScale3D(t) {
    if (this.ege?.IsValid()) {
      this.ege.D_SetActorScale3D(t);
    } else if (t) {
      this.Transform.SetScale3D(t);
      this.JCe(false, false, true);
      this.YCe();
    }
  }
  K2_SetActorLocationAndRotation(t, i, s, h, o) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RenderEffect", 38, "函数不允许再被调用!,请使用 D_ 版本。");
    }
    return false;
  }
  D_K2_SetActorLocationAndRotation(t, i, s, h, o) {
    if (this.ege?.IsValid()) {
      return this.ege.D_K2_SetActorLocationAndRotation(t, i, s, h, o);
    } else {
      return !!t && !!i && !(this.Transform.SetLocation(t), this.Transform.SetRotation(i.Quaternion()), this.JCe(true, true), this.YCe(), 0);
    }
  }
  K2_AddActorWorldOffset(t, i, s, h) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RenderEffect", 38, "函数不允许再被调用!,请使用 D_ 版本。");
    }
  }
  D_K2_AddActorWorldOffset(t, i, s, h) {
    if (this.ege?.IsValid()) {
      this.ege.D_K2_AddActorWorldOffset(t, i, s, h);
    } else if (t) {
      i = this.Transform.GetLocation().op_Addition(t);
      this.Transform.SetLocation(i);
      this.JCe(true);
      this.YCe();
    }
  }
  K2_SetActorTransform(t, i, s, h) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RenderEffect", 38, "函数不允许再被调用!,请使用 D_ 版本。");
    }
    return false;
  }
  D_K2_SetActorTransform(t, i, s, h) {
    if (this.ege?.IsValid()) {
      return this.ege.D_K2_SetActorTransform(t, i, s, h);
    } else {
      return !!t && (this.Transform = t, this.YCe(), true);
    }
  }
  JCe(t = false, i = false, s = false) {
    if (!t) {
      this.QCe = true;
    }
    if (this.$Ce) {
      this.$Ce.UpdateChildTransform(true);
      if (!t) {
        if (t = this.$Ce.GetLocation()) {
          this.Transform.SetLocation(t);
        }
      }
      if (!i) {
        if (t = this.$Ce.GetRotation()) {
          this.Transform.SetRotation(t.Quaternion());
        }
      }
      if (!s) {
        if (i = this.$Ce.GetScale()) {
          this.Transform.SetScale3D(i);
        }
      }
    }
  }
  K2_SetActorRelativeLocation(t, i, s, h) {
    if (this.ege?.IsValid()) {
      this.ege.K2_SetActorRelativeLocation(t, i, s, h);
    } else if (t && this.$Ce && this.$Ce.LocationRule !== 2) {
      i = UE.KismetMathLibrary.Conv_VectorToVectorDouble(t);
      this.$Ce.RelativeTransform.SetLocation(i);
      this.JCe();
    }
  }
  D_K2_SetActorRelativeLocation(t, i, s, h) {
    if (this.ege?.IsValid()) {
      this.ege.D_K2_SetActorRelativeLocation(t, i, s, h);
    } else if (t && this.$Ce && this.$Ce.LocationRule !== 2) {
      this.$Ce.RelativeTransform.SetLocation(t);
      this.JCe();
    }
  }
  K2_SetActorRelativeRotation(t, i, s, h) {
    if (this.ege?.IsValid()) {
      this.ege.K2_SetActorRelativeRotation(t, i, s, h);
    } else if (t && this.$Ce && this.$Ce.RotationRule !== 2) {
      this.$Ce.RelativeTransform.SetRotation(t.Quaternion());
      this.JCe();
    }
  }
  K2_SetActorRelativeTransform(t, i, s, h) {
    if (this.ege?.IsValid()) {
      this.ege.K2_SetActorRelativeTransform(t, i, s, h);
    } else if (t && this.$Ce) {
      i = UE.KismetMathLibrary.Conv_TransformToTransformDouble(t);
      this.$Ce.RelativeTransform = i;
      this.JCe();
    }
  }
  D_K2_SetActorRelativeTransform(t, i, s, h) {
    if (this.ege?.IsValid()) {
      this.ege.D_K2_SetActorRelativeTransform(t, i, s, h);
    } else if (t && this.$Ce) {
      this.$Ce.RelativeTransform = t;
      this.JCe();
    }
  }
  K2_AddActorLocalTransform(t, i, s, h) {
    if (this.ege?.IsValid()) {
      this.ege.K2_AddActorLocalTransform(t, i, s, h);
    } else if (t) {
      i = UE.KismetMathLibrary.Conv_TransformToTransformDouble(t);
      if (this.$Ce) {
        this.$Ce.RelativeTransform = this.$Ce.RelativeTransform.op_Multiply(i);
        this.JCe();
      } else {
        this.Transform = this.Transform.op_Multiply(i);
        this.QCe = true;
      }
    }
  }
  InitEffectActor(t, i) {
    if (this.$Ce) {
      this.$Ce.DoAction(t, i);
    }
    if (this.HCe) {
      for (const o of this.HCe) {
        o.DoAction(t, i);
      }
    }
    var s;
    this.JCe();
    t.D_K2_SetActorTransform(this.Transform, false, undefined, false);
    if (this.Fdc !== undefined) {
      t.SetActorHiddenInGame(this.Fdc);
    }
    if (this.jCe) {
      s = t.GetComponentByClass(UE.NiagaraComponent.StaticClass());
      this.jCe.InitNiagaraComponent(s);
    }
    if (this.WCe) {
      var h = t.K2_GetComponentsByClass(UE.NiagaraComponent.StaticClass());
      for (let t = 0; t < h.Num(); t++) {
        this.WCe.InitNiagaraComponent(h.Get(t));
      }
    }
    this.ege = t;
  }
}
exports.EffectActorHandle = EffectActorHandle;
//# sourceMappingURL=EffectActorHandle.js.map