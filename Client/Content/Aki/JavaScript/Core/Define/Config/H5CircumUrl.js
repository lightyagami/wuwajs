"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.H5CircumUrl = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class H5CircumUrl {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get RootUrl() {
    return this.rooturl();
  }
  get OverseaRootUrl() {
    return this.oversearooturl();
  }
  get Ps5RootUrl() {
    return this.ps5rooturl();
  }
  get IsInternalBrowser() {
    return this.isinternalbrowser();
  }
  get ScoreText() {
    return this.scoretext();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsH5CircumUrl(t, r) {
    return (r || new H5CircumUrl()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rooturl(t) {
    var r = this.J7.__offset(this.z7, 6);
    var r = r ? this.J7.__string(this.z7 + r, t) : null;
    if (typeof r == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(r);
    }
    return r;
  }
  oversearooturl(t) {
    var r = this.J7.__offset(this.z7, 8);
    var r = r ? this.J7.__string(this.z7 + r, t) : null;
    if (typeof r == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(r);
    }
    return r;
  }
  ps5rooturl(t) {
    var r = this.J7.__offset(this.z7, 10);
    var r = r ? this.J7.__string(this.z7 + r, t) : null;
    if (typeof r == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(r);
    }
    return r;
  }
  isinternalbrowser() {
    var t = this.J7.__offset(this.z7, 12);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  scoretext(t) {
    var r = this.J7.__offset(this.z7, 14);
    var r = r ? this.J7.__string(this.z7 + r, t) : null;
    if (typeof r == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(r);
    }
    return r;
  }
}
exports.H5CircumUrl = H5CircumUrl;
//# sourceMappingURL=H5CircumUrl.js.map