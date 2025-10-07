"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotographSetupView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const ConfigCommon_1 = require("../../../../Core/Config/ConfigCommon");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const PhotographController_1 = require("../PhotographController");
const PhotographDefine_1 = require("../PhotographDefine");
const PhotoFilterItem_1 = require("./PhotoFilterItem");
const PhotoFilterToggleItem_1 = require("./PhotoFilterToggleItem");
const PhotographExpressionItem_1 = require("./PhotographExpressionItem");
const PhotographOptionSetup_1 = require("./PhotographOptionSetup");
const PhotographTab_1 = require("./PhotographTab");
const PhotographValueSetup_1 = require("./PhotographValueSetup");
class PhotographSetupView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.qKi = new Set();
    this.GKi = new Map();
    this.M1_ = new Map();
    this.E1_ = undefined;
    this.c4_ = undefined;
    this.PhotoSetupMode = undefined;
    this.NKi = undefined;
    this.OKi = undefined;
    this.I1_ = undefined;
    this.UiScrollView = undefined;
    this.kKi = new Map();
    this.Xva = undefined;
    this.FKi = new Map();
    this.Vgt = () => {
      this.CloseMe();
    };
    this.oHe = () => {
      this.VKi(0);
    };
    this.HKi = () => {
      this.VKi(1);
    };
    this.jKi = () => {
      this.VKi(2);
    };
    this.T1_ = () => {
      if (LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FilterRedPoint, true)) {
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FilterRedPoint, false);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotFilter);
        this.c4_?.RefreshRedDot();
      }
      this.VKi(3);
    };
    this.moc = i => {
      this.UiScrollView.OnLateUpdate.Bind(t => {
        TimerSystem_1.GameplayTimerSystem.Next(() => {
          var t = (0, puerts_1.$ref)(new UE.Vector2D(this.UiScrollView.ContentUIItem.RelativeLocation));
          this.UiScrollView.StopMovement();
          this.UiScrollView.ScrollToBottom(t, i.GetRootItem());
        });
        if (this.UiScrollView?.IsValid()) {
          this.UiScrollView.OnLateUpdate.Unbind();
        }
      });
    };
    this.WKi = () => {
      var t = this.GKi.get(0);
      if (t) {
        this.OKi?.SetSelected(false);
        this.OKi = t;
        this.OKi.SetSelected(true);
      }
    };
    this.KKi = (t, i) => {
      if (i) {
        this.QKi(t);
      } else {
        this.XKi(t);
      }
    };
    this.TKi = t => this.OKi !== t;
    this.$Ki = (t, i) => {
      if (i) {
        this.YKi(t);
      } else {
        this.JKi(t);
      }
    };
    this.zKi = t => {
      this.ZKi();
      this.eQi();
    };
    this.b1_ = (t, i = false) => {
      for (const h of this.M1_.values()) {
        var e;
        if (t) {
          h.ShowFilterItem();
          e = ModelManager_1.ModelManager.PhotographModel.GetPhotographFilter();
          if (h.GetPhotoFilterId() === e) {
            this.I1_ = h;
          }
        } else {
          h.PlayDisappearSequence(i);
        }
      }
      var s;
      if (t && i) {
        this.Xva?.Play("SwitchIn");
      }
      if (t && !this.I1_ && (s = this.M1_.get(PhotographDefine_1.DEFAULT_FILTER_CONFIGID))) {
        ModelManager_1.ModelManager.PhotographModel?.SetPhotographFilter(s.GetPhotoFilterId());
        this.I1_ = s;
      }
    };
    this.A1_ = (t, i) => {
      if (i) {
        this.L1_(t);
      }
    };
    this.S1_ = () => {
      if (this.I1_) {
        this.I1_.SetSelected(false);
        this.I1_ = undefined;
        ModelManager_1.ModelManager.PhotographModel.ClearSelectedPhotographFilter();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIExtendToggle], [2, UE.UIExtendToggle], [9, UE.UIExtendToggle], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [10, UE.UIItem], [7, UE.UIButtonComponent], [8, UE.UIItem], [11, UE.UIItem], [12, UE.UIScrollViewWithScrollbarComponent]];
    this.BtnBindInfo = [[0, this.HKi], [1, this.oHe], [2, this.jKi], [9, this.T1_], [7, this.Vgt]];
  }
  async OnBeforeStartAsync() {
    this.tQi();
    await this.iQi();
    await this.oQi();
    await this.rQi();
    await this.R1_();
  }
  OnStart() {
    this.Xva = this.GetItem(3).GetOwner().GetComponentByClass(UE.UIInturnAnimController.StaticClass());
    this.nQi(this.OpenParam ?? 1, true, true);
    this.eQi();
    this.UiScrollView = this.GetScrollViewWithScrollbar(12);
  }
  OnBeforeDestroy() {
    this.sQi();
    this.aQi();
    this.hQi();
    this.P1_();
    this.FKi.clear();
    this.FKi = undefined;
    this.c4_.Destroy();
    this.E1_.Destroy();
  }
  OnAfterShow() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhotographSetUpViewVisibleChanged, true);
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhotographSetUpViewVisibleChanged, false);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnResetPhotographCamera, this.WKi);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnResetPhotographCamera, this.WKi);
  }
  SetPanelVisible(t) {
    this.GetItem(11).SetUIActive(t);
  }
  tQi() {
    var t = this.GetExtendToggle(0);
    var i = this.GetExtendToggle(1);
    var e = this.GetExtendToggle(2);
    var s = this.GetExtendToggle(9);
    i?.RootUIComp.SetUIActive(false);
    e?.RootUIComp.SetUIActive(false);
    this.GetItem(10).SetUIActive(false);
    this.FKi.set(1, t);
    this.FKi.set(0, i);
    this.FKi.set(2, e);
    this.FKi.set(3, s);
  }
  VKi(e) {
    this.FKi.forEach((t, i) => {
      if (i !== e) {
        t.SetToggleStateForce(0, false);
      }
    });
    this.lQi(e);
  }
  nQi(t, i, e = false) {
    i = i ? 1 : 0;
    t = this.FKi.get(t);
    if (t) {
      t.SetToggleStateForce(i, e);
    }
  }
  lQi(t) {
    this.PhotoSetupMode = t;
    this._Qi(t === 1);
    this.uQi(t === 0);
    this.cQi(t === 2);
    this.w1_(t === 3);
  }
  async iQi() {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(0).GetSkinId();
    var i = PhotographController_1.PhotographController.GetRoleMainAnimInstanceType();
    var t = ConfigCommon_1.ConfigCommon.ToList(ConfigManager_1.ConfigManager.PhotographConfig.GetPhotoMontageConfigListBySkinIdAndMainAnim(t, i));
    if (t) {
      t.sort((t, i) => t.Sort - i.Sort);
      var i = this.GetItem(4);
      i.SetUIActive(true);
      var e = [];
      for (const s of t) {
        if (s.MotionType === 1) {
          e.push(this.mQi(s.Id));
        }
      }
      await Promise.all(e);
      i.SetUIActive(false);
      if (this.qKi.size !== 0) {
        this.FKi.get(0)?.RootUIComp.SetUIActive(true);
      }
    }
  }
  async mQi(t) {
    var i = this.GetItem(3);
    var e = this.GetItem(4);
    var e = LguiUtil_1.LguiUtil.DuplicateActor(e.GetOwner(), i);
    var i = new PhotographExpressionItem_1.PhotographExpressionItem();
    await i.CreateByActorAsync(e);
    i.Refresh(t);
    i.BindOnSelected(this.KKi);
    this.qKi.add(i);
  }
  aQi() {
    for (const t of this.qKi) {
      t.Destroy();
    }
    this.qKi.clear();
    this.NKi = undefined;
  }
  uQi(t) {
    for (const i of this.qKi) {
      i.SetActive(t);
    }
    this.Xva?.Play("Start03");
  }
  QKi(t) {
    if (this.NKi) {
      this.NKi.SetSelected(false);
    }
    var i = t.GetPhotoMontageId();
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    PhotographController_1.PhotographController.PlayPhotoMontage(e, i);
    this.NKi = t;
    this.NKi.SetSelected(true);
    this.moc(this.NKi);
  }
  XKi(t) {
    if (this.NKi === t) {
      PhotographController_1.PhotographController.ResetPhotoMontage();
      this.NKi = undefined;
    }
  }
  eQi() {
    var t = ModelManager_1.ModelManager.PhotographModel.MontageId;
    var t = this.GKi.get(t);
    if (this.OKi !== t) {
      if (this.OKi) {
        this.OKi.SetSelected(false);
      }
      this.OKi = t;
      this.OKi?.SetSelected(true);
    }
  }
  async rQi() {
    var t = [];
    var i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(0).GetSkinId();
    t.push(this.dQi());
    var e = PhotographController_1.PhotographController.GetRoleMainAnimInstanceType();
    var i = ConfigCommon_1.ConfigCommon.ToList(ConfigManager_1.ConfigManager.PhotographConfig.GetPhotoMontageConfigListBySkinIdAndMainAnim(i, e));
    if (i) {
      i.sort((t, i) => t.Sort - i.Sort);
      e = this.GetItem(4);
      e.SetUIActive(true);
      for (const s of i) {
        if (s.MotionType === 0) {
          t.push(this.CQi(s.Id));
        }
      }
      await Promise.all(t);
      e.SetUIActive(false);
      if (this.GKi.size !== 0) {
        this.FKi.get(2)?.RootUIComp.SetUIActive(true);
      }
    }
  }
  async dQi() {
    var t = new PhotographExpressionItem_1.PhotographExpressionItem();
    await t.CreateByActorAsync(this.GetItem(8).GetOwner());
    t.Refresh(0);
    t.BindOnSelected(this.$Ki);
    t.BindOnCanExecuteChange(this.TKi);
    t.SetUiActive(false);
    this.GKi.set(0, t);
  }
  async CQi(t) {
    var i = this.GetItem(3);
    var e = this.GetItem(4);
    var e = LguiUtil_1.LguiUtil.DuplicateActor(e.GetOwner(), i);
    var i = new PhotographExpressionItem_1.PhotographExpressionItem();
    await i.CreateByActorAsync(e);
    i.Refresh(t);
    i.BindOnSelected(this.$Ki);
    i.BindOnCanExecuteChange(this.TKi);
    this.GKi.set(t, i);
  }
  cQi(t) {
    for (const i of this.GKi.values()) {
      i.SetActive(t);
    }
  }
  sQi() {
    for (const t of this.GKi.values()) {
      t.Destroy();
    }
    this.GKi.clear();
    this.OKi = undefined;
  }
  YKi(t) {
    if (this.OKi) {
      this.OKi.SetSelected(false);
    }
    var i;
    var e = t.GetPhotoMontageId();
    if (e === 0) {
      PhotographController_1.PhotographController.ResetPhotoMontage();
    } else {
      i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
      PhotographController_1.PhotographController.PlayPhotoMontage(i, e);
    }
    this.OKi = t;
    this.OKi.SetSelected(true);
    this.moc(this.OKi);
  }
  JKi(t) {
    if (this.OKi === t) {
      PhotographController_1.PhotographController.ResetPhotoMontage();
      this.OKi = undefined;
    }
  }
  async oQi() {
    var t = ConfigManager_1.ConfigManager.PhotographConfig.GetAllPhotoSetupConfig();
    var i = this.GetItem(5);
    var e = this.GetItem(6);
    i.SetUIActive(true);
    e.SetUIActive(true);
    var s = [];
    for (const h of t) {
      if (h.ValueType !== 2 || PhotographController_1.PhotographController.GetRoleMainAnimInstanceType() === 0) {
        s.push(this.gQi(h.ValueType, h.Type));
      }
    }
    await Promise.all(s);
    i.SetUIActive(false);
    e.SetUIActive(false);
  }
  async gQi(t, i) {
    var e = this.GetItem(3);
    let s = undefined;
    switch (i) {
      case 0:
        var h = this.GetItem(5);
        var h = LguiUtil_1.LguiUtil.DuplicateActor(h.GetOwner(), e);
        await (s = new PhotographOptionSetup_1.PhotographOptionSetup()).CreateThenShowByActorAsync(h);
        s.Initialize(t);
        s.BindOnIndexChanged(this.zKi);
        break;
      case 1:
        h = this.GetItem(6);
        h = LguiUtil_1.LguiUtil.DuplicateActor(h.GetOwner(), e);
        await (s = new PhotographValueSetup_1.PhotographValueSetup()).CreateThenShowByActorAsync(h);
        s.Initialize(t);
    }
    this.kKi.set(t, s);
  }
  fQi(t) {
    return this.kKi.get(t);
  }
  hQi() {
    for (const t of this.kKi.values()) {
      t.Destroy();
    }
    this.kKi.clear();
  }
  _Qi(t) {
    for (const i of this.kKi.values()) {
      i.SetActive(t);
    }
    if (t) {
      this.ZKi();
    }
  }
  ZKi() {
    for (const o of this.kKi.values()) {
      o.SetEnable(true);
    }
    var t;
    var i;
    var e = ModelManager_1.ModelManager.PhotographModel.GetAllPhotographOption();
    var s = ConfigManager_1.ConfigManager.PhotographConfig;
    for ([t, i] of e) {
      var h = s.GetPhotoSetupConfig(t);
      if (h.Type === 0) {
        h = h.SubOptions.get(i);
        if (h) {
          for (const r of h.ArrayInt) {
            this.fQi(r).SetEnable(false);
          }
        }
      }
    }
  }
  async R1_() {
    var t = [];
    this.c4_ = new PhotographTab_1.PhotographTab();
    t.push(this.c4_.CreateThenShowByActorAsync(this.GetExtendToggle(9).GetOwner()));
    var i = this.GetItem(3);
    var e = this.GetItem(5);
    var e = LguiUtil_1.LguiUtil.DuplicateActor(e.GetOwner(), i);
    var i = new PhotoFilterToggleItem_1.PhotoFilterToggleItem();
    t.push(i.CreateThenShowByActorAsync(e));
    i.Initialize();
    i.BindSetSubOptionVisible(this.b1_);
    i.BindDeselectOnFilterItem(this.S1_);
    this.E1_ = i;
    var e = ConfigManager_1.ConfigManager.PhotographConfig.GetAllPhotoFilterConfig();
    for (const s of e) {
      t.push(this.U1_(s.Id));
    }
    await Promise.all(t);
  }
  async U1_(t) {
    var i = this.GetItem(3);
    var e = this.GetItem(10);
    var e = LguiUtil_1.LguiUtil.DuplicateActor(e.GetOwner(), i);
    var i = new PhotoFilterItem_1.PhotoFilterItem();
    await i.CreateByActorAsync(e);
    i.Refresh(t);
    i.BindOnSelected(this.A1_);
    i.BindScrollToSelectedItem(this.moc);
    this.M1_.set(t, i);
  }
  P1_() {
    for (const t of this.M1_.values()) {
      t.Destroy();
    }
    this.M1_.clear();
    this.I1_ = undefined;
  }
  w1_(t) {
    this.E1_.SetActive(t);
    if (t) {
      this.Xva?.Play("Start02");
    } else {
      this.b1_(false);
    }
  }
  L1_(t) {
    if (this.I1_) {
      this.I1_.SetSelected(false);
    }
    this.I1_ = t;
    this.I1_.SetSelected(true);
    this.moc(this.I1_);
  }
}
exports.PhotographSetupView = PhotographSetupView;
//# sourceMappingURL=PhotographSetupView.js.map