"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleSummaryTeamTabView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const RoleController_1 = require("../../RoleUi/RoleController");
const RogueBattleMapRoleAttrInfo_1 = require("../Component/RogueBattleMapRoleAttrInfo");
const RogueBattleSummaryRoleItem_1 = require("../Component/RogueBattleSummaryRoleItem");
class RogueBattleSummaryTeamTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.FB1 = 0;
    this.ky1 = undefined;
    this.TSn = undefined;
    this.GB1 = () => {
      var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.FB1);
      RoleController_1.RoleController.OnSelectedRoleChange(this.FB1, e.SkinId);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  OnAfterShow() {
    this.UiViewSequence.PlaySequence("Start");
  }
  async OnBeforeStartAsync() {
    this.ky1 = new RogueBattleMapRoleAttrInfo_1.RogueBattleMapRoleAttributeItem();
    await this.ky1.CreateByActorAsync(this.GetItem(0).GetOwner());
    this.AddChild(this.ky1);
    this.TSn = new RogueBattleSummaryRoleItem_1.RogueBattleSummaryRoleItem();
    await this.TSn.CreateByActorAsync(this.GetItem(1).GetOwner());
    this.AddChild(this.TSn);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RogueResMapSummaryTeamShowAgain, this.GB1);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RogueResMapSummaryTeamShowAgain, this.GB1);
  }
  OnBeforeShow() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()[0].GetConfigId;
    this.FB1 = e;
    this.GB1();
    this.ky1?.Refresh(e);
  }
  OnBeforeDestroy() {
    this.ky1 = undefined;
    this.TSn = undefined;
  }
}
exports.RogueBattleSummaryTeamTabView = RogueBattleSummaryTeamTabView;
//# sourceMappingURL=RogueBattleSummaryTeamTabView.js.map