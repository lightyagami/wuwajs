"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MediumItemListPanel = void 0;
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  MediumItemGrid_1 = require("../../../Common/MediumItemGrid/MediumItemGrid"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class MediumItemListItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.Q$l = void 0, this.ETt = void 0, this.GetBottomTextCallback = void 0
  }
  async OnBeforeStartAsync() {
    this.Q$l = new MediumItemGrid_1.MediumItemGrid, await this.Q$l.CreateThenShowByActorAsync(this.GetRootActor()), this.Q$l.BindOnCanExecuteChange(() => !1), this.Q$l.BindOnExtendToggleClicked(() => {
      this.ETt && ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.ETt)
    })
  }
  Refresh(e) {
    var t = e[0].ItemId,
      i = e[1],
      r = (this.ETt = t, ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t)),
      i = this.GetBottomText(i),
      e = {
        Type: 4,
        Data: e,
        ItemConfigId: t,
        StarLevel: r.QualityId,
        BottomText: i,
        IsOmitBottomText: !1
      };
    this.Q$l.Apply(e)
  }
  GetBottomText(e) {
    var t = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(this.ETt);
    return this.GetBottomTextCallback ? this.GetBottomTextCallback(e) : `<color=${e<=t?"Highlight":"RedA"}>${t}</color>/` + e
  }
}
class MediumItemListPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.H3e = void 0, this.GetBottomTextCallback = void 0, this.K3e = () => {
      var e = new MediumItemListItem;
      return e.GetBottomTextCallback = this.GetBottomTextCallback, e
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIGridLayout],
      [2, UE.UIItem]
    ]
  }
  OnStart() {
    this.H3e = new GenericLayout_1.GenericLayout(this.GetGridLayout(1), this.K3e), this.GetText(0).SetText("")
  }
  Refresh(e) {
    this.H3e.RefreshByDataAsync(e)
  }
  SetTitleNewTxt(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e)
  }
}
exports.MediumItemListPanel = MediumItemListPanel;
//# sourceMappingURL=MediumItemListPanel.js.map