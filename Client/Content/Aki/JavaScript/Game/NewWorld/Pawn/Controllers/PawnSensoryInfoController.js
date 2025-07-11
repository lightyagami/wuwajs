"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SensoryInfoController = undefined;
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
class SensoryInfoController {
  constructor() {
    this._A = 0;
    this.SensoryInfoType = 0;
    this.MaxSensoryRange = 0;
    this.Wrr = new Map();
  }
  Tick(t) {
    if (this.SensoryInfoType & 2) {
      for (const s of this.Wrr) {
        if (s[1].CheckInRange()) {
          s[1].Tick(t);
        }
      }
    }
  }
  HandleEntities(t, s, o) {
    for (const h of this.Wrr) {
      h[1].ClearCacheList();
    }
    for (const n of t) {
      var i = n.Id;
      var r = n.Entity?.GetComponent(1);
      if (n && n.Entity?.Active && r && i !== o) {
        var e = Vector_1.Vector.Distance(r.ActorLocationProxy, s);
        for (const f of this.Wrr) {
          if (!(e > f[1].SensoryRange) && !!f[1].CheckEntity(n.Entity)) {
            f[1].EnterRange(n.Entity);
          }
        }
      }
    }
    for (const c of this.Wrr) {
      c[1].ExitRange();
    }
  }
  AddSensoryInfo(t) {
    this.SensoryInfoType |= t.SensoryInfoType;
    this.MaxSensoryRange = Math.max(this.MaxSensoryRange, t.SensoryRange);
    var s = ++this._A;
    this.Wrr.set(s, t);
    return s;
  }
  RemoveSensoryInfo(t) {
    return !!this.Wrr.has(t) && (this.Wrr.delete(t), this.UpdateInfoType(), this.UpdateSensoryRange(), true);
  }
  UpdateInfoType() {
    this.SensoryInfoType = 0;
    for (const t of this.Wrr) {
      this.SensoryInfoType |= t[1].SensoryInfoType;
    }
  }
  UpdateSensoryRange() {
    this.MaxSensoryRange = 0;
    for (const t of this.Wrr) {
      this.MaxSensoryRange = Math.max(this.MaxSensoryRange, t[1].SensoryRange);
    }
  }
  Clear() {
    this._A = 0;
    this.SensoryInfoType = 0;
    this.MaxSensoryRange = 0;
    for (const t of this.Wrr) {
      t[1].Clear();
    }
    this.Wrr.clear();
  }
}
exports.SensoryInfoController = SensoryInfoController;
//# sourceMappingURL=PawnSensoryInfoController.js.map