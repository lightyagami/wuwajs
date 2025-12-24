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
    this.N2m = [];
    this.h7d = 0;
    this.l7d = false;
    this.OpenedCallback = undefined;
    this.VAm = new UE.LinearColor(1, 5, 0, 0);
    this.V2m = [];
    this.j2m = [];
    this.H2m = -1;
    this.dOm = 0;
    this.mOm = 0;
    this.fOm = false;
    this.gOm = undefined;
    this.jAm = undefined;
    this.$2m = undefined;
    this.HAm = undefined;
    this.$Am = undefined;
    this.WAm = undefined;
    this.Tkm = undefined;
    this.bkm = undefined;
    this.Rkm = undefined;
    this.wkm = undefined;
    this.Lkm = undefined;
    this.SPe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UINiagara], [3, UE.UINiagara], [4, UE.UITexture], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UINiagara], [11, UE.UITexture], [12, UE.UINiagara], [13, UE.UINiagara], [14, UE.UIItem], [15, UE.UIItem]];
  }
  OnStart() {
    this.jAm = this.GetItem(1);
    this.$2m = this.GetItem(5);
    var t = this.jAm.GetAttachUIChildren();
    for (let i = 0; i < t.Num(); i++) {
      this.a7d?.push(t.Get(i));
    }
    var s = this.$2m.GetAttachUIChildren();
    for (let i = 0; i < s.Num(); i++) {
      this.N2m?.push(s.Get(i));
    }
    this.V2m.push(this.GetItem(6), this.GetItem(7), this.GetItem(8), this.GetItem(9));
    this.V2m.forEach(i => {
      this.j2m.push(new LevelSequencePlayer_1.LevelSequencePlayer(i));
    });
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.Pkm();
  }
  OnBeforeDestroy() {
    this.SPe?.Clear();
    this.j2m.forEach(i => {
      i.Clear();
    });
    if (this.gOm !== undefined) {
      AudioSystem_1.AudioSystem.ExecuteAction(this.gOm, 0);
    }
  }
  OnTick(t) {
    if (!this.l7d) {
      if (t > DRAG_START_DISTANCE && !this.fOm) {
        this.fOm = true;
        this.COm();
      }
      var s = 1 / this.a7d.length;
      var e = Math.abs(t % s) / s;
      let i = Math.floor(t / s);
      if ((i = i < 0 ? 0 : i) >= this.a7d.length) {
        this.PlayRevelAnimation();
        this.Open(true);
      } else {
        if (this.h7d !== i) {
          if (i > this.dOm) {
            this.dOm = i;
            AudioSystem_1.AudioSystem.PostEvent(AUDIO_TEAR_FIRST);
          } else if (i < this.h7d) {
            AudioSystem_1.AudioSystem.PostEvent(AUDIO_TEAR_BACK);
          } else {
            AudioSystem_1.AudioSystem.PostEvent(AUDIO_TEAR_AGAIN);
          }
          this.m7d(i);
        }
        if ((s = i - 1) > this.H2m) {
          this.W2m(s);
          this.j2m[s].PlaySequencePurely("Emoji");
        }
        if (s == -1) {
          this.W2m(-1);
        }
        s = MathUtils_1.MathUtils.Lerp(shineDissolve[i - 1] ?? 0, shineDissolve[i], e);
        this.HAm?.SetNiagaraVarFloat("Dissolve", s);
        this.Tkm?.SetNiagaraVarFloat("Dissolve", s);
        this.VAm.A = MathUtils_1.MathUtils.Lerp(glowMaskOffsetV[i - 1] ?? DEFAULT_GLOW_MASK_UV_OFFSET, glowMaskOffsetV[i], e);
        this.$Am?.SetCustomMaterialVectorParameter(GLOW_MASK_UV_NAME, this.VAm);
        this.Rkm?.SetCustomMaterialVectorParameter(GLOW_MASK_UV_NAME, this.VAm);
        s = MathUtils_1.MathUtils.Lerp(glowAlpha[i - 1] ?? 0, glowAlpha[i], e);
        this.$Am?.SetAlpha(s);
        this.Rkm?.SetAlpha(s);
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
    this.N2m[this.h7d]?.SetUIActive(false);
    this.N2m[i]?.SetUIActive(true);
    this.h7d = i;
  }
  W2m(i) {
    this.V2m[this.H2m]?.SetUIActive(false);
    this.V2m[i]?.SetUIActive(true);
    this.H2m = i;
  }
  SetTearShadowActive(i) {
    this.$2m?.SetUIActive(i);
  }
  Open(i) {
    this.l7d = true;
    this.jAm?.SetUIActive(false);
    this.$2m?.SetUIActive(false);
    this.W2m(-1);
    this.OnOpened();
    if (i) {
      if (this.mOm !== 0) {
        if (this.gOm !== undefined) {
          AudioSystem_1.AudioSystem.ExecuteAction(this.gOm, 0);
          this.gOm = undefined;
        }
        AudioSystem_1.AudioSystem.SetRtpcValue(AUDIO_RTPC_TEAR, 0);
        AudioSystem_1.AudioSystem.PostEvent(AUDIO_TEAR_LOOP_STOP);
      }
      switch (this.mOm) {
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
  COm() {
    if (this.mOm === 2) {
      this.WAm?.SetUIActive(true);
    } else if (this.mOm === 1) {
      this.bkm?.SetUIActive(true);
    }
    if (this.mOm !== 0) {
      AudioSystem_1.AudioSystem.PostEvent(AUDIO_TEAR_START);
    }
  }
  OnStartDragging() {
    if (this.mOm !== 0) {
      this.gOm = AudioSystem_1.AudioSystem.PostEvent(AUDIO_TEAR_LOOP);
    }
  }
  OnStopDragging() {
    if (this.mOm !== 0) {
      if (this.gOm !== undefined) {
        AudioSystem_1.AudioSystem.ExecuteAction(this.gOm, 0, {
          TransitionDuration: AUDIO_FADE_OUT_TIME
        });
        this.gOm = undefined;
      }
      AudioSystem_1.AudioSystem.PostEvent(AUDIO_TEAR_LOOP_STOP);
    }
  }
  OnOpened() {
    this.OpenedCallback?.();
  }
  Reset() {
    this.l7d = false;
    this.jAm.SetUIActive(true);
    this.m7d(0);
    this.HAm?.SetNiagaraVarFloat("Dissolve", 0);
    this.Tkm?.SetNiagaraVarFloat("Dissolve", 0);
    this.VAm.A = DEFAULT_GLOW_MASK_UV_OFFSET;
    this.$Am?.SetCustomMaterialVectorParameter(GLOW_MASK_UV_NAME, this.VAm);
    this.Rkm?.SetCustomMaterialVectorParameter(GLOW_MASK_UV_NAME, this.VAm);
    this.$Am?.SetAlpha(0);
    this.Rkm?.SetAlpha(0);
    this.WAm?.SetUIActive(false);
    this.bkm?.SetUIActive(false);
    this.dOm = 0;
    this.fOm = false;
  }
  RefreshEffectVisible(i) {
    this.mOm = i;
    this.$2m.SetUIActive(i === 0);
    this.wkm?.SetUIActive(i === 2);
    this.wkm?.SetAlpha(i === 2 ? 1 : 0);
    this.Lkm?.SetUIActive(i === 1);
    this.Lkm?.SetAlpha(i === 1 ? 1 : 0);
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
    return this.wkm;
  }
  GetFxControlMinor() {
    return this.Lkm;
  }
  Pkm() {
    this.HAm = this.GetUiNiagara(3);
    this.$Am = this.GetTexture(4);
    this.WAm = this.GetUiNiagara(2);
    this.Tkm = this.GetUiNiagara(13);
    this.bkm = this.GetUiNiagara(12);
    this.Rkm = this.GetTexture(11);
    this.wkm = this.GetItem(14);
    this.Lkm = this.GetItem(15);
    this.HAm?.SetUIActive(true);
    this.$Am?.SetUIActive(true);
    this.WAm?.SetUIActive(false);
    this.Tkm?.SetUIActive(true);
    this.bkm?.SetUIActive(false);
    this.Rkm?.SetUIActive(true);
    this.wkm?.SetUIActive(false);
    this.Lkm?.SetUIActive(false);
  }
}
exports.PrizeDrawingTearCoverItem = PrizeDrawingTearCoverItem;
//# sourceMappingURL=PrizeDrawingTearCoverItem.js.map