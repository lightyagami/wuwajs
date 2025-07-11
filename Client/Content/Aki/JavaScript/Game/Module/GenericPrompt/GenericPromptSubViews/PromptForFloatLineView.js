"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PromptForFloatLineView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
class PromptForFloatLineView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.QYt = undefined;
    this.XYt = undefined;
    this.SPe = undefined;
    this.ParamHub = undefined;
    this.r1t = 0;
    this.e8 = 0;
    this.$Yt = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.QYt = this.GetText(0).GetOwner().GetComponentByClass(UE.UIEffectTextAnimation.StaticClass());
    this.XYt = this.GetText(0).GetOwner().GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass());
    this.QYt?.SetSelectorOffset(1);
  }
  OnBeforeShow() {
    var i = ConfigManager_1.ConfigManager.GenericPromptConfig;
    var t = this.ParamHub.TypeId;
    var i = i.GetPromptTypeMainTextColor(t);
    if (i) {
      this.YYt(i);
    }
    this.QYt?.SetSelectorOffset(1);
    if (this.XYt) {
      i = (t ? ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptInfo(t) : ConfigManager_1.ConfigManager.GenericPromptConfig.GetPromptTypeInfo(t)).Duration * 0.5;
      t = this.XYt.GetPlayTween().duration > i ? i : this.XYt.GetPlayTween().duration;
      this.XYt.GetPlayTween().duration = t;
      this.XYt?.Play();
    }
  }
  async OnShowAsyncImplementImplement() {
    var i = new CustomPromise_1.CustomPromise();
    await this.SPe?.PlaySequenceAsync("Start", i);
  }
  async OnBeforeHideAsync() {
    this.r1t = 0;
    var i = new CustomPromise_1.CustomPromise();
    await this.SPe?.PlaySequenceAsync("Close", i);
  }
  OnAfterHide() {
    this.$Yt?.(this);
  }
  YYt(i) {
    var t = this.GetText(0).GetOwner().GetComponentByClass(UE.UIEffectOutline.StaticClass());
    if (t) {
      t.SetOutlineColor(i);
    } else {
      this.GetText(0).SetColor(i);
    }
  }
  JYt(i, ...t) {
    var e = this.GetText(0);
    this.ParamHub.PromptId;
    LguiUtil_1.LguiUtil.SetLocalTextNew(e, i.TextKey, ...t);
  }
  zYt() {
    var i = ConfigManager_1.ConfigManager.GenericPromptConfig;
    var t = this.ParamHub;
    var e = t.MainTextParams ?? [];
    let s = t.MainTextObj;
    s = t.PromptId ? s ?? i.GetPromptMainTextObj(t.PromptId) : s ?? i.GetPromptTypeMainTextObj(t.TypeId);
    if (!e?.length) {
      this.JYt(s);
    }
    if (s || t.PromptId || !e?.length) {
      this.JYt(s, ...e);
    } else if (!StringUtils_1.StringUtils.IsEmpty(e[0])) {
      this.GetText(0).SetText(e[0]);
    }
  }
  SetPromptHub(i) {
    this.ParamHub = i;
    var t = ConfigManager_1.ConfigManager.GenericPromptConfig;
    this.e8 = 0;
    if (i.Duration && i.Duration > 0) {
      this.r1t = TimeUtil_1.TimeUtil.SetTimeMillisecond(i.Duration);
    } else {
      this.r1t = TimeUtil_1.TimeUtil.SetTimeMillisecond(t.GetPromptTypeInfo(this.ParamHub.TypeId).Duration);
    }
    this.ZYt();
  }
  ZYt() {
    this.zYt();
    this.RootItem.SetAsLastHierarchy();
  }
  SetHideCallback(i) {
    this.$Yt = i;
  }
  ShowView() {
    if (this.IsShowOrShowing) {
      if (this.SPe?.GetCurrentSequence() !== undefined) {
        this.SPe.ReplaySequenceByKey("Start");
        return;
      } else {
        this.SPe.PlaySequencePurely("Start");
        return;
      }
    }
    this.SetActive(true);
  }
  HideView() {
    if (this.IsShowOrShowing) {
      this.SetActive(false);
    }
  }
  Tick(i) {
    if (!(this.r1t <= 0)) {
      this.e8 += i;
      if (this.e8 > this.r1t) {
        this.SetActive(false);
      }
    }
  }
}
exports.PromptForFloatLineView = PromptForFloatLineView;
//# sourceMappingURL=PromptForFloatLineView.js.map