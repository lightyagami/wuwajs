"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YouHuQteView = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const UiManager_1 = require("../../../Ui/UiManager");
const InputMultiKeyItem_1 = require("../../Common/InputKey/InputMultiKeyItem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const PanelQteController_1 = require("../PanelQteController");
const PanelQteView_1 = require("./PanelQteView");
const STOP_ANIM_TIME = 333;
const actionNames = [InputMappingsDefine_1.actionMappings.QTE数字1, InputMappingsDefine_1.actionMappings.QTE数字2, InputMappingsDefine_1.actionMappings.QTE数字3, InputMappingsDefine_1.actionMappings.QTE数字4];
class YouHuQteView extends PanelQteView_1.PanelQteView {
  constructor() {
    super(...arguments);
    this.dJs = [];
    this.Pvi = undefined;
    this.Zdn = undefined;
    this.OOi = undefined;
    this.SPe = undefined;
    this._Ba = [];
    this.WBa = [];
    this.QBa = [];
    this.xOi = undefined;
    this.gJs = 0;
    this.$xt = e => {
      if (e === "Start02" && !this.IsQteEnd) {
        e = this.OpenParam;
        ModelManager_1.ModelManager.PanelQteModel.ResetLeftTime(e);
        this.IsQteStart = true;
      }
    };
    this.BOi = (e, t) => {
      if (!this.IsQteEnd && this.IsQteStart && t === 0 && (t = actionNames.indexOf(e)) !== -1) {
        this.bOi(t);
      }
    };
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
    if (this.IsMobile) {
      this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UITexture], [6, UE.UINiagara], [7, UE.UIButtonComponent], [8, UE.UIButtonComponent], [9, UE.UIButtonComponent], [10, UE.UIButtonComponent]];
    } else {
      this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UITexture], [6, UE.UINiagara], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem]];
    }
  }
  async OnBeforeStartAsync() {
    if (!this.IsMobile) {
      for (let e = 11; e <= 14; e++) {
        this.WBa.push(this.GetItem(e));
      }
      for (let e = 15; e <= 18; e++) {
        this.QBa.push(this.GetItem(e));
      }
      var t = [];
      for (let e = 7; e <= 10; e++) {
        var i;
        var s = this.GetItem(e);
        if (s) {
          i = new InputMultiKeyItem_1.InputMultiKeyItem();
          this.dJs.push(i);
          t.push(i.CreateByActorAsync(s.GetOwner()));
        }
      }
      await Promise.all(t);
      for (let e = 0; e < this.dJs.length; e++) {
        var n = {
          ActionOrAxisName: actionNames[e]
        };
        this.dJs[e].RefreshByActionOrAxis(n);
        this.dJs[e].SetActive(true);
      }
    }
    this.IsQteStart = false;
  }
  OnStart() {
    super.OnStart();
    if (this.IsMobile) {
      this.Pvi = this.GetTexture(5);
      this.Zdn = this.GetUiNiagara(6);
      this.OOi = this.GetItem(0);
      this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.OOi);
      this._Ba.push(new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(1)));
      this._Ba.push(new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(2)));
      this._Ba.push(new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(3)));
      this._Ba.push(new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(4)));
      this.GetButton(7).OnPointDownCallBack.Bind(() => {
        this.bOi(0);
      });
      this.GetButton(8).OnPointDownCallBack.Bind(() => {
        this.bOi(1);
      });
      this.GetButton(9).OnPointDownCallBack.Bind(() => {
        this.bOi(2);
      });
      this.GetButton(10).OnPointDownCallBack.Bind(() => {
        this.bOi(3);
      });
    } else {
      this.Pvi = this.GetTexture(5);
      this.Zdn = this.GetUiNiagara(6);
      this.OOi = this.GetItem(0);
      this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.OOi);
      this._Ba.push(new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(1)));
      this._Ba.push(new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(2)));
      this._Ba.push(new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(3)));
      this._Ba.push(new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(4)));
      this.KBa();
    }
    this.SPe.BindSequenceCloseEvent(this.$xt);
    this.GOi();
  }
  OnBeforeShow() {
    super.OnBeforeShow();
    if (!ModelManager_1.ModelManager.PanelQteModel.IsInQte) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PanelQte", 17, "界面打开时qte已经结束了");
      }
      UiManager_1.UiManager.CloseView("YouHuQteView");
    }
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy();
    if (this.IsMobile) {
      this.GetButton(7).OnPointDownCallBack.Unbind();
      this.GetButton(8).OnPointDownCallBack.Unbind();
      this.GetButton(9).OnPointDownCallBack.Unbind();
      this.GetButton(10).OnPointDownCallBack.Unbind();
    }
    this.SPe?.Clear();
    this.SPe = undefined;
    for (const e of this._Ba) {
      e.Clear();
    }
    this._Ba.length = 0;
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
        UiManager_1.UiManager.CloseView("YouHuQteView");
      } else {
        this.gJs = e.Config.Duration * TimeUtil_1.TimeUtil.InverseMillisecond;
        this.SPe?.PlayLevelSequenceByName("Start02");
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("PanelQte", 17, "触发釉瑚Qte");
        }
      }
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PanelQte", 17, "界面打开时qte已经结束了");
      }
      UiManager_1.UiManager.CloseView("YouHuQteView");
    }
  }
  OnTick(e) {
    super.OnTick(e);
    if (!this.IsPause && !this.IsQteEnd) {
      e = Math.max(ModelManager_1.ModelManager.PanelQteModel.GetLeftTimeNoScale() / this.gJs, 0);
      this.Pvi?.SetFillAmount(e);
      this.Zdn?.SetNiagaraVarFloat("Dissolve", e);
    }
  }
  OnAddEventListener() {
    super.OnAddEventListener();
    if (!this.IsMobile) {
      InputDistributeController_1.InputDistributeController.BindActions(actionNames, this.BOi);
    }
  }
  OnRemoveEventListener() {
    super.OnRemoveEventListener();
    if (!this.IsMobile) {
      InputDistributeController_1.InputDistributeController.UnBindActions(actionNames, this.BOi);
    }
  }
  bOi(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("PanelQte", 17, "按下Qte", ["编号", e + 1]);
    }
    this._Ba[e].PlayLevelSequenceByName("ButtonPre");
    var t = this.OpenParam;
    var i = ModelManager_1.ModelManager.PanelQteModel.GetContext();
    if (t === i.QteHandleId) {
      i.BuffIndex = e;
    }
    ModelManager_1.ModelManager.PanelQteModel.SetQteResult(t, true);
    PanelQteController_1.PanelQteController.StopQte(t);
  }
  InputControllerChangeInner() {
    this.KBa();
  }
  KBa() {
    var e = Info_1.Info.IsInGamepad();
    for (const i of this.QBa) {
      i.SetUIActive(e);
    }
    var t = Info_1.Info.IsInKeyBoard();
    for (const s of this.WBa) {
      s.SetUIActive(t);
    }
  }
  HandleQteEnd() {
    if (!this.xOi) {
      this.SPe?.PlayLevelSequenceByName("Close");
      this.xOi = TimerSystem_1.TimerSystem.Delay(() => {
        this.xOi = undefined;
        UiManager_1.UiManager.CloseView("YouHuQteView");
      }, STOP_ANIM_TIME);
    }
  }
}
exports.YouHuQteView = YouHuQteView;
//# sourceMappingURL=YouHuQteView.js.map