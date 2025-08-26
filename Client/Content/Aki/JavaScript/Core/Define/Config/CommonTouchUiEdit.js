"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonTouchUiEdit = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class CommonTouchUiEdit {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get EditGroup() {
    return this.editgroup();
  }
  get PanelResId() {
    return this.panelresid();
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
  get SourceHierarchyIndex() {
    return this.sourcehierarchyindex();
  }
  get IsCheckOverlap() {
    return this.ischeckoverlap();
  }
  get IsDefaultSelected() {
    return this.isdefaultselected();
  }
  get Editable() {
    return this.editable();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsCommonTouchUiEdit(t, e) {
    return (e || new CommonTouchUiEdit()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  editgroup() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  panelresid(t) {
    var e = this.J7.__offset(this.z7, 8);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  itemindex() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var e = this.J7.__offset(this.z7, 12);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  sourcesize() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sourcealpha() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sourceoffsetx() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sourceoffsety() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sourcehierarchyindex() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  ischeckoverlap() {
    var t = this.J7.__offset(this.z7, 24);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  isdefaultselected() {
    var t = this.J7.__offset(this.z7, 26);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  editable() {
    var t = this.J7.__offset(this.z7, 28);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
}
exports.CommonTouchUiEdit = CommonTouchUiEdit;
//# sourceMappingURL=CommonTouchUiEdit.js.map