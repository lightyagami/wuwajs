"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextInputComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const TickSystem_1 = require("../../../../../Core/Tick/TickSystem");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const CommonInputViewDefine_1 = require("../Model/CommonInputViewDefine");
class TextInputComponent extends UiPanelBase_1.UiPanelBase {
  constructor(t, i) {
    super();
    this.zAt = i;
    this.PAt = 0;
    this.j3 = CommonDefine_1.INVALID_VALUE;
    this.sKe = 0;
    this.xAt = undefined;
    this.yAt = undefined;
    this.ZAt = undefined;
    this._Et = CommonInputViewDefine_1.MAX_SINGLE_LENGTH;
    this.uEt = 0;
    this.tWa = false;
    this.BAt = t => {
      if (t && this.PAt === 1) {
        this.C4e(0);
      }
    };
    this.qAt = () => {
      var t;
      var i;
      if (this.tWa) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiCommon", 10, "通用输入框锁住确认点击");
        }
      } else {
        t = this.yAt.GetText();
        if ((i = StringUtils_1.StringUtils.GetStringRealCount(t)) > this._Et) {
          this.C4e(2);
          this.j3 = 0;
        } else if (i === 0 && this.zAt.IsCheckNone) {
          this.C4e(1);
          this.j3 = 0;
        } else if (i < this.uEt) {
          this.C4e(3);
          this.j3 = 0;
        } else {
          this.tWa = true;
          this.zAt.ConfirmFunc?.(t).then(t => {
            if (!this.IsDestroyOrDestroying) {
              if (t === Protocol_1.Aki.Protocol.Q4n.Proto_ContainsDirtyWord) {
                this.C4e(4);
              }
              this.zAt.ResultFunc?.(t === Protocol_1.Aki.Protocol.Q4n.KRs);
            }
          }, () => {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("UiCommon", 10, "通用输入框执行出现未知错误");
            }
          }).finally(() => {
            this.tWa = false;
          });
        }
      }
    };
    this.ePt = t => {
      if (StringUtils_1.StringUtils.GetStringRealCount(t) <= this._Et) {
        this.C4e(0);
      } else {
        this.C4e(2);
      }
    };
    this.GAt = () => {
      this.GetItem(0).SetUIActive(false);
      this.ZAt.SetSelfInteractive(true);
      this.j3 = CommonDefine_1.INVALID_VALUE;
    };
    this.NAt = () => {
      this.OAt("PrefabTextItem_Entertext_Text", 0);
    };
    this.kAt = () => {
      this.OAt("PrefabTextItem_Textoverlength_Text", CommonDefine_1.INVALID_VALUE);
      this.ZAt.SetSelfInteractive(false);
    };
    this.FAt = () => {
      this.OAt("CDKey_TooShort", 0);
      this.ZAt.SetSelfInteractive(false);
    };
    this.VAt = () => {
      this.OAt("PrefabTextItem_Textillegality_Text", 0);
    };
    this.vY_ = () => {
      this.OAt("PrefabTextItem_TextNull_Text", 0);
    };
    this.r6 = t => {
      if (this.j3 !== CommonDefine_1.INVALID_VALUE && (this.j3 += t, this.j3 >= CommonInputViewDefine_1.TIPS_DELAT_TIME)) {
        this.C4e(0);
      }
    };
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UITextInputComponent], [3, UE.UIText], [4, UE.UIButtonComponent]];
    this.BtnBindInfo = [[2, this.BAt], [4, this.qAt]];
  }
  C4e(t) {
    if (t !== this.PAt) {
      this.PAt = t;
      this.xAt[t]();
    }
  }
  OnStart() {
    this.xAt = {
      [0]: this.GAt,
      1: this.NAt,
      2: this.kAt,
      3: this.FAt,
      4: this.VAt,
      5: this.vY_,
      6: () => {},
      7: () => {}
    };
    this.ZAt = this.GetButton(4);
    this.yAt = this.GetInputText(2);
    this.yAt.OnTextChange.Bind(this.ePt);
    this.yAt.SetText(this.zAt.InputText, true);
    if (this.zAt.DefaultText) {
      this.GetText(3).SetText(this.zAt.DefaultText);
    }
    this.sKe = TickSystem_1.TickSystem.Add(this.r6, "TextInputComponent", 0, true, undefined, true).Id;
  }
  JAt() {
    this.yAt.OnTextChange.Unbind();
  }
  OAt(t, i) {
    this.GetItem(0).SetUIActive(true);
    var e = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(e, t);
    this.j3 = i;
  }
  OnBeforeDestroy() {
    this.JAt();
    TickSystem_1.TickSystem.Remove(this.sKe);
  }
  ClearText() {
    this.yAt.SetText("");
  }
}
exports.TextInputComponent = TextInputComponent;
//# sourceMappingURL=TextInputComponent.js.map