"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ExtraEffectBuffCopy = void 0;
const Log_1 = require("../../../../../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../../../../../Core/Entity/EntitySystem"),
  Macro_1 = require("../../../../../../../Core/Preprocessor/Macro"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  ExtraEffectBase_1 = require("./ExtraEffectBase");
class ExtraEffectBuffCopy extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments), this.BuffIds = [], this.BulletId = 0, this.EntityIds = new Set, this.OnHitLocal = (e, t) => {
      this.RecordHit(t)
    }, this.OnHitRemote = e => {
      this.RecordHit(e)
    }
  }
  InitParameters(e) {
    this.BuffIds = e.ExtraEffectParameters[0].split("#").map(e => Number(e)), this.BulletId = Number(e.ExtraEffectParameters[1])
  }
  AddEvent() {
    var e = this.OwnerEntity;
    e || Log_1.Log.CheckWarn() && Log_1.Log.Warn("Battle", 85, "buff监听实体不存在", ["BuffId", this.BuffId]), EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.CharHitLocal, this.OnHitLocal) || EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.CharHitLocal, this.OnHitLocal), EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.CharHitRemote, this.OnHitRemote) || EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.CharHitRemote, this.OnHitRemote)
  }
  OnCreated() {
    this.EntityIds.clear(), this.AddEvent()
  }
  RecordHit(e) {
    e.BulletId !== this.BulletId || this.EntityIds.has(e.Target.Id) || this.EntityIds.add(e.Target.Id)
  }
  CopyBuff(e, t, s) {
    let i = 0;
    for (var [n, r] of t.entries()) {
      r = r.GetBuffTotalStackById(e);
      s[n] = r, i = Math.max(r, i)
    }
    if (0 !== i)
      for (var [f, E] of t.entries()) {
        f = i - s[f];
        0 < f && E.AddIterativeBuff(e, this.PendingBuff, f, !0, "buff的额外效果:复制buff")
      }
  }
  RemoveEvent() {
    var e = this.OwnerEntity;
    e && (EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.CharHitLocal, this.OnHitLocal) && EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.CharHitLocal, this.OnHitLocal), EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.CharHitRemote, this.OnHitRemote)) && EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.CharHitRemote, this.OnHitRemote)
  }
  OnRemoved(e) {
    if (this.RemoveEvent(), !e) {
      const t = [],
        s = (this.EntityIds.forEach(e => {
          e = EntitySystem_1.EntitySystem.Get(e)?.GetComponent(209);
          e && t.push(e)
        }), []);
      this.BuffIds.forEach(e => {
        this.CopyBuff(e, t, s)
      })
    }
  }
  OnExecute() {}
}
exports.ExtraEffectBuffCopy = ExtraEffectBuffCopy;
//# sourceMappingURL=ExtraEffectBuffCopy.js.map