"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseGaining = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class TrapDefenseGaining {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get GainingType() {
    return this.gainingtype();
  }
  get Buffs() {
    return GameUtils_1.GameUtils.ConvertToArray(this.buffsLength(), this.buffs, this);
  }
  get TowerTypeFilter() {
    return GameUtils_1.GameUtils.ConvertToArray(this.towertypefilterLength(), this.towertypefilter, this);
  }
  get MonsterTypeFilter() {
    return GameUtils_1.GameUtils.ConvertToArray(this.monstertypefilterLength(), this.monstertypefilter, this);
  }
  get Params() {
    return GameUtils_1.GameUtils.ConvertToArray(this.paramsLength(), this.params, this);
  }
  get MapParams() {
    return GameUtils_1.GameUtils.ConvertToMap(this.mapparamsLength(), this.mapparamsKey, this.mapparamsValue, this);
  }
  mapparamsKey(t) {
    return this.mapparams(t)?.key();
  }
  mapparamsValue(t) {
    return this.mapparams(t)?.value();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsTrapDefenseGaining(t, s) {
    return (s || new TrapDefenseGaining()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  gainingtype() {
    var t = this.J7.__offset(this.z7, 6);
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
    var s = this.J7.__offset(this.z7, 8);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  buffsLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  buffsArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetTowertypefilterAt(t) {
    return this.towertypefilter(t);
  }
  towertypefilter(t) {
    var s = this.J7.__offset(this.z7, 10);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  towertypefilterLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  towertypefilterArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetMonstertypefilterAt(t) {
    return this.monstertypefilter(t);
  }
  monstertypefilter(t) {
    var s = this.J7.__offset(this.z7, 12);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  monstertypefilterLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  monstertypefilterArray() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetParamsAt(t) {
    return this.params(t);
  }
  params(t) {
    var s = this.J7.__offset(this.z7, 14);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  paramsLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  paramsArray() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetMapparamsAt(t, s) {
    return this.mapparams(t);
  }
  mapparams(t, s) {
    var i = this.J7.__offset(this.z7, 16);
    if (i) {
      return (s || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  mapparamsLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.TrapDefenseGaining = TrapDefenseGaining;
//# sourceMappingURL=TrapDefenseGaining.js.map