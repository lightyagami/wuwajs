"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleTechTreeComNodeItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const MotorcycleTechTreeLevelItem_1 = require("./MotorcycleTechTreeLevelItem");
class MotorcycleTechTreeComNodeItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Node = undefined;
    this.GLl = undefined;
    this.OnClickToggleBack = undefined;
    this.j1a = () => new MotorcycleTechTreeLevelItem_1.MotorcycleTechTreeLevelItem();
    this.acf = () => {
      this.OnClickToggleBack?.(this.Node, this.GetExtendToggle(0));
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [9, UE.UISprite], [3, UE.UIItem], [2, UE.UITexture], [4, UE.UITexture], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIHorizontalLayout], [8, UE.UIItem], [10, UE.UIItem]];
    this.BtnBindInfo = [[0, this.acf]];
  }
  OnStart() {
    this.GLl = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(7), this.j1a);
  }
  async RefreshNodeAsync() {
    await this.RefreshNodeAsyncByData(this.Node);
  }
  async RefreshNodeAsyncByData(e) {
    if (e) {
      this.Node = e;
      var t = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechConfig(e.NodeId);
      var i = e.Status;
      var s = i === -1;
      var r = i === 1;
      var i = i === 0;
      var a = ModelManager_1.ModelManager.MotorcycleDevelopModel.IsPreNodeActivated(e);
      var o = this.GetItem(8);
      var h = this.GetSprite(9);
      var n = this.GetTexture(2);
      var c = this.GetItem(6);
      o.SetUIActive(false);
      h.SetUIActive(false);
      c.SetUIActive(false);
      this.GetItem(10).SetUIActive(s);
      this.GetItem(5).SetUIActive(s);
      var s = ModelManager_1.ModelManager.MotorcycleDevelopModel.CanUpgradeNode(e);
      if (i) {
        o.SetUIActive(true);
        h.SetUIActive(false);
        c.SetUIActive(a && s);
      } else if (r) {
        i = e.NodeLevel >= t.TechLv.length;
        o.SetUIActive(true);
        h.SetUIActive(true);
        c.SetUIActive(!i && s);
        n.SetChangeColor(true, n.changeColor);
      }
      var l = e.NodeLevel;
      var M = [];
      for (let e = 0; e < t.TechLv.length; e++) {
        var u = {
          TargetLevel: e + 1,
          CurLevel: l
        };
        M.push(u);
      }
      a = [this.SetTextureAsync(t.Icon, this.GetTexture(2)), this.SetTextureAsync(t.Icon, this.GetTexture(4)), this.GLl.RefreshByDataAsync(M)];
      await Promise.all(a);
    }
  }
  SelectNode() {
    this.acf();
  }
}
exports.MotorcycleTechTreeComNodeItem = MotorcycleTechTreeComNodeItem;
//# sourceMappingURL=MotorcycleTechTreeComNodeItem.js.map