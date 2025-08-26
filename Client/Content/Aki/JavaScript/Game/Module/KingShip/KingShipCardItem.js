"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KingShipCardItem = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const SpeakerById_1 = require("../../../Core/Define/ConfigQuery/SpeakerById");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const PublicUtil_1 = require("../../Common/PublicUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer");
const MATERIAL_LAYA = -0.001;
const MATERIAL_LAYB = 0.0025;
const MATERIAL_LAYC = 0.0075;
const MATERIAL_LAYD = 0.01;
const MATERIAL_LAYG = -0.01;
const CLICK_AUDIO_EVENT = "play_ui_com_slider_tick";
class KingShipCardItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Gco = Rotator_1.Rotator.Create();
    this.vFu = Rotator_1.Rotator.Create();
    this.JSu = Vector_1.Vector.Create();
    this.ZSu = Vector_1.Vector.Create();
    this.EJu = Vector_1.Vector.Create();
    this.eUo = 1;
    this.tUo = 1;
    this.rUo = 0;
    this.eMu = 0;
    this.tMu = 0;
    this.iMu = 0;
    this.yFu = 0;
    this.rMu = undefined;
    this.Uzc = undefined;
    this.YGl = undefined;
    this.L8e = undefined;
    this.oMu = undefined;
    this.nMu = undefined;
    this.sMu = undefined;
    this.IJu = undefined;
    this.TJu = undefined;
    this.bJu = undefined;
    this.RJu = undefined;
    this.wJu = undefined;
    this.LJu = undefined;
    this.AJu = undefined;
    this.PJu = undefined;
    this.DJu = undefined;
    this.xJu = undefined;
    this.UJu = undefined;
    this.Bzc = undefined;
    this.dUo = 0;
    this.aMu = 0;
    this.RightEnd = false;
    this.LeftEnd = false;
    this.OnPostionMaxCallBack = undefined;
    this.OnClearPostionMax = undefined;
    this.ContentItem = undefined;
    this.SPe = undefined;
    this.BJu = 0;
    this.kJu = new UE.FName("OffsetX");
    this.OJu = new UE.FName("OffsetY");
    this.OnCallBackDropSequence = undefined;
    this.qJu = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UITexture], [5, UE.UITexture], [18, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UISprite], [12, UE.UIText], [13, UE.UITexture], [14, UE.UITexture], [15, UE.UITexture], [16, UE.UITexture], [20, UE.UITexture], [17, UE.UITexture], [21, UE.UITexture], [19, UE.UIItem], [22, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("ReginsCard_RotatorA");
    const s = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.CurveVector, t => {
      this.IJu = t;
      s.SetResult(undefined);
    });
    t.push(s);
    i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("ReignsCardMouseMoveCurve");
    const h = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.CurveFloat, t => {
      this.sMu = t;
      h.SetResult(undefined);
    });
    t.push(h);
    i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("ReginsCard_Offset");
    const e = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.CurveFloat, t => {
      this.TJu = t;
      e.SetResult(undefined);
    });
    t.push(e);
    i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("ReginsSelect_Alpha");
    const o = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.CurveFloat, t => {
      this.RJu = t;
      o.SetResult(undefined);
    });
    t.push(o);
    i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("ReginsSelect_OffsetA");
    const r = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.CurveFloat, t => {
      this.bJu = t;
      r.SetResult(undefined);
    });
    t.push(r);
    i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("ReginsSelect_OffsetB");
    const a = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.CurveFloat, t => {
      this.wJu = t;
      a.SetResult(undefined);
    });
    t.push(a);
    i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("ReginsCard_YAxial");
    const _ = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.CurveFloat, t => {
      this.tMu = t?.GetFloatValue(0) ?? 10;
      _.SetResult(undefined);
    });
    t.push(_);
    await Promise.all(t);
  }
  OnBeforeDestroy() {
    this.SPe?.Clear();
    this.SPe = undefined;
  }
  OnStart() {
    this.rMu = this.GetItem(19);
    this.Uzc = this.GetItem(18);
    this.rMu?.SetUIRelativeRotation(this.Gco.ToUeRotator());
    this.YGl = this.GetItem(8);
    this.L8e = this.GetItem(7);
    this.oMu = this.GetTexture(5);
    this.nMu = this.GetTexture(4);
    this.LJu = this.GetTexture(16);
    this.AJu = this.GetTexture(15);
    this.PJu = this.GetTexture(14);
    this.DJu = this.GetTexture(13);
    this.xJu = this.GetTexture(20);
    this.UJu = this.GetTexture(17);
    this.Bzc = this.GetTexture(21);
    this.GetItem(9).SetUIActive(false);
    this.ZSu.Y = this.oMu.RelativeLocation.Y;
    this.eMu = CommonParamById_1.configCommonParamById.GetFloatConfig("KingShipViewPortPercentage") ?? 0;
    this.rUo = CommonParamById_1.configCommonParamById.GetFloatConfig("KingShipSensitivityPitch") ?? 0;
    this.eUo = CommonParamById_1.configCommonParamById.GetFloatConfig("KingShipGamepadInputRate") ?? 0;
    this.tUo = CommonParamById_1.configCommonParamById.GetFloatConfig("KingShipMobileRotateInputRate") ?? 0;
    this.iMu = CommonParamById_1.configCommonParamById.GetFloatConfig("KingShipXLocationWhenPitch") ?? 0;
    this.yFu = CommonParamById_1.configCommonParamById.GetFloatConfig("KingShipCardContentTextRotateRate") ?? 0;
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.BindSequenceCloseEvent(t => {
      if (t === "DropL" || t === "DropR") {
        this.OnCallBackDropSequence?.(t === "DropR");
        this.BJu++;
        if (this.qJu) {
          this.SPe?.PlayLevelSequenceByName("FlipB");
        } else {
          this.GetItem(9).SetUIActive(false);
          this.GetItem(22).SetUIActive(false);
          this.SPe?.PlayLevelSequenceByName("Flip");
        }
        this.ClearCardItemRotation();
      }
      if (t === "ResetL" || t === "ResetR") {
        this.ClearCardItemRotation();
      }
      this.BJu--;
    });
  }
  RefreshCardItemByShowTalk(t, i) {
    this.qJu = false;
    if (i) {
      this.GJu(i);
    }
    i = t ? SpeakerById_1.configSpeakerById.GetConfig(t) : undefined;
    if (i) {
      t = PublicUtil_1.PublicUtil.GetConfigTextByTable(0, i.Id) ?? "";
      this.GetText(2)?.SetText(t);
      if (!i.Title) {
        this.GetText(3)?.SetUIActive(false);
      }
      this.GetText(3)?.SetUIActive(true);
      t = PublicUtil_1.PublicUtil.GetConfigTextByTable(1, i.Id) ?? "";
      this.GetText(3)?.SetText(t);
      this.GetText(0).SetUIActive(true);
      this.GetText(1).SetUIActive(true);
    }
  }
  RefreshCardItemByCallCard(t) {
    this.qJu = false;
    this.GetItem(9).SetUIActive(true);
    this.GetText(0).SetUIActive(false);
    this.GetText(1).SetUIActive(false);
    this.GetText(3)?.SetUIActive(false);
    this.GetItem(22).SetUIActive(false);
    var i = ConfigManager_1.ConfigManager.KingShipConfig.GetReignsCallCard(t);
    if (i) {
      if (i.CardBackground) {
        this.GJu(i.CardBackground);
      }
      this.GetText(12).SetUIActive(false);
      i = PublicUtil_1.PublicUtil.GetConfigTextByKey("ReignsCard_" + t + "_CardTitle");
      this.GetText(2).SetText(i);
      this.GetSprite(11).SetUIActive(false);
    }
  }
  RefreshCardItemByBuffCard(t) {
    this.qJu = true;
    this.GetItem(9).SetUIActive(true);
    this.GetText(0).SetUIActive(false);
    this.GetText(1).SetUIActive(false);
    this.GetText(3)?.SetUIActive(false);
    this.GetText(12).SetUIActive(true);
    this.GetItem(22).SetUIActive(true);
    var i;
    var s = ConfigManager_1.ConfigManager.KingShipConfig.GetReignsCallCard(t);
    if (s && (s.CardBackground && this.GJu(s.CardBackground), i = PublicUtil_1.PublicUtil.GetConfigTextByKey("ReignsCard_" + t + "_CardDesc"), this.GetText(12).SetText(i), i = PublicUtil_1.PublicUtil.GetConfigTextByKey("ReignsCard_" + t + "_CardTitle"), this.GetText(2).SetText(i), this.GetSprite(11).SetUIActive(!StringUtils_1.StringUtils.IsEmpty(s.CardIcon)), s.CardIcon)) {
      this.SetSpriteByPath(s.CardIcon, this.GetSprite(11), false);
    }
  }
  GJu(t) {
    this.LJu?.SetUIActive(false);
    this.AJu?.SetUIActive(false);
    this.PJu?.SetUIActive(false);
    this.DJu?.SetUIActive(false);
    this.xJu?.SetUIActive(false);
    this.UJu?.SetUIActive(false);
    this.ptd(t).finally(() => {
      this.LJu?.SetUIActive(true);
      this.AJu?.SetUIActive(true);
      this.PJu?.SetUIActive(true);
      this.DJu?.SetUIActive(true);
      this.xJu?.SetUIActive(true);
      this.UJu?.SetUIActive(true);
    });
  }
  async ptd(t) {
    var i = [];
    i.push(this.SetTextureAsync(t, this.LJu));
    var s = t.replace("_A", "_B").replace("_A", "_B");
    i.push(this.SetTextureAsync(s, this.AJu));
    var s = t.replace("_A", "_C").replace("_A", "_C");
    i.push(this.SetTextureAsync(s, this.PJu));
    var s = t.replace("_A", "_D").replace("_A", "_D");
    i.push(this.SetTextureAsync(s, this.DJu));
    var s = t.replace("_A", "_E").replace("_A", "_E");
    i.push(this.SetTextureAsync(s, this.xJu));
    var s = t.replace("_A", "_F").replace("_A", "_F");
    i.push(this.SetTextureAsync(s, this.UJu));
    await Promise.all(i);
  }
  SetCardItemInputPitch(t) {
    this.dUo = t;
  }
  SetCardItemPitchByPercentage(t) {
    t = MathUtils_1.MathUtils.Clamp(t, -this.eMu, this.eMu);
    this.aMu = -(t / this.eMu) * this.tMu;
  }
  ClearCardItemRotation() {
    this.Gco.Pitch = 0;
    this.Gco.Yaw = 0;
    this.Gco.Roll = 0;
    this.dUo = 0;
    this.aMu = 0;
    this.RightEnd = false;
    this.LeftEnd = false;
    this.OnClearPostionMax?.();
    this.cMu();
    this.dMu();
  }
  ClearTargetRotation() {
    this.aMu = 0;
  }
  Update(t) {
    if (!(this.BJu > 0) && !!this.IsShowOrShowing) {
      if (MathUtils_1.MathUtils.IsNearlyZero(this.aMu)) {
        this.TUo(t);
      } else {
        this.qPr(t);
      }
      this.LUo();
      this.cMu();
      this.dMu();
    }
  }
  TUo(t) {
    let i = this.dUo;
    this.dUo = 0;
    if (Info_1.Info.IsInGamepad()) {
      i *= this.eUo;
    } else if (Info_1.Info.IsInTouch()) {
      i *= this.tUo;
    }
    i = i * this.rUo * t;
    if (!MathUtils_1.MathUtils.IsNearlyZero(i)) {
      this.Gco.Pitch -= i;
    }
  }
  qPr(t) {
    var i;
    var s;
    var h;
    var e;
    var o;
    var r;
    if (!MathUtils_1.MathUtils.IsNearlyEqual(this.aMu, this.Gco.Pitch)) {
      i = Math.abs(this.Gco.Pitch - this.aMu);
      s = Math.abs(this.Gco.Pitch);
      h = Math.sign(this.Gco.Pitch);
      e = Math.abs(this.aMu);
      o = Math.sign(this.aMu);
      r = this.sMu?.GetFloatValue(s / e) ?? 0;
      if (o >= 0) {
        if (s < e) {
          if (i <= r) {
            this.Gco.Pitch = this.aMu;
          } else {
            this.Gco.Pitch += r;
          }
        } else if (i <= r) {
          this.Gco.Pitch = this.aMu;
        } else {
          this.Gco.Pitch -= (h >= 0 ? 1 : -1) * r;
        }
      } else if (s < e) {
        if (i <= r) {
          this.Gco.Pitch = this.aMu;
        } else {
          this.Gco.Pitch -= r;
        }
      } else if (i <= r) {
        this.Gco.Pitch = this.aMu;
      } else {
        this.Gco.Pitch += (h >= 0 ? -1 : 1) * r;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Test", 5, "targetSign < 0-计算赋值: " + this.Gco.Pitch);
        }
      }
      this.aMu = 0;
    }
  }
  LUo() {
    var t = this.Gco.Pitch;
    var t = (t %= 360) > 180 ? t - 360 : t;
    t = MathUtils_1.MathUtils.Clamp(t, -this.tMu, this.tMu);
    this.Gco.Pitch = t;
  }
  cMu() {
    var t = this.Gco.Pitch / this.tMu;
    var i = this.IJu?.GetVectorValue(t);
    this.Gco.Roll = i?.X ?? 0;
    this.Gco.Yaw = i?.Z ?? 0;
    this.JSu.X = (this.TJu?.GetFloatValue(t) ?? 0) * this.iMu;
    this.Uzc?.SetUIRelativeLocation(this.JSu.ToUeVectorOld());
    this.rMu?.SetUIRelativeRotation(this.Gco.ToUeRotator());
    this.vFu.Pitch = this.Gco.Pitch * this.yFu;
    this.ContentItem?.SetUIRelativeRotation(this.vFu.ToUeRotator());
    this.LJu?.SetCustomMaterialScalarParameter(this.kJu, this.Gco.Pitch * MATERIAL_LAYA);
    this.LJu?.SetCustomMaterialScalarParameter(this.OJu, this.Gco.Roll * MATERIAL_LAYA);
    this.AJu?.SetCustomMaterialScalarParameter(this.kJu, this.Gco.Pitch * MATERIAL_LAYB);
    this.AJu?.SetCustomMaterialScalarParameter(this.OJu, this.Gco.Roll * MATERIAL_LAYB);
    this.PJu?.SetCustomMaterialScalarParameter(this.kJu, this.Gco.Pitch * MATERIAL_LAYC);
    this.PJu?.SetCustomMaterialScalarParameter(this.OJu, this.Gco.Roll * MATERIAL_LAYC);
    this.DJu?.SetCustomMaterialScalarParameter(this.kJu, this.Gco.Pitch * MATERIAL_LAYD);
    this.DJu?.SetCustomMaterialScalarParameter(this.OJu, this.Gco.Roll * MATERIAL_LAYD);
    this.Bzc?.SetCustomMaterialScalarParameter(this.kJu, this.Gco.Pitch * MATERIAL_LAYG);
    this.Bzc?.SetCustomMaterialScalarParameter(this.OJu, this.Gco.Roll * MATERIAL_LAYG);
  }
  dMu() {
    var t;
    var i = this.Gco.Pitch;
    if (Math.abs(i) < 1) {
      this.YGl?.SetUIActive(false);
      this.L8e?.SetUIActive(false);
    } else if (i > 0) {
      this.YGl?.SetUIActive(false);
      this.L8e?.SetUIActive(true);
      t = i / this.tMu;
      this.ZSu.X = this.wJu?.GetFloatValue(t) ?? 0;
      this.nMu?.SetUIRelativeLocation(this.ZSu.ToUeVectorOld());
      this.L8e?.SetAlpha(this.RJu?.GetFloatValue(t) ?? 0);
      this.EJu.X = this.bJu?.GetFloatValue(t) ?? 0;
      this.L8e?.SetUIRelativeLocation(this.EJu.ToUeVectorOld());
      if (i >= this.tMu) {
        if (!this.LeftEnd) {
          this.OnPostionMaxCallBack?.(false);
          AudioSystem_1.AudioSystem.PostEvent(CLICK_AUDIO_EVENT);
        }
        this.LeftEnd = true;
        this.RightEnd = false;
      } else {
        this.RightEnd = false;
        this.LeftEnd = false;
        this.OnClearPostionMax?.();
      }
    } else {
      this.YGl?.SetUIActive(true);
      this.L8e?.SetUIActive(false);
      t = i / this.tMu;
      this.ZSu.X = this.wJu?.GetFloatValue(t) ?? 0;
      this.oMu?.SetUIRelativeLocation(this.ZSu.ToUeVectorOld());
      this.YGl?.SetAlpha(this.RJu?.GetFloatValue(t) ?? 0);
      this.EJu.X = this.bJu?.GetFloatValue(t) ?? 0;
      this.YGl?.SetUIRelativeLocation(this.EJu.ToUeVectorOld());
      if (i <= -this.tMu) {
        if (!this.RightEnd) {
          this.OnPostionMaxCallBack?.(true);
          AudioSystem_1.AudioSystem.PostEvent(CLICK_AUDIO_EVENT);
        }
        this.RightEnd = true;
        this.LeftEnd = false;
      } else {
        this.RightEnd = false;
        this.LeftEnd = false;
        this.OnClearPostionMax?.();
      }
    }
  }
  SetLeftAndRight(t, i) {
    t = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(t);
    this.GetText(0).SetText(t ?? "");
    t = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(i);
    this.GetText(1).SetText(t ?? "");
  }
  PlaySequenceByName(t) {
    this.SPe?.StopCurrentSequence(true, true);
    this.SPe?.PlayLevelSequenceByName(t);
    this.BJu++;
    this.LeftEnd = false;
    this.RightEnd = false;
  }
  PlayReSetSequence() {
    if (this.YGl?.IsUIActiveSelf()) {
      this.BJu++;
      this.SPe?.StopCurrentSequence(true, true);
      this.SPe?.PlayLevelSequenceByName("ResetR");
    } else if (this.L8e?.IsUIActiveSelf()) {
      this.BJu++;
      this.SPe?.StopCurrentSequence(true, true);
      this.SPe?.PlayLevelSequenceByName("ResetL");
    }
  }
}
exports.KingShipCardItem = KingShipCardItem;
//# sourceMappingURL=KingShipCardItem.js.map