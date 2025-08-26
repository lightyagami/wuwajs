"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueOpGridEvent = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiManager_1 = require("../../../Ui/UiManager");
const MapRogueOp_1 = require("./MapRogueOp");
class MapRogueOpGridEvent extends MapRogueOp_1.MapRogueOp {
  constructor() {
    super(...arguments);
    this.InEventView = false;
    this.StepSize = 2;
    this.dY1 = new Set();
    this.EventStepUpdateFunc = undefined;
  }
  ToString() {
    return `[GridEvent] IncId:${this.IncId} InStart:${this.IsInStart} InPlot:${this.IsInPlot} PlotStepId:${this.CurrentStepId}`;
  }
  OnUpdate(t) {
    if (this.IsStartExecute) {
      this.ksi(t);
    }
  }
  ksi(t) {
    var e;
    var i;
    if (this.IsInStart) {
      e = this.Data.qEc?.Jr1?.J2s ?? 0;
      if ((e = ConfigManager_1.ConfigManager.MapRogueConfig.GetGridEventConfigById(e)) && ((i = ConfigManager_1.ConfigManager.MapRogueConfig.GetGlobalParamConfig()).EventStartSpineType.includes(e.EventType) && t.RoleAnimProxy("Fight", false), i.EventStartSeqType.includes(e.EventType))) {
        UiManager_1.UiManager.OpenView("MapRogueEventStartView", this.IncId);
      } else {
        this.Execute(t);
      }
    } else if (this.IsInPlot && !t.InBattle) {
      if (this.InEventView) {
        this.EventStepUpdateFunc?.(this.CurrentStepId);
      } else if (ConfigManager_1.ConfigManager.MapRogueConfig.GetRogueEventStepById(this.CurrentStepId)?.Type === 3) {
        this.ExecuteStep(this.CurrentStepId, 0);
      } else {
        UiManager_1.UiManager.OpenView("MapRogueGridEventView", this.IncId, t => {
          this.InEventView = t;
        });
      }
    }
  }
  OnBattleStateUpdate(t, e) {
    if (t && this.InEventView) {
      UiManager_1.UiManager.CloseView("MapRogueGridEventView", () => {
        this.InEventView = false;
      });
    }
  }
  OnStartExecute(t) {
    this.ksi(t);
  }
  OnExecute(t) {
    if (this.CurrentStep === 1) {
      this.ExecuteOp();
    }
  }
  OnFinish(t) {}
  OnDelete(t) {
    if (this.InEventView) {
      UiManager_1.UiManager.CloseView("MapRogueGridEventView", () => {
        this.InEventView = false;
      });
    }
  }
  ExecuteStep(t, e) {
    if (this.CurrentStepId === t && !this.dY1.has(t)) {
      if (this.Data.qEc.wl1.eo1 === Protocol_1.Aki.Protocol.eo1.Proto_WaitConfirm) {
        this.dY1.add(t);
        this.OpExecuteClientId = e;
        this.ExecuteOp(() => {
          this.dY1.delete(t);
        });
      }
    }
  }
  get IsInStart() {
    return this.Data.qEc?.bl1 === Protocol_1.Aki.Protocol.bl1.Proto_SpecialEffect;
  }
  get IsInPlot() {
    return this.Data.qEc?.bl1 === Protocol_1.Aki.Protocol.bl1.Proto_EventPloting;
  }
  get CurrentPlotId() {
    if (this.IsInPlot) {
      return this.Data.qEc?.wl1?.Zr1 ?? 0;
    } else {
      return 0;
    }
  }
  get CurrentStepId() {
    if (this.IsInPlot) {
      return this.Data.qEc?.wl1?.kqs ?? 0;
    } else {
      return 0;
    }
  }
  get CurrentPlotBgId() {
    if (this.IsInPlot) {
      return this.Data.qEc?.wl1?.io1 ?? 0;
    } else {
      return 0;
    }
  }
  get CurrentPlotBgmId() {
    if (this.IsInPlot) {
      return this.Data.qEc?.wl1?.ro1 ?? 0;
    } else {
      return 0;
    }
  }
  get CurrentOptions() {
    if (this.IsInPlot) {
      return this.Data.qEc?.wl1?.to1 ?? [];
    } else {
      return [];
    }
  }
}
exports.MapRogueOpGridEvent = MapRogueOpGridEvent;
//# sourceMappingURL=MapRogueOpGridEvent.js.map