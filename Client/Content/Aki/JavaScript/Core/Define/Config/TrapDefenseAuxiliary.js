"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseAuxiliary = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class TrapDefenseAuxiliary {
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
  get AuxiliaryType() {
    return this.auxiliarytype();
  }
  get SimpleCombatSubtypeId() {
    return this.simplecombatsubtypeid();
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
  get ConstructDefaultCost() {
    return this.constructdefaultcost();
  }
  get InitSkills() {
    return GameUtils_1.GameUtils.ConvertToArray(this.initskillsLength(), this.initskills, this);
  }
  get InitProperty() {
    return this.initproperty();
  }
  get CDSkill() {
    return this.cdskill();
  }
  get CueIds() {
    return GameUtils_1.GameUtils.ConvertToArray(this.cueidsLength(), this.cueids, this);
  }
  get CDCueId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.cdcueidLength(), this.cdcueid, this);
  }
  get ReadyCueId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.readycueidLength(), this.readycueid, this);
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsTrapDefenseAuxiliary(t, s) {
    return (s || new TrapDefenseAuxiliary()).__init(t.readInt32(t.position()) + t.position(), t);
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
  auxiliarytype() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  simplecombatsubtypeid() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetInitbuffsAt(t) {
    return this.initbuffs(t);
  }
  initbuffs(t) {
    var s = this.J7.__offset(this.z7, 18);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  initbuffsLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  initbuffsArray() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  level() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  branch() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  branchdesc(t) {
    var s = this.J7.__offset(this.z7, 24);
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
    var i = this.J7.__offset(this.z7, 26);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  branchdescargsLength() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  cooldown() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  upgradecost() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  constructdefaultcost() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetInitskillsAt(t) {
    return this.initskills(t);
  }
  initskills(t) {
    var s = this.J7.__offset(this.z7, 34);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  initskillsLength() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  initskillsArray() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  initproperty() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  cdskill() {
    var t = this.J7.__offset(this.z7, 38);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetCueidsAt(t) {
    return this.cueids(t);
  }
  cueids(t) {
    var s = this.J7.__offset(this.z7, 40);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  cueidsLength() {
    var t = this.J7.__offset(this.z7, 40);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  cueidsArray() {
    var t = this.J7.__offset(this.z7, 40);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetCdcueidAt(t) {
    return this.cdcueid(t);
  }
  cdcueid(t) {
    var s = this.J7.__offset(this.z7, 42);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  cdcueidLength() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  cdcueidArray() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetReadycueidAt(t) {
    return this.readycueid(t);
  }
  readycueid(t) {
    var s = this.J7.__offset(this.z7, 44);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  readycueidLength() {
    var t = this.J7.__offset(this.z7, 44);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  readycueidArray() {
    var t = this.J7.__offset(this.z7, 44);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.TrapDefenseAuxiliary = TrapDefenseAuxiliary;
//# sourceMappingURL=TrapDefenseAuxiliary.js.map