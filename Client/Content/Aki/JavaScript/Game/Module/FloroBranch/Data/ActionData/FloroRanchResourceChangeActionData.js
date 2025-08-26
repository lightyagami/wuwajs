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
  constructor(t) {
    super(t);
    this.fRu = undefined;
    this.fRu = t.LSu;
  }
  async OnExecute() {
    var t;
    var o;
    var e;
    if (!this.IsIgnoreCasterAnim) {
      await this.CasterEntity.GetUiItemComponent().PlayNormalAnim();
    }
    await this.WaitIfPause();
    if (!this.IsExit() && !(o = (t = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetEntity(this.fRu.wSu)).CheckGetComponent(6), this.fRu.h5n === Protocol_1.Aki.Protocol.jSu.Proto_UnitCoin ? (e = Number(MathUtils_1.MathUtils.LongToBigInt(this.fRu.RSu)), ModelManager_1.ModelManager.FloroRanchGamePlayModel.CoinData.ChangeAmount(e), t.CheckGetComponent(0).Income += e, ModelManager_1.ModelManager.FloroRanchGamePlayModel.AddLastDayIncome(e), await o.ShowPopupReward(0, e)) : this.fRu.h5n === Protocol_1.Aki.Protocol.jSu.Proto_UnitDiamond ? (e = Number(MathUtils_1.MathUtils.LongToBigInt(this.fRu.RSu)), ModelManager_1.ModelManager.FloroRanchGamePlayModel.DiamondData.ChangeAmount(e), await o.ShowPopupReward(1, e)) : this.fRu.h5n === Protocol_1.Aki.Protocol.jSu.Proto_UnitBaseSalary && (e = Number(MathUtils_1.MathUtils.LongToBigInt(this.fRu.RSu)), t.CheckGetComponent(0).DailySaleData.ChangeAmount(e), await o.ShowPopupReward(2, e)), await this.WaitIfPause(), this.IsExit())) {
      FloroRanchDebugLogUtil_1.FloroRanchDebugLogUtil.LogResourceChangeActionInfo(this.CasterEntity, this.fRu);
    }
  }
}
exports.FloroRanchResourceChangeActionData = FloroRanchResourceChangeActionData;
//# sourceMappingURL=FloroRanchResourceChangeActionData.js.map