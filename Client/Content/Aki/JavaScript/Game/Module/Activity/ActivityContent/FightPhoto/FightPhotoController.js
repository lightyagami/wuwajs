"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FightPhotoController = exports.stepTextIdList = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../../GlobalData");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const InstanceDungeonController_1 = require("../../../InstanceDungeon/InstanceDungeonController");
const SplashScreenTask_1 = require("../../../SplashScreen/SplashScreenTask");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const FightPhotoActivityData_1 = require("./Data/FightPhotoActivityData");
const FightPhotoActivitySubView_1 = require("./View/FightPhotoActivitySubView");
exports.stepTextIdList = ["PhotographicTipMainText_01", "PhotographicTipMainText_02", "PhotographicTipMainText_03"];
const MAX_STEP_NUM = 3;
class FightPhotoController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.WRd = undefined;
    this.G5d = 0;
    this.QRd = e => {
      this.WRd.UpdateTaskData(e.Nbd);
    };
    this.KRd = e => {
      this.WRd.UpdateLevelData(e.Hbd, false);
    };
    this.JDe = () => {
      var e;
      if (this.WRd && this.CheckInFightPhotoDungeon() && (UiManager_1.UiManager.OpenView("FightPhotoFocusView"), ControllerHolder_1.ControllerHolder.FilterSettingController.SetDefaultFilterSetting(), (e = this.F5d()) < MAX_STEP_NUM) && this.G5d < e) {
        this.G5d = e;
        this.ShowFightPhotoTips(exports.stepTextIdList[e]);
      }
    };
    this.nye = () => {
      if (this.WRd && this.WRd.IsNeedShowFightPhotoMainView) {
        this.tHu();
      }
      if (this.CheckInFightPhotoDungeon()) {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.ForceNoPerBoneMotionBlur 1");
        UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "fx.Niagara.FixScaleZeroProblem 1");
      }
    };
    this.g3e = e => {
      var t;
      if (this.WRd && e.has(this.WRd.Id) && this.CheckInFightPhotoDungeon()) {
        e = () => {
          this.LeaveInstanceDungeon();
        };
        (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(393)).FunctionMap.set(1, e);
        t.FunctionMap.set(0, e);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
      }
    };
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(24657, this.QRd);
    Net_1.Net.Register(21989, this.KRd);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(24657);
    Net_1.Net.UnRegister(21989);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActiveBattleView, this.JDe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivityClose, this.g3e);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActiveBattleView, this.JDe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivityClose, this.g3e);
  }
  OnOpenView(e) {
    throw new Error("Method not implemented.");
  }
  OnGetActivityResource(e) {
    return "UiItem_ActivityBattlePhoto";
  }
  OnCreateSubPageComponent(e) {
    return new FightPhotoActivitySubView_1.FightPhotoActivitySubView();
  }
  OnCreateActivityData(e) {
    var t = new FightPhotoActivityData_1.FightPhotoActivityData();
    return this.WRd = t;
  }
  OnGetIsOpeningActivityRelativeView() {
    for (const e of ["FightPhotoMainView", "FightPhotoRewardView"]) {
      if (UiManager_1.UiManager.IsViewOpen(e)) {
        return true;
      }
    }
    return false;
  }
  OnActivityFirstUnlock(e) {
    UiManager_1.UiManager.OpenView("FightPhotoUnlockTipView");
  }
  async OnOpenSubView(e) {
    var t = this.GetActivityData();
    if (t && e === "FightPhotoMainView") {
      return !!(await UiManager_1.UiManager.OpenViewAsync("FightPhotoMainView", t));
    } else {
      return Promise.resolve(false);
    }
  }
  GetActivityData() {
    if (!this.WRd) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FightPhotograph", 71, "战斗拍照活动数据为空");
      }
    }
    return this.WRd;
  }
  async EnterFightPhotoDungeonDirectly(e, t, o, i) {
    e = {
      w6n: e,
      gG_: t
    };
    ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.Wbd = e;
    e = await InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(o, i, 0, 0);
    if (e) {
      this.GetActivityData().SetCurrentLevelId(t);
    } else {
      ModelManager_1.ModelManager.LoadingModel.ClearSpecifiedLoadingConfig();
    }
  }
  RequestTaskReward(e) {
    const t = this.GetActivityData();
    var o = new Protocol_1.Aki.Protocol.Ubd();
    o.$bd = e;
    o.w6n = t.Id;
    Net_1.Net.Call(22904, o, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21302);
        } else {
          t.UpdateTaskRewardStatus(e.Nbd);
        }
      }
    });
  }
  RequestInstanceSettle() {
    var e = new Protocol_1.Aki.Protocol.kbd();
    Net_1.Net.Call(16438, e, e => {
      if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 26075);
      }
    });
  }
  CheckInFightPhotoDungeon() {
    var e;
    return !!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && (e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(), ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)?.InstSubType === 42);
  }
  LeaveInstanceDungeon() {
    if (this.CheckInFightPhotoDungeon()) {
      ModelManager_1.ModelManager.PhotographModel.SetPhotographTimeDilation(1);
      AudioSystem_1.AudioSystem.SetState("game_sys_fightphoto", "none");
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.ForceNoPerBoneMotionBlur 0");
      UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "fx.Niagara.FixScaleZeroProblem 0");
      if (this.WRd && !this.WRd.CheckIfClose()) {
        this.WRd.IsNeedShowFightPhotoMainView = true;
      }
      ControllerHolder_1.ControllerHolder.PhotographController.ClearAllSavedFightPhotos();
      ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest();
      this.G5d = 0;
    }
  }
  tHu() {
    var e = new SplashScreenTask_1.SplashScreenTask(0, 1, () => {
      UiManager_1.UiManager.OpenView("FightPhotoMainView", this.WRd);
    });
    ControllerHolder_1.ControllerHolder.SplashScreenController.PushSplashScreenTask(e);
  }
  F5d() {
    return ControllerHolder_1.ControllerHolder.PhotographController.GetSavedFightPhotos().length;
  }
  ShowFightPhotoTips(e) {
    if (!exports.stepTextIdList.includes(e) || !!UiManager_1.UiManager.IsViewShow("BattleView")) {
      e = new LguiUtil_1.TableTextArgNew(e);
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(36, e);
    }
  }
}
exports.FightPhotoController = FightPhotoController;
//# sourceMappingURL=FightPhotoController.js.map