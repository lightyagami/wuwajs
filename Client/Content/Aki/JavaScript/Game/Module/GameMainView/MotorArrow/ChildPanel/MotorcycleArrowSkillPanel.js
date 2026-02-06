"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleArrowSkillPanel = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const BattleChildViewPanel_1 = require("../../../BattleUi/Views/BattleChildViewPanel/BattleChildViewPanel");
const BattleSkillItem_1 = require("../../../BattleUi/Views/BattleSkillItem");
class MotorcycleArrowSkillPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments);
    this.ActiveSkillItem = undefined;
    this.SkillData = undefined;
    this.Z4l = () => {
      var e = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubModel;
      this.SkillData.SetVisible(e.LevelConfig?.SkillEnable === 1);
      this.ActiveSkillItem.RefreshVisible();
    };
    this.yZe = e => {
      if (e === this.SkillData?.GetButtonType() && (e = this.ActiveSkillItem?.GetSkillButtonInteractive(), this.ActiveSkillItem?.RefreshAttribute(true), e !== (e = this.ActiveSkillItem?.GetSkillButtonInteractive())) && e) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGuideTriggerEvent, "OnMotorFightChargeFull");
      }
    };
    this.NZf = () => {
      var e = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubModel;
      var t = e.KscPlayerEntity;
      this.SkillData = e.GetMotorcycleArrowBattleSkillData();
      this.SkillData.InitAttrData(t);
      this.qUd();
    };
    this.zze = () => {
      this.ActiveSkillItem.RefreshTimeDilation();
    };
    this.LZe = e => {
      this.ActiveSkillItem.PauseGame(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async InitializeAsync() {
    await Promise.all([this.ActiveSkillItem = await this.NewStaticChildViewAsync(this.GetItem(0).GetOwner(), BattleSkillItem_1.BattleSkillItem)]);
  }
  OnShowBattleChildViewPanel() {
    this.ActiveSkillItem.RefreshSkillCoolDownOnShow();
  }
  OnHideBattleChildViewPanel() {
    this.ActiveSkillItem.TryReleaseButton();
  }
  OnTickBattleChildViewPanel(e) {
    if (this.Visible) {
      this.ActiveSkillItem.Tick(e);
    }
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TriggerUiTimeDilation, this.zze);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PauseGame, this.LZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnKscPlayerCreate, this.NZf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillButtonAttributeRefresh, this.yZe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LevelGamePlayPrepareCountDownEnd, this.Z4l);
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TriggerUiTimeDilation, this.zze);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PauseGame, this.LZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnKscPlayerCreate, this.NZf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillButtonAttributeRefresh, this.yZe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LevelGamePlayPrepareCountDownEnd, this.Z4l);
  }
  qUd() {
    var e = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubModel;
    this.ActiveSkillItem.Refresh(e.GetMotorcycleArrowBattleSkillData());
  }
  GetSkillGuideItem() {
    return this.ActiveSkillItem?.GetGuideItem();
  }
}
exports.MotorcycleArrowSkillPanel = MotorcycleArrowSkillPanel;
//# sourceMappingURL=MotorcycleArrowSkillPanel.js.map