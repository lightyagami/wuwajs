"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemExchangeContent = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class ItemExchangeContent {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ItemId() {
    return this.itemid();
  }
  get Times() {
    return this.times();
  }
  get GainCount() {
    return this.gaincount();
  }
  get Consume() {
    return GameUtils_1.GameUtils.ConvertToMap(this.consumeLength(), this.consumeKey, this.consumeValue, this);
  }
  consumeKey(t) {
    return this.consume(t)?.key();
  }
  consumeValue(t) {
    return this.consume(t)?.value();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsItemExchangeContent(t, e) {
    return (e || new ItemExchangeContent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  itemid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  times() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  gaincount() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetConsumeAt(t, e) {
    return this.consume(t);
  }
  consume(t, e) {
    var s = this.J7.__offset(this.z7, 10);
    if (s) {
      return (e || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  consumeLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.ItemExchangeContent = ItemExchangeContent;
//# sourceMappingURL=ItemExchangeContent.js.map