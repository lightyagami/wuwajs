"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DownLoadVersion = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class DownLoadVersion {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Version() {
    return this.version();
  }
  get Type() {
    return this.type();
  }
  get Title() {
    return this.title();
  }
  get HelpTitle() {
    return this.helptitle();
  }
  get HelpDesc() {
    return this.helpdesc();
  }
  get Pic() {
    return this.pic();
  }
  get IsRecommend() {
    return this.isrecommend();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsDownLoadVersion(t, s) {
    return (s || new DownLoadVersion()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  version() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  type() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  title(t) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  helptitle(t) {
    var s = this.J7.__offset(this.z7, 10);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  helpdesc(t) {
    var s = this.J7.__offset(this.z7, 12);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  pic(t) {
    var s = this.J7.__offset(this.z7, 14);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  isrecommend() {
    var t = this.J7.__offset(this.z7, 16);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.DownLoadVersion = DownLoadVersion;
//# sourceMappingURL=DownLoadVersion.js.map