"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExchangeRewardConfig = undefined;
const DropPackageById_1 = require("../../../../Core/Define/ConfigQuery/DropPackageById");
const ExchangeRewardById_1 = require("../../../../Core/Define/ConfigQuery/ExchangeRewardById");
const ExchangeSharedById_1 = require("../../../../Core/Define/ConfigQuery/ExchangeSharedById");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
const ModelManager_1 = require("../../../Manager/ModelManager");
class ExchangeRewardConfig extends ConfigBase_1.ConfigBase {
  GetExchangeRewardConfig(e) {
    if (e) {
      return ExchangeRewardById_1.configExchangeRewardById.GetConfig(e);
    }
  }
  GetExchangeShareConfig(e) {
    if (e) {
      return ExchangeSharedById_1.configExchangeSharedById.GetConfig(e);
    }
  }
  GetExchangeRewardPreviewRewardList(e, n) {
    if (!e) {
      return [];
    }
    var e = this.GetExchangeRewardConfig(e);
    var r = [];
    if (e) {
      var t;
      var i;
      var o = e.PreviewReward;
      var n = n || ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel;
      let a = undefined;
      if (o.has(n)) {
        a = o.get(n).MapIntInt;
      } else {
        for (let e = n - 1; e >= 0; e--) {
          if (o.has(e)) {
            a = o.get(e).MapIntInt;
            break;
          }
        }
      }
      if (!a) {
        var d = e.RewardId;
        let r = 0;
        if (d.has(n)) {
          r = d.get(n);
        } else {
          for (let e = n - 1; e >= 0; e--) {
            if (d.has(e)) {
              r = d.get(e);
              break;
            }
          }
        }
        if (r > 0 && (e = DropPackageById_1.configDropPackageById.GetConfig(r))) {
          a = e.DropPreview;
        }
      }
      for ([t, i] of a) {
        var g = [{
          IncId: 0,
          ItemId: t
        }, i];
        r.push(g);
      }
    }
    return r;
  }
  GetExchangeRewardMaxCount(e) {
    return this.GetExchangeRewardConfig(e).MaxCount;
  }
  GetShareMaxCount(e) {
    return this.GetExchangeShareConfig(e).MaxCount;
  }
  GetShareCost(e) {
    return this.GetExchangeShareConfig(e).Cost;
  }
  GetExchangeCost(e) {
    return this.GetExchangeRewardConfig(e)?.Cost;
  }
  GetExchangeShareId(e) {
    return this.GetExchangeRewardConfig(e)?.SharedId;
  }
}
exports.ExchangeRewardConfig = ExchangeRewardConfig;
//# sourceMappingURL=ExchangeRewardConfig.js.map