"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightController = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const InstanceDungeonController_1 = require("../../../InstanceDungeon/InstanceDungeonController");
const SplashScreenTask_1 = require("../../../SplashScreen/SplashScreenTask");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const MotorFightActivityData_1 = require("./Data/MotorFightActivityData");
const MotorFightActivitySubView_1 = require("./View/MotorFightActivitySubView");
class MotorFightController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.dcg = undefined;
    this.IsNeedShowMotorFightMainView = false;
    this.d8g = 0;
    this.m8g = 0;
    this.f8g = 0;
    this.mcg = e => {
      this.GetMotorFightActivityData()?.UpdateLevelDataList(e.ixf, true);
    };
    this.fcg = e => {
      this.GetMotorFightActivityData()?.UpdateMotorFightItemDataList(e.oxf, true);
    };
    this.gcg = e => {
      this.GetMotorFightActivityData()?.UpdateRoleData(e.uxf, true);
    };
    this.Ccg = e => {
      this.GetMotorFightActivityData()?.UpdateTaskData(e.vlu, true);
    };
    this.pcg = e => {
      this.GetMotorFightActivityData()?.UpdateMotorFightTalentDataList(e.nxf, true);
    };
    this.xCg = e => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("MotorFightActivity", 71, "摩托战斗结算通知", ["isWin", e.ulu]);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorArrowGameOver);
      if (e.ulu) {
        UiManager_1.UiManager.OpenView("MotorFightSuccessView", e.j7n);
      } else {
        UiManager_1.UiManager.OpenView("MotorFightFailView");
      }
    };
    this.nye = () => {
      if (this.IsNeedShowMotorFightMainView) {
        this.tHu();
      }
    };
    this.g3e = e => {
      var t;
      if (this.dcg && e.has(this.dcg.Id) && this.CheckInMotorFightDungeon()) {
        e = () => {
          this.LeaveInstanceDungeon();
        };
        (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(461)).FunctionMap.set(1, e);
        t.FunctionMap.set(0, e);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
      }
    };
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(20038, this.mcg);
    Net_1.Net.Register(25272, this.fcg);
    Net_1.Net.Register(22299, this.gcg);
    Net_1.Net.Register(17344, this.Ccg);
    Net_1.Net.Register(27189, this.pcg);
    Net_1.Net.Register(16474, this.xCg);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(20038);
    Net_1.Net.UnRegister(25272);
    Net_1.Net.UnRegister(22299);
    Net_1.Net.UnRegister(17344);
    Net_1.Net.UnRegister(27189);
    Net_1.Net.UnRegister(16474);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivityClose, this.g3e);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivityClose, this.g3e);
  }
  OnOpenView(e) {
    throw new Error("Method not implemented.");
  }
  OnGetActivityResource(e) {
    return "UiItem_MotorcycleBattleMain";
  }
  OnCreateSubPageComponent(e) {
    return new MotorFightActivitySubView_1.MotorFightActivitySubView();
  }
  OnCreateActivityData(e) {
    var t = new MotorFightActivityData_1.MotorFightActivityData();
    return this.dcg = t;
  }
  OnGetIsOpeningActivityRelativeView() {
    for (const e of ["MotorFightMainView", "MotorFightLevelDetailView", "MotorFightRoleSelectView", "MotorFightTalentTreeView", "MotorFightHandBookView", "MotorFightRankView", "MotorFightRewardView"]) {
      if (UiManager_1.UiManager.IsViewOpen(e)) {
        return true;
      }
    }
    return false;
  }
  GetMotorFightActivityData() {
    if (this.dcg) {
      return this.dcg;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MotorFightActivity", 71, "摩托战斗活动数据不存在");
    }
  }
  async OnOpenSubView(e) {
    var t = this.GetMotorFightActivityData();
    if (t && e === "MotorFightMainView") {
      return !!(await UiManager_1.UiManager.OpenViewAsync("MotorFightMainView", t));
    } else {
      return Promise.resolve(false);
    }
  }
  RequestUnlockTalentNode(t, o) {
    var e = new Protocol_1.Aki.Protocol.GUf();
    e.P4d = t;
    Net_1.Net.Call(18060, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16460);
        } else {
          this.GetMotorFightActivityData()?.UpdateMotorFightTalentData(t);
          o();
        }
      }
    });
  }
  RequestTaskReward(t) {
    var e = new Protocol_1.Aki.Protocol.NUf();
    e.B6n = t;
    Net_1.Net.Call(16047, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22004);
        } else {
          this.GetMotorFightActivityData()?.GetTaskReward(t);
        }
      }
    });
  }
  async RequestRankDataList() {
    var e = new Protocol_1.Aki.Protocol.HUf();
    e.w6n = this.GetMotorFightActivityData().Id;
    var e = await Net_1.Net.CallAsync(16739, e);
    if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.Proto_MotorFightRankListCd) {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 17910);
      } else {
        this.GetMotorFightActivityData().UpdateFriendsRankList(e.lxf);
      }
    }
  }
  async RequestMyRankData() {
    var e = new Protocol_1.Aki.Protocol.eFg();
    e.w6n = this.GetMotorFightActivityData().Id;
    var e = await Net_1.Net.CallAsync(24942, e);
    if (e) {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29639);
      } else {
        this.GetMotorFightActivityData().UpdateMyRank(e.f91);
      }
    }
  }
  RequestSettlement(r, i) {
    var e = new Protocol_1.Aki.Protocol.zUf();
    Net_1.Net.Call(16374, e, e => {
      var t;
      var o;
      if (e) {
        if (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 19908);
        } else {
          i?.();
          this.GetMotorFightActivityData().SetLastSavedLevelData(undefined);
          if (r) {
            t = e.j7n.Ffg.gG_;
            o = e.j7n.Ffg.Yma;
            if (this.GetMotorFightActivityData().GetLevelDataById(t)?.Type === 2 && o === 0) {
              this.LeaveInstanceDungeon();
            } else {
              if (e.ulu) {
                UiManager_1.UiManager.OpenView("MotorFightSuccessView", e.j7n);
              } else {
                UiManager_1.UiManager.OpenView("MotorFightFailView");
              }
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorArrowGameOver);
            }
          }
        }
      }
    });
  }
  async RequestLastSavedLevelData() {
    var e;
    var t = new Protocol_1.Aki.Protocol.ZUf();
    var t = await Net_1.Net.CallAsync(22678, t);
    if (t) {
      if (t.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.G9n, 29555);
      } else {
        e = this.GetMotorFightActivityData();
        if (t.Gfg) {
          e?.SetLastSavedLevelData(t._xf);
        } else {
          e?.SetLastSavedLevelData(undefined);
        }
      }
    }
  }
  EnterMotorFightDungeonDirectly(e, t, o = false) {
    e = {
      gG_: this.d8g = e,
      Q6n: this.m8g = t,
      NId: o
    };
    o = this.GetMotorFightActivityData().GetMotorFightRoleData(t);
    t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(o.TrialRoleId);
    ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.dxf = e;
    this.f8g = t.GetDataId();
    InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(0, [this.f8g], 0, 0);
  }
  ReChallengeMotorFightDungeon() {
    var e = {
      gG_: this.d8g,
      Q6n: this.m8g,
      NId: false
    };
    ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.dxf = e;
    InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(0, [this.f8g], 0, 0);
  }
  LeaveInstanceDungeon() {
    if (this.dcg && !this.dcg.CheckIfClose()) {
      this.IsNeedShowMotorFightMainView = true;
    }
    ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest();
  }
  tHu() {
    const e = this.GetMotorFightActivityData();
    var t;
    if (e) {
      t = new SplashScreenTask_1.SplashScreenTask(0, 1, () => {
        UiManager_1.UiManager.OpenView("MotorFightMainView", e);
      });
      ControllerHolder_1.ControllerHolder.SplashScreenController.PushSplashScreenTask(t);
    }
  }
  CheckInMotorFightDungeon() {
    var e;
    return !!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && (e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(), ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)?.InstSubType === 44);
  }
}
exports.MotorFightController = MotorFightController;
//# sourceMappingURL=MotorFightController.js.map