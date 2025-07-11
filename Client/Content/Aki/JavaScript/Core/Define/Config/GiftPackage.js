"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GiftPackage = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
const GiftType_1 = require("./SubType/GiftType");
class GiftPackage {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Type() {
    return this.type();
  }
  get Content() {
    return GameUtils_1.GameUtils.ConvertToMap(this.contentLength(), this.contentKey, this.contentValue, this);
  }
  contentKey(t) {
    return this.content(t)?.key();
  }
  contentValue(t) {
    return this.content(t)?.value();
  }
  get Weight() {
    return GameUtils_1.GameUtils.ConvertToMap(this.weightLength(), this.weightKey, this.weightValue, this);
  }
  weightKey(t) {
    return this.weight(t)?.key();
  }
  weightValue(t) {
    return this.weight(t)?.value();
  }
  get AvailableNum() {
    return this.availablenum();
  }
  get ShowType() {
    return this.showtype();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsGiftPackage(t, i) {
    return (i || new GiftPackage()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  type() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt8(this.z7 + t);
    } else {
      return GiftType_1.GiftType.Fixed;
    }
  }
  GetContentAt(t, i) {
    return this.content(t);
  }
  content(t, i) {
    var e = this.J7.__offset(this.z7, 8);
    if (e) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + e) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  contentLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetWeightAt(t, i) {
    return this.weight(t);
  }
  weight(t, i) {
    var e = this.J7.__offset(this.z7, 10);
    if (e) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + e) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  weightLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  availablenum() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  showtype() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.GiftPackage = GiftPackage;
//# sourceMappingURL=GiftPackage.js.map