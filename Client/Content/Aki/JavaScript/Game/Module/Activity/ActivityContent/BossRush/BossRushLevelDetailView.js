"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuffEntry = exports.BossRushTeamRoleItem = exports.TeamItem = exports.BossRushLevelDetailView = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const CommonSelectItem_1 = require("../../../Roguelike/View/CommonSelectItem");
const MultiTeamRoleSelectView_1 = require("../../../RoleSelect/MultiTeamRoleSelectView");
const TeamRoleSelectView_1 = require("../../../RoleSelect/TeamRoleSelectView");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const BossRushController_1 = require("./BossRushController");
class BossRushLevelDetailView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.aSn = undefined;
    this.d8t = undefined;
    this.FSn = undefined;
    this.VSn = undefined;
    this.SPe = undefined;
    this.HSn = [];
    this.pcr = () => {
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId = this.aSn.GetCurrentSelectLevel().GetInstanceDungeonId();
      UiManager_1.UiManager.OpenView("InstanceDungeonMonsterPreView", this.aSn?.GetCurrentSelectLevel()?.GetInstanceDungeonId());
    };
    this.sOt = () => {
      var t = this.aSn.LevelInfo.GetInstanceDungeonFormationNumb();
      let i = 0;
      this.aSn?.GetCurrentTeamMembers().forEach(e => {
        if (e !== 0) {
          i++;
        }
      });
      if (i === 0) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("BossRushAtlestOneRole");
      } else {
        let e = 0;
        for (const s of this.HSn) {
          if (s.HaveBuff()) {
            e++;
          }
        }
        if (e < 2) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("BossRushBuffCountTips");
        } else if (t > i) {
          (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(188)).FunctionMap.set(2, () => {
            BossRushController_1.BossRushController.RequestStartBossRushByTeamData(this.aSn);
          });
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
        } else {
          BossRushController_1.BossRushController.RequestStartBossRushByTeamData(this.aSn);
        }
      }
    };
    this.Xho = () => {
      this.QSn();
    };
    this.Ylo = () => {
      var t = ModelManager_1.ModelManager.RoleModel;
      var i = this.aSn.GetCurrentTeamMembers();
      for (let e = 0; e < i.length; e++) {
        var s = i[e];
        var s = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(s)?.GetRoleId() ?? 0;
        if (t.IsMainRole(s)) {
          this.aSn.SetIndexTeamMembers(e, 0);
        }
      }
      this.XSn();
    };
    this.XSn = () => {
      this.$Sn();
      this.YSn();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIButtonComponent], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIButtonComponent], [8, UE.UIText], [9, UE.UIItem]];
    this.BtnBindInfo = [[1, this.pcr], [7, this.sOt]];
  }
  async OnBeforeStartAsync() {
    this.d8t = new TeamItem();
    this.d8t.BindOnSelectRoleCall(() => {
      this.XSn();
    });
    await this.d8t.CreateByActorAsync(this.GetItem(5).GetOwner());
    this.d8t.SetActive(true);
    this.FSn = new BuffEntry();
    await this.FSn.CreateByActorAsync(this.GetItem(3).GetOwner());
    this.VSn = new BuffEntry();
    await this.VSn.CreateByActorAsync(this.GetItem(4).GetOwner());
    this.HSn.push(this.FSn);
    this.HSn.push(this.VSn);
    for (const e of this.HSn) {
      e.SlotIndex = this.HSn.indexOf(e) + 1;
      e.SetActive(true);
    }
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  ROn() {
    let e = "Start";
    if (ModelManager_1.ModelManager.BossRushModel.PlayBackAnimation) {
      e = "ShowView";
    }
    this.SPe?.PlaySequencePurely(e);
    ModelManager_1.ModelManager.BossRushModel.PlayBackAnimation = false;
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeBossRushBuff, this.Xho);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleChangeEnd, this.Ylo);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeBossRushBuff, this.Xho);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleChangeEnd, this.Ylo);
  }
  OnBeforeShow() {
    this.aSn = ModelManager_1.ModelManager.BossRushModel.CurrentTeamInfo;
    for (const e of this.aSn.GetCurrentTeamMembers()) {
      if (ModelManager_1.ModelManager.RoleModel.IsMainRole(e) && !ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e)) {
        this.aSn.ClearTeamInfo();
        break;
      }
    }
    this.ROn();
    this.zSn();
    this.eyn();
    this.l3e();
    this.$Sn();
    this.G8t();
    this.QSn();
  }
  $Sn() {
    var e = this.aSn.GetIfLevelTooLow();
    this.GetText(6).SetUIActive(e);
  }
  zSn() {
    var e = this.aSn.GetCurrentSelectLevel();
    this.SetTextureByPath(e.GetBigMonsterTexturePath(), this.GetTexture(0), "BossRushMainView");
  }
  eyn() {
    var e = this.aSn?.GetCurrentSelectLevel()?.GetConfig()?.BossCount;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "BossRushNumTips", e);
  }
  l3e() {
    var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(ModelManager_1.ModelManager.BossRushModel.CurrentSelectActivityId).GetBossRushLevelDetailInfoById(this.aSn.GetCurrentSelectLevel().GetInstanceDungeonId())?.GetScore();
    var t = this.GetText(8);
    if (e && e > 0) {
      t?.SetUIActive(true);
      t?.SetText("" + e);
      this.GetItem(9)?.SetUIActive(false);
    } else {
      t?.SetUIActive(false);
      this.GetItem(9)?.SetUIActive(true);
    }
  }
  G8t() {
    this.d8t.Refresh(this.aSn);
  }
  YSn() {
    this.d8t.RefreshTeamRole(this.aSn);
  }
  QSn() {
    var t = ModelManager_1.ModelManager.BossRushModel.CurrentSelectBuffTabName === 0 ? this.aSn.GetPrepareSelectBuff() : this.aSn.GetPrepareSelectScoreBuff();
    for (let e = 0; e < t.length; e++) {
      if (e < this.HSn.length) {
        this.HSn[e].Refresh(t[e]);
      }
    }
  }
}
exports.BossRushLevelDetailView = BossRushLevelDetailView;
class TeamItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.NSn = undefined;
    this.OSn = undefined;
    this.kSn = [];
    this.wB_ = () => {};
    this.CurrentTeamData = undefined;
    this.jSn = undefined;
    this.nqe = () => {
      UiManager_1.UiManager.OpenView("MultiTeamRoleSelectView", this.RB_());
    };
    this.nG_ = (e, i) => {
      if (!i.includes(e)) {
        var s = this.CurrentTeamData.LevelInfo?.GetInstanceDungeonConfig().FightFormationId;
        let t = e;
        for (const h of ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(s).TrialRole) {
          var r = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfigByGroupId(h);
          if (r?.Id === e) {
            t = r.ParentId;
            break;
          }
        }
        if (t !== e && i.includes(t)) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("BossRushSameFormation");
          return false;
        }
        for (const a of i) {
          let e = a;
          var o = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfigByGroupId(a);
          if ((e = o ? o.ParentId : e) === t) {
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("BossRushSameFormation");
            return false;
          }
        }
      }
      return true;
    };
    this.KSn = () => new BossRushTeamRoleItem();
    this.XSn = () => {
      this.wB_();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIHorizontalLayout], [6, UE.UIItem]];
    this.BtnBindInfo = [[0, this.nqe]];
  }
  RB_() {
    var e;
    var t = [];
    for (const a of ModelManager_1.ModelManager.RoleModel.GetRoleList()) {
      if (a.GetRoleId() !== 0) {
        e = MultiTeamRoleSelectView_1.MultiTeamRoleGridData.Phrase(a, false, false);
        t.push(e);
      }
    }
    var i = [];
    var s = this.CurrentTeamData.LevelInfo?.GetInstanceDungeonConfig().FightFormationId;
    for (const n of ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(s).TrialRole) {
      var r = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfigByGroupId(n);
      var r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(r.Id);
      if (r) {
        i.push(MultiTeamRoleSelectView_1.MultiTeamRoleGridData.Phrase(r, false, false));
      }
    }
    var s = MultiTeamRoleSelectView_1.MultiTeamRoleData.Phrase("BossRushNormalRole", t);
    var o = new Array();
    if (i.length > 0) {
      h = MultiTeamRoleSelectView_1.MultiTeamRoleData.Phrase("BossRushTrailRole", i);
      o.push(h);
    }
    o.push(s);
    var h = MultiTeamRoleSelectView_1.MultiTeamRoleSelectData.Phrase(5, 3, this.CurrentTeamData.GetCurrentTeamMembers(), undefined, undefined, t => {
      for (let e = 0; e < t.length; e++) {
        var i = t[e];
        this.CurrentTeamData.SetIndexTeamMembers(e, i);
      }
      this.CurrentTeamData.ReSortTeamMembers();
      this.Refresh(this.CurrentTeamData);
      this.wB_();
    }, undefined, o);
    h.IfCanSelectCheck = this.nG_;
    return h;
  }
  BindOnSelectRoleCall(e) {
    this.wB_ = e;
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
  Refresh(e) {
    this.CurrentTeamData = e;
    this.ZSn(e);
    this.JSn(e);
    this.RefreshTeamRole(e);
    this.sDn(e);
  }
  sDn(e) {
    e = e.GetCurrentSelectLevel().GetRecommendElementIdArray().length > 0 ? "BossRushRecommendElement" : "BossRushRecommendElementNone";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e);
  }
  ZSn(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "BossRushRecommendLevel", e.GetRecommendLevel().toString());
  }
  JSn(e) {
    this.kSn.forEach(e => {
      e.SetActive(false);
    });
    var t = e.GetCurrentSelectLevel().GetRecommendElementIdArray();
    for (let e = 0; e < t.length; e++) {
      if (t[e] !== 0) {
        this.kSn[e].SetActive(true);
        this.kSn[e].Refresh(t[e], false, e);
      }
    }
  }
  RefreshTeamRole(t) {
    var e = t.GetCurrentTeamMembers();
    var i = [];
    for (i.push(...e.map(e => ({
      RoleId: e,
      TeamInfo: t,
      OnSelectRole: this.XSn
    }))); i.length < 3;) {
      i.push({
        RoleId: 0,
        TeamInfo: t,
        OnSelectRole: this.XSn
      });
    }
    this.jSn.RefreshByData(i);
  }
}
exports.TeamItem = TeamItem;
class BossRushTeamData {
  constructor() {
    this.RoleId = 0;
    this.TeamInfo = undefined;
    this.OnSelectRole = undefined;
  }
}
class BossRushTeamRoleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ayn = new BossRushTeamData();
    this.OnClickButton = () => {
      if (!UiManager_1.UiManager.IsViewShow("TeamRoleSelectView")) {
        UiManager_1.UiManager.OpenView("TeamRoleSelectView", this.D5t());
      }
    };
    this.Q4t = t => {
      var e;
      var i;
      if (t) {
        e = this.ayn.TeamInfo.GetCurrentTeamMembers()[this.GridIndex];
        i = this.ayn.TeamInfo.GetCurrentTeamMembers().findIndex(e => e === t);
        if (e === 0 && i === -1) {
          return "JoinText";
        } else if (e === t) {
          return "GoDownText";
        } else {
          return "ChangeText";
        }
      }
    };
    this.v4t = t => this.ayn.TeamInfo.GetCurrentTeamMembers().findIndex(e => e === t) === -1;
    this.aDn = t => {
      if (this.ayn.TeamInfo.GetCurrentTeamMembers()[this.GridIndex] === t) {
        return true;
      }
      var e = this.ayn.TeamInfo.GetCurrentTeamMembers().findIndex(e => e === t);
      if (e !== -1 && e !== this.GridIndex) {
        return true;
      }
      e = this.ayn.TeamInfo.LevelInfo?.GetInstanceDungeonConfig().FightFormationId;
      e = ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(e);
      let i = t;
      let s = true;
      for (const a of e.TrialRole) {
        var r = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfigByGroupId(a);
        if (r?.Id === t) {
          i = r.ParentId;
          break;
        }
      }
      var o = this.ayn.TeamInfo.GetCurrentTeamMembers();
      for (let e = 0; e < o.length; e++) {
        var h = o[e];
        if (h !== 0 && e !== this.GridIndex) {
          let e = h;
          h = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfigByGroupId(h);
          if ((e = h ? h.ParentId : e) === i) {
            s = false;
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("BossRushSameFormation");
            break;
          }
        }
      }
      return s;
    };
    this.X4t = t => {
      var e = this.ayn.TeamInfo.GetCurrentTeamMembers()[this.GridIndex];
      var i = this.ayn.TeamInfo.GetCurrentTeamMembers().findIndex(e => e === t);
      if (e === 0 && i === -1) {
        this.ayn.TeamInfo.SetIndexTeamMembers(this.GridIndex, t);
      } else if (e === t) {
        this.ayn.TeamInfo.SetIndexTeamMembers(this.GridIndex, 0);
      } else {
        this.ayn.TeamInfo.SetIndexTeamMembers(i, e);
        this.ayn.TeamInfo.SetIndexTeamMembers(this.GridIndex, t);
      }
      this.ayn.TeamInfo.ReSortTeamMembers();
      this.ayn.OnSelectRole();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UITexture]];
  }
  D5t() {
    var e = this.ayn.TeamInfo.LevelInfo?.GetInstanceDungeonConfig().FightFormationId;
    var e = ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(e);
    var t = [];
    for (const o of ModelManager_1.ModelManager.RoleModel.GetRoleList()) {
      if (o.GetRoleId() !== 0) {
        t.push(o);
      }
    }
    for (const h of e.TrialRole) {
      var i = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfigByGroupId(h);
      var i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(i.Id);
      t.push(i);
    }
    var e = this.ayn.TeamInfo.GetCurrentTeamMembers().length > this.GridIndex ? this.ayn.TeamInfo.GetCurrentTeamMembers()[this.GridIndex] : 0;
    var e = new TeamRoleSelectView_1.TeamRoleSelectViewData(5, e, t, this.X4t, undefined, this.GridIndex + 1);
    e.CanConfirmFunc = this.aDn;
    e.CanJoinTeam = this.v4t;
    e.SetGetConfirmButtonTextFunction(this.Q4t);
    var s = this.ayn.TeamInfo.GetCurrentTeamMembers();
    var r = [];
    for (const a of s) {
      if (a !== 0) {
        r.push(a);
      }
    }
    e.FormationRoleList = r;
    ModelManager_1.ModelManager.EditBattleTeamModel.SetInstanceDungeonId(this.ayn.TeamInfo.LevelInfo?.GetInstanceDungeonConfig().Id);
    return e;
  }
  Refresh(e, t, i) {
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
exports.BossRushTeamRoleItem = BossRushTeamRoleItem;
class BuffEntry extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SlotIndex = 0;
    this.tyn = undefined;
    this.iyn = () => {
      if (this.tyn?.State === Protocol_1.Aki.Protocol.Iks.Proto_BuffLocked) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("BossRushLock");
      } else if (this.tyn?.State !== Protocol_1.Aki.Protocol.Iks.Proto_BuffInactive) {
        ModelManager_1.ModelManager.BossRushModel.CurrentChangeBuffSlot = this.SlotIndex;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RequestChangeBossRushView, "BossRushBuffSelectView");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UITexture], [5, UE.UIText], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIItem]];
    this.BtnBindInfo = [[0, this.iyn], [7, this.iyn]];
  }
  Refresh(e) {
    if ((this.tyn = e).State === Protocol_1.Aki.Protocol.Iks.Proto_BuffInactive) {
      this.GetButton(0)?.SetSelfInteractive(false);
    } else {
      this.GetButton(0)?.SetSelectionState(0);
      this.GetButton(0)?.SetSelfInteractive(true);
    }
    this.oyn();
    this.ryn();
    this.bbn();
    this.qfo();
    this.Kqn();
  }
  Kqn() {
    let e = "";
    e = this.tyn.State === Protocol_1.Aki.Protocol.Iks.Proto_BuffLocked ? "BossRushLock" : this.tyn.State === Protocol_1.Aki.Protocol.Iks.Proto_BuffInactive ? "BossRushBuffDisableTips" : "BossRushBuffSelectTips";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e);
  }
  bbn() {
    this.GetItem(8).SetUIActive(this.tyn.State === Protocol_1.Aki.Protocol.Iks.Proto_BuffLocked);
  }
  qfo() {
    this.GetItem(7).SetUIActive(this.tyn.BuffId !== 0 && this.tyn.State !== Protocol_1.Aki.Protocol.Iks.Proto_BuffLocked);
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
    var e = ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushBuffConfigById(this.tyn.BuffId).Texture;
    this.SetTextureByPath(e, this.GetTexture(4));
  }
  syn() {
    var e = ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushBuffConfigById(this.tyn.BuffId);
    var t = [];
    for (const s of e.DescriptionParam) {
      var i = RegExp(/\[(.*?)\]/g).exec(s);
      if (i && i.length > 1) {
        t.push(...i[1].split(","));
      }
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e.Description, ...t);
  }
  nyn() {
    var e = ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushBuffConfigById(this.tyn.BuffId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.Name);
  }
  HaveBuff() {
    return (this.tyn?.BuffId ?? 0) > 0;
  }
}
exports.BuffEntry = BuffEntry;
//# sourceMappingURL=BossRushLevelDetailView.js.map