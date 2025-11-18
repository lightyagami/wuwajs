"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SecondaryGuideData = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class SecondaryGuideData {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get SortNumber() {
    return this.sortnumber();
  }
  get ConditionGroupId() {
    return this.conditiongroupid();
  }
  get Text() {
    return this.text();
  }
  get SubText() {
    return this.subtext();
  }
  get Icon() {
    return this.icon();
  }
  get HelpGroupId() {
    return this.helpgroupid();
  }
  get ShowDropDown() {
    return this.showdropdown();
  }
  get DropDownTypeId() {
    return this.dropdowntypeid();
  }
  get TimeOutDay() {
    return this.timeoutday();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsSecondaryGuideData(t, i) {
    return (i || new SecondaryGuideData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sortnumber() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  conditiongroupid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  text(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  subtext(t) {
    var i = this.J7.__offset(this.z7, 12);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  icon(t) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  helpgroupid() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  showdropdown() {
    var t = this.J7.__offset(this.z7, 18);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  dropdowntypeid() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  timeoutday() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.SecondaryGuideData = SecondaryGuideData;
//# sourceMappingURL=SecondaryGuideData.js.map