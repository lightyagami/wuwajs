"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnableSectionalUi = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class EnableSectionalUi {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsEnableSectionalUi(t, i) {
    return (i || new EnableSectionalUi()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEnableSectionalUi(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new EnableSectionalUi()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  showMiniMap() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  showQuestTrack() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  showEsc() {
    var t = this.bb.__offset(this.bb_pos, 10);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  showSystem() {
    var t = this.bb.__offset(this.bb_pos, 12);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  showScreenEffect() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  showOther() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  alwaysShowUiSections(t, i) {
    var e = this.bb.__offset(this.bb_pos, 18);
    if (e) {
      return this.bb.__string(this.bb.__vector(this.bb_pos + e) + t * 4, i);
    } else {
      return undefined;
    }
  }
  alwaysShowUiSectionsLength() {
    var t = this.bb.__offset(this.bb_pos, 18);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startEnableSectionalUi(t) {
    t.startObject(8);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addShowMiniMap(t, i) {
    t.addFieldInt8(1, +i, 0);
  }
  static addShowQuestTrack(t, i) {
    t.addFieldInt8(2, +i, 0);
  }
  static addShowEsc(t, i) {
    t.addFieldInt8(3, +i, 0);
  }
  static addShowSystem(t, i) {
    t.addFieldInt8(4, +i, 0);
  }
  static addShowScreenEffect(t, i) {
    t.addFieldInt8(5, +i, 0);
  }
  static addShowOther(t, i) {
    t.addFieldInt8(6, +i, 0);
  }
  static addAlwaysShowUiSections(t, i) {
    t.addFieldOffset(7, i, 0);
  }
  static createAlwaysShowUiSectionsVector(i, e) {
    i.startVector(4, e.length, 4);
    for (let t = e.length - 1; t >= 0; t--) {
      i.addOffset(e[t]);
    }
    return i.endVector();
  }
  static startAlwaysShowUiSectionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endEnableSectionalUi(t) {
    return t.endObject();
  }
  static createEnableSectionalUi(t, i, e, s, a, n, r, h, o) {
    EnableSectionalUi.startEnableSectionalUi(t);
    EnableSectionalUi.addType(t, i);
    EnableSectionalUi.addShowMiniMap(t, e);
    EnableSectionalUi.addShowQuestTrack(t, s);
    EnableSectionalUi.addShowEsc(t, a);
    EnableSectionalUi.addShowSystem(t, n);
    EnableSectionalUi.addShowScreenEffect(t, r);
    EnableSectionalUi.addShowOther(t, h);
    EnableSectionalUi.addAlwaysShowUiSections(t, o);
    return EnableSectionalUi.endEnableSectionalUi(t);
  }
}
exports.EnableSectionalUi = EnableSectionalUi;
//# sourceMappingURL=enable-sectional-ui.js.map