"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotoSetup = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntIntArray_1 = require("./SubType/DicIntIntArray");
class PhotoSetup {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ValueType() {
    return this.valuetype();
  }
  get Name() {
    return this.name();
  }
  get Type() {
    return this.type();
  }
  get Options() {
    return GameUtils_1.GameUtils.ConvertToArray(this.optionsLength(), this.options, this);
  }
  get DefaultOptionIndex() {
    return this.defaultoptionindex();
  }
  get SubOptions() {
    return GameUtils_1.GameUtils.ConvertToMap(this.suboptionsLength(), this.suboptionsKey, this.suboptionsValue, this);
  }
  suboptionsKey(t) {
    return this.suboptions(t)?.key();
  }
  suboptionsValue(t) {
    return this.suboptions(t)?.value();
  }
  get ValueRange() {
    return GameUtils_1.GameUtils.ConvertToArray(this.valuerangeLength(), this.valuerange, this);
  }
  get IsReverseSet() {
    return this.isreverseset();
  }
  get ChangeValue() {
    return this.changevalue();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsPhotoSetup(t, s) {
    return (s || new PhotoSetup()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  valuetype() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  type() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetOptionsAt(t) {
    return this.options(t);
  }
  options(t, s) {
    var i = this.J7.__offset(this.z7, 12);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  optionsLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  defaultoptionindex() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  GetSuboptionsAt(t, s) {
    return this.suboptions(t);
  }
  suboptions(t, s) {
    var i = this.J7.__offset(this.z7, 16);
    if (i) {
      return (s || new DicIntIntArray_1.DicIntIntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  suboptionsLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetValuerangeAt(t) {
    return this.valuerange(t);
  }
  valuerange(t) {
    var s = this.J7.__offset(this.z7, 18);
    if (s) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  valuerangeLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  valuerangeArray() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  isreverseset() {
    var t = this.J7.__offset(this.z7, 20);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  changevalue() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0.1;
    }
  }
}
exports.PhotoSetup = PhotoSetup;
//# sourceMappingURL=PhotoSetup.js.map