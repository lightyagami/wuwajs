"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseInfoComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const custom_aoiz_radius_js_1 = require("../fb-component/custom-aoiz-radius.js");
const entity_category_js_1 = require("../fb-component/entity-category.js");
const entity_gravity_config_js_1 = require("../fb-component/entity-gravity-config.js");
const entity_scan_function_js_1 = require("../fb-component/entity-scan-function.js");
const head_info_change_data_js_1 = require("../fb-component/head-info-change-data.js");
const head_state_view_config_js_1 = require("../fb-component/head-state-view-config.js");
const fix_processor_js_1 = require("../fb-fix-processor/fix-processor.js");
class BaseInfoComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsBaseInfoComponent(t, i) {
    return (i || new BaseInfoComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsBaseInfoComponent(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new BaseInfoComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  tidName(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  isShowNameOnHead() {
    var t = this.bb.__offset(this.bb_pos, 8);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  category(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return (t || new entity_category_js_1.EntityCategory()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  scanFunction(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    if (i) {
      return (t || new entity_scan_function_js_1.EntityScanFunction()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  headInfo() {
    var t = this.bb.__offset(this.bb_pos, 14);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  camp() {
    var t = this.bb.__offset(this.bb_pos, 16);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  aoiLayer() {
    var t = this.bb.__offset(this.bb_pos, 18);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  aoiZRadius() {
    var t = this.bb.__offset(this.bb_pos, 20);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  isAoiFitterPlatform() {
    var t = this.bb.__offset(this.bb_pos, 22);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  customAoiZRadius(t) {
    var i = this.bb.__offset(this.bb_pos, 24);
    if (i) {
      return (t || new custom_aoiz_radius_js_1.CustomAoizRadius()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  mapIcon() {
    var t = this.bb.__offset(this.bb_pos, 26);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  packId() {
    var t = this.bb.__offset(this.bb_pos, 28);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  occupation(t) {
    var i = this.bb.__offset(this.bb_pos, 30);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  headStateViewConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 32);
    if (i) {
      return (t || new head_state_view_config_js_1.HeadStateViewConfig()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  entityPropertyId() {
    var t = this.bb.__offset(this.bb_pos, 34);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  focusPriority() {
    var t = this.bb.__offset(this.bb_pos, 36);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  onlineInteractType() {
    var t = this.bb.__offset(this.bb_pos, 38);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  notAllowHidedByTargetRange() {
    var t = this.bb.__offset(this.bb_pos, 40);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  lowerNpcDensity() {
    var t = this.bb.__offset(this.bb_pos, 42);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  dataLayers(t) {
    var i = this.bb.__offset(this.bb_pos, 44);
    if (i) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + i) + t * 4);
    } else {
      return 0;
    }
  }
  dataLayersLength() {
    var t = this.bb.__offset(this.bb_pos, 44);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  dataLayersArray() {
    var t = this.bb.__offset(this.bb_pos, 44);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  childEntityIds(t) {
    var i = this.bb.__offset(this.bb_pos, 46);
    if (i) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + i) + t * 4);
    } else {
      return 0;
    }
  }
  childEntityIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 46);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  childEntityIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 46);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  isOnlineStandalone() {
    var t = this.bb.__offset(this.bb_pos, 48);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  specifiedOnlineStandaloneParentUids(t, i) {
    var s = this.bb.__offset(this.bb_pos, 50);
    if (s) {
      return this.bb.__string(this.bb.__vector(this.bb_pos + s) + t * 4, i);
    } else {
      return undefined;
    }
  }
  specifiedOnlineStandaloneParentUidsLength() {
    var t = this.bb.__offset(this.bb_pos, 50);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  fixProcessor(t) {
    var i = this.bb.__offset(this.bb_pos, 52);
    if (i) {
      return (t || new fix_processor_js_1.FixProcessor()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  entityUpdateStrategy() {
    var t = this.bb.__offset(this.bb_pos, 54);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  timeScaleModifyStrategy() {
    var t = this.bb.__offset(this.bb_pos, 56);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  gravityConfig(t) {
    var i = this.bb.__offset(this.bb_pos, 58);
    if (i) {
      return (t || new entity_gravity_config_js_1.EntityGravityConfig()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  headInfoChangeConfig(t, i) {
    var s = this.bb.__offset(this.bb_pos, 60);
    if (s) {
      return (i || new head_info_change_data_js_1.HeadInfoChangeData()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + s) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  headInfoChangeConfigLength() {
    var t = this.bb.__offset(this.bb_pos, 60);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startBaseInfoComponent(t) {
    t.startObject(29);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addTidName(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addIsShowNameOnHead(t, i) {
    t.addFieldInt8(2, +i, 0);
  }
  static addCategory(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addScanFunction(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static addHeadInfo(t, i) {
    t.addFieldInt32(5, i, 0);
  }
  static addCamp(t, i) {
    t.addFieldInt8(6, i, 0);
  }
  static addAoiLayer(t, i) {
    t.addFieldInt8(7, i, 0);
  }
  static addAoiZRadius(t, i) {
    t.addFieldInt8(8, i, 0);
  }
  static addIsAoiFitterPlatform(t, i) {
    t.addFieldInt8(9, +i, 0);
  }
  static addCustomAoiZRadius(t, i) {
    t.addFieldOffset(10, i, 0);
  }
  static addMapIcon(t, i) {
    t.addFieldInt32(11, i, 0);
  }
  static addPackId(t, i) {
    t.addFieldInt32(12, i, 0);
  }
  static addOccupation(t, i) {
    t.addFieldOffset(13, i, 0);
  }
  static addHeadStateViewConfig(t, i) {
    t.addFieldOffset(14, i, 0);
  }
  static addEntityPropertyId(t, i) {
    t.addFieldInt32(15, i, 0);
  }
  static addFocusPriority(t, i) {
    t.addFieldInt32(16, i, 0);
  }
  static addOnlineInteractType(t, i) {
    t.addFieldInt8(17, i, 0);
  }
  static addNotAllowHidedByTargetRange(t, i) {
    t.addFieldInt8(18, +i, 0);
  }
  static addLowerNpcDensity(t, i) {
    t.addFieldInt8(19, i, 0);
  }
  static addDataLayers(t, i) {
    t.addFieldOffset(20, i, 0);
  }
  static createDataLayersVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addInt32(s[t]);
    }
    return i.endVector();
  }
  static startDataLayersVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addChildEntityIds(t, i) {
    t.addFieldOffset(21, i, 0);
  }
  static createChildEntityIdsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addInt32(s[t]);
    }
    return i.endVector();
  }
  static startChildEntityIdsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addIsOnlineStandalone(t, i) {
    t.addFieldInt8(22, +i, 0);
  }
  static addSpecifiedOnlineStandaloneParentUids(t, i) {
    t.addFieldOffset(23, i, 0);
  }
  static createSpecifiedOnlineStandaloneParentUidsVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addOffset(s[t]);
    }
    return i.endVector();
  }
  static startSpecifiedOnlineStandaloneParentUidsVector(t, i) {
    t.startVector(4, i, 4);
  }
  static addFixProcessor(t, i) {
    t.addFieldOffset(24, i, 0);
  }
  static addEntityUpdateStrategy(t, i) {
    t.addFieldInt8(25, i, 0);
  }
  static addTimeScaleModifyStrategy(t, i) {
    t.addFieldInt8(26, i, 0);
  }
  static addGravityConfig(t, i) {
    t.addFieldOffset(27, i, 0);
  }
  static addHeadInfoChangeConfig(t, i) {
    t.addFieldOffset(28, i, 0);
  }
  static createHeadInfoChangeConfigVector(i, s) {
    i.startVector(4, s.length, 4);
    for (let t = s.length - 1; t >= 0; t--) {
      i.addOffset(s[t]);
    }
    return i.endVector();
  }
  static startHeadInfoChangeConfigVector(t, i) {
    t.startVector(4, i, 4);
  }
  static endBaseInfoComponent(t) {
    return t.endObject();
  }
}
exports.BaseInfoComponent = BaseInfoComponent;
//# sourceMappingURL=base-info-component.js.map