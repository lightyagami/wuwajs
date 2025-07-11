"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SynthesisFormula = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const OneItemConfig_1 = require("./SubType/OneItemConfig");
class SynthesisFormula {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get FormulaItemId() {
    return this.formulaitemid();
  }
  get ItemId() {
    return this.itemid();
  }
  get FormulaType() {
    return this.formulatype();
  }
  get ItemGroup() {
    return this.itemgroup();
  }
  get Name() {
    return this.name();
  }
  get ConsumeItems() {
    return GameUtils_1.GameUtils.ConvertToArray(this.consumeitemsLength(), this.consumeitems, this);
  }
  get SortId() {
    return this.sortid();
  }
  get UnlockCondition() {
    return this.unlockcondition();
  }
  get Proficiency() {
    return this.proficiency();
  }
  get MaxProficiencyCount() {
    return this.maxproficiencycount();
  }
  get TypeId() {
    return this.typeid();
  }
  get Unlock() {
    return this.unlock();
  }
  get LimitCount() {
    return this.limitcount();
  }
  get PermanentLimit() {
    return this.permanentlimit();
  }
  get RoleList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.rolelistLength(), this.rolelist, this);
  }
  get ComposeContent() {
    return this.composecontent();
  }
  get ComposeBackground() {
    return this.composebackground();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsSynthesisFormula(t, i) {
    return (i || new SynthesisFormula()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  formulaitemid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  itemid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  formulatype() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 3;
    }
  }
  itemgroup() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetConsumeitemsAt(t, i) {
    return this.consumeitems(t);
  }
  consumeitems(t, i) {
    var s = this.J7.__offset(this.z7, 16);
    if (s) {
      return (i || new OneItemConfig_1.OneItemConfig()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  consumeitemsLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  sortid() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  unlockcondition() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  proficiency() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxproficiencycount() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  typeid() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  unlock() {
    var t = this.J7.__offset(this.z7, 28);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  limitcount() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  permanentlimit() {
    var t = this.J7.__offset(this.z7, 32);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  GetRolelistAt(t) {
    return this.rolelist(t);
  }
  rolelist(t) {
    var i = this.J7.__offset(this.z7, 34);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  rolelistLength() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  rolelistArray() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  composecontent(t) {
    var i = this.J7.__offset(this.z7, 36);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  composebackground(t) {
    var i = this.J7.__offset(this.z7, 38);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.SynthesisFormula = SynthesisFormula;
//# sourceMappingURL=SynthesisFormula.js.map