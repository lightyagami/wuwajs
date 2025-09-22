"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeleportAssistant = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../Core/Net/Net");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase");
const LevelLoadingController_1 = require("../../LevelLoading/LevelLoadingController");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const WorldMapController_1 = require("../../WorldMap/WorldMapController");
const GM_UNLOCK_ALL_TELEPORT = "activateteleport 0";
class TeleportAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments);
    this._Di = undefined;
    this.uDi = "";
    this.cDi = 0;
    this.mDi = false;
    this.xK = false;
    this.dDi = e => {
      ModelManager_1.ModelManager.MapModel.UnlockTeleports(e.BVn);
      if (!ModelManager_1.ModelManager.GameModeModel.IsMulti || ModelManager_1.ModelManager.PlayerInfoModel.GetId() === ModelManager_1.ModelManager.CreatureModel.GetWorldOwner()) {
        this.CDi(e.BVn);
      }
    };
    this.gDi = () => {
      LevelLoadingController_1.LevelLoadingController.CloseLoading(0, () => {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BlackScreenFadeOnPlotToWorldMap);
      }, 1);
    };
    this.hWe = e => {
      if (e.FlowListName === this.uDi && e.FlowId === this.cDi) {
        this.xK = false;
        if (this._Di.Type === 1) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("TeleporterUnlockBig");
        } else {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("TeleporterUnlock");
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Plot", 38, "Close PlotView And Open WorldMapView");
        }
        e = {
          MarkType: 0,
          MarkId: 0,
          OpenFogId: this._Di.FogId
        };
        if (this._Di.ShowWorldMap) {
          EventSystem_1.EventSystem.Once(EventDefine_1.EEventName.WorldMapViewOpened, this.gDi);
          WorldMapController_1.WorldMapController.OpenView(2, false, e);
        } else {
          LevelLoadingController_1.LevelLoadingController.CloseLoading(0, () => {}, 1);
        }
        this.uDi = undefined;
        this.cDi = undefined;
      }
    };
    this.fDi = e => {
      if (e.toLowerCase() === GM_UNLOCK_ALL_TELEPORT) {
        this.mDi = true;
      }
    };
  }
  OnDestroy() {
    this._Di = undefined;
    this.uDi = undefined;
    this.cDi = undefined;
    this.mDi = undefined;
    this.xK = undefined;
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(15017, this.dDi);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(15017);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkEnd, this.hWe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnExecuteServerGm, this.fDi);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkEnd, this.hWe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnExecuteServerGm, this.fDi);
  }
  CDi(e) {
    var t;
    if (!this.mDi && !this.xK) {
      if (e && e.length !== 0 && (e = ConfigManager_1.ConfigManager.MapConfig.GetTeleportConfigById(e[0])) && !StringUtils_1.StringUtils.IsEmpty(e.Plot) && (t = e.Plot.split(",")).length > 2) {
        this.uDi = t[0];
        this.cDi = Number(t[1]);
        t = Number(t[2]);
        this._Di = e;
        this.xK = true;
        ControllerHolder_1.ControllerHolder.FlowController.StartFlow(this.uDi, this.cDi, t);
      }
    }
  }
  async RequestTeleportData() {
    var e = Protocol_1.Aki.Protocol.cCs.create();
    var e = await Net_1.Net.CallAsync(20759, e);
    if (e) {
      if (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 24129);
      } else {
        ModelManager_1.ModelManager.MapModel.UnlockTeleports(e.BVn, true);
      }
    }
  }
}
exports.TeleportAssistant = TeleportAssistant;
//# sourceMappingURL=TeleportAssistant.js.map