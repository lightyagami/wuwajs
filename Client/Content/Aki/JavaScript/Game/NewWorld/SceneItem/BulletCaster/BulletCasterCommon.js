"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletCasterCommon = undefined;
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BulletCasterUtils_1 = require("./BulletCasterUtils");
const IBulletCaster_1 = require("./IBulletCaster");
class BulletCasterCommon extends IBulletCaster_1.BulletCasterBase {
  constructor() {
    super(...arguments);
    this.WarningEffectHandles = new Set();
    this.BulletWaitWarningTimers = new Set();
    this.DestroyBulletTimers = new Map();
  }
  OnStop() {
    for (const r of this.BulletWaitWarningTimers) {
      if (r.Valid()) {
        r.Remove();
      }
    }
    this.BulletWaitWarningTimers.clear();
    for (const o of this.WarningEffectHandles) {
      if (EffectSystem_1.EffectSystem.IsValid(o)) {
        EffectSystem_1.EffectSystem.StopEffectById(o, "[BulletCaster] Stop", false);
      }
    }
    this.WarningEffectHandles.clear();
    for (var [e, t] of this.DestroyBulletTimers) {
      if (t.Valid()) {
        t.Remove();
      }
      ControllerHolder_1.ControllerHolder.BulletController.DestroyBullet(e, true);
    }
    this.DestroyBulletTimers.clear();
  }
  OnSetTimeDilation(e) {
    for (const l of this.BulletWaitWarningTimers) {
      if (l.Valid()) {
        BulletCasterUtils_1.BulletCasterUtils.SetTimerHandleTimeDilation(l, e);
      }
    }
    var t;
    var r;
    var o = this.CasterConfig.WarningTime > 0 ? 1 / (this.CasterConfig.WarningTime * CommonDefine_1.SECOND_PER_MILLIONSECOND) : 1;
    for (const i of this.WarningEffectHandles) {
      if (EffectSystem_1.EffectSystem.IsValid(i)) {
        EffectSystem_1.EffectSystem.SetTimeScale(i, e * o);
      }
    }
    for ([t, r] of this.DestroyBulletTimers) {
      var s = ModelManager_1.ModelManager.BulletModel?.GetBulletEntityById(t);
      if (s?.Valid) {
        s.SetTimeDilation(e);
      }
      if (r.Valid()) {
        BulletCasterUtils_1.BulletCasterUtils.SetTimerHandleTimeDilation(r, e);
      }
    }
  }
}
exports.BulletCasterCommon = BulletCasterCommon;
//# sourceMappingURL=BulletCasterCommon.js.map