"use strict";

var __decorate = this && this.__decorate || function (e, t, r, o) {
  var i;
  var l = arguments.length;
  var s = l < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, r) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, r, o);
  } else {
    for (var _ = e.length - 1; _ >= 0; _--) {
      if (i = e[_]) {
        s = (l < 3 ? i(s) : l > 3 ? i(t, r, s) : i(t, r)) || s;
      }
    }
  }
  if (l > 3 && s) {
    Object.defineProperty(t, r, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletCasterSprint = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const EffectParameterNiagara_1 = require("../../../Effect/EffectParameter/EffectParameterNiagara");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const BulletCasterCommon_1 = require("./BulletCasterCommon");
const BulletCasterFactory_1 = require("./BulletCasterFactory");
const WARNING_EFFECT_LENGTH_KEY = "length";
const WARNING_EFFECT_WIDTH_KEY = "width";
let BulletCasterSprint = class BulletCasterSprint extends BulletCasterCommon_1.BulletCasterCommon {
  OnStart() {}
  StartImmediately() {
    if (this.CasterConfig.FlyTime < TimerSystem_1.MIN_TIME) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "Bullet飞行时间<=0", ["OwnerEntityId", this.OwnerEntity.Id]);
      }
    } else {
      var e = this.OwnerEntity.GetComponent(1).ActorTransform;
      var t = this.CasterRelTransform.ToUeTransform().op_Multiply(e);
      var r = MathUtils_1.MathUtils.CommonTempVector;
      this.CasterRelTransform.GetRotation().GetForwardVector(r).GetSafeNormal(r, MathUtils_1.MathUtils.SmallNumber);
      r.MultiplyEqual(this.CasterConfig.FlyDistance);
      var e = e.TransformVector(r.ToUeVector());
      var r = ControllerHolder_1.ControllerHolder.BulletController.GetSceneBulletOwner();
      if (r?.IsInit) {
        e = t.GetLocation().op_Addition(e);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("SceneItem", 39, "Bullet生成", ["InitLoc", t.GetLocation()], ["TargetLoc", e]);
        }
        r = ControllerHolder_1.ControllerHolder.BulletController.CreateBulletCustomTarget(r.Entity, this.CasterConfig.BulletType.toString(), t, {
          InitTargetLocation: e
        }, this.BulletContextId);
        if (r?.Valid) {
          const o = r.Id;
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Bullet", 39, "创建子弹", ["BulletId", o]);
          }
          t = TimerSystem_1.TimerSystem.Delay(() => {
            this.DestroyBulletTimers.delete(o);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Bullet", 39, "Timer销毁子弹", ["BulletId", o]);
            }
            ControllerHolder_1.ControllerHolder.BulletController.DestroyBullet(o, false);
          }, this.CasterConfig.WarningTime + this.CasterConfig.FlyTime);
          if (t) {
            this.DestroyBulletTimers.set(o, t);
          }
          const i = this.CasterConfig.FlyDistance / (this.CasterConfig.FlyTime * CommonDefine_1.SECOND_PER_MILLIONSECOND);
          if (this.CasterConfig.WarningTime < TimerSystem_1.MIN_TIME) {
            ControllerHolder_1.ControllerHolder.BulletController.SetBulletSpeedRatio(o, i);
          } else {
            const l = this.PlayWarningEffect();
            if (EffectSystem_1.EffectSystem.IsValid(l)) {
              this.WarningEffectHandles.add(l);
            }
            ControllerHolder_1.ControllerHolder.BulletController.SetBulletSpeedRatio(o, 0);
            const s = TimerSystem_1.TimerSystem.Delay(() => {
              if (EffectSystem_1.EffectSystem.IsValid(l)) {
                EffectSystem_1.EffectSystem.StopEffectById(l, "[BulletCaster] WarnEnd", false);
              }
              this.WarningEffectHandles.delete(l);
              this.BulletWaitWarningTimers.delete(s);
              ControllerHolder_1.ControllerHolder.BulletController.SetBulletSpeedRatio(o, i);
            }, this.CasterConfig.WarningTime);
            if (s) {
              this.BulletWaitWarningTimers.add(s);
            }
          }
          this.SetTimeDilationRespectOwnerEntity();
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "Bullet生成错误, 找不到场景子弹owner", ["OwnerEntityId", this.OwnerEntity.Id]);
      }
    }
  }
  SetEffectParam(e) {
    var t = new EffectParameterNiagara_1.EffectParameterNiagara();
    t.UserParameterFloat = [[FNameUtil_1.FNameUtil.GetDynamicFName(WARNING_EFFECT_LENGTH_KEY), this.CasterConfig.FlyDistance], [FNameUtil_1.FNameUtil.GetDynamicFName(WARNING_EFFECT_WIDTH_KEY), this.CasterConfig.WarningWidth]];
    EffectSystem_1.EffectSystem.SetEffectParameterNiagara(e, t);
  }
};
BulletCasterSprint = __decorate([BulletCasterFactory_1.BulletCasterClassFactory.Register(IComponent_1.EBatchBulletMovementType.Sprint)], BulletCasterSprint);
exports.BulletCasterSprint = BulletCasterSprint; //# sourceMappingURL=BulletCasterSprint.js.map