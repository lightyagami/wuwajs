"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleTaskTabView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const TabComponent_1 = require("../../../Common/TabComponent/TabComponent");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const MotorcycleTaskItem_1 = require("../Item/MotorcycleTaskItem");
const MotorcycleDevelopDefine_1 = require("../MotorcycleDevelopDefine");
const MotorcycleTreeTypeTabItem_1 = require("../TabItem/MotorcycleTreeTypeTabItem");
class MotorcycleTaskTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.Ivt = undefined;
    this.qcf = undefined;
    this.rcf = 0;
    this.Ocf = () => {
      new UiAsyncTask_1.UiAsyncTask("TabUpdate", async () => {
        await this.Gcf();
      }).Run();
    };
    this.pqe = e => {
      var t = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetActivatedTreeTypeList();
      this.rcf = t[e];
      this._Xa();
      this.OZs();
      var t = ModelManager_1.ModelManager.MotorcycleDevelopModel.RedDotHasNewTechTree(this.rcf);
      if (t) {
        ModelManager_1.ModelManager.MotorcycleDevelopModel.UpdateTechTreeNewUnlocked(this.rcf, false);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDevelopTreeTypeRedDotUpdate);
      }
    };
    this.Fcf = (e, t) => new MotorcycleTreeTypeTabItem_1.MotorcycleTreeTypeTabItem();
    this.ou_ = () => new MotorcycleTaskItem_1.MotorcycleTaskItem();
    this.Ojm = () => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(MotorcycleDevelopDefine_1.MOTORCYCLE_DEVELOP_HELP_TASK);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UIButtonComponent], [5, UE.UISprite], [6, UE.UIHorizontalLayout], [7, UE.UIItem], [8, UE.UITexture]];
    this.BtnBindInfo = [[4, this.Ojm]];
  }
  OnStart() {
    this.Ivt = new TabComponent_1.TabComponent(this.GetHorizontalLayout(6).RootUIComp, this.Fcf, this.pqe, this.GetItem(7));
    var e = this.GetLoopScrollViewComponent(0);
    var t = this.GetItem(1).GetOwner();
    this.qcf = new LoopScrollView_1.LoopScrollView(e, t, this.ou_, true);
    this.rcf = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetCurTreeType();
  }
  OnBeforeShow() {
    this.GetLoopScrollViewComponent(0).Content.GetComponentByClass(UE.UIInturnAnimController.StaticClass())?.Play();
    this.Gcf();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MotorDevelopTaskUpdate, this.Ocf);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MotorDevelopTaskUpdate, this.Ocf);
  }
  async Gcf() {
    var e;
    var t;
    var i = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetActivatedTreeTypeList();
    const r = [];
    i.forEach(e => {
      var t = new MotorcycleTreeTypeTabItem_1.MotorcycleTreeTypeTabItemData();
      t.IsFinish = false;
      t.TreeType = e;
      r.push(t);
    });
    await this.Ivt.RefreshTabItemAsync(r);
    for ([e, t] of this.Ivt.GetTabItemMap()) {
      t.BindRedDot("MotorcycleTreeTypeTaskTab", r[e].TreeType);
    }
    let o = 0;
    for (let e = 0; e < r.length; e++) {
      if (r[e].TreeType === this.rcf) {
        o = e;
        break;
      }
    }
    this.Ivt.SelectToggleByIndex(o, true);
  }
  _Xa() {
    const e = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetTaskListByTree(this.rcf);
    new UiAsyncTask_1.UiAsyncTask("TaskListUpdate", async () => {
      await this.qcf.RefreshByDataAsync(e, false);
    }).Run();
  }
  OZs() {
    var e;
    var t;
    var i;
    var r;
    var o = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechTreeConfig(this.rcf);
    if (o) {
      r = (i = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetCostPointByTree(this.rcf) + (e = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetFreePointByTree(this.rcf))) / (t = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetTotalPointByTree(this.rcf));
      o = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(o.TpItemId).Icon;
      this.GetSprite(5).SetFillAmount(r);
      this.GetText(2).SetText(i + "/" + t);
      this.SetTextureByPath(o, this.GetTexture(8));
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "MotorBike_TechCube_CurrentAvailable", e);
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t;
    var i;
    if (e[0].includes("Reward")) {
      e = Number(e[1]);
      t = (e = this.qcf?.UnsafeGetGridProxy(e))?.GetBtnGet();
      i = e?.GetNavigationItem();
      if (e) {
        return [t, i];
      } else {
        return undefined;
      }
    }
  }
}
exports.MotorcycleTaskTabView = MotorcycleTaskTabView;
//# sourceMappingURL=MotorcycleTaskTabView.js.map