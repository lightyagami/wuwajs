"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DungeonDetectFilter = undefined;
const CommonFilter_1 = require("./CommonFilter");
class DungeonDetectFilter extends CommonFilter_1.CommonFilter {
  constructor() {
    super(...arguments);
    this.$Lt = e => {
      return e.Conf.Secondary;
    };
  }
  OnInitFilterMap() {
    this.FilterMap.set(9, this.$Lt);
  }
}
exports.DungeonDetectFilter = DungeonDetectFilter;
//# sourceMappingURL=DungeonDetectFilter.js.map