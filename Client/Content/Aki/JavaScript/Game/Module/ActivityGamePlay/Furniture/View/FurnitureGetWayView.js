"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurnitureGetWayView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const FurnitureGetWayItem_1 = require("./FurnitureGetWayItem");
class FurnitureGetWayView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.GetWayItem = undefined;
    this.lyt = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent], [2, UE.UIItem]];
    this.BtnBindInfo = [[1, this.lyt]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    if (e) {
      this.GetWayItem = new FurnitureGetWayItem_1.FurnitureGetWayItem();
      await this.GetWayItem.CreateThenShowByResourceIdAsync("UiItem_PopupFurnitureInfo", this.GetItem(2));
      this.GetWayItem.Refresh(e);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "DIY_OccupiedWindow_Title");
    }
  }
}
exports.FurnitureGetWayView = FurnitureGetWayView;
//# sourceMappingURL=FurnitureGetWayView.js.map