"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CiacconaGalChoice = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class CiacconaGalChoice {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Content() {
    return this.content();
  }
  get RequiredInspiration() {
    return this.requiredinspiration();
  }
  get UnlockCondition() {
    return this.unlockcondition();
  }
  get ToStep() {
    return this.tostep();
  }
  get CorrSubEnding() {
    return this.corrsubending();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsCiacconaGalChoice(t, i) {
    return (i || new CiacconaGalChoice()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  content(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  requiredinspiration() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  unlockcondition() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  tostep() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  corrsubending() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.CiacconaGalChoice = CiacconaGalChoice;
//# sourceMappingURL=CiacconaGalChoice.js.map