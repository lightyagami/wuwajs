"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleMapRoleAttributeFettersItem = exports.RougeBattleAttributeFetterItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
class RougeBattleAttributeFetterItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.vE1 = 0;
    this.kqe = () => {
      ModelManager_1.ModelManager.RogueBattleModel.CurrentMapSummaryBond = this.vE1;
      ModelManager_1.ModelManager.RogueBattleModel.IsMapSummaryBondJumping = true;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueResMapSummaryTeamToBondUpdate);
      this.GetExtendToggle(2)?.SetToggleState(0);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIExtendToggle]];
    this.BtnBindInfo = [[2, this.kqe]];
  }
  Refresh(e, t, r) {
    this.vE1 = e.ConfigId;
    this.GetText(1)?.SetText("Lv." + e.Level);
    e = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(e.ConfigId);
    this.SetTextureByPath(e.Icon, this.GetTexture(0));
  }
}
exports.RougeBattleAttributeFetterItem = RougeBattleAttributeFetterItem;
class RogueBattleMapRoleAttributeFettersItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.u01 = undefined;
    this.Fao = () => new RougeBattleAttributeFetterItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIHorizontalLayout], [2, UE.UIItem]];
  }
  OnStart() {
    this.u01 = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), this.Fao);
  }
  OnBeforeDestroy() {
    this.u01 = undefined;
  }
  Refresh(e) {
    var t = ModelManager_1.ModelManager.RogueBattleModel.IsRoleGot(e);
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(e);
    var e = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBondRole(e);
    var r = new Array();
    for (const a of e.BondIds) {
      var i = ModelManager_1.ModelManager.RogueBattleModel.GetRoleBondDataById(a);
      var n = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(a);
      var s = i ? i.F6n : 0;
      var i = {
        ConfigId: a,
        Level: s,
        IsUnlock: t && i !== undefined,
        IsMaxLevel: i !== undefined && s === n.starmapLength()
      };
      r.push(i);
    }
    this.u01?.RefreshByData(r);
  }
}
exports.RogueBattleMapRoleAttributeFettersItem = RogueBattleMapRoleAttributeFettersItem;
//# sourceMappingURL=RogueBattleMapRoleAttrFettersItem.js.map