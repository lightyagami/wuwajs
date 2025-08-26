"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtraEffectBuffCopy = undefined;
const Log_1 = require("../../../../../../../Core/Common/Log");
const EntitySystem_1 = require("../../../../../../../Core/Entity/EntitySystem");
const Macro_1 = require("../../../../../../../Core/Preprocessor/Macro");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const ExtraEffectBase_1 = require("./ExtraEffectBase");
class ExtraEffectBuffCopy extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.BuffIds = [];
    this.BulletId = 0;
    this.EntityIds = new Set();
    this.OnHitLocal = (e, t) => {
      this.RecordHit(t);
    };
    this.OnHitRemote = e => {
      this.RecordHit(e);
    };
  }
  InitParameters(e) {
    this.BuffIds = e.ExtraEffectParameters[0].split("#").map(e => Number(e));
    this.BulletId = Number(e.ExtraEffectParameters[1]);
  }
  AddEvent() {
    var e = this.OwnerEntity;
    if (!e) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Battle", 85, "buff监听实体不存在", ["BuffId", this.BuffId]);
      }
    }
    if (!EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.CharHitLocal, this.OnHitLocal)) {
      EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.CharHitLocal, this.OnHitLocal);
    }
    if (!EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.CharHitRemote, this.OnHitRemote)) {
      EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.CharHitRemote, this.OnHitRemote);
    }
  }
  OnCreated() {
    this.EntityIds.clear();
    this.AddEvent();
  }
  RecordHit(e) {
    if (e.BulletId === this.BulletId && !this.EntityIds.has(e.Target.Id)) {
      this.EntityIds.add(e.Target.Id);
    }
  }
  CopyBuff(e, t, s) {
    let i = 0;
    for (var [n, r] of t.entries()) {
      r = r.GetBuffTotalStackById(e);
      s[n] = r;
      i = Math.max(r, i);
    }
    if (i !== 0) {
      for (var [f, E] of t.entries()) {
        f = i - s[f];
        if (f > 0) {
          E.AddIterativeBuff(e, this.PendingBuff, f, true, "buff的额外效果:复制buff");
        }
      }
    }
  }
  RemoveEvent() {
    var e = this.OwnerEntity;
    if (e && (EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.CharHitLocal, this.OnHitLocal) && EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.CharHitLocal, this.OnHitLocal), EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.CharHitRemote, this.OnHitRemote))) {
      EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.CharHitRemote, this.OnHitRemote);
    }
  }
  OnRemoved(e) {
    this.RemoveEvent();
    const t = [];
    this.EntityIds.forEach(e => {
      e = EntitySystem_1.EntitySystem.Get(e)?.GetComponent(210);
      if (e) {
        t.push(e);
      }
    });
    const s = [];
    this.BuffIds.forEach(e => {
      this.CopyBuff(e, t, s);
    });
  }
  OnExecute() {}
}
exports.ExtraEffectBuffCopy = ExtraEffectBuffCopy;
//# sourceMappingURL=ExtraEffectBuffCopy.js.map