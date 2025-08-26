"use strict";

var SceneItemNoRenderPortalComponent_1;
var __decorate = this && this.__decorate || function (e, t, r, o) {
  var i;
  var a = arguments.length;
  var s = a < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, r) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, r, o);
  } else {
    for (var n = e.length - 1; n >= 0; n--) {
      if (i = e[n]) {
        s = (a < 3 ? i(s) : a > 3 ? i(t, r, s) : i(t, r)) || s;
      }
    }
  }
  if (a > 3 && s) {
    Object.defineProperty(t, r, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemNoRenderPortalComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon");
const TsBaseCharacter_1 = require("../../../../Character/TsBaseCharacter");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const Global_1 = require("../../../../Global");
const GlobalData_1 = require("../../../../GlobalData");
const LevelGamePlayController_1 = require("../../../../LevelGamePlay/LevelGamePlayController");
const LevelGeneralContextDefine_1 = require("../../../../LevelGamePlay/LevelGeneralContextDefine");
const LevelGeneralNetworks_1 = require("../../../../LevelGamePlay/LevelGeneralNetworks");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ScrollingTipsController_1 = require("../../../../Module/ScrollingTips/ScrollingTipsController");
const SeamlessTravelDefine_1 = require("../../../../Module/SeamlessTravel/SeamlessTravelDefine");
const TeleportController_1 = require("../../../../Module/Teleport/TeleportController");
const TeleportDefine_1 = require("../../../../Module/Teleport/TeleportDefine");
const ActorUtils_1 = require("../../../../Utils/ActorUtils");
const GravityUtils_1 = require("../../../../Utils/GravityUtils");
const PortalUtils_1 = require("../../../../Utils/PortalUtils");
const SceneItemManipulableCastProjectileState_1 = require("../../Manipulate/SceneItemManipulableCastProjectileState");
const SceneItemManipulableCastState_1 = require("../../Manipulate/SceneItemManipulableCastState");
const INVALID_ENTITY = 0;
const TELEPORT_TRIGGER_REF = "TeleportTrigger";
const PORTAL_DEBUG_KEY = "Portal";
const PORTAL_TELEPORT_OFFSET = 200;
const NO_LOADING_SCREEN_EFFECT_MAX_INTERVAL = 1000;
class NoRenderPortalTeleportParam {
  constructor(e, t, r, o) {
    this.OtherActor = e;
    this.IsRole = t;
    this.InPortalComp = r;
    this.AfterTeleportTransform = o;
    this.OriginEnableMovementSync = false;
    this.AfterTeleportGravityDirect = undefined;
  }
}
let SceneItemNoRenderPortalComponent = SceneItemNoRenderPortalComponent_1 = class SceneItemNoRenderPortalComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.IIl = "A";
    this.wDe = 0;
    this.Wpo = 0;
    this.TIl = INVALID_ENTITY;
    this.Tln = INVALID_ENTITY;
    this.ActorComp = undefined;
    this.Eel = undefined;
    this.Rd_ = undefined;
    this.IsPortalPrepared = false;
    this.IsPortalConnected = false;
    this.R0n = undefined;
    this.Rnn = () => {
      this.xka();
      this.LIl();
    };
    this._ln = (e, t) => {
      var r;
      if (t?.Valid && (r = t.Entity.GetComponent(0)?.GetPbDataId()) && this.TIl === r) {
        if (EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.RemoveEntity, this._ln)) {
          EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, t, EventDefine_1.EEventName.RemoveEntity, this._ln);
        }
        this.RIl();
      }
    };
    this.Lll = undefined;
  }
  GetPbDataId() {
    return this.wDe;
  }
  GetCreatureDataId() {
    return this.Wpo;
  }
  GetPortalModel() {
    return this.IIl;
  }
  GetTargetCreatureDataId() {
    return this.Tln;
  }
  SetTargetCreatureDataId(e) {
    this.Tln = e;
  }
  OnInitData(e) {
    var t = e.GetParam(SceneItemNoRenderPortalComponent_1)[0];
    this.R0n = t;
    if (this.R0n.Config.Type === "Static") {
      this.TIl = this.R0n.Config.LinkPortalEntityId;
    }
    this.IIl = this.R0n.Config.PortalModel;
    if (e.EntityData) {
      this.wDe = e.EntityData?.v9n;
    }
    this.Wpo = this.Entity.GetComponent(0).GetCreatureDataId();
    return true;
  }
  OnStart() {
    this.ActorComp = this.Entity.GetComponent(203);
    return true;
  }
  OnActivate() {
    if (this.ActorComp?.Valid && (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn) || EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn), this.ActorComp?.GetIsSceneInteractionLoadCompleted())) {
      this.Rnn();
    }
    return true;
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
    }
    this.RIl();
    this.R6a();
    return !(this.Eel = undefined);
  }
  OnDisable(e) {
    if (this.Entity.IsInit) {
      this.RIl();
      this.R6a();
    }
  }
  U6a() {
    var e;
    return !!(this.Entity.Flag & 4) && !!this.ActorComp && !!this.ActorComp?.GetIsSceneInteractionLoadCompleted() && !!(e = this.ActorComp.CreatureData.GetEntityOnlineInteractType(), LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(e, false));
  }
  xka() {
    if (!!this.U6a() && !this.IsPortalPrepared) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SceneItem", 39, "无画面传送门: PreparePortal Success", ["CreatureDataId", this.Wpo], ["PbDataId", this.wDe], ["PlaneTransform", this.ActorComp?.ActorTransform]);
      }
      this.IsPortalPrepared = true;
    }
  }
  R6a() {
    if (this.IsPortalPrepared) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SceneItem", 39, "无画面传送门: UnPreparePortal Success", ["CreatureDataId", this.Wpo], ["PbDataId", this.wDe]);
      }
      this.IsPortalPrepared = false;
    }
  }
  CanConnectPortal() {
    var e;
    return !!(this.Entity.Flag & 4) && !!this.ActorComp?.GetIsSceneInteractionLoadCompleted() && !(e = this.ActorComp.CreatureData.GetEntityOnlineInteractType(), !LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(e, false)) && !!this.IsPortalPrepared && !!(e = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(this.TIl)?.Entity)?.GetComponent(1) && (!(e = e.GetComponent(217)) || !!e.IsPortalPrepared);
  }
  LIl() {
    var e;
    var t;
    var r;
    if (this.CanConnectPortal() && !this.IsPortalConnected && (e = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(this.TIl))?.Valid) {
      t = e.Entity.GetComponent(0).GetCreatureDataId();
      r = e.Entity.GetComponent(217);
      this.SetTargetCreatureDataId(t);
      r?.SetTargetCreatureDataId(this.GetCreatureDataId());
      this.AfterConnectPair();
      r?.AfterConnectPair();
      if (!EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.RemoveEntity, this._ln)) {
        EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, e, EventDefine_1.EEventName.RemoveEntity, this._ln);
      }
    }
  }
  RIl() {
    var e;
    if (this.IsPortalConnected) {
      e = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(this.TIl)?.Entity?.GetComponent(217);
      this.SetTargetCreatureDataId(0);
      e?.SetTargetCreatureDataId(0);
      this.AfterDisconnectPair();
      e?.AfterDisconnectPair();
    }
  }
  AfterConnectPair() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SceneItem", 39, "无画面传送门: AfterConnectPair", ["CreatureDataId", this.Wpo], ["PbDataId", this.wDe]);
    }
    this.IsPortalConnected = true;
    this.Nla();
  }
  AfterDisconnectPair() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SceneItem", 39, "无画面传送门: AfterDisconnectPair", ["CreatureDataId", this.Wpo], ["PbDataId", this.wDe]);
    }
    this.IsPortalConnected = false;
    this.tTa();
  }
  GetTriggerActor() {
    if (this.Eel) {
      return this.Eel;
    }
    var e = this.ActorComp?.GetInteractionMainActor();
    if (e) {
      e = e.GetActorByKey(TELEPORT_TRIGGER_REF);
      if (e) {
        return this.Eel = e;
      }
    }
  }
  GetTriggerComp() {
    var e = this.GetTriggerActor();
    if (e) {
      return e.GetComponentByClass(UE.ShapeComponent.StaticClass());
    }
  }
  GetTeleportToSelfTransformProxy() {
    var e = this.GetTriggerActor();
    if (e) {
      var t = this.R0n?.Config.TeleportToSelfPos;
      if (t) {
        this.Rd_ ||= Transform_1.Transform.Create();
        this.Rd_.SetScale3D(Vector_1.Vector.OneVectorProxy);
        this.Rd_.GetLocation().FromConfigVector(t);
        this.Rd_.SetRotation(e.K2_GetActorRotation().Quaternion());
        return this.Rd_;
      }
    }
  }
  Nla() {
    var e = this.GetTriggerActor();
    var t = this.GetTriggerComp();
    if (e && t) {
      t.SetUseCCD(true);
      e.OnActorBeginOverlap.Add((e, t) => {
        this.Fla(t);
      });
    }
  }
  tTa() {
    var e = this.GetTriggerActor();
    var t = this.GetTriggerComp();
    e?.OnActorBeginOverlap.Clear();
    t?.SetUseCCD(false);
  }
  Fla(e) {
    var t = Global_1.Global.BaseCharacter;
    if (t && (e === t || e instanceof UE.BP_BaseItem_C)) {
      if (SceneItemNoRenderPortalComponent_1.P6a.has(e)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SceneItem", 39, "无画面传送门: actor正在传送中，不允许重复触发", ["CreatureDataId", this.Wpo], ["PbDataId", this.wDe]);
        }
      } else {
        var r = t.CharacterActorComponent?.Entity.GetComponent(65);
        if (!r?.GetHoldingEntity() || e !== r?.GetHoldingActor()) {
          var r = ActorUtils_1.ActorUtils.GetEntityByActor(e);
          var o = r?.Entity?.GetComponent(1);
          o?.ResetAllCachedTime();
          var o = o ? this.Ull(o) : this.dIa(e);
          if (o) {
            o = this.lFl(e);
            if (o) {
              if (this.Dll(e, e === t)) {
                if (r?.Valid) {
                  o = r.Entity.GetComponent(157);
                  if (o && o.CurrentState instanceof SceneItemManipulableCastProjectileState_1.SceneItemManipulatableCastProjectileState) {
                    return;
                  }
                }
                if (e !== this.ActorComp?.Owner) {
                  this.g4a(e, e === t);
                }
              } else if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("SceneItem", 39, "无画面传送门: 无法安全通过传送门，忽略", ["CreatureDataId", this.Wpo], ["PbDataId", this.wDe]);
              }
            } else if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("SceneItem", 39, "无画面传送门: 不满足过门条件组，忽略", ["CreatureDataId", this.Wpo], ["PbDataId", this.wDe]);
            }
          } else {
            if ((o = r?.Entity?.GetComponent(157)) && o.CurrentState instanceof SceneItemManipulableCastState_1.SceneItemManipulableCastState && (t = o.CurrentState).HasHitCallback()) {
              t.CallHitCallback(e, this.ActorComp?.Owner);
            }
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("SceneItem", 39, "无画面传送门: 不是从正面进入传送门，忽略", ["CreatureDataId", this.Wpo], ["PbDataId", this.wDe]);
            }
          }
        }
      }
    }
  }
  g4a(r, o) {
    if (!SceneItemNoRenderPortalComponent_1.P6a.has(r)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneItem", 39, "无画面传送门: BeforeTeleport", ["CreatureDataId", this.Wpo], ["PbDataId", this.wDe], ["ActorPos", Vector_1.Vector.Create(r?.D_GetTransform().GetLocation())], ["ActorRot", Rotator_1.Rotator.Create(r?.D_GetTransform().Rotator())]);
      }
      let e = ModelManager_1.ModelManager.CreatureModel?.GetEntity(this.Tln)?.Entity;
      var i = (e = e || EntitySystem_1.EntitySystem.Get(this.Tln))?.GetComponent(217);
      var a = this.GetTriggerActor()?.D_GetTransform();
      var s = i?.GetTriggerActor()?.D_GetTransform();
      if (a && s) {
        var n = r.D_GetTransform();
        if (o) {
          var l = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
          if (l?.Valid) {
            var _ = i?.R0n?.Config.GravityConfig?.GravityDirection;
            var _ = GravityUtils_1.GravityUtils.GetGravityDirectionByConfigAndActor(_, i?.ActorComp);
            let t = i?.GetTeleportToSelfTransformProxy()?.ToUeTransform();
            if (!t) {
              var h = r.GetComponentByClass(UE.CharacterMovementComponent.StaticClass());
              if (!h) {
                return;
              }
              var c = Vector_1.Vector.Create(h.Velocity);
              var h = Vector_1.Vector.Create(h.Kuro_GetGravityDirect());
              var m = -Vector_1.Vector.DotProduct(c, h);
              h.Multiply(m, MathUtils_1.MathUtils.CommonTempVector);
              c.AdditionEqual(MathUtils_1.MathUtils.CommonTempVector);
              var h = r.D_GetActorForwardVector();
              var m = this.GetTriggerActor().D_GetActorForwardVector().op_Multiply(-1);
              let e = m;
              if (MathUtils_1.MathUtils.DotProduct(m, c) > 0) {
                e = c;
              } else if (MathUtils_1.MathUtils.DotProduct(m, h) > 0) {
                e = h;
              }
              t = PortalUtils_1.PortalUtils.GetMappingOffsetTransformByPortalTransform(n, a, s, _, e, PORTAL_TELEPORT_OFFSET);
            }
            const v = new NoRenderPortalTeleportParam(r, o, this, t);
            v.AfterTeleportGravityDirect = _;
            c = l.Entity?.GetComponent(67);
            if (c && (m = c.GetEnableMovementSync(), v.OriginEnableMovementSync = m)) {
              c.SetEnableMovementSync(false, "无画面传送门: 传送开始");
            }
            SceneItemNoRenderPortalComponent_1.P6a.add(r);
            this.p4a(v);
          } else if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("SceneItem", 7, "无画面传送门: 失败,找不到当前玩家角色");
          }
        } else {
          SceneItemNoRenderPortalComponent_1.P6a.add(r);
          h = i?.GetTeleportToSelfTransformProxy()?.ToUeTransform() ?? PortalUtils_1.PortalUtils.GetMappingTransformByPortalTransform(n, a, s);
          const v = new NoRenderPortalTeleportParam(r, o, this, h);
          this.p4a(v);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("SceneItem", 39, "无画面传送门: 失败,传送门Transform不合法");
      }
    }
  }
  p4a(e) {
    var t = e.AfterTeleportTransform.GetLocation();
    var r = e.AfterTeleportTransform.Rotator();
    var o = e.AfterTeleportGravityDirect;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneItem", 39, "无画面传送门: ExecTeleport", ["CreatureDataId", this.Wpo], ["PbDataId", this.wDe], ["ActorPos", e.OtherActor?.D_GetTransform().GetLocation()], ["ActorRot", e.OtherActor?.D_GetTransform().Rotator()], ["TargetPos", t], ["TargetRot", r], ["TargetGravityDirect", o]);
    }
    if (e.IsRole) {
      this.v4a(e);
      if (TeleportController_1.TeleportController.QueryCanTeleportNoLoading(t, true)) {
        SceneItemNoRenderPortalComponent_1.PlayNoLoadingPassPortalEffects(this.R0n?.Config.TeleportSceneEffect?.ScreenEffectPath, this.R0n?.Config.TeleportSceneEffect?.WorldEffectPath, NO_LOADING_SCREEN_EFFECT_MAX_INTERVAL);
        ModelManager_1.ModelManager.TeleportModel.TeleportMode = 4;
        TeleportController_1.TeleportController.TeleportToPositionWithGravityNoLoading(t, r, o, "无画面传送门传送", true, true).finally().finally(() => {
          this.f4a(e);
        });
      } else {
        var i = TeleportController_1.TeleportController.ParseTeleportTransitionOptionToPb(this.R0n?.Config.TeleportLoadingEffect);
        switch (i.p5n) {
          case Protocol_1.Aki.Protocol.p5n.Proto_CenterText:
            ModelManager_1.ModelManager.TeleportModel.TeleportMode = 0;
            break;
          case Protocol_1.Aki.Protocol.p5n.Proto_Seamless:
            ModelManager_1.ModelManager.TeleportModel.TeleportMode = 4;
            if (ModelManager_1.ModelManager.TeleportModel.SeamlessEndHandle) {
              TimerSystem_1.TimerSystem.Remove(ModelManager_1.ModelManager.TeleportModel.SeamlessEndHandle);
              ModelManager_1.ModelManager.TeleportModel.SeamlessEndHandle = undefined;
            }
            ModelManager_1.ModelManager.TeleportModel.SeamlessConfig = new SeamlessTravelDefine_1.SeamlessTravelContext();
            ModelManager_1.ModelManager.TeleportModel.SeamlessConfig.ParseConfig(i.R$s);
            break;
          case Protocol_1.Aki.Protocol.p5n.Proto_FadeInScreen:
            ModelManager_1.ModelManager.TeleportModel.TeleportMode = 3;
            break;
          default:
            ModelManager_1.ModelManager.TeleportModel.TeleportMode = 1;
        }
        var a = new TeleportDefine_1.TeleportContext(Protocol_1.Aki.Protocol.v4s.Xvs, undefined, undefined, undefined, i);
        TeleportController_1.TeleportController.TeleportToPositionNoSync(t, r, o, "ClientSetPlayerPos", a).finally(() => {
          this.f4a(e);
        });
        ModelManager_1.ModelManager.WorldMapModel.WaitToTeleportMarkConfigId = undefined;
      }
    } else {
      e.OtherActor.D_K2_KuroTeleportTo(t, r);
      this.f4a(e);
    }
  }
  f4a(e) {
    var t;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("SceneItem", 39, "无画面传送门: AfterTeleport", ["CreatureDataId", this.Wpo], ["PbDataId", this.wDe], ["ActorPos", Vector_1.Vector.Create(e.OtherActor?.D_GetTransform().GetLocation())], ["ActorRot", Rotator_1.Rotator.Create(e.OtherActor?.D_GetTransform().Rotator())]);
    }
    if (e.IsRole) {
      if ((t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity)?.Valid) {
        if (e.OriginEnableMovementSync) {
          t?.Entity?.GetComponent(67)?.SetEnableMovementSync(true, "无画面传送门: 传送完成");
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Teleport", 7, "无画面传送门:失败,找不到当前玩家角色");
      }
    }
    TimerSystem_1.TimerSystem.Next(() => {
      SceneItemNoRenderPortalComponent_1.P6a.delete(e.OtherActor);
    });
  }
  v4a(e) {
    if (e.AfterTeleportTransform) {
      const t = this.wDe;
      const r = e.AfterTeleportTransform.GetLocation();
      const o = e.AfterTeleportTransform.Rotator();
      LevelGeneralNetworks_1.LevelGeneralNetworks.RequestClientTeleportByNoRenderPortal(t, r, o, e => {
        if (!e || e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SceneItem", 39, "无画面传送门: RequestRolePassPortal请求失败", ["ConfigId", t], ["Location", r], ["Rotation", o], ["Code", e?.Q4n]);
          }
        }
      });
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItem", 39, "无画面传送门: RequestRolePassPortal获取Transform出错", ["ConfigId", this.wDe]);
    }
  }
  dIa(e) {
    var t;
    var r;
    var o = this.GetTriggerActor();
    return !!o && (t = Vector_1.Vector.Create(o.D_K2_GetActorLocation()), e = Vector_1.Vector.Create(e.D_K2_GetActorLocation()), o = Vector_1.Vector.Create(o.D_GetActorForwardVector()), r = Vector_1.Vector.Create(), e.Subtraction(t, r), r.Z = 0, r.Normalize(), o.DotProduct(r) > -MathUtils_1.MathUtils.SmallNumber);
  }
  Ull(e) {
    var t;
    var r;
    var o;
    var i = this.GetTriggerActor();
    return !!i && (o = Vector_1.Vector.Create(i.D_K2_GetActorLocation()), t = Vector_1.Vector.Create(e.ActorLocationProxy), e = Vector_1.Vector.Create(e.LastActorLocation), i = Vector_1.Vector.Create(i.D_GetActorForwardVector()), r = Vector_1.Vector.Create(), e.Subtraction(o, r), r.Normalize(), o = i.DotProduct(r) > -MathUtils_1.MathUtils.SmallNumber, e.Subtraction(t, r), r.Normalize(), e = i.DotProduct(r) > -MathUtils_1.MathUtils.SmallNumber, o) && e;
  }
  Dll(t, r) {
    var o = ModelManager_1.ModelManager.CreatureModel?.GetEntity(this.Tln)?.Entity?.GetComponent(217);
    if (!o) {
      return false;
    }
    if (r) {
      if (!(t instanceof TsBaseCharacter_1.default) || !t.CharacterActorComponent) {
        return false;
      }
      r = t.GetComponentByClass(UE.CharacterMovementComponent.StaticClass());
      if (!r) {
        return false;
      }
      var i = o?.R0n?.Config.GravityConfig?.GravityDirection;
      var i = GravityUtils_1.GravityUtils.GetGravityDirectionByConfigAndActor(i, o?.ActorComp);
      let e = o.GetTeleportToSelfTransformProxy();
      if (!e) {
        var a = this.GetTriggerActor()?.D_GetTransform();
        var o = o.GetTriggerActor()?.D_GetTransform();
        if (!a || !o) {
          return false;
        }
        e = PortalUtils_1.PortalUtils.GetMappingOffsetTransformByPortalTransform(t.D_GetTransform(), a, o, i, r.Velocity, PORTAL_TELEPORT_OFFSET);
      }
      if (!e) {
        return false;
      }
      if (this.Rll(e.GetLocation(), e.GetLocation(), undefined, t.CharacterActorComponent) && (Log_1.Log.CheckInfo() && Log_1.Log.Info("SceneItem", 39, "无画面传送门: 检查到玩家出门位置有碰撞，有穿地风险", ["CreatureDataId", this.Wpo], ["PbDataId", this.wDe]), ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(PORTAL_DEBUG_KEY))) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText("无画面传送门: 检查到玩家出门位置有碰撞，有穿地风险");
      }
    }
    return true;
  }
  lFl(e) {
    var t;
    var r = this.R0n?.Config.Condition;
    return !r || (t = LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id), ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(r, e, t));
  }
  static PlayNoLoadingPassPortalEffects(e, t, r) {
    this.UIl();
    if (e) {
      this.DIl = ModelManager_1.ModelManager.ScreenEffectModel.PlayScreenEffect(e);
    }
    if (t) {
      this.AIl = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, Global_1.Global.BaseCharacter?.D_GetTransform(), t, "[SceneItemNoRenderPortalComponent.PlayPortalScreenEffect]", new EffectContext_1.EffectContext(Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint()));
      EffectSystem_1.EffectSystem.SetEffectIgnoreVisibilityOptimize(this.AIl, true);
    }
    if (this.xIl?.Valid()) {
      TimerSystem_1.TimerSystem.Remove(this.xIl);
    }
    this.xIl = TimerSystem_1.TimerSystem.Delay(() => {
      this.UIl();
    }, r);
  }
  static UIl() {
    if (this.DIl) {
      ModelManager_1.ModelManager.ScreenEffectModel?.EndScreenEffect(this.DIl);
    }
    this.DIl = undefined;
    if (this.AIl && EffectSystem_1.EffectSystem.IsValid(this.AIl)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.AIl, "[SceneItemNoRenderPortalComponent.EndPortalScreenEffects]", false);
    }
    this.AIl = undefined;
    if (this.xIl?.Valid()) {
      TimerSystem_1.TimerSystem.Remove(this.xIl);
    }
    this.xIl = undefined;
  }
  Rll(e, t, r, o) {
    if (!this.Lll) {
      this.Lll = UE.NewObject(UE.TraceCapsuleElement.StaticClass());
      this.Lll.bIsSingle = true;
      this.Lll.bIgnoreSelf = true;
      this.Lll.bTraceComplex = false;
      this.Lll.WorldContextObject = GlobalData_1.GlobalData.World;
      this.Lll.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround);
    }
    this.Lll.Radius = o.ScaledRadius;
    this.Lll.HalfHeight = o.ScaledHalfHeight;
    this.Lll.ActorsToIgnore.Empty();
    this.Lll.ActorsToIgnore.Add(o.Actor);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Lll, e);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Lll, t);
    if (ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(PORTAL_DEBUG_KEY)) {
      UE.KismetSystemLibrary.DrawDebugLine(GlobalData_1.GlobalData.World, new UE.Vector(e.X, e.Y, e.Z), new UE.Vector(t.X, t.Y, t.Z), new UE.LinearColor(0, 0, 1, 1), 5, 5);
      this.Lll.SetDrawDebugTrace(2);
      this.Lll.DrawTime = 5;
      this.Lll.SetTraceColor(0, 1, 0, 1);
      this.Lll.SetTraceHitColor(1, 0, 0, 1);
    } else {
      this.Lll.SetDrawDebugTrace(0);
    }
    return !!TraceElementCommon_1.TraceElementCommon.CapsuleTrace(this.Lll, "SceneItemNoRenderPortalComponent.RoleTeleportTraceBlock") && !!this.Lll.HitResult?.bBlockingHit && !(r && TraceElementCommon_1.TraceElementCommon.GetHitLocation(this.Lll.HitResult, 0, r), 0);
  }
};
SceneItemNoRenderPortalComponent.DIl = undefined;
SceneItemNoRenderPortalComponent.AIl = undefined;
SceneItemNoRenderPortalComponent.xIl = undefined;
SceneItemNoRenderPortalComponent.P6a = new Set();
SceneItemNoRenderPortalComponent = SceneItemNoRenderPortalComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(217)], SceneItemNoRenderPortalComponent);
exports.SceneItemNoRenderPortalComponent = SceneItemNoRenderPortalComponent; //# sourceMappingURL=SceneItemNoRenderPortalComponent.js.map