"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleBuffAddPanel = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const MoraleBuffAddAreaItem_1 = require("./MoraleBuffAddAreaItem");
const MoraleBuffAddItem_1 = require("./MoraleBuffAddItem");
class MoraleBuffAddPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OpenParam = undefined;
    this.ItemLayout = undefined;
    this.AreaBuffLayout = undefined;
    this.CloseCallback = undefined;
    this.Qll = () => {
      this.SetActive(false);
      this.CloseCallback?.();
    };
    this.Bqe = () => new MoraleBuffAddItem_1.MoraleBuffAddItem();
    this.UA_ = () => new MoraleBuffAddAreaItem_1.MoraleBuffAddAreaItem();
  }
  async Init(e) {
    await this.CreateByActorAsync(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UILayoutBase], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UILayoutBase], [7, UE.UIItem], [8, UE.UIText]];
    this.BtnBindInfo = [[0, this.Qll]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    var e = this.GetLayoutBase(1);
    var t = this.GetItem(2).GetOwner();
    this.ItemLayout = new GenericLayout_1.GenericLayout(e, this.Bqe, t);
    var e = this.GetLayoutBase(6);
    var t = this.GetItem(7).GetOwner();
    this.AreaBuffLayout = new GenericLayout_1.GenericLayout(e, this.UA_, t);
  }
  OnBeforeShow() {
    this.UpdateData();
  }
  OnBeforeDestroy() {
    if (this.GetActive()) {
      this.CloseCallback?.();
    }
  }
  UpdateData() {
    this.UpdateTitle();
    this.UpdateLvAddDesc();
    this.UpdateList();
    this.UpdateAreaList();
  }
  UpdateTitle() {
    this.GetText(4)?.ShowTextNew("Morale_title_22");
    this.GetText(8)?.ShowTextNew("Morale_title_38");
  }
  UpdateList() {
    var e = ModelManager_1.ModelManager.MoraleModel.GetAllRoleAttrAddList();
    this.ItemLayout.RefreshByData(e);
  }
  UpdateAreaList() {
    var e = ModelManager_1.ModelManager.MoraleModel.AreaDataList;
    this.AreaBuffLayout.RefreshByData(e);
  }
  UpdateLvAddDesc() {
    var e = ModelManager_1.ModelManager.MoraleBattleModel.GetMoraleLevel();
    var e = ConfigManager_1.ConfigManager.MoraleBattleConfig?.GetExpConfig(e);
    if (e) {
      this.GetText(5).ShowTextNew(e.LvAddDesc);
    }
  }
}
exports.MoraleBuffAddPanel = MoraleBuffAddPanel;
//# sourceMappingURL=MoraleBuffAddPanel.js.map