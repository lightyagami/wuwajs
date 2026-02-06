"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleCountDownView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const hideBattleUiChildren = [2, 3, 4, 37];
class MotorcycleCountDownView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.dJu = false;
    this.Rki = 10;
    this.AYt = undefined;
    this.KWc = (e, t) => {
      var i;
      if (e <= 0) {
        this.Qtd();
      } else {
        i = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat5(e);
        this.AYt?.SetText(i);
        if (e < this.Rki) {
          this.Xff();
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    this.AYt = this.GetText(0);
  }
  OnBeforeShow() {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(7, hideBattleUiChildren, false);
  }
  OnAfterHide() {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(7, hideBattleUiChildren, true);
  }
  OnAddEventListener() {
    super.OnAddEventListener();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGamePlayCdChanged, this.KWc);
  }
  OnRemoveEventListener() {
    super.OnRemoveEventListener();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnGamePlayCdChanged, this.KWc);
  }
  Qtd() {
    ModelManager_1.ModelManager.GeneralLogicTreeModel.CountDownViewClosing = true;
    this.CloseMe(e => {
      if (e) {
        ModelManager_1.ModelManager.GeneralLogicTreeModel.CountDownViewClosing = false;
      }
    });
  }
  Xff() {
    if (!this.dJu) {
      this.dJu = true;
      this.UiViewSequence?.PlaySequence("Loop");
    }
  }
}
exports.MotorcycleCountDownView = MotorcycleCountDownView;
//# sourceMappingURL=MotorcycleCountDownView.js.map