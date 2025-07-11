"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElementReactionMatrix = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class ElementReactionMatrix {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ElementReactionList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.elementreactionlistLength(), this.elementreactionlist, this);
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsElementReactionMatrix(t, e) {
    return (e || new ElementReactionMatrix()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetElementreactionlistAt(t) {
    return this.elementreactionlist(t);
  }
  elementreactionlist(t) {
    var e = this.J7.__offset(this.z7, 6);
    if (e) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  elementreactionlistLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  elementreactionlistArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.ElementReactionMatrix = ElementReactionMatrix;
//# sourceMappingURL=ElementReactionMatrix.js.map