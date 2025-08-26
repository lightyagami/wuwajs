"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseHeadStateDynamicBatchView = undefined;
const UE = require("ue");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const TowerDefenseHeadStateView_1 = require("./TowerDefenseHeadStateView");
class TowerDefenseHeadStateDynamicBatchView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.vq = false;
    this.o9c = undefined;
    this.t7c = undefined;
    this.n9c = undefined;
    this.s9c = undefined;
    this.Dgn = Rotator_1.Rotator.Create();
    this.a9c = Vector_1.Vector.Create();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIDynamicBatchMesh], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.o9c = new TowerDefenseHeadStateView_1.TowerDefenseHeadStateView();
    await this.o9c.CreateByResourceIdAsync("UiItem_TowerDefenseHP", this.GetItem(1));
  }
  OnStart() {
    this.vq = true;
    this.t7c = this.GetDynamicBatchMesh(0);
    this.n9c = this.GetItem(1);
    this.s9c = this.o9c.GetRootItem();
    this.a9c.FromUeVector(this.s9c.GetUIWorldPosition());
    this.n9c.SetUIActive(true);
  }
  OnBeforeDestroy() {
    this.vq = false;
    if (this.o9c) {
      this.o9c.Destroy();
      this.o9c = undefined;
    }
  }
  GetIsEnable() {
    return this.vq;
  }
  RefreshRotation(e) {
    this.Dgn.Yaw = e.Yaw + 90;
    this.Dgn.Roll = e.Pitch - 90;
    this.Dgn.Pitch = 0;
    this.n9c.K2_SetWorldRotation(this.Dgn.ToUeRotator(), false, undefined, true);
  }
  AddToDynamicBatchMesh(e) {
    this.o9c.Refresh(e, this.a9c);
    this.t7c.AddContainerNode(this.s9c, true);
  }
  ClearDynamicBatchMesh() {
    this.t7c.ClearAllGeometries();
  }
}
exports.TowerDefenseHeadStateDynamicBatchView = TowerDefenseHeadStateDynamicBatchView;
//# sourceMappingURL=TowerDefenseHeadStateDynamicBatchView.js.map