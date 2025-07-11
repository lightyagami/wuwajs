"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FunctionMenu = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class FunctionMenu {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get FunctionId() {
    return this.functionid();
  }
  get SortIndex() {
    return this.sortindex();
  }
  get FunctionName() {
    return this.functionname();
  }
  get FunctionIcon() {
    return this.functionicon();
  }
  get JumpView() {
    return this.jumpview();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsFunctionMenu(t, i) {
    return (i || new FunctionMenu()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  functionid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sortindex() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  functionname(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  functionicon(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  jumpview(t) {
    var i = this.J7.__offset(this.z7, 12);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.FunctionMenu = FunctionMenu;
//# sourceMappingURL=FunctionMenu.js.map