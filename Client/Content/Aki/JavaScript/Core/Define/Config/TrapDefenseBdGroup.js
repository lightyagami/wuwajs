"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBdGroup = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class TrapDefenseBdGroup {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get BelongBd() {
    return this.belongbd();
  }
  get ShopPrice() {
    return this.shopprice();
  }
  get Quality() {
    return this.quality();
  }
  get PreorderBdGroupIds() {
    return GameUtils_1.GameUtils.ConvertToArray(this.preorderbdgroupidsLength(), this.preorderbdgroupids, this);
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsTrapDefenseBdGroup(t, r) {
    return (r || new TrapDefenseBdGroup()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  belongbd() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  shopprice() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 100;
    }
  }
  quality() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPreorderbdgroupidsAt(t) {
    return this.preorderbdgroupids(t);
  }
  preorderbdgroupids(t) {
    var r = this.J7.__offset(this.z7, 12);
    if (r) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + r) + t * 4);
    } else {
      return 0;
    }
  }
  preorderbdgroupidsLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  preorderbdgroupidsArray() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.TrapDefenseBdGroup = TrapDefenseBdGroup;
//# sourceMappingURL=TrapDefenseBdGroup.js.map