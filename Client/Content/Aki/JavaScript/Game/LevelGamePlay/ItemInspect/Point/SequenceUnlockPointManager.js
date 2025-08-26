"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SequenceUnlockPointManager = undefined;
const ItemInspectPointManager_1 = require("./ItemInspectPointManager");
class SequenceUnlockPointManager extends ItemInspectPointManager_1.ItemInspectPointManager {
  constructor() {
    super(...arguments);
    this.q$u = 0;
    this.G$u = [];
  }
  Init(t) {
    for (const e of t.Stages) {
      var s = [];
      for (const o of e.InteractPoints) {
        s.push(this.CreatePoint(o));
      }
      this.G$u.push(s);
    }
    if (this.G$u.length > 0) {
      for (const i of this.G$u[0]) {
        i.IsActive = true;
      }
    }
  }
  OnCheckPoint() {
    if (!(this.q$u >= this.G$u.length)) {
      for (const t of this.G$u[this.q$u]) {
        if (!t.IsChecked) {
          return;
        }
      }
      this.q$u++;
      if (!(this.q$u >= this.G$u.length)) {
        for (const s of this.G$u[this.q$u]) {
          s.IsActive = true;
        }
      }
    }
  }
}
exports.SequenceUnlockPointManager = SequenceUnlockPointManager;
//# sourceMappingURL=SequenceUnlockPointManager.js.map