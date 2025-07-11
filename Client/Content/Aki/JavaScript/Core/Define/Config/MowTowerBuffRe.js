"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MowTowerBuffRe = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class MowTowerBuffRe {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get BuffId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.buffidLength(), this.buffid, this);
  }
  get Texture() {
    return this.texture();
  }
  get Name() {
    return this.name();
  }
  get Description() {
    return this.description();
  }
  get DescriptionParam() {
    return GameUtils_1.GameUtils.ConvertToArray(this.descriptionparamLength(), this.descriptionparam, this);
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsMowTowerBuffRe(t, i) {
    return (i || new MowTowerBuffRe()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetBuffidAt(t) {
    return this.buffid(t);
  }
  buffid(t) {
    var i = this.J7.__offset(this.z7, 6);
    if (i) {
      return this.J7.readInt64(this.J7.__vector(this.z7 + i) + t * 8);
    } else {
      return BigInt(0);
    }
  }
  buffidLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  texture(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  description(t) {
    var i = this.J7.__offset(this.z7, 12);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetDescriptionparamAt(t) {
    return this.descriptionparam(t);
  }
  descriptionparam(t, i) {
    var s = this.J7.__offset(this.z7, 14);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  descriptionparamLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.MowTowerBuffRe = MowTowerBuffRe;
//# sourceMappingURL=MowTowerBuffRe.js.map