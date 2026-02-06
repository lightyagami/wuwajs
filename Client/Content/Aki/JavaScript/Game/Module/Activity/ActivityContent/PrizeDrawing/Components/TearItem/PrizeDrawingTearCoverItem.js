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
    this.iqm = [];
    this.h7d = 0;
    this.l7d = false;
    this.OpenedCallback = undefined;
    this.ZPm = new UE.LinearColor(1, 5, 0, 0);
    this.rqm = [];
    this.oqm = [];
    this.nqm = -1;
    this.RGm = 0;
    this.wGm = 0;
    this.LGm = false;
    this.PGm = undefined;
    this.eAm = undefined;
    this.sqm = undefined;
    this.tAm = undefined;
    this.iAm = undefined;
    this.rAm = undefined;
    this.Fqm = undefined;
    this.Nqm = undefined;
    this.Vqm = undefined;
    this.jqm = undefined;
    this.Hqm = undefined;
    this.SPe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UINiagara], [3, UE.UINiagara], [4, UE.UITexture], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UINiagara], [11, UE.UITexture], [12, UE.UINiagara], [13, UE.UINiagara], [14, UE.UIItem], [15, UE.UIItem]];
  }
  OnStart() {
    this.eAm = this.GetItem(1);
    this.sqm = this.GetItem(5);
    var t = this.eAm.GetAttachUIChildren();
    for (let i = 0; i < t.Num(); i++) {
      this.a7d?.push(t.Get(i));
    }
    var s = this.sqm.GetAttachUIChildren();
    for (let i = 0; i < s.Num(); i++) {
      this.iqm?.push(s.Get(i));
    }
    this.rqm.push(this.GetItem(6), this.GetItem(7), this.GetItem(8), this.GetItem(9));
    this.rqm.forEach(i => {
      this.oqm.push(new LevelSequencePlayer_1.LevelSequencePlayer(i));
    });
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.$qm();
  }
  OnBeforeDestroy() {
    this.SPe?.Clear();
    this.oqm.forEach(i => {
      i.Clear();
    });
    if (this.PGm !== undefined) {
      AudioSystem_1.AudioSystem.ExecuteAction(this.PGm, 0);
    }
  }
  OnTick(t) {
    if (!this.l7d) {
      if (t > DRAG_START_DISTANCE && !this.LGm) {
        this.LGm = true;
        this.AGm();
      }
      var s = 1 / this.a7d.length;
      var e = Math.abs(t % s) / s;
      let i = Math.floor(t / s);
      if ((i = i < 0 ? 0 : i) >= this.a7d.length) {
        this.PlayRevelAnimation();
        this.Open(true);
      } else {
        if (this.h7d !== i) {
          if (i > this.RGm) {
            this.RGm = i;
            AudioSystem_1.AudioSystem.PostEvent(AUDIO_TEAR_FIRST);
          } else if (i < this.h7d) {
            AudioSystem_1.AudioSystem.PostEvent(AUDIO_TEAR_BACK);
          } else {
            AudioSystem_1.AudioSystem.PostEvent(AUDIO_TEAR_AGAIN);
          }
          this.m7d(i);
        }
        if ((s = i - 1) > this.nqm) {
          this.aqm(s);
          this.oqm[s].PlaySequencePurely("Emoji");
        }
        if (s == -1) {
          this.aqm(-1);
        }
        s = MathUtils_1.MathUtils.Lerp(shineDissolve[i - 1] ?? 0, shineDissolve[i], e);
        this.tAm?.SetNiagaraVarFloat("Dissolve", s);
        this.Fqm?.SetNiagaraVarFloat("Dissolve", s);
        this.ZPm.A = MathUtils_1.MathUtils.Lerp(glowMaskOffsetV[i - 1] ?? DEFAULT_GLOW_MASK_UV_OFFSET, glowMaskOffsetV[i], e);
        this.iAm?.SetCustomMaterialVectorParameter(GLOW_MASK_UV_NAME, this.ZPm);
        this.Vqm?.SetCustomMaterialVectorParameter(GLOW_MASK_UV_NAME, this.ZPm);
        s = MathUtils_1.MathUtils.Lerp(glowAlpha[i - 1] ?? 0, glowAlpha[i], e);
        this.iAm?.SetAlpha(s);
        this.Vqm?.SetAlpha(s);
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
    this.iqm[this.h7d]?.SetUIActive(false);
    this.iqm[i]?.SetUIActive(true);
    this.h7d = i;
  }
  aqm(i) {
    this.rqm[this.nqm]?.SetUIActive(false);
    this.rqm[i]?.SetUIActive(true);
    this.nqm = i;
  }
  SetTearShadowActive(i) {
    this.sqm?.SetUIActive(i);
  }
  Open(i) {
    this.l7d = true;
    this.eAm?.SetUIActive(false);
    this.sqm?.SetUIActive(false);
    this.aqm(-1);
    this.OnOpened();
    if (i) {
      if (this.wGm !== 0) {
        if (this.PGm !== undefined) {
          AudioSystem_1.AudioSystem.ExecuteAction(this.PGm, 0);
          this.PGm = undefined;
        }
        AudioSystem_1.AudioSystem.SetRtpcValue(AUDIO_RTPC_TEAR, 0);
        AudioSystem_1.AudioSystem.PostEvent(AUDIO_TEAR_LOOP_STOP);
      }
      switch (this.wGm) {
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
  AGm() {
    if (this.wGm === 2) {
      this.rAm?.SetUIActive(true);
    } else if (this.wGm === 1) {
      this.Nqm?.SetUIActive(true);
    }
    if (this.wGm !== 0) {
      AudioSystem_1.AudioSystem.PostEvent(AUDIO_TEAR_START);
    }
  }
  OnStartDragging() {
    if (this.wGm !== 0) {
      this.PGm = AudioSystem_1.AudioSystem.PostEvent(AUDIO_TEAR_LOOP);
    }
  }
  OnStopDragging() {
    if (this.wGm !== 0) {
      if (this.PGm !== undefined) {
        AudioSystem_1.AudioSystem.ExecuteAction(this.PGm, 0, {
          TransitionDuration: AUDIO_FADE_OUT_TIME
        });
        this.PGm = undefined;
      }
      AudioSystem_1.AudioSystem.PostEvent(AUDIO_TEAR_LOOP_STOP);
    }
  }
  OnOpened() {
    this.OpenedCallback?.();
  }
  Reset() {
    this.l7d = false;
    this.eAm.SetUIActive(true);
    this.m7d(0);
    this.tAm?.SetNiagaraVarFloat("Dissolve", 0);
    this.Fqm?.SetNiagaraVarFloat("Dissolve", 0);
    this.ZPm.A = DEFAULT_GLOW_MASK_UV_OFFSET;
    this.iAm?.SetCustomMaterialVectorParameter(GLOW_MASK_UV_NAME, this.ZPm);
    this.Vqm?.SetCustomMaterialVectorParameter(GLOW_MASK_UV_NAME, this.ZPm);
    this.iAm?.SetAlpha(0);
    this.Vqm?.SetAlpha(0);
    this.rAm?.SetUIActive(false);
    this.Nqm?.SetUIActive(false);
    this.RGm = 0;
    this.LGm = false;
  }
  RefreshEffectVisible(i) {
    this.wGm = i;
    this.sqm.SetUIActive(i === 0);
    this.jqm?.SetUIActive(i === 2);
    this.jqm?.SetAlpha(i === 2 ? 1 : 0);
    this.Hqm?.SetUIActive(i === 1);
    this.Hqm?.SetAlpha(i === 1 ? 1 : 0);
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
    return this.jqm;
  }
  GetFxControlMinor() {
    return this.Hqm;
  }
  $qm() {
    this.tAm = this.GetUiNiagara(3);
    this.iAm = this.GetTexture(4);
    this.rAm = this.GetUiNiagara(2);
    this.Fqm = this.GetUiNiagara(13);
    this.Nqm = this.GetUiNiagara(12);
    this.Vqm = this.GetTexture(11);
    this.jqm = this.GetItem(14);
    this.Hqm = this.GetItem(15);
    this.tAm?.SetUIActive(true);
    this.iAm?.SetUIActive(true);
    this.rAm?.SetUIActive(false);
    this.Fqm?.SetUIActive(true);
    this.Nqm?.SetUIActive(false);
    this.Vqm?.SetUIActive(true);
    this.jqm?.SetUIActive(false);
    this.Hqm?.SetUIActive(false);
  }
}
exports.PrizeDrawingTearCoverItem = PrizeDrawingTearCoverItem;
//# sourceMappingURL=PrizeDrawingTearCoverItem.js.map