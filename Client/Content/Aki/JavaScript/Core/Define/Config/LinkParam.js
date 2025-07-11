"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkParam = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class LinkParam {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get InstSubTypeList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.instsubtypelistLength(), this.instsubtypelist, this);
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsLinkParam(t, s) {
    return (s || new LinkParam()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetInstsubtypelistAt(t) {
    return this.instsubtypelist(t);
  }
  instsubtypelist(t) {
    var s = this.J7.__offset(this.z7, 6);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  instsubtypelistLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  instsubtypelistArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.LinkParam = LinkParam;
//# sourceMappingURL=LinkParam.js.map