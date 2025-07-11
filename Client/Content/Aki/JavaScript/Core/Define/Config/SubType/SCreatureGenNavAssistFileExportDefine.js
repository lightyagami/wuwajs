"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SCreatureGenNavAssistFileExportDefine = undefined;
const GameUtils_1 = require("../../../../Game/GameUtils");
const SCreatureGenNavAssistAreaExportDefine_1 = require("./SCreatureGenNavAssistAreaExportDefine");
class SCreatureGenNavAssistFileExportDefine {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Areas() {
    return GameUtils_1.GameUtils.ConvertToArray(this.areasLength(), this.areas, this);
  }
  __init(e, t) {
    this.z7 = e;
    this.J7 = t;
    return this;
  }
  static getRootAsSCreatureGenNavAssistFileExportDefine(e, t) {
    return (t || new SCreatureGenNavAssistFileExportDefine()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  GetAreasAt(e, t) {
    return this.areas(e);
  }
  areas(e, t) {
    var s = this.J7.__offset(this.z7, 4);
    if (s) {
      return (t || new SCreatureGenNavAssistAreaExportDefine_1.SCreatureGenNavAssistAreaExportDefine()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + e * 4), this.J7);
    } else {
      return null;
    }
  }
  areasLength() {
    var e = this.J7.__offset(this.z7, 4);
    if (e) {
      return this.J7.__vector_len(this.z7 + e);
    } else {
      return 0;
    }
  }
}
exports.SCreatureGenNavAssistFileExportDefine = SCreatureGenNavAssistFileExportDefine;
//# sourceMappingURL=SCreatureGenNavAssistFileExportDefine.js.map