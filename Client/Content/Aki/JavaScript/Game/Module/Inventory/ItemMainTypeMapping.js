"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemMainTypeMapping = undefined;
class ItemMainTypeMapping {
  constructor(t) {
    this.ymi = new Set();
    this.MainType = t;
  }
  Add(t) {
    this.ymi.add(t);
  }
  Remove(t) {
    this.ymi.delete(t);
  }
  GetSet() {
    return this.ymi;
  }
  HasRedDot() {
    for (const t of this.ymi) {
      if (t.HasRedDot()) {
        return true;
      }
    }
    return false;
  }
}
exports.ItemMainTypeMapping = ItemMainTypeMapping;
//# sourceMappingURL=ItemMainTypeMapping.js.map