"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenericPrompt = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class GenericPrompt {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get TipsId() {
    return this.tipsid();
  }
  get TypeId() {
    return this.typeid();
  }
  get TipsText() {
    return this.tipstext();
  }
  get ExtraText() {
    return this.extratext();
  }
  get Duration() {
    return this.duration();
  }
  get Priority() {
    return this.priority();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsGenericPrompt(t, i) {
    return (i || new GenericPrompt()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  tipsid(t) {
    var i = this.J7.__offset(this.z7, 4);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  typeid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  tipstext(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  extratext(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  duration() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  priority() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.GenericPrompt = GenericPrompt;
//# sourceMappingURL=GenericPrompt.js.map