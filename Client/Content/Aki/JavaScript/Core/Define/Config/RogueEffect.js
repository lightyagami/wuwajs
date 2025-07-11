"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueEffect = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RogueEffect {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get MainEffectType() {
    return this.maineffecttype();
  }
  get Condition() {
    return this.condition();
  }
  get ConditionArgs() {
    return GameUtils_1.GameUtils.ConvertToArray(this.conditionargsLength(), this.conditionargs, this);
  }
  get Count() {
    return this.count();
  }
  get RoomCount() {
    return this.roomcount();
  }
  get BuffArray1() {
    return GameUtils_1.GameUtils.ConvertToArray(this.buffarray1Length(), this.buffarray1, this);
  }
  get ExtraEffectTypeArray1() {
    return GameUtils_1.GameUtils.ConvertToArray(this.extraeffecttypearray1Length(), this.extraeffecttypearray1, this);
  }
  get ExtraEffectTypeArgsArray1() {
    return GameUtils_1.GameUtils.ConvertToArray(this.extraeffecttypeargsarray1Length(), this.extraeffecttypeargsarray1, this);
  }
  get BuffArray2() {
    return GameUtils_1.GameUtils.ConvertToArray(this.buffarray2Length(), this.buffarray2, this);
  }
  get ExtraEffectTypeArray2() {
    return GameUtils_1.GameUtils.ConvertToArray(this.extraeffecttypearray2Length(), this.extraeffecttypearray2, this);
  }
  get ExtraEffectTypeArgsArray2() {
    return GameUtils_1.GameUtils.ConvertToArray(this.extraeffecttypeargsarray2Length(), this.extraeffecttypeargsarray2, this);
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsRogueEffect(t, r) {
    return (r || new RogueEffect()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maineffecttype() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  condition() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetConditionargsAt(t) {
    return this.conditionargs(t);
  }
  conditionargs(t) {
    var r = this.J7.__offset(this.z7, 10);
    if (r) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + r) + t * 4);
    } else {
      return 0;
    }
  }
  conditionargsLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  conditionargsArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  count() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  roomcount() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetBuffarray1At(t) {
    return this.buffarray1(t);
  }
  buffarray1(t) {
    var r = this.J7.__offset(this.z7, 16);
    if (r) {
      return this.J7.readFloat64(this.J7.__vector(this.z7 + r) + t * 8);
    } else {
      return 0;
    }
  }
  buffarray1Length() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  buffarray1Array() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return new Float64Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetExtraeffecttypearray1At(t) {
    return this.extraeffecttypearray1(t);
  }
  extraeffecttypearray1(t, r) {
    var s = this.J7.__offset(this.z7, 18);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, r) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  extraeffecttypearray1Length() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetExtraeffecttypeargsarray1At(t) {
    return this.extraeffecttypeargsarray1(t);
  }
  extraeffecttypeargsarray1(t, r) {
    var s = this.J7.__offset(this.z7, 20);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, r) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  extraeffecttypeargsarray1Length() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetBuffarray2At(t) {
    return this.buffarray2(t);
  }
  buffarray2(t) {
    var r = this.J7.__offset(this.z7, 22);
    if (r) {
      return this.J7.readFloat64(this.J7.__vector(this.z7 + r) + t * 8);
    } else {
      return 0;
    }
  }
  buffarray2Length() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  buffarray2Array() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return new Float64Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetExtraeffecttypearray2At(t) {
    return this.extraeffecttypearray2(t);
  }
  extraeffecttypearray2(t, r) {
    var s = this.J7.__offset(this.z7, 24);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, r) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  extraeffecttypearray2Length() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetExtraeffecttypeargsarray2At(t) {
    return this.extraeffecttypeargsarray2(t);
  }
  extraeffecttypeargsarray2(t, r) {
    var s = this.J7.__offset(this.z7, 26);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, r) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  extraeffecttypeargsarray2Length() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.RogueEffect = RogueEffect;
//# sourceMappingURL=RogueEffect.js.map