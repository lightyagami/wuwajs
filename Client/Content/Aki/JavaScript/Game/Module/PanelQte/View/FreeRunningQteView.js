"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FreeRunningQteView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const UiManager_1 = require("../../../Ui/UiManager");
const CombineKeyItem_1 = require("../../BattleUi/Views/KeyItem/CombineKeyItem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const PanelQteController_1 = require("../PanelQteController");
const PanelQteView_1 = require("./PanelQteView");
const STOP_ANIM_TIME = 500;
class FreeRunningQteView extends PanelQteView_1.PanelQteView {
  constructor() {
    super(...arguments);
    this.Qtt = undefined;
    this.xOi = undefined;
    this.OOi = undefined;
    this.d5l = undefined;
    this.DOt = undefined;
    this.SPe = undefined;
    this.NTe = 0;
    this.NQa = false;
    this.FQa = "";
    this.TYa = false;
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
          if (this.IsPause) {
            this.FOi("Loop", 0);
          } else {
            this.FOi("Loop", 1 / this.NTe);
          }
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
    this.esh = () => {
      if (Time_1.Time.TimeDilation === 0) {
        this.Rth();
      } else {
        this.Dth();
      }
    };
    this.BOi = (e, t) => {
      if (this.del()) {
        if (t === 0) {
          this.bOi();
        }
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("PanelQte", 67, "[FreeRunningQteView]Input is not valid");
      }
    };
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
    if (this.IsMobile) {
      this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UISprite]];
    } else {
      this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UISprite], [4, UE.UIButtonComponent]];
    }
  }
  async OnBeforeStartAsync() {
    if (!this.IsMobile) {
      if (e = this.GetItem(2)) {
        this.Qtt = new CombineKeyItem_1.CombineKeyItem();
        await this.Qtt.CreateByActorAsync(e.GetOwner());
      }
    }
    var e = this.GetSprite(this.IsMobile ? 2 : 3);
    var t = ModelManager_1.ModelManager.PanelQteModel.GetContext();
    if (e) {
      this.DOt = e;
      await this.VQa(t.Config.Icon);
      e.SetUIActive(true);
    }
    this.IsQteStart = false;
    this.TYa = false;
  }
  OnStart() {
    if (this.IsMobile) {
      this.OOi = this.GetItem(0);
      this.d5l = this.GetButton(1);
      this.d5l?.OnPointDownCallBack.Bind(() => {
        this.qOi();
      });
    } else {
      this.OOi = this.GetItem(0);
      this.d5l = this.GetButton(4);
      this.d5l?.SetActive(false);
    }
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.OOi);
    this.SPe.BindSequenceCloseEvent(this.$xt);
    this.GOi();
  }
  OnAfterPlayStartSequence() {
    this.kOi();
  }
  OnBeforeDestroyImplement() {
    this.SPe?.Clear();
  }
  OnBeforeShow() {
    super.OnBeforeShow();
    if (!ModelManager_1.ModelManager.PanelQteModel.IsInQte) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PanelQte", 67, "界面打开时qte已经结束了");
      }
      UiManager_1.UiManager.CloseView("FreeRunningQteView");
    }
  }
  OnAfterShow() {
    super.OnAfterShow();
    this.Dth();
  }
  OnBeforeHide() {
    this.Rth();
    super.OnBeforeHide();
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy();
    if (this.IsMobile) {
      this.d5l?.OnPointDownCallBack.Unbind();
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
  async VQa(e) {
    const t = new CustomPromise_1.CustomPromise();
    const i = e?.ToAssetPathName();
    if (i) {
      ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.LGUITexturePackerSpriteData, e => {
        if (e) {
          this.DOt?.SetSprite(e, false);
          t.SetResult();
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("PanelQte", 67, `QTE加载图标失败, iconPath[${i}]`);
        }
      }, 100, this.MemoryTag);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PanelQte", 67, "QTE图标路径不存在");
      }
      t.SetResult();
    }
    return t.Promise;
  }
  GOi() {
    var e = this.OpenParam;
    if (ModelManager_1.ModelManager.PanelQteModel.IsInQte) {
      if (e !== (e = ModelManager_1.ModelManager.PanelQteModel.GetContext()).QteHandleId) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("PanelQte", 67, "qte handleId 不匹配");
        }
        UiManager_1.UiManager.CloseView("FreeRunningQteView");
      } else {
        this.NTe = e.Config.Duration;
        this.FQa = e.Config.Action;
        this.TYa = true;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("PanelQte", 67, `触发跑酷Qte:[${e.Config.Action}]`);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FreeRunningQteStart, this.FQa);
      }
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PanelQte", 67, "界面打开时qte已经结束了");
      }
      UiManager_1.UiManager.CloseView("FreeRunningQteView");
    }
  }
  OnAddEventListener() {
    super.OnAddEventListener();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TriggerUiTimeDilation, this.esh);
    this.HQa();
  }
  OnRemoveEventListener() {
    super.OnRemoveEventListener();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TriggerUiTimeDilation, this.esh);
    this.jQa();
  }
  HQa() {
    var e;
    if (!this.NQa && !(this.NQa = true, this.IsMobile)) {
      e = ModelManager_1.ModelManager.PanelQteModel.GetContext();
      this.FQa = e.Config.Action;
      this.Qtt?.RefreshAction(this.FQa);
      InputDistributeController_1.InputDistributeController.BindAction(this.FQa, this.BOi);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("PanelQte", 67, `跑酷QTE绑定Action: [${this.FQa}]`);
      }
    }
  }
  jQa() {
    if (this.NQa) {
      this.NQa = false;
      if (!this.IsMobile) {
        InputDistributeController_1.InputDistributeController.UnBindAction(this.FQa, this.BOi);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("PanelQte", 67, `跑酷QTE解绑Action: [${this.FQa}]`);
        }
        this.FQa = "";
      }
    }
  }
  del() {
    if (this.IsQteEnd || !this.IsQteStart && !this.TYa) {
      return false;
    }
    if (this.FQa === "幻象1") {
      var e = Global_1.Global.BaseCharacter;
      if (!e?.IsValid()) {
        return false;
      }
      e = e.CharacterActorComponent?.Entity;
      if (!e) {
        return false;
      }
      if (!e.GetComponent(107)?.CanActivateFixHook()) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("PanelQte", 67, "[FreeRunningQteView]Fix hook target not exist");
        }
        return false;
      }
    }
    return true;
  }
  qOi() {
    if (this.del()) {
      this.bOi();
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("PanelQte", 67, "[FreeRunningQteView]Input is not valid");
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
        UiManager_1.UiManager.CloseView("FreeRunningQteView");
      }, STOP_ANIM_TIME);
    }
  }
  FOi(e, t) {
    this.OOi.GetOwner().GetSequencePlayerByKey(e)?.SequencePlayer?.SetPlayRate(t);
  }
  Rth() {
    this.IsPause = true;
    if (this.xOi) {
      this.xOi.Pause();
    }
    this.FOi("Loop", 0);
  }
  Dth() {
    if (this.IsPause) {
      if (this.xOi) {
        this.xOi.Resume();
      }
      this.FOi("Loop", 1 / this.NTe);
      this.IsPause = false;
    }
  }
}
exports.FreeRunningQteView = FreeRunningQteView;
//# sourceMappingURL=FreeRunningQteView.js.map