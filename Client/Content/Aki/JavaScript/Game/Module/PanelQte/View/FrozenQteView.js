"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FrozenQteView = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const PanelQteController_1 = require("../PanelQteController");
const PanelQteView_1 = require("./PanelQteView");
const QteAnimItem_1 = require("./QteAnimItem");
const QteTipItem_1 = require("./QteTipItem");
const STOP_ANIM_TIME = 100;
const LOOP_ANIM_TIME = 230;
class FrozenQteView extends PanelQteView_1.PanelQteView {
  constructor() {
    super(...arguments);
    this.AOi = 0;
    this.$Xt = 0;
    this.$G = [false, false];
    this.POi = [];
    this.xOi = undefined;
    this.wOi = undefined;
    this.BOi = (t, e) => {
      if (!this.IsQteEnd) {
        if (e > 0) {
          this.POi[0].PressAnim();
          this.bOi(1);
        } else if (e < 0) {
          this.POi[0].PressAnim();
          this.bOi(0);
        }
      }
    };
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
    if (this.IsMobile) {
      this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIItem]];
    } else {
      this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
    }
  }
  OnStart() {
    var t;
    var e;
    super.OnStart();
    if (this.IsMobile) {
      e = this.GetButton(0);
      t = this.GetButton(1);
      e.OnPointDownCallBack.Bind(() => {
        this.qOi(0);
      });
      t.OnPointDownCallBack.Bind(() => {
        this.qOi(1);
      });
      (e = new QteAnimItem_1.QteAnimItem()).Init(this.GetItem(2));
      e.StartAnim();
      (t = new QteAnimItem_1.QteAnimItem()).Init(this.GetItem(3));
      t.StartAnim(LOOP_ANIM_TIME);
      this.POi.push(e, t);
    } else {
      (e = new QteAnimItem_1.QteAnimItem()).Init(this.GetItem(2));
      e.StartAnim(0);
      this.POi.push(e);
      this.InputControllerChangeInner();
    }
    this.wOi = new QteTipItem_1.QteTipItem();
    this.wOi.Init(this.RootItem);
    this.wOi.Refresh("Text_FrozenQteTip_Text");
    this.GOi();
  }
  OnBeforeShow() {
    super.OnBeforeShow();
    if (!ModelManager_1.ModelManager.PanelQteModel.IsInQte) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PanelQte", 17, "界面打开时qte已经结束了");
      }
      this.CloseMe();
    }
  }
  OnBeforeDestroy() {
    var t;
    var e;
    super.OnBeforeDestroy();
    if (this.IsMobile) {
      t = this.GetButton(0);
      e = this.GetButton(1);
      t.OnPointDownCallBack.Unbind();
      e.OnPointDownCallBack.Unbind();
    }
    for (const i of this.POi) {
      i.Clear();
    }
    this.NOi();
    this.wOi.Destroy();
    this.wOi = undefined;
  }
  NOi() {
    if (this.xOi) {
      TimerSystem_1.TimerSystem.Remove(this.xOi);
      this.xOi = undefined;
    }
  }
  GOi() {
    this.AOi = 0;
    var t;
    var e;
    var i = this.OpenParam;
    if (ModelManager_1.ModelManager.PanelQteModel.IsInQte) {
      if (i !== (i = ModelManager_1.ModelManager.PanelQteModel.GetContext()).QteHandleId) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("PanelQte", 17, "qte handleId 不匹配");
        }
        this.CloseMe();
      } else {
        t = i.Config.MaxSuccessCount;
        e = i.Config.MinSuccessCount;
        this.$Xt = Math.floor(MathUtils_1.MathUtils.GetRandomFloatNumber(e, t + 1));
        this.InitCameraShake(i.Config);
        this.InitBuff(i.Config);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("PanelQte", 17, "触发冰冻Qte", ["需按次数", this.$Xt]);
        }
      }
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PanelQte", 17, "界面打开时qte已经结束了");
      }
      this.CloseMe();
    }
  }
  OnAddEventListener() {
    super.OnAddEventListener();
    if (!this.IsMobile) {
      InputDistributeController_1.InputDistributeController.BindAxis(InputMappingsDefine_1.axisMappings.UiMoveRight, this.BOi);
    }
  }
  OnRemoveEventListener() {
    super.OnRemoveEventListener();
    if (!this.IsMobile) {
      InputDistributeController_1.InputDistributeController.UnBindAxis(InputMappingsDefine_1.axisMappings.UiMoveRight, this.BOi);
    }
  }
  InputControllerChangeInner() {
    var t = Info_1.Info.IsInGamepad();
    var e = this.GetItem(0);
    var i = this.GetItem(1);
    e.SetUIActive(!t);
    i.SetUIActive(t);
  }
  qOi(t) {
    if (!this.IsQteEnd) {
      this.POi[t].PressAnim();
      this.bOi(t);
    }
  }
  bOi(t) {
    this.$G[t] = true;
    if (this.$G[0] && this.$G[1] && (this.$G[0] = false, this.$G[1] = false, this.AOi++, Log_1.Log.CheckDebug() && Log_1.Log.Debug("PanelQte", 17, "冰冻Qte中", ["已按次数", this.AOi]), this.AOi === this.$Xt)) {
      t = this.OpenParam;
      ModelManager_1.ModelManager.PanelQteModel.SetQteResult(t, true);
      PanelQteController_1.PanelQteController.StopQte(t);
    }
    this.PlayCameraShake();
    this.AddBuff();
  }
  HandleQteEnd() {
    if (!this.xOi) {
      for (const t of this.POi) {
        t.StopAnim();
      }
      this.xOi = TimerSystem_1.TimerSystem.Delay(() => {
        this.xOi = undefined;
        this.CloseMe();
      }, STOP_ANIM_TIME);
    }
  }
}
exports.FrozenQteView = FrozenQteView;
//# sourceMappingURL=FrozenQteView.js.map