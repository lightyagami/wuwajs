"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingDelivery = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntIntArray_1 = require("./SubType/DicIntIntArray");
class FishingDelivery {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get NeedItems() {
    return GameUtils_1.GameUtils.ConvertToMap(this.needitemsLength(), this.needitemsKey, this.needitemsValue, this);
  }
  needitemsKey(t) {
    return this.needitems(t)?.key();
  }
  needitemsValue(t) {
    return this.needitems(t)?.value();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsFishingDelivery(t, e) {
    return (e || new FishingDelivery()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetNeeditemsAt(t, e) {
    return this.needitems(t);
  }
  needitems(t, e) {
    var i = this.J7.__offset(this.z7, 6);
    if (i) {
      return (e || new DicIntIntArray_1.DicIntIntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  needitemsLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.FishingDelivery = FishingDelivery;
//# sourceMappingURL=FishingDelivery.js.map