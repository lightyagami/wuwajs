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
  get InstIdList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.instidlistLength(), this.instidlist, this);
  }
  get LinkBuffRoleMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.linkbuffrolemapLength(), this.linkbuffrolemapKey, this.linkbuffrolemapValue, this);
  }
  linkbuffrolemapKey(t) {
    return this.linkbuffrolemap(t)?.key();
  }
  linkbuffrolemapValue(t) {
    return this.linkbuffrolemap(t)?.value();
  }
  get ChangeGenderMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.changegendermapLength(), this.changegendermapKey, this.changegendermapValue, this);
  }
  changegendermapKey(t) {
    return this.changegendermap(t)?.key();
  }
  changegendermapValue(t) {
    return this.changegendermap(t)?.value();
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
  GetInstidlistAt(t) {
    return this.instidlist(t);
  }
  instidlist(t) {
    var i = this.J7.__offset(this.z7, 8);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  instidlistLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  instidlistArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetLinkbuffrolemapAt(t, i) {
    return this.linkbuffrolemap(t);
  }
  linkbuffrolemap(t, i) {
    var s = this.J7.__offset(this.z7, 10);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  linkbuffrolemapLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetChangegendermapAt(t, i) {
    return this.changegendermap(t);
  }
  changegendermap(t, i) {
    var s = this.J7.__offset(this.z7, 12);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  changegendermapLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetMorphmodelidmapAt(t, i) {
    return this.morphmodelidmap(t);
  }
  morphmodelidmap(t, i) {
    var s = this.J7.__offset(this.z7, 14);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  morphmodelidmapLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.LinkParam = LinkParam;
//# sourceMappingURL=LinkParam.js.map