"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardController = undefined;
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const RewardModel_1 = require("./RewardModel");
class RewardController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    RewardController.Model = RewardModel_1.RewardModel;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Reward", 8, "初始化");
    }
    return true;
  }
  static OnClear() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Reward", 8, "初始化");
    }
    return true;
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(21126, this.fao);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(21126);
  }
  static PickUpFightDrop(o, t, n) {
    var e;
    if (RewardController.pao.has(o)) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Interaction", 36, "Pick up drop has locked", ["creatureDataId", o]);
      }
      return false;
    } else {
      (e = Protocol_1.Aki.Protocol.HZn.create()).DHn = MathUtils_1.MathUtils.NumberToLong(o);
      RewardController.pao.add(o);
      Net_1.Net.Call(27920, Protocol_1.Aki.Protocol.HZn.create(e), e => {
        RewardController.pao.delete(o);
        if (e) {
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            if (n) {
              n(false);
            }
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15198);
            if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrPkgCapacityNotEnough) {
              AudioSystem_1.AudioSystem.PostEvent("ui_pickup_capacity_full");
            }
          } else {
            if (n) {
              n(true);
            }
            e = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(t);
            if (e) {
              e = (0, IComponent_1.getComponent)(e.ComponentsData, "RewardComponent");
              if (e) {
                e = e.RewardId;
                e = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e).DropPreview;
                if (e.size > 0) {
                  for (const r of e.keys()) {
                    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnDropItemSuccess, r);
                  }
                }
              }
            }
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnInteractDropItemSuccess);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Reward", 8, "拾取掉落返回", ["掉落物实体Id", o]);
            }
          }
        } else {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Interaction", 36, "Pick up drop call send failed", ["creatureDataId", o]);
          }
          if (n) {
            n(false);
          }
        }
      });
      return true;
    }
  }
}
(exports.RewardController = RewardController).Model = RewardModel_1.RewardModel;
RewardController.pao = new Set();
RewardController.fao = e => {
  RewardController.HandleDropInBagInfo(e.PPs, e.P6n);
};
RewardController.HandleDropInBagInfo = (e, r) => {}; //# sourceMappingURL=RewardController.js.map