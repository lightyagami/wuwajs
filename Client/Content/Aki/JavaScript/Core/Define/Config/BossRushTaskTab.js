"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BossRushTaskTab = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class BossRushTaskTab {
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
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsBossRushTaskTab(t, s) {
    return (s || new BossRushTaskTab()).__init(t.readInt32(t.position()) + t.position(), t);
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
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  tabtitle(t) {
    var s = this.J7.__offset(this.z7, 10);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.BossRushTaskTab = BossRushTaskTab;
//# sourceMappingURL=BossRushTaskTab.js.map