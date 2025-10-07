"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestTreeMainView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const LogReportDefine_1 = require("../../../LogReport/LogReportDefine");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const QuestTreeDefine_1 = require("../../QuestTreeDefine");
const QuestTreeChapterGroupItem_1 = require("./QuestTreeChapterGroupItem");
const BG_MOVEMENT_RATE = 0.2;
class QuestTreeMainView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.Ayd = undefined;
    this.Qyi = undefined;
    this.Dyd = 0;
    this.GXd = false;
    this.Ga_ = e => {
      var r = this.GetHorizontalLayout(4)?.GetRootComponent()?.GetAnchorOffsetX() ?? 0;
      var i = r - this.Dyd;
      this.Dyd = r;
      var r = this.GetScrollViewWithScrollbar(0)?.ContentUIItem;
      var t = r?.GetAnchorOffsetX() ?? 0;
      r?.SetAnchorOffsetX(t + i * BG_MOVEMENT_RATE);
    };
    this.Lqd = () => {
      var e = ModelManager_1.ModelManager.QuestTreeModel.GetAllAcceptableNodeList();
      if (e.length !== 0) {
        ControllerHolder_1.ControllerHolder.QuestTreeController.OpenAvailableListView(e);
      }
    };
    this.Pqd = () => {
      var e = ModelManager_1.ModelManager.QuestTreeModel.GetCurTrackingChapterData();
      if (e) {
        ModelManager_1.ModelManager.QuestTreeModel.ViewModelMain.LocateNode(e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIHorizontalLayout], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent]];
    this.BtnBindInfo = [[6, this.Lqd], [7, this.Pqd]];
  }
  async OnBeforeStartAsync() {
    var e = this.GetScrollViewWithScrollbar(3);
    this.Ayd = new GenericScrollViewNew_1.GenericScrollViewNew(e, () => new QuestTreeChapterGroupItem_1.QuestTreeChapterGroupItem(), this.GetItem(5).GetOwner(), true);
    await this.Ayd.RefreshByDataAsync(ModelManager_1.ModelManager.QuestTreeModel.ViewModelMain.GetViewDataList());
    var e = [];
    this.Qyi = new PopupCaptionItem_1.PopupCaptionItem();
    e.push(this.Qyi.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()));
    this.Qyi.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.Qyi.SetHelpCallBack(() => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(QuestTreeDefine_1.QUEST_TREE_HELP_ID);
    });
    var r = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    var r = r === 0 ? ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_TaskTreeMainBgRoleNv") : ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_TaskTreeMainBgRoleNan");
    e.push(this.SetTextureAsync(r, this.GetTexture(1)));
    await Promise.all(e);
  }
  OnStart() {
    var e = this.GetScrollViewWithScrollbar(3);
    e.OnScrollValueChange.Bind(this.Ga_);
    this.GetScrollViewWithScrollbar(0).SetCanScroll(false);
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelMain.InitLocatingHelper(e);
    this.GetButton(6).GetRootComponent().SetUIActive(false);
    this.PXd();
    var e = new LogReportDefine_1.QuestTreeEnterLogEvent();
    ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
  }
  OnBeforeShow() {
    this.GXd = true;
    this.Ayd.RefreshByData(ModelManager_1.ModelManager.QuestTreeModel.ViewModelMain.GetViewDataList());
    this.PXd();
  }
  OnAfterShow() {
    this.FXd(true);
    this.GXd = false;
  }
  OnBeforeDestroy() {
    this.GetScrollViewWithScrollbar(3).OnScrollValueChange.Unbind();
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelMain.SetShouldLocateToDefaultNode(true);
    ModelManager_1.ModelManager.QuestTreeModel.ViewModelMain.OnViewClose();
  }
  OnTick(e) {
    if (this.GXd) {
      this.FXd(false);
    }
  }
  PXd() {
    this.GetButton(7).GetRootComponent().SetUIActive(ModelManager_1.ModelManager.QuestTreeModel.GetCurTrackingChapterData() !== undefined);
  }
  FXd(e = true) {
    var r = ModelManager_1.ModelManager.QuestTreeModel.ViewModelMain.GetDefaultLocatingNode();
    if (r && ModelManager_1.ModelManager.QuestTreeModel.ViewModelMain.ShouldLocateToDefaultNode) {
      ModelManager_1.ModelManager.QuestTreeModel.ViewModelMain.LocateNode(r, e);
    }
  }
}
exports.QuestTreeMainView = QuestTreeMainView;
//# sourceMappingURL=QuestTreeMainView.js.map