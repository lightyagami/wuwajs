"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreatureDensityContainer = exports.CreatureDensityItem = undefined;
class CreatureDensityItem {
  constructor(t, e, s) {
    this.CreatureDataId = t;
    this.DensityLevel = e;
    this.EntityData = s;
    this.EntityHandle = undefined;
  }
}
exports.CreatureDensityItem = CreatureDensityItem;
class CreatureDensityContainer {
  constructor() {
    this.DensityArray = new Array();
    this.CreatureDensityMap = new Map();
    this.PbDataDensityMap = new Map();
  }
  GetLevel(t) {
    while (this.DensityArray.length <= t) {
      this.DensityArray.push(new Map());
    }
    return this.DensityArray[t];
  }
  GetItem(t) {
    return this.CreatureDensityMap.get(t);
  }
  GetItemByPbDataId(t) {
    return this.PbDataDensityMap.get(t);
  }
  AddItem(t, e, s) {
    var r = new CreatureDensityItem(t, e, s);
    this.CreatureDensityMap.set(t, r);
    this.PbDataDensityMap.set(s.v9n, r);
    while (this.DensityArray.length <= r.DensityLevel) {
      this.DensityArray.push(new Map());
    }
    this.DensityArray[r.DensityLevel].set(t, r);
    return r;
  }
  RemoveItem(t) {
    var e = this.CreatureDensityMap.get(t);
    if (e) {
      this.CreatureDensityMap.delete(t);
      this.PbDataDensityMap.delete(e.EntityData.v9n);
      this.DensityArray[e.DensityLevel].delete(t);
      return e;
    }
  }
  Clear() {
    this.CreatureDensityMap.clear();
    this.PbDataDensityMap.clear();
    for (const t of this.DensityArray) {
      t.clear();
    }
  }
}
exports.CreatureDensityContainer = CreatureDensityContainer;
//# sourceMappingURL=CreatureDensityContainer.js.map