"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoCaption = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class VideoCaption {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get CaptionId() {
    return this.captionid();
  }
  get CgName() {
    return this.cgname();
  }
  get ShowMoment() {
    return this.showmoment();
  }
  get Duration() {
    return this.duration();
  }
  get CaptionText() {
    return this.captiontext();
  }
  get ShowMomentEn() {
    return this.showmomenten();
  }
  get DurationEn() {
    return this.durationen();
  }
  get ShowMomentKo() {
    return this.showmomentko();
  }
  get DurationKo() {
    return this.durationko();
  }
  get ShowMomentJa() {
    return this.showmomentja();
  }
  get DurationJa() {
    return this.durationja();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsVideoCaption(t, i) {
    return (i || new VideoCaption()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  captionid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  cgname(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  showmoment() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  duration() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  captiontext(t) {
    var i = this.J7.__offset(this.z7, 12);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  showmomenten() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  durationen() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  showmomentko() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  durationko() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  showmomentja() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  durationja() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.VideoCaption = VideoCaption;
//# sourceMappingURL=VideoCaption.js.map