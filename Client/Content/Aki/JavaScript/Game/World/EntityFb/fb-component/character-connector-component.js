"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterConnectorComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_character_connector_logic_js_1 = require("../fb-component/union-character-connector-logic.js");
class CharacterConnectorComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsCharacterConnectorComponent(t, e) {
    return (e || new CharacterConnectorComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsCharacterConnectorComponent(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new CharacterConnectorComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  logicTypeType() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_character_connector_logic_js_1.UnionCharacterConnectorLogic.NONE;
    }
  }
  logicType(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startCharacterConnectorComponent(t) {
    t.startObject(3);
  }
  static addDisabled(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addLogicTypeType(t, e) {
    t.addFieldInt8(1, e, union_character_connector_logic_js_1.UnionCharacterConnectorLogic.NONE);
  }
  static addLogicType(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endCharacterConnectorComponent(t) {
    return t.endObject();
  }
  static createCharacterConnectorComponent(t, e, o, r) {
    CharacterConnectorComponent.startCharacterConnectorComponent(t);
    CharacterConnectorComponent.addDisabled(t, e);
    CharacterConnectorComponent.addLogicTypeType(t, o);
    CharacterConnectorComponent.addLogicType(t, r);
    return CharacterConnectorComponent.endCharacterConnectorComponent(t);
  }
}
exports.CharacterConnectorComponent = CharacterConnectorComponent;
//# sourceMappingURL=character-connector-component.js.map