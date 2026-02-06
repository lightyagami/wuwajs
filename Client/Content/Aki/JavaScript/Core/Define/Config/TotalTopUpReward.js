"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TotalTopUpReward = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class TotalTopUpReward {
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
  get PreviewFunction() {
    return this.previewfunction();
  }
  get ShowPreviewIcon() {
    return this.showpreviewicon();
  }
  get PreviewButtonRegistry() {
    return GameUtils_1.GameUtils.ConvertToArray(this.previewbuttonregistryLength(), this.previewbuttonregistry, this);
  }
  get MotorPreviewId() {
    return this.motorpreviewid();
  }
  get PreviewContentId() {
    return this.previewcontentid();
  }
  get ClaimFunction() {
    return this.claimfunction();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsTotalTopUpReward(t, i) {
    return (i || new TotalTopUpReward()).__init(t.readInt32(t.position()) + t.position(), t);
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
  previewfunction() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  showpreviewicon() {
    var t = this.J7.__offset(this.z7, 10);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  GetPreviewbuttonregistryAt(t) {
    return this.previewbuttonregistry(t);
  }
  previewbuttonregistry(t) {
    var i = this.J7.__offset(this.z7, 12);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  previewbuttonregistryLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  previewbuttonregistryArray() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  motorpreviewid() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  previewcontentid(t) {
    var i = this.J7.__offset(this.z7, 16);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  claimfunction() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.TotalTopUpReward = TotalTopUpReward;
//# sourceMappingURL=TotalTopUpReward.js.map