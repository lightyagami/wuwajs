"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenericPromptTypes = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class GenericPromptTypes {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get TypeId() {
    return this.typeid();
  }
  get GeneralText() {
    return this.generaltext();
  }
  get GeneralExtraText() {
    return this.generalextratext();
  }
  get TextColor() {
    return this.textcolor();
  }
  get Duration() {
    return this.duration();
  }
  get Priority() {
    return this.priority();
  }
  get ShowArea() {
    return this.showarea();
  }
  get MaxCount() {
    return this.maxcount();
  }
  get OnlyBattle() {
    return this.onlybattle();
  }
  get Tickable() {
    return this.tickable();
  }
  get UiPath() {
    return this.uipath();
  }
  get OffsetY() {
    return this.offsety();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsGenericPromptTypes(t, e) {
    return (e || new GenericPromptTypes()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  typeid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  generaltext(t) {
    var e = this.J7.__offset(this.z7, 6);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  generalextratext(t) {
    var e = this.J7.__offset(this.z7, 8);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  textcolor(t) {
    var e = this.J7.__offset(this.z7, 10);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  duration() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  priority() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  showarea(t) {
    var e = this.J7.__offset(this.z7, 16);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  maxcount() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  onlybattle() {
    var t = this.J7.__offset(this.z7, 20);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  tickable() {
    var t = this.J7.__offset(this.z7, 22);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  uipath(t) {
    var e = this.J7.__offset(this.z7, 24);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  offsety() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.GenericPromptTypes = GenericPromptTypes;
//# sourceMappingURL=GenericPromptTypes.js.map