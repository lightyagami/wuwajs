"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MobileBattleUiSet = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class MobileBattleUiSet {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get PanelIndex() {
    return this.panelindex();
  }
  get ItemIndex() {
    return this.itemindex();
  }
  get Name() {
    return this.name();
  }
  get SourceSize() {
    return this.sourcesize();
  }
  get SourceAlpha() {
    return this.sourcealpha();
  }
  get SourceOffsetX() {
    return this.sourceoffsetx();
  }
  get SourceOffsetY() {
    return this.sourceoffsety();
  }
  get IsCheckOverlap() {
    return this.ischeckoverlap();
  }
  get CanEdit() {
    return this.canedit();
  }
  get IsDefaultSelected() {
    return this.isdefaultselected();
  }
  get SourceHierarchyIndex() {
    return this.sourcehierarchyindex();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsMobileBattleUiSet(t, e) {
    return (e || new MobileBattleUiSet()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  panelindex() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  itemindex() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var e = this.J7.__offset(this.z7, 10);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  sourcesize() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sourcealpha() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sourceoffsetx() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sourceoffsety() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  ischeckoverlap() {
    var t = this.J7.__offset(this.z7, 20);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  canedit() {
    var t = this.J7.__offset(this.z7, 22);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  isdefaultselected() {
    var t = this.J7.__offset(this.z7, 24);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  sourcehierarchyindex() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.MobileBattleUiSet = MobileBattleUiSet;
//# sourceMappingURL=MobileBattleUiSet.js.map