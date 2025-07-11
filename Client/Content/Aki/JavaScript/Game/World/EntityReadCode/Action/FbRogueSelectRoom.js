"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRogueSelectRoom = undefined;
const UnionRogueSelectRoomHelper_1 = require("./UnionRogueSelectRoomHelper");
class FbRogueSelectRoom {
  constructor(e) {
    this.FbDataInternal = e;
    this.bSh = false;
    this.TAe = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbRogueSelectRoom(e);
    }
  }
  get Config() {
    var e;
    var o;
    if (!this.bSh && (this.bSh = true, e = this.FbDataInternal.configType(), o = UnionRogueSelectRoomHelper_1.UnionRogueSelectRoomHelper.GetUnionRogueSelectRoomObject(e))) {
      this.TAe = UnionRogueSelectRoomHelper_1.UnionRogueSelectRoomHelper.ReadUnionRogueSelectRoom(e, this.FbDataInternal.config(o));
    }
    return this.TAe;
  }
}
exports.FbRogueSelectRoom = FbRogueSelectRoom;
//# sourceMappingURL=FbRogueSelectRoom.js.map