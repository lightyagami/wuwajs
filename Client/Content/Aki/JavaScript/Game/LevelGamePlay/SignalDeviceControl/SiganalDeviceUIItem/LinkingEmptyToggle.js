"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkingEmptyToggle = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../Core/Common/Log");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LongPressButtonItem_1 = require("../../../Module/Common/Button/LongPressButtonItem");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const SignalDeviceController_1 = require("../SignalDeviceController");
const SignalDeviceModel_1 = require("../SignalDeviceModel");
const LinkingDotItem_1 = require("./LinkingDotItem");
class LinkingEmptyToggle extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Xy = -1;
    this.FromIndex = -1;
    this.IsFromDot = false;
    this.lRe = IAction_1.EPieceColorType.White;
    this.jAe = undefined;
    this.WAe = undefined;
    this.KAe = undefined;
    this.QAe = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Temp", 35, "OnToggleHover", ["index", this.Xy]);
      }
      if (ModelManager_1.ModelManager.SignalDeviceModel.CurrentColor !== IAction_1.EPieceColorType.White) {
        AudioSystem_1.AudioSystem.PostEvent("play_amb_interact_signal_ui_drag");
      } else {
        AudioSystem_1.AudioSystem.PostEvent("play_amb_interact_signal_ui_move");
      }
      SignalDeviceController_1.SignalDeviceController.OnHovering(this.Xy);
    };
    this.XAe = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Temp", 35, "OnTogglePress", ["index", this.Xy]);
      }
      this.WAe.OnPressed(true);
      SignalDeviceController_1.SignalDeviceController.OnDotPressed(this.Xy, this.lRe);
      if (ModelManager_1.ModelManager.SignalDeviceModel.CurrentColor !== IAction_1.EPieceColorType.White) {
        AudioSystem_1.AudioSystem.PostEvent("play_amb_interact_signal_ui_choose");
      }
    };
    this.$Ae = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Temp", 35, "OnToggleRelease", ["index", this.Xy]);
      }
      SignalDeviceController_1.SignalDeviceController.CheckLinking(this.Xy);
    };
    this.YAe = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Temp", 35, "OnToggleCancel", ["index", this.Xy]);
      }
      SignalDeviceController_1.SignalDeviceController.CheckLinking(this.Xy);
    };
    this.JAe = (e, i) => {
      if (e && i.includes(this.Xy)) {
        this.WAe?.OnLinked();
        this.WAe?.SetFxBoost(true);
        this.GetExtendToggle(0).SetEnable(false);
      }
      if (!e && i.includes(this.Xy)) {
        this.WAe?.OnPressed(false);
        this.WAe?.RotateLine(false);
        this.KAe?.Destroy();
      }
    };
    this.zAe = () => {
      this.GetExtendToggle(0).SetEnable(true);
      this.WAe?.ResetIcon();
      this.WAe?.RotateLine(false);
      this.KAe?.Destroy();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle]];
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSignalDeviceLinkingCheck, this.JAe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSignalDeviceReset, this.zAe);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSignalDeviceLinkingCheck, this.JAe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSignalDeviceReset, this.zAe);
  }
  InitData(e) {
    this.Xy = e;
    this.GetExtendToggle(0).OnHover.Add(this.QAe);
  }
  SetDotData(e, i) {
    this.WAe = new LinkingDotItem_1.LinkingDotItem();
    this.WAe.CreateThenShowByActor(e.GetOwner());
    this.WAe.InitIcon(i);
    this.lRe = i;
    this.jAe = new LongPressButtonItem_1.LongPressButtonItem(undefined, 1, undefined);
    this.jAe.Initialize(this.GetExtendToggle(0), undefined, this.XAe, this.$Ae, this.YAe);
  }
  SetLineData(e, i, t, s, n) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Temp", 35, "SetLineData", ["neighborType", t]);
    }
    this.KAe = i;
    this.KAe.CreateThenShowByActor(e.GetOwner());
    this.KAe.InitIcon(t, true);
    this.FromIndex = s;
    this.IsFromDot = n;
  }
  ResetStraightLineData(e, i, t) {
    this.KAe.Destroy();
    this.KAe = i;
    this.KAe.CreateThenShowByActor(e.GetOwner());
    if (i.LineType === 3) {
      this.KAe.InitIcon(Math.abs(this.FromIndex - t) === 2 ? 1 : 4, false);
    } else if (i.LineType === 4) {
      if (this.FromIndex - t == -SignalDeviceModel_1.ROWNUM * 2) {
        this.KAe.InitIcon(this.IsFromDot ? 4 : 3, false);
      } else if (this.FromIndex - t == SignalDeviceModel_1.ROWNUM * 2) {
        this.KAe.InitIcon(this.IsFromDot ? 3 : 4, false);
      } else if (this.FromIndex - t == 2) {
        this.KAe.InitIcon(this.IsFromDot ? 1 : 2, false);
      } else {
        this.KAe.InitIcon(this.IsFromDot ? 2 : 1, false);
      }
    }
  }
  ClearLineData() {
    this.KAe.Destroy();
    this.KAe = undefined;
  }
  SetLineHalf() {
    var e = ModelManager_1.ModelManager.SignalDeviceModel.NeighboringType(this.FromIndex, this.Xy);
    this.KAe.SetLineHalf(e);
  }
  ResetCornerLineData(e, i, t, s, n) {
    this.KAe.Destroy();
    this.KAe = i;
    this.KAe.CreateThenShowByActor(e.GetOwner());
    e = t - this.FromIndex;
    s -= t;
    if (i.LineType === 2 || i.LineType === 0) {
      if (e * s == -SignalDeviceModel_1.ROWNUM) {
        this.KAe.InitIcon(e < s ? 1 : 2);
      } else {
        this.KAe.InitIcon(e < s ? 3 : 4);
      }
    } else if (e * s === SignalDeviceModel_1.ROWNUM) {
      this.KAe.InitIcon(e < s ? 1 : 2);
    } else {
      this.KAe.InitIcon(e < s ? 4 : 3);
    }
  }
  SetDotRay(e, i = 0) {
    this.WAe?.RotateLine(e, i);
  }
}
exports.LinkingEmptyToggle = LinkingEmptyToggle;
//# sourceMappingURL=LinkingEmptyToggle.js.map