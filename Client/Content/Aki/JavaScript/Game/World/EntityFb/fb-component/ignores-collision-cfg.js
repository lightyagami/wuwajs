"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IgnoresCollisionCfg = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const actor_ref_js_1 = require("../fb-actor/actor-ref.js");
class IgnoresCollisionCfg {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsIgnoresCollisionCfg(t, s) {
    return (s || new IgnoresCollisionCfg()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsIgnoresCollisionCfg(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new IgnoresCollisionCfg()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  ignoreEntitys(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + s) + t * 4);
    } else {
      return 0;
    }
  }
  ignoreEntitysLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  ignoreEntitysArray() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  ignoreActors(t, s) {
    var r = this.bb.__offset(this.bb_pos, 6);
    if (r) {
      return (s || new actor_ref_js_1.ActorRef()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  ignoreActorsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startIgnoresCollisionCfg(t) {
    t.startObject(2);
  }
  static addIgnoreEntitys(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static createIgnoreEntitysVector(s, r) {
    s.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      s.addInt32(r[t]);
    }
    return s.endVector();
  }
  static startIgnoreEntitysVector(t, s) {
    t.startVector(4, s, 4);
  }
  static addIgnoreActors(t, s) {
    t.addFieldOffset(1, s, 0);
  }
  static createIgnoreActorsVector(s, r) {
    s.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      s.addOffset(r[t]);
    }
    return s.endVector();
  }
  static startIgnoreActorsVector(t, s) {
    t.startVector(4, s, 4);
  }
  static endIgnoresCollisionCfg(t) {
    return t.endObject();
  }
  static createIgnoresCollisionCfg(t, s, r) {
    IgnoresCollisionCfg.startIgnoresCollisionCfg(t);
    IgnoresCollisionCfg.addIgnoreEntitys(t, s);
    IgnoresCollisionCfg.addIgnoreActors(t, r);
    return IgnoresCollisionCfg.endIgnoresCollisionCfg(t);
  }
}
exports.IgnoresCollisionCfg = IgnoresCollisionCfg;
//# sourceMappingURL=ignores-collision-cfg.js.map