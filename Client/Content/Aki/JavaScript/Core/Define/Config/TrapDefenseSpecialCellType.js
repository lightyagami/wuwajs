"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseSpecialCellType = undefined;
class TrapDefenseSpecialCellType {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get TemplateId() {
    return this.templateid();
  }
  __init(e, t) {
    this.z7 = e;
    this.J7 = t;
    return this;
  }
  static getRootAsTrapDefenseSpecialCellType(e, t) {
    return (t || new TrapDefenseSpecialCellType()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  id() {
    var e = this.J7.__offset(this.z7, 4);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  templateid() {
    var e = this.J7.__offset(this.z7, 6);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
}
exports.TrapDefenseSpecialCellType = TrapDefenseSpecialCellType;
//# sourceMappingURL=TrapDefenseSpecialCellType.js.map