"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletCasterBatch = undefined;
require("./BulletCasterSprint");
require("./BulletCasterStationary");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const BulletCasterFactory_1 = require("./BulletCasterFactory");
const BulletCasterUtils_1 = require("./BulletCasterUtils");
const IBulletCaster_1 = require("./IBulletCaster");
class BulletCasterBatch {
  constructor(t, e, s, i, r, o, l, h) {
    this.OwnerEntity = t;
    this.LoopInterval = e;
    this.DelayTime = s;
    this.BulletCasters = [];
    this.cCl = undefined;
    this.mCl = undefined;
    this.dCl = () => {
      for (const t of this.BulletCasters) {
        t.Start();
      }
    };
    for (const m of i) {
      var a = m.BulletIndex - 1;
      var a = new IBulletCaster_1.BulletCasterInitParam(t, m, l[a], o, r);
      var u = BulletCasterFactory_1.BulletCasterClassFactory.GetInstance(h ?? IComponent_1.EBatchBulletMovementType.Sprint, a);
      if (u) {
        this.BulletCasters.push(u);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 72, "构建批量发射子弹的时候工厂里面没拿出来", ["movementType", h], ["bulletCasterInitParam", a]);
      }
    }
  }
  Start() {
    if (this.DelayTime < TimerSystem_1.MIN_TIME) {
      this._Cl();
    } else {
      this.cCl = TimerSystem_1.TimerSystem.Delay(() => {
        this._Cl();
      }, this.DelayTime);
    }
    this.SetTimeDilationRespectOwnerEntity();
  }
  Stop() {
    for (const t of this.BulletCasters) {
      t.Stop();
    }
    if (this.mCl?.Valid()) {
      this.mCl.Remove();
    }
    this.mCl = undefined;
    if (this.cCl?.Valid()) {
      this.cCl.Remove();
    }
    this.cCl = undefined;
  }
  SetTimeDilationRespectOwnerEntity() {
    var t = this.OwnerEntity.GetComponent(126);
    var t = this.OwnerEntity.TimeDilation * (t?.CurrentTimeScale ?? 1);
    this.SetTimeDilation(t);
  }
  SetTimeDilation(t) {
    if (this.cCl?.Valid()) {
      BulletCasterUtils_1.BulletCasterUtils.SetTimerHandleTimeDilation(this.cCl, t);
    }
    if (this.mCl?.Valid()) {
      BulletCasterUtils_1.BulletCasterUtils.SetTimerHandleTimeDilation(this.mCl, t);
    }
    for (const e of this.BulletCasters) {
      e.SetTimeDilation(t);
    }
  }
  _Cl() {
    if (this.LoopInterval < TimerSystem_1.MIN_TIME) {
      this.dCl();
    } else {
      this.dCl();
      this.mCl = TimerSystem_1.TimerSystem.Forever(this.dCl, this.LoopInterval);
    }
    this.SetTimeDilationRespectOwnerEntity();
  }
}
exports.BulletCasterBatch = BulletCasterBatch;
//# sourceMappingURL=BulletCasterBatch.js.map