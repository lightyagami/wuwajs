"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DreamLinkRoleItem = exports.DreamLinkRoleSelectPanel = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const TeamRoleSelectView_1 = require("../../RoleSelect/TeamRoleSelectView");
const RoleController_1 = require("../../RoleUi/RoleController");
const DreamLinkController_1 = require("../DreamLinkController");
class DreamLinkRoleSelectPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.RoleItemList = [];
    this.Lth = () => {
      this.RoleItemList.forEach(e => {
        e.Refresh();
      });
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var t = DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
    var i = [];
    for (let e = 0; e < 3; e++) {
      var r = new DreamLinkRoleItem(t);
      r.Index = e;
      r.RefreshHandle = this.Lth;
      this.RoleItemList.push(r);
      i.push(r.CreateThenShowByActorAsync(this.GetItem(0 + e).GetOwner()));
    }
    await Promise.all(i);
  }
  RefreshInstId(e) {
    for (const t of this.RoleItemList) {
      t.RefreshInstId(e);
    }
  }
}
exports.DreamLinkRoleSelectPanel = DreamLinkRoleSelectPanel;
class DreamLinkRoleItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.ActivityBaseData = e;
    this.Index = 0;
    this.InstId = 0;
    this.RefreshHandle = undefined;
    this.Ath = () => {
      var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig?.GetConfig(this.InstId);
      if (t) {
        t = ConfigManager_1.ConfigManager.EditBattleTeamConfig?.GetFightFormationConfig(t.FightFormationId);
        if (t) {
          var i;
          var r = [];
          var s = ConfigManager_1.ConfigManager.DreamLinkConfig?.GetRoleConfigList() ?? [];
          for (const n of t.TrialRole) {
            var a = ConfigManager_1.ConfigManager.RoleConfig?.GetTrialRoleConfigByGroupId(n);
            var a = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(a.Id);
            if (a) {
              r.push(a);
            }
          }
          let e = false;
          for (const o of s) {
            if (!!o.IsShowInTeamView && !!(i = ModelManager_1.ModelManager.RoleModel?.GetRoleInstanceById(o.Id)) && (!ModelManager_1.ModelManager.RoleModel?.IsMainRole(o.Id) || !e)) {
              if (ModelManager_1.ModelManager.RoleModel?.IsMainRole(o.Id)) {
                e = true;
              }
              r.push(i);
            }
          }
          r.sort((e, t) => e.IsTrialRole() ? 1 : -1);
          t = new TeamRoleSelectView_1.TeamRoleSelectViewData(5, this.RoleId, r, t => {
            if (this.RoleId === t) {
              this.ActivityBaseData.SetBossRoleId(this.InstId, this.Index, 0);
            } else {
              var i = this.RoleId;
              var r = this.ActivityBaseData.GetAllBossRoleId(this.InstId);
              for (let e = 0; e < r.length; e++) {
                if (r[e] === t) {
                  this.ActivityBaseData.SetBossRoleId(this.InstId, e, i);
                  break;
                }
              }
              this.ActivityBaseData.SetBossRoleId(this.InstId, this.Index, t);
            }
            this.RefreshHandle?.();
          }, undefined, this.Index + 1);
          t.FormationRoleList = this.ActivityBaseData.GetAllBossRoleId(this.InstId);
          t.IsNeedRevive = this.E4t;
          t.GetConfirmButtonTextCallBack = this.Q4t;
          t.GetConfirmButtonEnableCallBack = this.v4t;
          t.CanJoinTeam = this.v4t;
          t.BackCallBack = this.y5t;
          RoleController_1.RoleController.OpenTeamRoleSelectView(t);
        }
      }
    };
    this.y5t = () => {
      var t = this.ActivityBaseData.GetAllBossRoleId(this.InstId);
      for (let e = 0; e < t.length; e++) {
        if (!ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(t[e])?.IsTrialRole() && !ModelManager_1.ModelManager.RoleModel?.GetRoleInstanceById(t[e])) {
          this.ActivityBaseData.SetBossRoleId(this.InstId, e, 0);
          this.RefreshHandle?.();
        }
      }
    };
    this.E4t = e => {
      return !ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e)?.IsTrialRole() && !!ModelManager_1.ModelManager.EditFormationModel.IsRoleDead(e);
    };
    this.v4t = t => {
      if (t !== this.RoleId) {
        var e = ConfigManager_1.ConfigManager.DreamLinkConfig?.GetRoleConfigList() ?? [];
        var i = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(t);
        if (ModelManager_1.ModelManager.EditFormationModel.IsRoleDead(t) && !i?.IsTrialRole()) {
          return false;
        }
        if (e.find(e => e.Id === t && e.IsShowInTeamView) === undefined && !i?.IsTrialRole()) {
          return false;
        }
        for (let e = 0; e < 3; e++) {
          var r = this.ActivityBaseData.GetAllBossRoleId(this.InstId)[e];
          var s = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(r);
          if (s && s.IsTrialRole()) {
            s = ConfigManager_1.ConfigManager.RoleConfig?.GetTrialRoleConfig(r);
            if (s && s.ParentId === t) {
              return false;
            }
          }
          if (i && i.IsTrialRole()) {
            s = ConfigManager_1.ConfigManager.RoleConfig?.GetTrialRoleConfig(t);
            if (s && r === s.ParentId) {
              return false;
            }
          }
        }
      }
      return true;
    };
    this.Q4t = e => {
      if (e) {
        if (this.RoleId === 0) {
          return "JoinText";
        } else if (this.RoleId === e) {
          return "GoDownText";
        } else {
          return "ChangeText";
        }
      }
    };
  }
  get RoleId() {
    return this.ActivityBaseData.GetBossRoleId(this.InstId, this.Index);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Ath]];
  }
  RefreshInstId(e) {
    this.InstId = e;
    this.Refresh();
  }
  Refresh() {
    var e = this.RoleId;
    var t = e === 0;
    this.GetTexture(1).SetUIActive(!t);
    this.GetItem(3).SetUIActive(!t);
    this.GetItem(2).SetUIActive(t);
    if (!t) {
      if (t = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(e)) {
        if (t.IsTrialRole()) {
          if ((t = ConfigManager_1.ConfigManager.RoleConfig?.GetTrialRoleConfig(e)) && (t = ConfigManager_1.ConfigManager.RoleConfig?.GetRoleConfig(t.ParentId))) {
            this.SetTextureByPath(t.RoleHeadIcon, this.GetTexture(1));
          }
        } else if (t = ConfigManager_1.ConfigManager.RoleConfig?.GetRoleConfig(e)) {
          this.SetTextureByPath(t.RoleHeadIcon, this.GetTexture(1));
        }
      }
    }
  }
}
exports.DreamLinkRoleItem = DreamLinkRoleItem;
//# sourceMappingURL=DreamLinkRoleSelectPanel.js.map