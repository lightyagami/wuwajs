"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerCardItem = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioSystem_1 = require("../../../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../../../Core/Common/Log");
const Transform_1 = require("../../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D");
const GlobalData_1 = require("../../../../../GlobalData");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const LoadAsyncPromise_1 = require("../../../../UiComponent/LoadAsyncPromise");
const GuessJokerDefine_1 = require("../../GuessJokerDefine");
const GuessJokerUtils_1 = require("../../GuessJokerUtils");
const GuessJokerCardBackItem_1 = require("./GuessJokerCardBackItem");
class GuessJokerCardItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.Gha = undefined;
    this.GLf = false;
    this.Dxg = false;
    this.rkg = false;
    this.yOg = false;
    this.NTt = () => {};
    this.NLf = 0;
    this.FLf = 7;
    this.gae = 1;
    this.mC = 0;
    this.ItemWorldTrans = Transform_1.Transform.Create();
    this.TempWorldPos = Vector_1.Vector.Create();
    this.VLf = undefined;
    this.Delegate = undefined;
    this.rPe = undefined;
    this._Ke = false;
    this.f9g = undefined;
    this.g9g = undefined;
    this.iKu = undefined;
    this.Igo = new UE.Vector2D();
    this.l$t = new UE.Vector2D();
    this.BUf = 1;
    this.kUf = 1;
    this.NRm = 0;
    this.U$o = 0;
    this.z$f = undefined;
    this.$pt = undefined;
    this.pDg = new Map();
    this.Wpu = (t, i) => {
      if (t === "Change" && i === "Change") {
        this.IDg();
      }
    };
    this.JTt = t => {
      var i = this.pDg.get(t);
      if (i) {
        i();
        this.pDg.delete(t);
      }
    };
    this.OnToggle = t => {
      if (this.rkg) {
        this.NTt?.(this);
      }
    };
    this.HLf = t => {
      var i;
      var s;
      var e;
      if (this.RootItem) {
        i = this.f9g ? this.f9g.GetFloatValue(t) : t;
        s = this.g9g ? this.g9g.GetFloatValue(t) : t;
        e = this.iKu ? this.iKu.GetFloatValue(t) : t;
        i = this.Igo.X + (this.l$t.X - this.Igo.X) * i;
        s = this.Igo.Y + (this.l$t.Y - this.Igo.Y) * s;
        this.RootItem.SetAnchorOffset(new UE.Vector2D(i, s));
        i = this.BUf + (this.kUf - this.BUf) * e;
        this.RootItem.SetUIRelativeScale3D(new UE.Vector(i, i, 1));
        this.gae = i;
        s = this.NRm + (this.U$o - this.NRm) * t;
        e = new UE.Rotator(0, s, 0);
        this.RootItem.SetUIRelativeRotation(e);
        this.mC = s;
      }
    };
    this.jLf = () => {
      this._Ke = false;
      this.VLf?.();
    };
    this.Gha = t;
  }
  get Data() {
    if (this.Gha) {
      return this.Gha;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GuessJokerCard", 78, "CardData is undefined");
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [13, UE.UITexture], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UISprite], [9, UE.UIText], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [14, UE.UITexture]];
    this.BtnBindInfo = [[0, this.OnToggle]];
  }
  async OnBeforeStartAsync() {
    var t = [this.C9g(), this.p9g(), this.v9g()];
    await Promise.all(t);
    this.z$f = new GuessJokerCardBackItem_1.GuessJokerCardBackItem();
    await this.z$f.CreateByActorAsync(this.GetItem(3).GetOwner());
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.$pt.BindSequenceCloseEvent(this.JTt);
    this.RootActor.OnSequencePlayEvent.Bind(this.Wpu);
  }
  OnStart() {
    this.Delegate = (0, puerts_1.toManualReleaseDelegate)(this.HLf);
    this.GetItem(10).SetUIActive(false);
    this.GetItem(11).SetUIActive(false);
    this.GetExtendToggle(0)?.SetSelfInteractive(false);
  }
  OnBeforeShow() {
    var t;
    if (this.Gha) {
      this.RefreshCardItem();
      t = this.Gha.GetBelongPlayerType();
      this.CardFlip(t !== 1, false);
    }
  }
  OnBeforeDestroy() {
    this.Gha = undefined;
    if (this.Delegate) {
      (0, puerts_1.releaseManualReleaseDelegate)(this.HLf);
      this.Delegate = undefined;
    }
    this.StopMove();
    this.f9g = undefined;
    this.g9g = undefined;
    this.iKu = undefined;
    this.GetItem(10).SetUIActive(false);
    this.GetItem(11).SetUIActive(false);
    this.$pt?.Clear();
    this.$pt = undefined;
  }
  RefreshCardItem() {
    var t;
    if (this.Gha) {
      t = this.Gha.Value;
      if (this.Gha.IsBlank()) {
        this.IDg();
      } else {
        if (this.Gha.IsJoker()) {
          this.GetText(2).SetText("");
          this.GetText(5).SetText("");
        } else {
          this.GetText(2).SetText("" + t);
          this.GetText(5).SetText("" + t);
        }
        this.SetTextureByPath(this.Gha.TexturePath, this.GetTexture(1));
      }
      this.GetItem(7).SetUIActive(this.Gha.IsBlank());
    }
  }
  IDg() {
    var t;
    if (this.Gha && this.Gha.IsBlank()) {
      t = this.Gha.Value;
      if (this.Gha.HasChanged() && !this.Gha.IsChangedToJoker()) {
        this.GetText(9).SetText("" + t);
        this.GetText(5).SetText("" + t);
      } else {
        this.GetText(9).SetText("");
        this.GetText(5).SetText("");
      }
      this.GetText(2).SetText("");
      this.SetTextureByPath(this.Gha.TexturePath, this.GetTexture(1));
    }
  }
  RefreshCardChangeTexture() {
    if (this.Gha && this.Gha.IsBlank()) {
      this.SetTextureByPath(this.Gha.TexturePath, this.GetTexture(13));
    }
  }
  J$f(t) {
    this.GLf = t;
    this.GetItem(3).SetUIActive(!this.GLf && !ModelManager_1.ModelManager.GuessJokerGamePlayModel.IsShowAiCards);
    this.GetItem(4).SetUIActive(this.GLf || ModelManager_1.ModelManager.GuessJokerGamePlayModel.IsShowAiCards);
  }
  BindClickCallback(t) {
    this.NTt = t;
  }
  ToggleStateChange(t) {
    this.GetExtendToggle(0)?.SetToggleState(t ? 1 : 0, false);
    this.GetExtendToggle(0)?.SetSelfInteractive(!t);
  }
  SetToggleState(t) {
    this.GetExtendToggle(0)?.SetToggleState(t ? 1 : 0, false);
  }
  CardFlip(t, i = true) {
    if (i && t !== this.GLf) {
      this.PlayCardSequence(t ? "BackToFront" : "FrontToBack", () => {
        this.J$f(t);
      });
    } else {
      this.J$f(t);
    }
  }
  CardUp(t, i) {
    var s = (0, GuessJokerDefine_1.getCardPositionConfig)(this.FLf);
    var e = this.GetCurrentPosition();
    var e = new Vector2D_1.Vector2D(e.X, e.Y + (t ? s.UpOffset : -s.UpOffset));
    if (t) {
      AudioSystem_1.AudioSystem.PostEvent("play_ui_springfestival_ghostcard_card_friction");
    }
    var s = GuessJokerUtils_1.GuessJokerUtils.GetJokerParamConfig("GuessJokerUpCardTime");
    this.SmoothMoveTo(e, i, undefined, undefined, s);
  }
  SetDark(t) {
    if (t) {
      this.PlayCardSequence("CardDark");
    } else {
      this.PlayCardSequence("CardBright");
    }
  }
  SetClickEnable(t) {
    this.rkg = t;
    this.GetExtendToggle(0)?.SetToggleState(t ? this.Dxg ? 1 : 0 : 2, false);
    this.GetExtendToggle(0)?.SetSelfInteractive(t);
  }
  SetChooseCardItem(t) {
    if (t) {
      this.PlayCardSequence("Sle");
    } else {
      this.PlayCardSequence("Unsle");
    }
  }
  SetSelectCardItem(t) {
    this.PlayCardSequence("Press", t);
  }
  SetCheckCardItem(t) {
    if (this.GLf) {
      this.GetItem(12).SetUIActive(t);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GuessJokerCard", 78, "只有ai能使用SetCheckCardItem");
    }
  }
  PlayCardSequence(t, i) {
    this.$pt?.PlaySequencePurely(t);
    if (i) {
      this.pDg.set(t, i);
    }
  }
  SetBlankCardDisable() {
    this.GetTexture(14).SetUIActive(true);
    this.SetAlpha(GuessJokerDefine_1.GUESS_JOKER_CARD_DISABLE_ALPHA);
  }
  UpdateCardData(t) {
    this.Gha = t;
  }
  SetUiParent(t) {
    this.TempWorldPos.FromUeVector(this.RootItem.D_K2_GetComponentLocation());
    this.ItemWorldTrans.FromUeTransform(t.K2_GetComponentToWorld());
    this.ItemWorldTrans.InverseTransformPosition(this.TempWorldPos, this.TempWorldPos);
    this.GetOriginalItem().SetUIParent(t);
    this.ParentUiItem = t;
    this.RootItem.SetUIRelativeLocation(this.TempWorldPos.ToUeVectorOld());
  }
  SetPosition(t) {
    if (this.RootItem) {
      this.RootItem.SetAnchorOffset(t.ToUeVector2D());
    }
  }
  SetSize(t) {
    if (this.RootItem) {
      this.RootItem.SetUIRelativeScale3D(new UE.Vector(t, t, 1));
      this.gae = t;
    }
  }
  SetRotation(t) {
    var i;
    if (this.RootItem) {
      i = new UE.Rotator(0, t, 0);
      this.RootItem.SetUIRelativeRotation(i);
      this.mC = t;
    }
  }
  SetAlpha(t) {
    if (this.RootItem) {
      this.RootItem.SetUIItemAlpha(t);
    }
  }
  SmoothMoveTo(t, i, s, e, h = GuessJokerUtils_1.GuessJokerUtils.GetJokerParamConfig("GuessJokerMoveCardTime")) {
    if (this._Ke) {
      this.StopMove();
    }
    this.VLf = i;
    this._Ke = true;
    var i = this.GetCurrentPosition();
    var t = t.ToUeVector2D();
    var r = this.gae;
    var s = s ?? r;
    var a = this.mC;
    var e = e ?? a;
    if (Math.abs(i.X - t.X) < 0.01 && Math.abs(i.Y - t.Y) < 0.01 && r === s && Math.abs(a - e) < 0.01) {
      this.jLf();
    } else {
      this.Igo.X = i.X;
      this.Igo.Y = i.Y;
      this.l$t.X = t.X;
      this.l$t.Y = t.Y;
      this.BUf = r;
      this.kUf = s;
      this.NRm = a;
      this.U$o = e;
      this.rPe = UE.LTweenBPLibrary.FloatTo(GlobalData_1.GlobalData.World, this.Delegate, 0, 1, h / 1000, 0);
      if (this.rPe) {
        this.rPe.OnCompleteCallBack.Bind(this.jLf);
      } else {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("GuessJokerCard", 78, "SmoothMoveTo: MoveTween 创建失败，直接完成");
        }
        this.jLf();
      }
    }
  }
  StopMove() {
    if (this.rPe) {
      this.rPe.Kill();
      this.rPe.OnCompleteCallBack.Unbind();
      this.rPe = undefined;
    }
    this._Ke = false;
    this.VLf?.();
    this.VLf = undefined;
  }
  GetCurrentPosition() {
    if (this.RootItem) {
      return this.RootItem.GetAnchorOffset();
    } else {
      return new UE.Vector2D(0, 0);
    }
  }
  async C9g() {
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("Curve_MoveX");
    var t = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat, 102);
    this.f9g = await t.Promise;
  }
  async p9g() {
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("Curve_MoveY");
    var t = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat, 102);
    this.g9g = await t.Promise;
  }
  async v9g() {
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("Curve_Scale");
    var t = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat, 102);
    this.iKu = await t.Promise;
  }
  SetChoose(t, i) {
    if (this.Dxg !== t) {
      this.Dxg = t;
      if (i) {
        this.SetChooseCardItem(t);
      }
      if (t) {
        this.ToggleStateChange(true);
      } else {
        this.ToggleStateChange(false);
      }
    }
  }
  GetChoose() {
    return this.Dxg;
  }
  GetPositionType() {
    return this.FLf;
  }
  SetPositionType(t) {
    this.FLf = t;
  }
  SetIndexInPanel(t) {
    this.NLf = this.FLf * 100 + t;
  }
  SetHierarchyIndex(t) {
    var i = this.GetOriginalItem() ?? this.RootItem;
    if (i) {
      i.SetHierarchyIndex(t);
    }
  }
  GetGlobalIndex() {
    return this.NLf;
  }
  SetChecking() {
    this.yOg = true;
  }
  ClearCheckingSign() {
    if (this.yOg) {
      this.yOg = false;
      this.PlayCardSequence("EvilPressUnsle");
    }
  }
}
exports.GuessJokerCardItem = GuessJokerCardItem;
//# sourceMappingURL=GuessJokerCardItem.js.map