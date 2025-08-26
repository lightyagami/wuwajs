"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JoystickPanel = undefined;
const Stats_1 = require("../../../../Core/Common/Stats");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BattleChildViewPanel_1 = require("../../BattleUi/Views/BattleChildViewPanel/BattleChildViewPanel");
const Joystick_1 = require("../../BattleUi/Views/Joystick");
const forbidMoveTagId = 1616400338;
class JoystickPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments);
    this.TJe = undefined;
    this.X9e = undefined;
    this.fHe = () => {
      var e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
      this.X9e = e.EntityHandle;
      this.jJe();
    };
  }
  InitializeTemp() {
    this.X9e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
  }
  async InitializeAsync() {
    await Promise.all([this.nXu()]);
  }
  OnShowBattleChildViewPanel() {
    this.TJe?.ShowBattleVisibleChildView();
  }
  OnHideBattleChildViewPanel() {
    this.TJe?.HideBattleVisibleChildView();
  }
  OnTickBattleChildViewPanel(e) {
    JoystickPanel.sXu.Start();
    this.TJe?.Tick(e);
    JoystickPanel.sXu.Stop();
  }
  Reset() {
    this.TJe = undefined;
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiCurRoleDataChanged, this.fHe);
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiCurRoleDataChanged, this.fHe);
  }
  async nXu() {
    this.TJe = await this.NewStaticChildViewAsync(this.RootItem.GetOwner(), Joystick_1.Joystick, this.RootItem);
    this.jJe();
  }
  jJe() {
    if (this.TJe) {
      this.ClearAllTagSignificantChangedCallback();
      this.ListenForTagSignificantChanged(this.X9e, forbidMoveTagId, (e, t) => {
        this.TJe.SetForbidMove(t);
      });
      this.TJe.SetForbidMove(this.ContainsTag(this.X9e, forbidMoveTagId));
    }
  }
}
(exports.JoystickPanel = JoystickPanel).sXu = Stats_1.Stat.Create("JoystickPanelTickStats");
//# sourceMappingURL=JoystickPanel.js.map