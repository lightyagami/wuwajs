"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CookMaterialItem = undefined;
const UE = require("ue");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class CookMaterialItemContent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.wGt = undefined;
    this.ClickDelegate = undefined;
    this.OnClick = () => {
      this?.ClickDelegate();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIExtendToggle], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIText], [10, UE.UISprite], [11, UE.UISprite]];
    this.BtnBindInfo = [[4, this.OnClick]];
  }
  SetSelect() {
    this.GetExtendToggle(4).SetToggleState(1, false);
  }
  SetDelect() {
    this.GetExtendToggle(4).SetToggleState(0, false);
  }
  OnStart() {
    this.GetSprite(0).SetUIActive(true);
    this.GetTexture(1).SetUIActive(true);
    this.GetText(2).SetUIActive(true);
    this.GetExtendToggle(4).GetOwner().GetComponentByClass(UE.UIItem.StaticClass()).SetUIActive(true);
    this.GetItem(3).SetUIActive(true);
    this.GetItem(5).SetUIActive(false);
    this.GetItem(6).SetUIActive(false);
    this.GetItem(7).SetUIActive(false);
    this.GetItem(8).SetUIActive(false);
    this.GetText(9).SetUIActive(false);
    this.GetSprite(10).SetUIActive(false);
    this.GetSprite(11).SetUIActive(false);
  }
  Update(t) {
    this.wGt = t;
    this.RefreshHave();
    this.Kbe();
    this.BGt();
  }
  RefreshNeed(t = 1) {
    this.RefreshHave(t);
  }
  RefreshHave(t = 1) {
    var t = this.wGt.UVn * t;
    var i = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.wGt.L8n);
    let e = undefined;
    e = this.wGt.K6n ? i < this.wGt.UVn ? StringUtils_1.StringUtils.Format(CommonDefine_1.MATERIAL_NOT_ENOUGHT_TEXT_PATTERN, i.toString(), t.toString()) : StringUtils_1.StringUtils.Format(CommonDefine_1.MATERIAL_ENOUGHT_TEXT_PATTERN, i.toString(), t.toString()) : StringUtils_1.StringUtils.Format(CommonDefine_1.MATERIAL_NEED_SELECT_TEXT_PATTERN, t.toString());
    this.GetText(2).SetText(e);
  }
  Kbe() {
    var t;
    if (this.wGt.K6n) {
      this.GetTexture(1).SetUIActive(true);
      t = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(this.wGt.L8n);
      this.SetTextureByPath(t.Icon, this.GetTexture(1));
    } else {
      this.GetTexture(1).SetUIActive(false);
    }
  }
  BGt() {
    if (this.wGt.K6n) {
      this.GetSprite(0).SetUIActive(true);
      this.SetItemQualityIcon(this.GetSprite(0), this.wGt.L8n);
    } else {
      this.GetSprite(0).SetUIActive(false);
    }
  }
  OnBeforeDestroy() {}
}
class CookMaterialItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.yGe = undefined;
    this.Xy = 0;
    this.oft = undefined;
    this.wGt = undefined;
    this.OnClick = () => {
      this?.oft(this.wGt, this.Xy);
    };
  }
  BindOnClickedCallback(t) {
    this.oft = undefined;
    this.oft = t;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  OnStart() {
    this.yGe = new CookMaterialItemContent();
    this.yGe.CreateThenShowByActor(this.GetItem(0).GetOwner());
    this.yGe.ClickDelegate = undefined;
    this.yGe.ClickDelegate = this.OnClick;
  }
  Update(t, i) {
    this.wGt = t;
    this.yGe.Update(t);
    this.Xy = i;
  }
  UpdateSelectedState(t) {
    if (t === this.Xy) {
      this.yGe.SetSelect();
    } else {
      this.yGe.SetDelect();
    }
  }
  RefreshNeed(t = 1) {
    this.yGe.RefreshNeed(t);
  }
  OnBeforeDestroy() {
    this.yGe.Destroy();
  }
}
exports.CookMaterialItem = CookMaterialItem;
//# sourceMappingURL=CookMaterialItem.js.map