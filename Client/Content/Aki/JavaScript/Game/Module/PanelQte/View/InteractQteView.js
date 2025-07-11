"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractQteView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const UiManager_1 = require("../../../Ui/UiManager");
const CombineKeyItem_1 = require("../../BattleUi/Views/KeyItem/CombineKeyItem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const PanelQteController_1 = require("../PanelQteController");
const PanelQteView_1 = require("./PanelQteView");
const STOP_ANIM_TIME = 500;
class InteractQteView extends PanelQteView_1.PanelQteView {
  constructor() {
    super(...arguments);
    this.Qtt = undefined;
    this.xOi = undefined;
    this.OOi = undefined;
    this.SPe = undefined;
    this.NTe = 0;
    this.kOi = () => {
      if (!this.IsQteEnd) {
        this.OOi?.SetUIActive(true);
        this.SPe?.PlayLevelSequenceByName("Start");
      }
    };
    this.$xt = e => {
      if (e === "Start" && !this.IsQteEnd) {
        this.SPe?.PlayLevelSequenceByName("Loop");
        if (this.NTe > 0) {
          this.FOi("Loop", 1 / this.NTe);
        }
        e = this.OpenParam;
        ModelManager_1.ModelManager.PanelQteModel.ResetLeftTime(e);
        if (!this.IsMobile) {
          this.GetItem(1)?.SetUIActive(true);
          this.Qtt?.Show();
        }
        this.IsQteStart = true;
      }
    };
    this.BOi = (e, t) => {
      if (!this.IsQteEnd && this.IsQteStart && t === 0) {
        this.bOi();
      }
    };
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
    if (this.IsMobile) {
      this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent]];
    } else {
      this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
    }
  }
  async OnBeforeStartAsync() {
    var e;
    if (!this.IsMobile) {
      if (e = this.GetItem(2)) {
        this.Qtt = new CombineKeyItem_1.CombineKeyItem();
        await this.Qtt.CreateByActorAsync(e.GetOwner());
        this.Qtt.RefreshAction(InputMappingsDefine_1.actionMappings.QTE交互);
      }
    }
    this.IsQteStart = false;
  }
  OnStart() {
    if (this.IsMobile) {
      this.OOi = this.GetItem(0);
      this.GetButton(1).OnPointDownCallBack.Bind(() => {
        this.qOi();
      });
    } else {
      this.OOi = this.GetItem(0);
      this.GetItem(1).SetUIActive(false);
    }
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.OOi);
    this.SPe.BindSequenceCloseEvent(this.$xt);
    this.GOi();
    this.OOi?.SetUIActive(false);
    this.UiViewSequence.AddSequenceFinishEvent("Start", this.kOi);
  }
  OnBeforeDestroyImplement() {
    this.SPe?.Clear();
  }
  OnBeforeShow() {
    super.OnBeforeShow();
    if (!ModelManager_1.ModelManager.PanelQteModel.IsInQte) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PanelQte", 17, "界面打开时qte已经结束了");
      }
      UiManager_1.UiManager.CloseView("InteractQteView");
    }
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy();
    if (this.IsMobile) {
      this.GetButton(1).OnPointDownCallBack.Unbind();
    }
    this.NOi();
  }
  RefreshVisible() {}
  NOi() {
    if (this.xOi) {
      TimerSystem_1.TimerSystem.Remove(this.xOi);
      this.xOi = undefined;
    }
  }
  GOi() {
    var e = this.OpenParam;
    if (ModelManager_1.ModelManager.PanelQteModel.IsInQte) {
      if (e !== (e = ModelManager_1.ModelManager.PanelQteModel.GetContext()).QteHandleId) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("PanelQte", 17, "qte handleId 不匹配");
        }
        UiManager_1.UiManager.CloseView("InteractQteView");
      } else {
        this.NTe = e.Config.Duration;
        this.IsQteStart = false;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("PanelQte", 17, "触发交互Qte");
        }
      }
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PanelQte", 17, "界面打开时qte已经结束了");
      }
      UiManager_1.UiManager.CloseView("InteractQteView");
    }
  }
  OnAddEventListener() {
    super.OnAddEventListener();
    if (!this.IsMobile) {
      InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.QTE交互, this.BOi);
    }
  }
  OnRemoveEventListener() {
    super.OnRemoveEventListener();
    if (!this.IsMobile) {
      InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.QTE交互, this.BOi);
    }
  }
  qOi() {
    if (!this.IsQteEnd && this.IsQteStart) {
      this.bOi();
    }
  }
  bOi() {
    var e = this.OpenParam;
    ModelManager_1.ModelManager.PanelQteModel.SetQteResult(e, true);
    PanelQteController_1.PanelQteController.StopQte(e);
  }
  HandleQteEnd() {
    if (!this.xOi) {
      if (!this.IsMobile) {
        this.GetItem(1).SetUIActive(false);
      }
      this.SPe?.StopCurrentSequence();
      if (ModelManager_1.ModelManager.PanelQteModel.IsQteSuccess()) {
        this.SPe?.PlayLevelSequenceByName("Success");
      } else {
        this.SPe?.PlayLevelSequenceByName("Fail");
      }
      this.xOi = TimerSystem_1.TimerSystem.Delay(() => {
        this.xOi = undefined;
        UiManager_1.UiManager.CloseView("InteractQteView");
      }, STOP_ANIM_TIME);
    }
  }
  FOi(e, t) {
    this.OOi.GetOwner().GetSequencePlayerByKey(e)?.SequencePlayer?.SetPlayRate(t);
  }
}
exports.InteractQteView = InteractQteView;
//# sourceMappingURL=InteractQteView.js.map