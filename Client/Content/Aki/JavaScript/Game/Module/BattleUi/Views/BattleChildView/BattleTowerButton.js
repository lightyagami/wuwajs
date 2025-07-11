"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleTowerButton = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const BattleEntranceButton_1 = require("./BattleEntranceButton");
class BattleTowerButton extends BattleEntranceButton_1.BattleEntranceButton {
  constructor() {
    super(...arguments);
    this.tJe = () => {
      this.GetUiNiagara(2)?.SetNiagaraUIActive(false, true);
      this.GetUiNiagara(3)?.SetNiagaraUIActive(false, true);
      TimerSystem_1.TimerSystem.Next(() => {
        this.GetUiNiagara(2)?.SetNiagaraUIActive(true, true);
        this.GetUiNiagara(3)?.SetNiagaraUIActive(true, true);
      });
    };
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
    this.ComponentRegisterInfos.push([2, UE.UINiagara], [3, UE.UINiagara]);
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTowerGuideClose, this.tJe);
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTowerGuideClose, this.tJe);
  }
  Initialize(e) {
    super.Initialize(e);
    this.AddEvents();
  }
  Reset() {
    this.RemoveEvents();
    super.Reset();
  }
}
exports.BattleTowerButton = BattleTowerButton;
//# sourceMappingURL=BattleTowerButton.js.map