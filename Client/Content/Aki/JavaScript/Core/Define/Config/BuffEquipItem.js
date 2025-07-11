"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuffEquipItem = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class BuffEquipItem {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ItemId() {
    return this.itemid();
  }
  get RoleId() {
    return this.roleid();
  }
  get Buffs() {
    return GameUtils_1.GameUtils.ConvertToArray(this.buffsLength(), this.buffs, this);
  }
  get EquipTips() {
    return this.equiptips();
  }
  get UnEquipTips() {
    return this.unequiptips();
  }
  get EnableInUI() {
    return this.enableinui();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsBuffEquipItem(t, i) {
    return (i || new BuffEquipItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  itemid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  roleid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetBuffsAt(t) {
    return this.buffs(t);
  }
  buffs(t) {
    var i = this.J7.__offset(this.z7, 10);
    if (i) {
      return this.J7.readFloat64(this.J7.__vector(this.z7 + i) + t * 8);
    } else {
      return 0;
    }
  }
  buffsLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  buffsArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Float64Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  equiptips(t) {
    var i = this.J7.__offset(this.z7, 12);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  unequiptips(t) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  enableinui() {
    var t = this.J7.__offset(this.z7, 16);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
}
exports.BuffEquipItem = BuffEquipItem;
//# sourceMappingURL=BuffEquipItem.js.map