"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskBranchLineModule = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../../../Ui/UiManager");
const ConfirmBoxController_1 = require("../../../../../ConfirmBox/ConfirmBoxController");
const ConfirmBoxDefine_1 = require("../../../../../ConfirmBox/ConfirmBoxDefine");
const ScrollingTipsController_1 = require("../../../../../ScrollingTips/ScrollingTipsController");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../../../Util/ScrollView/GenericScrollViewNew");
const MoonChasingController_1 = require("../MoonChasingController");
class BranchLineItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.TAn = () => {
      var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(this.Pe.TaskId);
      if (e === 0) {
        this.jpa(this.Pe.JumpBuildingId);
      } else if (e === 1) {
        ControllerHolder_1.ControllerHolder.QuestNewController.TryTrackAndOpenWorldMap(this.Pe.TaskId);
      } else if (e === 2) {
        UiManager_1.UiManager.OpenView("QuestView", this.Pe.TaskId);
      }
      if (ModelManager_1.ModelManager.MoonChasingModel.ReadQuestIdUnlockFlag(this.Pe.TaskId)) {
        this.BNe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem], [4, UE.UIItem], [3, UE.UIButtonComponent], [5, UE.UITexture]];
    this.BtnBindInfo = [[3, this.TAn]];
  }
  OnBeforeShow() {
    this.BNe();
  }
  jpa(e) {
    if (ModelManager_1.ModelManager.QuestNewModel.GetQuestState(this.Pe.TaskId) === 3) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("MoonChasingTaskJumpToBuildingFinish");
    } else if (e <= 0) {
      const r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(204);
      ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(r);
    } else {
      const r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(198);
      var i = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(e);
      var i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Name);
      r.SetTextArgs(i);
      r.FunctionMap.set(2, () => {
        MoonChasingController_1.MoonChasingController.OpenBuildingTipsInfoView(e);
      });
      ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(r);
    }
  }
  P5e() {
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestConfig(this.Pe.TaskId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.TidName);
  }
  _Oe() {
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(this.Pe.TaskId);
    this.GetItem(2).SetUIActive(e === 0);
    if (e === 0) {
      this.GetTexture(5).SetColor(UE.Color.FromHex("#8C836DFF"));
    } else {
      this.GetTexture(5).SetColor(UE.Color.FromHex("#FFFFFFFF"));
    }
    this.GetItem(1).SetUIActive(e === 3);
  }
  Aqe() {
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetEntrustRoleById(this.Pe.AssociateRole);
    this.SetTextureByPath(e.HeadIcon, this.GetTexture(5));
  }
  BNe() {
    var e;
    if (this.Pe) {
      e = ModelManager_1.ModelManager.MoonChasingModel.CheckQuestIdRedDotState(this.Pe.TaskId);
      this.GetItem(4).SetUIActive(e);
    }
  }
  Refresh(e, i, r) {
    this.Pe = e;
    this._Oe();
    this.Aqe();
    this.P5e();
    this.BNe();
  }
  GetKey(e, i) {
    return e.Id;
  }
}
class TaskBranchLineModule extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.qUt = undefined;
    this.Jva = 0;
    this.tue = [];
    this.Lbt = true;
    this.DAn = () => new BranchLineItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.qUt = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(0), this.DAn, this.GetItem(1).GetOwner());
    var e = ConfigManager_1.ConfigManager.TaskConfig.GetAllBranchLineTask();
    this.tue = [...e];
    await this.qUt.RefreshByDataAsync(this.tue.sort((e, i) => {
      var r = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e.TaskId);
      var t = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(i.TaskId);
      if (r === 2 && t !== 2) {
        return -1;
      } else if (r !== 2 && t === 2) {
        return 1;
      } else if (r === 0 && t !== 0) {
        return -1;
      } else if (r !== 0 && t === 0) {
        return 1;
      } else {
        return e.TaskId - i.TaskId;
      }
    }));
  }
  OnBeforeShow() {
    this.qUt.BindLateUpdate(e => {
      if (this.Lbt) {
        this.Lbt = false;
      } else {
        if (this.Jva !== 0) {
          this.qUt.ScrollToLeft(this.Jva);
        }
        this.qUt.UnBindLateUpdate();
      }
    });
  }
  SetSelectTaskId(e) {
    this.Jva = e;
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (this.qUt !== undefined) {
      let i = undefined;
      if (e.length > 1) {
        let e = -1;
        var r;
        var t;
        for ([r, t] of ConfigManager_1.ConfigManager.TaskConfig.GetAllBranchLineTask().entries()) {
          if (ModelManager_1.ModelManager.QuestNewModel.GetQuestState(t.TaskId) === 1) {
            e = r;
            break;
          }
        }
        if (e < 0) {
          return;
        }
        i = this.qUt.GetScrollItemByIndex(e);
      } else {
        i = this.qUt.GetScrollItemByIndex(0);
      }
      if (i !== undefined) {
        return [e = i.GetRootItem(), e];
      }
    }
  }
}
exports.TaskBranchLineModule = TaskBranchLineModule;
//# sourceMappingURL=TaskBranchLineModule.js.map