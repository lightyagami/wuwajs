"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeamRoleSelectView = exports.TeamRoleSelectViewData = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const UiPopViewData_1 = require("../../Ui/Define/UiPopViewData");
const UiManager_1 = require("../../Ui/UiManager");
const ActivityFunctionalTypeA_1 = require("../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA");
const FilterSortEntrance_1 = require("../Common/FilterSort/FilterSortEntrance");
const LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer");
const TeamPlayerSelectionComponent_1 = require("../Common/TeamPlayerSelectionComponent");
const EditFormationDefine_1 = require("../EditFormation/EditFormationDefine");
const HonamiStoryUtil_1 = require("../HonamiStory/HonamiStoryUtil");
const HonamiStoryRoleInfoPanel_1 = require("../HonamiStory/View/Items/HonamiStoryRoleInfoPanel");
const RoleController_1 = require("../RoleUi/RoleController");
const RoleDefine_1 = require("../RoleUi/RoleDefine");
const RoleTagMediumIconItem_1 = require("../RoleUi/RoleTag/RoleTagMediumIconItem");
const RoleUtils_1 = require("../RoleUi/RoleUtils");
const RoleTrialLabelItem_1 = require("../RoleUi/View/RoleTrialLabelItem");
const SceneTeamDefine_1 = require("../SceneTeam/SceneTeamDefine");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../Util/LguiUtil");
const LoopScrollView_1 = require("../Util/ScrollView/LoopScrollView");
const TeamRoleGrid_1 = require("./TeamRoleGrid");
const TeamRoleSkillItem_1 = require("./TeamRoleSkillItem");
class TeamRoleSelectViewData extends UiPopViewData_1.UiPopViewData {
  constructor(i, t, e, s, h, o, r) {
    super();
    this.UseWay = undefined;
    this.CurrentRoleId = 0;
    this.RoleList = undefined;
    this.EditBattleRoleSlotDataList = undefined;
    this.Position = 0;
    this.ForFunction = 0;
    this.FormationRoleList = undefined;
    this.CanUseSpecialTrialRole = false;
    this.ConfirmCallBack = undefined;
    this.OnHideFinishCallBack = undefined;
    this.BackCallBack = undefined;
    this.GetConfirmButtonTextCallBack = undefined;
    this.GetConfirmButtonEnableCallBack = undefined;
    this.IsNeedRevive = undefined;
    this.CanConfirmFunc = undefined;
    this.CanJoinTeam = undefined;
    this.GetCustomSkillShowData = undefined;
    this.DetailCallback = undefined;
    this.ShowLockPanel = undefined;
    this.GetLockTextCallBack = undefined;
    this.UseWay = i;
    this.CurrentRoleId = t;
    this.RoleList = e;
    this.BackCallBack = h;
    this.ConfirmCallBack = s;
    this.Position = o;
    this.ForFunction = r ?? 0;
  }
  SetHideFinishCallBack(i) {
    this.OnHideFinishCallBack = i;
  }
  SetGetConfirmButtonTextFunction(i) {
    this.GetConfirmButtonTextCallBack = i;
  }
  SetGetConfirmButtonEnableFunction(i) {
    this.GetConfirmButtonEnableCallBack = i;
  }
  SetOtherTeamSlotData(i) {
    this.EditBattleRoleSlotDataList = i;
  }
  SetConfirmCheckFunction(i) {
    this.CanConfirmFunc = i;
  }
}
exports.TeamRoleSelectViewData = TeamRoleSelectViewData;
class TeamRoleSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.adi = undefined;
    this.CurSelectRole = undefined;
    this.Flo = undefined;
    this.Vlo = undefined;
    this.jlo = undefined;
    this.Wlo = undefined;
    this.Klo = undefined;
    this.Qlo = undefined;
    this.Xlo = undefined;
    this.SPe = undefined;
    this.Dcl = 0;
    this.IsNeedRefreshTeamList = false;
    this.szd = undefined;
    this.wVl = undefined;
    this.ZDf = undefined;
    this.Hlo = (i, t, e) => {
      this.Vlo = i;
      i = this.Vlo.length > 0;
      this.GetItem(8).SetUIActive(!i);
      this.GetLoopScrollViewComponent(1).RootUIComp.SetUIActive(i);
      this.GetItem(24).SetUIActive(i);
      this.GetItem(10).SetUIActive(i);
      if (i) {
        i = this.CurSelectRole?.GetDataId();
        if (i) {
          ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.delete(i);
        }
        this.Flo.DeselectCurrentGridProxy();
        this.Flo.RefreshByData(this.Vlo);
        if (this.CurSelectRole) {
          if (e !== 1 || t) {
            let i = false;
            for (const s of this.Vlo) {
              if (s.GetDataId() === this.CurSelectRole?.GetDataId()) {
                i = true;
                break;
              }
            }
            if (!i) {
              this.CurSelectRole = this.Vlo[0];
            }
          } else {
            this.CurSelectRole = this.Vlo[0];
          }
        } else {
          for (const h of this.Vlo) {
            this.CurSelectRole = h;
            if (this.Pe?.CanJoinTeam?.(h.GetDataId())) {
              break;
            }
          }
        }
        this.zlo();
      } else {
        this.GetButton(3).RootUIComp.SetUIActive(false);
        this.GetButton(9).RootUIComp.SetUIActive(false);
      }
    };
    this.cHe = () => {
      var i = new TeamRoleGrid_1.TeamRoleGrid();
      i.IsHighlightIndex = this.IsHighlightIndex;
      i.IsShowGray = this.IsShowGray;
      i.BindOnExtendToggleStateChanged(this.ToggleFunction);
      i.BindOnCanExecuteChange(this.CanExecuteChangeFunction);
      return i;
    };
    this.IsHighlightIndex = i => i === this.Pe?.Position;
    this.IsShowGray = i => !this.Pe?.CanUseSpecialTrialRole && RoleUtils_1.RoleUtils.IsSpecialTrialRole(i);
    this.ToggleFunction = i => {
      var t;
      if (i.State === 1) {
        if (t = this.CurSelectRole?.GetDataId()) {
          ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.delete(t);
        }
        t = i.Data;
        this.CurSelectRole = t;
        this.Zlo();
        i = this.Vlo.indexOf(t);
        this.Flo.SelectGridProxy(i);
        t = this.CurSelectRole.GetDataId();
        ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.add(t);
        this.e1o(t);
        this.F8t(t);
        this.U5t(t);
      }
    };
    this.CanExecuteChangeFunction = (i, t, e) => {
      if (!this.Pe?.CanUseSpecialTrialRole) {
        var s = i.GetDataId();
        if (RoleUtils_1.RoleUtils.IsSpecialTrialRole(s)) {
          if ((this.Pe?.FormationRoleList ?? []).indexOf(s) < 0) {
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PrefabTextItem_1024721374_Text");
            return false;
          }
        }
      }
      return e !== 1 || this.CurSelectRole !== i;
    };
    this.t1o = () => {
      var i = new TeamRoleSkillItem_1.TeamRoleSkillItem();
      i.BindOnSkillStateChange(this.i1o);
      return i;
    };
    this.i1o = (i, t) => {
      if (i === 1 && this.Wlo) {
        i = this.Wlo.indexOf(t);
        this.jlo.SelectGridProxy(i);
        this.Jlo(t);
      }
    };
    this.o1o = () => {
      if (this.CurSelectRole) {
        this.Zlo();
        this.e1o(this.CurSelectRole.GetDataId());
      }
    };
    this.Ylo = () => {
      this.IsNeedRefreshTeamList = true;
    };
    this.GT1 = () => {
      var i = ModelManager_1.ModelManager.RoleSelectModel;
      let t = false;
      for (const o of this.Vlo) {
        var e;
        var s = this.CurSelectRole === o;
        var h = ModelManager_1.ModelManager.RoleModel?.GetRoleDataById(o.GetDataId());
        if (h && h !== o && (t = true, (e = this.Pe.RoleList.findIndex(i => i === o)) > -1 && (this.Pe.RoleList[e] = h), (e = i.GetRoleIndex(o.GetDataId())) > 0 && i.RoleIndexMap.set(e, h), s)) {
          this.CurSelectRole = h;
        }
      }
      if (t) {
        this.Vlo = this.Pe.RoleList;
        this.Vlo.sort((i, t) => t.GetRoleConfig().Priority - i.GetRoleConfig().Priority);
        this.adi?.UpdateData(this.Pe.UseWay, this.Vlo);
      }
    };
    this.C4t = i => {
      var t;
      if (this.Pe?.EditBattleRoleSlotDataList) {
        if (!(t = ModelManager_1.ModelManager.EditBattleTeamModel.GetRoleSlotData(this.Pe.Position)) || t.GetRoleData?.PlayerId !== ModelManager_1.ModelManager.PlayerInfoModel.GetId()) {
          this.Pe?.BackCallBack?.();
          UiManager_1.UiManager.CloseView(this.Info.Name);
        }
        this.Pe?.SetOtherTeamSlotData(ModelManager_1.ModelManager.EditBattleTeamModel.GetAllRoleSlotData);
        this.RefreshTeamItem(this.Pe?.EditBattleRoleSlotDataList);
      }
    };
    this.qAt = () => {
      var i = this.CurSelectRole?.GetDataId();
      var t = this.Pe?.CanConfirmFunc;
      if (!t || !!t(i)) {
        this.Pe?.ConfirmCallBack?.(i);
        UiManager_1.UiManager.CloseView(this.Info.Name);
      }
    };
    this.W7t = () => {
      this.Pe?.BackCallBack?.();
      UiManager_1.UiManager.CloseView(this.Info.Name);
    };
    this.$lo = () => {
      var i;
      var t;
      if (this.Pe?.DetailCallback) {
        this.Pe.DetailCallback(this.CurSelectRole.GetDataId());
      } else {
        t = (i = this.CurSelectRole.GetDataId()) >= RoleDefine_1.ROBOT_DATA_MIN_ID ? [i] : [];
        RoleController_1.RoleController.OpenRoleMainView(0, i, t);
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleChangeEnd, this.Ylo);
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
      }
    };
    this.$Ge = i => {
      if (i === "RoleRootView") {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleChangeEnd, this.Ylo);
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
      }
    };
    this.Acl = i => {
      if (this.Dcl === 1) {
        ModelManager_1.ModelManager.RoleModel.IsShowMultiSkillDesc = i;
      } else {
        ModelManager_1.ModelManager.RoleModel.IsShowSkillResume = i;
      }
      i = this.jlo.GetSelectedGridIndex();
      if (!!this.Wlo && !(i < 0) && !(this.Wlo.length < i)) {
        this.Jlo(this.Wlo[i]);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIInteractionGroup], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [1, UE.UILoopScrollViewComponent], [2, UE.UIText], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIItem], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIButtonComponent], [10, UE.UIItem], [11, UE.UIText], [12, UE.UIText], [13, UE.UIHorizontalLayout], [14, UE.UIItem], [15, UE.UIText], [16, UE.UIMultiTemplateLayout], [17, UE.UIItem], [18, UE.UIText], [22, UE.UIExtendToggle], [23, UE.UIItem], [24, UE.UIItem], [25, UE.UIText], [26, UE.UIItem], [27, UE.UIItem], [28, UE.UIItem], [29, UE.UIItem], [30, UE.UIItem]];
    this.BtnBindInfo = [[3, this.qAt], [4, this.W7t], [9, this.$lo], [22, this.Acl]];
  }
  async OnBeforeStartAsync() {
    this.Pe = this.OpenParam;
    var i = [];
    for (const e of this.Pe.RoleList) {
      if (e.GetDataId() > RoleDefine_1.ROBOT_DATA_MIN_ID) {
        i.push(e.GetDataId());
      }
    }
    if (i.length > 0) {
      await RoleController_1.RoleController.RobotRolePropRequest(i);
    }
    var t = this.Pe.ForFunction === 1;
    if (t) {
      await this.d1m();
    }
    this.wVl = new ActivityFunctionalTypeA_1.FunctionalPanelConditionLock();
    await this.wVl.CreateThenShowByActorAsync(this.GetItem(29).GetOwner());
    this.GetItem(26).SetUIActive(t);
    this.GetItem(27).SetUIActive(!t);
    this.GetItem(28).SetUIActive(t);
    await this.eUf();
  }
  OnStart() {
    this.Flo = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), this.GetItem(7).GetOwner(), this.cHe);
    var i = this.GetItem(20);
    this.Qlo = new TeamPlayerSelectionComponent_1.TeamPlayerSelectionComponent(i);
    var i = this.GetItem(21);
    this.Xlo = new TeamPlayerSelectionComponent_1.TeamPlayerSelectionComponent(i);
    this.xcl();
    this.jlo = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(13), this.t1o);
    this.Klo = new GenericLayout_1.GenericLayout(this.GetMultiTemplateLayout(16), () => new RoleTagMediumIconItem_1.RoleTagMediumIconItem());
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.Vlo = this.Pe?.RoleList;
    var t = this.Pe?.CurrentRoleId;
    var e = this.Pe?.FormationRoleList;
    ModelManager_1.ModelManager.RoleSelectModel.ClearData();
    var s = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap;
    if (e) {
      for (let i = 1; i <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM && !(i > e.length); i++) {
        var h = e[i - 1];
        for (const o of this.Vlo) {
          if (o.GetDataId() === h) {
            s.set(i, o);
            break;
          }
        }
      }
    }
    i = this.GetItem(5);
    this.adi = new FilterSortEntrance_1.FilterSortEntrance(i, this.Hlo);
    for (const r of this.Vlo) {
      if (r.GetDataId() === t) {
        this.CurSelectRole = r;
        break;
      }
    }
    this.RefreshTeamItem(this.Pe?.EditBattleRoleSlotDataList);
    this.Vlo.sort((i, t) => t.GetRoleConfig().Priority - i.GetRoleConfig().Priority);
    this.adi?.UpdateData(this.Pe.UseWay, this.Vlo);
  }
  OnBeforeShow() {
    if (this.IsNeedRefreshTeamList) {
      this.GT1();
      this.IsNeedRefreshTeamList = false;
    }
  }
  xcl() {
    var i;
    this.Dcl = ModelManager_1.ModelManager.RoleModel.GetRoleSkillDescType();
    if (this.Dcl === 1) {
      i = ModelManager_1.ModelManager.RoleModel.IsShowMultiSkillDesc ? 1 : 0;
      this.GetExtendToggle(22).SetToggleState(i);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(25), "MultiplayerSkillDescription_text");
    } else {
      i = ModelManager_1.ModelManager.RoleModel.IsShowSkillResume ? 1 : 0;
      this.GetExtendToggle(22).SetToggleState(i);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(25), "SkillBriefDescription_text");
    }
  }
  async d1m() {
    this.szd = new HonamiStoryRoleInfoPanel_1.HonamiStoryRoleInfoPanel();
    await this.szd.CreateThenShowByResourceIdAsync("PnlHonamiStorySVInfo", this.GetItem(28));
    await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync("UiItem_HonamiStoryBg1", this.GetItem(26));
  }
  OnBeforeDestroy() {
    this.Pe?.OnHideFinishCallBack?.();
    this.adi?.Destroy();
    this.Pe = undefined;
    this.CurSelectRole = undefined;
    this.adi?.Destroy();
    this.adi = undefined;
    this.Flo?.ClearGridProxies();
    this.Flo = undefined;
    this.Vlo?.splice(0, this.Vlo.length);
    this.Vlo = undefined;
    this.Qlo?.Destroy();
    this.Qlo = undefined;
    this.Xlo?.Destroy();
    this.Xlo = undefined;
    this.jlo?.ClearChildren();
    this.jlo = undefined;
    this.Wlo?.splice(0, this.Wlo.length);
    this.Wlo = undefined;
    this.Klo?.ClearChildren();
    this.Klo = undefined;
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData, this.C4t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoleRefreshAttribute, this.o1o);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRevive, this.o1o);
    var i = CommonParamById_1.configCommonParamById.GetFloatConfig("TermExplanationViewOffsetOnTeamView") ?? 0;
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlink(this.GetText(18), 1, 6, 1, undefined, undefined, [i, 0]);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData, this.C4t);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleRefreshAttribute, this.o1o);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRevive, this.o1o);
    ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(this.GetText(18));
  }
  zlo() {
    this.Zlo();
    var i = this.Vlo.indexOf(this.CurSelectRole);
    this.Flo.SelectGridProxy(i);
    var i = this.CurSelectRole.GetDataId();
    ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.add(i);
    this.e1o(i);
    this.F8t(i);
    this.U5t(i);
  }
  RefreshTeamItem(t) {
    if (t) {
      this.Qlo.SetActive(true);
      this.Xlo.SetActive(true);
      this.Qlo.IsSet = false;
      this.Xlo.IsSet = false;
      for (let i = 1; i <= SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; i++) {
        var e = t[i - 1];
        if (!!e?.HasRole && !e.GetRoleData.IsSelf) {
          if (this.Qlo.IsSet) {
            if (!this.Xlo.IsSet) {
              this.Xlo.SetRoleId(e.GetRoleData.ConfigId);
              this.Xlo.SetTeamNumber(e.GetRoleData.OnlineIndex);
              this.Xlo.RefreshItem();
            }
          } else {
            this.Qlo.SetRoleId(e.GetRoleData.ConfigId);
            this.Qlo.SetTeamNumber(e.GetRoleData.OnlineIndex);
            this.Qlo.RefreshItem();
          }
        }
      }
      this.Qlo.SetActive(this.Qlo.IsSet);
      this.Xlo.SetActive(this.Xlo.IsSet);
    } else {
      this.Qlo.SetActive(false);
      this.Xlo.SetActive(false);
    }
  }
  e1o(i) {
    var i = this.Pe?.GetConfirmButtonTextCallBack?.(i);
    if (i) {
      i = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(i);
      this.GetText(2).ShowTextNew(i);
    }
  }
  OBm() {
    var i;
    var t;
    if (this.Pe?.ForFunction === 1) {
      i = HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon();
      t = ModelManager_1.ModelManager.FunctionModel.IsOpen(10111);
      this.GetButton(3).RootUIComp.SetUIActive(!i && t);
    } else {
      this.GetButton(3).RootUIComp.SetUIActive(true);
    }
  }
  iGm() {
    if (this.Pe?.ForFunction === 1) {
      this.GetButton(9).RootUIComp.SetUIActive(false);
    } else {
      this.GetButton(9).RootUIComp.SetUIActive(true);
    }
  }
  juf() {
    var i = this.Pe?.ShowLockPanel?.(this.CurSelectRole.GetDataId()) ?? false;
    this.wVl.SetActive(i);
    if (i) {
      i = this.Pe?.GetLockTextCallBack?.(this.CurSelectRole.GetDataId()) ?? "";
      this.wVl.SetTextByTextId(i);
    }
  }
  F8t(i) {
    if (this.Pe?.GetConfirmButtonEnableCallBack) {
      i = this.Pe.GetConfirmButtonEnableCallBack(i);
      this.GetInteractionGroup(0)?.SetInteractable(i);
    }
  }
  U5t(i) {
    if (this.SPe?.GetCurrentSequence() === "Switch") {
      this.SPe.ReplaySequenceByKey("Switch");
    } else {
      this.SPe?.PlayLevelSequenceByName("Switch");
    }
    var e = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinDataByRoleId(i);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), e.GetName());
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i);
    if (e) {
      if (this.Pe?.ForFunction === 1) {
        this.szd?.SetData(e.Id);
      }
      if (this.CurSelectRole && this.CurSelectRole.IsTrialRole()) {
        s = this.CurSelectRole?.GetTrialRoleId();
        this.tUf(s);
      } else {
        this.ZDf?.SetUiActive(false);
      }
      var s = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(e.SkillId);
      if (s) {
        let t = undefined;
        var i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(i);
        if (i) {
          const r = i.GetSkillData();
          if (r && r.HasAnySkillUpgrade()) {
            t = Array.from(s);
            for (let i = 0; i < t.length; i++) {
              var h = t[i].Id;
              var h = r.GetSkillIdAfterUpgrade(h);
              if (h > 0) {
                t[i] = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(h);
              }
            }
          }
        }
        t = t || s;
        const r = new Array();
        if (this.Pe?.GetCustomSkillShowData) {
          r.push(...this.Pe.GetCustomSkillShowData(this.CurSelectRole.GetRoleId()));
        } else {
          for (const n of CommonParamById_1.configCommonParamById.GetIntArrayConfig("DisplaySkillTypes")) {
            for (const a of t) {
              if (a.SkillType === n) {
                var o = new TeamRoleSkillItem_1.TeamRoleSkillData();
                o.SkillIcon = a.Icon;
                o.SkillType = n;
                o.SkillName = a.SkillName;
                o.SkillTagList = a.SkillTagList;
                o.SkillDesc = a.SkillDescribe;
                o.SkillDescNum = a.SkillDetailNum;
                o.MultiSkillDesc = a.MultiSkillDescribe;
                o.MultiSkillDescNum = a.MultiSkillDetailNum;
                o.SkillResume = a.SkillResume;
                o.SkillResumeNum = a.SkillResumeNum;
                r.push(o);
                break;
              }
            }
          }
        }
        if (!(r.length <= 0)) {
          this.Wlo = r;
          this.jlo.DeselectCurrentGridProxy();
          this.jlo.RefreshByData(r, () => {
            this.jlo.SelectGridProxy(0);
            this.i1o(1, r[0]);
          });
          s = (i = ModelManager_1.ModelManager.RoleModel.GetRoleTagByRoleInfo(e)) !== undefined && i.length > 0;
          this.GetMultiTemplateLayout(16).RootUIComp.SetUIActive(s);
          if (s) {
            this.Klo?.RefreshByData(i);
          }
          this.OBm();
          this.iGm();
          this.juf();
        }
      }
    }
  }
  Jlo(i) {
    let t = "";
    let e = [];
    e = this.Dcl === 1 ? ModelManager_1.ModelManager.RoleModel.IsShowMultiSkillDesc && i.MultiSkillDesc !== StringUtils_1.EMPTY_STRING ? (t = i.MultiSkillDesc, i.MultiSkillDescNum) : (t = i.SkillDesc, i.SkillDescNum) : ModelManager_1.ModelManager.RoleModel.IsShowSkillResume && i.SkillResume !== StringUtils_1.EMPTY_STRING ? (t = i.SkillResume, i.SkillResumeNum) : (t = i.SkillDesc, i.SkillDescNum);
    let s = "";
    if (StringUtils_1.StringUtils.IsEmpty(i.SkillTypeText)) {
      if (h = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTypeNameLocalText(i.SkillType)) {
        s = h;
      }
    } else {
      s = i.SkillTypeText;
    }
    var h = this.Pe?.ForFunction === 1;
    if (h) {
      this.szd?.RefreshSkillInfo(i.SkillName, t, s, e);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), i.SkillName);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(18), t, ...e);
      this.GetText(12).SetText(s);
    }
  }
  Zlo() {
    var i;
    var t;
    var e = this.GetText(6);
    if (!ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation() && !ControllerHolder_1.ControllerHolder.LordGymController.IsInLordGymDungeon() && (i = this.CurSelectRole.GetDataId(), t = this.Vlo.indexOf(this.CurSelectRole), this.Flo.RefreshGridProxy(t), this.Pe?.IsNeedRevive?.(i))) {
      e.SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalText(e, "EditBattleTeamNeedRevive");
    } else {
      e.SetUIActive(false);
    }
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    var t = i[0];
    if (t === "Dream") {
      if (this.jlo === undefined || this.Wlo === undefined || (e = this.jlo.GetItemByIndex(this.Wlo.length - 1)) === undefined) {
        return undefined;
      } else {
        return [e, e];
      }
    }
    if (t === "Trial") {
      const s = Number(i[1]);
      var e = this.Vlo?.findIndex(i => {
        return !!i.IsTrialRole() && ConfigManager_1.ConfigManager.TrialRoleConfig?.GetTrialRoleConfig(i.GetRoleId())?.GroupId === s;
      });
      if (e !== undefined && e >= 0) {
        if (t = this.Flo?.GetGrid(e)) {
          return [t, t];
        } else {
          return undefined;
        }
      }
    }
    e = Number(i[0]);
    if (e !== 0) {
      t = this.r1o(e);
      if (t) {
        return [t, t];
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Guide", 53, "聚焦引导extraParam项配置有误", ["configParams", i]);
    }
  }
  r1o(t) {
    let e = 0;
    let s = undefined;
    this.Vlo?.forEach(i => i.GetRoleId() === t && (e = this.Vlo.indexOf(i), s = this.Flo?.GetGrid(e), true));
    TimerSystem_1.GameplayTimerSystem.Next(() => {
      this.Flo.ScrollToGridIndex(e, false);
    });
    return s;
  }
  async eUf() {
    this.ZDf = new RoleTrialLabelItem_1.RoleTrialLabelItem();
    await this.ZDf.CreateThenShowByActorAsync(this.GetItem(30).GetOwner());
  }
  tUf(i) {
    if (!RoleUtils_1.RoleUtils.IsTrialRole(i) || RoleUtils_1.RoleUtils.GetTrialRoleType(i) === 0) {
      this.ZDf?.SetUiActive(false);
    } else {
      this.ZDf?.SetUiActive(true);
      this.ZDf?.Refresh(i);
    }
  }
}
exports.TeamRoleSelectView = TeamRoleSelectView;
//# sourceMappingURL=TeamRoleSelectView.js.map