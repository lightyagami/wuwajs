"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchResourceChangeActionData = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FloroRanchDebugLogUtil_1 = require("../../FloroRanchDebugLogUtil");
const FloroRanchActionBase_1 = require("./FloroRanchActionBase");
class FloroRanchResourceChangeActionData extends FloroRanchActionBase_1.FloroRanchActionDataBase {
  constructor(o) {
    super(o);
    this.Wbu = undefined;
    this.Wbu = o.Uyu;
  }
  async OnExecute() {
    var o;
    var t;
    var e;
    if (!this.IsIgnoreCasterAnim) {
      await this.CasterEntity.GetUiItemComponent().PlayNormalAnim();
    }
    await this.WaitIfPause();
    if (!this.IsExit()) {
      t = (o = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetEntity(this.Wbu.xyu)).CheckGetComponent(6);
      if (this.Wbu.h5n === Protocol_1.Aki.Protocol.Qyu.Proto_UnitCoin) {
        e = Number(MathUtils_1.MathUtils.LongToBigInt(this.Wbu.Pyu));
        ModelManager_1.ModelManager.FloroRanchGamePlayModel.CoinData.ChangeAmount(e);
        o.CheckGetComponent(0).Income += e;
        ModelManager_1.ModelManager.FloroRanchGamePlayModel.AddLastDayIncome(e);
        await t.ShowPopupReward(0, e);
      } else if (this.Wbu.h5n === Protocol_1.Aki.Protocol.Qyu.Proto_UnitDiamond) {
        e = Number(MathUtils_1.MathUtils.LongToBigInt(this.Wbu.Pyu));
        ModelManager_1.ModelManager.FloroRanchGamePlayModel.DiamondData.ChangeAmount(e);
        await t.ShowPopupReward(1, e);
      } else if (this.Wbu.h5n === Protocol_1.Aki.Protocol.Qyu.Proto_UnitBaseSalary) {
        e = Number(MathUtils_1.MathUtils.LongToBigInt(this.Wbu.Pyu));
        o.CheckGetComponent(0).DailySaleData.ChangeAmount(e);
        await t.ShowPopupReward(2, e);
      }
      FloroRanchDebugLogUtil_1.FloroRanchDebugLogUtil.LogResourceChangeActionInfo(this.CasterEntity, this.Wbu);
    }
  }
}
exports.FloroRanchResourceChangeActionData = FloroRanchResourceChangeActionData;
//# sourceMappingURL=FloroRanchResourceChangeActionData.js.map