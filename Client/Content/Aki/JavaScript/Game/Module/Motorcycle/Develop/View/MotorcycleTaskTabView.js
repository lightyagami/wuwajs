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
    this.xmf = undefined;
    this.emf = 0;
    this.Bmf = () => {
      new UiAsyncTask_1.UiAsyncTask("TabUpdate", async () => {
        await this.kmf();
      }).Run();
    };
    this.pqe = e => {
      var t = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetActivatedTreeTypeList();
      this.emf = t[e];
      ModelManager_1.ModelManager.MotorcycleDevelopModel.UpdateSelectedTreeType(this.emf);
      this._Xa();
      this.OZs();
      var t = ModelManager_1.ModelManager.MotorcycleDevelopModel.RedDotHasNewTechTree(this.emf);
      if (t) {
        ModelManager_1.ModelManager.MotorcycleDevelopModel.UpdateTechTreeNewUnlocked(this.emf, false);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDevelopTreeTypeRedDotUpdate);
      }
    };
    this.qmf = (e, t) => new MotorcycleTreeTypeTabItem_1.MotorcycleTreeTypeTabItem();
    this.ou_ = () => new MotorcycleTaskItem_1.MotorcycleTaskItem();
    this.kWm = () => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(MotorcycleDevelopDefine_1.MOTORCYCLE_DEVELOP_HELP_TASK);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UIButtonComponent], [5, UE.UISprite], [6, UE.UIHorizontalLayout], [7, UE.UIItem], [8, UE.UITexture]];
    this.BtnBindInfo = [[4, this.kWm]];
  }
  OnStart() {
    this.Ivt = new TabComponent_1.TabComponent(this.GetHorizontalLayout(6).RootUIComp, this.qmf, this.pqe, this.GetItem(7));
    var e = this.GetLoopScrollViewComponent(0);
    var t = this.GetItem(1).GetOwner();
    this.xmf = new LoopScrollView_1.LoopScrollView(e, t, this.ou_, true);
  }
  OnBeforeShow() {
    this.GetLoopScrollViewComponent(0).Content.GetComponentByClass(UE.UIInturnAnimController.StaticClass())?.Play();
    this.emf = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetSelectedTreeType();
    if (this.emf === 0) {
      this.emf = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetCurTreeType();
    }
    this.kmf();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MotorDevelopTaskUpdate, this.Bmf);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MotorDevelopTaskUpdate, this.Bmf);
  }
  async kmf() {
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
      if (r[e].TreeType === this.emf) {
        o = e;
        break;
      }
    }
    this.Ivt.SelectToggleByIndex(o, true);
  }
  _Xa() {
    const e = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetTaskListByTree(this.emf);
    new UiAsyncTask_1.UiAsyncTask("TaskListUpdate", async () => {
      await this.xmf.RefreshByDataAsync(e, false);
    }).Run();
  }
  OZs() {
    var e;
    var t;
    var i;
    var r;
    var o = ConfigManager_1.ConfigManager.MotorConfig.GetMotorTechTreeConfig(this.emf);
    if (o) {
      r = (i = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetCostPointByTree(this.emf) + (e = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetFreePointByTree(this.emf))) / (t = ModelManager_1.ModelManager.MotorcycleDevelopModel.GetTotalPointByTree(this.emf));
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
      t = (e = this.xmf?.UnsafeGetGridProxy(e))?.GetBtnGet();
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