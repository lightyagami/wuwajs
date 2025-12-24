"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleControlHudPanel = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const Global_1 = require("../../../../Global");
const GlobalData_1 = require("../../../../GlobalData");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const BattleVisibleChildView_1 = require("../BattleChildView/BattleVisibleChildView");
const MotorcycleHudSpeedItem_1 = require("./MotorcycleHudSpeedItem");
const MotorcyclePercentMachine_1 = require("./MotorcyclePercentMachine");
const MotorcycleSpeedColorMachine_1 = require("./MotorcycleSpeedColorMachine");
const TICK_INTERVAL = 100;
const SPEED_COLOR_MPC_PATH = "/Game/Aki/UI/Framework/MPC/UiActivity/Activity30/MotoParkour/GamePlay/MPC_MotoHUD_MainColor.MPC_MotoHUD_MainColor";
class SpeedColorObj {
  constructor() {
    this.ColorMap = new Map();
    this.ColorMachine = new MotorcycleSpeedColorMachine_1.MotorcycleSpeedColorMachine();
    this.UpdateFunc = undefined;
  }
  Init() {
    var t = this.ColorMap.get(0);
    if (t) {
      this.ColorMachine.Init(t);
      this.UpdateFunc?.(this.ColorMachine.GetColor());
    }
  }
  Update(t) {
    if (this.ColorMachine.Update(t)) {
      this.UpdateFunc?.(this.ColorMachine.GetColor());
    }
  }
  Clear() {
    this.UpdateFunc = undefined;
  }
}
class MotorcycleControlHudPanel extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this._kf = undefined;
    this.ukf = undefined;
    this.CJm = undefined;
    this.Ggm = undefined;
    this.yJm = 0;
    this.vNf = false;
    this.JFf = 0;
    this.ZFf = 0;
    this.eNf = 300;
    this.tNf = 0;
    this.iNf = false;
    this.rNf = new MotorcyclePercentMachine_1.MotorcyclePercentMachine();
    this.xGf = 0;
    this.v9f = undefined;
    this.y9f = [];
    this.UGf = t => {
      this.SetVisible(1, t);
    };
    this.qGf = t => {
      if (this.xGf === 0 && t !== 0) {
        if (this.SPe?.IsPlayingSequence("BoostOut")) {
          this.SPe?.StopSequenceByKey("BoostOut");
        }
        this.SPe?.PlayLevelSequenceByName("BoostIn");
      } else if (this.xGf !== 0 && t === 0) {
        if (this.SPe?.IsPlayingSequence("BoostIn")) {
          this.SPe?.StopSequenceByKey("BoostIn");
        }
        this.SPe?.PlayLevelSequenceByName("BoostOut");
      }
      this.OGf(t);
    };
    this.S9f = t => {
      if (this.v9f) {
        UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.World, this.v9f, FNameUtil_1.FNameUtil.GetDynamicFName("MainColor"), t);
      }
      this._kf?.SetMainColor(t);
      this.ukf?.SetMainColor(t);
    };
    this.M9f = t => {
      if (this.v9f) {
        UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.World, this.v9f, FNameUtil_1.FNameUtil.GetDynamicFName("ColorA"), t);
      }
    };
    this.E9f = t => {
      if (this.v9f) {
        UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.World, this.v9f, FNameUtil_1.FNameUtil.GetDynamicFName("ColorB"), t);
      }
    };
    this.I9f = t => {
      this._kf?.SetPointerColor(t);
      this.ukf?.SetPointerColor(t);
    };
  }
  async Init(t, e) {
    await this.CreateByResourceIdAsync(e, t);
    this.Initialize();
    await this.InitializeAsync();
    this.oNf();
    await this.T9f();
    this.b9f();
    if (ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.IsDriving) {
      this.ShowBattleVisibleChildView();
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this._kf = new MotorcycleHudSpeedItem_1.MotorcycleHudSpeedItem();
    this._kf.IsLeft = true;
    await this._kf.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.ukf = new MotorcycleHudSpeedItem_1.MotorcycleHudSpeedItem();
    await this.ukf.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
  }
  OnStart() {
    this.InitChildType(40);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.Ore();
    this.NJm(true);
    this.SetVisible(1, ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.GetHudVisible());
  }
  OnShowBattleChildViewPanel() {}
  OnHideBattleChildViewPanel() {}
  OnBeforeShow() {
    super.OnBeforeShow();
    this.NJm(true);
  }
  OnAfterHide() {
    super.OnAfterHide();
    this.CJm = undefined;
    this.Ggm = undefined;
  }
  OnAfterShow() {
    this.GGf(0, true);
    this.iNf = true;
    this.SPe?.PlayLevelSequenceByName("Start");
    if (this.vNf) {
      this.vNf = false;
      this.SPe?.PlayLevelSequenceByName("FPVOut");
    }
  }
  async OnBeforeHideAsync() {
    this.iNf = false;
    var t = [];
    var e = new CustomPromise_1.CustomPromise();
    t.push(e);
    this.SPe?.PlaySequenceAsync("Close", e);
    if (ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.IsInFirstPersonMode()) {
      this.vNf = true;
      e = new CustomPromise_1.CustomPromise();
      t.push(e);
      this.SPe?.PlaySequenceAsync("FPVIn", e);
    } else if (this.vNf) {
      this.vNf = false;
      e = new CustomPromise_1.CustomPromise();
      t.push(e);
      this.SPe?.PlaySequenceAsync("FPVOut", e);
    }
    await Promise.all(t);
  }
  OnBeforeDestroy() {
    this.Reset();
    this.kre();
    this.v9f = undefined;
    for (const t of this.y9f) {
      t.Clear();
    }
    this.y9f.length = 0;
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiMotorcycleHudVisibleChanged, this.UGf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiMotorcycleHudColorStateChanged, this.qGf);
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiMotorcycleHudVisibleChanged, this.UGf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiMotorcycleHudColorStateChanged, this.qGf);
  }
  NJm(t) {
    this.yJm = TICK_INTERVAL;
    if (!this.CJm?.Valid) {
      this.VJm();
    }
    if (this.Ggm) {
      var e = this.Ggm.VehicleMoveComp?.VehicleMovement;
      if (e) {
        var i = e.WheelDisplayInfosObj?.DisplayInfos;
        let t = 0;
        if (i && i.Num() >= 2 && (o = e.MotorShapeConfig, t = Math.max(Math.abs(i.Get(0).WheelSpeed * o.FrontWheelShape.Radius), Math.abs(i.Get(1).WheelSpeed * o.BackWheelShape.Radius)), ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.DebugLog) && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Battle", 17, "MotorcycleControlHud WheelInfo", ["speed0", i.Get(0).WheelSpeed.toFixed(2)], ["speed1", i.Get(1).WheelSpeed.toFixed(2)], ["radius0", o.FrontWheelShape.Radius.toFixed(2)], ["radius1", o.BackWheelShape.Radius.toFixed(2)]);
        }
        var i = e.MotorAccelConfig.MaxSpeed;
        this._kf.SetSpeed(t, i);
        var o = e.MotorAccelConfig.PowerAccel.ToMax;
        var e = e.GetCurrentMotorPower();
        this.ukf.SetSpeed(e, o);
        if (ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.DebugLog && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Battle", 17, "MotorcycleControlHud", ["speed", t], ["mSpeed", i], ["acc", e], ["mAcc", o]);
        }
      }
    }
  }
  VJm() {
    var t = ModelManager_1.ModelManager.BattleUiModel.MotorcycleData;
    this.CJm = t.MotorcycleEntityHandle;
    if (this.CJm?.Valid) {
      this.Ggm = this.CJm.Entity.GetComponent(247);
    } else {
      this.Ggm = undefined;
    }
  }
  Tick(t) {
    if (this.IsShowOrShowing) {
      this.yJm -= t;
      if (this.yJm <= 0) {
        this.NJm(false);
      }
      this._kf.Tick(t);
      this.ukf.Tick(t);
      if (this.iNf) {
        this.GGf(t);
      }
      for (const e of this.y9f) {
        e.Update(t);
      }
    }
  }
  GGf(t, e = false) {
    var i = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (i && (i = ControllerHolder_1.ControllerHolder.CameraController.CameraRotator.Yaw * MathCommon_1.MathCommon.DegToRad - i.ActorForwardProxy.HeadingAngle(), Math.abs(i) < this.ZFf ? this.nNf(0, e) : this.nNf(1, e), e || this.rNf.Update(t))) {
      this.GetRootItem().SetAlpha(this.rNf.GetCurPercent());
    }
  }
  nNf(t, e = false) {
    if (t !== this.JFf || !!e) {
      t = (this.JFf = t) === 0 ? 1 : this.tNf;
      if (e) {
        this.rNf.Init(t, this.eNf);
      } else {
        this.rNf.SetTargetPercent(t);
      }
    }
  }
  oNf() {
    var t = CommonParamById_1.configCommonParamById.GetFloatArrayConfig("MotorHudAlphaParams");
    if (t && (t.length > 0 && (this.ZFf = t[0] * 0.5 * MathCommon_1.MathCommon.DegToRad), t.length > 1 && (this.tNf = t[1]), t.length > 2)) {
      this.eNf = t[2] * TimeUtil_1.TimeUtil.InverseMillisecond;
    }
  }
  OGf(t) {
    if (this.xGf !== t) {
      this.xGf = t;
      for (const i of this.y9f) {
        var e = i.ColorMap.get(t);
        if (e) {
          i.ColorMachine.SetTargetColor(e);
        }
      }
    }
  }
  async T9f() {
    const e = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(SPEED_COLOR_MPC_PATH, UE.MaterialParameterCollection, t => {
      this.v9f = t;
      e.SetResult(true);
    });
    return e.Promise;
  }
  b9f() {
    var e = ["MotorHudMainColor", "MotorHudColorA", "MotorHudColorB", "MotorHudPointerColor"];
    var i = [this.S9f, this.M9f, this.E9f, this.I9f];
    for (let t = 0; t < 4; t++) {
      var o = new SpeedColorObj();
      o.UpdateFunc = i[t];
      var s = CommonParamById_1.configCommonParamById.GetStringArrayConfig(e[t]);
      if (s) {
        for (let t = 0; t < 3; t++) {
          if (s[t]) {
            o.ColorMap.set(t, s[t]);
          }
        }
      }
      o.Init();
      this.y9f.push(o);
    }
  }
}
exports.MotorcycleControlHudPanel = MotorcycleControlHudPanel;
//# sourceMappingURL=MotorcycleControlHudPanel.js.map