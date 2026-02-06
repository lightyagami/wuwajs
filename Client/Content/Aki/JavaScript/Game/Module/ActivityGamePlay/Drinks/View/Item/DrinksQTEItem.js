"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrinksQTESectionItem = exports.DrinksQTEButton = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
class DrinksQTEButton extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnClickedCb = undefined;
    this.CanClick = false;
    this.OnClickedBtn = () => {
      if (this.OnClickedCb && this.CanClick) {
        this.CanClick = false;
        this.OnClickedCb();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UISprite]];
    this.BtnBindInfo = [[0, this.OnClickedBtn]];
  }
  OnStart() {
    this.SetSelfActive(true);
  }
  SetSelfActive(e) {
    this.GetSprite(1)?.SetFillAmount(e ? 1 : 0);
    this.CanClick = e;
    this.GetButton(0)?.SetSelfInteractive(e);
  }
  OnTick(e) {
    this.GetSprite(1)?.SetFillAmount(Math.max(0, e));
    if (e <= 0) {
      this.OnClickedBtn();
    }
  }
}
exports.DrinksQTEButton = DrinksQTEButton;
class DrinksQTESectionItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Layout = undefined;
    this.LevelSequencePlayer = undefined;
    this.TXf = () => new DrinksQTESectionFlaovr();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIHorizontalLayout], [3, UE.UIItem]];
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.Layout = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.TXf);
  }
  ApplyDrinkData(e) {
    var t;
    var i;
    var s = [];
    for ([t, i] of ConfigManager_1.ConfigManager.DrinksConfig.GetDrinkBase(e).Flavor) {
      var r = {
        Type: t,
        Value: i
      };
      s.push(r);
    }
    this.Layout.RefreshByData(s);
    this.RootItem?.SetAlpha(1);
  }
  SetIsSelected(e) {
    this.RootItem?.SetAlpha(e ? 1 : 0.5);
    if (e) {
      this.LevelSequencePlayer?.PlayLevelSequenceByName("Start");
    }
  }
}
exports.DrinksQTESectionItem = DrinksQTESectionItem;
class DrinksQTESectionFlaovr extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText]];
  }
  Refresh(e, t, i) {
    var s = ConfigManager_1.ConfigManager.DrinksConfig.GetFlavorType(e.Type);
    this.SetTextureByPath(s.Icon, this.GetTexture(0));
    this.GetText(1)?.SetText(String(e.Value));
  }
}
//# sourceMappingURL=DrinksQTEItem.js.map