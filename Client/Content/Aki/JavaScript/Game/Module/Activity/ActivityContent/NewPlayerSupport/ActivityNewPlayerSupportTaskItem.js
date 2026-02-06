"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityNewPlayerSupportTaskItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const FunctionController_1 = require("../../../Functional/FunctionController");
const RoleUtils_1 = require("../../../RoleUi/RoleUtils");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const ActivityControllerHolder_1 = require("../../ActivityControllerHolder");
const ActivityNewPlayerSupportDefine_1 = require("./ActivityNewPlayerSupportDefine");
class ActivityNewPlayerSupportTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.H3e = undefined;
    this.T2o = () => {
      var t;
      if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10023)) {
        FunctionController_1.FunctionController.OpenFunctionRelateView(10023);
      } else {
        t = ActivityControllerHolder_1.ActivityControllerHolder.ActivityNewPlayerSupportController.ActivityData?.GetFirstUnFinishMainQuestId();
        UiManager_1.UiManager.OpenView("QuestView", t);
      }
    };
    this.Zqf = () => {
      var t = this.Pe.TaskData;
      if (t.CanReceiveReward()) {
        ActivityControllerHolder_1.ActivityControllerHolder.ActivityNewPlayerSupportController?.RequestRewardTask(t.Id, true);
      }
    };
    this.sa_ = () => {
      var t = this.Pe.TaskData.TaskConfig.TrialRoleGroupId;
      ActivityControllerHolder_1.ActivityControllerHolder.ActivityNewPlayerSupportController.OpenTrialRoleView(t);
    };
    this.I_1 = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UITexture], [5, UE.UISprite], [6, UE.UIVerticalLayout], [7, UE.UIItem], [8, UE.UIButtonComponent], [9, UE.UIButtonComponent], [10, UE.UIItem], [11, UE.UIButtonComponent], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem]];
    this.BtnBindInfo = [[9, this.T2o], [8, this.Zqf], [11, this.sa_]];
  }
  OnStart() {
    this.H3e = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(6), this.I_1);
  }
  Refresh(t, e, i) {
    this.Pe = t;
    this.j6a();
    this.eOf();
  }
  j6a() {
    var t = this.Pe.TaskData;
    const e = t.IsTaskReceived();
    var i = t.CanReceiveReward();
    this.GetButton(9).RootUIComp.SetUIActive(t.IsTaskRunning());
    this.GetButton(8).RootUIComp.SetUIActive(t.CanReceiveReward());
    this.GetItem(10).SetUIActive(e);
    this.GetItem(2).SetUIActive(i);
    this.GetItem(1).SetUIActive(!i);
    var i = t.GetRewardList();
    this.H3e?.RefreshByData(i, () => {
      for (const t of this.H3e.GetLayoutItemList()) {
        t.SetReceivedVisible(e);
      }
    });
  }
  eOf() {
    var t = this.Pe.TaskData;
    var e = t.IsTaskReceived();
    var i = t.CanReceiveReward();
    var r = t.GetTaskTarget();
    var o = this.GetText(3);
    o.SetText(r.toString());
    var r = i ? ActivityNewPlayerSupportDefine_1.finishTaskTextColor : ActivityNewPlayerSupportDefine_1.normalTaskTextColor;
    o.SetColor(r);
    var o = this.Pe.ShowDecoration;
    this.GetItem(12).SetUIActive(!e);
    this.GetItem(13).SetUIActive(e);
    this.GetItem(14).SetUIActive(!e && o);
    this.GetItem(15).SetUIActive(e && o);
    this.GetItem(16).SetUIActive(!i);
    this.GetItem(17).SetUIActive(i);
    var r = t.TaskConfig;
    var e = r.TrialRoleGroupId;
    var o = ConfigManager_1.ConfigManager.TrialRoleConfig.GetTrialRoleConfigsByGroupId(e);
    if (o && (i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(o[0].ParentId))) {
      this.SetRoleIcon(i.RoleHeadIconCircle, this.GetTexture(4), i.Id);
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(RoleUtils_1.RoleUtils.GetTrialRoleLabelIconByType(2));
      this.SetSpriteByPath(t, this.GetSprite(5), false);
    }
  }
  GetReceiveBtn() {
    return this.GetButton(8)?.RootUIComp;
  }
}
exports.ActivityNewPlayerSupportTaskItem = ActivityNewPlayerSupportTaskItem;
//# sourceMappingURL=ActivityNewPlayerSupportTaskItem.js.map