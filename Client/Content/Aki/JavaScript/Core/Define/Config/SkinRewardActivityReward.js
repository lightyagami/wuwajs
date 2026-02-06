"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkinRewardActivityReward = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class SkinRewardActivityReward {
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
  get ConditionGroup() {
    return this.conditiongroup();
  }
  get TargetQuestID() {
    return this.targetquestid();
  }
  get DirectTrainActivityId() {
    return this.directtrainactivityid();
  }
  get PathQuestArray() {
    return GameUtils_1.GameUtils.ConvertToArray(this.pathquestarrayLength(), this.pathquestarray, this);
  }
  get MaleSkinId() {
    return this.maleskinid();
  }
  get FemaleSkinId() {
    return this.femaleskinid();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsSkinRewardActivityReward(t, i) {
    return (i || new SkinRewardActivityReward()).__init(t.readInt32(t.position()) + t.position(), t);
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
  conditiongroup() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  targetquestid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  directtrainactivityid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPathquestarrayAt(t) {
    return this.pathquestarray(t);
  }
  pathquestarray(t) {
    var i = this.J7.__offset(this.z7, 14);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  pathquestarrayLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  pathquestarrayArray() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  maleskinid() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  femaleskinid() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.SkinRewardActivityReward = SkinRewardActivityReward;
//# sourceMappingURL=SkinRewardActivityReward.js.map