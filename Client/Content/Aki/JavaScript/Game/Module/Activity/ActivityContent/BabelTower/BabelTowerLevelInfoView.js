"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BabelTowerLevelInfoView = void 0;
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  LoginDefine_1 = require("../../../Login/Data/LoginDefine"),
  MultiTeamRoleSelectView_1 = require("../../../RoleSelect/MultiTeamRoleSelectView"),
  RoleDefine_1 = require("../../../RoleUi/RoleDefine"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  BabelTowerController_1 = require("./BabelTowerController"),
  BabelTowerLevelBuffItem_1 = require("./BabelTowerLevelBuffItem"),
  BabelTowerTeamItem_1 = require("./BabelTowerTeamItem"),
  ROLE_TEAM_SIZE = 3;
class BabelTowerLevelInfoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.joc = void 0, this.lqe = void 0, this.Hoc = void 0, this.$oc = void 0, this.d8t = void 0, this.nqe = () => {
      UiManager_1.UiManager.IsViewShow("MultiTeamRoleSelectView") || UiManager_1.UiManager.OpenView("MultiTeamRoleSelectView", this.D5t())
    }, this.Ylo = () => {
      var i = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender(),
        t = ModelManager_1.ModelManager.RoleModel;
      let r = !1;
      for (let e = 0; e < this.joc.RoleList.length; e++) {
        var o = this.joc.RoleList[e],
          a = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(o)?.GetRoleId() ?? 0;
        t.IsMainRole(a) && (o < RoleDefine_1.ROBOT_DATA_MIN_ID || ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(o)?.Gender !== i) && (r = !0, this.joc.RoleList[e] = 0)
      }
      if (r) {
        var e = [];
        for (const s of this.joc.RoleList) 0 !== s && e.push(s);
        for (; e.length < 3;) e.push(0);
        this.joc.RoleList = e
      }
    }, this.X4t = i => {
      for (let e = 0; e < ROLE_TEAM_SIZE; e++) this.joc.RoleList[e] = 0;
      for (let e = 0; e < i.length; e++) {
        var t = i[e];
        this.joc.RoleList[e] = t
      }
      this.XSn()
    }, this.mEc = e => {
      var i = BabelTowerController_1.BabelTowerController.GetBabelTowerData().RoleLockData.get(this.joc.BabelTowerLevelId) ?? [];
      for (const r of e)
        if (0 !== r) {
          var t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(r).WeaponType;
          if (0 < i.length && !i?.includes(t)) return ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("BabelTowerDebuffRoleSelectionTips"), !1
        } return !0
    }, this.XSn = () => {
      this.$Sn(), this.RefreshTeamRole()
    }, this.L3e = () => {
      BabelTowerController_1.BabelTowerController.BabelTowerStartRequest(this.joc.InstanceId, this.joc.RoleList, this.joc.BabelTowerLevelId, this.joc.BuffList)
    }, this.koc = () => {
      UiManager_1.UiManager.OpenView("InstanceDungeonMonsterPreView", this.joc.InstanceId)
    }, this.zal = e => {
      var i = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(this.joc.BabelTowerLevelId),
        t = i.IsDifficult,
        r = i.OptionalBabelBuff,
        o = [],
        a = BabelTowerController_1.BabelTowerController.GetBabelTowerData();
      for (const l of r) {
        let e = 0;
        t && (a.GetBuffIsLock(l) ? e = 1 : 0 < (s = a.GetBuffIsUse(l)) && s !== this.joc.BabelTowerLevelId && (e = 2));
        var s = {
          Id: l,
          State: e,
          LevelId: this.joc?.BabelTowerLevelId,
          IsRecommend: i.RecommendBuff.includes(l)
        };
        o.push(s)
      }
      var n = [];
      for (const h of this.joc.BuffList) n.push(h);
      r = {
        LevelId: this.joc.BabelTowerLevelId,
        CurrentSelectBuffList: n,
        ShowBuffId: e,
        MaxSelectBuffCount: i.OptionalBabelBuffNum,
        AllBuffList: o,
        OnConfirmCallBack: this.Woc
      };
      UiManager_1.UiManager.OpenView("BabelTowerBuffSelectView", r)
    }, this.Woc = e => {
      this.joc.BuffList = e, this.tst()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIArtText],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIButtonComponent]
    ], this.BtnBindInfo = [
      [9, this.L3e],
      [1, this.koc]
    ]
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem, await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.lqe.SetCloseCallBack(() => {
      this.CloseMe()
    }), this.d8t = new BabelTowerTeamItem_1.BabelTowerTeamItem, this.d8t.OnClickBtnCallBack = this.nqe, await this.d8t.CreateByActorAsync(this.GetItem(7).GetOwner()), this.d8t.SetActive(!0), this.Hoc = new BabelTowerLevelBuffItem_1.BabelTowerLevelBuffItem, await this.Hoc.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()), this.Hoc.OnClickBtnCallBack = this.zal, this.$oc = new BabelTowerLevelBuffItem_1.BabelTowerLevelBuffItem, await this.$oc.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()), this.$oc.OnClickBtnCallBack = this.zal
  }
  OnStart() {
    this.joc = this.OpenParam, EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleChangeEnd, this.Ylo)
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleChangeEnd, this.Ylo)
  }
  OnBeforeShow() {
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    for (let e = 0; e < this.joc.RoleList.length; e++) {
      var t = this.joc.RoleList[e],
        r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t)?.GetRoleId() ?? 0;
      ModelManager_1.ModelManager.RoleModel.IsMainRole(r) && (t < RoleDefine_1.ROBOT_DATA_MIN_ID && !ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(r) && (this.joc.RoleList[e] = 0), t > RoleDefine_1.ROBOT_DATA_MIN_ID) && ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(t)?.Gender !== i && (this.joc.RoleList[e] = 0)
    }
    this.Og()
  }
  D5t() {
    var e, i = this.joc.InstanceId,
      t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(i)?.FightFormationId,
      t = ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(t),
      r = ModelManager_1.ModelManager.RoleModel.GetRoleList(),
      o = [],
      a = BabelTowerController_1.BabelTowerController.GetBabelTowerData().RoleLockData.get(this.joc.BabelTowerLevelId) ?? [];
    for (const f of r) 0 !== f.GetRoleId() && (e = f.GetRoleConfig().WeaponType, e = MultiTeamRoleSelectView_1.MultiTeamRoleGridData.Phrase(f, !1, !1, 0 < a.length && !a.includes(e)), o.push(e));
    var s = [],
      r = t?.TrialRole ?? [],
      t = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender(),
      n = [];
    for (const M of ConfigManager_1.ConfigManager.RoleConfig.GetMainRoleByGender(1 === t ? LoginDefine_1.ELoginSex.Boy : LoginDefine_1.ELoginSex.Girl)) n.push(M.Id);
    for (const g of r) {
      var l = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfigByGroupId(g);
      ModelManager_1.ModelManager.RoleModel.IsMainRole(l.ParentId) && !n.includes(l.ParentId) || (l = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(l.Id)) && s.push(MultiTeamRoleSelectView_1.MultiTeamRoleGridData.Phrase(l, !1, !1))
    }
    var t = MultiTeamRoleSelectView_1.MultiTeamRoleData.Phrase("BossRushNormalRole", o),
      r = new Array,
      h = (0 < s.length && (h = MultiTeamRoleSelectView_1.MultiTeamRoleData.Phrase("BossRushTrailRole", s), r.push(h)), r.push(t), this.joc.RoleList),
      _ = [];
    for (const u of h) 0 !== u && _.push(u);
    t = MultiTeamRoleSelectView_1.MultiTeamRoleSelectData.Phrase(5, 3, _, void 0, this.mEc, this.X4t, void 0, r, [], "BabelTeamTips_1");
    return ModelManager_1.ModelManager.EditBattleTeamModel.SetInstanceDungeonId(i), t
  }
  $Sn() {
    var e = this.joc.InstanceId,
      e = ModelManager_1.ModelManager.BabelTowerModel.GetIfLevelTooLow(e, this.joc.RoleList);
    this.GetItem(8).SetUIActive(e)
  }
  RefreshTeamRole() {
    var i = BabelTowerController_1.BabelTowerController.GetBabelTowerData().RoleLockData.get(this.joc.BabelTowerLevelId) ?? [],
      t = this.joc.RoleList;
    for (let e = 0; e < t.length; e++) {
      var r = t[e];
      0 !== r && (r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(r).WeaponType, 0 < i.length && !i?.includes(r)) && (t[e] = 0)
    }
    var e = this.joc.InstanceId;
    this.d8t.RefreshItem(t, e)
  }
  tst() {
    var e = this.joc.BuffList,
      i = 0 < e?.length ? e[0] : 0,
      i = (this.Hoc?.RefreshItem(this.joc.BuffCount < 1, i), 1 < e?.length ? e[1] : 0);
    this.$oc?.RefreshItem(this.joc.BuffCount < 2, i)
  }
  aqe() {
    this.GetArtText(2).SetText((this.joc.StarNumber < 10 ? "0" : "") + this.joc.StarNumber);
    var e, i = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(this.joc.BabelTowerLevelId),
      i = ModelManager_1.ModelManager.BabelTowerModel.CalculateDifficultyConfigByStarNum(i.ActivityId, this.joc.StarNumber);
    i && (e = UE.Color.FromHex(i.TextBgColor), this.GetItem(3).SetColor(e), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i.DifficultyTextKey))
  }
  Og() {
    this.XSn(), this.tst(), this.aqe()
  }
}
exports.BabelTowerLevelInfoView = BabelTowerLevelInfoView;
//# sourceMappingURL=BabelTowerLevelInfoView.js.map