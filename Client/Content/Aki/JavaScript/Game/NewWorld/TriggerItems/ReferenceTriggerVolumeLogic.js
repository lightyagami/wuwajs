"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReferenceTriggerVolumeLogic = undefined;
const puerts_1 = require("puerts");
const RoleTriggerController_1 = require("../Character/Role/RoleTriggerController");
const VALID_LEN = 3;
class ReferenceTriggerVolumeLogic {
  constructor(e) {
    this.Ksr = new Map();
    this.Qsr = new Set();
    this.yu1 = new Set();
    this.$sr = [];
    for (const r of e) {
      var t = r.PathName.split(".");
      if (t?.length === VALID_LEN) {
        this.Qsr.add(t[1] + "." + t[2]);
      }
    }
  }
  AddVolume(e, t) {
    if (this.Qsr.has(e)) {
      this.Vr(e, t);
      this.Ksr.set(e, t);
    }
  }
  RemoveVolume(e) {
    if (this.Qsr.has(e)) {
      this.kre(e, this.Ksr.get(e));
      this.Ksr.delete(e);
      this.yu1.delete(e);
    }
  }
  GetVolumes() {
    var e = [];
    for (const t of this.Ksr.values()) {
      if (t.IsValid()) {
        e.push(t);
      }
    }
    return e;
  }
  Clear() {
    for (var [e, t] of this.Ksr) {
      this.kre(e, t);
    }
    if (this.yu1.size) {
      this.yu1.clear();
      this.Ysr(false);
    }
    this.Qsr.clear();
    this.Ksr.clear();
    this.$sr.length = 0;
  }
  Destroy() {
    this.Clear();
  }
  IsPlayerOverlapped() {
    return this.yu1.size > 0;
  }
  AddOnPlayerOverlapCallback(e, t = false) {
    this.$sr.push(e);
    if (this.yu1.size && t) {
      e(true);
    }
  }
  RemoveOnPlayerOverlapCallback(e) {
    e = this.$sr.indexOf(e);
    if (!(e < 0)) {
      this.$sr.splice(e, 1);
    }
  }
  OnCollisionEnterFunc(e, t) {
    if (this.Jsr(t)) {
      t = this.yu1.size;
      this.yu1.add(e);
      if (!t) {
        this.Ysr(true);
      }
    }
  }
  OnCollisionExitFunc(e, t) {
    if (this.Jsr(t)) {
      this.yu1.delete(e);
      if (!this.yu1.size) {
        this.Ysr(false);
      }
    }
  }
  Jsr(e) {
    return e === RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger();
  }
  Vr(r, e) {
    if (e?.IsValid()) {
      var t = (0, puerts_1.$ref)(undefined);
      e.GetOverlappingActors(t);
      var i = (0, puerts_1.$unref)(t);
      if (i?.Num() > 0) {
        for (let e = 0, t = i.Num(); e < t; e++) {
          var s = i.Get(e);
          this.OnCollisionEnterFunc(r, s);
        }
      }
      e.OnActorBeginOverlap.Add((e, t) => {
        this.OnCollisionEnterFunc(r, t);
      });
      e.OnActorEndOverlap.Add((e, t) => {
        this.OnCollisionExitFunc(r, t);
      });
    }
  }
  kre(e, t) {
    if (t?.IsValid()) {
      if (this.yu1.has(e)) {
        this.OnCollisionExitFunc(e, RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger());
      }
      t.OnActorBeginOverlap.Clear();
      t.OnActorEndOverlap.Clear();
    }
  }
  Ysr(t) {
    if (this.$sr?.length) {
      for (let e = this.$sr.length - 1; e >= 0; e--) {
        (0, this.$sr[e])(t);
      }
    }
  }
}
exports.ReferenceTriggerVolumeLogic = ReferenceTriggerVolumeLogic;
//# sourceMappingURL=ReferenceTriggerVolumeLogic.js.map