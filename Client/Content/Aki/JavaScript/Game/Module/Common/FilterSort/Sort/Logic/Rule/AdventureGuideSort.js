"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdventureGuideSort = undefined;
const CommonSort_1 = require("./CommonSort");
class AdventureGuideSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments);
    this.VDt = (t, e, o) => {
      if (t !== e) {
        return (t.Conf.DangerType - e.Conf.DangerType) * (o ? 1 : -1);
      } else {
        return 0;
      }
    };
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.VDt);
  }
}
exports.AdventureGuideSort = AdventureGuideSort;
//# sourceMappingURL=AdventureGuideSort.js.map