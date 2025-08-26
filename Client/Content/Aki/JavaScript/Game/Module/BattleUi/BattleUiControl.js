"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleUiControl = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const Net_1 = require("../../../Core/Net/Net");
const ObjectSystem_1 = require("../../../Core/Object/ObjectSystem");
const CameraController_1 = require("../../Camera/CameraController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const InputEnums_1 = require("../../Input/InputEnums");
const InputSettingsManager_1 = require("../../InputSettings/InputSettingsManager");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiLayerType_1 = require("../../Ui/Define/UiLayerType");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const UiLayer_1 = require("../../Ui/UiLayer");
const UiManager_1 = require("../../Ui/UiManager");
const UiModel_1 = require("../../Ui/UiModel");
const CooperationController_1 = require("../Battle/Cooperation/CooperationController");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const DamageUiManager_1 = require("../DamageUi/DamageUiManager");
const GameMainViewStorage_1 = require("../GameMainView/GameMainViewStorage");
const BattleUiModel_1 = require("./BattleUiModel");
const BattleUiPool_1 = require("./BattleUiPool");
class BattleUiControl extends UiControllerBase_1.UiControllerBase {
  static OnClear() {
    this.Pool.Clear();
    return true;
  }
  static OnLeaveLevel() {
    this.Pool.Clear();
    return true;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.GUe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveEntity, this.zpe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoleLevelUp, this.TQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ShowTypeChange, this.lEa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenSet, this.DQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.RQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRevive, this.UQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharOnBuffAddUIPrefab, this.AQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, this.mWe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshOnlineTeamList, this.mWe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeWalkOrRun, this.PQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SetImageQuality, this.xQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SetResolution, this.xQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SetDisplayMode, this.xQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UIViewPortSizeChanged, this.xQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayerFollowerCreate, this.mDn);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayerFollowerDestroy, this.dDn);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayerFollowerEnableChange, this.xrh);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GuideGroupOpening, this.IJt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DriveFishingShipStateChanged, this.Gd_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiSpecialSkillEnableChanged, this.Dwc);
    var e = ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.GetActionNames();
    InputDistributeController_1.InputDistributeController.BindActions(e, this.bMe);
    var e = ModelManager_1.ModelManager.BattleUiModel.FormationPanelData;
    e.RegisterInputHandler(0, CooperationController_1.CooperationController.FormationInputHandler);
    e.RegisterInputHandler(1, ControllerHolder_1.ControllerHolder.FishingController.FishingInputHandler);
    e.SetInputType(0);
    InputDistributeController_1.InputDistributeController.BindActions(e.GetActionNames(), this.gTn);
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.AddCallback(0, this.wQe);
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.AddCallback(18, this.BQe);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.GUe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEntity, this.zpe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleLevelUp, this.TQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ShowTypeChange, this.lEa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenSet, this.DQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.RQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRevive, this.UQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharOnBuffAddUIPrefab, this.AQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, this.mWe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshOnlineTeamList, this.mWe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeWalkOrRun, this.PQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SetImageQuality, this.xQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SetResolution, this.xQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SetDisplayMode, this.xQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UIViewPortSizeChanged, this.xQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayerFollowerCreate, this.mDn);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayerFollowerDestroy, this.dDn);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayerFollowerEnableChange, this.xrh);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GuideGroupOpening, this.IJt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DriveFishingShipStateChanged, this.Gd_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiSpecialSkillEnableChanged, this.Dwc);
    var e = ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.GetActionNames();
    InputDistributeController_1.InputDistributeController.UnBindActions(e, this.bMe);
    InputDistributeController_1.InputDistributeController.UnBindActions(ModelManager_1.ModelManager.BattleUiModel.FormationPanelData.GetActionNames(), this.gTn);
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.RemoveCallback(0, this.wQe);
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.RemoveCallback(18, this.BQe);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(24141, this.Omc);
    Net_1.Net.Register(29903, this.qmc);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(24141);
    Net_1.Net.UnRegister(29903);
  }
  static async PreloadBattleViewFromLoading(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "battleView preload start");
    }
    await this.Pool.Init();
    await ModelManager_1.ModelManager.BattleUiModel.Preload();
    if (!e) {
      e = this.GetMainViewName();
      BattleUiControl.bQe = await UiManager_1.UiManager.PreOpenViewAsync(e);
    }
    DamageUiManager_1.DamageUiManager.PreloadDamageView();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "battleView preload end");
    }
    return true;
  }
  static async OpenBattleViewFromLoading() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "battleView open start");
    }
    var e;
    var t = this.GetMainViewProxy();
    if (!(await UiManager_1.UiManager.OpenViewAfterPreOpenedAsync(BattleUiControl.bQe, t))) {
      e = this.GetMainViewName();
      await UiManager_1.UiManager.OpenViewAsync(e, t);
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "battleView open end");
    }
    await this.CheckOpenDungeonMainView();
    return true;
  }
  static async CheckOpenDungeonMainView() {
    var e = this.GetDungeonToViewName();
    return !!e && (await UiManager_1.UiManager.OpenViewAsync(e), true);
  }
  static GetDungeonToViewName() {
    if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
      var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
      var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
      if (e?.InstSubType) {
        e = this.WVc.get(e.InstSubType);
        if (e) {
          return e;
        }
      }
    }
  }
  static GetMainViewName() {
    var e;
    if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
      e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
      if ((e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e))?.InstSubType) {
        e = GameMainViewStorage_1.GameMainViewStorage.HasRegisterMainViewInfo(e.InstSubType);
        UiModel_1.UiModel.MainViewName = e ? "CommonGameMainView" : "BattleView";
      } else {
        UiModel_1.UiModel.MainViewName = "BattleView";
      }
    } else {
      UiModel_1.UiModel.MainViewName = "BattleView";
    }
    return UiModel_1.UiModel.MainViewName;
  }
  static GetMainViewProxy() {
    if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
      var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
      var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
      if (e?.InstSubType) {
        e = GameMainViewStorage_1.GameMainViewStorage.GetMainViewInfo(e.InstSubType);
        if (e) {
          return new e();
        }
      }
    }
  }
  static OpenMainView() {
    var e = this.GetMainViewProxy();
    var t = this.GetMainViewName();
    UiManager_1.UiManager.OpenView(t, e);
  }
  static qQe() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ShowHUD);
  }
  static GQe() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HideHUD);
  }
  static AddFullScreenEffect(e, t) {
    return ModelManager_1.ModelManager.BattleUiModel.AddFullScreenEffect(e, t);
  }
  static RemoveFullScreenEffect(e) {
    ModelManager_1.ModelManager.BattleUiModel.RemoveFullScreenEffect(e);
  }
  static RemoveFullScreenEffectByUniqueId(e) {
    ModelManager_1.ModelManager.BattleUiModel.RemoveFullScreenEffectByUniqueId(e);
  }
  static SetBattleViewVisible(e) {
    if (!!this.NQe.delete(e) && !(this.NQe.size > 0)) {
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(9);
    }
  }
  static SetBattleViewInvisible() {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(9);
    this.OQe++;
    this.NQe.add(this.OQe);
    return this.OQe;
  }
  static FocusToTargetLocation(e) {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(3).ActorLocationProxy;
    var n = ModelManager_1.ModelManager.BattleUiModel;
    CameraController_1.CameraController.FightCamera.LogicComponent.PlayCameraRotatorWithCurve(t, e, n.CursorCameraRotatorOffset, n.CursorCameraRotationTime);
  }
  static ResetFocus() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (e?.Valid) {
      e.Entity.GetComponent(32).ResetFocus();
    }
  }
  static TryOpenPureMode() {
    const t = ModelManager_1.ModelManager.BattleUiModel?.PureModeData;
    var e;
    if (t && !t.IsOpen) {
      if (t.IsSkipConfirmBox) {
        t.IsOpen = true;
      } else {
        t.IsSkipConfirmBoxTmp = false;
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(230)).HasToggle = true;
        e.ToggleText = ConfigManager_1.ConfigManager.TextConfig.GetTextById("PlotSkipConfirmToggle");
        e.SetToggleFunction(e => {
          t.IsSkipConfirmBoxTmp = e;
        });
        e.FunctionMap.set(2, () => {
          t.IsSkipConfirmBox = t.IsSkipConfirmBoxTmp;
          t.IsOpen = true;
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      }
    }
  }
  static TryClosePureMode() {
    var e = ModelManager_1.ModelManager.BattleUiModel?.PureModeData;
    return !!e && !!e.IsOpen && !(e.IsOpen = false);
  }
}
exports.BattleUiControl = BattleUiControl;
(_a = BattleUiControl).kQe = Stats_1.Stat.Create("[ChangeRole]BattleUiControl");
BattleUiControl.Model = BattleUiModel_1.BattleUiModel;
BattleUiControl.Pool = new BattleUiPool_1.BattleUiPool();
BattleUiControl.OQe = 0;
BattleUiControl.NQe = new Set();
BattleUiControl.WVc = new Map([[35, "DangoMonopolyMainView"], [34, "MapRogueMainView"], [31, "RacingBetsMainView"], [36, "PhantomArenaBattleView"]]);
BattleUiControl.nye = () => {
  ModelManager_1.ModelManager.BattleUiModel.OnWorldDone();
};
BattleUiControl.xie = (e, t) => {
  BattleUiControl.kQe.Start();
  ModelManager_1.ModelManager.BattleUiModel.OnChangeRole(e, t);
  BattleUiControl.kQe.Stop();
};
BattleUiControl.GUe = (e, t) => {
  ModelManager_1.ModelManager.BattleUiModel.OnAddEntity(t);
};
BattleUiControl.zpe = (e, t) => {
  ModelManager_1.ModelManager.BattleUiModel.OnRemoveEntity(t);
};
BattleUiControl.UQe = e => {
  if (ObjectSystem_1.ObjectSystem.IsValid(e)) {
    ModelManager_1.ModelManager.BattleUiModel.TryBroadcastRevive(e.Id);
  }
};
BattleUiControl.TQe = (e, t, n) => {
  ModelManager_1.ModelManager.BattleUiModel.TryBroadcastRoleLevelUpData(e, t, n);
};
BattleUiControl.lEa = (e, t) => {
  if (UiManager_1.UiManager.IsViewOpen("BattleView") && !Info_1.Info.IsMobilePlatform()) {
    UiManager_1.UiManager.CloseView("BattleView", () => {
      UiManager_1.UiManager.OpenView("BattleView");
    });
  }
  ModelManager_1.ModelManager.BattleUiModel.ShowTypeChange(e, t);
};
BattleUiControl.DQe = (e, t) => {
  if (e === 10016 || !!t) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFirstOpenShopChanged);
  }
};
BattleUiControl.RQe = (e, t) => {
  if (e === 10016 || !!t) {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FirstOpenShop, true);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFirstOpenShopChanged);
  }
};
BattleUiControl.AQe = (e, t, n) => {
  var i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
  if (i?.Valid && i.Id === e) {
    i = t.Id;
    if (n) {
      if (e = BattleUiControl.AddFullScreenEffect(t.Path, BigInt(i))) {
        n = UiLayer_1.UiLayer.UiRootItem;
        e.SetFloatParameter("Sprite_X", n.Width);
        e.SetFloatParameter("Sprite_Y", n.Height);
      }
    } else {
      BattleUiControl.RemoveFullScreenEffectByUniqueId(BigInt(i));
    }
  }
};
BattleUiControl.mWe = () => {
  ModelManager_1.ModelManager.BattleUiModel.OnFormationLoaded();
};
BattleUiControl.PQe = (e, t) => {
  if (ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Valid && Info_1.Info.IsInKeyBoard() && e !== t && (e = ModelManager_1.ModelManager.InputModel.GetCurrentInputData()) && (e = e.GetActionNameByInputAction(InputEnums_1.EInputAction.走跑切换))) {
    e = InputSettingsManager_1.InputSettingsManager.GetActionBinding(e)?.GetCurrentPlatformKey()?.GetKeyIconPath();
    if (t) {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("ChangeWalk", `<texture=${e}/>`);
    } else {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("ChangeRun", `<texture=${e}/>`);
    }
  }
};
BattleUiControl.xQe = () => {
  ModelManager_1.ModelManager.BattleUiModel.UpdateViewPortSize();
};
BattleUiControl.mDn = e => {
  ModelManager_1.ModelManager.BattleUiModel.FormationData.AddFollower(e);
};
BattleUiControl.dDn = () => {
  ModelManager_1.ModelManager.BattleUiModel.FormationData.RemoveFollower();
};
BattleUiControl.xrh = e => {
  ModelManager_1.ModelManager.BattleUiModel.FormationData.ChangePlayerFollowerEnable(e);
};
BattleUiControl.IJt = e => {
  if (e !== ModelManager_1.ModelManager.BattleUiModel?.PureModeData?.GuideId) {
    BattleUiControl.TryClosePureMode();
  }
};
BattleUiControl.Gd_ = e => {
  var t = ModelManager_1.ModelManager.BattleUiModel.FormationPanelData;
  if (t) {
    if (e) {
      t.SetInputType(1);
    } else {
      t.SetInputType(0);
    }
  }
};
BattleUiControl.Dwc = (e, t, n) => {
  if (t === 1407 && n) {
    UiManager_1.UiManager.OpenView("XiaKongQteView", e);
  }
};
BattleUiControl.bMe = (e, t) => {
  ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.InputAction(e, t === 0);
};
BattleUiControl.gTn = (e, t) => {
  if (t === 0) {
    ModelManager_1.ModelManager.BattleUiModel.FormationPanelData?.GetInputHandler()?.(e);
  }
};
BattleUiControl.bQe = undefined;
BattleUiControl.wQe = () => {
  if (ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(0)) {
    _a.qQe();
  } else {
    _a.GQe();
  }
};
BattleUiControl.BQe = () => {
  var e = ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(18);
  UiLayer_1.UiLayer.GetFloatUnit(UiLayerType_1.ELayerType.BattleFloat, 0).SetUIActive(e);
  UiLayer_1.UiLayer.GetFloatUnit(UiLayerType_1.ELayerType.BattleFloat, 1).SetUIActive(e);
};
BattleUiControl.Omc = e => {
  ModelManager_1.ModelManager.BattleUiModel.AddGuest(e.hdc);
};
BattleUiControl.qmc = e => {
  ModelManager_1.ModelManager.BattleUiModel.RemoveGuest(e.hdc);
}; //# sourceMappingURL=BattleUiControl.js.map