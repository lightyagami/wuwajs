"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcAwakeShow = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const montage_id_js_1 = require("../fb-action/montage-id.js");
class NpcAwakeShow {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsNpcAwakeShow(t, e) {
    return (e || new NpcAwakeShow()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsNpcAwakeShow(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new NpcAwakeShow()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  registeredMontageId(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return (t || new montage_id_js_1.MontageId()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  materialDa(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  static startNpcAwakeShow(t) {
    t.startObject(2);
  }
  static addRegisteredMontageId(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addMaterialDa(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static endNpcAwakeShow(t) {
    return t.endObject();
  }
  static createNpcAwakeShow(t, e, a) {
    NpcAwakeShow.startNpcAwakeShow(t);
    NpcAwakeShow.addRegisteredMontageId(t, e);
    NpcAwakeShow.addMaterialDa(t, a);
    return NpcAwakeShow.endNpcAwakeShow(t);
  }
}
exports.NpcAwakeShow = NpcAwakeShow;
//# sourceMappingURL=npc-awake-show.js.map