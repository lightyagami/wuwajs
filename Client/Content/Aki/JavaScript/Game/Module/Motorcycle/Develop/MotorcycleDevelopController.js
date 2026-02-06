"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleDevelopController = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../../Core/Net/Net");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const RoleLevelUpSuccessController_1 = require("../../RoleUi/RoleLevel/RoleLevelUpSuccessController");
class MotorcycleDevelopController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.OnRegisterNetEvent();
    return true;
  }
  static OnClear() {
    this.OnUnRegisterNetEvent();
    return true;
  }
  static OnRegisterNetEvent() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenSet, this.DQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.RQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
    Net_1.Net.Register(26255, MotorcycleDevelopController._mf);
    Net_1.Net.Register(20476, MotorcycleDevelopController.umf);
    Net_1.Net.Register(19526, MotorcycleDevelopController.cmf);
    Net_1.Net.Register(15582, MotorcycleDevelopController.dmf);
    Net_1.Net.Register(23160, MotorcycleDevelopController.mmf);
    Net_1.Net.Register(18120, MotorcycleDevelopController.fmf);
    Net_1.Net.Register(20567, MotorcycleDevelopController.jng);
  }
  static OnUnRegisterNetEvent() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenSet, this.DQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.RQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
    Net_1.Net.UnRegister(26255);
    Net_1.Net.UnRegister(20476);
    Net_1.Net.UnRegister(19526);
    Net_1.Net.UnRegister(15582);
    Net_1.Net.UnRegister(23160);
    Net_1.Net.UnRegister(18120);
    Net_1.Net.UnRegister(20567);
  }
  static RequestMotorInfo() {
    var e = new Protocol_1.Aki.Protocol.Guf();
    Net_1.Net.Call(16521, e, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27888);
      } else {
        ModelManager_1.ModelManager.MotorcycleDevelopModel.UpdateMotorInfo(e.zuf);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDevelopInfoUpdate);
        this.hVg = false;
      }
    });
  }
  static RequestMotorTechLevelUp(o) {
    var e = new Protocol_1.Aki.Protocol.Buf();
    e.Juf = o;
    Net_1.Net.Call(29190, e, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18554);
      } else {
        ModelManager_1.ModelManager.MotorcycleDevelopModel.UpdateOneTechTree(e.Zuf);
        MotorcycleDevelopController.DDf(o);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDevelopTechTreeUpdate, true);
      }
    });
  }
  static DDf(e) {
    var o = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetTechNodeById(e);
    var e = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechConfig(e).TechLv[o.NodeLevel - 1];
    var o = {
      Title: "MotorBike_TechTree_LevelUpSuccess",
      TextList: [{
        TextId: ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechLvConfig(e).Desc,
        Params: []
      }]
    };
    RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessEffectView(o);
  }
  static RequestMotorTechTreeSwitch(e, o) {
    var t = new Protocol_1.Aki.Protocol.juf();
    t.ecf = e;
    Net_1.Net.Call(24697, t, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28467);
      } else {
        if (o) {
          o();
        }
        ModelManager_1.ModelManager.MotorcycleDevelopModel.UpdateCurTreeType(e.tcf);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDevelopTechTreeUpdate, false);
      }
    });
  }
  static RequestMotorLevelOneKeyReward() {
    var e = new Protocol_1.Aki.Protocol.quf();
    Net_1.Net.Call(20263, e, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16588);
      } else {
        ModelManager_1.ModelManager.MotorcycleDevelopModel.UpdateMotorRewardedMaxLevel(e);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDevelopInfoUpdate);
      }
    });
  }
  static RequestMotorTechTaskOneKeyReward(e) {
    var o = new Protocol_1.Aki.Protocol.Nuf();
    o.B6n = e;
    Net_1.Net.Call(23419, o, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27418);
      }
    });
  }
  static OpenMotorTechTreeSwitchView() {
    if (this.Yyf) {
      UiManager_1.UiManager.OpenView("MotorcycleTechTreeSwitchView");
    }
  }
  static async OpenRootView() {
    return (await UiManager_1.UiManager.OpenViewAsync("MotorcycleRootView")) !== undefined;
  }
  static OpenMotorDevelopTechTreeTabView(e) {
    e = {
      OpenTabView: "MotorcycleTechTreeTabView",
      TreeType: e
    };
    UiManager_1.UiManager.OpenView("MotorcycleRootView", e);
  }
}
exports.MotorcycleDevelopController = MotorcycleDevelopController;
(_a = MotorcycleDevelopController).Yyf = false;
MotorcycleDevelopController.hVg = false;
MotorcycleDevelopController.DQe = (e, o) => {
  if (!!o && e === 10098 && !_a.hVg) {
    _a.hVg = true;
    _a.RequestMotorInfo();
  }
};
MotorcycleDevelopController.RQe = (e, o) => {
  if (!!o && e === 10098 && !_a.hVg) {
    _a.hVg = true;
    _a.RequestMotorInfo();
  }
};
MotorcycleDevelopController.M6l = e => {
  if (ModelManager_1.ModelManager.FunctionModel?.IsOpen(10098) && e.IsDriver && e.VehicleType === "Motorcycle") {
    _a.Yyf = true;
  }
};
MotorcycleDevelopController.E6l = e => {
  if (ModelManager_1.ModelManager.FunctionModel?.IsOpen(10098) && e.IsDriver && e.VehicleType === "Motorcycle") {
    _a.Yyf = false;
  }
};
MotorcycleDevelopController._mf = e => {
  ModelManager_1.ModelManager.MotorcycleDevelopModel.UpdateMotorInfo(e.zuf);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDevelopInfoUpdate);
};
MotorcycleDevelopController.umf = e => {
  ModelManager_1.ModelManager.MotorcycleDevelopModel.UpdateMotorExpAndLevel(e);
  ModelManager_1.ModelManager.MotorcycleDevelopModel.CheckMotorExpChange();
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDevelopInfoUpdate);
};
MotorcycleDevelopController.cmf = e => {
  ModelManager_1.ModelManager.MotorcycleDevelopModel.UpdateAllTreeTask(e.rcf);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDevelopTaskUpdate);
};
MotorcycleDevelopController.dmf = e => {
  ModelManager_1.ModelManager.MotorcycleDevelopModel.UpdateOneTreeTask(e.vlu);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDevelopTaskUpdate);
};
MotorcycleDevelopController.mmf = e => {
  ModelManager_1.ModelManager.MotorcycleDevelopModel.UnlockTechNode(e.Juf);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDevelopTechTreeUpdate, true);
};
MotorcycleDevelopController.fmf = e => {
  ModelManager_1.ModelManager.MotorcycleDevelopModel.UnlockTechTree(e.ecf);
  if (!_a.hVg) {
    _a.hVg = true;
    _a.RequestMotorInfo();
  }
};
MotorcycleDevelopController.jng = e => {
  ModelManager_1.ModelManager.MotorcycleDevelopModel.UpdateTechNodeList(e.ocf);
}; //# sourceMappingURL=MotorcycleDevelopController.js.map