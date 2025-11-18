"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BabelTalent = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class BabelTalent {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ActivityId() {
    return this.activityid();
  }
  get PreId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.preidLength(), this.preid, this);
  }
  get ConsumeItems() {
    return GameUtils_1.GameUtils.ConvertToMap(this.consumeitemsLength(), this.consumeitemsKey, this.consumeitemsValue, this);
  }
  consumeitemsKey(t) {
    return this.consumeitems(t)?.key();
  }
  consumeitemsValue(t) {
    return this.consumeitems(t)?.value();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsBabelTalent(t, i) {
    return (i || new BabelTalent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPreidAt(t) {
    return this.preid(t);
  }
  preid(t) {
    var i = this.J7.__offset(this.z7, 8);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  preidLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  preidArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetConsumeitemsAt(t, i) {
    return this.consumeitems(t);
  }
  consumeitems(t, i) {
    var s = this.J7.__offset(this.z7, 10);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  consumeitemsLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.BabelTalent = BabelTalent;
//# sourceMappingURL=BabelTalent.js.map