"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MiniElementItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class MiniElementItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, i, t) {
    super();
    this.ZIt = e;
    if (!t && i) {
      this.CreateThenShowByResourceIdAsync("UiItem_MiniElement_Prefab", i, false);
    } else {
      this.CreateThenShowByActor(t);
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture]];
  }
  OnStart() {
    this.RefreshMiniElement(this.ZIt);
  }
  RefreshMiniElement(e) {
    var i;
    var t = this.GetTexture(1);
    if (t && (e = ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(e)) && (i = e.Icon5) !== "" && i.length !== 0) {
      i = UE.Color.FromHex(e.ElementColor);
      this.GetSprite(0).SetColor(i);
      this.SetTextureByPath(e.Icon5, t);
    }
  }
}
exports.MiniElementItem = MiniElementItem;
//# sourceMappingURL=MiniElementItem.js.map