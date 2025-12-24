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
    this.OnClickToggleBack = undefined;
    this.j1a = () => new MotorcycleTechTreeLevelItem_1.MotorcycleTechTreeLevelItem();
    this.acf = () => {
      this.OnClickToggleBack?.(this.Node, this.GetExtendToggle(0));
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UISprite], [4, UE.UIItem], [3, UE.UITexture], [5, UE.UITexture], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIHorizontalLayout]];
    this.BtnBindInfo = [[0, this.acf]];
  }
  OnStart() {
    this.GLl = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(8), this.j1a);
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeShow() {
    this.Hea.StopSequenceByKey("Start");
    this.Hea.PlayLevelSequenceByName("Start");
  }
  RefreshNodeData(e, t = false) {
    if (e) {
      this.Node = e;
      var r = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechConfig(e.NodeId);
      var i = e.Status;
      var s = i === -1;
      var o = i === 1;
      var i = i === 0;
      var h = ModelManager_1.ModelManager.MotorcycleDevelopModel.IsPreNodeActivated(e);
      var s = s || !h;
      var a = this.GetItem(1);
      var c = this.GetSprite(2);
      var n = this.GetTexture(3);
      var l = this.GetItem(6);
      a.SetUIActive(false);
      c.SetUIActive(false);
      l.SetUIActive(false);
      this.GetItem(4).SetUIActive(s);
      this.GetItem(7).SetUIActive(s);
      var s = ModelManager_1.ModelManager.MotorcycleDevelopModel.CanUpgradeNode(e);
      if (i) {
        a.SetUIActive(true);
        c.SetUIActive(false);
        l.SetUIActive(h && s);
      } else if (o) {
        i = e.NodeLevel >= r.TechLv.length;
        a.SetUIActive(true);
        c.SetUIActive(true);
        n.SetChangeColor(true, n.changeColor);
        l.SetUIActive(!i && s);
      }
      var u = e.NodeLevel;
      var d = [];
      for (let e = 0; e < r.TechLv.length; e++) {
        var M = {
          TargetLevel: e + 1,
          CurLevel: u
        };
        d.push(M);
      }
      this.SetTextureByPath(r.Icon, this.GetTexture(3));
      this.SetTextureByPath(r.Icon, this.GetTexture(5));
      this.GLl.RefreshByData(d);
      if (t) {
        this.Hea.StopSequenceByKey("Start");
        this.Hea.PlayLevelSequenceByName("Start");
      }
    }
  }
  Refresh(e, t, r) {
    this.RefreshNodeData(e);
  }
  RefreshSelfNodeData(e) {
    this.RefreshNodeData(this.Node, e);
  }
  SelectNode() {
    this.acf();
  }
}
exports.MotorcycleTechTreeNodeItem = MotorcycleTechTreeNodeItem;
//# sourceMappingURL=MotorcycleTechTreeNodeItem.js.map