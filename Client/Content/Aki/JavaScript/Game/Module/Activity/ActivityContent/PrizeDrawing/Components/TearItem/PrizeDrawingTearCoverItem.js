"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrizeDrawingTearCoverItem = exports.PrizeDrawingTearCoverItemBase = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../../../Core/Audio/AudioSystem");
const MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../../../Common/LevelSequencePlayer");
const PrizeDrawingTearItem_1 = require("./PrizeDrawingTearItem");
const shineDissolve = [0.2, 0.3, 0.4, 0.5, 1];
const glowMaskOffsetV = [-2.5, -2, -1.5, -1.3, -0.6];
const glowAlpha = [1, 0.9, 0.7, 0.5, 0.25];
const GLOW_MASK_UV_NAME = new UE.FName("MaskUV");
const DEFAULT_GLOW_MASK_UV_OFFSET = -4;
const AUDIO_TEAR_FIRST = "play_ui_prizedrawing_ticket_tear_new_click";
const AUDIO_TEAR_AGAIN = "play_ui_prizedrawing_ticket_tear_torn_click";
const AUDIO_TEAR_BACK = "play_ui_prizedrawing_ticket_tear_back";
const AUDIO_TEAR_LOOP = "play_ui_prizedrawing_ticket_bigprize_light_loop";
const AUDIO_TEAR_LOOP_STOP = "stop_ui_prizedrawing_ticket_bigprize_light_loop";
const AUDIO_TEAR_OPEN = "play_ui_prizedrawing_ticket_bigprize_light_finish";
const AUDIO_TEAR_OPEN_MINOR = "play_ui_prizedrawing_ticket_normalprize_light_finish";
const AUDIO_TEAR_START = "play_ui_prizedrawing_ticket_bigprize_light_start";
const AUDIO_RTPC_TEAR = "sys_game_prizedrawing_ticket_torn";
const AUDIO_FADE_OUT_TIME = 1000;
const DRAG_START_DISTANCE = 0.1;
class PrizeDrawingTearCoverItemBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.TearItem = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  AttachTearItemToContent(i) {
    if (this.TearItem) {
      this.TearItem.Destroy();
    }
    (this.TearItem = i).GetRootItem().K2_AttachTo(this.GetItem(0));
  }
  GetTearItem() {
    return this.TearItem;
  }
}
class PrizeDrawingTearCoverItem extends (exports.PrizeDrawingTearCoverItemBase = PrizeDrawingTearCoverItemBase) {
  constructor() {
    super(...arguments);
    this.a7d = [];
    this.TEm = [];
    this.h7d = 0;
    this.l7d = false;
    this.OpenedCallback = undefined;
    this.Vym = new UE.LinearColor(1, 5, 0, 0);
    this.bEm = [];
    this.REm = [];
    this.wEm = -1;
    this.HIm = 0;
    this.$Im = 0;
    this.WIm = false;
    this.QIm = undefined;
    this.jym = undefined;
    this.LEm = undefined;
    this.Hym = undefined;
    this.$ym = undefined;
    this.Wym = undefined;
    this.QEm = undefined;
    this.KEm = undefined;
    this.XEm = undefined;
    this.YEm = undefined;
    this.zEm = undefined;
    this.SPe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UINiagara], [3, UE.UINiagara], [4, UE.UITexture], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UINiagara], [11, UE.UITexture], [12, UE.UINiagara], [13, UE.UINiagara], [14, UE.UIItem], [15, UE.UIItem]];
  }
  OnStart() {
    this.jym = this.GetItem(1);
    this.LEm = this.GetItem(5);
    var t = this.jym.GetAttachUIChildren();
    for (let i = 0; i < t.Num(); i++) {
      this.a7d?.push(t.Get(i));
    }
    var s = this.LEm.GetAttachUIChildren();
    for (let i = 0; i < s.Num(); i++) {
      this.TEm?.push(s.Get(i));
    }
    this.bEm.push(this.GetItem(6), this.GetItem(7), this.GetItem(8), this.GetItem(9));
    this.bEm.forEach(i => {
      this.REm.push(new LevelSequencePlayer_1.LevelSequencePlayer(i));
    });
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.JEm();
  }
  OnBeforeDestroy() {
    this.SPe?.Clear();
    this.REm.forEach(i => {
      i.Clear();
    });
    if (this.QIm !== undefined) {
      AudioSystem_1.AudioSystem.ExecuteAction(this.QIm, 0);
    }
  }
  OnTick(t) {
    if (!this.l7d) {
      if (t > DRAG_START_DISTANCE && !this.WIm) {
        this.WIm = true;
        this.KIm();
      }
      var s = 1 / this.a7d.length;
      var e = Math.abs(t % s) / s;
      let i = Math.floor(t / s);
      if ((i = i < 0 ? 0 : i) >= this.a7d.length) {
        this.PlayRevelAnimation();
        this.Open(true);
      } else {
        if (this.h7d !== i) {
          if (i > this.HIm) {
            this.HIm = i;
            AudioSystem_1.AudioSystem.PostEvent(AUDIO_TEAR_FIRST);
          } else if (i < this.h7d) {
            AudioSystem_1.AudioSystem.PostEvent(AUDIO_TEAR_BACK);
          } else {
            AudioSystem_1.AudioSystem.PostEvent(AUDIO_TEAR_AGAIN);
          }
          this.m7d(i);
        }
        if ((s = i - 1) > this.wEm) {
          this.PEm(s);
          this.REm[s].PlaySequencePurely("Emoji");
        }
        if (s == -1) {
          this.PEm(-1);
        }
        s = MathUtils_1.MathUtils.Lerp(shineDissolve[i - 1] ?? 0, shineDissolve[i], e);
        this.Hym?.SetNiagaraVarFloat("Dissolve", s);
        this.QEm?.SetNiagaraVarFloat("Dissolve", s);
        this.Vym.A = MathUtils_1.MathUtils.Lerp(glowMaskOffsetV[i - 1] ?? DEFAULT_GLOW_MASK_UV_OFFSET, glowMaskOffsetV[i], e);
        this.$ym?.SetCustomMaterialVectorParameter(GLOW_MASK_UV_NAME, this.Vym);
        this.XEm?.SetCustomMaterialVectorParameter(GLOW_MASK_UV_NAME, this.Vym);
        s = MathUtils_1.MathUtils.Lerp(glowAlpha[i - 1] ?? 0, glowAlpha[i], e);
        this.$ym?.SetAlpha(s);
        this.XEm?.SetAlpha(s);
        AudioSystem_1.AudioSystem.SetRtpcValue(AUDIO_RTPC_TEAR, t * 100);
      }
    }
  }
  IsUnOpened() {
    return !this.l7d;
  }
  m7d(i) {
    this.a7d[this.h7d]?.SetUIActive(false);
    this.a7d[i]?.SetUIActive(true);
    this.TEm[this.h7d]?.SetUIActive(false);
    this.TEm[i]?.SetUIActive(true);
    this.h7d = i;
  }
  PEm(i) {
    this.bEm[this.wEm]?.SetUIActive(false);
    this.bEm[i]?.SetUIActive(true);
    this.wEm = i;
  }
  SetTearShadowActive(i) {
    this.LEm?.SetUIActive(i);
  }
  Open(i) {
    this.l7d = true;
    this.jym?.SetUIActive(false);
    this.LEm?.SetUIActive(false);
    this.PEm(-1);
    this.OnOpened();
    if (i) {
      if (this.$Im !== 0) {
        if (this.QIm !== undefined) {
          AudioSystem_1.AudioSystem.ExecuteAction(this.QIm, 0);
          this.QIm = undefined;
        }
        AudioSystem_1.AudioSystem.SetRtpcValue(AUDIO_RTPC_TEAR, 0);
        AudioSystem_1.AudioSystem.PostEvent(AUDIO_TEAR_LOOP_STOP);
      }
      switch (this.$Im) {
        case 2:
          AudioSystem_1.AudioSystem.PostEvent(AUDIO_TEAR_OPEN);
          break;
        case 1:
          AudioSystem_1.AudioSystem.PostEvent(AUDIO_TEAR_OPEN_MINOR);
          break;
        case 0:
          AudioSystem_1.AudioSystem.PostEvent(AUDIO_TEAR_FIRST);
      }
    }
  }
  PlayRevelAnimation() {
    this.TearItem?.PlayRevelAnimation();
  }
  KIm() {
    if (this.$Im === 2) {
      this.Wym?.SetUIActive(true);
    } else if (this.$Im === 1) {
      this.KEm?.SetUIActive(true);
    }
    if (this.$Im !== 0) {
      AudioSystem_1.AudioSystem.PostEvent(AUDIO_TEAR_START);
    }
  }
  OnStartDragging() {
    if (this.$Im !== 0) {
      this.QIm = AudioSystem_1.AudioSystem.PostEvent(AUDIO_TEAR_LOOP);
    }
  }
  OnStopDragging() {
    if (this.$Im !== 0) {
      if (this.QIm !== undefined) {
        AudioSystem_1.AudioSystem.ExecuteAction(this.QIm, 0, {
          TransitionDuration: AUDIO_FADE_OUT_TIME
        });
        this.QIm = undefined;
      }
      AudioSystem_1.AudioSystem.PostEvent(AUDIO_TEAR_LOOP_STOP);
    }
  }
  OnOpened() {
    this.OpenedCallback?.();
  }
  Reset() {
    this.l7d = false;
    this.jym.SetUIActive(true);
    this.m7d(0);
    this.Hym?.SetNiagaraVarFloat("Dissolve", 0);
    this.QEm?.SetNiagaraVarFloat("Dissolve", 0);
    this.Vym.A = DEFAULT_GLOW_MASK_UV_OFFSET;
    this.$ym?.SetCustomMaterialVectorParameter(GLOW_MASK_UV_NAME, this.Vym);
    this.XEm?.SetCustomMaterialVectorParameter(GLOW_MASK_UV_NAME, this.Vym);
    this.$ym?.SetAlpha(0);
    this.XEm?.SetAlpha(0);
    this.Wym?.SetUIActive(false);
    this.KEm?.SetUIActive(false);
    this.HIm = 0;
    this.WIm = false;
  }
  RefreshEffectVisible(i) {
    this.$Im = i;
    this.LEm.SetUIActive(i === 0);
    this.YEm?.SetUIActive(i === 2);
    this.YEm?.SetAlpha(i === 2 ? 1 : 0);
    this.zEm?.SetUIActive(i === 1);
    this.zEm?.SetAlpha(i === 1 ? 1 : 0);
  }
  async CreateTearItem(i, t) {
    let s = undefined;
    this.TearItem = undefined;
    switch (t) {
      case 0:
        this.TearItem = new PrizeDrawingTearItem_1.PrizeDrawingTearItemSingle();
        s = "UiItem_PrizeTearItemA";
        break;
      case 2:
        this.TearItem = new PrizeDrawingTearItem_1.PrizeDrawingTearItemDouble();
        s = "UiItem_PrizeTearItemB";
        break;
      case 3:
        this.TearItem = new PrizeDrawingTearItem_1.PrizeDrawingTearItemSingle();
        s = "UiItem_PrizeTearItemC";
        break;
      case 1:
        this.TearItem = new PrizeDrawingTearItem_1.PrizeDrawingTearItemSingle();
        s = "UiItem_PrizeTearItemB02";
    }
    this.TearItem.SetRewardList(i);
    await this.TearItem.CreateThenShowByResourceIdAsync(s, this.GetItem(0));
  }
  GetFxControl() {
    return this.YEm;
  }
  GetFxControlMinor() {
    return this.zEm;
  }
  JEm() {
    this.Hym = this.GetUiNiagara(3);
    this.$ym = this.GetTexture(4);
    this.Wym = this.GetUiNiagara(2);
    this.QEm = this.GetUiNiagara(13);
    this.KEm = this.GetUiNiagara(12);
    this.XEm = this.GetTexture(11);
    this.YEm = this.GetItem(14);
    this.zEm = this.GetItem(15);
    this.Hym?.SetUIActive(true);
    this.$ym?.SetUIActive(true);
    this.Wym?.SetUIActive(false);
    this.QEm?.SetUIActive(true);
    this.KEm?.SetUIActive(false);
    this.XEm?.SetUIActive(true);
    this.YEm?.SetUIActive(false);
    this.zEm?.SetUIActive(false);
  }
}
exports.PrizeDrawingTearCoverItem = PrizeDrawingTearCoverItem;
//# sourceMappingURL=PrizeDrawingTearCoverItem.js.map