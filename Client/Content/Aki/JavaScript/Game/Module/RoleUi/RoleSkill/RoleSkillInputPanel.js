"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RoleSkillInputPanel = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  FormationDataController_1 = require("../../Abilities/FormationDataController"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  InstanceDungeonController_1 = require("../../InstanceDungeon/InstanceDungeonController"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  RoleSkillInputDescItem_1 = require("./RoleSkillInputDescItem"),
  RoleSkillInputItem_1 = require("./RoleSkillInputItem");
class RoleSkillInputPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.dFe = 0, this.$w1 = void 0, this.Gxt = void 0, this.CFe = void 0, this.T41 = () => new RoleSkillInputDescItem_1.RoleSkillInputDescItem, this.fFe = () => new RoleSkillInputItem_1.RoleSkillInputItem, this.Lmo = () => {
      if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("RoleGuideNotice01");
      else if (FormationDataController_1.FormationDataController.GlobalIsInFight) ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("RoleGuideNotice06");
      else if (ModelManager_1.ModelManager.GameModeModel.IsMulti) ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("RoleGuideNotice05");
      else {
        var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.dFe),
          o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(e.Name);
        const i = e.RoleGuide;
        0 === i ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("RoleGuideNotice02", o) : ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(94)).SetTextArgs(o), e.FunctionMap.set(2, () => {
          var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(i).FightFormationId,
            e = ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(e)?.AutoRole;
          if (0 < (e?.length ?? 0)) {
            var o = new Array;
            for (const r of e) o.push(ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleIdConfigByGroupId(r));
            e = {
              Q6n: this.dFe
            };
            ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.Hah = e, InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(i, o, 0, 0)
          } else Log_1.Log.CheckError() && Log_1.Log.Error("Role", 43, "未配置出战人物")
        }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e))
      }
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIVerticalLayout],
      [2, UE.UITexture],
      [3, UE.UIVerticalLayout],
      [4, UE.UIVerticalLayout],
      [5, UE.UIItem],
      [6, UE.UIButtonComponent]
    ], this.BtnBindInfo = [
      [6, this.Lmo]
    ]
  }
  OnStart() {
    this.CFe = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(4), this.fFe), this.$w1 = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.T41), this.Gxt = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(3), this.T41)
  }
  RefreshUi(e, o, r = !1) {
    this.dFe = e;
    e = ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillInputConfigById(e);
    if (e) {
      var i = e.SkillInputIdList;
      this.CFe.RefreshByData(i);
      const n = this.GetTexture(2);
      n.SetUIActive(!1), this.SetTextureByPath(e.Icon, this.GetTexture(2), void 0, () => {
        n.SetUIActive(!0)
      }), this.$w1.RefreshByData(e.SkillDescList), this.GetItem(0).SetUIActive(0 < e.SkillDescList.length), this.Gxt.RefreshByData(e.DescList), r ? (i = ModelManager_1.ModelManager.FunctionModel.IsShow(10043), e = ModelManager_1.ModelManager.FunctionModel.IsOpen(10043), this.GetItem(5).SetUIActive(!o && i && e)) : this.GetItem(5).SetUIActive(!1)
    }
  }
}
exports.RoleSkillInputPanel = RoleSkillInputPanel;
//# sourceMappingURL=RoleSkillInputPanel.js.map