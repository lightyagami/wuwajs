"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CloudTime = void 0;
const GameUtils_1 = require("../../../Game/GameUtils");
class CloudTime {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Id() {
    return this.id()
  }
  get Day() {
    return this.day()
  }
  get Amount() {
    return this.amount()
  }
  get Timeout() {
    return this.timeout()
  }
  get StageImage() {
    return this.stageimage()
  }
  get ShowStageImage() {
    return this.showstageimage()
  }
  get Icon() {
    return this.icon()
  }
  get Desc() {
    return this.desc()
  }
  __init(t, s) {
    return this.z7 = t, this.J7 = s, this
  }
  static getRootAsCloudTime(t, s) {
    return (s || new CloudTime).__init(t.readInt32(t.position()) + t.position(), t)
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  day() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  amount() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readFloat32(this.z7 + t) : 0
  }
  timeout() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  stageimage(t) {
    var s = this.J7.__offset(this.z7, 12),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  showstageimage(t) {
    var s = this.J7.__offset(this.z7, 14),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  icon(t) {
    var s = this.J7.__offset(this.z7, 16),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  desc(t) {
    var s = this.J7.__offset(this.z7, 18),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
}
exports.CloudTime = CloudTime;
//# sourceMappingURL=CloudTime.js.map