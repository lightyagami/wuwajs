"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FurniturePresetView = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const FurniturePresetItem_1 = require("./FurniturePresetItem");
class FurniturePresetView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Xeg = undefined;
    this._1g = false;
    this.u1g = () => {
      this.c1g();
    };
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
      this.Xeg = new FurniturePresetItem_1.FurniturePresetItem();
      await this.Xeg.CreateThenShowByResourceIdAsync("UiItem_PopupPreset", this.GetItem(2));
      this.Xeg.OnApplyDelegate = this.u1g;
      this.Xeg.Refresh(e.AreaData);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "DIY_Foolproof_ConfirmWindow_Title");
    }
  }
  async c1g() {
    var e;
    var i;
    if (!this._1g) {
      if (this.Xeg && (i = (e = this.OpenParam).AreaData)) {
        this._1g = true;
        UiLayer_1.UiLayer.SetShowMaskLayer("ApplyFurniturePresetAsync", true);
        await ControllerHolder_1.ControllerHolder.FurnitureController.ApplyFurniturePresetAsync(i).finally(() => {
          UiLayer_1.UiLayer.SetShowMaskLayer("ApplyFurniturePresetAsync", false);
          this._1g = false;
        });
        if (e.OnApplyDelegate) {
          e.OnApplyDelegate(i);
        }
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("DIY_Foolproof_Success_Tip");
        this.CloseMe();
      }
    }
  }
}
exports.FurniturePresetView = FurniturePresetView;
//# sourceMappingURL=FurniturePresetView.js.map