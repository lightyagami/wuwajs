"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoonChasingMemoryView = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../../../../Core/Define/ConfigCommon/CommonParamById");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../../../Ui/UiManager");
const ButtonItem_1 = require("../../../../../Common/Button/ButtonItem");
const BuildingMapMoveComponent_1 = require("../Build/BuildingMapMoveComponent");
const BuildingMapTileModule_1 = require("../Build/BuildingMapTileModule");
class MoonChasingMemoryView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.kDn = undefined;
    this.o4o = undefined;
    this.lqe = undefined;
    this.Cho = undefined;
    this.v7s = [];
    this.M7s = () => {
      UiManager_1.UiManager.OpenView("MoonChasingMemoryDetailView", this.v7s);
      ModelManager_1.ModelManager.MoonChasingModel.RemoveMemoryRedDot();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIDraggableComponent]];
  }
  async OnBeforeStartAsync() {
    await ControllerHolder_1.ControllerHolder.MoonChasingController.TrackMoonAllDataRequest();
    await this.JDn();
    this.S7s();
    this.VKs();
    this.v7s = await ControllerHolder_1.ControllerHolder.MoonChasingController.TrackMoonMemoryInfoRequest();
  }
  OnStart() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
    });
  }
  OnBeforeShow() {
    var e = ModelManager_1.ModelManager.MoonChasingModel.CheckMemoryRedDotState();
    this.Cho.SetRedDotVisible(e);
  }
  OnBeforeDestroy() {
    this.o4o.Destroy();
  }
  VKs() {
    this.Cho = new ButtonItem_1.ButtonItem(this.GetItem(1));
    this.Cho.SetFunction(this.M7s);
  }
  S7s() {
    this.o4o = new BuildingMapMoveComponent_1.BuildingMapMoveComponent(this.GetDraggable(2), false, false);
    var e = CommonParamById_1.configCommonParamById.GetFloatConfig("MoonFiestaMapSizeParam");
    this.o4o.SetScaleSafeArea(e, 2);
    this.o4o.SetScale(e, 5);
  }
  async JDn() {
    this.kDn = new BuildingMapTileModule_1.BuildingMapTileModule(false, true);
    await this.kDn.CreateThenShowByActorAsync(this.GetDraggable(2).GetOwner());
    this.kDn.SetAllBuildingExhibitionMode(true);
  }
}
exports.MoonChasingMemoryView = MoonChasingMemoryView;
//# sourceMappingURL=MoonChasingMemoryView.js.map