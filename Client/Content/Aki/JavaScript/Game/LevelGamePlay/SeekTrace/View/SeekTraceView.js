"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SeekTraceView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ConfirmBoxDefine_1 = require("../../../Module/ConfirmBox/ConfirmBoxDefine");
const ScrollingTipsController_1 = require("../../../Module/ScrollingTips/ScrollingTipsController");
const UiSequencePlayer_1 = require("../../../Ui/Base/UiSequencePlayer");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const SeekTraceDefine_1 = require("../SeekTraceDefine");
const SeekTraceClawItem_1 = require("./SeekTraceClawItem");
const SeekTraceContentPanel_1 = require("./SeekTraceContentPanel");
const SeekTraceJoystickInput_1 = require("./SeekTraceJoystickInput");
class SeekTraceView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.Abu = undefined;
    this.Ted = undefined;
    this.Ihd = false;
    this.$pt = undefined;
    this.Jna = undefined;
    this.Thd = undefined;
    this.Qhd = undefined;
    this.rcd = false;
    this.v6e = () => {
      if (this.rcd) {
        this.CloseMe();
      }
    };
    this.lqt = () => {
      this.Abu?.OnInputControllerChange();
    };
    this._cr = e => {
      if (e === "Reset") {
        this.Abu?.SetInteractEnable(true);
        this.Ihd = false;
      } else if (e === "Success") {
        if (!ModelManager_1.ModelManager.SeekTraceModel.RemainUiAfterCompletion || ModelManager_1.ModelManager.LineCrossModel.CurrentChallengeFinishState) {
          this.CloseMe();
        } else if (ModelManager_1.ModelManager.SeekTraceModel.RemainUiAfterCompletion && !ModelManager_1.ModelManager.LineCrossModel.CurrentChallengeFinishState) {
          this.rcd = true;
        }
        if (ModelManager_1.ModelManager.LineCrossModel.CurrentChallengeFinishState) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("LineCross_Challenge_Pass");
        }
        e = ModelManager_1.ModelManager.SeekTraceModel.CurrentInteractEntityId;
        if (!(e = EntitySystem_1.EntitySystem.Get(e)) || !e.Active) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Gameplay_Locked");
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("LevelPlay", 27, "已完成寻迹", ["WaitRewardViewClose", this.rcd]);
        }
        ControllerHolder_1.ControllerHolder.SeekTraceController.FinishSeekTrace();
      }
    };
    this.jtu = () => {
      if (!ModelManager_1.ModelManager.SeekTraceModel.IsGameFinish) {
        this.Xid("CrossLine_Reset_Tips");
      }
    };
    this.lPe = () => {
      var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(367);
      e.FunctionMap.set(2, () => {
        this.CloseMe();
        ControllerHolder_1.ControllerHolder.SeekTraceController.FinishSeekTrace();
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    };
    this.GIl = () => {
      this.GetItem(0).SetUIActive(false);
      this.GetButton(3).RootUIComp.SetUIActive(false);
    };
    this.rid = () => {
      this.GetItem(0).SetUIActive(true);
      this.GetButton(3).RootUIComp.SetUIActive(true);
      var e = ModelManager_1.ModelManager.SeekTraceModel;
      this.Yid();
      if (e.IsGameFinish) {
        if (e.GameFinishResult) {
          this.$pt.PlaySequencePurely("Success");
          this.Abu.OnSeekTraceSucceed();
        } else {
          this.Xid("CrossLine_Fail_Tips");
        }
      }
    };
    this.bhd = e => {
      this.GetText(2).SetText(e.toString());
    };
    this.Rhd = () => {
      if (this.Jna) {
        this.Jna.Kill();
        this.Jna.OnCompleteCallBack.Unbind();
        this.Jna = undefined;
      }
      (0, puerts_1.releaseManualReleaseDelegate)(this.bhd);
    };
    this.Khd = (e, t) => {
      this.Qhd?.MoveAxisInput(e, t);
    };
    this.Xhd = (e, t) => {
      this.Qhd?.MoveActionInput(e, t);
    };
    this.Yhd = () => {
      this.Abu?.GamePadSelectItem();
    };
    this.zhd = () => {
      this.Abu?.GamePadResetItem();
    };
    this.Whd = e => {
      let t = 0;
      let i = 0;
      switch (e) {
        case 1:
          i = -1;
          break;
        case 2:
          i = 1;
          break;
        case 3:
          t = -1;
          break;
        case 4:
          t = 1;
      }
      this.Abu?.GamePadMovePosition(t, i);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIItem]];
    this.BtnBindInfo = [[3, this.jtu]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCloseRewardView, this.v6e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.lqt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SeekTraceMoveActionInput, this.Xhd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SeekTraceMoveAxisInput, this.Khd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SeekTraceSelectItemInput, this.Yhd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SeekTraceResetItemInput, this.zhd);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCloseRewardView, this.v6e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.lqt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SeekTraceMoveActionInput, this.Xhd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SeekTraceMoveAxisInput, this.Khd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SeekTraceSelectItemInput, this.Yhd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SeekTraceResetItemInput, this.zhd);
  }
  async OnBeforeStartAsync() {
    var e;
    var t = ModelManager_1.ModelManager.SeekTraceModel;
    var i = t.PanelWidth;
    var t = t.PanelHeight;
    let s = undefined;
    if (i === SeekTraceDefine_1.SMALL_CONTNET_SIZE && t === SeekTraceDefine_1.SMALL_CONTNET_SIZE) {
      s = SeekTraceDefine_1.SMALL_CONTENT_KEY;
    }
    if (s = i === SeekTraceDefine_1.BIG_CONTENT_SIZE && t === SeekTraceDefine_1.BIG_CONTENT_SIZE ? SeekTraceDefine_1.BIG_CONTENT_KEY : s) {
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SeekTraceResetCurve");
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.CurveFloat, e => {
        if (e?.IsValid()) {
          this.Thd = e;
        }
      });
      this.Abu = new SeekTraceContentPanel_1.SeekTraceContentPanel();
      await this.Abu.CreateThenShowByResourceIdAsync(s, this.GetItem(1));
      this.Abu.SetItemCallback(this.GIl, this.rid);
      this.Abu.SetInteractEnable(true);
      this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
      await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
      this.lqe.SetTitle("");
      this.lqe.SetHelpBtnActive(true);
      this.lqe.SetCloseCallBack(this.lPe);
      this.Ted = new SeekTraceClawItem_1.SeekTraceClawItem();
      await this.Ted.CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelPlay", 48, "SeekTrace尺寸不符合规格", ["Width", i], ["Height", t]);
    }
  }
  OnStart() {
    this.$pt = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.$pt.BindOnEndSequenceEvent(this._cr);
    this.Yid();
    this.Qhd = new SeekTraceJoystickInput_1.SeekTraceJoystickInput();
    this.Qhd?.RegisterMovePress(this.Whd);
  }
  OnBeforeDestroy() {
    this.$pt?.Clear();
    this.$pt = undefined;
    this.Thd = undefined;
    ModelManager_1.ModelManager.LineCrossModel.CurrentChallengeFinishState = false;
  }
  OnTick(e) {
    this.Qhd?.Tick(e);
    this.Abu?.UpdateKeyBoardSelectFrame();
  }
  Xid(t) {
    if (!this.Ihd) {
      this.Ihd = true;
      const i = ModelManager_1.ModelManager.SeekTraceModel.StepLimit;
      ControllerHolder_1.ControllerHolder.SeekTraceController.ResetSeekTrace(() => {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(t);
        this.$pt.PlaySequencePurely("Reset");
        this.Abu?.SetInteractEnable(false);
        this.Abu?.ResetView();
        var e = ModelManager_1.ModelManager.SeekTraceModel.StepLimit;
        this.Jna = UE.LTweenBPLibrary.IntTo(GlobalData_1.GlobalData.World, (0, puerts_1.toManualReleaseDelegate)(this.bhd), i, e, 1);
        if (this.Jna) {
          if (this.Thd) {
            this.Jna.SetEase(28);
            this.Jna.SetCurveFloat(this.Thd);
          }
          this.Jna.OnCompleteCallBack.Bind(this.Rhd);
        }
      });
    }
  }
  Yid() {
    this.GetText(2).SetText(ModelManager_1.ModelManager.SeekTraceModel.StepLimit.toString());
  }
}
exports.SeekTraceView = SeekTraceView;
//# sourceMappingURL=SeekTraceView.js.map