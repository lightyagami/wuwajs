"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GachaViewTypeInfo = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class GachaViewTypeInfo {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Type() {
    return this.type();
  }
  get TagText() {
    return this.tagtext();
  }
  get TagColor() {
    return this.tagcolor();
  }
  get TypeText() {
    return this.typetext();
  }
  get OptionalTitle() {
    return this.optionaltitle();
  }
  get OptionalDesc() {
    return this.optionaldesc();
  }
  get GachaButtonTip() {
    return this.gachabuttontip();
  }
  get GachaLimitTip() {
    return this.gachalimittip();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsGachaViewTypeInfo(t, i) {
    return (i || new GachaViewTypeInfo()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  tagtext(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  tagcolor(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  typetext(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  optionaltitle(t) {
    var i = this.J7.__offset(this.z7, 12);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  optionaldesc(t) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  gachabuttontip(t) {
    var i = this.J7.__offset(this.z7, 16);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  gachalimittip(t) {
    var i = this.J7.__offset(this.z7, 18);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.GachaViewTypeInfo = GachaViewTypeInfo;
//# sourceMappingURL=GachaViewTypeInfo.js.map