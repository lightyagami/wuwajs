"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleTokenDetailGridBottom = exports.RogueBattleShopDiscount = exports.RogueBattleDiscountTagComponent = exports.RogueBattleGridElementComponent = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const MediumItemGridComponent_1 = require("../../Common/MediumItemGrid/MediumItemGridComponent/MediumItemGridComponent");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RogueBattleUtils_1 = require("../RogueBattleUtils");
const RogueBattleTokenElement_1 = require("./RogueBattleTokenElement");
class RogueBattleGridElementComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  constructor() {
    super(...arguments);
    this.Sui = undefined;
    this.Fao = () => {
      return new RogueBattleTokenElement_1.RogueBattleTokenElement();
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
    e = RogueBattleUtils_1.RogueBattleUtils.GetTokenSortElementInfoByCount(e);
    this.Sui?.RefreshByData(e);
  }
}
exports.RogueBattleGridElementComponent = RogueBattleGridElementComponent;
class RogueBattleDiscountTagComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  GetResourceId() {
    return "UiItem_ItemDiscountTag";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnRefresh(e) {
    var t;
    if (e._Ic) {
      t = e._Ic.kN_;
      e = e._Ic.qN_;
      e = Math.floor(e / t * 100);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "RogueInfoViewShopDiscount", (100 - e).toString());
    }
  }
}
exports.RogueBattleDiscountTagComponent = RogueBattleDiscountTagComponent;
class RogueBattleShopDiscount extends MediumItemGridComponent_1.MediumItemGridComponent {
  GetResourceId() {
    return "UiItem_ItemDiscount";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIText], [0, UE.UITexture]];
  }
  OnRefresh(e) {
    if (e._Ic && (e._Ic.qN_ !== e._Ic.kN_ ? LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "RogueInfoViewShopPriceWithDiscount", e._Ic.qN_, e._Ic.kN_) : LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "RogueInfoViewShopPrice", e._Ic.kN_), e._Ic.L8n !== 0)) {
      e = ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueCurrencyConfig(e._Ic.L8n);
      this.SetTextureByPath(e?.IconSmall ?? "", this.GetTexture(0));
    }
  }
}
exports.RogueBattleShopDiscount = RogueBattleShopDiscount;
class RogueBattleTokenDetailGridBottom extends MediumItemGridComponent_1.MediumItemGridComponent {
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
    this.Zao = new RogueBattleTokenElement_1.RogueBattleTokenElement();
    this.Zao.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  OnRefresh(e) {
    e = RogueBattleUtils_1.RogueBattleUtils.GetTokenSortElementInfo(e);
    if (!(e.length <= 0)) {
      this.Zao.Refresh(e[0].ElementId, false, 0);
      this.GetText(1).SetText(e[0].Count.toString());
    }
  }
}
exports.RogueBattleTokenDetailGridBottom = RogueBattleTokenDetailGridBottom;
//# sourceMappingURL=RogueBattleShopGridComponent.js.map