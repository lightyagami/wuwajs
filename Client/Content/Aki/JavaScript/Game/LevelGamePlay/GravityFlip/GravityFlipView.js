"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GravityFlipView = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../Module/Common/LevelSequencePlayer");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
class GravityFlipView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.wK_ = undefined;
    this.RK_ = undefined;
    this.AK_ = undefined;
    this.Kuc = undefined;
    this.WAc = undefined;
    this.Hea = undefined;
    this.z_e = -1;
    this.zfc = false;
    this.lPe = () => {
      var e;
      if (!this.zfc) {
        e = this.OpenParam.SelectCallback;
        ControllerHolder_1.ControllerHolder.GravityFlipController.ListenTeleportCompleteEvent(e);
        ModelManager_1.ModelManager.GravityFlipModel.GravityFlipComp?.OnExitInteract();
        this.UY_();
        this.CloseMe();
      }
    };
    this.BK_ = () => {
      this.kK_(0);
    };
    this.qK_ = () => {
      this.kK_(1);
    };
    this.OK_ = () => {
      this.kK_(2);
    };
    this.Xuc = () => {
      this.kK_(4);
    };
    this.YK_ = () => {
      this.zK_();
      this.Hea?.PlayLevelSequenceByName("Turn_Finish");
      this.UiViewSequence?.PlaySequence("Turn_Finish");
      this.zfc = false;
    };
    this.hWe = () => {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkEnd, this.hWe);
      ModelManager_1.ModelManager.GravityFlipModel.GravityFlipComp.OnNotifyUpdateGravityDirection(ModelManager_1.ModelManager.GravityFlipModel.CacheCorrectDirection);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIItem]];
    this.BtnBindInfo = [[0, this.BK_], [1, this.qK_], [2, this.OK_], [3, this.lPe], [4, this.Xuc]];
  }
  OnStart() {
    this.wK_ = this.GetButton(0);
    this.AK_ = this.GetButton(1);
    this.RK_ = this.GetButton(2);
    this.Kuc = this.GetButton(4);
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.WAc = new LevelSequencePlayer_1.LevelSequencePlayer(this.Kuc.RootUIComp);
    this.z_e = ModelManager_1.ModelManager.GravityFlipModel.TargetDirection;
    if (this.z_e === -1) {
      this.GetItem(6)?.SetUIActive(false);
    }
    ModelManager_1.ModelManager.GravityFlipModel.ViewCallBackCache = this.OpenParam.SelectCallback;
  }
  OnBeforeShow() {
    this.zK_(true);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGravityFlipAnimFinish, this.YK_);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnGravityFlipAnimFinish, this.YK_);
  }
  kK_(s) {
    if (!this.zfc) {
      let e = -1;
      let t = 0;
      let i = "Turn_180";
      switch (s) {
        case 0:
          t = 180;
          e = 2;
          i = "Turn_180";
          break;
        case 1:
          t = 90;
          e = 1;
          i = "Turn_90_Zheng";
          break;
        case 2:
          t = 270;
          e = 0;
          i = "Turn_90_Fu";
          break;
        case 4:
          t = 0;
      }
      s = ModelManager_1.ModelManager.GravityFlipModel.CurrentGravityDirection;
      ModelManager_1.ModelManager.GravityFlipModel.CurrentGravityDirection = (t + s) % 360;
      if (e !== -1) {
        (0, this.OpenParam.SelectCallback)?.(e);
        this.Hea?.PlayLevelSequenceByName("Turn");
        this.UiViewSequence?.PlaySequence(i);
        ControllerHolder_1.ControllerHolder.GravityFlipController.OnChangeGravityDirection(t);
        this.zfc = true;
      }
      this.Xxe(false);
    }
  }
  zK_(e = false) {
    this.Xxe(false);
    let t = false;
    let i = false;
    let s = false;
    var r = this.z_e === -1 ? 0 : this.z_e;
    var r = (360 + ModelManager_1.ModelManager.GravityFlipModel.GravityFlipComp.CurGravityDirection - r) % 360;
    if (e && this.z_e !== -1) {
      this.GetItem(6)?.SetUIRelativeRotation(new UE.Rotator(0, r, 0));
    }
    var e = ModelManager_1.ModelManager.GravityFlipModel.ValidGravityDirections;
    for (const o of e) {
      switch ((360 - ModelManager_1.ModelManager.GravityFlipModel.CurrentGravityDirection + o) % 360) {
        case 270:
          i = true;
          break;
        case 180:
          s = true;
          break;
        case 90:
          t = true;
      }
    }
    if (i !== this.RK_.GetSelfInteractive()) {
      this.RK_?.SetSelfInteractive(i);
      this.RK_?.RootUIComp.SetUIActive(i);
    }
    if (t !== this.AK_.GetSelfInteractive()) {
      this.AK_?.SetSelfInteractive(t);
      this.AK_?.RootUIComp.SetUIActive(t);
    }
    if (s !== this.wK_.GetSelfInteractive()) {
      this.wK_?.SetSelfInteractive(s);
      this.wK_?.RootUIComp.SetUIActive(s);
    }
    this.WAc?.StopCurrentSequence();
    this.WAc?.PlayLevelSequenceByName("Gray");
  }
  Xxe(e) {
    this.wK_?.SetSelfInteractive(e);
    this.wK_?.RootUIComp.SetUIActive(e);
    this.AK_?.SetSelfInteractive(e);
    this.AK_?.RootUIComp.SetUIActive(e);
    this.RK_?.SetSelfInteractive(e);
    this.RK_?.RootUIComp.SetUIActive(e);
    this.Kuc?.SetSelfInteractive(e);
  }
  UY_() {
    if (ModelManager_1.ModelManager.GravityFlipModel.NeedChangeGravity()) {
      var e = ModelManager_1.ModelManager.GravityFlipModel.GravityFlipEntityCreatureDataId;
      if (e === -1) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 31, "[GravityFlipView] 未找到重力翻转实体");
        }
        ControllerHolder_1.ControllerHolder.GravityFlipController.CancelWaitTeleport();
      } else {
        const i = ModelManager_1.ModelManager.GravityFlipModel.CurGravityFlipType;
        var t = Protocol_1.Aki.Protocol.MY_.create();
        t.bY_ = MathUtils_1.MathUtils.NumberToLong(e);
        t.LY_ = i;
        Net_1.Net.Call(16684, t, e => {
          switch (e.Q4n) {
            case Protocol_1.Aki.Protocol.Q4n.KRs:
              break;
            case Protocol_1.Aki.Protocol.Q4n.Proto_ErrOnlineInteractNotOpen:
            case Protocol_1.Aki.Protocol.Q4n.Proto_ErrOnlineInteractNoPermission:
            case Protocol_1.Aki.Protocol.Q4n.Proto_GravityFlipLocked:
              ControllerHolder_1.ControllerHolder.GravityFlipController.CancelWaitTeleport();
              break;
            default:
              ControllerHolder_1.ControllerHolder.GravityFlipController.CancelWaitTeleport();
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28494);
          }
          ModelManager_1.ModelManager.GravityFlipModel.GravityFlipComp.SetGravityDirection(i);
          if (i !== e.RY_) {
            EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkEnd, this.hWe);
            ModelManager_1.ModelManager.GravityFlipModel.CacheCorrectDirection = e.RY_;
          }
        });
      }
    } else {
      ControllerHolder_1.ControllerHolder.GravityFlipController.CancelWaitTeleport();
    }
  }
}
exports.GravityFlipView = GravityFlipView;
//# sourceMappingURL=GravityFlipView.js.map