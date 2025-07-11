"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalabashCollectSort = undefined;
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const CommonSort_1 = require("./CommonSort");
class CalabashCollectSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments);
    this.KDt = (e, t, r) => {
      e = e.DevelopRewardData.MonsterId;
      e = ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterRarity(e);
      t = t.DevelopRewardData.MonsterId;
      t = ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterRarity(t);
      if (e !== t) {
        return (e - t) * (r ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.XDt = (e, t, r) => {
      e = e.DevelopRewardData.SortId;
      t = t.DevelopRewardData.SortId;
      if (e !== t) {
        return (e - t) * (r ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.$Dt = (e, t, r) => {
      e = e.DevelopRewardData.MonsterId;
      t = t.DevelopRewardData.MonsterId;
      if (e !== t) {
        return (e - t) * (r ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.YDt = (e, t, r) => {
      e = e.DevelopRewardData.MonsterId;
      t = t.DevelopRewardData.MonsterId;
      e = ModelManager_1.ModelManager.CalabashModel.GetCalabashDevelopRewardExpByMonsterId(e);
      t = ModelManager_1.ModelManager.CalabashModel.GetCalabashDevelopRewardExpByMonsterId(t);
      if (e !== t) {
        return (e - t) * (r ? 1 : -1);
      } else {
        return 0;
      }
    };
    this.JDt = (e, t, r) => {
      e = e.DevelopRewardData.MonsterId;
      t = t.DevelopRewardData.MonsterId;
      e = ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListByMonsterId(e)?.length ?? 0;
      t = ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListByMonsterId(t)?.length ?? 0;
      if (e !== t) {
        return (e - t) * (r ? 1 : -1);
      } else {
        return 0;
      }
    };
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.KDt);
    this.SortMap.set(2, this.XDt);
    this.SortMap.set(3, this.$Dt);
    this.SortMap.set(4, this.YDt);
    this.SortMap.set(5, this.JDt);
  }
}
exports.CalabashCollectSort = CalabashCollectSort;
//# sourceMappingURL=CalabashCollectSort.js.map