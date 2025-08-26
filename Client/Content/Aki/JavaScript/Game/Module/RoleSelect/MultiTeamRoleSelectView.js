"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiTeamRoleSelectView = exports.MultiTeamRoleSelectData = exports.MultiTeamRoleData = exports.MultiTeamRoleGridData = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem");
const UiModel_1 = require("../../Ui/UiModel");
const FilterSortEntrance_1 = require("../Common/FilterSort/FilterSortEntrance");
const LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const RoleDefine_1 = require("../RoleUi/RoleDefine");
const RoleTagMediumIconItem_1 = require("../RoleUi/RoleTag/RoleTagMediumIconItem");
const GenericLayout_1 = require("../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../Util/LguiUtil");
const MultiTeamRoleGrid_1 = require("./MultiTeamRoleGrid");
const TeamRoleSkillItem_1 = require("./TeamRoleSkillItem");
const displaySkillTypes = [11, 2, 3, 6];
class MultiTeamRoleGridData {
  constructor() {
    this.BB_ = undefined;
    this.kB_ = false;
    this.qB_ = false;
    this.Rjt = false;
    this.WQ1 = false;
  }
  GetRole() {
    return this.BB_;
  }
  GetIsRecommend() {
    return this.kB_;
  }
  GetIsHighlight() {
    return this.qB_;
  }
  GetIsLock() {
    return this.Rjt;
  }
  GetIsUnRecommend() {
    return this.WQ1;
  }
  static Phrase(t, e, i, s = false, r = false) {
    var h = new MultiTeamRoleGridData();
    h.BB_ = t;
    h.kB_ = e;
    h.qB_ = i;
    h.Rjt = s;
    h.WQ1 = r;
    return h;
  }
}
exports.MultiTeamRoleGridData = MultiTeamRoleGridData;
class MultiTeamRoleData {
  constructor() {
    this.O_l = "";
    this.OB_ = [];
    this.GB_ = [];
    this.FB_ = [];
  }
  GetTitle() {
    return this.O_l;
  }
  GetSourceRoleList() {
    var t = [];
    for (const i of this.OB_) {
      var e = i.GetRole();
      if (e) {
        t.push(e);
      }
    }
    return t;
  }
  SetSortedRoleList(t) {
    if (t) {
      this.FB_ = t;
      this.GB_ = [];
      for (const i of this.OB_) {
        var e = i.GetRole();
        if (e && this.FB_.includes(e)) {
          this.GB_.push(i);
        }
      }
      this.GB_.sort((t, e) => this.FB_.indexOf(t.GetRole()) - this.FB_.indexOf(e.GetRole()));
    } else {
      this.GB_ = [];
      for (const s of this.OB_) {
        if (s.GetRole()) {
          this.GB_.push(s);
        }
      }
    }
  }
  GetShowMultiTeamRoleGridDataList() {
    return this.GB_;
  }
  static Phrase(t, e) {
    var i = new MultiTeamRoleData();
    i.O_l = t;
    i.OB_ = e;
    i.SetSortedRoleList(undefined);
    return i;
  }
}
exports.MultiTeamRoleData = MultiTeamRoleData;
class MultiTeamRoleSelectData {
  constructor() {
    this.UseWay = undefined;
    this.BackCallBack = undefined;
    this.CanConfirmFunc = undefined;
    this.ConfirmCallBack = undefined;
    this.IsNeedRevive = undefined;
    this.IfCanSelectCheck = undefined;
    this.TeamLength = 0;
    this.InitSelectRoleList = [];
    this.NB_ = [];
    this.UnRecommendRole = [];
    this.Tips = "";
  }
  GetSourceRoleList() {
    var t = [];
    for (const e of this.NB_) {
      t.push(...e.GetSourceRoleList());
    }
    return t;
  }
  GetMultiTeamRoleDataList() {
    return this.NB_;
  }
  static Phrase(t, e, i, s, r, h, o, a, l = [], n = "") {
    var _ = new MultiTeamRoleSelectData();
    _.UseWay = t;
    _.TeamLength = e;
    _.InitSelectRoleList.push(...i);
    _.BackCallBack = s;
    _.CanConfirmFunc = r;
    _.ConfirmCallBack = h;
    _.IsNeedRevive = o;
    _.NB_.push(...a);
    _.UnRecommendRole = l;
    _.Tips = n;
    return _;
  }
}
exports.MultiTeamRoleSelectData = MultiTeamRoleSelectData;
class MultiTeamRoleSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.CurrentSelectRoleId = 0;
    this.OO_ = 0;
    this.VB_ = [];
    this.Pe = undefined;
    this.CaptionItem = undefined;
    this.Klo = undefined;
    this.jlo = undefined;
    this.tFe = undefined;
    this.adi = undefined;
    this.Wlo = undefined;
    this.Dcl = 0;
    this.SPe = undefined;
    this.jB_ = [];
    this.s6_ = false;
    this.HB_ = () => {
      return new MultiTeamRoleGrid_1.MultiTeamRoleGrid();
    };
    this.t1o = () => {
      var t = new TeamRoleSkillItem_1.TeamRoleSkillItem();
      t.BindOnSkillStateChange(this.i1o);
      return t;
    };
    this.Acl = t => {
      if (this.Dcl === 1) {
        ModelManager_1.ModelManager.RoleModel.IsShowMultiSkillDesc = t;
      } else {
        ModelManager_1.ModelManager.RoleModel.IsShowSkillResume = t;
      }
      t = this.jlo.GetSelectedGridIndex();
      if (!!this.Wlo && !(t < 0) && !(this.Wlo.length < t)) {
        this.Jlo(this.Wlo[t]);
      }
    };
    this.lZ1 = () => {
      var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(320);
      t.FunctionMap.set(0, () => {
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(t);
    };
    this.qAt = () => {
      var t = this.Pe?.CanConfirmFunc;
      if (!t || !!t(this.VB_)) {
        this.Pe?.ConfirmCallBack?.(this.VB_);
        this.CloseMe();
      }
    };
    this.BackClick = () => {
      this.Pe?.BackCallBack?.();
      this.CloseMe();
    };
    this.i1o = (t, e) => {
      if (t === 1 && this.Wlo) {
        t = this.Wlo.indexOf(e);
        this.jlo.SelectGridProxy(t);
        this.Jlo(e);
      }
    };
    this.$lo = () => {
      var t = this.OO_;
      var e = t >= RoleDefine_1.ROBOT_DATA_MIN_ID ? [t] : ModelManager_1.ModelManager.RoleModel.GetRoleIdList();
      ControllerHolder_1.ControllerHolder.RoleController.OpenRoleMainView(0, t, e, undefined, t => {
        if (t) {
          EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleChangeEnd, this.Ylo);
          EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
        }
      });
    };
    this.$Ge = t => {
      if (t === "RoleRootView" && (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CloseView, this.$Ge) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge), EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnRoleChangeEnd, this.Ylo))) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleChangeEnd, this.Ylo);
      }
    };
    this.Ylo = () => {
      this.CloseMe();
    };
    this.Hlo = (t, e, i) => {
      var s = this.Pe.GetMultiTeamRoleDataList();
      this.jB_ = t;
      for (const r of s) {
        r.SetSortedRoleList(this.jB_);
      }
      this.$B_();
      this.WB_();
      this.QB_();
      this.KB_();
    };
    this.XB_ = t => {
      var e = t.Data.GetRole().GetDataId();
      var t = this.VB_.indexOf(e);
      this.OO_ = e;
      if (this.VB_.includes(e)) {
        this.VB_[t] = 0;
        this.CurrentSelectRoleId = t > 0 ? this.VB_[t - 1] : 0;
      } else {
        for (let t = 0; t < this.VB_.length; t++) {
          if (this.VB_[t] === 0) {
            this.VB_[t] = e;
            break;
          }
        }
        this.CurrentSelectRoleId = e;
      }
      this.QB_();
      this.KB_();
    };
    this.YB_ = (t, e, i) => {
      var t = t.GetRole().GetDataId();
      var s = this.Pe?.IfCanSelectCheck;
      return (!s || !!s(t, this.VB_)) && (!!this.VB_.includes(t) || !(this.VB_.filter(t => t !== 0).length >= this.Pe.TeamLength) || !(ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("BossRushMaxLength"), 1));
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIMultiTemplateLayout], [6, UE.UIItem], [7, UE.UIHorizontalLayout], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIText], [12, UE.UIText], [13, UE.UIItem], [14, UE.UIButtonComponent], [15, UE.UIButtonComponent], [16, UE.UIText], [17, UE.UIItem], [18, UE.UIExtendToggle], [19, UE.UIText], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UIItem], [23, UE.UIItem], [24, UE.UIButtonComponent], [25, UE.UIText]];
    this.BtnBindInfo = [[14, this.qAt], [15, this.$lo], [18, this.Acl], [24, this.lZ1]];
  }
  async OnBeforeStartAsync() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.Pe = this.OpenParam;
    var t = [];
    for (const i of this.Pe.GetSourceRoleList()) {
      if (i.GetDataId() > RoleDefine_1.ROBOT_DATA_MIN_ID) {
        t.push(i.GetDataId());
      }
    }
    var e = [];
    if (t.length > 0) {
      e.push(ControllerHolder_1.ControllerHolder.RoleController.RobotRolePropRequest(t));
    }
    this.tFe = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.HB_);
    await Promise.all(e);
    this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.CaptionItem.SetCloseCallBack(() => {
      this.BackClick();
    });
    this.Klo = new GenericLayout_1.GenericLayout(this.GetMultiTemplateLayout(5), () => new RoleTagMediumIconItem_1.RoleTagMediumIconItem());
    this.jlo = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(7), this.t1o);
    var e = this.GetItem(13);
    this.adi = new FilterSortEntrance_1.FilterSortEntrance(e, this.Hlo);
    this.xcl();
    for (let t = 0; t < this.Pe.TeamLength; t++) {
      this.VB_.push(0);
      if (this.Pe.InitSelectRoleList.length > t) {
        this.VB_[t] = this.Pe.InitSelectRoleList[t];
      }
    }
    e = UiModel_1.UiModel.NormalStack.Peek();
    if (e) {
      e.AddChild(this);
    }
  }
  OnStart() {
    if (this.Pe?.Tips) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(25), this.Pe?.Tips);
    }
  }
  xcl() {
    var t;
    this.Dcl = ModelManager_1.ModelManager.RoleModel.GetRoleSkillDescType();
    if (this.Dcl === 1) {
      t = ModelManager_1.ModelManager.RoleModel.IsShowMultiSkillDesc ? 1 : 0;
      this.GetExtendToggle(18).SetToggleState(t);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(19), "MultiplayerSkillDescription_text");
    } else {
      t = ModelManager_1.ModelManager.RoleModel.IsShowSkillResume ? 1 : 0;
      this.GetExtendToggle(18).SetToggleState(t);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(19), "SkillBriefDescription_text");
    }
  }
  KB_() {
    var t;
    var e = this.Pe.GetMultiTeamRoleDataList();
    var i = new Array();
    for (const s of e) {
      if (s.GetShowMultiTeamRoleGridDataList().length !== 0) {
        (t = new MultiTeamRoleGrid_1.MultiTeamRoleGridContentData()).Data = s;
        t.CurrentSelectedRoleList = this.VB_;
        t.OnToggleCallBack = this.XB_;
        t.CanExecuteChangeCallBack = this.YB_;
        t.ShowGridAnimation = this.s6_;
        i.push(t);
      }
    }
    this.tFe?.RefreshByData(i);
    this.s6_ = false;
  }
  OnBeforeShow() {
    this.s6_ = true;
    this.adi?.UpdateData(this.Pe.UseWay, this.Pe.GetSourceRoleList());
  }
  QB_() {
    let t = 0;
    if (this.jB_.length !== 0) {
      t = this.OO_;
    }
    this.Zlo(t);
    this.U5t(t);
    this.zB_(t);
    this.JB_(t);
    this.ZB_(t);
    this.ek_(t);
    this.jFi(t);
  }
  zB_(t) {
    t = t !== 0;
    this.GetItem(3).SetUIActive(t);
  }
  ZB_(t) {
    t = t !== 0;
    this.GetButton(15).RootUIComp.SetUIActive(t);
  }
  JB_(t) {
    t = t !== 0;
    this.GetItem(9).SetUIActive(t);
  }
  $B_() {
    var t = this.jB_.length === 0;
    this.GetItem(17).SetUIActive(t);
  }
  WB_() {
    var t = this.jB_.length > 0;
    this.GetItem(20).SetUIActive(t);
  }
  ek_(t) {
    t = this.jB_.length > 0 && t === 0;
    this.GetItem(21).SetUIActive(t);
  }
  jFi(t) {
    t = t !== 0;
    this.GetItem(22).SetUIActive(t);
  }
  U5t(t) {
    if (this.SPe?.GetCurrentSequence() === "Switch") {
      this.SPe.ReplaySequenceByKey("Switch");
    } else {
      this.SPe?.PlayLevelSequenceByName("Switch");
    }
    this.tje(t);
    this.tk_(t);
    this.ik_(t);
    this.QQ1(t);
  }
  tje(t) {
    if (t !== 0) {
      t = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinDataByRoleId(t);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t.GetName());
    }
  }
  tk_(t) {
    if (t !== 0) {
      var i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t);
      if (i) {
        i = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(i.SkillId);
        if (i) {
          let e = undefined;
          t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t);
          if (t) {
            const h = t.GetSkillData();
            if (h && h.HasAnySkillUpgrade()) {
              e = Array.from(i);
              for (let t = 0; t < e.length; t++) {
                var s = e[t].Id;
                var s = h.GetSkillIdAfterUpgrade(s);
                if (s > 0) {
                  e[t] = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(s);
                }
              }
            }
          }
          e = e || i;
          const h = new Array();
          for (const o of displaySkillTypes) {
            for (const a of e) {
              if (a.SkillType === o) {
                var r = new TeamRoleSkillItem_1.TeamRoleSkillData();
                r.SkillIcon = a.Icon;
                r.SkillType = o;
                r.SkillName = a.SkillName;
                r.SkillTagList = a.SkillTagList;
                r.SkillDesc = a.SkillDescribe;
                r.SkillDescNum = a.SkillDetailNum;
                r.MultiSkillDesc = a.MultiSkillDescribe;
                r.MultiSkillDescNum = a.MultiSkillDetailNum;
                r.SkillResume = a.SkillResume;
                r.SkillResumeNum = a.SkillResumeNum;
                h.push(r);
                break;
              }
            }
          }
          if (!(h.length <= 0)) {
            this.Wlo = h;
            this.jlo.DeselectCurrentGridProxy();
            this.jlo.RefreshByData(h, () => {
              this.jlo.SelectGridProxy(0);
              this.i1o(1, h[0]);
            });
          }
        }
      }
    }
  }
  ik_(t) {
    var e;
    if (t !== 0 && (t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t)) && (t = (e = ModelManager_1.ModelManager.RoleModel.GetRoleTagByRoleInfo(t)) !== undefined && e.length > 0, this.GetMultiTemplateLayout(5).RootUIComp.SetUIActive(t), t)) {
      this.Klo?.RefreshByData(e);
    }
  }
  QQ1(t) {
    if (t !== 0) {
      this.GetItem(23).SetUIActive(this.Pe?.UnRecommendRole.includes(t) ?? false);
    }
  }
  Zlo(t) {
    var e = this.GetText(16);
    if (!ModelManager_1.ModelManager.TowerModel.IsOpenFloorFormation() && this.Pe?.IsNeedRevive?.(t)) {
      e.SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalText(e, "EditBattleTeamNeedRevive");
    } else {
      e.SetUIActive(false);
    }
  }
  Jlo(t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), t.SkillName);
    var e = this.GetText(12);
    if (this.Dcl === 1) {
      if (ModelManager_1.ModelManager.RoleModel.IsShowMultiSkillDesc && t.MultiSkillDesc !== StringUtils_1.EMPTY_STRING) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, t.MultiSkillDesc, ...t.MultiSkillDescNum);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, t.SkillDesc, ...t.SkillDescNum);
      }
    } else if (ModelManager_1.ModelManager.RoleModel.IsShowSkillResume && t.SkillResume !== StringUtils_1.EMPTY_STRING) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, t.SkillResume, ...t.SkillResumeNum);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, t.SkillDesc, ...t.SkillDescNum);
    }
    if (StringUtils_1.StringUtils.IsEmpty(t.SkillTypeText)) {
      if (e = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTypeNameLocalText(t.SkillType)) {
        this.GetText(11).SetText(e);
      }
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), t.SkillTypeText);
    }
  }
}
exports.MultiTeamRoleSelectView = MultiTeamRoleSelectView;
//# sourceMappingURL=MultiTeamRoleSelectView.js.map