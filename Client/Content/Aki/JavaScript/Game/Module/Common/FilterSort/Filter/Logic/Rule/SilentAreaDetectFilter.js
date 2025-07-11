"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SilentAreaDetectFilter = undefined;
const CommonFilter_1 = require("./CommonFilter");
class SilentAreaDetectFilter extends CommonFilter_1.CommonFilter {
  constructor() {
    super(...arguments);
    this.iDt = e => {
      if (e.SilentAreaDetectionData) {
        return e.SilentAreaDetectionData.Conf.Secondary;
      } else {
        return e.SilentAreaTitleData.TypeDescription;
      }
    };
  }
  OnInitFilterMap() {
    this.FilterMap.set(8, this.iDt);
  }
}
exports.SilentAreaDetectFilter = SilentAreaDetectFilter;
//# sourceMappingURL=SilentAreaDetectFilter.js.map