"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleFlagType = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class MoraleFlagType {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get TypeId() {
    return this.typeid();
  }
  get ShowUiMap() {
    return this.showuimap();
  }
  get IconPathNormal() {
    return GameUtils_1.GameUtils.ConvertToArray(this.iconpathnormalLength(), this.iconpathnormal, this);
  }
  get IconPathActive() {
    return GameUtils_1.GameUtils.ConvertToArray(this.iconpathactiveLength(), this.iconpathactive, this);
  }
  get ResId() {
    return this.resid();
  }
  get DescLightPath() {
    return this.desclightpath();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsMoraleFlagType(t, i) {
    return (i || new MoraleFlagType()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  typeid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  showuimap() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetIconpathnormalAt(t) {
    return this.iconpathnormal(t);
  }
  iconpathnormal(t, i) {
    var s = this.J7.__offset(this.z7, 10);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  iconpathnormalLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetIconpathactiveAt(t) {
    return this.iconpathactive(t);
  }
  iconpathactive(t, i) {
    var s = this.J7.__offset(this.z7, 12);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  iconpathactiveLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  resid(t) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  desclightpath(t) {
    var i = this.J7.__offset(this.z7, 16);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.MoraleFlagType = MoraleFlagType;
//# sourceMappingURL=MoraleFlagType.js.map