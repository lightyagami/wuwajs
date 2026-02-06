"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeekCardView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ActivityControllerHolder_1 = require("../../Activity/ActivityControllerHolder");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const UiTabSequence_1 = require("../../DynamicTab/UiTabViewBehavior/UiTabSequence");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const WeekCardCostGrid_1 = require("./WeekCardCostGrid");
const WeekCardItem_1 = require("./WeekCardItem");
const WeekCardScoreItem_1 = require("./WeekCardScoreItem");
class WeekCardView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.pLg = new ButtonItem_1.ButtonItem();
    this.vLg = [new WeekCardItem_1.WeekCardItem(), new WeekCardItem_1.WeekCardItem(), new WeekCardItem_1.WeekCardItem()];
    this.yLg = undefined;
    this.SLg = new WeekCardScoreItem_1.WeekCardScoreItem();
    this.MLg = () => {
      this.ELg();
    };
    this.mji = () => {
      var e = ConfigManager_1.ConfigManager.WeekCardConfig.GetConfig(ModelManager_1.ModelManager.WeekCardModel.WeekCardId);
      if (e !== undefined) {
        ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(e.HelpGroupId);
      }
    };
    this.zSl = () => {
      var e = ModelManager_1.ModelManager.WeekCardModel;
      if (!e.GetHasBuyWeekCard()) {
        if ((e = e.GetWeekCardGiftData()) !== undefined) {
          ControllerHolder_1.ControllerHolder.PayGiftController.SdkPay(e.Id);
        }
      }
    };
    this.R3i = () => {
      if (this.B2t()) {
        this.TryEmitRefreshTips();
      }
    };
    this.Wih = () => {
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.ShowPlayStationStoreIcon(0);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIHorizontalLayout], [6, UE.UIItem], [7, UE.UIButtonComponent], [8, UE.UIButtonComponent], [9, UE.UIText]];
    this.BtnBindInfo = [[8, this.mji]];
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ReceiveWeekCardDataEvent, this.MLg);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DiscountShopTimerRefresh, this.R3i);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SdkPayEnd, this.Wih);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ReceiveWeekCardDataEvent, this.MLg);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DiscountShopTimerRefresh, this.R3i);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SdkPayEnd, this.Wih);
  }
  async OnBeforeStartAsync() {
    this.ILg();
    var e = ModelManager_1.ModelManager.WeekCardModel.GetWeekCardGiftData();
    var t = ConfigManager_1.ConfigManager.WeekCardConfig.GetWeekConfigByPayGiftId(e.Id);
    await ControllerHolder_1.ControllerHolder.WeekCardController.RequestWeekCardInfo(t.Id);
    var t = PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetIfNeedQueryProductInfoForce();
    if (t) {
      await ControllerHolder_1.ControllerHolder.PayGiftController.QueryPayGiftInfoAsync();
    }
    await Promise.all([this.TLg(), this.bLg(), this.RLg()]);
    this.G3a(e.Id);
  }
  OnBeforeHide() {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.HidePlayStationStoreIcon();
  }
  OnAfterShow() {
    (this.GetTabBehavior(UiTabSequence_1.UiTabSequence)?.GetLevelSequencePlayer()).PlayLevelSequenceByName("Start");
    ModelManager_1.ModelManager.WeekCardModel.GetWeekCardGiftData().GetPayShopGoods().SaveRemindState(TimeUtil_1.TimeUtil.GetServerTime());
  }
  G3a(e) {
    return !PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedConfirmSdkProductInfo() || (e = ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(e).GetGetPayGiftData().ProductId, !!ModelManager_1.ModelManager.PayItemModel.GetProductInfoByGoodsId(e)) || ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(213)).FunctionMap.set(1, () => {
      UiManager_1.UiManager.CloseView("PayShopRootView");
    }), e.IsEscViewTriggerCallBack = false, ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e), this.O3a(), false);
  }
  async O3a() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Shop", 27, "OpenThirdPartyMessageBox");
    }
    await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().OpenMessageBox(ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyUserId(), 3, 0);
  }
  async TLg() {
    const r = [this.GetItem(0).GetOwner(), this.GetItem(1).GetOwner(), this.GetItem(2).GetOwner()];
    await Promise.all(this.vLg.map(async (e, t) => e.CreateThenShowByActorAsync(r[t])));
  }
  async bLg() {
    await this.SLg.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
  }
  ILg() {
    this.yLg = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(5), () => new WeekCardCostGrid_1.WeekCardCostGrid());
  }
  async RLg() {
    await this.pLg.CreateThenShowByActorAsync(this.GetButton(7).GetOwner());
    this.pLg.SetFunction(this.zSl);
  }
  OnStart() {
    this.ELg();
  }
  ELg() {
    this.B2t();
    this.LLg();
    this.wLg();
    this.PLg();
    this.ALg();
    this.iFi();
  }
  B2t() {
    var e;
    var t;
    let r = false;
    if (ModelManager_1.ModelManager.WeekCardModel.GetHasBuyWeekCard()) {
      t = TimeUtil_1.TimeUtil.SetTimeSecond(ModelManager_1.ModelManager.WeekCardModel.EndTimeStamp) - TimeUtil_1.TimeUtil.GetServerTime();
      e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(t > 0 ? t : 0);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "WeekCard_1005", e.CountDownText ?? "");
      if (t <= 0) {
        r = true;
      }
    } else {
      e = ModelManager_1.ModelManager.WeekCardModel.GetActivityEndTime() - TimeUtil_1.TimeUtil.GetServerTime();
      t = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(e > 0 ? e : 0);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "WeekCard_1004", t.CountDownText ?? "");
      if (e <= 0) {
        r = true;
      }
    }
    this.vLg.forEach((e, t) => {
      e.RefreshTime();
    });
    return r;
  }
  LLg() {
    const r = ModelManager_1.ModelManager.WeekCardModel;
    this.vLg.forEach((e, t) => {
      e.Refresh(r.GetWeekCardContentInfo(t));
    });
  }
  wLg() {
    var e = ModelManager_1.ModelManager.WeekCardModel.GetHasBuyWeekCard();
    this.pLg.SetEnableClick(!e);
    this.pLg.SetLocalTextNew(e ? "WeekCard_1008" : "WeekCard_1007");
  }
  PLg() {
    var e = ModelManager_1.ModelManager.WeekCardModel.GetAllWeekCardContentInfos();
    const r = new Map();
    e.forEach(e => {
      Object.entries(e.fRf).forEach(([e, t]) => {
        e = Number(e);
        if (r.has(e)) {
          r.set(e, r.get(e) + t);
        } else {
          r.set(e, t);
        }
      });
    });
    e = Array.from(r.entries()).map(([e, t]) => ({
      ItemId: e,
      Count: t,
      Tips: ""
    })).sort((e, t) => e.ItemId - t.ItemId);
    this.yLg.RefreshByData(e);
  }
  ALg() {
    this.SLg.SetUiActive(false);
    var e;
    var t;
    var r;
    var i = ModelManager_1.ModelManager.WeekCardModel.GetWeekCardGiftData();
    if (i !== undefined && (r = (e = ActivityControllerHolder_1.ActivityControllerHolder.TotalTopUpController).GetSingleActivityData()) !== undefined && (t = ConfigManager_1.ConfigManager.TotalTopUpConfig.GetTotalUpScoreIcon(r.Id)) !== undefined) {
      r = i.GetPayShopGoods();
      i = e.GetGoodsScore(r.GetGoodsData().Id);
      this.SLg.SetUiActive(true);
      this.SLg.Refresh({
        Tips: "WeekCard_1009",
        IconPath: t,
        Count: i
      });
    }
  }
  iFi() {
    var e = ModelManager_1.ModelManager.WeekCardModel.GetWeekCardGiftData();
    if (e !== undefined) {
      e = e.GetPayShopGoods();
      this.GetText(9).SetText(e.GetDirectPriceText());
    }
  }
  TryEmitRefreshTips() {
    ControllerHolder_1.ControllerHolder.PayShopController.ClosePayShopGoodDetailPopView();
    if (!ControllerHolder_1.ControllerHolder.ConfirmBoxController.CheckIsConfirmBoxOpen()) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshPayShop, 1, true);
    }
  }
}
exports.WeekCardView = WeekCardView;
//# sourceMappingURL=WeekCardView.js.map