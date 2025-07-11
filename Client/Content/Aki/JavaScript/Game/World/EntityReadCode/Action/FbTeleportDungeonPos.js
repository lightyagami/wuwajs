"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTeleportDungeonPos = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbTeleportDungeonPos {
  constructor(t) {
    this.FbDataInternal = t;
    this.MMh = false;
    this.EMh = 0;
    this.VVh = false;
    this.jVh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbTeleportDungeonPos(t);
    }
  }
  get DungeonId() {
    if (!this.MMh) {
      this.MMh = true;
      this.EMh = this.FbDataInternal.dungeonId();
    }
    return this.EMh;
  }
  get TeleportPos() {
    if (!this.VVh) {
      this.VVh = true;
      this.jVh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.teleportPos());
    }
    return this.jVh;
  }
}
exports.FbTeleportDungeonPos = FbTeleportDungeonPos;
//# sourceMappingURL=FbTeleportDungeonPos.js.map