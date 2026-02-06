"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleTechTreeFirstNodeItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const MotorcycleTechTreeLevelItem_1 = require("./MotorcycleTechTreeLevelItem");
class MotorcycleTechTreeFirstNodeItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Node = undefined;
    this.GLl = undefined;
    this.OnClickToggleBack = undefined;
    this.j1a = () => new MotorcycleTechTreeLevelItem_1.MotorcycleTechTreeLevelItem();
    this.omf = () => {
      this.OnClickToggleBack?.(this.Node, this.GetExtendToggle(0));
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIHorizontalLayout], [3, UE.UIItem], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.omf]];
  }
  OnStart() {
    this.GLl = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.j1a);
  }
  async RefreshNodeAsync() {
    await this.RefreshNodeAsyncByData(this.Node);
  }
  async RefreshNodeAsyncByData(e) {
    if (e) {
      this.Node = e;
      var t = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechConfig(e.NodeId);
      var i = this.Node.Status;
      var r = i === 1;
      var i = i === 0;
      var s = ModelManager_1.ModelManager.MotorcycleDevelopModel.IsPreNodeActivated(e);
      this.GetItem(4).SetUIActive(false);
      var a = ModelManager_1.ModelManager.MotorcycleDevelopModel.CanUpgradeNode(e);
      if (i) {
        this.GetItem(4).SetUIActive(s && a);
      } else if (r) {
        i = e.NodeLevel >= t.TechLv.length;
        this.GetItem(4).SetUIActive(!i && a);
      }
      var o = e.NodeLevel;
      var h = [];
      for (let e = 0; e < t.TechLv.length; e++) {
        var n = {
          TargetLevel: e + 1,
          CurLevel: o
        };
        h.push(n);
      }
      s = [this.SetTextureAsync(t.Icon, this.GetTexture(1)), this.GLl.RefreshByDataAsync(h)];
      await Promise.all(s);
    }
  }
  SelectNode() {
    this.omf();
  }
}
exports.MotorcycleTechTreeFirstNodeItem = MotorcycleTechTreeFirstNodeItem;
//# sourceMappingURL=MotorcycleTechTreeFirstNodeItem.js.map