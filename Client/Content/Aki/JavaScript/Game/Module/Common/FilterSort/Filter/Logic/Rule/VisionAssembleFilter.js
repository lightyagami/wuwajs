"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionAssembleFilter = undefined;
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const CommonFilter_1 = require("./CommonFilter");
class VisionAssembleFilter extends CommonFilter_1.CommonFilter {
  constructor() {
    super(...arguments);
    this.Jh_ = e => {
      var r = new Array();
      for (const s of ModelManager_1.ModelManager.VisionEquipGroupModel.GetVisionAssembleViewAttrData(e, false, 0)) {
        var o = s.AttrId * 10 + (s.IfPercentage ? 2 : 1);
        if (!r.includes(o)) {
          r.push(o);
        }
      }
      return r;
    };
  }
  OnInitFilterMap() {
    this.FilterMap.set(29, this.Jh_);
  }
}
exports.VisionAssembleFilter = VisionAssembleFilter;
//# sourceMappingURL=VisionAssembleFilter.js.map