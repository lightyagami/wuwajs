"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GrapplingHookPoint = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../Global");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const CombineKeyItem_1 = require("../KeyItem/CombineKeyItem");
const INTERRUPT_DELAY_TIME = 500;
const START_SEQUENCE_NAME = "Start";
const CLOST_SEQUENCE_NAME = "Close";
class GrapplingHookPoint extends UiPanelBase_1.UiPanelBase {
  constructor(t, e) {
    super();
    this.Due = new UE.VectorDouble();
    this.S$e = (0, puerts_1.$ref)(undefined);
    this.R$e = undefined;
    this.jht = false;
    this.Wht = false;
    this.Kht = undefined;
    this.Qht = undefined;
    this.SPe = undefined;
    this.Qtt = undefined;
    this.Xht = t => {
      if (t && t.PlotLevel !== "LevelD" && t.PlotLevel !== "Prompt") {
        this.$ht();
      }
    };
    this.Yht = t => {
      this.Jht();
    };
    this.zht = () => {
      if (TimerSystem_1.TimerSystem.Has(this.Kht)) {
        TimerSystem_1.TimerSystem.Remove(this.Kht);
      }
      if (this.Qht) {
        this.Qht();
      }
    };
    this.R$e = Global_1.Global.CharacterController;
    this.Due.X = t.X;
    this.Due.Y = t.Y;
    this.Due.Z = t.Z;
    this.CreateThenShowByResourceIdAsync("UiItem_Gousuo", e, true);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UINiagara]];
    if (!Info_1.Info.IsInTouch()) {
      this.ComponentRegisterInfos.push([4, UE.UIItem]);
    }
  }
  async OnBeforeStartAsync() {
    var t;
    if (!Info_1.Info.IsInTouch()) {
      (t = this.GetItem(4)).SetUIActive(false);
      this.Qtt = new CombineKeyItem_1.CombineKeyItem();
      this.Qtt.SkipDestroyActor = true;
      await this.Qtt.CreateByActorAsync(t.GetOwner());
      this.Qtt.RefreshAction(InputMappingsDefine_1.actionMappings.幻象1);
    }
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.Jht();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkStart, this.Xht);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkEnd, this.Yht);
  }
  Jht() {
    this.GetItem(0).SetUIActive(false);
    this.GetItem(1).SetUIActive(false);
    this.GetItem(2).SetUIActive(false);
    this.Qtt?.GetRootItem().SetUIActive(true);
    this.Zht(START_SEQUENCE_NAME);
    this.Zht(CLOST_SEQUENCE_NAME);
    if (TimerSystem_1.TimerSystem.Has(this.Kht)) {
      TimerSystem_1.TimerSystem.Remove(this.Kht);
    }
    this.jht = true;
    this.Wht = false;
  }
  $ht() {
    this.GetItem(0).SetUIActive(false);
    this.GetItem(1).SetUIActive(false);
    this.GetItem(2).SetUIActive(false);
    this.Qtt?.GetRootItem().SetUIActive(false);
    this.Zht(START_SEQUENCE_NAME);
    this.Zht(CLOST_SEQUENCE_NAME);
    if (TimerSystem_1.TimerSystem.Has(this.Kht)) {
      TimerSystem_1.TimerSystem.Remove(this.Kht);
    }
    this.jht = false;
    this.Wht = true;
  }
  UpdateHookPointLocation(t) {
    this.Due.Set(t.X, t.Y, t.Z);
  }
  Interrupt() {
    this.GetItem(0).SetUIActive(false);
    this.GetItem(1).SetUIActive(false);
    this.Wht = true;
    this.Kht = TimerSystem_1.TimerSystem.Delay(this.zht, INTERRUPT_DELAY_TIME);
  }
  BindOnInterruptCompleted(t) {
    this.Qht = t;
  }
  GetIsActivateHook() {
    return this.jht;
  }
  GetIsInterrupting() {
    return this.Wht;
  }
  OnBeforeDestroy() {
    if (this.SPe) {
      this.SPe.Clear();
      this.SPe = undefined;
    }
    if (this.Qtt) {
      this.Qtt.Destroy();
      this.Qtt = undefined;
    }
    this.Wht = false;
    this.jht = false;
    if (TimerSystem_1.TimerSystem.Has(this.Kht)) {
      TimerSystem_1.TimerSystem.Remove(this.Kht);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.PlotNetworkStart, this.Xht)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkStart, this.Xht);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.PlotNetworkEnd, this.Yht)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkEnd, this.Yht);
    }
  }
  AfterTick() {
    var t;
    if (this.jht && (t = this.elt(this.Due))) {
      this.Ad(t);
    }
  }
  Ad(t) {
    this.RootItem.SetAnchorOffset(t);
  }
  elt(t) {
    if (UE.GameplayStatics.D_ProjectWorldToScreen(this.R$e, t, this.S$e)) {
      t = (0, puerts_1.$unref)(this.S$e);
      return UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler().ConvertPositionFromViewportToLGUICanvas(t);
    }
  }
  Zht(t) {
    this.SPe.StopSequenceByKey(t);
  }
}
exports.GrapplingHookPoint = GrapplingHookPoint;
//# sourceMappingURL=GrapplingHookPoint.js.map