"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToggleHighlightExploreUi = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ToggleHighlightExploreUi {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(i, t) {
    this.bb_pos = i;
    this.bb = t;
    return this;
  }
  static getRootAsToggleHighlightExploreUi(i, t) {
    return (t || new ToggleHighlightExploreUi()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  static getSizePrefixedRootAsToggleHighlightExploreUi(i, t) {
    i.setPosition(i.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new ToggleHighlightExploreUi()).__init(i.readInt32(i.position()) + i.position(), i);
  }
  type(i) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, i);
    } else {
      return undefined;
    }
  }
  static startToggleHighlightExploreUi(i) {
    i.startObject(1);
  }
  static addType(i, t) {
    i.addFieldOffset(0, t, 0);
  }
  static endToggleHighlightExploreUi(i) {
    return i.endObject();
  }
  static createToggleHighlightExploreUi(i, t) {
    ToggleHighlightExploreUi.startToggleHighlightExploreUi(i);
    ToggleHighlightExploreUi.addType(i, t);
    return ToggleHighlightExploreUi.endToggleHighlightExploreUi(i);
  }
}
exports.ToggleHighlightExploreUi = ToggleHighlightExploreUi;
//# sourceMappingURL=toggle-highlight-explore-ui.js.map