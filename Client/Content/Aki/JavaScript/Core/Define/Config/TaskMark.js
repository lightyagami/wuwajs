"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskMark = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class TaskMark {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get MarkId() {
    return this.markid();
  }
  get QuestId() {
    return this.questid();
  }
  get MarkPic() {
    return this.markpic();
  }
  get MarkAcceptablePic() {
    return this.markacceptablepic();
  }
  get NpcTaskIcon() {
    return this.npctaskicon();
  }
  get IconDistant() {
    return this.icondistant();
  }
  get TrackTextStartEffectColor() {
    return this.tracktextstarteffectcolor();
  }
  get ShowRange() {
    return GameUtils_1.GameUtils.ConvertToArray(this.showrangeLength(), this.showrange, this);
  }
  get ShowPriority() {
    return this.showpriority();
  }
  get Scale() {
    return this.scale();
  }
  get FxScale() {
    return this.fxscale();
  }
  get MarkRingPic() {
    return this.markringpic();
  }
  get MarkIcon() {
    return this.markicon();
  }
  get RingColor() {
    return this.ringcolor();
  }
  get SmallHaloColor() {
    return this.smallhalocolor();
  }
  get LargeHaloColor() {
    return this.largehalocolor();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsTaskMark(t, s) {
    return (s || new TaskMark()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  markid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  questid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  markpic(t) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  markacceptablepic(t) {
    var s = this.J7.__offset(this.z7, 10);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  npctaskicon(t) {
    var s = this.J7.__offset(this.z7, 12);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  icondistant() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 20000;
    }
  }
  tracktextstarteffectcolor(t) {
    var s = this.J7.__offset(this.z7, 16);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  GetShowrangeAt(t) {
    return this.showrange(t);
  }
  showrange(t) {
    var s = this.J7.__offset(this.z7, 18);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  showrangeLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  showrangeArray() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  showpriority() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  scale() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 1;
    }
  }
  fxscale() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 1;
    }
  }
  markringpic(t) {
    var s = this.J7.__offset(this.z7, 26);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  markicon(t) {
    var s = this.J7.__offset(this.z7, 28);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  ringcolor(t) {
    var s = this.J7.__offset(this.z7, 30);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  smallhalocolor(t) {
    var s = this.J7.__offset(this.z7, 32);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  largehalocolor(t) {
    var s = this.J7.__offset(this.z7, 34);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.TaskMark = TaskMark;
//# sourceMappingURL=TaskMark.js.map