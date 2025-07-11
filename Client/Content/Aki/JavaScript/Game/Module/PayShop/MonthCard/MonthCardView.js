"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonthCardView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ButtonAndTextItem_1 = require("../../Common/Button/ButtonAndTextItem");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const UiTabSequence_1 = require("../../DynamicTab/UiTabViewBehavior/UiTabSequence");
const HelpController_1 = require("../../Help/HelpController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const PayShopDefine_1 = require("../PayShopDefine");
const MONTH_CARD_HELP_ID = 9;
class MonthCardView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.z2i = undefined;
    this.Z2i = undefined;
    this.eFi = undefined;
    this.tFi = false;
    this.dtt = () => {
      HelpController_1.HelpController.OpenHelpById(MONTH_CARD_HELP_ID);
    };
    this.oFi = () => {
      var e;
      if (this.tFi) {
        e = ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(PayShopDefine_1.MONTH_CARD_SHOP_ID);
        ControllerHolder_1.ControllerHolder.PayGiftController.SdkPay(e.GetGoodsData().Id);
      }
    };
    this.rFi = () => {
      this.nFi();
      this.sFi();
    };
    this.Wih = () => {
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.ShowPlayStationStoreIcon(0);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIText], [11, UE.UITexture]];
    this.BtnBindInfo = [[2, this.dtt]];
  }
  async OnBeforeStartAsync() {
    await Promise.all([ControllerHolder_1.ControllerHolder.PayGiftController.SendPayGiftInfoRequestAsync(), ControllerHolder_1.ControllerHolder.MonthCardController.RequestMonthCardData()]);
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetIfNeedQueryProductInfoForce()) {
      await ControllerHolder_1.ControllerHolder.PayGiftController.QueryPayGiftInfoAsync();
    }
    this.Z2i = new GetItemPanel();
    await this.Z2i.CreateByActorAsync(this.GetItem(5).GetOwner());
    this.AddChild(this.Z2i);
    this.eFi = new GetItemPanel();
    await this.eFi.CreateByActorAsync(this.GetItem(6).GetOwner());
    this.AddChild(this.eFi);
    this.G3a();
  }
  OnBeforeShow() {
    this.Wih();
  }
  OnStart() {
    this.z2i = new ButtonAndTextItem_1.ButtonAndTextItem(this.GetItem(4));
    this.z2i.BindCallback(this.oFi);
    var e = ModelManager_1.ModelManager.MonthCardModel.LocalOnceReward;
    var t = ModelManager_1.ModelManager.MonthCardModel.LocalDailyReward;
    this.Z2i.Refresh(e[0].ItemId, e[1]);
    this.eFi.Refresh(t[0].ItemId, t[1]);
    this.rFi();
    this.iFi();
    this.BV_();
    this.GetText(9).ShowTextNew("MonthCardDes_1");
    (this.GetTabBehavior(UiTabSequence_1.UiTabSequence)?.GetLevelSequencePlayer()).PlayLevelSequenceByName("Loop");
  }
  G3a() {
    var e;
    return !PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedConfirmSdkProductInfo() || (e = ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(PayShopDefine_1.MONTH_CARD_SHOP_ID).GetGetPayGiftData().ProductId, !!ModelManager_1.ModelManager.PayItemModel.GetProductInfoByGoodsId(e)) || ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(213)).FunctionMap.set(1, () => {
      UiManager_1.UiManager.CloseView("PayShopRootView");
    }), e.IsEscViewTriggerCallBack = false, ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e), this.O3a(), false);
  }
  async O3a() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Shop", 27, "OpenThirdPartyMessageBox");
    }
    await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().OpenMessageBox(ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyUserId(), 3, 0);
  }
  iFi() {
    var e = ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(PayShopDefine_1.MONTH_CARD_SHOP_ID);
    this.GetText(3).SetText(e.GetDirectPriceText());
  }
  BV_() {
    var e = ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(PayShopDefine_1.MONTH_CARD_SHOP_ID);
    var t = e.HasCloudGameInfo();
    var i = this.GetText(10);
    var r = this.GetTexture(11);
    i.SetUIActive(t);
    r.SetUIActive(t);
    if (t) {
      i.SetText(e.GetCloudGameDesc());
      this.SetTextureShowUntilLoaded(e.GetCloudGameIcon(), r);
    }
  }
  OnBeforeHide() {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.HidePlayStationStoreIcon();
  }
  OnBeforeDestroy() {
    this.z2i?.Destroy();
    this.z2i = undefined;
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ReceiveMonthCardDataEvent, this.rFi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SdkPayEnd, this.Wih);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ReceiveMonthCardDataEvent, this.rFi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SdkPayEnd, this.Wih);
  }
  OnAfterShow() {
    (this.GetTabBehavior(UiTabSequence_1.UiTabSequence)?.GetLevelSequencePlayer()).PlayLevelSequenceByName("Start");
    ModelManager_1.ModelManager.MonthCardModel.RefreshNextShowPayButtonRedDotTime();
    this.Shh();
  }
  async Shh() {
    var e;
    var t;
    if (!PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetIfNeedQueryProductInfoForce()) {
      e = ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(PayShopDefine_1.MONTH_CARD_SHOP_ID);
      (t = new Array()).push(e.GetGetPayGiftData().ProductId);
      await ControllerHolder_1.ControllerHolder.PayItemController.QueryProductInfoAsync(t);
      this.iFi();
    }
  }
  nFi() {
    var e = ModelManager_1.ModelManager.MonthCardModel.GetRemainDays() >= 0;
    this.GetItem(0).SetUIActive(e);
    this.GetText(1).SetUIActive(e);
    if (e) {
      this.GetText(1)?.SetText(ModelManager_1.ModelManager.MonthCardModel.GetRemainDayText("ec7172"));
    }
  }
  sFi() {
    var e = ModelManager_1.ModelManager.MonthCardModel.IsRemainDayInMaxLimit();
    var t = this.GetItem(8);
    var i = this.GetItem(7);
    if (e) {
      this.tFi = true;
      this.z2i.RefreshEnable(true);
      this.z2i.SetActive(true);
      i.SetUIActive(true);
      t.SetUIActive(false);
    } else {
      this.tFi = false;
      this.z2i.RefreshEnable(false);
      this.z2i.SetActive(false);
      i.SetUIActive(false);
      t.SetUIActive(true);
    }
  }
}
exports.MonthCardView = MonthCardView;
class GetItemPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ETt = 0;
    this.aFi = () => {
      if (this.ETt !== 0) {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.ETt);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UIText]];
    this.BtnBindInfo = [[0, this.aFi]];
  }
  OnStart() {
    this.GetTexture(1).SetUIActive(false);
  }
  Refresh(e, t) {
    this.ETt = e;
    const i = this.GetTexture(1);
    this.SetItemIcon(i, e, undefined, () => {
      i.SetUIActive(true);
    });
    e = this.GetText(2);
    LguiUtil_1.LguiUtil.SetLocalTextNew(e, "Text_RoleCount_Text", t.toString());
  }
}
//# sourceMappingURL=MonthCardView.js.map