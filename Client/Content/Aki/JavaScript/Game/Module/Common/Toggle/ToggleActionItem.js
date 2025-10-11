"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToggleActionItem = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const TickSystem_1 = require("../../../../Core/Tick/TickSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const Global_1 = require("../../../Global");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../LevelSequencePlayer");
const DELAY_REFRESH_TIME = 100;
const FONT_SIZE = 38;
const TRACKING_ICON_SIZE = 1.2;
class ToggleActionItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Toggle = undefined;
    this.S1a = undefined;
    this.eZi = undefined;
    this.Text = undefined;
    this.ToggleIndexInline = 0;
    this.LevelSequencePlayer = undefined;
    this.j5e = undefined;
    this.$Js = 0;
    this.DefaultToggleItemHeight = 0;
    this.Qoa = undefined;
    this.Rqe = undefined;
    this.hMa = undefined;
    this.lMa = undefined;
    this.IsPlayingReleaseSequence = false;
    this.J_ = () => {
      var t = this.dua();
      if (this.hMa?.X !== t.X || this.hMa?.Y !== t.Y) {
        this.hMa = t;
        this.y1a();
      }
    };
    this.dua = () => {
      var t = Global_1.Global.CharacterController;
      var e = (0, puerts_1.$ref)(0);
      var i = (0, puerts_1.$ref)(0);
      t.GetViewportSize(e, i);
      var t = (0, puerts_1.$unref)(e);
      var e = (0, puerts_1.$unref)(i);
      return new UE.IntPoint(t, e);
    };
    this.ToggleClick = t => {
      if (!this.IsPlayingReleaseSequence) {
        if (this.j5e) {
          this.j5e(t);
        }
      }
    };
  }
  get ToggleIndex() {
    return this.ToggleIndexInline;
  }
  set ToggleIndex(t) {
    this.ToggleIndexInline = t;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIExtendToggle], [2, UE.UITexture], [3, UE.UIItem]];
    this.BtnBindInfo = [[1, this.ToggleClick]];
  }
  OnStart() {
    this.Toggle = this.GetExtendToggle(1);
    var t = this.Toggle.GetOwner();
    this.S1a = t.GetUIItem();
    this.eZi = this.GetText(0);
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.Toggle.SetToggleStateForce(0, false, true);
    this.Qoa = this.GetRootActor().GetComponentByClass(UE.UISizeControlByOther.StaticClass());
    var t = this.GetText(0);
    this.$Js = t.GetSize();
    this.DefaultToggleItemHeight = this.S1a.GetHeight();
    this.Rqe = TickSystem_1.TickSystem.Add(this.J_, "ToggleActionItemTick", undefined, true, undefined, true);
    this.hMa = this.dua();
  }
  OnBeforeDestroy() {
    this.Toggle = undefined;
    this.Text = undefined;
    this.eZi = undefined;
    this.S1a = undefined;
    this.IsPlayingReleaseSequence = false;
    if (this.LevelSequencePlayer) {
      this.LevelSequencePlayer.Clear();
    }
    this.LevelSequencePlayer = undefined;
    this.Qoa = undefined;
    if (this.Rqe) {
      TickSystem_1.TickSystem.Remove(this.Rqe.Id);
      this.Rqe = undefined;
    }
    if (this.lMa && TimerSystem_1.GameplayTimerSystem.Has(this.lMa)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.lMa);
      this.lMa = undefined;
    }
  }
  ShowSequenceOnBegin() {
    this.LevelSequencePlayer.PlayLevelSequenceByName("show");
  }
  async PlayReleaseSequence() {
    this.IsPlayingReleaseSequence = true;
    this.SetRaycastTarget(false);
    await this.LevelSequencePlayer.PlaySequenceAsync("Select", new CustomPromise_1.CustomPromise());
    this.SetRaycastTarget(true);
    this.IsPlayingReleaseSequence = false;
  }
  SetRaycastTarget(t) {
    this.GetRootItem().SetRaycastTarget(t);
  }
  PlayAppearSequence() {
    this.LevelSequencePlayer.PlayLevelSequenceByName("Start");
  }
  SetPanelAlpha(t) {
    this.GetItem(3)?.SetAlpha(t);
  }
  async PlayDisappearSequence() {
    await this.LevelSequencePlayer.PlaySequenceAsync("Close", new CustomPromise_1.CustomPromise());
  }
  SetFunction(t) {
    this.j5e = t;
  }
  GetToggleItem() {
    return this.Toggle;
  }
  SetToggleText(t) {
    this.Text = t;
    this.GetText(0).SetText(t);
    if (this.eZi) {
      this.eZi.SetText(t);
      this.lMa ||= TimerSystem_1.GameplayTimerSystem.Delay(() => {
        this.y1a();
        this.lMa = undefined;
      }, DELAY_REFRESH_TIME);
    }
  }
  y1a() {
    var t;
    if (this.eZi && this.S1a) {
      this.eZi.SetFontSize(this.$Js);
      this.eZi.GetRealSize();
      t = this.eZi.GetRenderLineNum() < 2;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCommon", 26, "[RefreshTextHeight] IsSingleRow", ["isSingleRow", t], ["text", this.Text]);
      }
      if (t) {
        this.Qoa?.SetControlHeight(false);
        this.S1a?.SetHeight(this.DefaultToggleItemHeight);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiCommon", 26, "[RefreshTextHeight] Single height set", ["text", this.Text]);
        }
      } else {
        this.eZi.SetFontSize(FONT_SIZE);
        this.Qoa?.SetControlHeight(true);
        this.eZi.SetFontSize(FONT_SIZE);
        this.eZi.GetRealSize();
        if (this.eZi.GetRenderLineNum() < 2) {
          this.Qoa?.SetControlHeight(false);
          this.S1a?.SetHeight(this.DefaultToggleItemHeight);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("UiCommon", 26, "[RefreshTextHeight] Single after reduce size", ["text", this.Text]);
          }
        } else {
          this.Qoa?.SetControlHeight(true);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("UiCommon", 26, "[RefreshTextHeight] Not single after reduce size", ["text", this.Text]);
          }
        }
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiCommon", 26, "[RefreshTextHeight] Refresh Invalid", ["text", this.Text]);
    }
  }
  SetToggleTexture(e, i = false) {
    const s = this.GetTexture(2);
    if (s) {
      s.SetUIItemScale(new UE.Vector(i ? TRACKING_ICON_SIZE : 1));
      const h = this.GetTexture(2).GetOwner()?.GetComponentByClass(UE.UIExtendToggleTextureTransition.StaticClass());
      let t = undefined;
      if (h) {
        t = () => {
          h?.SetAllTransitionStateTexture(s.GetTexture());
        };
      }
      this.SetTextureByPath(e, s, undefined, t);
    }
  }
  SetToggleTextGray(t) {
    this.GetText(0).SetIsGray(t);
  }
  GetToggleText() {
    return this.GetText(0);
  }
}
exports.ToggleActionItem = ToggleActionItem;
//# sourceMappingURL=ToggleActionItem.js.map