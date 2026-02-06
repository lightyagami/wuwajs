"use strict";

var MotorcycleFreezeWaterComponent_1;
var __decorate = this && this.__decorate || function (e, t, i, r) {
  var o;
  var s = arguments.length;
  var n = s < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, i) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(e, t, i, r);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (o = e[a]) {
        n = (s < 3 ? o(n) : s > 3 ? o(t, i, n) : o(t, i)) || n;
      }
    }
  }
  if (s > 3 && n) {
    Object.defineProperty(t, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleFreezeWaterComponent = undefined;
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const CustomPriorityManager_1 = require("../../../../Game/Utils/Priority/CustomPriorityManager");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const PhantomUtil_1 = require("../../../Module/Phantom/PhantomUtil");
const RenderDataManager_1 = require("../../../Render/Data/RenderDataManager");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
const TaskGraph_1 = require("../../../World/Task/TaskGraph");
const MotorcycleTraceWaterCapability_1 = require("./MotorcycleTraceWaterCapability");
const MovementTrialCollisionCapability_1 = require("./MovementTrialCollisionCapability");
const LOAD_BP_TYPE = "LoadBPType";
const LOAD_KURO_TRAIL_COLLISION_ASSET = "LoadKuroTrailCollisionAsset";
const CREATE_DEPENDENCY = "CreateDependency";
const iceRiderPositionName = FNameUtil_1.FNameUtil.GetDynamicFName("IceRiderPosition");
const freezeWaterEffectTag = -1310530631;
const freezeMotorSlideEffectTag = -394903781;
const freezeRunningWaterTag = -92495207;
const ICE_MESH_SCALE = 40.96;
let MotorcycleFreezeWaterComponent = MotorcycleFreezeWaterComponent_1 = class MotorcycleFreezeWaterComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.c$g = undefined;
    this.d$g = undefined;
    this.m$g = [];
    this.Hte = undefined;
    this.Gce = undefined;
    this.Lie = undefined;
    this.Y8e = undefined;
    this.Ncg = false;
    this.Vcg = undefined;
    this.jcg = undefined;
    this.KuroTrailCollisionAsset = undefined;
    this.Q9g = false;
    this.K9g = false;
    this.X9g = undefined;
    this.Y9g = undefined;
    this.bHa = false;
    this.J9g = "";
    this.z9g = new Map();
    this.Zii = [];
    this.Djg = undefined;
    this.Z9g = undefined;
    this.Ujg = undefined;
    this.xjg = undefined;
    this.iHg = e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Motor", 72, "MovementTrailCollisionHandler 调用", ["value", e]);
      }
      if (this.Hte?.Valid && this.Hte.VehicleOwner?.IsValid() && this.Y8e?.IsValid()) {
        if (e) {
          this.Qcg();
          EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.MotorcycleWaterDetectedStart2);
          cpp_1.FKuroWaterDetectedInterfaceHelper.Execute_BroadcastWaterDetectedStart(this.Y8e);
        } else {
          EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.MotorcycleWaterDetectedEnd2);
          cpp_1.FKuroWaterDetectedInterfaceHelper.Execute_BroadcastWaterDetectedEnd(this.Y8e);
        }
      }
    };
    this.rHg = (e, t, i) => {
      if (this.Y8e?.IsValid()) {
        if (this.Vcg?.IsValid()) {
          this.Vcg.D_K2_SetActorLocation(t.ToUeVector(), false, undefined, false);
        }
        EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.MotorcycleWaterDetectedTick2, e, t, i);
        cpp_1.FKuroWaterDetectedInterfaceHelper.Execute_BroadcastWaterDetectedTick(this.Y8e, e, t.Z, t.ToUeVector());
      }
    };
    this.oHg = e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Motor", 72, "SetPositionByMaterialParameterCollectionHandler 调用", ["value", e]);
      }
      if (!e) {
        if (this.Hte?.VehicleOwner?.IsValid() && this.bHa) {
          UE.KismetMaterialLibrary.SetVectorParameterValue(this.Hte.VehicleOwner, RenderDataManager_1.RenderDataManager.Get().GetGlobalShaderParameters(), iceRiderPositionName, ColorUtils_1.ColorUtils.LinearClear);
        }
      }
    };
    this.nHg = (e, t, i) => {
      if (this.Hte?.VehicleOwner?.IsValid() && this.bHa) {
        UE.KismetMaterialLibrary.SetVectorParameterValue(this.Hte.VehicleOwner, RenderDataManager_1.RenderDataManager.Get().GetGlobalShaderParameters(), iceRiderPositionName, new UE.LinearColor(this.Hte.VehicleOwner.K2_GetActorLocation()));
      }
    };
    this.sHg = (e, t) => {
      if (this.IW_()) {
        if (t) {
          this.aHg(e);
        } else {
          this.hHg(e);
        }
      }
    };
    this.lHg = e => {
      this._Hg = e;
    };
    this.E8f = e => {
      this.VOg();
      this._Hg = false;
      this.uHg = false;
      this.Djg?.EndTask();
      this.Djg = undefined;
      this.Z9g?.TryExitAll();
    };
    this.otg = e => {
      var e = e.PassengerEntity?.CheckGetComponent(0)?.GetPlayerId();
      if (e === ModelManager_1.ModelManager.CreatureModel.GetPlayerId() && (e = ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(e)?.CheckGetComponent(212))) {
        this.Djg = e.ListenForTagAddOrRemove(freezeRunningWaterTag, this.cHg);
      }
    };
    this.cHg = (e, t) => {
      if (e === freezeRunningWaterTag && this.IW_()) {
        if (t) {
          this.Z9g?.TryEnter(0, "OnFreezeRunningWaterTagChanged");
        } else {
          this.Z9g?.TryExit(0, "OnFreezeRunningWaterTagChanged");
          this.Z9g?.TryEnter(1, "OnFreezeRunningWaterTagChanged");
        }
      }
    };
    this.Bjg = e => {
      if (this.IW_() && this.uHg) {
        this.iHg(true);
      }
      this.Ujg = this.iHg;
      this.xjg = this.rHg;
      return true;
    };
    this.kjg = e => {
      this.iHg(false);
      this.Ujg = undefined;
      return !(this.xjg = undefined);
    };
    this.qjg = e => {
      if (this.IW_() && ControllerHolder_1.ControllerHolder.FormationDataController.HasPlayerTag(ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), freezeRunningWaterTag) && this.uHg) {
        this.oHg(true);
      }
      this.Ujg = this.oHg;
      this.xjg = this.nHg;
      return true;
    };
    this.Ojg = e => {
      this.oHg(false);
      this.Ujg = undefined;
      return !(this.xjg = undefined);
    };
  }
  get _Hg() {
    return this.Q9g;
  }
  set _Hg(e) {
    if (this.Q9g !== e && (this.Q9g = e, this.IW_())) {
      if (e) {
        this.jcg = this.Gce?.VehicleMovement?.UpdatedPrimitive?.GetCollisionResponseToChannel(QueryTypeDefine_1.KuroCollisionChannel.KuroWater);
        if (this.jcg !== 2) {
          this.Gce?.VehicleMovement?.UpdatedPrimitive?.SetCollisionResponseToChannel(QueryTypeDefine_1.KuroCollisionChannel.KuroWater, 2);
          this.Gce?.VehicleMovement?.InitVehicleShapes();
        } else {
          this.jcg = undefined;
        }
      } else if (this.jcg) {
        this.Gce?.VehicleMovement?.UpdatedPrimitive?.SetCollisionResponseToChannel(QueryTypeDefine_1.KuroCollisionChannel.KuroWater, this.jcg);
        this.Gce?.VehicleMovement?.InitVehicleShapes();
        this.jcg = undefined;
      }
    }
  }
  get uHg() {
    return this.K9g;
  }
  set uHg(e) {
    var t;
    if (this.K9g !== e && (this.K9g = e, this.IW_())) {
      if ((t = PhantomUtil_1.PhantomUtil.GetSummonedEntity(this.Entity, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantMotorcycle))?.Valid && t.Entity?.Valid) {
        t.Entity.GetComponent(235)?.SetEnable(e, 0);
      }
      if (e) {
        if (!this.Lie?.HasTag(freezeWaterEffectTag)) {
          this.Lie?.AddTag(freezeWaterEffectTag);
        }
        if (ControllerHolder_1.ControllerHolder.FormationDataController.HasPlayerTag(ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), freezeRunningWaterTag)) {
          this.Z9g?.TryEnter(0, "DetectedWater");
        } else {
          this.Z9g?.TryEnter(1, "DetectedWater");
        }
        this.Ujg?.(e);
      } else {
        this.Lie?.RemoveTag(freezeWaterEffectTag);
        this.Z9g?.TryExitAll("Not DetectedWater");
      }
    }
  }
  static get Dependencies() {
    return [0, 247, 217, 265, 266];
  }
  OnInitData() {
    this.J9g = CommonParamById_1.configCommonParamById.GetStringConfig("KuroTrailCollisionAsset") ?? "";
    var e;
    var t;
    var i = CommonParamById_1.configCommonParamById.GetStringArrayConfig("FreezeWaterEffectComponentNames") ?? [];
    this.z9g.clear();
    for (const r of i) {
      for ([e, t] of StringUtils_1.StringUtils.ParseCSVStringToMap(r)) {
        if (StringUtils_1.StringUtils.IsBlank(e) || StringUtils_1.StringUtils.IsBlank(t)) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Motor", 72, "FreezeWaterEffectComponentNames 配置错误, 格式为 ComponentName:SocketName", ["Content", r]);
          }
        } else {
          for (const o of MotorcycleFreezeWaterComponent_1.dHg) {
            if (o.EffectPath === undefined) {
              o.EffectPath = CommonParamById_1.configCommonParamById.GetStringConfig(o.Config) ?? "";
            }
            if (!this.z9g.has(o.TagId)) {
              this.z9g.set(o.TagId, []);
            }
            this.z9g.get(o.TagId).push({
              AssetPath: o.EffectPath,
              ComponentName: e,
              Socket: FNameUtil_1.FNameUtil.GetDynamicFName(t)
            });
          }
        }
      }
    }
    return true;
  }
  OnStart() {
    var e = this.Entity.CheckGetComponent(0);
    this.Hte = this.Entity.CheckGetComponent(263);
    this.Lie = this.Entity.CheckGetComponent(217);
    this.Gce = this.Entity.CheckGetComponent(265);
    var e = e?.GetPlayerId() ?? 0;
    this.bHa = e === ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    this.c$g = this.Entity.CheckGetComponent(266)?.TraceWaterCapability;
    this.X9g = new UE.HitResult();
    this.Y9g = new Map([[0, undefined], [1, undefined]]);
    for (const i of this.z9g.keys()) {
      var t = this.Lie?.ListenForTagAddOrRemove(i, this.sHg);
      if (t) {
        this.Zii.push(t);
      }
    }
    this.Y8e = this.Wcg();
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.MotorcycleWaterAreaChange, this.lHg);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, this.otg);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.E8f);
    this.Z9g = new CustomPriorityManager_1.CustomPriorityManager("MotorcycleFreezeWaterComponent " + this.Entity.Id);
    this.Z9g.Register(1, {
      Enable: false,
      EnterCallback: this.Bjg,
      ExitCallback: this.kjg
    });
    this.Z9g.Register(0, {
      Enable: false,
      EnterCallback: this.qjg,
      ExitCallback: this.Ojg
    });
    return true;
  }
  OnEnd() {
    this.Ujg = undefined;
    this.xjg = undefined;
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.E8f);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, this.otg);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.MotorcycleWaterAreaChange, this.lHg);
    for (const e of this.Zii) {
      e.EndTask();
    }
    this.Zii.length = 0;
    this._Hg = false;
    this.uHg = false;
    this.c$g = undefined;
    this.Gce = undefined;
    this.Lie = undefined;
    this.Hte = undefined;
    this.Y8e = undefined;
    this.X9g = undefined;
    this.Y9g?.clear();
    this.Y9g = undefined;
    this.VOg();
    for (const t of this.m$g) {
      t.Deactivate();
    }
    this.m$g.length = 0;
    if (this.Vcg?.IsValid()) {
      ActorSystem_1.ActorSystem.Put("MotorcycleFreezeWaterComponent.OnEnd", this.Vcg);
    }
    this.Vcg = undefined;
    this.Z9g?.TryExitAll("OnEnd");
    this.Z9g?.ClearObject();
    return !(this.Z9g = undefined);
  }
  OnTick(e) {
    if (this.IW_() && this._Hg && this.Hte?.Valid && this.Hte.VehicleOwner?.IsValid() && this.c$g) {
      let t = false;
      let i = undefined;
      if (this.bHa) {
        if (!this.Y9g) {
          return;
        }
        for (const o of this.Y9g.keys()) {
          t = this.mHg(o) || t;
        }
        let e = 0;
        MathUtils_1.MathUtils.CommonTempVector.Set(0, 0, 0);
        MathUtils_1.MathUtils.CommonTempVector2.Set(0, 0, 0);
        for (const s of this.Y9g.values()) {
          if (s) {
            e++;
            this.c$g.ImpactPoint.FromUeVector(s.ImpactPoint);
            this.c$g.ImpactNormal.FromUeVector(s.ImpactNormal);
            if (ModelManager_1.ModelManager.SundryModel.GetModuleDebugLevel("MotorcycleFreezeWaterComponent") >= 1) {
              UE.KismetSystemLibrary.DrawDebugArrow(this.Hte.VehicleOwner, s.ImpactPoint, s.ImpactPoint.op_Addition(s.ImpactPoint.op_Multiply(MotorcycleTraceWaterCapability_1.ONE_HUNDRED)), MotorcycleTraceWaterCapability_1.ONE_HUNDRED, undefined);
            }
            MathUtils_1.MathUtils.CommonTempVector.AdditionEqual(this.c$g.ImpactPoint);
            MathUtils_1.MathUtils.CommonTempVector2.AdditionEqual(this.c$g.ImpactNormal);
          }
        }
        var r;
        if (e > 0) {
          MathUtils_1.MathUtils.CommonTempVector.DivisionEqual(e);
          MathUtils_1.MathUtils.CommonTempVector2.DivisionEqual(e);
          r = Vector_1.Vector.Create(UE.GameplayStatics.GetWorldOriginLocation(this.Hte.VehicleOwner));
          i = {
            FoundWater: true,
            MinWaterHeight: MathUtils_1.MathUtils.CommonTempVector.Z,
            ImpactPoint: MathUtils_1.MathUtils.CommonTempVector.Addition(r, Vector_1.Vector.Create()),
            ImpactNormal: Vector_1.Vector.Create(MathUtils_1.MathUtils.CommonTempVector2)
          };
        }
      } else if (!!(i = this.c$g.TraceWater(MotorcycleTraceWaterCapability_1.ONE_HUNDRED, -MotorcycleTraceWaterCapability_1.ONE_HUNDRED)).FoundWater && !this.c$g.CeilingCheck(i.MinWaterHeight)) {
        t = true;
      }
      this.uHg = t;
      if (this.uHg && i?.ImpactNormal && i?.ImpactPoint) {
        this.xjg?.(e, i.ImpactPoint, i.ImpactNormal);
      }
    }
  }
  IW_() {
    return ModelManager_1.ModelManager.FunctionModel.IsOpen(10143);
  }
  mHg(e) {
    this.Y9g.set(e, undefined);
    if (!this.X9g) {
      return false;
    }
    if (!this.Gce?.VehicleMovement?.IsValid()) {
      return false;
    }
    var t;
    var i = (0, puerts_1.$ref)(this.X9g);
    let r = false;
    switch (e) {
      case 0:
        r = this.Gce.VehicleMovement.GetFrontMotorHitResult(i);
        break;
      case 1:
        r = this.Gce.VehicleMovement.GetBackMotorHitResult(i);
        break;
      default:
        return false;
    }
    return !!r && !!(t = (0, puerts_1.$unref)(i)).bBlockingHit && !!t.Component?.IsValid() && t.Component.GetCollisionObjectType() === QueryTypeDefine_1.KuroCollisionChannel.KuroWater && !(this.Y9g.set(e, t), 0);
  }
  aHg(e) {
    var t = PhantomUtil_1.PhantomUtil.GetSummonedEntity(this.Entity, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantMotorcycle);
    if (t?.Valid && t.Entity?.Valid && t.Entity.CheckGetComponent(3)?.IsAutonomousProxy) {
      var i = t.Entity.GetComponent(1);
      if (i?.Owner?.IsValid()) {
        var r = i.Owner.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
        var o = new Map();
        for (let e = 0; e < r.Num(); e++) {
          var s = r.Get(e);
          o.set(s.GetName(), s);
        }
        t = this.z9g.get(e);
        if (t?.length) {
          for (const h of t) {
            var n;
            var a = o.get(h.ComponentName);
            if (a?.IsValid()) {
              n = EffectSystem_1.EffectSystem.SpawnEffect(i.Owner, MathUtils_1.MathUtils.DefaultTransformDouble, h.AssetPath, "[OnMotorcycleWaterDetectedStart]");
              h.EffectHandleId = n;
              EffectSystem_1.EffectSystem.GetEffectActor(n)?.K2_AttachToComponent(a, h.Socket, 2, 2, 2, false);
            }
          }
        }
      }
    }
  }
  hHg(e) {
    var t = this.z9g.get(e);
    if (t?.length) {
      for (const r of t) {
        var i = r.EffectHandleId;
        if (i) {
          EffectSystem_1.EffectSystem.StopEffectById(i, "EndSummonedEntityFreezeWaterEffect:" + e, false);
          r.EffectHandleId = undefined;
        }
      }
    }
  }
  AddCollisionComponent() {
    if (this.Vcg?.IsValid() && this.Hte?.Owner?.IsValid()) {
      var e = CommonParamById_1.configCommonParamById.GetStringConfig("KuroTrailCollisionAsset") ?? "";
      var t = ResourceSystem_1.ResourceSystem.Load(e, UE.KuroTrailCollisionAsset);
      if (t?.IsValid()) {
        var i = this.Vcg.D_AddComponentByClass(UE.KuroLevelPlayMovementTrailCollisionComponent.StaticClass(), false, undefined, true);
        if (i?.IsValid()) {
          i.KuroTrailCollisionAsset = t;
          i.Invoker = this.Hte.Owner;
          this.Vcg.FinishAddComponent(i, false, undefined);
          return i;
        }
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Motor", 72, "MotorcycleFreezeWaterComponent.AddCollisionComponent: collisionComp is invalid");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Motor", 72, "MotorcycleFreezeWaterComponent.AddCollisionComponent: kuroTrailCollisionAsset is invalid", ["path", e]);
      }
    }
  }
  Jcg() {
    if (this.Vcg?.IsValid() && this.Hte?.Owner?.IsValid()) {
      var e = this.Vcg.D_AddComponentByClass(UE.BP_KuroMotorcycleFreezeWaterComponent_C.StaticClass(), false, undefined, true);
      if (e?.IsValid()) {
        e.Invoker = this.Hte.Owner;
        this.Vcg.FinishAddComponent(e, false, undefined);
        return e;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Motor", 72, "MotorcycleFreezeWaterComponent.AddWaterInteractionComponent: materialComp is invalid");
      }
    }
  }
  async CreateFreezeWaterDependencyByTaskGraph() {
    var e = new Map([[LOAD_BP_TYPE, {
      Run: MotorcycleFreezeWaterComponent_1.Zcg
    }], [LOAD_KURO_TRAIL_COLLISION_ASSET, {
      Run: this.edg.bind(this, this.J9g, UE.KuroTrailCollisionAsset)
    }], [CREATE_DEPENDENCY, {
      Run: async () => {
        this.Qcg();
      }
    }]]);
    var t = [[LOAD_KURO_TRAIL_COLLISION_ASSET, LOAD_BP_TYPE], [LOAD_KURO_TRAIL_COLLISION_ASSET, CREATE_DEPENDENCY]];
    return new TaskGraph_1.TaskGraph(e, t).Run();
  }
  async edg(e, t) {
    const i = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(e, t, (e, t) => {
      i.SetResult(e);
      this.KuroTrailCollisionAsset = e;
    });
    await i.Promise;
  }
  Qcg() {
    var e;
    if (this.IW_() && !this.Ncg && this.Hte?.Owner?.IsValid()) {
      this.Vcg = ActorSystem_1.ActorSystem.Spawn(UE.Actor.StaticClass(), this.Hte.ActorTransform, this.Hte.Owner);
      this.Vcg.SetActorLabel("MotorcycleFreezeWaterComponent: " + this.Entity.Id);
      if (this.Vcg?.IsValid()) {
        this.Vcg.D_AddComponentByClass(UE.SceneComponent.StaticClass(), false, undefined, false);
        if ((e = this.Jcg())?.IsValid() && e.Config?.IsValid()) {
          e.SetRelativeScale3D(new UE.Vector(ICE_MESH_SCALE));
          this.d$g = new MovementTrialCollisionCapability_1.MovementTrailCollisionCapability(this.Hte.Owner, this.Vcg, e.Config);
          this.d$g.Activate();
          this.m$g.push(this.d$g);
          this.Ncg = true;
        }
      } else {
        ActorSystem_1.ActorSystem.Put("MotorcycleFreezeWaterComponent.CreateFreezeWaterDependency fail", this.Vcg);
      }
    }
  }
  Wcg() {
    if (this.Hte?.Owner?.IsValid()) {
      var e = this.Hte.Owner.GetComponentByClass(UE.KuroEnviInteractionComponent.StaticClass());
      if (e?.IsValid() && UE.KuroStaticLibrary.IsImplementInterface(e.GetClass(), UE.KuroWaterDetectedInterface.StaticClass())) {
        return e;
      }
    }
  }
  VOg() {
    for (const e of this.z9g.keys()) {
      this.hHg(e);
    }
  }
};
MotorcycleFreezeWaterComponent.dHg = [{
  Config: "FreezeWaterEffect",
  TagId: freezeWaterEffectTag
}, {
  Config: "FreezeMotorSlideEffect",
  TagId: freezeMotorSlideEffectTag
}];
MotorcycleFreezeWaterComponent.Zcg = async () => {
  const e = new CustomPromise_1.CustomPromise();
  ResourceSystem_1.ResourceSystem.LoadTypeAsync("BP_KuroMotorcycleFreezeWaterComponent_C", () => {
    e.SetResult();
  });
  await e.Promise;
};
MotorcycleFreezeWaterComponent = MotorcycleFreezeWaterComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(267)], MotorcycleFreezeWaterComponent);
exports.MotorcycleFreezeWaterComponent = MotorcycleFreezeWaterComponent; //# sourceMappingURL=MotorcycleFreezeWaterComponent.js.map