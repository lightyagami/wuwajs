"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const GlobalData_1 = require("../../../GlobalData");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
const RenderDataManager_1 = require("../../Data/RenderDataManager");
const SceneCharacterFoliageEffect_1 = require("./SceneCharacterFoliageEffect");
const SceneCharacterTriggerEffect_1 = require("./SceneCharacterTriggerEffect");
const SceneCharacterWaterEffect_1 = require("./SceneCharacterWaterEffect");
const PROFILE_KEY = "SceneCharacterInteraction_CheckInWater";
const AUDIO_TAG_PREFIX = "Audio_";
class SceneCharacterInteraction {
  constructor() {
    this.OwnerCharacter = undefined;
    this.SwimComponent = undefined;
    this.EnviInteractionComponent = undefined;
    this.ActorLocation = undefined;
    this.TsActorLocation = undefined;
    this.TsPreviousActorLocation = undefined;
    this.ActorSpeed = undefined;
    this.Config = undefined;
    this.WaterEffect = undefined;
    this.TriggerEffect = undefined;
    this.FoliageEffect = undefined;
    this.CapsuleHalfHeight = 0;
    this.IsEnable = false;
    this.IsInWaterOrOnMaterial = false;
    this.IsInAudioShr = false;
    this.AudioShrTag = undefined;
    this.PhysicalMaterial = undefined;
    this.WaterHeight = 0;
    this.WaterNormal = undefined;
    this.UpdateWaterStateInternal = 0.3;
    this.UpdateWaterStateInternalPc = 0.15;
    this.UpdateWaterStateInternalScale = 1;
    this.UpdateWaterStateCounter = 0;
    this.UseCppCheck = false;
    this.EnviInteractionData = undefined;
    this.TempVector = undefined;
  }
  SetInWater() {
    this.IsInWaterOrOnMaterial = true;
    this.PhysicalMaterial = undefined;
  }
  SetOnMaterial(t) {
    this.IsInWaterOrOnMaterial = true;
    this.PhysicalMaterial = t;
  }
  GetInWater() {
    return this.IsInWaterOrOnMaterial && this.PhysicalMaterial === undefined;
  }
  GetInAudioShr() {
    return this.IsInAudioShr;
  }
  GetAudioShrTag() {
    return this.AudioShrTag || FNameUtil_1.FNameUtil.NONE;
  }
  GetWaterHitLocationZ() {
    if (this.EnviInteractionData) {
      return this.EnviInteractionData.HitWaterLocation.Z;
    } else {
      return Number.NEGATIVE_INFINITY;
    }
  }
  GetWaterDepth() {
    if (this.UseCppCheck) {
      if (this.EnviInteractionData) {
        return this.EnviInteractionData.WaterDepth;
      } else {
        return 0;
      }
    } else {
      return this.WaterHeight - (this.TsActorLocation.Z - this.CapsuleHalfHeight);
    }
  }
  Start(t, i, e = 1) {
    this.OwnerCharacter = t;
    this.UpdateWaterStateInternalScale = e;
    if (i) {
      this.Config = i;
      this.Init();
      this.Enable();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Render", 25, ": 创建了没有配置的交互控制", ["this.OwnerCharacter.GetName()", this.OwnerCharacter.GetName()]);
    }
  }
  FindAudioShrubTagFromComp(i) {
    for (let t = 0; t < i.Tags.Num(); ++t) {
      var e = i.Tags.Get(t).toString();
      if (e.startsWith(AUDIO_TAG_PREFIX)) {
        return new UE.FName(e.substring(AUDIO_TAG_PREFIX.length));
      }
    }
    return FNameUtil_1.FNameUtil.NONE;
  }
  Update(i) {
    if (this.IsEnable && (this.UseCppCheck = UE.KismetSystemLibrary.GetConsoleVariableFloatValue("r.Kuro.InteractionEffect.UseCppWaterEffect") > 0, this.UseCppCheck && (this.EnviInteractionData = this.EnviInteractionComponent?.GetEnviInteractionData()), UE.KismetSystemLibrary.IsValid(this.OwnerCharacter))) {
      this.ActorLocation = this.OwnerCharacter.D_K2_GetActorLocation();
      this.TsPreviousActorLocation.DeepCopy(this.TsActorLocation);
      this.TsActorLocation.FromUeVector(this.ActorLocation);
      this.TsActorLocation.Subtraction(this.TsPreviousActorLocation, this.TempVector);
      this.TempVector.Division(i, this.ActorSpeed);
      let t = true;
      var e;
      this.UpdateWaterStateCounter -= i;
      if (this.UpdateWaterStateCounter > 0) {
        t = false;
      } else {
        this.UpdateWaterStateCounter = this.UpdateWaterStateInternal;
      }
      if (this.UseCppCheck) {
        t = true;
      }
      if (this.WaterEffect) {
        if (t) {
          this.CheckInWater(i);
          e = this.TsActorLocation.Z - this.CapsuleHalfHeight;
          if (this.EnviInteractionData) {
            this.WaterEffect.SetWaterDataEnviDataCheckFly(this.EnviInteractionData, this.TsActorLocation, this.ActorSpeed);
          }
          if (this.IsInWaterOrOnMaterial) {
            if (this.PhysicalMaterial) {
              if (this.UseCppCheck) {
                this.WaterEffect.SetStateOnMaterialEnviData(this.PhysicalMaterial, this.ActorSpeed, this.TsActorLocation, this.EnviInteractionData);
              } else {
                this.WaterEffect.SetStateOnMaterial(this.PhysicalMaterial, this.WaterHeight - e, this.WaterNormal, this.ActorSpeed, this.TsActorLocation, this.WaterHeight);
              }
            } else if (this.UseCppCheck) {
              this.WaterEffect.SetStateInWaterEnviData(this.EnviInteractionData, this.ActorSpeed, this.TsActorLocation);
            } else {
              this.WaterEffect.SetStateInWater(this.WaterHeight - e, this.WaterNormal, this.ActorSpeed, this.TsActorLocation, this.WaterHeight);
            }
          } else {
            this.WaterEffect.SetStateNone(this.ActorSpeed);
          }
        }
        this.WaterEffect.Tick();
      }
      if (this.TriggerEffect && this.EnviInteractionData) {
        this.TriggerEffect.Data = this.EnviInteractionData;
        this.TriggerEffect.Tick();
      }
      if (this.FoliageEffect) {
        this.FoliageEffect.Tick(i);
      }
      this.IsInAudioShr = false;
      this.AudioShrTag = FNameUtil_1.FNameUtil.NONE;
      if (this.EnviInteractionData?.bHitAudioShrub && this.EnviInteractionData.AudioShrubStaticMeshComp && this.EnviInteractionData.AudioShrubStaticMeshComp.GetCollisionProfileName().op_Equality(SceneCharacterInteraction.NoCollisionProfileName)) {
        this.IsInAudioShr = true;
        e = this.EnviInteractionData.AudioShrubStaticMeshComp.StaticMesh;
        this.AudioShrTag = e ? this.FindAudioShrubTagFromComp(e) : FNameUtil_1.FNameUtil.NONE;
      }
    }
  }
  Init() {
    if (this.OwnerCharacter?.CapsuleComponent) {
      this.CapsuleHalfHeight = this.OwnerCharacter.CapsuleComponent.CapsuleHalfHeight;
      this.WaterEffect = new SceneCharacterWaterEffect_1.SceneCharacterWaterEffect();
      this.WaterEffect.Config = this.Config.水特效;
      this.WaterEffect.Start(this.OwnerCharacter);
      this.WaterEffect.Enable();
      if (!Info_1.Info.IsMobilePlatform()) {
        this.TriggerEffect = new SceneCharacterTriggerEffect_1.SceneCharacterTriggerEffect();
        this.TriggerEffect.Start(this.OwnerCharacter);
        this.TriggerEffect.Enable();
        this.FoliageEffect = new SceneCharacterFoliageEffect_1.SceneCharacterFoliageEffect();
        this.FoliageEffect.Start(this.OwnerCharacter);
        this.FoliageEffect.Enable();
      }
    }
    var t = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldFeatureLevel(this.OwnerCharacter) === 1;
    this.IsEnable = false;
    this.TempVector = Vector_1.Vector.Create();
    this.ActorSpeed = Vector_1.Vector.Create();
    if (this.OwnerCharacter) {
      this.ActorLocation = this.OwnerCharacter.D_K2_GetActorLocation();
      this.TsActorLocation = Vector_1.Vector.Create(this.ActorLocation);
      this.TsPreviousActorLocation = Vector_1.Vector.Create(this.ActorLocation);
    }
    if (t) {
      this.UpdateWaterStateInternal = this.UpdateWaterStateInternalPc;
    }
    this.UpdateWaterStateInternal *= this.UpdateWaterStateInternalScale;
  }
  Enable() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RenderEffect", 25, "交互配置启用", ["Actor", this.OwnerCharacter?.GetName()]);
    }
    SceneCharacterInteraction.koe();
    this.IsEnable = true;
    this.SwimComponent = this.OwnerCharacter.CharacterActorComponent?.Entity?.GetComponent(80);
    this.EnviInteractionComponent = this.OwnerCharacter?.GetComponentByClass(UE.KuroEnviInteractionComponent.StaticClass());
    if (this.EnviInteractionComponent) {
      this.EnviInteractionComponent.bUpdateWaterEID = true;
      this.EnviInteractionComponent.bUpdateRainOcclusion = true;
    }
    if (this.OwnerCharacter.CapsuleComponent) {
      this.CheckInWater(0);
    }
  }
  Disable() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RenderEffect", 25, "交互配置禁用", ["Actor", this.OwnerCharacter?.GetName()]);
    }
    this.IsEnable = false;
    this.ClearInWaterOrOnMaterialState();
    if (this.WaterEffect) {
      this.WaterEffect.Disable();
    }
    if (this.TriggerEffect) {
      this.TriggerEffect.Disable();
    }
    if (this.FoliageEffect) {
      this.FoliageEffect.Disable();
    }
    if (this.EnviInteractionComponent) {
      this.EnviInteractionComponent.bUpdateWaterEID = false;
      this.EnviInteractionComponent.bUpdateRainOcclusion = false;
    }
  }
  GetEnabled() {
    return this.IsEnable;
  }
  Destroy() {
    this.Disable();
  }
  ClearInWaterOrOnMaterialState() {
    this.IsInWaterOrOnMaterial = false;
    this.PhysicalMaterial = undefined;
  }
  static koe() {
    var t = UE.NewObject(UE.TraceSphereElement.StaticClass());
    t.WorldContextObject = GlobalData_1.GlobalData.World;
    t.bIsSingle = false;
    t.bIgnoreSelf = true;
    t.Radius = 1;
    var i = UE.NewArray(UE.BuiltinByte);
    i.Add(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
    i.Add(QueryTypeDefine_1.KuroObjectTypeQuery.KuroWater);
    var i = (0, puerts_1.$ref)(i);
    t.SetObjectTypesQuery(i);
    t.DrawTime = 10;
    TraceElementCommon_1.TraceElementCommon.SetTraceColor(t, ColorUtils_1.ColorUtils.LinearGreen);
    TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(t, ColorUtils_1.ColorUtils.LinearRed);
    t.SetDrawDebugTrace(this.Z1r ? 2 : 0);
    SceneCharacterInteraction.bsr = t;
  }
  static SetTraceDebug(t) {
    SceneCharacterInteraction.bsr.SetDrawDebugTrace(t ? 2 : 0);
  }
  CheckInWater(t) {
    if (this.UseCppCheck) {
      if (this.EnviInteractionData) {
        var e = this.OwnerCharacter.CapsuleComponent;
        var h = Vector_1.Vector.Create();
        h.FromUeVector(e.D_K2_GetComponentLocation());
        var e = Vector_1.Vector.Create();
        e.FromUeVector(this.EnviInteractionData.HitWaterLocation);
        this.WaterHeight = Vector_1.Vector.Distance(h, e);
        this.WaterNormal = Vector_1.Vector.Create(this.EnviInteractionData.HitWaterNormal);
        if (this.EnviInteractionData.bInWater) {
          this.SetInWater();
          return;
        }
        if (!this.EnviInteractionData.HitPhysicMaterial) {
          h = RenderDataManager_1.RenderDataManager.Get().GetGlobalFootstepMaterial();
          this.EnviInteractionData.HitPhysicMaterial = h;
        }
        if (this.EnviInteractionData.HitPhysicMaterial && this.WaterEffect.IsMaterialInUse(this.EnviInteractionData.HitPhysicMaterial)) {
          this.SetOnMaterial(this.EnviInteractionData.HitPhysicMaterial);
          return;
        }
      }
      this.ClearInWaterOrOnMaterialState();
    } else if (this.Config?.启用水面交互) {
      if (!SceneCharacterInteraction.bsr) {
        SceneCharacterInteraction.koe();
      }
      var e = this.OwnerCharacter.CapsuleComponent;
      var h = e.D_K2_GetComponentLocation();
      var s = this.OwnerCharacter.CharacterActorComponent?.Entity?.GetComponent(187);
      let t = new UE.VectorDouble(0, 0, e.CapsuleHalfHeight);
      let i = new UE.VectorDouble(0, 0, -e.CapsuleHalfHeight - this.Config.射线向下延长);
      if (s) {
        s = s.GravityDirect.ToUeVector().GetSafeNormal(MathCommon_1.MathCommon.SmallNumber);
        t = s.op_Multiply(-e.CapsuleHalfHeight);
        i = s.op_Multiply(e.CapsuleHalfHeight + this.Config.射线向下延长);
      }
      s = h.op_Addition(t);
      e = h.op_Addition(i);
      h = SceneCharacterInteraction.bsr;
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(h, s);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(h, e);
      s = TraceElementCommon_1.TraceElementCommon.SphereTrace(h, PROFILE_KEY);
      e = h.HitResult;
      if (s && e.bBlockingHit) {
        var r = h.HitResult;
        var a = r.GetHitCount();
        var o = RenderDataManager_1.RenderDataManager.Get().GetGlobalFootstepMaterial();
        for (let i = 0; i < a; ++i) {
          if (UE.KuroCollisionLibrary.GetBodyInstance(r, i).CollisionResponses.ResponseToChannels.GameTraceChannel2 === 2) {
            this.WaterHeight = r.LocationZ_Array.Get(i);
            this.WaterNormal = Vector_1.Vector.Create(r.ImpactNormalX_Array.Get(i), r.ImpactNormalY_Array.Get(i), r.ImpactNormalZ_Array.Get(i));
            this.SetInWater();
            return;
          }
          var n = r.Components.Get(i);
          let t = undefined;
          if (n instanceof UE.LandscapeHeightfieldCollisionComponent) {
            if (!(t = r.PhysMaterials.Get(i)) || !this.WaterEffect.IsMaterialInUse(t)) {
              t = o;
            }
          } else if (UE.KuroCollisionLibrary.GetBodyInstance(r, i).CollisionResponses.ResponseToChannels.WorldStatic === 2 && (!(t = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetComponentPhysicalMaterial(n)) || !this.WaterEffect.IsMaterialInUse(t))) {
            t = o;
          }
          if (t && this.WaterEffect.IsMaterialInUse(t)) {
            this.WaterHeight = r.LocationZ_Array.Get(i);
            this.WaterNormal = Vector_1.Vector.Create(r.ImpactNormalX_Array.Get(i), r.ImpactNormalY_Array.Get(i), r.ImpactNormalZ_Array.Get(i));
            this.SetOnMaterial(t);
            return;
          }
          if (UE.KuroCollisionLibrary.GetBodyInstance(r, i).CollisionResponses.ResponseToChannels.WorldStatic === 2) {
            break;
          }
        }
      }
      this.ClearInWaterOrOnMaterialState();
    } else if (this.Config?.启用简易水面交互 && this.SwimComponent) {
      if (s = this.SwimComponent.GetAboveFootWaterSurfaceInfo()) {
        this.WaterHeight = s.WaterHeight + s.Location.Z;
        this.WaterNormal = s.SurfaceNormal;
        this.SetInWater();
      } else {
        this.ClearInWaterOrOnMaterialState();
      }
    }
  }
}
SceneCharacterInteraction.NoCollisionProfileName = new UE.FName("NoCollision");
SceneCharacterInteraction.bsr = undefined;
SceneCharacterInteraction.Z1r = false;
exports.default = SceneCharacterInteraction; //# sourceMappingURL=SceneCharacterInteraction.js.map