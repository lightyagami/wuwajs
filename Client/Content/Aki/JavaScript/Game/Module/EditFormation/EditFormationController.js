"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditFormationController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const PhantomUtil_1 = require("../Phantom/PhantomUtil");
const RoleController_1 = require("../RoleUi/RoleController");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
class EditFormationController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLoadingNetDataDone, this.Q5e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLoadingNetDataDone, this.Q5e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(24447, EditFormationController.i5t);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(24447);
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction("EditFormationView", EditFormationController.CanOpenView, EditFormationController.name);
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("EditFormationView", EditFormationController.CanOpenView);
  }
  static RefreshMainRoleInfo() {
    ModelManager_1.ModelManager.EditFormationModel.ChangeEditedMainRole();
  }
  static GetFormationDataRequest() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Formation", 48, "请求所有编队数据");
    }
    var o = new Protocol_1.Aki.Protocol.Wis();
    Net_1.Net.Call(23796, o, o => {});
  }
  static async EditFormationRequest(o) {
    var r;
    var t;
    var e = new Array();
    var n = ModelManager_1.ModelManager.EditFormationModel;
    for ([r, t] of n.GetAllEditingFormation()) {
      var i = r === o;
      if (!i || !(t.length <= 0)) {
        if (r === n.GetCurrentFormationId) {
          var a = n.GetFormationData(r)?.GetRoleIdList;
          if (a && a.length === t.length) {
            let r = true;
            for (let o = 0; o < a.length; o++) {
              if (a[o] !== t[o]) {
                r = false;
                break;
              }
            }
            if (r) {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("Formation", 48, "更新单机编队，新旧编队相同");
              }
              continue;
            }
          }
        }
        let o = t.length > 0 ? t[0] : 0;
        if (i) {
          var l = n.GetCurrentFormationData;
          var _ = l.GetCurrentRolePosition;
          o = l.GetCurrentRoleConfigId;
          if (!t.includes(o)) {
            o = _ <= t.length ? t[_ - 1] : t[0];
          }
          if (n.IsRoleDead(o)) {
            for (const m of t) {
              if (m !== o && !n.IsRoleDead(m)) {
                o = m;
                break;
              }
            }
          }
        }
        l = new Protocol_1.Aki.Protocol.M6s();
        l.GVn = r;
        l.OVn = i;
        l.C5n = t;
        l.NVn = o;
        e.push(l);
      }
    }
    var g = new Protocol_1.Aki.Protocol.Nis();
    g.kVn = e;
    ModelManager_1.ModelManager.SceneTeamModel.RefreshLastTransform();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Formation", 48, "更新单机编队", ["formations", e]);
    }
    var g = await Net_1.Net.CallAsync(19040, g);
    return g?.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs;
  }
  static async UpdateFormationRequest(o, r, t, e) {
    var n = new Protocol_1.Aki.Protocol.M6s();
    n.GVn = o;
    n.OVn = r;
    n.C5n = t;
    n.NVn = e;
    var o = new Protocol_1.Aki.Protocol.Nis();
    o.kVn = [n];
    ModelManager_1.ModelManager.SceneTeamModel.RefreshLastTransform();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Formation", 48, "更新单机编队", ["formation", n]);
    }
    var r = await Net_1.Net.CallAsync(19040, o);
    return r !== undefined;
  }
  static async UpdateFightRoleRequest() {
    var o = ModelManager_1.ModelManager.EditFormationModel;
    var r = o.GetEditingRoleIdSet(-1);
    if (r.size <= 0) {
      return false;
    }
    var t = o.GetCurrentFormationData.GetCurrentRolePosition;
    let e = o.GetEditingRoleId(-1, t);
    if (!e || o.IsRoleDead(e)) {
      for (const i of r) {
        if (i !== e && !o.IsRoleDead(i)) {
          e = i;
          break;
        }
      }
    }
    if (!e) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Formation", 48, "更新联机编队，找不到当前角色");
      }
      return false;
    }
    var n = [];
    for (const a of r) {
      n.push(a);
    }
    t = new Protocol_1.Aki.Protocol.$is();
    t.FVn = e;
    t.C5n = n;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Formation", 48, "更新联机编队", ["massage", t]);
    }
    ModelManager_1.ModelManager.SceneTeamModel.RefreshLastTransform();
    r = await Net_1.Net.CallAsync(25889, t);
    return r?.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs;
  }
}
exports.EditFormationController = EditFormationController;
(_a = EditFormationController).o5t = "EditBattleTeamForbitState";
EditFormationController.r5t = undefined;
EditFormationController.CanOpenView = o => {
  if (!ModelManager_1.ModelManager.FunctionModel.IsOpen(10007)) {
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Formation", 5, "打开编队按钮时，未满足开启条件");
    }
    return false;
  }
  if (ModelManager_1.ModelManager.FunctionModel.IsLockByBehaviorTree(10007)) {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(EditFormationController.o5t);
    return false;
  }
  var r = ModelManager_1.ModelManager.SceneTeamModel;
  if (r.IsPhantomTeam) {
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Formation", 31, "打开编队按钮时，当前编队为声骸编队，无法打开");
    }
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("PhantomFormationEnterFormationTip");
    return false;
  }
  var t = r.GetCurrentEntity;
  if (!t?.Valid) {
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Formation", 5, "打开编队按钮时，当前实体不存在");
    }
    return false;
  }
  var e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
  if (r.GetCurrentGroupLivingState(e) === 2) {
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Formation", 48, "打开编队按钮时，当前编队已死亡");
    }
    return false;
  }
  r = t.Entity.GetComponent(206);
  if (!r?.Valid) {
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Formation", 5, "打开编队按钮时，当前实体的 TagComponent 不存在");
    }
    return false;
  }
  e = t.Entity.GetComponent(175);
  if (!e?.Valid) {
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Formation", 5, "打开编队按钮时，当前实体的 CharacterBuffComponent 不存在");
    }
    return false;
  }
  if (t.Entity.GetComponent(231)?.IsOnVehicle) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Formation", 5, "打开编队按钮时，当前角色在载具上");
    }
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(EditFormationController.o5t);
    return false;
  }
  if (RoleController_1.RoleController.IsInRoleTrial()) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Formation", 5, "打开编队按钮时，有试用角色无法打开");
    }
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(EditFormationController.o5t);
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("TrialRoleTeamLimit");
    return false;
  }
  if (r.HasTag(855966206)) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Formation", 5, "打开编队按钮时，当前角色正在水中");
    }
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(EditFormationController.o5t);
    return false;
  }
  if (r.HasTag(191377386)) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Formation", 5, "打开编队按钮时，当前角色正在播放溺水");
    }
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(EditFormationController.o5t);
    return false;
  }
  if (r.HasTag(40422668)) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Formation", 5, "打开编队按钮时，当前角色处于空中");
    }
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(EditFormationController.o5t);
    return false;
  }
  if (r.HasTag(1996802261)) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Formation", 5, "打开编队按钮时，当前角色在战斗中");
    }
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("ForbiddenActionInFight");
    return false;
  }
  if (r.HasTag(504239013)) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Formation", 5, "打开编队按钮时，当前角色处于攀爬中");
    }
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(EditFormationController.o5t);
    return false;
  }
  if (r.HasTag(-1697149502)) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Formation", 7, "打开编队按钮时，当前角色不能切人");
    }
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(EditFormationController.o5t);
    return false;
  }
  if (r.HasTag(-2100129479)) {
    var r = PhantomUtil_1.PhantomUtil.GetSummonedEntity(t.Entity, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision);
    if (r && r.Entity.GetComponent(206)?.HasTag(40422668)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Formation", 5, "打开编队按钮时，当前角色为声骸变身状态且处于空中");
      }
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(EditFormationController.o5t);
      return false;
    }
  }
  if (e.GetBuffTotalStackById(90003001) > 0) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Formation", 35, "打开编队按钮时，当前角色在电梯中");
    }
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(EditFormationController.o5t);
    return false;
  } else {
    return !(r = t.Entity.GetComponent(79)) || !(r.WalkOnWaterStage > 0) || !(Log_1.Log.CheckInfo() && Log_1.Log.Info("Formation", 36, "打开编队按钮时，当前角色在水面上行走"), ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(EditFormationController.o5t), 1);
  }
};
EditFormationController.OpenEditFormationView = (o = undefined) => {
  if (EditFormationController.CanOpenView("EditFormationView") && !UiManager_1.UiManager.IsViewShow("EditFormationView")) {
    UiManager_1.UiManager.OpenView("EditFormationView", o);
  }
};
EditFormationController.Q5e = () => {
  EditFormationController.GetFormationDataRequest();
};
EditFormationController.xie = () => {
  var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem?.GetConfigId;
  if (o) {
    ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData?.SetCurrentRole(o);
  }
};
EditFormationController.$Ge = o => {
  if (o === "EditFormationView" && EditFormationController.r5t) {
    o = EditFormationController.r5t.gUs;
    ModelManager_1.ModelManager.EditFormationModel.UpdatePlayerFormations(o);
    EditFormationController.r5t = undefined;
  }
};
EditFormationController.i5t = o => {
  var r = o.gUs;
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Formation", 48, "更新背包编队", ["formations", r]);
  }
  ModelManager_1.ModelManager.OnlineModel.RefreshWorldTeamRoleInfo(r);
  if (ModelManager_1.ModelManager.GameModeModel.IsMulti && UiManager_1.UiManager.IsViewOpen("EditFormationView")) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Formation", 48, "更新背包编队时联机打开界面中，进行缓存");
    }
    _a.r5t = o;
  } else {
    ModelManager_1.ModelManager.EditFormationModel.UpdatePlayerFormations(r);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshOnlineTeamList);
  }
}; //# sourceMappingURL=EditFormationController.js.map