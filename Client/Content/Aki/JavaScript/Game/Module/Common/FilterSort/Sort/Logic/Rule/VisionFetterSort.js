"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionFetterSort = undefined;
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const CommonSort_1 = require("./CommonSort");
class VisionFetterSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments);
    this.aUt = (e, r, t, o) => {
      var s = e;
      var n = r;
      var e = o;
      if (e && e > 0) {
        for (const M of ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(e).GetIncrIdList()) {
          var a = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(M);
          var a = a ? a.GetMonsterId() : 0;
          let e = ModelManager_1.ModelManager.PhantomBattleModel.GetFetterGroupMonsterIdArray(s.Id);
          var i = e.includes(a) ? 1 : -1;
          var a = (e = ModelManager_1.ModelManager.PhantomBattleModel.GetFetterGroupMonsterIdArray(n.Id)).includes(a) ? 1 : -1;
          if (i != a) {
            if (a < i) {
              if (t) {
                return 1;
              } else {
                return -1;
              }
            } else if (t) {
              return -1;
            } else {
              return 1;
            }
          }
        }
      }
      return 0;
    };
    this.hUt = (e, r, t) => 0;
    this.iRt = (e, r, t) => {
      if (e.SortId !== r.SortId) {
        return (e.SortId - r.SortId) * (t ? 1 : -1);
      } else {
        return 0;
      }
    };
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.aUt);
    this.SortMap.set(2, this.hUt);
    this.SortMap.set(3, this.iRt);
  }
}
exports.VisionFetterSort = VisionFetterSort;
//# sourceMappingURL=VisionFetterSort.js.map