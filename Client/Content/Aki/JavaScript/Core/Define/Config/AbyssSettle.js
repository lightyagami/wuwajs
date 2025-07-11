"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbyssSettle = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntString_1 = require("./SubType/DicIntString");
class AbyssSettle {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get BattleScoreName() {
    return this.battlescorename();
  }
  get IsTotalRatio() {
    return this.istotalratio();
  }
  get BaseTitle() {
    return this.basetitle();
  }
  get Title() {
    return GameUtils_1.GameUtils.ConvertToMap(this.titleLength(), this.titleKey, this.titleValue, this);
  }
  titleKey(t) {
    return this.title(t)?.key();
  }
  titleValue(t) {
    return this.title(t)?.value();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsAbyssSettle(t, i) {
    return (i || new AbyssSettle()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  battlescorename(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  istotalratio() {
    var t = this.J7.__offset(this.z7, 8);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  basetitle(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetTitleAt(t, i) {
    return this.title(t);
  }
  title(t, i) {
    var s = this.J7.__offset(this.z7, 12);
    if (s) {
      return (i || new DicIntString_1.DicIntString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  titleLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.AbyssSettle = AbyssSettle;
//# sourceMappingURL=AbyssSettle.js.map