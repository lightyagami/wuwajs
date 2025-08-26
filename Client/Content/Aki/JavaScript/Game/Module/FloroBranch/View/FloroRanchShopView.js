"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchShopView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const FloroRanchCurrencyData_1 = require("../Data/FloroRanchCurrencyData");
const FloroRanchShopItemData_1 = require("../Data/FloroRanchShopItemData");
const FloroRanchController_1 = require("../FloroRanchController");
const FloroRanchCurrencyItem_1 = require("./Item/FloroRanchCurrencyItem");
const FloroRanchGoodsItem_1 = require("./Item/FloroRanchGoodsItem");
const FloroRanchToyGridItem_1 = require("./Item/FloroRanchToyGridItem");
class FloroRanchShopView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.gOu = undefined;
    this.KRu = undefined;
    this.TAu = undefined;
    this.CNe = undefined;
    this.XRu = [];
    this.YRu = undefined;
    this.Juu = new Map();
    this.PNo = undefined;
    this.zqo = undefined;
    this.RKu = undefined;
    this.jKu = ["Farm_CardType1", "Farm_CardType3", "Farm_CardType2"];
    this.cV_ = () => {
      var t = new FloroRanchGoodsItem_1.FloroRanchGoodsItem();
      t.BindClickCallback(this.JRu);
      this.XRu.push(t);
      return t;
    };
    this.rcu = async t => {
      var i = new FloroRanchToyGridItem_1.FloroRanchToyGridItem();
      i.BindClickCallback(this.kdu);
      var e = this.GetItem(28);
      var o = this.GetItem(27);
      var e = LguiUtil_1.LguiUtil.CopyItem(e, o);
      await i.CreateThenShowByActorAsync(e.GetOwner());
      this.Juu.set(t, i);
    };
    this.cod = t => {
      this.GetItem(27).SetUIActive(t);
    };
    this.HKu = t => {
      this.$Ku(t);
      this.tLu(false);
    };
    this.JRu = t => {
      this.dqu(t);
    };
    this.kdu = t => {
      UiManager_1.UiManager.OpenView("FloroRanchShopTipView", {
        ToyPoint: t,
        SellCallback: this.HKu,
        ShowToyListCallback: this.cod
      });
      t = this.Juu.get(t);
      if (t) {
        t.SetSelectState(false);
      }
    };
    this.zSl = () => {
      if (this.YRu) {
        var t = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
        var i = ModelManager_1.ModelManager.FloroRanchGamePlayModel.OwnCardEntityCount;
        if (i >= t.CardLimitCount) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhrolovaFarm_AnimalMax");
        } else if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.DiamondData.GetAmount() < this.YRu.Price) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Farm_BuyFail");
        } else {
          i = this.YRu.Id;
          t = this.YRu.Type;
          if (t === Protocol_1.Aki.Protocol.bou.Proto_ShopToy) {
            var e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetCurToyCount();
            if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.EnableToyCount <= e) {
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Farm_ToyFull");
              return;
            }
          }
          FloroRanchController_1.FloroRanchController.SendFloroRanchPlayShopBuyRequest(this.CNe.Id, ModelManager_1.ModelManager.FloroRanchGamePlayModel.SubInstanceId, this.TAu.w5n, i, t, this.YRu.IncId, t => {
            if (t && (this.InitShopItemDataList(t.flu), this.tLu(false), ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Farm_BuySuccess"), t.Edu)) {
              t = t.Edu.ydu.Eps;
              this.ced(t);
            }
          });
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 78, "商店没有选中商品！");
      }
    };
    this.dlo = () => {
      if (this.TAu.D1u) {
        if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.DiamondData.GetAmount() < this.TAu.N2s[0].m9n) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Farm_MoneyNotEnough");
        } else {
          FloroRanchController_1.FloroRanchController.SendFloroRanchPlayRefreshShopRequest(this.CNe.Id, ModelManager_1.ModelManager.FloroRanchGamePlayModel.SubInstanceId, this.TAu.w5n, t => {
            this.InitShopItemDataList(t.flu);
            this.tLu(true);
            this.zqo?.Play();
          });
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 78, "商店刷新 allowedRefresh 为 false");
      }
    };
    this.Ndu = () => {
      ModelManager_1.ModelManager.FloroRanchGamePlayModel.HideRecordView();
    };
    this.lyt = () => {
      this.X1d();
      this.CloseMe();
      this.PNo?.();
    };
    this.ShopItemDataList = [];
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIText], [5, UE.UIScrollViewWithScrollbarComponent], [6, UE.UIItem], [7, UE.UIButtonComponent], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIText], [11, UE.UITexture], [12, UE.UIText], [13, UE.UIItem], [14, UE.UITexture], [15, UE.UIText], [16, UE.UITexture], [17, UE.UIText], [18, UE.UIText], [19, UE.UITexture], [20, UE.UITexture], [21, UE.UIItem], [22, UE.UIButtonComponent], [23, UE.UIText], [24, UE.UITexture], [25, UE.UIText], [26, UE.UIItem], [27, UE.UIItem], [28, UE.UIItem], [29, UE.UIItem], [30, UE.UIText], [31, UE.UIItem], [32, UE.UITexture], [33, UE.UIItem]];
    this.BtnBindInfo = [[22, this.zSl], [1, this.dlo], [7, this.Ndu], [0, this.lyt]];
  }
  async OnBeforeStartAsync() {
    var i = [];
    this.Juu.clear();
    var e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.EnableToyCount;
    for (let t = 0; t < e; t++) {
      i.push(this.rcu(t));
    }
    await Promise.all(i);
    this.gOu = new FloroRanchCurrencyItem_1.FloroRanchCurrencyItem();
    var t = this.GetItem(8);
    await this.gOu.CreateThenShowByActorAsync(t.GetOwner());
    this.KRu = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(5), this.cV_);
    this.zqo = this.GetScrollViewWithScrollbar(5).Content.GetComponentByClass(UE.UIInturnAnimController.StaticClass());
    this.Qh_();
  }
  OnStart() {
    this.CNe = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    var t = this.OpenParam;
    this.PNo = t.CloseCallback;
    var t = t.ShopData;
    this.InitShopItemDataList(t);
    var t = {
      UiText: this.GetText(18),
      ViewType: 0,
      ReportType: 8,
      Style: 2
    };
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlinkByParam(t);
  }
  OnBeforeShow() {
    this.tLu(true);
    this.QKu();
    var t = UiManager_1.UiManager.GetViewByName("FloroRanchGamePlayView");
    if (t) {
      t.SetToyPanelActive(false);
    }
    this.zqo?.Play();
    this.RKu.SetEnableUiBlur(true);
  }
  OnBeforeHide() {
    var t = UiManager_1.UiManager.GetViewByName("FloroRanchGamePlayView");
    if (t) {
      t.SetToyPanelActive(true);
    }
    this.RKu.SetEnableUiBlur(false);
  }
  OnBeforeDestroy() {
    ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(this.GetText(18));
  }
  Qh_() {
    this.RKu = new UE.TsUiBlur_C();
    this.RKu.SetEnableUiBlur(false);
  }
  tLu(t) {
    var i;
    var e;
    var o = ModelManager_1.ModelManager.FloroRanchGamePlayModel.DiamondData;
    this.gOu.SetCurrencyData(o);
    var o = this.TAu.D1u;
    this.GetButton(1)?.RootUIComp.SetUIActive(o);
    if (o) {
      o = this.TAu.N2s[0].m9n;
      e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.DiamondData.GetAmount() >= o;
      (i = this.GetText(3)).SetText("-" + o);
      i.SetChangeColor(!e, i.changeColor);
      o = ModelManager_1.ModelManager.FloroRanchModel.GetFloroRanchCurrencyConfig(2);
      this.SetTextureByPath(o.GetSmallIcon(), this.GetTexture(2));
      e = this.TAu.jBu;
      this.GetText(4)?.ShowTextNew(e > 0 ? "Farm_Edit5" : "Farm_Edit4");
      this.GetItem(29)?.SetUIActive(e > 0);
      this.GetText(30)?.SetText("" + e);
    }
    this.KRu.RefreshByDataAsync(this.ShopItemDataList).then(() => {
      this.Y1d(t);
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.MarkViewHandleRefreshNavigationDirty();
    });
  }
  eLu() {
    var t;
    var i;
    var e;
    var o;
    var r;
    var s;
    if (this.YRu) {
      t = this.YRu.Type;
      this.GetText(10)?.ShowTextNew(this.YRu.GetName());
      this.GetText(18)?.SetText(this.YRu.Desc);
      this.SetTextureByPath(this.YRu.GetIcon(), this.GetTexture(11));
      e = t === Protocol_1.Aki.Protocol.bou.Proto_ShopToy;
      this.GetItem(13)?.SetUIActive(!e);
      this.GetItem(31)?.SetUIActive(false);
      if (e) {
        if (e = this.YRu.GetToyRaceData()) {
          this.SetTextureByPath(e.SmallIcon, this.GetTexture(32));
          this.GetItem(31)?.SetUIActive(true);
        }
      } else {
        e = this.YRu.GetRace();
        e = this.CNe.GetFloroRanchRaceData(e);
        this.SetTextureByPath(e.SmallIcon, this.GetTexture(14));
        this.GetText(15)?.ShowTextNew(e.GetRaceName());
      }
      if (e = this.YRu.Type === Protocol_1.Aki.Protocol.bou.Sdu) {
        i = new FloroRanchCurrencyData_1.FloroRanchCurrencyData(3);
        this.SetTextureByPath(i.ConfigData.GetSmallIcon(), this.GetTexture(16));
        this.GetText(17)?.SetText(this.YRu.GetEarnCount().toString());
      }
      this.GetTexture(16)?.SetUIActive(e);
      this.GetText(17)?.SetUIActive(e);
      this.GetItem(33)?.SetUIActive(this.YRu.GetIsSpecialPhantom());
      i = ModelManager_1.ModelManager.FloroRanchGamePlayModel.DiamondData;
      if (!(e = this.YRu.IsSold)) {
        o = this.YRu.Price;
        (r = this.GetText(25)).SetText("-" + o);
        s = i.GetAmount();
        r.SetChangeColor(s < o, r.changeColor);
        this.SetTextureByPath(i.ConfigData.GetSmallIcon(), this.GetTexture(24));
      }
      this.GetButton(22)?.RootUIComp.SetUIActive(!e);
      this.GetItem(21)?.SetUIActive(e);
      this.GetText(23)?.ShowTextNew("Farm_Edit1");
      this.GetText(12)?.ShowTextNew(this.jKu[t]);
      s = this.YRu.GetQualityData();
      this.SetTextureByPath(s.GetRarityDetailCardBigBg(), this.GetTexture(19));
      this.SetTextureByPath(s.GetRarityDetailCardSmallBg(), this.GetTexture(20));
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanchGamePlay", 78, "商店没有选中商品！");
    }
  }
  QKu() {
    var i = ModelManager_1.ModelManager.FloroRanchGamePlayModel.EnableToyCount;
    for (let t = 0; t < i; t++) {
      if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetToyEntityByPoint(t)) {
        this.ced(t);
      } else {
        this.$Ku(t);
      }
    }
  }
  ced(t) {
    var i = this.Juu.get(t);
    if (i) {
      t = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetToyEntityByPoint(t);
      i.PlayShowAnim(t);
    }
  }
  $Ku(t) {
    t = this.Juu.get(t);
    if (t) {
      t.SetInfoPanelActive(false);
    }
  }
  dqu(t) {
    if (this.YRu) {
      this.ZRu(false, this.YRu.IncId);
    }
    if (this.YRu = t) {
      this.ZRu(true, t.IncId);
    }
    this.eLu();
  }
  ZRu(t, i) {
    var e = this.XRu.find(t => t.Data?.IncId === i);
    if (e) {
      e.SetSelectState(t);
    }
  }
  X1d() {
    var t;
    var i;
    if (this.TAu) {
      t = ModelManager_1.ModelManager.FloroRanchGamePlayModel.ActivityId;
      i = ModelManager_1.ModelManager.FloroRanchGamePlayModel.SubInstanceId;
      FloroRanchController_1.FloroRanchController.SendFloroRanchCloseTaskRequest(t, i, this.TAu.w5n);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanchGamePlay", 78, "商店数据为空！ 无法发送关闭任务请求");
    }
  }
  InitShopItemDataList(t) {
    t = (this.TAu = t).bMs;
    this.ShopItemDataList.length = 0;
    for (const e of t) {
      var i = this.URu(e);
      this.ShopItemDataList.push(i);
    }
    this.CNe = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
  }
  Y1d(t) {
    if (this.ShopItemDataList.length === 0) {
      this.YRu = undefined;
    } else if (t) {
      this.YRu = undefined;
      this.dqu(this.ShopItemDataList[0]);
    } else {
      const i = this.YRu?.IncId;
      if (i) {
        if (t = this.ShopItemDataList.find(t => t.IncId === i)) {
          this.dqu(t);
        } else {
          this.dqu(this.ShopItemDataList[0]);
        }
      }
    }
  }
  URu(t) {
    switch (t.h5n) {
      case Protocol_1.Aki.Protocol.bou.Sdu:
        return new FloroRanchShopItemData_1.FloroRanchShopItemCardData(t);
      case Protocol_1.Aki.Protocol.bou.Mdu:
        return new FloroRanchShopItemData_1.FloroRanchShopItemCardGroupData(t);
      case Protocol_1.Aki.Protocol.bou.Proto_ShopToy:
        return new FloroRanchShopItemData_1.FloroRanchShopItemToyData(t);
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("FloroRanchGamePlay", 78, "FloroRanch商店物品类型错误", ["type", t.h5n]);
        }
        return;
    }
  }
}
exports.FloroRanchShopView = FloroRanchShopView;
//# sourceMappingURL=FloroRanchShopView.js.map