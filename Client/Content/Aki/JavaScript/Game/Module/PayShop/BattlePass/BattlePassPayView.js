"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattlePassPayView = undefined;
const UE = require("ue");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const BattlePassController_1 = require("./BattlePassController");
const PLAYSTATIONICONPOSITION = 0;
class BattlePassPayView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Xki = undefined;
    this.$ki = undefined;
    this.Yki = undefined;
    this.Jki = undefined;
    this.Eki = 0;
    this.TDe = undefined;
    this.$Ge = (e, t) => {
      if (e !== "SdkPayProductInformationView") {
        PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.ShowPlayStationStoreIcon(PLAYSTATIONICONPOSITION);
      }
    };
    this.FQe = (e, t) => {
      if (e !== "SdkPayProductInformationView") {
        PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().HidePlayStationStoreIcon();
      }
    };
    this.DSi = () => {
      this.CloseMe();
    };
    this.q3a = () => {
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.ShowPlayStationStoreIcon(PLAYSTATIONICONPOSITION);
    };
    this.e2i = () => {
      BattlePassController_1.BattlePassController.PayPrimaryBattlePass();
    };
    this.t2i = () => {
      BattlePassController_1.BattlePassController.PayHighBattlePass();
    };
    this.i2i = () => {
      var e = {
        WeaponDataList: ModelManager_1.ModelManager.BattlePassModel.GetWeaponDataList(),
        SelectedIndex: 0,
        WeaponObservers: this.OpenParam
      };
      UiManager_1.UiManager.OpenView("WeaponPreviewView", e);
    };
    this.rOe = () => new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    this.RefreshLeftTime = () => {
      var e = TimeUtil_1.TimeUtil.GetServerTime();
      var e = this.Eki - e;
      if (!(e < 0)) {
        e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(e);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), "Text_GachaRemainingTime_Text", e.CountDownText);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIGridLayout], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIGridLayout], [5, UE.UIText], [6, UE.UIButtonComponent], [7, UE.UIText], [8, UE.UIButtonComponent], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIText], [14, UE.UIText], [15, UE.UIItem]];
    this.BtnBindInfo = [[3, this.e2i], [6, this.t2i], [0, this.DSi], [8, this.i2i]];
  }
  async OnBeforeStartAsync() {
    await ControllerHolder_1.ControllerHolder.PayGiftController.SendPayGiftInfoRequestAsync();
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetIfNeedQueryProductInfoForce()) {
      await ControllerHolder_1.ControllerHolder.PayGiftController.QueryPayGiftInfoAsync();
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnReceiveBattlePassPaid, this.DSi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SdkPayEnd, this.q3a);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenView, this.FQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnReceiveBattlePassPaid, this.DSi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SdkPayEnd, this.q3a);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenView, this.FQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
  }
  OnStart() {
    this.Yki = [];
    this.Jki = [];
    ConfigManager_1.ConfigManager.BattlePassConfig.GetBattlePassUnlockReward(1, this.Yki);
    ConfigManager_1.ConfigManager.BattlePassConfig.GetBattlePassUnlockReward(3, this.Jki);
    this.Xki = new GenericLayout_1.GenericLayout(this.GetGridLayout(1), this.rOe);
    this.$ki = new GenericLayout_1.GenericLayout(this.GetGridLayout(4), this.rOe);
    this.Xki.RefreshByData(this.Yki);
    this.$ki.RefreshByData(this.Jki);
    this.Eki = ModelManager_1.ModelManager.BattlePassModel.GetBattlePassEndTime();
    this.TDe = TimerSystem_1.GameplayTimerSystem.Forever(this.RefreshLeftTime, CommonDefine_1.MILLIONSECOND_PER_SECOND);
    this.RefreshLeftTime();
    this.Zki();
    this.G3a();
  }
  OnBeforeShow() {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.ShowPlayStationStoreIcon(PLAYSTATIONICONPOSITION);
  }
  OnAfterShow() {
    this.Shh();
  }
  async Shh() {
    var e = PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetIfNeedQueryProductInfoForce();
    if (!e) {
      const t = new Array();
      this.o2i().forEach(e => {
        e = ModelManager_1.ModelManager.PayGiftModel.GetPayGiftDataById(e);
        t.push(e.ProductId.toString());
      });
      await ControllerHolder_1.ControllerHolder.PayItemController.QueryProductInfoAsync(t);
      this.Zki();
    }
  }
  G3a() {
    var e = PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedConfirmSdkProductInfo();
    if (e) {
      for (const r of this.o2i()) {
        var t = ModelManager_1.ModelManager.PayGiftModel.GetPayGiftDataById(r).ProductId;
        var t = ModelManager_1.ModelManager.PayItemModel.GetProductInfoByGoodsId(t);
        if (!t) {
          (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(213)).FunctionMap.set(1, () => {
            UiManager_1.UiManager.CloseView("BattlePassPayView");
          });
          t.IsEscViewTriggerCallBack = false;
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
          this.O3a();
          return false;
        }
      }
    }
    return true;
  }
  async O3a() {
    await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().OpenMessageBox(ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyUserId(), 3, 0);
  }
  o2i() {
    return [ModelManager_1.ModelManager.BattlePassModel.GetPrimaryBattlePassGoodsId(), ModelManager_1.ModelManager.BattlePassModel.GetHighBattlePassGoodsId(), ModelManager_1.ModelManager.BattlePassModel.GetSupplyBattlePassGoodsId()];
  }
  OnBeforeHide() {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().HidePlayStationStoreIcon();
  }
  OnBeforeDestroy() {
    this.Yki.length = 0;
    this.Yki = undefined;
    this.Jki.length = 0;
    this.Jki = undefined;
    this.Xki = undefined;
    this.$ki = undefined;
    this.TDe.Remove();
    this.TDe = undefined;
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().HidePlayStationStoreIcon();
  }
  Zki() {
    var e;
    var t = ModelManager_1.ModelManager.BattlePassModel.PayType;
    this.GetItem(9).SetUIActive(t === Protocol_1.Aki.Protocol.PNs.Proto_NoPaid);
    this.GetItem(11).SetUIActive(t !== Protocol_1.Aki.Protocol.PNs.Proto_NoPaid);
    this.GetItem(10).SetUIActive(t !== Protocol_1.Aki.Protocol.PNs.Proto_Advanced);
    this.GetItem(12).SetUIActive(t === Protocol_1.Aki.Protocol.PNs.Proto_Advanced);
    if (t === Protocol_1.Aki.Protocol.PNs.Proto_NoPaid) {
      e = ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(ModelManager_1.ModelManager.BattlePassModel.GetPrimaryBattlePassGoodsId())?.GetDirectPriceText();
      this.GetText(2).SetText(e ?? "");
      e = ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(ModelManager_1.ModelManager.BattlePassModel.GetHighBattlePassGoodsId())?.GetDirectPriceText();
      this.GetText(5).SetText(e ?? "");
    } else if (t === Protocol_1.Aki.Protocol.PNs.Proto_Paid) {
      e = ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(ModelManager_1.ModelManager.BattlePassModel.GetSupplyBattlePassGoodsId())?.GetDirectPriceText();
      this.GetText(5).SetText(e ?? "");
    }
    this.BV_();
  }
  BV_() {
    var e;
    var t = this.GetText(13);
    var r = this.GetText(14);
    var i = this.GetItem(15);
    var o = ModelManager_1.ModelManager.BattlePassModel.PayType;
    var a = ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(ModelManager_1.ModelManager.BattlePassModel.GetPrimaryBattlePassGoodsId());
    if (a.HasCloudGameInfo()) {
      e = o === Protocol_1.Aki.Protocol.PNs.Proto_Paid ? ModelManager_1.ModelManager.BattlePassModel.GetSupplyBattlePassGoodsId() : ModelManager_1.ModelManager.BattlePassModel.GetHighBattlePassGoodsId();
      e = ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(e);
      t.SetUIActive(o !== Protocol_1.Aki.Protocol.PNs.Proto_Advanced);
      r.SetUIActive(true);
      i.SetUIActive(true);
      t.SetText(a.GetCloudGameDesc());
      r.SetText(e.GetCloudGameDesc());
    } else {
      t.SetUIActive(false);
      r.SetUIActive(false);
      i.SetUIActive(false);
    }
  }
}
exports.BattlePassPayView = BattlePassPayView;
//# sourceMappingURL=BattlePassPayView.js.map