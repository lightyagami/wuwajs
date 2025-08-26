"use strict";

var CharacterFootEffectComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, o) {
  var r;
  var s = arguments.length;
  var h = s < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, e, i, o);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (r = t[n]) {
        h = (s < 3 ? r(h) : s > 3 ? r(e, i, h) : r(e, i)) || h;
      }
    }
  }
  if (s > 3 && h) {
    Object.defineProperty(e, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterFootEffectComponent = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil");
const MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../../GlobalData");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const VoxelUtils_1 = require("../../../../Utils/VoxelUtils");
const CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes");
const PROFILE_KEY = "CharacterFootEffectComponent_FootTrace";
const FOOTPRINT_DETECT_DURATION = 150;
const FOOTPRINT_SPAWN_DURATION = 200;
const FOOTPRINT_SPAWN_MIN_DISTANCE_SQUARED = 500;
const SPRINT_FOOTEFFECT_DETECT_HEIGHT = 50;
const NORMAL_FOOTEFFECT_DETECT_HEIGHT = 15;
const MATERIAL_ID_WAT = 6;
const MATERIAL_ID_SHR = 14;
const FOOTPRINT_FORWARD_OFFSET = 5;
const RAIN_FOOT_EFFCT = "/Game/Aki/Effect/DataAsset/Niagara/Common/Water/DA_FX_SI3_Water_Step01.DA_FX_SI3_Water_Step01";
class CharacterFootEffectConfig {
  constructor() {
    this.EffectPath = undefined;
    this.PriorToGlobal = false;
  }
}
let CharacterFootEffectComponent = CharacterFootEffectComponent_1 = class CharacterFootEffectComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.I5r = undefined;
    this.EK1 = undefined;
    this.R5r = undefined;
    this._ae = Vector_1.Vector.Create();
    this.uae = Vector_1.Vector.Create();
    this.kTn = Vector_1.Vector.Create();
    this.Lz = Vector_1.Vector.Create();
    this.Tz = Vector_1.Vector.Create();
    this.fHo = Vector_1.Vector.Create();
    this.Gue = Rotator_1.Rotator.Create();
    this.fWc = Vector_1.Vector.Create();
    this.w5r = new Map();
    this.B5r = 0;
    this.e0u = 0;
    this.b5r = Vector_1.Vector.Create();
    this.wq_ = undefined;
    this.Rq_ = undefined;
    this.t0u = undefined;
    this.Dq_ = undefined;
    this.Bq_ = (t, e, i, o) => {
      if ((!this.Dq_ || !(i < this.Dq_.Frame)) && (!this.Dq_ || i !== this.Dq_.Frame || !(o < this.Dq_.Index))) {
        if (t) {
          TraceElementCommon_1.TraceElementCommon.GetHitLocation(e.HitResult, 0, this.kTn);
          this.VTn(e.HitResult);
          if (t) {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCharFootOnTheGround);
          } else if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Test", 6, "Detect TriggerEffect Failed", ["location", this.Hte?.ActorLocationProxy], ["start", this._ae], ["end", this.uae]);
          }
          ControllerHolder_1.ControllerHolder.WorldController.EnvironmentInfoUpdate(this.kTn.ToUeVector(), this.Hte.IsRoleAndCtrlByMe);
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Test", 6, "Detect Footprint Failed", ["location", this.Hte?.ActorLocationProxy], ["start", this._ae], ["end", this.uae]);
        }
      }
    };
    this.kq_ = undefined;
    this.qq_ = (t, e, i, o) => {
      if ((!this.kq_ || !(i < this.kq_.Frame)) && (!this.kq_ || i !== this.kq_.Frame || !(o < this.kq_.Index))) {
        if (t) {
          TraceElementCommon_1.TraceElementCommon.GetHitLocation(e.HitResult, 0, this.kTn);
          this.VTn(e.HitResult);
          if (t) {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCharFootOnTheGround);
          } else if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Test", 6, "Detect TriggerEffect Failed", ["location", this.Hte?.ActorLocationProxy], ["start", this._ae], ["end", this.uae]);
          }
          ControllerHolder_1.ControllerHolder.WorldController.EnvironmentInfoUpdate(this.kTn.ToUeVector(), this.Hte.IsRoleAndCtrlByMe);
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Test", 6, "Detect Footprint Failed", ["location", this.Hte?.ActorLocationProxy], ["start", this._ae], ["end", this.uae]);
        }
      }
    };
    this.i0u = undefined;
    this.r0u = (t, e, i, o) => {
      if (this.i0u && i < this.i0u.Frame || this.i0u && i === this.i0u.Frame && o < this.i0u.Index) {
        this.o0u();
      } else if (t) {
        TraceElementCommon_1.TraceElementCommon.GetHitLocation(e.HitResult, 0, this.kTn);
        this.o0u();
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Test", 6, "Detect Footprint Failed", ["location", this.Hte?.ActorLocationProxy], ["start", this._ae], ["end", this.uae]);
      }
    };
  }
  static get Dependencies() {
    return [3, 51, 178, 176, 0];
  }
  OnInit(t) {
    super.OnInit(t);
    return true;
  }
  OnStart() {
    super.OnStart();
    var t = this.Entity.GetComponent(3);
    if (!t?.Valid) {
      return false;
    }
    if (!this.Entity.GetComponent(178)?.Valid) {
      return false;
    }
    if (!this.Entity.GetComponent(51)?.Valid) {
      return false;
    }
    if (!this.Entity.GetComponent(0)?.Valid) {
      return false;
    }
    var e = this.Entity.GetComponent(176);
    if (!e?.Valid) {
      return false;
    }
    this.Hte = t;
    this.I5r = e;
    t = this.Hte?.Actor;
    if (t?.IsValid()) {
      this.EK1 = t.GetComponentByClass(UE.KuroEnviInteractionComponent.StaticClass());
    }
    this.R5r = UE.NewObject(UE.TraceSphereElement.StaticClass());
    this.R5r.bIsSingle = true;
    this.R5r.bTraceComplex = false;
    this.R5r.bIgnoreSelf = true;
    this.R5r.WorldContextObject = this.Hte.Actor;
    this.R5r.Radius = 10;
    this.R5r.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround);
    e = DataTableUtil_1.DataTableUtil.GetDataTableAllRow(6);
    for (const o of e) {
      var i = new CharacterFootEffectConfig();
      i.EffectPath = o.Effect;
      i.PriorToGlobal = o.PriorToGlobal;
      this.w5r.set(o.SurfaceType, i);
    }
    this.wq_ = (0, puerts_1.toManualReleaseDelegate)(this.Bq_);
    this.Rq_ = (0, puerts_1.toManualReleaseDelegate)(this.qq_);
    this.t0u = (0, puerts_1.toManualReleaseDelegate)(this.r0u);
    return true;
  }
  OnEnd() {
    this.Hte = undefined;
    this.R5r?.Dispose();
    this.R5r = undefined;
    this.w5r.clear();
    (0, puerts_1.releaseManualReleaseDelegate)(this.Bq_);
    (0, puerts_1.releaseManualReleaseDelegate)(this.qq_);
    this.wq_ = undefined;
    this.Rq_ = undefined;
    return !(this.t0u = undefined);
  }
  OnTick(t) {
    this.k5r();
  }
  FTn(t, e) {
    this.e0u = Time_1.Time.Now;
    this._ae.FromUeVector(this.Hte.Actor.Mesh.D_GetSocketLocation(t));
    this.Hte.ActorUpProxy.Multiply(this.I5r.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Sprint ? -SPRINT_FOOTEFFECT_DETECT_HEIGHT : -NORMAL_FOOTEFFECT_DETECT_HEIGHT, this.uae);
    this.uae.AdditionEqual(this._ae);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.R5r, this._ae);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.R5r, this.uae);
    return TraceElementCommon_1.TraceElementCommon.AsyncSphereTrace(this.R5r, PROFILE_KEY, e);
  }
  n0u() {
    var t = this.R5r?.HitResult;
    if (!t?.IsValid()) {
      return "DirtSurface";
    }
    var e;
    var i;
    var o = this.Hte?.Actor;
    if (!o?.IsValid()) {
      return "DirtSurface";
    }
    let r = false;
    if (r = !!o.CharRenderingComponent?.GetInWater() || !(o = t.Components.Get(0), !(o = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetComponentPhysicalMaterial(o))?.IsValid() || o.GetName() !== "WaterLightLand") || r) {
      return this.uQ_();
    } else {
      o = this.kTn;
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(t, 0, o);
      t = o.ToUeVector();
      o = this.Hte.ScaledHalfHeight;
      e = (0, puerts_1.$ref)(undefined);
      i = (0, puerts_1.$ref)(undefined);
      if (VoxelUtils_1.VoxelUtils.TryGetVoxelInfo(GlobalData_1.GlobalData.World, t, e, o, i)) {
        if ((o = (0, puerts_1.$unref)(e)).MtlID === MATERIAL_ID_WAT || o.MtlID === MATERIAL_ID_SHR) {
          return "DirtSurface";
        } else {
          return UE.KuroVoxelSystem.GetMtlNameByID(o.MtlID);
        }
      } else {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Test", 42, "[WorldController]Streaming:获取体素信息失败", ["Location", t], ["ErrorCode", (0, puerts_1.$unref)(i)]);
        }
        return "DirtSurface";
      }
    }
  }
  PostFootstepVoice() {
    if (Time_1.Time.Now - this.e0u < FOOTPRINT_DETECT_DURATION) {
      this.o0u();
    } else {
      this.e0u = Time_1.Time.Now;
      this._ae.DeepCopy(this.Hte.ActorLocationProxy);
      this.Hte.ActorUpProxy.Multiply(-NORMAL_FOOTEFFECT_DETECT_HEIGHT - this.Hte.ScaledHalfHeight, this.uae);
      this.uae.AdditionEqual(this._ae);
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.R5r, this._ae);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.R5r, this.uae);
      this.i0u = TraceElementCommon_1.TraceElementCommon.AsyncSphereTrace(this.R5r, PROFILE_KEY, this.t0u);
    }
  }
  gWc(t) {
    var e = ModelManager_1.ModelManager.SceneTeamModel?.GetPhysMaterial;
    var t = this.w5r.get(t.SurfaceType);
    let i = undefined;
    return i = !(i = !e || !(e = this.w5r.get(e.SurfaceType)) || t && t.PriorToGlobal ? i : e.EffectPath?.ToAssetPathName()) && t ? t.EffectPath?.ToAssetPathName() : i;
  }
  CWc(t, e, i, o) {
    this.Hte.ActorForwardProxy.Multiply(FOOTPRINT_FORWARD_OFFSET, this.Lz);
    TraceElementCommon_1.TraceElementCommon.GetImpactNormal(t, 0, this.Tz);
    Vector_1.Vector.VectorPlaneProject(this.Lz, this.Tz, this.fHo);
    this.fHo.AdditionEqual(e);
    i.DeepCopy(this.fHo);
    MathUtils_1.MathUtils.LookRotationUpFirst(this.Hte.ActorForwardProxy, this.Tz, o);
  }
  pWc(t, e, i) {
    var o;
    if (i && this.EK1 && this.Hte && this.EK1 && i.SurfaceType !== 10 && this.EK1.GetRainWalkOcclusionParam() < 1 - MathCommon_1.MathCommon.ThreshPointOnPlane && (i = this.EK1.GetEnviInteractionData()) && !i.bInWater) {
      i = this.fHo;
      if (this.Hte && this.Hte.Owner && this.Hte.Owner.IsA(UE.TsBaseCharacter_C.StaticClass()) && (o = this.Hte.Owner) && o.Mesh) {
        i.Z = o.Mesh.D_K2_GetComponentLocation().Z;
      }
      EffectSystem_1.EffectSystem.SpawnUnloopedEffect(GlobalData_1.GlobalData.World, new UE.TransformDouble(this.Gue.ToUeRotator(), this.fHo.ToUeVector(), Vector_1.Vector.OneVectorProxy.ToUeVector()), RAIN_FOOT_EFFCT, "[SceneCharacterFootprintEffect.SpawnRainFootEffect]");
    }
  }
  VTn(t) {
    var e;
    var i;
    if (!!t?.bBlockingHit && !(Time_1.Time.Now - this.B5r < FOOTPRINT_SPAWN_DURATION) && !(e = this.kTn, TraceElementCommon_1.TraceElementCommon.GetHitLocation(t, 0, e), Vector_1.Vector.DistSquared(e, this.b5r) < FOOTPRINT_SPAWN_MIN_DISTANCE_SQUARED) && !!t.PhysMaterials && !(t.PhysMaterials.Num() <= 0)) {
      if (i = t.PhysMaterials.Get(0)) {
        this.CWc(t, e, this.fHo, this.Gue);
        this.pWc(this.fHo, this.Gue, i);
        this.B5r = Time_1.Time.Now;
        this.b5r.DeepCopy(e);
      }
    }
  }
  TriggerFootprint(t) {
    var e;
    if (!!this.R5r?.HitResult?.bBlockingHit && !(Time_1.Time.Now - this.B5r < FOOTPRINT_SPAWN_DURATION) && !(t ? this.fWc.FromUeVector(this.Hte.Actor.Mesh.D_GetSocketLocation(CharacterFootEffectComponent_1.LeftFootSocketName)) : this.fWc.FromUeVector(this.Hte.Actor.Mesh.D_GetSocketLocation(CharacterFootEffectComponent_1.RightFootSocketName)), Vector_1.Vector.DistSquared(this.fWc, this.b5r) < FOOTPRINT_SPAWN_MIN_DISTANCE_SQUARED)) {
      e = this.R5r.HitResult.PhysMaterials?.Get(0);
      e = this.gWc(e);
      this.CWc(this.R5r.HitResult, this.fWc, this.fHo, this.Gue);
      if (e) {
        EffectSystem_1.EffectSystem.SpawnUnloopedEffect(GlobalData_1.GlobalData.World, new UE.TransformDouble(this.Gue.ToUeRotator(), this.fHo.ToUeVector(), Vector_1.Vector.OneVectorProxy.ToUeVector()), e, "[SceneCharacterFootprintEffect.SpawnEffect]");
      }
      if (t) {
        this.Dq_ = this.FTn(CharacterFootEffectComponent_1.LeftFootSocketName, this.wq_);
      } else {
        this.kq_ = this.FTn(CharacterFootEffectComponent_1.RightFootSocketName, this.Rq_);
      }
    }
  }
  o0u() {
    var t = this.n0u();
    this.Entity.GetComponent(190)?.PostFootstepAudio(t);
  }
  k5r() {
    if (!ModelManager_1.ModelManager.TeleportModel.IsTeleport && this.Hte.EnableVoxelDetection && this.Hte && this.I5r && this.I5r.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Stand) {
      ControllerHolder_1.ControllerHolder.WorldController.EnvironmentInfoUpdate(this.Hte.ActorLocation, this.Hte.IsRoleAndCtrlByMe);
    }
  }
  uQ_() {
    if (this.Hte) {
      var t = this.Hte.Owner?.GetComponentByClass(UE.KuroEnviInteractionComponent.StaticClass());
      if (t && this.Hte.Owner) {
        var e = UE.KuroInteractionEffectSystem.GetKuroInteractionEffectSystem(this.Hte.Owner.GetWorld());
        if (e) {
          if (e.EnviInteractionCollections.Get(t)?.WaterType === 1) {
            return "VoicelessSurface";
          }
        }
      }
    }
    return "WaterSurface";
  }
};
CharacterFootEffectComponent.LeftFootSocketName = new UE.FName("Bip001LFoot");
CharacterFootEffectComponent.RightFootSocketName = new UE.FName("Bip001RFoot");
CharacterFootEffectComponent = CharacterFootEffectComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(57)], CharacterFootEffectComponent);
exports.CharacterFootEffectComponent = CharacterFootEffectComponent; //# sourceMappingURL=CharacterFootEffectComponent.js.map