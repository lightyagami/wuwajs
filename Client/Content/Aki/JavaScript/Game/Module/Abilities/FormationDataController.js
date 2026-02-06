"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormationDataController = exports.isBattleMulti = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const LoadModeManager_1 = require("../../../Core/Performance/LoadMode/LoadModeManager");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
function isBattleMulti() {
  return (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() ? ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerSize() : ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer().length) > 1;
}
exports.isBattleMulti = isBattleMulti;
class FormationDataController extends ControllerBase_1.ControllerBase {
  static get Model() {
    return ModelManager_1.ModelManager.FormationDataModel;
  }
  static OnInit() {
    Net_1.Net.Register(21189, FormationDataController.BHa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.lqt);
    return true;
  }
  static OnClear() {
    Net_1.Net.UnRegister(21189);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.lqt);
    return true;
  }
  static OnTick(t) {
    this.RefreshFightState();
    this.Model?.RefreshOnLandPosition();
  }
  static OnLeaveLevel() {
    this.NotifyInFight(false);
    return true;
  }
  static OnChangeMode() {
    this.NotifyInFight(false);
    return true;
  }
  static get GlobalIsInFight() {
    return this.wK;
  }
  static set GlobalIsInFight(t) {
    this.wK = t;
  }
  static SetTimeDilation(t) {
    for (const e of this.ebe.values()) {
      if (e.IsInit) {
        e.SetTimeDilation(t);
      }
    }
  }
  static RegisterPlayerEntity(t, e) {
    this.ebe.set(t, e);
    if (ModelManager_1.ModelManager.CreatureModel.GetPlayerId() === t) {
      this.Wea();
    }
  }
  static UnRegisterPlayerEntity(t) {
    this.ebe.delete(t);
  }
  static GetPlayerEntity(t) {
    return this.ebe.get(t);
  }
  static RefreshPlayerEntities() {
    this.ebe.clear();
  }
  static IsPlayerExist(t) {
    return this.ebe.has(t);
  }
  static MarkAggroDirty() {
    this.tbe = true;
  }
  static RefreshFightState() {
    if (this.tbe) {
      this.tbe = false;
      var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(186)?.GetAggroSet();
      const a = this.Model.PlayerAggroSet;
      this.ibe.length = 0;
      this.bie.length = 0;
      t?.forEach(t => {
        if (!a.has(t)) {
          this.ibe.push(t);
        }
      });
      for (const o of a.values()) {
        if (!t?.has(o)) {
          this.bie.push(o);
        }
      }
      for (const i of this.ibe) {
        this.Model.PlayerAggroSet.add(i);
      }
      for (const n of this.bie) {
        this.Model.PlayerAggroSet.delete(n);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAggroAdd, this.ibe);
      for (const s of this.ibe) {
        var e;
        var r = EntitySystem_1.EntitySystem.Get(s)?.GetComponent(0);
        if (r && (!(e = r.GetBaseInfo()) || (e = e.Category.MonsterMatchType) !== 3 && e !== 2 || EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBossFight, s), e = r.GetPbEntityInitData()?.BlueprintType) && !StringUtils_1.StringUtils.IsBlank(e)) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEntityFightByBpType, e);
        }
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAggroRemoved, this.bie);
    }
  }
  static NotifyInFight(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Battle", 24, "NotifyInFight: " + t);
    }
    if (t) {
      LoadModeManager_1.LoadModeManager.ClearReasonAndResetLoadMode("FormationDataController.NotifyInFight 进战保底清除");
    }
    if (FormationDataController.wK !== t) {
      FormationDataController.wK = t;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBattleStateChanged, t);
    }
  }
  static AddPlayerTag(t, e) {
    var r = this.GetPlayerEntity(t)?.GetComponent(212);
    if (r) {
      r?.AddTag(e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 19, "找不到对应的PlayerTag组件", ["PlayerId", t]);
    }
  }
  static RemovePlayerTag(t, e) {
    var r = this.GetPlayerEntity(t)?.GetComponent(212);
    if (r) {
      r?.RemoveTag(e);
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Battle", 19, "找不到对应的PlayerTag组件", ["PlayerId", t], ["tagId", e]);
    }
  }
  static GetPlayerTagCount(t, e) {
    var r = this.GetPlayerEntity(t)?.GetComponent(212);
    if (r) {
      return r?.GetTagCount(e) ?? 0;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 19, "找不到对应的PlayerTag组件", ["PlayerId", t]);
      }
      return 0;
    }
  }
  static HasPlayerTag(t, e, r = false) {
    var a = this.GetPlayerEntity(t)?.GetComponent(212);
    if (a) {
      return r && a?.TagContainerHasTag(e) || a?.HasTag(e);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 19, "找不到对应的PlayerTag组件", ["PlayerId", t]);
      }
      return false;
    }
  }
  static SetKeyboardLockEnemyMode(t) {
    ModelManager_1.ModelManager.FormationDataModel.KeyboardLockEnemyMode = t;
    this.Wea();
  }
  static SetGamepadLockEnemyMode(t) {
    ModelManager_1.ModelManager.FormationDataModel.GamepadLockEnemyMode = t;
    this.Wea();
  }
  static Wea() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    if (this.IsPlayerExist(e)) {
      var r = ModelManager_1.ModelManager.FormationDataModel;
      let t = r.KeyboardLockEnemyMode;
      if (Info_1.Info.IsInGamepad()) {
        t = r.GamepadLockEnemyMode;
      }
      var a = -2091266968;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Character", 17, "刷新索敌模式Tag", ["lockEnemyMode", t]);
      }
      switch (t) {
        case 0:
          if (this.HasPlayerTag(e, a, true)) {
            this.RemovePlayerTag(e, a);
          }
          break;
        case 1:
          if (!this.HasPlayerTag(e, a, true)) {
            this.AddPlayerTag(e, a);
          }
      }
    }
  }
}
exports.FormationDataController = FormationDataController;
(_a = FormationDataController).lqt = (t, e) => {
  _a.Wea();
};
FormationDataController.ebe = new Map();
FormationDataController.BHa = t => {
  var e = t.W5n;
  var r = _a.GetPlayerEntity(e)?.GetComponent(237);
  if (r) {
    r.UpdatePlayerFollowers(t.OI_);
  } else if (Log_1.Log.CheckWarn()) {
    Log_1.Log.Warn("Battle", 48, "找不到对应的PlayerFollower组件", ["PlayerId", e]);
  }
};
FormationDataController.ibe = [];
FormationDataController.bie = [];
FormationDataController.tbe = false;
FormationDataController.wK = false; //# sourceMappingURL=FormationDataController.js.map