"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditFormationTabItem = undefined;
const UE = require("ue");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const CommonTabItemBase_1 = require("./CommonTabItemBase");
class EditFormationTabItem extends CommonTabItemBase_1.CommonTabItemBase {
  constructor() {
    super(...arguments);
    this.l4e = undefined;
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
    this.GetExtendToggle(1).SetToggleState(0);
    this.GetItem(2).SetUIActive(false);
  }
  OnBeforeDestroy() {
    this.UnBindRedDot();
  }
  ShowTeamBattleTips() {
    this.GetItem(4).SetUIActive(true);
  }
  OnRefresh(t, e, s) {
    this.UpdateTabIcon(t.Data?.GetIcon());
  }
  OnUpdateTabIcon(t) {
    this.SetSpriteByPath(t, this.GetSprite(0), false, undefined, this.RefreshTransition);
  }
  OnSetToggleState(t, e) {
    this.GetExtendToggle(1).SetToggleState(t, e);
  }
  GetTabToggle() {
    return this.GetExtendToggle(1);
  }
  BindRedDot(t, e = 0) {
    this.l4e = t;
    if (this.l4e) {
      RedDotController_1.RedDotController.BindRedDot(t, this.GetItem(2), undefined, e);
    }
  }
  UnBindRedDot() {
    if (this.l4e) {
      RedDotController_1.RedDotController.UnBindRedDot(this.l4e);
      this.l4e = undefined;
    }
  }
}
exports.EditFormationTabItem = EditFormationTabItem;
//# sourceMappingURL=EditFormationTabItem.js.map