"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const interact_option_js_1 = require("../fb-action/interact-option.js");
const play_flow_js_1 = require("../fb-action/play-flow.js");
const interact_point_icon_config_js_1 = require("../fb-component/interact-point-icon-config.js");
const interact_sector_range_js_1 = require("../fb-component/interact-sector-range.js");
const random_interact_js_1 = require("../fb-component/random-interact.js");
const union_interact_additional_info_js_1 = require("../fb-component/union-interact-additional-info.js");
const union_interact_player_diraction_option_js_1 = require("../fb-component/union-interact-player-diraction-option.js");
const vector_info_js_1 = require("../fb-var/vector-info.js");
class InteractComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsInteractComponent(t, i) {
    return (i || new InteractComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsInteractComponent(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new InteractComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  questIds(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + i) + t * 4);
    } else {
      return 0;
    }
  }
  questIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  questIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  range() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  exitRange() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  doIntactType(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  sectorRange(t) {
    var i = this.bb.__offset(this.bb_pos, 14);
    if (i) {
      return (t || new interact_sector_range_js_1.InteractSectorRange()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  sectorRangeFromPlayerToEntityType() {
    var t = this.bb.__offset(this.bb_pos, 16);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_interact_player_diraction_option_js_1.UnionInteractPlayerDiractionOption.NONE;
    }
  }
  sectorRangeFromPlayerToEntity(t) {
    var i = this.bb.__offset(this.bb_pos, 18);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  options(t, i) {
    var r = this.bb.__offset(this.bb_pos, 20);
    if (r) {
      return (i || new interact_option_js_1.InteractOption()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + r) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  optionsLength() {
    var t = this.bb.__offset(this.bb_pos, 20);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  randomInteract(t) {
    var i = this.bb.__offset(this.bb_pos, 22);
    if (i) {
      return (t || new random_interact_js_1.RandomInteract()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  interactDefaultIcon(t) {
    var i = this.bb.__offset(this.bb_pos, 24);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  interactIcon(t) {
    var i = this.bb.__offset(this.bb_pos, 26);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  turnAroundType(t) {
    var i = this.bb.__offset(this.bb_pos, 28);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  isWaitForTurnAroundComplete() {
    var t = this.bb.__offset(this.bb_pos, 30);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  isWaitForInteractComplete() {
    var t = this.bb.__offset(this.bb_pos, 32);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  preFlow(t) {
    var i = this.bb.__offset(this.bb_pos, 34);
    if (i) {
      return (t || new play_flow_js_1.PlayFlow()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  tidContent(t) {
    var i = this.bb.__offset(this.bb_pos, 36);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  interactPointOffset(t) {
    var i = this.bb.__offset(this.bb_pos, 38);
    if (i) {
      return (t || new vector_info_js_1.VectorInfo()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  matchRoleOptionType(t) {
    var i = this.bb.__offset(this.bb_pos, 40);
    if (i) {
      return this.bb.readUint8(this.bb.__vector(this.bb_pos + i) + t);
    } else {
      return 0;
    }
  }
  matchRoleOptionTypeLength() {
    var t = this.bb.__offset(this.bb_pos, 40);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  matchRoleOptionTypeArray() {
    var t = this.bb.__offset(this.bb_pos, 40);
    if (t) {
      return new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  matchRoleOption(t, i) {
    var r = this.bb.__offset(this.bb_pos, 42);
    if (r) {
      return this.bb.__union(i, this.bb.__vector(this.bb_pos + r) + t * 4);
    } else {
      return undefined;
    }
  }
  matchRoleOptionLength() {
    var t = this.bb.__offset(this.bb_pos, 42);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  interactAdditionalInfoType() {
    var t = this.bb.__offset(this.bb_pos, 44);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_interact_additional_info_js_1.UnionInteractAdditionalInfo.NONE;
    }
  }
  interactAdditionalInfo(t) {
    var i = this.bb.__offset(this.bb_pos, 46);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  pointIconConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 48);
    if (i) {
      return (t || new interact_point_icon_config_js_1.InteractPointIconConfig()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  static startInteractComponent(t) {
    t.startObject(23);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addQuestIds(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static createQuestIdsVector(i, r) {
    i.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      i.addInt32(r[t]);
    }
    return i.endVector();
  }
  static startQuestIdsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addRange(t, i) {
    t.addFieldFloat32(2, i, 0);
  }
  static addExitRange(t, i) {
    t.addFieldFloat32(3, i, 0);
  }
  static addDoIntactType(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static addSectorRange(t, i) {
    t.addFieldOffset(5, i, 0);
  }
  static addSectorRangeFromPlayerToEntityType(t, i) {
    t.addFieldInt8(6, i, union_interact_player_diraction_option_js_1.UnionInteractPlayerDiractionOption.NONE);
  }
  static addSectorRangeFromPlayerToEntity(t, i) {
    t.addFieldOffset(7, i, 0);
  }
  static addOptions(t, i) {
    t.addFieldOffset(8, i, 0);
  }
  static createOptionsVector(i, r) {
    i.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      i.addOffset(r[t]);
    }
    return i.endVector();
  }
  static startOptionsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addRandomInteract(t, i) {
    t.addFieldOffset(9, i, 0);
  }
  static addInteractDefaultIcon(t, i) {
    t.addFieldOffset(10, i, 0);
  }
  static addInteractIcon(t, i) {
    t.addFieldOffset(11, i, 0);
  }
  static addTurnAroundType(t, i) {
    t.addFieldOffset(12, i, 0);
  }
  static addIsWaitForTurnAroundComplete(t, i) {
    t.addFieldInt8(13, +i, 0);
  }
  static addIsWaitForInteractComplete(t, i) {
    t.addFieldInt8(14, +i, 0);
  }
  static addPreFlow(t, i) {
    t.addFieldOffset(15, i, 0);
  }
  static addTidContent(t, i) {
    t.addFieldOffset(16, i, 0);
  }
  static addInteractPointOffset(t, i) {
    t.addFieldOffset(17, i, 0);
  }
  static addMatchRoleOptionType(t, i) {
    t.addFieldOffset(18, i, 0);
  }
  static createMatchRoleOptionTypeVector(i, r) {
    i.startVector(1, r.length, 1);
    for (let t = r.length - 1; t >= 0; t--) {
      i.addInt8(r[t]);
    }
    return i.endVector();
  }
  static startMatchRoleOptionTypeVector(t, i) {
    t.startVector(1, i, 1);
  }
  static addMatchRoleOption(t, i) {
    t.addFieldOffset(19, i, 0);
  }
  static createMatchRoleOptionVector(i, r) {
    i.startVector(4, r.length, 4);
    for (let t = r.length - 1; t >= 0; t--) {
      i.addOffset(r[t]);
    }
    return i.endVector();
  }
  static startMatchRoleOptionVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addInteractAdditionalInfoType(t, i) {
    t.addFieldInt8(20, i, union_interact_additional_info_js_1.UnionInteractAdditionalInfo.NONE);
  }
  static addInteractAdditionalInfo(t, i) {
    t.addFieldOffset(21, i, 0);
  }
  static addPointIconConfig(t, i) {
    t.addFieldOffset(22, i, 0);
  }
  static endInteractComponent(t) {
    return t.endObject();
  }
}
exports.InteractComponent = InteractComponent;
//# sourceMappingURL=interact-component.js.map