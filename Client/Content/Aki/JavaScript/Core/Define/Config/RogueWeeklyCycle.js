"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueWeeklyCycle = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class RogueWeeklyCycle {
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
  get TimeId() {
    return this.timeid();
  }
  get Diff() {
    return GameUtils_1.GameUtils.ConvertToMap(this.diffLength(), this.diffKey, this.diffValue, this);
  }
  diffKey(t) {
    return this.diff(t)?.key();
  }
  diffValue(t) {
    return this.diff(t)?.value();
  }
  get MapMark() {
    return this.mapmark();
  }
  get QuestId() {
    return this.questid();
  }
  get EntranceId() {
    return this.entranceid();
  }
  get InstId() {
    return this.instid();
  }
  get RecommendedRole() {
    return GameUtils_1.GameUtils.ConvertToArray(this.recommendedroleLength(), this.recommendedrole, this);
  }
  get ScoreRate() {
    return this.scorerate();
  }
  get RoguelikeRoomFloatTipsSpecialIcon() {
    return this.roguelikeroomfloattipsspecialicon();
  }
  get BlackFlowerCost() {
    return GameUtils_1.GameUtils.ConvertToMap(this.blackflowercostLength(), this.blackflowercostKey, this.blackflowercostValue, this);
  }
  blackflowercostKey(t) {
    return this.blackflowercost(t)?.key();
  }
  blackflowercostValue(t) {
    return this.blackflowercost(t)?.value();
  }
  get BlackFlowerAward() {
    return this.blackfloweraward();
  }
  get GoldItemId() {
    return this.golditemid();
  }
  get CycleName() {
    return this.cyclename();
  }
  get ViewBackground() {
    return this.viewbackground();
  }
  get BuffIcon() {
    return this.bufficon();
  }
  get BuffPR() {
    return this.buffpr();
  }
  get BuffDesc() {
    return this.buffdesc();
  }
  get BuffDescParam() {
    return GameUtils_1.GameUtils.ConvertToArray(this.buffdescparamLength(), this.buffdescparam, this);
  }
  get HelpId() {
    return this.helpid();
  }
  get BlackFlowerHelpId() {
    return this.blackflowerhelpid();
  }
  get MaxScore() {
    return this.maxscore();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsRogueWeeklyCycle(t, i) {
    return (i || new RogueWeeklyCycle()).__init(t.readInt32(t.position()) + t.position(), t);
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
  timeid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetDiffAt(t, i) {
    return this.diff(t);
  }
  diff(t, i) {
    var s = this.J7.__offset(this.z7, 10);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  diffLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  mapmark() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  questid() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  entranceid() {
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
  GetRecommendedroleAt(t) {
    return this.recommendedrole(t);
  }
  recommendedrole(t) {
    var i = this.J7.__offset(this.z7, 20);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  recommendedroleLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  recommendedroleArray() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  scorerate() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  roguelikeroomfloattipsspecialicon(t) {
    var i = this.J7.__offset(this.z7, 24);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetBlackflowercostAt(t, i) {
    return this.blackflowercost(t);
  }
  blackflowercost(t, i) {
    var s = this.J7.__offset(this.z7, 26);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  blackflowercostLength() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  blackfloweraward() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  golditemid() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  cyclename(t) {
    var i = this.J7.__offset(this.z7, 32);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  viewbackground(t) {
    var i = this.J7.__offset(this.z7, 34);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  bufficon(t) {
    var i = this.J7.__offset(this.z7, 36);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  buffpr() {
    var t = this.J7.__offset(this.z7, 38);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  buffdesc(t) {
    var i = this.J7.__offset(this.z7, 40);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetBuffdescparamAt(t) {
    return this.buffdescparam(t);
  }
  buffdescparam(t, i) {
    var s = this.J7.__offset(this.z7, 42);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  buffdescparamLength() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  helpid() {
    var t = this.J7.__offset(this.z7, 44);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  blackflowerhelpid() {
    var t = this.J7.__offset(this.z7, 46);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxscore() {
    var t = this.J7.__offset(this.z7, 48);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.RogueWeeklyCycle = RogueWeeklyCycle;
//# sourceMappingURL=RogueWeeklyCycle.js.map