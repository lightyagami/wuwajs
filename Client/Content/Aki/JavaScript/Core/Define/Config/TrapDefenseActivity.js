"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseActivity = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const IntArray_1 = require("./SubType/IntArray");
class TrapDefenseActivity {
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
  get InstId() {
    return this.instid();
  }
  get ModeType() {
    return this.modetype();
  }
  get GroupId() {
    return this.groupid();
  }
  get LevelGaining() {
    return GameUtils_1.GameUtils.ConvertToArray(this.levelgainingLength(), this.levelgaining, this);
  }
  get OpenDay() {
    return this.openday();
  }
  get OpenCondition() {
    return this.opencondition();
  }
  get NextId() {
    return this.nextid();
  }
  get StarRatingConditions() {
    return GameUtils_1.GameUtils.ConvertToArray(this.starratingconditionsLength(), this.starratingconditions, this);
  }
  get RewardStarLimit() {
    return this.rewardstarlimit();
  }
  get RewardMoneyCount() {
    return this.rewardmoneycount();
  }
  get RewardBuildingTypes() {
    return GameUtils_1.GameUtils.ConvertToArray(this.rewardbuildingtypesLength(), this.rewardbuildingtypes, this);
  }
  get RewardAuxiliaryTypes() {
    return GameUtils_1.GameUtils.ConvertToArray(this.rewardauxiliarytypesLength(), this.rewardauxiliarytypes, this);
  }
  get RewardBd() {
    return GameUtils_1.GameUtils.ConvertToArray(this.rewardbdLength(), this.rewardbd, this);
  }
  get InitHealth() {
    return this.inithealth();
  }
  get InitGold() {
    return this.initgold();
  }
  get InitMaxBuildingCount() {
    return this.initmaxbuildingcount();
  }
  get AuxiliarySummonCfgId() {
    return this.auxiliarysummoncfgid();
  }
  get DefaultBuildingType() {
    return GameUtils_1.GameUtils.ConvertToArray(this.defaultbuildingtypeLength(), this.defaultbuildingtype, this);
  }
  get DefaultAuxiliaryType() {
    return GameUtils_1.GameUtils.ConvertToArray(this.defaultauxiliarytypeLength(), this.defaultauxiliarytype, this);
  }
  get ForceBuildingType() {
    return GameUtils_1.GameUtils.ConvertToArray(this.forcebuildingtypeLength(), this.forcebuildingtype, this);
  }
  get ForceAuxiliaryType() {
    return GameUtils_1.GameUtils.ConvertToArray(this.forceauxiliarytypeLength(), this.forceauxiliarytype, this);
  }
  get RecommendBuildingType() {
    return GameUtils_1.GameUtils.ConvertToArray(this.recommendbuildingtypeLength(), this.recommendbuildingtype, this);
  }
  get RecommendAuxiliaryType() {
    return GameUtils_1.GameUtils.ConvertToArray(this.recommendauxiliarytypeLength(), this.recommendauxiliarytype, this);
  }
  get BaseEquipCount() {
    return this.baseequipcount();
  }
  get BaseAuxiliaryCount() {
    return this.baseauxiliarycount();
  }
  get BaseResolvePolluteCount() {
    return this.baseresolvepollutecount();
  }
  get Difficulty() {
    return this.difficulty();
  }
  get Name() {
    return this.name();
  }
  get LevelNameImage() {
    return this.levelnameimage();
  }
  get LevelImage() {
    return this.levelimage();
  }
  get ResultImage() {
    return this.resultimage();
  }
  get DifficultyDesc() {
    return this.difficultydesc();
  }
  get DifficultyDescArgs() {
    return GameUtils_1.GameUtils.ConvertToArray(this.difficultydescargsLength(), this.difficultydescargs, this);
  }
  get LockDesc() {
    return this.lockdesc();
  }
  get TargetDesc() {
    return this.targetdesc();
  }
  get RewardDrop() {
    return this.rewarddrop();
  }
  get RewardDesc() {
    return this.rewarddesc();
  }
  get UseBdList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.usebdlistLength(), this.usebdlist, this);
  }
  get GuranteeDraw() {
    return this.guranteedraw();
  }
  get MonsterWaveMainId() {
    return this.monsterwavemainid();
  }
  get LoopStartWaveId() {
    return this.loopstartwaveid();
  }
  get LoopStartWaveDesc() {
    return this.loopstartwavedesc();
  }
  get SplineList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.splinelistLength(), this.splinelist, this);
  }
  get LevelMapUiShow() {
    return this.levelmapuishow();
  }
  get UnlockLevelNeedStar() {
    return this.unlocklevelneedstar();
  }
  get NeedStarWhenPause() {
    return this.needstarwhenpause();
  }
  get IsCanSave() {
    return this.iscansave();
  }
  get WorldKillZ() {
    return this.worldkillz();
  }
  get ObstacleSegments() {
    return GameUtils_1.GameUtils.ConvertToArray(this.obstaclesegmentsLength(), this.obstaclesegments, this);
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsTrapDefenseActivity(t, i) {
    return (i || new TrapDefenseActivity()).__init(t.readInt32(t.position()) + t.position(), t);
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
  instid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  modetype() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  groupid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetLevelgainingAt(t) {
    return this.levelgaining(t);
  }
  levelgaining(t) {
    var i = this.J7.__offset(this.z7, 14);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  levelgainingLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  levelgainingArray() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  openday() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  opencondition() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  nextid() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetStarratingconditionsAt(t, i) {
    return this.starratingconditions(t);
  }
  starratingconditions(t, i) {
    var s = this.J7.__offset(this.z7, 22);
    if (s) {
      return (i || new IntArray_1.IntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  starratingconditionsLength() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  rewardstarlimit() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  rewardmoneycount() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRewardbuildingtypesAt(t) {
    return this.rewardbuildingtypes(t);
  }
  rewardbuildingtypes(t) {
    var i = this.J7.__offset(this.z7, 28);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  rewardbuildingtypesLength() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  rewardbuildingtypesArray() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetRewardauxiliarytypesAt(t) {
    return this.rewardauxiliarytypes(t);
  }
  rewardauxiliarytypes(t) {
    var i = this.J7.__offset(this.z7, 30);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  rewardauxiliarytypesLength() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  rewardauxiliarytypesArray() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetRewardbdAt(t) {
    return this.rewardbd(t);
  }
  rewardbd(t) {
    var i = this.J7.__offset(this.z7, 32);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  rewardbdLength() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  rewardbdArray() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  inithealth() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  initgold() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  initmaxbuildingcount() {
    var t = this.J7.__offset(this.z7, 38);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  auxiliarysummoncfgid() {
    var t = this.J7.__offset(this.z7, 40);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetDefaultbuildingtypeAt(t) {
    return this.defaultbuildingtype(t);
  }
  defaultbuildingtype(t) {
    var i = this.J7.__offset(this.z7, 42);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  defaultbuildingtypeLength() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  defaultbuildingtypeArray() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetDefaultauxiliarytypeAt(t) {
    return this.defaultauxiliarytype(t);
  }
  defaultauxiliarytype(t) {
    var i = this.J7.__offset(this.z7, 44);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  defaultauxiliarytypeLength() {
    var t = this.J7.__offset(this.z7, 44);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  defaultauxiliarytypeArray() {
    var t = this.J7.__offset(this.z7, 44);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetForcebuildingtypeAt(t) {
    return this.forcebuildingtype(t);
  }
  forcebuildingtype(t) {
    var i = this.J7.__offset(this.z7, 46);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  forcebuildingtypeLength() {
    var t = this.J7.__offset(this.z7, 46);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  forcebuildingtypeArray() {
    var t = this.J7.__offset(this.z7, 46);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetForceauxiliarytypeAt(t) {
    return this.forceauxiliarytype(t);
  }
  forceauxiliarytype(t) {
    var i = this.J7.__offset(this.z7, 48);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  forceauxiliarytypeLength() {
    var t = this.J7.__offset(this.z7, 48);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  forceauxiliarytypeArray() {
    var t = this.J7.__offset(this.z7, 48);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetRecommendbuildingtypeAt(t) {
    return this.recommendbuildingtype(t);
  }
  recommendbuildingtype(t) {
    var i = this.J7.__offset(this.z7, 50);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  recommendbuildingtypeLength() {
    var t = this.J7.__offset(this.z7, 50);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  recommendbuildingtypeArray() {
    var t = this.J7.__offset(this.z7, 50);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetRecommendauxiliarytypeAt(t) {
    return this.recommendauxiliarytype(t);
  }
  recommendauxiliarytype(t) {
    var i = this.J7.__offset(this.z7, 52);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  recommendauxiliarytypeLength() {
    var t = this.J7.__offset(this.z7, 52);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  recommendauxiliarytypeArray() {
    var t = this.J7.__offset(this.z7, 52);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  baseequipcount() {
    var t = this.J7.__offset(this.z7, 54);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 3;
    }
  }
  baseauxiliarycount() {
    var t = this.J7.__offset(this.z7, 56);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  baseresolvepollutecount() {
    var t = this.J7.__offset(this.z7, 58);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  difficulty() {
    var t = this.J7.__offset(this.z7, 60);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 62);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  levelnameimage(t) {
    var i = this.J7.__offset(this.z7, 64);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  levelimage(t) {
    var i = this.J7.__offset(this.z7, 66);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  resultimage(t) {
    var i = this.J7.__offset(this.z7, 68);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  difficultydesc(t) {
    var i = this.J7.__offset(this.z7, 70);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetDifficultydescargsAt(t) {
    return this.difficultydescargs(t);
  }
  difficultydescargs(t, i) {
    var s = this.J7.__offset(this.z7, 72);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  difficultydescargsLength() {
    var t = this.J7.__offset(this.z7, 72);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  lockdesc(t) {
    var i = this.J7.__offset(this.z7, 74);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  targetdesc(t) {
    var i = this.J7.__offset(this.z7, 76);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  rewarddrop() {
    var t = this.J7.__offset(this.z7, 78);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rewarddesc(t) {
    var i = this.J7.__offset(this.z7, 80);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetUsebdlistAt(t) {
    return this.usebdlist(t);
  }
  usebdlist(t) {
    var i = this.J7.__offset(this.z7, 82);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  usebdlistLength() {
    var t = this.J7.__offset(this.z7, 82);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  usebdlistArray() {
    var t = this.J7.__offset(this.z7, 82);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  guranteedraw() {
    var t = this.J7.__offset(this.z7, 84);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  monsterwavemainid() {
    var t = this.J7.__offset(this.z7, 86);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  loopstartwaveid() {
    var t = this.J7.__offset(this.z7, 88);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  loopstartwavedesc(t) {
    var i = this.J7.__offset(this.z7, 90);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetSplinelistAt(t) {
    return this.splinelist(t);
  }
  splinelist(t) {
    var i = this.J7.__offset(this.z7, 92);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  splinelistLength() {
    var t = this.J7.__offset(this.z7, 92);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  splinelistArray() {
    var t = this.J7.__offset(this.z7, 92);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  levelmapuishow(t) {
    var i = this.J7.__offset(this.z7, 94);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  unlocklevelneedstar() {
    var t = this.J7.__offset(this.z7, 96);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  needstarwhenpause() {
    var t = this.J7.__offset(this.z7, 98);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  iscansave() {
    var t = this.J7.__offset(this.z7, 100);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  worldkillz() {
    var t = this.J7.__offset(this.z7, 102);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetObstaclesegmentsAt(t, i) {
    return this.obstaclesegments(t);
  }
  obstaclesegments(t, i) {
    var s = this.J7.__offset(this.z7, 104);
    if (s) {
      return (i || new IntArray_1.IntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  obstaclesegmentsLength() {
    var t = this.J7.__offset(this.z7, 104);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.TrapDefenseActivity = TrapDefenseActivity;
//# sourceMappingURL=TrapDefenseActivity.js.map