"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventOpenSimpleGameplay = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const TsInteractionUtils_1 = require("../../Module/Interaction/TsInteractionUtils");
const KingShipUtil_1 = require("../../Module/KingShip/KingShipUtil");
const UiManager_1 = require("../../Ui/UiManager");
const FishingQteController_1 = require("../FishingQte/FishingQteController");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelGeneralNetworks_1 = require("../LevelGeneralNetworks");
const SignalDeviceController_1 = require("../SignalDeviceControl/SignalDeviceController");
class LevelEventOpenSimpleGameplay extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.VDe = undefined;
    this.E0 = -1;
    this.HDe = () => {
      if (this.VDe) {
        LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntitySendEvent(this.E0, this.VDe);
      }
    };
  }
  ExecuteNew(e, i) {
    var t = e;
    if (t) {
      var n = i;
      if (n) {
        switch (t.GameplayConfig.Type) {
          case "Cipher":
            TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName("CipherView");
            this.jDe(t.GameplayConfig.CipherId);
            break;
          case "SignalBreak":
            TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName("SignalDecodeView");
            UiManager_1.UiManager.OpenView("SignalDecodeView", t.GameplayConfig.SignalBreakId);
            break;
          case "SundialPuzzle":
            TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName("SundialControlView");
            UiManager_1.UiManager.OpenView("SundialControlView");
            break;
          case "SignalDevice":
            this.VDe = t.FinishSendSelfEvent;
            var r = EntitySystem_1.EntitySystem.Get(n.EntityId);
            this.E0 = r.GetComponent(0).GetCreatureDataId();
            TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName("SignalDeviceView");
            SignalDeviceController_1.SignalDeviceController.OpenGameplay(t.GameplayConfig.Config, this.HDe);
            break;
          case "SignalDevice2":
            this.VDe = t.FinishSendSelfEvent;
            r = EntitySystem_1.EntitySystem.Get(n.EntityId);
            this.E0 = r.GetComponent(0).GetCreatureDataId();
            TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName("SignalDeviceChasingMoonView");
            SignalDeviceController_1.SignalDeviceController.OpenGameplayChasingMoon(t.GameplayConfig.Config, this.HDe);
            break;
          case "MorseCode":
            TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName("SignalDecodeView");
            ControllerHolder_1.ControllerHolder.SignalDecodeController.Open(t.GameplayConfig.MorseCodeId);
            break;
          case "RenjuChess":
            ControllerHolder_1.ControllerHolder.LevelPickInteractController.EnterPickInteractModel(t.GameplayConfig);
            break;
          case "LifePoint":
            var r = {
              Config: t.GameplayConfig,
              EntityId: n.EntityId,
              Callback: this.HDe
            };
            this.VDe = t.FinishSendSelfEvent;
            var s = EntitySystem_1.EntitySystem.Get(n.EntityId);
            this.E0 = s.GetComponent(0).GetCreatureDataId();
            TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName("LifePointView");
            UiManager_1.UiManager.OpenView("LifePointView", r);
            break;
          case "BrokenRock":
            if (i.Type !== 6) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Event", 29, "大个布偶坚固岩石玩法开启失败：只能由行为中打开");
              }
            } else {
              this.VDe = t.FinishSendSelfEvent;
              TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName("BigStuffedDollView");
              ControllerHolder_1.ControllerHolder.BigStuffedDollController.Open(t.GameplayConfig.Id, i.TreeConfigId, this.HDe);
            }
            break;
          case "FishingRoulette":
            this.VDe = t.FinishSendSelfEvent;
            s = EntitySystem_1.EntitySystem.Get(n.EntityId);
            this.E0 = s.GetComponent(0).GetCreatureDataId();
            FishingQteController_1.FishingQteController.OpenGameplay(s, e => {
              if (e) {
                TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName("FishingQteView");
              }
            });
            break;
          case "DaolingAuthentication":
            TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName("LiuLiDaoLingView");
            UiManager_1.UiManager.OpenView("LiuLiDaoLingView");
            break;
          case "Reigns":
            TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName("KingShipMainView");
            r = KingShipUtil_1.KingShipUtil.GetKingShipOpenData(t.GameplayConfig.ReignsId);
            UiManager_1.UiManager.OpenView("KingShipLoadingView", r);
            break;
          case "TuningStand":
            this.VDe = t.FinishSendSelfEvent;
            s = EntitySystem_1.EntitySystem.Get(n.EntityId);
            this.E0 = s.GetComponent(0).GetCreatureDataId();
            TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName("TuningStandView");
            r = {
              Config: t.GameplayConfig,
              Cb: this.HDe
            };
            UiManager_1.UiManager.OpenView("TuningStandView", r);
            break;
          case "ItemInspection":
            this.VDe = t.FinishSendSelfEvent;
            s = EntitySystem_1.EntitySystem.Get(n.EntityId);
            this.E0 = s.GetComponent(0).GetCreatureDataId();
            ControllerHolder_1.ControllerHolder.ItemInspectController.OpenItemInspect(t.GameplayConfig, e => {
              TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName(e);
            }, e => {
              if (e) {
                this.HDe();
              }
            });
            break;
          case "TraceTracing":
            this.VDe = t.FinishSendSelfEvent;
            r = EntitySystem_1.EntitySystem.Get(n.EntityId);
            this.E0 = r.GetComponent(0).GetCreatureDataId();
            TsInteractionUtils_1.TsInteractionUtils.RegisterOpenViewName("SeekTraceView");
            ControllerHolder_1.ControllerHolder.SeekTraceController.OpenSeekTrace(t.GameplayConfig, n.EntityId, e => {
              if (e) {
                this.HDe();
              }
            });
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Event", 29, "上下文不合法");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Event", 29, "参数不合法");
    }
  }
  jDe(e) {
    ControllerHolder_1.ControllerHolder.CipherController.OpenCipherView(e);
  }
}
exports.LevelEventOpenSimpleGameplay = LevelEventOpenSimpleGameplay;
//# sourceMappingURL=LevelEventOpenSimpleGameplay.js.map