"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemInspectEffectBase = undefined;
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
class ItemInspectEffectBase {
  constructor() {
    this.OPt = undefined;
    this.Uxe = undefined;
  }
  ExecuteEffect(t, e) {
    this.OPt = t;
    this.Uxe = e;
    e = t.DelayTime ?? 0;
    if (e <= 0) {
      this.Execute(t);
    } else {
      TimerSystem_1.TimerSystem.Delay(() => {
        this.Execute(t);
      }, e * MathUtils_1.MathUtils.SecondToMillisecond);
    }
  }
  GetEffectType() {
    return this.OPt?.Type;
  }
  FinishExecute(t) {
    this.Uxe?.(t, this);
  }
}
exports.ItemInspectEffectBase = ItemInspectEffectBase;
//# sourceMappingURL=ItemInspectEffectBase.js.map