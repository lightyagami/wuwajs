"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomBattleController = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const Net_1 = require("../../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../../Ui/UiManager");
const HandBookController_1 = require("../../HandBook/HandBookController");
const ItemRewardController_1 = require("../../ItemReward/ItemRewardController");
const RewardItemData_1 = require("../../ItemReward/RewardData/RewardItemData");
const RoleController_1 = require("../../RoleUi/RoleController");
const PhantomUtil_1 = require("../PhantomUtil");
class PhantomBattleController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAddPhantomItem, PhantomBattleController.WVi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnResponsePhantomItem, PhantomBattleController.KVi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRemovePhantomItem, PhantomBattleController.Ndi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEquipPhantomItem, PhantomBattleController.QVi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActiveBattleView, PhantomBattleController.JDe);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddPhantomItem, PhantomBattleController.WVi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnResponsePhantomItem, PhantomBattleController.KVi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRemovePhantomItem, PhantomBattleController.Ndi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEquipPhantomItem, PhantomBattleController.QVi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActiveBattleView, PhantomBattleController.JDe);
  }
  static GetPhantomItemDataByUniqueId(e) {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(e);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(24143, this.XVi);
    Net_1.Net.Register(16584, this.$Vi);
    Net_1.Net.Register(29511, this.YVi);
    Net_1.Net.Register(17012, this.JVi);
    Net_1.Net.Register(27092, this.zVi);
    Net_1.Net.Register(26562, this.ZVi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(24143);
    Net_1.Net.UnRegister(16584);
    Net_1.Net.UnRegister(29511);
    Net_1.Net.UnRegister(17012);
    Net_1.Net.UnRegister(27092);
    Net_1.Net.UnRegister(26562);
  }
  static SendPhantomLevelUpRequest(n, e, t) {
    var o = new Protocol_1.Aki.Protocol.Cls();
    o.w5n = n;
    o.tHn = e;
    o.ixu = t;
    const r = ModelManager_1.ModelManager.PhantomBattleModel.CreatePhantomLevelCacheData(n);
    Net_1.Net.Call(18018, Protocol_1.Aki.Protocol.Cls.create(o), e => {
      var t;
      var o = ModelManager_1.ModelManager.PhantomBattleModel;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Phantom", 27, "9903_返回请求幻象升级!!!!");
      }
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29425);
      } else {
        o.ResetLevelUpItemData();
        if (t = PhantomBattleController.GetPhantomItemDataByUniqueId(e.xPs.b9n)) {
          t.SetData(e.xPs);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Phantom", 27, "幻象升级返回", ["升级幻象", e.xPs.b9n], ["升级等级", e.xPs.$ws]);
          }
          o.PhantomLevelUpReceiveItem(e._vs);
          o.CachePhantomLevelUpData(r);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomLevelUp);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomLevelUpWithId, n);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Phantom", 27, "幻象升级返回，获取phantomBattleData异常");
        }
      }
    });
  }
  static TryShowReceiveItem() {
    var e = ModelManager_1.ModelManager.PhantomBattleModel.GetTempSaveItemList();
    if (e.length > 0) {
      var t = [];
      for (const r of e) {
        var o = r[0];
        var n = r[1];
        var n = new RewardItemData_1.RewardItemData(o.ItemId, n, o.IncId);
        t.push(n);
      }
      ItemRewardController_1.ItemRewardController.OpenCommonRewardView(1008, t);
      ModelManager_1.ModelManager.PhantomBattleModel.ClearTempSaveItemList();
    }
  }
  static SendPhantomPutOnRequest(e, t, n, r = -1, a = false) {
    if (ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(205).HasTag(-1720844833)) {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("VisionSkilling");
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomEquipError);
    } else {
      var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem.GetConfigId;
      var l = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomEquipOnRoleId(e);
      var _ = ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(e);
      var i = ModelManager_1.ModelManager.PhantomBattleModel.GetRoleIndexPhantomId(t, n);
      var s = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomEquipOnRoleId(i);
      var i = ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(i);
      if (o === l && l > 0 && _ || o === s && s > 0 && i) {
        let e = false;
        l = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Id;
        _ = EntitySystem_1.EntitySystem.Get(l);
        o = PhantomUtil_1.PhantomUtil.GetSummonedEntity(_, Number(Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision));
        if (e = o && o.Entity.Active ? true : e) {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("VisionSkilling");
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomEquipError);
          return;
        }
      }
      if (RoleController_1.RoleController.CheckCharacterInBattleTagAndShowTips()) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomEquipError);
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Phantom", 27, "9907_主动角色幻象装备信息");
        }
        (s = new Protocol_1.Aki.Protocol.vls()).w5n = e;
        s.Q6n = t;
        s.l8n = n;
        Net_1.Net.Call(19563, Protocol_1.Aki.Protocol.vls.create(s), e => {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Phantom", 27, "9908_返回角色幻象装备信息!!!!");
          }
          if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
            var t = e.UBs;
            if (t) {
              for (const o of t) {
                ModelManager_1.ModelManager.PhantomBattleModel.UpdateRoleEquipmentData(o);
                ModelManager_1.ModelManager.PhantomBattleModel.UpdateFetterList(o.Q6n);
              }
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomEquip);
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomEquipWithSourceAndTargetPos, r, n, a);
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Phantom", 27, "角色幻象装备数据异常");
            }
          } else {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21932);
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomEquipError);
          }
        });
      }
    }
  }
  static SendPhantomAutoPutRequest(t, o) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Phantom", 27, "10014_角色幻象一键装配请求!!!!");
    }
    if (ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(205).HasTag(-1720844833)) {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("VisionSkilling");
    } else {
      let e = false;
      var n = EntitySystem_1.EntitySystem.Get(ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Id);
      var n = PhantomUtil_1.PhantomUtil.GetSummonedEntity(n, Number(Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision));
      if (e = n && n.Entity.Active ? true : e) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("VisionSkilling");
      } else if (!RoleController_1.RoleController.CheckCharacterInBattleTagAndShowTips()) {
        (n = new Protocol_1.Aki.Protocol.Lls()).Q6n = t;
        n.eHn = o;
        Net_1.Net.Call(23363, Protocol_1.Aki.Protocol.Lls.create(n), e => {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Phantom", 27, "10014_角色幻象一键装配返回!!!!");
          }
          if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
            var t = e.UBs;
            if (t) {
              for (const o of t) {
                ModelManager_1.ModelManager.PhantomBattleModel.UpdateRoleEquipmentData(o);
                ModelManager_1.ModelManager.PhantomBattleModel.UpdateFetterList(o.Q6n);
              }
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomEquip);
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomEquipWithSourceAndTargetPos, 0, 0, false);
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Phantom", 27, "角色幻象装备数据异常!!!!");
            }
          } else {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 24680);
          }
        });
      }
    }
  }
  static async RequestPhantomIdentify(e, t) {
    var o;
    if (RoleController_1.RoleController.CheckCharacterInBattleTagAndShowTips()) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomEquipError);
    } else {
      (o = new Protocol_1.Aki.Protocol.Pls()).b9n = e;
      o.m9n = t;
      t = this.GetPhantomItemDataByUniqueId(e).GetPhantomSubProp();
      if ((o = await Net_1.Net.CallAsync(25162, o)).Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 29766);
      } else {
        PhantomBattleController.GetPhantomItemDataByUniqueId(o.xPs.b9n).SetData(o.xPs);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVisionIdentify);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVisionIdentifyWithId, e);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVisionIdentifyDoAnimation, e, t);
      }
    }
  }
  static PhantomSkinChangeRequest(t, o, n) {
    if (ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(205).HasTag(-1720844833)) {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("VisionSkilling");
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomEquipError);
    } else {
      let e = false;
      var r = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Id;
      var r = EntitySystem_1.EntitySystem.Get(r);
      var r = PhantomUtil_1.PhantomUtil.GetSummonedEntity(r, Number(Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision));
      if (e = r && r.Entity.Active ? true : e) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("VisionSkilling");
      } else if (!RoleController_1.RoleController.CheckCharacterInBattleTagAndShowTips()) {
        (r = new Protocol_1.Aki.Protocol.bls()).b9n = t;
        r.Z7n = o;
        r.iHn = n;
        Net_1.Net.Call(22247, r, e => {
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 26928);
          } else {
            (e = PhantomBattleController.GetPhantomItemDataByUniqueId(t)).SetSkinId(o);
            if (n) {
              ModelManager_1.ModelManager.PhantomBattleModel.SetDefaultSkin(e.GetConfig().MonsterId, o);
            }
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsById("PhantomSkinUse");
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVisionSkinEquip);
          }
        });
      }
    }
  }
  static RequestForTraceMonster(t) {
    if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("DungeonDetection");
    } else {
      var o = ModelManager_1.ModelManager.AdventureGuideModel.GetAllDetectMonsters().get(t);
      let e = ControllerHolder_1.ControllerHolder.AdventureGuideController.GetValidMonsterEntityIdsOfDetectConf(o.Conf);
      if (!e.length) {
        o = o.Conf.EntityConfigId;
        if (!o) {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("NoMonster");
          return;
        }
        e = [o];
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("AdventureGuide", 27, "手动探测怪物", ["探测Id", t]);
      }
      ModelManager_1.ModelManager.AdventureGuideModel.SetFromManualDetect(true);
      ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForDetection(Protocol_1.Aki.Protocol.r8n.Proto_NormalMonster, e, t);
    }
  }
  static async OpenPhantomBattleFetterView(e, t) {
    await HandBookController_1.HandBookController.SendIllustratedInfoRequestAsync([1]);
    UiManager_1.UiManager.OpenView("PhantomBattleFettersView", [e, t]);
  }
  static e6i() {
    var e;
    if (!UiManager_1.UiManager.IsViewShow("VisionNewQualityView") && !!UiManager_1.UiManager.IsViewShow("BattleView") && !ModelManager_1.ModelManager.SundryModel.IsBlockTips) {
      if (e = ModelManager_1.ModelManager.PhantomBattleModel.QualityUnlockTipsList.shift()) {
        UiManager_1.UiManager.OpenView("VisionNewQualityView", e);
      }
    }
  }
  static t6i() {
    if (!UiManager_1.UiManager.IsViewShow("CalabashUnlockItemView") && !!UiManager_1.UiManager.IsViewShow("BattleView") && !ModelManager_1.ModelManager.SundryModel.IsBlockTips) {
      UiManager_1.UiManager.OpenView("CalabashUnlockItemView", ModelManager_1.ModelManager.CalabashModel.CalabashUnlockTipsList.shift());
    }
  }
  static CheckIsEquip(e) {
    return ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsEquip(e);
  }
  static CheckIsEquipByMonsterId(e, t) {
    return ModelManager_1.ModelManager.PhantomBattleModel.CheckMonsterIsEquipOnRole(t, e);
  }
  static CheckIsMain(e) {
    return ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(e);
  }
  static CheckIsSub(e) {
    return ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsSub(e);
  }
  static CheckFetterActivate(e, t) {
    return ModelManager_1.ModelManager.PhantomBattleModel.CheckFetterActiveState(t, e);
  }
  static CheckPhantomIsUnlock(e) {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomIsUnlock(e);
  }
  static GetEquipRole(e) {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomEquipOnRoleId(e);
  }
  static SetMeshShow(o, n, e, t = true) {
    var r = e.Model;
    const a = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(o);
    var l = a.PhantomItem.MeshId;
    var _ = r.CheckGetComponent(0);
    if (_?.ModelConfigId === l) {
      if (_.GetModelLoadState() === 2) {
        n?.();
      }
    } else if (ConfigManager_1.ConfigManager.SkeletalObserverConfig.GetMeshConfig(l)) {
      const i = r.CheckGetComponent(1);
      const s = r.CheckGetComponent(10);
      s.StopAnimation();
      if (t) {
        this.SetMeshTransform(e);
      }
      const M = r.CheckGetComponent(2);
      s.SetAnimationMode(1);
      _ = ModelManager_1.ModelManager.PhantomBattleModel.GetStandAnim(o);
      ResourceSystem_1.ResourceSystem.LoadAsync(_, UE.AnimationAsset, t => {
        if (t) {
          M.LoadModelByModelId(a.PhantomItem.MeshId, true, () => {
            var e = t;
            s.PlayAnimation(e, true);
            if (e = ModelManager_1.ModelManager.PhantomBattleModel.GetMeshTransform(o)) {
              i.SetAllMeshComponentRelativeTransform(e, false, undefined, false);
            }
            n?.();
          }, undefined);
        }
      });
    }
  }
  static SetMeshTransform(e) {
    e.Model.CheckGetComponent(1).SetTransformByTag("MonsterCase");
  }
  static GetEquipState(e, t, o) {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetRolePhantomEquipState(e, t, o);
  }
  static GetEquipByIndex(e, t) {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetRoleIndexPhantomId(e, t);
  }
  static GetLevelUpItemList(e) {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomLevelUpItemSortList(e);
  }
  static GetLevelUpNeedCost(e) {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetLevelUpNeedCost(e);
  }
  static GetMaxLevel(e) {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomMaxLevel(e);
  }
  static CheckPhantomLevelSatisfied(e, t) {
    return ModelManager_1.ModelManager.PhantomBattleModel.CheckIfHasPhantomSatisfiedLevelCondition(e, t);
  }
  static CheckHasPhantomMaxLevel() {
    return ModelManager_1.ModelManager.PhantomBattleModel.CheckIfHasPhantomLevelMax();
  }
  static async GetProgressCurveValue(e, t, o) {
    e = (await ModelManager_1.ModelManager.PhantomBattleModel.GetDragCurve()).GetFloatValue(e);
    return t * (1 - e) + o * e;
  }
  static RecordVisionLevelUpSettingRedDot() {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionLevelUpSettingRedDot, true);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionLevelUpIdentifyRedDot, true);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshVisionLevelUpSettingRedPoint);
  }
}
exports.PhantomBattleController = PhantomBattleController;
(_a = PhantomBattleController).InitData = () => {};
PhantomBattleController.KVi = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Phantom", 37, "新增幻象物品", ["phantomItem", e]);
  }
  ModelManager_1.ModelManager.PhantomBattleModel.NewPhantomBattleData(e);
};
PhantomBattleController.WVi = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Phantom", 37, "新增幻象物品", ["phantomItem", e]);
  }
  ModelManager_1.ModelManager.PhantomBattleModel.NewPhantomBattleData(e);
};
PhantomBattleController.Ndi = e => {
  for (const t of e) {
    ModelManager_1.ModelManager.PhantomBattleModel.RemovePhantomBattleData(t);
  }
};
PhantomBattleController.QVi = e => {
  for (const t of e.Gws) {
    ModelManager_1.ModelManager.PhantomBattleModel.UpdateRoleEquipmentData(t);
  }
  for (const o of e.Ows) {
    ModelManager_1.ModelManager.PhantomBattleModel.UpdateRoleEquipmentPropData(o);
  }
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomEquip);
};
PhantomBattleController.ChangeRoleEvent = e => {
  ModelManager_1.ModelManager.PhantomBattleModel.UpdateFetterList(e);
};
PhantomBattleController.YVi = e => {
  e.Ows.forEach(e => {
    ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(e.Q6n).Phrase(e);
  });
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRolePropUpdate);
};
PhantomBattleController.JVi = e => {
  ModelManager_1.ModelManager.PhantomBattleModel.SetMaxCost(e.kws);
};
PhantomBattleController.ZVi = e => {
  if (e.BBs.length > 0) {
    ModelManager_1.ModelManager.PhantomBattleModel.CacheNewQualityData(e);
    TimerSystem_1.GameplayTimerSystem.Delay(() => {
      _a.e6i();
    }, ConfigManager_1.ConfigManager.CalabashConfig.DelayTime);
  } else {
    e.qBs.forEach(e => {
      var t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomItemById(e).QualityId;
      var o = ModelManager_1.ModelManager.CalabashModel.GetCalabashOwnSchedule();
      ModelManager_1.ModelManager.CalabashModel.CalabashUnlockTipsList.push([e, o, t]);
    });
    _a.t6i();
  }
};
PhantomBattleController.zVi = e => {
  e = e.bBs;
  ModelManager_1.ModelManager.PhantomBattleModel.ConcatUnlockSkinList(e);
  for (const t of e) {
    ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionSkin, t);
    ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(LocalStorageDefine_1.ELocalStoragePlayerKey.VisionSkin);
    ModelManager_1.ModelManager.PhantomBattleModel.CacheNewSkinData(t);
  }
  TimerSystem_1.GameplayTimerSystem.Delay(() => {
    _a.e6i();
  }, ConfigManager_1.ConfigManager.CalabashConfig.DelayTime);
};
PhantomBattleController.XVi = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Phantom", 27, "9906_服务端主动推送所有角色装备的幻象信息!!!!");
  }
  e = e.Gws;
  if (e) {
    for (const t of e) {
      ModelManager_1.ModelManager.PhantomBattleModel.UpdateRoleEquipmentData(t);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomEquip);
  } else if (Log_1.Log.CheckError()) {
    Log_1.Log.Error("Phantom", 27, "没有角色装备过幻象!!!!");
  }
};
PhantomBattleController.$Vi = e => {
  e.xPs.forEach(e => {
    PhantomBattleController.GetPhantomItemDataByUniqueId(e.b9n).UpdateData(e);
  });
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomItemUpdate);
};
PhantomBattleController.JDe = () => {
  if (ModelManager_1.ModelManager.PhantomBattleModel.QualityUnlockTipsList.length > 0) {
    _a.e6i();
  }
  if (ModelManager_1.ModelManager.CalabashModel.CalabashUnlockTipsList.length > 0) {
    _a.t6i();
  }
}; //# sourceMappingURL=PhantomBattleController.js.map