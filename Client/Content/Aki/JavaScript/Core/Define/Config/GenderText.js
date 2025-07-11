"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenderText = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class GenderText {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get MaleText() {
    return this.maletext();
  }
  get FemaleText() {
    return this.femaletext();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsGenderText(t, e) {
    return (e || new GenderText()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  maletext(t) {
    var e = this.J7.__offset(this.z7, 4);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  femaletext(t) {
    var e = this.J7.__offset(this.z7, 6);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.GenderText = GenderText;
//# sourceMappingURL=GenderText.js.map