"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiBlueprintFunctionLibrary = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Json_1 = require("../../../Core/Common/Json");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const IGlobal_1 = require("../../../UniverseEditor/Interface/IGlobal");
const TsBaseCharacter_1 = require("../../Character/TsBaseCharacter");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../Common/PublicUtil");
const TimeUtil_1 = require("../../Common/TimeUtil");
const GameProcedure_1 = require("../../GameProcedure");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ControllerManager_1 = require("../../Manager/ControllerManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiLayerType_1 = require("../../Ui/Define/UiLayerType");
const InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController");
const UiLayer_1 = require("../../Ui/UiLayer");
const UiManager_1 = require("../../Ui/UiManager");
const UiModel_1 = require("../../Ui/UiModel");
const UiViewStorage_1 = require("../../Ui/UiViewStorage");
const AreaController_1 = require("../Area/AreaController");
const FullScreenEffectController_1 = require("../FullScreenEffect/FullScreenEffectController");
const LoginDefine_1 = require("../Login/Data/LoginDefine");
const LoginController_1 = require("../Login/LoginController");
const LoginModel_1 = require("../Login/LoginModel");
const MingSuController_1 = require("../MingSu/MingSuController");
const PhotographController_1 = require("../Photograph/PhotographController");
const ReconnectDefine_1 = require("../ReConnect/ReconnectDefine");
const ShopController_1 = require("../Shop/ShopController");
const UiSceneManager_1 = require("../UiComponent/UiSceneManager");
const WorldMapController_1 = require("../WorldMap/WorldMapController");
class UiBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static IsGameInited() {
    return GameProcedure_1.GameProcedure.Inited;
  }
  static TempModuleStart() {
    ControllerManager_1.ControllerManager.Init();
  }
  static EndGachaScene() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.EndGachaScene);
  }
  static GachaClick(e) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GachaClick, e);
  }
  static GachaInteractFinish() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GachaInteractFinish);
  }
  static PlaySequenceEventByStringParam(e) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PlaySequenceEventByStringParam, e);
  }
  static ActivitySequenceEmitEvent(e) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, e);
  }
  static AreaEndOverlap(e) {
    AreaController_1.AreaController.EndOverlap(e);
  }
  static GetAllFormationRole() {
    var e = UE.NewArray(TsBaseCharacter_1.default);
    for (const r of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(true)) {
      var t = r.Entity.GetComponent(3)?.Actor;
      if (t) {
        e.Add(t);
      }
    }
    return e;
  }
  static ChangeRole(e, t) {}
  static InitializeOfflineFormationInstance(e, t, r) {
    ModelManager_1.ModelManager.SceneTeamModel.InitializeOfflineSceneTeam(e, t, r);
  }
  static OpenBattleView() {
    var e = () => {
      UiManager_1.UiManager.OpenView("BattleView");
    };
    if (UiManager_1.UiManager.IsInited) {
      e();
    } else {
      UiManager_1.UiManager.Initialize().finally(e);
    }
  }
  static GetCurrentRoleConfigId() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem;
    if (e) {
      return e.GetConfigId;
    } else {
      return 0;
    }
  }
  static CheckGuideStatus(e, t, r) {
    return ModelManager_1.ModelManager.GuideModel.CheckGroupStatus(e, t, r);
  }
  static CheckTeleport(e) {
    return ModelManager_1.ModelManager.MapModel.CheckTeleportUnlocked(e);
  }
  static UnLockedTeleport(e) {}
  static GetItemCountByConfigId(e) {
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e);
  }
  static InitUiRoot() {
    UiManager_1.UiManager.Initialize();
  }
  static GetPlayerLevel() {
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(0);
    return e || 0;
  }
  static GetPlayerId() {
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    return e || 0;
  }
  static GetAccount() {
    return "";
  }
  static SetUiRootActive(e) {
    UiLayer_1.UiLayer.SetUiRootActive(e);
    UiLayer_1.UiLayer.SetWorldUiActive(e);
  }
  static OpenShop(e) {
    ShopController_1.ShopController.OpenShop(e);
  }
  static CloseShop() {
    if (UiManager_1.UiManager.IsViewShow("ShopView")) {
      UiManager_1.UiManager.CloseView("ShopView");
    }
  }
  static OpenWorldMapView() {
    WorldMapController_1.WorldMapController.OpenView(2, false);
  }
  static OpenDragonPoolView(e) {
    MingSuController_1.MingSuController.OpenView(e);
  }
  static ConnectServer(e) {}
  static ApplyUiCameraAnimationSettings(e) {}
  static ResetUiCameraAnimationHandle(e) {}
  static ClearAllUiCameraAnimationHandles() {}
  static PlayPlayUiCameraBlendAnimationFromCurrentHandle(e, t) {}
  static OpenUiScene(e) {
    UiSceneManager_1.UiSceneManager.OpenUiScene(e);
  }
  static CloseUiScene() {
    UiSceneManager_1.UiSceneManager.CloseUiScene();
  }
  static BeginScreenEffect(e, t) {
    FullScreenEffectController_1.FullScreenEffectController.BeginEffect(e, t);
  }
  static EndScreenEffect(e) {
    FullScreenEffectController_1.FullScreenEffectController.EndEffect(e);
  }
  static SetPartStateVisible(e, t, r) {
    t = FNameUtil_1.FNameUtil.GetDynamicFName(t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSetPartStateVisible, e, t, r);
  }
  static GetRoleMeshId(e) {
    e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    if (e) {
      return e.MeshId;
    } else {
      return 0;
    }
  }
  static GetRoleEntityId(e) {
    e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    if (e) {
      return e.EntityProperty;
    } else {
      return 0;
    }
  }
  static GetRoleBaseAttrList(e) {
    e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e).GetAttributeData();
    const r = UE.NewMap(UE.BuiltinInt, UE.BuiltinFloat);
    e.GetBaseAttrList().forEach((e, t) => {
      r.Add(t, e);
    });
    return r;
  }
  static GetRoleAddAttrList(e) {
    e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e).GetAttributeData();
    const r = UE.NewMap(UE.BuiltinInt, UE.BuiltinFloat);
    e.GetAddAttrList().forEach((e, t) => {
      r.Add(t, e);
    });
    return r;
  }
  static GetRoleCameraConfig(e) {
    return ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e).CameraConfig;
  }
  static GetRoleProperty(e) {
    return ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e).PropertyId;
  }
  static GetRoleDamageData(e) {
    var t = UE.NewArray(UE.BuiltinInt);
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetDamageConfig(e);
    if (e) {
      t.Add(e.Element);
      t.Add(e.Type);
    }
    return t;
  }
  static OpenGmView() {
    if (ModelManager_1.ModelManager.SundryModel.CanOpenGmView) {
      if (UiManager_1.UiManager.IsViewShow("GmView")) {
        UiManager_1.UiManager.CloseView("GmView");
      } else {
        UiManager_1.UiManager.OpenView("GmView");
      }
    }
  }
  static BackLoginView() {
    if (!UiManager_1.UiManager.IsViewShow("LoginView") && !UiManager_1.UiManager.IsViewShow("CreateCharacterView")) {
      ControllerHolder_1.ControllerHolder.ReConnectController.Logout(ReconnectDefine_1.ELogoutReason.GmBackLoginView);
    }
  }
  static SetDamageViewVisible(e) {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 17, "蓝图设置伤害飘字可见性（该接口已废弃）");
    }
  }
  static SetHeadStateVisible(e) {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 17, "蓝图设置头顶状态条可见性（该接口已废弃）");
    }
  }
  static SetBossStateVisible(e) {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 17, "蓝图设置Boss状态条可见性（该接口已废弃）");
    }
  }
  static PlayBattleNormalTip(e, t) {
    ModelManager_1.ModelManager.BattleUiModel.FloatTipsData.PlayNormalFloatTip(e, t);
  }
  static PlayBattleCountdownTip(e, t, r) {
    ModelManager_1.ModelManager.BattleUiModel.FloatTipsData.PlayCountdownFloatTip(e, t, r);
  }
  static SetTempLocation(e) {
    var t;
    var r;
    var i;
    var n;
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      i = (r = t = undefined, puerts_1.$ref)(undefined);
      n = (0, puerts_1.$ref)(undefined);
      UE.EditorLevelLibrary.GetLevelViewportCameraInfo(i, n);
      t = (0, puerts_1.$unref)(i);
      r = (0, puerts_1.$unref)(n);
      UiBlueprintFunctionLibrary.TempLocation = Vector_1.Vector.Create(t);
      UiBlueprintFunctionLibrary.TempRotator = Rotator_1.Rotator.Create(r);
    } else {
      UiBlueprintFunctionLibrary.TempLocation = Vector_1.Vector.Create(e);
    }
  }
  static SetIsSilentLogin(e) {
    PublicUtil_1.PublicUtil.SetIsSilentLogin(e);
  }
  static TestSceneLogin(t) {
    if (ModelManager_1.ModelManager.LoginModel.IsLoginStatus(LoginDefine_1.ELoginStatus.Init)) {
      let e = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfig.LevelsConfigPath);
      if (!PublicUtil_1.PublicUtil.IsUseTempData()) {
        e = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfigTemp.LevelsConfigPath);
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Temp", 8, "levelConfig路径读取", ["levelsConfigPath", e]);
      }
      if (UE.BlueprintPathsLibrary.FileExists(e)) {
        var r = (0, puerts_1.$ref)("");
        if (UE.KuroStaticLibrary.LoadFileToString(r, e)) {
          r = Json_1.Json.Parse((0, puerts_1.$unref)(r)).Levels.find(e => e.Name === t);
          if (r) {
            ModelManager_1.ModelManager.LoginModel.FixLoginFailInfo();
            let e = UiBlueprintFunctionLibrary.TestSceneLoadServerIp();
            if (StringUtils_1.StringUtils.IsEmpty(e)) {
              e = LoginModel_1.DEFAULT_SERVER_IP;
            }
            ModelManager_1.ModelManager.LoginModel.SetServerIp(e, 0);
            ModelManager_1.ModelManager.LoginModel.SetAccount(UiBlueprintFunctionLibrary.TestSceneLoadAccount());
            ModelManager_1.ModelManager.LoginModel.SetPlayerSex(UiBlueprintFunctionLibrary.TestSceneLoadGender() ? LoginDefine_1.ELoginSex.Boy : LoginDefine_1.ELoginSex.Girl);
            ModelManager_1.ModelManager.LoginModel.SetPlayerName("关卡测试");
            var i = UiBlueprintFunctionLibrary.TestLoadSceneData()?.DungeonId ?? 0;
            ModelManager_1.ModelManager.LoginModel.SetSingleMapId(i > 0 ? i : r.Id);
            ModelManager_1.ModelManager.LoginModel.SetMultiMapId(9);
            ModelManager_1.ModelManager.LoginModel.BornMode = UiBlueprintFunctionLibrary.TestSceneLoadNetMode() ? 0 : 1;
            var i = new Protocol_1.Aki.Protocol.Gks();
            i.X = UiBlueprintFunctionLibrary.TempLocation.X;
            i.Y = UiBlueprintFunctionLibrary.TempLocation.Y;
            i.Z = UiBlueprintFunctionLibrary.TempLocation.Z;
            ModelManager_1.ModelManager.LoginModel.BornLocation = i;
            if (!GlobalData_1.GlobalData.IsRunWithEditorStartConfig()) {
              (r = Global_1.Global.CharacterController).ClearInputBinding();
              r.InitInputHandle();
              r.ReceiveSetupInputComponent();
            }
            ModelManager_1.ModelManager.GameModeModel.IsSilentLogin = true;
            var i = ModelManager_1.ModelManager.LoginModel.GetSingleMapId();
            if (ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(i)?.InstType === Protocol_1.Aki.Protocol.i4s.Proto_NormalInstance && UiBlueprintFunctionLibrary.TestLoadSceneData().IsDisableTeleportDungeon) {
              ModelManager_1.ModelManager.SundryModel.SetBlockTpDungeon(true, 1);
            }
            var r = () => {
              ModelManager_1.ModelManager.LoginModel.SetLoginStatus(LoginDefine_1.ELoginStatus.Init);
              LoginController_1.LoginController.GetHttp(true);
              EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LoginStatusChange, UiBlueprintFunctionLibrary.CheckReLogin);
              UiBlueprintFunctionLibrary.TimerId = TimerSystem_1.TimerSystem.Forever(UiBlueprintFunctionLibrary.CheckWorldDone, TimeUtil_1.TimeUtil.InverseMillisecond);
            };
            if (UiManager_1.UiManager.IsInited) {
              r();
            } else {
              UiManager_1.UiManager.Initialize().finally(r);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Temp", 8, "没有地图对应的配置, 请检查配置文件", ["levelsConfigPath", e]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Temp", 8, "读取关卡配置失败", ["path", e]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Temp", 8, "读取关卡配置失败", ["path", e]);
      }
    }
  }
  static TestSceneLoadNetMode() {
    return UiBlueprintFunctionLibrary.TestLoadSceneData().IsNetMode;
  }
  static TestSceneSaveNetMode(e) {
    var t = UiBlueprintFunctionLibrary.TestLoadSceneData();
    t.IsNetMode = e;
    UiBlueprintFunctionLibrary.TestSaveSceneData(t);
  }
  static TestSceneLoadAccount() {
    return UiBlueprintFunctionLibrary.TestLoadSceneData().Account;
  }
  static TestSceneSaveAccount(e) {
    var t = UiBlueprintFunctionLibrary.TestLoadSceneData();
    t.Account = e;
    UiBlueprintFunctionLibrary.TestSaveSceneData(t);
  }
  static TestSceneLoadServerIp() {
    return UiBlueprintFunctionLibrary.TestLoadSceneData().ServerIp;
  }
  static TestSceneSaveServerIp(e) {
    var t = UiBlueprintFunctionLibrary.TestLoadSceneData();
    t.ServerIp = e;
    UiBlueprintFunctionLibrary.TestSaveSceneData(t);
  }
  static TestSceneLoadBornMode() {
    if (UiBlueprintFunctionLibrary.TestLoadSceneData().IsBornAtCamera) {
      return 0;
    } else {
      return 1;
    }
  }
  static TestSceneSaveBornMode1(e) {
    var t = UiBlueprintFunctionLibrary.TestLoadSceneData();
    t.IsBornAtCamera = e;
    UiBlueprintFunctionLibrary.TestSaveSceneData(t);
  }
  static TestSceneLoadBornLocation() {
    var e = UiBlueprintFunctionLibrary.TestLoadSceneData();
    var t = new UE.Vector();
    t.X = e.Location.X ?? 0;
    t.Y = e.Location.Y ?? 0;
    t.Z = e.Location.Z ?? 0;
    return t;
  }
  static TestSceneLoadGender() {
    return UiBlueprintFunctionLibrary.TestLoadSceneData().IsMale;
  }
  static TestSceneSaveGender(e) {
    var t = UiBlueprintFunctionLibrary.TestLoadSceneData();
    t.IsMale = e;
    UiBlueprintFunctionLibrary.TestSaveSceneData(t);
  }
  static IsUseTempData() {
    return UiBlueprintFunctionLibrary.TestLoadSceneData().UseTemp;
  }
  static GetLocalGameDataPath() {
    return UE.BlueprintPathsLibrary.ProjectDir() + "../Config/Raw/Tables/k.可视化编辑/__Temp__/EditorStartConfig.json";
  }
  static TestLoadSceneData() {
    var e;
    var t;
    var r = UiBlueprintFunctionLibrary.GetLocalGameDataPath();
    if (UE.BlueprintPathsLibrary.FileExists(r)) {
      t = (e = "", puerts_1.$ref)("");
      if (UE.KuroStaticLibrary.LoadFileToString(t, r)) {
        e = (0, puerts_1.$unref)(t);
        if ((t = Json_1.Json.Parse(e)) === undefined) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Temp", 8, "读取本地文件配置失败, 反序列化失败");
          }
          return this.TestSaveSceneData();
        } else {
          return t;
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Temp", 8, "读取本地文件配置失败", ["path", r]);
        }
        return this.TestSaveSceneData();
      }
    } else {
      return this.TestSaveSceneData();
    }
  }
  static TestSaveSceneData(e = undefined) {
    let t = undefined;
    if (e) {
      t = e;
    } else {
      (t = new Object()).IsBornAtCamera = false;
      t.Account = `${PublicUtil_1.PublicUtil.GetLocalHost()}[${TimeUtil_1.TimeUtil.DateFormat(new Date())}]`;
      t.IsNetMode = false;
      t.IsMale = false;
      t.UseTemp = false;
    }
    var r;
    var e = Json_1.Json.Stringify(t);
    if (e === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Temp", 8, "localGameData反序列化失败");
      }
    } else {
      r = UiBlueprintFunctionLibrary.GetLocalGameDataPath();
      UE.KuroStaticLibrary.SaveStringToFile(e, r);
    }
    return t;
  }
  static RefreshInputTag() {
    InputDistributeController_1.InputDistributeController.RefreshInputTag();
  }
  static IsPlayerLookAtCameraInPhoto() {
    return PhotographController_1.PhotographController.IsPlayerLookAtCamera();
  }
  static IsOpenPhotograph() {
    return PhotographController_1.PhotographController.IsOpenPhotograph();
  }
  static EnablePhotographTimeDilation(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Photograph", 57, "EnablePhotographTimeDilation", ["timeDilation", e]);
    }
    ModelManager_1.ModelManager.PhotographModel?.SetPhotographTimeDilation(e);
  }
  static DisablePhotographTimeDilation() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Photograph", 57, "DisablePhotographTimeDilation");
    }
    ModelManager_1.ModelManager.PhotographModel?.SetPhotographTimeDilation(1);
  }
  static GetTopViewName() {
    let e = "None Normal / Pop View";
    var t;
    if (UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Normal) !== undefined) {
      t = UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Normal).Info.Name;
      t = UiViewStorage_1.UiViewStorage.GetUiTsInfo(t).ResourceId;
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourceConfig(t).Path;
    }
    if (UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Pop) !== undefined) {
      t = UiModel_1.UiModel.GetTopView(UiLayerType_1.ELayerType.Pop).Info.Name;
      t = UiViewStorage_1.UiViewStorage.GetUiTsInfo(t).ResourceId;
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourceConfig(t).Path;
    }
    return e;
  }
  static SetUiStartSequenceFrame(e) {
    UiSceneManager_1.UiSceneManager.SetUiStartSequenceFrame(e);
  }
  static SetUiEndSequenceFrame(e) {
    UiSceneManager_1.UiSceneManager.SetUiEndSequenceFrame(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UiRoleSequenceEndKeyFrame);
  }
  static GetUiWeaponBreachLevel() {
    return ModelManager_1.ModelManager.WeaponModel?.BlueprintWeaponBreachLevel ?? 0;
  }
  static GetUiWeaponEquippedRoleId() {
    return ModelManager_1.ModelManager.WeaponModel?.BlueprintWeaponEquippedRoleId ?? 0;
  }
  static GetWeaponViewName() {
    return ModelManager_1.ModelManager.WeaponModel?.GetCurSelectViewName() ?? 0;
  }
  static IsGamepadNow() {
    return Info_1.Info.IsInGamepad();
  }
  static IsMobileNow() {
    return Info_1.Info.IsInTouch();
  }
  static IsLongPressExploreButton() {
    return ModelManager_1.ModelManager.BattleUiModel.IsLongPressExploreButton;
  }
  static ShowGenericPrompt(e) {
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(e);
  }
}
(exports.UiBlueprintFunctionLibrary = UiBlueprintFunctionLibrary).TimerId = undefined;
UiBlueprintFunctionLibrary.CheckReLogin = () => {
  if (ModelManager_1.ModelManager.LoginModel.IsLoginStatus(LoginDefine_1.ELoginStatus.Init)) {
    TimerSystem_1.TimerSystem.Delay(() => {
      ModelManager_1.ModelManager.LoginModel.CleanLoginFailCount(LoginDefine_1.ECleanFailCountWay.TestLogin);
      LoginController_1.LoginController.GetHttp(true);
    }, TimeUtil_1.TimeUtil.InverseMillisecond);
  }
};
UiBlueprintFunctionLibrary.CheckWorldDone = () => {
  if (ModelManager_1.ModelManager.GameModeModel.WorldDone) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetGmIsOpen, true);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LoginStatusChange, UiBlueprintFunctionLibrary.CheckReLogin);
    TimerSystem_1.TimerSystem.Remove(UiBlueprintFunctionLibrary.TimerId);
    UiBlueprintFunctionLibrary.TimerId = undefined;
  }
};
exports.default = UiBlueprintFunctionLibrary; //# sourceMappingURL=UiBlueprintFunctionLibrary.js.map