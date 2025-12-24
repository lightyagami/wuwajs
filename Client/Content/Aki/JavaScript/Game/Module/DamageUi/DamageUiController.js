"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DamageUiController = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiLayer_1 = require("../../Ui/UiLayer");
const BattleUiDefine_1 = require("../BattleUi/BattleUiDefine");
const DamageUiManager_1 = require("./DamageUiManager");
class DamageUiController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    DamageUiManager_1.DamageUiManager.Initialize();
    this.AddEvents();
    return true;
  }
  static OnClear() {
    this.RemoveEvents();
    DamageUiManager_1.DamageUiManager.Clear();
    DamageUiManager_1.DamageUiManager.ClearDamageViewData();
    this.StopUeDamageUiManager();
    return true;
  }
  static OnLeaveLevel() {
    DamageUiManager_1.DamageUiManager.OnLeaveLevel();
    this.StopUeDamageUiManager();
    return true;
  }
  static OnPreload() {
    const t = new CustomPromise_1.CustomPromise();
    DamageUiManager_1.DamageUiManager.PreloadAsync().then(() => {
      t.SetResult(true);
    }, e => {
      if (e instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("CombatInfo", 17, "Preload异常", e, ["error", e.message]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("CombatInfo", 17, "Preload异常", ["error", e]);
      }
      t.SetResult(false);
    });
    return ["DamageUiController Preload", t];
  }
  static OnTick(e) {
    DamageUiManager_1.DamageUiManager.Tick(e);
  }
  static AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, this.mWe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.fHe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleGoDown, this.q2t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.GUe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveEntity, this.zpe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharOnBuffAddUIDamage, this.G2t);
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    }
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.AddCallback(16, this.iJe);
  }
  static RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, this.mWe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.fHe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleGoDown, this.q2t);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.GUe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEntity, this.zpe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharOnBuffAddUIDamage, this.G2t);
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.XBo);
    }
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.RemoveCallback(16, this.iJe);
  }
  static c$e(e) {
    if (!EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.CharBeDamage, this.O2t)) {
      EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.CharBeDamage, this.O2t);
    }
  }
  static m$e(e) {
    if (EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.CharBeDamage, this.O2t)) {
      EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.CharBeDamage, this.O2t);
    }
  }
  static SetDamageTimeScaleEnable(e) {
    DamageUiManager_1.DamageUiManager.SetDamageTimeScaleEnable(e);
  }
  static EnableDamageViewOptimization() {
    return DamageUiManager_1.DamageUiManager.EnableDamageViewOptimization();
  }
  static DisableDamageViewOptimization(e) {
    DamageUiManager_1.DamageUiManager.DisableDamageViewOptimization(e);
  }
  static StartUeDamageUiManager() {
    DamageUiManager_1.DamageUiManager.StartUeDamageUiManager();
  }
  static StopUeDamageUiManager() {
    DamageUiManager_1.DamageUiManager.StopUeDamageUiManager();
  }
  static SetUeDamageConfig(e, t = false) {
    DamageUiManager_1.DamageUiManager.SetUeDamageConfig(e, t);
  }
}
exports.DamageUiController = DamageUiController;
(_a = DamageUiController).nye = () => {
  _a.StartUeDamageUiManager();
};
DamageUiController.mWe = () => {
  var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
  if (e) {
    DamageUiController.c$e(e.Entity);
  }
};
DamageUiController.fHe = () => {
  var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
  if (e) {
    DamageUiController.c$e(e.Entity);
  }
};
DamageUiController.q2t = e => {
  e = EntitySystem_1.EntitySystem.Get(e);
  if (e) {
    DamageUiController.m$e(e);
  }
};
DamageUiController.GUe = (e, t, a) => {
  DamageUiController.c$e(t.Entity);
};
DamageUiController.zpe = (e, t) => {
  DamageUiController.m$e(t.Entity);
};
DamageUiController.O2t = (e, t, a, n, i) => {
  var r = n.Damage;
  var o = n.DamageData;
  switch (o.CalculateType) {
    case 0:
      ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.BeHit(t);
      DamageUiManager_1.DamageUiManager.ApplyDamage(n.Damage, n.Element, i, t, a.IsCritical, false, o.DamageTextType, a.IsImmune ? BattleUiDefine_1.IMMUNITY_DAMAGE_TEXT : "", o.DamageTextAreaId);
      break;
    case 1:
      var s = t.GetComponent(3);
      DamageUiManager_1.DamageUiManager.ApplyDamage(-r, 0, s.ActorLocation, t, false, true, o.DamageTextType, undefined, o.DamageTextAreaId);
  }
};
DamageUiController.G2t = (e, t, a) => {
  if (a) {
    e = (a = EntitySystem_1.EntitySystem.Get(e)).GetComponent(3);
    DamageUiManager_1.DamageUiManager.ApplyDamage(-1, 0, e.ActorLocation, a, false, true, Number(t.Parameters[0]), t.Parameters[1], Number(t.Parameters[2] ?? 0));
  }
};
DamageUiController.XBo = () => {
  DamageUiManager_1.DamageUiManager.OnEditorPlatformChanged();
};
DamageUiController.iJe = () => {
  var e = UiLayer_1.UiLayer.GetBattleViewUnit(0);
  var t = ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(16);
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Battle", 17, "设置伤害数字可见性", ["visible", t]);
  }
  e.SetUIActive(t);
}; //# sourceMappingURL=DamageUiController.js.map