"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BabelTowerHardLevelInfoView = void 0;
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
class BabelTowerHardLevelInfoView extends UiViewBase_1.UiViewBase {
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
      [10, UE.UIText],
      [7, UE.UIText],
      [8, UE.UITexture],
      [9, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIButtonComponent],
      [11, UE.UIItem],
      [12, UE.UIItem]
    ], this.BtnBindInfo = [
      [6, this.L3e],
      [1, this.koc]
    ]
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem, await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.lqe.SetCloseCallBack(() => {
      this.CloseMe()
    }), this.d8t = new BabelTowerTeamItem_1.BabelTowerTeamItem, this.d8t.OnClickBtnCallBack = this.nqe, await this.d8t.CreateByActorAsync(this.GetItem(4).GetOwner()), this.d8t.SetActive(!0), this.Hoc = new BabelTowerLevelBuffItem_1.BabelTowerLevelBuffItem, await this.Hoc.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()), this.Hoc.OnClickBtnCallBack = this.zal, this.$oc = new BabelTowerLevelBuffItem_1.BabelTowerLevelBuffItem, await this.$oc.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()), this.$oc.OnClickBtnCallBack = this.zal
  }
  OnStart() {
    this.joc = this.OpenParam, this.GetItem(12).SetUIActive(!0), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleChangeEnd, this.Ylo)
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
      t = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(this.joc.BabelTowerLevelId),
      r = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(i)?.FightFormationId,
      r = ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(r),
      o = ModelManager_1.ModelManager.RoleModel.GetRoleList(),
      a = [],
      s = BabelTowerController_1.BabelTowerController.GetBabelTowerData().RoleLockData.get(this.joc.BabelTowerLevelId) ?? [];
    for (const M of o) 0 !== M.GetRoleId() && (e = M.GetRoleConfig().WeaponType, e = MultiTeamRoleSelectView_1.MultiTeamRoleGridData.Phrase(M, !1, !1, 0 < s.length && !s.includes(e), t.UnRecommendRoleList.includes(M.GetRoleId())), a.push(e));
    var n = [],
      o = r?.TrialRole ?? [],
      r = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender(),
      l = [];
    for (const g of ConfigManager_1.ConfigManager.RoleConfig.GetMainRoleByGender(1 === r ? LoginDefine_1.ELoginSex.Boy : LoginDefine_1.ELoginSex.Girl)) l.push(g.Id);
    for (const u of o) {
      var h = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfigByGroupId(u);
      ModelManager_1.ModelManager.RoleModel.IsMainRole(h.ParentId) && !l.includes(h.ParentId) || (h = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(h.Id)) && n.push(MultiTeamRoleSelectView_1.MultiTeamRoleGridData.Phrase(h, !1, !1))
    }
    var r = MultiTeamRoleSelectView_1.MultiTeamRoleData.Phrase("BossRushNormalRole", a),
      o = new Array,
      _ = (0 < n.length && (_ = MultiTeamRoleSelectView_1.MultiTeamRoleData.Phrase("BossRushTrailRole", n), o.push(_)), o.push(r), this.joc.RoleList),
      f = [];
    for (const v of _) 0 !== v && f.push(v);
    r = MultiTeamRoleSelectView_1.MultiTeamRoleSelectData.Phrase(5, 3, f, void 0, this.mEc, this.X4t, void 0, o, t.UnRecommendRoleList, "BabelTeamTips_1");
    return ModelManager_1.ModelManager.EditBattleTeamModel.SetInstanceDungeonId(i), r
  }
  $Sn() {
    var e = this.joc.InstanceId,
      e = ModelManager_1.ModelManager.BabelTowerModel.GetIfLevelTooLow(e, this.joc.RoleList);
    this.GetItem(5).SetUIActive(e)
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
    this.GetText(10).SetText((this.joc.StarNumber < 10 ? "0" : "") + this.joc.StarNumber);
    var e = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(this.joc.BabelTowerLevelId),
      e = (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e.NameText), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), e.LevelDesText), this.SetTextureByPath(e.BossTexture, this.GetTexture(8)), ModelManager_1.ModelManager.BabelTowerModel.CalculateDifficultyConfigByStarNum(e.ActivityId, this.joc.StarNumber));
    e && this.GetItem(11).SetUIActive(2 <= e.DifficultyId)
  }
  Og() {
    this.XSn(), this.tst(), this.aqe()
  }
}
exports.BabelTowerHardLevelInfoView = BabelTowerHardLevelInfoView;
//# sourceMappingURL=BabelTowerHardLevelInfoView.js.map