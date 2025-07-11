"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssTipsAttributeItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const AttributeModel_1 = require("../../../Attribute/AttributeModel");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class DangoAbyssTipsAttributeItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText]];
  }
  Refresh(e, t, r) {
    var i = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(e.Id);
    this.GetText(1).ShowTextNew(i.Name);
    this.SetTextureShowUntilLoaded(i.Icon, this.GetTexture(0));
    var i = AttributeModel_1.TipsDataTool.GetPropRatioValue(e.BaseValue, e.IsRatio);
    var i = ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(e.Id, i, e.IsRatio);
    this.GetText(2).SetText(i);
  }
}
exports.DangoAbyssTipsAttributeItem = DangoAbyssTipsAttributeItem;
//# sourceMappingURL=DangoAbyssTipsAttributeItem.js.map