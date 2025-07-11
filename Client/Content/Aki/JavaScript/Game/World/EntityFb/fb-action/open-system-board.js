"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemBoard = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const photograph_config_js_1 = require("../fb-action/photograph-config.js");
class OpenSystemBoard {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, s) {
    this.bb_pos = t;
    this.bb = s;
    return this;
  }
  static getRootAsOpenSystemBoard(t, s) {
    return (s || new OpenSystemBoard()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsOpenSystemBoard(t, s) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (s || new OpenSystemBoard()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  systemType(t) {
    var s = this.bb.__offset(this.bb_pos, 4);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
    } else {
      return undefined;
    }
  }
  boardId() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  actionMontage(t) {
    var s = this.bb.__offset(this.bb_pos, 8);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
    } else {
      return undefined;
    }
  }
  inputVarsType(t) {
    var s = this.bb.__offset(this.bb_pos, 10);
    if (s) {
      return this.bb.readUint8(this.bb.__vector(this.bb_pos + s) + t);
    } else {
      return 0;
    }
  }
  inputVarsTypeLength() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  inputVarsTypeArray() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  inputVars(t, s) {
    var i = this.bb.__offset(this.bb_pos, 12);
    if (i) {
      return this.bb.__union(s, this.bb.__vector(this.bb_pos + i) + t * 4);
    } else {
      return undefined;
    }
  }
  inputVarsLength() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  photographConfig(t) {
    var s = this.bb.__offset(this.bb_pos, 14);
    if (s) {
      return (t || new photograph_config_js_1.PhotographConfig()).__init(this.bb.__indirect(this.bb_pos + s), this.bb);
    } else {
      return undefined;
    }
  }
  gramophoneId() {
    var t = this.bb.__offset(this.bb_pos, 16);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  fadeInScreenWhenClose() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  syncOpenSystemBoardFinishTiming(t) {
    var s = this.bb.__offset(this.bb_pos, 20);
    if (s) {
      return this.bb.__string(this.bb_pos + s, t);
    } else {
      return undefined;
    }
  }
  static startOpenSystemBoard(t) {
    t.startObject(9);
  }
  static addSystemType(t, s) {
    t.addFieldOffset(0, s, 0);
  }
  static addBoardId(t, s) {
    t.addFieldInt32(1, s, 0);
  }
  static addActionMontage(t, s) {
    t.addFieldOffset(2, s, 0);
  }
  static addInputVarsType(t, s) {
    t.addFieldOffset(3, s, 0);
  }
  static createInputVarsTypeVector(s, i) {
    s.startVector(1, i.length, 1);
    for (let t = i.length - 1; t >= 0; t--) {
      s.addInt8(i[t]);
    }
    return s.endVector();
  }
  static startInputVarsTypeVector(t, s) {
    t.startVector(1, s, 1);
  }
  static addInputVars(t, s) {
    t.addFieldOffset(4, s, 0);
  }
  static createInputVarsVector(s, i) {
    s.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      s.addOffset(i[t]);
    }
    return s.endVector();
  }
  static startInputVarsVector(t, s) {
    t.startVector(4, s, 4);
  }
  static addPhotographConfig(t, s) {
    t.addFieldOffset(5, s, 0);
  }
  static addGramophoneId(t, s) {
    t.addFieldInt32(6, s, 0);
  }
  static addFadeInScreenWhenClose(t, s) {
    t.addFieldInt8(7, +s, 0);
  }
  static addSyncOpenSystemBoardFinishTiming(t, s) {
    t.addFieldOffset(8, s, 0);
  }
  static endOpenSystemBoard(t) {
    return t.endObject();
  }
}
exports.OpenSystemBoard = OpenSystemBoard;
//# sourceMappingURL=open-system-board.js.map