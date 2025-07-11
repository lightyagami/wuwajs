"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigateIconItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class NavigateIconItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.DNl = undefined;
    this.eTt = () => {
      this.DNl?.ClickCallback(this.DNl?.Id, this.DNl?.MarkItem);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UISprite]];
    this.BtnBindInfo = [[0, this.eTt]];
  }
  Refresh(t) {
    var t = (this.DNl = t).IconId ? ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t.IconId) : t.IconPath;
    var e = this.GetSprite(1);
    this.SetSpriteByPath(t, e, false);
  }
}
exports.NavigateIconItem = NavigateIconItem;
//# sourceMappingURL=NavigateIconItem.js.map