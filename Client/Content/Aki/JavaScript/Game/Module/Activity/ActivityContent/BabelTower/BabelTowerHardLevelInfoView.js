"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BabelTowerHardLevelInfoView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../Ui/UiManager");
const LoginDefine_1 = require("../../../Login/Data/LoginDefine");
const MultiTeamRoleSelectView_1 = require("../../../RoleSelect/MultiTeamRoleSelectView");
const RoleDefine_1 = require("../../../RoleUi/RoleDefine");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const BabelTowerController_1 = require("./BabelTowerController");
const BabelTowerLevelBuffItem_1 = require("./BabelTowerLevelBuffItem");
const BabelTowerTeamItem_1 = require("./BabelTowerTeamItem");
const ROLE_TEAM_SIZE = 3;
class BabelTowerHardLevelInfoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.joc = undefined;
    this.lqe = undefined;
    this.Hoc = undefined;
    this.$oc = undefined;
    this.d8t = undefined;
    this.nqe = () => {
      if (!UiManager_1.UiManager.IsViewShow("MultiTeamRoleSelectView")) {
        UiManager_1.UiManager.OpenView("MultiTeamRoleSelectView", this.D5t());
      }
    };
    this.Ylo = () => {
      var i = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
      var t = ModelManager_1.ModelManager.RoleModel;
      let r = false;
      for (let e = 0; e < this.joc.RoleList.length; e++) {
        var o = this.joc.RoleList[e];
        var a = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(o)?.GetRoleId() ?? 0;
        if (t.IsMainRole(a) && (o < RoleDefine_1.ROBOT_DATA_MIN_ID || ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(o)?.Gender !== i)) {
          r = true;
          this.joc.RoleList[e] = 0;
        }
      }
      if (r) {
        var e = [];
        for (const s of this.joc.RoleList) {
          if (s !== 0) {
            e.push(s);
          }
        }
        while (e.length < 3) {
          e.push(0);
        }
        this.joc.RoleList = e;
      }
    };
    this.X4t = i => {
      for (let e = 0; e < ROLE_TEAM_SIZE; e++) {
        this.joc.RoleList[e] = 0;
      }
      for (let e = 0; e < i.length; e++) {
        var t = i[e];
        this.joc.RoleList[e] = t;
      }
      this.XSn();
    };
    this.mEc = e => {
      var i = BabelTowerController_1.BabelTowerController.GetBabelTowerData().RoleLockData.get(this.joc.BabelTowerLevelId) ?? [];
      var t = [];
      for (const o of e) {
        if (o !== 0) {
          var r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(o).WeaponType;
          if (i.length > 0 && !i?.includes(r)) {
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("BabelTowerDebuffRoleSelectionTips");
            return false;
          }
          r = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(o);
          if (t.includes(r)) {
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Text_SameRole_Text");
            return false;
          }
          t.push(r);
        }
      }
      return true;
    };
    this.XSn = () => {
      this.$Sn();
      this.RefreshTeamRole();
    };
    this.L3e = () => {
      BabelTowerController_1.BabelTowerController.BabelTowerStartRequest(this.joc.InstanceId, this.joc.RoleList, this.joc.BabelTowerLevelId, this.joc.BuffList);
    };
    this.koc = () => {
      UiManager_1.UiManager.OpenView("InstanceDungeonMonsterPreView", this.joc.InstanceId);
    };
    this.zal = e => {
      var i = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(this.joc.BabelTowerLevelId);
      var t = i.IsDifficult;
      var r = i.OptionalBabelBuff;
      var o = [];
      var a = BabelTowerController_1.BabelTowerController.GetBabelTowerData();
      for (const l of r) {
        let e = 0;
        if (t) {
          if (a.GetBuffIsLock(l)) {
            e = 1;
          } else if ((s = a.GetBuffIsUse(l)) > 0 && s !== this.joc.BabelTowerLevelId) {
            e = 2;
          }
        }
        var s = {
          Id: l,
          State: e,
          LevelId: this.joc?.BabelTowerLevelId,
          IsRecommend: i.RecommendBuff.includes(l)
        };
        o.push(s);
      }
      var n = [];
      for (const h of this.joc.BuffList) {
        n.push(h);
      }
      r = {
        LevelId: this.joc.BabelTowerLevelId,
        CurrentSelectBuffList: n,
        ShowBuffId: e,
        MaxSelectBuffCount: i.OptionalBabelBuffNum,
        AllBuffList: o,
        OnConfirmCallBack: this.Woc
      };
      UiManager_1.UiManager.OpenView("BabelTowerBuffSelectView", r);
    };
    this.Woc = e => {
      this.joc.BuffList = e;
      this.tst();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [10, UE.UIText], [7, UE.UIText], [8, UE.UITexture], [9, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent], [11, UE.UIItem], [12, UE.UIItem]];
    this.BtnBindInfo = [[6, this.L3e], [1, this.koc]];
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.d8t = new BabelTowerTeamItem_1.BabelTowerTeamItem();
    this.d8t.OnClickBtnCallBack = this.nqe;
    await this.d8t.CreateByActorAsync(this.GetItem(4).GetOwner());
    this.d8t.SetActive(true);
    this.Hoc = new BabelTowerLevelBuffItem_1.BabelTowerLevelBuffItem();
    await this.Hoc.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
    this.Hoc.OnClickBtnCallBack = this.zal;
    this.$oc = new BabelTowerLevelBuffItem_1.BabelTowerLevelBuffItem();
    await this.$oc.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
    this.$oc.OnClickBtnCallBack = this.zal;
  }
  OnStart() {
    this.joc = this.OpenParam;
    this.GetItem(12).SetUIActive(true);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleChangeEnd, this.Ylo);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleChangeEnd, this.Ylo);
  }
  OnBeforeShow() {
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    for (let e = 0; e < this.joc.RoleList.length; e++) {
      var t = this.joc.RoleList[e];
      var r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t)?.GetRoleId() ?? 0;
      if (ModelManager_1.ModelManager.RoleModel.IsMainRole(r) && (t < RoleDefine_1.ROBOT_DATA_MIN_ID && !ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(r) && (this.joc.RoleList[e] = 0), t > RoleDefine_1.ROBOT_DATA_MIN_ID) && ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfig(t)?.Gender !== i) {
        this.joc.RoleList[e] = 0;
      }
    }
    this.Og();
  }
  D5t() {
    var e;
    var i = this.joc.InstanceId;
    var t = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(this.joc.BabelTowerLevelId);
    var r = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(i)?.FightFormationId;
    var r = ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(r);
    var o = ModelManager_1.ModelManager.RoleModel.GetRoleList();
    var a = [];
    var s = BabelTowerController_1.BabelTowerController.GetBabelTowerData().RoleLockData.get(this.joc.BabelTowerLevelId) ?? [];
    for (const M of o) {
      if (M.GetRoleId() !== 0) {
        e = M.GetRoleConfig().WeaponType;
        e = MultiTeamRoleSelectView_1.MultiTeamRoleGridData.Phrase(M, false, false, s.length > 0 && !s.includes(e), t.UnRecommendRoleList.includes(M.GetRoleId()));
        a.push(e);
      }
    }
    var n = [];
    var o = r?.TrialRole ?? [];
    var r = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    var l = [];
    for (const g of ConfigManager_1.ConfigManager.RoleConfig.GetMainRoleByGender(r === 1 ? LoginDefine_1.ELoginSex.Boy : LoginDefine_1.ELoginSex.Girl)) {
      l.push(g.Id);
    }
    for (const u of o) {
      var h = ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfigByGroupId(u);
      if (!ModelManager_1.ModelManager.RoleModel.IsMainRole(h.ParentId) || !!l.includes(h.ParentId)) {
        if (h = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(h.Id)) {
          n.push(MultiTeamRoleSelectView_1.MultiTeamRoleGridData.Phrase(h, false, false));
        }
      }
    }
    var r = MultiTeamRoleSelectView_1.MultiTeamRoleData.Phrase("BossRushNormalRole", a);
    var o = new Array();
    if (n.length > 0) {
      _ = MultiTeamRoleSelectView_1.MultiTeamRoleData.Phrase("BossRushTrailRole", n);
      o.push(_);
    }
    o.push(r);
    var _ = this.joc.RoleList;
    var f = [];
    for (const v of _) {
      if (v !== 0) {
        f.push(v);
      }
    }
    r = MultiTeamRoleSelectView_1.MultiTeamRoleSelectData.Phrase(5, 3, f, undefined, this.mEc, this.X4t, undefined, o, t.UnRecommendRoleList, "BabelTeamTips_1");
    ModelManager_1.ModelManager.EditBattleTeamModel.SetInstanceDungeonId(i);
    return r;
  }
  $Sn() {
    var e = this.joc.InstanceId;
    var e = ModelManager_1.ModelManager.BabelTowerModel.GetIfLevelTooLow(e, this.joc.RoleList);
    this.GetItem(5).SetUIActive(e);
  }
  RefreshTeamRole() {
    var i = BabelTowerController_1.BabelTowerController.GetBabelTowerData().RoleLockData.get(this.joc.BabelTowerLevelId) ?? [];
    var t = this.joc.RoleList;
    for (let e = 0; e < t.length; e++) {
      var r = t[e];
      if (r !== 0 && (r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(r).WeaponType, i.length > 0 && !i?.includes(r))) {
        t[e] = 0;
      }
    }
    var e = this.joc.InstanceId;
    this.d8t.RefreshItem(t, e);
  }
  tst() {
    var e = this.joc.BuffList;
    var i = e?.length > 0 ? e[0] : 0;
    this.Hoc?.RefreshItem(this.joc.BuffCount < 1, i);
    var i = e?.length > 1 ? e[1] : 0;
    this.$oc?.RefreshItem(this.joc.BuffCount < 2, i);
  }
  aqe() {
    this.GetText(10).SetText((this.joc.StarNumber < 10 ? "0" : "") + this.joc.StarNumber);
    var e = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(this.joc.BabelTowerLevelId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e.NameText);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), e.LevelDesText);
    this.SetTextureByPath(e.BossTexture, this.GetTexture(8));
    var e = ModelManager_1.ModelManager.BabelTowerModel.CalculateDifficultyConfigByStarNum(e.ActivityId, this.joc.StarNumber);
    if (e) {
      this.GetItem(11).SetUIActive(e.DifficultyId >= 2);
    }
  }
  Og() {
    this.XSn();
    this.tst();
    this.aqe();
  }
}
exports.BabelTowerHardLevelInfoView = BabelTowerHardLevelInfoView;
//# sourceMappingURL=BabelTowerHardLevelInfoView.js.map