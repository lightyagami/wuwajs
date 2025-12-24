"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityNewPlayerSupportController = undefined;
const Info_1 = require("../../../../../Core/Common/Info");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const RewardItemData_1 = require("../../../ItemReward/RewardData/RewardItemData");
const RoleUtils_1 = require("../../../RoleUi/RoleUtils");
const SplashScreenTask_1 = require("../../../SplashScreen/SplashScreenTask");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityNewPlayerSupportData_1 = require("./ActivityNewPlayerSupportData");
const ActivityNewPlayerSupportDefine_1 = require("./ActivityNewPlayerSupportDefine");
const ActivityNewPlayerSupportSubView_1 = require("./ActivityNewPlayerSupportSubView");
const NewPlayerSupportTrialRoleViewModel_1 = require("./View/NewPlayerSupportTrialRoleViewModel");
class ActivityNewPlayerSupportController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.X4c = undefined;
    this.Jca = new Map();
    this.sDf = e => {
      if (this.X4c) {
        this.X4c.UpdateTaskData(e.nAu);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.X4c.Id);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnActivityNewPlayerSupportTaskUpdate);
    };
    this.fBf = e => {
      for (const t of e.Ogf) {
        this.gBf(t);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.X4c.Id);
    };
    this.nye = () => {
      this.Jca.set(ActivityNewPlayerSupportDefine_1.ENewPlayerSupportStartCondition.WorldDone, true);
      this.zca();
    };
    this.k6f = () => {
      var e = ModelManager_1.ModelManager.GameModeModel.WorldDone;
      this.Jca.set(ActivityNewPlayerSupportDefine_1.ENewPlayerSupportStartCondition.WorldDone, e);
      var e = this.X4c?.IsActivityFirstShow ?? false;
      this.Jca.set(ActivityNewPlayerSupportDefine_1.ENewPlayerSupportStartCondition.FirstShow, e);
      this.zca();
    };
  }
  get ActivityData() {
    return this.X4c;
  }
  OnInit() {
    let e = false;
    if (!Info_1.Info.IsBuildShipping) {
      e = LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.NewPlayerSupportForbidStartView, false) ?? false;
    }
    this.Jca.set(ActivityNewPlayerSupportDefine_1.ENewPlayerSupportStartCondition.UnForbidStart, !e);
    return true;
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivityNewPlayerSupportInfoUpdate, this.k6f);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivityNewPlayerSupportInfoUpdate, this.k6f);
  }
  OnClear() {
    this.Jca.clear();
    return true;
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(28009, this.sDf);
    Net_1.Net.Register(18065, this.fBf);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(28009);
    Net_1.Net.UnRegister(18065);
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_BeginnerSupportGuideView";
  }
  OnCreateSubPageComponent(e) {
    return new ActivityNewPlayerSupportSubView_1.ActivityNewPlayerSupportSubView();
  }
  OnCreateActivityData(e) {
    this.X4c = new ActivityNewPlayerSupportData_1.ActivityNewPlayerSupportData();
    return this.X4c;
  }
  OnGetIsOpeningActivityRelativeView() {
    for (const e of ["ActivityNewPlayerSupportTrialRoleView"]) {
      if (UiManager_1.UiManager.IsViewOpen(e)) {
        return true;
      }
    }
    return false;
  }
  zca() {
    if (PublicUtil_1.PublicUtil.GetIsSilentLogin() || this.X4c?.AlreadyStartView) {
      this.Ajf();
    } else {
      let e = true;
      for (const i in ActivityNewPlayerSupportDefine_1.ENewPlayerSupportStartCondition) {
        var t = Number(i);
        if (!isNaN(t)) {
          if (!(this.Jca.get(t) ?? false)) {
            e = false;
            break;
          }
        }
      }
      var r;
      if (e) {
        r = new SplashScreenTask_1.SplashScreenTask(6, 0, () => {
          UiManager_1.UiManager.OpenView("ActivityNewPlayerSupportStartupView");
        });
        ControllerHolder_1.ControllerHolder.SplashScreenController.PushSplashScreenTask(r);
      } else {
        this.Ajf();
      }
    }
  }
  Ajf() {
    this.Jca.set(ActivityNewPlayerSupportDefine_1.ENewPlayerSupportStartCondition.WorldDone, false);
  }
  RequestRewardTask(e, t = false) {
    let v = [];
    if (t) {
      v = this.ActivityData?.GetCanReceiveTaskIdList() ?? [];
    } else {
      v.push(e);
    }
    if (!!v && !(v.length <= 0)) {
      (t = Protocol_1.Aki.Protocol.Agf.create()).B6n = v;
      Net_1.Net.Call(27388, t, e => {
        if (e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 17339);
        } else {
          var t = new Map();
          for (const l of v) {
            var r = this.X4c.GetTaskData(l);
            r.SetTaskStatus(Protocol_1.Aki.Protocol.Bwu.Proto_ConditionTaskTaken);
            var r = r.GetRewardList();
            for (const s of r) {
              var i = s[0].ItemId;
              var o = s[1];
              var a = s[0].IncId;
              if (t.has(i)) {
                t.get(i).Count += o;
              } else {
                t.set(i, new RewardItemData_1.RewardItemData(i, o, a));
              }
            }
          }
          var n = Array.from(t.values());
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnActivityNewPlayerSupportTaskUpdate);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.X4c.Id);
          var e = e.Q6n;
          for (const _ of e) {
            this.gBf(_);
          }
          this.OpenRewardView(n, e);
        }
      });
    }
  }
  RequestTrialRoleLvUp(e) {
    var t = Protocol_1.Aki.Protocol.Ugf.create();
    t.Ogf = e;
    Net_1.Net.Call(20407, t, e => {
      if (e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 16830);
      } else {
        this.gBf(e.Q6n);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.ActivityData.Id);
      }
    });
  }
  RequestSetCurUseTrialRole(e) {
    var t;
    if (RoleUtils_1.RoleUtils.GetTrialRoleType(e) === 2) {
      (t = Protocol_1.Aki.Protocol.ZEf.create()).Ogf = e;
      Net_1.Net.Call(16492, t, e => {
        var t;
        if (e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 16191);
        } else {
          t = e.Q6n;
          this.ActivityData?.UpdateCurUseTrialRole(t, e.oXf);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnActivityNewPlayerSupportCurTrialRoleChange, t);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.X4c.Id);
        }
      });
    }
  }
  OpenTrialRoleView(e = undefined) {
    var e = new NewPlayerSupportTrialRoleViewModel_1.NewPlayerSupportTrialRoleViewModel(2, CommonParamById_1.configCommonParamById.GetStringConfig("NewPlayerSupportTrialRoleIcon"), CommonParamById_1.configCommonParamById.GetStringConfig("NewPlayerSupportTrialRoleTitle"), ActivityNewPlayerSupportDefine_1.TRAIL_ROLE_HELP_ID, e);
    e.SetRequestTrialRoleLvUpFunc(e => {
      this.RequestTrialRoleLvUp(e);
    });
    e.SetRequestSetCurUseTrialRoleFunc(e => {
      this.RequestSetCurUseTrialRole(e);
    });
    var t = ConfigManager_1.ConfigManager.ActivityNewPlayerSupportConfig.GetTrialRoleUnlockDesc();
    e.SetTrialRoleGroupUnlockDesc(t);
    this.ActivityData.SaveTrailRoleEntranceRedDot(false);
    UiManager_1.UiManager.OpenView("ActivityNewPlayerSupportTrialRoleView", e);
  }
  OpenRewardView(e, t) {
    var e = ModelManager_1.ModelManager.ItemRewardModel.RefreshCommonRewardDataFromConfig(1009, "ActivityNewPlayerSupportRewardView", e, undefined);
    if (e) {
      e = {
        RewardData: e,
        TrialRoleList: t
      };
      UiManager_1.UiManager.OpenView("ActivityNewPlayerSupportRewardView", e);
    }
  }
  gBf(e) {
    var t = ConfigManager_1.ConfigManager.TrialRoleConfig?.GetTrialRoleGroupId(e);
    if (ModelManager_1.ModelManager.TrialRoleModel.GetDataByGroupId(t).IsLocked()) {
      this.ActivityData.SaveTrailRoleEntranceRedDot(true);
    }
    this.ActivityData.UpdateActivatedTrialRole(e);
  }
  NotifyRedDotRefresh() {
    if (this.X4c) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.X4c.Id);
    }
  }
  SetForbidActivityStart(e) {
    if (!Info_1.Info.IsBuildShipping) {
      this.Jca.set(ActivityNewPlayerSupportDefine_1.ENewPlayerSupportStartCondition.UnForbidStart, !e);
      LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.NewPlayerSupportForbidStartView, e);
      if (e) {
        if (UiManager_1.UiManager.IsViewOpen("ActivityNewPlayerSupportStartupView")) {
          UiManager_1.UiManager.CloseView("ActivityNewPlayerSupportStartupView");
        }
      } else {
        this.zca();
      }
    }
  }
}
exports.ActivityNewPlayerSupportController = ActivityNewPlayerSupportController;
//# sourceMappingURL=ActivityNewPlayerSupportController.js.map