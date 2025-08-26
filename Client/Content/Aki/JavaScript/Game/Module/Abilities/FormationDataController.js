"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormationDataController = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
class FormationDataController extends ControllerBase_1.ControllerBase {
  static get Model() {
    return ModelManager_1.ModelManager.FormationDataModel;
  }
  static OnInit() {
    Net_1.Net.Register(29398, FormationDataController.BHa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.lqt);
    return true;
  }
  static OnClear() {
    Net_1.Net.UnRegister(29398);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.lqt);
    return true;
  }
  static OnTick(t) {
    this.ZBe();
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
  static ZBe() {
    if (this.tbe) {
      this.tbe = false;
      var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(176)?.GetAggroSet();
      const r = this.Model.PlayerAggroSet;
      this.ibe.length = 0;
      this.bie.length = 0;
      t?.forEach(t => {
        if (!r.has(t)) {
          this.ibe.push(t);
        }
      });
      for (const o of r.values()) {
        if (!t?.has(o)) {
          this.bie.push(o);
        }
      }
      for (const i of this.ibe) {
        this.Model.PlayerAggroSet.add(i);
      }
      for (const s of this.bie) {
        this.Model.PlayerAggroSet.delete(s);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAggroAdd, this.ibe);
      for (const n of this.ibe) {
        var e;
        var a = EntitySystem_1.EntitySystem.Get(n)?.GetComponent(0);
        if (a && (!(e = a.GetBaseInfo()) || (e = e.Category.MonsterMatchType) !== 3 && e !== 2 || EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBossFight, n), e = a.GetPbEntityInitData()?.BlueprintType) && !StringUtils_1.StringUtils.IsBlank(e)) {
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
      ResourceSystem_1.ResourceSystem.ResetLoadMode(GlobalData_1.GlobalData.World, true);
    }
    if (FormationDataController.wK !== t) {
      FormationDataController.wK = t;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBattleStateChanged, t);
    }
  }
  static AddPlayerTag(t, e) {
    var a = this.GetPlayerEntity(t)?.GetComponent(201);
    if (a) {
      a?.AddTag(e);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 19, "找不到对应的PlayerTag组件", ["PlayerId", t]);
    }
  }
  static RemovePlayerTag(t, e) {
    var a = this.GetPlayerEntity(t)?.GetComponent(201);
    if (a) {
      a?.RemoveTag(e);
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Battle", 19, "找不到对应的PlayerTag组件", ["PlayerId", t], ["tagId", e]);
    }
  }
  static GetPlayerTagCount(t, e) {
    var a = this.GetPlayerEntity(t)?.GetComponent(201);
    if (a) {
      return a?.GetTagCount(e) ?? 0;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 19, "找不到对应的PlayerTag组件", ["PlayerId", t]);
      }
      return 0;
    }
  }
  static HasPlayerTag(t, e, a = false) {
    var r = this.GetPlayerEntity(t)?.GetComponent(201);
    if (r) {
      return a && r?.TagContainerHasTag(e) || r?.HasTag(e);
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
      var a = ModelManager_1.ModelManager.FormationDataModel;
      let t = a.KeyboardLockEnemyMode;
      if (Info_1.Info.IsInGamepad()) {
        t = a.GamepadLockEnemyMode;
      }
      var r = -2091266968;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Character", 17, "刷新索敌模式Tag", ["lockEnemyMode", t]);
      }
      switch (t) {
        case 0:
          if (this.HasPlayerTag(e, r, true)) {
            this.RemovePlayerTag(e, r);
          }
          break;
        case 1:
          if (!this.HasPlayerTag(e, r, true)) {
            this.AddPlayerTag(e, r);
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
  var a = _a.GetPlayerEntity(e)?.GetComponent(225);
  if (a) {
    a.UpdateFollowers(t.OI_);
  } else if (Log_1.Log.CheckWarn()) {
    Log_1.Log.Warn("Battle", 48, "找不到对应的PlayerFollower组件", ["PlayerId", e]);
  }
};
FormationDataController.ibe = [];
FormationDataController.bie = [];
FormationDataController.tbe = false;
FormationDataController.wK = false; //# sourceMappingURL=FormationDataController.js.map