"use strict";

var CharacterActionComponent_1;
var __decorate = this && this.__decorate || function (t, i, e, o) {
  var s;
  var h = arguments.length;
  var n = h < 3 ? i : o === null ? o = Object.getOwnPropertyDescriptor(i, e) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, i, e, o);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (s = t[r]) {
        n = (h < 3 ? s(n) : h > 3 ? s(i, e, n) : s(i, e)) || n;
      }
    }
  }
  if (h > 3 && n) {
    Object.defineProperty(i, e, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterActionComponent = exports.LEAVE_VEHICLE_BOUNCE_SKILL_ID = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../../../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const Quat_1 = require("../../../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const IAction_1 = require("../../../../../../UniverseEditor/Interface/IAction");
const CameraController_1 = require("../../../../../Camera/CameraController");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../../Global");
const InputController_1 = require("../../../../../Input/InputController");
const LevelGamePlayController_1 = require("../../../../../LevelGamePlay/LevelGamePlayController");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GravityUtils_1 = require("../../../../../Utils/GravityUtils");
const FOURTY_FIVE = 45;
const ZERO_EIGHT = 0.8;
const FIVETY = 50;
const ONE_HUNDRED_FOURTY = 140;
const TWO_HUNDRED_TWENTY = 220;
const COLLISION_RADIUS_IN = 15;
const COLLISION_RADIUS_OUT = 50;
const COLLISION_RESET_ANGLE = 91;
const DEFAULT_CATAPULT_TIME = 0.6;
const DEFAULT_CATAPULT_GRAVITY = 1960;
const CATAPULT_SKILL_ID = 400102;
const SUPER_CATAPULT_SKILL_ID = 400107;
const BOUNCE_SKILL_ID = 400104;
const FAITH_JUMP_SKILL_MALE = 1501103;
const FAITH_JUMP_SKILL_FEMALE = 1502103;
exports.LEAVE_VEHICLE_BOUNCE_SKILL_ID = 100035;
const MAX_ANIM_STATE_CHANGE_COUNT = 600;
let CharacterActionComponent = CharacterActionComponent_1 = class CharacterActionComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.mBe = undefined;
    this.Lie = undefined;
    this.Hte = undefined;
    this.Gce = undefined;
    this.cBe = undefined;
    this.OriginCapsuleHalfHeight = 0;
    this.OriginCapsuleRadius = 0;
    this.IsSitDownInternal = false;
    this.IsStandingUp = false;
    this.pk_ = undefined;
    this.vk_ = (t, i) => {
      this.Chair = undefined;
    };
    this.SitDownTypeIndex = 0;
    this.EnterSitDownIndex = 0;
    this.LeaveSitDownIndex = 0;
    this.IsUseCatapultUpAnim = false;
    this.l2r = undefined;
    this._2r = undefined;
    this.cz = Vector_1.Vector.Create();
    this.fz = Vector_1.Vector.Create();
    this.cie = Rotator_1.Rotator.Create();
    this.u2r = undefined;
    this.c2r = undefined;
    this.Cer = new Array();
    this.m2r = false;
    this.d2r = undefined;
    this.C2r = undefined;
    this.gU = false;
    this.Giant = undefined;
    this.g2r = false;
    this.f2r = Vector_1.Vector.Create();
    this.p2r = (t, i) => {
      if (!i) {
        this.LeaveSitDownAction();
      }
    };
    this.Sri = (t, i) => {
      if (i && this.IsSitDown) {
        this.PreLeaveSitDownAction("OnDisableTagChanged " + t);
      }
    };
    this.v2r = () => {
      if (this.IsSitDown) {
        this.PreLeaveSitDownAction("TeleportStart");
      }
    };
    this.M2r = t => {
      if (!!this.IsSitDown && t.PlotLevel !== "LevelD" && t.PlotLevel !== "Prompt" && !t.KeepMainRolePose) {
        this.PreLeaveSitDownAction("PlotNetworkStart");
      }
    };
    this.S2r = (t, i) => {
      let e = 0;
      if (this.Chair) {
        e = this.Chair.GetComponent(0)?.GetCreatureDataId() ?? 0;
      }
      var o = Protocol_1.Aki.Protocol.H3n.create();
      if (t && (o.rWn = t, o.rWn.length > MAX_ANIM_STATE_CHANGE_COUNT) && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Interaction", 19, "RequestSitDownAction同步数据过大", ["States", o.rWn]);
      }
      if (i) {
        o.oWn = i;
      }
      LevelGamePlayController_1.LevelGamePlayController.RequestChairSit(e, this.IsSitDown, o);
    };
    this.y2r = (t, i) => {
      if (!i) {
        this.Gce.JumpUpRate = 1;
      }
    };
  }
  get IsSitDown() {
    return this.IsSitDownInternal;
  }
  SetIsSitDown(t, i) {
    if (this.IsSitDownInternal !== t) {
      this.IsSitDownInternal = t;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Character", 36, "SetIsSitDown", ["isSitDown", t], ["reason", i]);
      }
      if (this.IsSitDownInternal) {
        this.Lie?.AddTag(-1697149502);
      } else {
        this.Lie?.RemoveTag(-1697149502);
      }
    }
  }
  get Chair() {
    return this.pk_;
  }
  set Chair(t) {
    if (this.pk_ !== t) {
      if (this.pk_ && EventSystem_1.EventSystem.HasWithTarget(this.pk_, EventDefine_1.EEventName.RemoveEntity, this.vk_)) {
        EventSystem_1.EventSystem.RemoveWithTarget(this.pk_, EventDefine_1.EEventName.RemoveEntity, this.vk_);
      }
      if (t && !EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.RemoveEntity, this.vk_)) {
        EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.RemoveEntity, this.vk_);
      }
      this.pk_ = t;
    }
  }
  static get Dependencies() {
    return [3, 175, 205];
  }
  OnStart() {
    this.Hte = this.Entity.CheckGetComponent(3);
    this.OriginCapsuleRadius = this.Hte.Radius;
    this.OriginCapsuleHalfHeight = this.Hte.HalfHeight;
    this.mBe = this.Entity.GetComponent(175);
    this.Gce = this.Entity.GetComponent(178);
    this.cBe = this.Entity.GetComponent(40);
    return !!this.mBe && (this.Lie = this.Entity.GetComponent(205), !!this.Lie) && (this.SetIsSitDown(false, "OnStart"), this.Chair = undefined, this.Giant = undefined, this.m2r = false, this.gU = false, this.c2r = this.Lie.ListenForTagAddOrRemove(-451106150, this.y2r), true);
  }
  OnActivate() {
    if (this.Hte.IsAutonomousProxy && !this.gU) {
      this.u2r = this.Lie.ListenForTagAddOrRemove(-2104691392, this.p2r);
      if (this.Lie?.Valid) {
        for (const t of CharacterActionComponent_1.I2r) {
          this.Cer.push(this.Lie.ListenForTagAddOrRemove(t, this.Sri));
        }
      }
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportStart, this.v2r);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkStart, this.M2r);
      this.gU = true;
    }
  }
  OnEnd() {
    if (this.gU) {
      if (this.IsSitDown) {
        this.PreLeaveSitDownAction("OnEnd");
      }
      this.u2r.EndTask();
      this.u2r = undefined;
      this.c2r.EndTask();
      this.c2r = undefined;
      for (const t of this.Cer) {
        t.EndTask();
      }
      this.Cer.length = 0;
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportStart, this.v2r);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkStart, this.M2r);
    }
    return true;
  }
  OnTick() {
    var t;
    var i;
    var e;
    if (this.Hte.IsAutonomousProxy && (this.IsSitDown && this.Lie.HasTag(30322312) && this.Gce.HasMoveInput && this.PreLeaveSitDownAction("HasMoveInput"), this.m2r && (e = this.Chair.GetComponent(202).ActorLocationProxy, t = this.Hte.ActorLocationProxy, i = this.Hte.ActorForwardProxy, t = Vector2D_1.Vector2D.Create(t.X - e.X, t.Y - e.Y).DotProduct(this.d2r), (e = Vector2D_1.Vector2D.Create(i.X, i.Y)).Normalize(), i = Math.acos(this.C2r.DotProduct(e)) * MathUtils_1.MathUtils.RadToDeg, t < COLLISION_RADIUS_IN || t > COLLISION_RADIUS_OUT && this.Gce.HasMoveInput || Math.abs(i) > COLLISION_RESET_ANGLE) && this.ResetCollision(), this.g2r) && this.Hte.ActorRotationProxy.Equals(this.Hte.InputRotatorProxy)) {
      this.g2r = false;
      this.Lie.AddTag(1190560501);
      e = this.Entity.GetComponent(62);
      InputController_1.InputController.AddInputHandler(e);
      CameraController_1.CameraController.SetInputEnable(Global_1.Global.BaseCharacter, true);
    }
  }
  HTe(t, i) {
    var e = t.Entity.GetComponent(0)?.GetPbDataId() ?? 0;
    var e = ModelManager_1.ModelManager.CreatureModel.GetOwnerEntity(e);
    let o = undefined;
    o = e && (e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e))?.Valid ? e.Entity.GetComponent(202) : t;
    var e = (0, puerts_1.$ref)(undefined);
    o.Owner.GetAttachedActors(e);
    var s = (0, puerts_1.$unref)(e);
    var h = s.Num();
    for (let t = 0; t < h; ++t) {
      var n = s.Get(t);
      var r = (0, puerts_1.$ref)(undefined);
      n.GetAttachedActors(r);
      var a = (0, puerts_1.$unref)(r);
      var _ = a.Num();
      for (let t = 0; t < _; ++t) {
        this.Hte.Actor.CapsuleComponent.IgnoreActorWhenMoving(a.Get(t), i);
      }
    }
  }
  ResetCollision() {
    var t;
    this.m2r = false;
    this.Hte.Actor.CapsuleComponent.SetCollisionResponseToChannel(2, 2);
    if (this.Chair) {
      if ((t = this.Chair.GetComponent(202)) && t.Entity) {
        this.HTe(t, false);
      }
      this.Chair = undefined;
    }
  }
  GetSitDownState() {
    return this.IsSitDown;
  }
  EnterSitDownAction(t, i) {
    return !this.Lie.HasAnyTag([-1446183172, -1371021686]) && !!t.GetComponent(202) && (this.m2r && this.Chair && this.ResetCollision(), this.cBe.StopAllSkills("CharacterActionComponent.EnterSitDownAction"), this.SitDownTypeIndex = i, this.EnterSitDownIndex = this.IsChairCanInteract(t) - 1, EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnBeforeCharActionWithTarget, 0), this.SetIsSitDown(true, "角色进入坐下动作"), this.m2r = false, this.Chair = t, this.T2r(), true);
  }
  T2r() {
    this.S2r(undefined, undefined);
  }
  OnResponseSit(t, i) {
    if (i !== 0) {
      this.SetIsSitDown(!t, "服务器返回错误");
    }
  }
  DoSitDownAction() {
    var t;
    var i;
    if (this.Chair) {
      this.cz.Reset();
      this.Gce.SetForceSpeed(this.cz);
      t = this.Chair.GetComponent(202);
      i = this.Chair.GetComponent(197);
      this.cz.DeepCopy(i.GetInteractPoint());
      this.cz.Z += this.OriginCapsuleHalfHeight;
      this.cie.DeepCopy(t.ActorRotationProxy);
      this.cie.Yaw += 90;
      this.Hte.SetInputRotator(this.cie);
      this.Hte.SetActorLocationAndRotation(this.cz.ToUeVector(), this.cie.ToUeRotator(), "角色坐下", false);
      CameraController_1.CameraController.FightCamera.GetComponent(5).ResetArmLocation(true, 0.5);
      this.FTe();
    }
  }
  FTe() {
    var t = this.Chair.GetComponent(202);
    if (t && t.Entity) {
      this.HTe(t, true);
    }
    this.Hte.Actor.CapsuleComponent.SetCollisionResponseToChannel(2, 0);
  }
  PreLeaveSitDownAction(t = "") {
    this.SetIsSitDown(false, t);
    this.IsStandingUp = true;
    this.L2r();
    this.S2r(undefined, undefined);
  }
  L2r() {
    var t;
    if (!this.Chair || this.Chair.IsEnd) {
      this.Chair = undefined;
    } else {
      this.Hte.Actor.KuroSetMovementMode({
        Mode: 1,
        Context: "[CharacterActionComponent.CalculateLeaveSitDownIndex]"
      });
      this.cz.DeepCopy(this.Hte.InputDirectProxy);
      this.cz.Normalize();
      t = this.Chair.GetComponent(197).GetInteractController().SectorRange;
      if (this.cz.DotProduct(this.Hte.ActorForwardProxy) > ZERO_EIGHT || !t) {
        this.LeaveSitDownIndex = 0;
      } else {
        this.cz.CrossProduct(this.Hte.ActorForwardProxy, this.fz);
        if (this.fz.Z >= 0) {
          if (t.Begin < -FOURTY_FIVE) {
            this.LeaveSitDownIndex = 1;
          } else {
            this.LeaveSitDownIndex = 0;
          }
        } else if (t.End > FOURTY_FIVE) {
          this.LeaveSitDownIndex = 2;
        } else {
          this.LeaveSitDownIndex = 0;
        }
      }
    }
  }
  LeaveSitDownAction() {
    this.IsStandingUp = false;
    if (this.Chair && this.Hte.IsAutonomousProxy) {
      this.m2r = true;
      this.CalculateChairDir();
    }
  }
  CalculateChairDir() {
    var t;
    var i;
    var e;
    if (this.Chair && this.Hte) {
      t = this.Chair.GetComponent(202).ActorLocationProxy;
      i = this.Hte.ActorLocationProxy;
      e = this.Hte.ActorForwardProxy;
      this.d2r = Vector2D_1.Vector2D.Create(i.X - t.X, i.Y - t.Y);
      this.d2r.Normalize();
      this.C2r = Vector2D_1.Vector2D.Create(e.X, e.Y);
      this.C2r.Normalize();
    }
  }
  IsChairCanInteract(t) {
    t = t.GetComponent(202);
    if (!t) {
      return 0;
    }
    this.Hte.ActorLocationProxy.Subtraction(t.ActorLocationProxy, this.cz);
    this.cz.Z = 0;
    this.cz.Normalize();
    var i = this.cz.DotProduct(t.ActorRightProxy);
    let e = Math.acos(i) * MathUtils_1.MathUtils.RadToDeg;
    this.cz.CrossProduct(t.ActorRightProxy, this.fz);
    if (this.fz.Z < 0) {
      e *= -1;
    }
    if (e >= -FIVETY && e <= FIVETY) {
      return 1;
    } else if (e >= FIVETY && e <= ONE_HUNDRED_FOURTY) {
      return 2;
    } else if (e >= -ONE_HUNDRED_FOURTY && e <= -FIVETY) {
      return 3;
    } else {
      if (e < 0) {
        e += MathUtils_1.PI_DEG_DOUBLE;
      }
      if (e >= ONE_HUNDRED_FOURTY && e <= TWO_HUNDRED_TWENTY) {
        return 4;
      } else {
        return 0;
      }
    }
  }
  StartCatapult(i, e) {
    if (i && e.Param) {
      var o = this.Entity.GetComponent(33);
      if (o) {
        var s = this.Entity.GetComponent(40);
        if (s) {
          var h = e.Type === IAction_1.ELeisureInteract.SuperCatapult;
          var n = h ? SUPER_CATAPULT_SKILL_ID : CATAPULT_SKILL_ID;
          if (s.BeginSkill(n, {
            Reason: "CharacterActionComponent.StartCatapult"
          })) {
            var r = i.GetComponent(1);
            let t = undefined;
            t = (r?.Valid ? r.Owner : i.GetComponent(0))?.D_GetTransform();
            var r = Vector_1.Vector.Create(t.GetLocation());
            var i = Quat_1.Quat.Create(t.GetRotation());
            var a = e.Param.Time ?? DEFAULT_CATAPULT_TIME;
            var _ = e.Param.Gravity ?? DEFAULT_CATAPULT_GRAVITY;
            CharacterActionComponent_1.Lz.FromConfigVector(e.Param.P1);
            i.RotateVector(CharacterActionComponent_1.Lz, CharacterActionComponent_1.Lz);
            CharacterActionComponent_1.Lz.AdditionEqual(r);
            CharacterActionComponent_1.Tz.FromConfigVector(e.Param.P2);
            i.RotateVector(CharacterActionComponent_1.Tz, CharacterActionComponent_1.Tz);
            CharacterActionComponent_1.Tz.AdditionEqual(r);
            o.SetConfig(a, r, CharacterActionComponent_1.Lz, CharacterActionComponent_1.Tz, undefined, _, undefined, h);
            var e = Vector_1.Vector.Create(CharacterActionComponent_1.Lz);
            e.SubtractionEqual(r);
            e.Normalize();
            var i = Vector_1.Vector.Create(0, 0, 1);
            var o = MathUtils_1.MathUtils.DotProduct(i, e);
            this.IsUseCatapultUpAnim = o > Math.cos(this.D2r() / 2 / 180 * Math.PI);
            this.f2r.DeepCopy(CharacterActionComponent_1.Tz);
            s.BeginSkill(n, {
              Reason: "CharacterActionComponent.StartCatapult"
            });
          }
        }
      }
    }
  }
  EndCatapult() {}
  async StartBounce(t) {
    var i;
    var e;
    var o = this.Entity.GetComponent(33);
    if (o && (i = this.Entity.GetComponent(40)) && (await i.BeginSkillAsync(BOUNCE_SKILL_ID, {
      Reason: "CharacterActionComponent.StartBounce"
    })) && this.Entity?.Valid) {
      e = (i = this.Entity.GetComponent(1)).ActorLocationProxy;
      CharacterActionComponent_1.Lz.DeepCopy(e);
      CharacterActionComponent_1.Lz.Z += t.Height;
      o.SetConfig(t.Time ?? 2, e, CharacterActionComponent_1.Lz, CharacterActionComponent_1.Lz, t.MotionCurve, 0, i.ActorRotationProxy);
      this.IsUseCatapultUpAnim = false;
    }
  }
  async StartBounceWithHorizontalOffset(t, i, e, o) {
    var s;
    var h;
    var n;
    var r = this.Entity.GetComponent(33);
    return !!r && !!(s = this.Entity.GetComponent(40)) && !!(await s.BeginSkillAsync(exports.LEAVE_VEHICLE_BOUNCE_SKILL_ID, {
      Reason: "CharacterActionComponent.StartBounce"
    })) && !!this.Entity?.Valid && !(h = (s = this.Entity.GetComponent(1)).ActorLocationProxy, n = GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.Hte, h), GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.Hte, i), CharacterActionComponent_1.Lz.DeepCopy(h), CharacterActionComponent_1.Lz.AdditionEqual(i), GravityUtils_1.GravityUtils.SetZnInGravityForActor(this.Hte, CharacterActionComponent_1.Lz, n + t), r.SetConfig(e || 2, h, CharacterActionComponent_1.Lz, CharacterActionComponent_1.Lz, o, 0, s.ActorRotationProxy), this.IsUseCatapultUpAnim = false);
  }
  EndBounce() {
    var t = this.Entity.GetComponent(40);
    if (!!t && ((t = t.CurrentSkill) === undefined || t.SkillId === BOUNCE_SKILL_ID)) {
      (t = this.Entity.GetComponent(178)).SetForceSpeed(Vector_1.Vector.ZeroVectorProxy);
      t.ActorComp?.Actor.KuroSetMovementMode({
        Mode: 3,
        Context: "[CharacterActionComponent.EndBounce]"
      });
    }
  }
  GetInteractionTargetLocation() {
    return this.f2r;
  }
  get ExecutionTrace() {
    if (!this._2r) {
      this._2r = UE.NewObject(UE.TraceLineElement.StaticClass());
      this._2r.WorldContextObject = this.Hte.Owner;
      this._2r.bIgnoreSelf = true;
      this._2r.bIsSingle = true;
      this._2r.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Visible);
      this._2r.SetDrawDebugTrace(0);
    }
    return this._2r;
  }
  PlayCustomCommonSkill(t) {
    if (this.cBe?.CheckIsLoaded()) {
      this.cBe.BeginSkill(t, {
        Reason: "CharacterActionComponent.PlayCustomCommonSkill"
      });
    }
  }
  D2r() {
    this.l2r ||= CommonParamById_1.configCommonParamById.GetFloatConfig("CatapultAnimAngle");
    return this.l2r;
  }
  PlayFaithJumpSkill() {
    if (this.cBe?.CheckIsLoaded()) {
      if (this.cBe.HasAbility(FAITH_JUMP_SKILL_FEMALE)) {
        this.cBe.BeginSkill(FAITH_JUMP_SKILL_FEMALE, {
          Reason: "CharacterActionComponent.PlayFaithJumpSkill"
        });
      } else if (this.cBe.HasAbility(FAITH_JUMP_SKILL_MALE)) {
        this.cBe.BeginSkill(FAITH_JUMP_SKILL_MALE, {
          Reason: "CharacterActionComponent.PlayFaithJumpSkill"
        });
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Interaction", 42, "角色没有信仰之跃技能", ["Role", this.Hte?.CreatureData.GetPbDataId()]);
      }
    }
  }
};
CharacterActionComponent.I2r = [-1371021686, -1503953470, 1008164187, 1996624497];
CharacterActionComponent.Lz = Vector_1.Vector.Create();
CharacterActionComponent.Tz = Vector_1.Vector.Create();
CharacterActionComponent = CharacterActionComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(29)], CharacterActionComponent);
exports.CharacterActionComponent = CharacterActionComponent; //# sourceMappingURL=CharacterActionComponent.js.map