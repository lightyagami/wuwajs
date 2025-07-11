"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivateSpecifiedPieceConfig = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const jigsaw_config_js_1 = require("../fb-action/jigsaw-config.js");
class ActivateSpecifiedPieceConfig {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, e) {
    this.bb_pos = i;
    this.bb = e;
    return this;
  }
  static getRootAsActivateSpecifiedPieceConfig(i, e) {
    return (e || new ActivateSpecifiedPieceConfig()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsActivateSpecifiedPieceConfig(i, e) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new ActivateSpecifiedPieceConfig()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  jigsaw(i) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return (i || new jigsaw_config_js_1.JigsawConfig()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  selfState(i) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.__string(this.bb_pos + e, i);
    } else {
      return undefined;
    }
  }
  static startActivateSpecifiedPieceConfig(i) {
    i.startObject(2);
  }
  static addJigsaw(i, e) {
    i.addFieldOffset(0, e, 0);
  }
  static addSelfState(i, e) {
    i.addFieldOffset(1, e, 0);
  }
  static endActivateSpecifiedPieceConfig(i) {
    return i.endObject();
  }
  static createActivateSpecifiedPieceConfig(i, e, t) {
    ActivateSpecifiedPieceConfig.startActivateSpecifiedPieceConfig(i);
    ActivateSpecifiedPieceConfig.addJigsaw(i, e);
    ActivateSpecifiedPieceConfig.addSelfState(i, t);
    return ActivateSpecifiedPieceConfig.endActivateSpecifiedPieceConfig(i);
  }
}
exports.ActivateSpecifiedPieceConfig = ActivateSpecifiedPieceConfig;
//# sourceMappingURL=activate-specified-piece-config.js.map