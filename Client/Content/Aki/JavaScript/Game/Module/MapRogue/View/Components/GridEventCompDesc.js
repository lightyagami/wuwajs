"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridEventCompDesc = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class GridEventCompDesc extends UiPanelBase_1.UiPanelBase {
  constructor(i, t = 1) {
    super();
    this.StepId = i;
    this.StepType = t;
    this.CanInteractCallback = undefined;
    this.QYt = undefined;
    this.XYt = undefined;
    this.GZi = undefined;
    this.NZi = undefined;
    this.Po1 = 0;
    this.xo1 = false;
    this.Do1 = () => {
      this.xo1 = false;
      this.CanInteractCallback?.(this.StepId, this.StepType);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UISprite], [3, UE.UIText]];
  }
  OnStart() {
    var i = this.GetText(0);
    i.SetUIActive(false);
    this.QYt = i.GetOwner().GetComponentByClass(UE.UIEffectTextAnimation.StaticClass());
    this.XYt = i.GetOwner().GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass());
    this.QYt?.SetSelectorOffset(1);
    this.GZi = (0, puerts_1.toManualReleaseDelegate)(this.Do1);
    this.NZi = this.XYt.GetPlayTween().RegisterOnComplete(this.GZi);
    this.Po1 = CommonParamById_1.configCommonParamById.GetFloatConfig("MapRogueRandomEventTextSpeed") ?? 10;
  }
  OnBeforeDestroy() {
    if (this.NZi) {
      this.XYt?.GetPlayTween()?.UnregisterOnComplete(this.NZi);
      this.NZi = undefined;
    }
    (0, puerts_1.releaseManualReleaseDelegate)(this.Do1);
    this.GZi = undefined;
  }
  Uo1(i, t) {
    var s = this.GetText(3);
    var e = this.GetSprite(2);
    var h = this.GetItem(1);
    if (StringUtils_1.StringUtils.IsEmpty(i)) {
      h.SetUIActive(false);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(s, i);
      if (t) {
        s = UE.Color.FromHex(t);
        e.SetColor(s);
      }
      h.SetUIActive(true);
    }
  }
  P9e(i, t) {
    var s = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(s, i);
    s.SetUIActive(true);
    var i = s.GetDisplayCharLength();
    if (this.XYt) {
      if (t) {
        this.QYt.SetSelectorOffset(0);
      } else {
        s = i / this.Po1;
        this.QYt.SetSelectorOffset(1);
        this.XYt.GetPlayTween().duration = s;
        this.XYt.Play();
        this.xo1 = true;
      }
    }
  }
  Refresh(i) {
    var t = ConfigManager_1.ConfigManager.MapRogueConfig.GetRogueEventStepById(this.StepId);
    if (t) {
      this.Uo1(t.TitleKey, t.TagColor);
      this.P9e(t.TextKey, i);
      this.SetActive(true);
    }
  }
  MaskClick() {
    this.ShowAllText();
  }
  ShowAllText() {
    if (this.xo1) {
      this.XYt.Stop();
      this.QYt.SetSelectorOffset(0);
      this.CanInteractCallback?.(this.StepId, this.StepType);
    }
  }
}
exports.GridEventCompDesc = GridEventCompDesc;
//# sourceMappingURL=GridEventCompDesc.js.map