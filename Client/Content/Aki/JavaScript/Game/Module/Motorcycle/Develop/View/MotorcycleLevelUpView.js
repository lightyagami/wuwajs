"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleLevelUpView = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const Global_1 = require("../../../../Global");
const GlobalData_1 = require("../../../../GlobalData");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const EffectUtil_1 = require("../../../../Utils/EffectUtil");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
class MotorcycleLevelUpView extends UiViewBase_1.UiViewBase {
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
    this.cce = Rotator_1.Rotator.Create();
    this.iEt = t => {
      this.XMt += this.zMt * t;
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
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
  }
  OnStart() {
    var t = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetCacheData();
    ModelManager_1.ModelManager.MotorcycleDevelopModel.ClearCacheData();
    this.WMt = t.CurLevel > t.PreLevel;
    this.KMt = t.AddExp;
    this.QMt = false;
    this.rEt = false;
    this.Wft = t.CurLevel;
    this.nvi = !this.WMt;
    this.GetText(0).SetText((this.KMt ? t.PreLevel : t.CurLevel).toString());
    this.XMt = this.KMt ? t.PreExp : t.CurExp;
    this.JMt = ConfigManager_1.ConfigManager.MotorConfig.GetMotorLevelConfig(t.CurLevel).Exp;
    let e = 0;
    e = t.PreLevel === 1 ? this.JMt : ConfigManager_1.ConfigManager.MotorConfig.GetMotorLevelConfig(t.PreLevel).Exp;
    this.$Mt = this.KMt ? e : this.JMt;
    this.YMt = this.WMt ? t.CurExp + this.$Mt : t.CurExp;
    this.zMt = (this.YMt - this.XMt) / this.eEt;
    this.GetItem(3).SetUIActive(true);
    this.GetItem(4).SetUIActive(false);
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
  }
  OnAfterShow() {
    if (this.KMt) {
      this.ZMt = TimerSystem_1.GameplayTimerSystem.Forever(this.iEt, TimerSystem_1.MIN_TIME);
    }
  }
  get lvi() {
    return this.WMt && this.XMt >= this.$Mt;
  }
  oEt() {
    if (this.ZMt && !this.rEt && this.lvi) {
      this.rEt = true;
      this.GetText(0).SetText(this.Wft.toString());
      this.GetItem(3).SetUIActive(false);
      this.GetItem(4).SetUIActive(true);
      this.UiViewSequence?.PlaySequence("LevelUp");
    }
    var t = this.rEt ? this.XMt - this.$Mt : this.XMt;
    var e = this.rEt ? this.JMt : this.$Mt;
    this.GetTexture(1).SetFillAmount(t / e);
    this.cce.Yaw = t / e * -360;
    this.GetItem(2).SetUIRelativeRotation(this.cce.ToUeRotator());
    if (this.ZMt && e < t && !this.QMt) {
      this.QMt = true;
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
  avi() {
    var t;
    var e;
    var i;
    var s;
    if (Global_1.Global.BaseCharacter && (t = EffectUtil_1.EffectUtil.GetEffectPath("WorldLevelUpEffect")) && t.length !== 0) {
      e = (i = Global_1.Global.BaseCharacter).D_GetTransform();
      i = i.CapsuleComponent.CapsuleHalfHeight;
      (s = e.GetLocation()).Z -= i;
      e.SetLocation(s);
      if (!EffectSystem_1.EffectSystem.IsValid(this.rvi) && !(this.rvi = EffectSystem_1.EffectSystem.SpawnUnloopedEffect(GlobalData_1.GlobalData.World, e, t, "[MotorcycleLevelUpView.PlayLevelUpEffect]"), EffectSystem_1.EffectSystem.IsValid(this.rvi))) {
        this.rvi = 0;
      }
    }
  }
  _vi() {
    if (EffectSystem_1.EffectSystem.IsValid(this.rvi)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.rvi, "[MotorcycleLevelUpView.RecycleEffect]", true);
      this.rvi = 0;
    }
  }
}
exports.MotorcycleLevelUpView = MotorcycleLevelUpView;
//# sourceMappingURL=MotorcycleLevelUpView.js.map