"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.NpcAwakeShow = void 0;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  montage_id_js_1 = require("../fb-action/montage-id.js");
class NpcAwakeShow {
  constructor() {
    this.bb = void 0, this.bb_pos = 0
  }
  __init(t, e) {
    return this.bb_pos = t, this.bb = e, this
  }
  static getRootAsNpcAwakeShow(t, e) {
    return (e || new NpcAwakeShow).__init(t.readInt32(t.position()) + t.position(), t)
  }
  static getSizePrefixedRootAsNpcAwakeShow(t, e) {
    return t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH), (e || new NpcAwakeShow).__init(t.readInt32(t.position()) + t.position(), t)
  }
  registeredMontageId(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    return e ? (t || new montage_id_js_1.MontageId).__init(this.bb.__indirect(this.bb_pos + e), this.bb) : void 0
  }
  materialDa(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e ? this.bb.__string(this.bb_pos + e, t) : void 0
  }
  static startNpcAwakeShow(t) {
    t.startObject(2)
  }
  static addRegisteredMontageId(t, e) {
    t.addFieldOffset(0, e, 0)
  }
  static addMaterialDa(t, e) {
    t.addFieldOffset(1, e, 0)
  }
  static endNpcAwakeShow(t) {
    return t.endObject()
  }
  static createNpcAwakeShow(t, e, a) {
    return NpcAwakeShow.startNpcAwakeShow(t), NpcAwakeShow.addRegisteredMontageId(t, e), NpcAwakeShow.addMaterialDa(t, a), NpcAwakeShow.endNpcAwakeShow(t)
  }
}
exports.NpcAwakeShow = NpcAwakeShow;
//# sourceMappingURL=npc-awake-show.js.map