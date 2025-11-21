"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemHintViewNew = exports.ItemHintViewNewData = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiViewData_1 = require("../../../Ui/Define/UiViewData");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ItemHintItem_1 = require("./ItemHintItem");
const ItemPriorHintItem_1 = require("./ItemPriorHintItem");
const ListSliderControl_1 = require("./ListSliderControl");
class ItemHintViewNewData extends UiViewData_1.UiViewData {
  constructor() {
    super(...arguments);
    this.TitleTextId = undefined;
    this.CheckNext = undefined;
    this.ShiftItem = undefined;
    this.MaxShowCount = undefined;
    this.AddItemTime = undefined;
    this.ItemSliderTime = undefined;
    this.ItemShowTime = undefined;
    this.SlotResourceId = undefined;
    this.CheckPriorNext = undefined;
    this.ShiftPriorItem = undefined;
    this.PriorMaxShowCount = undefined;
    this.AddPriorItemTime = undefined;
    this.PriorItemSliderTime = undefined;
    this.PriorItemShowTime = undefined;
    this.PriorSlotResourceId = undefined;
  }
}
exports.ItemHintViewNewData = ItemHintViewNewData;
class ItemHintViewNew extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.e0i = undefined;
    this.t0i = undefined;
    this.Pe = undefined;
    this.Qld = () => {
      var i = new ItemHintItem_1.ItemHintItem();
      i.SetShiftData(this.jld);
      return i;
    };
    this.Kld = () => {
      var i = new ItemPriorHintItem_1.ItemPriorHintItem();
      i.SetShiftData(this.Xld);
      return i;
    };
    this.HDe = () => {
      if ((!this.t0i || !!this.t0i?.IsFinish) && (!this.e0i || !!this.e0i?.IsFinish)) {
        this.CloseMe();
      }
    };
    this.r0i = () => this.Pe?.CheckNext?.() ?? false;
    this.jld = () => this.Pe?.ShiftItem?.() ?? undefined;
    this.n0i = () => this.Pe?.CheckPriorNext?.() ?? false;
    this.Xld = () => this.Pe?.ShiftPriorItem?.() ?? undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIItem], [0, UE.UIItem], [2, UE.UIItem], [3, UE.UIText]];
  }
  OnBeforeCreate() {
    super.OnBeforeCreate();
    this.Pe = this.OpenParam;
  }
  OnBeforeDestroy() {
    if (this.e0i) {
      this.e0i.DestroyMe();
      this.e0i = undefined;
    }
    if (this.t0i) {
      this.t0i.DestroyMe();
      this.t0i = undefined;
    }
  }
  OnStart() {
    var i;
    var t;
    if (this.r0i() || this.n0i()) {
      (i = this.GetItem(2))?.SetUIActive(this.Pe?.TitleTextId !== undefined);
      if (i?.IsUIActiveSelf()) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), this.Pe.TitleTextId);
      }
      i = this.GetItem(1);
      t = this.GetItem(0);
      i.SetUIActive(false);
      t.SetUIActive(false);
      if (this.r0i()) {
        this.e0i = new ListSliderControl_1.ListSliderControl({
          CreateProxyFunction: this.Qld,
          ParentUi: i.GetParentAsUIItem(),
          CheckNext: this.r0i,
          ChildResourceId: this.Pe?.SlotResourceId ?? "UiItem_ItemListB",
          MaxShowCount: this.Pe?.MaxShowCount,
          AddItemTime: this.Pe?.AddItemTime,
          ItemShowTime: this.Pe?.ItemShowTime,
          ItemSliderTime: this.Pe?.ItemSliderTime,
          SliderMode: 0,
          FinishCallback: this.HDe
        });
        this.e0i.DisEnableParentLayout();
      }
      if (this.n0i()) {
        this.t0i = new ListSliderControl_1.ListSliderControl({
          CreateProxyFunction: this.Kld,
          ParentUi: t.GetParentAsUIItem(),
          CheckNext: this.n0i,
          ChildResourceId: this.Pe?.PriorSlotResourceId ?? "UiItem_ItemListA",
          MaxShowCount: this.Pe?.PriorMaxShowCount,
          AddItemTime: this.Pe?.AddPriorItemTime,
          ItemShowTime: this.Pe?.PriorItemShowTime,
          ItemSliderTime: this.Pe?.PriorItemSliderTime,
          SliderMode: 0,
          FinishCallback: this.HDe
        });
        this.t0i.DisEnableParentLayout();
      }
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("ItemHint", 8, "进包列表为空, 但打开了界面!");
      }
      this.CloseMe();
    }
  }
  OnTick(i) {
    if (this.t0i) {
      this.t0i.Tick(i);
    }
    if (this.e0i) {
      this.e0i.Tick(i);
    }
  }
}
exports.ItemHintViewNew = ItemHintViewNew;
//# sourceMappingURL=ItemHintViewNew.js.map