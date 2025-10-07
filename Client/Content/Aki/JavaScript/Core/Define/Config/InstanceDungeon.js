"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeon = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
const DicIntString_1 = require("./SubType/DicIntString");
const DungeonEntrance_1 = require("./SubType/DungeonEntrance");
const InstOnlineType_1 = require("./SubType/InstOnlineType");
class InstanceDungeon {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get MapConfigId() {
    return this.mapconfigid();
  }
  get MapName() {
    return this.mapname();
  }
  get InstType() {
    return this.insttype();
  }
  get InstSubType() {
    return this.instsubtype();
  }
  get WorldDungeonSubType() {
    return this.worlddungeonsubtype();
  }
  get OnlineType() {
    return this.onlinetype();
  }
  get CustomTypes() {
    return GameUtils_1.GameUtils.ConvertToArray(this.customtypesLength(), this.customtypes, this);
  }
  get MiniMapId() {
    return this.minimapid();
  }
  get SubLevels() {
    return GameUtils_1.GameUtils.ConvertToArray(this.sublevelsLength(), this.sublevels, this);
  }
  get FightFormationId() {
    return this.fightformationid();
  }
  get RoleTypeList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.roletypelistLength(), this.roletypelist, this);
  }
  get TrialRoleInfo() {
    return GameUtils_1.GameUtils.ConvertToArray(this.trialroleinfoLength(), this.trialroleinfo, this);
  }
  get TrialRoleFormation() {
    return this.trialroleformation();
  }
  get ReviveId() {
    return this.reviveid();
  }
  get BornPosition() {
    return GameUtils_1.GameUtils.ConvertToArray(this.bornpositionLength(), this.bornposition, this);
  }
  get BornRotation() {
    return GameUtils_1.GameUtils.ConvertToArray(this.bornrotationLength(), this.bornrotation, this);
  }
  get RecoverWorldLocation() {
    return GameUtils_1.GameUtils.ConvertToArray(this.recoverworldlocationLength(), this.recoverworldlocation, this);
  }
  get ExitDungeonConfirmId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.exitdungeonconfirmidLength(), this.exitdungeonconfirmid, this);
  }
  get EntranceEntities() {
    return GameUtils_1.GameUtils.ConvertToArray(this.entranceentitiesLength(), this.entranceentities, this);
  }
  get ExitEntities() {
    return GameUtils_1.GameUtils.ConvertToArray(this.exitentitiesLength(), this.exitentities, this);
  }
  get DungeonDesc() {
    return this.dungeondesc();
  }
  get Title() {
    return this.title();
  }
  get BannerPath() {
    return this.bannerpath();
  }
  get MonsterPreview() {
    return GameUtils_1.GameUtils.ConvertToArray(this.monsterpreviewLength(), this.monsterpreview, this);
  }
  get MonsterTips() {
    return this.monstertips();
  }
  get FirstRewardId() {
    return this.firstrewardid();
  }
  get RewardId() {
    return this.rewardid();
  }
  get RepeatRewardId() {
    return this.repeatrewardid();
  }
  get ExchangeRewardId() {
    return this.exchangerewardid();
  }
  get SharedTreasureGroup() {
    return GameUtils_1.GameUtils.ConvertToArray(this.sharedtreasuregroupLength(), this.sharedtreasuregroup, this);
  }
  get EnterControlId() {
    return this.entercontrolid();
  }
  get EnterCondition() {
    return GameUtils_1.GameUtils.ConvertToArray(this.enterconditionLength(), this.entercondition, this);
  }
  get EnterConditionText() {
    return this.enterconditiontext();
  }
  get DifficultyIcon() {
    return this.difficultyicon();
  }
  get EntityLevel() {
    return this.entitylevel();
  }
  get RecommendLevel() {
    return GameUtils_1.GameUtils.ConvertToMap(this.recommendlevelLength(), this.recommendlevelKey, this.recommendlevelValue, this);
  }
  recommendlevelKey(t) {
    return this.recommendlevel(t)?.key();
  }
  recommendlevelValue(t) {
    return this.recommendlevel(t)?.value();
  }
  get RecommendRole() {
    return GameUtils_1.GameUtils.ConvertToArray(this.recommendroleLength(), this.recommendrole, this);
  }
  get RecommendElement() {
    return GameUtils_1.GameUtils.ConvertToArray(this.recommendelementLength(), this.recommendelement, this);
  }
  get ShareAttri() {
    return this.shareattri();
  }
  get FightInfoDtType() {
    return GameUtils_1.GameUtils.ConvertToArray(this.fightinfodttypeLength(), this.fightinfodttype, this);
  }
  get SaveDays() {
    return this.savedays();
  }
  get LimitViewName() {
    return GameUtils_1.GameUtils.ConvertToArray(this.limitviewnameLength(), this.limitviewname, this);
  }
  get FuncLimit() {
    return GameUtils_1.GameUtils.ConvertToArray(this.funclimitLength(), this.funclimit, this);
  }
  get CanUseItem() {
    return this.canuseitem();
  }
  get GameplayMode() {
    return this.gameplaymode();
  }
  get GuideType() {
    return this.guidetype();
  }
  get GuideValue() {
    return this.guidevalue();
  }
  get SettleButtonType() {
    return this.settlebuttontype();
  }
  get SubTitle() {
    return GameUtils_1.GameUtils.ConvertToMap(this.subtitleLength(), this.subtitleKey, this.subtitleValue, this);
  }
  subtitleKey(t) {
    return this.subtitle(t)?.key();
  }
  subtitleValue(t) {
    return this.subtitle(t)?.value();
  }
  get SubInstanceTitle() {
    return this.subinstancetitle();
  }
  get AutoLeaveTime() {
    return this.autoleavetime();
  }
  get LimitTime() {
    return this.limittime();
  }
  get LeaveWaitTime() {
    return this.leavewaittime();
  }
  get FailTips() {
    return this.failtips();
  }
  get VerifyCreatureGen() {
    return this.verifycreaturegen();
  }
  get DifficultyLevel() {
    return GameUtils_1.GameUtils.ConvertToArray(this.difficultylevelLength(), this.difficultylevel, this);
  }
  get DifficultyDesc() {
    return GameUtils_1.GameUtils.ConvertToArray(this.difficultydescLength(), this.difficultydesc, this);
  }
  get Drop() {
    return GameUtils_1.GameUtils.ConvertToArray(this.dropLength(), this.drop, this);
  }
  get EnterCount() {
    return this.entercount();
  }
  get EnterConditionGroup() {
    return this.enterconditiongroup();
  }
  get IconTagPath() {
    return this.icontagpath();
  }
  get ViewMapId() {
    return this.viewmapid();
  }
  get RenderSettings() {
    return GameUtils_1.GameUtils.ConvertToMap(this.rendersettingsLength(), this.rendersettingsKey, this.rendersettingsValue, this);
  }
  rendersettingsKey(t) {
    return this.rendersettings(t)?.key();
  }
  rendersettingsValue(t) {
    return this.rendersettings(t)?.value();
  }
  get DropVisionLimit() {
    return this.dropvisionlimit();
  }
  get RecommendRoleBottom() {
    return GameUtils_1.GameUtils.ConvertToArray(this.recommendrolebottomLength(), this.recommendrolebottom, this);
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsInstanceDungeon(t, i) {
    return (i || new InstanceDungeon()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  mapconfigid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  mapname(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  insttype() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  instsubtype() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  worlddungeonsubtype() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  onlinetype() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt8(this.z7 + t);
    } else {
      return InstOnlineType_1.InstOnlineType.Single;
    }
  }
  GetCustomtypesAt(t) {
    return this.customtypes(t);
  }
  customtypes(t) {
    var i = this.J7.__offset(this.z7, 18);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  customtypesLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  customtypesArray() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  minimapid() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  GetSublevelsAt(t) {
    return this.sublevels(t);
  }
  sublevels(t, i) {
    var s = this.J7.__offset(this.z7, 22);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  sublevelsLength() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  fightformationid() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 2;
    }
  }
  GetRoletypelistAt(t) {
    return this.roletypelist(t);
  }
  roletypelist(t) {
    var i = this.J7.__offset(this.z7, 26);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  roletypelistLength() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  roletypelistArray() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetTrialroleinfoAt(t) {
    return this.trialroleinfo(t);
  }
  trialroleinfo(t) {
    var i = this.J7.__offset(this.z7, 28);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  trialroleinfoLength() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  trialroleinfoArray() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  trialroleformation() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  reviveid() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetBornpositionAt(t) {
    return this.bornposition(t);
  }
  bornposition(t) {
    var i = this.J7.__offset(this.z7, 34);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  bornpositionLength() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  bornpositionArray() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetBornrotationAt(t) {
    return this.bornrotation(t);
  }
  bornrotation(t) {
    var i = this.J7.__offset(this.z7, 36);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  bornrotationLength() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  bornrotationArray() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetRecoverworldlocationAt(t) {
    return this.recoverworldlocation(t);
  }
  recoverworldlocation(t) {
    var i = this.J7.__offset(this.z7, 38);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  recoverworldlocationLength() {
    var t = this.J7.__offset(this.z7, 38);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  recoverworldlocationArray() {
    var t = this.J7.__offset(this.z7, 38);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetExitdungeonconfirmidAt(t) {
    return this.exitdungeonconfirmid(t);
  }
  exitdungeonconfirmid(t) {
    var i = this.J7.__offset(this.z7, 40);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  exitdungeonconfirmidLength() {
    var t = this.J7.__offset(this.z7, 40);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  exitdungeonconfirmidArray() {
    var t = this.J7.__offset(this.z7, 40);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetEntranceentitiesAt(t, i) {
    return this.entranceentities(t);
  }
  entranceentities(t, i) {
    var s = this.J7.__offset(this.z7, 42);
    if (s) {
      return (i || new DungeonEntrance_1.DungeonEntrance()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  entranceentitiesLength() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetExitentitiesAt(t) {
    return this.exitentities(t);
  }
  exitentities(t) {
    var i = this.J7.__offset(this.z7, 44);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  exitentitiesLength() {
    var t = this.J7.__offset(this.z7, 44);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  exitentitiesArray() {
    var t = this.J7.__offset(this.z7, 44);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  dungeondesc(t) {
    var i = this.J7.__offset(this.z7, 46);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  title() {
    var t = this.J7.__offset(this.z7, 48);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 999;
    }
  }
  bannerpath(t) {
    var i = this.J7.__offset(this.z7, 50);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetMonsterpreviewAt(t) {
    return this.monsterpreview(t);
  }
  monsterpreview(t) {
    var i = this.J7.__offset(this.z7, 52);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  monsterpreviewLength() {
    var t = this.J7.__offset(this.z7, 52);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  monsterpreviewArray() {
    var t = this.J7.__offset(this.z7, 52);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  monstertips(t) {
    var i = this.J7.__offset(this.z7, 54);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  firstrewardid() {
    var t = this.J7.__offset(this.z7, 56);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rewardid() {
    var t = this.J7.__offset(this.z7, 58);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  repeatrewardid() {
    var t = this.J7.__offset(this.z7, 60);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  exchangerewardid() {
    var t = this.J7.__offset(this.z7, 62);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetSharedtreasuregroupAt(t) {
    return this.sharedtreasuregroup(t);
  }
  sharedtreasuregroup(t) {
    var i = this.J7.__offset(this.z7, 64);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  sharedtreasuregroupLength() {
    var t = this.J7.__offset(this.z7, 64);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  sharedtreasuregroupArray() {
    var t = this.J7.__offset(this.z7, 64);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  entercontrolid() {
    var t = this.J7.__offset(this.z7, 66);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetEnterconditionAt(t) {
    return this.entercondition(t);
  }
  entercondition(t) {
    var i = this.J7.__offset(this.z7, 68);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  enterconditionLength() {
    var t = this.J7.__offset(this.z7, 68);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  enterconditionArray() {
    var t = this.J7.__offset(this.z7, 68);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  enterconditiontext(t) {
    var i = this.J7.__offset(this.z7, 70);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  difficultyicon(t) {
    var i = this.J7.__offset(this.z7, 72);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  entitylevel() {
    var t = this.J7.__offset(this.z7, 74);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRecommendlevelAt(t, i) {
    return this.recommendlevel(t);
  }
  recommendlevel(t, i) {
    var s = this.J7.__offset(this.z7, 76);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  recommendlevelLength() {
    var t = this.J7.__offset(this.z7, 76);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRecommendroleAt(t) {
    return this.recommendrole(t);
  }
  recommendrole(t) {
    var i = this.J7.__offset(this.z7, 78);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  recommendroleLength() {
    var t = this.J7.__offset(this.z7, 78);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  recommendroleArray() {
    var t = this.J7.__offset(this.z7, 78);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetRecommendelementAt(t) {
    return this.recommendelement(t);
  }
  recommendelement(t) {
    var i = this.J7.__offset(this.z7, 80);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  recommendelementLength() {
    var t = this.J7.__offset(this.z7, 80);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  recommendelementArray() {
    var t = this.J7.__offset(this.z7, 80);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  shareattri() {
    var t = this.J7.__offset(this.z7, 82);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  GetFightinfodttypeAt(t) {
    return this.fightinfodttype(t);
  }
  fightinfodttype(t) {
    var i = this.J7.__offset(this.z7, 84);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  fightinfodttypeLength() {
    var t = this.J7.__offset(this.z7, 84);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  fightinfodttypeArray() {
    var t = this.J7.__offset(this.z7, 84);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  savedays() {
    var t = this.J7.__offset(this.z7, 86);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetLimitviewnameAt(t) {
    return this.limitviewname(t);
  }
  limitviewname(t, i) {
    var s = this.J7.__offset(this.z7, 88);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  limitviewnameLength() {
    var t = this.J7.__offset(this.z7, 88);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetFunclimitAt(t) {
    return this.funclimit(t);
  }
  funclimit(t) {
    var i = this.J7.__offset(this.z7, 90);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  funclimitLength() {
    var t = this.J7.__offset(this.z7, 90);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  funclimitArray() {
    var t = this.J7.__offset(this.z7, 90);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  canuseitem() {
    var t = this.J7.__offset(this.z7, 92);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  gameplaymode() {
    var t = this.J7.__offset(this.z7, 94);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  guidetype() {
    var t = this.J7.__offset(this.z7, 96);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  guidevalue() {
    var t = this.J7.__offset(this.z7, 98);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  settlebuttontype() {
    var t = this.J7.__offset(this.z7, 100);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  GetSubtitleAt(t, i) {
    return this.subtitle(t);
  }
  subtitle(t, i) {
    var s = this.J7.__offset(this.z7, 102);
    if (s) {
      return (i || new DicIntString_1.DicIntString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  subtitleLength() {
    var t = this.J7.__offset(this.z7, 102);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  subinstancetitle(t) {
    var i = this.J7.__offset(this.z7, 104);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  autoleavetime() {
    var t = this.J7.__offset(this.z7, 106);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 300;
    }
  }
  limittime() {
    var t = this.J7.__offset(this.z7, 108);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  leavewaittime() {
    var t = this.J7.__offset(this.z7, 110);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  failtips(t) {
    var i = this.J7.__offset(this.z7, 112);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  verifycreaturegen() {
    var t = this.J7.__offset(this.z7, 114);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  GetDifficultylevelAt(t) {
    return this.difficultylevel(t);
  }
  difficultylevel(t) {
    var i = this.J7.__offset(this.z7, 116);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  difficultylevelLength() {
    var t = this.J7.__offset(this.z7, 116);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  difficultylevelArray() {
    var t = this.J7.__offset(this.z7, 116);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetDifficultydescAt(t) {
    return this.difficultydesc(t);
  }
  difficultydesc(t, i) {
    var s = this.J7.__offset(this.z7, 118);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  difficultydescLength() {
    var t = this.J7.__offset(this.z7, 118);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetDropAt(t) {
    return this.drop(t);
  }
  drop(t) {
    var i = this.J7.__offset(this.z7, 120);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  dropLength() {
    var t = this.J7.__offset(this.z7, 120);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  dropArray() {
    var t = this.J7.__offset(this.z7, 120);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  entercount() {
    var t = this.J7.__offset(this.z7, 122);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  enterconditiongroup() {
    var t = this.J7.__offset(this.z7, 124);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  icontagpath(t) {
    var i = this.J7.__offset(this.z7, 126);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  viewmapid() {
    var t = this.J7.__offset(this.z7, 128);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRendersettingsAt(t, i) {
    return this.rendersettings(t);
  }
  rendersettings(t, i) {
    var s = this.J7.__offset(this.z7, 130);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  rendersettingsLength() {
    var t = this.J7.__offset(this.z7, 130);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  dropvisionlimit() {
    var t = this.J7.__offset(this.z7, 132);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRecommendrolebottomAt(t) {
    return this.recommendrolebottom(t);
  }
  recommendrolebottom(t) {
    var i = this.J7.__offset(this.z7, 134);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  recommendrolebottomLength() {
    var t = this.J7.__offset(this.z7, 134);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  recommendrolebottomArray() {
    var t = this.J7.__offset(this.z7, 134);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.InstanceDungeon = InstanceDungeon;
//# sourceMappingURL=InstanceDungeon.js.map