"use strict";

var SceneItemPortalComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, r) {
  var a;
  var s = arguments.length;
  var o = s < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, i) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, e, i, r);
  } else {
    for (var _ = t.length - 1; _ >= 0; _--) {
      if (a = t[_]) {
        o = (s < 3 ? a(o) : s > 3 ? a(e, i, o) : a(e, i)) || o;
      }
    }
  }
  if (s > 3 && o) {
    Object.defineProperty(e, i, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemPortalComponent = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon");
const Platform_1 = require("../../../../../Launcher/Platform/Platform");
const CameraController_1 = require("../../../../Camera/CameraController");
const CameraUtility_1 = require("../../../../Camera/CameraUtility");
const TsBaseCharacter_1 = require("../../../../Character/TsBaseCharacter");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext");
const EffectParameterNiagara_1 = require("../../../../Effect/EffectParameter/EffectParameterNiagara");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const Global_1 = require("../../../../Global");
const GlobalData_1 = require("../../../../GlobalData");
const LevelGamePlayController_1 = require("../../../../LevelGamePlay/LevelGamePlayController");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ScrollingTipsController_1 = require("../../../../Module/ScrollingTips/ScrollingTipsController");
const EffectModelGroup_1 = require("../../../../Render/Effect/Data/EffectModelGroup");
const EffectModelNiagara_1 = require("../../../../Render/Effect/Data/EffectModelNiagara");
const ActorUtils_1 = require("../../../../Utils/ActorUtils");
const PortalUtils_1 = require("../../../../Utils/PortalUtils");
const VoxelUtils_1 = require("../../../../Utils/VoxelUtils");
const WaitEntityTask_1 = require("../../../../World/Define/WaitEntityTask");
const WorldDefine_1 = require("../../../../World/Define/WorldDefine");
const PortalController_1 = require("../../Controller/PortalController");
const SceneItemManipulableCastProjectileState_1 = require("../../Manipulate/SceneItemManipulableCastProjectileState");
const SceneItemManipulableCastState_1 = require("../../Manipulate/SceneItemManipulableCastState");
const INVALID_ENTITY = 0;
const TELEPORT_TRIGGER_REF = "TeleportTrigger";
const PORTAL_EFFECT_REF = "PortalEffectActor";
const PORTAL_EFFECT_PLANE_Y_KEY = "Plane_Y";
const PORTAL_EFFECT_PLANE_Z_KEY = "Plane_Z";
const PORTAL_EFFECT_RT_ENABLE_KEY = "RTEnable";
const PORTAL_EFFECT_RIPPLE_ENABLE_KEY = "Ripple Enable";
const PORTAL_EFFECT_RIPPLE_POS_KEY = "RipplePos";
const DEFAULT_ROLE_TELEPORT_PERFORM_TIME = 0;
const DEFAULT_ROLE_TELEPORT_PERFORM_PRIORITY = 0;
const ROLE_TELEPORT_SCREEN_EFFECT_PATH = "/Game/Aki/Effect/DataAsset/ScreenDA/SD_Fight/Bigworld/DA_Fx_Screen_Potal.DA_Fx_Screen_Potal";
const ROLE_TELEPORT_SCREEN_POST_PROCESS_EFFECT_PATH = "/Game/Aki/Effect/EffectGroup/BigWorld/QingchuWuran/DA_Fx_Group_Post_Potal.DA_Fx_Group_Post_Potal";
const ROLE_TELEPORT_SCREEN_EFFECT_INTERVAL = 1000;
const PORTAL_DEBUG_KEY = "Portal";
const PORTAL_TELEPORT_OFFSET = 200;
const showFlagTypeToName = new Map([["Fog", "Fog"], ["Atmosphere", "Atmosphere"], ["InstancedFoliage", "InstancedFoliage"], ["InstancedGrass", "InstancedGrass"]]);
class PortalTeleportParam {
  constructor(t, e, i, r) {
    this.OtherActor = t;
    this.IsRole = e;
    this.InPortalComp = i;
    this.OutPortalComp = r;
    this.BeforeTeleportVelocityTransform = undefined;
    this.BeforeTeleportCameraSettings = undefined;
    this.AfterTeleportCameraSettings = undefined;
    this.AfterTeleportInputDirection = undefined;
    this.AfterTeleportInputRotator = undefined;
    this.AfterTeleportTransform = undefined;
    this.OriginEnableMovementSync = false;
  }
}
let SceneItemPortalComponent = SceneItemPortalComponent_1 = class SceneItemPortalComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.s1n = "A";
    this.Aga = INVALID_ENTITY;
    this.qSa = INVALID_ENTITY;
    this.ActorComp = undefined;
    this.vtn = undefined;
    this.IsPlayerInRange = false;
    this.PortalCapture = undefined;
    this.yel = undefined;
    this.Eel = undefined;
    this.Iel = undefined;
    this.Tel = undefined;
    this.wDe = 0;
    this.Wpo = 0;
    this.rQs = false;
    this.oQs = undefined;
    this.kla = false;
    this.Ihh = 0;
    this.Lel = new Set();
    this.jul = new Map();
    this.PortalBounds = Vector_1.Vector.Create();
    this.IsPortalPrepared = false;
    this.IsPortalRegistered = false;
    this.R0n = undefined;
    this.Thh = undefined;
    this.Uel = ResourceSystem_1.ResourceSystem.InvalidId;
    this.vrl = undefined;
    this.y6a = t => {
      this.IsPlayerInRange = t;
      if (!(SceneItemPortalComponent_1.P6a.size > 0)) {
        if (t) {
          this.xka();
          this.I6a();
        } else if (!this.CanRegisterPortal()) {
          this.T6a();
        }
      }
    };
    this.Rnn = () => {
      this.xka();
      this.I6a();
    };
    this.L6a = t => {
      if (t?.Valid && (t = t.Entity.GetComponent(0)?.GetPbDataId()) && this.Aga === t) {
        this.xka();
        this.I6a();
      }
    };
    this.A6a = t => {
      if (t?.Valid && (t = t.Entity.GetComponent(0)?.GetPbDataId()) && this.Aga === t && this.PortalCapture?.IsValid()) {
        this.T6a();
      }
    };
    this.l1n = (t, e) => {
      var i;
      if (e?.Valid && (i = e.Entity.GetComponent(0)?.GetPbDataId()) && this.Aga === i && this.PortalCapture?.IsValid()) {
        if (EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.RemoveEntity, this.l1n)) {
          EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, e, EventDefine_1.EEventName.RemoveEntity, this.l1n);
        }
        this.T6a();
      }
    };
    this.J8a = () => {
      if (this.IsPortalRegistered) {
        this.Ael();
      }
    };
    this.Rel = t => {
      if (this.IsPortalRegistered && (t = t?.toString()) && this.Lel.has(t)) {
        this.Ael();
      }
    };
    this.iWa = undefined;
    this.Lll = undefined;
  }
  GetPbDataId() {
    return this.wDe;
  }
  GetCreatureDataId() {
    return this.Wpo;
  }
  GetPortalModel() {
    return this.s1n;
  }
  GetPairCreatureDataId() {
    return this.qSa;
  }
  SetPairCreatureDataId(t) {
    this.qSa = t;
  }
  GetDynamicPortalCreatorCreatureDataId() {
    if (this.kla) {
      return this.Entity.GetComponent(0)?.GetOwnerIncId() ?? 0;
    } else {
      return 0;
    }
  }
  OnInitData(t) {
    var e = t.GetParam(SceneItemPortalComponent_1)[0];
    switch ((this.R0n = e).Config.Type) {
      case "Dynamic":
        this.kla = true;
        break;
      case "Static":
        this.Aga = e.Config.LinkPortalEntityId;
        this.rQs = e.Config.IsStreamSource || false;
    }
    this.s1n = e.Config.PortalModel;
    if (t.EntityData) {
      this.wDe = t.EntityData?.v9n;
    }
    this.Wpo = this.Entity.GetComponent(0).GetCreatureDataId();
    return true;
  }
  OnStart() {
    this.ActorComp = this.Entity.GetComponent(202);
    this.vtn = this.Entity.GetComponent(86);
    if (this.vtn && !EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.y6a)) {
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.y6a);
    }
    return true;
  }
  OnActivate() {
    if (this.ActorComp?.Valid) {
      if (this.s1n === "A") {
        if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnPortalRegister, this.L6a)) {
          EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPortalRegister, this.L6a);
        }
        if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnPortalUnRegister, this.A6a)) {
          EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPortalUnRegister, this.A6a);
        }
      }
      if (!EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn)) {
        EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
      }
      if (this.ActorComp?.GetIsSceneInteractionLoadCompleted()) {
        this.Rnn();
      }
      this.Lhh();
    }
    return true;
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnPortalRegister, this.L6a)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPortalRegister, this.L6a);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnPortalUnRegister, this.A6a)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPortalUnRegister, this.A6a);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.y6a)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.y6a);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
    }
    SceneItemPortalComponent_1.nKa();
    if (this.GetPortalEffectActor()?.IsValid) {
      this.D6a();
    }
    if (this.PortalCapture?.IsValid()) {
      this.T6a();
    }
    this.R6a();
    this.yel = undefined;
    this.Eel = undefined;
    this.Iel = undefined;
    return !(this.Tel = undefined);
  }
  OnDisable(t) {
    if (this.Entity.IsInit) {
      this.T6a();
      this.R6a();
    }
  }
  Lhh() {
    const i = this.GetDynamicPortalCreatorCreatureDataId();
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(i);
    if (!(t?.IsInit ?? this.Thh) && i !== 0) {
      let e = false;
      t = WaitEntityTask_1.WaitEntityTask.Create("SceneItemPortalComponent.WaitDynamicPortalCreatorInit", i, t => {
        this.Thh = undefined;
        e = true;
        if (t) {
          this.xka();
          this.I6a();
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 39, "传送门: 等待PortalCreator出错", ["CreatureDataId", this.Wpo], ["PbDataId", this.wDe], ["DynamicPortalCreatorCreatureDataId", i]);
        }
      });
      if (!e) {
        this.Thh = t;
      }
    }
  }
  U6a() {
    var t;
    return !!(this.Entity.Flag & 4) && !!this.ActorComp && !!this.ActorComp?.GetIsSceneInteractionLoadCompleted() && !!this.GetPortalEffectActor()?.IsValid() && !!(t = this.ActorComp.CreatureData.GetEntityOnlineInteractType(), LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(t, false));
  }
  xka() {
    if (this.U6a() && !this.IsPortalPrepared) {
      var t = this.GetPortalEffectActor();
      if (t?.IsValid()) {
        if (this.kla) {
          var e = this.GetDynamicPortalCreatorCreatureDataId();
          var i = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
          if (e !== 0 && !i?.IsInit) {
            this.Lhh();
            return;
          }
        }
        e = this.Pel();
        if (e?.IsValid()) {
          if (!this.PortalCapture?.IsValid()) {
            this.PortalCapture = ActorSystem_1.ActorSystem.Spawn(UE.BP_KuroPortalCapture_C.StaticClass(), this.ActorComp.ActorTransform, this.ActorComp.Owner);
          }
          if (this.PortalCapture?.IsValid()) {
            this.PortalCapture.SetPbDataId(this.wDe);
            this.PortalCapture.D_K2_SetActorTransform(this.ActorComp.ActorTransform, false, undefined, false);
            this.PortalCapture.K2_AttachToActor(this.ActorComp.Owner, undefined, 1, 1, 1, false);
            this.nQs();
            if (this.Mrl()) {
              this.Srl();
              this.x6a();
              if (!EffectSystem_1.EffectSystem.IsPlaying(t.EffectComponent)) {
                EffectSystem_1.EffectSystem.DynamicRegisterSpawnCallback(t.EffectComponent, this.J8a);
              }
              if (this.kla) {
                this.Rhh();
              } else {
                this.Dhh();
              }
              this.PortalCapture.Plane.D_K2_SetWorldTransform(t.RootComponent?.D_K2_GetComponentToWorld() ?? this.ActorComp.ActorTransform, false, undefined, false);
              i = this.wel(e, PORTAL_EFFECT_PLANE_Y_KEY) ?? 1;
              t = this.wel(e, PORTAL_EFFECT_PLANE_Z_KEY) ?? 1;
              this.PortalBounds.X = 0;
              this.PortalBounds.Y = i / 2;
              this.PortalBounds.Z = t / 2;
              if (this.kla) {
                PortalController_1.PortalController.AfterGenerateDynamicPortal(this);
              }
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("SceneItem", 39, "传送门: PreparePortal Success", ["CreatureDataId", this.Wpo], ["PbDataId", this.wDe], ["IsDynamicPortal", this.kla], ["PortalBounds", this.PortalBounds], ["PlaneTransform", this.PortalCapture.Plane?.D_K2_GetComponentToWorld().ToString()]);
              }
              this.IsPortalPrepared = true;
            } else {
              this.yrl();
            }
          }
        } else {
          this.xel();
        }
      }
    }
  }
  R6a() {
    if (this.IsPortalPrepared) {
      if (this.PortalCapture?.IsValid()) {
        this.PortalCapture.K2_DetachFromActor();
        ActorSystem_1.ActorSystem.Put("SceneItemPortalComponent.UnPreparePortal", this.PortalCapture);
        this.PortalCapture = undefined;
      }
      this.Srl();
      if (this.rQs && this.oQs?.IsValid()) {
        this.yEr();
      }
      if (this.Uel !== ResourceSystem_1.ResourceSystem.InvalidId) {
        ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Uel);
        this.Uel = ResourceSystem_1.ResourceSystem.InvalidId;
      }
      this.GetKuroActorSubsystem()?.OnAddToSubsystem.Remove(this.Rel);
      if (this.kla) {
        this.Thh?.Cancel();
        this.Thh = undefined;
        PortalController_1.PortalController.AfterDeleteDynamicPortal(this);
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SceneItem", 39, "传送门: UnPreparePortal Success", ["CreatureDataId", this.Wpo], ["PbDataId", this.wDe], ["IsDynamicPortal", this.kla], ["PortalBounds", this.PortalBounds]);
      }
      this.IsPortalPrepared = false;
    }
  }
  CanRegisterPortal() {
    var t;
    return !!(this.Entity.Flag & 4) && !!this.ActorComp?.GetIsSceneInteractionLoadCompleted() && !!this.PortalCapture?.IsValid() && !!this.GetPortalEffectActor()?.IsValid() && !(t = this.ActorComp.CreatureData.GetEntityOnlineInteractType(), !LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(t, false)) && !(t = this.kla ? PortalController_1.PortalController.GetPairDynamicPortal(this) : ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(this.Aga)?.Entity?.GetComponent(215), !this.IsPortalPrepared) && !!t?.IsPortalPrepared && (!this.vtn || !t.vtn || !!this.IsPlayerInRange || !!t?.IsPlayerInRange);
  }
  I6a() {
    var t;
    var e;
    if (this.CanRegisterPortal() && !this.IsPortalRegistered) {
      if (this.kla) {
        PortalController_1.PortalController.RegisterDynamicPortals();
      } else {
        e = (t = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(this.Aga))?.Entity?.GetComponent(215);
        if (t?.IsInit && e?.IsPortalPrepared) {
          if (this.s1n === "A") {
            this.SetPairCreatureDataId(e.GetCreatureDataId());
            e.SetPairCreatureDataId(this.GetCreatureDataId());
            e = new PortalController_1.PortalPairParams(this.PortalCapture.Plane.D_K2_GetComponentToWorld(), e.PortalCapture.Plane.D_K2_GetComponentToWorld(), this.ActorComp.Owner, e.ActorComp.Owner, this.PortalBounds, e.PortalBounds);
            PortalController_1.PortalController.RegisterPair(this.Wpo, e, false, true);
          } else {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPortalRegister, ModelManager_1.ModelManager.CreatureModel.GetEntity(this.Wpo));
          }
          if (!EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.RemoveEntity, this.l1n)) {
            EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, t, EventDefine_1.EEventName.RemoveEntity, this.l1n);
          }
        }
      }
    }
  }
  T6a() {
    if (this.IsPortalRegistered) {
      if (this.kla) {
        PortalController_1.PortalController.UnRegisterDynamicPortals(true);
      } else {
        if (this.PortalCapture?.IsValid()) {
          this.PortalCapture.SetPair(undefined);
        }
        if (this.s1n === "A") {
          PortalController_1.PortalController.UnRegisterPair(this.Wpo, false, true, true);
        } else {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPortalUnRegister, ModelManager_1.ModelManager.CreatureModel.GetEntity(this.Wpo));
        }
      }
    }
  }
  AfterRegisterPair() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SceneItem", 39, "传送门: AfterRegisterPair", ["CreatureDataId", this.Wpo], ["PbDataId", this.wDe]);
    }
    this.IsPortalRegistered = true;
    this.Nla();
    this.EnablePortalRenderingTarget();
  }
  AfterUnRegisterPair() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SceneItem", 39, "传送门: AfterUnRegisterPair", ["CreatureDataId", this.Wpo], ["PbDataId", this.wDe]);
    }
    this.IsPortalRegistered = false;
    this.tTa();
    this.DisablePortalRenderingTarget();
  }
  Dhh() {
    var t = this.R0n?.Config.RenderConfig;
    this.Ahh(t);
  }
  Rhh() {
    var t = this.GetDynamicPortalCreatorCreatureDataId();
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    let e = this.R0n?.Config.RenderConfig;
    if (t?.IsInit) {
      t = t.Entity.GetComponent(228);
      e = t?.GetPortalRenderConfig() ?? e;
    }
    this.Ahh(e);
  }
  Ahh(t) {
    switch (t?.ViewDistance.Type) {
      case "Custom":
        this.Ihh = t.ViewDistance.Distance;
        if (!Info_1.Info.IsBuildShipping) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("SceneItem", 39, "传送门画面可视距离使用了自定义配置，可能造成性能问题，请检查是否为正式配置", ["CreatureDataId", this.Wpo], ["PbDataId", this.wDe], ["CaptureMaxViewDistance", this.Ihh]);
          }
        }
        break;
      case "High":
        this.Ihh = 10000;
        break;
      case "Mid":
        this.Ihh = 6000;
        break;
      default:
        this.Ihh = 3000;
    }
    if (t?.ForceRenderActors?.length) {
      for (const r of t.ForceRenderActors) {
        var e;
        if (!r.Platform || !!Platform_1.Platform.CheckAssetPlatformInclude(r.Platform.toString())) {
          if ((e = r.PathName.split(".")).length < 3) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("SceneItem", 39, "[PortalComp:InitRenderConfig] actor路径解析错误", ["PathName", r.PathName], ["CreatureDataId", this.Wpo], ["PbDataId", this.wDe]);
            }
          } else {
            this.Lel.add(e[1] + "." + e[2]);
          }
        }
      }
      this.GetKuroActorSubsystem()?.OnAddToSubsystem.Remove(this.Rel);
      if (this.Lel.size) {
        this.GetKuroActorSubsystem()?.OnAddToSubsystem.Add(this.Rel);
      }
    }
    if (t?.SetRenderFlags?.length) {
      for (const a of t.SetRenderFlags) {
        var i = showFlagTypeToName.get(a.Type);
        if (i) {
          this.jul.set(i, a.Enable);
        }
      }
    }
  }
  Ael() {
    var t;
    var e;
    if (this.IsPortalRegistered) {
      e = (t = this.s1n === "A") ? this.GetCreatureDataId() : this.GetPairCreatureDataId();
      ModelManager_1.ModelManager.PortalModel?.GetPortal(e)?.SetCaptureShowingActors(!t, (0, puerts_1.$ref)(this.GetPairCaptureIgnoredActors()), (0, puerts_1.$ref)(this.GetPairCaptureForceShowActors()));
    }
  }
  GetPairCaptureIgnoredActors() {
    var t;
    var e;
    if (this.IsPortalPrepared) {
      t = this.ActorComp.GetAllActorsInSceneInteractionLevel() ?? UE.NewArray(UE.Actor);
      if ((e = this.GetPortalEffectActor())?.IsValid() && (e = e.EffectComponent, (e = EffectSystem_1.EffectSystem.GetSureEffectActor(e))?.IsValid())) {
        t.Add(e);
      }
      return t;
    }
  }
  GetPairCaptureForceShowActors() {
    if (this.IsPortalPrepared) {
      var t = UE.NewArray(UE.Actor);
      var e = UE.KuroGISystem.GetKuroGISystem(GlobalData_1.GlobalData.World.GetWorld())?.GetKuroGlobalGIActor();
      if (e && (t.Add(e), e.DynamicCloudsActor)) {
        t.Add(e.DynamicCloudsActor);
      }
      if (this.Lel.size) {
        var i = this.GetKuroActorSubsystem();
        for (const a of this.Lel) {
          var r = i?.GetActor(FNameUtil_1.FNameUtil.GetDynamicFName(a));
          if (r?.IsValid()) {
            t.Add(r);
          }
        }
      }
      return t;
    }
  }
  GetPairCaptureMaxViewDistance() {
    return this.Ihh;
  }
  GetPairCaptureShowFlags() {
    if (this.IsPortalPrepared) {
      var t;
      var e;
      var i = UE.NewMap(UE.BuiltinString, UE.BuiltinBool);
      for ([t, e] of this.jul) {
        i.Add(t, e);
      }
      return i;
    }
  }
  xel() {
    var t = this.GetPortalEffectActor();
    if (t && this.Uel === ResourceSystem_1.ResourceSystem.InvalidId) {
      let i = false;
      t = ResourceSystem_1.ResourceSystem.LoadAsync(t.EffectData.AssetPathName.toString(), UE.EffectModelBase, (t, e) => {
        i = true;
        if (this.Uel !== ResourceSystem_1.ResourceSystem.InvalidId) {
          ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Uel);
        }
        this.Uel = ResourceSystem_1.ResourceSystem.InvalidId;
        if (t?.IsValid() && (t instanceof EffectModelGroup_1.default || t instanceof EffectModelNiagara_1.default)) {
          this.Iel = t;
          this.xka();
          this.I6a();
        }
      });
      if (!i) {
        this.Uel = t;
      }
    }
  }
  GetPortalEffectActor() {
    if (this.yel) {
      return this.yel;
    }
    var t = this.ActorComp?.GetInteractionMainActor();
    if (t) {
      t = t.GetActorByKey(PORTAL_EFFECT_REF);
      if (t?.RootComponent && t.IsA(UE.BP_EffectActor_C.StaticClass())) {
        return this.yel = t;
      }
    }
  }
  Pel() {
    if (this.Iel?.IsValid()) {
      return this.Iel;
    }
  }
  wel(e, i) {
    if (e instanceof EffectModelGroup_1.default) {
      var r = e.EffectData ? e.EffectData.Num() : 0;
      for (let t = 0; t < r; t++) {
        var a = e.EffectData?.GetKey(t);
        if (a?.IsValid() && a instanceof EffectModelNiagara_1.default) {
          a = a.FloatParameters.Get(FNameUtil_1.FNameUtil.GetDynamicFName(i));
          if (!a?.bUseCurve) {
            return a?.Constant;
          }
        }
      }
    } else if (e instanceof EffectModelNiagara_1.default) {
      var t = e.FloatParameters.Get(FNameUtil_1.FNameUtil.GetDynamicFName(i));
      if (!t?.bUseCurve) {
        return t?.Constant;
      }
    }
  }
  x6a() {
    var t = this.GetPortalEffectActor();
    if (t && !t.EffectComponent) {
      t.Play("SceneItemPortalComponent.PlayPortalEffect");
    }
  }
  D6a(t = false) {
    var e = this.GetPortalEffectActor();
    if (e && e.EffectComponent) {
      e.Stop("SceneItemPortalComponent.StopPortalEffect", t);
    }
  }
  EnablePortalRenderingTarget() {
    var t;
    var e = this.GetPortalEffectActor();
    if (e?.IsValid()) {
      e = e.EffectComponent;
      (t = new EffectParameterNiagara_1.EffectParameterNiagara()).UserParameterFloat = [];
      t.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName(PORTAL_EFFECT_RT_ENABLE_KEY), 1]);
      EffectSystem_1.EffectSystem.SetEffectParameterNiagara(e, t);
    }
  }
  DisablePortalRenderingTarget() {
    var t;
    var e = this.GetPortalEffectActor();
    if (e?.IsValid()) {
      e = e.EffectComponent;
      (t = new EffectParameterNiagara_1.EffectParameterNiagara()).UserParameterFloat = [];
      t.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName(PORTAL_EFFECT_RT_ENABLE_KEY), 0]);
      EffectSystem_1.EffectSystem.SetEffectParameterNiagara(e, t);
    }
  }
  EnablePortalRipple(t) {
    var e;
    var i = this.GetPortalEffectActor();
    if (i?.IsValid()) {
      i = i.EffectComponent;
      (e = new EffectParameterNiagara_1.EffectParameterNiagara()).UserParameterFloat = [];
      e.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName(PORTAL_EFFECT_RIPPLE_ENABLE_KEY), 1]);
      e.UserParameterColor = [];
      e.UserParameterColor.push([FNameUtil_1.FNameUtil.GetDynamicFName(PORTAL_EFFECT_RIPPLE_POS_KEY), new UE.LinearColor(t.X, t.Y, t.Z, 1)]);
      EffectSystem_1.EffectSystem.SetEffectParameterNiagara(i, e);
    }
  }
  DisablePortalRipple() {
    var t;
    var e = this.GetPortalEffectActor();
    if (e?.IsValid()) {
      e = e.EffectComponent;
      (t = new EffectParameterNiagara_1.EffectParameterNiagara()).UserParameterFloat = [];
      t.UserParameterFloat.push([FNameUtil_1.FNameUtil.GetDynamicFName(PORTAL_EFFECT_RIPPLE_ENABLE_KEY), 0]);
      EffectSystem_1.EffectSystem.SetEffectParameterNiagara(e, t);
    }
  }
  GetKuroActorSubsystem() {
    if (!this.Tel?.IsValid()) {
      this.Tel = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.KuroActorSubsystem.StaticClass());
    }
    return this.Tel;
  }
  nQs() {
    var t;
    var e;
    var i;
    if (this.rQs && ModelManager_1.ModelManager.GameModeModel?.UseWorldPartition) {
      if (!this.oQs?.IsValid()) {
        t = this.ActorComp.ActorLocation;
        i = this.ActorComp.ActorRotation;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Level", 7, "传送门: CreateStreamingSource", ["CreatureDataId", this.Wpo], ["PbDataId", this.wDe], ["Location", t], ["Rotation", i]);
        }
        (e = new UE.TransformDouble()).SetLocation(t);
        e.SetRotation(new UE.Quat(i));
        e.SetScale3D(new UE.VectorDouble(1, 1, 1));
        (i = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), e)).AddComponentByClass(UE.SceneComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
        i.D_K2_SetActorLocation(t, false, undefined, false);
        i.AddComponentByClass(UE.WorldPartitionStreamingSourceComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false).EnableStreamingSource();
        this.oQs = i;
      }
    }
  }
  yEr() {
    if (this.oQs?.IsValid()) {
      ActorSystem_1.ActorSystem.Put("SceneItemPortalComponent.DestroyStreamingSource", this.oQs);
    }
    this.oQs = undefined;
  }
  yrl() {
    if (this.rQs && ModelManager_1.ModelManager.GameModeModel.UseWorldPartition && this.oQs?.IsValid()) {
      const e = this.oQs.GetComponentByClass(UE.WorldPartitionStreamingSourceComponent.StaticClass());
      if (e?.IsStreamingSourceEnabled() && !this.vrl?.Valid()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Level", 39, "传送门: 等待独立流送源Streaming", ["CreatureDataId", this.Wpo], ["PbDataId", this.wDe]);
        }
        var t = this.oQs.D_K2_GetActorLocation();
        const i = this.Erl(t);
        this.vrl = TimerSystem_1.TimerSystem.Forever(t => {
          if (e.IsStreamingCompletedForLayers(i, false, ResourceSystem_1.STREAMING_SOURCE_RADIUS, false, undefined, true)) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Level", 39, "传送门: 独立流送源Streaming完成", ["CreatureDataId", this.Wpo], ["PbDataId", this.wDe]);
            }
            this.Srl();
            this.xka();
            this.I6a();
          }
        }, ResourceSystem_1.CHECK_STREAMING_INTERVAL);
      }
    }
  }
  Srl() {
    if (this.vrl?.Valid()) {
      TimerSystem_1.TimerSystem.Remove(this.vrl);
    }
    this.vrl = undefined;
  }
  Erl(t) {
    var e = UE.NewArray(UE.BuiltinName);
    let i = ModelManager_1.ModelManager.WorldModel.CurEnvironmentInfo.DataLayerType;
    if (ModelManager_1.ModelManager.WorldModel.IsEnableEnvironmentDetecting) {
      switch (VoxelUtils_1.VoxelUtils.GetVoxelInfo(GlobalData_1.GlobalData.World, t).EnvType) {
        case 0:
        case 2:
          i = "DataLayerRuntime_EncloseSpace";
          break;
        case 1:
          i = "DataLayerRuntime_EncloseSpaceRoom";
          break;
        default:
          i = "";
      }
      if (i !== ModelManager_1.ModelManager.WorldModel.CurEnvironmentInfo.DataLayerType && Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("SceneItem", 39, "传送门: 独立流送源位置的封闭信息与当前环境的封闭信息不同，可能永远无法等待到流送成功", ["CreatureDataId", this.Wpo], ["PbDataId", this.wDe], ["CurrentDataLayerType", ModelManager_1.ModelManager.WorldModel.CurEnvironmentInfo.DataLayerType], ["StreamingPosDataLayerType", i]);
      }
    }
    t = i === "" ? undefined : FNameUtil_1.FNameUtil.GetDynamicFName(i);
    if (FNameUtil_1.FNameUtil.IsEmpty(t)) {
      for (const o of WorldDefine_1.dataLayerRuntimeHLOD) {
        var r = (0, puerts_1.$ref)(undefined);
        var a = FNameUtil_1.FNameUtil.GetDynamicFName(o);
        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldPartitionDataLayerNameByLabel(GlobalData_1.GlobalData.World, a, r);
        e.Add((0, puerts_1.$unref)(r));
      }
    } else {
      var s = (0, puerts_1.$ref)(undefined);
      UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldPartitionDataLayerNameByLabel(GlobalData_1.GlobalData.World, t, s);
      e.Add((0, puerts_1.$unref)(s));
    }
    return e;
  }
  Mrl() {
    var t;
    var e;
    return !this.rQs || !ModelManager_1.ModelManager.GameModeModel.UseWorldPartition || !!this.oQs?.IsValid() && (t = this.oQs.GetComponentByClass(UE.WorldPartitionStreamingSourceComponent.StaticClass()), e = this.oQs.D_K2_GetActorLocation(), e = this.Erl(e), t.IsStreamingCompletedForLayers(e, false, ResourceSystem_1.STREAMING_SOURCE_RADIUS, false, undefined, true));
  }
  GetTriggerActor() {
    if (this.Eel) {
      return this.Eel;
    }
    var t = this.ActorComp?.GetInteractionMainActor();
    if (t) {
      t = t.GetActorByKey(TELEPORT_TRIGGER_REF);
      if (t) {
        return this.Eel = t;
      }
    }
  }
  GetTriggerComp() {
    var t = this.GetTriggerActor();
    if (t) {
      return t.GetComponentByClass(UE.ShapeComponent.StaticClass());
    }
  }
  Nla() {
    var t = this.GetTriggerActor();
    var e = this.GetTriggerComp();
    if (t && e) {
      e.SetUseCCD(true);
      t.OnActorBeginOverlap.Add((t, e) => {
        this.Fla(e);
      });
    }
  }
  tTa() {
    var t = this.GetTriggerActor();
    var e = this.GetTriggerComp();
    t?.OnActorBeginOverlap.Clear();
    e?.SetUseCCD(false);
  }
  Fla(t) {
    var e = Global_1.Global.BaseCharacter;
    if (e && (t === e || t instanceof UE.BP_BaseItem_C)) {
      if (SceneItemPortalComponent_1.P6a.has(t)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SceneItem", 39, "传送门: actor正在传送中，不允许重复触发", ["CreatureDataId", this.Wpo], ["PbDataId", this.wDe]);
        }
      } else {
        var i = e.CharacterActorComponent?.Entity.GetComponent(65);
        if (!i?.GetHoldingEntity() || t !== i?.GetHoldingActor()) {
          var i = ActorUtils_1.ActorUtils.GetEntityByActor(t);
          var r = i?.Entity?.GetComponent(1);
          r?.ResetAllCachedTime();
          var r = r ? this.Ull(r) : this.dIa(t);
          if (r) {
            if (this.Dll(t, t === e)) {
              if (i?.Valid) {
                r = i.Entity.GetComponent(156);
                if (r && r.CurrentState instanceof SceneItemManipulableCastProjectileState_1.SceneItemManipulatableCastProjectileState) {
                  return;
                }
              }
              if (t !== this.ActorComp?.Owner) {
                this.g4a(t, t === e);
              }
            } else if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("SceneItem", 39, "传送门: 无法安全通过传送门，忽略", ["CreatureDataId", this.Wpo], ["PbDataId", this.wDe]);
            }
          } else {
            if ((r = i?.Entity?.GetComponent(156)) && r.CurrentState instanceof SceneItemManipulableCastState_1.SceneItemManipulableCastState && (e = r.CurrentState).HasHitCallback()) {
              e.CallHitCallback(t, this.ActorComp?.Owner);
            }
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("SceneItem", 39, "传送门: 不是从正面进入传送门，忽略", ["CreatureDataId", this.Wpo], ["PbDataId", this.wDe]);
            }
          }
        }
      }
    }
  }
  g4a(i, r) {
    if (!SceneItemPortalComponent_1.P6a.has(i)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneItem", 39, "传送门: BeforeTeleport", ["CreatureDataId", this.Wpo], ["PbDataId", this.wDe], ["ActorPos", Vector_1.Vector.Create(i?.D_GetTransform().GetLocation())], ["ActorRot", Rotator_1.Rotator.Create(i?.D_GetTransform().Rotator())]);
      }
      let t = ModelManager_1.ModelManager.CreatureModel?.GetEntity(this.qSa)?.Entity;
      var a = (t = t || EntitySystem_1.EntitySystem.Get(this.qSa))?.GetComponent(215);
      var s = a?.PortalCapture;
      var o = this.s1n === "A";
      var _ = o ? this.GetCreatureDataId() : this.GetPairCreatureDataId();
      var n = ModelManager_1.ModelManager.PortalModel?.GetPortal(_);
      if (s && n) {
        const c = new PortalTeleportParam(i, r, this, a);
        s = i.D_GetTransform();
        a = i.D_GetTransform();
        let t = Vector_1.Vector.ZeroVector;
        if (r) {
          var h = i.GetComponentByClass(UE.CharacterMovementComponent.StaticClass());
          if (!h) {
            return;
          }
          t = h.Velocity;
        } else {
          t = i.StaticMesh.GetComponentVelocity();
        }
        h = t.ToOrientationRotator();
        h.Roll = a.Rotator().Roll;
        a.SetRotation(h.Quaternion());
        c.BeforeTeleportVelocityTransform = a;
        if (r) {
          h = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
          if (h?.Valid) {
            this.EnablePortalRipple(s.GetLocation());
            SceneItemPortalComponent_1.P6a.add(i);
            a = h.Entity?.GetComponent(67);
            if (a && (r = a.GetEnableMovementSync(), c.OriginEnableMovementSync = r)) {
              a.SetEnableMovementSync(false, "传送门: 传送开始");
            }
            r = PortalUtils_1.PortalUtils.GetMappingOffsetTransformToOtherPortal(s, _, o, s.GetRotation().GetForwardVectorDouble(), PORTAL_TELEPORT_OFFSET);
            c.AfterTeleportTransform = r;
            a = h.Entity.GetComponent(205);
            if (a.HasTag(-1371021686)) {
              _ = h.Entity.GetComponent(99);
              if (a.HasTag(-1009010563) && !_?.GetIsInLastPathway()) {
                _?.OnRoleBeforeTeleportThroughPortal();
                this.p4a(c);
                return;
              }
              if (!a.HasTag(400631093)) {
                h.Entity.GetComponent(40).StopGroup1Skill("Portal Stop skill");
              }
            }
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRolePassPortalBeforeTeleport, h, c.InPortalComp, c.OutPortalComp);
            var _ = h.Entity.GetComponent(3);
            if (_.InputDirectProxy.IsZero()) {
              c.AfterTeleportInputDirection = Vector_1.Vector.ZeroVectorProxy;
            } else {
              _.InputDirectProxy.ToOrientationQuat(MathUtils_1.MathUtils.CommonTempQuat);
              a = s.InverseTransformRotation(MathUtils_1.MathUtils.CommonTempQuat.ToUeQuat());
              c.AfterTeleportInputDirection = Vector_1.Vector.Create(r.TransformRotation(a).GetForwardVector());
            }
            _.InputRotatorProxy.Quaternion(MathUtils_1.MathUtils.CommonTempQuat);
            var a = s.InverseTransformRotation(MathUtils_1.MathUtils.CommonTempQuat.ToUeQuat());
            c.AfterTeleportInputRotator = Rotator_1.Rotator.Create(r.TransformRotation(a).Rotator());
            var _ = CameraController_1.CameraController.FightCamera?.LogicComponent;
            var a = _?.CameraModifyController;
            var l = _?.CameraConfigController?.GetCameraConfigByTag(1827994262);
            let t = false;
            let e = l ? l.FadeInTime * CommonDefine_1.MILLIONSECOND_PER_SECOND : DEFAULT_ROLE_TELEPORT_PERFORM_TIME;
            if (e < TimerSystem_1.MIN_TIME) {
              e = 0;
            }
            var E = l?.Priority ?? DEFAULT_ROLE_TELEPORT_PERFORM_PRIORITY;
            var m = o ? n.PortalWorldTransform1 : n.PortalWorldTransform2;
            var o = o ? n.PortalWorldTransform2 : n.PortalWorldTransform1;
            var n = Vector_1.Vector.Create();
            MathUtils_1.MathUtils.CommonTempRotator.FromUeRotator(m.Rotator());
            MathUtils_1.MathUtils.CommonTempRotator.Quaternion(MathUtils_1.MathUtils.CommonTempQuat).GetUpVector(n);
            var m = Vector_1.Vector.Create();
            MathUtils_1.MathUtils.CommonTempRotator.FromUeRotator(o.Rotator());
            MathUtils_1.MathUtils.CommonTempRotator.Quaternion(MathUtils_1.MathUtils.CommonTempQuat).GetUpVector(m);
            var o = n.Equals(m);
            if (_ && a) {
              n = ModelManager_1.ModelManager.CameraModel.CameraTransform.GetRelativeTransform(s).op_Multiply(r);
              _.Tick(0);
              m = _.PlayerLocation;
              m = s.InverseTransformPosition(m.ToUeVector());
              r = r.TransformPosition(m);
              m = Vector_1.Vector.Create(r);
              r = Vector_1.Vector.Create(n.GetLocation());
              n = Vector_1.Vector.Create();
              if (o && this.rWa(m, r, n) && !n.Equals(r)) {
                t = true;
                o = Vector_1.Vector.Dist(m, n);
                c.BeforeTeleportCameraSettings = new UE.SCameraModifier_Settings();
                c.BeforeTeleportCameraSettings.Priority = E;
                c.BeforeTeleportCameraSettings.IsModifiedArmLength = true;
                c.BeforeTeleportCameraSettings.ArmLength = o;
                c.BeforeTeleportCameraSettings.IsLockInput = true;
                a.ApplyCameraModify(undefined, 0, e * CommonDefine_1.SECOND_PER_MILLIONSECOND, 0, 0, c.BeforeTeleportCameraSettings, undefined, l?.FadeInCurve, l?.FadeOutCurve, undefined, "", undefined);
                a.Update(0);
              }
              CameraUtility_1.CameraUtility.GetCameraCharacterRotation(MathUtils_1.MathUtils.CommonTempRotator);
              c.AfterTeleportCameraSettings = new UE.SCameraModifier_Settings();
              if (c.BeforeTeleportCameraSettings?.IsModifiedArmLength) {
                c.AfterTeleportCameraSettings.IsModifiedArmLength = true;
                c.AfterTeleportCameraSettings.ArmLength = c.BeforeTeleportCameraSettings.ArmLength;
              }
              c.AfterTeleportCameraSettings.Priority = E;
              c.AfterTeleportCameraSettings.IsModifiedArmRotation = true;
              c.AfterTeleportCameraSettings.IsModifiedArmRotationPitch = true;
              c.AfterTeleportCameraSettings.IsModifiedArmRotationYaw = true;
              c.AfterTeleportCameraSettings.IsModifiedArmRotationRoll = true;
              c.AfterTeleportCameraSettings.ArmRotation = new UE.Rotator(_.CameraRotation.Pitch - MathUtils_1.MathUtils.CommonTempRotator.Pitch, _.CameraRotation.Yaw - MathUtils_1.MathUtils.CommonTempRotator.Yaw, _.CameraRotation.Roll - MathUtils_1.MathUtils.CommonTempRotator.Roll);
              c.AfterTeleportCameraSettings.ResetFinalArmRotation = true;
              c.AfterTeleportCameraSettings.IsResetFinalArmRotationToSpecificPitch = true;
              c.AfterTeleportCameraSettings.ResetFinalArmRotationToSpecificPitch = _.CameraRotation.Pitch;
              c.AfterTeleportCameraSettings.IsResetFinalArmRotationToSpecificYaw = true;
              c.AfterTeleportCameraSettings.ResetFinalArmRotationToSpecificYaw = _.CameraRotation.Yaw - MathUtils_1.MathUtils.CommonTempRotator.Yaw;
              c.AfterTeleportCameraSettings.IsLockInput = true;
            }
            SceneItemPortalComponent_1.sKa(Math.max(ROLE_TELEPORT_SCREEN_EFFECT_INTERVAL, e));
            if (!t || e < TimerSystem_1.MIN_TIME) {
              this.p4a(c);
            } else {
              h.Entity.GetComponent(179).SetTimeScale(Infinity, 0, undefined, e * CommonDefine_1.SECOND_PER_MILLIONSECOND, 11);
              TimerSystem_1.TimerSystem.Delay(() => {
                this.p4a(c);
              }, e);
            }
          } else if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("SceneItem", 7, "传送门: 失败,找不到当前玩家角色");
          }
        } else {
          this.EnablePortalRipple(s.GetLocation());
          SceneItemPortalComponent_1.P6a.add(i);
          this.p4a(c);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("SceneItem", 39, "传送门: 失败,找不到PortalCapture/PortalPair");
      }
    }
  }
  p4a(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneItem", 39, "传送门: ExecTeleport", ["CreatureDataId", this.Wpo], ["PbDataId", this.wDe], ["ActorPos", Vector_1.Vector.Create(t.OtherActor?.D_GetTransform().GetLocation())], ["ActorRot", Rotator_1.Rotator.Create(t.OtherActor?.D_GetTransform().Rotator())]);
    }
    if (t.IsRole) {
      this.v4a(t);
    }
    this.PortalCapture?.Teleport(t.BeforeTeleportVelocityTransform, t.OtherActor, t.IsRole);
    this.f4a(t);
  }
  f4a(t) {
    var e;
    var i;
    var r;
    var a;
    var s;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneItem", 39, "传送门: AfterTeleport", ["CreatureDataId", this.Wpo], ["PbDataId", this.wDe], ["ActorPos", Vector_1.Vector.Create(t.OtherActor?.D_GetTransform().GetLocation())], ["ActorRot", Rotator_1.Rotator.Create(t.OtherActor?.D_GetTransform().Rotator())]);
    }
    this.DisablePortalRipple();
    if (t.IsRole) {
      UE.NiagaraFunctionLibrary.MarkNiagaraScalabilityNeedUpdate(GlobalData_1.GlobalData.World);
      if ((e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity)?.Valid) {
        (i = e.Entity.GetComponent(3)).ResetAllCachedTime();
        r = e.Entity.GetComponent(205);
        a = e.Entity.GetComponent(62);
        s = CameraController_1.CameraController.FightCamera?.LogicComponent?.CameraModifyController;
        if (t.AfterTeleportCameraSettings) {
          s?.ApplyCameraModify(undefined, 0.1, 0, 0, 0, t.AfterTeleportCameraSettings, undefined, undefined, undefined, undefined, "", undefined);
        }
        if (t.AfterTeleportInputDirection && t.AfterTeleportInputRotator) {
          i.SetInputDirect(t.AfterTeleportInputDirection);
          i.SetInputRotator(t.AfterTeleportInputRotator);
        } else {
          i.ClearInput();
        }
        a.ClearMoveVectorCache();
        if (r.HasTag(-1371021686) && r.HasTag(-1009010563)) {
          e.Entity.GetComponent(99)?.OnRoleTeleportThroughPortal();
        }
        if (r.HasTag(1491611589)) {
          e.Entity.GetComponent(65)?.OnRoleTeleport();
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRolePassPortalAfterTeleport, e, t.InPortalComp, t.OutPortalComp);
        if (t.OriginEnableMovementSync) {
          e?.Entity?.GetComponent(67)?.SetEnableMovementSync(true, "传送门: 传送完成");
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Teleport", 7, "传送门:失败,找不到当前玩家角色");
      }
    }
    TimerSystem_1.TimerSystem.Next(() => {
      SceneItemPortalComponent_1.P6a.delete(t.OtherActor);
    });
  }
  v4a(t) {
    var e;
    var t = t.AfterTeleportTransform?.GetLocation();
    if (t) {
      (e = Protocol_1.Aki.Protocol.Km_.create()).F4n = this.Wpo;
      e.P5n = Vector_1.Vector.Create(t);
      Net_1.Net.Call(25652, e, t => {
        if (!t || t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SceneItem", 39, "PassPortalRequest返回错误", ["PortalEntityId", this.Wpo]);
          }
        }
      });
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItem", 39, "PassPortalRequest获取新位置出错", ["PortalEntityId", this.Wpo]);
    }
  }
  dIa(t) {
    var e = Vector_1.Vector.Create(this.ActorComp.ActorLocationProxy);
    var t = Vector_1.Vector.Create(t.D_K2_GetActorLocation());
    var i = Vector_1.Vector.Create(this.ActorComp.ActorForwardProxy);
    var r = Vector_1.Vector.Create();
    t.Subtraction(e, r);
    r.Z = 0;
    r.Normalize();
    var t = i.DotProduct(r);
    return t > -MathUtils_1.MathUtils.SmallNumber;
  }
  Ull(t) {
    var e = Vector_1.Vector.Create(this.ActorComp.ActorLocationProxy);
    var i = Vector_1.Vector.Create(t.ActorLocationProxy);
    var t = Vector_1.Vector.Create(t.LastActorLocation);
    var r = Vector_1.Vector.Create(this.ActorComp.ActorForwardProxy);
    var a = Vector_1.Vector.Create();
    t.Subtraction(e, a);
    a.Z = 0;
    a.Normalize();
    var e = r.DotProduct(a) > -MathUtils_1.MathUtils.SmallNumber;
    t.Subtraction(i, a);
    a.Z = 0;
    a.Normalize();
    var t = r.DotProduct(a) > -MathUtils_1.MathUtils.SmallNumber;
    return e && t;
  }
  Dll(t, e) {
    var i = this.s1n === "A";
    var r = i ? this.GetCreatureDataId() : this.GetPairCreatureDataId();
    var a = ModelManager_1.ModelManager.PortalModel?.GetPortal(r);
    if (!a) {
      return false;
    }
    if (!ModelManager_1.ModelManager.CreatureModel?.GetEntity(this.qSa)?.Entity?.GetComponent(215)) {
      return false;
    }
    a = i ? a.PortalWorldTransform1 : a.PortalWorldTransform2;
    a = t.D_GetTransform().GetRelativeTransform(a).GetLocation();
    if (Math.abs(a.Y) > Math.abs(this.PortalBounds.Y) || Math.abs(a.Z) > Math.abs(this.PortalBounds.Z)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneItem", 39, "传送门: 检查到进门时中心不在门框范围内", ["CreatureDataId", this.Wpo], ["PbDataId", this.wDe]);
      }
      if (ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(PORTAL_DEBUG_KEY)) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText("传送门: 检查到进门时中心不在门框范围内");
      }
      return false;
    }
    if (e) {
      if (!(t instanceof TsBaseCharacter_1.default) || !t.CharacterActorComponent) {
        return false;
      }
      a = PortalUtils_1.PortalUtils.GetMappingOffsetTransformToOtherPortal(t.D_GetTransform(), r, i, t.D_GetActorForwardVector(), PORTAL_TELEPORT_OFFSET);
      if (!a) {
        return false;
      }
      if (this.Rll(a.GetLocation(), a.GetLocation(), undefined, t.CharacterActorComponent) && (Log_1.Log.CheckInfo() && Log_1.Log.Info("SceneItem", 39, "传送门: 检查到玩家出门位置有碰撞，有穿地风险", ["CreatureDataId", this.Wpo], ["PbDataId", this.wDe]), ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(PORTAL_DEBUG_KEY))) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText("传送门: 检查到玩家出门位置有碰撞，有穿地风险");
      }
    }
    return true;
  }
  static sKa(t = ROLE_TELEPORT_SCREEN_EFFECT_INTERVAL) {
    this.nKa();
    this.aKa = ModelManager_1.ModelManager.ScreenEffectModel.PlayScreenEffect(ROLE_TELEPORT_SCREEN_EFFECT_PATH);
    this.hKa = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, Global_1.Global.BaseCharacter?.D_GetTransform(), ROLE_TELEPORT_SCREEN_POST_PROCESS_EFFECT_PATH, "[SceneItemPortalComponent.PlayPortalScreenEffect]", new EffectContext_1.EffectContext(Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint()));
    EffectSystem_1.EffectSystem.SetEffectIgnoreVisibilityOptimize(this.hKa, true);
    if (this.lKa?.Valid()) {
      TimerSystem_1.TimerSystem.Remove(this.lKa);
    }
    this.lKa = TimerSystem_1.TimerSystem.Delay(() => {
      this.nKa();
    }, t);
  }
  static nKa() {
    if (this.aKa) {
      ModelManager_1.ModelManager.ScreenEffectModel?.EndScreenEffect(this.aKa);
    }
    this.aKa = undefined;
    if (this.hKa && EffectSystem_1.EffectSystem.IsValid(this.hKa)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.hKa, "[SceneItemPortalComponent.EndPortalScreenEffects]", false);
    }
    this.hKa = undefined;
    if (this.lKa?.Valid()) {
      TimerSystem_1.TimerSystem.Remove(this.lKa);
    }
    this.lKa = undefined;
  }
  rWa(t, e, i) {
    var r;
    return !!CameraController_1.CameraController.FightCamera?.LogicComponent && !!(r = CameraController_1.CameraController.FightCamera.LogicComponent.Character) && !(this.iWa || (this.iWa = UE.NewObject(UE.TraceSphereElement.StaticClass()), this.iWa.bIsSingle = true, this.iWa.bIgnoreSelf = true, this.iWa.bTraceComplex = false, this.iWa.WorldContextObject = GlobalData_1.GlobalData.World, this.iWa.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Camera)), this.iWa.Radius = CameraController_1.CameraController.FightCamera.LogicComponent.CollisionProbeSize, this.iWa.ActorsToIgnore.Empty(), this.iWa.ActorsToIgnore.Add(r), TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.iWa, t), TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.iWa, e), ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(PORTAL_DEBUG_KEY) ? (UE.KismetSystemLibrary.DrawDebugLine(GlobalData_1.GlobalData.World, new UE.Vector(t.X, t.Y, t.Z), new UE.Vector(e.X, e.Y, e.Z), new UE.LinearColor(0, 0, 1, 1), 5, 5), this.iWa.SetDrawDebugTrace(2), this.iWa.DrawTime = 5, this.iWa.SetTraceColor(0, 1, 0, 1), this.iWa.SetTraceHitColor(1, 0, 0, 1)) : this.iWa.SetDrawDebugTrace(0), !TraceElementCommon_1.TraceElementCommon.SphereTrace(this.iWa, "SceneItemPortalComponent.CameraTraceBlock")) && !!this.iWa.HitResult?.bBlockingHit && !(TraceElementCommon_1.TraceElementCommon.GetHitLocation(this.iWa.HitResult, 0, i), 0);
  }
  Rll(t, e, i, r) {
    if (!this.Lll) {
      this.Lll = UE.NewObject(UE.TraceCapsuleElement.StaticClass());
      this.Lll.bIsSingle = true;
      this.Lll.bIgnoreSelf = true;
      this.Lll.bTraceComplex = false;
      this.Lll.WorldContextObject = GlobalData_1.GlobalData.World;
      this.Lll.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround);
    }
    this.Lll.Radius = r.ScaledRadius;
    this.Lll.HalfHeight = r.ScaledHalfHeight;
    this.Lll.ActorsToIgnore.Empty();
    this.Lll.ActorsToIgnore.Add(r.Actor);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Lll, t);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Lll, e);
    if (ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(PORTAL_DEBUG_KEY)) {
      UE.KismetSystemLibrary.DrawDebugLine(GlobalData_1.GlobalData.World, new UE.Vector(t.X, t.Y, t.Z), new UE.Vector(e.X, e.Y, e.Z), new UE.LinearColor(0, 0, 1, 1), 5, 5);
      this.Lll.SetDrawDebugTrace(2);
      this.Lll.DrawTime = 5;
      this.Lll.SetTraceColor(0, 1, 0, 1);
      this.Lll.SetTraceHitColor(1, 0, 0, 1);
    } else {
      this.Lll.SetDrawDebugTrace(0);
    }
    return !!TraceElementCommon_1.TraceElementCommon.CapsuleTrace(this.Lll, "SceneItemPortalComponent.RoleTeleportTraceBlock") && !!this.Lll.HitResult?.bBlockingHit && !(i && TraceElementCommon_1.TraceElementCommon.GetHitLocation(this.Lll.HitResult, 0, i), 0);
  }
};
SceneItemPortalComponent.aKa = undefined;
SceneItemPortalComponent.hKa = undefined;
SceneItemPortalComponent.lKa = undefined;
SceneItemPortalComponent.P6a = new Set();
SceneItemPortalComponent = SceneItemPortalComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(215)], SceneItemPortalComponent);
exports.SceneItemPortalComponent = SceneItemPortalComponent; //# sourceMappingURL=SceneItemPortalComponent.js.map