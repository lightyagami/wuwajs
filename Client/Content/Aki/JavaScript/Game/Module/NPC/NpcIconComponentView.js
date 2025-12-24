"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcIconComponentView = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const UiLayer_1 = require("../../Ui/UiLayer");
const LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer");
class NpcIconComponentView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.RootActorRotation = undefined;
    this.jqi = undefined;
    this.Wqi = false;
    this.Kqi = false;
    this.cdl = false;
    this.Qqi = false;
    this.Xqi = false;
    this.$qi = false;
    this.Yqi = false;
    this.X1l = false;
    this.Y1l = false;
    this.I91 = undefined;
    this.Jqi = undefined;
    this.zqi = undefined;
    this.eGi = new UE.VectorDouble(1, 1, 1);
    this.tGi = 0;
    this.iGi = undefined;
    this.oGi = undefined;
    this.iF1 = undefined;
    this.rGi = undefined;
    this.nGi = new UE.VectorDouble(1, 1, 1);
    this.sGi = 0;
    this.aGi = undefined;
    this.ymt = 0;
    this.CRi = undefined;
    this.lGi = undefined;
    this._Gi = false;
    this.uGi = undefined;
    this.Ueu = false;
    this.cGi = t => {
      if (t === "DialogueClose") {
        this.uGi();
      } else if (t === "NameClose" && this.Ueu && (this.Ueu = false, this.iGi.SetUIActive(false), this.I91 !== undefined)) {
        this.SetQuestTrackCellState(this.I91);
        this.I91 = undefined;
      }
    };
  }
  get ForceHideRootItem() {
    return this.cdl;
  }
  set ForceHideRootItem(t) {
    var i = this.cdl !== t;
    this.cdl = t;
    if (i) {
      this.SetRootItemState(this.Kqi, true);
    }
  }
  get ForceHideDialog() {
    return this.Y1l;
  }
  set ForceHideDialog(t) {
    var i = this.Y1l !== t;
    this.Y1l = t;
    if (i) {
      this.SetDialogueActive(this.Yqi, this.X1l, true);
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIText], [4, UE.UITexture], [5, UE.UIItem], [6, UE.UIItem], [8, UE.UIItem], [10, UE.UIItem], [11, UE.UISprite]];
  }
  OnStart() {
    this.RootActorRotation = this.RootActor.K2_GetActorRotation();
    this.jqi = new UE.VectorDouble(0, 0, 0);
    this.iGi = this.GetItem(6);
    this.tGi = this.iGi.D_K2_GetComponentScale().X;
    this.aGi = this.GetItem(2);
    this.sGi = this.aGi.D_K2_GetComponentScale().X;
    this.Jqi = this.GetItem(5);
    this.zqi = this.GetTexture(4);
    this.rGi = this.GetItem(8);
    this.oGi = this.GetItem(10);
    this.iF1 = this.GetSprite(11);
    this.$qi = this.zqi.bIsUIActive;
    this.Qqi = this.iGi.bIsUIActive;
    this.Kqi = this.RootItem.bIsUIActive;
    this.Wqi = this.Jqi.bIsUIActive;
    this._Gi = this.oGi.bIsUIActive;
    this.Y1l = false;
    this.X1l = false;
    this.mGi();
    this.SetDialogueActive(false);
    this.uGi = () => {
      this.aGi.SetUIActive(false);
    };
  }
  mGi() {
    this.CRi = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.CRi.BindSequenceCloseEvent(this.cGi);
  }
  SetNpcName(t) {
    var i = this.GetText(0);
    if (StringUtils_1.StringUtils.IsEmpty(t)) {
      i.SetUIActive(false);
    } else {
      i.SetUIActive(true);
      i.SetText(t);
    }
  }
  InitItemLocation(t, i) {
    this.jqi = t;
    this.jqi.Z = t.Z + i;
    this.RootActor.D_K2_SetActorLocation(this.jqi, false, undefined, false);
  }
  UpdateRotation(t, i) {
    t += 90;
    this.RootActorRotation.Roll = i - 90;
    this.RootActorRotation.Pitch = 0;
    this.RootActorRotation.Yaw = t;
    this.RootItem.SetUIWorldRotation(this.RootActorRotation);
  }
  SetDialogueActive(t, i = false, s = false) {
    if (this.ForceHideDialog) {
      if (this.aGi.bIsUIActive) {
        this.aGi.SetUIActive(false);
      }
      this.Yqi = t;
    } else if (t !== this.Yqi || !!s) {
      if (this.Yqi = t) {
        this.aGi.SetUIActive(true);
        this.gGi("DialogueStart");
        this.rGi.SetUIActive(i);
        this.X1l = i;
      } else if (!this.gGi("DialogueClose")) {
        this.uGi?.();
      }
    }
  }
  GetDialogueActive() {
    return this.Yqi;
  }
  gGi(t) {
    if (this.CRi.GetCurrentSequence() === t) {
      this.CRi.ReplaySequenceByKey(t);
    } else {
      this.CRi.StopCurrentSequence(false, true);
      this.CRi.PlayLevelSequenceByName(t);
    }
    return true;
  }
  SetDialogueText(t) {
    this.GetText(3).SetText(t);
  }
  SetHeadItemState(t) {
    if (this.Qqi !== t) {
      if (this.Qqi = t) {
        this.iGi.SetUIActive(true);
        if (this.Ueu) {
          this.CRi.StopPlayingSequence();
          this.Ueu = false;
        }
        this.CRi.PlayLevelSequenceByName("NameStart");
        if (this.$qi) {
          if (this.lGi === 0) {
            this.fGi();
          } else if (this.lGi === 1) {
            this.CRi.PlayLevelSequenceByName("IconStart");
          }
        }
      } else {
        this.CRi.PlayLevelSequenceByName("IconClose");
        this.CRi.PlayLevelSequenceByName("NameClose");
        this.Ueu = true;
      }
    }
  }
  GetHeadItemState() {
    return this.Qqi;
  }
  GetHeadIconActive() {
    return this.$qi;
  }
  SetQuestTrackCellState(t) {
    if (this._Gi !== t) {
      if (this.CRi?.IsPlayingSequence("NameClose")) {
        this.I91 = t;
      } else {
        this._Gi = t;
        this.oGi.SetUIActive(t);
      }
    }
  }
  SetPlayerInfoItemState(t) {
    this.iF1.SetUIActive(t);
  }
  SetRootItemState(t, i = false) {
    if (this.ForceHideRootItem) {
      if (this.RootItem.bIsUIActive) {
        this.SetActive(false);
      }
      this.Kqi = t;
    } else if (this.Kqi !== t || !!i) {
      this.Kqi = t;
      this.SetActive(t && !UiLayer_1.UiLayer.IsForceHideUi());
    }
  }
  GetRootItemState() {
    return this.Kqi;
  }
  SetTrackEffectState(t) {
    if (this.Xqi !== t) {
      this.Xqi = t;
      EffectSystem_1.EffectSystem.SetEffectHidden(this.ymt, t, "NpcIconComponentView");
    }
  }
  SetHeadInfoNameState(t) {
    if (this.Wqi !== t) {
      this.Wqi = t;
      this.Jqi.SetUIActive(t);
      this.aGi.SetUIActive(t && this.Yqi);
    }
  }
  SetNpcQuestIconState(t) {
    this.CGi(t);
  }
  SetNpcSecondName(t) {
    var i = this.GetText(1);
    if (t) {
      i.SetUIActive(true);
      i.ShowTextNew(t);
    } else {
      i.SetUIActive(false);
    }
  }
  SetFunctionIcon(t, i) {
    if (t) {
      this.CGi(true);
      this.SetTextureByPath(t, this.zqi, undefined, i);
      this.lGi = 0;
    } else {
      this.CGi(false);
    }
  }
  SetNpcQuestIcon(t) {
    if (t) {
      this.SetTextureByPath(t, this.zqi);
      this.CGi(true);
      this.lGi = 1;
    } else {
      this.CGi(false);
    }
  }
  SetPlayerInfoIcon(t, i) {
    if (t && this.iF1) {
      this.SetSpriteByPath(t, this.iF1, true, undefined, i);
    }
  }
  SnapSizeFromTexture() {
    this.zqi?.SetSizeFromTexture();
  }
  SetHeadWorldScale3D(t) {
    if (!!this.Qqi && !MathUtils_1.MathUtils.IsNearlyEqual(this.tGi, t, 0.01)) {
      this.tGi = t;
      this.eGi.X = t;
      this.eGi.Y = t;
      this.eGi.Z = t;
      this.iGi.D_SetWorldScale3D(this.eGi);
    }
  }
  SetDialogWorldScale3D(t) {
    if (this.sGi !== t) {
      this.sGi = t;
      this.nGi.X = t;
      this.nGi.Y = t;
      this.nGi.Z = t;
      this.aGi.D_SetWorldScale3D(this.nGi);
    }
  }
  fGi() {
    this.CRi.PlayLevelSequenceByName("FirstStart");
  }
  CGi(t) {
    if (t !== this.$qi) {
      this.$qi = t;
      this.zqi.SetUIActive(t);
    }
  }
  OnBeforeDestroy() {
    if (EffectSystem_1.EffectSystem.IsValid(this.ymt)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.ymt, "[NpcIconComponentView.OnBeforeDestroy]", true);
      this.ymt = 0;
    }
    this.CRi?.Clear();
  }
}
exports.NpcIconComponentView = NpcIconComponentView;
//# sourceMappingURL=NpcIconComponentView.js.map