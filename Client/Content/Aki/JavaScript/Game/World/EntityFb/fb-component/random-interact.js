"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RandomInteract = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const random_interact_option_js_1 = require("../fb-component/random-interact-option.js");
class RandomInteract {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, n) {
    this.bb_pos = t;
    this.bb = n;
    return this;
  }
  static getRootAsRandomInteract(t, n) {
    return (n || new RandomInteract()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsRandomInteract(t, n) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (n || new RandomInteract()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  randomCount() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  options(t, n) {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return (n || new random_interact_option_js_1.RandomInteractOption()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  optionsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startRandomInteract(t) {
    t.startObject(2);
  }
  static addRandomCount(t, n) {
    t.addFieldInt32(0, n, 0);
  }
  static addOptions(t, n) {
    t.addFieldOffset(1, n, 0);
  }
  static createOptionsVector(n, r) {
    n.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      n.addOffset(r[t]);
    }
    return n.endVector();
  }
  static startOptionsVector(t, n) {
    t.startVector(4, n, 4);
  }
  static endRandomInteract(t) {
    return t.endObject();
  }
  static createRandomInteract(t, n, r) {
    RandomInteract.startRandomInteract(t);
    RandomInteract.addRandomCount(t, n);
    RandomInteract.addOptions(t, r);
    return RandomInteract.endRandomInteract(t);
  }
}
exports.RandomInteract = RandomInteract;
//# sourceMappingURL=random-interact.js.map