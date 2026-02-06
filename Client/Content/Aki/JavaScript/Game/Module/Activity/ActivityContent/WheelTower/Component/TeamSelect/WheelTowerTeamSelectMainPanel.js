"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WheelTowerTeamSelectMainPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../../../Util/Layout/GenericLayout");
const WheelTowerRoleSelectPanel_1 = require("./WheelTowerRoleSelectPanel");
const WheelTowerTeamSelectPanel_1 = require("./WheelTowerTeamSelectPanel");
const WheelTowerTemplateSelectPanel_1 = require("./WheelTowerTemplateSelectPanel");
class WheelTowerTeamSelectMainPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnSelectModeChange = undefined;
    this.OnRoleSelect = undefined;
    this.OnTeamSelect = undefined;
    this.Ivt = undefined;
    this.Brf = undefined;
    this.krf = undefined;
    this.qrf = undefined;
    this.Orf = () => {
      var e = new TeamTabItem();
      e.SetToggleClickCallback(this.l6c);
      return e;
    };
    this.l6c = e => {
      this.Ivt?.SelectGridProxy(e);
      this.Brf?.SetUiActive(e === 0);
      this.krf?.SetUiActive(e === 1);
      this.qrf?.SetUiActive(e === 2);
      let t = undefined;
      switch (e) {
        case 0:
          this.Brf?.Refresh();
          t = this.Brf.GetFirstRoleId();
          break;
        case 1:
          this.krf?.Refresh();
          break;
        case 2:
          this.qrf?.Refresh();
          t = this.qrf.GetFirstRoleId();
      }
      this.OnSelectModeChange?.(e, t ?? 0);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.Brf = new WheelTowerRoleSelectPanel_1.WheelTowerRoleSelectPanel();
    e.push(this.Brf.CreateByActorAsync(this.GetItem(2).GetOwner()));
    this.krf = new WheelTowerTeamSelectPanel_1.WheelTowerTeamSelectPanel();
    e.push(this.krf.CreateByActorAsync(this.GetItem(3).GetOwner()));
    this.qrf = new WheelTowerTemplateSelectPanel_1.WheelTowerTemplateSelectPanel();
    e.push(this.qrf.CreateByActorAsync(this.GetItem(4).GetOwner()));
    await Promise.all(e);
  }
  OnStart() {
    this.Ivt = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.Orf);
    this.Ivt.RefreshByData(["WheelBattleSelect_Role", "WheelBattleSelect_Team", "WheelBattleSelect_Template"], () => {
      this.l6c(0);
    });
    this.Brf.OnRoleSelect = e => this.OnRoleSelect?.(e);
    this.krf.OnTeamSelectCallback = e => this.OnTeamSelect?.(e);
    this.qrf.OnTemplateSelect = e => this.OnRoleSelect?.(e);
  }
  RefreshPanel() {
    var e = this.Ivt.GetSelectedGridIndex();
    if (!(e < 0)) {
      switch (e) {
        case 0:
          this.Brf?.OnlyRefreshScroll();
          break;
        case 2:
          this.qrf?.OnlyRefreshScroll();
          break;
        case 1:
          this.krf?.Refresh();
      }
    }
  }
  GetTabItem(e) {
    return this.Ivt?.GetGridByDisplayIndex(e);
  }
}
exports.WheelTowerTeamSelectMainPanel = WheelTowerTeamSelectMainPanel;
class TeamTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Erf = undefined;
    this.Bke = e => {
      if (e === 1) {
        this.Erf?.(this.GridIndex);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Bke]];
  }
  OnStart() {
    this.GetItem(2)?.SetUIActive(false);
  }
  Refresh(e, t, i) {
    this.GetText(1)?.ShowTextNew(e);
    this.Oei(t);
  }
  SetToggleClickCallback(e) {
    this.Erf = e;
  }
  OnSelected(e) {
    this.Oei(true);
  }
  OnDeselected(e) {
    this.Oei(false);
  }
  Oei(e) {
    this.GetExtendToggle(0)?.SetToggleStateForce(e ? 1 : 0, false);
  }
}
//# sourceMappingURL=WheelTowerTeamSelectMainPanel.js.map