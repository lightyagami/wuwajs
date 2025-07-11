"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueResBuffPool = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class RogueResBuffPool {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get BuffId() {
    return this.buffid();
  }
  get PerIds() {
    return GameUtils_1.GameUtils.ConvertToArray(this.peridsLength(), this.perids, this);
  }
  get EffectId() {
    return this.effectid();
  }
  get Quality() {
    return this.quality();
  }
  get BuffElement() {
    return GameUtils_1.GameUtils.ConvertToMap(this.buffelementLength(), this.buffelementKey, this.buffelementValue, this);
  }
  buffelementKey(t) {
    return this.buffelement(t)?.key();
  }
  buffelementValue(t) {
    return this.buffelement(t)?.value();
  }
  get BuffIcon() {
    return this.bufficon();
  }
  get BuffDesc() {
    return this.buffdesc();
  }
  get BuffDescParam() {
    return GameUtils_1.GameUtils.ConvertToArray(this.buffdescparamLength(), this.buffdescparam, this);
  }
  get BuffDescSimple() {
    return this.buffdescsimple();
  }
  get BuffName() {
    return this.buffname();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsRogueResBuffPool(t, s) {
    return (s || new RogueResBuffPool()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  buffid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readFloat64(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPeridsAt(t) {
    return this.perids(t);
  }
  perids(t) {
    var s = this.J7.__offset(this.z7, 8);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  peridsLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  peridsArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  effectid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  quality() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 3;
    }
  }
  GetBuffelementAt(t, s) {
    return this.buffelement(t);
  }
  buffelement(t, s) {
    var i = this.J7.__offset(this.z7, 14);
    if (i) {
      return (s || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  buffelementLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  bufficon(t) {
    var s = this.J7.__offset(this.z7, 16);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  buffdesc(t) {
    var s = this.J7.__offset(this.z7, 18);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  GetBuffdescparamAt(t) {
    return this.buffdescparam(t);
  }
  buffdescparam(t, s) {
    var i = this.J7.__offset(this.z7, 20);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  buffdescparamLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  buffdescsimple(t) {
    var s = this.J7.__offset(this.z7, 22);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  buffname(t) {
    var s = this.J7.__offset(this.z7, 24);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.RogueResBuffPool = RogueResBuffPool;
//# sourceMappingURL=RogueResBuffPool.js.map