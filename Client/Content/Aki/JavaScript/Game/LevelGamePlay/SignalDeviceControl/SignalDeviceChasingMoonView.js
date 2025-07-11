"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignalDeviceChasingMoonView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../Module/Common/LevelSequencePlayer");
const ConfirmBoxDefine_1 = require("../../Module/ConfirmBox/ConfirmBoxDefine");
const LguiUtil_1 = require("../../Module/Util/LguiUtil");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../Ui/UiManager");
const LinkingDotItem_1 = require("./SiganalDeviceUIItem/LinkingDotItem");
const LinkingEmptyToggle_1 = require("./SiganalDeviceUIItem/LinkingEmptyToggle");
const SignalLineItem_1 = require("./SiganalDeviceUIItem/SignalLineItem");
const SignalDeviceController_1 = require("./SignalDeviceController");
const SignalDeviceModel_1 = require("./SignalDeviceModel");
const GRIDNUM = SignalDeviceModel_1.ROWNUM * SignalDeviceModel_1.ROWNUM;
class SignalDeviceChasingMoonView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.WAe = undefined;
    this.fPe = undefined;
    this.pPe = undefined;
    this.vPe = undefined;
    this.MPe = undefined;
    this.EPe = undefined;
    this.SPe = undefined;
    this.Lo = undefined;
    this.yPe = [];
    this.IPe = [];
    this.TPe = false;
    this.LPe = () => {
      var e;
      if (this.TPe) {
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(105)).FunctionMap.set(2, () => {
          UiManager_1.UiManager.CloseView(this.Info.Name);
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      } else {
        UiManager_1.UiManager.CloseView(this.Info.Name);
      }
    };
    this.DPe = () => {
      var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(105);
      e.FunctionMap.set(2, () => {
        ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(13, 3, () => {
          SignalDeviceController_1.SignalDeviceController.ResetAll();
          this.GetButton(0).SetSelfInteractive(false);
          this.TPe = false;
          ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(13);
        });
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    };
    this.RPe = () => {};
    this.FAe = (e, i, t, n, s) => {
      var o;
      var r;
      this.UPe(e, i, t, n, s);
      if (e) {
        if (this.Lo[n].Color === IAction_1.EPieceColorType.White) {
          e = (t ? this.EPe : this.pPe).GetRootItem();
          e = LguiUtil_1.LguiUtil.CopyItem(e, this.yPe[n]);
          o = t ? SignalLineItem_1.LinkingLineItem.Create(4) : SignalLineItem_1.LinkingLineItem.Create(3);
          r = ModelManager_1.ModelManager.SignalDeviceModel.NeighboringType(i, n);
          this.IPe[n].SetLineData(e, o, r, i, t);
        }
        if (this.Lo[i].Color === IAction_1.EPieceColorType.White) {
          e = this.IPe[i].FromIndex;
          o = this.IPe[i].IsFromDot;
          if (Math.abs(e - n) === SignalDeviceModel_1.ROWNUM * 2 || Math.abs(e - n) === 2) {
            r = (o || s ? this.EPe : this.pPe).GetRootItem();
            t = LguiUtil_1.LguiUtil.CopyItem(r, this.yPe[i]);
            r = SignalLineItem_1.LinkingLineItem.Create(4);
            this.IPe[i].ResetStraightLineData(t, r, n);
          } else if (Math.abs(e - n) === SignalDeviceModel_1.ROWNUM - 1 || Math.abs(e - n) === SignalDeviceModel_1.ROWNUM + 1) {
            r = ((t = o || s) ? this.APe(e, o, i, n, s) ? this.vPe : this.MPe : this.fPe).GetRootItem();
            r = LguiUtil_1.LguiUtil.CopyItem(r, this.yPe[i]);
            t = t ? this.APe(e, o, i, n, s) ? SignalLineItem_1.LinkingLineItem.Create(0) : SignalLineItem_1.LinkingLineItem.Create(1) : SignalLineItem_1.LinkingLineItem.Create(2);
            this.IPe[i].ResetCornerLineData(r, t, i, n, s);
          } else if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Temp", 35, "OnSignalDeviceLinking From Error", ["from", i], ["beforeIndex", e], ["to", n]);
          }
        }
      } else {
        this.IPe[i].ClearLineData();
        if (this.Lo[n].Color === IAction_1.EPieceColorType.White) {
          this.IPe[n].SetLineHalf();
        }
      }
    };
    this.UPe = (e, i, t, n, s) => {
      if (e) {
        if (t) {
          e = ModelManager_1.ModelManager.SignalDeviceModel.NeighboringType(n, i);
          this.IPe[i].SetDotRay(true, e);
        }
        if (s) {
          e = ModelManager_1.ModelManager.SignalDeviceModel.NeighboringType(i, n);
          this.IPe[n].SetDotRay(true, e);
        }
      } else {
        if (t) {
          this.IPe[i].SetDotRay(false);
        }
        if (s) {
          this.IPe[n].SetDotRay(false);
        }
      }
    };
    this.JAe = (e, i) => {
      if (e) {
        this.GetButton(0).SetSelfInteractive(true);
        AudioSystem_1.AudioSystem.PostEvent("play_amb_interact_signal_ui_conncet");
      }
    };
    this.zAe = () => {
      AudioSystem_1.AudioSystem.PostEvent("play_amb_interact_signal_ui_reset");
    };
    this.PPe = () => {
      this.GetButton(0).SetSelfInteractive(false);
      this.xPe(true);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIText], [4, UE.UIText], [5, UE.UIExtendToggle], [6, UE.UIItem], [7, UE.UIText], [8, UE.UITexture], [9, UE.UITexture], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem]];
    this.BtnBindInfo = [[0, this.DPe], [1, this.LPe], [2, this.RPe]];
  }
  async OnCreateAsync() {
    this.WAe = new LinkingDotItem_1.LinkingDotItem();
    this.EPe = SignalLineItem_1.LinkingLineItem.Create(4);
    this.pPe = SignalLineItem_1.LinkingLineItem.Create(3);
    this.fPe = SignalLineItem_1.LinkingLineItem.Create(2);
    this.MPe = SignalLineItem_1.LinkingLineItem.Create(1);
    this.vPe = SignalLineItem_1.LinkingLineItem.Create(0);
    await Promise.all([this.WAe.CreateThenShowByResourceIdAsync("UiItem_LinkingDotCM"), this.EPe.CreateThenShowByResourceIdAsync("UiItem_LinkLineACM"), this.pPe.CreateThenShowByResourceIdAsync("UiItem_LinkLineBCM"), this.fPe.CreateThenShowByResourceIdAsync("UiItem_LinkLineCCM"), this.MPe.CreateThenShowByResourceIdAsync("UiItem_LinkLineECM"), this.vPe.CreateThenShowByResourceIdAsync("UiItem_LinkLineDCM")]);
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    const i = new LinkingEmptyToggle_1.LinkingEmptyToggle();
    i.CreateThenShowByActor(this.GetExtendToggle(5).GetOwner());
    this.IPe.push(i);
    var t = this.GetItem(6);
    var n = this.GetExtendToggle(5).RootUIComp;
    this.yPe.push(n);
    for (let e = 1; e < GRIDNUM; e++) {
      var s = LguiUtil_1.LguiUtil.CopyItem(n, t);
      this.yPe.push(s);
      const i = new LinkingEmptyToggle_1.LinkingEmptyToggle();
      i.CreateThenShowByActor(s.GetOwner());
      i.InitData(e);
      this.IPe.push(i);
    }
    i.InitData(0);
    this.GetButton(0).SetSelfInteractive(false);
    this.wPe();
    AudioSystem_1.AudioSystem.PostEvent("play_amb_interact_signal_ui_open");
  }
  wPe() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSignalDeviceLinking, this.FAe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSignalDeviceLinkingCheck, this.JAe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSignalDeviceReset, this.zAe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSignalDeviceFinish, this.PPe);
    this.Lo = this.OpenParam;
    if (this.Lo && this.Lo.length === GRIDNUM) {
      for (let e = 0; e < GRIDNUM; e++) {
        if (this.Lo[e].Color !== IAction_1.EPieceColorType.White) {
          this.BPe(e, this.Lo[e].Color);
        }
      }
      this.GetText(3).SetText(ConfigManager_1.ConfigManager.TextConfig.GetTextById("SignalDeviceTitleText") ?? "???");
      this.GetText(4).SetText(ConfigManager_1.ConfigManager.TextConfig.GetTextById("SignalDeviceDescriptionText") ?? "???");
      this.GetText(7).SetText(ConfigManager_1.ConfigManager.TextConfig.GetTextById("SignalDeviceResetText") ?? "???");
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Temp", 35, "配置格子数不对");
    }
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSignalDeviceLinking, this.FAe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSignalDeviceLinkingCheck, this.JAe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSignalDeviceReset, this.zAe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSignalDeviceFinish, this.PPe);
  }
  BPe(e, i) {
    var t = LguiUtil_1.LguiUtil.CopyItem(this.WAe.GetRootItem(), this.yPe[e]);
    t.SetHierarchyIndex(0);
    this.IPe[e].SetDotData(t, i);
  }
  APe(e, i, t, n, s) {
    if (i) {
      if (Math.abs(t - e) === SignalDeviceModel_1.ROWNUM) {
        return (t - e) * (n - t) == -SignalDeviceModel_1.ROWNUM;
      } else if (Math.abs(t - e) === 1) {
        return (t - e) * (n - t) === SignalDeviceModel_1.ROWNUM;
      } else {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Temp", 35, "IsCornerLeftOrRight Error");
        }
        return false;
      }
    } else if (s) {
      if (Math.abs(t - e) === 1) {
        return (t - e) * (n - t) == -SignalDeviceModel_1.ROWNUM;
      } else if (Math.abs(t - e) === SignalDeviceModel_1.ROWNUM) {
        return (t - e) * (n - t) === SignalDeviceModel_1.ROWNUM;
      } else {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Temp", 35, "IsCornerLeftOrRight Error");
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Temp", 35, "IsCornerLeftOrRight no dot");
      }
      return false;
    }
  }
  async xPe(e) {
    if (e) {
      e = new CustomPromise_1.CustomPromise();
      await this.SPe.PlaySequenceAsync("Complete", e);
    }
  }
}
exports.SignalDeviceChasingMoonView = SignalDeviceChasingMoonView;
//# sourceMappingURL=SignalDeviceChasingMoonView.js.map