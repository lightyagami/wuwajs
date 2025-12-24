"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreTools = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class ExploreTools {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get PhantomSkillId() {
    return this.phantomskillid();
  }
  get Name() {
    return this.name();
  }
  get SkillType() {
    return this.skilltype();
  }
  get RouletteType() {
    return GameUtils_1.GameUtils.ConvertToArray(this.roulettetypeLength(), this.roulettetype, this);
  }
  get CanEquip() {
    return this.canequip();
  }
  get AssemblyEquipButton() {
    return this.assemblyequipbutton();
  }
  get CanAssemblyShow() {
    return this.canassemblyshow();
  }
  get UseType() {
    return this.usetype();
  }
  get InputLogReport() {
    return this.inputlogreport();
  }
  get CurrentSkillInfo() {
    return this.currentskillinfo();
  }
  get HelpId() {
    return this.helpid();
  }
  get Icon() {
    return this.icon();
  }
  get BackGround() {
    return this.background();
  }
  get BattleViewIcon() {
    return this.battleviewicon();
  }
  get SortId() {
    return this.sortid();
  }
  get Sort() {
    return GameUtils_1.GameUtils.ConvertToMap(this.sortLength(), this.sortKey, this.sortValue, this);
  }
  sortKey(t) {
    return this.sort(t)?.key();
  }
  sortValue(t) {
    return this.sort(t)?.value();
  }
  get AutoFill() {
    return this.autofill();
  }
  get ShowUnlock() {
    return this.showunlock();
  }
  get SkillGroupId() {
    return this.skillgroupid();
  }
  get IsUseInPhantomTeam() {
    return this.isuseinphantomteam();
  }
  get Cost() {
    return GameUtils_1.GameUtils.ConvertToMap(this.costLength(), this.costKey, this.costValue, this);
  }
  costKey(t) {
    return this.cost(t)?.key();
  }
  costValue(t) {
    return this.cost(t)?.value();
  }
  get Authorization() {
    return GameUtils_1.GameUtils.ConvertToMap(this.authorizationLength(), this.authorizationKey, this.authorizationValue, this);
  }
  authorizationKey(t) {
    return this.authorization(t)?.key();
  }
  authorizationValue(t) {
    return this.authorization(t)?.value();
  }
  get SummonConfigId() {
    return this.summonconfigid();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsExploreTools(t, i) {
    return (i || new ExploreTools()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  phantomskillid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  skilltype() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRoulettetypeAt(t) {
    return this.roulettetype(t);
  }
  roulettetype(t) {
    var i = this.J7.__offset(this.z7, 10);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  roulettetypeLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  roulettetypeArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  canequip() {
    var t = this.J7.__offset(this.z7, 12);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  assemblyequipbutton() {
    var t = this.J7.__offset(this.z7, 14);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  canassemblyshow() {
    var t = this.J7.__offset(this.z7, 16);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  usetype() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  inputlogreport() {
    var t = this.J7.__offset(this.z7, 20);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  currentskillinfo(t) {
    var i = this.J7.__offset(this.z7, 22);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  helpid() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  icon(t) {
    var i = this.J7.__offset(this.z7, 26);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  background(t) {
    var i = this.J7.__offset(this.z7, 28);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  battleviewicon(t) {
    var i = this.J7.__offset(this.z7, 30);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  sortid() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetSortAt(t, i) {
    return this.sort(t);
  }
  sort(t, i) {
    var s = this.J7.__offset(this.z7, 34);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  sortLength() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  autofill() {
    var t = this.J7.__offset(this.z7, 36);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  showunlock() {
    var t = this.J7.__offset(this.z7, 38);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  skillgroupid() {
    var t = this.J7.__offset(this.z7, 40);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  isuseinphantomteam() {
    var t = this.J7.__offset(this.z7, 42);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  GetCostAt(t, i) {
    return this.cost(t);
  }
  cost(t, i) {
    var s = this.J7.__offset(this.z7, 44);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  costLength() {
    var t = this.J7.__offset(this.z7, 44);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetAuthorizationAt(t, i) {
    return this.authorization(t);
  }
  authorization(t, i) {
    var s = this.J7.__offset(this.z7, 46);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  authorizationLength() {
    var t = this.J7.__offset(this.z7, 46);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  summonconfigid() {
    var t = this.J7.__offset(this.z7, 48);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.ExploreTools = ExploreTools;
//# sourceMappingURL=ExploreTools.js.map