"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SCreatureGenNavAssistAreaExportDefine = undefined;
const GameUtils_1 = require("../../../../Game/GameUtils");
const IntVector_1 = require("./IntVector");
class SCreatureGenNavAssistAreaExportDefine {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Points() {
    return GameUtils_1.GameUtils.ConvertToArray(this.pointsLength(), this.points, this);
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsSCreatureGenNavAssistAreaExportDefine(t, e) {
    return (e || new SCreatureGenNavAssistAreaExportDefine()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  GetPointsAt(t, e) {
    return this.points(t);
  }
  points(t, e) {
    var s = this.J7.__offset(this.z7, 4);
    if (s) {
      return (e || new IntVector_1.IntVector()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  pointsLength() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.SCreatureGenNavAssistAreaExportDefine = SCreatureGenNavAssistAreaExportDefine;
//# sourceMappingURL=SCreatureGenNavAssistAreaExportDefine.js.map