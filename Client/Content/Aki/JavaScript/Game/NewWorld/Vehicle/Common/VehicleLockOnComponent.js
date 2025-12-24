"use strict";

var __decorate = this && this.__decorate || function (t, e, i, o) {
  var s;
  var h = arguments.length;
  var r = h < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, i, o);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (s = t[n]) {
        r = (h < 3 ? s(r) : h > 3 ? s(e, i, r) : s(e, i)) || r;
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
exports.VehicleLockOnComponent = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const Time_1 = require("../../../../Core/Common/Time");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const FightCameraLogicComponent_1 = require("../../../Camera/FightCameraLogicComponent");
const CombatLog_1 = require("../../../Utils/CombatLog");
const BaseLockOnComponent_1 = require("../../Character/Common/Component/LockOn/BaseLockOnComponent");
const LockOnDebug_1 = require("../../Character/Common/Component/LockOn/LockOnDebug");
const VEHICLE_SKILLTARGET_LOCKON_ID = 6;
const VEHICLE_CLEAN_TARGET_SPEED_THRESHOLD = FightCameraLogicComponent_1.CLEAN_TARGET_SPEED_THRESHOLD * 6;
let VehicleLockOnComponent = class VehicleLockOnComponent extends BaseLockOnComponent_1.BaseLockOnComponent {
  constructor() {
    super(...arguments);
    this.SSa = Stats_1.Stat.Create("VehicleLockOnComponent.StatTickMoveDir");
    this.ESa = Stats_1.Stat.Create("VehicleLockOnComponent.StatTickCurrentInfo");
    this.ySa = Stats_1.Stat.Create("VehicleLockOnComponent.StatCheck");
    this.Hte = undefined;
    this.Nce = undefined;
    this.Gce = undefined;
    this._$r = Vector_1.Vector.Create();
  }
  static get Dependencies() {
    return [247];
  }
  OnStart() {
    super.OnStart();
    this.IsLookAt = false;
    this.Hte = this.Entity.GetComponent(247);
    this.CreatureComp = this.Entity.GetComponent(0);
    this.Nce = this.Entity.GetComponent(253);
    this.Gce = this.Entity.GetComponent(249);
    this.SetLockOnConfig(VEHICLE_SKILLTARGET_LOCKON_ID, 0);
    return true;
  }
  OnTick(t) {
    this.SSa.Start();
    this.m$r();
    this.SSa.Stop();
    this.ESa.Start();
    this.sra();
    this.ESa.Stop();
    this.ySa.Start();
    this.Check(t);
    this.ySa.Stop();
    super.OnTick(t);
  }
  sra() {
    if (!this.IsHardLock && !this.IsLookAt) {
      if (this.GetCurrentInfo?.EntityHandle?.Valid && this.CurSoftLockConfig && (this.IsEntityContainsDisableSoftLockTag(this.GetCurrentInfo.EntityHandle) || this.CannotBeDetected(this.CurSoftLockConfig, this.GetCurrentInfo.EntityHandle, this.GetCurrentInfo.EntityHandle.Entity.GetComponent(1).ActorLocationProxy))) {
        this.SetCurrentInfo(undefined);
        this.SetShowTarget(undefined);
      }
    }
  }
  m$r() {
    var t;
    var e;
    if (this.Nce && (t = this.Nce.GetMoveDirectionCache(), [e] = this.Nce.GetCameraInput(), (e !== 0 || !this._$r.Equals(t, MathUtils_1.MathUtils.SmallNumber)) && !(this._$r.Set(t.X, t.Y, 0), this.InputDirect.DeepCopy(this.Hte.InputDirectProxy), this._$r?.IsNearlyZero(MathUtils_1.MathUtils.SmallNumber)) || this.SpeedUpCleanTarget())) {
      this.HasChangeInput = true;
    }
  }
  SpeedUpCleanTarget() {
    return !!this.Gce?.Valid && !!(this.Gce.Speed > VEHICLE_CLEAN_TARGET_SPEED_THRESHOLD) && !this.TagComponent.HasTag(-1371021686);
  }
  GetSelfCamp() {
    if (this.Hte.Owner) {
      var t = this.Entity.GetComponent(246);
      if (t?.Driver) {
        t = t.Driver.GetComponent(1)?.Owner;
        if (t) {
          return t.Camp ?? -1;
        }
      }
    }
    return -1;
  }
  SetAndShowTarget(t, e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 96, "VehicleLockOnComp SetAndShowTarget", ["id", t?.EntityHandle?.Id]);
    }
    this.SetCurrentInfo(t);
    if (t?.EntityHandle?.Valid) {
      LockOnDebug_1.LockOnDebug.SetDebugArrow(t);
    }
    if (e) {
      this.c$r(this.GetCurrentTarget(), this.GetCurrentTargetSocketName());
    }
  }
  c$r(t, e = "") {
    return !this.IsHardLock && (t?.Valid && t.Entity.Active ? this.SetShowTarget(t, e) : this.SetShowTarget(undefined));
  }
  SetShowTarget(t, e = "", i) {
    if (this.ShowTarget !== t || this.ShowTargetSocket !== e) {
      this.ShowTargetSetTime = Time_1.Time.WorldTime;
      this.ShowTargetInternal = t;
      this.ShowTargetSocketInternal = e;
    }
    return true;
  }
};
VehicleLockOnComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(258)], VehicleLockOnComponent);
exports.VehicleLockOnComponent = VehicleLockOnComponent; //# sourceMappingURL=VehicleLockOnComponent.js.map