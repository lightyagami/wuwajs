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
const UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask");
class RoleSkillInputPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.dFe = 0;
    this.kEm = 0;
    this.iUd = undefined;
    this.qEm = false;
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
        const t = e.RoleGuide;
        if (t === 0) {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("RoleGuideNotice02", i);
        } else {
          (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(94)).SetTextArgs(i);
          e.FunctionMap.set(2, () => {
            var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t).FightFormationId;
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
              InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(t, i, 0, 0);
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
    this.iUd = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.iV1);
    this.kEm = this.GetItem(13).Height;
  }
  Refresh(e, i, r = false) {
    var t = new UiAsyncTask_1.UiAsyncTask("Refresh", async () => {
      await this.RefreshUiAsync(e, i, r);
    });
    this.RunAsyncTask(t);
  }
  async RefreshUiAsync(e, i, r = false) {
    if (!this.qEm) {
      this.dFe = e;
      var t = ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillInputConfigById(e);
      if (t) {
        e = ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillFightTrickList(e);
        if (e) {
          var o = this.GetVerticalLayout(2).GetRootComponent();
          var l = new Array();
          const m = new Array();
          var n = new Map();
          var a = new Map();
          var s = new Map();
          var u = new Map();
          for (const C of e) {
            var _ = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(3), o);
            var c = new RoleSkillTrickSmallTitleItem_1.RoleSkillTrickSmallTitleItem();
            l.push(c.CreateThenShowByActorAsync(_.GetOwner()));
            n.set(c, C.SkillTitle);
            var _ = C.SkillDesc;
            var h = C.Type === 1;
            if (h) {
              LguiUtil_1.LguiUtil.CopyItem(this.GetItem(7), o).SetUIActive(true);
            }
            let e = 1;
            for (const M of _) {
              var g;
              var f;
              var k = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillInputConfigById(M);
              for (const R of k.ImageArray) {
                var U = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(4), o);
                var I = new RoleSkillTrickTextureItem_1.RoleSkillTrickTextureItem();
                l.push(I.CreateThenShowByActorAsync(U.GetOwner()));
                a.set(I, R);
              }
              if (k.InputArray.length > 0 && k.SkillArray.length > 0 && h) {
                f = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(6), o);
                g = new RoleSkillTrickInputItem_1.RoleSkillTrickInputItem();
                l.push(g.CreateThenShowByActorAsync(f.GetOwner()));
                f = {
                  InputId: k.Id,
                  InputIndex: e
                };
                s.set(g, [f]);
              } else {
                g = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(5), o);
                f = new RoleSkillTrickDescItem_1.RoleSkillTrickDescItem();
                l.push(f.CreateThenShowByActorAsync(g.GetOwner()));
                u.set(f, [k.Description]);
              }
              e++;
            }
          }
          await Promise.all(l);
          this.GetItem(0).SetUIActive(t.SkillDescList.length > 0);
          m.push(this.iUd.RefreshByDataAsync(t.SkillDescList));
          n.forEach((e, i) => {
            i.SetText(e);
          });
          a.forEach((e, i) => {
            m.push(i.SetTexture(e));
          });
          s.forEach((e, i) => {
            m.push(i.RefreshAsync(e));
          });
          u.forEach((e, i) => {
            m.push(i.RefreshAsync(e));
          });
          await Promise.all(m);
          if (r) {
            e = ModelManager_1.ModelManager.FunctionModel.IsShow(10043);
            t = ModelManager_1.ModelManager.FunctionModel.IsOpen(10043);
            this.GetItem(8).SetUIActive(!i && e && t);
          } else {
            this.GetItem(8).SetUIActive(false);
          }
          this.qEm = true;
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
    if (e) {
      this.iUd.BindLateUpdate(() => {
        var e = this.GetRootItem().Height - this.GetItem(0).Height - this.GetVerticalLayout(1).RootUIComp.Height;
        if (e < this.kEm) {
          this.GetItem(13).SetUIActive(false);
        } else {
          this.GetItem(13).SetHeight(e);
          this.iUd.UnBindLateUpdate();
        }
      });
    }
    this.GetItem(13).SetUIActive(e);
  }
}
exports.RoleSkillInputPanel = RoleSkillInputPanel;
//# sourceMappingURL=RoleSkillInputPanel.js.map