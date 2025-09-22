"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemHintPanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ListSliderControl_1 = require("./ListSliderControl");
class ItemHintPanel extends UiPanelBase_1.UiPanelBase {
  constructor(i) {
    super();
    this.Pe = undefined;
    this.e0i = undefined;
    this.d_d = () => {
      var i = this.Pe.CreateProxyFunction();
      i.SetShiftData(this.m_d);
      return i;
    };
    this.r0i = () => this.Pe?.CheckNext() ?? false;
    this.m_d = () => this.Pe?.ShiftItem() ?? undefined;
    this.Pe = i;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIItem]];
  }
  OnBeforeDestroy() {
    if (this.e0i) {
      this.e0i.DestroyMe();
      this.e0i = undefined;
    }
  }
  OnStart() {
    var i;
    if (this.r0i()) {
      (i = this.GetItem(0))?.SetUIActive(this.Pe?.TitleTextId !== undefined);
      if (i?.IsUIActiveSelf()) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), this.Pe.TitleTextId);
      }
      this.e0i = new ListSliderControl_1.ListSliderControl({
        CreateProxyFunction: this.d_d,
        ParentUi: this.GetItem(2),
        CheckNext: this.r0i,
        ChildTemplate: this.Pe?.ChildTemplate,
        ChildResourceId: this.Pe?.ChildResourceId,
        MaxShowCount: this.Pe?.MaxShowCount,
        AddItemTime: this.Pe?.AddItemTime,
        ItemSliderTime: this.Pe?.ItemSliderTime,
        ItemShowTime: this.Pe?.ItemShowTime,
        SliderMode: this.Pe?.SliderMode,
        TickMode: this.Pe?.TickMode,
        FinishCallback: this.Pe?.FinishCallback
      });
      this.e0i.DisEnableParentLayout();
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("ItemHint", 8, "进包列表为空, 但打开了界面!");
    }
  }
  OnTick(i) {
    if (this.e0i) {
      this.e0i.Tick(i);
    }
  }
}
exports.ItemHintPanel = ItemHintPanel;
//# sourceMappingURL=ItemHintPanel.js.map