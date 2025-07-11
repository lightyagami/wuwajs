"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssRoleAttributeItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class DangoAbyssRoleAttributeItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIText], [4, UE.UITexture], [5, UE.UISprite]];
  }
  Refresh(e) {
    var r = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(e.Id);
    this.SetTextureByPath(r.Icon, this.GetTexture(4));
    this.GetText(0).ShowTextNew(r.Name);
    this.GetItem(2).SetUIActive(false);
    this.GetText(3).SetUIActive(false);
    var r = ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(e.Id, e.BaseValue + e.AddValue, e.IsRatio);
    this.GetText(1).SetText(r);
  }
}
exports.DangoAbyssRoleAttributeItem = DangoAbyssRoleAttributeItem;
//# sourceMappingURL=DangoAbyssRoleAttributeItem.js.map