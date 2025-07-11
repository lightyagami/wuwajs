"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenceInstance = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class TowerDefenceInstance {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get InstanceId() {
    return this.instanceid();
  }
  get ActivityId() {
    return this.activityid();
  }
  get GroupId() {
    return this.groupid();
  }
  get Difficulty() {
    return this.difficulty();
  }
  get SortId() {
    return this.sortid();
  }
  get OptionalBuff() {
    return GameUtils_1.GameUtils.ConvertToArray(this.optionalbuffLength(), this.optionalbuff, this);
  }
  get OpenDay() {
    return this.openday();
  }
  get Condition() {
    return this.condition();
  }
  get RewardId() {
    return this.rewardid();
  }
  get RewardScore() {
    return this.rewardscore();
  }
  get LevelRewardDesc() {
    return this.levelrewarddesc();
  }
  get BaseEntityId() {
    return this.baseentityid();
  }
  get UnlockScoreLimit() {
    return this.unlockscorelimit();
  }
  get IsDifficult() {
    return this.isdifficult();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsTowerDefenceInstance(t, i) {
    return (i || new TowerDefenceInstance()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  instanceid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  activityid() {
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
      return 999;
    }
  }
  difficulty() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sortid() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetOptionalbuffAt(t) {
    return this.optionalbuff(t);
  }
  optionalbuff(t) {
    var i = this.J7.__offset(this.z7, 16);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  optionalbuffLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  optionalbuffArray() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  openday() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  condition() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rewardid() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rewardscore() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  levelrewarddesc(t) {
    var i = this.J7.__offset(this.z7, 26);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  baseentityid() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  unlockscorelimit() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  isdifficult() {
    var t = this.J7.__offset(this.z7, 32);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.TowerDefenceInstance = TowerDefenceInstance;
//# sourceMappingURL=TowerDefenceInstance.js.map