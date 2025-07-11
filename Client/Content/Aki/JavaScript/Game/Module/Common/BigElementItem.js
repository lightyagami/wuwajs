"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BigElementItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class BigElementItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ZIt = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture]];
  }
  OnStart() {}
  Refresh(e) {
    var t;
    var i;
    if (this.ZIt !== e && (this.ZIt = e, t = this.GetTexture(1)) && (i = ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(e))) {
      e = i.Icon4Pure;
      if (!StringUtils_1.StringUtils.IsEmpty(e)) {
        i = UE.Color.FromHex(i.ElementColor);
        this.GetSprite(0).SetColor(i);
        this.SetTextureByPath(e, t);
      }
    }
  }
}
exports.BigElementItem = BigElementItem;
//# sourceMappingURL=BigElementItem.js.map