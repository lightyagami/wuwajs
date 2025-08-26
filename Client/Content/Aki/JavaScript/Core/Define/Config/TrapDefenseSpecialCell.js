"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseSpecialCell = undefined;
class TrapDefenseSpecialCell {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get CellType() {
    return this.celltype();
  }
  get Level() {
    return this.level();
  }
  get SimpleCombatSubtypeId() {
    return this.simplecombatsubtypeid();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsTrapDefenseSpecialCell(t, e) {
    return (e || new TrapDefenseSpecialCell()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  celltype() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  level() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  simplecombatsubtypeid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.TrapDefenseSpecialCell = TrapDefenseSpecialCell;
//# sourceMappingURL=TrapDefenseSpecialCell.js.map