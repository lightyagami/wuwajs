"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotTransitionView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioController_1 = require("../../../../Core/Audio/AudioController");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../Core/Common/Log");
const ExternalSourceSettingById_1 = require("../../../../Core/Define/ConfigQuery/ExternalSourceSettingById");
const InterjectionByTimberIdAndUniversalToneId_1 = require("../../../../Core/Define/ConfigQuery/InterjectionByTimberIdAndUniversalToneId");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const PlotAudioById_1 = require("../../../../Core/Define/ConfigQuery/PlotAudioById");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
const PlotAudioModel_1 = require("../PlotAudioModel");
const TYPEWRITERRANGE = 0.01;
const FADEOUTRANGE = 9999;
const FADEMAXTIME = 30;
const PLAY_FLAG = 8;
class PlotTransitionView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.QYt = undefined;
    this.XYt = undefined;
    this.LZi = undefined;
    this.DZi = undefined;
    this.RZi = undefined;
    this.UZi = undefined;
    this.zNe = 0;
    this.AZi = undefined;
    this.B7 = undefined;
    this.lZi = new AudioController_1.PlayResult();
    this.PZi = 0;
    this.xZi = 0;
    this.W1e = 0;
    this.wZi = 1;
    this.BZi = 1;
    this.Ist = 0;
    this.bZi = undefined;
    this.qZi = undefined;
    this.GZi = undefined;
    this.NZi = undefined;
    this.Jnu = undefined;
    this.OZi = () => {
      var i;
      if (this.PZi !== 4 && this.PZi !== 3) {
        i = this.zNe || ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.EndWaitTimeCenterText;
        this.kZi(i);
      }
    };
    this.FZi = () => {
      var i;
      if (this.PZi === 4 || this.PZi === 3) {
        i = ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.EndWaitTimeCenterText ?? this.W1e;
        this.kZi(i);
      }
    };
    this.HZi = () => {
      this.B7 = undefined;
    };
    this.jZi = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 45, "PlotTransitionView:OnUpdatePlotCenterText");
      }
      var i;
      var t;
      var e = ModelManager_1.ModelManager.PlotModel.CenterText;
      if ((this.AZi = e).Text) {
        i = ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(e.Text);
        (t = this.GetText(0)).SetText(i);
        t.SetUIActive(true);
        this.gLu();
        this.WZi();
        this.KZi();
        this.QZi(i.length);
      } else {
        this.GetText(0)?.SetUIActive(false);
      }
      if (e.Config?.BgImageId) {
        t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e.Config.BgImageId);
        ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Texture, i => {
          if (i?.IsValid()) {
            this.GetTexture(2).SetTexture(i);
            this.GetTexture(2).SetUIActive(true);
          }
        });
      }
      if (ModelManager_1.ModelManager.GameModeModel.UseShowCenterText) {
        this.zNe = 999;
        this.XZi();
        this.GetTexture(2).SetUIActive(true);
        this.B7 = e.Callback;
        if (e.Config && e.Config.TotalTime) {
          this.zNe = e.Config.TotalTime;
          this.OZi();
        } else {
          this.ExecuteCallBack();
        }
      } else {
        this.GetButton(3).GetRootComponent().SetUIActive(e.Config?.IsManualNext ?? false);
        this.ExecuteCallBack();
        this.B7 = e.Callback;
        if (e.AutoClose) {
          this.zNe ||= e.Config?.TotalTime;
          this.OZi();
        }
        if (this.AZi.AudioId) {
          this.XZi();
        } else {
          this.pZi();
        }
        this.MZi(this.AZi.TalkAkEvent);
        this.Jnu = this.AZi.TalkEndAkEvent;
      }
      ModelManager_1.ModelManager.PlotModel.CenterText.Clear();
    };
    this.$Zi = () => {
      if (this.UZi === undefined && !(this.qZi && (this.qZi = undefined, this.YZi()), !this.DZi) && (this.PZi === 1 || this.PZi === 2)) {
        if (this.DZi !== undefined) {
          TimerSystem_1.TimerSystem.Remove(this.DZi);
        }
        this.DZi = undefined;
        this.JZi();
        this.GetText(0).SetUIActive(false);
        this.GetTexture(2).SetUIActive(false);
        this.ExecuteCallBack();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UIButtonComponent], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [[3, this.$Zi]];
  }
  OnStart() {
    var i;
    var t = this.OpenParam;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 45, "PlotTransitionView:OnStart");
    }
    this.XYt = this.GetText(0).GetOwner().GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass());
    this.LZi = this.GetTexture(1).GetOwner().GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass());
    this.QYt = this.GetText(0).GetOwner().GetComponentByClass(UE.UIEffectTextAnimation.StaticClass());
    this.GZi = (0, puerts_1.toManualReleaseDelegate)(this.FZi);
    this.NZi = this.XYt.GetPlayTween().RegisterOnComplete(this.GZi);
    this.GetTexture(2).SetUIActive(false);
    (ModelManager_1.ModelManager.GameModeModel.UseShowCenterText ? (this.GetItem(5).SetUIActive(true), this.GetButton(3).GetRootComponent()) : ModelManager_1.ModelManager.TeleportModel.IsTeleport || ModelManager_1.ModelManager.GameModeModel.PlayTravelMp4 ? (this.GetItem(5).SetUIActive(true), this.GetButton(3).GetRootComponent().SetUIActive(false), this.GetText(0)) : this.GetItem(5)).SetUIActive(false);
    if (t) {
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t) ?? t;
      (i = this.GetText(0)).SetText(t);
      i.SetAnchorVAlign(2);
      i.SetPivot(Vector2D_1.Vector2D.Create(0.5, 0.5).ToUeVector2D());
      i.SetParagraphHorizontalAlignment(1);
      i.SetAnchorOffsetX(0);
      i.SetAnchorOffsetY(0);
      if ((t = ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.CenterTextFontSizeMiddle) > 0) {
        i.SetFontSize(t);
      }
      this.QYt.SetSelectorOffset(0);
      i.SetUIActive(true);
      this.GetButton(3).GetRootComponent().SetUIActive(false);
    }
  }
  async OnPlayingStartSequenceAsync() {
    if (this.Info?.Name === "FadeLoadingView") {
      await this.PlaySequenceAsync("Start01");
    }
  }
  async OnPlayingCloseSequenceAsync() {
    if (this.Info?.Name === "FadeLoadingView") {
      await this.PlaySequenceAsync("Close01");
    }
  }
  ExecuteCallBack() {
    var i;
    if (this.B7) {
      i = this.B7;
      this.B7 = undefined;
      i();
    }
  }
  kZi(i) {
    if (this.DZi !== undefined) {
      TimerSystem_1.TimerSystem.Remove(this.DZi);
    }
    this.DZi = TimerSystem_1.TimerSystem.Delay(() => {
      this.DZi = undefined;
      this.JZi();
      this.GetText(0).SetUIActive(false);
      this.GetTexture(2).SetUIActive(false);
      this.ExecuteCallBack();
    }, TimeUtil_1.TimeUtil.SetTimeMillisecond(i));
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlotTransitionRemoveCallback, this.HZi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UpdatePlotCenterText, this.jZi);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlotTransitionRemoveCallback, this.HZi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpdatePlotCenterText, this.jZi);
  }
  pZi() {
    if (this.AZi.UniversalTone) {
      var i = this.AZi.UniversalTone.TimberId;
      var t = this.AZi.UniversalTone.UniversalToneId;
      if (i && t) {
        var e = InterjectionByTimberIdAndUniversalToneId_1.configInterjectionByTimberIdAndUniversalToneId.GetConfig(i, t);
        if (e) {
          this.vZi(e);
          return;
        }
      }
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Plot", 26, "通用语气配置无法获取，策划检查配置", ["timberId", i], ["universalToneId", t]);
      }
    }
  }
  vZi(i) {
    AudioController_1.AudioController.PostEventByUi(i.AkEvent, this.lZi, PLAY_FLAG);
  }
  MZi(i) {
    var t;
    var e;
    if (i && (t = (0, AudioSystem_1.parseAudioEventPath)(i.AkEvent))) {
      if (i.Type === IAction_1.EPostAkEvent.Global) {
        AudioSystem_1.AudioSystem.PostEvent(t);
      } else if (i.Type === IAction_1.EPostAkEvent.Target) {
        i = i.EntityId;
        if (!(e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i))) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Event", 26, "实体不存在", ["entityId", i]);
          }
        }
        if ((e = e.Entity.GetComponent(1)?.Owner)?.IsValid()) {
          AudioSystem_1.AudioSystem.PostEvent(t, e);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Event", 26, "未能获取到该实体对应的有效Actor", ["entityId", i]);
        }
      }
    }
  }
  OnBeforeDestroy() {
    this.XYt.GetPlayTween().UnregisterOnComplete(this.NZi);
    (0, puerts_1.releaseManualReleaseDelegate)(this.FZi);
    if ((this.GZi = undefined) !== this.DZi) {
      TimerSystem_1.TimerSystem.Remove(this.DZi);
      this.DZi = undefined;
    }
    if (this.RZi !== undefined) {
      TimerSystem_1.TimerSystem.Remove(this.RZi);
      this.RZi = undefined;
    }
    if (this.qZi !== undefined) {
      TimerSystem_1.TimerSystem.Remove(this.qZi);
      this.qZi = undefined;
    }
    this.ExecuteCallBack();
    this.AZi = undefined;
    this.bZi = undefined;
    this.Jnu = undefined;
  }
  VZi(i, t) {
    var e = this.XYt.GetPlayTween();
    e.from = i ? 1 : 0;
    e.to = i ? 0 : 1;
    e.duration = t;
    this.XYt.Play();
  }
  zZi(i) {
    var t = this.XYt.GetPlayTween()?.GetTweener();
    if (t) {
      if (i) {
        t.Pause();
        this.ZZi(true);
      } else {
        t.Resume();
        this.ZZi(false);
      }
    }
  }
  eeo(i, t) {
    var e = this.LZi.GetPlayTween();
    e.from = i ? this.GetTexture(1).GetAlpha() : 0;
    e.to = i ? 0 : 1;
    e.duration = t;
    this.LZi.Play();
  }
  XZi() {
    var i = StringUtils_1.StringUtils.IsEmpty(this.AZi.AudioId) ? undefined : PlotAudioById_1.configPlotAudioById.GetConfig(this.AZi.AudioId);
    if (i) {
      this.teo(i);
    }
  }
  teo(i) {
    var t = ExternalSourceSettingById_1.configExternalSourceSettingById.GetConfig(i.ExternalSourceSetting);
    var i = PlotAudioModel_1.PlotAudioModel.GetExternalSourcesMediaName(i);
    AudioController_1.AudioController.PostEventByExternalSourcesByUi(t.SubtitleEvent, i, t.SubtitleSrc, this.lZi, undefined, PLAY_FLAG);
  }
  ZZi(i) {
    if (this.PlayEventResult) {
      if (i) {
        for (const t of this.lZi.PlayingIds) {
          AudioController_1.AudioController.PauseAudioByPlayId(t);
        }
      } else {
        for (const e of this.lZi.PlayingIds) {
          AudioController_1.AudioController.ResumeAudioByPlayId(e);
        }
      }
    }
  }
  JZi() {
    this.MZi(this.Jnu);
    this.Jnu = undefined;
    AudioController_1.AudioController.StopEvent(this.lZi);
  }
  WZi() {
    var i = this.AZi;
    var t = this.GetText(0);
    var e = i.Config?.TextStyle?.TextAlign;
    if (e === IAction_1.ETextAlign.Bottom) {
      t.SetAnchorVAlign(3);
      t.SetPivot(Vector2D_1.Vector2D.Create(0.5, -1).ToUeVector2D());
    } else if (e === IAction_1.ETextAlign.Top) {
      t.SetAnchorVAlign(1);
      t.SetPivot(Vector2D_1.Vector2D.Create(0.5, 2).ToUeVector2D());
    } else {
      t.SetAnchorVAlign(2);
      t.SetPivot(Vector2D_1.Vector2D.Create(0.5, 0.5).ToUeVector2D());
    }
    var e = i.Config?.TextStyle?.TextHorizontal;
    if (e === IAction_1.ETextHorizontal.Left) {
      t.SetParagraphHorizontalAlignment(0);
    } else if (e === IAction_1.ETextHorizontal.Right) {
      t.SetParagraphHorizontalAlignment(2);
    } else {
      t.SetParagraphHorizontalAlignment(1);
    }
    t.SetAnchorOffsetX(0);
    t.SetAnchorOffsetY(0);
  }
  KZi() {
    var t = this.AZi.Config?.TextStyle?.FontSize;
    if (t) {
      var e = this.GetText(0);
      let i = -1;
      if (t === IAction_1.EFontSize.Big) {
        i = ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.CenterTextFontSizeBig;
      } else if (t === IAction_1.EFontSize.Middle) {
        i = ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.CenterTextFontSizeMiddle;
      } else if (t === IAction_1.EFontSize.Small) {
        i = ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.CenterTextFontSizeSmall;
      }
      if (i > 0) {
        e.SetFontSize(i);
      }
    }
  }
  QZi(i) {
    if (this.RZi) {
      TimerSystem_1.TimerSystem.Remove(this.RZi);
    }
    var t = this.AZi;
    var e = t.Config?.TextStyle?.ShowAnim;
    if (e) {
      this.zNe = undefined;
      this.QYt.SetSelectorOffset(1);
      var s = t.Config?.IsMulLine ?? false;
      var h = this.QYt.GetSelector();
      h.lineByLine = s && e.Type === IAction_1.ECenterTextShowAnim.FadeOut;
      h.flipDirection = !h.lineByLine;
      h.SetRange(e.Type === IAction_1.ECenterTextShowAnim.FadeOut ? FADEOUTRANGE : TYPEWRITERRANGE);
      if (s && e.Type === IAction_1.ECenterTextShowAnim.TypeWriter) {
        this.PZi = 3;
        var h = e.TextCountPerSecond > 0 ? e.TextCountPerSecond : ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.TextAnimSpeedSeq;
        this.VZi(true, i / h);
        var r = this.ieo();
        this.Ist = h;
        if (r > 1) {
          this.wZi = 1;
          this.xZi = this.bZi.Get(this.wZi - 1) / this.Ist;
          this.BZi = r;
          this.oeo();
        }
      } else if (s && e.Type === IAction_1.ECenterTextShowAnim.FadeOut) {
        this.QYt.SetSelectorOffset(0);
        this.PZi = 4;
        h = e.FadeInTime;
        r = this.ieo();
        this.VZi(false, h * r);
        if (r > 1) {
          this.wZi = 1;
          this.xZi = h;
          this.W1e = e.FadeOutTime;
          this.BZi = r;
          this.oeo();
        }
      } else if (e.Type === IAction_1.ECenterTextShowAnim.TypeWriter) {
        this.PZi = 1;
        s = i / (e.TextCountPerSecond > 0 ? e.TextCountPerSecond : ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.TextAnimSpeedSeq);
        this.VZi(true, s);
        h = t.Config?.TotalTime ?? 0;
        this.zNe = h + s;
      } else if (e.Type === IAction_1.ECenterTextShowAnim.FadeOut) {
        this.PZi = 2;
        r = e.FadeInTime;
        const o = e.FadeOutTime;
        this.VZi(true, r);
        i = t.Config?.TotalTime ?? 0;
        this.RZi = TimerSystem_1.TimerSystem.Delay(() => {
          this.VZi(false, o);
          this.RZi = undefined;
        }, TimeUtil_1.TimeUtil.SetTimeMillisecond(r + i));
        this.zNe = r + i + o;
      } else {
        this.QYt.SetSelectorOffset(0);
      }
    } else {
      this.QYt.SetSelectorOffset(0);
    }
  }
  gLu() {
    var i = this.AZi.Config?.IsCancelAutoLine ?? false ? 0 : 1;
    var t = this.GetText(0);
    if (t) {
      t.SetOverflowType(i);
    }
  }
  oeo() {
    if (!(this.wZi >= this.BZi)) {
      this.RZi = TimerSystem_1.TimerSystem.Delay(() => {
        this.zZi(true);
        this.RZi = undefined;
        this.reo();
      }, TimeUtil_1.TimeUtil.SetTimeMillisecond(this.xZi));
    }
  }
  reo() {
    this.qZi = TimerSystem_1.TimerSystem.Delay(() => {
      this.qZi = undefined;
      this.YZi();
    }, TimeUtil_1.TimeUtil.SetTimeMillisecond(ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.EndWaitTimeCenterText));
  }
  YZi() {
    this.zZi(false);
    this.wZi = this.wZi + 1;
    if (this.PZi === 3) {
      this.xZi = this.bZi.Get(this.wZi - 1) / this.Ist;
    }
    this.oeo();
  }
  ieo() {
    if (!this.bZi) {
      var i = this.GetText(0);
      var t = (0, puerts_1.$ref)(undefined);
      i.GetTextLineNumArray(t);
      this.bZi = (0, puerts_1.$unref)(t);
      for (let i = 0; i < this.bZi.Num(); i++) {
        var e = this.bZi.Get(i);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Temp", 35, "LineNumArray", ["element", e]);
        }
      }
    }
    return this.bZi.Num();
  }
  FadeInScreen(i, t) {
    this.GetButton(3).GetRootComponent().SetUIActive(false);
    var e = i?.Ease?.Duration ? MathUtils_1.MathUtils.Clamp(i.Ease.Duration, 0, FADEMAXTIME) : 1;
    if (i?.ScreenType === IAction_1.EFadeInScreenShowType.White) {
      this.GetTexture(1).SetColor(ColorUtils_1.ColorUtils.ColorWhile);
    }
    this.eeo(false, e);
    this.ExecuteCallBack();
    this.B7 = t;
    if (this.UZi !== undefined) {
      TimerSystem_1.TimerSystem.Remove(this.UZi);
    }
    this.UZi = TimerSystem_1.TimerSystem.Delay(() => {
      this.ExecuteCallBack();
      this.UZi = undefined;
    }, TimeUtil_1.TimeUtil.SetTimeMillisecond(e));
  }
  FadeOutScreen(i, t) {
    this.GetButton(3).GetRootComponent().SetUIActive(false);
    i = i?.Ease?.Duration ? MathUtils_1.MathUtils.Clamp(i.Ease.Duration, 0, FADEMAXTIME) : 1;
    this.eeo(true, i);
    this.ExecuteCallBack();
    this.B7 = t;
    if (this.UZi !== undefined) {
      TimerSystem_1.TimerSystem.Remove(this.UZi);
    }
    this.UZi = TimerSystem_1.TimerSystem.Delay(() => {
      this.ExecuteCallBack();
      this.UZi = undefined;
    }, TimeUtil_1.TimeUtil.SetTimeMillisecond(i));
  }
}
exports.PlotTransitionView = PlotTransitionView;
//# sourceMappingURL=PlotTransitionView.js.map