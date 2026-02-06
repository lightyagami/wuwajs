"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrinksModel = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const DrinksData_1 = require("./DrinksData");
const DrinksGamePlayProxy_1 = require("./DrinksGamePlayProxy");
const DrinksSceneController_1 = require("./DrinksSceneController");
const DrinksSoftDrinkData_1 = require("./DrinksSoftDrinkData");
class DrinksModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.GamePlayData = new DrinksData_1.DrinksData();
    this.SoftDrinkBaseMap = new Map();
    this.SoftDrinkMap = new Map();
    this.MixMap = new Map();
    this.DrinksProxy = undefined;
    this.SceneController = new DrinksSceneController_1.DrinksSceneController();
    this.GameplayOpenWay = 1;
    this.GameplayStamp = 0;
    this.GameplayFirstInvite = true;
    this.GameplayIsMainQuest = false;
    this.DrinksEntity = new Map();
    this.DrinksEntityRemaind = 0;
    this.mjg = () => {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnExecuteAfterSetPlotMode, this.mjg);
      TimerSystem_1.TimerSystem.Delay(() => {
        var e;
        var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.DrinksEntityRemaind);
        if (t && t.Valid && t.Entity) {
          if (!t.Entity.GetComponent(0).GetVisible()) {
            e = this.GetRoleId();
            ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(t.Entity, true, "[Drinks] 显示调饮料NPC");
            this.FlowSpecialRotationByRoleId(e, true);
          }
        }
        this.GetSceneController().HideNpc();
      }, 500);
    };
    this.fHg = Rotator_1.Rotator.Create();
  }
  OnInit() {
    return true;
  }
  OnClear() {
    return true;
  }
  CheckLevelIsUnlock(e) {
    var t;
    var e = ConfigManager_1.ConfigManager.DrinksConfig.GetInviteConfig(e).UnlockLevelConfigId;
    return e === 0 || !!(e = ConfigManager_1.ConfigManager.DrinksConfig.GetInviteConfig(e)) && (t = ModelManager_1.ModelManager.SpringManorModel.ActivityData.GetDrinksProgressMap()).has(e.RoleId) && t.get(e.RoleId).FirstPass;
  }
  SetUnlockConfig(e, t, r) {
    var i;
    var n = ModelManager_1.ModelManager.SpringManorModel.ActivityData.GetDrinksProgressMap();
    if (n.has(e)) {
      if ((i = n.get(e)).MaxLike) {
        return undefined;
      } else {
        i.MaxLike = r !== undefined && r || i.MaxLike;
        i.FirstPass = t !== undefined && t || i.FirstPass;
        n.set(e, i);
        return;
      }
    }
    n.set(e, {
      RoleId: e,
      FirstPass: t ?? false,
      MaxLike: r ?? false,
      RewardGet: false
    });
  }
  SetRewardReceived(e) {
    var t = ModelManager_1.ModelManager.SpringManorModel.ActivityData.GetDrinksProgressMap();
    if (t.has(e)) {
      t.get(e).RewardGet = true;
    }
  }
  InitGame(e, t) {
    if (this.SoftDrinkMap.size === 0) {
      this.InitSoftDrink();
    }
    this.GamePlayData.Init(e, t);
    e = this.GetCurrentPlayData();
    t = ConfigManager_1.ConfigManager.DrinksConfig.GetRequireList(e.RequireId);
    this.DoEntityLogicOnInvited();
    ControllerHolder_1.ControllerHolder.FlowController.StartFlow(t.ScriptName, t.ScriptId, t.ScriptStateId);
  }
  GetCurrentPlayData() {
    return this.GamePlayData.GetCurData();
  }
  GetCurrentFlavorValue() {
    return this.GamePlayData.GetFlavorValue();
  }
  GetCurrentFlavorValueForce() {
    return this.GamePlayData.GetCurFlavor(true);
  }
  GetCurrentFlavorValueOnStart() {
    return this.GamePlayData.UpdateFlavorValue();
  }
  RegisterProxy(e) {
    if (e) {
      if (this.DrinksProxy && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Drinks", 77, "Proxy has been created.");
      }
      this.DrinksProxy = new DrinksGamePlayProxy_1.DrinksPlayProxy();
    } else {
      this.DrinksProxy = undefined;
    }
  }
  GetProxy() {
    return this.DrinksProxy;
  }
  GetSceneController() {
    return this.SceneController;
  }
  InitSoftDrink() {
    var e;
    this.SoftDrinkMap.clear();
    for (const t of ConfigManager_1.ConfigManager.DrinksConfig.GetAllDrinkBase()) {
      if (!this.SoftDrinkMap.has(t.DrinkId)) {
        e = new DrinksSoftDrinkData_1.DrinksSoftDrinkData(t.DrinkId);
        this.SoftDrinkMap.set(t.DrinkId, e);
      }
      this.SoftDrinkBaseMap.set(t.Id, t.DrinkId);
      this.SoftDrinkMap.get(t.DrinkId).UpdateConfig(t.QTENum, t.Id);
    }
  }
  GetDrinksConfigById(e) {
    if (this.SoftDrinkMap.size === 0) {
      this.InitSoftDrink();
    }
    return this.SoftDrinkMap.get(e);
  }
  GetDrinksFlavorRange(e) {
    return this.SoftDrinkMap.get(e).GetFlavorRange();
  }
  GetDrinksByBaseId(e) {
    e = this.SoftDrinkBaseMap.get(e);
    return this.SoftDrinkMap.get(e);
  }
  UpdateDrinkBase(e, t = false) {
    var r = this.GetCurStep();
    this.GamePlayData.UpdateBase(r, e);
    this.DrinksProxy?.OnDrinkBaseSelected(e, t);
    if (t) {
      this.GamePlayData.UpdateStepEnd(r, true);
      this.DrinksProxy?.OnEnterDrinkBaseQTE();
    } else {
      this.GamePlayData.UpdateStepEnd(r, false);
      if (t = this.GamePlayData.GetDialogBubbleInfo(e)) {
        this.DrinksProxy?.ActivateDialogBubble(t.ConfigId, t.IsLike);
      }
    }
  }
  OnDrinkBaseQTEEnd(e) {
    var t = this.GetCurStep();
    this.GamePlayData.UpdateBase(t, e);
    this.DrinksProxy?.OnLevelSequenceBegin();
    this.DrinksProxy?.UpdateRoleRequire();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGuideTriggerEvent, "MakeDrinkLikeChange");
  }
  UpdateBatching(e, t = false) {
    var r;
    var i = this.GetCurrentPlayData().Batching;
    this.GamePlayData.UpdateBatching(e);
    this.DrinksProxy?.OnBatchingSelected(e, t);
    if (t) {
      this.GamePlayData.UpdateStepEnd(2, true);
      this.DrinksProxy?.UpdateRoleRequire();
      if (e.size === 0) {
        (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(432)).FunctionMap.set(2, () => {
          this.DrinksProxy?.OnNoBatchingConfirm();
          this.DrinksProxy?.OnLevelSequenceBegin();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
      } else {
        this.DrinksProxy?.OnLevelSequenceBegin();
      }
    } else {
      this.GamePlayData.UpdateStepEnd(2, false);
      if (i && e.size > i.length || !i && e.size > 0) {
        if (i) {
          for (const s of e) {
            if (!i.includes(s)) {
              if (r = this.GamePlayData.GetDialogBubbleInfo(s)) {
                this.DrinksProxy?.ActivateDialogBubble(r.ConfigId, r.IsLike);
              }
            }
          }
        } else {
          for (const o of e) {
            var n = this.GamePlayData.GetDialogBubbleInfo(o);
            if (n) {
              this.DrinksProxy?.ActivateDialogBubble(n.ConfigId, n.IsLike);
            }
            return;
          }
        }
      }
    }
  }
  UpdateOrnament(e, t = false) {
    this.GamePlayData.UpdateOrnament(e);
    this.DrinksProxy?.OnOrnamentSelected(t);
    if (t) {
      this.GamePlayData.UpdateStepEnd(4, true);
      this.FinishMixing();
    } else {
      this.GamePlayData.UpdateStepEnd(4, false);
      if (t = this.GamePlayData.GetDialogBubbleInfo(e)) {
        this.DrinksProxy?.ActivateDialogBubble(t.ConfigId, t.IsLike);
      }
    }
  }
  FinishMixing() {
    this.GetSceneController().PlayShowDrinks();
    this.DrinksProxy?.OnFinishMixing();
  }
  GetCurStep() {
    return this.GamePlayData.GetCurStep();
  }
  GetRoleId() {
    return this.GamePlayData.RoleId;
  }
  EnterNextStep() {
    var e;
    this.GamePlayData.EnterNextStep();
    this.DrinksProxy?.UpdateGameStep(true);
    if (this.GetCurStep() === 4 && (e = this.GamePlayData.GetDialogHintBubbleInfo())) {
      this.DrinksProxy?.ActivateDialogBubble(e.ConfigId, e.IsLike);
    }
  }
  BackToPrevStep() {
    var e = this.GetCurStep();
    this.GamePlayData.BackToPrevStep();
    var e = this.DrinksProxy.BackToPrev(e);
    TimerSystem_1.TimerSystem.Delay(() => {
      this.DrinksProxy?.UpdateRoleRequire();
      this.DrinksProxy?.UpdateGameStep(true);
    }, e);
  }
  RestartGame() {
    this.GamePlayData.RestartGame();
    var e = this.DrinksProxy.BackToPrev(0);
    TimerSystem_1.TimerSystem.Delay(() => {
      this.DrinksProxy?.UpdateRoleRequire();
      this.DrinksProxy?.UpdateGameStep(true);
    }, e);
  }
  GetRoleState() {
    var e = this.GamePlayData.GetRequireConfig();
    var t = this.GamePlayData.GetCurData();
    let r = this.fXf(e.RoleLikeSetting);
    var i;
    var n = this.GamePlayData.GetRequireId();
    var [s, o] = this.gXf();
    r += s;
    this.GetCurStep();
    var s = new Set();
    if (this.GamePlayData.SelectedEndMap.get(0) && t.DrinkBase[0] !== 0) {
      s.add(this.SoftDrinkBaseMap.get(t.DrinkBase[0]));
    }
    if (this.GamePlayData.SelectedEndMap.get(1) && t.DrinkBase[1] !== 0) {
      s.add(this.SoftDrinkBaseMap.get(t.DrinkBase[1]));
    }
    if (e.DrinkNeedV2 !== 0) {
      i = {
        RequireId: n,
        Type: 1,
        Completed: false
      };
      if (s.has(e.DrinkNeedV2)) {
        i.Completed = true;
        r += e.DrinkLikePoint;
      }
      o.push(i);
      this.GamePlayData.SelectedEndMap.get(1);
    }
    if (e.BatchingNeedV2 !== 0) {
      s = {
        RequireId: n,
        Type: 2,
        Completed: false
      };
      if (this.GamePlayData.SelectedEndMap.get(2) && t.Batching && t.Batching.includes(e.BatchingNeedV2)) {
        r += e.BatchingLikePoint;
        s.Completed = true;
      }
      o.push(s);
      this.GamePlayData.SelectedEndMap.get(2);
    }
    if (e.OrnamentNeedV2 !== 0) {
      i = {
        RequireId: n,
        Type: 3,
        Completed: false
      };
      if (t.Ornament === e.OrnamentNeedV2) {
        r += e.OrnaLike;
        i.Completed = true;
      }
      o.push(i);
    }
    return [r, o];
  }
  gXf() {
    let e = 0;
    var t = [];
    var r = this.GamePlayData.GetRequireConfig();
    var i = this.GamePlayData.GetRequireId();
    var r = ConfigManager_1.ConfigManager.DrinksConfig.GetFlavorRangeGroup(r.FlavorRequire);
    var n = this.GamePlayData.GetCurFlavor();
    for (const h of r) {
      var s = h.FlavorValues[0];
      var o = h.FlavorValues[1];
      var a = n[h.FlavorTypeRef];
      var s = {
        RequireId: i,
        Type: 0,
        FlavorRangeId: h.Id,
        Completed: s < a && a < o
      };
      e += s.Completed ? h.FlavorLikeValue[0] : a === 0 ? h.FlavorLikeValue[2] : h.FlavorLikeValue[1];
      t.push(s);
    }
    return [e, t];
  }
  fXf(e) {
    let t = 0;
    var r;
    var i = this.GamePlayData.GetCurData();
    var n = new Map();
    if (this.GamePlayData.SelectedEndMap.get(0) && i.DrinkBase[0] !== 0) {
      r = this.SoftDrinkBaseMap.get(i.DrinkBase[0]);
      n.set(r, n.has(r) ? n.get(r) + 1 : 1);
    }
    if (this.GamePlayData.SelectedEndMap.get(1) && i.DrinkBase[1] !== 0) {
      r = this.SoftDrinkBaseMap.get(i.DrinkBase[1]);
      n.set(r, n.has(r) ? n.get(r) + 1 : 1);
    }
    for (const v of e) {
      var s = ConfigManager_1.ConfigManager.DrinksConfig.GetRoleLikeDrink(v);
      var o = s.LikeStatus ? 1 : -1;
      let e = true;
      if (s.LinkDrinkBase.length > 0) {
        var a;
        var h;
        var l = new Map();
        e = true;
        for (const _ of s.LinkDrinkBase) {
          l.set(_, l.has(_) ? l.get(_) + 1 : 1);
        }
        for ([a, h] of l) {
          if ((n.get(a) ?? 0) < h) {
            e = false;
          }
        }
        if (e) {
          t += s.DrinkLikePoint * o;
        }
      }
      var f = new Set();
      if (s.LinkBatching.length > 0 && i.Batching && this.GamePlayData.SelectedEndMap.get(2)) {
        f.clear();
        e = true;
        for (const d of s.LinkBatching) {
          f.add(d);
        }
        for (const g of f) {
          if (!i.Batching.includes(g)) {
            e = false;
            break;
          }
        }
        if (e) {
          t += s.BatchingLikePoint * o;
        }
      }
      for (const C of s.LinkOrnament) {
        if (i.Ornament === C) {
          t += s.OrnamentLikePoint * o;
        }
      }
    }
    return t;
  }
  GetMixConfig(e) {
    if (this.MixMap.size === 0) {
      for (const o of ConfigManager_1.ConfigManager.DrinksConfig.GetAllMix()) {
        this.MixMap.set(o.Id, o.MixArray);
      }
    }
    var t;
    var r;
    var i = this.SoftDrinkBaseMap.get(e[0]);
    var e = this.SoftDrinkBaseMap.get(e[1]);
    var n = Math.min(i, e);
    var s = Math.max(i, e);
    for ([t, r] of this.MixMap) {
      if (n === r[0] && s === r[1]) {
        return ConfigManager_1.ConfigManager.DrinksConfig.GetDrinkMix(t);
      }
    }
  }
  GetCameraNameByLevelId(e) {
    var e = ConfigManager_1.ConfigManager.DrinksConfig.GetInviteConfig(e);
    if (e !== undefined) {
      e = e.CameraId;
      return ConfigManager_1.ConfigManager.UiCameraAnimationConfig.GetUiCameraMappingConfigById(e)?.ViewName;
    }
  }
  GetCameraSettingNameByLevelId(e) {
    var e = ConfigManager_1.ConfigManager.DrinksConfig.GetInviteConfig(e);
    if (e !== undefined) {
      e = e.CameraId;
      return ConfigManager_1.ConfigManager.UiCameraAnimationConfig.GetUiCameraMappingConfigById(e)?.DefaultUiCameraSettingsName;
    }
  }
  GetLikenessMax() {
    var e = this.GetCurrentPlayData().RequireId;
    return ConfigManager_1.ConfigManager.DrinksConfig.GetRequireList(e).ScoreMax;
  }
  GetSelectedEndMap() {
    var e = this.GetCurStep();
    return this.GamePlayData.SelectedEndMap.get(e) ?? false;
  }
  GmTestCode(e, t) {
    for (var [r] of this.GamePlayData.SelectedEndMap) {
      this.GamePlayData.SelectedEndMap.set(r, true);
    }
    if (this.SoftDrinkMap.size === 0) {
      this.InitSoftDrink();
    }
    this.GamePlayData.CurStep = 4;
    this.GamePlayData.Data = e;
    this.GamePlayData.RoleId = t;
    this.GamePlayData.RequireId = e.RequireId;
    this.GamePlayData.UpdateFlavorValue();
  }
  GetCurPreferenceLevel() {
    var [e] = this.GetRoleState();
    var t = this.GetLikenessMax();
    if (e <= 0) {
      return 0;
    } else if (e < t) {
      return 1;
    } else {
      return 2;
    }
  }
  CheckRedDot() {
    var e = ModelManager_1.ModelManager.SpringManorModel.ActivityData;
    if (e && e.IsFunctionUnlocked(2)) {
      var t;
      var r = e.GetDrinksProgressMap();
      var e = ConfigManager_1.ConfigManager.DrinksConfig.GetAllInvite();
      for ([, t] of r) {
        if (t.FirstPass && !t.RewardGet) {
          return true;
        }
      }
      if (e.length !== r.size) {
        var i = new Set();
        for (const s of e) {
          if (!r.has(s.RoleId)) {
            if (this.CheckLevelIsUnlock(s.Id)) {
              i.add(s.Id);
            }
          }
        }
        var n = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.DrinksUnlockLevelClicked);
        if (!n) {
          return true;
        }
        for (const o of i) {
          if (!n.has(o)) {
            return true;
          }
        }
      }
    }
    return false;
  }
  CheckIsDrinksEntity(e) {
    this.InitDrinksEntity();
    for (var [, t] of this.DrinksEntity) {
      if (t === e) {
        return true;
      }
    }
    return false;
  }
  HideNpcByEntityId(e) {
    var t;
    if (this.CheckIsDrinksEntity(e) && (t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e))?.Valid && t.Entity && this.DrinksEntityRemaind !== e) {
      ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(t.Entity, false, "[Drinks] 隐藏调饮料NPC");
    }
  }
  HideMainQuestNpcByEntityId() {
    var e;
    if (this.CheckIsDrinksEntity(this.DrinksEntityRemaind) && (e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.DrinksEntityRemaind))?.Valid && e.Entity) {
      this.DrinksEntityRemaind = 0;
      ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(e.Entity, false, "[Drinks] 隐藏主线调饮料NPC");
    }
  }
  InitDrinksEntity() {
    if (this.DrinksEntity.size === 0) {
      for (const e of ConfigManager_1.ConfigManager.DrinksConfig.GetAllInvite()) {
        this.DrinksEntity.set(e.RoleId, e.EntityId);
      }
    }
  }
  DoEntityLogicOnInvited() {
    var e;
    var t;
    var r = this.GetRoleId();
    this.InitDrinksEntity();
    for ([e, t] of this.DrinksEntity) {
      var i = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
      if (i?.Valid && i.Entity) {
        if (e === r) {
          this.DrinksEntityRemaind = t;
          this.DoLogicOnInvitePlotFadeIn();
        } else {
          ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(i.Entity, false, "[Drinks] 隐藏调饮料NPC");
        }
      }
    }
  }
  DoLogicOnInvitePlotFadeIn() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnExecuteAfterSetPlotMode, this.mjg);
  }
  EntityShowOnOpenInviteView() {
    this.InitDrinksEntity();
    for (var [e, t] of this.DrinksEntity) {
      t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
      if (t?.Valid && t.Entity) {
        this.FlowSpecialRotationByRoleId(e, true);
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(t.Entity, true, "[Drinks] 显示调饮料NPC");
      }
    }
  }
  EntityHideOnCloseInviteView() {
    for (var [, e] of this.DrinksEntity) {
      if (this.DrinksEntityRemaind !== e && (e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e))?.Valid && e.Entity) {
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(e.Entity, false, "[Drinks] 隐藏调饮料NPC");
      }
    }
  }
  FlowSpecialRotationByRoleId(e, t) {
    this.InitDrinksEntity();
    var r = ConfigManager_1.ConfigManager.DrinksConfig.GetInviteConfigByRole(e);
    if (r.FlowRotation.length === 2 && (e = this.DrinksEntity.get(e), (e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e))?.Valid) && e.Entity) {
      e = e.Entity.GetComponent(1);
      this.fHg.Yaw = t ? r.FlowRotation[0] : r.FlowRotation[1];
      e.SetActorRotation(this.fHg.ToUeRotator());
    }
  }
}
exports.DrinksModel = DrinksModel;
//# sourceMappingURL=DrinksModel.js.map