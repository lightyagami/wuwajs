"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Skill = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class Skill {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get SkillGroupId() {
    return this.skillgroupid();
  }
  get SkillType() {
    return this.skilltype();
  }
  get UpgradeCondition() {
    return this.upgradecondition();
  }
  get UpgradeSkillId() {
    return this.upgradeskillid();
  }
  get SkillName() {
    return this.skillname();
  }
  get SkillLevelGroupId() {
    return this.skilllevelgroupid();
  }
  get LeftSkillEffect() {
    return this.leftskilleffect();
  }
  get MaxSkillLevel() {
    return this.maxskilllevel();
  }
  get SkillInfoList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.skillinfolistLength(), this.skillinfolist, this);
  }
  get BuffList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.bufflistLength(), this.bufflist, this);
  }
  get DamageList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.damagelistLength(), this.damagelist, this);
  }
  get Icon() {
    return this.icon();
  }
  get EffectSkillPath() {
    return this.effectskillpath();
  }
  get SortIndex() {
    return this.sortindex();
  }
  get SkillDescribe() {
    return this.skilldescribe();
  }
  get SkillResume() {
    return this.skillresume();
  }
  get SkillTagList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.skilltaglistLength(), this.skilltaglist, this);
  }
  get SkillDetailNum() {
    return GameUtils_1.GameUtils.ConvertToArray(this.skilldetailnumLength(), this.skilldetailnum, this);
  }
  get SkillResumeNum() {
    return GameUtils_1.GameUtils.ConvertToArray(this.skillresumenumLength(), this.skillresumenum, this);
  }
  get MultiSkillDescribe() {
    return this.multiskilldescribe();
  }
  get MultiSkillDetailNum() {
    return GameUtils_1.GameUtils.ConvertToArray(this.multiskilldetailnumLength(), this.multiskilldetailnum, this);
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsSkill(t, i) {
    return (i || new Skill()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  skillgroupid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  skilltype() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  upgradecondition() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  upgradeskillid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  skillname(t) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  skilllevelgroupid() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  leftskilleffect() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxskilllevel() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetSkillinfolistAt(t) {
    return this.skillinfolist(t);
  }
  skillinfolist(t) {
    var i = this.J7.__offset(this.z7, 22);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  skillinfolistLength() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  skillinfolistArray() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetBufflistAt(t) {
    return this.bufflist(t);
  }
  bufflist(t) {
    var i = this.J7.__offset(this.z7, 24);
    if (i) {
      return this.J7.readFloat64(this.J7.__vector(this.z7 + i) + t * 8);
    } else {
      return 0;
    }
  }
  bufflistLength() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  bufflistArray() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return new Float64Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetDamagelistAt(t) {
    return this.damagelist(t);
  }
  damagelist(t) {
    var i = this.J7.__offset(this.z7, 26);
    if (i) {
      return this.J7.readFloat64(this.J7.__vector(this.z7 + i) + t * 8);
    } else {
      return 0;
    }
  }
  damagelistLength() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  damagelistArray() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return new Float64Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  icon(t) {
    var i = this.J7.__offset(this.z7, 28);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  effectskillpath(t) {
    var i = this.J7.__offset(this.z7, 30);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  sortindex() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  skilldescribe(t) {
    var i = this.J7.__offset(this.z7, 34);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  skillresume(t) {
    var i = this.J7.__offset(this.z7, 36);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetSkilltaglistAt(t) {
    return this.skilltaglist(t);
  }
  skilltaglist(t) {
    var i = this.J7.__offset(this.z7, 38);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  skilltaglistLength() {
    var t = this.J7.__offset(this.z7, 38);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  skilltaglistArray() {
    var t = this.J7.__offset(this.z7, 38);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetSkilldetailnumAt(t) {
    return this.skilldetailnum(t);
  }
  skilldetailnum(t, i) {
    var s = this.J7.__offset(this.z7, 40);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  skilldetailnumLength() {
    var t = this.J7.__offset(this.z7, 40);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetSkillresumenumAt(t) {
    return this.skillresumenum(t);
  }
  skillresumenum(t, i) {
    var s = this.J7.__offset(this.z7, 42);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  skillresumenumLength() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  multiskilldescribe(t) {
    var i = this.J7.__offset(this.z7, 44);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetMultiskilldetailnumAt(t) {
    return this.multiskilldetailnum(t);
  }
  multiskilldetailnum(t, i) {
    var s = this.J7.__offset(this.z7, 46);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  multiskilldetailnumLength() {
    var t = this.J7.__offset(this.z7, 46);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.Skill = Skill;
//# sourceMappingURL=Skill.js.map