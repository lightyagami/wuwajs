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
    this.WZt = (e, i, o) => {
      i = new GeographyHandBookChildItem_1.GeographyHandBookChildItem(i);
      i.Refresh(e, false, o);
      this.fei.push(i);
      return {
        Key: o,
        Value: i
      };
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIGridLayout]];
  }
  Refresh(e, i, o) {
    var r = e.Id;
    var r = ConfigManager_1.ConfigManager.HandBookConfig.GetGeographyHandBookConfigByType(r);
    this.Cei = ConfigCommon_1.ConfigCommon.ToList(r);
    this.Cei.sort((e, i) => e.Id - i.Id);
    this.GetText(0).ShowTextNew(e.TypeDescription);
    this.gei = [];
    var t = this.Cei.length;
    for (let e = 0; e < t; e++) {
      var n = this.Cei[e];
      var s = new HandBookDefine_1.HandBookCommonItemData();
      var a = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(2, n.Id);
      var h = a === undefined;
      var a = a !== undefined && !a.IsRead;
      s.Config = n;
      s.IsLock = h;
      s.IsNew = a;
      this.gei.push(s);
    }
    this.fei = [];
    this.VZt = new GenericLayoutNew_1.GenericLayoutNew(this.GetGridLayout(1), this.WZt);
    this.VZt.RebuildLayoutByDataNew(this.gei);
  }
  GetChildItemList() {
    return this.fei;
  }
  OnBeforeDestroy() {
    this.Cei = [];
    this.gei = [];
    this.fei = [];
  }
}
exports.GeographyHandBookItem = GeographyHandBookItem;
//# sourceMappingURL=GeographyHandBookItem.js.map