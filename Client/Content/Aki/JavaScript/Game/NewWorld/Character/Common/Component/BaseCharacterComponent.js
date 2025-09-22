"use strict";

var __decorate = this && this.__decorate || function (t, e, o, r) {
  var i;
  var a = arguments.length;
  var s = a < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, o) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, e, o, r);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (i = t[n]) {
        s = (a < 3 ? i(s) : a > 3 ? i(e, o, s) : i(e, o)) || s;
      }
    }
  }
  if (a > 3 && s) {
    Object.defineProperty(e, o, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseCharacterComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon");
const TsBaseCharacter_1 = require("../../../../Character/TsBaseCharacter");
const GlobalData_1 = require("../../../../GlobalData");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActorUtils_1 = require("../../../../Utils/ActorUtils");
const CombineMeshTool_1 = require("../../../Character/Common/Blueprint/Utils/CombineMeshTool");
const BaseActorComponent_1 = require("../../../Common/Component/BaseActorComponent");
const PROFILE_KEY = "CharacterActorComponent_FixBornLocation";
const FIX_LOCATION_TOLERANCE = 2;
let BaseCharacterComponent = class BaseCharacterComponent extends BaseActorComponent_1.BaseActorComponent {
  constructor() {
    super(...arguments);
    this.SubEntityType = 0;
    this.EntityType = Protocol_1.Aki.Protocol.kks.Proto_Npc;
    this.RadiusInternal = 0;
    this.HalfHeightInternal = 0;
    this.DefaultRadiusInternal = 0;
    this.DefaultHalfHeightInternal = 0;
    this.ModelResPath = "";
    this.ClassDefaultObject = undefined;
    this.wBn = false;
    this.ZK_ = Vector_1.Vector.Create();
  }
  get Actor() {
    return this.ActorInternal;
  }
  get SkeletalMesh() {
    return this.Actor.Mesh;
  }
  get ScaledRadius() {
    return this.RadiusInternal * this.ActorScaleProxy.X;
  }
  get Radius() {
    return this.RadiusInternal;
  }
  get ScaledHalfHeight() {
    return this.HalfHeightInternal * this.ActorScaleProxy.Z;
  }
  get HalfHeight() {
    return this.HalfHeightInternal;
  }
  get DefaultRadius() {
    return this.DefaultRadiusInternal;
  }
  get DefaultHalfHeight() {
    return this.DefaultHalfHeightInternal;
  }
  SetCamp(t) {
    var e = this.Entity.GetComponent(0);
    if (e?.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Npc || e?.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Monster || e?.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Vision) {
      if (((e = e?.GetEntityCamp()) || e === 0) && t instanceof TsBaseCharacter_1.default) {
        t.Camp = e;
      }
    }
  }
  FixActorLocation(t, e = true, o = undefined, r = "unknown.FixActorLocation", i = true, a = false) {
    if (!this.Actor.CapsuleComponent?.IsValid()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 3, "[CharacterActorComponent.FixBornLocation] capsule为空。", ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()], ["PbDataId", this.CreatureDataInternal.GetPbDataId()], ["Context", r]);
      }
      return [false, undefined];
    }
    var o = o ?? this.ActorLocationProxy;
    var s = ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation;
    var n = ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation;
    if (a) {
      this.ActorUpProxy.Multiply(this.ScaledRadius, s);
      this.ActorUpProxy.Multiply(-this.ScaledRadius + t, n);
    } else {
      this.ActorUpProxy.Multiply(this.ScaledHalfHeight - this.ScaledRadius, s);
      this.ActorUpProxy.Multiply(-this.ScaledHalfHeight + t, n);
    }
    s.AdditionEqual(o);
    n.AdditionEqual(o);
    let h = this.FixBornLocationInternal(o, s, n, false, e, r);
    if (!h[0] && i) {
      this.ActorUpProxy.Multiply(this.ScaledRadius, MathUtils_1.MathUtils.CommonTempVector);
      s.AdditionEqual(MathUtils_1.MathUtils.CommonTempVector);
      h = this.FixBornLocationInternal(o, s, n, true, e, r);
    }
    return h;
  }
  FixBornLocationInternal(t, e, o, i, a = true, s = "unknown.FixBornLocationInternal") {
    var n = ControllerHolder_1.ControllerHolder.CreatureController.CheckEnableEntityLog(this.CreatureDataInternal.GetEntityType()) && a;
    if (n && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Entity", 3, "[CharacterActorComponent.FixBornLocation] 实体地面修正:前", ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()], ["PbDataId", this.CreatureDataInternal.GetPbDataId()], ["K2_GetActorLocation", this.Actor.D_K2_GetActorLocation()], ["ActorLocationProxy", t], ["InitLocation", this.CreatureDataInternal.GetInitLocation()], ["射线开始位置", e], ["射线结束位置", o], ["Context", s]);
    }
    var r = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
    r.WorldContextObject = this.Actor;
    r.Radius = this.ScaledRadius;
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(r, e);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(r, o);
    r.ActorsToIgnore.Empty();
    for (const u of ModelManager_1.ModelManager.WorldModel.ActorsToIgnoreSet) {
      r.ActorsToIgnore.Add(u);
    }
    var h = TraceElementCommon_1.TraceElementCommon.ShapeTrace(this.Actor.CapsuleComponent, r, PROFILE_KEY, PROFILE_KEY);
    var c = r.HitResult;
    if (n && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Entity", 3, "[CharacterActorComponent.FixBornLocation] 实体地面修正:检测地面结果", ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()], ["PbDataId", this.CreatureDataInternal.GetPbDataId()], ["isHit", h], ["hitResult.bBlockingHit", c.bBlockingHit], ["allowStartPenetrating", i], ["hitResult.bStartPenetrating", c.bStartPenetrating], ["Context", s]);
    }
    if (h && c.bBlockingHit) {
      if (!i && c.bStartPenetrating) {
        return [false, undefined];
      }
      var l = ModelManager_1.ModelManager.TraceElementModel.CommonHitLocation;
      let e = "";
      var _ = c.Actors.Num();
      let o = -1;
      let r = "";
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(c, 0, l);
      for (let t = 0; t < _; ++t) {
        var C = c.Actors.Get(t);
        if (C?.IsValid() && (e += C.GetName() + ", ", !C.IsA(UE.Character.StaticClass()))) {
          if (!i && c.TimeArray.Get(t) < MathUtils_1.MathUtils.SmallNumber) {
            if (n && Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Entity", 3, "[CharacterActorComponent.FixBornLocation] 实体地面修正:起始碰撞", ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()], ["PbDataId", this.CreatureDataInternal.GetPbDataId()], ["isHit", h], ["hitResult.bBlockingHit", c.bBlockingHit], ["allowStartPenetrating", i], ["hitResult.bStartPenetrating", c.bStartPenetrating], ["hitResult.time", c.TimeArray.Get(t)], ["Context", s]);
            }
            return [false, undefined];
          }
          o = t;
          r = C.GetName();
          TraceElementCommon_1.TraceElementCommon.GetHitLocation(c, t, l);
          break;
        }
      }
      this.ActorUpProxy.Multiply(this.ScaledHalfHeight - this.ScaledRadius + FIX_LOCATION_TOLERANCE, MathUtils_1.MathUtils.CommonTempVector);
      l.AdditionEqual(MathUtils_1.MathUtils.CommonTempVector);
      if (n && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Entity", 3, "[CharacterActorComponent.FixBornLocation] 实体地面修正:射线碰到地面", ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()], ["PbDataId", this.CreatureDataInternal.GetPbDataId()], ["Actors", e], ["HitLocationIndex", o], ["HitLocationName", r], ["经过修正的位置", l], ["Context", s]);
      }
      if (!this.wBn) {
        this.wBn = true;
        if ((a = this.Entity.GetComponent(178)) && a.Actor?.Mesh && (t = a.GetMeshTransform().GetLocation(), MathUtils_1.MathUtils.CommonTempVector.Set(0, 0, -FIX_LOCATION_TOLERANCE), a.AddModelLocation(MathUtils_1.MathUtils.CommonTempVector), n) && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Entity", 50, "[CharacterActorComponent.FixBornLocation] 实体地面修正:模型位置修正", ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()], ["PbDataId", this.CreatureDataInternal.GetPbDataId()], ["OrigMeshLocation", t], ["FixMeshLocation", a.GetMeshTransform().GetLocation()], ["Context", s]);
        }
      }
      ModelManager_1.ModelManager.TraceElementModel.ClearActorTrace();
      return [true, l];
    }
    ModelManager_1.ModelManager.TraceElementModel.ClearActorTrace();
    return [false, undefined];
  }
  InitActorNew(t) {
    var e;
    var o = this.CreatureDataInternal;
    var r = o.D_GetTransform();
    var i = undefined;
    this.CreatureDataInternal.SetModelConfig(t);
    this.UpdateModelResPath();
    var a = this.CreatureDataInternal.GetModelConfig();
    if (a) {
      if ((i = ActorUtils_1.ActorUtils.LoadActorByModelConfig(a, r))?.IsValid()) {
        r = ResourceSystem_1.ResourceSystem.GetLoadedAsset(a.蓝图.ToAssetPathName(), UE.Class);
        this.ClassDefaultObject = UE.KuroStaticLibrary.GetDefaultObject(r);
        if (ObjectUtils_1.ObjectUtils.SoftObjectPathIsValid(a.DA)) {
          if ((r = a.DA.AssetPathName?.toString())?.length && r !== "None" && (r = ResourceSystem_1.ResourceSystem.GetLoadedAsset(a.DA.AssetPathName?.toString(), UE.PD_NpcSetupData_C))?.IsValid() && i instanceof TsBaseCharacter_1.default && (e = i.Mesh.GetRelativeTransform(), CombineMeshTool_1.CombineMeshTool.LoadDaConfig(i, e, i.Mesh, r), i.RenderType === 3)) {
            i.CharRenderingComponent.UpdateNpcDitherComponent();
          }
          if ((e = a.动画蓝图.Get()) && i instanceof TsBaseCharacter_1.default) {
            i.Mesh.SetAnimClass(e);
          }
        } else if (i instanceof TsBaseCharacter_1.default) {
          i.Mesh.bUseAnimInstanceCachePool = this.UseAnimInstanceCachePool;
          ActorUtils_1.ActorUtils.LoadAndChangeMeshAnim(i.Mesh, a.网格体, a.动画蓝图);
        }
        if (GlobalData_1.GlobalData.IsPlayInEditor && (r = this.CreatureDataInternal.GetPbDataId())) {
          i.Tags.Add(new UE.FName("PbDataId:" + r));
        }
        return i;
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 7, "[CharacterActorComponent.OnInit] 缺少ModelConfig配置", ["CreatureDataId", o.GetCreatureDataId()], ["ModelId", t]);
    }
  }
  InitSizeInternal() {
    this.RadiusInternal = this.Actor.CapsuleComponent.CapsuleRadius;
    this.HalfHeightInternal = this.Actor.CapsuleComponent.CapsuleHalfHeight;
    this.DefaultRadiusInternal = this.RadiusInternal;
    this.DefaultHalfHeightInternal = this.HalfHeightInternal;
  }
  UpdateModelResPath() {
    if (this.CreatureDataInternal.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Npc) {
      var e = this.CreatureDataInternal.GetModelConfig();
      if (e) {
        e = UE.KismetSystemLibrary.GetPathName(e.蓝图.Get());
        if (e) {
          let t = e.substr(0, e.lastIndexOf(StringUtils_1.SLASH_STRING));
          t = t.substr(0, t.lastIndexOf(StringUtils_1.SLASH_STRING));
          e = new Array();
          e.push(t);
          e.push("/Montage");
          this.ModelResPath = e.join(StringUtils_1.EMPTY_STRING);
        }
      }
    }
  }
  SwitchFace(t, e) {
    var o;
    if (this.CreatureDataInternal.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Npc && (o = this.CreatureDataInternal.GetModelConfig(), ObjectUtils_1.ObjectUtils.SoftObjectPathIsValid(o.DA))) {
      if (t) {
        if (e?.IsValid() && this.ActorInternal instanceof TsBaseCharacter_1.default) {
          CombineMeshTool_1.CombineMeshTool.SetFace(this.ActorInternal, e);
        }
      } else if ((t = o.DA.AssetPathName?.toString())?.length && t !== "None" && (e = ResourceSystem_1.ResourceSystem.GetLoadedAsset(o.DA.AssetPathName?.toString(), UE.PD_NpcSetupData_C))?.IsValid() && this.ActorInternal instanceof TsBaseCharacter_1.default && e.Skel_Face?.IsValid()) {
        CombineMeshTool_1.CombineMeshTool.SetFace(this.ActorInternal, e.Skel_Face);
      }
    }
  }
  GetWatchedPoint() {
    if (this.MoveComp?.GravityUp) {
      this.MoveComp.GravityUp.Multiply(this.ScaledHalfHeight, this.ZK_);
      this.ZK_.AdditionEqual(this.ActorLocationProxy);
      return this.ZK_;
    } else {
      return this.ActorLocationProxy;
    }
  }
  OnClear() {
    return super.OnClear();
  }
};
BaseCharacterComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(2)], BaseCharacterComponent);
exports.BaseCharacterComponent = BaseCharacterComponent; //# sourceMappingURL=BaseCharacterComponent.js.map