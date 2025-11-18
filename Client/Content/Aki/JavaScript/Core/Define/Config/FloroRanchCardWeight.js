"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchCardWeight = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class FloroRanchCardWeight {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ShopRate1() {
    return GameUtils_1.GameUtils.ConvertToArray(this.shoprate1Length(), this.shoprate1, this);
  }
  get ShopRate2() {
    return GameUtils_1.GameUtils.ConvertToArray(this.shoprate2Length(), this.shoprate2, this);
  }
  get ShopRate3() {
    return GameUtils_1.GameUtils.ConvertToArray(this.shoprate3Length(), this.shoprate3, this);
  }
  get ShopRate4() {
    return GameUtils_1.GameUtils.ConvertToArray(this.shoprate4Length(), this.shoprate4, this);
  }
  get ShopRate5() {
    return GameUtils_1.GameUtils.ConvertToArray(this.shoprate5Length(), this.shoprate5, this);
  }
  __init(t, h) {
    this.z7 = t;
    this.J7 = h;
    return this;
  }
  static getRootAsFloroRanchCardWeight(t, h) {
    return (h || new FloroRanchCardWeight()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetShoprate1At(t) {
    return this.shoprate1(t);
  }
  shoprate1(t) {
    var h = this.J7.__offset(this.z7, 6);
    if (h) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + h) + t * 4);
    } else {
      return 0;
    }
  }
  shoprate1Length() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  shoprate1Array() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetShoprate2At(t) {
    return this.shoprate2(t);
  }
  shoprate2(t) {
    var h = this.J7.__offset(this.z7, 8);
    if (h) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + h) + t * 4);
    } else {
      return 0;
    }
  }
  shoprate2Length() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  shoprate2Array() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetShoprate3At(t) {
    return this.shoprate3(t);
  }
  shoprate3(t) {
    var h = this.J7.__offset(this.z7, 10);
    if (h) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + h) + t * 4);
    } else {
      return 0;
    }
  }
  shoprate3Length() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  shoprate3Array() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetShoprate4At(t) {
    return this.shoprate4(t);
  }
  shoprate4(t) {
    var h = this.J7.__offset(this.z7, 12);
    if (h) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + h) + t * 4);
    } else {
      return 0;
    }
  }
  shoprate4Length() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  shoprate4Array() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetShoprate5At(t) {
    return this.shoprate5(t);
  }
  shoprate5(t) {
    var h = this.J7.__offset(this.z7, 14);
    if (h) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + h) + t * 4);
    } else {
      return 0;
    }
  }
  shoprate5Length() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  shoprate5Array() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.FloroRanchCardWeight = FloroRanchCardWeight;
//# sourceMappingURL=FloroRanchCardWeight.js.map