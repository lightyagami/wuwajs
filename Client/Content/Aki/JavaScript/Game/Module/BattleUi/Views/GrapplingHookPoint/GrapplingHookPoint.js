"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GrapplingHookPoint = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../Global");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const CombineKeyItem_1 = require("../KeyItem/CombineKeyItem");
class GrapplingHookPoint extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super();
    this.Due = new UE.VectorDouble();
    this.S$e = (0, puerts_1.$ref)(undefined);
    this.R$e = undefined;
    this.BKf = true;
    this.SPe = undefined;
    this.Qtt = undefined;
    this.Xht = e => {
      if (e && e.PlotLevel !== "LevelD" && e.PlotLevel !== "Prompt") {
        this.DisableMarker();
      }
    };
    this.Yht = e => {
      this.EnableMarker();
    };
    this.R$e = Global_1.Global.CharacterController;
    this.Due.X = e.X;
    this.Due.Y = e.Y;
    this.Due.Z = e.Z;
    this.CreateThenShowByResourceIdAsync("UiItem_Gousuo", t, true);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UINiagara]];
    if (!Info_1.Info.IsInTouch()) {
      this.ComponentRegisterInfos.push([4, UE.UIItem]);
    }
  }
  async OnBeforeStartAsync() {
    var e;
    if (!Info_1.Info.IsInTouch()) {
      (e = this.GetItem(4)).SetUIActive(false);
      this.Qtt = new CombineKeyItem_1.CombineKeyItem();
      this.Qtt.SkipDestroyActor = true;
      await this.Qtt.CreateByActorAsync(e.GetOwner());
      this.Qtt.RefreshAction(InputMappingsDefine_1.actionMappings.幻象1);
    }
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.GetItem(0).SetUIActive(false);
    this.GetItem(1).SetUIActive(false);
    this.GetItem(2).SetUIActive(false);
    if (this.BKf) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 79, "钩锁点可用状态变化, 显示交互提示");
      }
      this.Qtt?.GetRootItem().SetUIActive(true);
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkStart, this.Xht);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkEnd, this.Yht);
  }
  EnableMarker() {
    if (!this.BKf) {
      this.BKf = true;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 79, "钩锁点可用状态变化, 显示交互提示");
      }
      this.Qtt?.GetRootItem().SetUIActive(true);
    }
  }
  DisableMarker() {
    if (this.BKf) {
      this.BKf = false;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 79, "钩锁点可用状态变化, 隐藏交互提示");
      }
      this.Qtt?.GetRootItem().SetUIActive(false);
    }
  }
  UpdateHookPointLocation(e) {
    this.Due.Set(e.X, e.Y, e.Z);
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
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.PlotNetworkStart, this.Xht)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkStart, this.Xht);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.PlotNetworkEnd, this.Yht)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkEnd, this.Yht);
    }
  }
  AfterTick() {
    var e;
    if (this.BKf && (e = this.elt(this.Due))) {
      this.Ad(e);
    }
  }
  Ad(e) {
    this.RootItem?.SetAnchorOffset(e);
  }
  elt(e) {
    if (UE.GameplayStatics.D_ProjectWorldToScreen(this.R$e, e, this.S$e)) {
      e = (0, puerts_1.$unref)(this.S$e);
      return UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler().ConvertPositionFromViewportToLGUICanvas(e);
    }
  }
}
exports.GrapplingHookPoint = GrapplingHookPoint;
//# sourceMappingURL=GrapplingHookPoint.js.map