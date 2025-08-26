"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseItemShop = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const IntArray_1 = require("./SubType/IntArray");
class TrapDefenseItemShop {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get RefreshCount() {
    return this.refreshcount();
  }
  get BdDrawActionQuantities() {
    return GameUtils_1.GameUtils.ConvertToArray(this.bddrawactionquantitiesLength(), this.bddrawactionquantities, this);
  }
  get ItemInfos() {
    return GameUtils_1.GameUtils.ConvertToArray(this.iteminfosLength(), this.iteminfos, this);
  }
  get TieredRefreshPrices() {
    return GameUtils_1.GameUtils.ConvertToArray(this.tieredrefreshpricesLength(), this.tieredrefreshprices, this);
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsTrapDefenseItemShop(t, e) {
    return (e || new TrapDefenseItemShop()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  refreshcount() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetBddrawactionquantitiesAt(t, e) {
    return this.bddrawactionquantities(t);
  }
  bddrawactionquantities(t, e) {
    var s = this.J7.__offset(this.z7, 8);
    if (s) {
      return (e || new IntArray_1.IntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  bddrawactionquantitiesLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetIteminfosAt(t, e) {
    return this.iteminfos(t);
  }
  iteminfos(t, e) {
    var s = this.J7.__offset(this.z7, 10);
    if (s) {
      return (e || new IntArray_1.IntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  iteminfosLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetTieredrefreshpricesAt(t) {
    return this.tieredrefreshprices(t);
  }
  tieredrefreshprices(t) {
    var e = this.J7.__offset(this.z7, 12);
    if (e) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  tieredrefreshpricesLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  tieredrefreshpricesArray() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.TrapDefenseItemShop = TrapDefenseItemShop;
//# sourceMappingURL=TrapDefenseItemShop.js.map