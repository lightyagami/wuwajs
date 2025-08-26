"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBuilding = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const IntArray_1 = require("./SubType/IntArray");
class TrapDefenseBuilding {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Desc() {
    return this.desc();
  }
  get DescArgs() {
    return GameUtils_1.GameUtils.ConvertToArray(this.descargsLength(), this.descargs, this);
  }
  get DescDetail() {
    return this.descdetail();
  }
  get DescDetailArgs() {
    return GameUtils_1.GameUtils.ConvertToArray(this.descdetailargsLength(), this.descdetailargs, this);
  }
  get BuildingType() {
    return this.buildingtype();
  }
  get DamageType() {
    return this.damagetype();
  }
  get SimpleCombatSubtypeIds() {
    return GameUtils_1.GameUtils.ConvertToArray(this.simplecombatsubtypeidsLength(), this.simplecombatsubtypeids, this);
  }
  get BattleLevelUpgradeCondition() {
    return GameUtils_1.GameUtils.ConvertToArray(this.battlelevelupgradeconditionLength(), this.battlelevelupgradecondition, this);
  }
  get InitBuffs() {
    return GameUtils_1.GameUtils.ConvertToArray(this.initbuffsLength(), this.initbuffs, this);
  }
  get Level() {
    return this.level();
  }
  get Branch() {
    return this.branch();
  }
  get BranchDesc() {
    return this.branchdesc();
  }
  get BranchDescArgs() {
    return GameUtils_1.GameUtils.ConvertToArray(this.branchdescargsLength(), this.branchdescargs, this);
  }
  get CoolDown() {
    return this.cooldown();
  }
  get UpgradeCost() {
    return this.upgradecost();
  }
  get BattleLevel() {
    return this.battlelevel();
  }
  get BattleLogic() {
    return GameUtils_1.GameUtils.ConvertToArray(this.battlelogicLength(), this.battlelogic, this);
  }
  get ConstructDefaultCost() {
    return this.constructdefaultcost();
  }
  get DeconstructDefaultReturn() {
    return this.deconstructdefaultreturn();
  }
  get Deathrattle() {
    return this.deathrattle();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsTrapDefenseBuilding(t, s) {
    return (s || new TrapDefenseBuilding()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  desc(t) {
    var s = this.J7.__offset(this.z7, 6);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  GetDescargsAt(t) {
    return this.descargs(t);
  }
  descargs(t, s) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  descargsLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  descdetail(t) {
    var s = this.J7.__offset(this.z7, 10);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  GetDescdetailargsAt(t) {
    return this.descdetailargs(t);
  }
  descdetailargs(t, s) {
    var i = this.J7.__offset(this.z7, 12);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  descdetailargsLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  buildingtype() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  damagetype() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return -1;
    }
  }
  GetSimplecombatsubtypeidsAt(t) {
    return this.simplecombatsubtypeids(t);
  }
  simplecombatsubtypeids(t) {
    var s = this.J7.__offset(this.z7, 18);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  simplecombatsubtypeidsLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  simplecombatsubtypeidsArray() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetBattlelevelupgradeconditionAt(t, s) {
    return this.battlelevelupgradecondition(t);
  }
  battlelevelupgradecondition(t, s) {
    var i = this.J7.__offset(this.z7, 20);
    if (i) {
      return (s || new IntArray_1.IntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  battlelevelupgradeconditionLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetInitbuffsAt(t) {
    return this.initbuffs(t);
  }
  initbuffs(t) {
    var s = this.J7.__offset(this.z7, 22);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  initbuffsLength() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  initbuffsArray() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  level() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  branch() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  branchdesc(t) {
    var s = this.J7.__offset(this.z7, 28);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  GetBranchdescargsAt(t) {
    return this.branchdescargs(t);
  }
  branchdescargs(t, s) {
    var i = this.J7.__offset(this.z7, 30);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  branchdescargsLength() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  cooldown() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  upgradecost() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  battlelevel() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetBattlelogicAt(t, s) {
    return this.battlelogic(t);
  }
  battlelogic(t, s) {
    var i = this.J7.__offset(this.z7, 38);
    if (i) {
      return (s || new IntArray_1.IntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  battlelogicLength() {
    var t = this.J7.__offset(this.z7, 38);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  constructdefaultcost() {
    var t = this.J7.__offset(this.z7, 40);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  deconstructdefaultreturn() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  deathrattle() {
    var t = this.J7.__offset(this.z7, 44);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.TrapDefenseBuilding = TrapDefenseBuilding;
//# sourceMappingURL=TrapDefenseBuilding.js.map