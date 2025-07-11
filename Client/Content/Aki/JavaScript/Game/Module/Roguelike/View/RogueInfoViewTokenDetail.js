"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueInfoViewTokenDetail = exports.RogueInfoViewTokenDetailGrid = exports.RogueInfoViewTokenDetailGridBottom = exports.RogueInfoViewShopDiscount = exports.RogueInfoViewShopDiscountTag = exports.RogueInfoViewTokenElement = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewSequence_1 = require("../../../Ui/Base/UiViewSequence");
const LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
const MediumItemGridComponent_1 = require("../../Common/MediumItemGrid/MediumItemGridComponent/MediumItemGridComponent");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const CommonSelectItem_1 = require("./CommonSelectItem");
class RogueInfoViewTokenElement extends MediumItemGridComponent_1.MediumItemGridComponent {
  constructor() {
    super(...arguments);
    this.Sui = undefined;
    this.Fao = () => {
      return new CommonSelectItem_1.CommonElementItem();
    };
  }
  GetResourceId() {
    return "UiItem_ItemRogueElement";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout]];
  }
  OnActivate() {
    this.Sui = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.Fao);
  }
  OnRefresh(e) {
    var e = e.GetSortElementInfoArrayByCount();
    if (!(e.length <= 0)) {
      e = e[0];
      e = new Array(e.Count).fill(e.ElementId);
      this.Sui?.RefreshByData(e);
    }
  }
}
exports.RogueInfoViewTokenElement = RogueInfoViewTokenElement;
class RogueInfoViewShopDiscountTag extends MediumItemGridComponent_1.MediumItemGridComponent {
  GetResourceId() {
    return "UiItem_ItemDiscountTag";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnRefresh(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "RogueInfoViewShopDiscount", e.Discounted.toString());
  }
}
exports.RogueInfoViewShopDiscountTag = RogueInfoViewShopDiscountTag;
class RogueInfoViewShopDiscount extends MediumItemGridComponent_1.MediumItemGridComponent {
  GetResourceId() {
    return "UiItem_ItemDiscount";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIText], [0, UE.UITexture]];
  }
  OnRefresh(e) {
    if (e.IsDiscounted()) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "RogueInfoViewShopPriceWithDiscount", e.CurrentPrice, e.OriginalPrice);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "RogueInfoViewShopPrice", e.OriginalPrice);
    }
    if (e.ShopItemCoinId !== 0) {
      e = ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueCurrencyConfig(e.ShopItemCoinId);
      this.SetTextureByPath(e?.IconSmall ?? "", this.GetTexture(0));
    }
  }
}
exports.RogueInfoViewShopDiscount = RogueInfoViewShopDiscount;
class RogueInfoViewTokenDetailGridBottom extends MediumItemGridComponent_1.MediumItemGridComponent {
  constructor() {
    super(...arguments);
    this.Zao = undefined;
  }
  GetResourceId() {
    return "UiItem_ItemRogue";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText]];
  }
  OnActivate() {
    this.Zao = new CommonSelectItem_1.CommonElementItem();
    this.Zao.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  OnRefresh(e) {
    e = e.GetSortElementInfoArrayByCount();
    if (!(e.length <= 0)) {
      this.Zao.Update(e[0].ElementId);
      this.Zao.RefreshPanel();
      this.GetText(1).SetText(e[0].Count.toString());
    }
  }
}
exports.RogueInfoViewTokenDetailGridBottom = RogueInfoViewTokenDetailGridBottom;
class RogueInfoViewTokenDetailGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.OnStageChanged = e => {
      if (e.State === 1) {
        this.OnSelected(true);
      }
    };
  }
  OnStart() {
    this.BindOnExtendToggleStateChanged(this.OnStageChanged);
  }
  OnRefresh(e, t, i) {
    var o = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueBuffConfig(e.ConfigId);
    var o = {
      Type: 4,
      Data: e,
      IconPath: o.BuffIcon,
      QualityId: o.Quality,
      QualityType: "MediumItemGridQualitySpritePath",
      IsDisable: e.IsSell
    };
    this.Apply(o);
    this.SetSelected(t);
    if (t) {
      this.OnSelected(true);
    }
    var o = this.RefreshComponent(RogueInfoViewTokenElement, true, e);
    this.SetComponentVisible(o, e.OriginalPrice !== 0);
    var o = this.RefreshComponent(RogueInfoViewShopDiscount, true, e);
    this.SetComponentVisible(o, e.OriginalPrice !== 0);
    var n = this.RefreshComponent(RogueInfoViewTokenDetailGridBottom, true, e);
    this.SetComponentVisible(n, e.OriginalPrice === 0);
    var n = this.RefreshComponent(RogueInfoViewShopDiscountTag, true, e);
    this.SetComponentVisible(n, e.IsDiscounted());
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Roguelike", 34, "肉鸽商店刷新数据 格子", ["isSelected", t], ["gridIndex", i], ["discountComponent", o !== undefined], ["isDiscounted", e.IsDiscounted()]);
    }
  }
  OnSelected(e) {
    if (!this.IsSelected) {
      this.SetSelected(true, e);
      if (e) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoguelikeInfoSelectedToken, this.Data, this.GridIndex);
      }
    }
  }
  OnDeselected(e) {
    this.SetSelected(false, false);
  }
}
exports.RogueInfoViewTokenDetailGrid = RogueInfoViewTokenDetailGrid;
class RogueInfoViewTokenDetail extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.LoopScrollView = undefined;
    this.DetailItem = undefined;
    this.UiViewSequence = undefined;
    this.Oho = () => {
      return new RogueInfoViewTokenDetailGrid();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem], [2, UE.UIItem]];
  }
  OnBeforeCreateImplement() {
    this.UiViewSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this);
    this.AddUiBehavior(this.UiViewSequence);
  }
  async OnBeforeStartAsync() {
    this.DetailItem = new CommonSelectItem_1.CommonSelectItem();
    await this.DetailItem.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
    this.LoopScrollView = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(1).GetOwner(), this.Oho);
    var e = ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.BuffEntryList;
    e.sort((e, t) => {
      e = ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueBuffConfig(e.ConfigId)?.Quality;
      t = ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueBuffConfig(t.ConfigId)?.Quality;
      if (e === undefined || t === undefined) {
        return 0;
      } else {
        return t - e;
      }
    });
    await this.LoopScrollView.RefreshByDataAsync(e);
  }
  OnStart() {
    this.DetailItem.SetActive(false);
  }
  OnAfterShow() {
    this.LoopScrollView.SelectGridProxy(0, true);
  }
  Update(e) {
    this.LoopScrollView?.ReloadData(e);
  }
  OnSelected(e, t) {
    var i = this.LoopScrollView.GetSelectedGridIndex();
    this.LoopScrollView.SelectGridProxy(t, false);
    this.LoopScrollView.RefreshGridProxy(i);
    this.DetailItem.SetActive(true);
    this.DetailItem.Update(e);
  }
}
exports.RogueInfoViewTokenDetail = RogueInfoViewTokenDetail;
//# sourceMappingURL=RogueInfoViewTokenDetail.js.map