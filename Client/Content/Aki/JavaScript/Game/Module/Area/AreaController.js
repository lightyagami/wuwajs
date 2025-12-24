"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AreaController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const UnopenedAreaController_1 = require("../../LevelGamePlay/UnopenedArea/UnopenedAreaController");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const AreaAtmosphere_1 = require("./AreaAtmosphere");
const AreaAudio_1 = require("./AreaAudio");
const AreaTags_1 = require("./AreaTags");
class AreaController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    if (!AreaController.IWe) {
      AreaController.IWe = new AreaAudio_1.AreaAudio();
      AreaController.IWe.Init();
    }
    AreaController.TWe ||= new AreaAtmosphere_1.AreaAtmosphere();
    if (!AreaController.M3l) {
      AreaController.M3l = new AreaTags_1.AreaTags();
      AreaController.M3l.Init();
    }
    this.RegisterNetEvent();
    this.RegisterEvents();
    return true;
  }
  static OnClear() {
    if (AreaController.IWe) {
      AreaController.IWe.Destroy();
    }
    if (AreaController.TWe) {
      AreaController.TWe.Destroy();
    }
    if (AreaController.M3l) {
      AreaController.M3l.Destroy();
    }
    this.UnRegisterNetEvent();
    this.UnRegisterEvents();
    return true;
  }
  static OnTick(e) {
    if (AreaController.TWe) {
      AreaController.TWe.OnTick(e);
    }
  }
  static RegisterNetEvent() {
    Net_1.Net.Register(15954, this.LWe);
  }
  static UnRegisterNetEvent() {
    Net_1.Net.UnRegister(15954);
  }
  static RegisterEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InitArea, this.DWe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
  }
  static UnRegisterEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InitArea, this.DWe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportComplete, this.Ilt);
  }
  static EnterAreaRequest(r, e, o, t) {
    e = Protocol_1.Aki.Protocol.iYn.create({
      s5n: e,
      NKa: 0
    });
    Net_1.Net.Call(20512, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.Proto_PlayerNotInTheScene) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22966);
        } else if (!o || ModelManager_1.ModelManager.AreaModel.AreaInfo?.AreaId !== e.s5n) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Area", 72, "[AreaController.EnterAreaRequest]", ["CurArea", r], ["EnterArea", e.s5n], ["reason", t]);
          }
          ModelManager_1.ModelManager.AreaModel.SetAreaName(e.s5n);
        }
      }
    });
  }
  static EndOverlap(r) {
    var e;
    if (r !== 0 && r !== 1) {
      e = Protocol_1.Aki.Protocol.iYn.create({
        s5n: 0,
        NKa: r
      });
      Net_1.Net.Call(20512, e, e => {
        if (e) {
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.Proto_PlayerNotInTheScene) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22966);
          } else {
            ModelManager_1.ModelManager.AreaModel.SetAreaInfo(e.s5n);
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChangeArea, r, e.s5n);
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Area", 7, "[AreaController.EndOverlap] 离开区域", ["LeaveArea", r], ["EnterArea", e.s5n]);
            }
          }
        }
      });
    }
  }
}
(exports.AreaController = AreaController).IWe = undefined;
AreaController.TWe = undefined;
AreaController.M3l = undefined;
AreaController.DWe = e => {
  ModelManager_1.ModelManager.AreaModel.InitArea(e);
  UnopenedAreaController_1.UnopenedAreaController.AreaCheckInit(ModelManager_1.ModelManager.AreaModel.GetAreaStates());
};
AreaController.LWe = e => {
  if (!e) {
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Area", 7, "[AreaController.AreaStatesChangeNotify] Notify Info Error");
    }
  }
  ModelManager_1.ModelManager.AreaModel.ToggleAreaState(e.GRs.p6n, e.GRs.Y4n);
  UnopenedAreaController_1.UnopenedAreaController.AreaCheckStatesChange(e);
};
AreaController.Ilt = e => {
  var e = e?.TeleportCfgId;
  if ((e &&= ConfigManager_1.ConfigManager.WorldMapConfig.GetTeleportEntityConfigId(e)) && (e = ModelManager_1.ModelManager.CreatureModel?.GetEntityData(e)?.AreaId)) {
    if (ModelManager_1.ModelManager.AreaModel.GetArea(e)) {
      if (e === ModelManager_1.ModelManager.AreaModel.AreaInfo?.AreaId) {
        ModelManager_1.ModelManager.AreaModel.SetAreaName(e, true);
      }
    } else {
      ModelManager_1.ModelManager.AreaModel.AddWatchArea(e);
    }
  }
}; //# sourceMappingURL=AreaController.js.map