"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiMarkSelectItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class HonamiMarkSelectItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.zvm = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText]];
  }
  Refresh(e) {
    this.zvm = e;
    e = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiMapMarkById(this.zvm);
    if (e !== undefined) {
      this.GetText(1).ShowTextNew(e.Name);
      this.SetSpriteByPath(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e.IconResourceId), this.GetSprite(0), true);
    }
  }
}
exports.HonamiMarkSelectItem = HonamiMarkSelectItem;
//# sourceMappingURL=HonamiMarkSelectItem.js.map