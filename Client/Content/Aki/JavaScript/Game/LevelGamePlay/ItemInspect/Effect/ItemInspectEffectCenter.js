"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemInspectEffectCenter = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ItemInspectEffectModifyTipText_1 = require("./ItemInspectEffectModifyTipText");
const ItemInspectEffectPlayPerform_1 = require("./ItemInspectEffectPlayPerform");
const ItemInspectEffectTriggerDialogues_1 = require("./ItemInspectEffectTriggerDialogues");
class ItemInspectEffectDefine {
  constructor() {
    this.f$u = undefined;
    this.g$u = false;
  }
  Init(e, t) {
    this.f$u = e;
    this.g$u = t;
  }
  GetEffect() {
    return new this.f$u();
  }
  IsRepeatable() {
    return this.g$u;
  }
}
class ItemInspectEffectCenter {
  constructor() {
    this.C$u = new Map();
    this.p$u = new Set();
    this.v$u = undefined;
    this.Wmd = undefined;
    this.S$u = (e, t) => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelPlay", 48, "物品检视效果执行完成", ["EffectType", t.GetEffectType()], ["Result", e]);
      }
      this.p$u.delete(t);
      this.kxe();
    };
  }
  Init() {
    this.M$u(0, ItemInspectEffectModifyTipText_1.ItemInspectEffectModifyTipText, true);
    this.M$u(1, ItemInspectEffectPlayPerform_1.ItemInspectEffectPlayPerform);
    this.M$u(2, ItemInspectEffectTriggerDialogues_1.ItemInspectEffectTriggerDialogues, true);
  }
  M$u(e, t, i = false) {
    var s = new ItemInspectEffectDefine();
    s.Init(t, i);
    this.C$u.set(e, s);
  }
  ExecuteEffects(e, t, i, s) {
    this.ClearEffects();
    for (const f of e) {
      var r = this.C$u.get(f.Type);
      if (!!r && (!t || !!r.IsRepeatable())) {
        r = r.GetEffect();
        this.p$u.add(r);
        r.ExecuteEffect(f, this.S$u);
      }
    }
    if (i > 0) {
      this.Wmd = TimerSystem_1.TimerSystem.Delay(() => {
        this.Wmd = undefined;
        this.kxe();
      }, i * MathUtils_1.MathUtils.SecondToMillisecond);
    }
    this.v$u = s;
    this.kxe();
  }
  ClearEffects() {
    this.p$u.clear();
    this.Wmd?.Remove();
    this.Wmd = undefined;
    this.v$u = undefined;
  }
  kxe() {
    if (this.p$u.size === 0 && !this.Wmd) {
      this.v$u?.();
      this.v$u = undefined;
    }
  }
}
exports.ItemInspectEffectCenter = ItemInspectEffectCenter;
//# sourceMappingURL=ItemInspectEffectCenter.js.map