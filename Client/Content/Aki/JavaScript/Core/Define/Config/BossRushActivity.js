"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BossRushActivity = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const IntPair_1 = require("./SubType/IntPair");
class BossRushActivity {
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
  get GroupId() {
    return this.groupid();
  }
  get SortId() {
    return this.sortid();
  }
  get BuffCount() {
    return this.buffcount();
  }
  get DefaultBuff() {
    return GameUtils_1.GameUtils.ConvertToArray(this.defaultbuffLength(), this.defaultbuff, this);
  }
  get OptionalBuff() {
    return GameUtils_1.GameUtils.ConvertToArray(this.optionalbuffLength(), this.optionalbuff, this);
  }
  get UnlockBuff() {
    return GameUtils_1.GameUtils.ConvertToArray(this.unlockbuffLength(), this.unlockbuff, this);
  }
  get OpenDay() {
    return this.openday();
  }
  get Condition() {
    return this.condition();
  }
  get PreLevel() {
    return this.prelevel();
  }
  get RewardScore() {
    return this.rewardscore();
  }
  get LevelRewardDesc() {
    return this.levelrewarddesc();
  }
  get LevelDesc() {
    return this.leveldesc();
  }
  get RewardId() {
    return this.rewardid();
  }
  get BossInfo() {
    return this.bossinfo();
  }
  get PreviewTexture() {
    return this.previewtexture();
  }
  get StageTexture() {
    return this.stagetexture();
  }
  get BossCount() {
    return this.bosscount();
  }
  get ScoreBuffCount() {
    return this.scorebuffcount();
  }
  get ScoreBuff() {
    return GameUtils_1.GameUtils.ConvertToArray(this.scorebuffLength(), this.scorebuff, this);
  }
  get LevelScoreRewardList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.levelscorerewardlistLength(), this.levelscorerewardlist, this);
  }
  get RewardName() {
    return this.rewardname();
  }
  get RewardTexture() {
    return this.rewardtexture();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsBossRushActivity(t, s) {
    return (s || new BossRushActivity()).__init(t.readInt32(t.position()) + t.position(), t);
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
  groupid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sortid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  buffcount() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetDefaultbuffAt(t) {
    return this.defaultbuff(t);
  }
  defaultbuff(t) {
    var s = this.J7.__offset(this.z7, 16);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  defaultbuffLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  defaultbuffArray() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetOptionalbuffAt(t) {
    return this.optionalbuff(t);
  }
  optionalbuff(t) {
    var s = this.J7.__offset(this.z7, 18);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  optionalbuffLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  optionalbuffArray() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetUnlockbuffAt(t) {
    return this.unlockbuff(t);
  }
  unlockbuff(t) {
    var s = this.J7.__offset(this.z7, 20);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  unlockbuffLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  unlockbuffArray() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  openday() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  condition() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  prelevel() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rewardscore() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  levelrewarddesc(t) {
    var s = this.J7.__offset(this.z7, 30);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  leveldesc(t) {
    var s = this.J7.__offset(this.z7, 32);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  rewardid() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  bossinfo() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  previewtexture(t) {
    var s = this.J7.__offset(this.z7, 38);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  stagetexture(t) {
    var s = this.J7.__offset(this.z7, 40);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  bosscount() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  scorebuffcount() {
    var t = this.J7.__offset(this.z7, 44);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetScorebuffAt(t) {
    return this.scorebuff(t);
  }
  scorebuff(t) {
    var s = this.J7.__offset(this.z7, 46);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  scorebuffLength() {
    var t = this.J7.__offset(this.z7, 46);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  scorebuffArray() {
    var t = this.J7.__offset(this.z7, 46);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetLevelscorerewardlistAt(t, s) {
    return this.levelscorerewardlist(t);
  }
  levelscorerewardlist(t, s) {
    var i = this.J7.__offset(this.z7, 48);
    if (i) {
      return (s || new IntPair_1.IntPair()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  levelscorerewardlistLength() {
    var t = this.J7.__offset(this.z7, 48);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  rewardname(t) {
    var s = this.J7.__offset(this.z7, 50);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  rewardtexture(t) {
    var s = this.J7.__offset(this.z7, 52);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.BossRushActivity = BossRushActivity;
//# sourceMappingURL=BossRushActivity.js.map