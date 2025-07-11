"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScratchCardRoundRe = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class ScratchCardRoundRe {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get RoundId() {
    return this.roundid();
  }
  get ActivityId() {
    return this.activityid();
  }
  get PreRoundId() {
    return this.preroundid();
  }
  get Size() {
    return this.size();
  }
  get RewardSortList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.rewardsortlistLength(), this.rewardsortlist, this);
  }
  get YellowRoundIcon() {
    return this.yellowroundicon();
  }
  get BlackRoundIcon() {
    return this.blackroundicon();
  }
  get TogRoundIcon() {
    return this.togroundicon();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsScratchCardRoundRe(t, i) {
    return (i || new ScratchCardRoundRe()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  roundid() {
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
  preroundid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  size() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRewardsortlistAt(t) {
    return this.rewardsortlist(t);
  }
  rewardsortlist(t) {
    var i = this.J7.__offset(this.z7, 12);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  rewardsortlistLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  rewardsortlistArray() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  yellowroundicon(t) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  blackroundicon(t) {
    var i = this.J7.__offset(this.z7, 16);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  togroundicon(t) {
    var i = this.J7.__offset(this.z7, 18);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.ScratchCardRoundRe = ScratchCardRoundRe;
//# sourceMappingURL=ScratchCardRoundRe.js.map