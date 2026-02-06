"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SyncGameplayCue = undefined;
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const CombatLog_1 = require("../../../../../../Utils/CombatLog");
const GameplayCueMagnitude_1 = require("../GameplayCueSFX/GameplayCueMagnitude");
const ExtraEffectBase_1 = require("./ExtraEffectBase");
class SyncGameplayCue extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.f$o = undefined;
    this.Rjg = undefined;
    this.bjg = undefined;
    this.s$g = [];
    this.a$g = (e, t) => {
      if (this.Wjg(t)) {
        if (e) {
          this.h$g(t, true);
        } else {
          this.Sag(t);
        }
      }
    };
  }
  OnExecute() {}
  InitParameters(e) {
    e = e.ExtraEffectParameters;
    if (e) {
      this.s$g = e[0]?.split("#")?.map(e => Number(e)) ?? [];
    }
  }
  OnCreated() {
    if (this.InstigatorEntity?.Valid && this.InstigatorEntityId !== this.OwnerEntity?.Id) {
      this.f$o = this.InstigatorEntity;
      this.Rjg = this.OwnerEntity?.GetComponent(238);
      this.bjg = this.f$o?.Entity?.GetComponent(238);
      if (this.bjg && this.Rjg) {
        this.l$g(this.bjg);
      }
      EventSystem_1.EventSystem.AddWithTarget(this.f$o, EventDefine_1.EEventName.CharGameplayCueChanged, this.a$g);
    } else {
      CombatLog_1.CombatLog.Error("Skill", this.OwnerEntity, "SyncGameplayCue效果的双方不能是同一人", ["Buff", this.BuffId]);
    }
  }
  OnRemoved() {
    if (this.f$o) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.f$o, EventDefine_1.EEventName.CharGameplayCueChanged, this.a$g);
    }
  }
  l$g(e) {
    var t = this.Rjg;
    if (t) {
      var i = new Set();
      for (const a of e.GetAllCurrentCueRef()) {
        i.add(a.CueConfig.Id);
      }
      var s = new Set();
      for (const n of t.GetAllCurrentCueRef()) {
        s.add(n.CueConfig.Id);
      }
      for (const h of i) {
        if (this.Wjg(h)) {
          if (s.has(h)) {
            this.Pjg(h);
          } else {
            this.h$g(h, true);
          }
        }
      }
      for (const r of s) {
        if (!i.has(r) || !this.Wjg(r)) {
          this.Sag(r);
        }
      }
    }
  }
  h$g(e, t) {
    this.Rjg?.AddCue(e);
    if (t) {
      this.Pjg(e);
    }
  }
  Sag(e) {
    this.Rjg?.RemoveCue(e);
  }
  Pjg(e) {
    var t;
    if (this.Rjg && this.bjg && (t = this.Rjg.GetCueByCueId(e), e = this.bjg.GetCueByCueId(e), t instanceof GameplayCueMagnitude_1.GameplayCueMagnitude) && e instanceof GameplayCueMagnitude_1.GameplayCueMagnitude) {
      t.SyncMagnitude(e);
    }
  }
  Wjg(e) {
    return this.s$g.length !== 0 && this.s$g.includes(e);
  }
}
exports.SyncGameplayCue = SyncGameplayCue;
//# sourceMappingURL=ExtraEffectSyncGameplayCue.js.map