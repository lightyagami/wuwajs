"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterNearbySensory = undefined;
const BaseSensoryInfo_1 = require("./BaseSensoryInfo");
class MonsterNearbySensory extends BaseSensoryInfo_1.BaseSensoryInfo {
  constructor() {
    super(...arguments);
    this.SensoryInfoType = 1;
    this.CacheEntityList = [];
    this.LastFindEntities = new Set();
    this.OnEnterSensoryRange = undefined;
    this.OnExitSensoryRange = undefined;
  }
  OnInit(...s) {
    this.SensoryRange = s[0];
  }
  OnTick(s) {}
  OnClear() {
    this.LastFindEntities.clear();
    this.CacheEntityList.length = 0;
    this.OnEnterSensoryRange = undefined;
    this.OnExitSensoryRange = undefined;
  }
  ClearCacheList() {
    this.CacheEntityList.length = 0;
  }
  CheckEntity(s) {
    s = s.GetComponent(0);
    return !!s && s.IsMonster() && MonsterNearbySensory.Zrr.has(s.GetEntityCamp());
  }
  EnterRange(s) {
    this.InRange = true;
    if (!!this.LastFindEntities.has(s.Id) || !(this.SensoryInfoType & 1) || !!this.OnEnterSensoryRange(s)) {
      this.CacheEntityList.push(s.Id);
      this.LastFindEntities.delete(s.Id);
    }
  }
  ExitRange() {
    this.InRange = this.CacheEntityList.length !== 0;
    if (this.SensoryInfoType & 1) {
      for (const s of this.LastFindEntities) {
        this.OnExitSensoryRange(s);
      }
    }
    this.LastFindEntities.clear();
    for (const t of this.CacheEntityList) {
      this.LastFindEntities.add(t);
    }
  }
}
(exports.MonsterNearbySensory = MonsterNearbySensory).Zrr = new Set([1, 3, 7]);
//# sourceMappingURL=MonsterNearbySensory.js.map