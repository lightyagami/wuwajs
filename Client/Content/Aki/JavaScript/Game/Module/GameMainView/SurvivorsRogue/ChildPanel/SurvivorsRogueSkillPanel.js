"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueSkillPanel = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const BattleChildViewPanel_1 = require("../../../BattleUi/Views/BattleChildViewPanel/BattleChildViewPanel");
const BattleSkillItem_1 = require("../../../BattleUi/Views/BattleSkillItem");
class SurvivorsRogueSkillPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments);
    this.ActiveSkillItem = undefined;
    this.DodgeSkillItem = undefined;
    this.zze = () => {
      this.ActiveSkillItem.RefreshTimeDilation();
      this.DodgeSkillItem.RefreshTimeDilation();
    };
    this.LZe = e => {
      this.ActiveSkillItem.PauseGame(e);
      this.DodgeSkillItem.PauseGame(e);
    };
    this.TZe = e => {
      if (e === 6) {
        this.ActiveSkillItem.RefreshSkillCoolDown();
      } else if (e === 5) {
        this.DodgeSkillItem.RefreshSkillCoolDown();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async InitializeAsync() {
    await Promise.all([this.ActiveSkillItem = await this.NewStaticChildViewAsync(this.GetItem(0).GetOwner(), BattleSkillItem_1.BattleSkillItem), this.DodgeSkillItem = await this.NewStaticChildViewAsync(this.GetItem(1).GetOwner(), BattleSkillItem_1.BattleSkillItem)]);
  }
  OnStart() {
    ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.InitBattleSkillData();
    this.cZe();
  }
  cZe() {
    this.qUd();
    this.GUd();
  }
  qUd() {
    this.ActiveSkillItem.Refresh(ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.GetBattleSkillData(InputMappingsDefine_1.actionMappings.技能1));
  }
  GUd() {
    this.DodgeSkillItem.Refresh(ModelManager_1.ModelManager.SurvivorsRogueModel.BattleData.GetBattleSkillData(InputMappingsDefine_1.actionMappings.闪避));
  }
  OnShowBattleChildViewPanel() {
    this.ActiveSkillItem.RefreshSkillCoolDownOnShow();
  }
  OnHideBattleChildViewPanel() {
    this.ActiveSkillItem.TryReleaseButton();
    this.DodgeSkillItem.TryReleaseButton();
  }
  OnTickBattleChildViewPanel(e) {
    if (this.Visible) {
      this.ActiveSkillItem.Tick(e);
      this.DodgeSkillItem.Tick(e);
    }
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TriggerUiTimeDilation, this.zze);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PauseGame, this.LZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillButtonCdRefresh, this.TZe);
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TriggerUiTimeDilation, this.zze);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PauseGame, this.LZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillButtonCdRefresh, this.TZe);
  }
}
exports.SurvivorsRogueSkillPanel = SurvivorsRogueSkillPanel;
//# sourceMappingURL=SurvivorsRogueSkillPanel.js.map