"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DirectTrainActivity = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class DirectTrainActivity {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get SkipQuestId() {
    return this.skipquestid();
  }
  get ForceRemindCond() {
    return this.forceremindcond();
  }
  get SkipQuestCondition() {
    return this.skipquestcondition();
  }
  get RecommendQuestId() {
    return this.recommendquestid();
  }
  get RecommendQuestLinkList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.recommendquestlinklistLength(), this.recommendquestlinklist, this);
  }
  get RecommendQuestLabel() {
    return this.recommendquestlabel();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsDirectTrainActivity(t, i) {
    return (i || new DirectTrainActivity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  skipquestid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  forceremindcond() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  skipquestcondition() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  recommendquestid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRecommendquestlinklistAt(t) {
    return this.recommendquestlinklist(t);
  }
  recommendquestlinklist(t) {
    var i = this.J7.__offset(this.z7, 14);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  recommendquestlinklistLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  recommendquestlinklistArray() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  recommendquestlabel(t) {
    var i = this.J7.__offset(this.z7, 16);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.DirectTrainActivity = DirectTrainActivity;
//# sourceMappingURL=DirectTrainActivity.js.map