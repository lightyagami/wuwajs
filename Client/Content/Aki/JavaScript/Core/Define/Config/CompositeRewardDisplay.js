"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompositeRewardDisplay = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class CompositeRewardDisplay {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Title() {
    return this.title();
  }
  get ContinueText() {
    return this.continuetext();
  }
  get TitleIconPath() {
    return this.titleiconpath();
  }
  get IsProgressVisible() {
    return this.isprogressvisible();
  }
  get ProgressBarTitle() {
    return this.progressbartitle();
  }
  get ProgressBarAnimationTime() {
    return this.progressbaranimationtime();
  }
  get IsItemVisible() {
    return this.isitemvisible();
  }
  get IsSuccess() {
    return this.issuccess();
  }
  get AudioId() {
    return this.audioid();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsCompositeRewardDisplay(t, s) {
    return (s || new CompositeRewardDisplay()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  title(t) {
    var s = this.J7.__offset(this.z7, 6);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  continuetext(t) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  titleiconpath(t) {
    var s = this.J7.__offset(this.z7, 10);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  isprogressvisible() {
    var t = this.J7.__offset(this.z7, 12);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  progressbartitle(t) {
    var s = this.J7.__offset(this.z7, 14);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  progressbaranimationtime() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 500;
    }
  }
  isitemvisible() {
    var t = this.J7.__offset(this.z7, 18);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  issuccess() {
    var t = this.J7.__offset(this.z7, 20);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  audioid(t) {
    var s = this.J7.__offset(this.z7, 22);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.CompositeRewardDisplay = CompositeRewardDisplay;
//# sourceMappingURL=CompositeRewardDisplay.js.map