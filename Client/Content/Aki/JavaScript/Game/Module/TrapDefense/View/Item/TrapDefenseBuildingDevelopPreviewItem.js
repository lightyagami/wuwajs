"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseDevelopPreviewLevelBranchItem = exports.TrapDefenseDevelopPreviewLevelInfoItem = exports.TrapDefenseDevelopPreviewLevelPointItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class TrapDefenseDevelopPreviewLevelPointItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  Refresh(e, t, r) {
    this.GetItem(0)?.SetUIActive(e);
  }
}
exports.TrapDefenseDevelopPreviewLevelPointItem = TrapDefenseDevelopPreviewLevelPointItem;
class TrapDefenseDevelopPreviewLevelInfoItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.Layout = undefined;
    this.Bqe = () => new TrapDefenseDevelopPreviewLevelBranchItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIArtText], [1, UE.UIVerticalLayout], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UISprite], [6, UE.UIItem]];
  }
  OnStart() {
    this.Layout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.Bqe);
  }
  OnBeforeDestroy() {
    this.Layout = undefined;
  }
  Refresh(e, t, r) {
    var i = (this.Data = e).Id;
    var i = ModelManager_1.ModelManager.TrapDefenseModel.DecomposeMachineId(i);
    this.GetItem(6)?.SetAlpha(e.IsCurLevel ? 1 : 0.75);
    this.GetSprite(5)?.SetUIActive(!e.IsCurLevel);
    this.GetItem(4)?.SetUIActive(e.IsCurLevel);
    this.GetArtText(0)?.SetText(i.Level >= 10 ? String(i.Level) : "0" + i.Level);
    this.GetItem(3)?.SetUIActive(e.IsCurLevel);
    this.RefreshData();
  }
  RefreshData() {
    var e;
    var t;
    var r = ModelManager_1.ModelManager.TrapDefenseModel.DecomposeMachineId(this.Data.Id);
    let i = false;
    let s = 0;
    if (r.MachineType === 1) {
      e = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetBuildingById(this.Data.Id);
      t = (e = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetBuildingTypeById(e.BuildingType)).MaxLevel;
      i = r.Level === t;
      s = e.BranchCount;
    } else {
      t = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetAuxiliaryById(this.Data.Id);
      t = (e = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetAuxiliaryTypeById(t.AuxiliaryType)).MaxLevel;
      s = e.BranchCount;
      i = r.Level === t;
    }
    if (i && s > 1) {
      var a = [];
      for (let e = 0; e <= s; e++) {
        var n = {
          MachineType: r.MachineType,
          DataType: r.DataType,
          Level: r.Level,
          Branch: e
        };
        var n = ModelManager_1.ModelManager.TrapDefenseModel.ComposeMachineId(n);
        var o = this.Data.IsCurLevel && n !== this.Data.Id && e !== 0;
        var n = {
          Id: n,
          IsCurLevel: (e === 0 || n === this.Data.Id) && this.Data.IsCurLevel,
          NeedAlpha: !!o || undefined
        };
        a.push(n);
      }
      this.Layout.RefreshByData(a, undefined, true);
    } else {
      this.Layout.RefreshByData([this.Data], undefined, true);
    }
  }
}
exports.TrapDefenseDevelopPreviewLevelInfoItem = TrapDefenseDevelopPreviewLevelInfoItem;
class TrapDefenseDevelopPreviewLevelBranchItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem]];
  }
  Refresh(e, t, r) {
    var i = (this.Data = e).Id;
    var i = ModelManager_1.ModelManager.TrapDefenseModel.DecomposeMachineId(i);
    let s = false;
    let a = 0;
    var n;
    var o;
    var h = i.MachineType === 1;
    a = (h ? (h = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetBuildingById(this.Data.Id), n = (o = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetBuildingTypeById(h.BuildingType)).MaxLevel, LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), h.DescDetail, ...h.DescDetailArgs), s = i.Level === n, o) : (h = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetAuxiliaryById(this.Data.Id), o = (n = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetAuxiliaryTypeById(h.AuxiliaryType)).MaxLevel, LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), h.DescDetail, ...h.DescDetailArgs), s = i.Level === o, n)).BranchCount;
    this.GetItem(0)?.SetUIActive(s && a > 1);
    if (s && a > 1) {
      h = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.GetBranchName(i.Branch);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), h);
      this.GetItem(3)?.SetUIActive(e.IsCurLevel);
    }
    this.RootItem?.SetAlpha(e.NeedAlpha ? 0.5 : 1);
  }
}
exports.TrapDefenseDevelopPreviewLevelBranchItem = TrapDefenseDevelopPreviewLevelBranchItem;
//# sourceMappingURL=TrapDefenseBuildingDevelopPreviewItem.js.map