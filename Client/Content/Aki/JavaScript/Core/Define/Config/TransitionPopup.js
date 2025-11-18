"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransitionPopup = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class TransitionPopup {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Style() {
    return this.style();
  }
  get Title() {
    return this.title();
  }
  get ContentText() {
    return this.contenttext();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsTransitionPopup(t, i) {
    return (i || new TransitionPopup()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  style() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  title(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  contenttext(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.TransitionPopup = TransitionPopup;
//# sourceMappingURL=TransitionPopup.js.map