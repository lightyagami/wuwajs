"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeographyHandBookItem = undefined;
const UE = require("ue");
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
    this.WZt = (e, t, i) => {
      t = new GeographyHandBookChildItem_1.GeographyHandBookChildItem(t);
      t.Refresh(e, false, i);
      this.fei.push(t);
      return {
        Key: i,
        Value: t
      };
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIGridLayout]];
  }
  OnStart() {
    this.VZt = new GenericLayoutNew_1.GenericLayoutNew(this.GetGridLayout(1), this.WZt);
  }
  Refresh(e, t, i) {
    this.Cei = e.HandBookList;
    this.Cei.sort((e, t) => e.Id - t.Id);
    this.GetText(0).ShowTextNew(e.Type.TypeDescription);
    this.gei = [];
    var r = this.Cei.length;
    for (let e = 0; e < r; e++) {
      var o = this.Cei[e];
      var s = new HandBookDefine_1.HandBookCommonItemData();
      var h = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(2, o.Id);
      var a = h === undefined;
      var h = h !== undefined && !h.IsRead;
      s.Config = o;
      s.IsLock = a;
      s.IsNew = h;
      this.gei.push(s);
    }
    this.fei = [];
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