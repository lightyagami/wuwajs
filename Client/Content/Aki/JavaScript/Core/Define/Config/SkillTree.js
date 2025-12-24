"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillTree = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const ConfigPropValue_1 = require("./SubType/ConfigPropValue");
const DicIntInt_1 = require("./SubType/DicIntInt");
class SkillTree {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get NodeIndex() {
    return this.nodeindex();
  }
  get NodeGroup() {
    return this.nodegroup();
  }
  get ParentNodes() {
    return GameUtils_1.GameUtils.ConvertToArray(this.parentnodesLength(), this.parentnodes, this);
  }
  get NodeType() {
    return this.nodetype();
  }
  get Coordinate() {
    return this.coordinate();
  }
  get Condition() {
    return GameUtils_1.GameUtils.ConvertToArray(this.conditionLength(), this.condition, this);
  }
  get SkillId() {
    return this.skillid();
  }
  get SkillBranchIds() {
    return GameUtils_1.GameUtils.ConvertToArray(this.skillbranchidsLength(), this.skillbranchids, this);
  }
  get PropertyNodeTitle() {
    return this.propertynodetitle();
  }
  get PropertyNodeDescribe() {
    return this.propertynodedescribe();
  }
  get PropertyNodeParam() {
    return GameUtils_1.GameUtils.ConvertToArray(this.propertynodeparamLength(), this.propertynodeparam, this);
  }
  get PropertyNodeIcon() {
    return this.propertynodeicon();
  }
  get Property() {
    return GameUtils_1.GameUtils.ConvertToArray(this.propertyLength(), this.property, this);
  }
  get Consume() {
    return GameUtils_1.GameUtils.ConvertToMap(this.consumeLength(), this.consumeKey, this.consumeValue, this);
  }
  consumeKey(t) {
    return this.consume(t)?.key();
  }
  consumeValue(t) {
    return this.consume(t)?.value();
  }
  get UnLockCondition() {
    return this.unlockcondition();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsSkillTree(t, i) {
    return (i || new SkillTree()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  nodeindex() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  nodegroup() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetParentnodesAt(t) {
    return this.parentnodes(t);
  }
  parentnodes(t) {
    var i = this.J7.__offset(this.z7, 10);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  parentnodesLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  parentnodesArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  nodetype() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  coordinate() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetConditionAt(t) {
    return this.condition(t);
  }
  condition(t) {
    var i = this.J7.__offset(this.z7, 16);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  conditionLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  conditionArray() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  skillid() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetSkillbranchidsAt(t) {
    return this.skillbranchids(t);
  }
  skillbranchids(t) {
    var i = this.J7.__offset(this.z7, 20);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  skillbranchidsLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  skillbranchidsArray() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  propertynodetitle(t) {
    var i = this.J7.__offset(this.z7, 22);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  propertynodedescribe(t) {
    var i = this.J7.__offset(this.z7, 24);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetPropertynodeparamAt(t) {
    return this.propertynodeparam(t);
  }
  propertynodeparam(t, i) {
    var s = this.J7.__offset(this.z7, 26);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  propertynodeparamLength() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  propertynodeicon(t) {
    var i = this.J7.__offset(this.z7, 28);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetPropertyAt(t, i) {
    return this.property(t);
  }
  property(t, i) {
    var s = this.J7.__offset(this.z7, 30);
    if (s) {
      return (i || new ConfigPropValue_1.ConfigPropValue()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  propertyLength() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetConsumeAt(t, i) {
    return this.consume(t);
  }
  consume(t, i) {
    var s = this.J7.__offset(this.z7, 32);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  consumeLength() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  unlockcondition() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.SkillTree = SkillTree;
//# sourceMappingURL=SkillTree.js.map