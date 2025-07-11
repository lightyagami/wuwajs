"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleLinkCharacter = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class BattleLinkCharacter {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get NeedLoadMesh() {
    return this.needloadmesh();
  }
  get CharacterDataAsset() {
    return this.characterdataasset();
  }
  get Seq() {
    return this.seq();
  }
  get Pose() {
    return this.pose();
  }
  get RogueSkillIcon() {
    return this.rogueskillicon();
  }
  get RogueSkillDesc() {
    return this.rogueskilldesc();
  }
  get RogueSkillDescParam() {
    return GameUtils_1.GameUtils.ConvertToArray(this.rogueskilldescparamLength(), this.rogueskilldescparam, this);
  }
  get RogueSkillTitle() {
    return this.rogueskilltitle();
  }
  get RoleLinkAudio() {
    return this.rolelinkaudio();
  }
  get FormationSkillList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.formationskilllistLength(), this.formationskilllist, this);
  }
  get IsShowInTeamView() {
    return this.isshowinteamview();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsBattleLinkCharacter(t, i) {
    return (i || new BattleLinkCharacter()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  needloadmesh() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  characterdataasset(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  seq(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  pose(t) {
    var i = this.J7.__offset(this.z7, 12);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  rogueskillicon(t) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  rogueskilldesc(t) {
    var i = this.J7.__offset(this.z7, 16);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetRogueskilldescparamAt(t) {
    return this.rogueskilldescparam(t);
  }
  rogueskilldescparam(t, i) {
    var s = this.J7.__offset(this.z7, 18);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  rogueskilldescparamLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  rogueskilltitle(t) {
    var i = this.J7.__offset(this.z7, 20);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  rolelinkaudio(t) {
    var i = this.J7.__offset(this.z7, 22);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetFormationskilllistAt(t) {
    return this.formationskilllist(t);
  }
  formationskilllist(t) {
    var i = this.J7.__offset(this.z7, 24);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  formationskilllistLength() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  formationskilllistArray() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  isshowinteamview() {
    var t = this.J7.__offset(this.z7, 26);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
}
exports.BattleLinkCharacter = BattleLinkCharacter;
//# sourceMappingURL=BattleLinkCharacter.js.map