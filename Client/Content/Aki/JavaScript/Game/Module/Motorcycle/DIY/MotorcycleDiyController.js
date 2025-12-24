"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleDiyController = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../../Core/Net/Net");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
class MotorcycleDiyController extends ControllerBase_1.ControllerBase {
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
    Net_1.Net.Register(16775, MotorcycleDiyController.DCf);
    Net_1.Net.Register(29090, MotorcycleDiyController.UCf);
    Net_1.Net.Register(25678, MotorcycleDiyController.xCf);
    Net_1.Net.Register(28458, MotorcycleDiyController.BCf);
  }
  static OnUnRegisterNetEvent() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenSet, this.DQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.RQe);
    Net_1.Net.UnRegister(16775);
    Net_1.Net.UnRegister(29090);
    Net_1.Net.UnRegister(25678);
    Net_1.Net.UnRegister(28458);
  }
  static MotorDiyInfoRequest() {
    var e = Protocol_1.Aki.Protocol.C0f.create();
    Net_1.Net.Call(24228, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.MotorcycleDiyModel.UpdateMotorOutlookInfo(e);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15886);
        }
      }
    });
  }
  static EquipMotorSkinRequest(e) {
    var t = Protocol_1.Aki.Protocol.d0f.create();
    t.Z7n = e;
    Net_1.Net.Call(17146, t, e => {
      if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25016);
      }
    });
  }
  static EquipMotorStickerRequest(e, t) {
    var o = Protocol_1.Aki.Protocol.h0f.create();
    o.S0f = e;
    Net_1.Net.Call(21760, o, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          if (t) {
            t();
          }
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22566);
        }
      }
    });
  }
  static UnloadAllAndEquipMotorSticker(e, t) {
    var o = [0, 0, 0];
    var r = [1, 2, 3];
    for (const l of e) {
      var n = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerConfig(l);
      if (n && (n = n.PartId, (n = r.indexOf(n)) !== -1)) {
        o[n] = l;
      }
    }
    this.EquipMotorStickerRequest(o, t);
  }
  static OpenDiyRootViewByEquip(e) {
    this.UnloadAllAndEquipMotorSticker(e, () => {
      ModelManager_1.ModelManager.MotorcycleDiyModel.ResetSelectStickerInfo();
      UiManager_1.UiManager.OpenView("MotorcycleDiyRootView");
    });
  }
}
exports.MotorcycleDiyController = MotorcycleDiyController;
(_a = MotorcycleDiyController).DQe = (e, t) => {
  if (t && e === 10098) {
    _a.MotorDiyInfoRequest();
  }
};
MotorcycleDiyController.RQe = (e, t) => {
  if (t && e === 10098) {
    _a.MotorDiyInfoRequest();
  }
};
MotorcycleDiyController.DCf = e => {
  if (e) {
    ModelManager_1.ModelManager.MotorcycleDiyModel.UpdateMotorCanUseSkinInfo(e);
  }
};
MotorcycleDiyController.UCf = e => {
  if (e) {
    ModelManager_1.ModelManager.MotorcycleDiyModel.AddMotorOutlookInfo(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDiyInfoUpdate);
  }
};
MotorcycleDiyController.xCf = e => {
  if (e) {
    ModelManager_1.ModelManager.MotorcycleDiyModel.UpdateMotorOutlookOwnedChange(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDiyInfoUpdate);
  }
};
MotorcycleDiyController.BCf = e => {
  if (e) {
    ModelManager_1.ModelManager.MotorcycleDiyModel.UpdateMotorOutlookEquippedChange(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDiyInfoUpdate);
  }
}; //# sourceMappingURL=MotorcycleDiyController.js.map