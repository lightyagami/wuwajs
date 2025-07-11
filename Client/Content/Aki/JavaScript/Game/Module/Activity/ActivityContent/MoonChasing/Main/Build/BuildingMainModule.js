"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuildingMainModule = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const LongPressButton_1 = require("../../../../../Util/LongPressButton");
const BuildingMapMoveComponent_1 = require("./BuildingMapMoveComponent");
const BuildingMapTileModule_1 = require("./BuildingMapTileModule");
class BuildingMainModule extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.kDn = undefined;
    this.o4o = undefined;
    this.Hwt = undefined;
    this.ZoomIn = undefined;
    this.ZoomOut = undefined;
    this.Xjs = i => {
      if (i !== 3) {
        this.Hwt.SetValue(this.o4o.MapScale, false);
      }
    };
    this.P4o = () => {
      this.o4o.LongPressScroll(-this.o4o.ScaleStep);
    };
    this.w4o = () => {
      this.o4o.LongPressScroll(this.o4o.ScaleStep);
    };
    this.CHs = i => {
      this.o4o.SliderScroll(i);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIDraggableComponent], [1, UE.UIItem], [2, UE.UISliderComponent], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent]];
  }
  async JDn() {
    this.kDn = new BuildingMapTileModule_1.BuildingMapTileModule(true, false);
    await this.kDn.CreateThenShowByActorAsync(this.GetDraggable(0).GetOwner());
    this.kDn.SetBuildingItemActive(false);
  }
  S7s() {
    this.o4o = new BuildingMapMoveComponent_1.BuildingMapMoveComponent(this.GetDraggable(0));
    this.o4o.SetScaleSafeArea(0.45, 0.6);
    this.o4o.SetChangeScaleCallback(this.Xjs);
  }
  fHs() {
    this.Hwt = this.GetSlider(2);
    this.Hwt.SetMinValue(this.o4o.MapScaleSafeArea.Min, false, false);
    this.Hwt.SetMaxValue(this.o4o.MapScaleSafeArea.Max, false, false);
    this.Hwt.OnValueChangeCb.Bind(this.CHs);
    this.Hwt.SetValue(this.o4o.MapScaleSafeArea.Min, true);
    this.ZoomIn = new LongPressButton_1.LongPressButton(this.GetButton(3), this.w4o);
    this.ZoomOut = new LongPressButton_1.LongPressButton(this.GetButton(4), this.P4o);
    this.GetItem(1)?.SetUIActive(false);
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.JDn()]);
  }
  OnStart() {
    this.S7s();
    this.fHs();
  }
  RefreshModule() {
    this.kDn.RefreshRole();
  }
  OnBeforeShow() {
    this.o4o.BindTouch();
    this.o4o.AddGamepadEvent();
  }
  OnAfterHide() {
    this.o4o.UnbindTouch();
    this.o4o.RemoveGamepadEvent();
  }
  OnBeforeDestroy() {
    this.o4o.Destroy();
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    return this.kDn.GetGuideUiItemAndUiItemForShowEx(i);
  }
  HideBuildingModule() {
    this.GetItem(1)?.SetUIActive(false);
    this.kDn.SetBuildingItemActive(false);
  }
  ShowBuilding() {
    this.GetItem(1)?.SetUIActive(true);
    this.kDn.SetBuildingItemActive(true);
  }
  RefreshBuilding(i) {
    this.kDn.RefreshBuildingItem(i);
  }
}
exports.BuildingMainModule = BuildingMainModule;
//# sourceMappingURL=BuildingMainModule.js.map