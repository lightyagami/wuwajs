"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WheelTowerTemplateSelectPanel = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const FilterSortEntrance_1 = require("../../../../../Common/FilterSort/FilterSortEntrance");
const GenericScrollViewNew_1 = require("../../../../../Util/ScrollView/GenericScrollViewNew");
const WheelTowerRoleGridItem_1 = require("./WheelTowerRoleGridItem");
class WheelTowerTemplateSelectPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnTemplateSelect = undefined;
    this.xqe = undefined;
    this.adi = undefined;
    this.syf = 0;
    this.xrf = () => {
      var e = new WheelTowerRoleGridItem_1.WheelTowerRoleGridItem();
      e.SetToggleClickCallback(this.N8e);
      return e;
    };
    this.N8e = e => {
      this.OnTemplateSelect?.(e);
      this.OnlyRefreshScroll();
    };
    this.Hlo = (e, r) => {
      var t = new Array();
      var i = ModelManager_1.ModelManager.WheelTowerModel.TmpSelectedRoleMap;
      for (let e = 0; e < ModelManager_1.ModelManager.WheelTowerModel.GetTeamMaxRoleCount(); e++) {
        var l = i.get(e);
        if (l) {
          t.push(l);
        }
      }
      var o = ModelManager_1.ModelManager.WheelTowerModel.SelectedEnergyInfo;
      var s = [];
      for (const h of e) {
        var a;
        var n = ModelManager_1.ModelManager.WheelTowerModel.GetTemplateRoleId(h.GetRoleId());
        if (n !== 0 && !t.includes(n) && !((a = o.GetRoleEnergy(h.GetRoleId())) < 0)) {
          (a === 0 ? s : t).push(n);
        }
      }
      t.push(...s);
      e = t.length > 0;
      this.xqe?.ContentItem?.SetUIActive(e);
      if (e) {
        this.syf = t[0];
        this.xqe.RefreshByData(t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIItem]];
  }
  OnStart() {
    this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(0), this.xrf);
    var e = this.GetItem(1);
    this.adi = new FilterSortEntrance_1.FilterSortEntrance(e, this.Hlo);
  }
  Refresh() {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleIdList().map(e => ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e));
    this.adi?.UpdateData(5, e);
  }
  GetFirstRoleId() {
    return this.syf;
  }
  OnlyRefreshScroll() {
    this.xqe.GetGenericLayout()?.RefreshWithoutDataSync();
  }
}
exports.WheelTowerTemplateSelectPanel = WheelTowerTemplateSelectPanel;
//# sourceMappingURL=WheelTowerTemplateSelectPanel.js.map