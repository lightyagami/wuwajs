"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueWhiteCat = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
const DicIntString_1 = require("./SubType/DicIntString");
class RogueWhiteCat {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ScoreId() {
    return this.scoreid();
  }
  get EnergyId() {
    return this.energyid();
  }
  get MaxEnergy() {
    return this.maxenergy();
  }
  get Insts() {
    return GameUtils_1.GameUtils.ConvertToArray(this.instsLength(), this.insts, this);
  }
  get BossRewards() {
    return GameUtils_1.GameUtils.ConvertToArray(this.bossrewardsLength(), this.bossrewards, this);
  }
  get LimitedTimeId() {
    return this.limitedtimeid();
  }
  get Rewards() {
    return GameUtils_1.GameUtils.ConvertToArray(this.rewardsLength(), this.rewards, this);
  }
  get FirstWhiteCatDungeonId() {
    return this.firstwhitecatdungeonid();
  }
  get RepeatWhiteCatDungeonId() {
    return this.repeatwhitecatdungeonid();
  }
  get WhiteCatFirstOpenCondition() {
    return this.whitecatfirstopencondition();
  }
  get FirstWhiteCatQuestId() {
    return this.firstwhitecatquestid();
  }
  get WhiteCatRepeatOpenCondition() {
    return this.whitecatrepeatopencondition();
  }
  get OpenCondition() {
    return GameUtils_1.GameUtils.ConvertToMap(this.openconditionLength(), this.openconditionKey, this.openconditionValue, this);
  }
  openconditionKey(t) {
    return this.opencondition(t)?.key();
  }
  openconditionValue(t) {
    return this.opencondition(t)?.value();
  }
  get DreamLinkTeleportMarkId() {
    return this.dreamlinkteleportmarkid();
  }
  get TabText() {
    return GameUtils_1.GameUtils.ConvertToMap(this.tabtextLength(), this.tabtextKey, this.tabtextValue, this);
  }
  tabtextKey(t) {
    return this.tabtext(t)?.key();
  }
  tabtextValue(t) {
    return this.tabtext(t)?.value();
  }
  get TabIcon() {
    return GameUtils_1.GameUtils.ConvertToMap(this.tabiconLength(), this.tabiconKey, this.tabiconValue, this);
  }
  tabiconKey(t) {
    return this.tabicon(t)?.key();
  }
  tabiconValue(t) {
    return this.tabicon(t)?.value();
  }
  get BossTabText() {
    return GameUtils_1.GameUtils.ConvertToMap(this.bosstabtextLength(), this.bosstabtextKey, this.bosstabtextValue, this);
  }
  bosstabtextKey(t) {
    return this.bosstabtext(t)?.key();
  }
  bosstabtextValue(t) {
    return this.bosstabtext(t)?.value();
  }
  get PlotRoleLinkAudio() {
    return this.plotrolelinkaudio();
  }
  get BossInstanceList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.bossinstancelistLength(), this.bossinstancelist, this);
  }
  get WeaponPreviewId() {
    return this.weaponpreviewid();
  }
  get DungeonBaseProgress() {
    return this.dungeonbaseprogress();
  }
  get DungeonMaxProgress() {
    return this.dungeonmaxprogress();
  }
  get PreloadRoleIds() {
    return GameUtils_1.GameUtils.ConvertToMap(this.preloadroleidsLength(), this.preloadroleidsKey, this.preloadroleidsValue, this);
  }
  preloadroleidsKey(t) {
    return this.preloadroleids(t)?.key();
  }
  preloadroleidsValue(t) {
    return this.preloadroleids(t)?.value();
  }
  get PlotRoleLinkTeam() {
    return GameUtils_1.GameUtils.ConvertToArray(this.plotrolelinkteamLength(), this.plotrolelinkteam, this);
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsRogueWhiteCat(t, i) {
    return (i || new RogueWhiteCat()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  scoreid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  energyid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxenergy() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetInstsAt(t) {
    return this.insts(t);
  }
  insts(t) {
    var i = this.J7.__offset(this.z7, 12);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  instsLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  instsArray() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetBossrewardsAt(t) {
    return this.bossrewards(t);
  }
  bossrewards(t) {
    var i = this.J7.__offset(this.z7, 14);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  bossrewardsLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  bossrewardsArray() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  limitedtimeid() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRewardsAt(t) {
    return this.rewards(t);
  }
  rewards(t) {
    var i = this.J7.__offset(this.z7, 18);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  rewardsLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  rewardsArray() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  firstwhitecatdungeonid() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  repeatwhitecatdungeonid() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  whitecatfirstopencondition() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  firstwhitecatquestid() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  whitecatrepeatopencondition() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetOpenconditionAt(t, i) {
    return this.opencondition(t);
  }
  opencondition(t, i) {
    var s = this.J7.__offset(this.z7, 30);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  openconditionLength() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  dreamlinkteleportmarkid() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetTabtextAt(t, i) {
    return this.tabtext(t);
  }
  tabtext(t, i) {
    var s = this.J7.__offset(this.z7, 34);
    if (s) {
      return (i || new DicIntString_1.DicIntString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  tabtextLength() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetTabiconAt(t, i) {
    return this.tabicon(t);
  }
  tabicon(t, i) {
    var s = this.J7.__offset(this.z7, 36);
    if (s) {
      return (i || new DicIntString_1.DicIntString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  tabiconLength() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetBosstabtextAt(t, i) {
    return this.bosstabtext(t);
  }
  bosstabtext(t, i) {
    var s = this.J7.__offset(this.z7, 38);
    if (s) {
      return (i || new DicIntString_1.DicIntString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  bosstabtextLength() {
    var t = this.J7.__offset(this.z7, 38);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  plotrolelinkaudio(t) {
    var i = this.J7.__offset(this.z7, 40);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetBossinstancelistAt(t) {
    return this.bossinstancelist(t);
  }
  bossinstancelist(t) {
    var i = this.J7.__offset(this.z7, 42);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  bossinstancelistLength() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  bossinstancelistArray() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  weaponpreviewid() {
    var t = this.J7.__offset(this.z7, 44);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  dungeonbaseprogress() {
    var t = this.J7.__offset(this.z7, 46);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  dungeonmaxprogress() {
    var t = this.J7.__offset(this.z7, 48);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPreloadroleidsAt(t, i) {
    return this.preloadroleids(t);
  }
  preloadroleids(t, i) {
    var s = this.J7.__offset(this.z7, 50);
    if (s) {
      return (i || new DicIntString_1.DicIntString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  preloadroleidsLength() {
    var t = this.J7.__offset(this.z7, 50);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPlotrolelinkteamAt(t) {
    return this.plotrolelinkteam(t);
  }
  plotrolelinkteam(t) {
    var i = this.J7.__offset(this.z7, 52);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  plotrolelinkteamLength() {
    var t = this.J7.__offset(this.z7, 52);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  plotrolelinkteamArray() {
    var t = this.J7.__offset(this.z7, 52);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.RogueWhiteCat = RogueWhiteCat;
//# sourceMappingURL=RogueWhiteCat.js.map