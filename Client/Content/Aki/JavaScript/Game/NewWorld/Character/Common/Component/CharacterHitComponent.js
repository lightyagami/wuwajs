"use strict";

var CharacterHitComponent_1;
var __decorate = this && this.__decorate || function (t, i, e, s) {
  var h;
  var r = arguments.length;
  var a = r < 3 ? i : s === null ? s = Object.getOwnPropertyDescriptor(i, e) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(t, i, e, s);
  } else {
    for (var o = t.length - 1; o >= 0; o--) {
      if (h = t[o]) {
        a = (r < 3 ? h(a) : r > 3 ? h(i, e, a) : h(i, e)) || a;
      }
    }
  }
  if (r > 3 && a) {
    Object.defineProperty(i, e, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterHitComponent = exports.MAX_HIT_EFFECT_COUNT = exports.OUTER_RADIUS = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const Time_1 = require("../../../../../Core/Common/Time");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const HardnessModeById_1 = require("../../../../../Core/Define/ConfigQuery/HardnessModeById");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon");
const Quat_1 = require("../../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const CameraController_1 = require("../../../../Camera/CameraController");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const Global_1 = require("../../../../Global");
const GlobalData_1 = require("../../../../GlobalData");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const BattleUiDefine_1 = require("../../../../Module/BattleUi/BattleUiDefine");
const GamepadController_1 = require("../../../../Module/Gamepad/GamepadController");
const SceneTeamController_1 = require("../../../../Module/SceneTeam/SceneTeamController");
const ColorUtils_1 = require("../../../../Utils/ColorUtils");
const BulletConstant_1 = require("../../../Bullet/BulletConstant");
const BulletStaticFunction_1 = require("../../../Bullet/BulletStaticMethod/BulletStaticFunction");
const BulletUtil_1 = require("../../../Bullet/BulletUtil");
const FightLibrary_1 = require("../Blueprint/Utils/FightLibrary");
const CharacterBuffIds_1 = require("./Abilities/CharacterBuffIds");
const CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes");
const WhirlpoolPoint_1 = require("./Move/WhirlpoolPoint");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
const CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage");
const SkillMessageController_1 = require("../../../../Module/CombatMessage/SkillMessageController");
const PhantomUtil_1 = require("../../../../Module/Phantom/PhantomUtil");
const CombatLog_1 = require("../../../../Utils/CombatLog");
const BulletCollisionUtil_1 = require("../../../Bullet/BulletStaticMethod/BulletCollisionUtil");
const RoleAudioController_1 = require("../../Role/RoleAudioController");
const BaseHitComponent_1 = require("./BaseHitComponent");
const CharacterHitOptimize_1 = require("./CharacterHitMisc/CharacterHitOptimize");
const MASS_RATE = 100;
exports.OUTER_RADIUS = 100;
exports.MAX_HIT_EFFECT_COUNT = 3;
const DEFALUT_SLOT_NAME = new UE.FName("DefaultSlot");
const DEBUG = false;
const forbidHitTagIds = [1008164187, -1192672452, 1922078392, -648310348, 855966206];
const enterFkForbidHitTagIds = [-1192672452, 1922078392, -648310348, 855966206];
const lightHits = new Set([0, 1, 8, 9]);
class DoubleHitInAirEffect {
  constructor() {
    this.GravityScaleUp = 0;
    this.GravityScaleDown = 0;
    this.GravityScaleTop = 0;
    this.LandingBounce = Vector_1.Vector.Create();
    this.VelocityTop = 0;
    this.Valid = false;
    this.Duration = 0;
  }
  FromUeHitEffect(t) {
    this.GravityScaleUp = t.落地反弹上升重力标量;
    this.GravityScaleDown = t.落地反弹下落重力标量;
    this.GravityScaleTop = t.落地反弹弧顶重力标量;
    this.LandingBounce.FromUeVector(t.落地反弹);
    this.VelocityTop = t.落地反弹速度阈值;
    this.Valid = true;
    this.Duration = t.落地反弹时长;
  }
  Finish() {
    this.Valid = false;
  }
}
let CharacterHitComponent = CharacterHitComponent_1 = class CharacterHitComponent extends BaseHitComponent_1.BaseHitComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.cBe = undefined;
    this.rJo = undefined;
    this.tVr = undefined;
    this.vHr = undefined;
    this.iVr = undefined;
    this.oVr = undefined;
    this.rVr = undefined;
    this.LastHitData = undefined;
    this.sVr = false;
    this.aVr = false;
    this.hVr = [];
    this.lVr = [];
    this._Vr = [];
    this.cVr = 0;
    this.fSu = false;
    this.eth = false;
    this.mVr = undefined;
    this.dVr = undefined;
    this.CVr = undefined;
    this.gVr = 0;
    this.RageModeId = 0;
    this.HardnessModeId = 0;
    this.BeHitBones = new Array();
    this.ToughDecreaseValue = 0;
    this.BeHitIgnoreRotate = false;
    this.CounterAttackInfoInternal = undefined;
    this.VisionCounterAttackInfoInternal = undefined;
    this.WindupAttackInfoInternal = undefined;
    this.BeHitTime = 0;
    this.NeedCalculateFallInjure = false;
    this.BeHitAnim = 0;
    this.AcceptedNewBeHit = false;
    this.EnterFk = false;
    this.ehl = false;
    this.BeHitDirect = Vector_1.Vector.Create();
    this.BeHitLocation = Vector_1.Vector.Create();
    this.BeHitSocketName = undefined;
    this.BeHitMapping = undefined;
    this.fVr = false;
    this.pVr = 0;
    this.vVr = 0;
    this.MVr = undefined;
    this.EVr = undefined;
    this.$zo = undefined;
    this.SVr = undefined;
    this.yVr = 0;
    this.IVr = false;
    this.TVr = undefined;
    this.Gue = Rotator_1.Rotator.Create();
    this.az = Quat_1.Quat.Create();
    this.F1t = undefined;
    this.HitEffectMap = new Map();
    this.hXs = undefined;
    this.xoa = undefined;
    this.Uha = undefined;
    this.rY1 = undefined;
    this.oY1 = false;
    this.ShouldOptimize = false;
    this.DVr = (t, i) => {
      if (i === CharacterUnifiedStateTypes_1.ECharPositionState.Ground) {
        if (t === CharacterUnifiedStateTypes_1.ECharPositionState.Air && this.DoubleHitInAirEffect?.Valid) {
          TimerSystem_1.TimerSystem.Next(this.RVr, undefined, "落地击飞");
        } else {
          this.DeActiveStiff("落地");
        }
      } else if (t === CharacterUnifiedStateTypes_1.ECharPositionState.Air) {
        this.DoubleHitInAirEffect.Finish();
      }
    };
    this.PVr = undefined;
    this.UVr = false;
    this.AVr = 0;
    this.Jtc = undefined;
    this.BFa = -1;
    this.XAl = () => {
      if (this.Entity.Valid) {
        this.TVr = undefined;
        this.ARe(-2044964178);
      }
    };
    this.xVr = Vector_1.Vector.Create();
    this.wVr = Vector_1.Vector.Create();
    this.oHo = Transform_1.Transform.Create();
    this.LF_ = false;
    this.Ml1 = Vector_1.Vector.Create();
    this.BVr = Vector_1.Vector.Create();
    this.bVr = Vector_1.Vector.Create();
    this.DoubleHitInAirEffect = undefined;
    this.RVr = () => {
      var t;
      var i;
      var e;
      var s;
      var h;
      if (this.DoubleHitInAirEffect.Valid) {
        i = (t = this.Entity.GetComponent(178)).GetLastUpdateVelocity();
        e = this.Hte.ActorQuatProxy;
        s = this.DoubleHitInAirEffect.LandingBounce;
        CharacterHitComponent_1.D91.Set(s.X, 0, s.Z);
        e.RotateVector(CharacterHitComponent_1.D91, CharacterHitComponent_1.U91);
        this.BVr.Set(i.X * CharacterHitComponent_1.U91.X, i.Y * CharacterHitComponent_1.U91.Y, i.Z * -1 * CharacterHitComponent_1.U91.Z);
        s = this.vHr?.CurrentTimeScale;
        h = this.EVr.GetCurrentValue(EAttributeId.Proto_Mass);
        this.BVr.MultiplyEqual(MASS_RATE / h * (s ?? 1));
        if (t.Valid) {
          if (t.Active) {
            t.SetForceSpeed(this.BVr);
          }
          if (t.CharacterMovement.MovementMode !== 3) {
            this.Hte.Actor.KuroSetMovementMode({
              Mode: 3,
              Context: "[CharacterHitComponent.DoubleAirHit]"
            });
          }
          t.SetGravityScale(this.DoubleHitInAirEffect.GravityScaleUp, this.DoubleHitInAirEffect.GravityScaleDown, this.DoubleHitInAirEffect.GravityScaleTop, this.DoubleHitInAirEffect.VelocityTop, this.DoubleHitInAirEffect.Duration);
          CombatLog_1.CombatLog.Info("Hit", this.Entity, "DoubleAirHit", ["final air hit velocity", this.BVr.ToString()], ["last update velocity", i.ToString()], ["bounce", CharacterHitComponent_1.U91.ToString()], ["mass", h], ["time scale", s], ["quat", e.ToString()]);
        }
        this.DoubleHitInAirEffect.Finish();
        this.UVr = true;
        this.AVr = Time_1.Time.Frame;
      }
    };
    this.Rbr = undefined;
  }
  get HadTriggerCounterAttack() {
    return this.fSu;
  }
  GetHitData() {
    return this.rVr;
  }
  OnInitData() {
    this.DoubleHitInAirEffect = new DoubleHitInAirEffect();
    return true;
  }
  OnInit() {
    CharacterHitComponent_1.GVr ||= new Set([4, 7]);
    this.BeHitSocketName = FNameUtil_1.FNameUtil.EMPTY;
    return true;
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(3);
    this.cBe = this.Entity.GetComponent(40);
    this.$zo = this.Entity.GetComponent(174);
    this.rJo = this.Entity.GetComponent(175);
    this.oVr = this.Entity.GetComponent(55);
    this.tVr = this.Entity.GetComponent(68);
    this.vHr = this.Entity.GetComponent(122);
    this.EVr = this.Entity.GetComponent(173);
    this.SVr = this.Entity.GetComponent(205);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.DVr);
    var t = this.Entity.GetComponent(0)?.GetVisionComponent();
    if (t) {
      t = PhantomUtil_1.PhantomUtil.GetVisionData(t.VisionId);
      this.ShouldOptimize = !!t && t.类型 === 4;
    }
    this.MVr = [];
    this.F1t = (t, i) => {
      this.MVr = this.MVr.filter(t => EffectSystem_1.EffectSystem.IsValid(t));
      var e = this.vHr.FreezeTimeScale * this.TimeDilation;
      var s = ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation;
      for (const h of this.MVr) {
        EffectSystem_1.EffectSystem.SetTimeScale(h, e);
        EffectSystem_1.EffectSystem.SetAdditionTimeScale(14, h, s);
      }
    };
    this.PVr = (t, i) => {
      if (t === CharacterUnifiedStateTypes_1.ECharPositionState.Air && i === CharacterUnifiedStateTypes_1.ECharPositionState.Water) {
        this.DeActiveStiff("落水");
      }
    };
    this.lXs();
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharBeHitTimeScale, this.F1t);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.PVr);
    this.nY1();
    return true;
  }
  URe(t) {
    this.SVr?.AddTag(t);
  }
  ARe(t) {
    this.SVr?.RemoveTag(t);
  }
  OVr(t) {
    return this.SVr?.HasTag(t) ?? false;
  }
  kVr(t) {
    for (const i of t) {
      if (this.OVr(i)) {
        return true;
      }
    }
    return false;
  }
  nY1() {
    var t;
    var i;
    var e = this.Entity.GetComponent(0);
    var s = e.GetEntityType();
    if (s !== Protocol_1.Aki.Protocol.kks.Proto_Player && ((i = e?.GetPbEntityInitData()) && ((t = (i = (0, IComponent_1.getComponent)(i.ComponentsData, "AttributeComponent"))?.HardnessModeId) && (this.HardnessModeId = t), t = i?.RageModeId) && (this.RageModeId = t), this.RefreshHardnessModeConfig(), this.RefreshRageModeConfig(), (i = e?.GetEntityPropertyConfig()) && i.受击映射索引ID > 0 && (this.BeHitMapping = FightLibrary_1.FightLibrary.GetHitMapConfig(i.受击映射索引ID)), s === Protocol_1.Aki.Protocol.kks.Proto_Monster)) {
      this.rY1 = new CharacterHitOptimize_1.CharacterHitOptimize();
    }
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.DVr);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharBeHitTimeScale, this.F1t);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.PVr);
    if (this.F1t) {
      this.F1t(1, 0);
    }
    return true;
  }
  OnClear() {
    if (this.TVr && TimerSystem_1.TimerSystem.Has(this.TVr)) {
      TimerSystem_1.TimerSystem.Remove(this.TVr);
      this.TVr = undefined;
    }
    this.ShouldOptimize = false;
    this.Abr();
    return true;
  }
  GetAcceptedNewBeHitAndReset() {
    var t = this.AcceptedNewBeHit;
    if (this.AcceptedNewBeHit) {
      this.FVr(false);
      this.Entity.GetComponent(177).MainAnimInstance.AddForceUpdateSlotNameWhenMontageBlend(DEFALUT_SLOT_NAME);
    }
    return t;
  }
  FVr(t) {
    if (this.AcceptedNewBeHit !== t) {
      this.AcceptedNewBeHit = t;
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharOnSetNewBeHit, this.AcceptedNewBeHit);
    }
  }
  GetEnterFk() {
    return this.EnterFk;
  }
  GetEnterFkAndReset() {
    var t = this.EnterFk;
    this.EnterFk = false;
    return t;
  }
  GetDoubleHitInAir() {
    if (this.AVr !== Time_1.Time.Frame) {
      this.UVr = false;
    }
    return this.UVr;
  }
  SetBeHitIgnoreRotate(t) {
    this.BeHitIgnoreRotate = t;
  }
  VVr() {
    return !!this.IsTriggerCounterAttack || !!this.BeHitIgnoreRotate && !CharacterHitComponent_1.GVr?.has(this.BeHitAnim) && this.rJo?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground;
  }
  SetRageModeId(t) {
    this.RageModeId = t;
  }
  SetHardnessModeId(t) {
    this.HardnessModeId = t;
    if (this.Entity.GetComponent(3).IsAutonomousProxy) {
      ControllerHolder_1.ControllerHolder.CreatureController.HardnessModeChangedRequest(this.Entity.Id, t);
    }
  }
  SetCounterAttackInfo(t) {
    this.CounterAttackInfoInternal = t;
    this.URe(1124064628);
    this.URe(-1793427578);
  }
  SetVisionCounterAttackInfo(t) {
    this.VisionCounterAttackInfoInternal = t;
    this.URe(-1576849243);
  }
  SetWindupAttackInfo(t, i) {
    this.WindupAttackInfoInternal = t;
    this.URe(-1793427578);
    if (this.$zo) {
      var e = this.WindupAttackInfoInternal?.Buff;
      var s = e?.Num() ?? 0;
      for (let t = 0; t < s; t++) {
        var h = e.Get(t);
        if (h > 0) {
          this.$zo.AddBuff(Number(h), {
            InstigatorId: this.$zo.CreatureDataId,
            PreMessageId: i,
            Reason: "开始前摇ANS添加buff"
          });
        }
      }
    }
  }
  SetCounterAttackAnsInfo(t, i) {
    this.Jtc = t;
    this.BFa = i;
  }
  GetRageMode() {
    return this.dVr;
  }
  RefreshRageModeConfig() {
    if (this.RageModeId !== 0) {
      this.dVr = HardnessModeById_1.configHardnessModeById.GetConfig(this.RageModeId);
      if (!this.dVr) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Character", 14, "读取RageModeConfig失败", ["id", this.RageModeId]);
        }
      }
    } else {
      this.dVr = undefined;
    }
  }
  GetHardnessMode() {
    return this.CVr;
  }
  RefreshHardnessModeConfig() {
    if (this.HardnessModeId !== 0) {
      this.CVr = HardnessModeById_1.configHardnessModeById.GetConfig(this.HardnessModeId);
      if (!this.CVr) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Character", 14, "读取白条表失败", ["id", this.HardnessModeId]);
        }
      }
    } else {
      this.CVr = undefined;
    }
  }
  ReceiveOnHit(i, t, e, s, h, r, a, o, n, _, l) {
    if (this.kVr(forbidHitTagIds)) {
      if (this.kVr(enterFkForbidHitTagIds)) {
        this.HVr(EntitySystem_1.EntitySystem.Get(i.BulletEntityId));
      }
    } else if (!this.cBe?.CurrentSkill?.Active || !this.cBe.CurrentSkill.SkillInfo.OverrideHit) {
      this.rVr = i;
      this.WVr();
      if (e) {
        this.LastHitData = i;
        this.iVr = t;
        this.EnterFk = h;
        this.sVr = r;
        this.cVr = a ? 1 : o ? 2 : 0;
        this.fVr = false;
        this.BeHitTime = UE.GameplayStatics.GetTimeSeconds(this.Hte.Actor);
        this.BeHitLocation.DeepCopy(i.HitPosition);
        this.NeedCalculateFallInjure = true;
        if (_ > 0 && !h) {
          if (this.OVr(1447214865) && !this.IsTriggerCounterAttack) {
            this.jVr();
            return;
          }
          if (this.IsTriggerCounterAttack && this.CounterAttackInfoInternal) {
            this.KVr(this.rVr);
          }
          this.gVr = this.oVr?.TrySwitchHitState(l, false) ?? 0;
          if (!this.oVr || this.gVr) {
            this.BeHitAnim = l;
            e = i.ReBulletData.Base;
            let t = e.BeHitEffect;
            if (this.sVr) {
              t = e.HitEffectWeakness;
            }
            r = ConfigManager_1.ConfigManager.BulletConfig.GetBulletHitData(this.iVr, t);
            if (r) {
              CombatLog_1.CombatLog.Info("Hit", this.Entity, "远端受击");
              this.Hte.SetMoveControlled(false, 2, "远端受击");
              if (s) {
                this.Entity.GetComponent(3).SetActorRotation(n, "受击者旋转", false);
              }
              this.BeHitAnim = l;
              this.QVr(r);
            } else {
              this.HVr(EntitySystem_1.EntitySystem.Get(i.BulletEntityId));
            }
          } else {
            this.HVr(EntitySystem_1.EntitySystem.Get(i.BulletEntityId));
          }
        }
        if (!!this.EnterFk && (!(a = t.GetComponent(1))?.Valid || !(this.Hte.ActorLocationProxy.Subtraction(a.ActorLocationProxy, this.BeHitDirect), this.BeHitDirect.Normalize()))) {
          this.Hte.ActorForwardProxy.Multiply(-1, this.BeHitDirect);
        }
        this.jVr();
      } else {
        this.rVr = undefined;
      }
    }
  }
  vJl(t) {
    if (this.Hte.CreatureData.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Monster && !this.rJo.IsInFightState()) {
      this.tVr.CollectSampleAndSend(true);
      i = this.Hte.CreatureData.GetPbDataId();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 50, "怪物受击，主动同步位置", ["PbDataId", i]);
      }
    }
    var i = this.iVr.GetComponent(0).GetCreatureDataId();
    var e = this.rVr?.HitEffect !== undefined;
    var e = !this.VVr() && e && !this.EnterFk;
    let s = undefined;
    const h = this.gVr;
    if (h) {
      s = this.oVr?.GetFightState() ?? 0;
    }
    this.HitRequest(t, i, this.rVr, this.BeHitAnim, this.EnterFk, this.sVr, this.cVr, this.mVr, e, s, t => {
      if (h) {
        this.oVr?.ConfirmState(h);
      }
    });
  }
  OnHit(t, i, e, s, h, r, a, o = false) {
    CharacterHitComponent_1.$Vr.Start();
    this.rVr = t;
    this.LastHitData = t;
    this.iVr = EntitySystem_1.EntitySystem.Get(t.Attacker.Id);
    this.aVr = e;
    this.hVr = h;
    this.lVr = r;
    this._Vr = a;
    this.IVr = s;
    this.fVr = false;
    this.ehl = false;
    this.sVr = o;
    this.oY1 = t.ShouldOptimize && !!this.rY1?.IsInCooling();
    CharacterHitComponent_1.sY1.Start();
    this.JVr();
    this.zVr(i);
    if (this.IsTriggerCounterAttack) {
      this.fSu = true;
      this.ZVr();
    } else {
      this.eth = this.tth(i);
    }
    CharacterHitComponent_1.sY1.Stop();
    CharacterHitComponent_1.aY1.Start();
    this.t6r();
    CharacterHitComponent_1.aY1.Stop();
    CharacterHitComponent_1.hY1.Start();
    this.o6r(i);
    CharacterHitComponent_1.hY1.Stop();
    this.iwr(i);
    CharacterHitComponent_1.lY1.Start();
    this.n6r();
    CharacterHitComponent_1.lY1.Stop();
    CharacterHitComponent_1._Y1.Start();
    this.a6r(i);
    if (!this.EnterFk) {
      this.gs1(t);
    }
    CharacterHitComponent_1._Y1.Stop();
    this.vJl(i);
    CharacterHitComponent_1.uY1.Start();
    this.wF_();
    CharacterHitComponent_1.uY1.Stop();
    CharacterHitComponent_1.cY1.Start();
    if (this.rVr) {
      this.BroadcastEvent(this.rVr);
    } else {
      CombatLog_1.CombatLog.Error("Hit", this.Entity, "HitData为空");
    }
    CharacterHitComponent_1.cY1.Stop();
    CharacterHitComponent_1.dY1.Start();
    this.ProcessOnHitMaterial();
    CharacterHitComponent_1.dY1.Stop();
    CharacterHitComponent_1.$Vr.Stop();
    this.jVr();
  }
  jVr() {
    this.rVr = undefined;
    this.iVr = undefined;
    this.lVr = undefined;
    this._Vr = undefined;
    this.IVr = false;
    this.gVr = 0;
  }
  ActiveStiff(t) {
    if (t !== 0 && (this.TVr && TimerSystem_1.TimerSystem.Has(this.TVr) && (TimerSystem_1.TimerSystem.Remove(this.TVr), this.TVr = undefined), this.URe(-2044964178), t > 0)) {
      this.TVr = TimerSystem_1.TimerSystem.Delay(this.XAl, t * BattleUiDefine_1.SECOND_TO_MILLISECOND);
    }
  }
  DeActiveStiff(t = 0) {
    if (this.TVr && TimerSystem_1.TimerSystem.Has(this.TVr)) {
      TimerSystem_1.TimerSystem.Remove(this.TVr);
      this.TVr = undefined;
    }
    this.ARe(-2044964178);
  }
  IsStiff() {
    return this.OVr(-2044964178);
  }
  JVr() {
    this.BeHitBones.length = 0;
    if (this.rVr.HitPart && !FNameUtil_1.FNameUtil.IsNothing(this.rVr.HitPart)) {
      this.BeHitBones.push(this.rVr.HitPart);
    }
    if (this.BeHitBones && this.BeHitBones?.length > 0) {
      this.BeHitSocketName = this.BeHitBones[0];
    } else {
      this.BeHitSocketName = FNameUtil_1.FNameUtil.EMPTY;
    }
  }
  zVr(t) {
    var i;
    if (this.c6r(t)) {
      this.cVr = 2;
    } else if (this.rVr.HitEffect) {
      if (this.u6r(t) && (this.cVr = 1, Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Battle", 20, "拼刀判断 初步判断成功", ["子弹ID", t.GetBulletInfo().BulletRowName]);
      }
      i = this.IsTriggerCounterAttack ? 7 : this.rVr.HitEffect.被击动作;
      i = this.y6r(i);
      if (this.oVr && !this.oVr.CheckSwitchHitState(i, true)) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 20, "切到弹刀状态失败, 弹刀状态为4, 弹刀状态必须大于CurrentState", ["HitAnim", i], ["CurrentState", this.oVr.CurrentState], ["Bullet", this.rVr.BulletId]);
        }
        this.cVr = 0;
      }
    } else {
      this.cVr = 0;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 20, "弹刀判断 无被击效果", ["子弹ID", t.GetBulletInfo().BulletRowName]);
      }
    }
  }
  u6r(t) {
    var i = t.Data.Logic;
    if (!i.CanCounterAttack) {
      return false;
    }
    if (!this.OVr(1124064628)) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 20, "CheckNormalCounterAttack无Tag");
      }
      return false;
    }
    if (this.CounterAttackInfoInternal.QTE弹刀忽略角度距离检测) {
      t = t.GetBulletInfo();
      t = this.iVr.GetComponent(40).GetSkillInfo(t.BulletInitParams.SkillId);
      if (t && t.SkillGenre === 4) {
        return true;
      }
    }
    if (i.CounterAttackIgnoreAngle && i.CounterAttackIgnoreDist) {
      if (BulletConstant_1.BulletConstant.OpenHitActorLog && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Test", 20, "检查弹反 不需要检查角度和距离", ["Actor", this.Hte.Actor.GetName()]);
      }
      return true;
    }
    var e = this.rVr.HitPart;
    var s = this.CounterAttackInfoInternal.弹反部位;
    var h = s.Num();
    let r = false;
    if (e.op_Equality(FNameUtil_1.FNameUtil.NONE) && h > 0) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 20, "检查弹反 击中部位");
      }
      return false;
    }
    if (BulletConstant_1.BulletConstant.OpenHitActorLog && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Test", 20, "检查弹反 击中部位", ["部位", e.toString()]);
    }
    for (let t = 0; t < h; t++) {
      var a = s.Get(t);
      if (BulletConstant_1.BulletConstant.OpenHitActorLog && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Test", 20, "检查弹反 配置部位", ["部位", a.toString()]);
      }
      if (a.op_Equality(e)) {
        r = true;
        break;
      }
    }
    if (!r && h > 0) {
      return false;
    }
    this.xVr.FromUeVector(this.iVr.GetComponent(3).ActorLocationProxy);
    if (r) {
      t = this.Hte.GetBoneLocation(e.toString());
      this.wVr.FromUeVector(t);
      if (DEBUG) {
        UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.GameInstance, t, 10, undefined, ColorUtils_1.ColorUtils.LinearGreen, 4);
      }
      this.xVr.SubtractionEqual(this.wVr);
    } else {
      this.xVr.SubtractionEqual(this.Hte.ActorLocationProxy);
    }
    var i = this.xVr.Size();
    this.xVr.Normalize(MathCommon_1.MathCommon.KindaSmallNumber);
    var t = Vector_1.Vector.DotProduct(this.Hte.ActorForwardProxy, this.xVr);
    var o = Math.cos(this.CounterAttackInfoInternal.最大触发夹角 * MathUtils_1.MathUtils.DegToRad);
    var n = this.CounterAttackInfoInternal.最大触发距离;
    if (BulletConstant_1.BulletConstant.OpenHitActorLog && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Test", 20, "检查弹反 最大距离和最大触发夹角", ["当前距离", i], ["最大触发距离", n], ["夹角cos值", t], ["最大触发夹角cos值", o]);
    }
    return i < n && o < t;
  }
  c6r(t) {
    return !!t.Data.Logic.CanVisionCounterAttack && !!this.OVr(-1576849243);
  }
  tth(t) {
    return !!this.rVr.HitEffect && !!this.Hte.CreatureData.IsMonster() && !!t?.Data.Logic.CanBreakWindupAttack && !!this.OVr(-1793427578);
  }
  iwr(s) {
    if (!this.oY1) {
      var t = this.rVr.ReBulletData;
      const _ = t.TimeScale;
      let i = this.sVr ? _.AttackerTimeScaleOnHitWeakPoint : _.TimeScaleOnAttack;
      let e = i.时间膨胀时长;
      var h = this.iVr?.GetComponent(122)?.GetTopForeverTimeScale(1);
      if (h && h > 0) {
        e /= h;
      }
      if (_.TimeScaleOnAttackIgnoreAttacker) {
        if (e > 0) {
          BulletUtil_1.BulletUtil.SetTimeScale(s.GetBulletInfo(), i.优先级, i.时间膨胀值, i.时间膨胀变化曲线, e, 1);
        }
      } else if (e > 0) {
        if (t.Logic.Type === 2 && this.xoa?.替换近战子弹顿帧) {
          i = this.xoa.顿帧;
        }
        this.iVr.GetComponent(122).SetTimeScale(i.优先级, i.时间膨胀值, i.时间膨胀变化曲线, e, 1);
        var r = _.CharacterCustomKeyTimeScale;
        var a = r?.length ?? 0;
        for (let t = 0; t < a; t++) {
          var o = r[t];
          var n = ModelManager_1.ModelManager.BulletModel.GetEntityIdByCustomKey(this.iVr.Id, o, this.rVr.BulletId.toString());
          var n = ModelManager_1.ModelManager.CharacterModel.GetHandle(n);
          if (n?.Valid) {
            n.Entity.GetComponent(122)?.SetTimeScale(i.优先级, i.时间膨胀值, i.时间膨胀变化曲线, e, 1);
          } else if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Character", 20, "", ["自定义连携顿帧单位key", o], ["子弹ID", this.rVr.BulletId]);
          }
        }
      }
      if (this.vHr && !t.Base.ContinuesCollision && !this.OVr(-648310348)) {
        const _ = this.rVr.ReBulletData.TimeScale;
        s = this.sVr ? _.VictimTimeScaleOnHitWeakPoint : _.TimeScaleOnHit;
        let t = s.时间膨胀时长;
        if (h && h > 0) {
          t /= h;
        }
        BulletUtil_1.BulletUtil.SetVictimTimeScale(this.rVr.BulletEntityId, this.Entity.Id, this.vHr, s.优先级, s.时间膨胀值, s.时间膨胀变化曲线, t, 2, _.RemoveHitTimeScaleOnDestroy);
      }
    }
  }
  gs1(t) {
    var i;
    if (ModelManager_1.ModelManager.CharacterModel?.EnabledSelfCentered && (i = t.Attacker?.GetComponent(285)) && !MathUtils_1.MathUtils.IsNearlyEqual(i.SelfCenterTimeDilation, 1)) {
      this.Entity.GetComponent(285)?.SetBeHitTimeDilation(i.SelfCenterTimeDilation, t.ReBulletData.TimeScale.TimeScaleEffectImmune * BattleUiDefine_1.SECOND_TO_MILLISECOND);
    }
  }
  iHo() {
    if (this.Hte && this.rVr) {
      var e = this.rVr.ReBulletData;
      if (e) {
        let t = true;
        let i = undefined;
        if (this.Hte.IsPartHit) {
          t = e.Base.EnablePartHitAudio;
          if (!FNameUtil_1.FNameUtil.IsNothing(this.rVr.HitPart)) {
            i = this.rVr.HitPart?.toString();
          }
        }
        return BulletCollisionUtil_1.BulletCollisionUtil.GetHitEffects(this.Hte, e.Render, this.sVr, i, this.rVr.DamageId > 0, t, this, this.SVr, this.iVr);
      }
    }
  }
  WVr() {
    var t = this.iHo();
    if (t && t.size > 0) {
      var i = this.rVr.ReBulletData.Render;
      var s = i.EffectOnHitConf.get(0);
      var h = this.rVr.HitPosition;
      var s = s ? s.Scale : Vector_1.Vector.OneVectorProxy;
      this.oHo.Set(h, this.rVr.HitEffectRotation.Quaternion(), s);
      CharacterHitComponent_1.rHo.Start();
      var h = this.rVr.Attacker?.GetComponent(51);
      let e = 2;
      if ((0, RegisterComponent_1.isComponentInstance)(h, 189)) {
        e = h.CurrentPriority;
      }
      var r = BulletStaticFunction_1.HitStaticFunction.CreateEffectContext(this.rVr.Attacker, true);
      const c = i.AudioOnHit;
      var a;
      var o;
      var n = (t, i) => {
        BulletStaticFunction_1.HitStaticFunction.PlayHitAudio(t, i, c, e);
      };
      var _ = ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation;
      for ([a, o] of t) {
        var l = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, this.oHo.ToUeTransform(), a, "[CharacterHitComponent.ProcessHitEffect]", r, undefined, undefined, o === 1 ? n : undefined);
        EffectSystem_1.EffectSystem.SetAdditionTimeScale(14, l, _);
      }
      CharacterHitComponent_1.rHo.Stop();
    }
  }
  o6r(t) {
    this.d6r();
    var i = this.C6r(this.rVr);
    var t = t?.GetBulletInfo();
    var e = t?.BulletDataMain?.Base.MultiDamageId;
    var s = e?.length ?? 0;
    if (s > 0 && t.CollisionInfo.IntervalMs <= 0) {
      for (let t = 0; t < s; t++) {
        i.DamageId = e[t];
        this.cz_(i);
      }
    } else {
      this.cz_(i);
    }
  }
  cz_(t) {
    if (this.hVr && this.hVr.length > 0) {
      this.g6r(this.hVr, t);
    } else {
      this.f6r(this.lVr, t);
      if (this.IVr) {
        this.p6r(this._Vr, t);
      }
    }
  }
  g6r(t, i) {
    let e = false;
    for (const r of t) {
      e ||= r.IsTransferDamage;
    }
    for (const a of t) {
      var s = !a.SeparateDamage || !e;
      var h = this.v6r(i, false, s, a.Index);
      if (!s) {
        this.ToughDecreaseValue = h;
      }
    }
    if (e) {
      t = this.v6r(i, false, !e, t[0].Index);
      this.ToughDecreaseValue = t;
    }
  }
  f6r(t, i) {
    if (t) {
      for (const s of t) {
        var e = s.IsWeaknessHit;
        this.v6r(i, e, false, s.Index);
      }
    }
  }
  p6r(t, i) {
    if (t && t.length > 0) {
      t = t[0];
      t = this.v6r(i, this.sVr, false, t.Index);
      this.ToughDecreaseValue = t;
    } else {
      t = this.v6r(i, this.sVr, false);
      this.ToughDecreaseValue = t;
    }
  }
  v6r(t, i, e, s = -1, h = 1) {
    var r;
    var a;
    var o;
    var n = t.DamageId;
    var _ = t.Target;
    if (!(n < 1) && _ && (r = t.Target.GetComponent(20), o = t.DirectTarget.GetComponent(40), r) && o) {
      a = EntitySystem_1.EntitySystem.Get(t.BulletEntityId)?.GetBulletInfo().ContextId;
      o = o.CurrentSkill;
      return r?.ExecuteBulletDamage(t.BulletEntityId, {
        DamageDataId: n,
        SkillLevel: t.SkillLevel,
        Attacker: t.Attacker,
        DirectTarget: t.DirectTarget ?? _,
        HitPosition: t.HitPosition.ToUeVector(),
        IsAddEnergy: this.aVr,
        IsCounterAttack: this.IsTriggerCounterAttack,
        ForceCritical: i,
        IsBlocked: e,
        PartId: s,
        ExtraRate: h,
        CounterSkillMessageId: this.IsTriggerCounterAttack ? o?.MNc : undefined,
        BulletId: t.BulletId,
        CounterSkillId: this.IsTriggerCounterAttack ? Number(o?.SkillId) : undefined
      }, a);
    } else {
      return 0;
    }
  }
  C6r(t) {
    var t = Object.assign(t);
    var i = this.iVr.GetComponent(56)?.GetAttributeHolder();
    if (i) {
      t.Attacker = i;
    }
    t.Target = this.Entity.GetComponent(56)?.GetAttributeHolderExceptVisionSummon() ?? this.Entity;
    return t;
  }
  n6r() {
    if (!this.oY1 && !CameraController_1.CameraController.Model.IsModeEnabled(2) && !CameraController_1.CameraController.Model.IsModeEnabled(1) && this.rVr.IsShaking) {
      var i = this.rVr.ReBulletData.Render;
      let t = this.sVr ? i.AttackerCameraShakeOnHitWeakPoint : i.AttackerCameraShakeOnHit;
      var e;
      var i = i.VictimCameraShakeOnHit;
      if (t.length > 0) {
        if (this.xoa && (e = this.xoa.震屏.ToAssetPathName()).length > 0) {
          t = e;
        }
        ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Class, t => {
          var i = Global_1.Global.CharacterCameraManager.D_GetCameraLocation();
          CameraController_1.CameraController.PlayWorldCameraShake(t, i, 0, exports.OUTER_RADIUS, 1, false);
        });
      } else if (i.length > 0) {
        ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.Class, t => {
          var i = Global_1.Global.CharacterCameraManager.D_GetCameraLocation();
          CameraController_1.CameraController.PlayWorldCameraShake(t, i, 0, exports.OUTER_RADIUS, 1, false);
        });
      }
    }
  }
  HVr(t) {
    if (!!t && !(t.GetBulletInfo().CollisionInfo.DamageId <= 0)) {
      this.EnterFk = true;
      t = t.GetBulletInfo();
      BulletUtil_1.BulletUtil.GetHitRotator(t, this.Hte, this.Gue);
      this.Gue.Quaternion(this.az);
      this.az.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.BeHitDirect);
      this.BeHitDirect.MultiplyEqual(-1);
      this.M6r(0);
    }
  }
  a6r(i) {
    if (this.IsTriggerCounterAttack) {
      CharacterHitComponent_1.E6r.Start();
      this.KVr(this.rVr);
      CharacterHitComponent_1.E6r.Stop();
    } else if (this.oY1) {
      return;
    }
    if (this.kVr(forbidHitTagIds)) {
      if (this.kVr(enterFkForbidHitTagIds)) {
        this.HVr(i);
      }
    } else {
      var e = i.GetBulletInfo();
      var s = this.rVr.HitEffect;
      if (s) {
        this.BeHitTime = UE.GameplayStatics.GetTimeSeconds(this.Hte.Actor);
        var h = this.EVr?.GetCurrentValue(EAttributeId.Proto_Tough) ?? 0;
        this.BeHitLocation.DeepCopy(this.rVr.HitPosition);
        this.NeedCalculateFallInjure = true;
        var h = h > 0 || this.ToughDecreaseValue <= 0 || this.OVr(1447214865);
        var r = this.IsTriggerCounterAttack && this.fVr;
        if (h && !r) {
          this.HVr(i);
          this.cMc();
        } else {
          this.cBe?.LogEndSkillReason(i, h, r);
          CharacterHitComponent_1.S6r.Start();
          let t = 0;
          if (s) {
            t = this.eth || this.fVr ? 7 : s.被击动作;
          }
          t = this.y6r(t);
          if (this.oVr && !this.oVr.CheckSwitchHitState(t, true)) {
            this.HVr(i);
            CharacterHitComponent_1.S6r.Stop();
            this.cMc();
          } else {
            CombatLog_1.CombatLog.Info("Hit", this.Entity, "受击", ["BeHitAnim", t]);
            this.ehl = true;
            this.gVr = this.oVr?.SwitchHitState(t, true) ?? 0;
            this.cMc();
            RoleAudioController_1.RoleAudioController.OnPlayerIsHit(this.Entity);
            if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
              this.Hte.SetMoveControlled(true, 2, "受击");
            }
            this.BeHitAnim = t;
            this.EnterFk = false;
            if (this.VVr()) {
              BulletUtil_1.BulletUtil.GetHitRotator(e, this.Hte, this.Gue);
              this.mVr = this.Gue.ToUeRotator();
            } else {
              this.mVr = BulletUtil_1.BulletUtil.SetHitRotator(e, this.Hte, s.受击朝向Z轴偏转);
            }
            this.I6r();
            CharacterHitComponent_1.S6r.Stop();
            CharacterHitComponent_1.T6r.Start();
            if (this.VVr()) {
              this.BeHitAnim = BulletUtil_1.BulletUtil.GetOverrideHitAnimByAngle(this.Hte, this.BeHitAnim, this.mVr.Yaw);
            }
            if (this.BeHitAnim !== 7) {
              this.L6r(s);
            }
            this.rY1?.UpdateLastHitTime();
            this.M6r(lightHits.has(this.BeHitAnim) ? 1 : 2);
            CharacterHitComponent_1.T6r.Stop();
          }
        }
      }
    }
  }
  ConfirmExecutedBeHitState() {
    this.LF_ = true;
  }
  wF_() {
    if (this.IsTriggerCounterAttack || !this.oY1) {
      let t = 0;
      var i;
      if ((t = this.cVr !== 2 || this.fVr ? t : this.VisionCounterAttackInfoInternal.对策事件ID) !== 0 || !!this.ehl) {
        if (i = this.Entity.GetComponent(76)) {
          this.LF_ = false;
          i.StateMachineGroup?.TickBeHitStateMachine(true, this.BeHitAnim, t);
          if (!this.LF_) {
            this.DeActiveStiff("未执行受击节点");
            this.Hte.ResetMoveControlled("未执行受击节点");
            this.oVr?.ResetState();
            BaseHitComponent_1.BaseHitComponent.HitEndRequest(this.Entity);
            CombatLog_1.CombatLog.Info("Hit", this.Entity, "执行受击动作失败，未执行受击节点");
          }
        } else {
          CombatLog_1.CombatLog.Error("Hit", this.Entity, "执行受击动作失败，该实体没有状态机组件");
        }
      }
    }
  }
  t6r() {
    if (this.OVr(1124064628)) {
      this.$zo.RemoveBuffByTag(1124064628, "撞墙或受击逻辑触发移除");
    }
  }
  BroadcastEvent(t) {
    let i = 0;
    if (this.cVr === 2 && !this.fVr) {
      i = this.VisionCounterAttackInfoInternal.对策事件ID;
      GlobalData_1.GlobalData.BpEventManager.当触发对策事件时.Broadcast(this.VisionCounterAttackInfoInternal.对策事件ID, t.ToUeHitInformation());
    }
    var e = EntitySystem_1.EntitySystem.Get(t.BulletEntityId).GetBulletInfo();
    var s = Number(e.BulletInitParams.SkillId);
    var h = e.BulletInitParams.SkillContextId;
    var r = this.iVr?.GetComponent(40);
    var h = {
      Attacker: this.iVr,
      Target: this.Entity,
      BulletId: t.BulletId,
      HasBeHitAnim: this.ehl,
      BeHitAnim: this.BeHitAnim,
      VisionCounterAttackId: i,
      CounterAttackType: this.cVr,
      SkillId: s,
      SkillHitCount: ModelManager_1.ModelManager.CombatMessageModel?.AddSkillHitCount(h),
      BulletHitCount: e.HitNumberAll,
      SkillGenre: r?.GetSkillInfo(s)?.SkillGenre ?? -1,
      BattleFlags: r?.GetSkill(s)?.BattleFlags ?? []
    };
    if (this.iVr && (SceneTeamController_1.SceneTeamController.EmitEvent(this.iVr, EventDefine_1.EEventName.CharHitLocal, t, h), e = this.iVr.GetComponent(0)) && (r = e.IsVision() ? this.iVr.GetComponent(56)?.GetAttributeHolder() ?? this.iVr : this.iVr)) {
      SceneTeamController_1.SceneTeamController.EmitEvent(r, EventDefine_1.EEventName.CharHitIncludingVision, t, h);
    }
    SceneTeamController_1.SceneTeamController.EmitEvent(this.Entity, EventDefine_1.EEventName.CharBeHitLocal, t, h);
    GlobalData_1.GlobalData.BpEventManager.当有角色受击时.Broadcast(this.Hte.Actor, t.ToUeHitInformation());
    this.Entity.GetComponent(76)?.Tick(0);
  }
  L6r(t) {
    if (this.OVr(504239013) && (i = this.Entity.GetComponent(3)).Valid) {
      i.Actor.KuroSetMovementMode({
        Mode: 3,
        Context: "[CharacterHitComponent.SwitchHitEffect]"
      });
    }
    this.FVr(true);
    this.Entity.GetComponent(175).ExitAimStatus();
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharBeHitAnim);
    if (this.OVr(-1732582420)) {
      var i = t.地面受击滞空;
      var e = i.滞空时间 + i.到滞空点时间;
      if (this.R6r(e)) {
        this.U6r(i, e);
      } else {
        this.A6r(t);
      }
    } else if (!this.OVr(-648310348)) {
      if (this.OVr(-1898186757)) {
        if (this.BeHitAnim === 4) {
          i = t.地面受击滞空;
          e = i.滞空时间 + i.到滞空点时间;
          if (this.R6r(e)) {
            this.U6r(i, e);
            return;
          }
          if (t.地面受击速度.Z > 0) {
            this.P6r(t, false);
            return;
          }
        }
        this.A6r(t);
      } else {
        i = t.空中受击滞空;
        e = i.滞空时间 + i.到滞空点时间;
        if (this.R6r(e)) {
          this.U6r(i, e);
        } else {
          this.P6r(t, true);
        }
      }
    }
  }
  U6r(t, i) {
    var e;
    var s;
    var h;
    var r;
    var a;
    var o = this.Entity.GetComponent(178);
    if (o.Valid) {
      e = this.Hte;
      s = WhirlpoolPoint_1.WhirlpoolPoint.GenId();
      this.BVr.FromUeVector(t.滞空相对位置);
      MathUtils_1.MathUtils.TransformPosition(e.ActorLocationProxy, e.ActorRotationProxy, e.ActorScaleProxy, this.BVr, this.bVr);
      h = this.iVr.GetComponent(3);
      r = t.滞空高度限制;
      if (o.IsStandardGravity) {
        if ((a = h.ActorLocationProxy.Z + r) < this.bVr.Z) {
          this.bVr.Z = a;
        }
      } else {
        this.bVr.Subtraction(h.ActorLocationProxy, this.Ml1);
        if (r < (a = this.Ml1.DotProduct(o.GravityUp))) {
          o.GravityUp.Multiply(a - r, this.Ml1);
          this.bVr.SubtractionEqual(this.Ml1);
        }
      }
      o.BeginWhirlpool(s, t.到滞空点时间, this.bVr, e.ActorLocationProxy, i, t.到滞空点曲线);
    }
  }
  R6r(t) {
    return t > 0;
  }
  QVr(t) {
    this.FVr(true);
    this.Entity.GetComponent(175).ExitAimStatus();
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharBeHitAnim);
    if (this.BeHitAnim === 4) {
      this.P6r(t, false);
    } else {
      this.A6r(t);
    }
  }
  ActivateHitStateByHitAnim() {
    switch (this.BeHitAnim) {
      case 0:
      case 1:
      case 8:
      case 9:
        this.Entity.GetComponent(175).SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.SoftKnock);
        break;
      case 2:
      case 3:
      case 10:
      case 11:
      case 6:
        this.Entity.GetComponent(175).SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.HeavyKnock);
        break;
      case 4:
        this.Entity.GetComponent(175).SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.KnockUp);
        break;
      case 5:
        this.Entity.GetComponent(175).SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.KnockDown);
        break;
      case 7:
        this.Entity.GetComponent(175).SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Parry);
    }
  }
  P6r(t, i) {
    this.ActiveStiff(-1);
    var e;
    var s = this.Entity.GetComponent(178);
    if (s.Valid) {
      e = this.Hte;
      this.BVr.FromUeVector(i ? t.空中受击速度 : t.地面受击速度);
      i = this.EVr?.GetCurrentValue(EAttributeId.Proto_Mass) ?? MASS_RATE;
      this.BVr.MultiplyEqual(MASS_RATE / i);
      if (s.GetWhirlpoolEnable()) {
        s.EndWhirlpool();
      }
      if (s.CharacterMovement.MovementMode !== 3) {
        e.Actor.KuroSetMovementMode({
          Mode: 3,
          Context: "[CharacterHitComponent.AirHit]"
        });
      }
      e.ActorQuatProxy.RotateVector(this.BVr, this.bVr);
      if (s.Active) {
        s.SetForceFallingSpeed(this.bVr, 31862857);
      }
      e = (i = t.空中受击移动时间) > 0 ? i : t.地面受击移动时间;
      s.SetGravityScale(t.上升标量, t.下落标量, t.弧顶标量, t.速度阈值, e);
      if (t.落地反弹.Z > 0) {
        this.DoubleHitInAirEffect.FromUeHitEffect(t);
      } else {
        this.DoubleHitInAirEffect.Finish();
      }
    }
  }
  A6r(t) {
    var i;
    var e = new UE.VectorDouble(t.地面受击速度.X, t.地面受击速度.Y, 0);
    var s = t.地面受击最小速度;
    var h = t.地面受击最大速度;
    var r = t.地面受击移动时间;
    var a = t.命中硬直时间;
    var t = t.地面受击移动曲线;
    if (r > 0 && (i = this.EVr?.GetCurrentValue(EAttributeId.Proto_Mass) ?? MASS_RATE, e = e.op_Multiply(MASS_RATE / i), (i = this.Entity.GetComponent(178)).Valid)) {
      if (i.GetWhirlpoolEnable()) {
        i.EndWhirlpool();
      }
      this.yVr = i.SetAddMove(e, r, undefined, this.yVr, t, s, h);
    }
    this.ActiveStiff(a);
  }
  y6r(t) {
    let i = undefined;
    var e;
    if (!this.BeHitMapping || this.BeHitMapping.ID <= 0) {
      i = t;
    } else if (t < (e = this.BeHitMapping.映射表).Num()) {
      i = e.Get(t);
    } else {
      i = t;
      CombatLog_1.CombatLog.Error("Hit", this.Entity, "HitOverride越界", ["hitAnim", t]);
    }
    return i;
  }
  ZVr() {
    RoleAudioController_1.RoleAudioController.PlayRoleAudio(this.iVr, 2005);
    var t = this.iVr.CheckGetComponent(174);
    switch (this.cVr) {
      case 1:
        if (this.CounterAttackInfoInternal.攻击者应用BuffID > 0 && SkillMessageController_1.SkillMessageController.CloseMonsterServerLogic) {
          t.AddBuff(Number(this.CounterAttackInfoInternal.攻击者应用BuffID), {
            InstigatorId: t.CreatureDataId,
            PreMessageId: this.Jtc,
            Reason: "拼刀攻击者应用Buff"
          });
        }
        if (this.CounterAttackInfoInternal.被弹反者应用BuffID > 0 && SkillMessageController_1.SkillMessageController.CloseMonsterServerLogic) {
          this.$zo?.AddBuff(Number(this.CounterAttackInfoInternal.被弹反者应用BuffID), {
            InstigatorId: this.$zo?.CreatureDataId,
            PreMessageId: this.Jtc,
            Reason: "拼刀受击者应用Buff"
          });
        }
        break;
      case 2:
        if (this.VisionCounterAttackInfoInternal.攻击者应用BuffID > 0 && SkillMessageController_1.SkillMessageController.CloseMonsterServerLogic) {
          t.AddBuff(Number(this.VisionCounterAttackInfoInternal.攻击者应用BuffID), {
            InstigatorId: t.CreatureDataId,
            PreMessageId: this.Jtc,
            Reason: "对策攻击者应用Buff"
          });
        }
        if (this.VisionCounterAttackInfoInternal.被对策者应用BuffID > 0 && SkillMessageController_1.SkillMessageController.CloseMonsterServerLogic) {
          this.$zo?.AddBuff(Number(this.VisionCounterAttackInfoInternal.被对策者应用BuffID), {
            InstigatorId: this.$zo?.CreatureDataId,
            PreMessageId: this.Jtc,
            Reason: "对策受击者应用Buff"
          });
        }
    }
    t.AddBuff(CharacterBuffIds_1.buffId.CounterInvincibleCommon, {
      InstigatorId: t.CreatureDataId,
      PreMessageId: this.Jtc,
      Reason: "弹反攻击者无敌"
    });
  }
  KVr(t) {
    switch (this.cVr) {
      case 1:
        this.x6r(t);
        break;
      case 2:
        this.w6r(t);
    }
  }
  x6r(t) {
    let i = this.CounterAttackInfoInternal.无弹反动作效果;
    this.fVr = this.B6r();
    if (this.fVr) {
      i = this.CounterAttackInfoInternal.有弹反动作效果;
    }
    this.b6r(t, i);
    this.q6r(i);
    if (this.iVr.GetComponent(3).IsAutonomousProxy) {
      this.G6r(i);
    }
    this.N6r();
    t = this.CounterAttackInfoInternal?.结束事件Tag;
    if (t?.TagName !== StringUtils_1.NONE_STRING) {
      this.SVr?.AddTag(t?.TagId ?? 0);
    }
  }
  w6r(t) {
    this.fVr = !this.VisionCounterAttackInfoInternal.广播对策事件;
    var i = this.VisionCounterAttackInfoInternal.对策动作效果;
    this.b6r(t, i);
    this.q6r(i);
    if (this.iVr.GetComponent(3).IsAutonomousProxy && !this.OVr(1161958668)) {
      this.G6r(i);
    }
    this.N6r();
  }
  d6r() {
    if (!!this.$zo && this.cVr === 1 && !(this.$zo.HasBuffAuthority() && this.CounterAttackInfoInternal.ANS期间被弹反者生效的BuffID > 0 && SkillMessageController_1.SkillMessageController.CloseMonsterServerLogic && this.$zo.AddBuff(Number(this.CounterAttackInfoInternal.ANS期间被弹反者生效的BuffID), {
      InstigatorId: this.$zo.CreatureDataId,
      PreMessageId: this.Jtc,
      Reason: "弹反ANS附加的buff"
    }), this.CounterAttackInfoInternal.削韧倍率 <= 1)) {
      this.pVr = this.$zo.AddAttributeRateModifierLocal(EAttributeId.Proto_ToughReduce, this.CounterAttackInfoInternal.削韧倍率, "弹反修改韧性倍率");
    }
  }
  CounterAttackEnd() {
    if (this.pVr) {
      this.$zo?.RemoveBuffByHandle(this.pVr);
    }
    if (SkillMessageController_1.SkillMessageController.CloseMonsterServerLogic) {
      this.$zo?.RemoveBuff(Number(this.CounterAttackInfoInternal.ANS期间被弹反者生效的BuffID), -1, "结束弹反ANS附加的buff");
    }
    this.ARe(1124064628);
    this.ARe(-1793427578);
    this.CounterAttackInfoInternal = undefined;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 20, "CounterAttackEnd", ["CounterAttackType", this.cVr]);
    }
    this.cVr = 0;
    this.fSu = false;
  }
  VisionCounterAttackEnd() {
    this.ARe(-1576849243);
  }
  WindupAttackEnd() {
    this.ARe(-1793427578);
    this.eth = false;
    if (this.$zo) {
      var i = this.WindupAttackInfoInternal?.Buff;
      var e = i?.Num() ?? 0;
      for (let t = 0; t < e; t++) {
        var s = i.Get(t);
        if (s > 0) {
          this.$zo.RemoveBuff(Number(s), -1, "结束前摇ANS的buff");
        }
      }
    }
  }
  B6r() {
    if (!this.CounterAttackInfoInternal.受击动画忽略Buff检测 && this.$zo) {
      var i = this.CounterAttackInfoInternal.检测Buff列表;
      for (let t = 0; t < i.Num(); t++) {
        var e = i.Get(t);
        var s = this.$zo.GetBuffTotalStackById(Number(e.BuffID), false);
        if (e.层数 > s) {
          return false;
        }
      }
    }
    return true;
  }
  SetCounterAttackEndTime(t) {
    var i = this.Entity.GetComponent(177).MainAnimInstance;
    if (i) {
      this.vVr = t + i.Montage_GetPosition(i.GetCurrentActiveMontage());
    }
  }
  OnReboundSuccess(t, i, e) {
    var e = BulletStaticFunction_1.HitStaticFunction.CreateEffectContext(this.Entity, e);
    var i = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, i, t.ToAssetPathName(), "[CharacterHitComponent.OnReboundSuccess]", e);
    if (i && EffectSystem_1.EffectSystem.IsValid(i)) {
      if (t = this.vHr) {
        e = t.FreezeTimeScale;
        EffectSystem_1.EffectSystem.SetTimeScale(i, e * this.TimeDilation, true);
        EffectSystem_1.EffectSystem.SetAdditionTimeScale(14, i, ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation);
      }
      this.MVr.push(i);
    }
  }
  b6r(t, i) {
    var e = i.特效DA;
    if (e.AssetPathName) {
      this.PlayCounterAttackEffect(t, e.AssetPathName?.toString(), new UE.VectorDouble(i.特效Scale));
    }
  }
  PlayCounterAttackEffect(t, i, e) {
    var s;
    if (i && (e = new UE.TransformDouble(t.HitEffectRotation.ToUeRotator(), t.HitPosition.ToUeVector(), e), s = ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(t.BulletEntityId), t = BulletStaticFunction_1.HitStaticFunction.CreateEffectContext(t.Attacker, s?.GetBulletInfo().EffectInfo.DisablePostProcess ?? false), s = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, e, i, "[CharacterHitComponent.BeCounterattack]", t), EffectSystem_1.EffectSystem.IsValid(s))) {
      if (e = this.vHr) {
        i = e.FreezeTimeScale;
        EffectSystem_1.EffectSystem.SetTimeScale(s, i * this.TimeDilation, true);
        EffectSystem_1.EffectSystem.SetAdditionTimeScale(14, s, ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation);
      }
      this.MVr.push(s);
    }
  }
  q6r(t) {
    var i = t.被击者顿帧;
    this.vHr?.SetTimeScale(i.优先级, i.时间膨胀值, i.时间膨胀变化曲线, i.时间膨胀时长, 4);
    i = t.攻击者顿帧;
    this.iVr.GetComponent(122).SetTimeScale(i.优先级, i.时间膨胀值, i.时间膨胀变化曲线, i.时间膨胀时长, 3);
  }
  G6r(t) {
    var i;
    if (!CameraController_1.CameraController.Model.IsModeEnabled(2) && !CameraController_1.CameraController.Model.IsModeEnabled(1)) {
      i = ModelManager_1.ModelManager.CameraModel.FightCamera.GetComponent(4).CameraActor.D_K2_GetActorLocation();
      CameraController_1.CameraController.PlayWorldCameraShake(t.震屏, i, 0, exports.OUTER_RADIUS, 1, false);
    }
    CameraController_1.CameraController.FightCamera.LogicComponent.ApplyCameraModify(t.摄像机设置.Tag, t.摄像机设置.持续时间, t.摄像机设置.淡入时间, t.摄像机设置.淡出时间, t.摄像机设置.摄像机配置, undefined, t.摄像机设置.打断淡出时间, undefined, undefined, undefined, t.摄像机设置.CameraAttachSocket);
  }
  N6r() {
    var t;
    if (!this.kVr(forbidHitTagIds)) {
      if ((t = this.Entity.GetComponent(177)).Valid) {
        t.MontageSetPosition(this.vVr);
      }
    }
  }
  get IsTriggerCounterAttack() {
    return this.cVr !== 0;
  }
  cMc() {
    var t;
    var i;
    if (this.IsTriggerCounterAttack) {
      i = this.iVr.GetComponent(0).GetCreatureDataId();
      (t = Protocol_1.Aki.Protocol.Fpc.create()).s5n = i;
      if (this.gVr) {
        t.mVn = this.oVr?.GetFightState() ?? 0;
      }
      t.qpc = this.cVr;
      t.Gpc = this.BFa;
      (i = Protocol_1.Aki.Protocol.Opc.create()).Fpc = t;
      CombatMessage_1.CombatNet.Send(19223, this.Entity, i);
    }
  }
  I6r() {
    var t;
    if (this.Entity.GetComponent(16) && (t = this.rVr.ReBulletData.TimeScale.TimeScaleEffectImmune * CommonDefine_1.MILLIONSECOND_PER_SECOND) >= TimerSystem_1.MIN_TIME) {
      this.AddImmuneTimeScaleEffectTimer(t);
    }
  }
  AddImmuneTimeScaleEffectTimer(t) {
    const i = t => {
      for (const e of this.$zo.BuffEffectManager.FilterById(17)) {
        if (t) {
          e.StartTimeScaleEffect();
        } else {
          e.StopTimeScaleEffect();
        }
      }
      var i = this.vHr;
      if (t) {
        i.ResumePauseLock();
      } else {
        i.ImmunePauseLock();
      }
    };
    if (!this.Abr()) {
      i(false);
    }
    this.Rbr = TimerSystem_1.TimerSystem.Delay(() => {
      this.Rbr = undefined;
      i(true);
    }, t);
  }
  Abr() {
    return !!TimerSystem_1.TimerSystem.Has(this.Rbr) && !(TimerSystem_1.TimerSystem.Remove(this.Rbr), this.Rbr = undefined);
  }
  IsImmuneTimeScaleEffect() {
    return TimerSystem_1.TimerSystem.Has(this.Rbr);
  }
  M6r(t) {
    if (this.Entity === Global_1.Global.BaseCharacter?.GetEntityNoBlueprint()) {
      GamepadController_1.GamepadController.PlayForceFeedbackByHit(t);
    }
  }
  GetAttackerEntity() {
    return this.iVr;
  }
  lXs() {
    if (this.Hte?.CreatureData.IsRealMonster() && this.Hte.Actor.CharRenderingComponent) {
      this.hXs = new BaseHitComponent_1.OnHitMaterialAction(this.Hte.Actor.CharRenderingComponent, this.vHr);
    }
  }
  ProcessOnHitMaterial() {
    if (!this.oY1 && ModelManager_1.ModelManager.BulletModel.OpenHitMaterial && this.hXs) {
      var e = this.rVr.ReBulletData.Render.OnHitMaterialEffect;
      if (!StringUtils_1.StringUtils.IsNothing(e)) {
        var s = this.rVr.BulletEntityId;
        var h = this.iVr.Id;
        if (this.hXs.ComparePriority(s, h)) {
          this.hXs.Stop(true);
          let t = undefined;
          var r = this.rVr.HitPart;
          if (r && !FNameUtil_1.FNameUtil.IsNothing(r) && (r = r.toString(), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Character", 20, "OnHitMaterialAction 命中部位", ["Part", r]), r = this.Hte.GetPartConf(r)?.MaterialEffect) && UE.KismetSystemLibrary.IsValidSoftObjectReference(r)) {
            t = r.ToAssetPathName();
          }
          let i = undefined;
          r = this.iVr?.GetComponent(3);
          if (r) {
            i = r?.GetReplaceEffect(e);
          }
          this.hXs.Start(i || e, ModelManager_1.ModelManager.BulletModel.OnHitMaterialMsDelay, s, h, t);
        }
      }
    }
  }
  ReplaceHitEffect(t) {
    if (this.xoa) {
      CombatLog_1.CombatLog.Error("Hit", this.Entity, "已存在替换受击特效, 新的替换不会生效");
      return false;
    } else {
      this.xoa = t;
      return !(this.Uha = undefined);
    }
  }
  RemoveHitEffectReplaced() {
    this.xoa = undefined;
    this.Uha = undefined;
  }
  GetHitEffectReplaced() {
    return this.xoa;
  }
  GetHitEffectReplacedIgnoreBones() {
    if (this.xoa) {
      if (!this.Uha) {
        this.Uha = new Set();
        var i = this.xoa.不替换的部位;
        var e = i.Num();
        for (let t = 0; t < e; t++) {
          var s = i.Get(t);
          if (!FNameUtil_1.FNameUtil.IsNothing(s)) {
            this.Uha.add(s.toString());
          }
        }
      }
      return this.Uha;
    }
  }
};
CharacterHitComponent.GVr = undefined;
CharacterHitComponent.$Vr = Stats_1.Stat.Create("OnHit");
CharacterHitComponent.sY1 = Stats_1.Stat.Create("OnHit_CounterAttack");
CharacterHitComponent.aY1 = Stats_1.Stat.Create("OnHit_RemoveByTag");
CharacterHitComponent.hY1 = Stats_1.Stat.Create("OnHit_ProcessDamage");
CharacterHitComponent.lY1 = Stats_1.Stat.Create("OnHit_CameraEffect");
CharacterHitComponent._Y1 = Stats_1.Stat.Create("OnHit_ProcessMain");
CharacterHitComponent.cY1 = Stats_1.Stat.Create("OnHit_BroadcastEvent");
CharacterHitComponent.dY1 = Stats_1.Stat.Create("OnHit_OnHitMaterial");
CharacterHitComponent.uY1 = Stats_1.Stat.Create("OnHit_BeHitStateMachine");
CharacterHitComponent.rHo = Stats_1.Stat.Create("PlayHitEffect");
CharacterHitComponent.E6r = Stats_1.Stat.Create("ProcessMain1");
CharacterHitComponent.S6r = Stats_1.Stat.Create("ProcessMain2");
CharacterHitComponent.T6r = Stats_1.Stat.Create("ProcessMain3");
CharacterHitComponent.D91 = Vector_1.Vector.Create();
CharacterHitComponent.U91 = Vector_1.Vector.Create();
CharacterHitComponent = CharacterHitComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(61)], CharacterHitComponent);
exports.CharacterHitComponent = CharacterHitComponent; //# sourceMappingURL=CharacterHitComponent.js.map