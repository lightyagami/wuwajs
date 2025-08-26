"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemInspectPointManager = undefined;
const ItemInspectPoint_1 = require("./ItemInspectPoint");
class ItemInspectPointManager {
  constructor() {
    this.B$u = new Map();
    this.k$u = 0;
    this.O$u = 0;
  }
  CreatePoint(t) {
    var e = new ItemInspectPoint_1.ItemInspectPoint();
    e.EffectConfigs = t.InteractEffects;
    var n = t.Tag;
    e.TagId = n;
    e.CancelTrace = t.CancelRaycast ?? false;
    e.ProtectTime = t.ProtectTime ?? 0;
    this.B$u.set(n, e);
    var n = t.IsValidPoint;
    if (e.IsValid = n) {
      this.k$u++;
    }
    return e;
  }
  OnCheckPoint() {}
  GetMaxValidCount() {
    return this.k$u;
  }
  GetCheckedValidCount() {
    return this.O$u;
  }
  GetPoint(t) {
    return this.B$u.get(t);
  }
  CheckPoint(t) {
    t = this.B$u.get(t);
    if (t && !t.IsChecked) {
      t.IsChecked = true;
      this.O$u++;
      this.OnCheckPoint();
    }
  }
}
exports.ItemInspectPointManager = ItemInspectPointManager;
//# sourceMappingURL=ItemInspectPointManager.js.map