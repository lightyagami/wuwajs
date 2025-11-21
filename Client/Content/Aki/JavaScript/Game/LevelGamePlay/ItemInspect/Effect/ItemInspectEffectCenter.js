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
    this.zWu = undefined;
    this.nzu = false;
  }
  Init(e, t) {
    this.zWu = e;
    this.nzu = t;
  }
  GetEffect() {
    return new this.zWu();
  }
  IsRepeatable() {
    return this.nzu;
  }
}
class ItemInspectEffectCenter {
  constructor() {
    this.JWu = new Map();
    this.szu = new Set();
    this.eQu = undefined;
    this.GVd = undefined;
    this.iQu = (e, t) => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelPlay", 48, "物品检视效果执行完成", ["EffectType", t.GetEffectType()], ["Result", e]);
      }
      this.szu.delete(t);
      this.kxe();
    };
  }
  Init() {
    this.oQu(0, ItemInspectEffectModifyTipText_1.ItemInspectEffectModifyTipText, true);
    this.oQu(1, ItemInspectEffectPlayPerform_1.ItemInspectEffectPlayPerform);
    this.oQu(2, ItemInspectEffectTriggerDialogues_1.ItemInspectEffectTriggerDialogues, true);
  }
  oQu(e, t, i = false) {
    var s = new ItemInspectEffectDefine();
    s.Init(t, i);
    this.JWu.set(e, s);
  }
  ExecuteEffects(e, t, i, s) {
    this.ClearEffects();
    for (const f of e) {
      var r = this.JWu.get(f.Type);
      if (!!r && (!t || !!r.IsRepeatable())) {
        r = r.GetEffect();
        this.szu.add(r);
        r.ExecuteEffect(f, this.iQu);
      }
    }
    if (i > 0) {
      this.GVd = TimerSystem_1.TimerSystem.Delay(() => {
        this.GVd = undefined;
        this.kxe();
      }, i * MathUtils_1.MathUtils.SecondToMillisecond);
    }
    this.eQu = s;
    this.kxe();
  }
  ClearEffects() {
    this.szu.clear();
    this.GVd?.Remove();
    this.GVd = undefined;
    this.eQu = undefined;
  }
  kxe() {
    if (this.szu.size === 0 && !this.GVd) {
      this.eQu?.();
      this.eQu = undefined;
    }
  }
}
exports.ItemInspectEffectCenter = ItemInspectEffectCenter;
//# sourceMappingURL=ItemInspectEffectCenter.js.map