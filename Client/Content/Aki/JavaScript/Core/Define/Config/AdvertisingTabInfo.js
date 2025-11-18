"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvertisingTabInfo = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class AdvertisingTabInfo {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Type() {
    return this.type();
  }
  get EntryButtonImage() {
    return this.entrybuttonimage();
  }
  get EntryButtonText() {
    return this.entrybuttontext();
  }
  get TabTitle() {
    return this.tabtitle();
  }
  get TabIcon() {
    return this.tabicon();
  }
  get SubTabIdList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.subtabidlistLength(), this.subtabidlist, this);
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsAdvertisingTabInfo(t, i) {
    return (i || new AdvertisingTabInfo()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  type() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  entrybuttonimage(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  entrybuttontext(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  tabtitle(t) {
    var i = this.J7.__offset(this.z7, 12);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  tabicon(t) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetSubtabidlistAt(t) {
    return this.subtabidlist(t);
  }
  subtabidlist(t) {
    var i = this.J7.__offset(this.z7, 16);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  subtabidlistLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  subtabidlistArray() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.AdvertisingTabInfo = AdvertisingTabInfo;
//# sourceMappingURL=AdvertisingTabInfo.js.map