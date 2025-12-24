"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegressDisposableReward = undefined;
class RegressDisposableReward {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get DropId() {
    return this.dropid();
  }
  get HighDropId() {
    return this.highdropid();
  }
  get BuyLvConsumeItem() {
    return this.buylvconsumeitem();
  }
  get BuyLvConsumeNum() {
    return this.buylvconsumenum();
  }
  get HighRewardPreviewId() {
    return this.highrewardpreviewid();
  }
  get ShowRecommendActivityGroup() {
    return this.showrecommendactivitygroup();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsRegressDisposableReward(t, s) {
    return (s || new RegressDisposableReward()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  dropid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  highdropid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  buylvconsumeitem() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  buylvconsumenum() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  highrewardpreviewid() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  showrecommendactivitygroup() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.RegressDisposableReward = RegressDisposableReward;
//# sourceMappingURL=RegressDisposableReward.js.map