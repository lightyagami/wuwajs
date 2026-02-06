"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleTechTreeNodeItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const MotorcycleTechTreeLevelItem_1 = require("./MotorcycleTechTreeLevelItem");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
class MotorcycleTechTreeNodeItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Node = undefined;
    this.GLl = undefined;
    this.Hea = undefined;
    this.F5g = false;
    this.OnClickToggleBack = undefined;
    this.j1a = () => new MotorcycleTechTreeLevelItem_1.MotorcycleTechTreeLevelItem();
    this.omf = () => {
      this.OnClickToggleBack?.(this.Node, this.GetExtendToggle(0));
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UISprite], [4, UE.UIItem], [3, UE.UITexture], [5, UE.UITexture], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIHorizontalLayout]];
    this.BtnBindInfo = [[0, this.omf]];
  }
  OnStart() {
    this.GLl = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(8), this.j1a);
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeShow() {
    if (this.Node !== undefined) {
      this.Hea.StopSequenceByKey("Start");
      this.Hea.PlayLevelSequenceByName("Start");
    }
  }
  PlayNodeSequence() {
    if (!this.F5g) {
      this.Hea.StopSequenceByKey("Start");
      this.Hea.PlayLevelSequenceByName("Start");
      this.F5g = true;
    }
  }
  RefreshNodeData(e) {
    if (e) {
      this.Node = e;
      var t = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechConfig(e.NodeId);
      var r = e.Status;
      var i = r === -1;
      var s = r === 1;
      var r = r === 0;
      var o = ModelManager_1.ModelManager.MotorcycleDevelopModel.IsPreNodeActivated(e);
      var i = i || !o;
      var h = this.GetItem(1);
      var a = this.GetSprite(2);
      var c = this.GetTexture(3);
      var n = this.GetItem(6);
      h.SetUIActive(false);
      a.SetUIActive(false);
      c.SetChangeColor(false, c.changeColor);
      n.SetUIActive(false);
      this.GetItem(4).SetUIActive(i);
      this.GetItem(7).SetUIActive(i);
      var i = ModelManager_1.ModelManager.MotorcycleDevelopModel.CanUpgradeNode(e);
      if (r) {
        h.SetUIActive(true);
        a.SetUIActive(false);
        n.SetUIActive(o && i);
      } else if (s) {
        r = e.NodeLevel >= t.TechLv.length;
        h.SetUIActive(true);
        a.SetUIActive(true);
        c.SetChangeColor(true, c.changeColor);
        n.SetUIActive(!r && i);
      }
      var l = e.NodeLevel;
      var u = [];
      for (let e = 0; e < t.TechLv.length; e++) {
        var d = {
          TargetLevel: e + 1,
          CurLevel: l
        };
        u.push(d);
      }
      this.SetTextureByPath(t.Icon, this.GetTexture(3));
      this.SetTextureByPath(t.Icon, this.GetTexture(5));
      this.GLl.RefreshByData(u);
    }
  }
  Refresh(e, t, r) {
    this.RefreshNodeData(e);
  }
  SelectNode() {
    this.omf();
  }
}
exports.MotorcycleTechTreeNodeItem = MotorcycleTechTreeNodeItem;
//# sourceMappingURL=MotorcycleTechTreeNodeItem.js.map