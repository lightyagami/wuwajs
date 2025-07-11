"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BabelTowerDeTermMutex = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class BabelTowerDeTermMutex {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get MutexDeTermGroup() {
    return GameUtils_1.GameUtils.ConvertToArray(this.mutexdetermgroupLength(), this.mutexdetermgroup, this);
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsBabelTowerDeTermMutex(t, e) {
    return (e || new BabelTowerDeTermMutex()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetMutexdetermgroupAt(t) {
    return this.mutexdetermgroup(t);
  }
  mutexdetermgroup(t) {
    var e = this.J7.__offset(this.z7, 6);
    if (e) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  mutexdetermgroupLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  mutexdetermgroupArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.BabelTowerDeTermMutex = BabelTowerDeTermMutex;
//# sourceMappingURL=BabelTowerDeTermMutex.js.map