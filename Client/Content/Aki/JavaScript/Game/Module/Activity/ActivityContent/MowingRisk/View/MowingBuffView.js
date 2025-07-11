"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MowingBuffView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../../../Ui/Base/UiAsyncTask");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const MowingRiskDefine_1 = require("../MowingRiskDefine");
const MowingBuffOverview_1 = require("./MowingBuffOverview");
const MowingBuffProgress_1 = require("./MowingBuffProgress");
class MowingBuffView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.M9a = undefined;
    this.S9a = undefined;
    this.Kda = undefined;
    this.y9a = () => {
      this.CloseMe();
    };
    this.E9a = () => {
      var e = new UiAsyncTask_1.UiAsyncTask("MowingBuffView.RefreshTab", async () => {
        await this.A6_();
      });
      this.RunAsyncTask(e);
    };
    this.L9a = () => {
      var e = new UiAsyncTask_1.UiAsyncTask("MowingBuffView.RefreshTab", async () => {
        await this.P6_();
      });
      this.RunAsyncTask(e);
    };
    this.A9a = () => {
      var e = ModelManager_1.ModelManager.MowingRiskModel;
      if (e.CurrentBuffViewType !== 1) {
        e = e.BuildOverviewViewData();
        this.M9a.RefreshByCustomDataAsync(e);
      }
    };
    this.D9a = () => {
      var e = ModelManager_1.ModelManager.MowingRiskModel;
      if (e.CurrentBuffViewType !== 0) {
        e = e.BuildProgressViewData();
        this.S9a?.RefreshByCustomData(e);
      }
    };
    this.X$a = () => ModelManager_1.ModelManager.MowingRiskModel.CurrentBuffViewType !== 0;
    this.Y$a = () => ModelManager_1.ModelManager.MowingRiskModel.CurrentBuffViewType !== 1;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIExtendToggle], [2, UE.UIExtendToggle], [3, UE.UIItem]];
    this.BtnBindInfo = [[1, this.E9a], [2, this.L9a]];
  }
  async OnBeforeStartAsync() {
    ModelManager_1.ModelManager.MowingRiskModel.CurrentBuffViewUsage = this.OpenParam;
    var e = this.R9a();
    await Promise.all(e);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MowingBasicBuffGridItemClick, this.A9a);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MowingSuperBuffGridItemClick, this.D9a);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MowingBasicBuffGridItemClick, this.A9a);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MowingSuperBuffGridItemClick, this.D9a);
  }
  OnStart() {
    this.cQa();
    this.I9a();
    this.T9a(false);
    this.z$a();
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.MowingRiskModel.ResetBuffViewCache();
    this.J$a();
  }
  async A6_() {
    var e = ModelManager_1.ModelManager.MowingRiskModel;
    if (e.CurrentBuffViewType !== 0) {
      e.CurrentBuffViewType = 0;
      this.I9a();
      await this.x6_(true);
    }
  }
  async P6_() {
    var e = ModelManager_1.ModelManager.MowingRiskModel;
    if (e.CurrentBuffViewType !== 1) {
      e.CurrentBuffViewType = 1;
      this.I9a();
      await this.x6_(true);
    }
  }
  R9a() {
    var e = [];
    e.push(this.U9a());
    e.push(this.x9a());
    if (ModelManager_1.ModelManager.MowingRiskModel.CurrentBuffViewUsage === 1) {
      e.push(this.P9a());
    }
    return e;
  }
  async U9a() {
    var e = new MowingBuffOverview_1.MowingBuffOverview();
    await e.CreateByResourceIdAsync(MowingRiskDefine_1.MOWING_BUFF_OVERVIEW_RESOURCE_ID, this.GetItem(3));
    this.M9a = e;
  }
  async P9a() {
    var e = new MowingBuffProgress_1.MowingBuffProgress();
    await e.CreateByResourceIdAsync(MowingRiskDefine_1.MOWING_BUFF_PROGRESS_RESOURCE_ID, this.GetItem(3));
    this.S9a = e;
  }
  async x9a() {
    var e = new PopupCaptionItem_1.PopupCaptionItem();
    await e.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    e.SetCloseCallBack(this.y9a);
    e.SetHelpBtnActive(false);
    this.Kda = e;
  }
  cQa() {
    var e = ModelManager_1.ModelManager.MowingRiskModel.BuildCaptionViewData();
    this.Kda.SetTitleByTextIdAndArgNew(e.TitleTextId);
    this.Kda.SetTitleIcon(e.IconPath);
  }
  I9a() {
    var e;
    var i = this.GetExtendToggle(1);
    var t = this.GetExtendToggle(2);
    if (ModelManager_1.ModelManager.MowingRiskModel.CurrentBuffViewUsage === 0) {
      i.RootUIComp.SetUIActive(true);
      t.RootUIComp.SetUIActive(false);
      i.SetToggleState(1, false);
      i.IsSelfInteractive = false;
    } else {
      e = ModelManager_1.ModelManager.MowingRiskModel.CurrentBuffViewType;
      i.RootUIComp.SetActive(true);
      t.RootUIComp.SetActive(true);
      if (e === 0) {
        i.SetToggleStateForce(1, false);
        t.SetToggleStateForce(0, false);
      } else {
        i.SetToggleStateForce(0, false);
        t.SetToggleStateForce(1, false);
      }
    }
  }
  T9a(e) {
    var i = new UiAsyncTask_1.UiAsyncTask("MowingBuffView.RefreshTab", async () => {
      await this.x6_(e);
    });
    this.RunAsyncTask(i);
  }
  async x6_(e) {
    await Promise.all([this.w9a(e), this.B9a(e)]);
  }
  async w9a(e) {
    var i = ModelManager_1.ModelManager.MowingRiskModel;
    if (i.CurrentBuffViewType !== 0) {
      this.M9a.SetUiActive(false);
    } else {
      this.M9a.SetUiActive(true);
      i = i.BuildOverviewViewData();
      await this.M9a.RefreshByCustomDataAsync(i);
      await this.M9a.ShowAsync();
      if (e) {
        await this.M9a.PlayStartSequenceAsync();
      }
      if (ModelManager_1.ModelManager.MowingRiskModel.CurrentBuffViewUsage === 1) {
        this.M9a.PlayUnlockSequenceAsync();
      }
    }
  }
  async B9a(e) {
    var i;
    if (this.S9a !== undefined) {
      if ((i = ModelManager_1.ModelManager.MowingRiskModel).CurrentBuffViewType !== 1) {
        this.S9a.SetUiActive(false);
      } else {
        this.S9a.SetUiActive(true);
        i = i.BuildProgressViewData();
        this.S9a.RefreshByCustomData(i);
        await this.S9a.ShowAsync();
        if (e) {
          await this.S9a.PlayStartSequenceAsync();
        }
        await this.S9a.PlayProgressTween();
      }
    }
  }
  z$a() {
    var e = this.GetExtendToggle(1);
    var i = this.GetExtendToggle(2);
    e.CanExecuteChange.Bind(this.X$a);
    i.CanExecuteChange.Bind(this.Y$a);
  }
  J$a() {
    var e = this.GetExtendToggle(1);
    var i = this.GetExtendToggle(2);
    e.CanExecuteChange.Unbind();
    i.CanExecuteChange.Unbind();
  }
}
exports.MowingBuffView = MowingBuffView;
//# sourceMappingURL=MowingBuffView.js.map