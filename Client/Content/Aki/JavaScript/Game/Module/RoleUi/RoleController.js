"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleController = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const Global_1 = require("../../Global");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const InputManager_1 = require("../../Ui/Input/InputManager");
const UiManager_1 = require("../../Ui/UiManager");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const UiRoleUtils_1 = require("../UiComponent/UiRoleUtils");
const UiSceneManager_1 = require("../UiComponent/UiSceneManager");
const UiModelUtil_1 = require("../UiModel/UiModelUtil");
const RoleLevelUpSuccessController_1 = require("./RoleLevel/RoleLevelUpSuccessController");
class RoleController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    InputManager_1.InputManager.RegisterOpenViewFunc("RoleRootView", RoleController.F1o);
    return true;
  }
  static GO_() {
    return !!ModelManager_1.ModelManager.TowerModel.CheckInTower() || !!ModelManager_1.ModelManager.BossRushModel?.CheckInBossRush() || !!ModelManager_1.ModelManager.ShipTowerModel?.CheckInBattleShipTower();
  }
  static OpenRoleMainView(e, o = 0, r = [], t = undefined, l) {
    this.OpenRoleMainViewByParam({
      AgentType: e,
      SelectRoleId: o,
      RoleIdList: r,
      OpenTabView: t,
      FinishCallback: l,
      TeamPositionType: 0
    });
  }
  static OpenRoleMainViewByParam(e) {
    var o = e.SelectRoleId ?? 0;
    var r = e.RoleIdList ?? [];
    var t = ModelManager_1.ModelManager.RoleModel.GetRoleViewAgent(e.AgentType);
    var l = e.TeamPositionType ?? 0;
    t.Init(r, o, e.OpenTabView);
    t.TeamPositionType = l;
    UiManager_1.UiManager.OpenView("RoleRootView", t, e.FinishCallback);
  }
  static CloseAndOpenRoleMainView(e, o, r = 0, t = [], l = undefined, a) {
    o = ModelManager_1.ModelManager.RoleModel.GetRoleViewAgent(o);
    o.Init(t, r, l);
    UiManager_1.UiManager.CloseAndOpenView(e, "RoleRootView", o, a);
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction("RoleRootView", RoleController.CanOpenView, "RoleController.CanOpenView");
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("RoleRootView", RoleController.CanOpenView);
  }
  static CheckCharacterInBattleTag() {
    var e = Global_1.Global.BaseCharacter;
    return !!e && e.CharacterActorComponent.Entity.CheckGetComponent(206).HasTag(1996802261);
  }
  static CheckCharacterInBattleTagAndShowTips() {
    return !!RoleController.CheckCharacterInBattleTag() && (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("ForbiddenActionInFight"), true);
  }
  static OnSelectedRoleChange(e, o) {
    var r = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
    this.RefreshUiSceneRoleActor(r, e, o);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSelectedRoleChanged);
  }
  static SetRoleMorphType(e, o) {
    e = e.Model?.GetComponent(15);
    if (e && e.SetMorphType(o)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRoleMorphTypeChanged);
    }
  }
  static async RefreshUiSceneRoleActorAsync(e, o, r, t = undefined) {
    const l = new CustomPromise_1.CustomPromise();
    this.RefreshUiSceneRoleActor(e, o, r, () => {
      t?.();
      l.SetResult();
    });
    await l.Promise;
  }
  static RefreshUiSceneRoleActor(e, o, r, t = undefined) {
    var l = e.Model?.CheckGetComponent(13);
    if (l?.RoleDataId !== o || l?.RoleSkinId !== r) {
      e.Model?.CheckGetComponent(14)?.LoadModelByRoleDataId(o, r, true, () => {
        t?.();
        UiRoleUtils_1.UiRoleUtils.PlayRoleChangeEffect(e);
      });
      if (UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("BP_UIShowRoom"), 1)) {
        UiSceneManager_1.UiSceneManager.AddUiShowRoomShowActor(e, true);
      }
    }
  }
  static OnSelectedRoleChangeByConfig(e, o, r = undefined) {
    this.RefreshUiSceneRoleActorByConfigId(e, o, r);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSelectedRoleChanged);
  }
  static RefreshUiSceneRoleActorByConfigId(e, o, r = undefined) {
    const t = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
    if (t.Model?.CheckGetComponent(13)?.RoleConfigId !== e) {
      t.Model?.CheckGetComponent(14)?.LoadModelByRoleConfigId(e, o, true, () => {
        r?.();
        UiRoleUtils_1.UiRoleUtils.PlayRoleChangeEffect(t);
      });
      UiSceneManager_1.UiSceneManager.AddUiShowRoomShowActor(t, true);
    }
  }
  static async LoadUiSceneRoleActorByConfigIdAsync(e, o, r) {
    const t = new CustomPromise_1.CustomPromise();
    e = UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(e);
    e.Model?.CheckGetComponent(14)?.LoadModelByRoleConfigId(o, r, true, () => {
      t.SetResult(undefined);
    });
    await t.Promise;
    return e;
  }
  static ShowUiSceneActorAndShadow(e) {
    var o = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()?.Model;
    if (o) {
      UiModelUtil_1.UiModelUtil.SetVisible(o, true);
    }
    var o = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("BP_UIShowRoom"), 1);
    if (o) {
      o.SetActorHiddenInGame(!e);
    }
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RedDotStart, RoleController.V1o);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLoadingNetDataDone, RoleController.xkt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LeaveInstanceDungeon, RoleController.H1o);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TextLanguageChange, RoleController.iZe);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RedDotStart, RoleController.V1o);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLoadingNetDataDone, RoleController.xkt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LeaveInstanceDungeon, RoleController.H1o);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TextLanguageChange, RoleController.iZe);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(18304, e => {
      ModelManager_1.ModelManager.RoleModel.UpdateRoleInfoByServerData(e.Y7n);
    });
    Net_1.Net.Register(29409, e => {
      ModelManager_1.ModelManager.RoleModel.RoleAttrUpdate(e.Q6n, e.bws, e.Bws);
    });
    Net_1.Net.Register(15479, e => {
      var o = e.RUs.Q6n;
      ModelManager_1.ModelManager.RoleModel.UpdateRoleInfo(e.RUs);
      ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.RoleDataItem, o);
      ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.PersonalDataItem, o);
      ModelManager_1.ModelManager.PersonalModel.SetPersonalTipState(true);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleSelectionListUpdate);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActiveRole, o);
    });
    Net_1.Net.Register(24874, e => {
      ModelManager_1.ModelManager.RoleModel.RoleLevelUp(e.Q6n, e.U8n, e.F6n);
    });
    Net_1.Net.Register(15946, e => {
      if (e !== undefined) {
        ModelManager_1.ModelManager.RoleModel.RoleResonanceLockFinish(e);
      }
    });
    Net_1.Net.Register(23349, e => {
      if (e !== undefined) {
        ModelManager_1.ModelManager.RoleModel.RoleSkillLevelUp(e.Q6n, e.ixs);
      }
    });
    Net_1.Net.Register(25266, e => {
      if (e) {
        ModelManager_1.ModelManager.RoleModel.RoleNameUpdate(e.Q6n, e.H8n);
      }
    });
    Net_1.Net.Register(23653, e => {
      if (!!e.X41 && !ModelManager_1.ModelManager.RoleModel.IsInRoleTrial && !ModelManager_1.ModelManager.PlotModel.InSeamlessFormation && !ModelManager_1.ModelManager.PlotModel.InDigitalScreen && !!ModelManager_1.ModelManager.GameModeModel.WorldDone) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("TrialRoleAdd");
      }
      ControllerHolder_1.ControllerHolder.TeleportController.SetAllowTeleport(e.xb_, 0);
      ControllerHolder_1.ControllerHolder.InstanceDungeonController.UpdateTrialRoleDungeonWhiteList(e.Ub_);
      for (const o of e.C5n) {
        ModelManager_1.ModelManager.RoleModel.RoleTrialIdList.add(o);
      }
      if (!ModelManager_1.ModelManager.RoleModel.IsInRoleTrial && ModelManager_1.ModelManager.RoleModel.RoleTrialIdList.size > 0 && (ModelManager_1.ModelManager.RoleModel.IsInRoleTrial = true, Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Role", 10, "进入角色试用状态");
      }
    });
    Net_1.Net.Register(18227, e => {
      if (e.X41 && ModelManager_1.ModelManager.RoleModel.IsInRoleTrial && !ModelManager_1.ModelManager.PlotModel.InSeamlessFormation && !ModelManager_1.ModelManager.PlotModel.InDigitalScreen && ModelManager_1.ModelManager.GameModeModel.WorldDone) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("TrialRoleDetach");
      }
      ControllerHolder_1.ControllerHolder.TeleportController.SetAllowTeleport(e.xb_, 0);
      ControllerHolder_1.ControllerHolder.InstanceDungeonController.UpdateTrialRoleDungeonWhiteList(e.Ub_);
      for (const o of e.C5n) {
        ModelManager_1.ModelManager.RoleModel.RoleTrialIdList.delete(o);
      }
      if (ModelManager_1.ModelManager.RoleModel.IsInRoleTrial && ModelManager_1.ModelManager.RoleModel.RoleTrialIdList.size <= 0 && (ModelManager_1.ModelManager.RoleModel.IsInRoleTrial = false, Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Role", 10, "角色试用状态结束");
      }
    });
    Net_1.Net.Register(28209, e => {
      if (e) {
        ModelManager_1.ModelManager.RoleModel.UpdateRoleSkillNodeData(e.Q6n, e.dxs);
      }
    });
    Net_1.Net.Register(23109, e => {
      if (e) {
        var o = new Map();
        var r = e.zPs;
        for (const l of Object.keys(r)) {
          var t = Number(l);
          o.set(t, r[t]);
        }
        ModelManager_1.ModelManager.RoleModel.UpdateRoleFavorCondition(o);
        ModelManager_1.ModelManager.RoleModel.UpdateRoleFavorData(e.JPs);
      }
    });
    Net_1.Net.Register(15897, e => {
      if (e) {
        ModelManager_1.ModelManager.RoleModel.UpdateRoleFavorDataSingle(e.ZPs);
      }
    });
    Net_1.Net.Register(18439, e => {
      if (e) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAddFavorItem, [{
          IncId: 0,
          ItemId: e.L8n
        }, e.m9n]);
      }
    });
    Net_1.Net.Register(26170, e => {
      if (e) {
        var o = new Map();
        var r = e.zPs;
        for (const l of Object.keys(r)) {
          var t = Number(l);
          o.set(t, r[t]);
        }
        ModelManager_1.ModelManager.RoleModel.UpdateRoleFavorCondition(o);
      }
    });
    Net_1.Net.Register(29160, e => {
      if (e) {
        ModelManager_1.ModelManager.RoleModel.UpdateRoleFavorNewCanUnLockId(e);
      }
    });
    Net_1.Net.Register(15428, e => {
      if (e) {
        ModelManager_1.ModelManager.RoleModel.UpdateRoleFavorLevelAndExp(e);
      }
    });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(18304);
    Net_1.Net.UnRegister(29409);
    Net_1.Net.UnRegister(15479);
    Net_1.Net.UnRegister(24874);
    Net_1.Net.UnRegister(15946);
    Net_1.Net.UnRegister(23349);
    Net_1.Net.UnRegister(25266);
    Net_1.Net.UnRegister(23653);
    Net_1.Net.UnRegister(18227);
    Net_1.Net.UnRegister(28209);
    Net_1.Net.UnRegister(23109);
    Net_1.Net.UnRegister(15897);
    Net_1.Net.UnRegister(18439);
    Net_1.Net.UnRegister(29160);
    Net_1.Net.UnRegister(15428);
  }
  static IsInRoleTrial() {
    return ModelManager_1.ModelManager.RoleModel.IsInRoleTrial;
  }
  static SendPbUpLevelRoleRequest(e, o, r) {
    var t;
    if (!!o && !(o.length <= 0)) {
      (t = Protocol_1.Aki.Protocol.K_s.create()).Q6n = e;
      t.O9n = o;
      Net_1.Net.Call(19993, t, e => {
        if (e) {
          if (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs) {
            ModelManager_1.ModelManager.RoleModel.RoleLevelUpReceiveItem(e._vs);
            ModelManager_1.ModelManager.RoleModel.RoleLevelUp(e.Q6n, e.U8n, e.F6n);
            ModelManager_1.ModelManager.RoleModel.RoleLevelResponseData.ClearItemList();
            r();
          } else {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 22545);
          }
        }
      });
    }
  }
  static SendPbOverRoleRequest(e) {
    var o = Protocol_1.Aki.Protocol.X_s.create();
    o.Q6n = e;
    Net_1.Net.Call(17291, o, e => {
      if (e) {
        if (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.RoleModel.RoleBreakUp(e.Q6n, e.txs);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 29286);
        }
      }
    });
  }
  static SendPbUpLevelSkillRequest(o, r) {
    if (!RoleController.CheckCharacterInBattleTagAndShowTips()) {
      var e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(o);
      if (!e.IsTrialRole()) {
        var e = Protocol_1.Aki.Protocol.J_s.create();
        e.Q6n = o;
        var t = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(r);
        e.r5n = t.SkillId;
        const l = ModelManager_1.ModelManager.RoleModel.GetRoleSkillTreeNodeLevel(o, r);
        Net_1.Net.Call(21001, e, e => {
          if (e) {
            if (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs) {
              this.ShowSkillTreeLevelUpSuccessView(r, l, o);
              ModelManager_1.ModelManager.RoleModel.RoleSkillLevelUp(e.Q6n, e.ixs);
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SkillTreeNodeLevelUp, r);
            } else {
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 21658);
            }
          }
        });
      }
    }
  }
  static SendRoleLevelUpViewRequest(e, o, r = undefined) {
    var t = Protocol_1.Aki.Protocol._us.create();
    t.Q6n = e;
    t.O9n = o;
    t.bHn = r;
    Net_1.Net.Call(19247, t, e => {
      if (e) {
        if (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.RoleModel.UpdateLevelViewResponseData(e);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 15967);
        }
      }
    });
  }
  static SendRoleLevelUpViewRequestWithOpenView(o, r = undefined) {
    var e = Protocol_1.Aki.Protocol._us.create();
    e.Q6n = o;
    Net_1.Net.Call(19247, e, e => {
      if (e) {
        if (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.RoleModel.UpdateLevelViewResponseData(e);
          if (r) {
            UiManager_1.UiManager.CloseView("RoleLevelUpView");
            UiManager_1.UiManager.CloseView("RoleBreachView");
            UiManager_1.UiManager.CloseView(r);
          } else {
            UiManager_1.UiManager.OpenView("RoleLevelUpView", o);
          }
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 15967);
        }
      }
    });
  }
  static SendRoleBreakThroughViewRequest(o, e = 0) {
    var r = Protocol_1.Aki.Protocol.cus.create();
    r.Q6n = o;
    Net_1.Net.Call(29451, r, e => {
      if (e) {
        if (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.RoleModel.UpdateRoleBreachViewResponseData(e);
          UiManager_1.UiManager.OpenView("RoleBreachView", o);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 29527);
        }
      }
    });
  }
  static SendRoleSkillLevelUpViewRequest(e, o) {
    var r = Protocol_1.Aki.Protocol.mus.create();
    r.Q6n = e;
    var e = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(o);
    r.r5n = e.SkillId;
    Net_1.Net.Call(19160, r, e => {
      if (e && e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 21523);
      }
    });
  }
  static SendResonanceUnlockRequest(e) {
    if (!RoleController.CheckCharacterInBattleTagAndShowTips()) {
      const t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e);
      var o;
      if (!t.IsTrialRole()) {
        (o = Protocol_1.Aki.Protocol.Ius.create()).Q6n = e;
        Net_1.Net.Call(18588, o, e => {
          var o;
          var r;
          if (e) {
            if (e.G9n === Protocol_1.Aki.Protocol.Q4n.KRs) {
              t.GetResonanceData().SetResonantChainGroupIndex(e.mxs);
              o = e.mxs - 1;
              r = {
                Title: "Text_ResonanceUnlockSuccess_Text",
                TextList: [{
                  TextId: (r = ModelManager_1.ModelManager.RoleModel.GetRoleResonanceConfigList(t))[o].AttributesDescription,
                  Params: r[o].AttributesDescriptionParams
                }]
              };
              RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessEffectView(r);
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateRoleResonanceDetailView);
            } else {
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 17346);
            }
          }
        });
      }
    }
  }
  static SendRoleSkillViewRequest(e, o, r) {
    if (!ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e)) {
      ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    }
    var t = ModelManager_1.ModelManager.RoleModel.GetCurRoleSkillViewDataLocal(e, o);
    var e = ModelManager_1.ModelManager.RoleModel.GetNextRoleSkillViewDataLocal(e, o);
    ModelManager_1.ModelManager.RoleModel.UpdateRoleSkillViewData(t, e, o);
    r?.();
  }
  static OpenTeamRoleSelectView(e) {
    UiManager_1.UiManager.OpenView("TeamRoleSelectView", e);
  }
  static PlayRoleMontage(e, o = false, r = false, t = false) {
    UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()?.Model?.CheckGetComponent(16)?.SetState(e, o, r, t);
  }
  static SendRoleActivateSkillRequest(o, r) {
    var e;
    if (!RoleController.CheckCharacterInBattleTagAndShowTips() && !ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(o).IsTrialRole()) {
      (e = Protocol_1.Aki.Protocol.Sus.create()).Q6n = o;
      e.qHn = r;
      Net_1.Net.Call(19478, e, e => {
        if (e) {
          if (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs) {
            this.ShowSkillTreeLevelUpSuccessView(r, 0, o);
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SkillTreeNodeActive, r);
          } else {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 21462);
          }
        }
      });
    }
  }
  static SendRoleFavorListRequest() {
    var e = Protocol_1.Aki.Protocol.Uts.create();
    Net_1.Net.Call(23264, e, e => {
      if (e) {
        if (e.G9n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.RoleModel.UpdateRoleFavorData(e.JPs);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 25495);
        }
      }
    });
  }
  static SendRoleFavorUnLockRequest(e, r, o) {
    var t = Protocol_1.Aki.Protocol.kts.create();
    t.H9n = e;
    t.Q6n = r;
    t.F7n = o;
    Net_1.Net.Call(21919, t, e => {
      var o;
      if (e) {
        o = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e.Q6n).GetFavorData();
        if (e.G9n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          o.UpdateUnlockId(e.H9n, r, e.F7n);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 21085);
        }
      }
    });
  }
  static SendRoleActiveRequest(e) {}
  static CheckRoleTargetLevel(o) {
    var r = ModelManager_1.ModelManager.RoleModel.GetAllRoleList();
    if (r) {
      var t = r.length;
      for (let e = 0; e < t; e++) {
        var l = r[e].GetLevelData();
        if (l && l.GetLevel() > o) {
          return true;
        }
      }
    }
    return false;
  }
  static CheckRoleSkillTargetLevel(o) {
    var r = ModelManager_1.ModelManager.RoleModel.GetAllRoleList();
    if (r) {
      var t = r.length;
      for (let e = 0; e < t; e++) {
        var l = r[e].GetSkillData();
        if (l) {
          var a = l.GetAllSkillLevel();
          var n = a.length;
          for (let e = 0; e < n; e++) {
            if (o <= a[e]) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
  static ShowSkillTreeLevelUpSuccessView(e, o, r) {
    switch (ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(e).NodeType) {
      case 4:
        this.ShowAttributeNodeLevelUpSuccessView(e);
        break;
      case 3:
        this.ShowOuterSkillNodeLevelUpSuccessView(e, r);
        break;
      case 1:
      case 2:
        this.ShowInnerSkillNodeLevelUpSuccessView(e, o);
    }
  }
  static ShowAttributeNodeLevelUpSuccessView(e) {
    e = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(e);
    e = {
      Title: "Text_ResonanceUnlockSuccess_Text",
      TextList: [{
        TextId: e.PropertyNodeDescribe,
        Params: e.PropertyNodeParam
      }]
    };
    RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessEffectView(e);
  }
  static ShowOuterSkillNodeLevelUpSuccessView(e, o) {
    e = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(e).SkillId;
    o = ModelManager_1.ModelManager.RoleModel.GetUpgradeSkillIdIfUpgraded(e, o);
    o = o > 0 ? o : e;
    e = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(o);
    o = {
      Title: "Text_ResonanceUnlockSuccess_Text",
      TextList: [{
        TextId: e.SkillDescribe,
        Params: e.SkillDetailNum
      }]
    };
    RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessEffectView(o);
  }
  static ShowInnerSkillNodeLevelUpSuccessView(e, o) {
    var r = [];
    var t = ModelManager_1.ModelManager.RoleModel.RoleSkillResponseData.GetSkillEffect()?.EffectDescList;
    var l = ModelManager_1.ModelManager.RoleModel.RoleSkillResponseData.GetNextLevelSkillEffect()?.EffectDescList;
    for (let e = 0; e < t.length; e++) {
      var a = t[e];
      var n = l[e];
      var _ = ModelManager_1.ModelManager.RoleModel.GetSkillAttributeNameByOneSkillEffect(a);
      var a = ModelManager_1.ModelManager.RoleModel.GetSkillAttributeDescriptionByOneSkillEffect(a);
      var n = ModelManager_1.ModelManager.RoleModel.GetSkillAttributeDescriptionByOneSkillEffect(n);
      if (a !== n) {
        r.push({
          Name: _,
          ShowArrow: true,
          PreText: a,
          CurText: n
        });
      }
    }
    var e = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(e).SkillId;
    var i = o + 1;
    var o = {
      LevelInfo: {
        PreUpgradeLv: o,
        UpgradeLv: i,
        FormatStringId: "Text_LevelShow_Text",
        IsMaxLevel: i === ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(e).MaxSkillLevel
      },
      WiderScrollView: true,
      AttributeInfo: r
    };
    RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessAttributeView(o);
  }
  static async RobotRolePropRequest(e) {
    var o = Protocol_1.Aki.Protocol.zfs.create();
    o.C5n = e;
    var e = await Net_1.Net.CallAsync(15027, o);
    if (e) {
      if (e.fMs === Protocol_1.Aki.Protocol.Q4n.KRs) {
        for (const t of e.exs) {
          var r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t.Q6n).GetAttributeData();
          for (const l of t.bws) {
            r.SetRoleBaseAttr(l.Z4n, l.e5n);
          }
          for (const a of t.Bws) {
            r.SetRoleAddAttr(a.Z4n, a.e5n);
          }
          if (t.Qws) {
            ModelManager_1.ModelManager.PhantomBattleModel.UpdateRoleEquipmentPropData(t.Qws);
          }
        }
      } else {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.fMs, 15344);
      }
    }
  }
  static RoleSkinChangeRequest(o, r, t, l) {
    var e = Protocol_1.Aki.Protocol.Jg_.create();
    e.Q6n = o;
    e.Z7n = r;
    e.wIl = t;
    Net_1.Net.Call(18373, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 26913);
        } else {
          if (t) {
            e = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(r);
            ModelManager_1.ModelManager.WeaponSkinModel.UpdateWeaponSkinData(o, e.GetSuitWeaponSkinId());
          }
          ModelManager_1.ModelManager.RoleModel.UpdateRoleSkinInfo(o, r);
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("RoleSkinReplaceTip");
          l(r, t);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRoleSkinChange, o);
        }
      }
    });
  }
  static RoleOperateSelfBgmRequest(o, r, t) {
    var e = new Protocol_1.Aki.Protocol.A8u();
    e.Q6n = o;
    e.Sps = r;
    Net_1.Net.Call(17714, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25681);
        } else {
          ModelManager_1.ModelManager.RoleModel.UpdateRoleBackgroundMusicEnabled(o, r);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRoleBackgroundMusicEnabledChanged, o, r);
          t?.();
        }
      }
    });
  }
}
exports.RoleController = RoleController;
(_a = RoleController).F1o = () => {
  RoleController.OpenRoleMainView(0);
};
RoleController.CanOpenView = e => {
  if (!ModelManager_1.ModelManager.FunctionModel.IsOpen(10001)) {
    return false;
  }
  if (ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam) {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("PhantomFormationEnterRoleTip");
    return false;
  }
  var o = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
  if (ModelManager_1.ModelManager.SceneTeamModel.GetCurrentGroupLivingState(o) === 2 && !_a.GO_()) {
    return false;
  }
  return true;
};
RoleController.xkt = () => {
  RoleController.SendRoleFavorListRequest();
};
RoleController.V1o = () => {
  for (const e of ModelManager_1.ModelManager.RoleModel.GetRoleIdList()) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotCreateRole, e);
  }
};
RoleController.H1o = () => {
  if (ModelManager_1.ModelManager.RoleModel.IsInRoleTrial) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Role", 10, "切换地图,重置进入试用角色状态");
    }
    ModelManager_1.ModelManager.RoleModel.RoleTrialIdList.clear();
    ModelManager_1.ModelManager.RoleModel.IsInRoleTrial = false;
  }
};
RoleController.iZe = () => {
  var e;
  var o;
  var r;
  var t = ModelManager_1.ModelManager.RoleModel.GetRoleMap();
  var l = ModelManager_1.ModelManager.RoleModel.GetRoleRobotMap();
  for ([, e] of t) {
    if (!ModelManager_1.ModelManager.PlayerInfoModel.IsPlayerId(e.GetRoleId())) {
      o = e.GetRoleConfig();
      o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(o.Name);
      e.SetRoleName(o);
    }
  }
  for ([, r] of l) {
    var a = r.GetRoleConfig();
    var a = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(a.Name);
    r.SetName(a);
  }
}; //# sourceMappingURL=RoleController.js.map