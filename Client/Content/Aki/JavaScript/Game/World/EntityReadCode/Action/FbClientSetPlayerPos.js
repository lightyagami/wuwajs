"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbClientSetPlayerPos = undefined;
const UnionClientTeleportConfigHelper_1 = require("./UnionClientTeleportConfigHelper");
class FbClientSetPlayerPos {
  constructor(e) {
    this.FbDataInternal = e;
    this.E0h = false;
    this.I0h = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbClientSetPlayerPos(e);
    }
  }
  get TelePortConfig() {
    var e;
    var t;
    if (!this.E0h && (this.E0h = true, e = this.FbDataInternal.telePortConfigType(), t = UnionClientTeleportConfigHelper_1.UnionClientTeleportConfigHelper.GetUnionClientTeleportConfigObject(e))) {
      this.I0h = UnionClientTeleportConfigHelper_1.UnionClientTeleportConfigHelper.ReadUnionClientTeleportConfig(e, this.FbDataInternal.telePortConfig(t));
    }
    return this.I0h;
  }
}
exports.FbClientSetPlayerPos = FbClientSetPlayerPos;
//# sourceMappingURL=FbClientSetPlayerPos.js.map