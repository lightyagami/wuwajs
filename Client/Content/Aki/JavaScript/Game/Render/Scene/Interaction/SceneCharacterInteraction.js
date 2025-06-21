"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
});
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
  GlobalData_1 = require("../../../GlobalData"),
  ColorUtils_1 = require("../../../Utils/ColorUtils"),
  RenderDataManager_1 = require("../../Data/RenderDataManager"),
  SceneCharacterTriggerEffect_1 = require("./SceneCharacterTriggerEffect"),
  SceneCharacterWaterEffect_1 = require("./SceneCharacterWaterEffect"),
  PROFILE_KEY = "SceneCharacterInteraction_CheckInWater";
class SceneCharacterInteraction {
  constructor() {
    this.OwnerCharacter = void 0, this.SwimComponent = void 0, this.EnviInteractionComponent = void 0, this.ActorLocation = void 0, this.TsActorLocation = void 0, this.TsPreviousActorLocation = void 0, this.ActorSpeed = void 0, this.Config = void 0, this.WaterEffect = void 0, this.TriggerEffect = void 0, this.CapsuleHalfHeight = 0, this.IsEnable = !1, this.IsInWaterOrOnMaterial = !1, this.PhysicalMaterial = void 0, this.WaterHeight = 0, this.WaterNormal = void 0, this.UpdateWaterStateInternal = .3, this.UpdateWaterStateInternalPc = .15, this.UpdateWaterStateInternalScale = 1, this.UpdateWaterStateCounter = 0, this.UseCppCheck = !1, this.EnviInteractionData = void 0, this.TempVector = void 0
  }
  SetInWater() {
    this.IsInWaterOrOnMaterial = !0, this.PhysicalMaterial = void 0
  }
  SetOnMaterial(t) {
    this.IsInWaterOrOnMaterial = !0, this.PhysicalMaterial = t
  }
  GetInWater() {
    return this.IsInWaterOrOnMaterial && void 0 === this.PhysicalMaterial
  }
  GetWaterHeight() {
    return this.WaterHeight
  }
  GetWaterDepth() {
    return this.UseCppCheck ? this.EnviInteractionData ? this.EnviInteractionData.WaterDepth : 0 : this.WaterHeight - (this.TsActorLocation.Z - this.CapsuleHalfHeight)
  }
  Start(t, i, e = 1) {
    this.OwnerCharacter = t, this.UpdateWaterStateInternalScale = e, i ? (this.Config = i, this.Init(), this.Enable()) : Log_1.Log.CheckError() && Log_1.Log.Error("Render", 25, ": 创建了没有配置的交互控制", ["this.OwnerCharacter.GetName()", this.OwnerCharacter.GetName()])
  }
  Update(i) {
    if (this.IsEnable && (this.UseCppCheck = 0 < UE.KismetSystemLibrary.GetConsoleVariableFloatValue("r.Kuro.InteractionEffect.UseCppWaterEffect"), this.UseCppCheck && (this.EnviInteractionData = this.EnviInteractionComponent?.GetEnviInteractionData()), UE.KismetSystemLibrary.IsValid(this.OwnerCharacter))) {
      this.ActorLocation = this.OwnerCharacter.D_K2_GetActorLocation(), this.TsPreviousActorLocation.DeepCopy(this.TsActorLocation), this.TsActorLocation.FromUeVector(this.ActorLocation), this.TsActorLocation.Subtraction(this.TsPreviousActorLocation, this.TempVector), this.TempVector.Division(i, this.ActorSpeed);
      let t = !0;
      this.UpdateWaterStateCounter -= i, 0 < this.UpdateWaterStateCounter ? t = !1 : this.UpdateWaterStateCounter = this.UpdateWaterStateInternal, this.UseCppCheck && (t = !0), this.WaterEffect && (t && (this.CheckInWater(i), i = this.TsActorLocation.Z - this.CapsuleHalfHeight, this.EnviInteractionData && this.WaterEffect.SetWaterDataEnviDataCheckFly(this.EnviInteractionData, this.TsActorLocation, this.ActorSpeed), this.IsInWaterOrOnMaterial ? this.PhysicalMaterial ? this.UseCppCheck ? this.WaterEffect.SetStateOnMaterialEnviData(this.PhysicalMaterial, this.ActorSpeed, this.TsActorLocation, this.EnviInteractionData) : this.WaterEffect.SetStateOnMaterial(this.PhysicalMaterial, this.WaterHeight - i, this.WaterNormal, this.ActorSpeed, this.TsActorLocation, this.WaterHeight) : this.UseCppCheck ? this.WaterEffect.SetStateInWaterEnviData(this.EnviInteractionData, this.ActorSpeed, this.TsActorLocation) : this.WaterEffect.SetStateInWater(this.WaterHeight - i, this.WaterNormal, this.ActorSpeed, this.TsActorLocation, this.WaterHeight) : this.WaterEffect.SetStateNone(this.ActorSpeed)), this.WaterEffect.Tick()), this.TriggerEffect && this.EnviInteractionData && (this.TriggerEffect.Data = this.EnviInteractionData, this.TriggerEffect.Tick())
    }
  }
  Init() {
    this.OwnerCharacter?.CapsuleComponent && (this.CapsuleHalfHeight = this.OwnerCharacter.CapsuleComponent.CapsuleHalfHeight, this.WaterEffect = new SceneCharacterWaterEffect_1.SceneCharacterWaterEffect, this.WaterEffect.Config = this.Config.水特效, this.WaterEffect.Start(this.OwnerCharacter), this.WaterEffect.Enable(), this.TriggerEffect = new SceneCharacterTriggerEffect_1.SceneCharacterTriggerEffect, this.TriggerEffect.Start(this.OwnerCharacter), this.TriggerEffect.Enable());
    var t = 1 === UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldFeatureLevel(this.OwnerCharacter);
    this.IsEnable = !1, this.TempVector = Vector_1.Vector.Create(), this.ActorSpeed = Vector_1.Vector.Create(), this.OwnerCharacter && (this.ActorLocation = this.OwnerCharacter.D_K2_GetActorLocation(), this.TsActorLocation = Vector_1.Vector.Create(this.ActorLocation), this.TsPreviousActorLocation = Vector_1.Vector.Create(this.ActorLocation)), t && (this.UpdateWaterStateInternal = this.UpdateWaterStateInternalPc), this.UpdateWaterStateInternal *= this.UpdateWaterStateInternalScale
  }
  Enable() {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("RenderEffect", 25, "交互配置启用", ["Actor", this.OwnerCharacter?.GetName()]), SceneCharacterInteraction.koe(), this.IsEnable = !0, this.SwimComponent = this.OwnerCharacter.CharacterActorComponent?.Entity?.GetComponent(77), this.EnviInteractionComponent = this.OwnerCharacter?.GetComponentByClass(UE.KuroEnviInteractionComponent.StaticClass()), this.EnviInteractionComponent && (this.EnviInteractionComponent.bUpdateWaterEID = !0, this.EnviInteractionComponent.bUpdateRainOcclusion = !0), this.OwnerCharacter.CapsuleComponent && this.CheckInWater(0)
  }
  Disable() {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("RenderEffect", 25, "交互配置禁用", ["Actor", this.OwnerCharacter?.GetName()]), this.IsEnable = !1, this.ClearInWaterOrOnMaterialState(), this.WaterEffect && this.WaterEffect.Disable(), this.TriggerEffect && this.TriggerEffect.Disable(), this.EnviInteractionComponent && (this.EnviInteractionComponent.bUpdateWaterEID = !1, this.EnviInteractionComponent.bUpdateRainOcclusion = !1)
  }
  GetEnabled() {
    return this.IsEnable
  }
  Destroy() {
    this.Disable()
  }
  ClearInWaterOrOnMaterialState() {
    this.IsInWaterOrOnMaterial = !1, this.PhysicalMaterial = void 0
  }
  static koe() {
    var t = UE.NewObject(UE.TraceSphereElement.StaticClass()),
      i = (t.WorldContextObject = GlobalData_1.GlobalData.World, t.bIsSingle = !1, t.bIgnoreSelf = !0, t.Radius = 1, UE.NewArray(UE.BuiltinByte)),
      i = (i.Add(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic), i.Add(QueryTypeDefine_1.KuroObjectTypeQuery.KuroWater), (0, puerts_1.$ref)(i));
    t.SetObjectTypesQuery(i), t.DrawTime = 10, TraceElementCommon_1.TraceElementCommon.SetTraceColor(t, ColorUtils_1.ColorUtils.LinearGreen), TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(t, ColorUtils_1.ColorUtils.LinearRed), t.SetDrawDebugTrace(this.Z1r ? 2 : 0), SceneCharacterInteraction.bsr = t
  }
  static SetTraceDebug(t) {
    SceneCharacterInteraction.bsr.SetDrawDebugTrace(t ? 2 : 0)
  }
  CheckInWater(t) {
    if (this.UseCppCheck) {
      if (this.EnviInteractionData) {
        var e = this.OwnerCharacter.CapsuleComponent.D_K2_GetComponentLocation();
        if (this.WaterHeight = UE.Vector.Distance(this.EnviInteractionData.HitWaterLocation, e.op_ToVector()), this.WaterNormal = Vector_1.Vector.Create(this.EnviInteractionData.HitWaterNormal), this.EnviInteractionData.bInWater) return void this.SetInWater();
        if (this.EnviInteractionData.HitPhysicMaterial || (e = RenderDataManager_1.RenderDataManager.Get().GetGlobalFootstepMaterial(), this.EnviInteractionData.HitPhysicMaterial = e), this.EnviInteractionData.HitPhysicMaterial && this.WaterEffect.IsMaterialInUse(this.EnviInteractionData.HitPhysicMaterial)) return void this.SetOnMaterial(this.EnviInteractionData.HitPhysicMaterial)
      }
      this.ClearInWaterOrOnMaterialState()
    } else if (this.Config?.启用水面交互) {
      SceneCharacterInteraction.bsr || SceneCharacterInteraction.koe();
      var e = this.OwnerCharacter.CapsuleComponent,
        s = e.D_K2_GetComponentLocation(),
        h = this.OwnerCharacter.CharacterActorComponent?.Entity?.GetComponent(178);
      let t = new UE.VectorDouble(0, 0, e.CapsuleHalfHeight),
        i = new UE.VectorDouble(0, 0, -e.CapsuleHalfHeight - this.Config.射线向下延长);
      h && (h = h.GravityDirect.ToUeVector().GetSafeNormal(MathCommon_1.MathCommon.SmallNumber), t = h.op_Multiply(-e.CapsuleHalfHeight), i = h.op_Multiply(e.CapsuleHalfHeight + this.Config.射线向下延长));
      h = s.op_Addition(t), e = s.op_Addition(i), s = SceneCharacterInteraction.bsr, h = (TraceElementCommon_1.TraceElementCommon.SetStartLocation(s, h), TraceElementCommon_1.TraceElementCommon.SetEndLocation(s, e), TraceElementCommon_1.TraceElementCommon.SphereTrace(s, PROFILE_KEY)), e = s.HitResult;
      if (h && e.bBlockingHit) {
        var r = s.HitResult,
          a = r.GetHitCount(),
          n = RenderDataManager_1.RenderDataManager.Get().GetGlobalFootstepMaterial();
        for (let i = 0; i < a; ++i) {
          if (2 === r.Components.Get(i).BodyInstance.CollisionResponses.ResponseToChannels.GameTraceChannel2) return this.WaterHeight = r.LocationZ_Array.Get(i), this.WaterNormal = Vector_1.Vector.Create(r.ImpactNormalX_Array.Get(i), r.ImpactNormalY_Array.Get(i), r.ImpactNormalZ_Array.Get(i)), void this.SetInWater();
          var o = r.Components.Get(i);
          let t = void 0;
          if (o instanceof UE.LandscapeHeightfieldCollisionComponent ? (t = r.PhysMaterials.Get(i)) && this.WaterEffect.IsMaterialInUse(t) || (t = n) : 2 !== o.BodyInstance.CollisionResponses.ResponseToChannels.WorldStatic || (t = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetComponentPhysicalMaterial(o)) && this.WaterEffect.IsMaterialInUse(t) || (t = n), t && this.WaterEffect.IsMaterialInUse(t)) return this.WaterHeight = r.LocationZ_Array.Get(i), this.WaterNormal = Vector_1.Vector.Create(r.ImpactNormalX_Array.Get(i), r.ImpactNormalY_Array.Get(i), r.ImpactNormalZ_Array.Get(i)), void this.SetOnMaterial(t);
          if (2 === r.Components.Get(i).BodyInstance.CollisionResponses.ResponseToChannels.WorldStatic) break
        }
      }
      this.ClearInWaterOrOnMaterialState()
    } else this.Config?.启用简易水面交互 && this.SwimComponent && ((h = this.SwimComponent.GetAboveFootWaterSurfaceInfo()) ? (this.WaterHeight = h.WaterHeight + h.Location.Z, this.WaterNormal = h.SurfaceNormal, this.SetInWater()) : this.ClearInWaterOrOnMaterialState())
  }
}
SceneCharacterInteraction.bsr = void 0, SceneCharacterInteraction.Z1r = !1, exports.default = SceneCharacterInteraction;
//# sourceMappingURL=SceneCharacterInteraction.js.map