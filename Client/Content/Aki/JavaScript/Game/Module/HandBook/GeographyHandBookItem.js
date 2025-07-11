"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeographyHandBookItem = undefined;
const UE = require("ue");
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
const GenericLayoutNew_1 = require("../Util/Layout/GenericLayoutNew");
const GeographyHandBookChildItem_1 = require("./GeographyHandBookChildItem");
const HandBookDefine_1 = require("./HandBookDefine");
class GeographyHandBookItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.VZt = undefined;
    this.Cei = [];
    this.gei = [];
    this.fei = [];
    this.WZt = (e, i, t) => {
      i = new GeographyHandBookChildItem_1.GeographyHandBookChildItem(i);
      i.Refresh(e, false, t);
      this.fei.push(i);
      return {
        Key: t,
        Value: i
      };
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIGridLayout]];
  }
  Refresh(e, i, t) {
    var o = e.Id;
    var o = ConfigManager_1.ConfigManager.HandBookConfig.GetGeographyHandBookConfigByType(o);
    this.Cei = ConfigCommon_1.ConfigCommon.ToList(o);
    this.Cei.sort((e, i) => e.Id - i.Id);
    this.GetText(0).ShowTextNew(e.TypeDescription);
    this.gei = [];
    var r = this.Cei.length;
    for (let e = 0; e < r; e++) {
      var s = this.Cei[e];
      var n = new HandBookDefine_1.HandBookCommonItemData();
      var a = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(2, s.Id);
      var h = a === undefined;
      var a = a !== undefined && !a.IsRead;
      n.Config = s;
      n.IsLock = h;
      n.IsNew = a;
      this.gei.push(n);
    }
    this.fei = [];
    this.VZt = new GenericLayoutNew_1.GenericLayoutNew(this.GetGridLayout(1), this.WZt);
    this.VZt.RebuildLayoutByDataNew(this.gei);
  }
  GetChildItemList() {
    return this.fei;
  }
  OnBeforeDestroy() {
    if (this.VZt) {
      this.VZt.ClearChildren();
      this.VZt = undefined;
    }
    this.Cei = [];
    this.gei = [];
    this.fei = [];
  }
}
exports.GeographyHandBookItem = GeographyHandBookItem;
//# sourceMappingURL=GeographyHandBookItem.js.map