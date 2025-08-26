"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MowingTowerMainView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const CommonSelectItem_1 = require("../../../Roguelike/View/CommonSelectItem");
const QuickRoleSelectView_1 = require("../../../RoleSelect/QuickRoleSelectView");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const MowingTowerController_1 = require("./MowingTowerController");
const MowingTowerData_1 = require("./MowingTowerData");
const MowingTowerMainLevelItem_1 = require("./MowingTowerMainLevelItem");
const ROLE_TEAM_SIZE = 3;
class MowingTowerMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.bLl = undefined;
    this.aSn = undefined;
    this.qLl = 0;
    this.lqe = undefined;
    this.SUl = undefined;
    this.kLl = undefined;
    this.OLl = undefined;
    this.NLl = undefined;
    this.SPe = undefined;
    this.$Sn = () => {
      var e = this.aSn.GetIfLevelTooLow();
      this.GetItem(20).SetUIActive(e);
    };
    this.Xho = () => {
      this.QSn();
    };
    this.oWi = () => {
      return new MowingTowerMainLevelItem_1.MowingTowerMainLevelItem();
    };
    this.FLl = e => {
      this.qLl = e;
      this.R5e();
    };
    this.VLl = () => {
      if (!UiManager_1.UiManager.IsViewOpen("MowingTowerRewardView")) {
        UiManager_1.UiManager.OpenView("MowingTowerRewardView");
      }
    };
    this.HLl = () => {
      var e = this.aSn?.GetCurrentTeamMembers() ?? [[], []];
      if (e[0].length !== ROLE_TEAM_SIZE || e[1].length !== ROLE_TEAM_SIZE || e[0].includes(0) || e[1].includes(0)) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("MowingTowerNeedThreeRole");
      } else {
        MowingTowerController_1.MowingTowerController.RequestStartMowingTowerByTeamData(this.aSn);
      }
    };
    this.yUl = () => {
      UiManager_1.UiManager.OpenView("InstanceDungeonMonsterPreView", this.aSn?.GetCurrentSelectLevel()?.GetInstanceDungeonId());
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIText], [3, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UITexture], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIItem], [12, UE.UIText], [13, UE.UIItem], [14, UE.UIText], [15, UE.UIText], [16, UE.UIText], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIButtonComponent], [22, UE.UIItem], [23, UE.UIButtonComponent], [24, UE.UIText], [25, UE.UIItem]];
    this.BtnBindInfo = [[1, this.VLl], [21, this.HLl], [23, this.yUl]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeMowingTowerMainView, this.FLl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeMowingTowerBuff, this.Xho);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeMowingTowerMainView, this.FLl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeMowingTowerBuff, this.Xho);
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SUl = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(3), this.oWi);
    this.kLl = new BuffEntry();
    await this.kLl.CreateThenShowByActorAsync(this.GetItem(17).GetOwner());
    this.OLl = new TeamListItem();
    this.NLl = new TeamListItem();
    await this.OLl.CreateThenShowByActorAsync(this.GetItem(18).GetOwner());
    await this.NLl.CreateThenShowByActorAsync(this.GetItem(19).GetOwner());
    this.OLl.BindRefreshLowLevelTips(this.$Sn);
    this.NLl.BindRefreshLowLevelTips(this.$Sn);
  }
  OnStart() {
    ModelManager_1.ModelManager.MowingTowerModel.CurrentSelectActivityId = this.OpenParam;
    var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(ModelManager_1.ModelManager.MowingTowerModel.CurrentSelectActivityId);
    this.bLl = e;
    this.lqe.SetCloseCallBack(() => {
      if (this.qLl === 0) {
        if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
          ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon();
          return;
        } else {
          this.CloseMe();
          return;
        }
      }
      this.qLl = 0;
      this.SPe?.PlaySequencePurely("SwitchOut");
      this.R5e();
    });
    this.qLl = 0;
    this.R5e(true);
  }
  OnBeforeShow() {
    if (this.qLl === 1) {
      this.QSn();
    }
    RedDotController_1.RedDotController.BindRedDot("MowingTowerReward", this.GetItem(25), undefined, this.bLl.Id);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshMowingTowerRewardRedDot, this.bLl.Id);
  }
  OnBeforeHide() {
    RedDotController_1.RedDotController.UnBindGivenUi("MowingTowerReward", this.GetItem(25), this.bLl.Id);
  }
  jLl(e = 0) {
    this.lqe.SetTitleByTextIdAndArgNew("MowingTowerSelectViewTitle");
    this.SUl?.RefreshByData(this.bLl.GetMowingTowerLevelDetailInfo(), () => {});
    this.GetText(2)?.SetText("" + this.bLl.GetFullScore());
  }
  WLl() {
    this.lqe.SetTitleByTextIdAndArgNew("MowingTowerLevelViewTitle");
    this.aSn = ModelManager_1.ModelManager.MowingTowerModel.CurrentTeamInfo;
    this.OLl?.RefreshTeamRole(this.aSn, 0);
    this.NLl?.RefreshTeamRole(this.aSn, 1);
    var e = this.aSn.GetCurrentSelectLevel();
    this.QLl(e);
    this.KLl(e);
    this.EUl(e);
    this.QSn();
    this.$Sn();
  }
  KLl(e) {
    this.SetTextureByPath(e.GetNormalTexturePath(), this.GetTexture(6));
    var i = e.GetIsInfinite();
    if (e.GetId() % 2 == 0 || i) {
      this.GetItem(7)?.SetUIActive(false);
      this.GetItem(8)?.SetUIActive(true);
    } else {
      this.GetItem(7)?.SetUIActive(true);
      this.GetItem(8)?.SetUIActive(false);
    }
    if (i) {
      this.GetItem(9)?.SetColor(MowingTowerData_1.bgInfiniteMowingTowerColor);
      this.GetText(10)?.SetColor(MowingTowerData_1.infiniteMowingTowerColor);
      this.GetItem(7)?.SetColor(MowingTowerData_1.infiniteMowingTowerColor);
      this.GetItem(8)?.SetColor(MowingTowerData_1.infiniteMowingTowerColor);
    } else {
      this.GetItem(9)?.SetColor(MowingTowerData_1.bgNormalMowingTowerColor);
      this.GetText(10)?.SetColor(MowingTowerData_1.normalMowingTowerColor);
      this.GetItem(7)?.SetColor(MowingTowerData_1.normalMowingTowerColor);
      this.GetItem(8)?.SetColor(MowingTowerData_1.normalMowingTowerColor);
    }
  }
  QLl(e) {
    var i = e.GetScore();
    var t = i > 0;
    var s = this.GetText(12);
    s.SetUIActive(t);
    s.SetText(i.toString());
    this.GetItem(13).SetUIActive(!t);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), e.GetLevelDesc());
    this.GetText(14)?.SetText("" + e.GetFirstScore());
    this.GetText(15)?.SetText("" + e.GetLowScore());
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(16), "" + e.GetLevelTips());
  }
  QSn() {
    var e = this.aSn.GetPrepareSelectBuff();
    this.kLl?.Refresh(e[0]);
  }
  EUl(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(24), "MowingTowerMonsterTimes", e.GetConfig()?.MonsterDes);
  }
  R5e(e = false) {
    if (this.qLl === 0) {
      this.GetItem(5)?.SetUIActive(true);
      this.GetItem(22)?.SetUIActive(false);
      this.jLl(e);
    }
    if (this.qLl === 1) {
      this.SPe?.PlaySequencePurely("SwitchIn");
      this.GetItem(5)?.SetUIActive(false);
      this.GetItem(22)?.SetUIActive(true);
      this.WLl();
    }
  }
}
exports.MowingTowerMainView = MowingTowerMainView;
class BuffEntry extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SlotIndex = 0;
    this.tyn = undefined;
    this.iyn = () => {
      UiManager_1.UiManager.OpenView("MowingTowerBuffView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UITexture], [5, UE.UIText], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIItem]];
    this.BtnBindInfo = [[0, this.iyn], [7, this.iyn]];
  }
  Refresh(e) {
    this.tyn = e;
    this.GetButton(0)?.SetSelectionState(0);
    this.GetButton(0)?.SetSelfInteractive(true);
    this.oyn();
    this.ryn();
    this.bbn();
    this.qfo();
    this.Kqn();
  }
  Kqn() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "BossRushBuffSelectTips");
  }
  bbn() {
    this.GetItem(8).SetUIActive(false);
  }
  qfo() {
    this.GetItem(7).SetUIActive(this.tyn.BuffId !== 0);
  }
  oyn() {
    this.GetItem(1).SetUIActive(this.tyn.BuffId === 0);
    this.GetItem(2).SetUIActive(this.tyn.BuffId !== 0);
  }
  ryn() {
    if (this.tyn.BuffId !== 0) {
      this.nyn();
      this.syn();
      this.gSn();
    }
  }
  gSn() {
    var e = ConfigManager_1.ConfigManager.MowingTowerConfig.GetMowingTowerBuffById(this.tyn.BuffId).Texture;
    this.SetTextureByPath(e, this.GetTexture(4));
  }
  syn() {
    var e = ConfigManager_1.ConfigManager.MowingTowerConfig.GetMowingTowerBuffById(this.tyn.BuffId);
    var i = [];
    for (const s of e.DescriptionParam) {
      var t = RegExp(/\[(.*?)\]/g).exec(s);
      if (t && t.length > 1) {
        i.push(...t[1].split(","));
      }
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e.Description, ...i);
  }
  nyn() {
    var e = ConfigManager_1.ConfigManager.MowingTowerConfig.GetMowingTowerBuffById(this.tyn.BuffId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.Name);
  }
}
class TeamData {
  constructor() {
    this.RoleId = 0;
    this.TeamInfo = undefined;
    this.BelongTo = 0;
    this.OnSelectRole = undefined;
  }
}
class TeamRoleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ayn = new TeamData();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UISprite], [2, UE.UITexture]];
  }
  Refresh(e, i, t) {
    this.ayn = e;
    this.Zke();
  }
  Zke() {
    var e;
    if (this.ayn.RoleId === 0) {
      this.GetTexture(2).SetUIActive(false);
    } else {
      this.GetTexture(2).SetUIActive(true);
      e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.ayn.RoleId);
      this.SetRoleIcon(e.RoleHeadIconCircle, this.GetTexture(2), this.ayn.RoleId);
    }
  }
}
class TeamListItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.aSn = undefined;
    this.XLl = 0;
    this.NSn = undefined;
    this.OSn = undefined;
    this.kSn = [];
    this.jSn = undefined;
    this.$Sn = undefined;
    this.nqe = () => {
      if (!UiManager_1.UiManager.IsViewShow("QuickRoleSelectView")) {
        UiManager_1.UiManager.OpenView("QuickRoleSelectView", this.D5t(), (e, i) => {
          if (e) {
            UiManager_1.UiManager.GetViewByName("MowingTowerMainView")?.AddChildViewById(i);
          }
        });
      }
    };
    this.X4t = i => {
      for (let e = 0; e < ROLE_TEAM_SIZE; e++) {
        this.aSn.SetIndexTeamMembers(this.XLl, e, 0);
      }
      for (let e = 0; e < i.length; e++) {
        var t = i[e];
        this.aSn.SetIndexTeamMembers(this.XLl, e, t);
      }
      this.aSn.ReSortTeamMembers(this.XLl);
      this.XSn();
    };
    this.KSn = () => new TeamRoleItem();
    this.XSn = () => {
      this.$Sn?.();
      this.RefreshTeamRole(this.aSn, this.XLl);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIHorizontalLayout], [6, UE.UIItem]];
    this.BtnBindInfo = [[0, this.nqe]];
  }
  D5t() {
    var e = this.aSn.LevelInfo?.GetInstanceDungeonConfig(this.XLl).FightFormationId;
    var e = ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(e);
    var i = [];
    for (const h of ModelManager_1.ModelManager.RoleModel.GetRoleList()) {
      if (h.GetRoleId() !== 0) {
        i.push(h);
      }
    }
    for (const o of e.TrialRole) {
      var t = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfigByGroupId(o);
      var t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t.Id);
      i.push(t);
    }
    var e = this.aSn.GetCurrentTeamMembers();
    var s = new QuickRoleSelectView_1.QuickRoleSelectViewData(5, e[this.XLl], i);
    ModelManager_1.ModelManager.MowingTowerModel.CurrentOptionArea = this.XLl;
    ModelManager_1.ModelManager.MowingTowerModel.OtherHalfAreaRoleList = e[1 - this.XLl];
    ModelManager_1.ModelManager.MowingTowerModel.AddLevel = this.aSn.LevelInfo?.GetConfig()?.MowTowerLevel ?? [-1, -1];
    s.OnHideFinish = () => {
      ModelManager_1.ModelManager.MowingTowerModel.CurrentOptionArea = -1;
      ModelManager_1.ModelManager.MowingTowerModel.OtherHalfAreaRoleList = [];
      ModelManager_1.ModelManager.MowingTowerModel.AddLevel = [-1, -1];
    };
    s.OnConfirm = this.X4t;
    var e = e[this.XLl];
    var r = [];
    for (const n of e) {
      if (n !== 0) {
        r.push(n);
      }
    }
    s.SelectedRoleList = r;
    ModelManager_1.ModelManager.EditBattleTeamModel.SetInstanceDungeonId(this.aSn.LevelInfo?.GetInstanceDungeonConfig(this.XLl).Id);
    return s;
  }
  async OnBeforeStartAsync() {
    this.NSn = new CommonSelectItem_1.CommonElementItem();
    this.OSn = new CommonSelectItem_1.CommonElementItem();
    await this.NSn.CreateByActorAsync(this.GetItem(3).GetOwner());
    this.NSn.SetActive(true);
    await this.OSn.CreateByActorAsync(this.GetItem(4).GetOwner());
    this.OSn.SetActive(true);
    this.kSn.push(this.NSn);
    this.kSn.push(this.OSn);
    this.jSn = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(5), this.KSn);
  }
  RefreshTeamRole(i, t) {
    this.aSn = i;
    this.XLl = t;
    var e = i.GetCurrentTeamMembers()[t];
    var s = [];
    for (s.push(...e.map(e => ({
      RoleId: e,
      TeamInfo: i,
      BelongTo: t,
      OnSelectRole: this.XSn
    }))); s.length < 3;) {
      s.push({
        RoleId: 0,
        TeamInfo: i,
        BelongTo: t,
        OnSelectRole: this.XSn
      });
    }
    this.jSn.RefreshByData(s);
    this.JSn();
    this.Olt();
  }
  JSn() {
    this.kSn.forEach(e => {
      e.SetActive(false);
    });
    var i = this.aSn.GetCurrentSelectLevel().GetRecommendElementIdArray(this.XLl);
    for (let e = 0; e < i.length; e++) {
      if (i[e] !== 0) {
        this.kSn[e].SetActive(true);
        this.kSn[e].Refresh(i[e], false, e);
      }
    }
    var e = i.length > 0 ? "BossRushRecommendElement" : "BossRushRecommendElementNone";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e);
  }
  Olt() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "BossRushRecommendLevel", this.aSn.GetRecommendLevel().toString());
  }
  BindRefreshLowLevelTips(e) {
    this.$Sn = e;
  }
}
//# sourceMappingURL=MowingTowerMainView.js.map