"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkParam = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
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
  get MorphModelIdMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.morphmodelidmapLength(), this.morphmodelidmapKey, this.morphmodelidmapValue, this);
  }
  morphmodelidmapKey(t) {
    return this.morphmodelidmap(t)?.key();
  }
  morphmodelidmapValue(t) {
    return this.morphmodelidmap(t)?.value();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsLinkParam(t, i) {
    return (i || new LinkParam()).__init(t.readInt32(t.position()) + t.position(), t);
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
    var i = this.J7.__offset(this.z7, 6);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
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
  GetMorphmodelidmapAt(t, i) {
    return this.morphmodelidmap(t);
  }
  morphmodelidmap(t, i) {
    var s = this.J7.__offset(this.z7, 8);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  morphmodelidmapLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.LinkParam = LinkParam;
//# sourceMappingURL=LinkParam.js.map