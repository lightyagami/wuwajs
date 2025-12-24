"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WheelTowerRoundSelectView = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../../Ui/UiManager");
const AutoAttachItem_1 = require("../../../../AutoAttach/AutoAttachItem");
const NoCircleAttachView_1 = require("../../../../AutoAttach/NoCircleAttachView");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const ConfirmBoxDefine_1 = require("../../../../ConfirmBox/ConfirmBoxDefine");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
const WheelTowerBossItem_1 = require("../Component/RoundSelect/WheelTowerBossItem");
const WheelTowerBuffItem_1 = require("../Component/RoundSelect/WheelTowerBuffItem");
const WheelTowerTeamItem_1 = require("../Component/RoundSelect/WheelTowerTeamItem");
const WheelTowerScoreItem_1 = require("../Component/WheelTowerScoreItem");
class WheelTowerRoundSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Txf = undefined;
    this.Qyi = undefined;
    this.Ytf = undefined;
    this.fDo = undefined;
    this.d8t = undefined;
    this.Plf = undefined;
    this.Alf = undefined;
    this.Hea = undefined;
    this.$Ge = e => {
      if (e === "WheelTowerTeamSelectView") {
        this.iif();
      }
    };
    this.ztf = () => {
      var e = new WheelTowerBossItem_1.WheelTowerBossItem();
      e.SetClickCallback(this.Jmf);
      return e;
    };
    this.Jmf = (e, t) => {
      this.Ytf?.SelectGridProxy(e);
      e = ConfigManager_1.ConfigManager.WheelTowerConfig.GetWaveConfigById(t);
      this.GetText(9)?.ShowTextNew(e.Desc);
    };
    this.Ztf = () => {
      if (!this.Txf?.MovingState()) {
        var t = ModelManager_1.ModelManager.WheelTowerModel.GetMaxChallengeRound();
        var i = ModelManager_1.ModelManager.WheelTowerModel.SelectedRound;
        if (t === 0) {
          this.bxf(0);
        } else {
          let e = i - 1;
          if (e < 0) {
            e += t + 1;
          }
          this.bxf(e);
        }
      }
    };
    this.eif = () => {
      var e;
      var t;
      if (!this.Txf?.MovingState()) {
        e = ModelManager_1.ModelManager.WheelTowerModel.GetMaxChallengeRound();
        t = ModelManager_1.ModelManager.WheelTowerModel.SelectedRound;
        if (e === 0) {
          this.bxf(0);
        } else {
          this.bxf((t + 1) % (e + 1));
        }
      }
    };
    this.tif = () => {
      var e = ModelManager_1.ModelManager.WheelTowerModel;
      if (e.CheckSelectedRoleEnergyEnough()) {
        if (e.CheckBuffIsSelected()) {
          if (e.CheckSelectedIsConflict()) {
            (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(420)).FunctionMap.set(2, () => {
              this.Zmf();
            });
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
          } else {
            this.Zmf();
          }
        } else {
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(new ConfirmBoxDefine_1.ConfirmBoxDataNew(408));
        }
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("WheelBattleTips_NoFatiguevalue");
      }
    };
    this.Fc_ = () => {
      var e;
      if (ModelManager_1.ModelManager.WheelTowerModel.HasChallengeAnyRound()) {
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(409)).FunctionMap.set(2, () => {
          var e = ModelManager_1.ModelManager.WheelTowerModel.GetCurrentLevelRecord();
          ActivityControllerHolder_1.ActivityControllerHolder.WheelTowerController.RequestResetLevelRecord(e.gG_).then(() => {
            this.pO();
          });
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      }
    };
    this.I5t = () => {
      if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
        UiManager_1.UiManager.OpenView("WheelTowerModeSelectView");
      } else {
        this.CloseMe();
      }
    };
    this._Uf = () => {
      UiManager_1.UiManager.OpenView("WheelTowerTeamSelectView", undefined, (e, t) => {
        if (e) {
          this.AddChildViewById(t);
        }
      });
    };
    this.Hwn = (e, t, i) => {
      var r = new RoundTab();
      r.OnClickCallback = this.N8e;
      r.CreateThenShowByActor(e);
      return r;
    };
    this.N8e = e => {
      this.bxf(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIItem], [7, UE.UIScrollViewWithScrollbarComponent], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIText], [15, UE.UIButtonComponent], [16, UE.UIButtonComponent], [17, UE.UIText], [18, UE.UIItem], [19, UE.UIText]];
    this.BtnBindInfo = [[4, this.Ztf], [5, this.eif], [15, this.tif], [16, this.Fc_]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.Qyi = new PopupCaptionItem_1.PopupCaptionItem();
    e.push(this.Qyi.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()));
    this.fDo = new WheelTowerBuffItem_1.WheelTowerBuffItem();
    e.push(this.fDo.CreateThenShowByActorAsync(this.GetItem(10).GetOwner()));
    this.d8t = new WheelTowerTeamItem_1.WheelTowerTeamItem();
    e.push(this.d8t.CreateThenShowByActorAsync(this.GetItem(11).GetOwner()));
    this.Ytf = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(7), this.ztf);
    this.Plf = new RecordItem();
    this.Alf = new RecordItem();
    e.push(this.Plf.CreateThenShowByActorAsync(this.GetItem(12).GetOwner()));
    e.push(this.Alf.CreateThenShowByActorAsync(this.GetItem(13).GetOwner()));
    this.Txf = new NoCircleAttachView_1.NoCircleAttachView(this.GetItem(6).GetOwner());
    await Promise.all(e);
  }
  OnStart() {
    var e = ModelManager_1.ModelManager.WheelTowerModel.EndlessMode;
    this.GetItem(0)?.SetUIActive(e);
    this.GetItem(1)?.SetUIActive(!e);
    this.Qyi?.SetCloseCallBack(this.I5t);
    var t = e ? "WheelBattleMode_Endless" : "WheelBattleMode_Normal";
    this.Qyi?.SetTitleLocalText(t);
    this.d8t.ClickCallback = this._Uf;
    var t = ModelManager_1.ModelManager.WheelTowerModel.GetTowerConfig().DefaultCostEnergy;
    this.GetText(14)?.SetText(t.toString());
    this.pO();
    ActivityControllerHolder_1.ActivityControllerHolder.WheelTowerController.TryOpenOverridePopupView(() => {
      this.pO();
    });
    this.Hea = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this._rm();
    if (e) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEnterWheelTowerEndlessMode);
    }
  }
  pO() {
    this.Rxf();
    this.Oqf();
    this.Gqf();
    this.oif();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
  }
  OnBeforeShow() {
    this.iif();
  }
  OnBeforeDestroy() {
    this.Hea?.Clear();
  }
  _rm() {
    this.UiBehaviourHomeBtn?.AddExtraAsyncCallback(async () => {
      if (ModelManager_1.ModelManager.WheelTowerModel.CheckInInstanceDungeon()) {
        await ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest();
      }
    });
  }
  oif() {
    var e = ModelManager_1.ModelManager.WheelTowerModel.GetMaxChallengeRound();
    var t = this.OpenParam;
    let i = e;
    if (t !== undefined) {
      i = MathUtils_1.MathUtils.Clamp(t, 0, e);
    }
    this.Txf?.AttachToIndex(i, true);
    this.rLn(i);
  }
  rLn(e, t = true) {
    if (!!t || e !== ModelManager_1.ModelManager.WheelTowerModel.SelectedRound) {
      this.Hea?.PlayOrReplaySequenceByName("Switch");
      ModelManager_1.ModelManager.WheelTowerModel.UpdateSelectRound(e, t);
      this.iif();
      this.nif(e);
      if (ModelManager_1.ModelManager.WheelTowerModel.EndlessMode) {
        t = ModelManager_1.ModelManager.WheelTowerModel.GetRoundBossRound(e);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(17), "PrefabTextItem_414249711_Text", t);
      } else {
        this.GetText(17)?.ShowTextNew("WheelTower_RoundSelect_NormalTips");
      }
      this.Plf?.Refresh(true);
      this.Alf?.Refresh(false);
      t = ModelManager_1.ModelManager.WheelTowerModel.IsRoundChallenged(e);
      this.GetText(19)?.ShowTextNew(t ? "WheelTower_RoundSelect_Retry" : "WheelTower_RoundSelect_Start");
    }
  }
  Gqf() {
    var e = ModelManager_1.ModelManager.WheelTowerModel.HasChallengeAnyRound();
    this.GetButton(16)?.RootUIComp.SetUIActive(e);
  }
  Oqf() {
    var e = ModelManager_1.ModelManager.WheelTowerModel.GetMaxChallengeRound();
    this.GetButton(4)?.SetSelfInteractive(e > 0);
    this.GetButton(5)?.SetSelfInteractive(e > 0);
  }
  iif() {
    var e = ModelManager_1.ModelManager.WheelTowerModel.SelectedRoleList;
    const i = [];
    for (let e = 0; e < ModelManager_1.ModelManager.WheelTowerModel.GetTeamMaxRoleCount(); e++) {
      i.push(0);
    }
    e.forEach((e, t) => {
      i[t] = e;
    });
    this.fDo?.Refresh(ModelManager_1.ModelManager.WheelTowerModel.SelectedBuff);
    this.d8t?.Refresh(i);
    var e = ModelManager_1.ModelManager.WheelTowerModel.CheckSelectTeamIsFull();
    var t = ModelManager_1.ModelManager.WheelTowerModel.CheckSelectedIsConflict();
    this.GetButton(15)?.SetSelfInteractive(e && !t);
  }
  nif(e) {
    const t = ModelManager_1.ModelManager.WheelTowerModel.GetRoundBossInfo(e);
    let i = t.findIndex(e => e.HpPercentage > 0);
    if (i < 0) {
      i = t.length - 1;
    }
    const r = ModelManager_1.ModelManager.WheelTowerModel.GetPrevRoundBossInfo(e);
    const s = [];
    t.forEach((e, t) => {
      t = r[t];
      s.push({
        BossInfo: e,
        StartPercent: t.HpPercentage
      });
    });
    this.Ytf?.RefreshByData(s, () => {
      this.Ytf?.GetScrollItemByIndex(i)?.SetCurrentChallenge(true);
      this.Ytf?.ScrollToItemByKey(i);
      this.Jmf(i, t[i].WaveConfigId);
    });
  }
  Zmf() {
    ActivityControllerHolder_1.ActivityControllerHolder.WheelTowerController.RequestSelectedRoundChallenge();
    this.CloseMe();
  }
  Rxf() {
    this.Txf?.SetControllerItem(this.GetItem(6));
    this.Txf?.CreateItems(this.GetItem(18).GetOwner(), 0, this.Hwn);
    this.Txf?.SetIfNeedFakeItem(true);
    this.GetItem(18)?.SetUIActive(false);
    var t = ModelManager_1.ModelManager.WheelTowerModel.GetMaxChallengeRound();
    var i = [];
    for (let e = 0; e <= t; e++) {
      i.push({
        Round: e,
        IsLock: false
      });
    }
    this.Txf.ReloadView(i.length, i, t);
  }
  bxf(e) {
    if (this.Txf?.GetCurrentSelectIndex() !== e) {
      this.Txf?.AttachToIndex(e);
    }
    this.rLn(e, false);
  }
}
exports.WheelTowerRoundSelectView = WheelTowerRoundSelectView;
class RecordItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.eel = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem]];
  }
  OnStart() {
    this.eel = new WheelTowerScoreItem_1.WheelTowerScoreItem(this, this.GetItem(3));
  }
  Refresh(e) {
    var t = ModelManager_1.ModelManager.WheelTowerModel;
    var i = t.SelectedRound;
    var r = e ? t.HasChallengeAnyRound() : t.IsRoundChallenged(i);
    this.GetHorizontalLayout(0)?.RootUIComp.SetUIActive(r);
    this.GetItem(1)?.SetUIActive(!r);
    if (r) {
      r = e ? t.GetRoundTotalScore(i) : t.GetRoundScore(i);
      this.GetText(2)?.SetText(r.toString());
      i = e ? t.GetTotalScoreLevel(r) : t.GetRoundScoreLevel(r);
      this.eel?.Refresh(i);
    }
  }
}
class RoundTab extends AutoAttachItem_1.AutoAttachItem {
  constructor() {
    super(...arguments);
    this.OnClickCallback = undefined;
    this.jv1 = -1;
    this.kqe = () => {
      this.OnSelect();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  OnRefreshItem(e) {
    var t;
    var i;
    if (e === undefined) {
      this.GetExtendToggle(0)?.SetSelfInteractive(false);
      t = this.GetCurrentShowItemIndex();
      i = ModelManager_1.ModelManager.WheelTowerModel.GetMaxChallengeRound();
      if (t < 0 || ModelManager_1.ModelManager.WheelTowerModel.IsLastRound(i) || i + 1 < t) {
        this.RootItem?.SetAlpha(0);
        return;
      } else {
        this.RootItem?.SetAlpha(1);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "WheelTower_RoundSelectTab", t + 1);
        this.GetItem(3)?.SetUIActive(true);
        return;
      }
    }
    this.jv1 = e.Round;
    this.RootItem?.SetAlpha(1);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "WheelTower_RoundSelectTab", this.jv1 + 1);
    this.GetItem(3)?.SetUIActive(e.IsLock);
    this.GetExtendToggle(0)?.SetSelfInteractive(!e.IsLock);
  }
  OnSelect() {
    this.OnClickCallback?.(this.jv1);
    this.GetExtendToggle(0)?.SetToggleStateForce(1, false);
  }
  OnUnSelect() {
    this.GetExtendToggle(0)?.SetToggleStateForce(0, false);
  }
  OnMoveItem() {
    this.GetExtendToggle(0)?.SetToggleStateForce(0, false);
  }
}
//# sourceMappingURL=WheelTowerRoundSelectView.js.map