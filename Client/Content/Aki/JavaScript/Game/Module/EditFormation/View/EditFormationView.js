"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditFormationView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const GameSettingsDeviceRender_1 = require("../../../GameSettings/GameSettingsDeviceRender");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiLayer_1 = require("../../../Ui/UiLayer");
const UiManager_1 = require("../../../Ui/UiManager");
const BuffItemControl_1 = require("../../BuffItem/BuffItemControl");
const CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData");
const TabComponentWithTitle_1 = require("../../Common/TabComponent/TabComponentWithTitle");
const EditFormationTabItem_1 = require("../../Common/TabComponent/TabItem/EditFormationTabItem");
const QuickRoleSelectView_1 = require("../../RoleSelect/QuickRoleSelectView");
const TeamRoleSelectView_1 = require("../../RoleSelect/TeamRoleSelectView");
const RoleUtils_1 = require("../../RoleUi/RoleUtils");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const EditFormationController_1 = require("../EditFormationController");
const EditFormationDefine_1 = require("../EditFormationDefine");
const FormationDragController_1 = require("../FormationDragController");
const ExitSkillView_1 = require("./ExitSkill/ExitSkillView");
const FormationRoleDragItem_1 = require("./FormationRoleDragItem");
const FormationRoleView_1 = require("./FormationRoleView");
class EditFormationView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.l5t = [];
    this.Ivt = undefined;
    this.u4t = [10, 11, 12];
    this._5t = 0;
    this.u5t = 0;
    this.c5t = -1;
    this.m5t = false;
    this.d5t = undefined;
    this.C5t = undefined;
    this.Dad = true;
    this.AOf = true;
    this.iPg = true;
    this.g5t = e => {
      if (!this.IsDestroyOrDestroying) {
        this.M3e();
        this.f5t(this._5t, e);
      }
    };
    this.VLg = (e, i, t, o) => {
      var r = ModelManager_1.ModelManager.EditFormationModel;
      r.SetEditingRoleId(this._5t, e, t);
      r.SetEditingRoleId(this._5t, i, o);
      this.g5t([e, i]);
    };
    this.oZe = (e, i) => {
      for (const t of this.l5t) {
        if (t.GetPlayer() === e) {
          t.RefreshPing(i);
        }
      }
    };
    this.p5t = () => {
      if (!this.m5t) {
        if (this.v5t()) {
          this.sn_();
          this.E5t();
        }
      }
    };
    this.G4t = () => {
      if (!UiManager_1.UiManager.IsViewOpen("QuickRoleSelectView")) {
        var e = ModelManager_1.ModelManager.EditFormationModel;
        var i = new Array();
        var e = e.GetEditingRoleIdList(this._5t);
        if (e) {
          for (const t of e) {
            i.push(t);
          }
        }
        e = ModelManager_1.ModelManager.RoleModel.GetRoleDataList(this.iPg);
        e = new QuickRoleSelectView_1.QuickRoleSelectViewData(5, i, e);
        e.CanConfirm = this.S5t;
        e.OnConfirm = this.N4t;
        e.OnBack = this.y5t;
        e.OnHideFinish = this.Szf;
        e.CanSelectRole = this.oJf;
        e.CanUseSpecialTrialRole = this.AOf;
        UiManager_1.UiManager.OpenView("QuickRoleSelectView", e, (e, i) => {
          if (e) {
            this.AddChildViewById(i);
          }
        });
        this.k4t(false);
      }
    };
    this.S5t = e => {
      var i = ModelManager_1.ModelManager.EditFormationModel;
      if (this._5t !== i.GetCurrentFormationId) {
        return true;
      }
      if (e.length <= 0) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("EditBattleTeamRoleEmpty");
        return false;
      }
      let t = true;
      for (const o of e) {
        if (!i.IsRoleDead(o)) {
          t = false;
          break;
        }
      }
      return !t || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("EditFormationAllDead"), false);
    };
    this.oJf = (e, i) => RoleUtils_1.RoleUtils.HasMultiTrialRole(e, i) ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("EditBattleTeamMultiTrialRole"), false) : !RoleUtils_1.RoleUtils.HasSameRole(e, i) || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("EditBattleTeamSameRole"), false);
    this.N4t = i => {
      this.k4t(true);
      var t = ModelManager_1.ModelManager.EditFormationModel;
      for (let e = 0; e < EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; e++) {
        var o = e <= i.length ? i[e] : 0;
        var r = e + 1;
        t.SetEditingRoleId(this._5t, r, o, false);
      }
    };
    this.I5t = () => {
      if (!this.m5t && (this._5t !== this.c5t || !!this.v5t())) {
        this.an_();
        this.E5t();
      }
    };
    this.F4t = () => {
      if (!UiManager_1.UiManager.IsViewShow("ExitSkillView")) {
        var e = new ExitSkillView_1.ExitSkillViewData();
        for (const r of this.l5t) {
          var i = r.GetConfigId();
          var t = r.GetOnlineIndex();
          var o = r.GetPlayer();
          e.AddData(i, t, o);
        }
        UiManager_1.UiManager.OpenView("ExitSkillView", e);
      }
    };
    this.y5t = () => {
      this.k4t(true);
    };
    this.S4t = e => {
      var i;
      var t;
      var o;
      var r;
      if (this.E4t(e)) {
        BuffItemControl_1.BuffItemControl.TryUseResurrectionItem(e);
        return false;
      } else {
        i = (t = ModelManager_1.ModelManager.EditFormationModel).IsInEditingFormation(this._5t, e);
        r = t.GetCurrentFormationId === this._5t;
        o = (t = t.GetEditingRoleIdList(this._5t)) && t.length === 1;
        if (r && i && o) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("EditBattleTeamRoleEmpty");
          return false;
        } else {
          r = this.u5t - 1;
          if (RoleUtils_1.RoleUtils.HasMultiTrialRole(e, t, r)) {
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("EditBattleTeamMultiTrialRole");
            return false;
          } else {
            return !RoleUtils_1.RoleUtils.HasSameRole(e, t, r) || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("EditBattleTeamSameRole"), false);
          }
        }
      }
    };
    this.X4t = e => {
      this.k4t(true);
      var i;
      var t = ModelManager_1.ModelManager.EditFormationModel;
      var o = t.GetEditingRolePosition(this._5t, e);
      var r = this.u5t;
      if (t.IsInEditingFormation(this._5t, e)) {
        if (t.GetEditingRoleId(this._5t, r)) {
          if (o === r) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Formation", 48, "编队角色位置相同，换下", ["位置", r]);
            }
            t.SetEditingRoleId(this._5t, r);
          } else {
            i = t.GetEditingRoleId(this._5t, r);
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Formation", 48, "编队角色更换");
            }
            t.SetEditingRoleId(this._5t, r, e);
            t.SetEditingRoleId(this._5t, o, i);
          }
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Formation", 48, "编队角色换下", ["位置", o]);
          }
          t.SetEditingRoleId(this._5t, o);
        }
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Formation", 48, "编队角色加入", ["位置", r], ["roleId", e]);
        }
        t.SetEditingRoleId(this._5t, this.u5t, e);
        this.T5t(e);
      }
    };
    this.Szf = () => {
      this.g5t();
      this.k4t(true);
    };
    this.v4t = e => !ModelManager_1.ModelManager.EditFormationModel.IsInEditingFormation(this._5t, e);
    this.M4t = e => this.E4t(e);
    this.W4t = e => {
      var i = ModelManager_1.ModelManager.EditFormationModel;
      var e = i.IsInEditingFormation(this._5t, e);
      var t = i.GetEditingRoleIdList(this._5t);
      let o = true;
      return o = t && !i.GetEditingRoleId(this._5t, this.u5t) && e ? false : o;
    };
    this.Q4t = e => {
      var i;
      var t;
      if (e) {
        if (this.E4t(e)) {
          return "EditBattleTeamRevive";
        } else {
          t = (i = ModelManager_1.ModelManager.EditFormationModel).IsInEditingFormation(this._5t, e);
          e = i.GetEditingRolePosition(this._5t, e);
          if (i.GetEditingRoleIdList(this._5t)) {
            if (i.GetEditingRoleId(this._5t, this.u5t)) {
              if (t) {
                if (e === undefined) {
                  return "JoinText";
                } else if (e === this.u5t) {
                  return "GoDownText";
                } else {
                  return "ChangeText";
                }
              } else {
                return "ChangeText";
              }
            } else if (t) {
              return "ChangeText";
            } else {
              return "JoinText";
            }
          } else {
            return "JoinText";
          }
        }
      }
    };
    this.R6e = (e, i) => {
      return new EditFormationTabItem_1.EditFormationTabItem();
    };
    this.yqe = e => {
      var i = EditFormationDefine_1.FORMATION_SPRITES[e];
      var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
      var e = e + 1;
      var t = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("TeamText");
      var i = new CommonTabData_1.CommonTabData(i, new CommonTabTitleData_1.CommonTabTitleData(t, e));
      i.SetSmallIcon(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_TeamTitle"));
      return i;
    };
    this.$4t = e => {
      if (!this.m5t) {
        e = e + 1;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Test", 5, "当点击编队按钮时", ["formationId", e]);
        }
        this.f5t(e);
        this._5t = e;
        this.M3e();
      }
    };
    this.L5t = e => {
      if (!this.m5t) {
        if (ModelManager_1.ModelManager.EditFormationModel.IsMyPosition(e)) {
          this.u5t = e;
          if (!UiManager_1.UiManager.IsViewShow("TeamRoleSelectView")) {
            UiManager_1.UiManager.OpenView("TeamRoleSelectView", this.D5t());
          }
          this.k4t(false);
        } else {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("IsNotMyRole");
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIText], [8, UE.UIButtonComponent], [9, UE.UIButtonComponent], [10, UE.UISpriteTransition], [11, UE.UISpriteTransition], [12, UE.UISpriteTransition], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem]];
    this.BtnBindInfo = [[1, this.F4t], [6, this.p5t], [8, this.I5t], [9, this.G4t]];
  }
  async OnBeforeStartAsync() {
    this.Dad = this.OpenParam ?? true;
    var i = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState() !== 0;
    this.iPg = ModelManager_1.ModelManager.RoleModel.CanUseSpecialTrialRole();
    this.AOf = this.iPg && !i;
    var i = ModelManager_1.ModelManager.EditFormationModel;
    var t = i.GetCurrentFormationId;
    if (t === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Formation", 48, "打开大世界编队界面时，当前编队为空");
      }
    } else {
      this._5t = t;
      this.c5t = t;
      i.InitEditingFormationMap();
      await this.Y4t();
      let e = 1;
      var o = [];
      for (const a of [this.GetItem(3), this.GetItem(4), this.GetItem(5)]) {
        var r = new FormationRoleView_1.FormationRoleView(e);
        r.BindOnSelectRole(this.L5t);
        r.OnPointDown = ControllerHolder_1.ControllerHolder.FormationDragController.OnFormationRoleViewPointDown;
        r.OnGamePadDown = ControllerHolder_1.ControllerHolder.FormationDragController.OnFormationRoleViewGamePadDown;
        r.OnDragStart = ControllerHolder_1.ControllerHolder.FormationDragController.OnFormationRoleViewStartDrag;
        r.OnDragMove = ControllerHolder_1.ControllerHolder.FormationDragController.OnFormationRoleViewMoveDrag;
        r.OnDragEnd = ControllerHolder_1.ControllerHolder.FormationDragController.OnFormationRoleViewEndDrag;
        o.push(r.CreateThenShowByActorAsync(a.GetOwner()));
        this.l5t.push(r);
        e++;
      }
      t = new FormationRoleDragItem_1.FormationRoleDragItem();
      o.push(t.CreateByActorAsync(this.GetItem(16).GetOwner()));
      await Promise.all(o);
      i = new FormationDragController_1.FormationDragData();
      i.DragRoleItem = t;
      i.FormationRoleViewList = this.l5t;
      i.ExchangeRoleCallBack = this.VLg;
      ControllerHolder_1.ControllerHolder.FormationDragController.InitDragData(i);
      this.M3e();
      t = ModelManager_1.ModelManager.GameModeModel.IsMulti;
      this.GetButton(6).RootUIComp.SetUIActive(!t);
      this.GetButton(9).RootUIComp.SetUIActive(!t);
      this.GetItem(13).SetUIActive(false);
      this.k4t(true);
    }
  }
  OnBeforeShow() {
    var e;
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      e = this._5t - 1;
      this.Ivt.SelectToggleByIndex(e);
      this.Ivt.ScrollToToggleByIndex(e);
      e = ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationId - 1;
      this.Ivt.GetTabItemByIndex(e).ShowTeamBattleTips();
    }
    this.f5t(this._5t);
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.TemporaryDisableFrameGeneration("EditFormationView");
  }
  OnTick(e) {
    for (const i of this.l5t) {
      i.OnTick(e);
    }
  }
  OnAfterHide() {
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.CancelTemporaryDisableFrameGeneration("EditFormationView");
  }
  OnAddEventListener() {
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshPlayerPing, this.oZe);
    }
  }
  OnRemoveEventListener() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnRefreshPlayerPing, this.oZe)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshPlayerPing, this.oZe);
    }
  }
  OnBeforeDestroy() {
    for (const e of this.l5t) {
      e.Reset();
    }
    this.l5t = [];
    if (this.Ivt) {
      this.Ivt.Destroy();
      this.Ivt = undefined;
    }
    this.m5t = false;
    if (this.d5t) {
      if (TimerSystem_1.GameplayTimerSystem.Has(this.d5t)) {
        TimerSystem_1.GameplayTimerSystem.Remove(this.d5t);
      }
      this.d5t = undefined;
    }
    if (this.C5t) {
      if (TimerSystem_1.GameplayTimerSystem.Has(this.C5t)) {
        TimerSystem_1.GameplayTimerSystem.Remove(this.C5t);
      }
      this.C5t = undefined;
    }
    ControllerHolder_1.ControllerHolder.FormationDragController.ClearDragData();
  }
  async sn_() {
    var e = ModelManager_1.ModelManager.GameModeModel.IsMulti;
    let i = false;
    i = e ? await EditFormationController_1.EditFormationController.UpdateFightRoleRequest() : await EditFormationController_1.EditFormationController.EditFormationRequest(this._5t);
    this.c5t = this._5t;
    if (!e && i) {
      ModelManager_1.ModelManager.EditFormationModel.ApplyCurrentFormationData(this.c5t);
    }
    this.M5t();
  }
  E5t() {
    if (!this.d5t) {
      UiLayer_1.UiLayer.SetShowMaskLayer("EditFormationViewClosing", true);
      this.GetItem(14).SetUIActive(true);
      this.d5t = TimerSystem_1.GameplayTimerSystem.Delay(() => {
        this.k4t(false);
        this.GetButton(1).RootUIComp.SetUIActive(false);
        this.GetItem(13).SetUIActive(true);
      }, EditFormationDefine_1.DELAY_SHOW_LOADING);
    }
    this.C5t ||= TimerSystem_1.GameplayTimerSystem.Delay(() => {
      UiLayer_1.UiLayer.SetShowMaskLayer("EditFormationViewClosing", false);
      this.xad();
    }, EditFormationDefine_1.AUTO_CLOSE_EDIT_FORMATION);
  }
  async M5t() {
    this.m5t = true;
    await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise?.Promise;
    UiLayer_1.UiLayer.SetShowMaskLayer("EditFormationViewClosing", false);
    this.xad();
  }
  xad() {
    if (this.Dad) {
      UiManager_1.UiManager.ResetToBattleView();
    } else {
      this.CloseMe();
    }
  }
  async an_() {
    var e = ModelManager_1.ModelManager.GameModeModel.IsMulti;
    let i = false;
    var t = ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationId;
    i = e ? await EditFormationController_1.EditFormationController.UpdateFightRoleRequest() : await EditFormationController_1.EditFormationController.EditFormationRequest(t);
    var t = this._5t === t;
    if (!e && t && i) {
      ModelManager_1.ModelManager.EditFormationModel.ApplyCurrentFormationData(this.c5t);
    }
    this.M5t();
  }
  D5t() {
    var e = ModelManager_1.ModelManager.EditFormationModel;
    var i = ModelManager_1.ModelManager.RoleModel.GetRoleDataList(this.iPg);
    var t = e.GetEditingRoleId(this._5t, this.u5t);
    var t = new TeamRoleSelectView_1.TeamRoleSelectViewData(5, t, i, this.X4t, this.y5t, this.u5t);
    t.SetGetConfirmButtonEnableFunction(this.W4t);
    t.SetGetConfirmButtonTextFunction(this.Q4t);
    t.SetHideFinishCallBack(this.g5t);
    t.SetConfirmCheckFunction(this.S4t);
    t.IsNeedRevive = this.M4t;
    t.CanJoinTeam = this.v4t;
    t.CanUseSpecialTrialRole = this.AOf;
    var i = e.GetEditingRoleIdList(this._5t);
    t.FormationRoleList = i;
    return t;
  }
  T5t(e) {
    var i;
    var t = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(e)?.GetRoleSkinId();
    if (t) {
      if ((i = ConfigManager_1.ConfigManager.AudioConfig?.GetRoleConfig(t)?.JoinTeamEvent) && (AudioSystem_1.AudioSystem.PostEvent(i), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Audio", 42, "[Game.EditFormationView] PostEvent", ["Event", i], ["skinId", t]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Audio", 42, "[Game.EditFormationView] 没有皮肤ID", ["roleId", e]);
    }
  }
  k4t(e) {
    var i = this.GetButton(8).GetOwner().GetComponentByClass(UE.UIItem.StaticClass());
    if (i) {
      i.SetUIActive(e);
    }
  }
  async Y4t() {
    var e = this.GetItem(0);
    var i = new CommonTabComponentData_1.CommonTabComponentData(this.R6e, this.$4t, this.yqe);
    this.Ivt = new TabComponentWithTitle_1.TabComponentWithTitle(e, i);
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      this.Ivt.SetCanChange(() => !(ControllerHolder_1.ControllerHolder.FormationDragController.DraggingIndex > 0) && (this._5t !== ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationId || this.v5t()));
      await this.Ivt.RefreshTabItemAsync(EditFormationDefine_1.MAX_FORMATION_ID);
    }
  }
  M3e() {
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      var t;
      var o = this._5t !== ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationId;
      let e = o;
      if (e && !this.AOf) {
        t = ModelManager_1.ModelManager.EditFormationModel.GetEditingRoleIdList(this._5t);
        e = !t.some(e => RoleUtils_1.RoleUtils.IsSpecialTrialRole(e));
      }
      this.GetButton(6).SetSelfInteractive(e);
      let i = undefined;
      i = o ? "EditBattleTeamFight" : "EditBattleTeamFighting";
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(7), i);
    }
  }
  f5t(s, e) {
    var l = ModelManager_1.ModelManager.EditFormationModel;
    var i = this.GetButton(1).RootUIComp;
    if (l.GetEditingRoleIdList(s).length <= 0) {
      for (const t of this.l5t) {
        t.ResetRole();
      }
      i.SetUIActive(false);
    } else {
      i.SetUIActive(true);
      var h;
      var _;
      var m;
      var d;
      var g = ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance();
      for (let n = 1; n <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; n++) {
        if (!e || e.includes(n)) {
          let e = 0;
          let i = 0;
          let t = "";
          let o = 0;
          let r = 0;
          let a = "";
          if (l.IsMyPosition(n)) {
            _ = ModelManager_1.ModelManager.RoleModel;
            e = l.GetEditingRoleId(s, n);
            if (m = _.GetRoleDataById(e)) {
              h = m.GetLevelData();
              m = m.GetRoleSkinId();
              i = h.GetLevel();
              r = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
              a = ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyOnlineId() ?? "";
              if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
                t = ModelManager_1.ModelManager.FunctionModel.GetPlayerName() ?? "";
                o = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(r)?.PlayerNumber ?? 1;
              } else {
                t = _.GetRoleName(e);
              }
              this.t5t(n, e, m, i, t, o, r, a);
            } else {
              this.t5t(n);
            }
          } else if (!(h = l.GetCurrentFormationData?.GetRoleDataByPosition(n)) || (r = h.PlayerId, _ = ModelManager_1.ModelManager.CreatureModel.GetScenePlayerData(r), g && !_)) {
            this.t5t(n);
          } else {
            e = h.ConfigId;
            m = ModelManager_1.ModelManager.OnlineModel.GetWorldTeamPlayerFightInfo(r);
            d = h.RoleSkinId;
            i = h.Level;
            t = m?.Name ?? "";
            a = m?.ThirdPartyOnlineName ?? "";
            o = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(r)?.PlayerNumber ?? 1;
            this.t5t(n, e, d, i, t, o, r, a);
          }
        }
      }
    }
  }
  t5t(e, i = 0, t = 0, o = 0, r = "", a = 0, n = 0, s = "") {
    var e = e - 1;
    var l = this.l5t[e];
    var e = this.GetUiSpriteTransition(this.u4t[e]);
    let h = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_TeamRoleSkillNone");
    if (i) {
      l.Refresh(i, t, o, r, a, n, s, this.AOf);
      t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i)?.SkillId;
      if (t) {
        for (const _ of ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(t)) {
          if (_.SkillType === EditFormationDefine_1.EXIT_SKILL_TYPE) {
            h = _.Icon;
            break;
          }
        }
      }
    } else {
      l.ResetRole();
    }
    this.SetSpriteTransitionByPath(h, e);
  }
  v5t() {
    var e = ModelManager_1.ModelManager.EditFormationModel;
    var i = e.GetEditingRoleIdList(this._5t);
    if (i.length === 0) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("EditBattleTeamNoRole");
      return false;
    }
    let t = true;
    for (const o of i) {
      if (!e.IsRoleDead(o)) {
        t = false;
        break;
      }
    }
    if (t) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("EditFormationAllDead");
      return false;
    } else {
      return !!this.AOf || !i.some(e => RoleUtils_1.RoleUtils.IsSpecialTrialRole(e));
    }
  }
  E4t(e) {
    var i;
    var t;
    return !!ModelManager_1.ModelManager.GameModeModel.IsMulti && !(t = (i = ModelManager_1.ModelManager.EditFormationModel).IsInEditingFormation(this._5t, e), ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e)?.IsTrialRole()) && !t && !!i.IsRoleDead(e);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var i = Number(e[0]);
    if (i !== 0) {
      i = this.l5t[i - 1]?.GetRootItem();
      if (i) {
        return [i, i];
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Guide", 53, "聚焦引导extraParam项配置有误", ["configParams", e]);
    }
  }
}
exports.EditFormationView = EditFormationView;
//# sourceMappingURL=EditFormationView.js.map