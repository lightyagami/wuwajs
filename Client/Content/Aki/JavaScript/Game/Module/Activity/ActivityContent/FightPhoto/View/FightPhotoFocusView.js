"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FightPhotoFocusView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
class FightPhotoFocusView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.dBd = e => {
      this.GetItem(0)?.SetUIActive(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnNeedShowFightPhotoFocus, this.dBd);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnNeedShowFightPhotoFocus, this.dBd);
  }
  OnBeforeShow() {
    this.GetItem(0)?.SetUIActive(false);
  }
}
exports.FightPhotoFocusView = FightPhotoFocusView;
//# sourceMappingURL=FightPhotoFocusView.js.map