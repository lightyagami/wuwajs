"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AttributeItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
class AttributeItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.NextItem = undefined;
    this.qte = "";
    this.xe = 0;
    this.zIt = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIText], [4, UE.UITexture], [5, UE.UIItem]];
  }
  OnStart() {
    this.NextItem = this.GetItem(2);
    this.NextItem?.SetUIActive(false);
  }
  InitCommon() {
    var t = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(this.xe);
    this.GetText(0)?.ShowTextNew(t.Name);
    var e = this.GetTexture(4);
    if (e) {
      this.SetTextureByPath(t.Icon, e);
    }
  }
  UpdateParam(t, e) {
    this.xe = t;
    this.zIt = e;
    this.InitCommon();
  }
  SetCurrentValue(t) {
    t = ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(this.xe, t, this.zIt);
    this.qte = t;
    this.GetText(1)?.SetText(this.qte);
  }
  SetNextValue(t) {
    t = ModelManager_1.ModelManager.AttributeModel.GetFormatAttributeValueString(this.xe, t, this.zIt);
    if (this.qte && this.qte === t) {
      this.SetNextItemActive(false);
    } else {
      this.GetText(3)?.SetText(t);
    }
  }
  SetNextItemActive(t) {
    this.NextItem?.SetUIActive(t);
    this.GetText(3).SetUIActive(t);
  }
  GetAttributeId() {
    return this.xe;
  }
  SetBgActive(t) {
    var e = this.GetItem(5);
    if (e) {
      e.SetUIActive(t);
    }
  }
  RefreshNameByAnotherName() {
    var t = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(this.xe);
    this.GetText(0)?.ShowTextNew(t.AnotherName);
  }
  Refresh(t, e, i) {
    this.UpdateParam(t.Id, t.IsRatio);
    this.SetCurrentValue(t.CurValue);
    this.SetNextItemActive(t.ShowNext);
    if (t.NextValue) {
      this.SetNextValue(t.NextValue);
    }
    if (t.UseAnotherName) {
      this.RefreshNameByAnotherName();
    }
    this.SetBgActive(t.BgActive);
  }
}
exports.AttributeItem = AttributeItem;
//# sourceMappingURL=AttributeItem.js.map