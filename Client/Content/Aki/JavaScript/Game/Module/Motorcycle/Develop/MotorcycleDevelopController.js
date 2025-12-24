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
    Net_1.Net.Register(21779, MotorcycleDevelopController.dcf);
    Net_1.Net.Register(28733, MotorcycleDevelopController.mcf);
    Net_1.Net.Register(22507, MotorcycleDevelopController.fcf);
    Net_1.Net.Register(23199, MotorcycleDevelopController.gcf);
    Net_1.Net.Register(25480, MotorcycleDevelopController.Ccf);
    Net_1.Net.Register(18309, MotorcycleDevelopController.pcf);
    Net_1.Net.Register(28112, MotorcycleDevelopController.NWf);
  }
  static OnUnRegisterNetEvent() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenSet, this.DQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.RQe);
    Net_1.Net.UnRegister(21779);
    Net_1.Net.UnRegister(28733);
    Net_1.Net.UnRegister(22507);
    Net_1.Net.UnRegister(23199);
    Net_1.Net.UnRegister(25480);
    Net_1.Net.UnRegister(18309);
    Net_1.Net.UnRegister(28112);
  }
  static async OpenRootView() {
    return (await UiManager_1.UiManager.OpenViewAsync("MotorcycleRootView")) !== undefined;
  }
  static RequestMotorInfo() {
    var e = new Protocol_1.Aki.Protocol.R1f();
    Net_1.Net.Call(28324, e, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 26425);
      } else {
        ModelManager_1.ModelManager.MotorcycleDevelopModel.UpdateMotorInfo(e.G1f);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDevelopInfoUpdate);
      }
    });
  }
  static RequestMotorTechLevelUp(o) {
    var e = new Protocol_1.Aki.Protocol.E1f();
    e.F1f = o;
    Net_1.Net.Call(17479, e, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18391);
      } else {
        ModelManager_1.ModelManager.MotorcycleDevelopModel.UpdateOneTechTree(e.N1f);
        MotorcycleDevelopController.awf(o);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDevelopTechTreeUpdate);
      }
    });
  }
  static awf(e) {
    var o = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetTechNodeById(e);
    var e = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechConfig(e).TechLv[o.NodeLevel - 1];
    var o = {
      Title: "Text_ResonanceUnlockSuccess_Text",
      TextList: [{
        TextId: ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechLvConfig(e).Desc,
        Params: []
      }]
    };
    RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessEffectView(o);
  }
  static RequestMotorTechTreeSwitch(e) {
    var o = new Protocol_1.Aki.Protocol.D1f();
    o.V1f = e;
    Net_1.Net.Call(21732, o, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16930);
      } else {
        ModelManager_1.ModelManager.MotorcycleDevelopModel.UpdateCurTreeType(e.H1f);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDevelopTechTreeUpdate);
      }
    });
  }
  static RequestMotorLevelOneKeyReward() {
    var e = new Protocol_1.Aki.Protocol.T1f();
    Net_1.Net.Call(25504, e, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15001);
      } else {
        ModelManager_1.ModelManager.MotorcycleDevelopModel.UpdateMotorRewardedMaxLevel(e);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDevelopInfoUpdate);
      }
    });
  }
  static RequestMotorTechTaskOneKeyReward(e) {
    var o = new Protocol_1.Aki.Protocol.L1f();
    o.B6n = e;
    Net_1.Net.Call(21939, o, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20191);
      }
    });
  }
}
exports.MotorcycleDevelopController = MotorcycleDevelopController;
(_a = MotorcycleDevelopController).DQe = (e, o) => {
  if (o && e === 10098) {
    _a.RequestMotorInfo();
  }
};
MotorcycleDevelopController.RQe = (e, o) => {
  if (o && e === 10098) {
    _a.RequestMotorInfo();
  }
};
MotorcycleDevelopController.dcf = e => {
  ModelManager_1.ModelManager.MotorcycleDevelopModel.UpdateMotorInfo(e.G1f);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDevelopInfoUpdate);
};
MotorcycleDevelopController.mcf = e => {
  ModelManager_1.ModelManager.MotorcycleDevelopModel.UpdateMotorExpAndLevel(e);
  ModelManager_1.ModelManager.MotorcycleDevelopModel.CheckMotorExpChange();
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDevelopInfoUpdate);
};
MotorcycleDevelopController.fcf = e => {
  ModelManager_1.ModelManager.MotorcycleDevelopModel.UpdateAllTreeTask(e.$1f);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDevelopTaskUpdate);
};
MotorcycleDevelopController.gcf = e => {
  ModelManager_1.ModelManager.MotorcycleDevelopModel.UpdateOneTreeTask(e.vlu);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDevelopTaskUpdate);
};
MotorcycleDevelopController.Ccf = e => {
  ModelManager_1.ModelManager.MotorcycleDevelopModel.UnlockTechNode(e.F1f);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDevelopTechTreeUpdate);
};
MotorcycleDevelopController.pcf = e => {
  ModelManager_1.ModelManager.MotorcycleDevelopModel.UnlockTechTree(e.V1f);
};
MotorcycleDevelopController.NWf = e => {
  ModelManager_1.ModelManager.MotorcycleDevelopModel.UpdateTechNodeList(e.W1f);
}; //# sourceMappingURL=MotorcycleDevelopController.js.map