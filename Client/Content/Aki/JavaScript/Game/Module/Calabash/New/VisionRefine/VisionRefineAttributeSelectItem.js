"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AttributeSelectItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const AttributeModel_1 = require("../../../Attribute/AttributeModel");
const CommonComponentDefine_1 = require("../../../Common/CommonComponentDefine");
class AttributeSelectItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem]];
  }
  RefreshByData(e) {
    this.GetItem(3).SetUIActive(false);
    this.GetItem(4).SetUIActive(true);
    var t = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(e.PropIndexId);
    this.GetText(1).ShowTextNew(t.Name);
    this.SetTextureShowUntilLoaded(t.Icon, this.GetTexture(0));
    var t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomMainPropertyItemId(e.PropItemId);
    var i = t.AddType === CommonComponentDefine_1.RATIO;
    var t = AttributeModel_1.TipsDataTool.GetPropRatioValue(t.StandardProperty, i);
    var e = ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(e.PropIndexId, t, i);
    this.GetText(2).SetText(e);
  }
  RefreshUi(e) {
    if (e) {
      this.RefreshByData(e);
    } else {
      this.GetItem(3).SetUIActive(true);
      this.GetItem(4).SetUIActive(false);
    }
  }
}
exports.AttributeSelectItem = AttributeSelectItem;
//# sourceMappingURL=VisionRefineAttributeSelectItem.js.map