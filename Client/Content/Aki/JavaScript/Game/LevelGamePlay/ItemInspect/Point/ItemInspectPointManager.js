"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemInspectPointManager = undefined;
const ItemInspectPoint_1 = require("./ItemInspectPoint");
class ItemInspectPointManager {
  constructor() {
    this.fQu = new Map();
    this.gQu = 0;
    this.CQu = 0;
  }
  CreatePoint(t) {
    var e = new ItemInspectPoint_1.ItemInspectPoint();
    e.EffectConfigs = t.InteractEffects;
    var n = t.Tag;
    e.TagId = n;
    e.CancelTrace = t.CancelRaycast ?? false;
    e.ProtectTime = t.ProtectTime ?? 0;
    this.fQu.set(n, e);
    var n = t.IsValidPoint;
    if (e.IsValid = n) {
      this.gQu++;
    }
    return e;
  }
  OnCheckPoint() {}
  GetMaxValidCount() {
    return this.gQu;
  }
  GetCheckedValidCount() {
    return this.CQu;
  }
  GetPoint(t) {
    return this.fQu.get(t);
  }
  CheckPoint(t) {
    t = this.fQu.get(t);
    if (t && !t.IsChecked) {
      t.IsChecked = true;
      this.CQu++;
      this.OnCheckPoint();
    }
  }
}
exports.ItemInspectPointManager = ItemInspectPointManager;
//# sourceMappingURL=ItemInspectPointManager.js.map