"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneCharacterVehicleEffect = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EffectContext_1 = require("../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../GlobalData");
const MOTOR_DANQI = "/Game/Aki/Effect/DataAsset/Niagara/Common/Water/DA_Fx_SI3_Water_Moto_Danqi.DA_Fx_SI3_Water_Moto_Danqi";
const MOTOR_PUTONG = "/Game/Aki/Effect/DataAsset/Niagara/Common/Water/DA_Fx_SI3_Water_Moto_Putong.DA_Fx_SI3_Water_Moto_Putong";
const MOTOR_SHACHEN = "/Game/Aki/Effect/DataAsset/Niagara/Common/Snow/DA_Fx_Sl3_Moto_ShaChen.DA_Fx_Sl3_Moto_ShaChen";
const MOTOR_FALL_IN = "/Game/Aki/Effect/DataAsset/Niagara/Common/Water/DA_Fx_SI3_Water_Moto_Fall.DA_Fx_SI3_Water_Moto_Fall";
const MOTOR_SCREEN = "/Game/Aki/Effect/DataAsset/Niagara/Common/Snow/DA_Fx_Sl3_Motuo_Screen01.DA_Fx_Sl3_Motuo_Screen01";
const ICE_DQ = "/Game/Aki/Effect/DataAsset/Niagara/Common/Snow/DA_Fx_Sl3_Moto_Ice_DQ.DA_Fx_Sl3_Moto_Ice_DQ";
const ICE_PT = "/Game/Aki/Effect/DataAsset/Niagara/Common/Snow/DA_Fx_Sl3_Moto_Ice_PT.DA_Fx_Sl3_Moto_Ice_PT";
const ICE_SP_L = "/Game/Aki/Effect/DataAsset/Niagara/Common/Snow/DA_Fx_Sl3_Moto_Ice_SP_L.DA_Fx_Sl3_Moto_Ice_SP_L";
const ICE_SP_R = "/Game/Aki/Effect/DataAsset/Niagara/Common/Snow/DA_Fx_Sl3_Moto_Ice_SP_R.DA_Fx_Sl3_Moto_Ice_SP_R";
const ICE_ST = "/Game/Aki/Effect/DataAsset/Niagara/Common/Snow/DA_Fx_Sl3_Moto_Ice_ST.DA_Fx_Sl3_Moto_Ice_ST";
const SNOW_DQ = "/Game/Aki/Effect/DataAsset/Niagara/Common/Snow/DA_Fx_Sl3_Moto_Snow_DQ.DA_Fx_Sl3_Moto_Snow_DQ";
const SNOW_PT = "/Game/Aki/Effect/DataAsset/Niagara/Common/Snow/DA_Fx_Sl3_Moto_Snow_PT.DA_Fx_Sl3_Moto_Snow_PT";
const SNOW_SP_L = "/Game/Aki/Effect/DataAsset/Niagara/Common/Snow/DA_Fx_Sl3_Moto_Snow_SP_L.DA_Fx_Sl3_Moto_Snow_SP_L";
const SNOW_SP_R = "/Game/Aki/Effect/DataAsset/Niagara/Common/Snow/DA_Fx_Sl3_Moto_Snow_SP_R.DA_Fx_Sl3_Moto_Snow_SP_R";
const SNOW_ST = "/Game/Aki/Effect/DataAsset/Niagara/Common/Snow/DA_Fx_Sl3_Moto_Snow_ST.DA_Fx_Sl3_Moto_Snow_ST";
const MOTOR_EFFECT_SPEED_CLAMP = 100;
class SceneCharacterVehicleEffect {
  constructor() {
    this.Owner = undefined;
    this.IsReady = false;
    this.IsEnabled = false;
    this.MotorAttachHandle = 0;
    this.MotorAttachHandlePath = "";
    this.MotorScreenHandle = 0;
    this.CacheMaxSpeed = 0;
    this.EmptyUeTransform = new UE.TransformDouble();
    this.IsMotorState = false;
    this.FindNoWaterPhysicalMaterial = false;
    this.IsVehicleWaterState = false;
    this.IsBlackWave = false;
    this.EnviData = undefined;
  }
  Start(t) {
    if (t && (this.Owner = t, this.IsReady = true, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("RenderEffect", 83, "VehicleEffect Start", ["Owner", t.GetName()]);
    }
  }
  Enable() {
    if (this.IsReady && (this.IsEnabled = true, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("RenderEffect", 83, "WaterEffect Enabled", ["Owner", this.Owner.GetName()]);
    }
  }
  Disable() {
    if (this.IsEnabled && (EffectSystem_1.EffectSystem.IsValid(this.MotorAttachHandle) && (EffectSystem_1.EffectSystem.StopEffectById(this.MotorAttachHandle, "[SceneCharacterWaterEffect.Disable]", true), this.MotorAttachHandle = 0), EffectSystem_1.EffectSystem.IsValid(this.MotorScreenHandle) && (EffectSystem_1.EffectSystem.StopEffectById(this.MotorScreenHandle, "[SceneCharacterWaterEffect.Disable]", true), this.MotorScreenHandle = 0), this.MotorAttachHandlePath = "", this.IsEnabled = false, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("RenderEffect", 83, "WaterEffect Disabled", ["Owner", this.Owner.GetName()]);
    }
  }
  Tick() {
    if (!!this.IsEnabled && !this.IsVehicleWaterState && (this.MotorAttachHandlePath === MOTOR_PUTONG || this.MotorAttachHandlePath === MOTOR_DANQI)) {
      this.StopMotorAttachEffect();
    }
  }
  SetStateInWaterEnviData(t) {
    if (this.IsEnabled && t && (this.EnviData = t, this.IsMotorState)) {
      if (this.Owner.CharacterActorComponent?.Entity?.GetComponent(217)?.HasTag(232903598)) {
        if (!this.FindNoWaterPhysicalMaterial) {
          this.SpawnMotorAttachEffect(MOTOR_DANQI);
          this.SpawnMotorScreenEffect();
        }
      } else if (this.CacheMaxSpeed > MOTOR_EFFECT_SPEED_CLAMP) {
        if (!this.FindNoWaterPhysicalMaterial) {
          this.SpawnMotorAttachEffect(MOTOR_PUTONG);
        }
      } else {
        this.StopMotorAttachEffect();
      }
    }
  }
  UpdateVehicleEffectData(t, e, _, a) {
    if (this.IsEnabled && t && this.Owner) {
      this.IsMotorState = e;
      this.CacheMaxSpeed = _;
      this.IsBlackWave = a;
      e = this.Owner.CharacterActorComponent?.Entity?.GetComponent(217);
      _ = this.GetAttachEffectPath(t);
      if (this.IsMotorState && !e?.HasTag(1566606455) && _ !== "" && this.CacheMaxSpeed > MOTOR_EFFECT_SPEED_CLAMP && !t.bInWater) {
        this.SpawnMotorAttachEffect(_);
      } else if (this.IsPlayingAttachEffectButNotWater()) {
        this.StopMotorAttachEffect();
      }
      if (!this.IsMotorState || !e?.HasTag(232903598) || !t.bInWater) {
        if (EffectSystem_1.EffectSystem.IsValid(this.MotorScreenHandle)) {
          this.StopMotorScreenEffect();
        }
      }
      this.FindNoWaterPhysicalMaterial = t.HitPhysicMaterialArray.Contains("DynamicWater");
    }
  }
  OnFallInWater(t, e) {
    if (this.IsEnabled) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("RenderEffect", 83, "VehicleEffect Spawn Fall In Water", ["Owner", this.Owner.GetName()], ["vel", this.CacheMaxSpeed]);
      }
      this.SpawnFallEffect(t, e);
    }
  }
  StopMotorAttachEffect() {
    var t = this.MotorAttachHandle;
    if (t && EffectSystem_1.EffectSystem.IsValid(t) && EffectSystem_1.EffectSystem.IsValid(t)) {
      EffectSystem_1.EffectSystem.StopEffectById(t, "[SceneCharacterWaterEffect.StopMotorAttachEffect]", false);
    }
    this.MotorAttachHandle = 0;
    this.MotorAttachHandlePath = "";
  }
  StopMotorScreenEffect() {
    const t = this.MotorScreenHandle;
    if (t && EffectSystem_1.EffectSystem.IsValid(t)) {
      TimerSystem_1.TimerSystem.Delay(() => {
        if (EffectSystem_1.EffectSystem.IsValid(t)) {
          EffectSystem_1.EffectSystem.StopEffectById(t, "[SceneCharacterWaterEffect.StopMotorScreenEffect]", false);
        }
      }, TimerSystem_1.MIN_TIME);
    }
    this.MotorScreenHandle = 0;
  }
  SpawnMotorAttachEffect(t) {
    var e;
    var _;
    if (!this.IsBlackWave && !(this.CacheMaxSpeed < MOTOR_EFFECT_SPEED_CLAMP) && !!this.Owner && (!EffectSystem_1.EffectSystem.IsValid(this.MotorAttachHandle) || this.MotorAttachHandlePath !== t)) {
      this.StopMotorAttachEffect();
      this.MotorAttachHandle = EffectSystem_1.EffectSystem.SpawnEffect(this.Owner, this.EmptyUeTransform, t, "[SceneCharacterWaterEffect.SpawnMotorAttachEffect]", new EffectContext_1.EffectContext(undefined, this.Owner), 0);
      if (EffectSystem_1.EffectSystem.IsValid(this.MotorAttachHandle)) {
        (e = EffectSystem_1.EffectSystem.GetEffectActor(this.MotorAttachHandle))?.K2_AttachToActor(this.Owner, undefined, 2, 2, 2, false);
        (_ = new UE.TransformDouble()).SetLocation(new UE.VectorDouble(0, 0, -80));
        e?.D_K2_SetActorRelativeTransform(_, false, undefined, true);
        this.MotorAttachHandlePath = t;
      }
    }
  }
  SpawnMotorScreenEffect() {
    if (!EffectSystem_1.EffectSystem.IsValid(this.MotorScreenHandle) && !(this.StopMotorScreenEffect(), this.IsBlackWave) && !(this.CacheMaxSpeed < MOTOR_EFFECT_SPEED_CLAMP) && !!this.Owner) {
      this.MotorScreenHandle = EffectSystem_1.EffectSystem.SpawnEffect(this.Owner, this.EmptyUeTransform, MOTOR_SCREEN, "[SceneCharacterWaterEffect.SpawnMotorAttachEffect]", new EffectContext_1.EffectContext(undefined, this.Owner), 0);
      if (EffectSystem_1.EffectSystem.IsValid(this.MotorScreenHandle)) {
        EffectSystem_1.EffectSystem.GetEffectActor(this.MotorScreenHandle)?.K2_AttachToActor(this.Owner, undefined, 2, 2, 2, false);
      }
    }
  }
  SpawnFallEffect(t, e) {
    if (this.FindNoWaterPhysicalMaterial) {
      return -1;
    } else {
      this.EmptyUeTransform.SetLocation(t.ToUeVector(true));
      this.EmptyUeTransform.SetRotation(UE.KismetMathLibrary.D_MakeRotFromZ(e.ToUeVector(true)).Quaternion());
      return EffectSystem_1.EffectSystem.SpawnUnloopedEffect(GlobalData_1.GlobalData.World, this.EmptyUeTransform, MOTOR_FALL_IN, "[SceneCharacterVehicleEffect.SpawnFallEffect]", new EffectContext_1.EffectContext(undefined, this.Owner));
    }
  }
  GetAttachEffectPath(t) {
    let e = "";
    var _;
    if ((!!t.HitPhysicMaterialArray.Contains("DirtLand") || !!t.HitPhysicMaterialArray.Contains("SoilLand")) && !t.HitPhysicMaterialArray.Contains("Highway")) {
      e = MOTOR_SHACHEN;
    }
    if (this.Owner) {
      if (t.HitPhysicMaterialArray.Contains("SnowLand") || t.HitPhysicMaterialArray.Contains("PM_LandThickSnow")) {
        _ = this.Owner.CharacterActorComponent?.Entity?.GetComponent(217);
        e = _?.HasTag(232903598) ? SNOW_DQ : SNOW_PT;
        if (_?.HasTag(2003525802)) {
          e = this.DriftingLift() ? SNOW_SP_L : SNOW_SP_R;
        }
        if (_?.HasTag(-1260861532)) {
          e = SNOW_ST;
        }
      } else if (t.HitTagArray.Contains("ObjTrail") && (_ = this.Owner.CharacterActorComponent?.Entity?.GetComponent(217), e = _?.HasTag(232903598) ? ICE_DQ : ICE_PT, _?.HasTag(2003525802) && (e = this.DriftingLift() ? ICE_SP_L : ICE_SP_R), _?.HasTag(-1260861532))) {
        e = ICE_ST;
      }
    }
    return e;
  }
  IsPlayingAttachEffectButNotWater() {
    return this.MotorAttachHandlePath !== "" && this.MotorAttachHandlePath !== MOTOR_PUTONG && this.MotorAttachHandlePath !== MOTOR_DANQI;
  }
  DriftingLift() {
    return this.Owner.K2_GetActorRotation().Roll < 0;
  }
}
exports.SceneCharacterVehicleEffect = SceneCharacterVehicleEffect;
//# sourceMappingURL=SceneCharacterVehicleEffect.js.map