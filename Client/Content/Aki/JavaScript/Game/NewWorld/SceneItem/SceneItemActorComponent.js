"use strict";

var SceneItemActorComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, n) {
  var s;
  var r = arguments.length;
  var a = r < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(t, e, i, n);
  } else {
    for (var o = t.length - 1; o >= 0; o--) {
      if (s = t[o]) {
        a = (r < 3 ? s(a) : r > 3 ? s(e, i, a) : s(e, i)) || a;
      }
    }
  }
  if (r > 3 && a) {
    Object.defineProperty(e, i, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemActorComponent = undefined;
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioDefine_1 = require("../../../Core/Audio/AudioDefine");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const GameBudgetInterfaceController_1 = require("../../../Core/GameBudgetAllocator/GameBudgetInterfaceController");
const JsModelManager_1 = require("../../../Core/Model/JsModelManager");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const EffectParameterNiagara_1 = require("../../Effect/EffectParameter/EffectParameterNiagara");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const TsEffectActor_1 = require("../../Effect/TsEffectActor");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const RenderConfig_1 = require("../../Render/Config/RenderConfig");
const SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager");
const SceneInteractionActor_1 = require("../../Render/Scene/Item/SceneInteractionActor");
const ActorUtils_1 = require("../../Utils/ActorUtils");
const GravityUtils_1 = require("../../Utils/GravityUtils");
const CharacterNameDefines_1 = require("../Character/Common/CharacterNameDefines");
const BaseActorComponent_1 = require("../Common/Component/BaseActorComponent");
const PROFILE_KEY = "SceneItemActorFixBornLocation";
const FIX_SPAWN_TRACE_UP = 20;
const FIX_SPAWN_TRACE_DOWN = -1000;
const FAKE_GRAVITY_VALUE = -980;
let SceneItemActorComponent = SceneItemActorComponent_1 = class SceneItemActorComponent extends BaseActorComponent_1.BaseActorComponent {
  constructor() {
    super(...arguments);
    this.emn = undefined;
    this.StaticMeshComponent = undefined;
    this.tmn = 1;
    this.u9e = -1;
    this.imn = undefined;
    this.omn = false;
    this.rmn = false;
    this.nmn = undefined;
    this.mri = undefined;
    this.smn = undefined;
    this.amn = 4;
    this.hmn = undefined;
    this.cca = true;
    this.YGa = false;
    this.qec = false;
    this.ESh = undefined;
    this.lmn = 0;
    this._mn = undefined;
    this.hxc = t => {
      if (this.omn && this.u9e !== -1 && t.Actor) {
        SceneInteractionManager_1.SceneInteractionManager.Get().PlayKuroSkeletalMeshDestruction(this.u9e, t.Actor);
      }
    };
    this.tNu = t => {
      if (this.u9e === t && this.omn) {
        this.TryRefreshShowActor();
      }
    };
    this.v9e = () => {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 17, "Entity还没销毁，Actor已经被销毁了，需检查造物点是否会使生成的实体掉出边界外", ["造物点ID", this.CreatureDataInternal.GetOwnerId()], ["model表Id", this.CreatureDataInternal.GetModelConfig().ID]);
      }
      this.umn();
      this.Entity.ChangeTickInterval(0);
    };
    this.GMl = (t, e) => {
      var i;
      var n;
      var s;
      if (t === 5) {
        t = ModelManager_1.ModelManager.CreatureModel?.GetCompleteEntityData(this.CreatureData.GetPbDataId());
        t = (0, IComponent_1.getComponent)(t.ComponentsData, "LevelPrefabPerformComponent").PrefabParams;
        (i = new UE.KuroCurveLinearColor()).bUseCurve = false;
        i.Constant = new UE.LinearColor(this.ActorLocation.X, this.ActorLocation.Y, this.ActorLocation.Z, 0);
        EffectSystem_1.EffectSystem.CollectMaterialLinearColorCurve(e, FNameUtil_1.FNameUtil.GetDynamicFName("DissolveSphereCenterPosition"), i);
        s = (i = EffectSystem_1.EffectSystem.GetEffectModel(e)).StartTime + i.LoopTime;
        i = i.StartTime + i.LoopTime + i.EndTime;
        t = t.Params;
        (n = UE.NewArray(UE.Vector2D)).Add(new UE.Vector2D(0, 0));
        n.Add(new UE.Vector2D(t.SpreadTime, t.SpreadRadius));
        n.Add(new UE.Vector2D(s, t.SpreadRadius));
        n.Add(new UE.Vector2D(i, 0));
        s = UE.KuroCurveLibrary.CreateCurveFloat(true, 0, n);
        EffectSystem_1.EffectSystem.CollectMaterialFloatCurve(e, FNameUtil_1.FNameUtil.GetDynamicFName("DissolveSphereRadius"), s);
      }
    };
    this.Okl = (t, e) => {
      var i;
      if (t === 5) {
        t = ModelManager_1.ModelManager.CreatureModel?.GetCompleteEntityData(this.CreatureData.GetPbDataId());
        t = (0, IComponent_1.getComponent)(t.ComponentsData, "LevelPrefabPerformComponent").PrefabParams.Params;
        (i = new EffectParameterNiagara_1.EffectParameterNiagara()).UserParameterFloat = [];
        i.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName("length"), t.Length], [FNameUtil_1.FNameUtil.GetDynamicFName("width"), t.Width], [FNameUtil_1.FNameUtil.GetDynamicFName("time"), t.Time]);
        EffectSystem_1.EffectSystem.SetEffectParameterNiagara(e, i);
      }
    };
    this.cmn = t => {
      this.RefreshShowActor();
    };
    this.mmn = undefined;
    this.WWc = 1;
  }
  get IsReadyForOverlap() {
    return this.YGa;
  }
  get CurLevelPrefabShowActor() {
    return this.hmn;
  }
  get Extent() {
    return (0, puerts_1.$unref)(this.smn);
  }
  get Origin() {
    return (0, puerts_1.$unref)(this.mri);
  }
  get SkeletalMesh() {
    return this.emn;
  }
  get StaticMesh() {
    return this.StaticMeshComponent;
  }
  get FakeGravityValue() {
    if (this.ESh === undefined) {
      this.ESh = Vector_1.Vector.Create(0, 0, FAKE_GRAVITY_VALUE);
      GravityUtils_1.GravityUtils.RotatedVectorByActorInitGravity(this, this.ESh);
    }
    return this.ESh.ToUeVectorOld();
  }
  GetStaticMeshComponent() {
    return this.StaticMeshComponent;
  }
  GetPrimitiveComponent() {
    return this.emn ?? this.StaticMeshComponent;
  }
  GetInteractionMainActor() {
    if (this.u9e !== -1) {
      return SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionMainActor(this.u9e);
    }
  }
  GetMainCollisionActor() {
    if (this.u9e !== -1) {
      return SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(this.u9e);
    }
  }
  HasMesh() {
    return !!this.emn?.SkeletalMesh || !!this.StaticMeshComponent?.StaticMesh;
  }
  dmn() {
    var t;
    if (this.hmn === this.ActorInternal) {
      this.lmn = 0;
    } else {
      this._mn ||= (0, puerts_1.$ref)(undefined);
      if (this.hmn) {
        this.hmn.D_GetActorBounds(false, undefined, this._mn);
        t = (0, puerts_1.$unref)(this._mn);
        this.lmn = t.Size() / 2;
      }
    }
  }
  get PrefabRadius() {
    return this.lmn;
  }
  GetRadius() {
    if (!this.HasMesh()) {
      return 0;
    }
    let t = undefined;
    if (this.emn) {
      t = this.emn.CachedWorldSpaceBounds;
    } else if (this.StaticMeshComponent) {
      t = this.StaticMeshComponent.D_GetComponentBounds();
    }
    if (t && t.BoxExtent) {
      return t.BoxExtent.Y;
    } else {
      return 0;
    }
  }
  GetSceneInteractionLevelHandleId() {
    return this.u9e;
  }
  get PhysicsMode() {
    return this.tmn;
  }
  set PhysicsMode(t) {
    if (this.tmn !== t) {
      this.tmn = t;
      var e = this.GetPrimitiveComponent();
      if (this.ActorInitNotStandardGravity) {
        e.SetEnableGravity(false);
        switch (t) {
          case 0:
            e.SetSimulatePhysics(false);
            e.SetPhysicsLinearVelocity(new UE.Vector());
            e.SetPhysicsAngularVelocity(new UE.Vector());
            this.qec = false;
            break;
          case 1:
            e.SetSimulatePhysics(true);
            this.qec = true;
            break;
          case 2:
            e.SetSimulatePhysics(true);
            this.qec = false;
            break;
          case 3:
            e.SetSimulatePhysics(true);
            this.qec = true;
        }
      } else {
        switch (t) {
          case 0:
            e.SetSimulatePhysics(false);
            e.SetPhysicsLinearVelocity(new UE.Vector());
            e.SetPhysicsAngularVelocity(new UE.Vector());
            break;
          case 1:
            e.SetSimulatePhysics(true);
            e.SetEnableGravity(true);
            break;
          case 2:
            e.SetSimulatePhysics(true);
            e.SetEnableGravity(false);
            break;
          case 3:
            e.SetSimulatePhysics(true);
            e.SetEnableGravity(true);
        }
      }
    }
  }
  get EnableFakeGravity() {
    return this.qec;
  }
  SimulatedFakeGravity() {
    this.GetPrimitiveComponent().AddForce(this.FakeGravityValue, undefined, true);
  }
  OnInitData() {
    super.OnInitData();
    this.mri = (0, puerts_1.$ref)(undefined);
    this.smn = (0, puerts_1.$ref)(undefined);
    return !!this.InitCreatureData();
  }
  OnInit() {
    super.OnInit();
    let t = 0;
    var e = this.CreatureDataInternal.GetPbModelConfig();
    var i = this.CreatureDataInternal.GetPbEntityInitData();
    var n = (0, IComponent_1.getComponent)(i.ComponentsData, "VisionItemComponent");
    t = n ? -1 : e.ModelId;
    var n = (0, IComponent_1.getComponent)(i.ComponentsData, "ModelComponent");
    if (e) {
      if (n) {
        if ((i = this.CreatureDataInternal.GetModelConfig()).ID) {
          this.ActorInternal = ActorUtils_1.ActorUtils.LoadActorByModelConfig(i, this.CreatureDataInternal.D_GetTransform());
        } else {
          this.ActorInternal = ActorUtils_1.ActorUtils.LoadActorByPath(this.CreatureDataInternal.ModelBlueprintPath, this.CreatureDataInternal.D_GetTransform(), this.CreatureDataInternal.GetPbDataId());
        }
      } else {
        if (t > 0) {
          this.CreatureDataInternal.SetModelConfig(t);
        }
        this.ActorInternal = ActorUtils_1.ActorUtils.LoadActorByModelConfig(this.CreatureDataInternal.GetModelConfig(), this.CreatureDataInternal.D_GetTransform());
      }
      if (this.ActorInternal && (this.ActorInternal.OnDestroyed.Add(this.v9e), this.CreatureData.GetBaseInfo()?.ScanFunction)) {
        e = FNameUtil_1.FNameUtil.GetDynamicFName("DetectSphere");
        (n = this.Owner?.D_AddComponentByClass(UE.SphereComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransformDouble, false, e)).SetSphereRadius(50, false);
        n.SetGenerateOverlapEvents(false);
        n.KuroSetPassiveCollision(true);
        n.bKuroOverlapNotify = false;
        n.SetCollisionProfileName(e, true);
      }
      if (this.ActorInternal && this.ActorInternal.IsValid()) {
        this.SetActorVisible(false, "[SceneItemActorComponent.OnInit] 默认隐藏");
        this.SetCollisionEnable(false, "[SceneItemActorComponent.OnInit] 默认关闭碰撞");
        this.SetTickEnable(false, "[SceneItemActorComponent.OnInit] 默认关闭Tick");
        if (UE.KuroStaticLibrary.IsObjectClassByName(this.ActorInternal, CharacterNameDefines_1.CharacterNameDefines.BP_BASEITEM)) {
          this.ActorInternal.ApplyEntityId(this.Entity.Id);
          this.ActorInternal.SetPrimitiveEntityType(RenderConfig_1.RenderConfig.GetEntityRenderPriority(false, Protocol_1.Aki.Protocol.kks.Proto_SceneItem));
          this.ActorInternal.SetPrimitiveBlueprintTypeName(new UE.FName(this.CreatureDataInternal.EntityPbModelConfigId));
          this.Cmn();
          this.xnn();
          if (GlobalData_1.GlobalData.IsPlayInEditor && (i = this.CreatureDataInternal.GetPbDataId())) {
            this.ActorInternal.Tags.Add(new UE.FName("PbDataId:" + i));
          }
          if (GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen) {
            if (this.Entity.GameBudgetManagedToken !== undefined) {
              cpp_1.FKuroGameBudgetAllocatorInterface.UpdateActor(this.Entity.GameBudgetConfig.GroupName, this.Entity.GameBudgetManagedToken, this.ActorInternal);
            } else {
              this.Entity.RegisterToGameBudgetController(this.ActorInternal);
            }
            this.hmn = this.ActorInternal;
            this.dmn();
          }
          JsModelManager_1.JsModelManager.UpdateEntityActor(this.Entity.Id, this.ActorInternal);
          return true;
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SceneItem", 7, "[CharacterActorComponent.OnInit] 该物体蓝图类型不是BaseItem", ["EntityId", this.Entity.Id], ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()], ["ConfigType", this.CreatureDataInternal.GetEntityConfigType()], ["PbDataId", this.CreatureDataInternal.GetPbDataId()], ["ModelId", this.CreatureDataInternal.GetModelId()], ["PlayerId", this.CreatureDataInternal.GetPlayerId()]);
          }
          return false;
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Character", 3, "[SceneItemActorComponent.OnInit] 加载actor失败。", ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()], ["PbDataId", this.CreatureData.GetPbDataId()]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 3, "[SceneItemActorComponent.OnInit] 加载actor失败，无法找到pbModelConfig", ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()], ["PbDataId", this.CreatureData.GetPbDataId()]);
      }
      return false;
    }
  }
  OnStart() {
    var t;
    if ((this.Entity.GetComponent(156) !== undefined || this.Entity.GetComponent(221) !== undefined) && (this.OverrideStaticMeshFromSceneInteraction(), this.PhysicsMode = 0, (t = this.GetPrimitiveComponent()).SetCollisionEnabled(3), t = t?.BodyInstance)) {
      t.bLockXRotation = false;
      t.bLockYRotation = false;
      t.bLockZRotation = false;
      t.LinearDamping = 1;
      t.AngularDamping = 1.5;
    }
    this.gJl();
    this.Vr();
    return true;
  }
  gJl() {
    var t = this.CreatureDataInternal.GetPbDataId();
    if (t !== 0 && (SceneItemActorComponent_1.Zsh?.IsValid() || (SceneItemActorComponent_1.Zsh = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.KuroActorSubsystem.StaticClass()), SceneItemActorComponent_1.Zsh?.IsValid()))) {
      SceneItemActorComponent_1.Zsh?.RegisterEntity(t, this.CreatureDataInternal.IsPreAwakeEntity);
    }
  }
  Vr() {
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemEntityHitByHitActorData, this.hxc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSceneInteractionAllEffectPlaying, this.tNu);
  }
  pJl() {
    var t = this.CreatureDataInternal.GetPbDataId();
    if (t !== 0 && SceneItemActorComponent_1.Zsh?.IsValid()) {
      SceneItemActorComponent_1.Zsh?.UnRegisterEntity(t);
    }
  }
  sya() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemEntityHitByHitActorData, this.hxc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSceneInteractionAllEffectPlaying, this.tNu);
  }
  OnEnd() {
    if (this.nmn !== undefined) {
      TimerSystem_1.TimerSystem.Remove(this.nmn);
      this.nmn = undefined;
    }
    this.pJl();
    this.sya();
    return true;
  }
  OnEnable() {
    this.OnSetActorActive(true);
    var t = this.CreatureData.GetVisible();
    this.ToggleSceneInteractionVisible(t, t ? () => {
      this.Txe();
    } : () => {
      this.b4a();
    }, "SceneItemActorComponent.OnEnable, visible:" + t);
  }
  OnDisable(t) {
    this.OnSetActorActive(false, t);
    this.ToggleSceneInteractionVisible(false, () => {
      this.b4a();
    }, "SceneItemActorComponent.OnDisable");
  }
  OnActivate() {
    this.SetActorVisible(true, "[SceneItemActorComponent.OnActivate] Visible");
    this.SetCollisionEnable(true, "[SceneItemActorComponent.OnActivate] Visible");
    this.SetTickEnable(true, "[SceneItemActorComponent.OnActivate] Visible");
    super.OnActivate();
    ControllerHolder_1.ControllerHolder.WorldController.SetActorDataByCreature(this.CreatureDataInternal, this.ActorInternal);
  }
  OnClear() {
    var t;
    if (this.ActorInternal) {
      this.ActorInternal.OnDestroyed.Remove(this.v9e);
    }
    if (this.hmn instanceof TsEffectActor_1.default) {
      EffectSystem_1.EffectSystem.RemoveFinishCallback(this.hmn.GetHandle(), this.cmn);
    } else if (this.hmn?.IsA(UE.EffectSystemActor.StaticClass())) {
      t = this.hmn.GetHandle();
      EffectSystem_1.EffectSystem.RemoveFinishCallback(t, this.cmn);
    }
    super.OnClear();
    this.umn();
    return true;
  }
  umn() {
    var t = SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionMainActor(this.u9e);
    if (t?.IsValid() && t.GetAttachParentActor() !== undefined) {
      ControllerHolder_1.ControllerHolder.AttachToActorController.DetachActor(t, false, "SceneInteractionLevel.AttachToActor", 1, 1, 1);
    }
    if (this.u9e !== -1) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Entity", 17, "销毁场景交互物", ["HandleId", this.u9e]);
      }
      SceneInteractionManager_1.SceneInteractionManager.Get().DestroySceneInteraction(this.u9e);
      this.u9e = -1;
    }
    this.omn = false;
    this.imn = undefined;
  }
  InitSkeletalMeshComponent() {
    this.emn ||= this.ActorInternal.AddComponentByClass(UE.SkeletalMeshComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
  }
  Cmn() {
    var t = this.ActorInternal;
    var e = this.CreatureDataInternal.GetModelConfig();
    if (e) {
      if (UE.KismetSystemLibrary.IsValidSoftObjectReference(e.网格体)) {
        this.InitSkeletalMeshComponent();
        ActorUtils_1.ActorUtils.LoadAndChangeMeshAnim(this.emn, e.网格体, e.动画蓝图);
      } else {
        this.StaticMeshComponent ||= t.GetComponentByClass(UE.StaticMeshComponent.StaticClass());
        this.StaticMeshComponent ||= t.AddComponentByClass(UE.StaticMeshComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
      }
    }
  }
  LoadAndChangeStaticMesh(t) {
    var e = this.CreatureDataInternal.GetModelConfig();
    if (e) {
      const i = e.静态网格体列表.Get(t);
      if (i && ObjectUtils_1.ObjectUtils.SoftObjectPathIsValid(i)) {
        ResourceSystem_1.ResourceSystem.LoadAsync(i.AssetPathName?.toString(), UE.Object, t => {
          if (t instanceof UE.StaticMesh) {
            if (this.StaticMeshComponent?.IsValid()) {
              this.StaticMeshComponent.SetStaticMesh(t);
              if (t.BodySetup?.IsValid()) {
                this.StaticMeshComponent.SetCollisionProfileName(t.BodySetup.DefaultInstance.CollisionProfileName);
              }
              this.StaticMeshComponent.SetCollisionEnabled(3);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Entity", 17, "该资源不是静态网格体，请检查model表配置", ["path", i.AssetPathName]);
          }
        });
      }
    }
  }
  SetIsSceneInteractionLoadCompleted(t = true) {
    this.omn = t;
  }
  GetIsSceneInteractionLoadCompleted() {
    return this.omn;
  }
  xnn() {
    this.u9e = -1;
    this.omn = false;
    this.rmn = false;
  }
  LoadSceneInteractionLevel(t, e = false) {
    this.umn();
    var i;
    var n = this.CreatureDataInternal.GetModelConfig();
    if (n && (i = n.场景交互物) && ObjectUtils_1.ObjectUtils.SoftObjectPathIsValid(i)) {
      this.ResetAllCachedTime();
      this.imn = t;
      this.u9e = SceneInteractionManager_1.SceneInteractionManager.Get().CreateSceneInteractionLevel(i.AssetPathName?.toString(), this.imn, this.ActorLocation, this.ActorRotation, () => {
        this.Txe();
      }, this.CreatureData.GetVisible(), e);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Entity", 17, "生成场景交互物", ["initState", t], ["HandleId", this.u9e], ["ModelId", n.ID], ["ActorLocation", this.ActorLocation]);
      }
    } else {
      this.SetIsSceneInteractionLoadCompleted();
    }
  }
  Txe() {
    if (this.u9e !== -1) {
      this.omn = true;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Entity", 18, "场景交互物加载完成", ["HandleId", this.u9e], ["ModelId", this.CreatureDataInternal.GetModelConfig().ID], ["PbDataId", this.CreatureData.GetPbDataId()]);
      }
      SceneInteractionManager_1.SceneInteractionManager.Get().AttachToActor(this.u9e, this.ActorInternal);
      SceneInteractionManager_1.SceneInteractionManager.Get().SetCollisionActorsOwner(this.u9e, this.ActorInternal);
      SceneInteractionManager_1.SceneInteractionManager.Get().AttachChildActor(this.u9e);
      var t;
      var e = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(this.CreatureData.GetPbDataId());
      if (e && e.IsScaleEnabled && e.Transform) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Temp", 31, "[CHTest]", ["Scale", e.Transform.Scale]);
        }
        (t = Vector_1.Vector.Create()).Set(e.Transform.Scale?.X ?? 1, e.Transform.Scale?.Y ?? 1, e.Transform.Scale?.Z ?? 1);
        this.ActorInternal.SetActorScale3D(t.ToUeVectorOld());
      }
      var i = SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllActorsInLevel(this.u9e);
      if (i) {
        for (let t = 0, e = i.Num(); t < e; t++) {
          var n = i.Get(t);
          if (n instanceof UE.StaticMeshActor) {
            n.Tags.Add(CharacterNameDefines_1.CharacterNameDefines.NO_SLIDE);
            n.Tags.Add(CharacterNameDefines_1.CharacterNameDefines.INVALID_POS);
            n.StaticMeshComponent?.SetReceivesDecals(false);
          }
        }
      }
      var s = SceneInteractionManager_1.SceneInteractionManager.Get().GetReceivingDecalsActors(this.u9e);
      if (s) {
        for (let t = 0, e = s.Num(); t < e; t++) {
          s.Get(t).GetComponentByClass(UE.PrimitiveComponent.StaticClass())?.SetReceivesDecals(true);
        }
      }
      if (this.rmn) {
        this.gmn();
      } else {
        this.lua();
      }
      this.fmn();
      this.RefreshShowActor();
      this.kMl();
      e = this.Entity.TimeDilation * (ModelManager_1.ModelManager.CharacterModel?.SelfCenteredTimeDilation ?? 1) * (this.Entity.GetComponent(204)?.CurrentTimeScale ?? 1);
      this.UpdateAkFinalTimeScale(e, true);
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted);
      SceneInteractionManager_1.SceneInteractionManager.Get().EnableInteractionLevel(this.u9e);
      if (!this.cca) {
        this.ToggleSceneInteractionVisible(false, () => {
          this.b4a();
        }, "SetupSceneInteractionWhenLoadCompleted, IsShowInternal is " + this.cca);
        this.cca = true;
      }
    }
  }
  b4a() {
    this.omn = false;
    this.YGa = false;
    SceneInteractionManager_1.SceneInteractionManager.Get().DisableInteractionLevel(this.u9e);
  }
  TryRefreshShowActor() {
    var t;
    var e = this.CurLevelPrefabShowActor;
    if (!e?.IsValid() || UE.KuroStaticLibrary.IsObjectClassByName(e, CharacterNameDefines_1.CharacterNameDefines.BP_BASEITEM)) {
      this.RefreshShowActor();
    } else if (e instanceof TsEffectActor_1.default) {
      t = e.GetHandle();
      if (!EffectSystem_1.EffectSystem.IsValid(t)) {
        this.RefreshShowActor();
      }
    } else if (e.IsA(UE.EffectSystemActor.StaticClass())) {
      t = e.GetHandle();
      if (!EffectSystem_1.EffectSystem.IsValid(t)) {
        this.RefreshShowActor();
      }
    }
  }
  RefreshShowActor() {
    if (this.Entity?.Valid && this.Entity?.GameBudgetManagedToken !== undefined) {
      let t = undefined;
      var e;
      if (t = (t = this.GetMainCollisionActor()) === undefined ? UE.KuroStaticLibrary.GetLevelPrefabShowActor(this.ActorInternal) : t) {
        cpp_1.FKuroGameBudgetAllocatorInterface.UpdatePerformanceActor(this.Entity.GameBudgetConfig.GroupName, this.Entity.GameBudgetManagedToken, t);
        if (this.hmn !== t) {
          this.hmn = t;
          this.dmn();
          if (t instanceof TsEffectActor_1.default) {
            EffectSystem_1.EffectSystem.AddFinishCallback(t.GetHandle(), this.cmn);
          } else if (t.IsA(UE.EffectSystemActor.StaticClass())) {
            e = t;
            EffectSystem_1.EffectSystem.AddFinishCallback(e.GetHandle(), this.cmn);
          }
        }
      } else {
        this.hmn = this.ActorInternal;
        this.dmn();
        cpp_1.FKuroGameBudgetAllocatorInterface.UpdatePerformanceActor(this.Entity.GameBudgetConfig.GroupName, this.Entity.GameBudgetManagedToken, this.hmn);
      }
    }
  }
  kMl() {
    if (this.CreatureData.GetEntityConfigType() === Protocol_1.Aki.Protocol.rLs.F6n) {
      var t = ModelManager_1.ModelManager.CreatureModel?.GetCompleteEntityData(this.CreatureData.GetPbDataId());
      if (t) {
        t = (0, IComponent_1.getComponent)(t.ComponentsData, "LevelPrefabPerformComponent");
        if (t) {
          const e = t.PrefabParams;
          if (e) {
            t = this.GetInteractionMainActor();
            const i = t.GetActorByKey(e.ReferenceActorKey);
            if (i) {
              t.OverrideEffectActor = i;
              t.OverrideEffectParmaFunc = () => {
                switch (e.Params.Type) {
                  case "Decal":
                    var t = i;
                    if (EffectSystem_1.EffectSystem.IsValid(t.EffectComponent)) {
                      EffectSystem_1.EffectSystem.DynamicRegisterSpawnCallback(t.EffectComponent, this.GMl);
                    }
                    break;
                  case "RushWarningEffect":
                    t = i;
                    if (EffectSystem_1.EffectSystem.IsValid(t.EffectComponent)) {
                      EffectSystem_1.EffectSystem.DynamicRegisterSpawnCallback(t.EffectComponent, this.Okl);
                    }
                }
              };
            }
          }
        }
      }
    }
  }
  ToggleSceneInteractionVisible(t, e = undefined, i = "") {
    if (!!this.omn || !(this.cca = t, this.u9e === -1)) {
      SceneInteractionManager_1.SceneInteractionManager.Get().ToggleSceneInteractionVisible(this.u9e, t, this.CreatureData.GetRemoveState(), e, i);
    }
  }
  SwitchToState(t, e, i) {
    if (this.u9e !== -1 && this.imn !== t) {
      this.pmn(t, this.imn);
      this.imn = t;
      SceneInteractionManager_1.SceneInteractionManager.Get().SwitchSceneInteractionToState(this.u9e, this.imn, e, false, i);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Entity", 17, "场景交互物改变状态", ["targetState", t], ["HandleId", this.u9e], ["ModelId", this.CreatureDataInternal.GetModelConfig().ID], ["needTransition", e], ["jumpToEnd", i]);
      }
      this.RefreshShowActor();
    }
  }
  fmn() {
    var t;
    if (this.imn === 20 && (t = this.GetInteractionMainActor()) && !t.States.Get(this.imn)) {
      this.pmn(this.imn);
    }
  }
  pmn(t, e = 22) {
    if (t === 20) {
      this.SetSceneItemActorHide(true);
    }
    if (e === 20) {
      this.SetSceneItemActorHide(false);
    }
  }
  PlaySceneInteractionEffect(t) {
    if (this.u9e !== -1) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Entity", 17, "场景交互物播放特效", ["effectKey", t], ["HandleId", this.u9e], ["ModelId", this.CreatureDataInternal.GetModelConfig().ID]);
      }
      SceneInteractionManager_1.SceneInteractionManager.Get().PlaySceneInteractionEffect(this.u9e, t);
    }
  }
  EndSceneInteractionEffect(t) {
    if (this.u9e !== -1) {
      SceneInteractionManager_1.SceneInteractionManager.Get().EndSceneInteractionEffect(this.u9e, t);
    }
  }
  PlayExtraEffect(t, e = true) {
    if (this.u9e !== -1) {
      SceneInteractionManager_1.SceneInteractionManager.Get().PlayExtraEffectByTag(this.u9e, t, e);
    }
  }
  StopExtraEffect(t) {
    if (this.u9e !== -1) {
      SceneInteractionManager_1.SceneInteractionManager.Get().StopExtraEffectByTag(this.u9e, t);
    }
  }
  UpdateHitInfo(t, e) {
    if (this.u9e !== -1) {
      SceneInteractionManager_1.SceneInteractionManager.Get().UpdateHitInfo(this.u9e, t, e);
    }
  }
  PlaySceneInteractionEndEffect(t) {
    if (this.u9e !== -1) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Entity", 7, "场景交互物播放结束特效", ["effectKey", t], ["HandleId", this.u9e], ["ModelId", this.CreatureDataInternal.GetModelConfig().ID]);
      }
      SceneInteractionManager_1.SceneInteractionManager.Get().PlaySceneInteractionEndEffect(this.u9e, t);
    }
  }
  GetActorInSceneInteraction(t) {
    if (this.u9e !== -1) {
      return SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionActorByKey(this.u9e, t);
    }
  }
  GetActorInSceneInteractionOriginalRelTransform(t) {
    if (this.u9e !== -1) {
      return SceneInteractionManager_1.SceneInteractionManager.Get().GetActorOriginalRelTransform(this.u9e, t);
    }
  }
  GetAllActorsInSceneInteractionLevel() {
    if (this.u9e !== -1) {
      return SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllActorsInLevel(this.u9e);
    }
  }
  OverrideStaticMeshFromSceneInteraction() {
    this.rmn = true;
    if (this.omn) {
      this.gmn();
    }
  }
  gmn() {
    var t;
    var e;
    var i;
    var n;
    if (this.u9e !== -1 && (i = SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(this.u9e)) && (t = i.GetComponentByClass(UE.StaticMeshComponent.StaticClass()), e = this.Owner.GetComponentByClass(UE.StaticMeshComponent.StaticClass()), t) && e) {
      i = t.StaticMesh;
      (n = UE.NewArray(UE.Transform)).Add(t.GetRelativeTransform());
      UE.KuroStaticMeshLibrary.MergeSimpleCollisions(t, n);
      e.SetStaticMesh(t.StaticMesh);
      if (this.zGa(e.GetCollisionEnabled())) {
        e.SetCollisionEnabled(0);
      }
      this.YGa = true;
      e.SetCollisionEnabled(3);
      e.SetHiddenInGame(true);
      t.SetStaticMesh(i);
    }
  }
  lua() {
    var e = SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(this.u9e);
    if (e) {
      let t = e.GetComponentByClass(UE.ShapeComponent.StaticClass());
      if (t = t || e.GetComponentByClass(UE.StaticMeshComponent.StaticClass())) {
        if (this.zGa(t.GetCollisionEnabled())) {
          t.SetCollisionEnabled(0);
        }
        this.YGa = true;
        t.SetCollisionEnabled(3);
      }
    }
  }
  zGa(t) {
    return t === 2 || t === 3;
  }
  ChangeSceneInteractionPlayDirection(t) {
    if (this.u9e !== -1) {
      SceneInteractionManager_1.SceneInteractionManager.Get().ChangeSceneInteractionPlayDirection(this.u9e, t);
    }
  }
  GetActiveTagSequencePlaybackProgress(t) {
    if (this.u9e !== -1) {
      return SceneInteractionManager_1.SceneInteractionManager.Get().GetActiveTagSequencePlaybackProgress(this.u9e, t);
    }
  }
  SetActiveTagSequencePlaybackProgress(t, e) {
    if (this.u9e !== -1) {
      SceneInteractionManager_1.SceneInteractionManager.Get().SetActiveTagSequencePlaybackProgress(this.u9e, t, e);
    }
  }
  SetActiveTagSequenceDurationTime(t, e) {
    if (this.u9e !== -1) {
      SceneInteractionManager_1.SceneInteractionManager.Get().SetActiveTagSequenceDurationTime(this.u9e, t, e);
    }
  }
  PauseActiveTagSequence(t) {
    if (this.u9e !== -1) {
      SceneInteractionManager_1.SceneInteractionManager.Get().PauseActiveTagSequence(this.u9e, t);
    }
  }
  ResumeActiveTagSequence(t, e = false) {
    if (this.u9e !== -1) {
      SceneInteractionManager_1.SceneInteractionManager.Get().ResumeActiveTagSequence(this.u9e, t, e);
    }
  }
  GetIsActiveTagSequencePlayReverseFromConfig(t) {
    if (this.u9e !== -1) {
      return SceneInteractionManager_1.SceneInteractionManager.Get().GetIsActiveTagSequencePlayReverseFromConfig(this.u9e, t);
    }
  }
  PlayActiveTagSequenceTo(t, e, i = false) {
    if (this.u9e !== -1) {
      SceneInteractionManager_1.SceneInteractionManager.Get().PlayActiveTagSequenceTo(this.u9e, t, e, i);
    }
  }
  FixBornLocation(t, e) {
    var [i, n] = this.CheckGround();
    if (i && n.bBlockingHit && (t && (i = ModelManager_1.ModelManager.TraceElementModel.CommonHitLocation, TraceElementCommon_1.TraceElementCommon.GetImpactPoint(n, 0, i), this.SetActorLocation(i.ToUeVector(), this.constructor.name, false)), e)) {
      t = ModelManager_1.ModelManager.TraceElementModel.CommonHitLocation;
      TraceElementCommon_1.TraceElementCommon.GetImpactNormal(n, 0, t);
      (i = MathUtils_1.MathUtils.CommonTempVector).FromUeVector(this.ActorInternal.GetActorUpVector());
      e = MathUtils_1.MathUtils.CommonTempQuat;
      Quat_1.Quat.FindBetweenVectors(i, t, e);
      n = MathUtils_1.MathUtils.CommonTempRotator;
      MathUtils_1.MathUtils.ComposeRotator(this.ActorRotationProxy, e.Rotator(), n);
      this.SetActorRotation(n.ToUeRotator(), this.constructor.name, false);
    }
    ModelManager_1.ModelManager.TraceElementModel.ClearLineTrace();
  }
  CheckGround() {
    var t = this.ActorLocationProxy;
    var e = ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation;
    e.Set(t.X, t.Y, t.Z + FIX_SPAWN_TRACE_UP);
    var i = ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation;
    i.Set(t.X, t.Y, t.Z + FIX_SPAWN_TRACE_DOWN);
    var t = ModelManager_1.ModelManager.TraceElementModel.GetLineTrace();
    t.WorldContextObject = this.ActorInternal;
    t.ActorsToIgnore.Empty();
    t.ActorsToIgnore.Add(Global_1.Global.BaseCharacter);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, e);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, i);
    var e = TraceElementCommon_1.TraceElementCommon.LineTrace(t, PROFILE_KEY);
    var i = t.HitResult;
    t.ClearCacheData();
    return [e, i];
  }
  CheckGoundWithBox() {
    var t;
    var e;
    var i;
    var n;
    var s = SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(this.u9e);
    if (s === undefined) {
      return [false, undefined];
    } else {
      t = s.K2_GetActorRotation();
      s.K2_SetActorRotation(new UE.Rotator(0, 0, 0), false);
      s.D_GetActorBounds(false, this.mri, this.smn);
      s.K2_SetActorRotation(t, false);
      (s = MathUtils_1.MathUtils.CommonTempVector).FromUeVector((0, puerts_1.$unref)(this.mri));
      (n = ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation).Set(s.X, s.Y, s.Z + FIX_SPAWN_TRACE_UP);
      (e = ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation).Set(s.X, s.Y, s.Z + FIX_SPAWN_TRACE_DOWN);
      (s = ModelManager_1.ModelManager.TraceElementModel.GetBoxTrace()).WorldContextObject = this.ActorInternal;
      i = (0, puerts_1.$unref)(this.smn);
      s.HalfSizeX = i.X - 2;
      s.HalfSizeY = i.Y - 2;
      s.HalfSizeZ = i.Z - 2;
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(s, n);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(s, e);
      TraceElementCommon_1.TraceElementCommon.SetBoxOrientation(s, t);
      i = TraceElementCommon_1.TraceElementCommon.BoxTrace(s, PROFILE_KEY);
      n = s.HitResult;
      s.ClearCacheData();
      return [i, n];
    }
  }
  SetSceneItemActorHide(t) {
    if (this.ActorInternal?.IsValid()) {
      this.vmn(this.ActorInternal, t);
    }
  }
  vmn(t, e) {
    if (t?.IsValid()) {
      var i = (0, puerts_1.$ref)(undefined);
      t.GetAttachedActors(i, true);
      var n = (0, puerts_1.$unref)(i);
      if (n && n.Num() > 0) {
        for (let t = 0; t < n.Num(); t++) {
          var s = n.Get(t);
          if (s) {
            this.vmn(s, e);
          }
        }
      }
      if (t !== this.ActorInternal) {
        t.SetActorHiddenInGame(e);
        t.SetActorEnableCollision(!e);
      } else if ((i = this.GetPrimitiveComponent())?.IsValid()) {
        if (e && this.amn === 4) {
          this.amn = i.GetCollisionEnabled();
        }
        i.SetCollisionEnabled(e ? 0 : this.amn);
      }
    }
  }
  OnChangeTimeDilation(t) {
    var t = t * (this.Entity.GetComponent(122)?.CurrentTimeScale ?? 1);
    this.ActorInternal.CustomTimeDilation = t;
    var e = this.GetInteractionMainActor();
    if (e?.IsValid()) {
      e.SetTimeDilation(t);
    }
  }
  GetSocketLocation(t) {
    if (this.omn && !FNameUtil_1.FNameUtil.IsNothing(t)) {
      t = SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionActorByKey(this.u9e, t.toString());
      if (t?.IsValid()) {
        return t.D_K2_GetActorLocation();
      }
    }
    return this.ActorLocation;
  }
  GetSocketTransform(t) {
    if (this.omn && !FNameUtil_1.FNameUtil.IsNothing(t)) {
      t = SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionActorByKey(this.u9e, t.toString());
      if (t?.IsValid()) {
        return t.D_GetTransform();
      }
    }
    return this.ActorTransform;
  }
  UpdateInteractionMaterialColorParam(t, e, i, n, s = 1) {
    var r = this.GetInteractionMainActor();
    if (r && r.InteractionMaterialController) {
      this.mmn ||= new UE.LinearColor();
      this.mmn.R = e;
      this.mmn.G = i;
      this.mmn.B = n;
      this.mmn.A = s;
      r.InteractionMaterialController.ChangeVectorParameter(this.mmn, t);
    }
  }
  GetInteractCollisionActor() {
    if (this.u9e === -1) {
      if (this.HasMesh()) {
        return this.Owner;
      } else {
        return undefined;
      }
    } else {
      return SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(this.u9e);
    }
  }
  GetReferenceActor(t) {
    var e = this.GetInteractionMainActor();
    if (e && e instanceof SceneInteractionActor_1.default) {
      return e.GetActorByKey(t);
    } else {
      return undefined;
    }
  }
  UpdateAkFinalTimeScale(t, e = false) {
    if (!!e || t !== this.WWc) {
      if (e = this.Owner) {
        this.QWc(e, t, this.WWc);
      }
      if (e = this.GetInteractionMainActor()) {
        this.QWc(e, t, this.WWc);
      }
      this.WWc = t;
    }
  }
  QWc(t, e, i) {
    AudioSystem_1.AudioSystem.SetRtpcValue("entity_time_scale_combat", e, {
      Actor: t
    });
    if (e < AudioDefine_1.ENTITY_TIMESCALE_PAUSE_THRESHOLD && i >= AudioDefine_1.ENTITY_TIMESCALE_PAUSE_THRESHOLD) {
      AudioSystem_1.AudioSystem.PostEvent("time_scale_pause", t);
    } else if (e >= AudioDefine_1.ENTITY_TIMESCALE_PAUSE_THRESHOLD && i < AudioDefine_1.ENTITY_TIMESCALE_PAUSE_THRESHOLD) {
      AudioSystem_1.AudioSystem.PostEvent("time_scale_resume", t);
    }
  }
};
SceneItemActorComponent.Zsh = undefined;
SceneItemActorComponent = SceneItemActorComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(202)], SceneItemActorComponent);
exports.SceneItemActorComponent = SceneItemActorComponent; //# sourceMappingURL=SceneItemActorComponent.js.map