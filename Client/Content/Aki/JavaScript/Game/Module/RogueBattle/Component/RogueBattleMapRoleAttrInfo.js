"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleMapRoleAttributeItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const RoleController_1 = require("../../RoleUi/RoleController");
const RoleDefine_1 = require("../../RoleUi/RoleDefine");
const RogueBattleMapRoleAttrBuffItem_1 = require("./RogueBattleMapRoleAttrBuffItem");
const RogueBattleMapRoleAttrFettersItem_1 = require("./RogueBattleMapRoleAttrFettersItem");
const RogueBattleMapRoleAttrNameItem_1 = require("./RogueBattleMapRoleAttrNameItem");
class RogueBattleMapRoleAttributeItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.dFe = 0;
    this.Py1 = undefined;
    this.xy1 = undefined;
    this.ySn = undefined;
    this.p5t = () => {
      var e = !ModelManager_1.ModelManager.RogueBattleModel.IsRoleGot(this.dFe);
      if (!e) {
        var t;
        var i = [];
        for (const o of ModelManager_1.ModelManager.RogueBattleModel.SummaryRoleList) {
          if (o >= RoleDefine_1.ROBOT_DATA_MIN_ID) {
            i.push(o);
          } else {
            t = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBondRole(o);
            i.push(t.TrialRoleId);
          }
        }
        RoleController_1.RoleController.OpenRoleMainView(1, this.dFe, i, "RoleSkillTabView");
      }
    };
    this.fPi = e => {
      this.Refresh(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIItem]];
    this.BtnBindInfo = [[3, this.p5t]];
  }
  BindEvent() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RogueResMapSummaryTeamUpdate, this.fPi);
  }
  UnbindEvent() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RogueResMapSummaryTeamUpdate, this.fPi);
  }
  async OnBeforeStartAsync() {
    this.Py1 = new RogueBattleMapRoleAttrNameItem_1.RogueBattleMapRoleAttributeNameItem();
    await this.Py1.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.xy1 = new RogueBattleMapRoleAttrFettersItem_1.RogueBattleMapRoleAttributeFettersItem();
    await this.xy1.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
    this.ySn = new RogueBattleMapRoleAttrBuffItem_1.RogueBattleMapRoleAttributeBuffsItem();
    await this.ySn.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
  }
  OnBeforeDestroy() {
    this.Py1 = undefined;
    this.xy1 = undefined;
    this.ySn = undefined;
  }
  Refresh(e) {
    this.dFe = e;
    var t = ModelManager_1.ModelManager.RogueBattleModel.IsRoleGot(e);
    this.GetButton(3)?.RootUIComp.SetUIActive(t);
    this.GetItem(4)?.SetUIActive(!t);
    this.Py1.Refresh(e);
    this.xy1.Refresh(e);
    if (t) {
      this.ySn.SetUiActive(true);
      this.ySn.Refresh(e);
    } else {
      this.ySn.SetUiActive(false);
    }
  }
}
exports.RogueBattleMapRoleAttributeItem = RogueBattleMapRoleAttributeItem;
//# sourceMappingURL=RogueBattleMapRoleAttrInfo.js.map