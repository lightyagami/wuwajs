"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryItemCollectionData = undefined;
class HonamiStoryItemCollectionData {
  constructor(t) {
    this.Lo = undefined;
    this.Cbo = 0;
    this.Lo = t;
  }
  UpdateData(t) {
    this.Cbo = t.H6n;
  }
  UpdateState(t) {
    this.Cbo = t;
  }
  get State() {
    return this.Cbo;
  }
  get Id() {
    return this.Lo.ItemId;
  }
  get Name() {
    return this.Lo.Name;
  }
  get Desc() {
    return this.Lo.Desc;
  }
  get DropId() {
    return this.Lo.DropId;
  }
  get GetConfig() {
    return this.Lo;
  }
}
exports.HonamiStoryItemCollectionData = HonamiStoryItemCollectionData;
//# sourceMappingURL=HonamiStoryItemCollectionData.js.map