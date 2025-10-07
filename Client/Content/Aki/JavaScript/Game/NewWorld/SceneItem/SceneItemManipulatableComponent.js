"use strict";

var SceneItemManipulatableComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, s) {
  var h;
  var a = arguments.length;
  var n = a < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, i, s);
  } else {
    for (var o = t.length - 1; o >= 0; o--) {
      if (h = t[o]) {
        n = (a < 3 ? h(n) : a > 3 ? h(e, i, n) : h(e, i)) || n;
      }
    }
  }
  if (a > 3 && n) {
    Object.defineProperty(e, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemManipulatableComponent = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Queue_1 = require("../../../Core/Container/Queue");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const EffectContext_1 = require("../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController");
const LevelGeneralContextDefine_1 = require("../../LevelGamePlay/LevelGeneralContextDefine");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const RenderConfig_1 = require("../../Render/Config/RenderConfig");
const SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager");
const GravityUtils_1 = require("../../Utils/GravityUtils");
const ComponentForceTickController_1 = require("../../World/Controller/ComponentForceTickController");
const BulletController_1 = require("../Bullet/BulletController");
const CharacterNameDefines_1 = require("../Character/Common/CharacterNameDefines");
const SceneItemDynamicAttachTargetComponent_1 = require("./Common/Component/SceneItemDynamicAttachTargetComponent");
const SceneItemJigsawBaseComponent_1 = require("./Jigsaw/SceneItemJigsawBaseComponent");
const SceneItemManipulableAdsorbedState_1 = require("./Manipulate/SceneItemManipulableAdsorbedState");
const SceneItemManipulableBoomerangCastState_1 = require("./Manipulate/SceneItemManipulableBoomerangCastState");
const SceneItemManipulableCastFreeState_1 = require("./Manipulate/SceneItemManipulableCastFreeState");
const SceneItemManipulableCastProjectileState_1 = require("./Manipulate/SceneItemManipulableCastProjectileState");
const SceneItemManipulableCastToOutletState_1 = require("./Manipulate/SceneItemManipulableCastToOutletState");
const SceneItemManipulableCastToTargetState_1 = require("./Manipulate/SceneItemManipulableCastToTargetState");
const SceneItemManipulableChantState_1 = require("./Manipulate/SceneItemManipulableChantState");
const SceneItemManipulableDrawState_1 = require("./Manipulate/SceneItemManipulableDrawState");
const SceneItemManipulableDropState_1 = require("./Manipulate/SceneItemManipulableDropState");
const SceneItemManipulableHoldState_1 = require("./Manipulate/SceneItemManipulableHoldState");
const SceneItemManipulableLevitateCastState_1 = require("./Manipulate/SceneItemManipulableLevitateCastState");
const SceneItemManipulableMatchJigsawBaseState_1 = require("./Manipulate/SceneItemManipulableMatchJigsawBaseState");
const SceneItemManipulableMatchOutletState_1 = require("./Manipulate/SceneItemManipulableMatchOutletState");
const SceneItemManipulablePrecastState_1 = require("./Manipulate/SceneItemManipulablePrecastState");
const SceneItemManipulableResetState_1 = require("./Manipulate/SceneItemManipulableResetState");
const SceneItemManipulableTrackTargetCastToFreeState_1 = require("./Manipulate/SceneItemManipulableTrackTargetCastToFreeState");
const SceneItemManipulableTrackTargetCastToTargetState_1 = require("./Manipulate/SceneItemManipulableTrackTargetCastToTargetState");
const SceneItemHitUtils_1 = require("./Util/SceneItemHitUtils");
var ManipulatableStateKey = Protocol_1.Aki.Protocol.Ww_.Proto_SceneItemBBKey_ManipulatableState;
const ON_GROUND_OFFSET = 0.2;
const BINDING_TAG = new UE.FName("Obj");
const CONTROL_OBJECT_TAG = new UE.FName("ControlObj");
const INVALID_ID = 0;
const MAX_CREATE_BULLET_NUM = 1;
const MIN_VELOCITY = 0.3;
const FAKE_GRAVITY_MIN_VELOCITY = 1;
const FAKE_GRAVITY_MIN_ANGLE = 0.1;
const ZERO_VELOCITY_FRAME_NUM = 10;
const CHANGE_MODE_NAX_COUNT = 3;
let SceneItemManipulatableComponent = SceneItemManipulatableComponent_1 = class SceneItemManipulatableComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Config = undefined;
    this.ManipulateBaseConfig = undefined;
    this.LoadingBaseConfigFinish = false;
    this.ConfigHoldOffset = undefined;
    this.ConfigHoldRotator = undefined;
    this.ConfigMatchType = undefined;
    this.TargetActorComponent = undefined;
    this.TargetOutletComponent = undefined;
    this.ActorComp = undefined;
    this.ActivatedOutlet = undefined;
    this.jCn = undefined;
    this.Wnr = undefined;
    this.qHr = undefined;
    this.inn = undefined;
    this.Yfn = undefined;
    this.Jfn = undefined;
    this.zfn = undefined;
    this.Zfn = undefined;
    this.CastTargetLocation = undefined;
    this.MatchSequence = undefined;
    this.PlayingMatchSequence = false;
    this.PropComp = undefined;
    this.CastCurve = undefined;
    this.IsCanBeHeld = true;
    this.sxr = undefined;
    this.JUn = undefined;
    this.epn = 0;
    this.NeedRemoveControllerId = false;
    this.IsRequestingRemoveControllerId = false;
    this.tpn = false;
    this.FinishCheckInitAttach = false;
    this.EnableDynamicAttach = false;
    this.mBe = undefined;
    this.opn = false;
    this.rpn = undefined;
    this.npn = false;
    this.spn = true;
    this.apn = true;
    this.hpn = true;
    this.lpn = true;
    this.u1t = undefined;
    this.Hfn = undefined;
    this._pn = undefined;
    this.upn = undefined;
    this.UsingAssistantHoldOffset = false;
    this.ConfigAssistantHoldOffset = undefined;
    this.MovementTargetLocation = undefined;
    this.MovementTargetRotation = undefined;
    this.ZOe = undefined;
    this.Sbo = undefined;
    this.VDl = undefined;
    this.HDl = undefined;
    this.HoldState = undefined;
    this.PrecastState = undefined;
    this.AdsorbedState = undefined;
    this.CastToTargetState = undefined;
    this.CastToOutletState = undefined;
    this.CastFreeState = undefined;
    this.jDl = undefined;
    this.WDl = undefined;
    this.QDl = undefined;
    this.j1l = false;
    this.cpn = "";
    this.mpn = 0;
    this.dpn = false;
    this.Cpn = false;
    this.gpn = false;
    this.fpn = 0;
    this.ppn = 0;
    this.vpn = MAX_CREATE_BULLET_NUM;
    this.Mpn = 0;
    this.Epn = 0;
    this.IsHoldingUsePhysics = false;
    this.ForceMoving = false;
    this.LastHoldingLocation = Vector_1.Vector.Create();
    this.BCe = undefined;
    this.a_n = undefined;
    this.YO = undefined;
    this.Spn = undefined;
    this.Vga = -1;
    this.$ga = 0;
    this.zl_ = false;
    this.t6 = 0;
    this.Jl_ = new Queue_1.Queue(3);
    this.Oc1 = undefined;
    this.ypn = false;
    this.Ipn = (t, e, i) => {
      var s = e.Entity.GetComponent(0);
      if (this.u1t?.RelationId === s.GetPbDataId()) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.Ipn);
        if (e.Entity.GetComponent(203).GetIsSceneInteractionLoadCompleted()) {
          this.Tpn(e, this.u1t.PbRelationMatchCfgIndex);
          this.Lpn(e);
        } else {
          EventSystem_1.EventSystem.AddWithTarget(e.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.b8_);
        }
      }
    };
    this.b8_ = () => {
      var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.u1t.RelationId);
      EventSystem_1.EventSystem.RemoveWithTarget(t.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.b8_);
      this.Tpn(t, this.u1t.PbRelationMatchCfgIndex);
      this.Lpn(t);
    };
    this.Dpn = () => {
      var t = Global_1.Global.BaseCharacter.CharacterActorComponent.Entity;
      this.oZo(t, this.cpn);
      EventSystem_1.EventSystem.RemoveWithTarget(this, EventDefine_1.EEventName.OnSceneItemHit, this.Dpn);
      if (this.dpn) {
        this.Rpn();
      }
    };
    this.Upn = (t, e) => {
      if (e !== Global_1.Global.BaseCharacter.CharacterActorComponent.Owner && (e = Global_1.Global.BaseCharacter.CharacterActorComponent.Entity, this.oZo(e, String(this.fpn)), this.dpn)) {
        this.Rpn();
      }
    };
    this.Apn = () => {
      if (this.GetState() === 2) {
        this.SetState(1, "OnManipulateCancelChanting");
      }
    };
    this.Rnn = () => {
      if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn)) {
        EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
      }
      this.ActorComp?.GetPrimitiveComponent().OnComponentBeginOverlap.Add(this.I7a);
    };
    this.I7a = (t, e, i, s, h, a) => {
      if (i && (i = i.GetCollisionProfileName(), RenderConfig_1.RenderConfig.WaterCollisionProfileName.op_Equality(i))) {
        GlobalData_1.GlobalData.BpEventManager.被控物撞到水面时.Broadcast(this.ActorComp.Owner, e);
      }
    };
    this.KHr = t => {
      this.Epn += t;
      if (!this.spn) {
        this.Ppn(t);
      }
      if (!this.apn) {
        this.xpn();
      }
      if (!this.hpn) {
        this.wpn();
      }
      if (!this.lpn) {
        this.Bpn(t);
      }
      if (this.ActorComp?.ActorInitNotStandardGravity) {
        this.Oec();
      }
      this.Wnr.DeepCopy(this.ActorComp.ActorLocationProxy);
      this.qHr.DeepCopy(this.ActorComp.ActorRotationProxy);
      if (!this.IsCanBeHeld && !!this.tpn && !this.opn) {
        if (this.ManipulateBaseConfig?.被控制CD && this.ManipulateBaseConfig?.被控制CD > 0) {
          this.opn = true;
          this.rpn = TimerSystem_1.TimerSystem.Delay(() => {
            this.opn = false;
            this.IsCanBeHeld = true;
            if (this.NeedRemoveControllerId && !this.IsRequestingRemoveControllerId) {
              this.bpn();
            }
            this.rpn = undefined;
          }, this.ManipulateBaseConfig.被控制CD * TimeUtil_1.TimeUtil.InverseMillisecond);
        } else {
          this.IsCanBeHeld = true;
          if (this.NeedRemoveControllerId && !this.IsRequestingRemoveControllerId) {
            this.bpn();
          }
        }
      }
      if (this.spn && this.apn && (this.npn || this.hpn) && this.lpn) {
        this.npn = false;
        this.TryDisableTick("[SceneItemManipulatableComponent.OnTick] 没有被控制");
        this.ActorComp.ResetLocationCachedTime();
        this._pn?.CollectSampleAndSend(true);
      }
    };
    this.KDl = (t, e, i) => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SceneItem", 19, "[Manipulate] 控物状态改变", ["creatureId", this.u1t?.GetCreatureDataId()], ["entityId", this.Entity.Id], ["pbDataId", this.u1t?.GetPbDataId()], ["state", t], ["fromRemote", e], ["reason", i]);
      }
      if (e) {
        if (t === undefined) {
          this.KTl(1);
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SceneItem", 19, "[Manipulate] 设置了无效的控物状态", ["creatureId", this.u1t?.GetCreatureDataId()], ["entityId", this.Entity.Id], ["pbDataId", this.u1t?.GetPbDataId()], ["state", t], ["fromRemote", e], ["场景物件状态", this.inn?.GetTagNames()]);
          }
        } else if (this.LoadingBaseConfigFinish) {
          this.KTl(t);
        }
      }
    };
    this.$Dl = t => {
      this.TryEnableTick();
      this.ZOe?.ChangeMoveController(t);
    };
    this.UPi = (t, e) => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SceneItem", 31, "[电池] 改变状态", ["State", this.inn.GetTagNames()]);
      }
      if (t === -1611484717) {
        this.inn.RemoveTag(-938118674);
        this.inn.AddTag(1926099076);
      } else if (t === -1660917319) {
        this.inn.RemoveTag(1926099076);
        this.inn.AddTag(-938118674);
      }
    };
    this.qpn = (t, e) => {
      if (t !== 0) {
        t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
        this.Tpn(t, e);
      } else {
        this.Gpn();
      }
    };
    this.kpn = t => SceneItemHitUtils_1.SceneItemHitUtils.CheckHitDataMatchPlayerAttack(t);
  }
  ControlledByLocalPlayer() {
    return this.epn === Global_1.Global.BaseCharacter?.CharacterActorComponent?.CreatureData.GetCreatureDataId();
  }
  GetControllerId() {
    return this.epn;
  }
  SetControllerId(t) {
    this.epn = t;
    this.ActorComp.GetPrimitiveComponent().bCanCharacterStandOn = t === INVALID_ID;
  }
  get CanBeHeld() {
    let t = true;
    if (this.mBe) {
      t = this.mBe.IsInteractState ?? false;
    }
    return (this.YO === undefined || !!ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(this.YO, this.ActorComp.Owner, LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id))) && this.IsCanBeHeld && t && !this.opn && !this.PropComp?.IsLocked && this.LoadingBaseConfigFinish;
  }
  get PutIndex() {
    return this.Spn;
  }
  get IsProjectileAimMode() {
    return this.ypn;
  }
  set IsProjectileAimMode(t) {
    this.ypn = t;
    if (this.GetState() === 4) {
      if (this.ypn) {
        this.HoldState?.EnterProjectileAimMode();
      } else {
        this.HoldState?.ExitProjectileAimMode();
      }
    }
  }
  get CannotCastWithoutTarget() {
    return this.j1l;
  }
  IsCanInteractType() {
    return LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(this.Hfn);
  }
  OnInitData(t) {
    var t = t.GetParam(SceneItemManipulatableComponent_1)[0];
    this.Config = t;
    if (this.Config.PlayerStateRestritionId) {
      t = {
        Type: "CheckPlayerStateRestriction",
        RestrictionId: this.Config.PlayerStateRestritionId
      };
      this.YO = {
        Type: 0,
        Conditions: [t]
      };
    }
    this.u1t = this.Entity.GetComponent(0);
    var t = this.u1t.GetBaseInfo();
    this.Hfn = t?.OnlineInteractType;
    this.ConfigMatchType = t?.Category?.ControlMatchType;
    this.ZOe = undefined;
    this.jCn = Rotator_1.Rotator.Create();
    this.Wnr = Vector_1.Vector.Create();
    this.qHr = Rotator_1.Rotator.Create();
    this.Entity.GetComponent(155).AddComponentHitCondition(this, this.kpn);
    t = this.Config.DestroyCfg;
    if (t) {
      for (const e of t.Conditions) {
        switch (e.Type) {
          case IComponent_1.ETeleControlDestroyCondition.CreateBullet:
            this.dpn = true;
            break;
          case IComponent_1.ETeleControlDestroyCondition.LetGo:
            this.Cpn = true;
            break;
          case IComponent_1.ETeleControlDestroyCondition.Throw:
            this.gpn = true;
        }
      }
    }
    t = this.u1t.ComponentDataMap.get("Rys");
    this.JUn = MathUtils_1.MathUtils.LongToBigInt(t.Rys._Vn);
    return true;
  }
  OnClear() {
    if (EventSystem_1.EventSystem.HasWithTarget(this, EventDefine_1.EEventName.OnSceneItemHit, this.Dpn)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this, EventDefine_1.EEventName.OnSceneItemHit, this.Dpn);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemSwitchMoveControl, this.$Dl)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemSwitchMoveControl, this.$Dl);
    }
    return true;
  }
  Lpn(t) {
    var e = t.Entity.GetComponent(0);
    var i = this.u1t.GetPbDataId();
    if (e.OccupiedGridInfo.has(i)) {
      e = e.OccupiedGridInfo.get(i);
      (i = this.Entity.GetComponent(139)).PutDownIndex = new SceneItemJigsawBaseComponent_1.JigsawIndex(e.l8n.N5n, e.l8n.F5n);
      i.Rotation = e.l8n.V5n;
      i = t.Entity.GetComponent(162).GetSocketRotator(this.Entity);
      this.ActorComp.SetActorRotation(i.ToUeRotator());
    }
  }
  Tpn(t, e) {
    this.TargetActorComponent = t.Entity.GetComponent(1);
    t = t.Entity.GetComponent(162);
    if (t) {
      this.ActivatedOutlet = t;
      (this.ActivatedOutlet.EntityInSocket = this).ActivatedOutlet.MatchCfgIndex = e;
      e = t.GetMatchSequence(this.Entity);
      if (!StringUtils_1.StringUtils.IsEmpty(e)) {
        this.MatchSequence = e;
      }
      this.CastTargetLocation = t.GetSocketLocation(this.Entity);
      this.ActivatedOutlet.ChangeSilentTag();
      this.SetState(10, "CheckOutlet");
      this.ActorComp.SetActorRotation(this.ActivatedOutlet.GetSocketRotator(this.Entity).ToUeRotator());
    }
  }
  OnStart() {
    this.ActorComp = this.Entity.GetComponent(203);
    this.ActorComp.Owner.Tags.Add(CONTROL_OBJECT_TAG);
    this.ActorComp.Owner.Tags.Add(CharacterNameDefines_1.CharacterNameDefines.NO_SLIDE);
    this.ActorComp.GetPrimitiveComponent().SetUseCCD(true);
    this.inn = this.Entity.GetComponent(197);
    this.inn.AddTag(-1299967416);
    this.TargetActorComponent = undefined;
    this.TargetOutletComponent = undefined;
    this.jCn.DeepCopy(this.ActorComp.ActorRotationProxy);
    this.Wnr.DeepCopy(this.ActorComp.ActorLocationProxy);
    this.mBe = this.Entity.GetComponent(134);
    this.PropComp = this.Entity.GetComponent(131);
    this._pn = this.Entity.GetComponent(159);
    this.epn = this.u1t.ControllerId;
    if (this.epn !== INVALID_ID && this.u1t.IsShowingHandFx) {
      this.Fpn(this.epn, true);
    }
    var t = this.u1t.GetPbEntityInitData();
    if (t && GravityUtils_1.GravityUtils.IsEntityGravityLimitGravity(t)) {
      this.Oc1 = GravityUtils_1.GravityUtils.GetGravityDirectByEntityData(t);
    }
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.UPi);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnManipulatableSceneItemPosInFoundation, this.qpn);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnManipulateCancelChanting, this.Apn);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemSwitchMoveControl, this.$Dl);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SceneItem", 31, "[电池] OnStart", ["State", this.inn.GetTagNames()]);
    }
    this.Vpn();
    this.Hpn();
    this._pn?.ListenBlackboard(ManipulatableStateKey, this.KDl);
    this.TryDisableTick("[SceneItemManipulatableComponent.OnStart] 默认Disable");
    return true;
  }
  OnActivate() {
    if (!Info_1.Info.EnableForceTick && this.Active) {
      ComponentForceTickController_1.ComponentForceTickController.RegisterTick(this, this.KHr);
    }
    if (this.Config.BaseCfg.InitialGravity) {
      this.ActorComp.PhysicsMode = 3;
    }
  }
  Hpn() {
    ResourceSystem_1.ResourceSystem.LoadAsync(this.Config.BaseCfg.CommonConfig, UE.BP_TeleControlConfig_C, t => {
      if (t?.IsValid()) {
        this.LoadingBaseConfigFinish = true;
        this.ManipulateBaseConfig = t;
        this.j1l = this.ManipulateBaseConfig.未锁定目标时不可投掷;
        this.Entity.GetComponent(122).SetLogicRange(this.ManipulateBaseConfig.被感知范围);
        this.IsHoldingUsePhysics = this.ManipulateBaseConfig.控物保持使用物理;
        var t = this.ActorComp.GetPrimitiveComponent();
        var e = this.ManipulateBaseConfig.物体质量;
        if (e >= 0) {
          t.SetMassOverrideInKg(FNameUtil_1.FNameUtil.NONE, e, true);
        }
        t.SetLinearDamping(this.ManipulateBaseConfig.物体线性阻尼);
        t.SetAngularDamping(this.ManipulateBaseConfig.物体角速度阻尼);
        t.SetPhysMaterialOverride(this.ManipulateBaseConfig.物体物理材质);
        var e = this.Config.ThrowCfg.MotionConfig;
        if (e.Type === IComponent_1.EThrowMotion.Projectile && e.MatchSpeedCurve?.SpeedCurve) {
          ResourceSystem_1.ResourceSystem.LoadAsync(e.MatchSpeedCurve.SpeedCurve, UE.CurveFloat, t => {
            this.CastCurve = t;
          });
        }
        this.Zfn = this.ManipulateBaseConfig.投掷震屏;
        this.Yfn = this.ManipulateBaseConfig.读条震屏;
        this.zfn = this.ManipulateBaseConfig.吸取飞行震屏;
        this.Jfn = this.ManipulateBaseConfig.控物保持震屏;
        var t = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.ManipulateBaseConfig.一级偏移);
        this.ConfigHoldOffset = t;
        var e = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.ManipulateBaseConfig.二级偏移);
        this.ConfigAssistantHoldOffset = e;
        var t = this.ManipulateBaseConfig.旋转;
        this.ConfigHoldRotator = new UE.Rotator(t.Y, t.Z, t.X);
        this.ZOe = undefined;
        this.Sbo = new SceneItemManipulableResetState_1.SceneItemManipulableResetState(this);
        this.VDl = new SceneItemManipulableChantState_1.SceneItemManipulableChantState(this, this.Yfn, this.ManipulateBaseConfig.读条镜头);
        this.HDl = new SceneItemManipulableDrawState_1.SceneItemManipulableDrawState(this, this.zfn, this.ManipulateBaseConfig.吸取飞行镜头);
        this.HoldState = new SceneItemManipulableHoldState_1.SceneItemManipulableHoldState(this, this.Jfn, this.ManipulateBaseConfig.控物保持镜头, this.ManipulateBaseConfig.控物保持标签);
        this.PrecastState = new SceneItemManipulablePrecastState_1.SceneItemManipulablePrecastState(this);
        this.AdsorbedState = new SceneItemManipulableAdsorbedState_1.SceneItemManipulableAdsorbedState(this);
        var e = this.Config.ThrowCfg.MotionConfig.Type;
        switch (e) {
          case IComponent_1.EThrowMotion.Projectile:
            this.CastToTargetState = new SceneItemManipulableCastToTargetState_1.SceneItemManipulableCastToTargetState(this, this.Zfn);
            this.CastToOutletState = new SceneItemManipulableCastToOutletState_1.SceneItemManipulableCastToOutletState(this, this.Zfn);
            this.CastFreeState = new SceneItemManipulableCastFreeState_1.SceneItemManipulableCastFreeState(this, this.Zfn);
            this.jDl = new SceneItemManipulableCastProjectileState_1.SceneItemManipulatableCastProjectileState(this, undefined);
            break;
          case IComponent_1.EThrowMotion.Circumnutation:
            var i = new SceneItemManipulableBoomerangCastState_1.SceneItemManipulableBoomerangCastState(this, this.Zfn);
            this.CastToTargetState = i;
            this.CastToOutletState = i;
            this.CastFreeState = i;
            this.jDl = new SceneItemManipulableCastProjectileState_1.SceneItemManipulatableCastProjectileState(this, undefined);
            break;
          case IComponent_1.EThrowMotion.TrackTarget:
            this.CastToTargetState = new SceneItemManipulableTrackTargetCastToTargetState_1.SceneItemManipulableTrackTargetCastToTargetState(this, this.Zfn);
            this.CastToOutletState = new SceneItemManipulableCastToOutletState_1.SceneItemManipulableCastToOutletState(this, this.Zfn);
            this.CastFreeState = new SceneItemManipulableTrackTargetCastToFreeState_1.SceneItemManipulableTrackTargetCastToFreeState(this, this.Zfn);
            this.jDl = new SceneItemManipulableCastProjectileState_1.SceneItemManipulatableCastProjectileState(this, undefined);
            break;
          case IComponent_1.EThrowMotion.Levitate:
            i = new SceneItemManipulableLevitateCastState_1.SceneItemManipulableLevitateCastState(this, this.Zfn);
            this.CastToTargetState = i;
            this.CastToOutletState = i;
            this.CastFreeState = i;
            this.jDl = new SceneItemManipulableCastProjectileState_1.SceneItemManipulatableCastProjectileState(this, undefined);
        }
        t = this.Entity.GetComponent(139);
        if (t?.Valid) {
          this.WDl = new SceneItemManipulableMatchJigsawBaseState_1.SceneItemManipulableMatchJigsawBaseState(this);
        } else {
          this.WDl = new SceneItemManipulableMatchOutletState_1.SceneItemManipulableMatchOutletState(this);
        }
        this.QDl = new SceneItemManipulableDropState_1.SceneItemManipulableDropState(this);
        if (this.Cpn) {
          this.QDl.SetEnterCallback(() => {
            this.Rpn();
          });
        }
        this.KTl(this.GetState());
        this.jpn();
        if (!t?.Valid) {
          this.Opn();
        }
        e = this.Config.BulletCfg?.CreateConditions;
        if (e) {
          for (const s of e) {
            switch (s.Type) {
              case IComponent_1.EBulletCreateCondition.OnHit:
                this.cpn = String(s.BulletId);
                EventSystem_1.EventSystem.AddWithTarget(this, EventDefine_1.EEventName.OnSceneItemHit, this.Dpn);
                break;
              case IComponent_1.EBulletCreateCondition.OnMatching:
                this.CastToOutletState.SetFinishCallback(() => {
                  var t = Global_1.Global.BaseCharacter.CharacterActorComponent.Entity;
                  this.oZo(t, String(s.BulletId));
                  if (this.dpn) {
                    this.Rpn();
                  }
                });
                break;
              case IComponent_1.EBulletCreateCondition.OnCollision:
                this.fpn = s.BulletId;
                this.CastFreeState.SetHitCallback(this.Upn);
                this.CastToOutletState.SetHitCallback(this.Upn);
                this.CastToTargetState.SetHitCallback(this.Upn);
                this.jDl.SetHitCallback(this.Upn);
                if (s.TriggerCount) {
                  this.vpn = s.TriggerCount.TriggerCount;
                  this.Mpn = s.TriggerCount.TriggerInterval * TimeUtil_1.TimeUtil.InverseMillisecond;
                  this.HoldState.SetEnterCallback(() => {
                    this.mpn = 0;
                    this.Epn = 0;
                  });
                }
                break;
              case IComponent_1.EBulletCreateCondition.OnThrowTriggerTime:
                this.CastFreeState.SetEnterCallback(() => {
                  if (this.a_n === undefined) {
                    this.a_n = TimerSystem_1.TimerSystem.Delay(() => {
                      var t = Global_1.Global.BaseCharacter.CharacterActorComponent.Entity;
                      this.oZo(t, String(s.BulletId));
                      if (this.dpn) {
                        this.Rpn();
                      }
                      this.a_n = undefined;
                    }, s.TriggerTime * TimeUtil_1.TimeUtil.InverseMillisecond);
                  }
                });
                this.jDl.SetEnterCallback(() => {
                  if (this.a_n === undefined) {
                    this.a_n = TimerSystem_1.TimerSystem.Delay(() => {
                      var t = Global_1.Global.BaseCharacter.CharacterActorComponent.Entity;
                      this.oZo(t, String(s.BulletId));
                      if (this.dpn) {
                        this.Rpn();
                      }
                      this.a_n = undefined;
                    }, s.TriggerTime * TimeUtil_1.TimeUtil.InverseMillisecond);
                  }
                });
                break;
              case IComponent_1.EBulletCreateCondition.OpenGravityCollision:
                this.fpn = s.BulletId;
                this.QDl.SetHitCallback(this.Upn);
            }
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 19, "[Manipulate] 加载控物配置失败", ["creatureId", this.u1t?.GetCreatureDataId()], ["entityId", this.Entity.Id], ["pbDataId", this.u1t?.GetPbDataId()], ["path", this.Config?.BaseCfg.CommonConfig]);
      }
    });
  }
  Opn() {
    var t;
    var e;
    this.ActivatedOutlet = undefined;
    if (this.u1t.RelationId) {
      e = (t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.u1t.RelationId))?.Entity?.GetComponent(203);
      if (t?.IsInit && e?.GetIsSceneInteractionLoadCompleted()) {
        this.Tpn(t, this.u1t.PbRelationMatchCfgIndex);
        this.Lpn(t);
      } else if (t?.IsInit || e?.GetIsSceneInteractionLoadCompleted()) {
        if (t?.IsInit && !e?.GetIsSceneInteractionLoadCompleted() && (EventSystem_1.EventSystem.AddWithTarget(t.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.b8_), Log_1.Log.CheckInfo())) {
          Log_1.Log.Info("SceneItem", 31, "[ManipulatableComp] 底座实体加载完成，但预制体未加载完成", ["被控物Id", this.u1t.GetPbDataId()], ["底座Id", this.u1t.RelationId]);
        }
      } else {
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.Ipn);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SceneItem", 31, "[ManipulatableComp] 被控物比底座先加载完成", ["被控物Id", this.u1t.GetPbDataId()], ["底座Id", this.u1t.RelationId]);
        }
      }
    }
  }
  jpn() {
    var t;
    var e = this.Entity.GetComponent(126);
    if (!this.FinishCheckInitAttach) {
      if (e && this.CurrentState === this.Sbo) {
        (t = new SceneItemDynamicAttachTargetComponent_1.AttachParam()).PosAttachType = 2;
        t.PosAttachOffset = this.u1t.PbDynAttachRelPos;
        t.PosAbsolute = false;
        t.RotAttachType = 2;
        t.RotAttachOffset = this.u1t.PbDynAttachRelRot;
        t.RotAbsolute = false;
        if (this.u1t.PbDynAttachEntityConfigId) {
          e.RegEntityTarget(this.u1t.PbDynAttachEntityConfigId, this.u1t.PbDynAttachEntityActorKey, t, "[ManipulatableComp] CheckInitAttach");
        } else if (this.u1t.PbDynAttachRefActorKey?.length) {
          e.RegRefActorTarget(this.u1t.PbDynAttachRefActorKey, t, "[ManipulatableComp] CheckInitAttach");
        }
        this.FinishCheckInitAttach = true;
        this.EnableDynamicAttach = true;
        if (!e.IsRegTarget()) {
          this.TryReqAttachToFloor();
        }
      } else {
        this.FinishCheckInitAttach = true;
        this.EnableDynamicAttach = true;
      }
    }
  }
  OnForceTick(t) {
    this.KHr(t);
  }
  OnEnable() {
    if (!Info_1.Info.EnableForceTick && this.Entity?.IsInit) {
      ComponentForceTickController_1.ComponentForceTickController.RegisterTick(this, this.KHr);
    }
  }
  OnDisable(t) {
    if (!Info_1.Info.EnableForceTick) {
      ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(this);
    }
  }
  OnEnd() {
    this.TryDisableTick("[SceneItemManipulatableComponent.OnEnd] 重置数据");
    this.EnableDynamicAttach = false;
    if (this._pn?.HasMoveAuthority()) {
      this.SetState(1, "Entity OnEnd");
    }
    if (this.ActivatedOutlet) {
      this.ActivatedOutlet.EntityInSocket = undefined;
      this.ActivatedOutlet.MatchCfgIndex = undefined;
      this.ActivatedOutlet = undefined;
    }
    if (this.NeedRemoveControllerId) {
      this.bpn();
    }
    if (this.epn !== INVALID_ID) {
      this.Fpn(this.epn, false);
    }
    if (this.a_n !== undefined) {
      TimerSystem_1.TimerSystem.Remove(this.a_n);
      this.a_n = undefined;
    }
    this.ActorComp?.Owner?.OnActorHit?.Clear();
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.UPi);
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemSwitchMoveControl, this.$Dl)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemSwitchMoveControl, this.$Dl);
    }
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnManipulatableSceneItemPosInFoundation, this.qpn);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnManipulateCancelChanting, this.Apn);
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.AddEntity, this.Ipn)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.Ipn);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this, EventDefine_1.EEventName.OnSceneItemHit, this.Dpn)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this, EventDefine_1.EEventName.OnSceneItemHit, this.Dpn);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.Rnn);
    }
    this._pn?.RemoveBlackboardListener(ManipulatableStateKey, this.KDl);
    if (!Info_1.Info.EnableForceTick) {
      ComponentForceTickController_1.ComponentForceTickController.UnregisterTick(this);
    }
    if (this.upn) {
      const t = this.upn;
      TimerSystem_1.TimerSystem.Next(() => {
        ActorSystem_1.ActorSystem.Put("SceneItemManipulatableComponent.OnEnd", t);
      });
    }
    this.ClearCastDestroyTimer();
    this.ActorComp?.GetPrimitiveComponent().OnComponentHit.Clear();
    return true;
  }
  BePopupFormOutlet() {
    this.IsCanBeHeld = false;
    this.ActivatedOutlet.EntityInSocket = undefined;
    this.ActivatedOutlet.MatchCfgIndex = undefined;
    this.ActivatedOutlet = undefined;
    this.MatchSequence = undefined;
  }
  oZo(t, e) {
    if (!!this.Entity?.Valid && !(this.mpn >= this.vpn) && (!(this.mpn > 0) || !(this.Epn < this.Mpn))) {
      this.Epn = 0;
      this.mpn++;
      BulletController_1.BulletController.CreateBulletCustomTarget(t, e, this.ActorComp.ActorTransform, {}, this.JUn);
    }
  }
  Wpn(t) {
    if (this.GetState() === 10 && (this.TargetActorComponent = undefined, this.TargetOutletComponent = undefined, this.ActivatedOutlet = t.GetComponent(162), this.ActorComp?.Valid)) {
      this.ActorComp.PhysicsMode = 0;
    }
  }
  AfterRequestMatch(t, e) {
    if (this.ManipulateBaseConfig?.被控制CD && this.ManipulateBaseConfig?.被控制CD > 0) {
      this.opn = true;
      this.rpn = TimerSystem_1.TimerSystem.Delay(() => {
        this.opn = false;
        this.rpn = undefined;
      }, this.ManipulateBaseConfig.被控制CD * TimeUtil_1.TimeUtil.InverseMillisecond);
    }
    if (t) {
      this.SetState(10, "AfterRequestMatch");
      this.Wpn(e);
    } else {
      this.SetState(3, "AfterRequestMatch");
    }
  }
  TryPlayMismatchSequence(t) {
    var e;
    var i;
    var s;
    var t = t.GetComponent(162);
    var h = t.GetMismatchSequence(this.Entity);
    if (h !== undefined && t?.Valid && (this.PlayingMatchSequence = true, this.upn === undefined && this.Qpn(), t = this.upn.DefaultInstanceData, e = this.ActorComp.ActorLocationProxy, s = this.ActorComp.ActorRotationProxy, i = this.ActorComp.ActorScale, s = Transform_1.Transform.Create(s.Quaternion(undefined), e, i), t.TransformOrigin = s.ToUeTransformOld(), this.upn)) {
      this.IsCanBeHeld = false;
      this.NeedRemoveControllerId = true;
      this.Xpn(h);
    }
  }
  ShouldPlayMismatchSequence(t) {
    t = t.GetComponent(162);
    return t.GetMismatchSequence(this.Entity) !== undefined && !!t?.Valid;
  }
  Xpn(t) {
    ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.LevelSequence, t => {
      if (this.ActivatedOutlet === undefined) {
        this.PlayingMatchSequence = false;
        this.IsCanBeHeld = true;
      } else {
        this.BePopupFormOutlet();
        this.upn.SetActorTickEnabled(true);
        this.upn.SetSequence(t);
        TimerSystem_1.TimerSystem.Delay(() => {
          this.$pn(false, () => {
            this.PlayingMatchSequence = false;
          });
          this.ActorComp.PhysicsMode = 3;
          this.TryEnableTick();
        }, 50);
      }
    });
  }
  ResetItemLocationAndRotation(t = 0, e = false) {
    this.TryDisableTick("[SceneItemManipulatableComponent.ResetItemLocationAndRotation]");
    this.SetState(1, "ResetItemLocationAndRotation");
    this.ActorComp?.Owner?.OnActorHit.Clear();
    var i = new UE.TransformDouble();
    i.SetLocation(this.ActorComp.ActorLocation);
    EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, i, this.ManipulateBaseConfig.归位消失特效.AssetPathName.toString(), "[SceneItemManipulatableComponent.ResetItemLocationAndRotation]", new EffectContext_1.EffectContext(this.Entity.Id));
    var s = this.u1t.GetPbEntityInitData();
    var h = s.Transform.Pos;
    var s = s.Transform.Rot;
    var h = Vector_1.Vector.Create(h?.X ?? 0, h?.Y ?? 0, h?.Z ?? 0);
    var s = Rotator_1.Rotator.Create(s?.Y ?? 0, s?.Z ?? 0, s?.X ?? 0);
    this.ActorComp.SetActorLocationAndRotation(h.ToUeVector(), s.ToUeRotator());
    var h = (0, puerts_1.$ref)(undefined);
    var s = (0, puerts_1.$ref)(undefined);
    SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(this.ActorComp.GetSceneInteractionLevelHandleId()).D_GetActorBounds(false, h, s);
    i.SetLocation((0, puerts_1.$unref)(h));
    EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, i, ConfigManager_1.ConfigManager.ManipulateConfig.PushEffectPath, "[SceneItemManipulatableComponent.ResetItemLocationAndRotation]", new EffectContext_1.EffectContext(this.Entity.Id));
    this.QDl?.SetEnterCallback(undefined);
    this.ActorComp.PhysicsMode = 0;
    var s = this.ActorComp.GetPrimitiveComponent();
    s.SetPhysicsLinearVelocity(new UE.Vector(0, 0, 0));
    s.SetPhysicsAngularVelocityInDegrees(new UE.Vector(0, 0, 0));
    if (this.a_n) {
      TimerSystem_1.TimerSystem.Remove(this.a_n);
      this.a_n = undefined;
    }
    this.IsCanBeHeld = true;
    this.opn = false;
    if (this.rpn) {
      TimerSystem_1.TimerSystem.Remove(this.rpn);
      this.rpn = undefined;
    }
    if (this.NeedRemoveControllerId) {
      this.bpn();
    }
    this.Gpn();
    if (this.Config.BaseCfg.InitialGravity) {
      this.ActorComp.PhysicsMode = 3;
    }
    if (e) {
      (h = Protocol_1.Aki.Protocol.ums.create()).F4n = MathUtils_1.MathUtils.NumberToLong(this.u1t.GetCreatureDataId());
      h.cKn = MathUtils_1.MathUtils.NumberToLong(t);
      Net_1.Net.Call(24703, h, t => {
        switch (t.Q4n) {
          case Protocol_1.Aki.Protocol.Q4n.KRs:
          case Protocol_1.Aki.Protocol.Q4n.Proto_ErrBeControlledEntityNotExist:
            break;
          default:
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 28494);
        }
      });
    }
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnManipulatedItemPosReset);
  }
  Gpn() {
    this.MatchSequence = undefined;
    if (this.ActivatedOutlet) {
      this.ActivatedOutlet.EntityInSocket = undefined;
      this.ActivatedOutlet.MatchCfgIndex = undefined;
      this.ActivatedOutlet = undefined;
    }
  }
  Vpn() {
    let t = undefined;
    if (this.inn.HasTag(-1660917319)) {
      t = -938118674;
    } else if (this.inn.HasTag(-1611484717)) {
      t = 1926099076;
    }
    if (t) {
      this.inn.AddTag(t);
    }
  }
  CalcCastTargetPoint() {
    if (this.MatchSequence !== undefined) {
      this.MatchSequence = undefined;
    }
    if (this.TargetOutletComponent ?? this.ActivatedOutlet) {
      t = (this.TargetOutletComponent ?? this.ActivatedOutlet).GetMatchSequence(this.Entity);
      if (!StringUtils_1.StringUtils.IsEmpty(t)) {
        this.MatchSequence = t;
      }
    }
    var t = ModelManager_1.ModelManager.ManipulaterModel.GetTargetPartLocation();
    var e = this.TargetActorComponent?.Entity.GetComponent(149);
    let i = Vector_1.Vector.Create();
    i = this.TargetOutletComponent?.Valid ? this.TargetActorComponent.Entity.GetComponent(138)?.Valid ? this.TargetOutletComponent.GetCurrentLockLocation() : this.TargetOutletComponent.GetSocketLocation(this.Entity) : e?.Valid ? e.GetHitPoint() : t !== Vector_1.Vector.ZeroVectorProxy ? t : this.TargetActorComponent.ActorLocationProxy;
    this.CastTargetLocation = i;
  }
  CalcCastTargetPointWithEntity(t) {
    var e = t.GetComponent(1);
    var t = t.GetComponent(162);
    if (t) {
      return t.GetSocketLocation(this.Entity);
    } else {
      return Vector_1.Vector.Create(e.ActorLocationProxy);
    }
  }
  GetDrawStartLocation() {
    if (this.MatchSequence) {
      return this.CastTargetLocation;
    } else {
      return this.ActorComp.ActorLocationProxy;
    }
  }
  TryEnableTick(t = false) {
    this.spn = false;
    this.apn = false;
    this.hpn = false;
    this.lpn = false;
    this.ppn = 0;
    let e = !(this.tpn = false);
    if (this.sxr !== undefined && (this.Enable(this.sxr, "SceneItemManipulatableComponent.TryEnableTick"), this.sxr = undefined, t) && this.ActorComp.PhysicsMode !== 3) {
      this.ActorComp.PhysicsMode = 3;
      this.ActorComp.GetPrimitiveComponent().SetPhysicsLinearVelocity(Vector_1.Vector.OneVector.op_Multiply(0.1));
      e = false;
    }
    if (e) {
      this.ActorComp.GetPrimitiveComponent().SetPhysicsLinearVelocity(Vector_1.Vector.ZeroVector, false);
    }
  }
  TryDisableTick(t) {
    if (this.sxr === undefined && (this.sxr = this.Disable(t), this.ActorComp.PhysicsMode !== 0)) {
      this.ActorComp.PhysicsMode = 0;
    }
  }
  TickState(t) {
    this.CurrentState.Tick(t, this._pn?.HasMoveAuthority() ?? false);
  }
  Ppn(t) {
    switch (this.GetState()) {
      case 6:
      case 7:
      case 9:
      case 8:
      case 12:
        this.TickState(t * 0.001);
        break;
      default:
        this.spn = true;
    }
  }
  ResetForceDisplace() {
    this.spn = false;
    this.TryEnableTick();
  }
  xpn() {
    var t;
    if (!this.ForceMoving) {
      if ((t = this.ActorComp.GetPrimitiveComponent()).GetPhysicsLinearVelocity().Equals(Vector_1.Vector.ZeroVector, MathUtils_1.MathUtils.SmallNumber) && t.GetPhysicsAngularVelocity().Equals(Vector_1.Vector.ZeroVector, MathUtils_1.MathUtils.SmallNumber) && this.ActorComp.ActorLocationProxy.Equals(this.Wnr) && this.ActorComp.ActorRotationProxy.Equals(this.qHr)) {
        if ((t = this.GetState()) === 9 || t === 8 || t === 11) {
          this.SetState(1, "DisplaceCheck");
        }
        this.apn = true;
      }
    }
  }
  wpn() {
    var t;
    var e;
    var i;
    if (!this.PlayingMatchSequence) {
      if (this.ActorComp.PhysicsMode === 0 || ([t, i] = this.ActorComp.CheckGoundWithBox(), i === undefined) || t && i.bBlockingHit && (t = Vector_1.Vector.Create(), e = this.ActorComp.Origin, TraceElementCommon_1.TraceElementCommon.GetHitLocation(i, 0, t), (i = e.Z - t.Z - this.ActorComp.Extent.Z) < ON_GROUND_OFFSET) && i > 0) {
        this.hpn = true;
      }
    }
  }
  Bpn(t) {
    var e;
    var i;
    var s;
    if (!this.ForceMoving && !this.PlayingMatchSequence) {
      if (this.ActorComp.PhysicsMode === 3) {
        e = Vector_1.Vector.Create(this.Wnr);
        this.ActorComp.ActorLocationProxy.Subtraction(e, e);
        e = e.Size();
        e /= t * TimeUtil_1.TimeUtil.Millisecond;
        i = Vector_1.Vector.Create();
        s = Vector_1.Vector.Create();
        this.ActorComp.ActorRotationProxy.Vector(s);
        this.qHr.Vector(i);
        i.Subtraction(s, i);
        s = i.Size();
        s /= t * TimeUtil_1.TimeUtil.Millisecond;
        if (this.ManipulateBaseConfig.打开速度Log && Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 31, "[Manipulate] 速度", ["size", e]);
        }
        if (e < this.ManipulateBaseConfig.可再被控速度最小值) {
          this.tpn = true;
        }
        if (this.ActorComp?.ActorInitNotStandardGravity) {
          if (e < FAKE_GRAVITY_MIN_VELOCITY && s < FAKE_GRAVITY_MIN_ANGLE) {
            this.ppn++;
            if (this.ppn > ZERO_VELOCITY_FRAME_NUM) {
              this.ActorComp.PhysicsMode = 0;
            }
          } else {
            this.ppn = 0;
          }
        } else if (e < MIN_VELOCITY && s == 0) {
          this.ppn++;
          if (this.ppn > ZERO_VELOCITY_FRAME_NUM) {
            this.ActorComp.PhysicsMode = 0;
          }
        } else {
          this.ppn = 0;
        }
      }
      if (this.ActorComp.PhysicsMode === 0) {
        this.lpn = true;
        this.tpn = true;
      }
    }
  }
  Oec() {
    if (!this.PlayingMatchSequence) {
      if (this.ActorComp.EnableFakeGravity) {
        this.ActorComp.SimulatedFakeGravity();
      }
    }
  }
  bpn() {
    var t;
    var e;
    if (this.epn === INVALID_ID) {
      this.IsCanBeHeld = true;
    } else {
      t = this.u1t?.GetCreatureDataId();
      (e = Protocol_1.Aki.Protocol.Tds.create()).F4n = MathUtils_1.MathUtils.NumberToLong(t);
      e.xWn = false;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneItem", 31, "[Manipulate] RequestRemoveControllerId", ["location", this.ActorComp?.ActorLocationProxy], ["id", this.u1t?.GetPbDataId()]);
      }
      this.IsRequestingRemoveControllerId = true;
      Net_1.Net.Call(16465, e, t => {
        this.IsRequestingRemoveControllerId = false;
        switch (t.Q4n) {
          case Protocol_1.Aki.Protocol.Q4n.KRs:
            this.NeedRemoveControllerId = false;
            this.IsCanBeHeld = true;
            break;
          case Protocol_1.Aki.Protocol.Q4n.Proto_ErrBeControlledEntityNotExist:
          case Protocol_1.Aki.Protocol.Q4n.Proto_ErrNotBeControlledNotPlayer:
            this.IsCanBeHeld = true;
            break;
          default:
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 28494);
        }
      });
    }
  }
  Fpn(t, e) {
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    if (t?.Valid) {
      t = t.Entity.GetComponent(65);
      if (e) {
        t.ActiveHandFX(this.Entity);
      } else {
        t.DeactiveHandFx();
      }
    }
  }
  SetState(t, e) {
    if (this._pn?.HasMoveAuthority()) {
      this.KTl(t);
      this._pn?.ModifyBlackboard(ManipulatableStateKey, t, e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItem", 19, "[Manipulate] 没有移动权限，不能主动设置控物状态", ["creatureId", this.u1t?.GetCreatureDataId()], ["entityId", this.Entity.Id], ["pbDataId", this.u1t?.GetPbDataId()], ["State", t], ["reason", e]);
    }
  }
  GetState() {
    return this._pn?.GetBlackboard(ManipulatableStateKey) ?? 1;
  }
  get CurrentState() {
    return this.ZOe;
  }
  KTl(t) {
    if (this.zl_) {
      if (this.t6 > CHANGE_MODE_NAX_COUNT) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 31, "[ChangeCurrentStateInner] 产生嵌套循环层数过高，不往后执行", ["PbDataId", this.u1t?.GetPbDataId()], ["NewState", t]);
        }
        return;
      } else {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("SceneItem", 31, "[ChangeCurrentStateInner] 产生嵌套设置，加入队列", ["PbDataId", this.u1t?.GetPbDataId()], ["NewState", t]);
        }
        this.Jl_.Push(t);
        return;
      }
    }
    this.zl_ = true;
    this.t6++;
    var e;
    var i;
    var s = this.GetState();
    let h = undefined;
    switch (t) {
      case 1:
        h = this.Sbo;
        break;
      case 10:
        h = this.WDl;
        break;
      case 4:
        h = this.HoldState;
        break;
      case 3:
        h = this.HDl;
        break;
      case 5:
        h = this.PrecastState;
        break;
      case 11:
        h = this.QDl;
        break;
      case 9:
        h = this.CastFreeState;
        break;
      case 7:
        h = this.CastToOutletState;
        break;
      case 6:
        h = this.CastToTargetState;
        break;
      case 12:
        h = this.AdsorbedState;
        break;
      case 8:
        h = this.jDl;
        break;
      case 2:
        h = this.VDl;
    }
    if (h) {
      if (this.ZOe !== h) {
        e = this.ZOe;
        i = this._pn?.HasMoveAuthority() ?? false;
        this.ZOe?.Exit(i);
        this.ZOe = h;
        this.ZOe?.Enter(i);
        EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnManipulatableItemStateModified, s, t, this.Entity, e, h);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItem", 19, "[Manipulate] 切换控物状态时找不到对应的状态类，请检查状态是否合法及是否完成了LoadBaseConfig", ["creatureId", this.u1t?.GetCreatureDataId()], ["entityId", this.Entity.Id], ["pdDataId", this.u1t?.GetPbDataId()], ["State", t]);
    }
    this.zl_ = false;
    if (this.t6 <= CHANGE_MODE_NAX_COUNT) {
      while (!this.Jl_.Empty) {
        var a = this.Jl_.Pop();
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("SceneItem", 31, "[ChangeCurrentStateInner] 执行队列中的MovementMode", ["PbDataId", this.u1t?.GetPbDataId()], ["NewState", a]);
        }
        this.KTl(a);
      }
    }
    this.t6--;
  }
  RequestAttachToOutlet() {
    this._pn.CollectSampleAndSend(true);
    this.ActivatedOutlet.RequestMatch(this.Entity);
  }
  ClearAttachOutletInfo() {
    this.ActivatedOutlet.EntityInSocket = undefined;
    this.ActivatedOutlet.MatchCfgIndex = undefined;
    this.ActivatedOutlet = undefined;
  }
  Qpn() {
    if (this.upn === undefined) {
      this.upn = ActorSystem_1.ActorSystem.Get(UE.LevelSequenceActor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble, undefined, false);
      this.upn.bOverrideInstanceData = true;
    }
  }
  PlayMatchSequence(e, i) {
    var t;
    var s;
    var h;
    var a;
    if (!StringUtils_1.StringUtils.IsEmpty(this.MatchSequence)) {
      if (this.upn === undefined) {
        this.Qpn();
      }
      t = this.upn.DefaultInstanceData;
      s = this.CastTargetLocation;
      a = this.ActorComp.ActorRotationProxy;
      h = this.ActorComp.ActorScale;
      a = Transform_1.Transform.Create(a.Quaternion(undefined), s, h);
      t.TransformOrigin = a.ToUeTransformOld();
      t.ApplyWorldOrigin = true;
      ResourceSystem_1.ResourceSystem.LoadAsync(this.MatchSequence, UE.LevelSequence, t => {
        this.upn.SetActorTickEnabled(true);
        this.upn.SetSequence(t);
        this.$pn(i, e);
      });
    }
  }
  $pn(t, e) {
    this.upn.SequencePlayer.OnFinished.Clear();
    this.upn.AddBindingByTag(BINDING_TAG, this.ActorComp.Owner);
    if (this.upn.SequencePlayer.IsValid()) {
      this.upn.SequencePlayer.SetPlayRate(1);
      if (t) {
        this.upn.SequencePlayer.PlayReverse();
      } else {
        this.upn.SequencePlayer.Play();
      }
      this.upn.SequencePlayer.OnFinished.Add(e);
      this.upn.SequencePlayer.OnFinished.Add(() => {
        this.upn.RemoveBindingByTag(BINDING_TAG, this.ActorComp.Owner);
      });
    }
  }
  StopSequence() {
    if (this.upn?.SequencePlayer?.IsPlaying) {
      this.upn.SequencePlayer.Stop();
      this.PlayingMatchSequence = false;
      this.upn.RemoveBindingByTag(BINDING_TAG, this.ActorComp.Owner);
    }
  }
  Rpn() {
    var t = this.u1t?.GetCreatureDataId();
    var e = Protocol_1.Aki.Protocol.nms.create();
    e.F4n = MathUtils_1.MathUtils.NumberToLong(t);
    if (this.Config?.DestroyCfg?.StopPhysicAfterDestroyed) {
      this.ActorComp.GetPrimitiveComponent()?.SetSimulatePhysics(false);
    }
    Net_1.Net.Call(17558, e, t => {
      switch (t.Q4n) {
        case Protocol_1.Aki.Protocol.Q4n.KRs:
        case Protocol_1.Aki.Protocol.Q4n.Proto_ErrBeControlledEntityNotExist:
          if (this.a_n) {
            TimerSystem_1.TimerSystem.Remove(this.a_n);
            this.a_n = undefined;
          }
          break;
        default:
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 18694);
      }
    });
  }
  OnCastItem() {
    var t;
    if (this.gpn) {
      t = this.Config.DestroyCfg.Conditions.filter(t => t.Type === IComponent_1.ETeleControlDestroyCondition.Throw)[0];
      this.BCe = TimerSystem_1.TimerSystem.Delay(() => {
        this.Rpn();
      }, t.DelayTime * TimeUtil_1.TimeUtil.InverseMillisecond);
    }
  }
  ClearCastDestroyTimer() {
    if (this.BCe !== undefined) {
      TimerSystem_1.TimerSystem.Remove(this.BCe);
      this.BCe = undefined;
    }
  }
  TryAddTagById(t) {
    if (!this.inn.HasTag(t)) {
      this.inn.AddTag(t);
    }
  }
  TryRemoveTagById(t) {
    if (this.inn.HasTag(t)) {
      this.inn.RemoveTag(t);
    }
  }
  ForceStopDropping() {
    var t = this.GetState();
    if (t === 11 && this.NeedRemoveControllerId) {
      const i = this.ActorComp.GetPrimitiveComponent();
      i.SetPhysicsLinearVelocity(Vector_1.Vector.ZeroVector);
      i.SetPhysicsAngularVelocity(Vector_1.Vector.ZeroVector);
      if (!FNameUtil_1.FNameUtil.IsNothing(this.ManipulateBaseConfig.待机状态碰撞预设)) {
        const i = this.ActorComp.GetPrimitiveComponent();
        i.SetCollisionProfileName(this.ManipulateBaseConfig.待机状态碰撞预设);
      }
      var e = this.ActorComp.Owner?.GetComponentByClass(UE.ActorComponent.StaticClass());
      if (e?.IsValid()) {
        e.bEnableAutoPhysicsSplit = true;
      }
      if (this.ActorComp.PhysicsMode !== 0) {
        this.ActorComp.PhysicsMode = 0;
      }
      this.IsCanBeHeld = false;
      this.npn = true;
      this.ForceMoving = false;
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("SceneItem", 39, "[SceneItemManipulatableComponent.ForceStopDropping] 尝试强停物理掉落时，被控物不处于脱手掉落状态，返回", ["State", t], ["NeedRemoveControllerId", this.NeedRemoveControllerId], ["PbDataId", this.u1t?.GetPbDataId()]);
    }
  }
  TryAddSpecLockTag() {
    var t;
    if (this.Entity.GetComponent(139)) {
      t = this.ActivatedOutlet !== undefined ? 2142861976 : -628734864;
      if (!this.inn.HasTag(t)) {
        this.inn.AddTag(t);
      }
    }
  }
  TryRemoveSpecLockTag() {
    var t;
    if (this.Entity.GetComponent(139) && (this.inn.HasTag(t = 2142861976) && this.inn.RemoveTag(t), this.inn.HasTag(t = -628734864))) {
      this.inn.RemoveTag(t);
    }
  }
  TryReqAttachToFloor() {
    var t = this.Entity.GetComponent(126);
    if (t && this.ActorComp?.Owner?.IsValid() && this.ActorComp.GetIsSceneInteractionLoadCompleted() && !t.IsRegTarget()) {
      var e;
      var i;
      var s;
      var h = this.Ypn(0, -5);
      if (h) {
        [s, i] = this.Jpn(h);
        if (s?.IsValid() && i) {
          if (i.length <= 0) {
            return undefined;
          } else {
            s = s;
            this.ActorComp.ResetAllCachedTime();
            e = (s = this.ActorComp.ActorTransform.GetRelativeTransform(s.D_GetTransform())).GetLocation();
            s = s.Rotator();
            t.RequestAttachRefActor(i, e, s);
            return;
          }
        } else {
          [i, e] = this.zpn(h);
          if (i && (s = i.GetComponent(203), i = i.GetComponent(0).GetPbDataId(), s) && i) {
            h = e ? h : s.Owner;
            this.ActorComp.ResetAllCachedTime();
            h = (s = this.ActorComp.ActorTransform.GetRelativeTransform(h.D_GetTransform())).GetLocation();
            s = s.Rotator();
            t.RequestAttachEntity(i, e, h, s);
          }
          return;
        }
      }
    }
  }
  ResetManipulatableState() {
    if (this.CurrentState !== this.WDl && (this.TryDisableTick("[SceneItemManipulatableComponent.ResetManipulatableState]"), this.SetState(1, "ResetManipulatableState"), this.ActorComp?.Owner?.OnActorHit.Clear(), this.a_n)) {
      TimerSystem_1.TimerSystem.Remove(this.a_n);
      this.a_n = undefined;
    }
  }
  Ypn(e, i) {
    if (this.ActorComp) {
      var s = SceneInteractionManager_1.SceneInteractionManager.Get().GetMainCollisionActor(this.ActorComp.GetSceneInteractionLevelHandleId());
      if (s?.IsValid) {
        var h = s.K2_GetActorRotation();
        var a = (0, puerts_1.$ref)(undefined);
        var n = (0, puerts_1.$ref)(undefined);
        s.D_GetActorBounds(false, a, undefined);
        s.K2_SetActorRotation(new UE.Rotator(0, 0, 0), false);
        s.D_GetActorBounds(false, undefined, n);
        s.K2_SetActorRotation(h, false);
        var s = MathUtils_1.MathUtils.CommonTempVector;
        s.FromUeVector((0, puerts_1.$unref)(a));
        var a = ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation;
        var o = ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation;
        a.Set(s.X, s.Y, s.Z + e);
        o.Set(s.X, s.Y, s.Z + i);
        ModelManager_1.ModelManager.TraceElementModel.ClearBoxTrace();
        var r = ModelManager_1.ModelManager.TraceElementModel.GetBoxTrace();
        r.WorldContextObject = this.ActorComp.Owner;
        r.bIsSingle = true;
        r.ActorsToIgnore.Empty();
        var l = SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllActorsInLevel(this.ActorComp.GetSceneInteractionLevelHandleId());
        for (let t = 0; t < l.Num(); t++) {
          r.ActorsToIgnore.Add(l.Get(t));
        }
        r.bIgnoreSelf = true;
        e = MathUtils_1.MathUtils.CommonTempVector;
        e.FromUeVector((0, puerts_1.$unref)(n));
        r.HalfSizeX = e.X;
        r.HalfSizeY = e.Y;
        r.HalfSizeZ = e.Z;
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(r, a);
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(r, o);
        TraceElementCommon_1.TraceElementCommon.SetBoxOrientation(r, h);
        s = TraceElementCommon_1.TraceElementCommon.BoxTrace(r, "TraceFindFloorActor");
        i = r.HitResult;
        let t = undefined;
        if (s && i?.bBlockingHit && i.Actors.Num() > 0) {
          t = i.Actors.Get(0).RootComponent?.GetOwner();
        }
        r.ClearCacheData();
        ModelManager_1.ModelManager.TraceElementModel.ClearBoxTrace();
        return t;
      }
    }
  }
  Jpn(t) {
    if (t.IsValid()) {
      var e = UE.KismetSystemLibrary.GetPathName(t);
      var i = e.indexOf(".");
      if (i >= 0 && i + 1 < e.length) {
        e = e.substring(i + 1);
        if (UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.KuroActorSubsystem.StaticClass()).GetActor(new UE.FName(e))) {
          return [t, e];
        }
        i = t.GetAttachRootParentActor();
        if (i && UE.KismetMathLibrary.NotEqual_ObjectObject(i, t)) {
          return this.Jpn(i);
        }
      }
    }
    return [undefined, undefined];
  }
  zpn(e) {
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByChildActor(e);
    var i = t?.Entity?.GetComponent(203);
    if (!i?.Owner?.IsValid()) {
      return [undefined, undefined];
    }
    var s = SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllKeyRefActors(i.GetSceneInteractionLevelHandleId());
    let h = undefined;
    var a = s?.Num();
    if (a) {
      for (let t = 0; t < a; t++) {
        var n = s.GetKey(t);
        if (s.Get(n) === e) {
          h = n;
          break;
        }
      }
    }
    return [t.Entity, h];
  }
  GetPassThroughPortalId() {
    return this.Vga;
  }
  SetPassthroughPortalId(t) {
    this.Vga = t;
  }
  GetPassThroughPortalType() {
    return this.$ga;
  }
  SetPassThroughPortalType(t) {
    this.$ga = t;
  }
  IsMatchRoleGravityDirect(t) {
    return !this.Oc1 || !t?.MoveComp || (t.MoveComp.IsStandardGravity ? this.Oc1.Equals(Vector_1.Vector.DownVectorProxy) : this.Oc1.Equals(t.ActorGravityDirectProxy));
  }
};
SceneItemManipulatableComponent = SceneItemManipulatableComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(157)], SceneItemManipulatableComponent);
exports.SceneItemManipulatableComponent = SceneItemManipulatableComponent; //# sourceMappingURL=SceneItemManipulatableComponent.js.map