"use strict";

var __decorate = this && this.__decorate || function (t, e, i, o) {
  var s;
  var h = arguments.length;
  var n = h < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, i, o);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (s = t[r]) {
        n = (h < 3 ? s(n) : h > 3 ? s(e, i, n) : s(e, i)) || n;
      }
    }
  }
  if (h > 3 && n) {
    Object.defineProperty(e, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleLocationSafetyComponent = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const TsBaseCharacter_1 = require("../../../../Character/TsBaseCharacter");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const TeleportController_1 = require("../../../../Module/Teleport/TeleportController");
const WorldController_1 = require("../../../../World/Controller/WorldController");
const CharacterBuffIds_1 = require("../../Common/Component/Abilities/CharacterBuffIds");
const CharacterUnifiedStateTypes_1 = require("../../Common/Component/Abilities/CharacterUnifiedStateTypes");
const CustomMovementDefine_1 = require("../../Common/Component/Move/CustomMovementDefine");
const LocomotionUtils_1 = require("../../LocomotionUtils");
const PROFILE_KEY = "SafetyTrace";
const PLANAR_LIMIT = 3200000;
const HIGHT_LIMIT = -1000000;
const disableTag = [-1446183172];
const TELEPORT_THREHOLD = 1000;
const TELEPORT_THREHOLD_SQUARED = TELEPORT_THREHOLD * TELEPORT_THREHOLD;
const LOW_FREQ_TEST_INTERNAL = 1000;
const LOW_FREQ_MAX_NOT_SAFETY_COUNT = 3;
const MID_FREQ_TEST_INTERNAL = 1000;
const MID_FREQ_MAX_NOT_SAFETY_COUNT = 2;
const HIGH_FREQ_TEST_INTERNAL = 500;
const HIGH_FREQ_MAX_NOT_SAFETY_COUNT = 2;
const SUPER_HIGH_FREQ_TEST_INTERNAL = 250;
const SUPER_HIGH_FREQ_MAX_NOT_SAFETY_COUNT = 2;
const freqEnumToLevelNum = new Map([[IComponent_1.EDetectionFrequency.Low, 0], [IComponent_1.EDetectionFrequency.Medium, 1], [IComponent_1.EDetectionFrequency.High, 2], [IComponent_1.EDetectionFrequency.SuperHigh, 3]]);
class CachedSafetyLocationRecorder {
  constructor() {
    this.SafetyLocation = Vector_1.Vector.Create();
    this.IsSafety = false;
  }
  GetSafetyLocation() {
    if (this.IsSafety) {
      return this.SafetyLocation;
    } else {
      return undefined;
    }
  }
  ClearObject() {
    return !(this.IsSafety = false);
  }
}
class ConfigSafetyLocationRecorder {
  constructor() {
    this.SafetyLocationConfigMap = new Map();
    this.LHo = Vector_1.Vector.Create();
  }
  GetSafetyLocation() {
    let e = undefined;
    this.SafetyLocationConfigMap.forEach(t => {
      e = t.SafeLocation;
    });
    if (e) {
      this.LHo.FromConfigVector(e);
      return this.LHo;
    }
  }
  ClearObject() {
    this.SafetyLocationConfigMap.clear();
    return true;
  }
}
let RoleLocationSafetyComponent = class RoleLocationSafetyComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.rJo = undefined;
    this.vri = new Array();
    this.son = 0;
    this.sxr = 0;
    this.Uya = LOW_FREQ_MAX_NOT_SAFETY_COUNT;
    this.xya = LOW_FREQ_TEST_INTERNAL;
    this.Pya = new CachedSafetyLocationRecorder();
    this.wya = new ConfigSafetyLocationRecorder();
    this.lon = 0;
    this.j3 = undefined;
    this._ae = Vector_1.Vector.Create();
    this.uae = Vector_1.Vector.Create();
    this.Lz = Vector_1.Vector.Create();
    this._on = false;
    this.uon = 0;
    this.Qia = Vector_1.Vector.Create();
    this.Kia = Rotator_1.Rotator.Create();
    this.Hya = undefined;
    this.jya = undefined;
    this.I3r = t => {
      var e;
      var i = t.GetComponent(100);
      if (i && (MathUtils_1.MathUtils.IsValidVector(i.Qia) ? this.Qia.DeepCopy(i.Qia) : Log_1.Log.CheckError() && Log_1.Log.Error("Movement", 6, "Safety Inherit: Invalid Location", ["Char", t.GetComponent(3)?.Actor.GetName()], ["Location", i.Qia]), MathUtils_1.MathUtils.IsValidRotator(i.Kia) ? this.Kia.DeepCopy(i.Kia) : Log_1.Log.CheckError() && Log_1.Log.Error("Movement", 6, "Safety Inherit: Invalid Rotator", ["Char", t.GetComponent(3)?.Actor.GetName()], ["Rotator", i.Kia]), this.Hte.IsRoleAndCtrlByMe) && (this.wya.SafetyLocationConfigMap.clear(), i.wya.SafetyLocationConfigMap.forEach((t, e) => {
        this.wya.SafetyLocationConfigMap.set(e, t);
      }), i.wya.SafetyLocationConfigMap.clear(), this.Bya(), this.Pya.IsSafety = false, i.Pya.IsSafety) && ((t = t.GetComponent(3)).DefaultHalfHeight === this.Hte.DefaultHalfHeight && t.DefaultRadius === this.Hte.DefaultRadius ? (this.Pya.IsSafety = true, this.Pya.SafetyLocation.DeepCopy(i.Pya.SafetyLocation)) : ((e = Vector_1.Vector.Create(i.Pya.SafetyLocation)).Z += this.Hte.DefaultHalfHeight - t.DefaultHalfHeight, this.Pya.IsSafety = this.con(e), this.Pya.IsSafety && this.Pya.SafetyLocation.DeepCopy(e)), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Movement", 6, "Inherit LastSafety", ["IsSafety", this.Pya.IsSafety], ["OldLocation", i.Pya.SafetyLocation], ["NewLocation", this.Pya.SafetyLocation]);
      }
    };
    this.bpr = () => {
      this._on = true;
    };
    this.Ilt = () => {
      this._on = false;
      this.Pya.IsSafety = false;
      this.lon = 0;
    };
    this.Vma = () => {
      this.Pya.IsSafety = false;
      this.lon = 0;
    };
    this.mon = () => {
      this.Pya.IsSafety = false;
      this.lon = 0;
    };
    this.don = (t, e) => {
      if (e) {
        if (this.son === 0) {
          this.sxr = this.Disable("[RoleLocationSafetyComponent.OnDisableTagsChanged] 包含坐下Tag");
        }
        ++this.son;
      } else {
        --this.son;
        if (this.son === 0) {
          this.Pya.IsSafety = false;
          this.Enable(this.sxr, "[RoleLocationSafetyComponent.OnDisableTagsChanged] 不含坐下Tag");
        }
      }
    };
  }
  static get Dependencies() {
    return [3, 179];
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(3);
    this.rJo = this.Entity.GetComponent(179);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportStart, this.bpr);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.ElevatorMove, this.Vma);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharGravityDirectChanged, this.mon);
    this.son = 0;
    var t = this.Entity.GetComponent(209);
    if (t) {
      for (const e of disableTag) {
        if (t.HasTag(e)) {
          ++this.son;
        }
        this.vri.push(t.ListenForTagAddOrRemove(e, this.don));
      }
    }
    if (MathUtils_1.MathUtils.IsValidVector(this.Hte.ActorLocationProxy)) {
      this.Qia.DeepCopy(this.Hte.ActorLocationProxy);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Movement", 6, "Safety Init: InValid Location", ["Character", this.Hte?.Actor.GetName()], ["ErrorLocation", this.Hte?.ActorLocationProxy]);
      }
      this.Qia.Set(0, 0, 0);
    }
    if (MathUtils_1.MathUtils.IsValidRotator(this.Hte.ActorRotationProxy)) {
      this.Kia.DeepCopy(this.Hte.ActorRotationProxy);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Movement", 6, "Safety Init: InValid Rotator", ["Character", this.Hte?.Actor.GetName()], ["ErrorRotator", this.Hte?.ActorRotationProxy]);
      }
      this.Kia.Set(0, 0, 0);
    }
    return true;
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportStart, this.bpr);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.ElevatorMove, this.Vma);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharGravityDirectChanged, this.mon);
    if (this.j3) {
      TimerSystem_1.TimerSystem.Remove(this.j3);
      this.j3 = undefined;
    }
    for (const t of this.vri) {
      t.EndTask();
    }
    return !(this.vri.length = 0);
  }
  OnActivate() {
    this.Pya.SafetyLocation.DeepCopy(this.Hte.ActorLocationProxy);
    this.Pya.IsSafety = false;
  }
  OnEnable() {
    if (this.Hte && !this.Pya.IsSafety && (this.Pya.IsSafety = this.con(this.Hte.ActorLocationProxy), this.Pya.IsSafety)) {
      this.Pya.SafetyLocation.DeepCopy(this.Hte.ActorLocationProxy);
    }
    return true;
  }
  con(t) {
    if (!MathUtils_1.MathUtils.IsValidVector(t)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Movement", 31, "当前角色坐标包含NaN", ["location", t]);
      }
      return false;
    }
    this._ae.DeepCopy(t);
    this.Hte.ActorUpProxy.Multiply(this.Hte.DefaultHalfHeight - this.Hte.DefaultRadius, this.Lz);
    t.Addition(this.Lz, this._ae);
    t.Subtraction(this.Lz, this.uae);
    var e = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
    e.WorldContextObject = this.Hte.Actor;
    e.Radius = this.Hte.DefaultRadius;
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(e, this._ae);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(e, this.uae);
    e.ActorsToIgnore.Empty();
    var t = TraceElementCommon_1.TraceElementCommon.ShapeTrace(this.Hte.Actor.CapsuleComponent, e, PROFILE_KEY, PROFILE_KEY);
    if (t) {
      var i = e.HitResult.GetHitCount();
      for (let t = 0; t < i; ++t) {
        var o = e.HitResult.Actors.Get(t);
        if (!(o instanceof TsBaseCharacter_1.default)) {
          o = e.HitResult.TimeArray.Get(t);
          this.Hya = e.HitResult?.Actors.Get(t);
          this.jya = e.HitResult?.Components.Get(t);
          return o > 1 - MathUtils_1.MathUtils.SmallNumber;
        }
      }
    }
    return true;
  }
  OnTick(t) {
    if (!(this.uon > Time_1.Time.WorldTime) && !(this.uon = Time_1.Time.WorldTime + this.xya, !this.Active) && !!this.Valid && !this._on && !ModelManager_1.ModelManager.GameModeModel.Loading && !!this.Hte.IsRoleAndCtrlByMe && !ModelManager_1.ModelManager.PlotModel.IsInPlot && !!this.Hte.IsDefaultCapsule && this.rJo.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Swing && this.rJo.PositionState !== CharacterUnifiedStateTypes_1.ECharPositionState.Ride && (this.Hte.Actor.CharacterMovement?.MovementMode !== 6 || this.Hte.Actor.CharacterMovement?.CustomMovementMode !== CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SWING)) {
      if (this.Entity.Id === ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Id) {
        this.Hma();
      }
    }
  }
  Hma() {
    if (this.rJo.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground || this.Con(this.Hte.ActorLocationProxy)) {
      if (this.con(this.Hte.ActorLocationProxy)) {
        if (!this.Entity.GetComponent(178)?.GetBuffById(CharacterBuffIds_1.buffId.ElevatorBuff)) {
          if (this.rJo.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground) {
            this.Pya.IsSafety = true;
            this.Pya.SafetyLocation.DeepCopy(this.Hte.ActorLocationProxy);
          }
          this.lon = 0;
        }
      } else if (++this.lon >= this.Uya) {
        this.lon = 0;
        this.BackToSafetyPlace();
      }
    } else {
      WorldController_1.WorldController.RequestToNearestTeleport();
    }
  }
  OnAfterTick(t) {
    if (MathUtils_1.MathUtils.IsValidVector(this.Hte.ActorLocationProxy)) {
      this.Qia.DeepCopy(this.Hte.ActorLocationProxy);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Movement", 6, "Safety: InValid Location", ["Character", this.Hte?.Actor.GetName()], ["ErrorLocation", this.Hte?.ActorLocationProxy]);
      }
      TeleportController_1.TeleportController.TeleportToPositionNoLoading(this.Qia.ToUeVector(), undefined, "RoleLocationSafetyComponent.OnAfterTick").finally(undefined);
    }
    if (MathUtils_1.MathUtils.IsValidRotator(this.Hte.ActorRotationProxy)) {
      this.Kia.DeepCopy(this.Hte.ActorRotationProxy);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Movement", 6, "Safety: InValid Rotator", ["Character", this.Hte?.Actor.GetName()], ["ErrorRotator", this.Hte?.ActorRotationProxy]);
      }
      this.Hte.SetActorRotation(this.Kia.ToUeRotator(), "RoleSafetyNotValid", false);
    }
  }
  Con(t) {
    return !(Math.abs(t.X) > PLANAR_LIMIT) && !(Math.abs(t.Y) > PLANAR_LIMIT) && !(t.Z < HIGHT_LIMIT) || (Log_1.Log.CheckWarn() && Log_1.Log.Warn("Role", 7, "超过极限区间", ["location", t]), false);
  }
  Bya() {
    let t = IComponent_1.EDetectionFrequency.Low;
    for (const e of this.wya.SafetyLocationConfigMap.values()) {
      if ((freqEnumToLevelNum.get(e.DetectionFrequency) ?? 0) > (freqEnumToLevelNum.get(t) ?? 0)) {
        t = e.DetectionFrequency;
      }
    }
    switch (t) {
      case IComponent_1.EDetectionFrequency.Low:
        this.xya = LOW_FREQ_TEST_INTERNAL;
        this.Uya = LOW_FREQ_MAX_NOT_SAFETY_COUNT;
        break;
      case IComponent_1.EDetectionFrequency.Medium:
        this.xya = MID_FREQ_TEST_INTERNAL;
        this.Uya = MID_FREQ_MAX_NOT_SAFETY_COUNT;
        break;
      case IComponent_1.EDetectionFrequency.High:
        this.xya = HIGH_FREQ_TEST_INTERNAL;
        this.Uya = HIGH_FREQ_MAX_NOT_SAFETY_COUNT;
        break;
      case IComponent_1.EDetectionFrequency.SuperHigh:
        this.xya = SUPER_HIGH_FREQ_TEST_INTERNAL;
        this.Uya = SUPER_HIGH_FREQ_MAX_NOT_SAFETY_COUNT;
    }
  }
  AddSafetyLocationConfig(t, e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Role", 39, "场景实体向玩家注册安全位置信息", ["SceneItemId", t.Id]);
    }
    this.wya.SafetyLocationConfigMap.set(t.Id, e);
    this.Bya();
  }
  RemoveSafetyLocationConfig(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Role", 39, "场景实体向玩家注册安全位置信息", ["SceneItemId", t.Id]);
    }
    this.wya.SafetyLocationConfigMap.delete(t.Id);
    this.Bya();
  }
  BackToSafetyPlace() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Movement", 6, "BackToSafetyPlace", ["From", this.Hte.ActorLocationProxy], ["HitActor", this.Hya?.GetName()], ["HitComp", this.jya?.GetName()], ["Transform", this.Hya?.D_GetTransform()]);
    }
    let t = undefined;
    if (t = this.wya.GetSafetyLocation()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Movement", 6, "BackToSafetyPlace Scene", ["To", t]);
      }
      TeleportController_1.TeleportController.TeleportToPositionNoLoading(t.ToUeVector(), undefined, "BackToSafetyPlace.Scene").finally(undefined);
    } else if (LocomotionUtils_1.LocomotionUtils.FindSpaceForSafety(this.Hte, this.Hte.ScaledHalfHeight, this.Hte.ScaledRadius, this.Lz)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Movement", 6, "BackToSafetyPlace Space", ["To", this.Lz]);
      }
      this.Hte.SetActorLocation(this.Lz.ToUeVector(), "BackToSafetyPlace.Space", false);
    } else if (t = this.Pya.GetSafetyLocation()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Movement", 6, "BackToSafetyPlace Last", ["To", t]);
      }
      if (Vector_1.Vector.DistSquared(this.Hte.ActorLocationProxy, t) > TELEPORT_THREHOLD_SQUARED) {
        TeleportController_1.TeleportController.TeleportToPositionNoLoading(t.ToUeVector(), undefined, "BackToSafetyPlace.Last").finally(undefined);
      } else {
        this.Hte.SetActorLocation(t.ToUeVector(), "BackToSafetyPlace.Last", false);
      }
    }
  }
};
RoleLocationSafetyComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(100)], RoleLocationSafetyComponent);
exports.RoleLocationSafetyComponent = RoleLocationSafetyComponent; //# sourceMappingURL=RoleLocationSafetyComponent.js.map