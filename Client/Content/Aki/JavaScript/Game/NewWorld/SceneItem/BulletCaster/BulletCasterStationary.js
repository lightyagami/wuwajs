"use strict";

var __decorate = this && this.__decorate || function (e, t, r, o) {
  var i;
  var l = arguments.length;
  var a = l < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, r) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(e, t, r, o);
  } else {
    for (var s = e.length - 1; s >= 0; s--) {
      if (i = e[s]) {
        a = (l < 3 ? i(a) : l > 3 ? i(t, r, a) : i(t, r)) || a;
      }
    }
  }
  if (l > 3 && a) {
    Object.defineProperty(t, r, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletCasterStationary = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const EffectParameterNiagara_1 = require("../../../Effect/EffectParameter/EffectParameterNiagara");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const BulletCasterCommon_1 = require("./BulletCasterCommon");
const BulletCasterFactory_1 = require("./BulletCasterFactory");
let BulletCasterStationary = class BulletCasterStationary extends BulletCasterCommon_1.BulletCasterCommon {
  constructor() {
    super(...arguments);
    this.Aec = "radius";
  }
  OnStart() {}
  SetEffectParam(e) {
    var t = new EffectParameterNiagara_1.EffectParameterNiagara();
    t.UserParameterFloat = [[FNameUtil_1.FNameUtil.GetDynamicFName(this.Aec), this.CasterConfig.WarningWidth]];
    EffectSystem_1.EffectSystem.SetEffectParameterNiagara(e, t);
  }
  StartImmediately() {
    const e = this.PlayWarningEffect();
    if (EffectSystem_1.EffectSystem.IsValid(e)) {
      this.WarningEffectHandles.add(e);
    }
    const t = TimerSystem_1.TimerSystem.Delay(() => {
      if (EffectSystem_1.EffectSystem.IsValid(e)) {
        EffectSystem_1.EffectSystem.StopEffectById(e, "[BulletCaster] WarnEnd", false);
      }
      this.WarningEffectHandles.delete(e);
      this.BulletWaitWarningTimers.delete(t);
      this.Pec();
    }, this.CasterConfig.WarningTime);
    if (t) {
      this.BulletWaitWarningTimers.add(t);
    }
    this.SetTimeDilationRespectOwnerEntity();
  }
  Pec() {
    var e = this.OwnerEntity.GetComponent(1).ActorTransform;
    var e = this.CasterRelTransform.ToUeTransform().op_Multiply(e);
    var t = ControllerHolder_1.ControllerHolder.BulletController.GetSceneBulletOwner();
    if (!t?.IsInit) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 72, "Bullet生成错误, 找场景子弹owner还未初始化", ["OwnerEntityId", this.OwnerEntity.Id], ["sceneBulletOwner", t], ["MovementType", IComponent_1.EBatchBulletMovementType.Stationary]);
      }
      return -1;
    }
    t = ControllerHolder_1.ControllerHolder.BulletController.CreateBulletCustomTarget(t.Entity, this.CasterConfig.BulletType.toString(), e, {
      InitTargetLocation: e.GetLocation()
    }, this.BulletContextId);
    if (!t?.Valid) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 72, "Bullet生成错误", ["OwnerEntityId", this.OwnerEntity.Id], ["BulletContextId", this.BulletContextId], ["MovementType", IComponent_1.EBatchBulletMovementType.Stationary]);
      }
      return -1;
    }
    const r = t.Id;
    ControllerHolder_1.ControllerHolder.BulletController.SetBulletSpeedRatio(r, 0);
    e = TimerSystem_1.TimerSystem.Delay(() => {
      this.DestroyBulletTimers.delete(r);
      ControllerHolder_1.ControllerHolder.BulletController.DestroyBullet(r, false);
    }, this.CasterConfig.FlyTime);
    if (e) {
      this.DestroyBulletTimers.set(r, e);
    }
    return r;
  }
};
BulletCasterStationary = __decorate([BulletCasterFactory_1.BulletCasterClassFactory.Register(IComponent_1.EBatchBulletMovementType.Stationary)], BulletCasterStationary);
exports.BulletCasterStationary = BulletCasterStationary; //# sourceMappingURL=BulletCasterStationary.js.map