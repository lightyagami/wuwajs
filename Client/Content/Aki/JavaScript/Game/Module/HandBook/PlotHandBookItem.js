"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotHandBookItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
const GenericLayoutNew_1 = require("../Util/Layout/GenericLayoutNew");
const HandBookDefine_1 = require("./HandBookDefine");
const PlotHandBookChildItem_1 = require("./PlotHandBookChildItem");
class PlotHandBookItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(e = undefined) {
    super();
    this.VZt = undefined;
    this.Cei = [];
    this.gei = [];
    this.WZt = (e, t, i) => {
      t = new PlotHandBookChildItem_1.PlotHandBookChildItem(t);
      t.Refresh(e, false, i);
      return {
        Key: i,
        Value: t
      };
    };
    if (e) {
      this.CreateThenShowByActor(e.GetOwner());
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIGridLayout]];
  }
  Refresh(e, t, i) {
    var r = e.Id;
    var r = ConfigManager_1.ConfigManager.HandBookConfig.GetPlotHandBookConfigByType(r);
    this.Cei = r;
    this.GetText(0).ShowTextNew(e.TypeDescription);
    this.gei = [];
    var o = this.Cei.length;
    for (let e = 0; e < o; e++) {
      var s = this.Cei[e];
      var n = new HandBookDefine_1.HandBookCommonItemData();
      var a = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(7, s.Id);
      var d = a === undefined;
      var a = a !== undefined && !a.IsRead;
      n.Config = s;
      n.IsLock = d;
      n.IsNew = a;
      this.gei.push(n);
    }
    this.VZt = new GenericLayoutNew_1.GenericLayoutNew(this.GetGridLayout(1), this.WZt);
    this.VZt.RebuildLayoutByDataNew(this.gei);
  }
  GetChildItemList() {
    if (this.VZt) {
      return this.VZt.GetLayoutItemList();
    } else {
      return [];
    }
  }
  OnBeforeDestroy() {
    this.Cei = [];
    this.gei = [];
  }
}
exports.PlotHandBookItem = PlotHandBookItem;
//# sourceMappingURL=PlotHandBookItem.js.map