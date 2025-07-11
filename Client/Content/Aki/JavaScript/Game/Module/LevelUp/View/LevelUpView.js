"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelUpView = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const MapNoteById_1 = require("../../../../Core/Define/ConfigQuery/MapNoteById");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const EffectUtil_1 = require("../../../Utils/EffectUtil");
class LevelUpView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.rvi = 0;
    this.WMt = false;
    this.KMt = false;
    this.QMt = false;
    this.rEt = false;
    this.XMt = 0;
    this.$Mt = 0;
    this.YMt = 0;
    this.JMt = 0;
    this.zMt = 0;
    this.Wft = 0;
    this.nvi = false;
    this.ZMt = undefined;
    this.Xtl = false;
    this.eEt = CommonParamById_1.configCommonParamById.GetIntConfig("ExpDisplayTime");
    this.tEt = CommonParamById_1.configCommonParamById.GetIntConfig("ExpDisplayCloseTime");
    this.iEt = e => {
      this.XMt += this.zMt * e;
      if (this.XMt >= this.YMt) {
        this.XMt = this.YMt;
        TimerSystem_1.GameplayTimerSystem.Remove(this.ZMt);
        this.Ytl();
      }
      this.oEt();
    };
    this.AMe = () => {
      this.svi();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UISprite]];
  }
  OnStart() {
    var e = ModelManager_1.ModelManager.LevelUpModel.GetCacheData();
    ModelManager_1.ModelManager.LevelUpModel.ClearCacheData();
    this.WMt = e.CurLevel > e.PreLevel;
    this.KMt = e.AddExp;
    this.QMt = false;
    this.rEt = false;
    this.Wft = e.CurLevel;
    this.nvi = !this.WMt;
    this.GetText(0).SetText((this.KMt ? e.PreLevel : e.CurLevel).toString());
    this.XMt = this.KMt ? e.PreExp : e.CurExp;
    this.JMt = ConfigManager_1.ConfigManager.FunctionConfig.GetPlayerLevelConfig(e.CurLevel).LevelExp;
    this.$Mt = this.KMt ? ConfigManager_1.ConfigManager.FunctionConfig.GetPlayerLevelConfig(e.PreLevel).LevelExp : this.JMt;
    this.YMt = this.WMt ? e.CurExp + this.$Mt : e.CurExp;
    this.zMt = (this.YMt - this.XMt) / this.eEt;
    this.oEt();
    if (this.WMt) {
      this.UiViewSequence.AddSequenceFinishEvent("LevelUp", () => {
        this.nvi = true;
        this.Ytl();
      });
    }
  }
  Ytl() {
    if (this.nvi && this.XMt >= this.YMt) {
      this.svi();
    }
  }
  svi() {
    if (!this.Xtl) {
      this.Xtl = true;
      this.CloseMe();
    }
  }
  OnBeforeShow() {
    if (this.WMt) {
      this.avi();
    }
    if (this.KMt) {
      this.hvi();
    }
  }
  OnAfterShow() {
    if (this.KMt) {
      this.ZMt = TimerSystem_1.GameplayTimerSystem.Forever(this.iEt, TimerSystem_1.MIN_TIME);
    } else {
      this.ZMt = TimerSystem_1.GameplayTimerSystem.Delay(() => {
        this.svi();
      }, this.tEt);
    }
  }
  get lvi() {
    return this.WMt && this.XMt >= this.$Mt;
  }
  oEt() {
    if (this.ZMt && !this.rEt && this.lvi) {
      this.rEt = true;
      this.GetText(0).SetText(this.Wft.toString());
      this.UiViewSequence?.PlaySequence("LevelUp");
    }
    var e = this.rEt ? this.XMt - this.$Mt : this.XMt;
    var t = this.rEt ? this.JMt : this.$Mt;
    this.GetText(1).SetText(Math.round(e) + "/" + t);
    this.GetSprite(2).SetFillAmount(e / t);
    if (this.ZMt && t < e && !this.QMt) {
      this.QMt = true;
      this.UiViewSequence.PlaySequence("Stuck");
    }
  }
  OnBeforeDestroy() {
    if (this.ZMt && TimerSystem_1.GameplayTimerSystem.Has(this.ZMt)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.ZMt);
    }
    this._vi();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkStart, this.AMe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkStart, this.AMe);
  }
  hvi() {
    if (ModelManager_1.ModelManager.LevelUpModel.CanBreakTipsShowFlag) {
      for (const t of MapNoteById_1.configMapNoteById.GetConfig(4).QuestIdList) {
        var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(t);
        if (e === 2 || e === 1) {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("WorldLevelUpgradeNotice");
          ModelManager_1.ModelManager.LevelUpModel.CanBreakTipsShowFlag = false;
          break;
        }
      }
    }
  }
  avi() {
    var e;
    var t;
    var i;
    var s;
    if (Global_1.Global.BaseCharacter && (e = EffectUtil_1.EffectUtil.GetEffectPath("WorldLevelUpEffect")) && e.length !== 0) {
      t = (i = Global_1.Global.BaseCharacter).D_GetTransform();
      i = i.CapsuleComponent.CapsuleHalfHeight;
      (s = t.GetLocation()).Z -= i;
      t.SetLocation(s);
      if (!EffectSystem_1.EffectSystem.IsValid(this.rvi) && !(this.rvi = EffectSystem_1.EffectSystem.SpawnUnloopedEffect(GlobalData_1.GlobalData.World, t, e, "[LevelUpView.PlayLevelUpEffect]"), EffectSystem_1.EffectSystem.IsValid(this.rvi))) {
        this.rvi = 0;
      }
    }
  }
  _vi() {
    if (EffectSystem_1.EffectSystem.IsValid(this.rvi)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.rvi, "[LevelUpView.RecycleEffect]", true);
      this.rvi = 0;
    }
  }
}
exports.LevelUpView = LevelUpView;
//# sourceMappingURL=LevelUpView.js.map