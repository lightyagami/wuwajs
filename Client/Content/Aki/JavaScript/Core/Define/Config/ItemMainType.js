"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemMainType = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class ItemMainType {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get bShowInInventoryView() {
    return this.bshowininventoryview();
  }
  get Name() {
    return this.name();
  }
  get Icon() {
    return this.icon();
  }
  get IconFirstAchieve() {
    return this.iconfirstachieve();
  }
  get PackageId() {
    return this.packageid();
  }
  get bShowDescompose() {
    return this.bshowdescompose();
  }
  get SequenceId() {
    return this.sequenceid();
  }
  get UseWayId() {
    return this.usewayid();
  }
  get DestroyUseWayId() {
    return this.destroyusewayid();
  }
  get bFilterSortVisible() {
    return this.bfiltersortvisible();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsItemMainType(t, i) {
    return (i || new ItemMainType()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  bshowininventoryview() {
    var t = this.J7.__offset(this.z7, 6);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  icon(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  iconfirstachieve(t) {
    var i = this.J7.__offset(this.z7, 12);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  packageid() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  bshowdescompose() {
    var t = this.J7.__offset(this.z7, 16);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  sequenceid() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  usewayid() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  destroyusewayid() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  bfiltersortvisible() {
    var t = this.J7.__offset(this.z7, 24);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.ItemMainType = ItemMainType;
//# sourceMappingURL=ItemMainType.js.map