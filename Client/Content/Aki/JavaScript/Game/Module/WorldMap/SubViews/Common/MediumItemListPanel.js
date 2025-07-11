"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemListPanel = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const MediumItemGrid_1 = require("../../../Common/MediumItemGrid/MediumItemGrid");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class MediumItemListItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Q$l = undefined;
    this.ETt = undefined;
    this.GetBottomTextCallback = undefined;
  }
  async OnBeforeStartAsync() {
    this.Q$l = new MediumItemGrid_1.MediumItemGrid();
    await this.Q$l.CreateThenShowByActorAsync(this.GetRootActor());
    this.Q$l.BindOnCanExecuteChange(() => false);
    this.Q$l.BindOnExtendToggleClicked(() => {
      if (this.ETt) {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.ETt);
      }
    });
  }
  Refresh(e) {
    var t = e[0].ItemId;
    var i = e[1];
    this.ETt = t;
    var r = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t);
    var i = this.GetBottomText(i);
    var e = {
      Type: 4,
      Data: e,
      ItemConfigId: t,
      StarLevel: r.QualityId,
      BottomText: i,
      IsOmitBottomText: false
    };
    this.Q$l.Apply(e);
  }
  GetBottomText(e) {
    var t = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(this.ETt);
    if (this.GetBottomTextCallback) {
      return this.GetBottomTextCallback(e);
    } else {
      return `<color=${e <= t ? "Highlight" : "RedA"}>${t}</color>/${e}`;
    }
  }
}
class MediumItemListPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.H3e = undefined;
    this.GetBottomTextCallback = undefined;
    this.K3e = () => {
      var e = new MediumItemListItem();
      e.GetBottomTextCallback = this.GetBottomTextCallback;
      return e;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIGridLayout], [2, UE.UIItem]];
  }
  OnStart() {
    this.H3e = new GenericLayout_1.GenericLayout(this.GetGridLayout(1), this.K3e);
    this.GetText(0).SetText("");
  }
  Refresh(e) {
    this.H3e.RefreshByDataAsync(e);
  }
  SetTitleNewTxt(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e);
  }
}
exports.MediumItemListPanel = MediumItemListPanel;
//# sourceMappingURL=MediumItemListPanel.js.map