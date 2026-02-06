"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RbBreakableObstacleItemLogic = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const GameSplineUtils_1 = require("../../Common/GameSplineUtils");
const RbItemLogicBase_1 = require("./RbItemLogicBase");
class RbBreakableObstacleItemLogic extends RbItemLogicBase_1.RbItemLogicBase {
  constructor() {
    super(...arguments);
    this.rvi = undefined;
    this.Ijc = undefined;
    this.UAe = Vector_1.Vector.Create(0, 0, 0);
  }
  Start(e) {
    var t = this.Owner.ActorTransform.GetLocation();
    this.Ijc = UE.NewArray(UE.VectorDouble);
    for (const s of e.UPm) {
      this.Ijc.Add(new UE.VectorDouble(s.X ? s.X - t.X : 0, s.Y ? s.Y - t.Y : 0, s.Z ? s.Z - t.Z : 0));
    }
    e = ControllerHolder_1.ControllerHolder.RollBlockController.GameplaySetting?.BreakableObstacleLinkEffect.ToAssetPathName();
    this.UAe.FromUeVector(t);
    if (e) {
      var i = GameSplineUtils_1.GameSplineUtils.GenerateGuideEffect(this.UAe, this.Ijc, e);
      if (i) {
        this.rvi = i.EffectHandle;
        var r = i.SplineComp;
        if (r) {
          var o = r.GetNumberOfSplinePoints();
          for (let e = 0; e < o; e++) {
            r.SetSplinePointType(e, 0, false);
          }
          r.UpdateSpline();
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RollBlock", 31, "[RbBreakableObstacleItemLogic] GenerateGuideEffect failed", ["CreatureDataId", this.Owner.CreatureDataId], ["EffectPath", e]);
      }
    }
  }
  End() {
    if (this.rvi) {
      EffectSystem_1.EffectSystem.StopEffectById(this.rvi, "RbBreakableObstacleItemLogic End", false);
      this.rvi = undefined;
    }
  }
  OnStateChange(e) {
    if (e === -1278190765 || e === -3775711) {
      e = e === -1278190765;
      if (this.rvi) {
        EffectSystem_1.EffectSystem.StopEffectById(this.rvi, "RbBreakableObstacleItemLogic OnStateChange", e);
        this.rvi = undefined;
      }
      if (!e) {
        e = ControllerHolder_1.ControllerHolder.RollBlockController.GameplaySetting?.BreakableObstacleDestroyLinkEffect.ToAssetPathName();
        if (e && this.Ijc) {
          var t = GameSplineUtils_1.GameSplineUtils.GenerateGuideEffect(this.UAe, this.Ijc, e);
          if (t) {
            this.rvi = t.EffectHandle;
            var i = t.SplineComp;
            if (i) {
              var r = i.GetNumberOfSplinePoints();
              for (let e = 0; e < r; e++) {
                i.SetSplinePointType(e, 0, false);
              }
              i.UpdateSpline();
            }
            TimerSystem_1.TimerSystem.Delay(() => {
              if (this.rvi) {
                EffectSystem_1.EffectSystem.StopEffectById(this.rvi, "RbBreakableObstacleItemLogic OnStateChange", false);
                this.rvi = undefined;
              }
            }, ControllerHolder_1.ControllerHolder.RollBlockController.GameplaySetting?.DestroyTime ?? 1000);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("RollBlock", 31, "[RbBreakableObstacleItemLogic] GenerateGuideEffect failed", ["CreatureDataId", this.Owner.CreatureDataId], ["EffectPath", e]);
          }
        }
      }
    }
  }
}
exports.RbBreakableObstacleItemLogic = RbBreakableObstacleItemLogic;
//# sourceMappingURL=RbBreakableObstacleItemLogic.js.map