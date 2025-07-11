"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchDungeonSelectRightPanel = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const FloroRanchDefine_1 = require("../FloroRanchDefine");
const FloroRanchDifficultyItem_1 = require("./Item/FloroRanchDifficultyItem");
const FloroRanchRaceItem_1 = require("./Item/FloroRanchRaceItem");
class FloroRanchDungeonSelectRightPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.gAu = undefined;
    this.CAu = undefined;
    this.TDe = undefined;
    this.pAu = undefined;
    this.FEu = undefined;
    this.OnSelectDifficultyCallBack = undefined;
    this.vAu = e => {
      this.CAu = e;
      this.OnSelectDifficultyCallBack?.(e.Id);
      this.pAu.SelectGridProxyByKey(e.Id);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "Farm_DungeonTarget", e.GetMaxStage(), e.GetStageDay());
      this.GetText(3)?.SetText(e.FirstReward.toString());
      this.GetText(4)?.SetText(e.AgainReward.toString());
      this.GetItem(11)?.SetUIActive(e.AgainReward !== 0);
      e = ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchTagConfig(e.TagId);
      if (e) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.Name);
      }
      this.RefreshRaceList(this.CAu.SelectedRaceIds);
    };
    this.yAu = () => {
      var e = new FloroRanchDifficultyItem_1.FloroRanchDifficultyItem();
      e.SetToggleCallBack(this.vAu);
      return e;
    };
    this.SAu = () => {
      return new FloroRanchRaceItem_1.FloroRanchRaceItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIHorizontalLayout], [0, UE.UIText], [1, UE.UIHorizontalLayout], [9, UE.UIHorizontalLayout], [6, UE.UIItem], [7, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [10, UE.UIItem], [11, UE.UIItem]];
  }
  OnStart() {
    this.pAu = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), this.yAu);
    this.FEu = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(9), this.SAu);
    var e = {
      UiText: this.GetText(5),
      ViewType: 1,
      AttachDirection: 1,
      AttachItem: this.GetRootItem(),
      Style: 2,
      ReportType: 8
    };
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlinkByParam(e);
  }
  RefreshDungeonInfo(e, i) {
    this.gAu = e;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.GetDungeonName());
    this.GetItem(6)?.SetUIActive(!e.IsUnLock);
    this.GetItem(10)?.SetUIActive(e.IsUnLock);
    if (e.IsUnLock) {
      const t = e.GetSubDungeonData();
      this.pAu.DeselectCurrentGridProxy();
      this.pAu.RefreshByData(t, () => {
        var e = i ?? t[0];
        this.vAu(e);
      });
    } else {
      this.eeu();
      this.kot();
    }
  }
  RefreshRaceList(e) {
    var i = [];
    for (const t of e) {
      i.push(new FloroRanchDefine_1.FloroRanchSelectRaceData(t, this.CAu));
    }
    this.FEu.RefreshByData(i);
  }
  eeu() {
    var e;
    if (!this.gAu.IsUnLock) {
      if (this.gAu.IsReachUnlockTime()) {
        this.xHe();
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), "Farm_DungeonLock");
      } else {
        e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Farm_DungeonUnlockTime");
        e = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(this.gAu.UnlockTime, e) ?? "";
        this.GetText(7)?.SetText(e);
      }
    } else {
      this.xHe();
      this.RefreshDungeonInfo(this.gAu);
    }
  }
  OnBeforeDestroy() {
    this.xHe();
    ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(this.GetText(5));
  }
  kot() {
    this.xHe();
    this.TDe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      this.eeu();
    }, 1000);
  }
  xHe() {
    if (this.TDe !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
}
exports.FloroRanchDungeonSelectRightPanel = FloroRanchDungeonSelectRightPanel;
//# sourceMappingURL=FloroRanchDungeonSelectRightPanel.js.map