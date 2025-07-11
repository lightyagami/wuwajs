"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbUnlockDungeonEntry = undefined;
class FbUnlockDungeonEntry {
  constructor(t) {
    this.FbDataInternal = t;
    this.RMh = false;
    this.wMh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbUnlockDungeonEntry(t);
    }
  }
  get DungeonEntryId() {
    if (!this.RMh) {
      this.RMh = true;
      this.wMh = this.FbDataInternal.dungeonEntryId();
    }
    return this.wMh;
  }
}
exports.FbUnlockDungeonEntry = FbUnlockDungeonEntry;
//# sourceMappingURL=FbUnlockDungeonEntry.js.map