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
const InputEnums_1 = require("../../../../Input/InputEnums");
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
    this.t3f = undefined;
    this.i3f = undefined;
    this.rtf = undefined;
    this.Ggm = undefined;
    this.stf = 0;
    this.rHf = false;
    this.k9f = 0;
    this.q9f = 0;
    this.O9f = 300;
    this.G9f = 0;
    this.F9f = false;
    this.N9f = new MotorcyclePercentMachine_1.MotorcyclePercentMachine();
    this.K6f = 0;
    this.yZf = undefined;
    this.SZf = [];
    this.aSg = undefined;
    this.hSg = 0;
    this.lSg = 0;
    this.Pnr = 0;
    this._Sg = 0;
    this.uSg = 0;
    this.cSg = 0;
    this.dSg = 0;
    this.Gue = new UE.Rotator(0, 0, 0);
    this.Q6f = t => {
      this.SetVisible(1, t);
    };
    this.z6f = t => {
      if (this.K6f === 0 && t !== 0) {
        if (this.SPe?.IsPlayingSequence("BoostOut")) {
          this.SPe?.StopSequenceByKey("BoostOut");
        }
        this.SPe?.PlayLevelSequenceByName("BoostIn");
      } else if (this.K6f !== 0 && t === 0) {
        if (this.SPe?.IsPlayingSequence("BoostIn")) {
          this.SPe?.StopSequenceByKey("BoostIn");
        }
        this.SPe?.PlayLevelSequenceByName("BoostOut");
      }
      this.J6f(t);
    };
    this.MZf = t => {
      if (this.yZf) {
        UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.World, this.yZf, FNameUtil_1.FNameUtil.GetDynamicFName("MainColor"), t);
      }
      this.t3f?.SetMainColor(t);
      this.i3f?.SetMainColor(t);
    };
    this.EZf = t => {
      if (this.yZf) {
        UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.World, this.yZf, FNameUtil_1.FNameUtil.GetDynamicFName("ColorA"), t);
      }
    };
    this.IZf = t => {
      if (this.yZf) {
        UE.KismetMaterialLibrary.SetVectorParameterValue(GlobalData_1.GlobalData.World, this.yZf, FNameUtil_1.FNameUtil.GetDynamicFName("ColorB"), t);
      }
    };
    this.TZf = t => {
      this.t3f?.SetPointerColor(t);
      this.i3f?.SetPointerColor(t);
    };
    this.h4g = t => {
      this.t3f?.SetNumTextColor(t);
    };
    this.l4g = t => {
      this.t3f?.SetNumTextStrokeColor(t);
    };
    this._4g = t => {
      this.t3f?.SetNumTextGlowColor(t);
    };
  }
  async Init(t, i) {
    await this.CreateByResourceIdAsync(i, t);
    this.Initialize();
    await this.InitializeAsync();
    this.V9f();
    await this.bZf();
    this.RZf();
    if (ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.IsDriving) {
      this.ShowBattleVisibleChildView();
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.t3f = new MotorcycleHudSpeedItem_1.MotorcycleHudSpeedItem();
    this.t3f.IsLeft = true;
    await this.t3f.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.i3f = new MotorcycleHudSpeedItem_1.MotorcycleHudSpeedItem();
    await this.i3f.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
  }
  OnStart() {
    this.InitChildType(40);
    this._Sg = CommonParamById_1.configCommonParamById.GetFloatConfig("MotorHudRotateYaw");
    this.uSg = CommonParamById_1.configCommonParamById.GetFloatConfig("MotorHudRotateSpeed");
    this.cSg = CommonParamById_1.configCommonParamById.GetFloatConfig("MotorHudRotateBackSpeed");
    this.dSg = CommonParamById_1.configCommonParamById.GetFloatConfig("MotorHudRotateOutSpeed");
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.aSg = this.GetItem(2);
    this.Ore();
    this.Rtf(true);
    this.SetVisible(1, ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.GetHudVisible());
  }
  OnShowBattleChildViewPanel() {}
  OnHideBattleChildViewPanel() {}
  OnBeforeShow() {
    super.OnBeforeShow();
    this.Rtf(true);
  }
  OnAfterHide() {
    super.OnAfterHide();
    this.rtf = undefined;
    this.Ggm = undefined;
  }
  OnAfterShow() {
    this.Z6f(0, true);
    this.F9f = true;
    this.SPe?.PlayLevelSequenceByName("Start");
  }
  async OnBeforeHideAsync() {
    this.F9f = false;
    var t = [];
    var i = new CustomPromise_1.CustomPromise();
    t.push(i);
    this.SPe?.PlaySequenceAsync("Close", i);
    await Promise.all(t);
  }
  OnBeforeDestroy() {
    this.Reset();
    this.kre();
    this.yZf = undefined;
    for (const t of this.SZf) {
      t.Clear();
    }
    this.SZf.length = 0;
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiMotorcycleHudVisibleChanged, this.Q6f);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiMotorcycleHudColorStateChanged, this.z6f);
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiMotorcycleHudVisibleChanged, this.Q6f);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiMotorcycleHudColorStateChanged, this.z6f);
  }
  Rtf(t) {
    this.stf = TICK_INTERVAL;
    if (!this.rtf?.Valid) {
      this.wtf();
    }
    if (this.Ggm) {
      var i = this.Ggm.VehicleMoveComp?.VehicleMovement;
      if (i) {
        var e = i.WheelDisplayInfosObj?.DisplayInfos;
        let t = 0;
        if (e && e.Num() >= 2 && (o = i.MotorShapeConfig, t = Math.max(Math.abs(e.Get(0).WheelSpeed * o.FrontWheelShape.Radius), Math.abs(e.Get(1).WheelSpeed * o.BackWheelShape.Radius)), ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.DebugLog) && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Battle", 17, "MotorcycleControlHud WheelInfo", ["speed0", e.Get(0).WheelSpeed.toFixed(2)], ["speed1", e.Get(1).WheelSpeed.toFixed(2)], ["radius0", o.FrontWheelShape.Radius.toFixed(2)], ["radius1", o.BackWheelShape.Radius.toFixed(2)]);
        }
        var e = i.MotorAccelConfig.MaxSpeed;
        this.t3f.SetSpeed(t, e);
        var o = i.MotorAccelConfig.PowerAccel.ToMax;
        var i = i.GetCurrentMotorPower();
        this.i3f.SetSpeed(i, o);
        if (ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.DebugLog && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Battle", 17, "MotorcycleControlHud", ["speed", t], ["mSpeed", e], ["acc", i], ["mAcc", o]);
        }
      }
    }
  }
  wtf() {
    var t = ModelManager_1.ModelManager.BattleUiModel.MotorcycleData;
    this.rtf = t.MotorcycleEntityHandle;
    if (this.rtf?.Valid) {
      this.Ggm = this.rtf.Entity.GetComponent(247);
    } else {
      this.Ggm = undefined;
    }
  }
  Tick(t) {
    if (this.IsShowOrShowing) {
      this.stf -= t;
      if (this.stf <= 0) {
        this.Rtf(false);
      }
      this.t3f.Tick(t);
      this.i3f.Tick(t);
      if (this.F9f) {
        this.Z6f(t);
      }
      for (const i of this.SZf) {
        i.Update(t);
      }
      this.mSg(t);
    }
  }
  Z6f(t, i = false) {
    var e = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (e && (e = ControllerHolder_1.ControllerHolder.CameraController.CameraRotator.Yaw * MathCommon_1.MathCommon.DegToRad - e.ActorForwardProxy.HeadingAngle(), Math.abs(e) < this.q9f ? this.H9f(0, i) : this.H9f(1, i), i || this.N9f.Update(t))) {
      this.GetRootItem().SetAlpha(this.N9f.GetCurPercent());
    }
  }
  H9f(t, i = false) {
    if (t !== this.k9f || !!i) {
      t = (this.k9f = t) === 0 ? 1 : this.G9f;
      if (i) {
        this.N9f.Init(t, this.O9f);
      } else {
        this.N9f.SetTargetPercent(t);
      }
    }
  }
  V9f() {
    var t = CommonParamById_1.configCommonParamById.GetFloatArrayConfig("MotorHudAlphaParams");
    if (t && (t.length > 0 && (this.q9f = t[0] * 0.5 * MathCommon_1.MathCommon.DegToRad), t.length > 1 && (this.G9f = t[1]), t.length > 2)) {
      this.O9f = t[2] * TimeUtil_1.TimeUtil.InverseMillisecond;
    }
  }
  J6f(t) {
    if (this.K6f !== t) {
      this.K6f = t;
      for (const e of this.SZf) {
        var i = e.ColorMap.get(t);
        if (i) {
          e.ColorMachine.SetTargetColor(i);
        }
      }
    }
  }
  async bZf() {
    const i = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(SPEED_COLOR_MPC_PATH, UE.MaterialParameterCollection, t => {
      this.yZf = t;
      i.SetResult(true);
    });
    return i.Promise;
  }
  RZf() {
    var i = ["MotorHudMainColor", "MotorHudColorA", "MotorHudColorB", "MotorHudPointerColor", "MotorHudTextColor", "MotorHudTextStrokeColor", "MotorHudTextGlowColor"];
    var e = [this.MZf, this.EZf, this.IZf, this.TZf, this.h4g, this.l4g, this._4g];
    for (let t = 0; t < i.length; t++) {
      var o = new SpeedColorObj();
      o.UpdateFunc = e[t];
      var s = CommonParamById_1.configCommonParamById.GetStringArrayConfig(i[t]);
      if (s) {
        for (let t = 0; t < 3; t++) {
          if (s[t]) {
            o.ColorMap.set(t, s[t]);
          }
        }
      }
      o.Init();
      this.SZf.push(o);
    }
  }
  mSg(t) {
    var i = ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.IsInFirstPersonMode();
    if (this.rHf !== i) {
      if (this.rHf = i) {
        this.SPe?.PlaySequencePurely("FPVIn");
      } else {
        this.SPe?.PlaySequencePurely("FPVOut");
      }
    }
    if (i) {
      if ((i = ModelManager_1.ModelManager.InputModel.GetAxisValues().get(InputEnums_1.EInputAxis.MoveRight) ?? 0) === 0) {
        this.hSg = 0;
        this.Pnr = this.cSg;
      } else {
        this.hSg = i > 0 ? -this._Sg : this._Sg;
        this.Pnr = this.uSg;
      }
    } else {
      this.hSg = 0;
      this.Pnr = this.dSg;
    }
    if (this.lSg !== this.hSg) {
      if (this.lSg < this.hSg) {
        this.lSg += this.Pnr * t;
        this.lSg = Math.min(this.lSg, this.hSg);
      } else {
        this.lSg -= this.Pnr * t;
        this.lSg = Math.max(this.lSg, this.hSg);
      }
      this.Gue.Yaw = this.lSg;
      this.aSg?.SetUIRelativeRotation(this.Gue);
    }
  }
}
exports.MotorcycleControlHudPanel = MotorcycleControlHudPanel;
//# sourceMappingURL=MotorcycleControlHudPanel.js.map