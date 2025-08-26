"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchWageSettleAction = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FloroRanchDebugLogUtil_1 = require("../../FloroRanchDebugLogUtil");
const FloroRanchAsyncActionBase_1 = require("./FloroRanchAsyncActionBase");
class FloroRanchWageSettleAction extends FloroRanchAsyncActionBase_1.FloroRanchAsyncActionBase {
  constructor(e) {
    super();
    this.iOu = undefined;
    this.iOu = e;
  }
  async OnExecute() {
    for (const e of this.iOu.WBu) {
      await this.rOu(e);
    }
  }
  async rOu(e) {
    var o;
    var t;
    var a = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetEntity(e.wSu);
    await a.GetUiItemComponent().PlayNormalAnim();
    await this.WaitIfPause();
    if (!this.IsExit()) {
      o = a.CheckGetComponent(6);
      if (e.h5n === Protocol_1.Aki.Protocol.jSu.Proto_UnitCoin) {
        t = Number(MathUtils_1.MathUtils.LongToBigInt(e.RSu));
        ModelManager_1.ModelManager.FloroRanchGamePlayModel.CoinData.ChangeAmount(t);
        a.CheckGetComponent(0).Income += t;
        ModelManager_1.ModelManager.FloroRanchGamePlayModel.AddLastDayIncome(t);
        await o.ShowPopupReward(0, t);
      } else if (e.h5n === Protocol_1.Aki.Protocol.jSu.Proto_UnitDiamond) {
        t = Number(MathUtils_1.MathUtils.LongToBigInt(e.RSu));
        ModelManager_1.ModelManager.FloroRanchGamePlayModel.DiamondData.ChangeAmount(t);
        await o.ShowPopupReward(1, t);
      } else if (e.h5n === Protocol_1.Aki.Protocol.jSu.Proto_UnitBaseSalary) {
        t = Number(MathUtils_1.MathUtils.LongToBigInt(e.RSu));
        a.CheckGetComponent(0).DailySaleData.ChangeAmount(t);
        await o.ShowPopupReward(2, t);
      }
      FloroRanchDebugLogUtil_1.FloroRanchDebugLogUtil.LogWageSettleActionInfo(e);
    }
  }
}
exports.FloroRanchWageSettleAction = FloroRanchWageSettleAction;
//# sourceMappingURL=FloroRanchWageSettleAction.js.map