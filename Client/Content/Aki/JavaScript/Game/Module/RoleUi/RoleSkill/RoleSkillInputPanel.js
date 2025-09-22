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
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoleSkillInputDescItem_1 = require("./RoleSkillInputDescItem");
const RoleSkillTrickDescItem_1 = require("./RoleSkillTrickDescItem");
const RoleSkillTrickInputItem_1 = require("./RoleSkillTrickInputItem");
const RoleSkillTrickSmallTitleItem_1 = require("./RoleSkillTrickSmallTitleItem");
const RoleSkillTrickTextureItem_1 = require("./RoleSkillTrickTextureItem");
class RoleSkillInputPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.dFe = 0;
    this.SPd = undefined;
    this.iV1 = () => new RoleSkillInputDescItem_1.RoleSkillInputDescItem();
    this.Lmo = () => {
      if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("RoleGuideNotice01");
      } else if (FormationDataController_1.FormationDataController.GlobalIsInFight) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("RoleGuideNotice06");
      } else if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("RoleGuideNotice05");
      } else {
        var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.dFe);
        var i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(e.Name);
        const o = e.RoleGuide;
        if (o === 0) {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("RoleGuideNotice02", i);
        } else {
          (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(94)).SetTextArgs(i);
          e.FunctionMap.set(2, () => {
            var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(o).FightFormationId;
            var e = ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(e)?.AutoRole;
            if ((e?.length ?? 0) > 0) {
              var i = new Array();
              for (const r of e) {
                i.push(ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleIdConfigByGroupId(r));
              }
              e = {
                Q6n: this.dFe
              };
              ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.Hah = e;
              InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(o, i, 0, 0);
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
    this.ComponentRegisterInfos = [[0, UE.UIItem], [10, UE.UIItem], [1, UE.UIVerticalLayout], [12, UE.UIItem], [11, UE.UIItem], [2, UE.UIVerticalLayout], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIButtonComponent], [13, UE.UIItem]];
    this.BtnBindInfo = [[9, this.Lmo]];
  }
  OnStart() {
    this.SPd = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.iV1);
  }
  async RefreshUiAsync(e, i, r = false) {
    this.dFe = e;
    var o = ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillInputConfigById(e);
    if (o) {
      e = ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillFightTrickList(e);
      if (e) {
        var t = this.GetVerticalLayout(2).GetRootComponent();
        var l = new Array();
        const k = new Array();
        var n = new Map();
        var a = new Map();
        var s = new Map();
        var u = new Map();
        for (const M of e) {
          var _ = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(3), t);
          var c = new RoleSkillTrickSmallTitleItem_1.RoleSkillTrickSmallTitleItem();
          l.push(c.CreateThenShowByActorAsync(_.GetOwner()));
          n.set(c, M.SkillTitle);
          var _ = M.SkillDesc;
          if (M.Type === 1) {
            LguiUtil_1.LguiUtil.CopyItem(this.GetItem(7), t).SetUIActive(true);
          }
          let e = 1;
          for (const h of _) {
            var g;
            var f;
            var I = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillInputConfigById(h);
            for (const U of I.ImageArray) {
              var m = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(4), t);
              var C = new RoleSkillTrickTextureItem_1.RoleSkillTrickTextureItem();
              l.push(C.CreateThenShowByActorAsync(m.GetOwner()));
              a.set(C, U);
            }
            if (I.InputArray.length > 0 && I.SkillArray.length > 0) {
              f = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(6), t);
              g = new RoleSkillTrickInputItem_1.RoleSkillTrickInputItem();
              l.push(g.CreateThenShowByActorAsync(f.GetOwner()));
              f = {
                InputId: I.Id,
                InputIndex: e
              };
              s.set(g, [f]);
            } else {
              g = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(5), t);
              f = new RoleSkillTrickDescItem_1.RoleSkillTrickDescItem();
              l.push(f.CreateThenShowByActorAsync(g.GetOwner()));
              u.set(f, [I.Description]);
            }
            e++;
          }
        }
        await Promise.all(l);
        this.GetItem(0).SetUIActive(o.SkillDescList.length > 0);
        k.push(this.SPd.RefreshByDataAsync(o.SkillDescList));
        n.forEach((e, i) => {
          i.SetText(e);
        });
        a.forEach((e, i) => {
          k.push(i.SetTexture(e));
        });
        s.forEach((e, i) => {
          k.push(i.RefreshAsync(e));
        });
        u.forEach((e, i) => {
          k.push(i.RefreshAsync(e));
        });
        await Promise.all(k);
        if (r) {
          e = ModelManager_1.ModelManager.FunctionModel.IsShow(10043);
          o = ModelManager_1.ModelManager.FunctionModel.IsOpen(10043);
          this.GetItem(8).SetUIActive(!i && e && o);
        } else {
          this.GetItem(8).SetUIActive(false);
        }
      }
    }
  }
  SetFeatureActive(e) {
    this.GetItem(0).SetUIActive(e);
    this.GetItem(10).SetUIActive(e);
  }
  SetTrickActive(e) {
    this.GetItem(12).SetUIActive(e);
    this.GetVerticalLayout(2).RootUIComp.SetUIActive(e);
  }
  SetEmptyActive(e) {
    this.GetItem(13).SetUIActive(e);
  }
}
exports.RoleSkillInputPanel = RoleSkillInputPanel;
//# sourceMappingURL=RoleSkillInputPanel.js.map