"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleMapSummaryTeamTabView = undefined;
const UE = require("ue");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const RogueBattleMapRoleAttrInfo_1 = require("../Component/RogueBattleMapRoleAttrInfo");
const RogueBattleMapRoleListPanel_1 = require("../Component/RogueBattleMapRoleListPanel");
class RogueBattleMapSummaryTeamTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.ky1 = undefined;
    this.Vlo = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  AddEventListener() {
    this.ky1.BindEvent();
    this.Vlo.BindEvent();
  }
  RemoveEventListener() {
    this.ky1.UnbindEvent();
    this.Vlo.UnbindEvent();
  }
  OnAfterShow() {
    this.UiViewSequence.PlaySequence("Start");
  }
  async OnBeforeStartAsync() {
    this.ky1 = new RogueBattleMapRoleAttrInfo_1.RogueBattleMapRoleAttributeItem();
    await this.ky1.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.Vlo = new RogueBattleMapRoleListPanel_1.RogueBattleMapRoleListPanel();
    await this.Vlo.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
  }
  OnBeforeDestroy() {
    this.ky1 = undefined;
    this.Vlo = undefined;
  }
}
exports.RogueBattleMapSummaryTeamTabView = RogueBattleMapSummaryTeamTabView;
//# sourceMappingURL=RogueBattleMapSummaryTeamTabView.js.map