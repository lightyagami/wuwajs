"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SwitchSubLevelsDirectly = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class SwitchSubLevelsDirectly {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsSwitchSubLevelsDirectly(t, e) {
    return (e || new SwitchSubLevelsDirectly()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsSwitchSubLevelsDirectly(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new SwitchSubLevelsDirectly()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  loadLevels(t, e) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb.__vector(this.bb_pos + i) + t * 4, e);
    } else {
      return undefined;
    }
  }
  loadLevelsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  unloadLevels(t, e) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return this.bb.__string(this.bb.__vector(this.bb_pos + i) + t * 4, e);
    } else {
      return undefined;
    }
  }
  unloadLevelsLength() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  teleportEntityId() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startSwitchSubLevelsDirectly(t) {
    t.startObject(4);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addLoadLevels(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createLoadLevelsVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addOffset(i[t]);
    }
    return e.endVector();
  }
  static startLoadLevelsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addUnloadLevels(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static createUnloadLevelsVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addOffset(i[t]);
    }
    return e.endVector();
  }
  static startUnloadLevelsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addTeleportEntityId(t, e) {
    t.addFieldInt32(3, e, 0);
  }
  static endSwitchSubLevelsDirectly(t) {
    return t.endObject();
  }
  static createSwitchSubLevelsDirectly(t, e, i, s, r) {
    SwitchSubLevelsDirectly.startSwitchSubLevelsDirectly(t);
    SwitchSubLevelsDirectly.addType(t, e);
    SwitchSubLevelsDirectly.addLoadLevels(t, i);
    SwitchSubLevelsDirectly.addUnloadLevels(t, s);
    SwitchSubLevelsDirectly.addTeleportEntityId(t, r);
    return SwitchSubLevelsDirectly.endSwitchSubLevelsDirectly(t);
  }
}
exports.SwitchSubLevelsDirectly = SwitchSubLevelsDirectly;
//# sourceMappingURL=switch-sub-levels-directly.js.map