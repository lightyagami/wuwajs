"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonEntranceRootView = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase");
const CommonTabComponentData_1 = require("../Common/TabComponent/CommonTabComponentData");
const TabComponentWithCaptionItem_1 = require("../Common/TabComponent/TabComponentWithCaptionItem");
const CommonTabItem_1 = require("../Common/TabComponent/TabItem/CommonTabItem");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const HelpController_1 = require("../Help/HelpController");
const RoleController_1 = require("../RoleUi/RoleController");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const DynScrollView_1 = require("../Util/ScrollView/DynScrollView");
const InstanceDungeonData_1 = require("./Define/InstanceDungeonData");
const InstanceDetectDynamicItem_1 = require("./InstanceDetectDynamicItem");
const InstanceDetectItem_1 = require("./InstanceDetectItem");
const InstanceDungeonEntranceController_1 = require("./InstanceDungeonEntranceController");
const CLICK_INSTANCE_BEGIN_BUTTON_CD = 500;
class InstanceDungeonEntranceRootView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.tli = 0;
    this.Ghi = 0;
    this.OZa = false;
    this.ili = 0;
    this.dli = 0;
    this.c5a = 0;
    this.rli = [];
    this.nli = new Map();
    this.sli = new Map();
    this.lli = undefined;
    this._li = undefined;
    this.Y9a = undefined;
    this._lh = 2000;
    this.Cli = undefined;
    this.z9a = undefined;
    this.lqe = undefined;
    this.Lli = (t, e, i) => {
      var n = new InstanceDetectItem_1.InstanceDetectItem();
      n.BindClickInstanceCallback(this.Dli);
      n.BindClickSeriesCallback(this.Rli);
      n.BindCanExecuteChange(this.Lke);
      n.BindSubtitleTextIdGetter(InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.GetInstanceSubtitleTextIdByInstanceId);
      n.BindSubtitleArgsGetter(InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.GetInstanceSubtitleArgsByInstanceId);
      return n;
    };
    this.Dli = (t, e, i = undefined) => {
      this.NUe = t;
      if (i) {
        if (this.Y9a) {
          this.Y9a.IsSelect = false;
        }
        this.Y9a = i;
        this.Y9a.IsSelect = true;
      }
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId = this.NUe;
      if (this._li && this._li !== e) {
        this._li.SetToggleState(0, true);
      }
      this._li = e;
      this.mQa();
      this.J9a();
      this.UiViewSequence.PlaySequence("Xz");
    };
    this.Rli = (t, e, i) => {
      if (this.lli && this.lli !== e) {
        this.lli.SetToggleState(0, true);
      }
      this.lli = e;
      this.ili = i ? t : -1;
      this.NUe = i ? this.nli.get(t)[0] : this.NUe;
      e = this.Uli();
      this.Cli?.RefreshByData(e);
      this.Cli?.BindLateUpdate(this.Cai);
    };
    this.Lke = t => this.NUe !== t;
    this.Cai = () => {
      var t = (this.dli - 1) / (this.nli.size + (this.sli.get(this.ili) ?? 0));
      this.GetUIDynScrollViewComponent(0).SetScrollProgress(t);
      this.Cli?.UnBindLateUpdate();
    };
    this.fqe = (t, e) => new CommonTabItem_1.CommonTabItem();
    this.pqe = t => {};
    this.yqe = t => {};
    this.Awe = () => {
      this.CloseMe();
    };
    this.Z9a = () => {
      if (this.m5a()) {
        this.c5a = TimeUtil_1.TimeUtil.GetServerTimeStamp() + CLICK_INSTANCE_BEGIN_BUTTON_CD;
        const i = this.NUe;
        if (i) {
          if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceCanChallenge(i)) {
            if (RoleController_1.RoleController.IsInRoleTrial()) {
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("TrialRoleDungeonsLimit");
            } else {
              ModelManager_1.ModelManager.EditBattleTeamModel.InstanceMultiEnter = false;
              const n = ModelManager_1.ModelManager.PowerModel.IsPowerEnough(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstancePowerCost(this.NUe));
              var t;
              var e;
              if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceLevelTooLow(this.NUe)) {
                (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(200)).FunctionMap.set(2, () => {
                  if (n) {
                    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId = i;
                    InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.ContinueEntranceFlow();
                  } else {
                    this.Bsa();
                  }
                });
                t.FunctionMap.set(1, () => {
                  this.Bli();
                });
                e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetUnlockCondition(i);
                t.SetTextArgs(e[1].toString());
                ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
              } else if (n) {
                ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId = i;
                InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.ContinueEntranceFlow();
              } else {
                this.Bsa();
              }
            }
          } else {
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("InstanceDungeonLackChallengeTimes");
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("InstanceDungeon", 16, "副本入口界面点击挑战错误，当前未选择副本");
        }
      }
    };
    this.ulh = () => {
      this.Qli();
      this.J9a();
    };
    this.clh = () => {
      if (this.Cli) {
        for (let t = 0; t < this.Cli.GetScrollItemCount(); t++) {
          this.Cli?.GetScrollItemFromIndex(t)?.UpdateSelf();
        }
      }
      if (this.z9a?.RefreshOnTick) {
        this.z9a.RefreshOnTick();
      }
    };
    this.Bli = () => {
      this.UiViewSequence.StopSequenceByKey("Popup");
      this.UiViewSequence.PlaySequencePurely("Popup", false, true);
    };
  }
  get NUe() {
    return this.Ghi;
  }
  set NUe(t) {
    var e;
    var i;
    if (this.Ghi === 0) {
      this.OZa = true;
    } else {
      e = (i = ConfigManager_1.ConfigManager.InstanceDungeonConfig).GetConfig(this.Ghi);
      i = i.GetConfig(t);
      if (e && i) {
        this.OZa = e.BannerPath !== i.BannerPath;
      }
    }
    this.Ghi = t;
  }
  get GZa() {
    return this.OZa;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIDynScrollViewComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UITexture], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.Fq();
    this.o1i();
    this.e7a();
    await this.t7a();
    await this.i7a();
  }
  OnStart() {
    this.Qli();
    this.J9a();
  }
  OnBeforeShow() {
    this.mQa();
  }
  OnAfterShow() {
    if (!this.rli || this.rli.length <= 0) {
      this.GetItem(2).SetUIActive(false);
    }
  }
  OnBeforeDestroy() {
    this.r7a();
    this.o7a();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnClickEnterInstanceSingle, this.Z9a);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnNeedRefreshByProtocol, this.ulh);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnClickEnterInstanceSingle, this.Z9a);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnNeedRefreshByProtocol, this.ulh);
  }
  OnTick(t) {
    this._lh -= t;
    if (!(this._lh > 0)) {
      this.clh();
      this._lh = 2000;
    }
  }
  Fq() {
    var e;
    var i;
    var t;
    this.tli = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId;
    for ([e, i] of ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetSortedByTitleEntranceInstanceIdList(this.tli)) {
      let t = this.nli.get(i);
      if (!t) {
        t = [];
        this.nli.set(i, t);
      }
      t.push(e);
    }
    for ([, t] of this.nli) {
      for (const n of t) {
        this.rli.push(n);
      }
    }
  }
  o7a() {
    this.rli.length = 0;
    this.nli.clear();
    this.sli.clear();
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId = 0;
  }
  r7a() {
    this.Cli?.ClearChildren();
    this.Cli = undefined;
  }
  e7a() {
    var t = new CommonTabComponentData_1.CommonTabComponentData(this.fqe, this.pqe, this.yqe);
    var e = this.GetItem(6);
    this.lqe = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(e, t, this.Awe);
    this.lqe.SetTabRootActive(false);
    const i = ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(this.tli);
    this.lqe.SetTitleByTextIdAndArgNew(i.Name);
    this.lqe.SetTitleIcon(i.TitleSprite);
    this.lqe.SetHelpButtonCallBack(() => {
      HelpController_1.HelpController.OpenHelpById(i.HelpButtonId);
    });
  }
  async t7a() {
    var t = new DynScrollView_1.DynamicScrollView(this.GetUIDynScrollViewComponent(0), this.GetItem(1), new InstanceDetectDynamicItem_1.InstanceDetectDynamicItem(), this.Lli);
    await t.Init();
    this.Cli = t;
  }
  async i7a() {
    var t = InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.CreateInstanceSubViewByType(this.tli);
    if (t !== undefined) {
      await t.CreateThenShowByResourceIdAsync(t.ResourceId, this.GetItem(5));
      this.z9a = t;
    }
  }
  mQa() {
    var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(this.NUe);
    if (t && this.GZa) {
      this.SetTextureByPath(t.BannerPath, this.GetTexture(3));
      this.UiViewSequence?.StopSequenceByKey("Switch");
      this.UiViewSequence?.PlaySequence("Switch");
    }
  }
  Qli() {
    var t = this.Uli();
    this.Cli?.RefreshByData(t);
    this.Cli?.BindLateUpdate(() => {
      var t = this.Cli?.GetScrollItemCount();
      if (t !== undefined) {
        if (!(this.dli + 1 < t)) {
          this.Cli?.ScrollToItemIndex(this.dli);
        }
        this.Cli?.UnBindLateUpdate();
      }
    });
  }
  J9a() {
    this.z9a?.RefreshExternalAsync();
  }
  Uli() {
    this.dli = 0;
    var t = [];
    let e = -1;
    this.o1i();
    var i;
    var n;
    var s = this.sli.size === 1;
    let o = false;
    for ([i, n] of this.nli) {
      var r = i === this.ili;
      var a = this.sli.get(i) === 1;
      for (const _ of n) {
        if (e !== i && !s || e !== i && s && a) {
          var h = new InstanceDungeonData_1.InstanceDetectionDynamicData();
          h.InstanceSeriesTitle = i;
          h.InstanceGirdId = _;
          h.IsSelect = r;
          h.IsOnlyOneGrid = a;
          e = i;
          t.push(h);
          if (!o) {
            this.dli++;
          }
          if (s && a) {
            break;
          }
        }
        if (!!r && !a && !((h = new InstanceDungeonData_1.InstanceDetectionDynamicData()).InstanceGirdId = _, h.IsSelect = _ === (this.NUe ?? 0), h.IsShow = r, t.push(h), o = !!h.IsSelect || o)) {
          this.dli++;
        }
      }
    }
    return t;
  }
  o1i() {
    let t = 0;
    let e = 0;
    let i = 0;
    this.sli.clear();
    var n;
    var s;
    var o;
    var r;
    var a;
    var h = !!this.NUe;
    for ([n, s] of this.nli) {
      e = e || n;
      this.sli.set(n, s.length);
      if (!h) {
        for (const _ of s) {
          if (!this.ili || n === this.ili) {
            t = t || _;
            if ((o = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(_)) && _ > this.NUe && (r = ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(_), a = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(_, ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel), o) && !r && a > i) {
              this.NUe = _;
              this.ili = n;
              i = a;
            }
          }
        }
      }
    }
    this.NUe ||= t;
    this.ili ||= e;
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId = this.NUe;
  }
  m5a() {
    return !(this.c5a > TimeUtil_1.TimeUtil.GetServerTimeStamp()) || !(Log_1.Log.CheckDebug() && Log_1.Log.Debug("InstanceDungeon", 5, "不允许短时间内触发多次进入副本的按钮"), 1);
  }
  Bsa() {
    const t = this.NUe;
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(35);
    e.FunctionMap.set(2, () => {
      this.Bli();
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId = t;
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.ContinueEntranceFlow();
    });
    e.FunctionMap.set(1, () => {
      this.Bli();
    });
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
  }
}
exports.InstanceDungeonEntranceRootView = InstanceDungeonEntranceRootView;
//# sourceMappingURL=InstanceDungeonEntranceRootView.js.map