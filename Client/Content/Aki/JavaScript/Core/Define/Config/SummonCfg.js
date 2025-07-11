"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SummonCfg = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntIntArray_1 = require("./SubType/DicIntIntArray");
class SummonCfg {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get BlueprintType() {
    return this.blueprinttype();
  }
  get SurvivalTime() {
    return this.survivaltime();
  }
  get InheritLevelType() {
    return this.inheritleveltype();
  }
  get InheritLevelParam() {
    return this.inheritlevelparam();
  }
  get AttributeType() {
    return this.attributetype();
  }
  get InheritAttributeBaseType() {
    return this.inheritattributebasetype();
  }
  get InheritSummonerAttribute() {
    return GameUtils_1.GameUtils.ConvertToMap(this.inheritsummonerattributeLength(), this.inheritsummonerattributeKey, this.inheritsummonerattributeValue, this);
  }
  inheritsummonerattributeKey(t) {
    return this.inheritsummonerattribute(t)?.key();
  }
  inheritsummonerattributeValue(t) {
    return this.inheritsummonerattribute(t)?.value();
  }
  get UnCalculateBuffAttributes() {
    return GameUtils_1.GameUtils.ConvertToArray(this.uncalculatebuffattributesLength(), this.uncalculatebuffattributes, this);
  }
  get FollowSummonerAttr() {
    return GameUtils_1.GameUtils.ConvertToArray(this.followsummonerattrLength(), this.followsummonerattr, this);
  }
  get BornBuffId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.bornbuffidLength(), this.bornbuffid, this);
  }
  get ShareDamage() {
    return this.sharedamage();
  }
  get InitVisiable() {
    return this.initvisiable();
  }
  get BornSelectDamageAttributeTargetBuff() {
    return GameUtils_1.GameUtils.ConvertToArray(this.bornselectdamageattributetargetbuffLength(), this.bornselectdamageattributetargetbuff, this);
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsSummonCfg(t, i) {
    return (i || new SummonCfg()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  blueprinttype(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  survivaltime() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 3;
    }
  }
  inheritleveltype() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  inheritlevelparam() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  attributetype() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  inheritattributebasetype() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetInheritsummonerattributeAt(t, i) {
    return this.inheritsummonerattribute(t);
  }
  inheritsummonerattribute(t, i) {
    var r = this.J7.__offset(this.z7, 18);
    if (r) {
      return (i || new DicIntIntArray_1.DicIntIntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + r) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  inheritsummonerattributeLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetUncalculatebuffattributesAt(t) {
    return this.uncalculatebuffattributes(t);
  }
  uncalculatebuffattributes(t) {
    var i = this.J7.__offset(this.z7, 20);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  uncalculatebuffattributesLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  uncalculatebuffattributesArray() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetFollowsummonerattrAt(t) {
    return this.followsummonerattr(t);
  }
  followsummonerattr(t) {
    var i = this.J7.__offset(this.z7, 22);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  followsummonerattrLength() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  followsummonerattrArray() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetBornbuffidAt(t) {
    return this.bornbuffid(t);
  }
  bornbuffid(t) {
    var i = this.J7.__offset(this.z7, 24);
    if (i) {
      return this.J7.readFloat64(this.J7.__vector(this.z7 + i) + t * 8);
    } else {
      return 0;
    }
  }
  bornbuffidLength() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  bornbuffidArray() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return new Float64Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  sharedamage() {
    var t = this.J7.__offset(this.z7, 26);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  initvisiable() {
    var t = this.J7.__offset(this.z7, 28);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  GetBornselectdamageattributetargetbuffAt(t) {
    return this.bornselectdamageattributetargetbuff(t);
  }
  bornselectdamageattributetargetbuff(t) {
    var i = this.J7.__offset(this.z7, 30);
    if (i) {
      return this.J7.readFloat64(this.J7.__vector(this.z7 + i) + t * 8);
    } else {
      return 0;
    }
  }
  bornselectdamageattributetargetbuffLength() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  bornselectdamageattributetargetbuffArray() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return new Float64Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.SummonCfg = SummonCfg;
//# sourceMappingURL=SummonCfg.js.map