"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotoFightRewardTab = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class PhotoFightRewardTab {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get TabId() {
    return this.tabid();
  }
  get ActivityId() {
    return this.activityid();
  }
  get Texture() {
    return this.texture();
  }
  get TabTitle() {
    return this.tabtitle();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsPhotoFightRewardTab(t, i) {
    return (i || new PhotoFightRewardTab()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  tabid() {
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
  texture(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  tabtitle(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.PhotoFightRewardTab = PhotoFightRewardTab;
//# sourceMappingURL=PhotoFightRewardTab.js.map