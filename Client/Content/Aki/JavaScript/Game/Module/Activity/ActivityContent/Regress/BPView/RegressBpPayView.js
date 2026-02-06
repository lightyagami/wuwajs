"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegressBpPayView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const CommonItemSmallItemGrid_1 = require("../../../../Common/ItemGrid/CommonItemSmallItemGrid");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const ActivityRegressDefine_1 = require("../ActivityRegressDefine");
class RegressBpPayView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.TDe = undefined;
    this.H3e = undefined;
    this.USe = () => {
      this.CloseMe();
    };
    this.xli = () => {
      this.CloseMe();
    };
    this.Y7f = () => {
      var e = ActivityRegressDefine_1.RECALL_PAY_BP_GIFT_ID;
      ControllerHolder_1.ControllerHolder.PayGiftController.SdkPay(e);
    };
    this.rOe = () => new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    this.z7f = () => {
      var e;
      var i;
      var t;
      var r = this.GetText(7);
      var s = this.GetText(8);
      if (r && s) {
        if (e = ModelManager_1.ModelManager.PayGiftModel?.GetPayGiftDataById(ActivityRegressDefine_1.RECALL_PAY_BP_GIFT_ID)) {
          t = (e = e.GetPayShopGoods()).IsDirect();
          i = e.GetPriceData();
          if (t) {
            r.SetText(e.GetDirectPriceText());
          } else {
            r.SetText(i.NowPrice.toString());
          }
          if (t = i.OriginalPrice) {
            s.SetUIActive(true);
            s.SetText(`<s>${t.toString()}</s>`);
          } else {
            s.SetUIActive(false);
          }
        } else {
          r.SetText("");
          s.SetUIActive(false);
        }
      }
    };
    this.kOe = e => {
      this.mGe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIGridLayout], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIText], [9, UE.UIButtonComponent], [10, UE.UIItem]];
    this.BtnBindInfo = [[1, this.xli], [9, this.Y7f]];
  }
  async OnBeforeStartAsync() {
    this.H3e = new GenericLayout_1.GenericLayout(this.GetGridLayout(5), this.rOe);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPayItemSuccess, this.USe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPayItemSuccess, this.USe);
  }
  OnBeforeShow() {
    this.tGo();
    this.mGe();
    this.Z3e();
    this.z7f();
    this.GetItem(10).SetUIActive(false);
  }
  OnBeforeHide() {
    this.jm();
  }
  OnBeforeDestroy() {
    this.jm();
    this.H3e = undefined;
  }
  Z3e() {
    var e = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData?.Id;
    if (e &&= ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressDisposableReward(e)) {
      e = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(e.HighRewardPreviewId);
      this.H3e?.RefreshByData(e);
    }
  }
  tGo() {
    this.jm();
    this.TDe = TimerSystem_1.RealTimeTimerSystem.Forever(this.kOe, TimeUtil_1.TimeUtil.InverseMillisecond);
  }
  mGe() {
    var e = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData;
    var [e, i] = ModelManager_1.ModelManager.ActivityModel.GetTimeVisibleAndRemainTime(e);
    this.GetText(2).SetUIActive(e);
    if (e) {
      this.GetText(2).SetText(i);
    }
  }
  jm() {
    if (TimerSystem_1.RealTimeTimerSystem.Has(this.TDe)) {
      TimerSystem_1.RealTimeTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
}
exports.RegressBpPayView = RegressBpPayView;
//# sourceMappingURL=RegressBpPayView.js.map