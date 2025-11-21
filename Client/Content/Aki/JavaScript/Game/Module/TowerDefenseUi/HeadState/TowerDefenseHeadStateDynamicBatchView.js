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
    this.eYu = undefined;
    this.t7c = undefined;
    this.tYu = undefined;
    this.iYu = undefined;
    this.Dgn = Rotator_1.Rotator.Create();
    this.rYu = Vector_1.Vector.Create();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIDynamicBatchMesh], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.eYu = new TowerDefenseHeadStateView_1.TowerDefenseHeadStateView();
    await this.eYu.CreateByResourceIdAsync("UiItem_TowerDefenseHP", this.GetItem(1));
  }
  OnStart() {
    this.vq = true;
    this.t7c = this.GetDynamicBatchMesh(0);
    this.tYu = this.GetItem(1);
    this.iYu = this.eYu.GetRootItem();
    this.rYu.FromUeVector(this.iYu.GetUIWorldPosition());
    this.tYu.SetUIActive(true);
  }
  OnBeforeDestroy() {
    this.vq = false;
    if (this.eYu) {
      this.eYu.Destroy();
      this.eYu = undefined;
    }
  }
  GetIsEnable() {
    return this.vq;
  }
  RefreshRotation(e) {
    this.Dgn.Yaw = e.Yaw + 90;
    this.Dgn.Roll = e.Pitch - 90;
    this.Dgn.Pitch = 0;
    this.tYu.K2_SetWorldRotation(this.Dgn.ToUeRotator(), false, undefined, true);
  }
  AddToDynamicBatchMesh(e) {
    this.eYu.Refresh(e, this.rYu);
    this.t7c.AddContainerNode(this.iYu, true);
  }
  ClearDynamicBatchMesh() {
    this.t7c.ClearAllGeometries();
  }
}
exports.TowerDefenseHeadStateDynamicBatchView = TowerDefenseHeadStateDynamicBatchView;
//# sourceMappingURL=TowerDefenseHeadStateDynamicBatchView.js.map