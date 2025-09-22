"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonTabItem = undefined;
const UE = require("ue");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const CommonTabItemBase_1 = require("./CommonTabItemBase");
class CommonTabItem extends CommonTabItemBase_1.CommonTabItemBase {
  constructor() {
    super(...arguments);
    this.kbt = undefined;
    this.RedDotName = undefined;
    this.RedDotUid = undefined;
    this.NeedUnBindAll = true;
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
    this.SetOnUndeterminedClick = t => {
      this.kbt = t;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIExtendToggle], [2, UE.UIItem], [3, UE.UIExtendToggleSpriteTransition]];
    this.BtnBindInfo = [[1, this.Bke]];
  }
  OnStart() {
    super.OnStart();
    this.GetExtendToggle(1).SetToggleState(0);
    this.GetExtendToggle(1).OnUndeterminedClicked.Add(() => {
      this.kbt?.();
    });
    this.GetItem(2).SetUIActive(false);
  }
  OnBeforeDestroy() {
    if (this.NeedUnBindAll) {
      this.UnBindRedDot();
    } else {
      this.UnBindGivenUid(this.RedDotUid);
    }
  }
  OnRefresh(t, e, i) {
    this.UpdateTabIcon(t.Data?.GetIcon() ?? "");
    this.UnBindRedDot();
    this.NeedUnBindAll = t.NeedUnBindAllRedDot;
    if (t.RedDotName) {
      this.RedDotUid = t.RedDotUid;
      this.BindRedDot(t.RedDotName, t.RedDotUid);
    } else {
      this.GetItem(2)?.SetUIActive(false);
    }
  }
  OnSelected(t) {
    this.SelectedCallBack(this.GridIndex);
  }
  OnUpdateTabIcon(t) {
    if (t !== "") {
      this.SetSpriteByPath(t, this.GetSprite(0), false, undefined, this.RefreshTransition);
    }
  }
  SetToggleStateForce(t, e) {
    this.GetExtendToggle(1).SetToggleStateForce(t, e);
  }
  SetCanClickWhenDisable(t) {
    this.GetExtendToggle(1).SetCanClickWhenDisable(t);
  }
  OnSetToggleState(t, e) {
    this.GetExtendToggle(1).SetToggleState(t, e);
  }
  GetTabToggle() {
    return this.GetExtendToggle(1);
  }
  BindRedDot(t, e = 0) {
    this.RedDotName = t;
    if (this.RedDotName) {
      RedDotController_1.RedDotController.BindRedDot(t, this.GetItem(2), undefined, e);
    }
  }
  UnBindRedDot() {
    if (this.RedDotName) {
      RedDotController_1.RedDotController.UnBindRedDot(this.RedDotName);
      this.RedDotName = undefined;
    }
  }
  UnBindGivenUid(t = 0) {
    if (this.RedDotName) {
      RedDotController_1.RedDotController.UnBindGivenUi(this.RedDotName, this.GetItem(2), t);
      this.RedDotName = undefined;
    }
  }
  SetRedDotState(t) {
    this.GetItem(2)?.SetUIActive(t);
  }
  GetIconSprite() {
    return this.GetSprite(0);
  }
  OnClear() {
    this.UnBindRedDot();
  }
}
exports.CommonTabItem = CommonTabItem;
//# sourceMappingURL=CommonTabItem.js.map