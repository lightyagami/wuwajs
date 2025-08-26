"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonKeySettingRowsPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const KeySettingRowBaseItem_1 = require("../../Menu/KeySettingsView/KeySettingRowBaseItem");
const DynScrollView_1 = require("../../Util/ScrollView/DynScrollView");
const CommonKeySettingRowContainerItem_1 = require("./CommonKeySettingRowContainerItem");
class CommonKeySettingRowsPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.EPi = undefined;
    this.MPi = undefined;
    this.LSi = (e, t, i) => {
      return new CommonKeySettingRowContainerItem_1.CommonKeySettingRowContainerItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIDynScrollViewComponent], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.EPi = new KeySettingRowBaseItem_1.KeySettingRowBaseItem();
    this.MPi = new DynScrollView_1.DynamicScrollView(this.GetUIDynScrollViewComponent(0), this.GetItem(1), this.EPi, this.LSi);
    await this.MPi.Init();
  }
  Refresh(e, t) {
    for (const i of e) {
      i.IsExpandDetail = false;
    }
    this.MPi?.RefreshByData(e);
  }
  StopScroll() {
    this.GetUIDynScrollViewComponent(0).StopMovement();
  }
}
exports.CommonKeySettingRowsPanel = CommonKeySettingRowsPanel;
//# sourceMappingURL=CommonKeySettingRowsPanel.js.map