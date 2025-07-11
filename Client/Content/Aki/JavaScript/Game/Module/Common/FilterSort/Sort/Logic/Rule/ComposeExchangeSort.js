"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComposeExchangeSort = undefined;
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const CommonSort_1 = require("./CommonSort");
class ComposeExchangeSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments);
    this.KDt = (e, o, r) => {
      var t;
      if (o.IsUnlock !== e.IsUnlock) {
        t = o.IsUnlock - e.IsUnlock;
        if (r) {
          return t;
        } else {
          return -t;
        }
      } else if (e.Quality !== o.Quality) {
        return (o.Quality - e.Quality) * (r ? -1 : 1);
      } else {
        return e.ConfigId - o.ConfigId;
      }
    };
    this.zDt = (e, o, r) => {
      var t;
      if (o.IsUnlock !== e.IsUnlock) {
        t = o.IsUnlock - e.IsUnlock;
        if (r) {
          return t;
        } else {
          return -t;
        }
      } else if ((r = ModelManager_1.ModelManager.ComposeModel.CheckCanExchange(e.ConfigId) ? 0 : 1) != (t = ModelManager_1.ModelManager.ComposeModel.CheckCanExchange(o.ConfigId) ? 0 : 1)) {
        return r - t;
      } else {
        return 0;
      }
    };
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.KDt);
    this.SortMap.set(2, this.zDt);
  }
}
exports.ComposeExchangeSort = ComposeExchangeSort;
//# sourceMappingURL=ComposeExchangeSort.js.map