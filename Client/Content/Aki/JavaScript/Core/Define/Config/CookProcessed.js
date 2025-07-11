"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CookProcessed = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
const OneItemConfig_1 = require("./SubType/OneItemConfig");
class CookProcessed {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get FinalItemId() {
    return this.finalitemid();
  }
  get Unlock() {
    return this.unlock();
  }
  get Name() {
    return this.name();
  }
  get ConsumeItemsId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.consumeitemsidLength(), this.consumeitemsid, this);
  }
  get LeastItemId() {
    return GameUtils_1.GameUtils.ConvertToMap(this.leastitemidLength(), this.leastitemidKey, this.leastitemidValue, this);
  }
  leastitemidKey(t) {
    return this.leastitemid(t)?.key();
  }
  leastitemidValue(t) {
    return this.leastitemid(t)?.value();
  }
  get InterationId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.interationidLength(), this.interationid, this);
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsCookProcessed(t, i) {
    return (i || new CookProcessed()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  finalitemid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  unlock() {
    var t = this.J7.__offset(this.z7, 8);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetConsumeitemsidAt(t, i) {
    return this.consumeitemsid(t);
  }
  consumeitemsid(t, i) {
    var s = this.J7.__offset(this.z7, 12);
    if (s) {
      return (i || new OneItemConfig_1.OneItemConfig()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  consumeitemsidLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetLeastitemidAt(t, i) {
    return this.leastitemid(t);
  }
  leastitemid(t, i) {
    var s = this.J7.__offset(this.z7, 14);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  leastitemidLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetInterationidAt(t) {
    return this.interationid(t);
  }
  interationid(t) {
    var i = this.J7.__offset(this.z7, 16);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  interationidLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  interationidArray() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.CookProcessed = CookProcessed;
//# sourceMappingURL=CookProcessed.js.map