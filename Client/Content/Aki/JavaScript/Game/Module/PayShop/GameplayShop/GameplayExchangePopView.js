"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayExchangePopView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiResourceManager_1 = require("../../../Ui/LguiResourceManager");
const NumberSelectComponent_1 = require("../../Common/NumberSelect/NumberSelectComponent");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GameplayShopUtil_1 = require("./GameplayShopUtil");
const COLOR = "FED12E";
class GameplayExchangePopView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ViewProxy = undefined;
    this.ResellTimerId = undefined;
    this.ShopItem = undefined;
    this.WGe = undefined;
    this.RefreshReSellText = () => {
      if (this.ViewProxy) {
        this.ViewProxy.OnResellTimeRefresh();
        this.RefreshLockText();
      }
    };
    this.Pgi = () => {
      this.CloseMe();
    };
    this.KGe = i => {
      var t = this.ViewProxy?.ExchangeTableTextId;
      var t = t && !StringUtils_1.StringUtils.IsEmpty(t) ? t : "Text_BugCount_Text";
      return new LguiUtil_1.TableTextArgNew(t, i);
    };
    this.QGe = i => {
      this.ViewProxy.BuyCount = i;
      this.RefreshPriceInfo();
    };
    this.Ldu = () => {
      this.CloseMe();
    };
    this.Htu = () => {
      if (this.ViewProxy) {
        this.ViewProxy.OnConfirmButtonClick(this.GetViewId());
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIItem], [3, UE.UITexture], [4, UE.UIText], [5, UE.UIText], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIItem], [12, UE.UIText], [13, UE.UIItem], [14, UE.UIText], [15, UE.UIItem], [16, UE.UIText]];
    this.BtnBindInfo = [[6, this.Ldu], [7, this.Htu]];
  }
  async OnBeforeStartAsync() {
    this.ViewProxy = this.OpenParam;
    if (this.ViewProxy) {
      const t = new CustomPromise_1.CustomPromise();
      LguiResourceManager_1.LguiResourceManager.LoadPrefabByResourceId(this.ViewProxy.ShopItemResource, undefined, i => {
        this.ShopItem = this.ViewProxy.ShopItemCreate();
        this.ShopItem.CreateThenShowByActor(i);
        i = this.GetItem(2);
        this.ShopItem.GetOriginalItem().SetUIParent(i);
        t.SetResult(true);
      });
      await t.Promise;
    }
  }
  OnStart() {
    var i;
    if (this.ViewProxy) {
      this.WGe = new NumberSelectComponent_1.NumberSelectComponent(this.GetItem(9));
      i = {
        MaxNumber: this.ViewProxy.MaxBuyCount,
        GetExchangeTableText: this.KGe,
        ValueChangeFunction: this.QGe
      };
      this.WGe.Init(i);
      this.RefreshNumberSelectComponentButtonState();
      this.GetItem(13).SetUIActive(true);
    }
  }
  OnBeforeShow() {
    this.RefreshView();
  }
  OnBeforeDestroy() {
    this.WGe.Destroy();
    this.ShopItem.Destroy();
    this.RemoveResellTimer();
  }
  RefreshView() {
    this.RefreshShopItem();
    this.RefreshDescribeText();
    this.RefreshConfirmButtonState();
    this.RefreshPriceInfo();
    this.RefreshCurrency();
    this.RefreshLockText();
    this.RefreshNumberSelectComponentButtonState();
    this.RefreshTipTitleItem();
  }
  RefreshShopItem() {
    if (this.ViewProxy && this.ViewProxy.ShopItemRefresh) {
      this.ViewProxy.ShopItemRefresh();
    }
  }
  RefreshDescribeText() {
    if (this.ViewProxy) {
      GameplayShopUtil_1.GameplayShopUtil.SetText(this.GetText(5), this.ViewProxy.DescribeTextData);
    }
  }
  RefreshConfirmButtonState() {
    var i = this.ViewProxy.CheckConfirmButtonCanInteract();
    this.GetButton(7).SetSelfInteractive(i);
  }
  RefreshPriceInfo() {
    var i;
    var t;
    var e;
    if (this.ViewProxy) {
      this.SetItemIcon(this.GetTexture(3), this.ViewProxy.CurrencyId);
      i = this.GetText(4);
      t = this.ViewProxy.BuyCount * this.ViewProxy.Price;
      e = this.ViewProxy.CheckMoneyEnough();
      i.SetText(t.toString());
      i.SetChangeColor(!e, i.changeColor);
    }
  }
  RefreshLimitText() {
    var i;
    var t;
    if (this.ViewProxy && (i = this.GetText(16), t = this.ViewProxy.LimitTextItemVisible, i.SetUIActive(t), t)) {
      GameplayShopUtil_1.GameplayShopUtil.SetText(i, this.ViewProxy.LimitTextData);
      i.SetColor(UE.Color.FromHex(COLOR));
    }
  }
  RefreshCurrency() {
    var i;
    if (this.ViewProxy) {
      i = new UiAsyncTask_1.UiAsyncTask("RefreshCurrency", async () => this.NDg());
      this.RunAsyncTask(i);
    }
  }
  async NDg() {
    if (this.ViewProxy) {
      var i = this.ChildPopView.PopItem;
      await i.SetCurrencyItemList(this.ViewProxy.CurrencyIdList);
      var i = i.GetCurrencyComponent().GetCurrencyItemList();
      if (i) {
        for (const t of i) {
          t.SetBeforeButtonFunction(this.Pgi);
          t.SetToPayShopFunction();
        }
      }
    }
  }
  RefreshLockText() {
    var i;
    this.RemoveResellTimer();
    if (this.ViewProxy && (i = this.ViewProxy.LockItemVisible, this.GetItem(11).SetUIActive(i), i && (i = this.GetText(12), GameplayShopUtil_1.GameplayShopUtil.SetText(i, this.ViewProxy.LockTextData)), this.ViewProxy.ReSellTime > 0)) {
      this.ResellTimerId = TimerSystem_1.RealTimeTimerSystem.Delay(this.RefreshReSellText, this.ViewProxy.ReSellTime * CommonDefine_1.MILLIONSECOND_PER_SECOND);
    }
  }
  RemoveResellTimer() {
    if (this.ResellTimerId !== undefined) {
      TimerSystem_1.RealTimeTimerSystem.Remove(this.ResellTimerId);
      this.ResellTimerId = undefined;
    }
  }
  RefreshLeftTimeText() {
    var i;
    var t;
    if (this.ViewProxy && (this.GetItem(15).SetUIActive(this.ViewProxy.LeftTimeItemVisible), this.ViewProxy.LeftTimeItemVisible) && (i = this.GetText(14), GameplayShopUtil_1.GameplayShopUtil.SetText(i, this.ViewProxy.LeftTimeDescTextData), i = this.ViewProxy.LeftTimeTextVisible, (t = this.GetText(16)).SetUIActive(i), i)) {
      GameplayShopUtil_1.GameplayShopUtil.SetText(t, this.ViewProxy.LeftTimeTextData);
    }
  }
  RefreshTipTitleItem() {
    if (this.ViewProxy && (this.GetItem(8).SetUIActive(this.ViewProxy.TipTitleItemVisible), this.ViewProxy.TipTitleItemVisible)) {
      this.RefreshLimitText();
      this.RefreshLeftTimeText();
    }
  }
  RefreshNumberSelectComponentButtonState() {
    if (this.WGe.GetIfLimit()) {
      this.WGe.SetAddReduceButtonActive(true);
      this.WGe.SetAddReduceButtonInteractive(false);
    }
  }
}
exports.GameplayExchangePopView = GameplayExchangePopView;
//# sourceMappingURL=GameplayExchangePopView.js.map