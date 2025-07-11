"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalEditTabItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class PersonalEditTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.l4e = undefined;
    this.Xac = 0;
    this.OnToggleCallBack = undefined;
    this.kqe = () => {
      if (this.OnToggleCallBack) {
        this.OnToggleCallBack(this.GridIndex, this.Xac);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  Refresh(e, t, i) {
    let o = "";
    switch (this.Xac = e) {
      case 0:
        o = "Personalize_HeadPhoto";
        break;
      case 1:
        o = "Personalize_Card";
        this.l4e = "PersonalCard";
        break;
      case 2:
        o = "Personalize_Title";
        this.l4e = "PersonalTitle";
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), o);
    this.BindRedDot();
  }
  SetToggleCallBack(e) {
    this.OnToggleCallBack = e;
  }
  BindRedDot() {
    var e;
    if (this.l4e) {
      e = this.GetItem(2);
      RedDotController_1.RedDotController.BindRedDot(this.l4e, e, undefined);
    }
  }
  OnBeforeDestroy() {
    this.UnBindRedDot();
  }
  UnBindRedDot() {
    if (this.l4e) {
      RedDotController_1.RedDotController.UnBindGivenUi(this.l4e, this.GetItem(2));
      this.l4e = undefined;
    }
  }
  SetToggleState(e) {
    e = e ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(e);
  }
  OnSelected(e) {
    if (this.Xac === 2) {
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.PlayerTitleUnlockRedDot, false);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayerTitleRefreshRedDot);
    }
    this.SetToggleState(true);
  }
  OnDeselected(e) {
    this.SetToggleState(false);
  }
}
exports.PersonalEditTabItem = PersonalEditTabItem;
//# sourceMappingURL=PersonalEditTabItem.js.map