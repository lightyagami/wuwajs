"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiSenseGroup = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const FloatRange_1 = require("./SubType/FloatRange");
class AiSenseGroup {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get LoseDelay() {
    return this.losedelay();
  }
  get AiSenseIds() {
    return GameUtils_1.GameUtils.ConvertToArray(this.aisenseidsLength(), this.aisenseids, this);
  }
  get ShareDis() {
    return this.sharedis();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsAiSenseGroup(t, s) {
    return (s || new AiSenseGroup()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  losedelay(t) {
    var s = this.J7.__offset(this.z7, 6);
    if (s) {
      return (t || new FloatRange_1.FloatRange()).__init(this.J7.__indirect(this.z7 + s), this.J7);
    } else {
      return null;
    }
  }
  GetAisenseidsAt(t) {
    return this.aisenseids(t);
  }
  aisenseids(t) {
    var s = this.J7.__offset(this.z7, 8);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  aisenseidsLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  aisenseidsArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  sharedis() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.AiSenseGroup = AiSenseGroup;
//# sourceMappingURL=AiSenseGroup.js.map