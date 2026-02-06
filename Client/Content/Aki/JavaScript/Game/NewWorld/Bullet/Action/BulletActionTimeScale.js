"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletActionTimeScale = undefined;
const Time_1 = require("../../../../Core/Common/Time");
const PriorityQueue_1 = require("../../../../Core/Container/PriorityQueue");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const EffectUtil_1 = require("../../../Utils/EffectUtil");
const PawnTimeScaleComponent_1 = require("../../Pawn/Component/PawnTimeScaleComponent");
const BulletStaticFunction_1 = require("../BulletStaticMethod/BulletStaticFunction");
const BulletUtil_1 = require("../BulletUtil");
const BulletActionBase_1 = require("./BulletActionBase");
class BulletActionTimeScale extends BulletActionBase_1.BulletActionBase {
  constructor() {
    super(...arguments);
    this.OVo = -0;
    this.kVo = undefined;
    this.FVo = -0;
    this.zUu = 0;
  }
  OnExecute() {
    if (this.BulletInfo.BulletDataMain.TimeScale.TimeScaleWithAttacker) {
      this.kVo = this.BulletInfo.Attacker.GetComponent(133);
    } else {
      this.BulletInfo.TimeScaleList = new PriorityQueue_1.PriorityQueue(PawnTimeScaleComponent_1.PawnTimeScaleComponent.CompareScalePriority);
      this.BulletInfo.TimeScaleMap = new Map();
      this.BulletInfo.TimeScaleId = 1;
      var t = Time_1.Time.WorldTimeSeconds;
      var i = ModelManager_1.ModelManager.BulletModel.PersistentTimeScaleMap;
      for (const r of i.values()) {
        var e = t - r.StartTime;
        if (e >= r.Duration) {
          i.delete(r.TimeScaleId);
        } else {
          if (r.CenterLocation) {
            var s = this.BulletInfo.CollisionInfo.LastFramePosition;
            if (!s) {
              continue;
            }
            if (Math.abs(s.X - r.CenterLocation.X) > r.Radius || Math.abs(s.Y - r.CenterLocation.Y) > r.Radius || Math.abs(s.Z - r.CenterLocation.Z) > r.Radius) {
              continue;
            }
          }
          BulletUtil_1.BulletUtil.SetTimeScale(this.BulletInfo, r.Priority, r.TimeDilation, r.Curve, r.Duration, r.SourceType, e, r.TimeScaleId);
        }
      }
    }
  }
  OnTick(t) {
    var i = this.BulletInfo.Entity.TimeDilation;
    if (this.BulletInfo.BulletDataMain.TimeScale.TimeScaleWithAttacker) {
      r = this.kVo;
      this.OVo = r.Active ? r.CurrentTimeScale : 1;
      if (this.FVo === this.OVo) {
        return undefined;
      } else {
        this.FVo = this.OVo;
        this.BulletInfo.Actor.CustomTimeDilation = this.OVo;
        EffectUtil_1.EffectUtil.SetEffectTimeScale(this.BulletInfo.EffectInfo.Effect, r, i);
        return;
      }
    }
    for (var e = Time_1.Time.WorldTimeSeconds; !this.BulletInfo.TimeScaleList.Empty && (this.BulletInfo.TimeScaleList.Top.EndTime <= e || this.BulletInfo.TimeScaleList.Top.MarkDelete);) {
      var s = this.BulletInfo.TimeScaleList.Pop();
      this.BulletInfo.TimeScaleMap.delete(s.Id);
    }
    if (this.BulletInfo.TimeScaleList.Empty) {
      this.OVo = 1;
    } else {
      this.OVo = this.BulletInfo.TimeScaleList.Top.CalculateTimeScale();
    }
    i *= this.OVo;
    var r = this.BulletInfo.Attacker?.GetComponent(133)?.GetTopForeverTimeScale(0) ?? ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation;
    this.OVo *= r;
    if (this.FVo !== i || this.zUu !== r) {
      this.FVo = i;
      this.zUu = r;
      this.BulletInfo.Actor.CustomTimeDilation = this.OVo;
      BulletStaticFunction_1.BulletStaticFunction.SetBulletEffectTimeScale(this.BulletInfo.EffectInfo, i, true);
      EffectSystem_1.EffectSystem.SetAdditionTimeScale(14, this.BulletInfo.EffectInfo.Effect, r);
    }
  }
  Clear() {
    super.Clear();
    this.OVo = 0;
    this.kVo = undefined;
    this.FVo = 0;
    this.zUu = 0;
  }
}
exports.BulletActionTimeScale = BulletActionTimeScale;
//# sourceMappingURL=BulletActionTimeScale.js.map