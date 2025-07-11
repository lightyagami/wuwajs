"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionAssembleAttrScrollItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const AttributeModel_1 = require("../../../../Attribute/AttributeModel");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
class VisionAssembleAttrScrollItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UITexture], [7, UE.UIText], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  PlaySequence(e) {
    this.SPe?.StopCurrentSequence();
    this.SPe?.PlayLevelSequenceByName(e);
  }
  SetLeftItemAlpha(e) {
    this.GetItem(0).SetAlpha(e);
  }
  SetRightItemAlpha(e) {
    this.GetItem(11).SetAlpha(e);
  }
  WNe(e) {
    e = e % 2 == 0;
    this.GetItem(1).SetUIActive(e);
    this.GetItem(5).SetUIActive(e);
  }
  Refresh(e, t, r) {
    this.WNe(r);
    var r = e.CompareMode;
    this.GetItem(0).SetUIActive(r);
    var i = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(e.AttrId);
    if (r) {
      this.SetTextureByPath(i.Icon, this.GetTexture(2));
      this.GetText(3).ShowTextNew(i.Name);
      const a = AttributeModel_1.TipsDataTool.GetPropRatioValue(e.CompareValue, e.IfPercentage);
      const o = ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(e.AttrId, a, e.IfPercentage);
      this.GetText(4).SetText(o.toString());
      var r = e.CompareValue === e.CurrentValue;
      var s = e.CompareValue < e.CurrentValue;
      this.GetItem(9).SetUIActive(s && !r);
      this.GetItem(10).SetUIActive(!s && !r);
    } else {
      this.GetItem(9).SetUIActive(false);
      this.GetItem(10).SetUIActive(false);
    }
    this.SetTextureByPath(i.Icon, this.GetTexture(6));
    this.GetText(7).ShowTextNew(i.Name);
    const a = AttributeModel_1.TipsDataTool.GetPropRatioValue(e.CurrentValue, e.IfPercentage);
    const o = ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(e.AttrId, a, e.IfPercentage);
    this.GetText(8).SetText(o);
  }
}
exports.VisionAssembleAttrScrollItem = VisionAssembleAttrScrollItem;
//# sourceMappingURL=VisionAssembleAttrScrollItem.js.map