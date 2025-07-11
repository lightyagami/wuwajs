"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const patrol_js_1 = require("../fb-component/patrol.js");
const union_init_state_js_1 = require("../fb-component/union-init-state.js");
class AiComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsAiComponent(t, i) {
    return (i || new AiComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsAiComponent(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new AiComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  aiId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  patrol(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return (t || new patrol_js_1.Patrol()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  initStateType() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_init_state_js_1.UnionInitState.NONE;
    }
  }
  initState(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  centerPoint() {
    var t = this.bb.__offset(this.bb_pos, 14);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  initBlackBoardType(t) {
    var i = this.bb.__offset(this.bb_pos, 16);
    if (i) {
      return this.bb.readUint8(this.bb.__vector(this.bb_pos + i) + t);
    } else {
      return 0;
    }
  }
  initBlackBoardTypeLength() {
    var t = this.bb.__offset(this.bb_pos, 16);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  initBlackBoardTypeArray() {
    var t = this.bb.__offset(this.bb_pos, 16);
    if (t) {
      return new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  initBlackBoard(t, i) {
    var s = this.bb.__offset(this.bb_pos, 18);
    if (s) {
      return this.bb.__union(i, this.bb.__vector(this.bb_pos + s) + t * 4);
    } else {
      return undefined;
    }
  }
  initBlackBoardLength() {
    var t = this.bb.__offset(this.bb_pos, 18);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  weaponId(t) {
    var i = this.bb.__offset(this.bb_pos, 20);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  aiTeamLevelId() {
    var t = this.bb.__offset(this.bb_pos, 22);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startAiComponent(t) {
    t.startObject(10);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addAiId(t, i) {
    t.addFieldInt32(1, i, 0);
  }
  static addPatrol(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addInitStateType(t, i) {
    t.addFieldInt8(3, i, union_init_state_js_1.UnionInitState.NONE);
  }
  static addInitState(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static addCenterPoint(t, i) {
    t.addFieldInt32(5, i, 0);
  }
  static addInitBlackBoardType(t, i) {
    t.addFieldOffset(6, i, 0);
  }
  static createInitBlackBoardTypeVector(i, s) {
    i.startVector(1, s.length, 1);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addInt8(s[t]);
    }
    return i.endVector();
  }
  static startInitBlackBoardTypeVector(t, i) {
    t.startVector(1, i, 1);
  }
  static addInitBlackBoard(t, i) {
    t.addFieldOffset(7, i, 0);
  }
  static createInitBlackBoardVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addOffset(s[t]);
    }
    return i.endVector();
  }
  static startInitBlackBoardVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addWeaponId(t, i) {
    t.addFieldOffset(8, i, 0);
  }
  static addAiTeamLevelId(t, i) {
    t.addFieldInt32(9, i, 0);
  }
  static endAiComponent(t) {
    return t.endObject();
  }
}
exports.AiComponent = AiComponent;
//# sourceMappingURL=ai-component.js.map