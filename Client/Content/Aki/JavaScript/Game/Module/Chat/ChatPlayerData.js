"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatPlayerData = undefined;
class ChatPlayerData {
  constructor(t) {
    this.j8 = 0;
    this.ZEt = 0;
    this.B9e = "";
    this.kac = 0;
    this.qac = undefined;
    this.eEi = 0;
    this.j8 = t;
  }
  SetPlayerId(t) {
    this.j8 = t;
  }
  GetPlayerId() {
    return this.j8;
  }
  SetPlayerIcon(t) {
    this.ZEt = t ?? 0;
  }
  GetPlayerIcon() {
    return this.ZEt;
  }
  SetPlayerName(t) {
    this.B9e = t ?? "";
  }
  GetPlayerName() {
    return this.B9e;
  }
  SetPlayerTitle(t) {
    if (t.length !== 0) {
      t = t.split("_");
      this.kac = parseInt(t[0]);
      t = t.length === 2 ? parseInt(t[1]) : undefined;
      this.qac = t;
    }
  }
  GetPlayerTitleId() {
    return this.kac;
  }
  GetPlayerTitleStarLevel() {
    return this.qac;
  }
  SetSex(t) {
    this.eEi = t;
  }
  GetSex() {
    return this.eEi;
  }
}
exports.ChatPlayerData = ChatPlayerData;
//# sourceMappingURL=ChatPlayerData.js.map