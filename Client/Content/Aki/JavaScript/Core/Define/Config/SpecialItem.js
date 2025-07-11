"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialItem = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class SpecialItem {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get UseButtonAdditionParam() {
    return GameUtils_1.GameUtils.ConvertToArray(this.usebuttonadditionparamLength(), this.usebuttonadditionparam, this);
  }
  get SpecialItemType() {
    return this.specialitemtype();
  }
  get Parameters() {
    return GameUtils_1.GameUtils.ConvertToArray(this.parametersLength(), this.parameters, this);
  }
  get UseInMultiMode() {
    return this.useinmultimode();
  }
  get UseInstance() {
    return this.useinstance();
  }
  get BanTags() {
    return GameUtils_1.GameUtils.ConvertToArray(this.bantagsLength(), this.bantags, this);
  }
  get AllowTags() {
    return GameUtils_1.GameUtils.ConvertToArray(this.allowtagsLength(), this.allowtags, this);
  }
  get SummonConfigId() {
    return this.summonconfigid();
  }
  get NeedShowNum() {
    return this.needshownum();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsSpecialItem(t, s) {
    return (s || new SpecialItem()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetUsebuttonadditionparamAt(t) {
    return this.usebuttonadditionparam(t);
  }
  usebuttonadditionparam(t) {
    var s = this.J7.__offset(this.z7, 6);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  usebuttonadditionparamLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  usebuttonadditionparamArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  specialitemtype() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetParametersAt(t) {
    return this.parameters(t);
  }
  parameters(t, s) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  parametersLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  useinmultimode() {
    var t = this.J7.__offset(this.z7, 12);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  useinstance() {
    var t = this.J7.__offset(this.z7, 14);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  GetBantagsAt(t) {
    return this.bantags(t);
  }
  bantags(t, s) {
    var i = this.J7.__offset(this.z7, 16);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  bantagsLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetAllowtagsAt(t) {
    return this.allowtags(t);
  }
  allowtags(t, s) {
    var i = this.J7.__offset(this.z7, 18);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  allowtagsLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  summonconfigid() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  needshownum() {
    var t = this.J7.__offset(this.z7, 22);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.SpecialItem = SpecialItem;
//# sourceMappingURL=SpecialItem.js.map