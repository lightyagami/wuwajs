"use strict";

var CharacterFootEffectComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, r) {
  var o;
  var s = arguments.length;
  var h = s < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, i) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, e, i, r);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (o = t[a]) {
        h = (s < 3 ? o(h) : s > 3 ? o(e, i, h) : o(e, i)) || h;
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
const Stats_1 = require("../../../../../Core/Common/Stats");
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
const AudioUtils_1 = require("../../../../Utils/AudioUtils");
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
class CharacterSpecialFootEffectConfig {
  constructor() {
    this.Tag = new UE.GameplayTag();
    this.SortId = 1;
    this.OverrideGlobalFootEffect = 0;
    this.OverrideOtherCharacterFootEffect = 0;
    this.EffectPath = undefined;
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
    this.XQc = Vector_1.Vector.Create();
    this.Qrg = Stats_1.Stat.Create("CharacterFootEffectComponent.AsyncTraceDelegate");
    this.Krg = Stats_1.Stat.Create("CharacterFootEffectComponent.GetFootTexture");
    this.Xrg = Stats_1.Stat.Create("CharacterFootEffectComponent.PostFootStepAudio");
    this.w5r = new Map();
    this.vzd = new Map();
    this.B5r = 0;
    this.e0u = 0;
    this.b5r = Vector_1.Vector.Create();
    this.wq_ = undefined;
    this.Rq_ = undefined;
    this.t0u = undefined;
    this.Dq_ = undefined;
    this.Bq_ = (t, e, i, r) => {
      if ((!this.Dq_ || !(i < this.Dq_.Frame)) && (!this.Dq_ || i !== this.Dq_.Frame || !(r < this.Dq_.Index))) {
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
    this.qq_ = (t, e, i, r) => {
      if ((!this.kq_ || !(i < this.kq_.Frame)) && (!this.kq_ || i !== this.kq_.Frame || !(r < this.kq_.Index))) {
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
    this.r0u = (t, e, i, r) => {
      this.Qrg.Start();
      if (this.i0u && i < this.i0u.Frame || this.i0u && i === this.i0u.Frame && r < this.i0u.Index) {
        this.o0u();
      } else if (t) {
        TraceElementCommon_1.TraceElementCommon.GetHitLocation(e.HitResult, 0, this.kTn);
        this.o0u();
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Test", 6, "Detect Footprint Failed", ["location", this.Hte?.ActorLocationProxy], ["start", this._ae], ["end", this.uae]);
      }
      this.Qrg.Stop();
    };
  }
  static get Dependencies() {
    return [3, 54, 188, 186, 0];
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
    if (!this.Entity.GetComponent(188)?.Valid) {
      return false;
    }
    if (!this.Entity.GetComponent(54)?.Valid) {
      return false;
    }
    if (!this.Entity.GetComponent(0)?.Valid) {
      return false;
    }
    var e = this.Entity.GetComponent(186);
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
    this.R5r.bTraceComplex = true;
    this.R5r.bIgnoreSelf = true;
    this.R5r.WorldContextObject = this.Hte.Actor;
    this.R5r.Radius = 10;
    this.R5r.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround);
    e = DataTableUtil_1.DataTableUtil.GetDataTableAllRow(6);
    for (const h of e) {
      var i = new CharacterFootEffectConfig();
      i.EffectPath = h.Effect;
      i.PriorToGlobal = h.PriorToGlobal;
      this.w5r.set(h.SurfaceType, i);
    }
    var r = DataTableUtil_1.DataTableUtil.GetDataTableAllRow(7);
    for (let t = 0; t < r.length; t++) {
      var o = r[t];
      var s = new CharacterSpecialFootEffectConfig();
      s.Tag = o.Tag;
      s.EffectPath = o.Effect;
      s.SortId = o.SortID;
      s.OverrideGlobalFootEffect = o.OverrideGlobalFootEffect;
      s.OverrideOtherCharacterFootEffect = o.OverrideOtherCharacterFootEffect;
      var o = o.Tag.TagId;
      if (!this.vzd.has(o)) {
        this.vzd.set(o, []);
      }
      this.vzd.get(o).push(s);
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
    this.vzd.clear();
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
    var e = this.Hte?.Actor;
    if (!e?.IsValid()) {
      return "DirtSurface";
    }
    var i = this.kTn;
    let r = false;
    let o = t.PhysMaterials.Num() > 0 ? t.PhysMaterials.Get(0) : undefined;
    if (e.CharRenderingComponent?.GetInWater()) {
      e = e.CharRenderingComponent.GetWaterHitLocationZ();
      r = e > i.Z;
    } else {
      e = t.Components.Get(0);
      if ((e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetComponentPhysicalMaterial(e))?.IsValid() && e.GetName() === "WaterLightLand") {
        r = true;
      }
    }
    if (r) {
      return this.uQ_();
    }
    TraceElementCommon_1.TraceElementCommon.GetHitLocation(t, 0, i);
    e = AudioUtils_1.AudioUtils.QueryFoliageAudioPhysicalMaterial(i.ToUeVector(), this.Entity);
    let s = undefined;
    if (e.IsHitFoliage && e.PhysicalMaterial) {
      o = e.PhysicalMaterial;
    }
    return s = (s = o?.IsValid() ? o.SurfaceType === MATERIAL_ID_WAT || o.SurfaceType === MATERIAL_ID_SHR ? "DirtSurface" : UE.KuroAudioMaterialSettings.GetFootstepTextureName(o.SurfaceType).toString() : s) || "DirtSurface";
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
  YQc(t) {
    var e = ModelManager_1.ModelManager.SceneTeamModel?.GetPhysMaterial;
    var t = this.w5r.get(t.SurfaceType);
    let i = undefined;
    return i = !(i = !e || !(e = this.w5r.get(e.SurfaceType)) || t && t.PriorToGlobal ? i : e.EffectPath?.ToAssetPathName()) && t ? t.EffectPath?.ToAssetPathName() : i;
  }
  Szd(t) {
    var t = this.YQc(t);
    var e = this.Mzd();
    if (e) {
      return this.Ezd(e, t);
    } else if (t) {
      return [t];
    } else {
      return [];
    }
  }
  Mzd() {
    var i = this.Entity?.GetComponent(217);
    if (i) {
      let t = undefined;
      let e = Number.MIN_SAFE_INTEGER;
      for (var [r, o] of this.vzd) {
        if (i.HasTag(r)) {
          for (const s of o) {
            if (s.SortId > e) {
              e = s.SortId;
              t = s;
            }
          }
        }
      }
      return t;
    }
  }
  Ezd(t, e) {
    var i = t.EffectPath?.ToAssetPathName();
    var r = [];
    switch (t.OverrideGlobalFootEffect) {
      case 2:
        if (i) {
          r.push(i);
        }
        break;
      case 1:
        if (i) {
          r.push(i);
        }
        if (e) {
          r.push(e);
        }
        break;
      default:
        if (e) {
          r.push(e);
        }
    }
    return r;
  }
  zQc(t, e, i, r) {
    this.Hte.ActorForwardProxy.Multiply(FOOTPRINT_FORWARD_OFFSET, this.Lz);
    TraceElementCommon_1.TraceElementCommon.GetImpactNormal(t, 0, this.Tz);
    Vector_1.Vector.VectorPlaneProject(this.Lz, this.Tz, this.fHo);
    this.fHo.AdditionEqual(e);
    i.DeepCopy(this.fHo);
    MathUtils_1.MathUtils.LookRotationUpFirst(this.Hte.ActorForwardProxy, this.Tz, r);
  }
  JQc(t, e, i) {
    var r;
    if (i && this.EK1 && this.Hte && this.EK1.bUpdateRainOcclusion && this.EK1 && i.SurfaceType !== 10 && this.EK1.GetRainWalkOcclusionParam() < 1 - MathCommon_1.MathCommon.ThreshPointOnPlane && (i = this.EK1.GetEnviInteractionData()) && !i.bInWater) {
      i = this.fHo;
      if (this.Hte && this.Hte.Owner && this.Hte.Owner.IsA(UE.TsBaseCharacter_C.StaticClass()) && (r = this.Hte.Owner) && r.Mesh) {
        i.Z = r.Mesh.D_K2_GetComponentLocation().Z;
      }
      EffectSystem_1.EffectSystem.SpawnUnloopedEffect(GlobalData_1.GlobalData.World, new UE.TransformDouble(this.Gue.ToUeRotator(), this.fHo.ToUeVector(), Vector_1.Vector.OneVectorProxy.ToUeVector()), RAIN_FOOT_EFFCT, "[SceneCharacterFootprintEffect.SpawnRainFootEffect]");
    }
  }
  VTn(t) {
    var e;
    var i;
    if (!!t?.bBlockingHit && !(Time_1.Time.Now - this.B5r < FOOTPRINT_SPAWN_DURATION) && !(e = this.kTn, TraceElementCommon_1.TraceElementCommon.GetHitLocation(t, 0, e), Vector_1.Vector.DistSquared(e, this.b5r) < FOOTPRINT_SPAWN_MIN_DISTANCE_SQUARED) && !!t.PhysMaterials && !(t.PhysMaterials.Num() <= 0)) {
      if (i = t.PhysMaterials.Get(0)) {
        this.zQc(t, e, this.fHo, this.Gue);
        this.JQc(this.fHo, this.Gue, i);
        this.B5r = Time_1.Time.Now;
        this.b5r.DeepCopy(e);
      }
    }
  }
  TriggerFootprint(t) {
    if (this.R5r?.HitResult?.bBlockingHit && this.R5r.HitResult.GetHitCount() !== 0 && !(Time_1.Time.Now - this.B5r < FOOTPRINT_SPAWN_DURATION) && !(t ? this.XQc.FromUeVector(this.Hte.Actor.Mesh.D_GetSocketLocation(CharacterFootEffectComponent_1.LeftFootSocketName)) : this.XQc.FromUeVector(this.Hte.Actor.Mesh.D_GetSocketLocation(CharacterFootEffectComponent_1.RightFootSocketName)), Vector_1.Vector.DistSquared(this.XQc, this.b5r) < FOOTPRINT_SPAWN_MIN_DISTANCE_SQUARED)) {
      var e = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetComponentPhysicalMaterial(this.R5r.HitResult.Components.Get(0));
      var r = this.R5r.HitResult.PhysMaterials?.Get(0);
      let i = [];
      if (e) {
        i = this.Szd(e);
      }
      if (r) {
        for (const o of this.Szd(r)) {
          if (!i.includes(o)) {
            i.push(o);
          }
        }
      }
      this.zQc(this.R5r.HitResult, this.XQc, this.fHo, this.Gue);
      i.forEach((t, e) => {
        if (t) {
          e = i.length === 1 ? "[SceneCharacterFootprintEffect.SpawnEffect]" : `[SceneCharacterFootprintEffect.SpawnEffect.${e}]`;
          EffectSystem_1.EffectSystem.SpawnUnloopedEffect(GlobalData_1.GlobalData.World, new UE.TransformDouble(this.Gue.ToUeRotator(), this.fHo.ToUeVector(), Vector_1.Vector.OneVectorProxy.ToUeVector()), t, e);
        }
      });
      if (t) {
        this.Dq_ = this.FTn(CharacterFootEffectComponent_1.LeftFootSocketName, this.wq_);
      } else {
        this.kq_ = this.FTn(CharacterFootEffectComponent_1.RightFootSocketName, this.Rq_);
      }
    }
  }
  o0u() {
    this.Krg.Start();
    var t = this.n0u();
    this.Krg.Stop();
    this.Xrg.Start();
    this.Entity.GetComponent(201)?.PostFootstepAudio(t);
    this.Xrg.Stop();
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
CharacterFootEffectComponent = CharacterFootEffectComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(62)], CharacterFootEffectComponent);
exports.CharacterFootEffectComponent = CharacterFootEffectComponent; //# sourceMappingURL=CharacterFootEffectComponent.js.map