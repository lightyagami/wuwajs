"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiMiSiHudUnit = exports.AiMiSiHudData = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const Global_1 = require("../../../Global");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const InputMultiKeyItem_1 = require("../../Common/InputKey/InputMultiKeyItem");
const HudUnitBase_1 = require("../HudUnitBase");
const AiMiSiHudUnitRotateMachine_1 = require("./AiMiSiHudUnitRotateMachine");
class AiMiSiHudData {
  constructor() {
    this.IsMechanism = false;
    this.IsJoint = false;
    this.IsSpecialJoint = false;
    this.IsSprint = false;
    this.InFight = false;
    this.IsModeOne = false;
    this.InAir = false;
    this.IsUltraBuff = false;
    this.IsForeground = false;
  }
}
exports.AiMiSiHudData = AiMiSiHudData;
const CLOSE_ANIM_TIME = 100;
class AiMiSiHudUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments);
    this.Lti = false;
    this.Pe = undefined;
    this.YDg = false;
    this.JDg = false;
    this.zDg = false;
    this.ZDg = false;
    this.eUg = false;
    this.tUg = false;
    this.iUg = false;
    this.rUg = false;
    this.bGg = false;
    this.RGg = false;
    this._at = undefined;
    this.uat = undefined;
    this.vHg = undefined;
    this.yHg = undefined;
    this.SHg = 0;
    this.MHg = false;
    this.EHg = false;
    this.IHg = undefined;
    this.Icc = undefined;
    this.A4c = undefined;
    this.sUg = undefined;
    this.lUg = undefined;
    this.LGg = undefined;
    this.wGg = undefined;
    this.PGg = undefined;
    this.AGg = undefined;
    this.JHg = [];
    this.dUg = 10;
    this.mUg = 30;
    this.fUg = -40;
    this.gUg = -20;
    this.DGg = 90;
    this.UGg = 100;
    this.zHg = 15;
    this.ZHg = 15;
    this.CUg = 0;
    this.pUg = 0;
    this.vUg = 0;
    this.ejg = 0;
    this.tjg = false;
    this.xGg = false;
    this.BGg = 0;
    this.THg = false;
    this.dJs = [];
    this.ijg = new AiMiSiHudUnitRotateMachine_1.AiMiSiHudUnitRotateMachine();
    this.rjg = Rotator_1.Rotator.Create(0, 0, 0);
    this.ojg = false;
    this.njg = false;
    this.Ijg = 0;
    this.Tjg = 0;
    this.kGg = FNameUtil_1.FNameUtil.GetDynamicFName("SliderX");
    this.qGg = FNameUtil_1.FNameUtil.GetDynamicFName("SliderY");
    this.dat = () => {
      this._at = undefined;
      this.uat.SetResult();
      this.uat = undefined;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIArtText], [12, UE.UIArtText], [13, UE.UIArtText], [14, UE.UIArtText], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UIItem], [23, UE.UIItem], [24, UE.UIItem], [25, UE.UIItem], [26, UE.UIItem], [27, UE.UIItem], [30, UE.UIItem], [31, UE.UIItem], [32, UE.UIItem], [33, UE.UIItem], [34, UE.UIItem], [35, UE.UIItem], [36, UE.UIItem], [37, UE.UIItem], [38, UE.UITexture], [39, UE.UITexture], [40, UE.UITexture], [41, UE.UITexture], [42, UE.UIItem], [43, UE.UIItem], [44, UE.UIItem], [45, UE.UIItem], [46, UE.UIItem], [47, UE.UIItem], [48, UE.UIItem], [51, UE.UIItem], [52, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var i = this.GetItem(45);
    var t = this.GetItem(46);
    if (i && t) {
      if (!Info_1.Info.IsInTouch() && !this.THg) {
        this.THg = true;
        await this.DNf(i, InputMappingsDefine_1.actionMappings.跳跃);
        await this.DNf(t, InputMappingsDefine_1.actionMappings.下降);
      }
    }
  }
  OnStart() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "[AiMiSiHud]OnStart");
    }
    this.InitTweenAnim(17);
    this.InitTweenAnim(18);
    this.InitTweenAnim(19);
    this.InitTweenAnim(20);
    this.InitTweenAnim(21);
    this.InitTweenAnim(22);
    this.InitTweenAnim(23);
    this.InitTweenAnim(24);
    this.InitTweenAnim(25);
    this.InitTweenAnim(26);
    this.InitTweenAnim(27);
    this.InitTweenAnim(47);
    this.InitTweenAnim(48);
    this.InitTweenAnim(30);
    this.InitTweenAnim(31);
    this.InitTweenAnim(32);
    this.InitTweenAnim(33);
    this.InitTweenAnim(34);
    this.InitTweenAnim(35);
    this.InitTweenAnim(36);
    this.InitTweenAnim(37);
    this.InitTweenAnim(43);
    this.InitTweenAnim(44);
    this.vHg = this.GetItem(0);
    this.yHg = this.GetSprite(1);
    this.Icc = this.GetItem(2);
    this.A4c = this.GetItem(3);
    this.sUg = this.GetItem(4);
    this.lUg = this.GetItem(7);
    this.LGg = this.GetTexture(38);
    this.wGg = this.GetTexture(39);
    this.PGg = this.GetTexture(40);
    this.AGg = this.GetTexture(41);
    this.JHg.push(this.GetItem(42));
    this.JHg.push(this.GetItem(51));
    this.JHg.push(this.GetItem(52));
    this.dUg = CommonParamById_1.configCommonParamById.GetFloatConfig("AimisiHudPitchUpMin");
    this.mUg = CommonParamById_1.configCommonParamById.GetFloatConfig("AimisiHudPitchUpMax");
    this.fUg = CommonParamById_1.configCommonParamById.GetFloatConfig("AimisiHudPitchDownMin");
    this.gUg = CommonParamById_1.configCommonParamById.GetFloatConfig("AimisiHudPitchDownMax");
    this.DGg = CommonParamById_1.configCommonParamById.GetFloatConfig("AimisiHudHorizonScaleSpeed");
    this.UGg = CommonParamById_1.configCommonParamById.GetFloatConfig("AimisiHudAltimeterScaleSpeed");
    this.zHg = CommonParamById_1.configCommonParamById.GetFloatConfig("AimisiHudMaxPitch");
    this.ZHg = CommonParamById_1.configCommonParamById.GetFloatConfig("AimisiHudMaxRoll");
    this.ijg.Speed = CommonParamById_1.configCommonParamById.GetFloatConfig("AimisiHudRollAnimSpeed");
    this.ijg.Countdown = CommonParamById_1.configCommonParamById.GetFloatConfig("AimisiHudRollAnimTime");
    this.njg = CommonParamById_1.configCommonParamById.GetBoolConfig("AimisiHudAnimInFight");
    this.MHg = false;
    this.vHg.SetUIActive(false);
    this.RefreshKeyNode();
    this.RefreshRotateMachineSpeed();
  }
  async OnBeforeHideAsync() {
    this.uat = new CustomPromise_1.CustomPromise();
    this._at = TimerSystem_1.TimerSystem.Delay(this.dat, CLOSE_ANIM_TIME);
    await this.uat.Promise;
  }
  OnBeforeDestroy() {
    this.StopTweenAnim(32);
    this.StopTweenAnim(33);
    super.OnBeforeDestroy();
    if (this._at) {
      TimerSystem_1.TimerSystem.Remove(this._at);
      this._at = undefined;
      this.uat.SetResult();
      this.uat = undefined;
    }
    this.RHg();
    for (const i of this.dJs) {
      i.Destroy();
    }
    this.dJs.length = 0;
  }
  RefreshKeyNode() {
    var i = this.GetItem(45);
    var t = this.GetItem(46);
    if (i && t) {
      if (Info_1.Info.IsInTouch()) {
        i.SetUIActive(false);
        t.SetUIActive(false);
      } else {
        i.SetUIActive(true);
        t.SetUIActive(true);
        if (!this.THg) {
          this.THg = true;
          this.DNf(i, InputMappingsDefine_1.actionMappings.跳跃);
          this.DNf(t, InputMappingsDefine_1.actionMappings.下降);
        }
      }
    }
  }
  async DNf(i, t) {
    var s = new InputMultiKeyItem_1.InputMultiKeyItem(true);
    await s.CreateThenShowByResourceIdAsync("UiItem_HotKeyCombine", i);
    if (this.IsDestroyOrDestroying) {
      s.Destroy();
    } else {
      this.dJs.push(s);
      s.RefreshByActionOrAxis({
        ActionOrAxisName: t
      });
    }
  }
  RefreshRotateMachineSpeed() {
    if (Info_1.Info.IsInTouch()) {
      this.ijg.YawSpeedMin = CommonParamById_1.configCommonParamById.GetFloatConfig("AimisiHudCameraRotateMinSpeedMobile");
    } else {
      this.ijg.YawSpeedMin = CommonParamById_1.configCommonParamById.GetFloatConfig("AimisiHudCameraRotateMinSpeed");
    }
  }
  InitData(i) {
    this.Pe = i;
    this.pO(true);
  }
  SetTargetVisible(i) {
    this.Lti = i;
    this.SetVisible(i);
  }
  SetActive(i) {
    if (!i || !!this.Lti) {
      super.SetActive(i);
    }
  }
  MarkDataDirty() {
    this.YDg = true;
  }
  SetEnduranceProgress(i) {
    this.SHg = i;
    this.yHg?.SetFillAmount(i);
    this.bHg();
  }
  bHg() {
    if (this.JDg) {
      if (this.SHg < 1) {
        this.LHg(true);
      } else {
        this.LHg(false);
      }
    } else {
      this.LHg(false, true);
    }
  }
  LHg(i, t = false) {
    if (this.MHg !== i || this.EHg !== i) {
      if (this.EHg = i) {
        this.RHg();
        if (!this.MHg) {
          this.MHg = true;
          this.StopTweenAnim(44);
          this.PlayTweenAnim(43);
        }
      } else if (t) {
        this.RHg();
        if (this.MHg) {
          this.MHg = false;
          this.StopTweenAnim(43);
          this.PlayTweenAnim(44);
        }
      } else {
        this.IHg ||= TimerSystem_1.TimerSystem.Delay(i => {
          this.IHg = undefined;
          if (!this.EHg) {
            this.MHg = false;
            this.PlayTweenAnim(44);
          }
        }, 1000);
      }
    }
  }
  RHg() {
    if (this.IHg) {
      if (TimerSystem_1.TimerSystem.Has(this.IHg)) {
        TimerSystem_1.TimerSystem.Remove(this.IHg);
      }
      this.IHg = undefined;
    }
  }
  Tick(i) {
    super.Tick(i);
    if ((this.IsShowOrShowing || this.IsHideOrHiding) && this.Pe && (this.YDg && (this.YDg = false, this.pO(false)), this.Pe.IsMechanism && (this.RUg(), this.rUg) && (this.cKu(), this.LUg()), this.sjg(), this.ajg(i), this.OGg(), this.GGg(), this.ojg)) {
      this.ojg = false;
      var t = this.rjg.ToUeRotator();
      for (const s of this.JHg) {
        s.SetUIRelativeRotation(t);
      }
    }
  }
  pO(i = false) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Temp", 17, "[AiMiSiHud]刷新", ["isInit", i]);
    }
    var t = this.Pe.IsJoint || this.Pe.IsSpecialJoint;
    var s = this.Pe.IsMechanism;
    var h = t;
    var e = !t && this.Pe.IsMechanism;
    var t = t || this.Pe.IsMechanism;
    var r = this.Pe.IsSpecialJoint;
    var o = this.Pe.IsSprint;
    var a = !this.Pe.InFight && !this.Pe.IsUltraBuff;
    var n = s && this.Pe.InAir && this.Pe.IsForeground;
    var m = this.Pe.IsUltraBuff;
    if (i) {
      this.JDg = s;
      this.zDg = h;
      this.ZDg = e;
      this.eUg = t;
      this.tUg = r;
      this.iUg = o;
      this.rUg = a;
      this.bGg = n;
      this.RGg = m;
      this.yUg(i);
      this.SUg(i);
      this.MUg();
      this.EUg();
      this.IUg();
      this.TUg(i);
      this.bUg(i);
      this.RefreshModeIcon();
      this.RefreshInAir(i);
      this.RefreshUltraBuff(i);
    } else {
      if (this.JDg !== s) {
        this.JDg = s;
        this.yUg();
      }
      if (this.zDg !== h) {
        this.zDg = h;
        this.SUg();
      }
      if (this.ZDg !== e) {
        this.ZDg = e;
        this.MUg();
      }
      if (this.eUg !== t) {
        this.eUg = t;
        this.EUg();
      }
      if (this.tUg !== r) {
        this.tUg = r;
        this.IUg();
      }
      if (this.iUg !== o) {
        this.iUg = o;
        this.TUg();
      }
      if (this.rUg !== a) {
        this.rUg = a;
        this.bUg();
      }
      if (this.bGg !== n) {
        this.bGg = n;
        this.RefreshInAir();
      }
      if (this.RGg !== m) {
        this.RGg = m;
        this.RefreshUltraBuff();
      }
    }
  }
  yUg(i = false) {
    if (this.JDg) {
      this.StopTweenAnim(25);
      this.PlayTweenAnim(22);
    } else if (i) {
      this.PlayTweenAnim(17);
    } else {
      this.StopTweenAnim(22);
      this.PlayTweenAnim(25);
    }
    this.bHg();
  }
  SUg(i = false) {
    if (this.zDg) {
      this.StopTweenAnim(21);
      this.PlayTweenAnim(19);
    } else if (!i) {
      this.StopTweenAnim(19);
      this.PlayTweenAnim(21);
    }
  }
  MUg() {
    this.sUg.SetUIActive(this.ZDg);
    this.lUg.SetUIActive(this.ZDg);
  }
  EUg() {}
  IUg() {
    if (this.tUg) {
      this.PlayTweenAnim(20);
    }
  }
  TUg(i = false) {
    if (this.iUg) {
      this.StopTweenAnim(48);
      this.PlayTweenAnim(47);
    } else if (!i) {
      this.StopTweenAnim(47);
      this.PlayTweenAnim(48);
    }
  }
  bUg(i = false) {
    if (this.rUg) {
      this.StopTweenAnim(24);
      this.PlayTweenAnim(23);
    } else if (!i) {
      this.StopTweenAnim(23);
      this.PlayTweenAnim(24);
    }
    this.Icc.SetUIActive(this.rUg);
    this.A4c.SetUIActive(this.rUg);
  }
  RUg() {
    var i;
    var t;
    if (this.Pe.InFight && !this.njg) {
      this.hjg(0);
    } else if ((i = ControllerHolder_1.ControllerHolder.CameraController.CameraRotator.Pitch) > this.dUg) {
      t = MathUtils_1.MathUtils.RangeClamp(i, this.dUg, this.mUg, 0, -this.ZHg);
      this.hjg(t);
    } else if (i < this.gUg) {
      t = MathUtils_1.MathUtils.RangeClamp(i, this.fUg, this.gUg, this.ZHg, 0);
      this.hjg(t);
    } else {
      this.hjg(0);
    }
  }
  hjg(i) {
    if (i === 0 && this.rjg.Roll !== 0) {
      this.rjg.Roll = 0;
      this.ojg = true;
    } else if (Math.abs(this.rjg.Roll - i) > 0.01) {
      this.rjg.Roll = i;
      this.ojg = true;
    }
  }
  ajg(i) {
    let t = 0;
    t = this.Pe.InFight && !this.njg ? 0 : ControllerHolder_1.ControllerHolder.CameraController.CameraRotator.Yaw;
    if (this.ijg.Update(i, t) && (i = this.ijg.CurValue * this.zHg, this.rjg.Pitch !== i)) {
      this.rjg.Pitch = i;
      this.ojg = true;
    }
  }
  cKu() {
    var i;
    var t = Global_1.Global.BaseCharacter?.CharacterActorComponent?.ActorLocationProxy;
    if (t && ((i = Math.round(t.X)) !== this.CUg && (this.CUg = i, this.GetArtText(11).SetText(i.toFixed(0))), (i = Math.round(t.Y)) !== this.pUg && (this.pUg = i, this.GetArtText(12).SetText(i.toFixed(0))), (i = Math.round(t.Z)) !== this.vUg)) {
      this.vUg = i;
      this.GetArtText(13).SetText(i.toFixed(0));
    }
  }
  LUg() {
    var i = new Date();
    var i = "" + i.getHours().toString().padStart(2, "0") + i.getMinutes().toString().padStart(2, "0") + "." + i.getSeconds().toString().padStart(2, "0");
    this.GetArtText(14).SetText(i);
  }
  sjg() {
    var t = Global_1.Global.BaseCharacter?.CharacterActorComponent?.ActorLocationProxy;
    if (t) {
      if (this.tjg) {
        var s = t.Z - this.ejg;
        this.ejg = t.Z;
        let i = 0;
        if (s > 1) {
          i = 1;
        } else if (s < -1) {
          i = -1;
        }
        if (this.BGg !== i) {
          if ((this.BGg = i) === 1) {
            this.StopTweenAnim(33);
            this.PlayTweenAnim(32);
          } else if (i === -1) {
            this.StopTweenAnim(32);
            this.PlayTweenAnim(33);
          } else {
            this.StopTweenAnim(32);
            this.StopTweenAnim(33);
            this.PlayTweenAnim(31);
          }
        }
      } else {
        this.ejg = t.Z;
        this.tjg = true;
      }
    }
  }
  RefreshModeIcon() {
    if (this.Pe) {
      if (this.Pe.IsModeOne) {
        this.GetItem(15).SetAlpha(1);
        this.GetItem(16).SetAlpha(0.168628);
      } else {
        this.GetItem(15).SetAlpha(0.168628);
        this.GetItem(16).SetAlpha(1);
      }
    }
  }
  RefreshInAir(i = false) {
    if (this.bGg) {
      this.StopTweenAnim(34);
      this.PlayTweenAnim(30);
    } else if (!i) {
      this.StopTweenAnim(30);
      this.PlayTweenAnim(34);
    }
  }
  RefreshUltraBuff(i = false) {
    if (this.RGg) {
      this.StopTweenAnim(27);
      this.PlayTweenAnim(26);
    } else if (!i) {
      this.StopTweenAnim(26);
      this.PlayTweenAnim(27);
    }
  }
  OnHurt() {
    this.PlayTweenAnim(35);
  }
  SetHpPercent(i) {
    i = i <= 0.2;
    if (this.xGg !== i) {
      if (this.xGg = i) {
        this.StopTweenAnim(37);
        this.PlayTweenAnim(36);
      } else {
        this.StopTweenAnim(36);
        this.PlayTweenAnim(37);
      }
    }
  }
  OGg() {
    var i;
    if (this.eUg) {
      i = ControllerHolder_1.ControllerHolder.CameraController.CameraRotator.Yaw % this.DGg / this.DGg;
      if (!(Math.abs(this.Ijg - i) < 0.001)) {
        this.Ijg = i;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 17, "[AiMiSiHud]NameSliderX", ["", i]);
        }
        this.wGg.SetCustomMaterialScalarParameter(this.kGg, i);
        this.PGg.SetCustomMaterialScalarParameter(this.kGg, -i);
        this.AGg.SetCustomMaterialScalarParameter(this.kGg, i);
      }
    }
  }
  GGg() {
    var i = this.vUg % this.UGg / this.UGg;
    if (!(Math.abs(this.Tjg - i) < 0.001)) {
      this.Tjg = i;
      this.LGg.SetCustomMaterialScalarParameter(this.qGg, i);
    }
  }
  PlayTweenAnim(i) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "[AiMiSiHud]PlayTweenAnim", ["", i]);
    }
    super.PlayTweenAnim(i);
  }
  StopTweenAnim(i) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "[AiMiSiHud]StopTweenAnim", ["", i]);
    }
    super.StopTweenAnim(i);
  }
}
exports.AiMiSiHudUnit = AiMiSiHudUnit;
//# sourceMappingURL=AiMiSiHudUnit.js.map