"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletCasterBase = exports.BulletCasterInitParam = undefined;
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EffectContext_1 = require("../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../GlobalData");
const BulletCasterUtils_1 = require("./BulletCasterUtils");
class BulletCasterInitParam {
  constructor(t, s, e, i, r) {
    this.OwnerEntity = t;
    this.CasterConfig = s;
    this.CasterRelTransform = e;
    this.BulletContextId = i;
    this.WarningEffect = r;
  }
}
exports.BulletCasterInitParam = BulletCasterInitParam;
class BulletCasterBase {
  constructor(t) {
    this.BulletCasterInitParam = t;
    this.OwnerEntity = undefined;
    this.CasterConfig = undefined;
    this.CasterRelTransform = undefined;
    this.BulletContextId = BigInt(0);
    this.WarningEffect = "";
    this.sCl = [];
    this.OwnerEntity = t.OwnerEntity;
    this.CasterConfig = t.CasterConfig;
    this.CasterRelTransform = t.CasterRelTransform;
    this.BulletContextId = t.BulletContextId;
    this.WarningEffect = t.WarningEffect;
  }
  Start() {
    var t;
    if (!this.CasterConfig.DelayTime || this.CasterConfig.DelayTime <= TimerSystem_1.MIN_TIME) {
      this.StartImmediately();
    } else if (t = TimerSystem_1.TimerSystem.Delay(() => {
      this.sCl.pop();
      this.StartImmediately();
    }, this.CasterConfig.DelayTime)) {
      this.sCl.push(t);
    }
    this.SetTimeDilationRespectOwnerEntity();
    this.OnStart();
  }
  Stop() {
    for (const t of this.sCl) {
      if (t.Valid()) {
        t.Remove();
      }
    }
    this.sCl.length = 0;
    this.OnStop();
  }
  SetTimeDilationRespectOwnerEntity() {
    var t = this.OwnerEntity.GetComponent(133);
    var t = this.OwnerEntity.TimeDilation * (t?.CurrentTimeScale ?? 1);
    this.SetTimeDilation(t);
  }
  SetTimeDilation(t) {
    for (const s of this.sCl) {
      if (s.Valid()) {
        BulletCasterUtils_1.BulletCasterUtils.SetTimerHandleTimeDilation(s, t);
      }
    }
    this.OnSetTimeDilation(t);
  }
  PlayWarningEffect() {
    var t;
    if (this.WarningEffect.length === 0) {
      return 0;
    } else {
      t = this.OwnerEntity.GetComponent(1).ActorTransform;
      t = this.CasterRelTransform.ToUeTransform().op_Multiply(t);
      t = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, t, this.WarningEffect, "[BatchBulletCasterComponent] PlayWarningEffect", new EffectContext_1.EffectContext(this.OwnerEntity.Id));
      this.SetEffectParam(t);
      return t;
    }
  }
}
exports.BulletCasterBase = BulletCasterBase;
//# sourceMappingURL=IBulletCaster.js.map