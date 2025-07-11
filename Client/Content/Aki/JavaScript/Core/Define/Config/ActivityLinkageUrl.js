"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityLinkageUrl = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class ActivityLinkageUrl {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ActivityLinkageId() {
    return this.activitylinkageid();
  }
  get IsNational() {
    return this.isnational();
  }
  get IsInternalLink() {
    return this.isinternallink();
  }
  get IsNeedToken() {
    return this.isneedtoken();
  }
  get LinkUrl() {
    return this.linkurl();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsActivityLinkageUrl(t, i) {
    return (i || new ActivityLinkageUrl()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  activitylinkageid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  isnational() {
    var t = this.J7.__offset(this.z7, 8);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  isinternallink() {
    var t = this.J7.__offset(this.z7, 10);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  isneedtoken() {
    var t = this.J7.__offset(this.z7, 12);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  linkurl(t) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.ActivityLinkageUrl = ActivityLinkageUrl;
//# sourceMappingURL=ActivityLinkageUrl.js.map