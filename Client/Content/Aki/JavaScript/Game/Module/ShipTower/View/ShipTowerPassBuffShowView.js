"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerPassBuffShowView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const ShipTowerPassBuffShowItem_1 = require("./ShipTowerPassBuffShowItem");
class ShipTowerPassBuffShowView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.OpenParam = undefined;
    this.RA_ = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent]];
  }
  Es_() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Temp", 69, "", ["DataParam", this.OpenParam]);
    }
  }
  async OnBeforeStartAsync() {
    this.Es_();
    await super.OnBeforeStartAsync();
    this.RA_ = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(0), () => new ShipTowerPassBuffShowItem_1.ShipTowerPassBuffShowItem());
  }
  OnBeforeShow() {
    var e = this.OpenParam?.StageData.GetPassUnlockBuffList() ?? [];
    this.RA_?.RefreshByData(e);
  }
}
exports.ShipTowerPassBuffShowView = ShipTowerPassBuffShowView;
//# sourceMappingURL=ShipTowerPassBuffShowView.js.map