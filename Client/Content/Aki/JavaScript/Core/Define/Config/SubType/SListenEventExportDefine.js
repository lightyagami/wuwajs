"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SListenEventExportDefine = undefined;
const GameUtils_1 = require("../../../../Game/GameUtils");
class SListenEventExportDefine {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ListenConfigIds() {
    return GameUtils_1.GameUtils.ConvertToArray(this.listenconfigidsLength(), this.listenconfigids, this);
  }
  get ListenRange() {
    return this.listenrange();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsSListenEventExportDefine(t, i) {
    return (i || new SListenEventExportDefine()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  GetListenconfigidsAt(t) {
    return this.listenconfigids(t);
  }
  listenconfigids(t) {
    var i = this.J7.__offset(this.z7, 4);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  listenconfigidsLength() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  listenconfigidsArray() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  listenrange() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.SListenEventExportDefine = SListenEventExportDefine;
//# sourceMappingURL=SListenEventExportDefine.js.map