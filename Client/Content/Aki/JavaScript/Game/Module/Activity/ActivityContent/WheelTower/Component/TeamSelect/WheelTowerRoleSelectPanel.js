"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WheelTowerRoleSelectPanel = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const FilterSortEntrance_1 = require("../../../../../Common/FilterSort/FilterSortEntrance");
const GenericScrollViewNew_1 = require("../../../../../Util/ScrollView/GenericScrollViewNew");
const WheelTowerRoleGridItem_1 = require("./WheelTowerRoleGridItem");
class WheelTowerRoleSelectPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnRoleSelect = undefined;
    this.btf = undefined;
    this.adi = undefined;
    this.ECf = 0;
    this.Rtf = () => {
      var e = new WheelTowerRoleGridItem_1.WheelTowerRoleGridItem();
      e.SetToggleClickCallback(this.N8e);
      return e;
    };
    this.N8e = e => {
      this.OnRoleSelect?.(e);
      this.OnlyRefreshScroll();
    };
    this.Hlo = (e, r) => {
      var t = new Array();
      var i = ModelManager_1.ModelManager.WheelTowerModel.TmpSelectedRoleMap;
      for (let e = 0; e < ModelManager_1.ModelManager.WheelTowerModel.GetTeamMaxRoleCount(); e++) {
        var o = i.get(e);
        if (o) {
          t.push(o);
        }
      }
      var s;
      var l = ModelManager_1.ModelManager.WheelTowerModel.SelectedEnergyInfo;
      var n = [];
      for (const a of e) {
        if (!t.includes(a.GetRoleId()) && !((s = l.GetRoleEnergy(a.GetRoleId())) < 0)) {
          (s === 0 ? n : t).push(a.GetRoleId());
        }
      }
      t.push(...n);
      e = t.length > 0;
      this.btf?.ContentItem?.SetUIActive(e);
      if (e) {
        this.ECf = t[0];
        this.btf.RefreshByData(t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIItem]];
  }
  OnStart() {
    this.btf = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(0), this.Rtf);
    var e = this.GetItem(1);
    this.adi = new FilterSortEntrance_1.FilterSortEntrance(e, this.Hlo);
  }
  Refresh() {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleIdList().map(e => ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e));
    this.adi?.UpdateData(5, e);
  }
  GetFirstRoleId() {
    return this.ECf;
  }
  OnBeforeDestroy() {
    this.adi?.Destroy();
    this.adi = undefined;
  }
  OnlyRefreshScroll() {
    this.btf.GetGenericLayout()?.RefreshWithoutDataSync();
  }
}
exports.WheelTowerRoleSelectPanel = WheelTowerRoleSelectPanel;
//# sourceMappingURL=WheelTowerRoleSelectPanel.js.map