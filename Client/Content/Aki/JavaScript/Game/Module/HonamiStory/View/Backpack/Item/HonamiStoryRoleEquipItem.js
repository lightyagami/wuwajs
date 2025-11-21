"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryRoleEquipItem = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../../Ui/UiManager");
const TeamRoleSelectView_1 = require("../../../../RoleSelect/TeamRoleSelectView");
const RoleController_1 = require("../../../../RoleUi/RoleController");
const ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController");
const HonamiStoryController_1 = require("../../../HonamiStoryController");
const HonamiStoryDefine_1 = require("../../../HonamiStoryDefine");
const HonamiStoryUtil_1 = require("../../../HonamiStoryUtil");
const HonamiStoryWeaponToggleItem_1 = require("../../Items/HonamiStoryWeaponToggleItem");
const HonamiStoryEquipGridItem_1 = require("./HonamiStoryEquipGridItem");
class HonamiStoryRoleEquipItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.xfd = e;
    this.OnEnterGridCb = undefined;
    this.OnExitGridCb = undefined;
    this.OnDownGridCb = undefined;
    this.OnClickedGridCb = undefined;
    this.OnMoreClickedCb = undefined;
    this.Xmt = undefined;
    this.Ufd = [];
    this.fcl = undefined;
    this.nwm = false;
    this.k1m = e => {
      if (this.OnEnterGridCb) {
        this.OnEnterGridCb(e);
      }
    };
    this.q1m = () => {
      if (this.OnExitGridCb) {
        this.OnExitGridCb();
      }
    };
    this.ncm = () => {
      if (this.OnDownGridCb) {
        this.OnDownGridCb();
      }
    };
    this.hJs = (e, t, i) => {
      if (this.OnClickedGridCb) {
        this.OnClickedGridCb(e, t, i);
      }
    };
    this.jR1 = () => {
      var e = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogicState();
      if (e === 0) {
        if (this.OnMoreClickedCb) {
          this.OnMoreClickedCb(this);
        }
      } else if (e === 1 || e === 2) {
        ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic()?.CloseTips();
      }
    };
    this.uYd = () => {
      var e = this.rRm();
      var t = HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon();
      ModelManager_1.ModelManager.HonamiStoryModel.AddLevel = [90, 90];
      if (t || !e) {
        this.Vwm();
      } else {
        this.Hwm();
      }
    };
    this.osa = e => {
      var t;
      var i;
      var r;
      var o = ModelManager_1.ModelManager.HonamiStoryModel.GetAllRoleIdList();
      var a = this.xfd.GetRoleId();
      if (a === e) {
        if ((t = o.indexOf(a)) !== -1) {
          o[t] = 0;
        }
      } else {
        t = ModelManager_1.ModelManager.HonamiStoryModel.GetRoleEquipDataByRoleId(e);
        i = o.indexOf(e);
        r = o.indexOf(a);
        if (t) {
          o[i] = a;
        }
        o[r] = e;
      }
      HonamiStoryController_1.HonamiStoryController.RequestHonamiStoryEquipRole(o);
    };
    this.Q4t = e => {
      var t;
      if (e) {
        if ((t = this.xfd.GetRoleId()) === 0) {
          return "JoinText";
        } else if (t === e) {
          return "GoDownText";
        } else {
          return "ChangeText";
        }
      }
    };
    this.E4t = e => {
      return !ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e)?.IsTrialRole() && !!ModelManager_1.ModelManager.EditFormationModel.IsRoleDead(e);
    };
    this.v4t = t => {
      var e = this.rRm();
      var i = HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon();
      if (!e || i) {
        return false;
      }
      e = this.xfd.GetRoleId();
      if (t !== e) {
        var r = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(t);
        if (ModelManager_1.ModelManager.EditFormationModel.IsRoleDead(t) && !r?.IsTrialRole()) {
          return false;
        }
        for (let e = 0; e < HonamiStoryDefine_1.HONAMI_ROLE_TEAM_COUNT; e++) {
          var o = ModelManager_1.ModelManager.HonamiStoryModel.GetRoleEquipDataByPosition(e)?.GetRoleId() ?? 0;
          var a = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(o);
          if (a && a.IsTrialRole()) {
            a = ConfigManager_1.ConfigManager.RoleConfig?.GetTrialRoleConfig(o);
            if (a && a.ParentId === t) {
              return false;
            }
          }
          if (r && r.IsTrialRole()) {
            a = ConfigManager_1.ConfigManager.RoleConfig?.GetTrialRoleConfig(t);
            if (a && o === a.ParentId) {
              return false;
            }
          }
        }
      }
      return true;
    };
    this.cYd = () => {
      var t = ModelManager_1.ModelManager.HonamiStoryModel.GetAllRoleIdList();
      for (let e = 0; e < t.length; e++) {
        if (!ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(t[e])?.IsTrialRole() && !ModelManager_1.ModelManager.RoleModel?.GetRoleInstanceById(t[e])) {
          ModelManager_1.ModelManager.HonamiStoryModel.UpdateRoleByPosition(0, e);
        }
      }
      this.g0o();
      ModelManager_1.ModelManager.HonamiStoryModel.AddLevel = [-1, -1];
    };
    this.WJd = e => {
      var t = this.xfd.GetWeaponId();
      var i = HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon();
      if (t <= 0 && i) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("HonamiStory_NoWeaponEquip");
      } else {
        UiManager_1.UiManager.OpenView("HonamiStoryWeaponSelectView", this.xfd);
        this.fcl?.ResetToggleState();
      }
    };
    this.hwm = () => {
      this.fcl?.SetNewItemShow(false);
    };
  }
  RegisterPanel(e) {
    this.Xmt = e;
  }
  GetRoleEquipData() {
    return this.xfd;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UISprite], [2, UE.UITexture], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.uYd], [5, this.jR1]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    e.push(this.kfd());
    this.fcl = new HonamiStoryWeaponToggleItem_1.HonamiStoryWeaponToggleItem();
    this.fcl.BindWeaponToggleClick(this.WJd);
    e.push(this.fcl.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()));
    await Promise.all(e);
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHonamiStoryBackpackClickWeapon, this.hwm);
  }
  OnBeforeShow() {
    this.g0o();
    this.a8l();
    this.swm();
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHonamiStoryBackpackClickWeapon, this.hwm);
  }
  g0o() {
    var e;
    var t;
    var i = this.xfd.GetRoleId();
    this.GetSprite(1)?.SetUIActive(i <= 0);
    this.GetTexture(2)?.SetUIActive(i > 0);
    if (!(i <= 0)) {
      if (e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i)) {
        t = ((t = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinDataByRoleId(i)) !== undefined ? t.GetRoleSkinConfig() : e).RoleHeadIconLarge;
        this.SetRoleIconByRoleIdOrSkinId(t, this.GetTexture(2), i, e.SkinId);
      }
    }
  }
  async kfd() {
    var t = this.xfd.GetPluginList();
    var i = [];
    for (let e = this.Ufd.length = 0; e < t.length; e++) {
      i.push(this.Ofd(e));
    }
    await Promise.all(i);
    for (let e = 0; e < t.length; e++) {
      this.Ufd[e].Refresh(t[e], -1);
    }
  }
  async Ofd(e) {
    var t = await this.qfd();
    var i = ModelManager_1.ModelManager.HonamiStoryModel.GetPlayerBackpackData();
    t.GetRootItem().SetWidth(i.GetCellWidth());
    t.GetRootItem().SetHeight(i.GetCellHeight());
    t.RegisterPanel(this.Xmt);
    t.SetPosition(this.xfd.GetHonamiStoryPluginPosition(e));
    this.Ufd.push(t);
  }
  async RefreshUiAsync(e) {
    this.xfd = e;
    await this.Gfd();
    this.g0o();
    this.a8l();
    this.swm();
  }
  async Gfd() {
    var t = this.xfd.GetPluginList();
    if (this.Ufd.length < t.length) {
      var i = [];
      for (let e = this.Ufd.length; e < t.length; e++) {
        i.push(this.Ofd(e));
      }
      await Promise.all(i);
    }
    for (let e = 0; e < t.length; e++) {
      var r = t[e];
      this.Ufd[e].Refresh(r, -1);
      this.Ufd[e].Show();
    }
    if (this.Ufd.length > t.length) {
      for (let e = t.length; e < this.Ufd.length; e++) {
        this.Ufd[e].Hide();
      }
    }
  }
  async qfd() {
    var e = new HonamiStoryEquipGridItem_1.HonamiStoryEquipGridItem(false);
    e.OnEnterGridCb = this.k1m;
    e.OnExitGridCb = this.q1m;
    e.OnDownGridCb = this.ncm;
    e.OnClickedGridCb = this.hJs;
    await e.CreateThenShowByResourceIdAsync("UiItem_HonamiStoryGrid", this.GetItem(4));
    return e;
  }
  GetEquipItemByEventData(e) {
    for (const t of this.Ufd) {
      if (HonamiStoryUtil_1.HonamiStoryUtil.CheckEventDataInItemViewport(e, t.GetRootItem(), true)) {
        return t;
      }
    }
  }
  GetPluginItemList() {
    return this.Ufd;
  }
  SetRoleTipOpenState(e) {
    var t = this.awm();
    this.nwm = e;
    this.GetButton(5)?.RootUIComp.SetUIActive(t && !e);
  }
  swm() {
    var e = this.awm();
    this.GetButton(5)?.RootUIComp.SetUIActive(e && !this.nwm);
  }
  awm() {
    var e;
    var t;
    return (!!ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic().IsBackpackView() || !HonamiStoryUtil_1.HonamiStoryUtil.IsMobileView()) && !(e = this.xfd.GetWeaponId() <= 0, t = this.xfd.GetEquipItemDataList().length === 0, e && t);
  }
  SetEnableState(e) {
    var t = e === 0;
    var i = e === 5 || e === 6;
    var r = t || i ? HonamiStoryDefine_1.HONAMI_ENABLE_ALPHA : HonamiStoryDefine_1.HONAMI_DISABLE_ALPHA;
    this.GetButton(0)?.RootUIComp.SetAlpha(r);
    this.GetButton(0)?.RootUIComp.SetRaycastTarget(t);
    this.fcl?.SetIsEnable(t);
    this.GetButton(5)?.RootUIComp.SetAlpha(r);
    this.GetButton(5)?.RootUIComp.SetRaycastTarget(t);
    var o = i || t || e === 3;
    var r = o ? HonamiStoryDefine_1.HONAMI_ENABLE_ALPHA : HonamiStoryDefine_1.HONAMI_DISABLE_ALPHA;
    this.GetItem(4)?.SetAlpha(r);
    for (const a of this.Ufd) {
      a.SetIsEnable(o);
    }
  }
  RefreshState(e) {
    for (const t of this.Ufd) {
      t.Refresh(t.GetData(), -1);
    }
  }
  rRm() {
    return ModelManager_1.ModelManager.FunctionModel.IsOpen(10111);
  }
  Vwm() {
    const t = HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon();
    var e = this.xfd.GetRoleId();
    var i = this.xfd.GetPosition();
    var r = ModelManager_1.ModelManager.HonamiStoryModel.GetAllRoleIdList();
    var o = [];
    for (const n of r) {
      var a = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(n);
      if (a) {
        o.push(a);
      }
    }
    e = new TeamRoleSelectView_1.TeamRoleSelectViewData(5, e, o, undefined, undefined, i + 1);
    e.FormationRoleList = r;
    e.IsNeedRevive = this.E4t;
    e.BackCallBack = this.cYd;
    e.ForFunction = 1;
    e.ShowLockPanel = e => true;
    e.GetLockTextCallBack = e => t ? "HonamiStory_UnableSwitch1" : "HonamiStory_UnableSwitch2";
    RoleController_1.RoleController.OpenTeamRoleSelectView(e);
    AudioSystem_1.AudioSystem.PostEvent("play_ui_honamistory_roleselect_page_start");
  }
  Hwm() {
    var e = this.xfd.GetRoleId();
    var t = this.xfd.GetPosition();
    var i = ModelManager_1.ModelManager.HonamiStoryModel.GetActivityData(false);
    if (i) {
      var r = ConfigManager_1.ConfigManager.InstanceDungeonConfig?.GetConfig(i.AreaInstId);
      if (r) {
        var o = ConfigManager_1.ConfigManager.EditBattleTeamConfig?.GetFightFormationConfig(r.FightFormationId);
        if (o) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("HonamiStory", 78, "OnRoleItemClicked 编队配置信息", ["dungeonId", i.AreaInstId], ["formationId", r.FightFormationId]);
          }
          var i = o.TrialRole;
          var a = [];
          var n = [];
          for (const _ of o.LimitRole) {
            var s = ModelManager_1.ModelManager.RoleModel?.GetRoleInstanceById(_);
            if (s) {
              a.push(_);
              n.push(s);
            }
          }
          for (const m of i) {
            var h;
            var l = ConfigManager_1.ConfigManager.RoleConfig?.GetTrialRoleConfigByGroupId(m);
            if (l) {
              h = l.ParentId;
              if (!a.includes(h)) {
                if (h = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(l.Id)) {
                  n.push(h);
                }
              }
            }
          }
          n.sort((e, t) => e.IsTrialRole() ? 1 : -1);
          r = new TeamRoleSelectView_1.TeamRoleSelectViewData(5, e, n, this.osa, undefined, t + 1);
          r.FormationRoleList = ModelManager_1.ModelManager.HonamiStoryModel.GetAllRoleIdList();
          r.IsNeedRevive = this.E4t;
          r.GetConfirmButtonTextCallBack = this.Q4t;
          r.GetConfirmButtonEnableCallBack = this.v4t;
          r.CanJoinTeam = this.v4t;
          r.BackCallBack = this.cYd;
          r.ForFunction = 1;
          RoleController_1.RoleController.OpenTeamRoleSelectView(r);
          AudioSystem_1.AudioSystem.PostEvent("play_ui_honamistory_roleselect_page_start");
        }
      }
    }
  }
  a8l() {
    var e = {
      WeaponId: this.xfd.GetWeaponId(),
      EquipData: this.xfd,
      UseWay: 0
    };
    this.fcl?.Refresh(e, false, 0);
  }
  GuideFindPluginItemWithId(e) {
    for (const i of this.Ufd) {
      var t = i.GetData();
      if (t && t.GetItemId() === e) {
        if (t = i.GetItemGridItem()?.GetRootItem()) {
          return [t, t];
        } else {
          return undefined;
        }
      }
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 0 && e[0] === "AddBtn") {
      for (const i of this.Ufd) {
        var t = i.GetGuideUiItemAndUiItemForShowEx(e);
        if (t && t.length > 0) {
          return t;
        }
      }
    }
  }
}
exports.HonamiStoryRoleEquipItem = HonamiStoryRoleEquipItem;
//# sourceMappingURL=HonamiStoryRoleEquipItem.js.map