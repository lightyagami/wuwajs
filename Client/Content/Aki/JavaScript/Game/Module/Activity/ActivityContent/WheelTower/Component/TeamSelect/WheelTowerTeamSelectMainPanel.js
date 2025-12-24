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
    this.wtf = undefined;
    this.Ltf = undefined;
    this.Ptf = undefined;
    this.Atf = () => {
      var e = new TeamTabItem();
      e.SetToggleClickCallback(this.l6c);
      return e;
    };
    this.l6c = e => {
      this.Ivt?.SelectGridProxy(e);
      this.wtf?.SetUiActive(e === 0);
      this.Ltf?.SetUiActive(e === 1);
      this.Ptf?.SetUiActive(e === 2);
      let t = undefined;
      switch (e) {
        case 0:
          this.wtf?.Refresh();
          t = this.wtf.GetFirstRoleId();
          break;
        case 1:
          this.Ltf?.Refresh();
          break;
        case 2:
          this.Ptf?.Refresh();
          t = this.Ptf.GetFirstRoleId();
      }
      this.OnSelectModeChange?.(e, t ?? 0);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.wtf = new WheelTowerRoleSelectPanel_1.WheelTowerRoleSelectPanel();
    e.push(this.wtf.CreateByActorAsync(this.GetItem(2).GetOwner()));
    this.Ltf = new WheelTowerTeamSelectPanel_1.WheelTowerTeamSelectPanel();
    e.push(this.Ltf.CreateByActorAsync(this.GetItem(3).GetOwner()));
    this.Ptf = new WheelTowerTemplateSelectPanel_1.WheelTowerTemplateSelectPanel();
    e.push(this.Ptf.CreateByActorAsync(this.GetItem(4).GetOwner()));
    await Promise.all(e);
  }
  OnStart() {
    this.Ivt = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.Atf);
    this.Ivt.RefreshByData(["WheelBattleSelect_Role", "WheelBattleSelect_Team", "WheelBattleSelect_Template"], () => {
      this.l6c(0);
    });
    this.wtf.OnRoleSelect = e => this.OnRoleSelect?.(e);
    this.Ltf.OnTeamSelectCallback = e => this.OnTeamSelect?.(e);
    this.Ptf.OnTemplateSelect = e => this.OnRoleSelect?.(e);
  }
  RefreshPanel() {
    var e = this.Ivt.GetSelectedGridIndex();
    if (!(e < 0)) {
      switch (e) {
        case 0:
          this.wtf?.OnlyRefreshScroll();
          break;
        case 2:
          this.Ptf?.OnlyRefreshScroll();
          break;
        case 1:
          this.Ltf?.Refresh();
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
    this.gtf = undefined;
    this.Bke = e => {
      if (e === 1) {
        this.gtf?.(this.GridIndex);
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
    this.gtf = e;
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