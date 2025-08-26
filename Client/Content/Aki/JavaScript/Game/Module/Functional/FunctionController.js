"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FunctionController = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const FunctionOpenViewLimitAll_1 = require("../../../Core/Define/ConfigQuery/FunctionOpenViewLimitAll");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const PlatformSdkManagerNew_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const InputDistributeDefine_1 = require("../../Ui/InputDistribute/InputDistributeDefine");
const UiManager_1 = require("../../Ui/UiManager");
const UiModel_1 = require("../../Ui/UiModel");
const ActivityDirectTrainHelper_1 = require("../Activity/ActivityContent/DirectTrain/ActivityDirectTrainHelper");
const EditFormationController_1 = require("../EditFormation/EditFormationController");
const MailBindController_1 = require("../MailBind/MailBindController");
const TutorialController_1 = require("../Tutorial/TutorialController");
class FunctionController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    this.K9t.set(10001, FunctionController.Q9t);
    this.K9t.set(10002, FunctionController.X9t);
    this.K9t.set(10003, FunctionController.$9t);
    this.K9t.set(10004, FunctionController.Y9t);
    this.K9t.set(10020, FunctionController.J9t);
    this.K9t.set(10018, FunctionController.z9t);
    this.K9t.set(10015, FunctionController.Fut);
    this.K9t.set(10019, FunctionController.Z9t);
    this.K9t.set(10007, EditFormationController_1.EditFormationController.OpenEditFormationView);
    this.K9t.set(10011, FunctionController.t7t);
    this.K9t.set(10010, FunctionController.i7t);
    this.K9t.set(10009, FunctionController.o7t);
    this.K9t.set(10022, TutorialController_1.TutorialController.OpenTutorialView);
    this.K9t.set(10023, ControllerHolder_1.ControllerHolder.AdventureGuideController.OpenGuideView);
    this.K9t.set(10026, FunctionController.r7t);
    this.K9t.set(10029, FunctionController.n7t);
    this.K9t.set(10028, FunctionController.s7t);
    this.K9t.set(10034, FunctionController.a7t);
    this.K9t.set(10035, FunctionController.h7t);
    this.K9t.set(10040, FunctionController.l7t);
    this.K9t.set(10041, FunctionController._7t);
    this.K9t.set(10051, FunctionController.u7t);
    this.K9t.set(10049, FunctionController.c7t);
    this.K9t.set(10013, FunctionController.m7t);
    this.K9t.set(10053, FunctionController.d7t);
    this.K9t.set(10028, FunctionController.C7t);
    this.K9t.set(10058, FunctionController.g7t);
    this.K9t.set(10021, FunctionController.f7t);
    this.K9t.set(10072, FunctionController.jtl);
    this.K9t.set(10086, FunctionController.D71);
    this.K9t.set(10095, FunctionController.Fvu);
    return true;
  }
  static InitFunctionOpenViewLimit() {
    var o = FunctionOpenViewLimitAll_1.configFunctionOpenViewLimitAll.GetConfigList();
    var e = o.length;
    for (let n = 0; n < e; n++) {
      var r = o[n];
      this.p7t.add(r.ViewName);
    }
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.v7t);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.v7t);
  }
  static async TryOpenFunctionOpenView() {
    if (!this.M7t()) {
      return false;
    }
    const o = new CustomPromise_1.CustomPromise();
    if (!UiManager_1.UiManager.IsViewOpen("FunctionOpenView")) {
      UiManager_1.UiManager.OpenView("FunctionOpenView", undefined, n => {
        o.SetResult(n);
      });
    }
    return o.Promise;
  }
  static async ManualOpenFunctionOpenView(...n) {
    var o;
    var e = [];
    for (const r of n) {
      if (ConfigManager_1.ConfigManager.FunctionConfig.GetFunctionCondition(r).ShowUIType !== 2) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Functional", 10, "传入的id表格不支持手动开启,详细查功能开启表", ["FunctionId", r]);
        }
      } else if ((o = ModelManager_1.ModelManager.FunctionModel.GetFunctionInstance(r)).GetIsOpen()) {
        if (o.GetHasManualShowUi()) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Functional", 10, "传入的id已经手动开启过了,不允许再次开启", ["FunctionId", r]);
          }
        } else {
          e.push(r);
        }
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Functional", 10, "传入的id还未开启", ["FunctionId", r]);
      }
    }
    return !(e.length <= 0) && this.E7t(e);
  }
  static async E7t(n) {
    var o = Protocol_1.Aki.Protocol.Krs.create();
    o.d6n = n;
    var o = await Net_1.Net.CallAsync(21595, o);
    if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 25084);
      return false;
    } else {
      ModelManager_1.ModelManager.FunctionModel.RefreshInfoManualState(n);
      return this.TryOpenFunctionOpenView();
    }
  }
  static M7t() {
    if (!ModelManager_1.ModelManager.FunctionModel.IsExistNewOpenFunction()) {
      return false;
    }
    let n = false;
    var o = UiModel_1.UiModel.NormalStack.Peek();
    if (!o) {
      return false;
    }
    if (!(n = !(n = o.Info.Name === "BattleView" ? true : n) && this.S7t(o.Info.Name) ? true : n)) {
      return false;
    }
    if (!ModelManager_1.ModelManager.InputDistributeModel.IsAllowUiInput()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Functional", 37, "功能开启界面打开时UI输入存在限制,不打开");
      }
      ModelManager_1.ModelManager.InputDistributeModel.AddInputDistributeTagChangedListener(InputDistributeDefine_1.inputDistributeTagDefine.UiInputRootTag, this.xMe);
      return false;
    }
    let e = true;
    var r = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    for (const t of [1733479717, -1791250236]) {
      if (r?.GameplayTagComponent?.HasTag(t)) {
        r?.GameplayTagComponent?.AddTagAddOrRemoveListener(t, FunctionController.Uzs);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Functional", 37, "功能开启界面打开时存在Tag限制", ["TagId", t]);
        }
        e = false;
      }
    }
    return !!e;
  }
  static S7t(n) {
    if (!this.y7t) {
      this.InitFunctionOpenViewLimit();
      this.y7t = true;
    }
    return this.p7t.has(n);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(25685, n => {
      ModelManager_1.ModelManager.FunctionModel.SetFunctionOpenInfo(n);
    });
    Net_1.Net.Register(25221, n => {
      ModelManager_1.ModelManager.FunctionModel.UpdateFunctionOpenInfo(n);
      FunctionController.TryOpenFunctionOpenView();
    });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(25685);
    Net_1.Net.UnRegister(25221);
  }
  static async mXa() {
    if ((await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestrictedAsync(ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyAccountId())) === 1) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("MultiPlayerTeam", 27, "通信受限，拒绝申请");
      }
      this.O3a();
    } else {
      UiManager_1.UiManager.OpenView("FriendView");
    }
  }
  static async O3a() {
    await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().OpenMessageBox(ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyUserId(), 3, 6);
  }
  static async dXa() {
    var n;
    var o;
    if ((await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestrictedAsync(ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyAccountId())) === 1) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("MultiPlayerTeam", 27, "通信受限，拒绝申请");
      }
      this.O3a();
    } else {
      n = ModelManager_1.ModelManager.GameModeModel.IsMulti;
      o = ModelManager_1.ModelManager.OnlineModel.IsOnlineDisabled();
      if (!n && o) {
        ControllerHolder_1.ControllerHolder.OnlineController.ShowTipsWhenOnlineDisabled();
      } else {
        UiManager_1.UiManager.OpenView("OnlineWorldHallView");
      }
    }
  }
  static OpenFunctionRelateView(n) {
    var o;
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(n)) {
      if (o = FunctionController.K9t.get(n)) {
        o();
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Functional", 10, "原因：查找不到对应按钮打开界面的实现方式 解决：在FunctionController.OpenFunctionViewMap注册打开界面方法", ["功能ID", n]);
      }
    } else {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("FunctionDisable");
    }
  }
  static OnClear() {
    return true;
  }
}
exports.FunctionController = FunctionController;
(_a = FunctionController).y7t = false;
FunctionController.K9t = new Map();
FunctionController.p7t = new Set();
FunctionController.xMe = (n, o) => {
  if (o) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Functional", 37, "功能开启界面打开时InputTag限制解除");
    }
    ModelManager_1.ModelManager.InputDistributeModel.RemoveInputDistributeTagChangedListener(InputDistributeDefine_1.inputDistributeTagDefine.UiInputRootTag, _a.xMe);
    _a.TryOpenFunctionOpenView();
  }
};
FunctionController.Uzs = (n, o) => {
  if (!o) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Functional", 37, "功能开启界面打开时Tag限制解除", ["TagId", n]);
    }
    ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData()?.GameplayTagComponent?.RemoveTagAddOrRemoveListener(n, FunctionController.Uzs);
    _a.TryOpenFunctionOpenView();
  }
};
FunctionController.v7t = n => {
  FunctionController.TryOpenFunctionOpenView();
};
FunctionController.Q9t = () => {
  ControllerHolder_1.ControllerHolder.RoleController.OpenRoleMainView(0);
};
FunctionController.X9t = () => {
  UiManager_1.UiManager.OpenView("InventoryView");
};
FunctionController.$9t = () => {
  UiManager_1.UiManager.OpenView("CalabashRootView");
};
FunctionController.Y9t = () => {
  UiManager_1.UiManager.OpenView("QuestView");
};
FunctionController.J9t = () => {
  UiManager_1.UiManager.OpenView("MailBoxView");
};
FunctionController.Z9t = () => {
  UiManager_1.UiManager.OpenView("MenuView");
};
FunctionController.Fut = () => {
  ControllerHolder_1.ControllerHolder.WorldMapController.OpenView(1, false);
};
FunctionController.z9t = () => {
  UiManager_1.UiManager.OpenView("TimeOfDaySecondView");
};
FunctionController.t7t = () => {
  _a.mXa();
};
FunctionController.i7t = () => {
  ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopView();
};
FunctionController.o7t = () => {
  ControllerHolder_1.ControllerHolder.GachaController.OpenGachaMainView(true);
};
FunctionController.r7t = () => {
  ControllerHolder_1.ControllerHolder.RouletteController.OpenAssemblyView();
};
FunctionController.s7t = () => {
  ControllerHolder_1.ControllerHolder.KuroSdkController.OpenFeedback();
};
FunctionController.n7t = () => {};
FunctionController._7t = () => {
  UiManager_1.UiManager.OpenView("RoleHandBookSelectionView");
};
FunctionController.u7t = () => {
  UiManager_1.UiManager.OpenView("HandBookEntranceView");
};
FunctionController.c7t = () => {
  ControllerHolder_1.ControllerHolder.PhotographController.TryOpenPhotograph(0);
};
FunctionController.d7t = () => {
  ControllerHolder_1.ControllerHolder.ActivityController.OpenActivityById(0, 2);
};
FunctionController.C7t = () => {
  ControllerHolder_1.ControllerHolder.LogController.RequestOutputDebugInfo();
  ControllerHolder_1.ControllerHolder.KuroSdkController.OpenCustomerService(2);
};
FunctionController.g7t = () => {
  if (ModelManager_1.ModelManager.MailBindModel?.GetIsReward()) {
    ControllerHolder_1.ControllerHolder.ChannelController.OpenKuroStreet();
  } else {
    UiManager_1.UiManager.OpenView("MailBindView", false);
  }
  MailBindController_1.MailBindController.RecordMailBindClick();
};
FunctionController.jtl = () => {
  UiManager_1.UiManager.OpenView("MailBindView", true);
  MailBindController_1.MailBindController.RecordMailBindClick();
};
FunctionController.D71 = () => {
  ControllerHolder_1.ControllerHolder.ChannelController.OpenGameIntroduction();
  ModelManager_1.ModelManager.KuroSdkModel.SaveCurrentClickIntroductionVersion();
};
FunctionController.Fvu = () => {
  ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.TryOpenPro(false);
};
FunctionController.f7t = () => {
  _a.dXa();
};
FunctionController.m7t = () => {
  ControllerHolder_1.ControllerHolder.AchievementController.OpenAchievementMainView();
};
FunctionController.h7t = () => {
  UiManager_1.UiManager.OpenView("ComposeCarryOnView");
};
FunctionController.a7t = () => {
  UiManager_1.UiManager.OpenView("ForgingRootView");
};
FunctionController.l7t = () => {
  ControllerHolder_1.ControllerHolder.BattlePassController.OpenBattlePassView();
}; //# sourceMappingURL=FunctionController.js.map