"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomCollectTaskDesc = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntString_1 = require("./SubType/DicIntString");
class PhantomCollectTaskDesc {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Title() {
    return this.title();
  }
  get Desc() {
    return this.desc();
  }
  get JumpTo() {
    return GameUtils_1.GameUtils.ConvertToMap(this.jumptoLength(), this.jumptoKey, this.jumptoValue, this);
  }
  jumptoKey(t) {
    return this.jumpto(t)?.key();
  }
  jumptoValue(t) {
    return this.jumpto(t)?.value();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsPhantomCollectTaskDesc(t, s) {
    return (s || new PhantomCollectTaskDesc()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  title(t) {
    var s = this.J7.__offset(this.z7, 6);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  desc(t) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  GetJumptoAt(t, s) {
    return this.jumpto(t);
  }
  jumpto(t, s) {
    var i = this.J7.__offset(this.z7, 10);
    if (i) {
      return (s || new DicIntString_1.DicIntString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  jumptoLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.PhantomCollectTaskDesc = PhantomCollectTaskDesc;
//# sourceMappingURL=PhantomCollectTaskDesc.js.map