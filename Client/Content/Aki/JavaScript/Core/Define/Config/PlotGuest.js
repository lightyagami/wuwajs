"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotGuest = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class PlotGuest {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get GuestID() {
    return this.guestid();
  }
  get HeadIconPath() {
    return this.headiconpath();
  }
  get Name() {
    return this.name();
  }
  get SpeakerID() {
    return GameUtils_1.GameUtils.ConvertToArray(this.speakeridLength(), this.speakerid, this);
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsPlotGuest(t, s) {
    return (s || new PlotGuest()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  guestid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  headiconpath(t) {
    var s = this.J7.__offset(this.z7, 6);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  name(t) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  GetSpeakeridAt(t) {
    return this.speakerid(t);
  }
  speakerid(t) {
    var s = this.J7.__offset(this.z7, 10);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  speakeridLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  speakeridArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.PlotGuest = PlotGuest;
//# sourceMappingURL=PlotGuest.js.map