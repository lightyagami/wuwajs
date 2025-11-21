"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStorySellConfirmBoxView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const HonamiStoryController_1 = require("../HonamiStoryController");
class HonamiStorySellConfirmBoxView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.yCm = [];
    this.LDu = () => {};
    this.ZAt = undefined;
    this.hRa = undefined;
    this.vVt = undefined;
    this.sOt = () => {
      HonamiStoryController_1.HonamiStoryController.RequestHonamiStorySellItem(this.yCm).then(t => {
        this.LDu();
        this.CloseMe();
      });
    };
    this.eDo = () => {
      this.CloseMe();
    };
    this.cHe = () => {
      return new HonamiStorySellConfirmBoxItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UILoopScrollViewComponent], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.hRa = new ButtonItem_1.ButtonItem();
    this.ZAt = new ButtonItem_1.ButtonItem();
    await Promise.all([this.hRa.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()), this.ZAt.CreateThenShowByActorAsync(this.GetItem(1).GetOwner())]);
    this.hRa.SetFunction(this.eDo);
    this.hRa.SetShowText("HonamiStory_SellingOptionsCancel");
    this.ZAt.SetFunction(this.sOt);
    this.ZAt.SetShowText("HonamiStory_ClickSell");
    var t = this.GetItem(3).GetOwner();
    this.vVt = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(2), t, this.cHe);
  }
  OnStart() {
    var t = this.OpenParam;
    this.yCm = t.SellItemList;
    this.LDu = t.SellCallback;
  }
  OnBeforeShow() {
    this.Og();
  }
  Og() {
    var t = [];
    let i = 0;
    var e;
    var r;
    var o = new Map();
    for (const n of this.yCm) {
      var s = n.ItemData;
      if (o.has(s)) {
        o.set(s, o.get(s) + 1);
      } else {
        o.set(s, 1);
      }
    }
    for ([e, r] of o.entries()) {
      t.push({
        ItemData: e,
        Number: r
      });
      i += e.GetSellPrice() * r;
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "HonamiStory_SumPriceConfirmText", i.toString());
    this.vVt.RefreshByData(t);
  }
}
exports.HonamiStorySellConfirmBoxView = HonamiStorySellConfirmBoxView;
class HonamiStorySellConfirmBoxItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText], [4, UE.UITexture]];
  }
  Refresh(t) {
    var i = t.ItemData;
    var e = i.GetName();
    let r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? e;
    e = t.Number;
    if (e > 1) {
      r += " x" + e;
    }
    this.GetText(2).SetText(r);
    this.GetText(3).SetText((e * i.GetSellPrice()).toString());
    t = this.GetTexture(1);
    this.SetItemIcon(t, i.GetItemId());
    e = ModelManager_1.ModelManager.HonamiStoryModel.ActivityId;
    t = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryActivityConfig(e);
    this.SetItemIcon(this.GetTexture(4), t.OutCoinItemId);
  }
}
//# sourceMappingURL=HonamiStorySellConfirmBoxView.js.map