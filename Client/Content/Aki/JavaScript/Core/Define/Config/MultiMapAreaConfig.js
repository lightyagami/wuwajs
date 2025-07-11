"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiMapAreaConfig = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const IntArray_1 = require("./SubType/IntArray");
class MultiMapAreaConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Block() {
    return this.block();
  }
  get MultiMapList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.multimaplistLength(), this.multimaplist, this);
  }
  get MultiMapRangeList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.multimaprangelistLength(), this.multimaprangelist, this);
  }
  get MapConfigId() {
    return this.mapconfigid();
  }
  get GravityFlip() {
    return this.gravityflip();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsMultiMapAreaConfig(t, i) {
    return (i || new MultiMapAreaConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id(t) {
    var i = this.J7.__offset(this.z7, 4);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  block(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetMultimaplistAt(t) {
    return this.multimaplist(t);
  }
  multimaplist(t) {
    var i = this.J7.__offset(this.z7, 8);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  multimaplistLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  multimaplistArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetMultimaprangelistAt(t, i) {
    return this.multimaprangelist(t);
  }
  multimaprangelist(t, i) {
    var s = this.J7.__offset(this.z7, 10);
    if (s) {
      return (i || new IntArray_1.IntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  multimaprangelistLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  mapconfigid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 8;
    }
  }
  gravityflip() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
}
exports.MultiMapAreaConfig = MultiMapAreaConfig;
//# sourceMappingURL=MultiMapAreaConfig.js.map