"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomBattleChallenge = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
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
  get TeleporterId() {
    return this.teleporterid();
  }
  get PassConditionDesc() {
    return this.passconditiondesc();
  }
  get DeckCoreCardLocked() {
    return this.deckcorecardlocked();
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
  questid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  instid() {
    var t = this.J7.__offset(this.z7, 12);
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
    var s = this.J7.__offset(this.z7, 14);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  dialogmapLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  openconditiongroupid() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  firstpassdropid() {
    var t = this.J7.__offset(this.z7, 18);
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
    var s = this.J7.__offset(this.z7, 20);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  passdropidLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  cardroleid() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  cardgroupid() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  isrechallenge() {
    var t = this.J7.__offset(this.z7, 26);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  difficult() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  npcgroupid() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxroundnum() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  recovercostpoint() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  challengename(t) {
    var i = this.J7.__offset(this.z7, 36);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  npcname(t) {
    var i = this.J7.__offset(this.z7, 38);
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
    var i = this.J7.__offset(this.z7, 40);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  elementsLength() {
    var t = this.J7.__offset(this.z7, 40);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  elementsArray() {
    var t = this.J7.__offset(this.z7, 40);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  npctitle(t) {
    var i = this.J7.__offset(this.z7, 42);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  npclevel() {
    var t = this.J7.__offset(this.z7, 44);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  npcchallengeicon(t) {
    var i = this.J7.__offset(this.z7, 46);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  npclevelicon(t) {
    var i = this.J7.__offset(this.z7, 48);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  npclevelbgicon(t) {
    var i = this.J7.__offset(this.z7, 50);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  npcdesc(t) {
    var i = this.J7.__offset(this.z7, 52);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  npcicon(t) {
    var i = this.J7.__offset(this.z7, 54);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  npchead(t) {
    var i = this.J7.__offset(this.z7, 56);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  teleporterid() {
    var t = this.J7.__offset(this.z7, 58);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  passconditiondesc(t) {
    var i = this.J7.__offset(this.z7, 60);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  deckcorecardlocked() {
    var t = this.J7.__offset(this.z7, 62);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
}
exports.PhantomBattleChallenge = PhantomBattleChallenge;
//# sourceMappingURL=PhantomBattleChallenge.js.map