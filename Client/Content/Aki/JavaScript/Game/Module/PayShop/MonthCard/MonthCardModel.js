"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonthCardModel = undefined;
const Time_1 = require("../../../../Core/Common/Time");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const PayShopDefine_1 = require("../PayShopDefine");
class MonthCardModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.$2i = -1;
    this.CanShowDailyRewardView = false;
    this.ServerOnceReward = undefined;
    this.ServerDailyReward = undefined;
    this.LocalOnceReward = undefined;
    this.LocalDailyReward = undefined;
    this.NextShowPayButtonRedDotTime = undefined;
    this.RedDotRefreshType = 1;
  }
  OnInit() {
    var e = ConfigManager_1.ConfigManager.MonthCardConfig.GetConfig(PayShopDefine_1.MONTH_CARD_CONFIG_ID);
    this.LocalOnceReward = [{
      IncId: 0,
      ItemId: e.ItemId
    }, e.Count];
    this.LocalDailyReward = [{
      IncId: 0,
      ItemId: CommonParamById_1.configCommonParamById.GetIntConfig("MonthCardDailyItemId")
    }, CommonParamById_1.configCommonParamById.GetIntConfig("MonthCardDailyItemCount")];
    this.RedDotRefreshType = CommonParamById_1.configCommonParamById.GetIntConfig("MonthCardRedDotRefreshTime");
    return true;
  }
  GetRemainDays() {
    return this.$2i;
  }
  SetRemainDays(e) {
    this.$2i = e;
  }
  GetRemainDayText(e) {
    var o = ModelManager_1.ModelManager.MonthCardModel.GetRemainDays();
    if (o < 0) {
      return "";
    }
    if (o === 0) {
      const t = ConfigManager_1.ConfigManager.TextConfig.GetTextById("MonthCardLeftTimeText_2");
      if (e) {
        return StringUtils_1.StringUtils.Format(t, `<color=#${e}>1</color>`);
      } else {
        return StringUtils_1.StringUtils.Format(t, "1");
      }
    }
    const t = ConfigManager_1.ConfigManager.TextConfig.GetTextById("MonthCardLeftTimeText_1");
    if (e) {
      return StringUtils_1.StringUtils.Format(t, `<color=#${e}>${o.toString()}</color>`);
    } else {
      return StringUtils_1.StringUtils.Format(t, o.toString());
    }
  }
  IsRemainDayInMaxLimit() {
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("MonthCardMaxDays");
    return this.GetRemainDays() <= e;
  }
  CheckMonthCardIfCanBuy() {
    var e = ModelManager_1.ModelManager.MonthCardModel.GetRemainDays();
    return !(CommonParamById_1.configCommonParamById.GetIntConfig("MonthCardMaxDays") < e);
  }
  GetPayButtonRedDotState() {
    this.NextShowPayButtonRedDotTime ||= LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MonthCardNextShowRedDotTime, undefined) ?? 0;
    var e = Time_1.Time.ServerTimeStamp;
    return this.NextShowPayButtonRedDotTime < e && this.GetRemainDays() < 0;
  }
  RefreshNextShowPayButtonRedDotTime() {
    var e;
    if (this.RedDotRefreshType === 1) {
      (e = new Date(Time_1.Time.ServerTimeStamp)).setMonth(e.getMonth() + 1);
      e.setDate(1);
      e.setHours(4, 0, 0, 0);
      if (this.NextShowPayButtonRedDotTime !== e.getTime()) {
        this.NextShowPayButtonRedDotTime = e.getTime();
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MonthCardNextShowRedDotTime, e.getTime());
      }
    } else if (this.RedDotRefreshType === 2 && ((e = new Date(Time_1.Time.ServerTimeStamp)).setHours(4, 0, 0, 0), e = e.getTime() + (8 - e.getDay()) * CommonDefine_1.SECOND_PER_DAY * CommonDefine_1.MILLIONSECOND_PER_SECOND, this.NextShowPayButtonRedDotTime !== e)) {
      this.NextShowPayButtonRedDotTime = e;
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MonthCardNextShowRedDotTime, e);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PayShopGoodsBuy);
  }
  OnClear() {
    return !(this.CanShowDailyRewardView = false);
  }
}
exports.MonthCardModel = MonthCardModel;
//# sourceMappingURL=MonthCardModel.js.map