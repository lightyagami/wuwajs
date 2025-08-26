"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonInputViewBase = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const Platform_1 = require("../../../../../Launcher/Platform/Platform");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase");
const CdKeyInputController_1 = require("../../../CdKey/CdKeyInputController");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ButtonAndSpriteItem_1 = require("../../Button/ButtonAndSpriteItem");
const CommonInputViewDefine_1 = require("../Model/CommonInputViewDefine");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
class CommonInputViewBase extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.InputData = undefined;
    this.PAt = undefined;
    this.j3 = CommonDefine_1.INVALID_VALUE;
    this.xAt = undefined;
    this.ConfirmButton = undefined;
    this.InputText = undefined;
    this.wAt = undefined;
    this.BAt = t => {
      if (t && this.PAt === 1) {
        this.RefreshTips(0);
      }
    };
    this.bAt = () => {
      this.CloseMe();
    };
    this.qAt = () => {
      var t = this.InputText.GetText();
      var i = StringUtils_1.StringUtils.GetStringRealCount(t);
      if (this.InputData.NeedCheckBlank !== undefined && this.InputData.NeedCheckBlank && t.length > 0 && StringUtils_1.StringUtils.CheckIsOnlyBlank(t)) {
        this.RefreshTips(5);
      } else if (i > this.GetMaxLimit()) {
        this.RefreshTips(2);
        this.j3 = 0;
      } else if (i === 0 && this.InputData.IsCheckNone) {
        this.RefreshTips(1);
        this.j3 = 0;
      } else if (i < this.GetMinLimit()) {
        this.RefreshTips(3);
        this.j3 = 0;
      } else if (this.ExtraConfirmCheck(i, t)) {
        this.ExecuteInputConfirm(t);
      }
    };
    this.GAt = () => {
      this.SetTipsVisible(false);
      this.ConfirmButton.SetSelfInteractive(true);
      this.j3 = CommonDefine_1.INVALID_VALUE;
    };
    this.NAt = () => {
      this.OAt("PrefabTextItem_Entertext_Text", 0);
    };
    this.kAt = () => {
      this.OAt("PrefabTextItem_Textoverlength_Text", CommonDefine_1.INVALID_VALUE);
      this.ConfirmButton.SetSelfInteractive(false);
    };
    this.FAt = () => {
      this.OAt("CDKey_TooShort", 0);
      this.ConfirmButton.SetSelfInteractive(false);
    };
    this.VAt = () => {
      this.OAt("PrefabTextItem_Textillegality_Text", 0);
    };
    this.vY_ = () => {
      this.OAt("PrefabTextItem_TextNull_Text", 0);
    };
    this.CdKeyErrorText = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CDKey_Error");
    this.HAt = () => {
      this.jAt(this.CdKeyErrorText, 0);
      this.ConfirmButton.SetSelfInteractive(false);
    };
    this.WAt = () => {
      var t = CdKeyInputController_1.CdKeyInputController.GetCdKeyUseCd().toString();
      this.OAt("CDKey_CDtime", 0, t);
      this.ConfirmButton.SetSelfInteractive(false);
    };
    this.KAt = () => {
      this.InputText.SetText("", true);
    };
    this.QAt = () => {
      if (Platform_1.Platform.IsCloudGame()) {
        let t;
        const i = (0, puerts_1.$ref)("");
        UE.KuroCloudGameWrapper.ClipBoardPaste();
        TimerSystem_1.GameplayTimerSystem.Delay(() => {
          UE.LGUIBPLibrary.ClipBoardPaste(i);
          t = (0, puerts_1.$unref)(i);
          if (!StringUtils_1.StringUtils.IsEmpty(t)) {
            this.InputText.SetText(t, true);
          }
        }, 200);
      } else {
        var t = (0, puerts_1.$ref)("");
        UE.LGUIBPLibrary.ClipBoardPaste(t);
        t = (0, puerts_1.$unref)(t);
        if (!StringUtils_1.StringUtils.IsEmpty(t)) {
          this.InputText.SetText(t, true);
        }
      }
    };
    this.XAt = () => {
      var t = ConfigManager_1.ConfigManager.TextConfig.GetTextById("SetNameSuccess");
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(t);
    };
    this.$At = () => {
      var t = ConfigManager_1.ConfigManager.TextConfig.GetTextById("SetSignSuccess");
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(t);
    };
    this.OnTextChange = t => {
      this.SetClearOrPaste();
      if (StringUtils_1.StringUtils.GetStringRealCount(t) <= this.GetMaxLimit()) {
        this.RefreshTips(0);
      } else {
        this.RefreshTips(2);
      }
      this.RefreshDuplicateName(t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UITextInputComponent], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIText]];
    this.BtnBindInfo = [[5, this.BAt], [3, this.bAt], [4, this.qAt]];
  }
  ExtraConfirmCheck(t, i) {
    return true;
  }
  ExecuteInputConfirm(t) {
    this.InputData.ConfirmFunc?.(t).then(t => {
      if (t === Protocol_1.Aki.Protocol.Q4n.Proto_ContainsDirtyWord) {
        this.RefreshTips(4);
      } else {
        this.CloseMe();
      }
    }, () => {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiCommon", 10, "通用输入框执行出现未知错误");
      }
    });
  }
  OnBeforeCreate() {
    this.InputData = this.OpenParam;
    this.xAt = {
      [0]: this.GAt,
      1: this.NAt,
      2: this.kAt,
      3: this.FAt,
      4: this.VAt,
      5: this.vY_,
      6: this.HAt,
      7: this.WAt
    };
  }
  OAt(t, i, ...e) {
    this.SetTipsVisible(true);
    var s = this.GetText(2);
    LguiUtil_1.LguiUtil.SetLocalTextNew(s, t, e);
    this.j3 = i;
  }
  jAt(t, i) {
    this.SetTipsVisible(true);
    this.GetText(2).SetText(t);
    this.j3 = i;
  }
  SetBottomTipsTextAndColor(t, i) {
    var e = this.GetText(8);
    LguiUtil_1.LguiUtil.SetLocalTextNew(e, t);
    e.SetColor(i);
  }
  SetBottomTipsShowState(t) {
    this.GetText(8).SetUIActive(t);
  }
  OnBeforeShow() {
    this.YAt();
    this.mGe();
    this.RefreshTips(0);
    this.InitExtraParam();
  }
  SetClearOrPaste() {
    if (this.wAt) {
      if (this.InputText.GetText() === "") {
        this.wAt.RefreshSprite("SP_Paste");
        this.wAt.BindCallback(this.QAt);
      } else {
        this.wAt.RefreshSprite("SP_Clear");
        this.wAt.BindCallback(this.KAt);
      }
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnNameChange, this.XAt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSignChange, this.$At);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnNameChange, this.XAt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSignChange, this.$At);
  }
  OnTick(t) {
    if (this.j3 !== CommonDefine_1.INVALID_VALUE && (this.j3 += t, this.j3 >= CommonInputViewDefine_1.TIPS_DELAT_TIME)) {
      this.RefreshTips(0);
    }
  }
  OnBeforeDestroy() {
    this.JAt();
    this.wAt = undefined;
    this.InputText = undefined;
    this.ConfirmButton = undefined;
  }
  YAt() {
    var t = !Platform_1.Platform.IsPs5Platform();
    if (t) {
      this.wAt = new ButtonAndSpriteItem_1.ButtonAndSpriteItem(this.GetItem(7));
    }
    this.GetItem(7).SetUIActive(t && this.InputData.NeedFunctionButton);
    this.ConfirmButton = this.GetButton(4);
    this.InputText = this.GetInputText(5);
    this.InputText.bAllowMultiLine = this.IsAllowMultiLine();
    this.InputText.OnTextChange.Bind(this.OnTextChange);
    this.InputText.SetText(this.InputData.InputText, true);
    this.GetText(6).SetText(this.InputData.DefaultText);
    this.SetClearOrPaste();
    this.SetTipsVisible(false);
    var t = this.InputData.BottomTipsText;
    if (t !== undefined && t !== "") {
      this.SetBottomTipsShowState(true);
      this.GetText(8).SetText(t);
    } else {
      this.SetBottomTipsShowState(false);
    }
    var t = this.InputData.BottomTipsColor;
    if (t !== undefined && t !== "") {
      this.GetText(8).SetColor(UE.Color.FromHex(t));
    }
  }
  SetTipsVisible(t) {
    this.GetItem(1).SetUIActive(t);
  }
  InitExtraParam() {}
  JAt() {
    this.InputText.OnTextChange.Unbind();
  }
  mGe() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), this.InputData.TitleTextArgs.TextKey, ...this.InputData.TitleTextArgs.Params);
  }
  RefreshTips(t) {
    if (t !== this.PAt) {
      this.PAt = t;
      this.xAt[t]();
    }
  }
  RefreshDuplicateName(t) {}
  GetMinLimit() {
    return 0;
  }
}
exports.CommonInputViewBase = CommonInputViewBase;
//# sourceMappingURL=CommonInputViewBase.js.map