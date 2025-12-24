"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorLinkageQuest = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class MotorLinkageQuest {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get TaskId() {
    return this.taskid();
  }
  get Ip() {
    return this.ip();
  }
  get Sort() {
    return this.sort();
  }
  get TaskName() {
    return this.taskname();
  }
  get AccessId() {
    return this.accessid();
  }
  get RewardInfo() {
    return GameUtils_1.GameUtils.ConvertToMap(this.rewardinfoLength(), this.rewardinfoKey, this.rewardinfoValue, this);
  }
  rewardinfoKey(t) {
    return this.rewardinfo(t)?.key();
  }
  rewardinfoValue(t) {
    return this.rewardinfo(t)?.value();
  }
  get HasSticker() {
    return this.hassticker();
  }
  get StickerIcon() {
    return this.stickericon();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsMotorLinkageQuest(t, s) {
    return (s || new MotorLinkageQuest()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  taskid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  ip() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sort() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  taskname(t) {
    var s = this.J7.__offset(this.z7, 10);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  accessid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRewardinfoAt(t, s) {
    return this.rewardinfo(t);
  }
  rewardinfo(t, s) {
    var i = this.J7.__offset(this.z7, 14);
    if (i) {
      return (s || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  rewardinfoLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  hassticker() {
    var t = this.J7.__offset(this.z7, 16);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  stickericon(t) {
    var s = this.J7.__offset(this.z7, 18);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.MotorLinkageQuest = MotorLinkageQuest;
//# sourceMappingURL=MotorLinkageQuest.js.map