"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KingShipCardItem = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Info_1 = require("../../../Core/Common/Info");
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
const CLICK_AUDIO_EVENT = "play_ui_com_slider_tick";
class KingShipCardItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Gco = Rotator_1.Rotator.Create();
    this.A2u = Rotator_1.Rotator.Create();
    this.zSu = Vector_1.Vector.Create();
    this.JSu = Vector_1.Vector.Create();
    this.yWc = Vector_1.Vector.Create();
    this.eUo = 1;
    this.tUo = 1;
    this.rUo = 0;
    this.ZSu = 0;
    this.eMu = 0;
    this.tMu = 0;
    this.P2u = 0;
    this.iMu = undefined;
    this.YGl = undefined;
    this.L8e = undefined;
    this.rMu = undefined;
    this.oMu = undefined;
    this.nMu = undefined;
    this.hWc = undefined;
    this.lWc = undefined;
    this.SWc = undefined;
    this.MWc = undefined;
    this.EWc = undefined;
    this._Wc = undefined;
    this.cWc = undefined;
    this.uWc = undefined;
    this.wWc = undefined;
    this.aQc = undefined;
    this.hQc = undefined;
    this.dUo = 0;
    this.sMu = 0;
    this.RightEnd = false;
    this.LeftEnd = false;
    this.OnPostionMaxCallBack = undefined;
    this.OnClearPostionMax = undefined;
    this.ContentItem = undefined;
    this.SPe = undefined;
    this.mWc = 0;
    this.fWc = new UE.FName("OffsetX");
    this.gWc = new UE.FName("OffsetY");
    this.OnCallBackDropSequence = undefined;
    this.ZWc = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UITexture], [5, UE.UITexture], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UISprite], [12, UE.UIText], [13, UE.UITexture], [14, UE.UITexture], [15, UE.UITexture], [16, UE.UITexture], [20, UE.UITexture], [17, UE.UITexture], [18, UE.UIItem], [22, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("ReginsCard_RotatorA");
    const s = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.CurveVector, t => {
      this.hWc = t;
      s.SetResult(undefined);
    });
    t.push(s);
    i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("ReignsCardMouseMoveCurve");
    const h = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.CurveFloat, t => {
      this.nMu = t;
      h.SetResult(undefined);
    });
    t.push(h);
    i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("ReginsCard_Offset");
    const e = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.CurveFloat, t => {
      this.lWc = t;
      e.SetResult(undefined);
    });
    t.push(e);
    i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("ReginsSelect_Alpha");
    const o = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.CurveFloat, t => {
      this.MWc = t;
      o.SetResult(undefined);
    });
    t.push(o);
    i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("ReginsSelect_OffsetA");
    const r = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.CurveFloat, t => {
      this.SWc = t;
      r.SetResult(undefined);
    });
    t.push(r);
    i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("ReginsSelect_OffsetB");
    const a = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.CurveFloat, t => {
      this.EWc = t;
      a.SetResult(undefined);
    });
    t.push(a);
    i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("ReginsCard_YAxial");
    const _ = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.CurveFloat, t => {
      this.eMu = t?.GetFloatValue(0) ?? 10;
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
    this.iMu = this.GetItem(18);
    this.iMu?.SetUIRelativeRotation(this.Gco.ToUeRotator());
    this.YGl = this.GetItem(8);
    this.L8e = this.GetItem(7);
    this.rMu = this.GetTexture(5);
    this.oMu = this.GetTexture(4);
    this._Wc = this.GetTexture(16);
    this.cWc = this.GetTexture(15);
    this.uWc = this.GetTexture(14);
    this.wWc = this.GetTexture(13);
    this.aQc = this.GetTexture(20);
    this.hQc = this.GetTexture(17);
    this.GetItem(9).SetUIActive(false);
    this.JSu.Y = this.rMu.RelativeLocation.Y;
    this.ZSu = CommonParamById_1.configCommonParamById.GetFloatConfig("KingShipViewPortPercentage") ?? 0;
    this.rUo = CommonParamById_1.configCommonParamById.GetFloatConfig("KingShipSensitivityPitch") ?? 0;
    this.eUo = CommonParamById_1.configCommonParamById.GetFloatConfig("KingShipGamepadInputRate") ?? 0;
    this.tUo = CommonParamById_1.configCommonParamById.GetFloatConfig("KingShipMobileRotateInputRate") ?? 0;
    this.tMu = CommonParamById_1.configCommonParamById.GetFloatConfig("KingShipXLocationWhenPitch") ?? 0;
    this.P2u = CommonParamById_1.configCommonParamById.GetFloatConfig("KingShipCardContentTextRotateRate") ?? 0;
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.BindSequenceCloseEvent(t => {
      if (t === "DropL" || t === "DropR") {
        this.mWc++;
        if (this.ZWc) {
          this.SPe?.PlayLevelSequenceByName("FlipB");
        } else {
          this.SPe?.PlayLevelSequenceByName("Flip");
        }
        this.OnCallBackDropSequence?.(t === "DropR");
        this.ClearCardItemRotation();
      }
      if (t === "ResetL" || t === "ResetR") {
        this.ClearCardItemRotation();
      }
      this.mWc--;
    });
  }
  RefreshCardItemByShowTalk(t, i) {
    this.ZWc = false;
    if (i) {
      this.lQc(i);
    }
    this.GetItem(9).SetUIActive(false);
    this.GetItem(22).SetUIActive(false);
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
    this.ZWc = false;
    this.GetItem(9).SetUIActive(true);
    this.GetText(0).SetUIActive(false);
    this.GetText(1).SetUIActive(false);
    this.GetText(3)?.SetUIActive(false);
    this.GetItem(22).SetUIActive(false);
    var i = ConfigManager_1.ConfigManager.KingShipConfig.GetReignsCallCard(t);
    if (i) {
      if (i.CardBackground) {
        this.lQc(i.CardBackground);
      }
      this.GetText(12).SetUIActive(false);
      i = PublicUtil_1.PublicUtil.GetConfigTextByKey("ReignsCard_" + t + "_CardTitle");
      this.GetText(2).SetText(i);
      this.GetSprite(11).SetUIActive(false);
    }
  }
  RefreshCardItemByBuffCard(t) {
    this.ZWc = true;
    this.GetItem(9).SetUIActive(true);
    this.GetText(0).SetUIActive(false);
    this.GetText(1).SetUIActive(false);
    this.GetText(3)?.SetUIActive(false);
    this.GetText(12).SetUIActive(true);
    this.GetItem(22).SetUIActive(true);
    var i;
    var s = ConfigManager_1.ConfigManager.KingShipConfig.GetReignsCallCard(t);
    if (s && (s.CardBackground && this.lQc(s.CardBackground), i = PublicUtil_1.PublicUtil.GetConfigTextByKey("ReignsCard_" + t + "_CardDesc"), this.GetText(12).SetText(i), i = PublicUtil_1.PublicUtil.GetConfigTextByKey("ReignsCard_" + t + "_CardTitle"), this.GetText(2).SetText(i), this.GetSprite(11).SetUIActive(!StringUtils_1.StringUtils.IsEmpty(s.CardIcon)), s.CardIcon)) {
      this.SetSpriteByPath(s.CardIcon, this.GetSprite(11), false);
    }
  }
  lQc(t) {
    this.SetTextureShowUntilLoaded(t, this._Wc);
    var i = t.replace("_A", "_B").replace("_A", "_B");
    this.SetTextureShowUntilLoaded(i, this.cWc);
    var i = t.replace("_A", "_C").replace("_A", "_C");
    this.SetTextureShowUntilLoaded(i, this.uWc);
    var i = t.replace("_A", "_D").replace("_A", "_D");
    this.SetTextureShowUntilLoaded(i, this.wWc);
    var i = t.replace("_A", "_E").replace("_A", "_E");
    this.SetTextureShowUntilLoaded(i, this.aQc);
    var i = t.replace("_A", "_F").replace("_A", "_F");
    this.SetTextureShowUntilLoaded(i, this.hQc);
  }
  SetCardItemInputPitch(t) {
    this.dUo = t;
  }
  SetCardItemPitchByPercentage(t) {
    t = MathUtils_1.MathUtils.Clamp(t, -this.ZSu, this.ZSu);
    this.sMu = -(t / this.ZSu) * this.eMu;
  }
  ClearCardItemRotation() {
    this.Gco.Pitch = 0;
    this.Gco.Yaw = 0;
    this.Gco.Roll = 0;
    this.dUo = 0;
    this.sMu = 0;
    this.RightEnd = false;
    this.LeftEnd = false;
    this.OnClearPostionMax?.();
    this.uMu();
    this.cMu();
  }
  ClearTargetRotation() {
    this.sMu = 0;
  }
  Update(t) {
    if (!(this.mWc > 0) && !!this.IsShowOrShowing) {
      if (MathUtils_1.MathUtils.IsNearlyZero(this.sMu)) {
        this.TUo(t);
      } else {
        this.qPr(t);
      }
      this.LUo();
      this.uMu();
      this.cMu();
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
    if (!MathUtils_1.MathUtils.IsNearlyEqual(this.sMu, this.Gco.Pitch)) {
      i = Math.abs(this.Gco.Pitch);
      s = Math.sign(this.Gco.Pitch);
      h = Math.abs(this.sMu);
      e = Math.sign(this.sMu);
      o = this.nMu?.GetFloatValue(i / h) ?? 0;
      if (e >= 0) {
        if (i < h) {
          if (h - i <= o && s === e) {
            this.Gco.Pitch = this.sMu;
          } else {
            this.Gco.Pitch += o;
          }
        } else if (i - h <= o && s === e) {
          this.Gco.Pitch = this.sMu;
        } else {
          this.Gco.Pitch -= (s >= 0 ? 1 : -1) * o;
        }
      } else if (i < h) {
        if (h - i <= o && s === e) {
          this.Gco.Pitch = this.sMu;
        } else {
          this.Gco.Pitch -= o;
        }
      } else if (i - h <= o && s === e) {
        this.Gco.Pitch = this.sMu;
      } else {
        this.Gco.Pitch += (s >= 0 ? -1 : 1) * o;
      }
      this.sMu = 0;
    }
  }
  LUo() {
    var t = this.Gco.Pitch;
    var t = (t %= 360) > 180 ? t - 360 : t;
    t = MathUtils_1.MathUtils.Clamp(t, -this.eMu, this.eMu);
    this.Gco.Pitch = t;
  }
  uMu() {
    var t = this.Gco.Pitch / this.eMu;
    var i = this.hWc?.GetVectorValue(t);
    this.Gco.Roll = i?.X ?? 0;
    this.Gco.Yaw = i?.Z ?? 0;
    this.zSu.X = (this.lWc?.GetFloatValue(this.Gco.Pitch / this.eMu) ?? 0) * this.tMu;
    this.iMu?.SetUIRelativeLocation(this.zSu.ToUeVectorOld());
    this.iMu?.SetUIRelativeRotation(this.Gco.ToUeRotator());
    this.A2u.Pitch = this.Gco.Pitch * this.P2u;
    this.ContentItem?.SetUIRelativeRotation(this.A2u.ToUeRotator());
    this._Wc?.SetCustomMaterialScalarParameter(this.fWc, t * MATERIAL_LAYA);
    this._Wc?.SetCustomMaterialScalarParameter(this.gWc, t * MATERIAL_LAYA);
    this.cWc?.SetCustomMaterialScalarParameter(this.fWc, t * MATERIAL_LAYB);
    this.cWc?.SetCustomMaterialScalarParameter(this.gWc, t * MATERIAL_LAYB);
    this.uWc?.SetCustomMaterialScalarParameter(this.fWc, t * MATERIAL_LAYC);
    this.uWc?.SetCustomMaterialScalarParameter(this.gWc, t * MATERIAL_LAYC);
  }
  cMu() {
    var t;
    var i = this.Gco.Pitch;
    if (Math.abs(i) < 1) {
      this.YGl?.SetUIActive(false);
      this.L8e?.SetUIActive(false);
    } else if (i > 0) {
      this.YGl?.SetUIActive(false);
      this.L8e?.SetUIActive(true);
      t = i / this.eMu;
      this.JSu.X = this.EWc?.GetFloatValue(t) ?? 0;
      this.oMu?.SetUIRelativeLocation(this.JSu.ToUeVectorOld());
      this.L8e?.SetAlpha(this.MWc?.GetFloatValue(t) ?? 0);
      this.yWc.X = this.SWc?.GetFloatValue(t) ?? 0;
      this.L8e?.SetUIRelativeLocation(this.yWc.ToUeVectorOld());
      if (i >= this.eMu) {
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
      t = i / this.eMu;
      this.JSu.X = this.EWc?.GetFloatValue(t) ?? 0;
      this.rMu?.SetUIRelativeLocation(this.JSu.ToUeVectorOld());
      this.YGl?.SetAlpha(this.MWc?.GetFloatValue(t) ?? 0);
      this.yWc.X = this.SWc?.GetFloatValue(t) ?? 0;
      this.YGl?.SetUIRelativeLocation(this.yWc.ToUeVectorOld());
      if (i <= -this.eMu) {
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
    this.SPe?.StopCurrentSequence();
    this.SPe?.PlayLevelSequenceByName(t);
    this.mWc++;
    this.LeftEnd = false;
    this.RightEnd = false;
  }
  PlayReSetSequence() {
    if (this.YGl?.IsUIActiveSelf()) {
      this.mWc++;
      this.SPe?.StopCurrentSequence();
      this.SPe?.PlayLevelSequenceByName("ResetR");
    } else if (this.L8e?.IsUIActiveSelf()) {
      this.mWc++;
      this.SPe?.StopCurrentSequence();
      this.SPe?.PlayLevelSequenceByName("ResetL");
    }
  }
}
exports.KingShipCardItem = KingShipCardItem;
//# sourceMappingURL=KingShipCardItem.js.map