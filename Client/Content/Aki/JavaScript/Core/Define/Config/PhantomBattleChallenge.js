"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomBattleChallenge = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
const StringArray_1 = require("./SubType/StringArray");
class PhantomBattleChallenge {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ActivityId() {
    return this.activityid();
  }
  get GymId() {
    return this.gymid();
  }
  get MarkId() {
    return this.markid();
  }
  get IsRecord() {
    return this.isrecord();
  }
  get EnableSkip() {
    return this.enableskip();
  }
  get QuestId() {
    return this.questid();
  }
  get InstId() {
    return this.instid();
  }
  get DialogMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.dialogmapLength(), this.dialogmapKey, this.dialogmapValue, this);
  }
  dialogmapKey(t) {
    return this.dialogmap(t)?.key();
  }
  dialogmapValue(t) {
    return this.dialogmap(t)?.value();
  }
  get OpenConditionGroupId() {
    return this.openconditiongroupid();
  }
  get ShowConditionGroupId() {
    return this.showconditiongroupid();
  }
  get UncoverConditionGroupId() {
    return this.uncoverconditiongroupid();
  }
  get FirstPassDropId() {
    return this.firstpassdropid();
  }
  get PassDropId() {
    return GameUtils_1.GameUtils.ConvertToMap(this.passdropidLength(), this.passdropidKey, this.passdropidValue, this);
  }
  passdropidKey(t) {
    return this.passdropid(t)?.key();
  }
  passdropidValue(t) {
    return this.passdropid(t)?.value();
  }
  get CardRoleId() {
    return this.cardroleid();
  }
  get CardGroupId() {
    return this.cardgroupid();
  }
  get IsReChallenge() {
    return this.isrechallenge();
  }
  get EnableCheckReChallengeFunc() {
    return this.enablecheckrechallengefunc();
  }
  get Difficult() {
    return this.difficult();
  }
  get NpcGroupId() {
    return this.npcgroupid();
  }
  get MaxRoundNum() {
    return this.maxroundnum();
  }
  get RecoverCostPoint() {
    return this.recovercostpoint();
  }
  get NpcChallengeSkillId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.npcchallengeskillidLength(), this.npcchallengeskillid, this);
  }
  get NpcSkillIconList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.npcskilliconlistLength(), this.npcskilliconlist, this);
  }
  get NpcSkillNameList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.npcskillnamelistLength(), this.npcskillnamelist, this);
  }
  get NpcSkillDescList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.npcskilldesclistLength(), this.npcskilldesclist, this);
  }
  get NpcSkillDescParamsList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.npcskilldescparamslistLength(), this.npcskilldescparamslist, this);
  }
  get ChallengeName() {
    return this.challengename();
  }
  get NpcName() {
    return this.npcname();
  }
  get Elements() {
    return GameUtils_1.GameUtils.ConvertToArray(this.elementsLength(), this.elements, this);
  }
  get NpcTitle() {
    return this.npctitle();
  }
  get NpcLevel() {
    return this.npclevel();
  }
  get NpcChallengeIcon() {
    return this.npcchallengeicon();
  }
  get NpcLevelIcon() {
    return this.npclevelicon();
  }
  get NpcLevelBgIcon() {
    return this.npclevelbgicon();
  }
  get NpcDesc() {
    return this.npcdesc();
  }
  get NpcIcon() {
    return this.npcicon();
  }
  get NpcHead() {
    return this.npchead();
  }
  get NpcNumber() {
    return this.npcnumber();
  }
  get TeleporterId() {
    return this.teleporterid();
  }
  get PassConditionDesc() {
    return this.passconditiondesc();
  }
  get DeckCoreCardLocked() {
    return this.deckcorecardlocked();
  }
  get BvbBattleLoadingBg() {
    return this.bvbbattleloadingbg();
  }
  get BvbLoadingBg() {
    return this.bvbloadingbg();
  }
  get BvbLoadingTriangleBg() {
    return this.bvbloadingtrianglebg();
  }
  get BvbLoadingLeftHand() {
    return this.bvbloadinglefthand();
  }
  get BvbLoadingRightHand() {
    return this.bvbloadingrighthand();
  }
  get BvbLoadingHandShadow() {
    return this.bvbloadinghandshadow();
  }
  get FieldInfoDesc() {
    return this.fieldinfodesc();
  }
  get RecommendCardGroupId() {
    return this.recommendcardgroupid();
  }
  get IsShowEntrance() {
    return this.isshowentrance();
  }
  get ReChallengeQuestId() {
    return this.rechallengequestid();
  }
  get NpcMapHead() {
    return this.npcmaphead();
  }
  get PreGuideQuest() {
    return GameUtils_1.GameUtils.ConvertToArray(this.preguidequestLength(), this.preguidequest, this);
  }
  get IsWorldMapShowMark() {
    return this.isworldmapshowmark();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsPhantomBattleChallenge(t, i) {
    return (i || new PhantomBattleChallenge()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  gymid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  markid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  isrecord() {
    var t = this.J7.__offset(this.z7, 12);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  enableskip() {
    var t = this.J7.__offset(this.z7, 14);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  questid() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  instid() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetDialogmapAt(t, i) {
    return this.dialogmap(t);
  }
  dialogmap(t, i) {
    var s = this.J7.__offset(this.z7, 20);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  dialogmapLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  openconditiongroupid() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  showconditiongroupid() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  uncoverconditiongroupid() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  firstpassdropid() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPassdropidAt(t, i) {
    return this.passdropid(t);
  }
  passdropid(t, i) {
    var s = this.J7.__offset(this.z7, 30);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  passdropidLength() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  cardroleid() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  cardgroupid() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  isrechallenge() {
    var t = this.J7.__offset(this.z7, 36);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  enablecheckrechallengefunc() {
    var t = this.J7.__offset(this.z7, 38);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  difficult() {
    var t = this.J7.__offset(this.z7, 40);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  npcgroupid() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxroundnum() {
    var t = this.J7.__offset(this.z7, 44);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  recovercostpoint() {
    var t = this.J7.__offset(this.z7, 46);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetNpcchallengeskillidAt(t) {
    return this.npcchallengeskillid(t);
  }
  npcchallengeskillid(t) {
    var i = this.J7.__offset(this.z7, 48);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  npcchallengeskillidLength() {
    var t = this.J7.__offset(this.z7, 48);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  npcchallengeskillidArray() {
    var t = this.J7.__offset(this.z7, 48);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetNpcskilliconlistAt(t) {
    return this.npcskilliconlist(t);
  }
  npcskilliconlist(t, i) {
    var s = this.J7.__offset(this.z7, 50);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  npcskilliconlistLength() {
    var t = this.J7.__offset(this.z7, 50);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetNpcskillnamelistAt(t) {
    return this.npcskillnamelist(t);
  }
  npcskillnamelist(t, i) {
    var s = this.J7.__offset(this.z7, 52);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  npcskillnamelistLength() {
    var t = this.J7.__offset(this.z7, 52);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetNpcskilldesclistAt(t) {
    return this.npcskilldesclist(t);
  }
  npcskilldesclist(t, i) {
    var s = this.J7.__offset(this.z7, 54);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  npcskilldesclistLength() {
    var t = this.J7.__offset(this.z7, 54);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetNpcskilldescparamslistAt(t, i) {
    return this.npcskilldescparamslist(t);
  }
  npcskilldescparamslist(t, i) {
    var s = this.J7.__offset(this.z7, 56);
    if (s) {
      return (i || new StringArray_1.StringArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  npcskilldescparamslistLength() {
    var t = this.J7.__offset(this.z7, 56);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  challengename(t) {
    var i = this.J7.__offset(this.z7, 58);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  npcname(t) {
    var i = this.J7.__offset(this.z7, 60);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetElementsAt(t) {
    return this.elements(t);
  }
  elements(t) {
    var i = this.J7.__offset(this.z7, 62);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  elementsLength() {
    var t = this.J7.__offset(this.z7, 62);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  elementsArray() {
    var t = this.J7.__offset(this.z7, 62);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  npctitle(t) {
    var i = this.J7.__offset(this.z7, 64);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  npclevel() {
    var t = this.J7.__offset(this.z7, 66);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  npcchallengeicon(t) {
    var i = this.J7.__offset(this.z7, 68);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  npclevelicon(t) {
    var i = this.J7.__offset(this.z7, 70);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  npclevelbgicon(t) {
    var i = this.J7.__offset(this.z7, 72);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  npcdesc(t) {
    var i = this.J7.__offset(this.z7, 74);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  npcicon(t) {
    var i = this.J7.__offset(this.z7, 76);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  npchead(t) {
    var i = this.J7.__offset(this.z7, 78);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  npcnumber(t) {
    var i = this.J7.__offset(this.z7, 80);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  teleporterid() {
    var t = this.J7.__offset(this.z7, 82);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  passconditiondesc(t) {
    var i = this.J7.__offset(this.z7, 84);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  deckcorecardlocked() {
    var t = this.J7.__offset(this.z7, 86);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  bvbbattleloadingbg(t) {
    var i = this.J7.__offset(this.z7, 88);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  bvbloadingbg(t) {
    var i = this.J7.__offset(this.z7, 90);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  bvbloadingtrianglebg(t) {
    var i = this.J7.__offset(this.z7, 92);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  bvbloadinglefthand(t) {
    var i = this.J7.__offset(this.z7, 94);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  bvbloadingrighthand(t) {
    var i = this.J7.__offset(this.z7, 96);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  bvbloadinghandshadow(t) {
    var i = this.J7.__offset(this.z7, 98);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  fieldinfodesc(t) {
    var i = this.J7.__offset(this.z7, 100);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  recommendcardgroupid() {
    var t = this.J7.__offset(this.z7, 102);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  isshowentrance() {
    var t = this.J7.__offset(this.z7, 104);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  rechallengequestid() {
    var t = this.J7.__offset(this.z7, 106);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  npcmaphead(t) {
    var i = this.J7.__offset(this.z7, 108);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetPreguidequestAt(t) {
    return this.preguidequest(t);
  }
  preguidequest(t) {
    var i = this.J7.__offset(this.z7, 110);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  preguidequestLength() {
    var t = this.J7.__offset(this.z7, 110);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  preguidequestArray() {
    var t = this.J7.__offset(this.z7, 110);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  isworldmapshowmark() {
    var t = this.J7.__offset(this.z7, 112);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
}
exports.PhantomBattleChallenge = PhantomBattleChallenge;
//# sourceMappingURL=PhantomBattleChallenge.js.map