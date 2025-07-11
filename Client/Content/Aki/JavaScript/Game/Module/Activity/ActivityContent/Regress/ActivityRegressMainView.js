"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressMainView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const CommonTabComponentData_1 = require("../../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../../Common/TabComponent/CommonTabTitleData");
const CommonTabItemBase_1 = require("../../../Common/TabComponent/TabItem/CommonTabItemBase");
const ActivityRegressAreaSubView_1 = require("./Area/ActivityRegressAreaSubView");
const ActivityRegressMainLineSubView_1 = require("./MainLine/ActivityRegressMainLineSubView");
const ActivityRegressMainCaptionListPanel_1 = require("./Panels/ActivityRegressMainCaptionListPanel");
const ActivityRegressTabItemPanel_1 = require("./Panels/ActivityRegressTabItemPanel");
const ActivityRegressRoleSubView_1 = require("./Role/ActivityRegressRoleSubView");
const ActivityRegressSignInSubView_1 = require("./SignIn/ActivityRegressSignInSubView");
class ActivityRegressMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.GOe = undefined;
    this._da = new Map();
    this.uda = undefined;
    this.cda = undefined;
    this.dda = undefined;
    this.TDe = undefined;
    this.lBa = false;
    this.kOe = () => {
      if (!ModelManager_1.ModelManager.ActivityRegressModel.CheckIfInShowTime) {
        this.CloseMe();
      }
    };
    this.itt = () => {
      this.Og();
    };
    this.jdi = (e, i) => {
      return new ActivityRegressTabItemPanel_1.ActivityRegressTabItemPanel();
    };
    this.zno = e => {
      if (this.lBa) {
        this.lBa = false;
      } else {
        this.mda(e);
      }
    };
    this.yqe = e => {
      var e = this.dda[e];
      var i = e.Title;
      var e = this.CTa(e.EntryType);
      var e = e !== undefined ? ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e) : "";
      return new CommonTabData_1.CommonTabData(e, new CommonTabTitleData_1.CommonTabTitleData(i));
    };
    this.QCa = (t, a) => {
      var s = this.fda(this.uda);
      if (a === s) {
        let e = "";
        switch (a) {
          case 0:
          case 1:
            e = this.KCa(t);
            break;
          case 2:
            var r = t.GachaId;
            var r = ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewInfo(r);
            e = r ? r.UnderBgTexturePath : ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_CircumfluenceSignInBg");
            break;
          default:
            e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_CircumfluenceSignInBg");
        }
        let i = undefined;
        (a === 2 ? (i = this.GetTexture(3), this.GetTexture(1)) : (i = this.GetTexture(1), this.GetTexture(3))).SetUIActive(false);
        s = !StringUtils_1.StringUtils.IsEmpty(e);
        i.SetUIActive(s);
        if (s) {
          this.SetTextureByPath(e, i);
        }
        this.UiViewSequence.StopSequenceByKey("Switch");
        this.PlaySequenceAsync("Switch", true);
      }
    };
    this.Ifa = () => {
      var e = ModelManager_1.ModelManager.ActivityRegressModel.EntryEndTimeStamp;
      if (e !== undefined && e - TimeUtil_1.TimeUtil.GetServerTimeStamp() <= 0 && (this.Lfa(), this.Tfa(), ModelManager_1.ModelManager.ActivityRegressModel.IsRegressEntrance(this.uda))) {
        this.cda.SelectToggleByIndex(0);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UITexture]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    var i = ModelManager_1.ModelManager.ActivityRegressModel.IsRegressEntrance(e);
    await this.sso();
    if (i) {
      if (e === 3) {
        this.lBa = true;
        this.cda.SelectToggleByIndex(2, undefined, true);
        await this.mda(e, 1);
      } else {
        this.cda.SelectToggleByIndex(e, true);
      }
    } else {
      await this.mda(e);
    }
    this.cda.SetPnlListUiActive(i);
  }
  OnBeforeShow() {
    var e;
    var i = this.fda(this.uda);
    var i = this._da.get(i);
    if (i) {
      e = i.IsShowOrShowing;
      i.SetActive(true);
      if (!e) {
        this.UiViewSequence.StopSequenceByKey("Switch");
        this.PlaySequenceAsync("Switch", true);
        i.OnParentShow();
      }
    }
    this.GOe = TimerSystem_1.GameplayTimerSystem.Forever(this.kOe, TimeUtil_1.TimeUtil.InverseMillisecond);
  }
  jm() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.GOe)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.GOe);
      this.GOe = undefined;
    }
  }
  OnAfterHide() {
    this.jm();
    var e = this.fda(this.uda);
    var e = this._da.get(e);
    if (e) {
      e.SetActive(false);
    }
  }
  OnBeforeDestroy() {
    this.Cda();
    if (this.cda) {
      var e;
      for ([, e] of this.cda?.GetTabItemMap()) {
        e.Clear();
      }
      this.cda.Destroy();
      this.cda = undefined;
    }
    this.Lfa();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RecallActivityInfoUpdate, this.itt);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RecallActivityInfoUpdate, this.itt);
  }
  async gda(e, i) {
    const t = this.fda(e);
    if (!this._da.has(t)) {
      await this.vda(e).then(e => {
        if (e) {
          this._da.set(t, e);
        }
      });
    }
    e = this._da.get(t);
    await e.ShowAsync();
    e.Update(i);
  }
  async pda(e) {
    e = this.fda(e);
    if (this._da.has(e)) {
      await this._da.get(e).HideAsync();
    }
  }
  fda(e) {
    if (e === 2 || e === 3) {
      return 2;
    } else {
      return e;
    }
  }
  Cda() {
    this._da.forEach(e => {
      e.UnBindPassRecallBaseCallBack();
      e.CloseMeAsync();
    });
    this._da.clear();
  }
  async vda(e) {
    let i = undefined;
    var t = this.GetItem(2);
    switch (e) {
      case 4:
        await (i = new ActivityRegressSignInSubView_1.ActivityRegressSignInSubView()).CreateThenShowByResourceIdAsync("UiItem_CircumfluenceSignin", t);
        break;
      case 1:
        await (i = new ActivityRegressAreaSubView_1.ActivityRegressAreaSubView()).CreateThenShowByResourceIdAsync("UiItem_CircumfluenceArea", t);
        break;
      case 0:
        await (i = new ActivityRegressMainLineSubView_1.ActivityRegressMainLineSubView()).CreateThenShowByResourceIdAsync("UiItem_CircumfluenceArea", t);
        break;
      case 2:
      case 3:
        (i = new ActivityRegressRoleSubView_1.ActivityRegressRoleSubView()).OpenParam = 3;
        await i.CreateThenShowByResourceIdAsync("UiItem_CircumfluenceArea", t);
    }
    i.BindPassRecallBaseCallBack(this.QCa);
    return i;
  }
  async mda(e, i = 0) {
    if (e !== this.uda) {
      if (this.uda !== undefined) {
        await this.pda(this.uda);
      }
      await this.gda(e, i);
      this.uda = e;
      this.qEi();
    }
  }
  qEi() {
    let e = undefined;
    if (this.uda === 4) {
      e = "RecallActivity_Sign_Title";
    }
    var i = this.gTa();
    var i = i !== undefined ? ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i) : "";
    if (e) {
      this.cda.UpdateTitle(i, new CommonTabTitleData_1.CommonTabTitleData(e));
    }
  }
  CTa(e) {
    switch (e) {
      case 1:
        return "SP_CircumfluenceIconyeqianA";
      case 2:
        return "SP_CircumfluenceIconyeqianB";
      case 3:
      case 4:
        return "SP_FuncIconRoleC";
    }
  }
  gTa() {
    switch (this.uda) {
      case 0:
        return "SP_CircumfluenceIconyeqianA";
      case 1:
        return "SP_CircumfluenceIconyeqianB";
      case 2:
      case 3:
        return "SP_FuncIconRoleC";
    }
  }
  Og() {
    var e = this._da.get(this.uda);
    if (e) {
      e.Update();
    }
  }
  async sso() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(this.jdi, this.zno, this.yqe);
    this.dda = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetUnlockRegressEntryViewConfigList();
    this.cda = new ActivityRegressMainCaptionListPanel_1.ActivityRegressMainCaptionListPanel();
    var i = this.GetItem(0).GetOwner();
    this.cda.Init(e);
    await this.cda.CreateThenShowByActorAsync(i);
    await this.Tfa();
    this.cda.BindTabTitleCallBack(() => {
      UiManager_1.UiManager.CloseView("ActivityRegressMainView");
    });
  }
  async Tfa() {
    this.dda = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetUnlockRegressEntryViewConfigList();
    var i = new Array();
    let t = undefined;
    for (let e = 0; e < this.dda.length; e++) {
      var a = new CommonTabItemBase_1.CommonTabItemData();
      a.Index = e;
      a.Data = this.cda.GetTabComponentData(e);
      var s = this.dda[e];
      var [s, r] = ModelManager_1.ModelManager.ActivityRegressModel.CheckIfEntryOpen(s);
      if (s) {
        if (r !== undefined && r > 0) {
          t = t === undefined ? r : Math.min(r, t);
        }
        i.push(a);
      }
    }
    await this.cda.RefreshTabItemByDataAsync(i);
    if (t !== undefined && t > 0) {
      this.Lfa();
      ModelManager_1.ModelManager.ActivityRegressModel.EntryEndTimeStamp = TimeUtil_1.TimeUtil.GetServerTimeStamp() + t * TimeUtil_1.TimeUtil.InverseMillisecond;
      this.TDe = TimerSystem_1.RealTimeTimerSystem.Forever(this.Ifa, TimeUtil_1.TimeUtil.InverseMillisecond);
    } else {
      ModelManager_1.ModelManager.ActivityRegressModel.EntryEndTimeStamp = undefined;
    }
  }
  KCa(e) {
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    if (i === 1) {
      return e.BgPath;
    } else if (i === 0) {
      return e.BgPathF;
    } else {
      return "";
    }
  }
  Lfa() {
    if (this.TDe) {
      TimerSystem_1.RealTimeTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
    ModelManager_1.ModelManager.ActivityRegressModel.EntryEndTimeStamp = undefined;
  }
}
exports.ActivityRegressMainView = ActivityRegressMainView;
//# sourceMappingURL=ActivityRegressMainView.js.map