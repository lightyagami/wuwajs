"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleTeamEditTab = undefined;
const UE = require("ue");
const CommonTabItemBase_1 = require("../../Common/TabComponent/TabItem/CommonTabItemBase");
class RogueBattleTeamEditTab extends CommonTabItemBase_1.CommonTabItemBase {
  constructor() {
    super(...arguments);
    this.Bke = t => {
      if (t === 1) {
        this.SelectedCallBack(this.GridIndex);
      }
    };
    this.RefreshTransition = () => {
      var t = this.GetUiExtendToggleSpriteTransition(3);
      if (t) {
        t.SetAllStateSprite(this.GetSprite(0).GetSprite());
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIExtendToggle], [2, UE.UIItem], [3, UE.UIExtendToggleSpriteTransition], [4, UE.UIItem]];
    this.BtnBindInfo = [[1, this.Bke]];
  }
  OnStart() {
    super.OnStart();
    this.GetTabToggle().SetToggleState(0, false);
    this.GetItem(2).SetUIActive(false);
  }
  OnRefresh(t, e, s) {
    this.UpdateTabIcon(t.Data.GetIcon());
  }
  OnUpdateTabIcon(t) {
    this.SetSpriteByPath(t, this.GetSprite(0), false, undefined, this.RefreshTransition);
  }
  OnSetToggleState(t, e) {
    this.GetTabToggle().SetToggleState(t, e);
  }
  GetTabToggle() {
    return this.GetExtendToggle(1);
  }
}
exports.RogueBattleTeamEditTab = RogueBattleTeamEditTab;
//# sourceMappingURL=RogueBattleTeamEditTab.js.map