"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConnectNearbySensory = undefined;
const BaseSensoryInfo_1 = require("./BaseSensoryInfo");
class ConnectNearbySensory extends BaseSensoryInfo_1.BaseSensoryInfo {
  constructor() {
    super(...arguments);
    this.RangePerceptionType = 1;
    this.CacheEntityList = new Set();
    this.LastFindEntities = new Set();
    this.OnEnterSensoryRange = undefined;
    this.OnExitSensoryRange = undefined;
  }
  OnInit(...t) {
    this.SensoryRange = t[0];
  }
  OnClear() {
    this.LastFindEntities.clear();
    this.CacheEntityList.clear();
    this.OnEnterSensoryRange = undefined;
    this.OnExitSensoryRange = undefined;
  }
  OnTick(t) {}
  CheckEntity(t) {
    return true;
  }
  EnterRange(t) {
    this.InRange = true;
    if (this.LastFindEntities.has(t.Id) || this.OnEnterSensoryRange(t)) {
      this.CacheEntityList.add(t.Id);
      this.LastFindEntities.delete(t.Id);
    }
  }
  ExitRange() {
    this.InRange = this.CacheEntityList.size !== 0;
    for (const t of this.LastFindEntities) {
      this.OnExitSensoryRange(t);
      this.CacheEntityList.delete(t);
    }
    this.LastFindEntities.clear();
    for (const s of this.CacheEntityList) {
      this.LastFindEntities.add(s);
    }
  }
  OnEntityExitConnectRange(t) {
    this.LastFindEntities.delete(t);
    this.CacheEntityList.delete(t);
  }
}
exports.ConnectNearbySensory = ConnectNearbySensory;
//# sourceMappingURL=ConnectNearbySensory.js.map