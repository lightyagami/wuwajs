"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EncirclePlayView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const EncircleHexType_1 = require("../../../../../../Core/Define/Config/SubType/EncircleHexType");
const Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const ConfirmBoxDefine_1 = require("../../../../ConfirmBox/ConfirmBoxDefine");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ActivityEncircleController_1 = require("../ActivityEncircleController");
const EncirclePlayLevelController_1 = require("../EncirclePlayLevelController");
const EncircleUtils_1 = require("../EncircleUtils");
const EncirclePlayMapItemView_1 = require("./EncirclePlayMapItemView");
const MONSTER1_ITEM_ID = 2;
const MONSTER2_ITEM_ID = 3;
const HELP_ID = 504;
class EncirclePlayView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.pDe = undefined;
    this.xbg = new Map();
    this.Bbg = undefined;
    this.kbg = undefined;
    this.R9g = undefined;
    this.r9g = undefined;
    this.b9g = undefined;
    this.n9g = undefined;
    this.l8f = undefined;
    this.Do1 = undefined;
    this.Dai = 0;
    this.txg = 0;
    this.H9g = false;
    this.Gbg = e => {
      this.l8f?.StopCurrentSequence(false, true);
      this.l8f.PlayLevelSequenceByName("Refresh");
      this.pYc(e);
    };
    this.Vbg = () => {
      var e;
      if (!this.H9g) {
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(448)).FunctionMap.set(1, () => {});
        e.FunctionMap.set(2, () => {
          EncirclePlayLevelController_1.EncirclePlayLevelController.GetInstance().ResetEncircle();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      }
    };
    this.Vgt = () => {
      var e;
      if (!this.H9g) {
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(438)).FunctionMap.set(1, () => {});
        e.FunctionMap.set(2, () => {
          EncirclePlayLevelController_1.EncirclePlayLevelController.GetInstance().CloseEncircle();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      }
    };
    this.pcr = () => {
      if (!this.H9g) {
        ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(HELP_ID);
      }
    };
    this.g3e = e => {
      if (e.has(ActivityEncircleController_1.ActivityEncircleController.ActivityId)) {
        ControllerHolder_1.ControllerHolder.ActivityController.ShowActivityRefreshAndBackToBattleView();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.SpineSkeletonAnimationComponent], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIText], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIItem], [9, UE.SpineSkeletonAnimationComponent]];
    this.BtnBindInfo = [[4, this.Vbg]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EncircleReset, this.Gbg);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivityClose, this.g3e);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EncircleReset, this.Gbg);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivityClose, this.g3e);
  }
  OnStart() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(3));
    this.lqe.SetCloseCallBack(this.Vgt);
    this.lqe.SetHelpCallBack(this.pcr);
    this.pDe = this.OpenParam;
    this.x3t();
    this.VWm();
    this.l8f = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.H9g = false;
  }
  OnBeforeDestroy() {
    this.xbg.clear();
    if (this.r9g) {
      this.Bbg?.GetPlayTween()?.UnregisterOnComplete(this.r9g);
      this.r9g = undefined;
    }
    if (this.n9g) {
      this.Bbg?.GetPlayTween()?.UnregisterOnComplete(this.n9g);
      this.n9g = undefined;
    }
    if (this.Do1) {
      (0, puerts_1.releaseManualReleaseDelegate)(this.Do1);
    }
    this.R9g = undefined;
    this.b9g = undefined;
    this.GetSpine(2)?.ClearTracks();
    this.GetSpine(2)?.AnimationComplete.Clear();
    this.GetSpine(9)?.ClearTracks();
    this.GetSpine(9)?.AnimationComplete.Clear();
    this.l8f?.Clear();
    this.l8f = undefined;
    this.H9g = false;
  }
  VWm() {
    this.Bbg = this.GetItem(1).GetOwner().GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass());
    this.kbg = this.GetItem(8).GetOwner().GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass());
  }
  x3t() {
    var e = this.GetItem(7);
    var t = this.GetItem(0);
    for (const l of this.pDe.Hexes.values()) {
      const n = EncircleUtils_1.EncircleUtils.HexPosToPlanePos(l.HexPos);
      var i = LguiUtil_1.LguiUtil.CopyItem(e, t);
      i.SetActive(true);
      var s = this.Hbg(n);
      i.SetAnchorOffsetX(s.OffsetX);
      i.SetAnchorOffsetY(s.OffsetY);
      const o = new EncirclePlayMapItemView_1.EncirclePlayMapItemView();
      this.jbg(i, o).then(e => {
        o.SetPos(n.PosX, n.PosY);
        var t = EncircleUtils_1.EncircleUtils.PlanePosToKey(n.PosX, n.PosY);
        this.xbg.set(t, o);
        o.ChangeNorMap(l.MapId, t);
        if (l.Type === EncircleHexType_1.EncircleHexType.Monster) {
          this.Nbg(l.MapId, o, true);
        }
      }).catch(e => {});
    }
    this.SetCurrentStepText(0);
    var r = ActivityEncircleController_1.ActivityEncircleController.GetEncircleData();
    var h = EncirclePlayLevelController_1.EncirclePlayLevelController.GetInstance().GetCurrentChallengeId();
    this.SetBestRecordStepTxt(r.GetChallengeRecord(h));
  }
  Hbg(e) {
    var t = Math.floor(this.pDe.Height / 2);
    var i = Math.floor(this.pDe.Width / 2);
    var s = this.GetItem(7);
    var r = s.GetWidth();
    var s = s.GetHeight();
    var h = s * (this.pDe.Height % 2 == 0 ? 0.5 : 0);
    return {
      OffsetX: r * (this.pDe.Width % 2 == 0 ? 0.5 : 0) + (e.PosX - i) * r * 1.1 + ((e.PosY + 1) % 2 == 1 ? r * 0.55 : 0),
      OffsetY: -h + (-e.PosY + t) * s * 0.84
    };
  }
  pYc(e) {
    this.SetCurrentStepText(0);
    for (const i of e.values()) {
      var t = EncircleUtils_1.EncircleUtils.HexPosToPlanePos(i.HexPos);
      var t = this.xbg.get(EncircleUtils_1.EncircleUtils.PlanePosToKey(t.PosX, t.PosY));
      if (t && (t.ChangeNorMap(i.MapId, EncircleUtils_1.EncircleUtils.HexPosToKey(i.HexPos)), i.Type === EncircleHexType_1.EncircleHexType.Monster)) {
        this.Nbg(i.MapId, t, true);
      }
    }
  }
  async jbg(e, t) {
    await t.CreateThenShowByActorAsync(e.GetOwner(), e);
  }
  Nbg(e, t, i = false, s = 1, r = false, h = false) {
    let l = undefined;
    let n = undefined;
    let o = undefined;
    let _ = 1;
    if (e === MONSTER1_ITEM_ID) {
      l = this.GetItem(1);
      n = this.Bbg;
      o = this.GetSpine(2);
      _ = 1;
    } else {
      if (e !== MONSTER2_ITEM_ID) {
        return;
      }
      l = this.GetItem(8);
      n = this.kbg;
      o = this.GetSpine(9);
      _ = 2;
    }
    l.SetUIActive(true);
    if (s !== 0) {
      l?.SetUIItemScale(new UE.Vector(s, 1, 1));
    }
    e = this.GetItem(0);
    s = e?.GetAnchorOffsetX() + t?.GetRootItem().GetAnchorOffsetX();
    e = e?.GetAnchorOffsetY() + t?.GetRootItem().GetAnchorOffsetY();
    if (i) {
      this.ResetSpineStatus(o);
      this.gzi(l);
      l?.SetAnchorOffsetX(s);
      l?.SetAnchorOffsetY(e);
      o?.SetAnimation(0, "idle", true);
    } else {
      this.G1a(l, n, o, s, e, r, h, _);
    }
  }
  G1a(e, t, i, s, r, h, l, n) {
    var o = e.GetAnchorOffsetX();
    var _ = e.GetAnchorOffsetY();
    const c = t.GetPlayTween();
    c.from = Vector2D_1.Vector2D.Create(o, _).ToUeVector2D();
    c.to = Vector2D_1.Vector2D.Create(s, r).ToUeVector2D();
    e = e.D_K2_GetComponentScale().X;
    let a = "";
    let E = "";
    let v = "";
    if (e > 0) {
      a = "sleep";
      E = "sleep_start";
      v = "wake up";
    } else if (e < 0) {
      a = "sleep2";
      E = "sleep_start2";
      v = "wake up2";
    }
    if (o === s && _ === r) {
      if (i.GetCurrent(0)?.getAnimationName() === a || i.GetCurrent(0)?.getAnimationName() === E) {
        i.SetAnimation(0, v, false);
        i.AnimationComplete.Add(() => {
          i.SetAnimation(0, "idle", true);
        });
      } else {
        i.SetAnimation(0, a, true);
      }
      EncirclePlayLevelController_1.EncirclePlayLevelController.GetInstance().TryPushMoveToNextState();
    } else {
      this.Do1 = () => {
        if (l) {
          c.from = Vector2D_1.Vector2D.Create(s, r).ToUeVector2D();
          c.to = Vector2D_1.Vector2D.Create(s * 1.3, r * 1.3).ToUeVector2D();
          this.ResetSpineStatus(i);
          i.SetAnimation(0, "walk_away", false);
          if (this.r9g) {
            c.UnregisterOnComplete(this.r9g);
          }
          if (this.n9g) {
            c.UnregisterOnComplete(this.n9g);
          }
          t.Stop();
          t.Play();
          i.AnimationComplete.Add(() => {
            this.mbg();
            this.H9g = false;
          });
        } else {
          if (h) {
            i.SetAnimation(0, E, false);
            i.AnimationComplete.Add(() => {
              i.SetAnimation(0, a, true);
            });
          } else {
            i.SetAnimation(0, "idle", true);
          }
          this.mbg();
        }
      };
      if (n === 1) {
        (0, puerts_1.releaseManualReleaseDelegate)(this.Do1);
        if (this.r9g) {
          c.UnregisterOnComplete(this.r9g);
        }
        this.R9g = (0, puerts_1.toManualReleaseDelegate)(this.Do1);
        this.r9g = c.RegisterOnComplete(this.R9g);
      } else {
        (0, puerts_1.releaseManualReleaseDelegate)(this.Do1);
        if (this.n9g) {
          c.UnregisterOnComplete(this.n9g);
        }
        this.b9g = (0, puerts_1.toManualReleaseDelegate)(this.Do1);
        this.n9g = c.RegisterOnComplete(this.b9g);
      }
      if (l) {
        this.H9g = true;
      }
      t.Stop();
      t.Play();
      i.SetAnimation(0, "walk", false);
    }
  }
  gzi(e) {
    var t = e.GetOwner().K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
    var i = t.Num();
    for (let e = 0; e < i; e++) {
      t.Get(e).Stop();
    }
  }
  ShowSuccessNiagara() {
    for (const e of this.xbg.values()) {
      if (e) {
        e.ShowSuccess();
      }
    }
  }
  SetMonsterDead(e) {
    let t = undefined;
    if (e === MONSTER1_ITEM_ID) {
      t = this.GetSpine(2);
    } else if (e === MONSTER2_ITEM_ID) {
      t = this.GetSpine(9);
    }
    this.ResetSpineStatus(t);
    t?.SetAnimation(0, "die", false);
  }
  mbg() {
    EncirclePlayLevelController_1.EncirclePlayLevelController.GetInstance().TryPushMoveToNextState();
  }
  SetAllMonsterDead(e) {
    let t = undefined;
    for (const s of e) {
      if (s === MONSTER1_ITEM_ID) {
        t = this.GetSpine(2);
      } else if (s === MONSTER2_ITEM_ID) {
        t = this.GetSpine(9);
      }
      this.ResetSpineStatus(t);
      t?.SetAnimation(0, "die", false);
      this.ShowSuccessNiagara();
    }
    this.H9g = true;
    const i = () => {
      t?.AnimationComplete.Remove(i);
      EncirclePlayLevelController_1.EncirclePlayLevelController.GetInstance().ExecuteWin();
      this.H9g = false;
    };
    t?.AnimationComplete.Add(i);
  }
  ChangeEncircleMap(i, s, r) {
    var h = ConfigManager_1.ConfigManager.ActivityEncircleConfig?.GetMapItemType(i);
    var l = EncircleUtils_1.EncircleUtils.HexPosToKey(s);
    if (h === EncircleHexType_1.EncircleHexType.Monster) {
      if (r) {
        this.xbg.get(EncircleUtils_1.EncircleUtils.HexPosToKey(r))?.ChangeNorMap(0);
      }
      var h = this.xbg.get(l);
      var n = h.GetType();
      let e = false;
      if (n && n === EncircleHexType_1.EncircleHexType.Trap) {
        e = true;
      }
      let t = false;
      if (EncirclePlayLevelController_1.EncirclePlayLevelController.GetInstance().CheckIsBoundary(s)) {
        t = true;
      }
      h?.ChangeNorMap(i, l);
      this.Nbg(i, h, false, this.s9g(r, s), e, t);
    } else {
      this.xbg.get(l)?.ChangeNorMap(i, l);
    }
  }
  s9g(e, t) {
    if (e) {
      if (e === t) {
        return 0;
      } else if (t.PosX - e.PosX >= 0) {
        return 1;
      } else {
        return -1;
      }
    } else {
      return 1;
    }
  }
  ShowItemMoveEffect(e, t) {
    e = this.xbg.get(e);
    if (e) {
      e.ShowMonsterMoveEffect(t);
    }
  }
  RefreshStepText() {
    if (this.txg > 0) {
      this.GetText(5).SetText(`<color=#fed966>${this.txg.toString()}</color>+${this.Dai.toString()}`);
    } else {
      this.GetText(5).SetText(this.Dai.toString());
    }
  }
  SetCurrentStepText(e) {
    this.Dai = e;
    this.RefreshStepText();
  }
  SetDifficultyStepTxt(e) {
    this.txg = e;
    this.RefreshStepText();
  }
  SetBestRecordStepTxt(e) {
    let t = e.toString();
    if (e === 0) {
      t = "--";
    }
    this.GetText(6).SetText(t);
  }
  ResetSpineStatus(e) {
    e.SetToSetupPose();
    e.ClearTracks();
    e.AnimationComplete.Clear();
  }
}
exports.EncirclePlayView = EncirclePlayView;
//# sourceMappingURL=EncirclePlayView.js.map