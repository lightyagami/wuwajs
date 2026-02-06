"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeekCardModel = undefined;
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ModelManager_1 = require("../../../Manager/ModelManager");
class WeekCardModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.dLg = 0;
    this.mLg = 0;
    this.fLg = 0;
    this.gLg = 0;
    this.CLg = [];
  }
  get WeekCardId() {
    return this.dLg;
  }
  get Days() {
    return this.mLg;
  }
  get BuyTimeStamp() {
    return this.fLg;
  }
  get EndTimeStamp() {
    return this.gLg;
  }
  GetWeekCardContentInfo(e) {
    return this.CLg[e];
  }
  GetAllWeekCardContentInfos() {
    return this.CLg;
  }
  SetWeekCardInfo(e) {
    this.dLg = e._kf;
    this.mLg = e.Pbs;
    this.fLg = Number(MathUtils_1.MathUtils.LongToBigInt(e.ukf));
    this.gLg = Number(MathUtils_1.MathUtils.LongToBigInt(e.EndTimeStamp));
    this.CLg = e.ckf;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ReceiveWeekCardDataEvent);
  }
  GetIsWeekCardBuyOpen() {
    var e = TimeUtil_1.TimeUtil.GetServerTime();
    return this.GetActivityEndTime() > e && e >= this.GetActivityBeginTime();
  }
  GetWeekCardGiftData() {
    var e = ModelManager_1.ModelManager.PayGiftModel.GetPayGiftDataByType(7);
    if (e.length > 0) {
      return e[0];
    }
  }
  GetActivityEndTime() {
    var e = this.GetWeekCardGiftData();
    if (e) {
      return e.EndTime;
    } else {
      return 0;
    }
  }
  GetActivityBeginTime() {
    var e = this.GetWeekCardGiftData();
    if (e) {
      return e.BeginTime;
    } else {
      return 0;
    }
  }
  GetHasBuyWeekCard() {
    return this.gLg > 0;
  }
  HasRewardUnReceive() {
    return this.GetIsWeekCardInRewardStage() && this.CLg.some(e => e.H6n === 1);
  }
  GetWeekCardRedDotState() {
    return this.HasRewardUnReceive() || (this.GetWeekCardGiftData()?.GetPayShopGoods()?.GetIfNeedRemind() ?? false);
  }
  GetIsWeekCardInRewardStage() {
    return this.GetHasBuyWeekCard() && TimeUtil_1.TimeUtil.SetTimeSecond(this.EndTimeStamp) > TimeUtil_1.TimeUtil.GetServerTime();
  }
  GetWeekCardIsOpen() {
    if (this.GetHasBuyWeekCard()) {
      return this.GetIsWeekCardInRewardStage();
    } else {
      return this.GetIsWeekCardBuyOpen();
    }
  }
}
exports.WeekCardModel = WeekCardModel;
//# sourceMappingURL=WeekCardModel.js.map