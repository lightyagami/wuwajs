"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleArrowMainViewProxy = undefined;
const puerts_1 = require("puerts");
const Info_1 = require("../../../../Core/Common/Info");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ScreenEffectSystem_1 = require("../../../Render/Effect/ScreenEffectSystem/ScreenEffectSystem");
const UiLayer_1 = require("../../../Ui/UiLayer");
const GameMainViewProxy_1 = require("../GameMainViewProxy");
const MotorcycleArrowBattleMain_1 = require("./ChildPanel/MotorcycleArrowBattleMain");
const MotorcycleArrowSkillPanel_1 = require("./ChildPanel/MotorcycleArrowSkillPanel");
class MotorcycleArrowMainViewProxy extends GameMainViewProxy_1.GameMainViewProxy {
  constructor() {
    super(...arguments);
    this.FightInfoPanel = undefined;
    this.MobileSkillPanel = undefined;
    this.DesktopSkillPanel = undefined;
    this.Uht = undefined;
  }
  async OnBeforeStartAsync() {
    this.Oht();
    await Promise.all([this.uRd(), this.rXc(), this.oXc()]);
  }
  OnBeforeDestroy() {
    this.kht();
  }
  async uRd() {
    this.FightInfoPanel = await this.CreateChildPanel("UiView_MotorcycleBattleMain", this.View.GetContentPanel(), MotorcycleArrowBattleMain_1.MotorcycleArrowBattleMain, true, true, 41);
  }
  async oXc() {
    if (!Info_1.Info.IsInTouch() && !this.DesktopSkillPanel) {
      await this.sXc();
    }
  }
  async rXc() {
    if (!!Info_1.Info.IsInTouch() && !this.MobileSkillPanel) {
      await this.nXc();
    }
  }
  async nXc() {
    this.MobileSkillPanel = await this.CreateChildPanel("DynMotorcycleSkill", this.View.GetContentPanel(), MotorcycleArrowSkillPanel_1.MotorcycleArrowSkillPanel, true, true, 36);
  }
  async sXc() {
    this.DesktopSkillPanel = await this.CreateChildPanel("PC_DynMotorcycleSkill", UiLayer_1.UiLayer.GetBattleViewUnit(1), MotorcycleArrowSkillPanel_1.MotorcycleArrowSkillPanel, true, true, 35);
  }
  OnAfterShow() {
    this.FightInfoPanel.Show();
    this.MobileSkillPanel?.Show();
    this.DesktopSkillPanel?.Show();
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.AddBattleUiCommonChildVisibleReason(4);
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildVisible(0, 38, false, true);
  }
  OnAfterHide() {
    this.FightInfoPanel.Hide();
    this.MobileSkillPanel?.Hide();
    this.DesktopSkillPanel?.Hide();
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.RemoveBattleUiCommonChildVisibleReason(4);
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildVisible(0, 38, true, true);
  }
  Oht() {
    var e = (0, puerts_1.$ref)(undefined);
    var t = ScreenEffectSystem_1.ScreenEffectSystem.GetInstance();
    if (t?.IsValid()) {
      t.GetScreenEffectFightRoot(e);
      this.Uht = (0, puerts_1.$unref)(e);
      this.Uht?.K2_AttachRootComponentTo(this.View.GetContentPanel());
      ModelManager_1.ModelManager.ScreenEffectModel.SetFightRootInited(true);
    }
  }
  kht() {
    if (this.Uht?.IsValid()) {
      this.Uht.K2_DetachFromActor();
    }
    this.Uht = undefined;
    ModelManager_1.ModelManager.ScreenEffectModel?.SetFightRootInited(false);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e[0] === "sword_skill") {
      return (Info_1.Info.IsInTouch() ? this.MobileSkillPanel : this.DesktopSkillPanel)?.GetSkillGuideItem();
    }
  }
}
exports.MotorcycleArrowMainViewProxy = MotorcycleArrowMainViewProxy;
//# sourceMappingURL=MotorcycleArrowMainViewProxy.js.map