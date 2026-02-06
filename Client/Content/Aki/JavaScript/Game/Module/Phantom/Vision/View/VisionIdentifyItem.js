"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionIdentifyItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const VisionIntensifyView_1 = require("./VisionIntensifyView");
const NORMALCOLOR = "EBE5D7FF";
const GREENCOLOR = "63FF9CFF";
const WHITECOLOR = "FFFFFFFF";
const GRAYCOLOR = "ADADADFF";
class VisionIdentifyItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.THi = "";
    this.$8i = undefined;
    this.bPe = undefined;
    this.DHi = undefined;
    this.oMt = undefined;
    this.C0t = undefined;
    this.nqe = () => {
      var e;
      if (UiManager_1.UiManager.IsViewShow("VisionIntensifyView")) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnClickVisionIntensifyItemJump);
      } else if (this.oMt) {
        (e = new VisionIntensifyView_1.VisionIntensifyViewPassData()).UniqueId = this.oMt.GetIncrId();
        UiManager_1.UiManager.OpenView("VisionIntensifyView", e, () => {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnClickVisionIntensifyItemJump);
        });
      }
    };
  }
  Refresh(e, i, t) {
    if (e) {
      this.Update(e, e.SourceView);
    }
  }
  GetKey(e, i) {
    return this.GridIndex;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIButtonComponent], [6, UE.UITextTransition], [7, UE.UISpriteTransition], [8, UE.UITextTransition], [9, UE.UIItem]];
    this.BtnBindInfo = [[5, this.nqe]];
  }
  OnStart() {
    this.bPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
  }
  async PlaySequenceAndUpdate(e, i) {
    this.DHi = new CustomPromise_1.CustomPromise();
    if (e > 0) {
      TimerSystem_1.GameplayTimerSystem.Delay(() => {
        this.bPe?.PlaySequencePurely("Update");
      }, e);
    } else {
      this.bPe?.PlaySequencePurely("Update");
    }
    TimerSystem_1.GameplayTimerSystem.Delay(() => {
      this.DHi?.SetResult();
    }, e + i);
    await this.DHi.Promise;
    e = this.$8i;
    if (e) {
      this.RHi(e);
      this.UHi(e);
      this.AHi(e);
      this.PHi(e);
      this.qwt(e);
      this.xHi(e);
      this.Yo_(this.C0t);
    }
  }
  Update(e, i) {
    var t = (this.C0t = e).Data;
    this.THi = i;
    this.oMt = e.CurrentVisionData;
    this.$8i = t;
    if (!e.IfPreCache) {
      this.RHi(t);
      this.UHi(t);
      this.AHi(t);
      this.PHi(t);
      this.qwt(t);
      this.xHi(t);
      this.Yo_(e);
    }
  }
  PHi(e) {
    e = e.SlotState === 1 && this.zDu();
    this.GetButton(5).RootUIComp.SetRaycastTarget(e);
    this.GetItem(2).SetUIActive(e);
  }
  zDu() {
    var e = ModelManager_1.ModelManager.PhantomBattleModel.GetVisionLevelUpIdentify() === 1;
    return this.THi === "VisionLevelUpView" && !e || this.THi === "VisionEquipmentView";
  }
  Rh(e) {
    let i = "";
    if (e.SlotState === 0) {
      i = GRAYCOLOR;
    } else if (e.SlotState === 1) {
      i = this.wHi() ? GREENCOLOR : WHITECOLOR;
    } else if (e.SlotState === 3) {
      i = NORMALCOLOR;
    } else if (e.SlotState === 2) {
      i = WHITECOLOR;
    } else if (e.SlotState === 5 || e.SlotState === 4) {
      i = GREENCOLOR;
    }
    return i;
  }
  RHi(e) {
    e = UE.Color.FromHex(this.Rh(e));
    this.GetText(0).SetColor(e);
    this.GetText(4).SetColor(e);
    this.GetItem(2).SetColor(e);
  }
  xHi(e) {
    var e = UE.Color.FromHex(this.Rh(e));
    var i = this.GetUiSpriteTransition(7).TransitionInfo;
    i.HighlightedTransition.Color = e;
    i.NormalTransition.Color = e;
    i.DisabledTransition.Color = e;
    var i = this.GetUITextTransition(6).TransitionInfo;
    i.HighlightedTransition.FontColor = e;
    i.DisabledTransition.FontColor = e;
    i.NormalTransition.FontColor = e;
    var i = this.GetUITextTransition(8).TransitionInfo;
    i.HighlightedTransition.FontColor = e;
    i.DisabledTransition.FontColor = e;
    i.NormalTransition.FontColor = e;
  }
  UHi(e) {
    var i = ModelManager_1.ModelManager.PhantomBattleModel.GetVisionLevelUpIdentify() === 1;
    var t = this.THi === "VisionLevelUpView" && i;
    let s = undefined;
    let r = undefined;
    switch (e.SlotState) {
      case 0:
        s = t ? "TuneEchoesProject_Warning01" : "LevelUpAndIdentify";
        r = e.GetUnlockLevel();
        break;
      case 1:
        s = t ? "TuneEchoesProject_Tips01" : "WaitForIdentify";
        break;
      case 3:
        s = e.GetSubPropName();
        break;
      case 2:
        s = t ? "TuneEchoesProject_Warning01" : "LevelUpAndIdentify";
        r = e.GetUnlockLevel();
        break;
      case 5:
      case 4:
        s = "CurrentIdentifyUnlockText";
        break;
      default:
        s = "";
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), s, r);
  }
  AHi(e) {
    var i = e.SlotState === 3;
    this.GetText(1).SetUIActive(i);
    if (i) {
      this.GetText(1).SetText(e.GetAttributeValueString());
    }
  }
  Yo_(e) {
    this.GetItem(9).SetUIActive(e.NeedHighLight);
  }
  wHi() {
    return this.THi === "VisionLevelUpView" || this.THi === "VisionEquipmentView";
  }
  qwt(e) {
    this.GetItem(3).SetUIActive(e.SlotState === 1 && this.wHi());
  }
}
exports.VisionIdentifyItem = VisionIdentifyItem;
//# sourceMappingURL=VisionIdentifyItem.js.map