"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAiTaskPlayMontage = undefined;
const LevelAiTask_1 = require("../LevelAiTask");
class LevelAiTaskPlayMontage extends LevelAiTask_1.LevelAiTask {
  constructor() {
    super(...arguments);
    this.NTe = 0;
    this.OTe = 0;
    this.ZV_ = -1;
  }
  ExecuteTask() {
    const t = this.Params;
    if (!t) {
      return 1;
    }
    this.NTe = t.LoopDuration ?? 0;
    this.OTe = t.RepeatTimes ?? 0;
    const e = this.CreatureDataComponent.Entity;
    var s = e.GetComponent(46);
    var i = {
      IsAbp: t.IsAbpMontage,
      MontageId: t.MontageId
    };
    var r = s.GetMontageStateParam(i);
    var i = s.GetMontagePath(i);
    if (!i) {
      return 1;
    }
    let a = false;
    this.ZV_ = s.VolatileMontagePlayByLoad(3, i, r, s => {
      if (s && t.FaceExpressionId) {
        e?.GetComponent(187)?.ExpressionController?.ChangeFaceForExpression(s, t.FaceExpressionId);
      }
    }, s => {
      if (a) {
        this.FinishLatentTask(0);
      } else {
        a = true;
      }
    }, this.NTe, this.OTe);
    if (a) {
      return 0;
    } else {
      a = true;
      return 3;
    }
  }
  AbortTask() {
    this.CreatureDataComponent.Entity.GetComponent(46).VolatileMontageStopByLoad(3, this.ZV_, 0);
    return 2;
  }
}
exports.LevelAiTaskPlayMontage = LevelAiTaskPlayMontage;
//# sourceMappingURL=LevelAiTaskPlayMontage.js.map