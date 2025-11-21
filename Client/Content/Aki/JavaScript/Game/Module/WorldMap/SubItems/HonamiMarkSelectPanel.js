"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiMarkSelectPanel = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const HonamiMarkSelectItem_1 = require("./HonamiMarkSelectItem");
class HonamiMarkSelectPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ShowMode = 1;
    this.xqe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(0), () => {
      return new HonamiMarkSelectItem_1.HonamiMarkSelectItem();
    });
    await this.xqe.RefreshByDataAsync(ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiMapMarkList().map(e => e.Id).sort((e, r) => e - r));
  }
  SetWorldMapSelfShow(e) {
    this.ShowMode = e;
  }
  RefreshWorldMapSelfShow(e) {
    this.SetUiActive(e === 2);
  }
}
exports.HonamiMarkSelectPanel = HonamiMarkSelectPanel;
//# sourceMappingURL=HonamiMarkSelectPanel.js.map