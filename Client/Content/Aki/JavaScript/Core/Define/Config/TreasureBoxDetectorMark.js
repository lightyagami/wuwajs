"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreasureBoxDetectorMark = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class TreasureBoxDetectorMark {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get MarkId() {
    return this.markid();
  }
  get MarkPic() {
    return this.markpic();
  }
  get MarkTitle() {
    return this.marktitle();
  }
  get MarkDesc() {
    return this.markdesc();
  }
  get ShowPriority() {
    return this.showpriority();
  }
  get ShowRange() {
    return GameUtils_1.GameUtils.ConvertToArray(this.showrangeLength(), this.showrange, this);
  }
  get Scale() {
    return this.scale();
  }
  get TrackHudEnable() {
    return this.trackhudenable();
  }
  get TrackAutoCancelDistance() {
    return this.trackautocanceldistance();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsTreasureBoxDetectorMark(t, r) {
    return (r || new TreasureBoxDetectorMark()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  markid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  markpic(t) {
    var r = this.J7.__offset(this.z7, 6);
    var r = r ? this.J7.__string(this.z7 + r, t) : null;
    if (typeof r == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(r);
    }
    return r;
  }
  marktitle(t) {
    var r = this.J7.__offset(this.z7, 8);
    var r = r ? this.J7.__string(this.z7 + r, t) : null;
    if (typeof r == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(r);
    }
    return r;
  }
  markdesc(t) {
    var r = this.J7.__offset(this.z7, 10);
    var r = r ? this.J7.__string(this.z7 + r, t) : null;
    if (typeof r == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(r);
    }
    return r;
  }
  showpriority() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetShowrangeAt(t) {
    return this.showrange(t);
  }
  showrange(t) {
    var r = this.J7.__offset(this.z7, 14);
    if (r) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + r) + t * 4);
    } else {
      return 0;
    }
  }
  showrangeLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  showrangeArray() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  scale() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 1;
    }
  }
  trackhudenable() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  trackautocanceldistance() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return -1;
    }
  }
}
exports.TreasureBoxDetectorMark = TreasureBoxDetectorMark;
//# sourceMappingURL=TreasureBoxDetectorMark.js.map