"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssTagItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class DangoAbyssTagItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.GetValueByTips = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIText]];
  }
  Refresh(e, r, t) {
    var i = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoPluginPropDescById(e.TagId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.Name);
    var i = UE.Color.FromHex(i.BgColor);
    this.GetSprite(0).SetColor(i);
    var i = ModelManager_1.ModelManager.DangoAbyssModel.GetFormatAttributeValueByTagId(e.Value, e.TagId, this.GetValueByTips);
    this.GetText(2).SetText(i);
  }
}
exports.DangoAbyssTagItem = DangoAbyssTagItem;
//# sourceMappingURL=DangoAbyssTagItem.js.map