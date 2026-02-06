"use strict";

var __decorate = this && this.__decorate || function (t, i, s, o) {
  var e;
  var h = arguments.length;
  var n = h < 3 ? i : o === null ? o = Object.getOwnPropertyDescriptor(i, s) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, i, s, o);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (e = t[r]) {
        n = (h < 3 ? e(n) : h > 3 ? e(i, s, n) : e(i, s)) || n;
      }
    }
  }
  if (h > 3 && n) {
    Object.defineProperty(i, s, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterCustomActionComponent = exports.CustomSetPlayerControl = exports.CustomPlayMontage = exports.CustomSetActorRotation = exports.CustomMoveToLocation = exports.CustomSetCollision = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const Queue_1 = require("../../../../../../Core/Container/Queue");
const AbpMontageDataById_1 = require("../../../../../../Core/Define/ConfigQuery/AbpMontageDataById");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const PlayMontageUtils_1 = require("../../../Npc/Logics/PlayMontageUtils");
const CharacterUnifiedStateTypes_1 = require("./CharacterUnifiedStateTypes");
const MODEL_BUFFER_TIME = 200;
const playerInputLimitTagList = [-1697149502, -541178966, 1616400338, -469423249, 766688429, -542518289, 581080458, -1802431900, -1752099043, -732810197, -2140742267, -1013832153];
class CustomActionBase {
  constructor() {
    this.IsStart = false;
    this.IsFinish = false;
    this.IsSuccessful = false;
    this.OnStart = undefined;
    this.Callback = undefined;
  }
  CheckStart() {
    return this.IsStart;
  }
  CheckFinish() {
    return this.IsFinish;
  }
  CheckSuccessful() {
    return this.IsSuccessful;
  }
  RunAction() {
    if (!this.IsStart) {
      this.IsStart = true;
      this.OnStart?.();
      this.OnRunAction();
    }
  }
  Abort(t) {
    this.OnAbort();
    this.Finish(t);
  }
  OnFinish(t) {}
  OnAbort() {}
  Finish(t) {
    if (!this.IsFinish) {
      this.IsSuccessful = t;
      this.IsFinish = true;
      this.Callback?.();
      this.OnFinish(t);
    }
  }
}
class CustomSetCollision extends CustomActionBase {
  constructor(t, i, s, o) {
    super();
    this.Hte = t;
    this.FPo = i;
    this.FTe = s;
    this.Callback = o;
  }
  OnRunAction() {
    if (this.FPo && this.Hte) {
      if (this.FTe) {
        this.Hte.Actor.CapsuleComponent.IgnoreActorWhenMoving(this.FPo.Owner, true);
        this.Hte.Actor.CapsuleComponent.SetCollisionResponseToChannel(2, 0);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Character", 42, "[CustomAction][SetCollision] 忽略碰撞", ["EntityId", this.Hte.Entity.Id]);
        }
      } else {
        this.Hte.Actor.CapsuleComponent.SetCollisionResponseToChannel(2, 2);
        this.Hte.Actor.CapsuleComponent.IgnoreActorWhenMoving(this.FPo.Owner, false);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Character", 42, "[CustomAction][SetCollision] 恢复碰撞", ["EntityId", this.Hte.Entity.Id]);
        }
      }
      this.Finish(true);
    } else {
      this.Finish(false);
    }
  }
}
exports.CustomSetCollision = CustomSetCollision;
class CustomMoveToLocation extends CustomActionBase {
  constructor(t, i, s, o, e, h = MODEL_BUFFER_TIME) {
    super();
    this.Gce = t;
    this.oRe = i;
    this.Due = s;
    this.Callback = o;
    this.OnStart = e;
    this.I6g = h;
  }
  OnRunAction() {
    var t;
    if (this.Gce && this.Due) {
      t = {
        Points: {
          Index: 0,
          Position: this.Due,
          MoveState: IComponent_1.EPatrolMoveState.Walk
        },
        Navigation: true,
        IsFly: false,
        DebugMode: true,
        Loop: false,
        Callback: t => {
          var i = this.oRe?.GetMeshTransform?.();
          if (i) {
            this.Gce.ActorComp?.SetActorLocation(this.Due.ToUeVector(), "[CharacterCustomActionComponent]", false);
            this.oRe?.SetModelBuffer?.(i, this.I6g);
          }
          this.Gce.Entity.GetComponent(186)?.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Stand);
          this.Finish(true);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Character", 42, "[CustomAction][MoveToLocation] 向目标点移动完成", ["EntityId", this.Gce.Entity.Id], ["point", this.Due]);
          }
        },
        ReturnTimeoutFailed: 2,
        ReturnFalseWhenNavigationFailed: false,
        Distance: 10
      };
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 42, "[CustomAction][MoveToLocation] 开始向目标点移动", ["EntityId", this.Gce.Entity.Id]);
      }
      this.Gce.MoveAlongPath(t);
    } else {
      this.Finish(false);
    }
  }
  OnAbort() {
    this.Gce.MoveController.MoveEnd(1);
  }
}
exports.CustomMoveToLocation = CustomMoveToLocation;
class CustomSetActorRotation extends CustomActionBase {
  constructor(t, i, s, o, e, h, n = MODEL_BUFFER_TIME) {
    super();
    this.Hte = t;
    this.Gsn = i;
    this.oRe = s;
    this.yB = o;
    this.BHg = e;
    this.Callback = h;
    this.I6g = n;
    this.jye = Vector_1.Vector.Create();
    this.RTe = Vector_1.Vector.Create();
    this.Gco = Rotator_1.Rotator.Create();
  }
  OnRunAction() {
    var t;
    if (this.Hte && this.oRe && this.Gsn) {
      this.RTe.DeepCopy(this.Hte.ActorGravityDirectProxy);
      this.RTe.UnaryNegation(this.RTe);
      this.RTe.Normalize();
      if (this.BHg === 0) {
        this.jye.DeepCopy(this.Gsn.ActorLocationProxy);
        this.jye.SubtractionEqual(this.Hte.ActorLocationProxy);
        if (!this.yB.IsNearlyZero()) {
          t = Math.atan2(this.yB.Y, 1 + this.yB.X) * MathUtils_1.MathUtils.RadToDeg;
          this.jye.RotateAngleAxis(t, this.RTe, this.jye);
        }
      } else {
        this.jye.DeepCopy(this.Gsn.ActorForwardProxy);
        this.jye.UnaryNegation(this.jye);
      }
      if (this.jye.IsNearlyZero()) {
        this.Gco.DeepCopy(this.Hte.ActorRotationProxy);
      } else {
        MathUtils_1.MathUtils.LookRotationUpFirst(this.jye, this.RTe, this.Gco);
      }
      if (t = this.oRe?.GetMeshTransform?.()) {
        this.Hte.SetActorRotation(this.Gco.ToUeRotator(), "[CharacterCustomActionComponent]", false);
        this.Hte.ClearInput();
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Character", 42, "[CustomAction][CustomTurnToTarget]", ["EntityId", this.Hte.Entity.Id], ["currentLoc", this.Hte.ActorLocationProxy], ["targetLoc", this.Gsn.ActorLocationProxy], ["currentRot", t.GetRotation()], ["targetRot", this.Gco]);
        }
        this.oRe?.SetModelBuffer?.(t, this.I6g);
      }
      this.Finish(true);
    } else {
      this.Finish(false);
    }
  }
}
exports.CustomSetActorRotation = CustomSetActorRotation;
class CustomPlayMontage extends CustomActionBase {
  constructor(t, i, s, o, e, h, n) {
    super();
    this.ph_ = t;
    this.oRe = i;
    this.n8 = s;
    this.ac = o;
    this.LYo = e;
    this.DYo = h;
    this.Callback = n;
    this.T6g = -1;
  }
  OnRunAction() {
    if (this.oRe) {
      var t = () => {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Character", 42, "[CustomAction][CustomPlayMontage] 开始播放Montage", ["EntityId", this.oRe.Entity.Id], ["path", this.n8]);
        }
        this.LYo?.();
      };
      const s = this.ph_?.CurAnimState;
      var i = () => {
        if (!this.CheckFinish()) {
          this.DYo?.();
          this.Finish(true);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Character", 42, "[CustomAction][CustomPlayMontage] Montage播放结束", ["EntityId", this.oRe.Entity.Id]);
          }
          if (this.ph_) {
            this.ph_?.SwitchAnimState({
              TargetStateName: this.ph_.GetAnimStateName(s),
              Context: "[CustomAction][CustomPlayMontage]切回之前的状态"
            });
          }
        }
      };
      if (this.ph_) {
        this.T6g = this.ph_.VolatileMontagePlayByLoad(2, this.n8, this.ac, t, i);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Character", 42, "[CustomAction][CustomPlayMontage] VolatileMontagePlayByLoad", ["EntityId", this.oRe.Entity.Id]);
        }
      } else {
        this.T6g = PlayMontageUtils_1.PlayMontageUtils.LoadAndPlayMontage(this.oRe, this.n8, new PlayMontageUtils_1.PlayMontageConfig(), t, i);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Character", 42, "[CustomAction][CustomPlayMontage] LoadAndPlayMontage", ["EntityId", this.oRe.Entity.Id]);
        }
      }
      if (this.T6g < 0) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Character", 42, "[CustomAction][CustomPlayMontage] LoadAndPlayMontage失败", ["EntityId", this.oRe.Entity.Id], ["path", this.n8]);
        }
        this.Finish(false);
      }
    } else {
      this.Finish(false);
    }
  }
  OnAbort() {
    if (!(this.T6g < 0)) {
      if (this.ph_) {
        this.ph_.VolatileMontageStopByLoad(3, this.T6g, 0);
      } else {
        PlayMontageUtils_1.PlayMontageUtils.ClearAndStopMontage(this.T6g, this.oRe);
      }
    }
  }
}
exports.CustomPlayMontage = CustomPlayMontage;
class CustomSetPlayerControl extends CustomActionBase {
  constructor(t, i, s, o, e, h, n, r) {
    super();
    this._5g = t;
    this.pLe = i;
    this.Hte = s;
    this.cBe = o;
    this.mBe = e;
    this.Nce = h;
    this.Lie = n;
    this.Callback = r;
  }
  OnRunAction() {
    var t = this._5g ? this.IBe() : this.TBe();
    this.Finish(t);
  }
  TBe() {
    this.Nce?.ClearMoveVectorCache();
    this.Nce?.SetActive(true);
    this.gBe(false);
    ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 42, "[CustomAction][SetPlayerControl] RegainActivity", ["EntityId", this.Hte?.Entity.Id]);
    }
    return true;
  }
  IBe() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ForceReleaseInput, this.pLe);
    return !!this.mBe && !!this.Hte && !(this.mBe.DirectionState === CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection ? this.mBe.ExitAimStatus() : this.mBe.SetDirectionState(this.mBe.DirectionState), this.cBe && this.cBe.CurrentSkill && this.cBe.EndOwnerAndFollowSkills(), this.Hte.ClearInput(), this.Nce?.ClearMoveVectorCache(), this.Nce?.SetActive(false), this.gBe(true), ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag(), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Character", 42, "[CustomAction][SetPlayerControl] StopActivity", ["EntityId", this.Hte?.Entity.Id]), 0);
  }
  gBe(t) {
    if (t) {
      for (const i of playerInputLimitTagList) {
        this.Lie?.AddTag(i);
      }
    } else {
      for (const s of playerInputLimitTagList) {
        this.Lie?.RemoveTag(s);
      }
    }
  }
}
exports.CustomSetPlayerControl = CustomSetPlayerControl;
let CharacterCustomActionComponent = class CharacterCustomActionComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.pLe = "[CharacterCustomActionComponent] Input Limited Action";
    this.Hte = undefined;
    this.Gce = undefined;
    this.oRe = undefined;
    this.cBe = undefined;
    this.mBe = undefined;
    this.Nce = undefined;
    this.Lie = undefined;
    this.Vwm = new Queue_1.Queue();
  }
  OnStart() {
    this.Hte = this.Entity.CheckGetComponent(3);
    this.oRe = this.Entity.GetComponent(188);
    this.Gce = this.Entity.GetComponent(189);
    this.cBe = this.Entity.GetComponent(43);
    this.mBe = this.Entity.GetComponent(186);
    this.Nce = this.Entity.GetComponent(67);
    this.Lie = this.Entity.GetComponent(217);
    return true;
  }
  OnTick(t) {
    while (!this.Vwm.Empty) {
      var i = this.Vwm.Front;
      if (i) {
        if (!i.CheckStart()) {
          i.RunAction();
        }
        if (!i.CheckFinish()) {
          break;
        }
      }
      this.Vwm.Pop();
    }
  }
  AbortAllAction(t) {
    while (!this.Vwm.Empty) {
      var i = this.Vwm.Front;
      if (i) {
        if (!i.CheckStart()) {
          i.RunAction();
        }
        i.Abort(t);
        this.Vwm.Pop();
      } else {
        this.Vwm.Pop();
      }
    }
  }
  OnEnd() {
    return true;
  }
  AddCustomMoveToLocation(t, i, s) {
    if (this.Gce && this.oRe) {
      t = Vector_1.Vector.Create(t);
      t = new CustomMoveToLocation(this.Gce, this.oRe, t, i, s);
      this.Vwm.Push(t);
    }
  }
  AddCustomSetCollision(t, i, s) {
    if (this.Hte) {
      t = new CustomSetCollision(this.Hte, t, i, s);
      this.Vwm.Push(t);
    }
  }
  AddCustomSetTurnToTarget(t, i = 0, s = Vector_1.Vector.ZeroVectorProxy, o, e) {
    if (this.Hte && this.oRe) {
      s = Vector_1.Vector.Create(s);
      t = new CustomSetActorRotation(this.Hte, t, this.oRe, s, i, o, e);
      this.Vwm.Push(t);
    }
  }
  AddCustomPlayMontage(t, i, s = undefined, o = undefined, e) {
    var h;
    if (this.oRe) {
      i = (i = i ? AbpMontageDataById_1.configAbpMontageDataById.GetConfig(i) : undefined) && i.InitState.length > 0 ? {
        InitStateName: i.InitState
      } : undefined;
      h = this.Entity.GetComponent(49);
      h = new CustomPlayMontage(h, this.oRe, t, i, s, o, e);
      this.Vwm.Push(h);
    }
  }
  AddCustomSetPlayerControl(t, i) {
    t = new CustomSetPlayerControl(t, this.pLe, this.Hte, this.cBe, this.mBe, this.Nce, this.Lie, i);
    this.Vwm.Push(t);
  }
};
CharacterCustomActionComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(30)], CharacterCustomActionComponent);
exports.CharacterCustomActionComponent = CharacterCustomActionComponent; //# sourceMappingURL=CharacterCustomActionComponent.js.map