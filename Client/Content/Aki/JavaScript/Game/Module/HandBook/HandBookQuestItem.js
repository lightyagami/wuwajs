"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandBookQuestItem = undefined;
const UE = require("ue");
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../Util/Layout/GenericLayout");
const HandBookDefine_1 = require("./HandBookDefine");
const HandBookQuestChildItem_1 = require("./HandBookQuestChildItem");
class HandBookQuestItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.VZt = undefined;
    this.Nxn = [];
    this.gei = [];
    this.WZt = () => {
      return new HandBookQuestChildItem_1.HandBookQuestChildItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIGridLayout]];
  }
  OnStart() {
    this.VZt = new GenericLayout_1.GenericLayout(this.GetGridLayout(1), this.WZt);
  }
  Refresh(e, t, i) {
    var o = e;
    var e = o.Id;
    var e = ConfigManager_1.ConfigManager.HandBookConfig.GetPlotHandBookConfigByType(e);
    this.Nxn = ConfigCommon_1.ConfigCommon.ToList(e);
    this.Nxn.sort((e, t) => e.Id - t.Id);
    this.GetText(0).ShowTextNew(o.TypeDescription);
    this.gei = [];
    var r = this.Nxn.length;
    for (let e = 0; e < r; e++) {
      var s = this.Nxn[e];
      var n = new HandBookDefine_1.HandBookCommonItemData();
      var a = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(o.Type, s.Id);
      var h = a === undefined;
      if (!h) {
        a = a !== undefined && !a.IsRead;
        n.ConfigId = s.Id;
        n.Config = s;
        n.IsLock = h;
        n.IsNew = a;
        this.gei.push(n);
      }
    }
    this.VZt?.SetActive(this.gei.length > 0);
    this.VZt?.RefreshByData(this.gei);
  }
  GetChildItemList() {
    return this.VZt.GetLayoutItemList();
  }
  OnBeforeDestroy() {
    if (this.VZt) {
      this.VZt.ClearChildren();
      this.VZt = undefined;
    }
    this.Nxn = [];
    this.gei = [];
  }
}
exports.HandBookQuestItem = HandBookQuestItem;
//# sourceMappingURL=HandBookQuestItem.js.map