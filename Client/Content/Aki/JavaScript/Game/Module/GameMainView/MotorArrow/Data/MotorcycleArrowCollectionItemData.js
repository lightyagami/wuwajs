"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleArrowCollectionTypeItemData = exports.MotorcycleArrowCollectionItemData = exports.MAX_QUALITY = undefined;
exports.MAX_QUALITY = 5;
class MotorcycleArrowCollectionItemData {
  constructor(t) {
    this.Id = 0;
    this.Config = undefined;
    this.IsShowStrengthen = false;
    this.IsUnlock = true;
    this.Pos = 0;
    this.Num = 0;
    this.Id = t;
  }
  static Create(t, e) {
    var o = new MotorcycleArrowCollectionItemData(t.Id);
    o.Config = t;
    o.Pos = e;
    o.Num = 1;
    return o;
  }
  SetIsShowStrengthen(t) {
    this.IsShowStrengthen = t;
  }
}
exports.MotorcycleArrowCollectionItemData = MotorcycleArrowCollectionItemData;
class MotorcycleArrowCollectionTypeItemData {
  constructor(t) {
    this.Type = 0;
    this.TotalCount = 0;
    this.ItemQualityToNumMap = new Map();
    this.ItemList = [];
    this.Type = t;
  }
  AddItemData(t, e) {
    this.TotalCount++;
    var o = t.Config.Quality;
    this.ItemQualityToNumMap.set(o, (this.ItemQualityToNumMap.get(o) ?? 0) + 1);
    if (e) {
      this.ItemList.push(t);
    } else {
      t.Num++;
    }
  }
  GetItemNumWithQuality(t) {
    return this.ItemQualityToNumMap.get(t) ?? 0;
  }
}
exports.MotorcycleArrowCollectionTypeItemData = MotorcycleArrowCollectionTypeItemData;
//# sourceMappingURL=MotorcycleArrowCollectionItemData.js.map