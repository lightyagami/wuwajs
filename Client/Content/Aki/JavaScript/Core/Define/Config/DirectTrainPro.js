"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DirectTrainPro = void 0;
class DirectTrainPro {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Id() {
    return this.id()
  }
  __init(t, r) {
    return this.z7 = t, this.J7 = r, this
  }
  static getRootAsDirectTrainPro(t, r) {
    return (r || new DirectTrainPro).__init(t.readInt32(t.position()) + t.position(), t)
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
}
exports.DirectTrainPro = DirectTrainPro;
//# sourceMappingURL=DirectTrainPro.js.map