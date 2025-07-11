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
    this.Zku = undefined;
    this.TRu = undefined;
    this.JLu = undefined;
    this.CNe = undefined;
    this.bRu = [];
    this.RRu = undefined;
    this.LRu = -1;
    this.fuu = new Map();
    this.PNo = undefined;
    this.zqo = undefined;
    this.fHc = undefined;
    this.UHc = ["Farm_CardType1", "Farm_CardType3", "Farm_CardType2"];
    this.cV_ = () => {
      var t = new FloroRanchGoodsItem_1.FloroRanchGoodsItem();
      t.BindClickCallback(this.wRu);
      this.bRu.push(t);
      return t;
    };
    this.yuu = async t => {
      var i = new FloroRanchToyGridItem_1.FloroRanchToyGridItem();
      i.BindClickCallback(this.Zcu);
      var e = this.GetItem(28);
      var o = this.GetItem(27);
      var e = LguiUtil_1.LguiUtil.CopyItem(e, o);
      await i.CreateThenShowByActorAsync(e.GetOwner());
      this.fuu.set(t, i);
    };
    this.aWc = t => {
      this.fQc(t);
      this.Zku.SetCurrencyData(ModelManager_1.ModelManager.FloroRanchGamePlayModel.DiamondData);
    };
    this.wRu = (t, i) => {
      this.JGu(t, i);
      this.PRu();
    };
    this.Zcu = t => {
      UiManager_1.UiManager.OpenView("FloroRanchShopTipView", {
        ToyPoint: t,
        SellCallback: this.aWc
      });
      t = this.fuu.get(t);
      if (t) {
        t.SetSelectState(false);
      }
    };
    this.zSl = () => {
      if (this.RRu) {
        var t = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
        var i = ModelManager_1.ModelManager.FloroRanchGamePlayModel.OwnCardEntityCount;
        if (i >= t.CardLimitCount) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhrolovaFarm_AnimalMax");
        } else if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.DiamondData.GetAmount() < this.RRu.Price) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Farm_BuyFail");
        } else {
          const e = this.RRu.Id;
          const o = this.RRu.Type;
          if (o === Protocol_1.Aki.Protocol.eou.Proto_ShopToy) {
            i = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetCurToyCount();
            if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.EnableToyCount <= i) {
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Farm_ToyFull");
              return;
            }
          }
          FloroRanchController_1.FloroRanchController.SendFloroRanchPlayShopBuyRequest(this.CNe.Id, ModelManager_1.ModelManager.FloroRanchGamePlayModel.SubInstanceId, e, o, this.JLu.w5n, t => {
            if (t && (this.rAu(e, o), this.InitShopItemDataList(t.Vhu), this.xRu(), this.PRu(), ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Farm_BuySuccess"), t.Ncu)) {
              t = t.Ncu.qcu.Eps;
              this.gQc(t);
            }
          });
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 78, "商店没有选中商品！");
      }
    };
    this.dlo = () => {
      if (this.JLu.z_u) {
        if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.DiamondData.GetAmount() < this.JLu.N2s[0].m9n) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Farm_MoneyNotEnough");
        } else {
          FloroRanchController_1.FloroRanchController.SendFloroRanchPlayRefreshShopRequest(this.CNe.Id, ModelManager_1.ModelManager.FloroRanchGamePlayModel.SubInstanceId, this.JLu.w5n, t => {
            this.InitShopItemDataList(t.Vhu);
            this.xRu();
            this.JGu(0, this.ShopItemDataList[0]);
            this.PRu();
            this.zqo?.Play();
          });
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 78, "商店刷新 allowedRefresh 为 false");
      }
    };
    this.odu = () => {
      ModelManager_1.ModelManager.FloroRanchGamePlayModel.HideRecordView();
    };
    this.lyt = () => {
      this.CloseMe();
      this.PNo?.();
    };
    this.ShopItemDataList = [];
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIText], [5, UE.UIScrollViewWithScrollbarComponent], [6, UE.UIItem], [7, UE.UIButtonComponent], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIText], [11, UE.UITexture], [12, UE.UIText], [13, UE.UIItem], [14, UE.UITexture], [15, UE.UIText], [16, UE.UITexture], [17, UE.UIText], [18, UE.UIText], [19, UE.UITexture], [20, UE.UITexture], [21, UE.UIItem], [22, UE.UIButtonComponent], [23, UE.UIText], [24, UE.UITexture], [25, UE.UIText], [26, UE.UIItem], [27, UE.UIItem], [28, UE.UIItem], [29, UE.UIItem], [30, UE.UIText], [31, UE.UIItem], [32, UE.UITexture]];
    this.BtnBindInfo = [[22, this.zSl], [1, this.dlo], [7, this.odu], [0, this.lyt]];
  }
  async OnBeforeStartAsync() {
    var i = [];
    this.fuu.clear();
    var e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.EnableToyCount;
    for (let t = 0; t < e; t++) {
      i.push(this.yuu(t));
    }
    await Promise.all(i);
    this.Zku = new FloroRanchCurrencyItem_1.FloroRanchCurrencyItem();
    var t = this.GetItem(8);
    await this.Zku.CreateThenShowByActorAsync(t.GetOwner());
    this.TRu = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(5), this.cV_);
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
    this.xRu();
    this.JGu(0, this.ShopItemDataList[0]);
    this.PRu();
    this.CQc();
    var t = UiManager_1.UiManager.GetViewByName("FloroRanchGamePlayView");
    if (t) {
      t.SetToyPanelActive(false);
    }
    this.zqo?.Play();
    this.fHc.SetEnableUiBlur(true);
  }
  OnBeforeHide() {
    var t = UiManager_1.UiManager.GetViewByName("FloroRanchGamePlayView");
    if (t) {
      t.SetToyPanelActive(true);
    }
    this.fHc.SetEnableUiBlur(false);
  }
  OnBeforeDestroy() {
    ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(this.GetText(18));
  }
  Qh_() {
    this.fHc = new UE.TsUiBlur_C();
    this.fHc.SetEnableUiBlur(false);
  }
  xRu() {
    var t = ModelManager_1.ModelManager.FloroRanchGamePlayModel.DiamondData;
    this.Zku.SetCurrencyData(t);
    var t = this.JLu.z_u;
    this.GetButton(1)?.RootUIComp.SetUIActive(t);
    if (t) {
      t = this.JLu.N2s[0];
      this.GetText(3)?.SetText("-" + t.m9n);
      t = ModelManager_1.ModelManager.FloroRanchModel.GetFloroRanchCurrencyConfig(2);
      this.SetTextureByPath(t.GetSmallIcon(), this.GetTexture(2));
      t = this.JLu.LOu;
      this.GetText(4)?.ShowTextNew(t > 0 ? "Farm_Edit5" : "Farm_Edit4");
      this.GetItem(29)?.SetUIActive(t > 0);
      this.GetText(30)?.SetText("" + t);
    }
    this.TRu.RefreshByData(this.ShopItemDataList);
  }
  PRu() {
    var t;
    var i;
    var e;
    var o;
    var r;
    var s;
    if (this.RRu) {
      t = this.RRu.Type;
      this.GetText(10)?.ShowTextNew(this.RRu.GetName());
      this.GetText(18)?.SetText(this.RRu.Desc);
      this.SetTextureByPath(this.RRu.GetIcon(), this.GetTexture(11));
      e = t === Protocol_1.Aki.Protocol.eou.Proto_ShopToy;
      this.GetItem(13)?.SetUIActive(!e);
      this.GetItem(31)?.SetUIActive(false);
      if (e) {
        if (e = this.RRu.GetToyRaceData()) {
          this.SetTextureByPath(e.SmallIcon, this.GetTexture(32));
          this.GetItem(31)?.SetUIActive(true);
        }
      } else {
        e = this.RRu.GetRace();
        e = this.CNe.GetFloroRanchRaceData(e);
        this.SetTextureByPath(e.SmallIcon, this.GetTexture(14));
        this.GetText(15)?.ShowTextNew(e.GetRaceName());
      }
      if (e = this.RRu.Type === Protocol_1.Aki.Protocol.eou.Gcu) {
        i = new FloroRanchCurrencyData_1.FloroRanchCurrencyData(3);
        this.SetTextureByPath(i.ConfigData.GetSmallIcon(), this.GetTexture(16));
        this.GetText(17)?.SetText(this.RRu.GetEarnCount().toString());
      }
      this.GetTexture(16)?.SetUIActive(e);
      this.GetText(17)?.SetUIActive(e);
      i = ModelManager_1.ModelManager.FloroRanchGamePlayModel.DiamondData;
      if (!(e = this.RRu.IsSold)) {
        o = this.RRu.Price;
        (s = this.GetText(25)).SetText("-" + o);
        r = i.GetAmount();
        s.useChangeColor = r < o;
        this.SetTextureByPath(i.ConfigData.GetSmallIcon(), this.GetTexture(24));
      }
      this.GetButton(22)?.RootUIComp.SetUIActive(!e);
      this.GetItem(21)?.SetUIActive(e);
      this.GetText(23)?.ShowTextNew("Farm_Edit1");
      this.GetText(12)?.ShowTextNew(this.UHc[t]);
      s = this.RRu.GetQualityData();
      this.SetTextureByPath(s.GetRarityDetailCardBigBg(), this.GetTexture(19));
      this.SetTextureByPath(s.GetRarityDetailCardSmallBg(), this.GetTexture(20));
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanchGamePlay", 78, "商店没有选中商品！");
    }
  }
  CQc() {
    var i = ModelManager_1.ModelManager.FloroRanchGamePlayModel.EnableToyCount;
    for (let t = 0; t < i; t++) {
      if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetToyEntityByPoint(t)) {
        this.gQc(t);
      } else {
        this.fQc(t);
      }
    }
  }
  gQc(t) {
    var i = this.fuu.get(t);
    if (i) {
      t = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetToyEntityByPoint(t);
      i.PlayShowAnim(t);
    }
  }
  fQc(t) {
    t = this.fuu.get(t);
    if (t) {
      t.SetInfoPanelActive(false);
    }
  }
  JGu(t, i) {
    this.ARu(false, this.LRu);
    this.RRu = i;
    this.LRu = t;
    this.ARu(true, t);
  }
  ARu(t, i) {
    if (!(i < 0) && !(i >= this.bRu.length)) {
      this.bRu[i].SetSelectState(t);
    }
  }
  InitShopItemDataList(t) {
    t = (this.JLu = t).bMs;
    this.ShopItemDataList.length = 0;
    for (const e of t) {
      var i = this._Ru(e);
      this.ShopItemDataList.push(i);
    }
    this.CNe = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
  }
  _Ru(t) {
    switch (t.h5n) {
      case Protocol_1.Aki.Protocol.eou.Gcu:
        return new FloroRanchShopItemData_1.FloroRanchShopItemCardData(t);
      case Protocol_1.Aki.Protocol.eou.Fcu:
        return new FloroRanchShopItemData_1.FloroRanchShopItemCardGroupData(t);
      case Protocol_1.Aki.Protocol.eou.Proto_ShopToy:
        return new FloroRanchShopItemData_1.FloroRanchShopItemToyData(t);
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("FloroRanchGamePlay", 78, "FloroRanch商店物品类型错误", ["type", t.h5n]);
        }
        return;
    }
  }
  rAu(i, e) {
    var t = this.ShopItemDataList.find(t => t.Id === i && t.Type === e);
    if (t) {
      t.BuyGoods();
    }
  }
}
exports.FloroRanchShopView = FloroRanchShopView;
//# sourceMappingURL=FloroRanchShopView.js.map