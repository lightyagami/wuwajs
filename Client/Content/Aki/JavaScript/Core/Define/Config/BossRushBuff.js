"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BossRushBuff = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class BossRushBuff {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get BuffId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.buffidLength(), this.buffid, this);
  }
  get PassiveSkill() {
    return GameUtils_1.GameUtils.ConvertToArray(this.passiveskillLength(), this.passiveskill, this);
  }
  get Texture() {
    return this.texture();
  }
  get Name() {
    return this.name();
  }
  get PopDescIdList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.popdescidlistLength(), this.popdescidlist, this);
  }
  get BuffTitle() {
    return this.bufftitle();
  }
  get BuffDesc() {
    return this.buffdesc();
  }
  get BuffDescParam() {
    return GameUtils_1.GameUtils.ConvertToArray(this.buffdescparamLength(), this.buffdescparam, this);
  }
  get Description() {
    return this.description();
  }
  get DescriptionParam() {
    return GameUtils_1.GameUtils.ConvertToArray(this.descriptionparamLength(), this.descriptionparam, this);
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsBossRushBuff(t, s) {
    return (s || new BossRushBuff()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetBuffidAt(t) {
    return this.buffid(t);
  }
  buffid(t) {
    var s = this.J7.__offset(this.z7, 6);
    if (s) {
      return this.J7.readInt64(this.J7.__vector(this.z7 + s) + t * 8);
    } else {
      return BigInt(0);
    }
  }
  buffidLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPassiveskillAt(t) {
    return this.passiveskill(t);
  }
  passiveskill(t) {
    var s = this.J7.__offset(this.z7, 8);
    if (s) {
      return this.J7.readInt64(this.J7.__vector(this.z7 + s) + t * 8);
    } else {
      return BigInt(0);
    }
  }
  passiveskillLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  texture(t) {
    var s = this.J7.__offset(this.z7, 10);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  name(t) {
    var s = this.J7.__offset(this.z7, 12);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  GetPopdescidlistAt(t) {
    return this.popdescidlist(t);
  }
  popdescidlist(t) {
    var s = this.J7.__offset(this.z7, 14);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  popdescidlistLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  popdescidlistArray() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  bufftitle(t) {
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
  description(t) {
    var s = this.J7.__offset(this.z7, 22);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  GetDescriptionparamAt(t) {
    return this.descriptionparam(t);
  }
  descriptionparam(t, s) {
    var i = this.J7.__offset(this.z7, 24);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  descriptionparamLength() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.BossRushBuff = BossRushBuff;
//# sourceMappingURL=BossRushBuff.js.map