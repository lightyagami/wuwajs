"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingNotice = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class FishingNotice {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get AlertCondition() {
    return this.alertcondition();
  }
  get FinishCondition() {
    return this.finishcondition();
  }
  get AlertTip() {
    return this.alerttip();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsFishingNotice(t, i) {
    return (i || new FishingNotice()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  alertcondition() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  finishcondition() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  alerttip(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.FishingNotice = FishingNotice;
//# sourceMappingURL=FishingNotice.js.map