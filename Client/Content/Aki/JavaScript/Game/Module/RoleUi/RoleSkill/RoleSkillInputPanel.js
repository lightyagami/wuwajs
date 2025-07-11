"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkillInputPanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const FormationDataController_1 = require("../../Abilities/FormationDataController");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const InstanceDungeonController_1 = require("../../InstanceDungeon/InstanceDungeonController");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const RoleSkillInputDescItem_1 = require("./RoleSkillInputDescItem");
const RoleSkillInputItem_1 = require("./RoleSkillInputItem");
class RoleSkillInputPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.dFe = 0;
    this.vA1 = undefined;
    this.Gxt = undefined;
    this.CFe = undefined;
    this.iV1 = () => new RoleSkillInputDescItem_1.RoleSkillInputDescItem();
    this.fFe = () => new RoleSkillInputItem_1.RoleSkillInputItem();
    this.Lmo = () => {
      if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("RoleGuideNotice01");
      } else if (FormationDataController_1.FormationDataController.GlobalIsInFight) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("RoleGuideNotice06");
      } else if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("RoleGuideNotice05");
      } else {
        var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.dFe);
        var o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(e.Name);
        const n = e.RoleGuide;
        if (n === 0) {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("RoleGuideNotice02", o);
        } else {
          (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(94)).SetTextArgs(o);
          e.FunctionMap.set(2, () => {
            var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(n).FightFormationId;
            var e = ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(e)?.AutoRole;
            if ((e?.length ?? 0) > 0) {
              var o = new Array();
              for (const r of e) {
                o.push(ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleIdConfigByGroupId(r));
              }
              e = {
                Q6n: this.dFe
              };
              ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.Hah = e;
              InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(n, o, 0, 0);
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Role", 43, "未配置出战人物");
            }
          });
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UITexture], [3, UE.UIVerticalLayout], [4, UE.UIVerticalLayout], [5, UE.UIItem], [6, UE.UIButtonComponent]];
    this.BtnBindInfo = [[6, this.Lmo]];
  }
  OnStart() {
    this.CFe = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(4), this.fFe);
    this.vA1 = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.iV1);
    this.Gxt = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(3), this.iV1);
  }
  async RefreshUiAsync(e, o, r = false) {
    this.dFe = e;
    var n;
    var e = ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillInputConfigById(e);
    if (e) {
      n = e.SkillInputIdList;
      this.CFe.RefreshByData(n);
      await this.SetTextureAsync(e.Icon, this.GetTexture(2));
      this.vA1.RefreshByData(e.SkillDescList);
      this.GetItem(0).SetUIActive(e.SkillDescList.length > 0);
      this.Gxt.RefreshByData(e.DescList);
      if (r) {
        n = ModelManager_1.ModelManager.FunctionModel.IsShow(10043);
        e = ModelManager_1.ModelManager.FunctionModel.IsOpen(10043);
        this.GetItem(5).SetUIActive(!o && n && e);
      } else {
        this.GetItem(5).SetUIActive(false);
      }
    }
  }
}
exports.RoleSkillInputPanel = RoleSkillInputPanel;
//# sourceMappingURL=RoleSkillInputPanel.js.map