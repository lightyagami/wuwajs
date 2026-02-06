"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WheelTowerTeamSelectPanel = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const EditFormationDefine_1 = require("../../../../../EditFormation/EditFormationDefine");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const GenericScrollViewNew_1 = require("../../../../../Util/ScrollView/GenericScrollViewNew");
const WheelTowerRoleGridItem_1 = require("./WheelTowerRoleGridItem");
class WheelTowerTeamSelectPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnTeamSelectCallback = undefined;
    this.xqe = undefined;
    this.AMf = [];
    this.Grf = () => {
      var e = new WheelTowerTeamItem();
      e.OnToggleClickCallback = this.Frf;
      return e;
    };
    this.Frf = (e, t) => {
      this.OnTeamSelectCallback?.(e);
      this.xqe?.GetGenericLayout()?.RefreshWithoutDataSync();
      this.xqe?.SelectGridProxy(t);
    };
    this.eje = () => {
      ControllerHolder_1.ControllerHolder.EditFormationController.OpenEditFormationView(false);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIItem], [2, UE.UIButtonComponent]];
    this.BtnBindInfo = [[2, this.eje]];
  }
  OnStart() {
    this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(0), this.Grf);
    for (let e = 1; e <= EditFormationDefine_1.MAX_FORMATION_ID; e++) {
      this.AMf.push(e);
    }
    this.xqe?.RefreshByData(this.AMf);
  }
  Refresh() {
    var e = this.xqe.GetSelectedIndex();
    this.xqe?.GetScrollItemByIndex(e)?.SetToggleForce(false, true);
    this.xqe?.RefreshByData(this.AMf);
  }
}
exports.WheelTowerTeamSelectPanel = WheelTowerTeamSelectPanel;
class WheelTowerTeamItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.OnToggleClickCallback = undefined;
    this.Nrf = -1;
    this.Vrf = [];
    this.N8e = () => {
      this.OnToggleClickCallback?.(this.Nrf, this.GridIndex);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
    this.BtnBindInfo = [[0, this.N8e]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    var t = new WheelTowerRoleGridItem_1.WheelTowerRoleGridItem();
    this.Vrf.push(t);
    e.push(t.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()));
    var t = new WheelTowerRoleGridItem_1.WheelTowerRoleGridItem();
    this.Vrf.push(t);
    e.push(t.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()));
    var t = new WheelTowerRoleGridItem_1.WheelTowerRoleGridItem();
    this.Vrf.push(t);
    e.push(t.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()));
    await Promise.all(e);
  }
  OnStart() {
    const e = this.GetExtendToggle(0);
    e?.CanExecuteChange.Bind(() => e.ToggleState === 0);
  }
  Refresh(e, t, i) {
    this.Nrf = e;
    const r = [];
    for (let e = 0; e < ModelManager_1.ModelManager.WheelTowerModel.GetTeamMaxRoleCount(); e++) {
      r.push(0);
    }
    var s = ModelManager_1.ModelManager.EditFormationModel.GetFormationData(e);
    let o = 0;
    s?.GetRoleDataMapWithTrial(false).forEach(e => {
      r[o] = e.ConfigId;
      o++;
    });
    r.forEach((e, t) => {
      this.Vrf[t].Refresh(e, false, t);
    });
    let h = "";
    h = e > 9 ? e.toString() : "0" + e;
    this.GetText(1)?.SetText(h);
  }
  OnDeselected(e) {
    this.SetToggleForce(false);
  }
  SetToggleForce(e, t = false) {
    this.GetExtendToggle(0).SetToggleStateForce(e ? 1 : 0, false, false, t);
  }
}
//# sourceMappingURL=WheelTowerTeamSelectPanel.js.map