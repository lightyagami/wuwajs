"use strict";

var CharacterManipulateComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, s) {
  var a;
  var h = arguments.length;
  var r = h < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, i, s);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (a = t[n]) {
        r = (h < 3 ? a(r) : h > 3 ? a(e, i, r) : a(e, i)) || r;
      }
    }
  }
  if (h > 3 && r) {
    Object.defineProperty(e, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterManipulateComponent = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../../Core/Net/Net");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils");
const Quat_1 = require("../../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon");
const IUtil_1 = require("../../../../../UniverseEditor/Interface/IUtil");
const CameraController_1 = require("../../../../Camera/CameraController");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const Global_1 = require("../../../../Global");
const GlobalData_1 = require("../../../../GlobalData");
const InputController_1 = require("../../../../Input/InputController");
const LevelAimLineController_1 = require("../../../../LevelGamePlay/AimLine/LevelAimLineController");
const LevelGeneralNetworks_1 = require("../../../../LevelGamePlay/LevelGeneralNetworks");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RenderConfig_1 = require("../../../../Render/Config/RenderConfig");
const ActorUtils_1 = require("../../../../Utils/ActorUtils");
const GravityUtils_1 = require("../../../../Utils/GravityUtils");
const PortalUtils_1 = require("../../../../Utils/PortalUtils");
const SceneItemManipulableBoomerangCastState_1 = require("../../../SceneItem/Manipulate/SceneItemManipulableBoomerangCastState");
const SceneItemManipulableCastFreeState_1 = require("../../../SceneItem/Manipulate/SceneItemManipulableCastFreeState");
const SceneItemManipulableCastToOutletState_1 = require("../../../SceneItem/Manipulate/SceneItemManipulableCastToOutletState");
const SceneItemManipulableCastToTargetState_1 = require("../../../SceneItem/Manipulate/SceneItemManipulableCastToTargetState");
const SceneItemManipulableLevitateCastState_1 = require("../../../SceneItem/Manipulate/SceneItemManipulableLevitateCastState");
const SceneItemManipulableTrackTargetCastToFreeState_1 = require("../../../SceneItem/Manipulate/SceneItemManipulableTrackTargetCastToFreeState");
const SceneItemManipulableTrackTargetCastToTargetState_1 = require("../../../SceneItem/Manipulate/SceneItemManipulableTrackTargetCastToTargetState");
const PROFILE_KEY = "CharacterManipulateComponent_LineTarceTestWithTarget";
const CAST_PITCH_MAX = 75;
const CAST_PITCH_MIN = -45;
const TARGET_ACTOR_TAG = new UE.FName("ControlObj");
const DRAW_SPHERE_DEBUG = false;
const MANIPULATE_SKILL_ID = 1003;
const HIT_COLLISION_NAME = new UE.FName("攻击碰撞");
const MANIPULATE_CHECK_IGNORE_TAG = new UE.FName("ManipulateCheck_Ignore");
const NORMAL_CHECK_PRESET_NAME = new UE.FName("被控物检测_Normal");
const MONSTER_PART_CHECK_PRESET_NAME = new UE.FName("被控物检测_Part");
const TEMP_HALF_HEIGHT = 80;
const MAX_CALC_WEIGTH_NUMBER_PER_FRAME = 3;
const MAX_WAIT_MANIPULATE_TIME = 5000;
const LineTraceColor = new UE.LinearColor(1, 0, 0, 1);
class FindedEntityWithPortalParam {
  constructor(t, e, i, s, a) {
    this.PortalPairId = undefined;
    this.Entity = t;
    this.PortalType = e;
    this.Dist = i;
    this.Dot = s;
    this.PortalPairId = a;
  }
}
let CharacterManipulateComponent = CharacterManipulateComponent_1 = class CharacterManipulateComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ac = 0;
    this.x9r = undefined;
    this.w9r = undefined;
    this.B9r = undefined;
    this.b9r = undefined;
    this.q9r = undefined;
    this.G9r = undefined;
    this.N9r = undefined;
    this.n$t = undefined;
    this.o4o = undefined;
    this.Xte = undefined;
    this.DKo = [];
    this.O9r = -0;
    this.k9r = -0;
    this.F9r = -0;
    this.V9r = undefined;
    this.H9r = false;
    this.j9r = false;
    this.W9r = 0;
    this.uoe = undefined;
    this.K9r = undefined;
    this.Q9r = false;
    this.X9r = 1;
    this.$9r = undefined;
    this.Y9r = undefined;
    this.J9r = false;
    this.z9r = false;
    this.Z9r = undefined;
    this.Fdl = undefined;
    this.SGl = undefined;
    this.e7r = -MathUtils_1.MathUtils.MaxFloat;
    this.t7r = undefined;
    this.i7r = undefined;
    this.o7r = [];
    this.r7r = Vector_1.Vector.Create(0, 0, 0);
    this.XWs = Vector_1.Vector.Create(0, 0, 0);
    this.YWs = Vector_1.Vector.Create(0, 0, 0);
    this.QWs = Vector_1.Vector.Create();
    this.n7r = 2;
    this.Bhh = undefined;
    this.s7r = undefined;
    this.Ela = -0;
    this.zpe = (t, e) => {
      if (this.b9r === e.Entity) {
        this.StopManipulate();
      }
      if (this.ac === 1 && this.w9r === e.Entity) {
        this.StopWaitingToManipulate();
        this.Reset();
      }
    };
    this.a7r = () => {
      if (ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId === MANIPULATE_SKILL_ID) {
        this.X9r = 1;
        if (ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId === MANIPULATE_SKILL_ID && this.w9r !== undefined && this.b9r === undefined) {
          this.h7r(1193763416);
        }
        if (this.Xte.HasTag(40422668)) {
          this.AddOrRemoveManipulateAirTag(true);
        }
      } else {
        this.X9r = 0.7;
        this.l7r(1193763416);
        this.AddOrRemoveManipulateAirTag(false);
      }
    };
    this._7r = t => {
      if (t.TagName !== "None") {
        this.Xte?.AddTag(t?.TagId);
      }
    };
    this.u7r = t => {
      if (t.TagName !== "None") {
        this.Xte?.RemoveTag(t?.TagId);
      }
    };
    this.c7r = e => {
      for (let t = 0; t < e.Num(); t++) {
        var i = e.Get(t);
        if (i.TagName !== "None") {
          this.Xte?.AddTag(i?.TagId);
        }
      }
    };
    this.m7r = e => {
      for (let t = 0; t < e.Num(); t++) {
        var i = e.Get(t);
        if (i.TagName !== "None") {
          this.Xte?.RemoveTag(i?.TagId);
        }
      }
    };
    this.d7r = () => {
      this.StopManipulate();
    };
    this.NH_ = t => {
      this.N9r?.SetComponentTickEnabled(!t);
    };
    this.C7r = t => {
      var e = this.b9r?.GetComponent(196);
      if (e) {
        if (t) {
          e.AddTag(230094484);
        } else {
          e.RemoveTag(230094484);
        }
      }
    };
    this.gIe = (t, e) => {
      if (ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId === MANIPULATE_SKILL_ID) {
        this.AddOrRemoveManipulateAirTag(e);
      }
    };
    this.g7r = () => {
      this.l7r(1193763416);
      this.Xte.RemoveTag(-1178928415);
      this.Xte.RemoveTag(-1976579620);
    };
  }
  set DebugDrawSphereAndArrow(t) {
    this.H9r = t;
  }
  get DebugDrawSphereAndArrow() {
    return this.H9r;
  }
  set TraceDebug(t) {
    this.j9r = t;
  }
  get TraceDebug() {
    return this.j9r;
  }
  OnInit() {
    this.ac = 0;
    this.x9r = this.Entity.GetComponent(1).Owner;
    return true;
  }
  OnStart() {
    this.n$t = this.Entity.GetComponent(3);
    this.o4o = this.Entity.GetComponent(178);
    this.w9r = undefined;
    this.B9r = undefined;
    this.b9r = undefined;
    this.q9r = undefined;
    this.G9r = undefined;
    this.Ela = 0;
    this.V9r = new UE.TransformDouble();
    this.H9r = DRAW_SPHERE_DEBUG;
    this.W9r = ConfigManager_1.ConfigManager.ManipulateConfig.SearchRange;
    this.Xte = this.Entity.GetComponent(205);
    this.s7r = this.Xte.ListenForTagAddOrRemove(40422668, this.gIe);
    this.Ore();
    return true;
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddSubCameraTag, this._7r);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveSubCameraTag, this.u7r);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddExtraHoldingTags, this.c7r);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveExtraHoldingTags, this.m7r);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.a7r);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveEntity, this.zpe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeModeFinish, this.d7r);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnManipulateShowLandTips, this.C7r);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.d7r);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnWorldOriginInUiMode, this.NH_);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharBeHitAnim, this.d7r);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRevive, this.g7r);
  }
  yol() {
    var t;
    if (this.Bhh) {
      this.Eol();
    }
    this.Bhh = InputController_1.InputController.CreateInputLayer(4);
    if (this.Bhh && (t = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(this.Entity))) {
      this.Bhh.Init(t);
      InputController_1.InputController.AddInputLayer(this.Entity.Id, this.Bhh);
    }
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddSubCameraTag, this._7r);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveSubCameraTag, this.u7r);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddExtraHoldingTags, this.c7r);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveExtraHoldingTags, this.m7r);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeSelectedExploreId, this.a7r);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEntity, this.zpe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeModeFinish, this.d7r);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnManipulateShowLandTips, this.C7r);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.d7r);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnWorldOriginInUiMode, this.NH_);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharBeHitAnim, this.d7r);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRevive, this.g7r);
  }
  Eol() {
    if (this.Bhh) {
      InputController_1.InputController.RemoveInputLayer(this.Bhh);
      this.Bhh.Clear();
      this.Bhh = undefined;
    }
  }
  OnTick(t) {
    if (this.n$t.IsMoveAutonomousProxy && !ControllerHolder_1.ControllerHolder.WorldController.GetIsWorldOriginInUiMode()) {
      if (CharacterManipulateComponent_1.f7r) {
        switch (this.ac) {
          case 0:
            if (!this.Q9r) {
              this.KWo(false);
            }
            break;
          case 1:
            if (!this.Q9r) {
              this.yla(t);
            }
            break;
          case 2:
            this.p7r(t);
            break;
          case 3:
            this.v7r(t);
            break;
          case 4:
            this.M7r(t);
            if (!this.G9r?.IsProjectileAimMode) {
              this.KWo(true);
            }
            this.E7r();
            break;
          case 5:
            this.S7r(t);
        }
      } else if (ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.has(MANIPULATE_SKILL_ID)) {
        CharacterManipulateComponent_1.f7r = true;
      }
    }
  }
  OnEnd() {
    this.Reset();
    if (this.N9r) {
      this.N9r.K2_DestroyComponent(this.x9r);
      this.N9r = undefined;
    }
    if (this.uoe) {
      this.uoe.Dispose();
      this.uoe = undefined;
    }
    if (this.K9r) {
      this.K9r.Dispose();
      this.K9r = undefined;
    }
    if (this.s7r) {
      this.s7r.EndTask();
      this.s7r = undefined;
    }
    this.kre();
    return true;
  }
  GetDrawTarget() {
    if ((this.ac === 0 || this.ac === 2 || this.ac === 1) && this.w9r?.Valid) {
      var t = this.w9r.GetComponent(1);
      if (t) {
        return t.Owner;
      }
    }
  }
  SetDrawTargetEntity(t) {
    this.w9r = t;
  }
  GetDrawTargetChantTime() {
    var t;
    if (this.w9r?.Valid && (t = this.w9r.GetComponent(156))) {
      return t.ManipulateBaseConfig.读条时间;
    } else {
      return 0;
    }
  }
  GetCastTarget() {
    if (this.ac === 4 && this.w9r?.Valid) {
      var t = this.w9r.GetComponent(1);
      if (t) {
        return t.Owner;
      }
    }
  }
  Chant(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 22, "[Manipulate] Chant", ["State", this.ac]);
    }
    return !!this.w9r?.Valid && !!this.B9r?.CanBeHeld && !this.Q9r && !(this.B9r?.IsCanInteractType() ? this.B9r.IsRequestingRemoveControllerId || (this.y7r(t), 0) : (this.StopManipulate(), 1));
  }
  y7r(i) {
    const s = this.w9r.GetComponent(0)?.GetCreatureDataId();
    const a = Protocol_1.Aki.Protocol.Tds.create();
    a.F4n = MathUtils_1.MathUtils.NumberToLong(s);
    a.xWn = true;
    this.Q9r = true;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 39, "[CharacterManipulateComp] RequestChant(req)", ["Id", this.Entity.Id], ["PbdataId", this.Entity.GetComponent(0)?.GetPbDataId()], ["F4n", s]);
    }
    Net_1.Net.Call(20574, a, t => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 39, "[CharacterManipulateComp] RequestChant(resp)", ["Id", this.Entity.Id], ["PbdataId", this.Entity.GetComponent(0)?.GetPbDataId()], ["F4n", s]);
      }
      if (this.Q9r) {
        switch (t.Q4n) {
          case Protocol_1.Aki.Protocol.Q4n.KRs:
            break;
          case Protocol_1.Aki.Protocol.Q4n.Proto_ErrNotBeControlledPlayer:
          case Protocol_1.Aki.Protocol.Q4n.Proto_ErrBeControlledEntityNotExist:
            this.Q9r = false;
            this.StopManipulate();
            return;
          default:
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 24533);
            this.Q9r = false;
            this.StopManipulate();
            return;
        }
        var e;
        if (this.B9r?.Valid) {
          this.B9r.TryDisableTick("Chant");
          this.I7r(i);
        } else {
          (e = Protocol_1.Aki.Protocol.Tds.create()).F4n = a.F4n;
          e.xWn = false;
          Net_1.Net.Call(20574, e, t => {});
        }
        this.Q9r = false;
      }
    });
  }
  I7r(t) {
    if (!this.Q9r) {
      return false;
    }
    this.Entity.GetComponent(45)?.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy);
    var e = this.w9r?.GetComponent(202);
    if (!e) {
      this.T7r();
      this.StopManipulate();
      return false;
    }
    var i = this.o4o.CharacterMovement.CurrentFloor;
    if (i && i.HitResult.Actor === e.Owner) {
      this.T7r();
      this.StopManipulate();
      return false;
    }
    e.SetAutonomous(true);
    this.O9r = 0;
    i = this.w9r.GetComponent(156);
    i?.TryRemoveTagById(793256493);
    i?.TryRemoveSpecLockTag();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Character", 31, "[CharacterManipulateComp] Draw", ["PbDataId", e.CreatureData.GetPbDataId()]);
    }
    this.Draw();
    t.Callback.Broadcast(true);
    this.n7r = 2;
    return true;
  }
  Draw() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 22, "[Manipulate] Draw", ["State", this.ac]);
    }
    return !!this.w9r?.Valid && (this.b9r = this.w9r, this.q9r = this.b9r.GetComponent(202), this.G9r = this.b9r.GetComponent(156), this.w9r = undefined, this.B9r = undefined, this.k9r = 0, Log_1.Log.CheckInfo() && Log_1.Log.Info("Character", 31, "[CharacterManipulateComp] 对应控物进入Draw状态", ["PbDataId", this.q9r?.CreatureData.GetPbDataId()]), this.G9r?.SetState(3, "CharacterManipulateComponent.Draw"), this.Xte?.Valid && (this.Xte.RemoveTag(135557294), this.Xte.AddTag(2078326536)), this.l7r(1193763416), this.ac = 3, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnManipulateCompleteChanting), true);
  }
  Cast() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 22, "[Manipulate] Cast", ["State", this.ac]);
    }
    if (this.ac !== 5) {
      return false;
    }
    if (!this.b9r.Valid) {
      return false;
    }
    if (this.N9r) {
      this.N9r.ReleaseComponent();
    }
    if (this.z9r) {
      LevelAimLineController_1.LevelAimLineController.StopEffect();
      this.z9r = false;
    }
    this.V9r = this.q9r.ActorTransform;
    this.G9r.IsCanBeHeld = false;
    this.G9r.TryEnableTick();
    if (this.G9r.CastFreeState instanceof SceneItemManipulableLevitateCastState_1.SceneItemManipulableLevitateCastState) {
      this.q9r.GetInteractionMainActor().RemoveActorProjection();
    }
    if (this.w9r?.Valid && !this.G9r.IsProjectileAimMode) {
      let t = false;
      var e = this.w9r.GetComponent(161);
      var i = this.w9r.GetComponent(137);
      if (e?.Valid) {
        if (i?.Valid && e.GetIsIllegal(this.b9r)) {
          this.L7r();
          t = true;
        } else {
          if (i?.Valid) {
            EventSystem_1.EventSystem.EmitWithTarget(this.b9r, EventDefine_1.EEventName.OnModifyJigsawItemPutIndex, e.GetCurrentChooseIndex(), false);
          }
          if ((i = this.G9r.CastToOutletState) instanceof SceneItemManipulableCastToOutletState_1.SceneItemManipulableCastToOutletState) {
            i.SetTarget(this.w9r);
          }
          this.G9r?.SetState(7, "CharacterManipulateComponent cast to outlet");
        }
      } else {
        if ((e = this.G9r.CastToTargetState) instanceof SceneItemManipulableCastToTargetState_1.SceneItemManipulableCastToTargetState) {
          e.SetTarget(this.w9r);
        } else if (e instanceof SceneItemManipulableTrackTargetCastToTargetState_1.SceneItemManipulableTrackTargetCastToTargetState) {
          e.SetTargetActorWithPart(this.w9r.GetComponent(1), this.$9r);
        }
        this.G9r?.SetState(6, "CharacterManipulateComponent cast to target");
      }
      if (!t) {
        i = this.w9r.GetComponent(1);
        this.V9r.SetRotation(new UE.Quat(UE.KismetMathLibrary.D_FindLookAtRotation(this.q9r.ActorLocation, i.ActorLocation)));
      }
      this.w9r = undefined;
    } else {
      this.L7r();
    }
    this.G9r.IsProjectileAimMode = false;
    EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, this.V9r, ConfigManager_1.ConfigManager.ManipulateConfig.PushEffectPath, "[CharacterManipulateComponent.Cast]", new EffectContext_1.EffectContext(this.Entity.Id));
    this.Sbo();
    return true;
  }
  L7r() {
    var t = this.D7r();
    var e = this.G9r.CastFreeState;
    if (e instanceof SceneItemManipulableCastFreeState_1.SceneItemManipulableCastFreeState) {
      e.SetForward(t.Vector());
    } else if (e instanceof SceneItemManipulableBoomerangCastState_1.SceneItemManipulableBoomerangCastState || e instanceof SceneItemManipulableLevitateCastState_1.SceneItemManipulableLevitateCastState) {
      e.SetVelocityDirection(Vector_1.Vector.Create(t.VectorDouble()));
    } else if (e instanceof SceneItemManipulableTrackTargetCastToFreeState_1.SceneItemManipulableTrackTargetCastToFreeState) {
      e.SetStartCameraLocation(ModelManager_1.ModelManager.ManipulaterModel.ExitHoldingStateCameraLocation);
    }
    if (this.G9r.IsProjectileAimMode) {
      this.G9r?.SetState(8, "CharacterManipulateComponent cast with aim");
    } else {
      this.G9r?.SetState(9, "CharacterManipulateComponent cast free");
    }
    this.V9r.SetRotation(new UE.Quat(t));
  }
  D7r() {
    var t;
    var e;
    var i;
    var s;
    let a = Global_1.Global.CharacterCameraManager.GetCameraRotation();
    if (this.G9r.ActorComp.ActorInitNotStandardGravity) {
      t = Rotator_1.Rotator.Create(a);
      e = this.G9r.ActorComp.ActorInitGravityRotationProxy.Quaternion();
      i = Quat_1.Quat.Create();
      e.Inverse(i);
      s = Rotator_1.Rotator.Create();
      MathUtils_1.MathUtils.ComposeRotator(t, i.Rotator(), s);
      s.Pitch = MathUtils_1.MathUtils.Clamp(s.Pitch + this.G9r.ManipulateBaseConfig.无锁状态附加仰角, CAST_PITCH_MIN, CAST_PITCH_MAX);
      MathUtils_1.MathUtils.ComposeRotator(s, e.Rotator(), t);
      a = t.ToUeRotator();
    } else {
      a.Pitch = MathUtils_1.MathUtils.Clamp(a.Pitch + this.G9r.ManipulateBaseConfig.无锁状态附加仰角, CAST_PITCH_MIN, CAST_PITCH_MAX);
    }
    return a;
  }
  Drop() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 22, "[Manipulate] Drop", ["State", this.ac]);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HideJigsawBaseHint);
    if (!this.b9r?.Valid && !this.w9r?.Valid) {
      return false;
    }
    if (this.Q9r) {
      this.T7r();
      this.Q9r = false;
    }
    if ((this.ac === 4 || this.ac === 5) && !!this.N9r) {
      this.N9r.ReleaseComponent();
    }
    var t;
    var e = (this.b9r ?? this.w9r)?.GetComponent(156);
    if (e?.Valid && (e.IsCanBeHeld = false, e.IsProjectileAimMode = false, e.CastFreeState instanceof SceneItemManipulableLevitateCastState_1.SceneItemManipulableLevitateCastState && e.ActorComp.GetInteractionMainActor().RemoveActorProjection(), (t = e.GetState()) !== 1 && t !== 10 || t === 1 && this.ac === 1)) {
      e.SetState(11, "CharacterManipulateComponent drop");
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnManipulateSwitchToNewTarget, false, this.w9r, false);
    this.Sbo();
    return true;
  }
  Reset() {
    var t = this.b9r ?? this.w9r;
    if (t) {
      var i = Vector_1.Vector.Create(t.GetComponent(202).ActorLocationProxy);
      var s = Vector_1.Vector.Create(i);
      i.Set(i.X, i.Y, i.Z + 500);
      s.Set(s.X, s.Y, s.Z - 1000);
      let e = undefined;
      if (!this.uoe) {
        this.k7r();
      }
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, i);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, s);
      this.uoe.ProfileName = NORMAL_CHECK_PRESET_NAME;
      if (TraceElementCommon_1.TraceElementCommon.LineTrace(this.uoe, PROFILE_KEY) && this.uoe.HitResult.bBlockingHit) {
        for (let t = 0; t < this.uoe.HitResult.Actors.Num(); t++) {
          var a = this.uoe.HitResult.Actors.Get(t);
          if (a !== undefined) {
            e = a.GetName();
            break;
          }
        }
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Character", 31, "[CharacterManipulateComp] StopManipualte", ["Location", t.GetComponent(202).ActorLocationProxy], ["FloorName", e], ["id", this.Entity.Id]);
      }
    }
    if (this.ac !== 0) {
      this.Drop();
    }
    this.Sbo();
  }
  R7r() {
    var t;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 22, "[Manipulate] Hold", ["State", this.ac]);
    }
    if (this.b9r?.Valid) {
      if (ModelManager_1.ModelManager.ManipulaterModel.NeedShowLandTips()) {
        this.b9r?.GetComponent(196)?.AddTag(230094484);
      }
      if (!this.N9r && !(this.N9r = this.x9r.GetComponentByClass(UE.PhysicsHandleComponent.StaticClass()), this.N9r)) {
        this.N9r = this.x9r.AddComponentByClass(UE.PhysicsHandleComponent.StaticClass(), false, new UE.Transform(), false);
      }
      this.G9r?.SetState(4, "CharacterManipulateComponent hold");
      t = this.G9r.ManipulateBaseConfig;
      this.N9r.SetLinearStiffness(t.线性刚度);
      this.N9r.SetLinearDamping(t.线性阻尼);
      this.N9r.SetAngularStiffness(t.角刚度);
      this.N9r.SetAngularDamping(t.角度阻尼);
      if (this.G9r.ManipulateBaseConfig.控物保持使用物理) {
        t = UE.KismetMathLibrary.WD_WorldToLocal(GlobalData_1.GlobalData.World, this.q9r.ActorLocation);
        this.N9r.GrabComponentAtLocationWithRotation(this.q9r.GetPrimitiveComponent(), FNameUtil_1.FNameUtil.EMPTY, t, this.q9r.ActorRotation);
      }
      if (this.Xte?.Valid && (this.Xte.RemoveTag(2078326536), this.Xte.AddTag(-624589333), this.G9r?.CannotCastWithoutTarget)) {
        this.Xte.AddTag(-972568039);
      }
      this.yol();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnManipulateStartChanting, this.G9r.ManipulateBaseConfig.读条时间, this.G9r.ManipulateBaseConfig.控物准星资源ID);
      this.ActiveHandFX(this.b9r);
      LevelGeneralNetworks_1.LevelGeneralNetworks.RequestActiveOrDeactiveManipulateFx(this.b9r.Id, true);
      this.ac = 4;
    }
  }
  Precast(t) {
    return this.ac === 4 && (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HideJigsawBaseHint), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnManipulateSwitchToNewTarget, false, this.w9r, false), ModelManager_1.ModelManager.ManipulaterModel.ExitHoldingStateCameraLocation = Vector_1.Vector.Create(CameraController_1.CameraController.CameraLocation), this.F9r = 0, this.G9r.PrecastState.SetDirection(t), this.G9r?.SetState(5, "CharacterManipulateComponent precast"), this.ac = 5, true);
  }
  Sbo() {
    if (this.Xte?.Valid) {
      this.Xte.RemoveTag(135557294);
      this.Xte.RemoveTag(2078326536);
      this.Xte.RemoveTag(-624589333);
      this.Xte.RemoveTag(-284509534);
      this.Xte.RemoveTag(-972568039);
    }
    this.l7r(1193763416);
    this.Eol();
    if (this.Q9r) {
      this.T7r();
      this.Q9r = false;
      this.StopManipulate();
    }
    if (this.z9r) {
      LevelAimLineController_1.LevelAimLineController.StopEffect();
      this.z9r = false;
    }
    if (this.Fdl) {
      EffectSystem_1.EffectSystem.StopEffectById(this.Fdl, "[CharacterManipulateComponent.AfterFindTarget]", false);
      this.Fdl = undefined;
    }
    if (this.SGl) {
      this.G9r?.TryRemoveTagById(this.SGl);
      this.SGl = undefined;
    }
    ModelManager_1.ModelManager.ManipulaterModel.SetTargetPartLocation(Vector_1.Vector.ZeroVectorProxy);
    this.$9r = undefined;
    var t = this.b9r ?? this.w9r;
    t?.GetComponent(196)?.RemoveTag(230094484);
    if (this.J9r) {
      LevelGeneralNetworks_1.LevelGeneralNetworks.RequestActiveOrDeactiveManipulateFx(t.Id, false);
    }
    this.b9r = undefined;
    this.q9r = undefined;
    this.G9r = undefined;
    this.w9r = undefined;
    this.B9r = undefined;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HiddenManipulateUI);
    this.DeactiveHandFx();
    this.ac = 0;
    this.n7r = 2;
    this.Y9r = undefined;
  }
  KWo(t) {
    var e = this.o4o.CharacterMovement.CurrentFloor.HitResult.Actor;
    if (e) {
      switch (this.n7r) {
        case 2:
          this.U7r();
          this.A7r(e, t);
          this.n7r = 0;
          break;
        case 0:
          this.P7r(e, t);
          break;
        case 1:
          this.x7r(this.t7r, t);
          this.n7r = 2;
      }
    } else {
      if (this.w9r?.Valid) {
        if (this.Q9r) {
          this.T7r();
        }
        this.w9r = undefined;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnManipulateSwitchToNewTarget, this.w9r !== undefined, this.w9r, t);
      }
      this.l7r(1193763416);
      this.U7r();
    }
  }
  U7r() {
    CameraController_1.CameraController.CameraRotator.Vector(this.r7r);
    this.r7r.Normalize();
    this.e7r = -MathUtils_1.MathUtils.MaxFloat;
    this.t7r = undefined;
    this.o7r = [];
    this.Y9r = undefined;
  }
  A7r(i, s) {
    let a = this.W9r;
    if (s) {
      a = this.G9r.ManipulateBaseConfig.投掷锁定范围;
    }
    ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(a, 1, this.DKo);
    for (const l of this.DKo) {
      var e = l.Entity;
      if (this.B0a(e, i, s)) {
        let t = Vector_1.Vector.Create(e.GetComponent(1).ActorLocationProxy);
        var h = e.GetComponent(161);
        if (h) {
          t = Vector_1.Vector.Create(h.GetSocketLocation(this.Entity));
        }
        var h = Vector_1.Vector.Distance(this.n$t.ActorLocationProxy, t);
        var r = Vector_1.Vector.Create(0, 0, 0);
        t.Subtraction(CameraController_1.CameraController.CameraLocation, r);
        r.Normalize();
        var r = MathUtils_1.MathUtils.DotProduct(r, this.r7r);
        var e = new FindedEntityWithPortalParam(e, 0, h, r, undefined);
        this.o7r.push(e);
      }
    }
    if (s) {
      ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(a, 62, this.DKo);
      for (const v of this.DKo) {
        var t;
        var n;
        var o;
        var _ = v.Entity;
        if (!!_?.Valid && !_.GetComponent(0)?.IsConcealed) {
          o = Vector_1.Vector.Create(_.GetComponent(1).ActorLocationProxy);
          t = Vector_1.Vector.Distance(this.n$t.ActorLocationProxy, o);
          n = Vector_1.Vector.Create(0, 0, 0);
          o.Subtraction(CameraController_1.CameraController.CameraLocation, n);
          n.Normalize();
          o = MathUtils_1.MathUtils.DotProduct(n, this.r7r);
          this.o7r.push(new FindedEntityWithPortalParam(_, 0, t, o, undefined));
        }
      }
    }
    ModelManager_1.ModelManager.PortalModel.GetPortals().forEach((t, e) => {
      this.q0a(e, true, a, i, s);
      this.q0a(e, false, a, i, s);
    });
  }
  B0a(t, e, i) {
    if (!t?.Valid) {
      return false;
    }
    if (t.GetComponent(0)?.IsConcealed) {
      return false;
    }
    var s = t.GetComponent(202);
    if (s && e === s.Owner) {
      return false;
    }
    if (!i && !t.GetComponent(156)?.Valid) {
      return false;
    }
    e = t.GetComponent(137);
    s = t.GetComponent(138);
    return !!(e?.Valid ?? s?.Valid) || !!t.GetComponent(202)?.GetIsSceneInteractionLoadCompleted();
  }
  q0a(e, i, s, a, h) {
    if (e) {
      var r = ModelManager_1.ModelManager.PortalModel.GetPortal(e);
      if (r && r.Portal1Enable && r.Portal2Enable) {
        let t = undefined;
        var n = (t = (t = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(e)?.Entity) || EntitySystem_1.EntitySystem.Get(e))?.GetComponent(215);
        var o = (0, puerts_1.$ref)(undefined);
        n?.PortalCapture?.GetPair(o);
        var o = (0, puerts_1.$unref)(o);
        if (i ? n?.GetPbDataId() : o?.PbdataId) {
          var [n, o] = i ? [r.PortalWorldTransform1, r.PortalWorldTransform2] : [r.PortalWorldTransform2, r.PortalWorldTransform1];
          this.XWs.FromUeVector(n.GetLocation());
          this.YWs.FromUeVector(n.GetRotation().GetForwardVector());
          var r = this.n$t.ActorLocationProxy;
          var n = this.QWs;
          PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(r, e, i, n);
          var _ = Vector_1.Vector.Create(o.GetRotation().GetForwardVector());
          _.Normalize();
          var l = Vector_1.Vector.Create(o.GetLocation());
          var v = Vector_1.Vector.Distance(r, this.XWs);
          var n = s - v;
          if (!(n <= 0)) {
            ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(l, n, 1, this.DKo);
            for (const M of this.DKo) {
              var c;
              var C;
              var m = M.Entity;
              if (this.B0a(m, a, h) && (C = Vector_1.Vector.Create(m.GetComponent(202).ActorLocationProxy), c = Vector_1.Vector.Distance(C, l), (C = C.SubtractionEqual(l)).Z = 0, C.Normalize(), (C = Vector_1.Vector.DotProduct(_, C)) > 0.5)) {
                this.o7r.push(new FindedEntityWithPortalParam(m, i ? 1 : 2, c + v, C, e));
              }
            }
            if (h) {
              ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(l, n, 62, this.DKo);
              for (const f of this.DKo) {
                var E;
                var u;
                var p = f.Entity;
                if (!!p?.Valid && !p.GetComponent(0)?.IsConcealed) {
                  u = Vector_1.Vector.Create(p.GetComponent(1).ActorLocationProxy);
                  E = Vector_1.Vector.Distance(u, l);
                  (u = u.SubtractionEqual(l)).Z = 0;
                  u.Normalize();
                  if ((u = Vector_1.Vector.DotProduct(_, u)) > 0.5) {
                    this.o7r.push(new FindedEntityWithPortalParam(p, i ? 1 : 2, E + v, u, e));
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  P7r(t, e) {
    let i = 0;
    if (this.o7r) {
      while (i < MAX_CALC_WEIGTH_NUMBER_PER_FRAME) {
        if (this.o7r.length <= 0) {
          this.n7r = 1;
          return;
        }
        var s;
        var a = this.o7r.shift();
        if (a.Entity?.Valid) {
          if (!(s = a.Entity.GetComponent(202)) || t !== s.Owner) {
            this.i7r = undefined;
            if ((s = this.w7r(a, e)) > this.e7r) {
              this.e7r = s;
              this.t7r = a;
              this.$9r = this.i7r;
            }
            i++;
          }
        }
      }
    }
  }
  x7r(t, e) {
    var i;
    var s;
    var a = t?.Entity;
    this.B7r(a);
    if (a && this.Y9r && (i = this.b7r(a, this.Y9r.BoneName)[0])) {
      i = Vector_1.Vector.Create(i.GetLocation());
      ModelManager_1.ModelManager.ManipulaterModel.SetTargetPartLocation(i);
    }
    if (a !== this.w9r) {
      if (this.w9r?.Valid && this.b9r === undefined) {
        (i = this.w9r?.GetComponent(156))?.TryRemoveTagById(793256493);
        i?.TryRemoveSpecLockTag();
      }
      this.w9r = a;
      (i = this.w9r?.GetComponent(156))?.SetPassthroughPortalId(t?.PortalPairId ?? -1);
      i?.SetPassThroughPortalType(t?.PortalType ?? 0);
      if (e) {
        if (this.Fdl) {
          EffectSystem_1.EffectSystem.StopEffectById(this.Fdl, "[CharacterManipulateComponent.AfterFindTarget]", false);
          this.Fdl = undefined;
        }
        if (this.SGl) {
          this.G9r?.TryRemoveTagById(this.SGl);
          this.SGl = undefined;
        }
        if (a) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ManipulateStartLockCastTarget, this.w9r, this.$9r);
          this.Y9r = this.$9r;
          if (this.G9r?.CannotCastWithoutTarget) {
            this.Xte.RemoveTag(-972568039);
          }
          if ((t = a.GetComponent(161))?.Valid && this.b9r?.Valid && ((a = t.GetLockingEffect(this.b9r)) && (s = t.GetFinalLocation(this.b9r), s = new UE.TransformDouble(t.GetSocketRotator(this.b9r).ToUeRotator(), s.ToUeVector(), Vector_1.Vector.OneVectorDouble), this.Fdl = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, s, a, "[CharacterManipulateComponent.AfterFindTarget]", new EffectContext_1.EffectContext(this.Entity.Id))), s = t.GetLockingItemTag(this.b9r)) && (this.SGl = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(s), this.SGl)) {
            this.G9r?.TryAddTagById(this.SGl);
          }
        } else {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ManipulateEndLockCastTarget);
          if (this.G9r?.CannotCastWithoutTarget) {
            this.Xte.AddTag(-972568039);
          }
        }
      } else {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnManipulateSwitchToNewTarget, this.w9r !== undefined, this.w9r, e);
      }
      if (this.w9r?.Valid) {
        this.B9r = this.w9r.GetComponent(156);
      }
      if (this.w9r?.Valid && this.b9r === undefined) {
        i?.TryAddTagById(793256493);
        i?.TryAddSpecLockTag();
        if (ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId === MANIPULATE_SKILL_ID) {
          this.h7r(1193763416);
        }
      } else {
        this.l7r(1193763416);
      }
    } else if (this.Y9r !== this.$9r) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ManipulateStartLockCastTarget, this.w9r, this.$9r);
      this.Y9r = this.$9r;
    }
  }
  B7r(t) {
    if (t?.Valid) {
      if (t !== this.w9r) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HideJigsawBaseHint);
      }
      if ((t = t.GetComponent(161))?.Valid) {
        t.ShowAimModel(this.b9r);
        this.l7r(1520676172);
        if (this.G9r?.Config?.BaseCfg?.CanRotate) {
          this.h7r(-1070569477);
        }
      } else {
        this.l7r(-1070569477);
      }
    } else {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HideJigsawBaseHint);
      this.l7r(-1070569477);
      if (this.G9r?.Config?.BaseCfg?.CanRotate) {
        this.h7r(1520676172);
      }
    }
  }
  w7r(e, t) {
    var i = -MathUtils_1.MathUtils.MaxFloat;
    var s = e.Entity;
    var a = s.GetComponent(1);
    if (!this.q7r(s, t, a)) {
      return i;
    }
    var h = s.GetComponent(196);
    var r = s.GetComponent(156);
    if (r?.Valid && r?.ManipulateBaseConfig === undefined) {
      return i;
    }
    if (r && !r?.IsMatchRoleGravityDirect(this.n$t)) {
      return i;
    }
    let n = false;
    let o = false;
    let _ = 1;
    if (h?.HasTag(-709838471)) {
      return i;
    }
    if (t) {
      if (!this.b9r?.Valid && !this.w9r?.Valid) {
        return i;
      }
      if (!this.eB1(s)) {
        return i;
      }
      var h = s.GetComponent(0);
      var l = h.GetBaseInfo();
      if (!l) {
        return i;
      }
      if (this.b9r.GetComponent(157)?.Valid) {
        h = h.GetAwakedEntities();
        if (h.length > 0 && !h.includes(this.b9r.GetComponent(0).GetPbDataId())) {
          return i;
        }
      }
      if (this.G9r.Config.SearchTargetCfg) {
        for (const v of this.G9r.Config.SearchTargetCfg.LockConditions) {
          if ((0, IUtil_1.isEntitiyMatch)(v.EntitiyMatch, l.Category)) {
            n = true;
            _ = v.Weight;
            break;
          }
        }
      }
      if (!n) {
        return i;
      }
      h = s.GetComponent(161);
      if (h) {
        n = !!h?.CheckMatchManipulatable(this.G9r?.Entity) && !!h?.CanSetNewItem() && !h?.IsLockOrSlient() && !!h?.MultiplayerLimitTypeCheck();
      }
      h = s.GetComponent(0).GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Monster;
      if (n) {
        if (h) {
          h = s.GetComponent(69);
          let t = false;
          if (h.Parts.length > 0) {
            for (const c of h.Parts) {
              if (c.Active) {
                t = true;
                break;
              }
            }
          }
          n = t ? (o = true, !!(s = this.G7r(s, h)) && s.length > 0) : this.N7r(e);
        } else {
          n = this.N7r(e);
        }
      }
    } else {
      n = a.Owner?.ActorHasTag(TARGET_ACTOR_TAG) ?? false;
      if (!r?.Valid || (n = n && r.CanBeHeld, e.Dist > r.ManipulateBaseConfig.被感知范围)) {
        n = false;
      }
      h = this.Entity.GetComponent(0).GetCreatureDataId();
      s = r?.GetControllerId();
      n = (n = s === undefined || s === 0 || s !== 0 && s === h ? n : false) && this.N7r(e);
    }
    if (n) {
      return _ * this.O7r(e, i, o, t);
    } else {
      return i;
    }
  }
  k7r() {
    this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass());
    this.uoe.WorldContextObject = this.n$t.Owner;
    this.uoe.bIsSingle = false;
    this.uoe.bIgnoreSelf = true;
    this.uoe.bIsProfile = true;
    this.uoe.DrawTime = 0.5;
    TraceElementCommon_1.TraceElementCommon.SetTraceColor(this.uoe, LineTraceColor);
    TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(this.uoe, new UE.LinearColor(0, 1, 0, 1));
  }
  F7r() {
    this.K9r = UE.NewObject(UE.TraceSphereElement.StaticClass());
    this.K9r.WorldContextObject = this.n$t.Owner;
    this.K9r.bIsSingle = false;
    this.K9r.bIgnoreSelf = true;
    this.K9r.bIsProfile = true;
    this.K9r.ProfileName = NORMAL_CHECK_PRESET_NAME;
    this.K9r.DrawTime = 0.5;
    TraceElementCommon_1.TraceElementCommon.SetTraceColor(this.K9r, LineTraceColor);
    TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(this.K9r, LineTraceColor);
  }
  N7r(t) {
    if (!this.uoe) {
      this.k7r();
    }
    var e = t.Entity.GetComponent(1);
    var i = Vector_1.Vector.Create();
    i.DeepCopy(this.n$t.ActorLocationProxy);
    var s = Vector_1.Vector.Create(0, 0, TEMP_HALF_HEIGHT);
    GravityUtils_1.GravityUtils.RotatedVectorByActorInitGravity(e, s);
    i.AdditionEqual(s);
    var s = i.ToUeVectorOld();
    let a = e.ActorLocation;
    var h = e.Entity.GetComponent(148);
    if (h?.Valid) {
      a = h.GetHitPoint().ToUeVector();
    }
    var h = e.Entity.GetComponent(161);
    if (h?.Valid) {
      a = h.GetSocketLocation(this.b9r).ToUeVector();
    }
    var h = e.Entity.GetComponent(140);
    if (h?.Valid) {
      a = h.GetHitPoint().ToUeVector();
    }
    var h = e.Entity.GetComponent(156);
    if (h?.Valid) {
      h = Vector_1.Vector.Create(h.ManipulateBaseConfig.被感知坐标偏移);
      GravityUtils_1.GravityUtils.RotatedVectorByActorInitGravity(e, h);
      a = a.op_Addition(h.ToUeVector());
    }
    this.uoe.SetDrawDebugTrace(this.j9r ? 2 : 0);
    this.uoe.ProfileName = NORMAL_CHECK_PRESET_NAME;
    let r = true;
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, s);
    if (t.PortalType === 0) {
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, a);
      if (TraceElementCommon_1.TraceElementCommon.LineTrace(this.uoe, PROFILE_KEY)) {
        r = this.O0a(e);
      }
    } else {
      var h = t.PortalType === 1;
      var s = Vector_1.Vector.Create(e.ActorLocationProxy);
      var n = Vector_1.Vector.Create();
      PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(s, t.PortalPairId, !h, n);
      var o = ModelManager_1.ModelManager.PortalModel.GetPortal(t.PortalPairId);
      const a = Vector_1.Vector.Create();
      MathUtils_1.MathUtils.LinePlaneIntersectionOriginNormal(i, n, Vector_1.Vector.Create((h ? o.PortalWorldTransform1 : o.PortalWorldTransform2).GetLocation()), Vector_1.Vector.Create((h ? o.PortalWorldTransform1 : o.PortalWorldTransform2).GetRotation().GetForwardVector()), a);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, a);
      var _ = TraceElementCommon_1.TraceElementCommon.LineTrace(this.uoe, PROFILE_KEY);
      if (!(r = _ ? this.O0a(e) : r)) {
        return r;
      }
      PortalUtils_1.PortalUtils.GetMappingPosToOtherPortal(i, t.PortalPairId, h, n);
      MathUtils_1.MathUtils.LinePlaneIntersectionOriginNormal(n, s, Vector_1.Vector.Create((h ? o.PortalWorldTransform2 : o.PortalWorldTransform1).GetLocation()), Vector_1.Vector.Create((h ? o.PortalWorldTransform2 : o.PortalWorldTransform1).GetRotation().GetForwardVector()), a);
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, a);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, s);
      if (TraceElementCommon_1.TraceElementCommon.LineTrace(this.uoe, PROFILE_KEY)) {
        r = this.O0a(e);
      }
    }
    return r && this.j7r(this.q9r, r);
  }
  O0a(e) {
    if (this.uoe.HitResult.bBlockingHit) {
      for (let t = 0; t < this.uoe.HitResult.Actors.Num(); t++) {
        var i = this.uoe.HitResult.Actors.Get(t);
        if (i !== undefined) {
          var s = this.uoe.HitResult.Components.Get(t);
          if (this.V7r(i, e)) {
            break;
          }
          if (this.H7r(i, s)) {
            return false;
          }
        }
      }
    }
    return true;
  }
  j7r(e, t) {
    var i = Vector_1.Vector.Create();
    i.DeepCopy(this.n$t.ActorLocationProxy);
    var s = Vector_1.Vector.Create(0, 0, TEMP_HALF_HEIGHT);
    GravityUtils_1.GravityUtils.RotatedVectorByActorInitGravity(e, s);
    i.AdditionEqual(s);
    var s = i.ToUeVectorOld();
    var i = this.x9r.D_GetTransform();
    var a = e?.Entity.GetComponent(156);
    if (!a?.Valid) {
      return t;
    }
    t = Vector_1.Vector.Create(a.ConfigHoldOffset);
    GravityUtils_1.GravityUtils.RotatedVectorByActorInitGravity(e, t);
    a = i.TransformPositionNoScale(t.ToUeVector());
    if (!this.uoe) {
      this.k7r();
    }
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, s);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, a);
    this.uoe.ProfileName = NORMAL_CHECK_PRESET_NAME;
    i = TraceElementCommon_1.TraceElementCommon.LineTrace(this.uoe, PROFILE_KEY);
    if (i && this.uoe.HitResult.bBlockingHit) {
      for (let t = 0; t < this.uoe.HitResult.Actors.Num(); t++) {
        var h = this.uoe.HitResult.Actors.Get(t);
        if (h !== undefined) {
          if (this.b9r.GetComponent(159)?.IsChildrenActor(h)) {
            break;
          }
          var r = this.uoe.HitResult.Components.Get(t);
          if (this.V7r(h, e)) {
            break;
          }
          if (this.H7r(h, r)) {
            return false;
          }
        }
      }
    }
    return true;
  }
  H7r(t, e) {
    return this.q9r?.Owner !== t && !!e && !t.ActorHasTag(MANIPULATE_CHECK_IGNORE_TAG) && !(t = e.GetCollisionProfileName(), RenderConfig_1.RenderConfig.WaterCollisionProfileName.op_Equality(t)) && !HIT_COLLISION_NAME.op_Equality(t);
  }
  E7r() {
    if (this.G9r?.Valid) {
      if (!this.K9r) {
        this.F7r();
      }
      var t = Vector_1.Vector.Create();
      t.DeepCopy(this.n$t.ActorLocationProxy);
      var e = Vector_1.Vector.Create(0, 0, this.n$t.HalfHeight);
      GravityUtils_1.GravityUtils.RotatedVectorByActorInitGravity(this.q9r, e);
      t.AdditionEqual(e);
      var e = t.ToUeVectorOld();
      const a = Vector_1.Vector.Create();
      a.DeepCopy(this.n$t.ActorForwardProxy);
      a.Normalize();
      t.AdditionEqual(a.MultiplyEqual(20));
      t = t.ToUeVectorOld();
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.K9r, e);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.K9r, t);
      this.K9r.Radius = this.n$t.HalfHeight;
      this.K9r.SetDrawDebugTrace(this.j9r ? 1 : 0);
      e = TraceElementCommon_1.TraceElementCommon.SphereTrace(this.K9r, PROFILE_KEY);
      if (e && this.K9r.HitResult.bBlockingHit) {
        for (let t = 0; t < this.K9r.HitResult.Actors.Num(); t++) {
          var i = this.K9r.HitResult.Actors.Get(t);
          if (i !== undefined && !this.V7r(i, this.q9r)) {
            var s = this.K9r.HitResult.Components.Get(t);
            if (this.H7r(i, s)) {
              i = Vector_1.Vector.Create();
              TraceElementCommon_1.TraceElementCommon.GetImpactPoint(this.K9r.HitResult, t, i);
              i.SubtractionEqual(this.n$t.ActorLocationProxy);
              const a = this.n$t.ActorForwardProxy;
              i.Set(i.X, i.Y, 0);
              i.Normalize();
              a.Set(a.X, a.Y, 0);
              a.Normalize();
              i.CrossProduct(a, i);
              if (i.Z > 0) {
                this.G9r.UsingAssistantHoldOffset = true;
                return;
              }
            }
          }
        }
        this.G9r.UsingAssistantHoldOffset &&= false;
      } else {
        this.G9r.UsingAssistantHoldOffset = false;
      }
    }
  }
  V7r(t, e) {
    let i = undefined;
    return (i = (UE.KuroStaticLibrary.IsImplementInterface(t.GetClass(), UE.BPI_CreatureInterface_C.StaticClass()) ? ActorUtils_1.ActorUtils : ModelManager_1.ModelManager.SceneInteractionModel).GetEntityByActor(t))?.Id === e?.Entity.Id;
  }
  q7r(t, e, i) {
    return !!t.Active && (!e || t !== this.b9r) && !!i?.Valid;
  }
  O7r(t, e, i, s = false) {
    let a = e;
    return a = i ? this.W7r(t, e) : t.Entity.GetComponent(138)?.Valid ? this.K7r(t, e, s) : this.Q7r(t, e, s);
  }
  Q7r(e, t, i) {
    var s = e.Entity.GetComponent(1);
    var a = Vector_1.Vector.Create(s.ActorLocationProxy);
    var h = s.Entity.GetComponent(161);
    if (h?.Valid) {
      a.DeepCopy(h.GetSocketLocation(this.b9r));
    }
    let r = -1;
    var a = s.Entity.GetComponent(156);
    var n = new Array();
    var o = new Array();
    if (i) {
      for (const C of this.G9r.Config.SearchTargetCfg.AngleWeight) {
        n.push(C.Angle);
        o.push(C.Weight);
      }
    } else {
      var _ = a.ManipulateBaseConfig.被感知角度权重;
      for (let t = 0; t < _.Num(); t++) {
        var l = _.GetKey(t);
        var v = _.Get(l);
        n.push(l);
        o.push(v);
      }
    }
    for (let t = 0; t < n.length; t++) {
      var c = n[t];
      if (e.Dot > Math.cos(c * this.X9r / 180 * Math.PI)) {
        r = o[t];
        break;
      }
    }
    if (r === -1) {
      return t;
    } else {
      h = i ? this.G9r.ManipulateBaseConfig.投掷锁定范围 : this.W9r;
      s = !!i && this.G9r.Config.SearchTargetCfg.IgnoreDistanceWeight ? 1 : h - e.Dist;
      return r * s;
    }
  }
  W7r(t, e) {
    var i = t.Entity;
    var t = i.GetComponent(69);
    let s = -Number.MAX_VALUE;
    let a = -1;
    var h = this.G7r(i, t);
    for (let t = 0; t < h.length; t++) {
      var r = h[t];
      var r = this.b7r(i, r.BoneName)[0];
      var n = Vector_1.Vector.Create(r.GetLocation());
      var o = Vector_1.Vector.Create(0, 0, 0);
      n.Subtraction(this.n$t.ActorLocationProxy, o);
      o.Normalize();
      Vector_1.Vector.Create(r.GetLocation()).SubtractionEqual(this.n$t.ActorLocationProxy);
      var _ = MathUtils_1.MathUtils.DotProduct(o, this.r7r);
      var r = Vector_1.Vector.Distance(n, this.n$t.ActorLocationProxy);
      if (!(r > this.W9r)) {
        let e = -1;
        var l = new Array();
        var v = new Array();
        for (const C of this.G9r.Config.SearchTargetCfg.AngleWeight) {
          l.push(C.Angle);
          v.push(C.Weight);
        }
        for (let t = 0; t < l.length; t++) {
          var c = l[t];
          if (_ > Math.cos(c * this.X9r / 180 * Math.PI)) {
            e = v[t];
            break;
          }
        }
        if (e !== -1 && (o = e * (this.W9r - r)) > s) {
          s = o;
          a = t;
        }
      }
    }
    if (a !== -1) {
      this.i7r = h[a];
      return 10000;
    } else {
      return e;
    }
  }
  K7r(t, e, i) {
    var s = t.Entity.GetComponent(138);
    let a = -MathUtils_1.MathUtils.MaxFloat;
    var h = Vector_1.Vector.Create(0, 0, 0);
    var r = [];
    var n = [];
    let o = -1;
    r = [];
    n = [];
    if (i) {
      for (const E of this.G9r.Config.SearchTargetCfg.AngleWeight) {
        r.push(E.Angle);
        n.push(E.Weight);
      }
    } else {
      var _ = t.Entity.GetComponent(156).ManipulateBaseConfig.被感知角度权重;
      for (let t = 0; t < _.Num(); t++) {
        var l = _.GetKey(t);
        var v = _.Get(l);
        r.push(l);
        n.push(v);
      }
    }
    for (const u of s.GetAllActivatedBlockPos()) {
      u.Subtraction(CameraController_1.CameraController.CameraLocation, h);
      h.Normalize();
      var c;
      var C = MathUtils_1.MathUtils.DotProduct(h, this.r7r);
      for (let t = 0; t < r.length; t++) {
        var m = r[t];
        if (C > Math.cos(m * this.X9r / 180 * Math.PI)) {
          o = n[t];
          break;
        }
      }
      if (o !== -1 && (c = o * C) > a) {
        a = c;
      }
    }
    if (a === -MathUtils_1.MathUtils.MaxFloat) {
      return e;
    } else {
      return a;
    }
  }
  yla(t) {
    if (!this.w9r?.Valid || !this.B9r?.Valid || (this.Ela += t, this.Ela > MAX_WAIT_MANIPULATE_TIME) || this.B9r.CanBeHeld && !this.Ila()) {
      this.StopWaitingToManipulate();
      this.Reset();
    }
  }
  p7r(t) {
    this.O9r += t * 0.001;
    this.G9r?.TickState(t * 0.001);
    if (this.B9r === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 31, "[Manipulate] 读条中的对象上没有Manipulatable组件", ["Name", this.w9r]);
      }
      this.StopManipulate();
    } else if (this.O9r > this.B9r.ManipulateBaseConfig.读条时间) {
      this.Draw();
    }
  }
  v7r(t) {
    if (!this.G9r?.PlayingMatchSequence) {
      this.k9r += t * 0.001;
      if (this.j7r(this.q9r, false)) {
        this.G9r?.TickState(t * 0.001);
        if ((t = this.G9r?.ManipulateBaseConfig.吸取时间) && this.k9r >= t) {
          t = this.q9r.ActorLocationProxy;
          if (Vector_1.Vector.DistSquared(t, this.q9r.ActorLocationProxy) < 2500) {
            this.R7r();
          } else {
            this.StopManipulate();
            this.Reset();
          }
        }
      } else {
        this.StopManipulate();
        this.Reset();
      }
    }
  }
  M7r(e) {
    this.k9r += e * 0.001;
    if (this.N9r?.IsValid()) {
      var t;
      this.G9r?.TickState(e * 0.001);
      if (this.G9r.CastFreeState instanceof SceneItemManipulableBoomerangCastState_1.SceneItemManipulableBoomerangCastState) {
        if (this.G9r.Config.ThrowCfg.MotionConfig.RenderTrajectoryConfig?.Effect) {
          let t = [];
          if ((t = this.w9r?.Valid ? ((e = this.G9r.CalcCastTargetPointWithEntity(this.w9r)).Subtraction(this.q9r.ActorLocationProxy, e), e.Normalize(), this.G9r.CastFreeState.GetCastPath(e)) : (e = this.D7r(), this.G9r.CastFreeState.GetCastPath(Vector_1.Vector.Create(e.VectorDouble())))).length > 0) {
            if (!this.z9r) {
              if (LevelAimLineController_1.LevelAimLineController.PlayEffect()) {
                this.z9r = true;
              }
            }
            LevelAimLineController_1.LevelAimLineController.UpdatePoints(t, 0);
          }
        }
      } else if (this.G9r.CastFreeState instanceof SceneItemManipulableLevitateCastState_1.SceneItemManipulableLevitateCastState && (e = this.G9r.Config.ThrowCfg.MotionConfig, t = this.G9r.CastFreeState.GetCastPath(), e.RenderTrajectoryConfig?.Effect && t.length > 0 && (this.z9r || LevelAimLineController_1.LevelAimLineController.PlayEffect(e.RenderTrajectoryConfig.Effect) && (this.z9r = true), LevelAimLineController_1.LevelAimLineController.UpdatePoints(t, 0)), t.length > 0)) {
        (e = Transform_1.Transform.Create(this.q9r.ActorTransform)).SetLocation(t[t.length - 1]);
        this.q9r.GetInteractionMainActor().UpdateProjectionActorTransform(e.ToUeTransform());
      }
      if (Vector_1.Vector.Distance(this.q9r.ActorLocationProxy, Vector_1.Vector.Create(this.G9r.MovementTargetLocation)) < ConfigManager_1.ConfigManager.ManipulateConfig.DisconnectDistance) {
        if (this.G9r.IsHoldingUsePhysics) {
          t = UE.KismetMathLibrary.WD_WorldToLocal(GlobalData_1.GlobalData.World, this.G9r.MovementTargetLocation);
          this.N9r.SetTargetLocationAndRotation(t, this.G9r.MovementTargetRotation);
        } else {
          this.q9r.SetActorLocationAndRotation(this.G9r.MovementTargetLocation, this.G9r.MovementTargetRotation, "TickHolding", false);
        }
      } else {
        this.StopManipulate();
        this.Reset();
      }
    }
  }
  S7r(t) {
    this.F9r += t;
    this.G9r?.TickState(t * 0.001);
    if (this.F9r > ConfigManager_1.ConfigManager.ManipulateConfig.PrecastTime) {
      this.Cast();
    }
  }
  StopManipulate() {
    var t = this.Entity.GetComponent(40);
    t.EndSkill(CharacterManipulateComponent_1.SkillId, "StopManipualte");
    t.EndSkill(CharacterManipulateComponent_1.HoldingSkillId, "StopManipualte");
    t.EndSkill(CharacterManipulateComponent_1.CastSkillId, "StopManipualte");
    t.EndSkill(CharacterManipulateComponent_1.CancelSkillId, "StopManipualte");
    this.l7r(1193763416);
    if (this.ac === 1) {
      this.StopWaitingToManipulate();
      this.Reset();
    }
    this.w9r = undefined;
  }
  GetHoldingActor() {
    return this.q9r.Owner;
  }
  GetHoldingEntity() {
    return this.b9r;
  }
  SetDataFromOldRole(t) {
    var e = t.Entity.GetComponent(65);
    if (e.ac === 4) {
      t.Entity.GetComponent(40).SkillTarget = undefined;
      this.Entity.GetComponent(40).SkillTarget = undefined;
    }
    e.Reset();
    this.j9r = e.j9r;
    this.StopManipulate();
    this.l7r(1193763416);
  }
  h7r(t) {
    if (!this.Xte.HasTag(t)) {
      this.Xte.AddTag(t);
    }
  }
  l7r(t) {
    if (this.Xte.HasTag(t)) {
      this.Xte.RemoveTag(t);
    }
  }
  ActiveHandFX(t, e = 0) {
    var i = t.GetComponent(196);
    if (i) {
      i.AddTag(1408918695);
      this.Z9r = i;
      this.J9r = true;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 31, "被控物目标找不到TagComp", ["Entity", t]);
    }
  }
  DeactiveHandFx() {
    if (this.Z9r) {
      this.Z9r.RemoveTag(1408918695);
      this.Z9r = undefined;
      this.J9r = false;
    }
  }
  T7r() {
    var t;
    var e = this.w9r ?? this.b9r;
    if (e?.Valid) {
      e = e.GetComponent(0)?.GetCreatureDataId();
      (t = Protocol_1.Aki.Protocol.Tds.create()).F4n = MathUtils_1.MathUtils.NumberToLong(e);
      t.xWn = false;
      Net_1.Net.Call(20574, t, t => {});
    }
  }
  AddOrRemoveManipulateAirTag(t) {
    var e = this.ac === 4;
    let i = 0;
    i = e ? -1976579620 : -1178928415;
    if (t) {
      if (!this.Xte.HasTag(i)) {
        this.Xte.AddTag(i);
      }
    } else {
      this.Xte.RemoveTag(-1976579620);
      this.Xte.RemoveTag(-1178928415);
    }
  }
  b7r(t, e) {
    var i;
    var s;
    var a = t.GetComponent(3)?.Actor?.Mesh;
    let h = undefined;
    for ([i, s] of t.GetComponent(69).GroupMapByBone) {
      if (s === e.toString()) {
        h = FNameUtil_1.FNameUtil.GetDynamicFName(i);
        break;
      }
    }
    t = a.GetAllSocketNames();
    if (h !== undefined && t.FindIndex(h) !== -1) {
      return [a.D_GetSocketTransform(h, 0), h];
    } else {
      return [undefined, undefined];
    }
  }
  G7r(t, e) {
    var i;
    var s;
    var a;
    var h = new Array();
    for (const r of e.Parts) {
      if (r.Active && ([s, i] = this.b7r(t, r.BoneName), s)) {
        a = this.n$t.ActorLocationProxy;
        s = Vector_1.Vector.Create(s.GetLocation());
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, a);
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, s);
        this.uoe.ProfileName = MONSTER_PART_CHECK_PRESET_NAME;
        if (!TraceElementCommon_1.TraceElementCommon.LineTrace(this.uoe, PROFILE_KEY) || !this.uoe.HitResult.bBlockingHit || !(a = !this.uoe.HitResult.Components.Get(0).AttachSocketName.op_Equality(i), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Temp", 31, "realBoneName", ["realBoneName", i.toString()], ["beBlock", a]), a)) {
          h.push(r);
        }
      }
    }
    if (h.length > 0) {
      return h;
    } else {
      return undefined;
    }
  }
  ExtraAction() {
    var t;
    if (this.ac === 4 && (this.b9r.Valid || this.G9r.Valid) && (t = this.b9r.GetComponent(138))?.Valid) {
      this.G9r?.TryRemoveTagById(-1354651119);
      t.RotateSelf();
      this.G9r?.TryAddTagById(-1354651119);
    }
  }
  GetIsCharRotateWithCameraWhenManipulate() {
    if (this.ac !== 3 && this.ac !== 4) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 31, "[Manipulate.GetIsCharRotateWithCameraWhenManipulate] 当前不是控物中");
      }
      return false;
    } else {
      return this.G9r.ManipulateBaseConfig.角色是否随相机旋转;
    }
  }
  ChangeToProjectileState() {
    return this.ac === 4 && !this.G9r.IsProjectileAimMode && !!this.G9r.ManipulateBaseConfig.抛物瞄准模式开关 && !(this.G9r.IsProjectileAimMode = true, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ManipulateEndLockCastTarget), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnManipulateSwitchToNewTarget, false, undefined, true), 0);
  }
  ChangeToNormalState() {
    return this.ac === 4 && !!this.G9r.IsProjectileAimMode && !!this.G9r.ManipulateBaseConfig.抛物瞄准模式开关 && !(this.G9r.IsProjectileAimMode = false, this.w9r?.Valid && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ManipulateStartLockCastTarget, this.w9r, this.$9r), 0);
  }
  Ila() {
    var t;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Character", 39, "[CharacterManipulateComp] ManipulateSelectedTarget", ["Id", this.Entity.Id], ["PbdataId", this.Entity.GetComponent(0)?.GetPbDataId()], ["TargetId", this.w9r?.Id]);
    }
    return !!this.w9r && !!this.B9r && !!(t = this.Entity.GetComponent(40)).Valid && t.BeginSkill(CharacterManipulateComponent_1.SkillId, {
      Reason: "ManipulateSpecificTarget"
    });
  }
  CanManipulate() {
    return !!this.n$t.IsMoveAutonomousProxy && !!CharacterManipulateComponent_1.f7r && this.ac === 0 && !this.Q9r && !!this.Entity.GetComponent(40).Valid;
  }
  TryManipulateSpecificItem(t) {
    var e;
    return !!this.CanManipulate() && !!(e = t.GetComponent(156)) && !!t.GetComponent(133)?.Valid && !(this.w9r = t, this.B9r = e, this.Ela = 0, this.ac = 1, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Character", 39, "[CharacterManipulateComp] TryManipulateSpecificItem", ["Id", this.Entity.Id], ["PbdataId", this.Entity.GetComponent(0)?.GetPbDataId()], ["TargetId", this.w9r?.Id]), 0);
  }
  StopWaitingToManipulate() {
    this.Ela = 0;
    var t = this.Entity.GetComponent(40);
    t.EndSkill(CharacterManipulateComponent_1.SkillId, "StopManipualte");
    t.EndSkill(CharacterManipulateComponent_1.HoldingSkillId, "StopManipualte");
    t.EndSkill(CharacterManipulateComponent_1.CastSkillId, "StopManipualte");
    t.EndSkill(CharacterManipulateComponent_1.CancelSkillId, "StopManipualte");
    this.l7r(1193763416);
  }
  OnRoleTeleport() {
    var t;
    if (this.ac === 4 && (t = this.G9r?.HoldState.UpdateTargetLocationAndRotation(), this.G9r.IsHoldingUsePhysics && this.N9r && this.N9r.ReleaseComponent(), this.q9r?.SetActorLocationAndRotation(t.Loc, t.Rot, "OnRoleTeleport", false), t = UE.KismetMathLibrary.WD_WorldToLocal(GlobalData_1.GlobalData.World, this.q9r.ActorLocation), this.G9r.IsHoldingUsePhysics) && this.N9r) {
      this.N9r.GrabComponentAtLocationWithRotation(this.q9r.GetPrimitiveComponent(), FNameUtil_1.FNameUtil.EMPTY, t, this.q9r.ActorRotation);
    }
  }
  IsManipulating() {
    return this.ac !== 0;
  }
  get CurSelectedEntity() {
    return this.w9r;
  }
  eB1(t) {
    var t = t.GetComponent(0)?.GetPbEntityInitData();
    return !t || !GravityUtils_1.GravityUtils.IsEntityGravityLimitGravity(t) || (t = GravityUtils_1.GravityUtils.GetGravityDirectByEntityData(t), !this.n$t?.MoveComp) || (this.n$t?.MoveComp?.IsStandardGravity ? t.Equals(Vector_1.Vector.DownVectorProxy) : t.Equals(this.n$t.ActorGravityDirectProxy));
  }
};
CharacterManipulateComponent.f7r = false;
CharacterManipulateComponent.SkillId = 210003;
CharacterManipulateComponent.CastSkillId = 210005;
CharacterManipulateComponent.CancelSkillId = 210006;
CharacterManipulateComponent.HoldingSkillId = 210007;
CharacterManipulateComponent = CharacterManipulateComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(65)], CharacterManipulateComponent);
exports.CharacterManipulateComponent = CharacterManipulateComponent; //# sourceMappingURL=CharacterManipulateComponent.js.map