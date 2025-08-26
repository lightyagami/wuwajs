"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseMonsterDescPanel = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const TrapDefenseAttrItem_1 = require("./TrapDefenseAttrItem");
class TrapDefenseMonsterDescPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ItemData = undefined;
    this.ViewModel = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelMonster;
    this.LayoutAttr = undefined;
    this.LayoutTag = undefined;
    this.CreateItemAttr = () => new TrapDefenseAttrItem_1.TrapDefenseAttrItem();
    this.CreateItemTag = () => new TrapDefenseAttrItem_1.TrapDefenseTagAttrItem();
  }
  async Init(e) {
    await this.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnBeforeCreate() {}
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UILayoutBase], [6, UE.UIItem], [7, UE.UILayoutBase], [8, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    var e = this.GetLayoutBase(5);
    var t = this.GetItem(6)?.GetOwner();
    this.LayoutAttr = new GenericLayout_1.GenericLayout(e, this.CreateItemAttr, t);
    var e = this.GetLayoutBase(7);
    var t = this.GetItem(8)?.GetOwner();
    this.LayoutTag = new GenericLayout_1.GenericLayout(e, this.CreateItemTag, t);
  }
  OnStart() {}
  OnBeforeShow() {}
  OnBeforeDestroy() {}
  UpdateData(e) {
    this.ItemData = e;
    var t = this.GetTexture(0);
    this.SetTextureByPath(e.IconPath, t);
    var t = this.GetTexture(1);
    this.SetTextureByPath(e.GetQualityPathDesc(), t);
    this.GetText(2)?.ShowTextNew(e.NameKey);
    this.GetText(3)?.ShowTextNew(e.GetRiskTypeNameKey());
    this.GetText(4)?.ShowTextNew(e.GetBodyTypeNameKey());
    this.UpdateAttrShow();
  }
  UpdateAttrShow() {
    var e = this.ItemData.GetAttrDataShowList();
    var t = this.ItemData.GetTagDataShowList();
    this.GetLayoutBase(5)?.RootUIComp.SetUIActive(e.length > 0);
    if (e.length > 0) {
      this.LayoutAttr.RefreshByData(e);
    }
    this.GetLayoutBase(7)?.RootUIComp.SetUIActive(t.length > 0);
    if (t.length > 0) {
      this.LayoutTag.RefreshByData(t);
    }
  }
}
exports.TrapDefenseMonsterDescPanel = TrapDefenseMonsterDescPanel;
//# sourceMappingURL=TrapDefenseMonsterDescPanel.js.map