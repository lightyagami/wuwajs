"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SequenceUnlockPointManager = undefined;
const ItemInspectPointManager_1 = require("./ItemInspectPointManager");
class SequenceUnlockPointManager extends ItemInspectPointManager_1.ItemInspectPointManager {
  constructor() {
    super(...arguments);
    this.pQu = 0;
    this.vQu = [];
  }
  Init(t) {
    for (const e of t.Stages) {
      var s = [];
      for (const o of e.InteractPoints) {
        s.push(this.CreatePoint(o));
      }
      this.vQu.push(s);
    }
    if (this.vQu.length > 0) {
      for (const i of this.vQu[0]) {
        i.IsActive = true;
      }
    }
  }
  OnCheckPoint() {
    if (!(this.pQu >= this.vQu.length)) {
      for (const t of this.vQu[this.pQu]) {
        if (!t.IsChecked) {
          return;
        }
      }
      this.pQu++;
      if (!(this.pQu >= this.vQu.length)) {
        for (const s of this.vQu[this.pQu]) {
          s.IsActive = true;
        }
      }
    }
  }
}
exports.SequenceUnlockPointManager = SequenceUnlockPointManager;
//# sourceMappingURL=SequenceUnlockPointManager.js.map