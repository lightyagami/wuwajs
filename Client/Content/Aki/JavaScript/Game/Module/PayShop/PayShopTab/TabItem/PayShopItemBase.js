"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayShopItemBase = exports.PayShopItemBaseSt = undefined;
const UE = require("ue");
const LanguageSystem_1 = require("../../../../../Core/Common/LanguageSystem");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const HelpController_1 = require("../../../Help/HelpController");
const PayShopGoods_1 = require("../../PayShopData/PayShopGoods");
const PayShopDefine_1 = require("../../PayShopDefine");
const NORMALCOLOR = "000000FF";
const REDCOLOR = "BA5C59FF";
class PayShopItemBaseSt {
  constructor() {
    this.Id = 0;
    this.Quality = 0;
    this.ItemId = 0;
    this.ItemCount = 0;
    this.ItemName = "";
    this.IsDirect = false;
    this.PriceData = undefined;
    this.IfRechargeItem = false;
    this.StageImage = "";
    this.ShowStageImage = "";
    this.GachaAverageCount = undefined;
    this.GachaPrice = undefined;
    this.GetShopTipsText = undefined;
    this.GetIfNeedShowDownTipsText = undefined;
    this.GetDownTipsText = undefined;
    this.GetSpriteTextBgColor = undefined;
    this.GetTextTipsColor = undefined;
    this.RedDotExistFunc = undefined;
    this.GetDirectPriceTextFunc = undefined;
    this.xrr = "";
  }
  Refresh(t) {
    if (this.xrr !== LanguageSystem_1.LanguageSystem.PackageLanguage) {
      if (t instanceof PayShopGoods_1.PayShopGoods) {
        this.PhraseFromPayItemData(t);
      } else {
        this.PhrasePromPayItemData(t);
      }
    }
  }
  PhraseFromPayItemData(t) {
    this.Quality = t.GetItemData().Quality;
    this.ItemId = t.GetItemData().ItemId;
    this.ItemCount = t.GetGoodsData().ItemCount;
    this.ItemName = t.GetGoodsData().GetGoodsName(LanguageSystem_1.LanguageSystem.PackageLanguage);
    this.IsDirect = t.IsDirect();
    this.Id = t.GetGoodsData().Id;
    this.StageImage = t.GetGoodsData().StageImage;
    this.ShowStageImage = t.GetGoodsData().ShowStageImage;
    this.PriceData = t.GetPriceData();
    this.GetShopTipsText = () => t.GetShopTipsText();
    this.GetIfNeedShowDownTipsText = () => t.GetIfNeedShowDownTipsText();
    this.GetDownTipsText = () => t.GetDownTipsText();
    this.GetTextTipsColor = () => t.GetTextTipsColor();
    this.GetSpriteTextBgColor = () => t.GetSpriteTextBgColor();
    this.GetDirectPriceTextFunc = () => t.GetDirectPriceText();
    this.RedDotExistFunc = () => t.GetIfNeedRemind();
    this.xrr = LanguageSystem_1.LanguageSystem.PackageLanguage;
  }
  PhrasePromPayItemData(t) {
    var i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t.ItemId);
    this.Quality = i.QualityId;
    this.ItemId = t.ItemId;
    this.ItemCount = t.ItemCount;
    this.StageImage = t.StageImage;
    this.ItemName = t.GetPayItemShowName();
    this.IsDirect = true;
    this.Id = t.PayItemId;
    if (this.IsDirect) {
      this.GetDirectPriceTextFunc = () => t.GetDirectPriceText();
    }
    this.IfRechargeItem = true;
    this.xrr = LanguageSystem_1.LanguageSystem.PackageLanguage;
    this.GachaAverageCount = () => t.GetGachaAverageCount();
    this.GachaPrice = () => t.GetGachaAveragePriceText();
  }
}
exports.PayShopItemBaseSt = PayShopItemBaseSt;
class PayShopItemBase extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.Pe = undefined;
    this.wqe = undefined;
    this.q3i = false;
    this.hJ = ResourceSystem_1.ResourceSystem.InvalidId;
    this.G3i = undefined;
    this.ckn = "";
    this.Gsi = () => {
      HelpController_1.HelpController.OpenHelpById(PayShopDefine_1.MONTH_CARD_HELP_ID);
    };
    this.N3i = true;
    this.RefreshRedDotState = true;
    this.wqe = t;
  }
  Init() {
    this.SetRootActor(this.wqe.GetOwner(), true);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UITexture], [3, UE.UIButtonComponent], [4, UE.UIText], [5, UE.UIText], [6, UE.UIItem], [7, UE.UITexture], [8, UE.UIText], [9, UE.UIText], [10, UE.UIText], [11, UE.UIItem], [12, UE.UITexture], [13, UE.UIItem]];
    this.BtnBindInfo = [[3, this.Gsi]];
  }
  SetDownPriceShowState(t) {
    this.GetSprite(1).SetUIActive(t);
    this.GetItem(6).SetUIActive(t);
    this.GetText(10).SetUIActive(t);
  }
  SetDownPriceOnlyShow(t) {
    this.GetSprite(1).SetUIActive(t);
    this.GetItem(6).SetUIActive(t);
    this.GetText(10).SetUIActive(!t);
  }
  OnTimerRefresh(t, i, s) {
    if (!this.Pe || this.Pe.Id !== t.Id) {
      this.q3i = false;
    }
    this.Pe = t;
    this.O3i();
  }
  Refresh(t, i, s) {
    if (!this.Pe || this.Pe.Id !== t.Id) {
      this.q3i = false;
    }
    this.Pe = t;
    this.N3i = true;
    this.k3i();
    this.Aqe();
    this.F3i();
    this.V3i();
    this.H3i();
    this.j3i();
    this.O3i();
  }
  O3i() {
    this.W3i();
    this.iFi();
    this.K3i();
    this.Q3i();
    this.RefreshRedDot();
  }
  OnBeforeDestroy() {
    this.X3i();
  }
  Q3i() {
    var t;
    if (this.Pe.GetTextTipsColor) {
      t = this.Pe.GetTextTipsColor();
      this.GetText(10).SetColor(UE.Color.FromHex(t));
    }
  }
  H3i() {
    var t = ConfigManager_1.ConfigManager.PayShopConfig.GetMonthCardShopId();
    this.GetButton(3).RootUIComp.SetUIActive(this.Pe.Id === t);
  }
  k3i() {
    var t = ModelManager_1.ModelManager.PayShopModel.GetPayShopItemQualitySpriteByItemIdAndQuality(this.Pe.ItemId, this.Pe.Quality);
    this.SetSpriteByPath(t, this.GetSprite(0), false);
  }
  Aqe() {
    let t = this.GetTexture(2);
    var i;
    var s = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(this.Pe.ItemId);
    if (this.Pe.IfRechargeItem) {
      t.SetUIActive(false);
      (t = this.GetTexture(12)).SetUIActive(true);
      i = this.Pe.StageImage;
      this.SetTextureByPath(i, t);
    } else if (this.Pe.ShowStageImage !== "") {
      i = this.Pe.ShowStageImage;
      this.SetTextureByPath(i, t);
    } else {
      if (s === 1) {
        i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.Pe.ItemId);
        this.SetRoleIcon(i.Card, t, this.Pe.ItemId);
      } else {
        this.SetItemIcon(t, this.Pe.ItemId);
      }
      this.X3i();
      this.$3i();
    }
  }
  X3i() {
    if (this.hJ !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.hJ);
      this.hJ = ResourceSystem_1.ResourceSystem.InvalidId;
    }
  }
  $3i() {
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(this.Pe.ItemId);
    const i = this.GetTexture(2);
    if (t === 3) {
      t = ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath("MI_HeadYuan");
      this.hJ = ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.MaterialInterface, t => {
        i.SetCustomUIMaterial(t);
      }, 102, this.MemoryTag);
    } else {
      i.SetCustomUIMaterial(undefined);
    }
  }
  F3i() {
    if (!this.q3i) {
      this.GetText(5).SetText(this.Pe.ItemName);
      this.q3i = true;
    }
  }
  V3i() {
    var t;
    var i = this.GetTexture(7);
    if (this.Pe.IsDirect || (t = this.Pe.PriceData).NowPrice === 0) {
      i.SetUIActive(false);
    } else {
      i.SetUIActive(true);
      this.SetItemIcon(i, t.CurrencyId);
    }
  }
  W3i() {
    var t;
    var i = this.GetText(9);
    if (!this.Pe.IsDirect && (t = this.Pe.PriceData).OriginalPrice && t.InDiscountTime) {
      i.SetUIActive(true);
      i.SetText(`<s>${t.OriginalPrice.toString()}</s>`);
    } else {
      i.SetUIActive(false);
    }
  }
  iFi() {
    let t = NORMALCOLOR;
    var i;
    var s;
    if (!this.Pe.IsDirect && this.Pe.PriceData.OwnNumber() < this.Pe.PriceData.NowPrice) {
      t = REDCOLOR;
    }
    if (!this.G3i || this.G3i !== this.Pe.PriceData || this.ckn !== t) {
      this.ckn = t;
      this.G3i = this.Pe?.PriceData;
      i = this.GetText(8);
      if (this.Pe.IsDirect) {
        if (s = this.Pe.GetDirectPriceTextFunc?.()) {
          i.SetText(s);
          i.SetColor(UE.Color.FromHex(t));
        }
      } else {
        if ((s = this.Pe.PriceData).NowPrice === 0) {
          i.ShowTextNew("ShopDiscountLabel_4");
        } else {
          i.SetText(s.NowPrice.toString());
        }
        s = t;
        i.SetColor(UE.Color.FromHex(s));
      }
    }
  }
  K3i() {
    var t;
    var i = this.Pe.GetShopTipsText?.();
    if (this.N3i && !StringUtils_1.StringUtils.IsEmpty(i)) {
      (t = this.GetText(4)).SetUIActive(true);
      t.SetText(i);
    } else {
      this.GetText(4).SetUIActive(false);
    }
  }
  SetLeftTimeTextShowState(t) {
    this.N3i = t;
    if (this.Pe) {
      t = this.Pe.GetShopTipsText?.();
      this.GetText(4).SetUIActive(this.N3i && !StringUtils_1.StringUtils.IsEmpty(t));
    }
  }
  SetNameTextShowState(t) {
    this.GetText(5).SetUIActive(t);
  }
  SetRedDotVisible(t) {
    this.GetItem(11).SetUIActive(t);
  }
  RefreshRedDot() {
    if (this.RefreshRedDotState && this.Pe.RedDotExistFunc) {
      this.SetRedDotVisible(this.Pe.RedDotExistFunc());
    }
  }
  j3i() {
    this.GetItem(13)?.SetUIActive(!this.Pe.IfRechargeItem);
  }
}
exports.PayShopItemBase = PayShopItemBase;
//# sourceMappingURL=PayShopItemBase.js.map