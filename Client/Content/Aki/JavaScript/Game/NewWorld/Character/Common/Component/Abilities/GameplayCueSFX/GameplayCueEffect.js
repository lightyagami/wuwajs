"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayCueEffect = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../../../Core/Common/Log");
const FNameUtil_1 = require("../../../../../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const SkeletalMeshEffectContext_1 = require("../../../../../../Effect/EffectContext/SkeletalMeshEffectContext");
const EffectSystem_1 = require("../../../../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../../../../GlobalData");
const EffectUtil_1 = require("../../../../../../Utils/EffectUtil");
const CharacterNameDefines_1 = require("../../../CharacterNameDefines");
const GameplayCueMagnitude_1 = require("./GameplayCueMagnitude");
const RATE = 50;
const VOLUME_MIN = 5;
const VOLUME_MAX = 60;
class GameplayCueEffect extends GameplayCueMagnitude_1.GameplayCueMagnitude {
  constructor() {
    super(...arguments);
    this.EffectViewHandle = 0;
    this.TargetMesh = undefined;
    this.TargetSocket = undefined;
    this.gRa = undefined;
    this.RelativeTransform = undefined;
    this.IsSeekNeedProcess = false;
    this.SocketTransform = Transform_1.Transform.Create();
    this.TargetTransform = Transform_1.Transform.Create();
    this.EffectTimeScaleType = 0;
    this.mmd = t => {
      if (this.TargetMesh?.GetName() === t) {
        this.SetTargetMeshAndSocket();
        this.AttachEffect(true);
        this.fmd();
      }
    };
  }
  OnInit() {
    super.OnInit();
    if (this.IsInstant && this.CueConfig.Magni !== 0 && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 28, "瞬间型Buff特效不能应用特效幅度，因为瞬间型Buff特效依赖特效自身管理生命周期", ["BuffId", this.BuffId], ["CueId", this.CueConfig.Id]);
    }
    var t = Vector_1.Vector.Create(this.CueConfig.Location.X, this.CueConfig.Location.Y, this.CueConfig.Location.Z);
    var e = Rotator_1.Rotator.Create(this.CueConfig.Rotation.X, this.CueConfig.Rotation.Y, this.CueConfig.Rotation.Z);
    var s = Vector_1.Vector.Create(this.CueConfig.Scale.X, this.CueConfig.Scale.Y, this.CueConfig.Scale.Z);
    this.RelativeTransform = Transform_1.Transform.Create(e.Quaternion(), t, s);
    if (this.CueConfig.Parameters.length === 0 || this.CueConfig.Parameters[0] !== "0") {
      this.IsSeekNeedProcess = true;
    } else {
      this.IsSeekNeedProcess = false;
    }
  }
  OnTick(t) {
    super.OnTick(t);
  }
  OnCreate() {
    this.SetTargetMeshAndSocket();
    this.EffectViewHandle = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, this.RelativeTransform.ToUeTransform(), this.GetPath(), "[GameplayCueEffect.OnCreate]", this.z5a(), 0, t => {
      this.BeginCallback?.();
      if (this.UseMagnitude()) {
        EffectSystem_1.EffectSystem.FreezeHandle(t, true);
      }
    });
    if (this.y$o()) {
      this.EffectTimeScaleType = this.D9u();
      this.CueComp.AddCueEffectToSet(this.EffectViewHandle, this.EffectTimeScaleType);
      this.AttachEffect();
      this.I$o();
      super.OnCreate();
    }
  }
  OnDestroy() {
    super.OnDestroy();
    if (EffectSystem_1.EffectSystem.IsValid(this.EffectViewHandle)) {
      EffectSystem_1.EffectSystem.SetTimeScale(this.EffectViewHandle, 1);
      switch (this.CueConfig.EndRule) {
        case 0:
          EffectSystem_1.EffectSystem.StopEffectById(this.EffectViewHandle, "[GameplayCueEffect.OnDestroy]", true);
          break;
        case 1:
          this.kBu();
          EffectSystem_1.EffectSystem.StopEffectById(this.EffectViewHandle, "[GameplayCueEffect.OnDestroy]", false);
          break;
        case 2:
          EffectSystem_1.EffectSystem.FreezeHandle(this.EffectViewHandle, false);
          this.kBu();
          EffectSystem_1.EffectSystem.StopEffectById(this.EffectViewHandle, "[GameplayCueEffect.OnDestroy]", false);
      }
    }
    if (this.CueConfig.Comp === 2) {
      this.gRa?.RemoveBuffEffect(this.EffectViewHandle);
      this.fmd();
    }
  }
  kBu() {
    var t = this.EntityHandle.Entity?.GetComponent(126);
    if (t && this.EffectTimeScaleType === 0) {
      EffectUtil_1.EffectUtil.ListenForeverTimeScale(this.EffectViewHandle, t);
    }
  }
  OnSetMagnitude(t) {
    if (this.IsSeekNeedProcess) {
      EffectSystem_1.EffectSystem.HandleSeekToTimeWithProcess(this.EffectViewHandle, t, true);
    } else {
      EffectSystem_1.EffectSystem.HandleSeekToTime(this.EffectViewHandle, t, true);
    }
  }
  OnChangeRole(t) {
    super.OnChangeRole(t);
    this.SetTargetMeshAndSocket();
    this.AttachEffect(true);
    EffectSystem_1.EffectSystem.AttachSkeletalMesh(this.EffectViewHandle, this.z5a());
  }
  AttachEffect(t = false) {
    var e = EffectSystem_1.EffectSystem.GetEffectActor(this.EffectViewHandle);
    if (this.CueConfig.Comp === 1 || this.CueConfig.Comp === 2) {
      this.T$o(e);
      e.K2_AttachToComponent(this.TargetMesh, this.TargetSocket, this.CueConfig.LocRule, this.CueConfig.RotaRule, this.CueConfig.SclRule, false);
      if (this.CueConfig.Comp === 2) {
        this.gRa?.AddBuffEffect(this.EffectViewHandle);
      }
    } else if (!t) {
      this.SocketTransform.FromUeTransform(this.TargetMesh.D_GetSocketTransform(this.TargetSocket));
      this.RelativeTransform.ComposeTransforms(this.SocketTransform, this.TargetTransform);
      e.D_K2_SetActorTransform(this.TargetTransform.ToUeTransform(), false, undefined, true);
    }
  }
  SetTargetMeshAndSocket() {
    if (this.CueConfig.Comp === 2) {
      this.gRa = this.E$o();
      if (this.gRa?.Mesh instanceof UE.SkeletalMeshComponent) {
        this.TargetMesh = this.gRa.Mesh;
      }
    } else {
      this.TargetMesh = this.S$o();
    }
    this.TargetSocket = FNameUtil_1.FNameUtil.GetDynamicFName(this.CueConfig.Socket);
    if (!this.TargetMesh?.DoesSocketExist(this.TargetSocket)) {
      this.TargetSocket = CharacterNameDefines_1.CharacterNameDefines.ROOT;
      if (this.CueConfig.Comp === 2) {
        this.gmd();
      }
    }
  }
  S$o() {
    if (this.ActorInternal?.IsValid()) {
      if (this.CueConfig.CompName === "Mesh") {
        return this.ActorInternal.Mesh;
      }
      var e = this.ActorInternal.K2_GetComponentsByClass(UE.MeshComponent.StaticClass());
      for (let t = 0; t < e.Num(); t++) {
        var s = e.Get(t);
        if (s instanceof UE.SkeletalMeshComponent && s.GetName() === this.CueConfig.CompName) {
          return s;
        }
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 28, "Cue信息错误！或者无法找到合适的组件", ["CueId", this.CueConfig.Id]);
      }
    }
  }
  M$o() {
    var t;
    if (this.ActorInternal?.IsValid() && this.CueConfig.Comp === 2 && (t = this.EntityHandle.Entity?.GetComponent(81))?.Valid) {
      return t;
    } else {
      return undefined;
    }
  }
  E$o() {
    if (this.ActorInternal?.IsValid() && this.CueConfig.Comp === 2) {
      var t = this.M$o();
      if (t) {
        t = t.GetWeaponMesh();
        if (t) {
          var e = parseInt(this.CueConfig.CompName.replace("WeaponCase", ""));
          if (!(e < 0) && !(e > t.CharacterWeapons.length)) {
            return t.CharacterWeapons[e];
          }
        }
      }
    }
  }
  T$o(t) {
    var e;
    var s = this.CueConfig.TargetScaleUp[0];
    var i = this.CueConfig.TargetScaleUp[1];
    if (!(i <= s)) {
      e = (0, puerts_1.$ref)(new UE.Vector());
      UE.KismetSystemLibrary.GetComponentBounds(this.TargetMesh, (0, puerts_1.$ref)(new UE.Vector()), e, (0, puerts_1.$ref)(0));
      e = (e = (0, puerts_1.$unref)(e)).X / RATE * e.Y / RATE * e.Z / RATE;
      e = ((e = MathUtils_1.MathUtils.Clamp(e, VOLUME_MIN, VOLUME_MAX)) - VOLUME_MIN) / (VOLUME_MAX - VOLUME_MIN) * (i - s) + s;
      t.D_SetActorScale3D(t.D_GetActorScale3D().op_Multiply(e));
    }
  }
  y$o() {
    var t;
    return !!EffectSystem_1.EffectSystem.IsValid(this.EffectViewHandle) && !!(t = EffectSystem_1.EffectSystem.GetEffectActor(this.EffectViewHandle)) && !!t.IsValid();
  }
  I$o() {
    if (this.EndCallback && !this.IsInstant) {
      EffectSystem_1.EffectSystem.AddFinishCallback(this.EffectViewHandle, t => {
        this.EndCallback?.();
      });
    }
  }
  z5a() {
    var t = new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(undefined);
    t.SkeletalMeshComp = this.TargetMesh;
    t.EntityId = this.EntityHandle.Id;
    return t;
  }
  D9u() {
    var t;
    if (this.BuffHandleId > 0 && (t = this.EntityHandle.Entity?.GetComponent(213)?.GetBuffByHandle(this.BuffHandleId)) && t.GetInstigator()?.GetComponent(0)?.IsRole()) {
      return 1;
    } else {
      return 0;
    }
  }
  gmd() {
    var t;
    if (!this.IsInstant && !!(t = this.EntityHandle.Entity)?.Valid && !EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharacterWeaponLoaded, this.mmd)) {
      EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.CharacterWeaponLoaded, this.mmd);
    }
  }
  fmd() {
    var t = this.EntityHandle.Entity;
    if (t && EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharacterWeaponLoaded, this.mmd)) {
      EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.CharacterWeaponLoaded, this.mmd);
    }
  }
}
exports.GameplayCueEffect = GameplayCueEffect;
//# sourceMappingURL=GameplayCueEffect.js.map