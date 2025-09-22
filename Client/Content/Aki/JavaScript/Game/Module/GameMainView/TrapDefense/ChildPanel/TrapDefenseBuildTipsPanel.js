"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBuildTipsPanel = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const BattleChildViewPanel_1 = require("../../../BattleUi/Views/BattleChildViewPanel/BattleChildViewPanel");
const TowerDefenseEventController_1 = require("../../../TowerDefenseEvent/TowerDefenseEventController");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const TrapDefenseRecyclePriceItem_1 = require("../ChildItem/TrapDefenseRecyclePriceItem");
const TrapDefenseBattleDefine_1 = require("../TrapDefenseBattleDefine");
const cannotPlaceTextMap = {
  [1]: "TowerDefense_Battle_Groundonly",
  2: "TowerDefense_Battle_Wallonly",
  4: "TowerDefense_Battle_Toponly"
};
class TrapDefenseBuildTipsPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments);
    this.IsInSelectBuild = false;
    this.NeedShowBtnSequence = false;
    this.E9 = 0;
    this.zju = false;
    this.sJc = undefined;
    this.aJc = undefined;
    this.hJc = 0;
    this.Hvd = undefined;
    this.Sequence = undefined;
    this.CostNumText = undefined;
    this.EnoughItem = undefined;
    this.NotEnoughItem = undefined;
    this.vK1 = e => {
      if (e === "CloseTip") {
        this.GetItem(4)?.SetUIActive(false);
      } else if (e === "CloseDisable") {
        this.GetItem(3)?.SetUIActive(false);
      } else if (e === "CloseWarn") {
        this.sJc?.SetUIActive(false);
      }
    };
    this.x6u = (e, t) => {
      if (this.ljc && t === 0) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("TowerDefenseBattle", 10, "触发旋转机关");
        }
        TowerDefenseEventController_1.TowerDefenseEventController.ExecuteRotateTrap();
      }
    };
    this.D6u = (e, t) => {
      if (this.X$u && t === 0) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("TowerDefenseBattle", 10, "触发回收机关");
        }
        TowerDefenseEventController_1.TowerDefenseEventController.ExecuteUnOccupyTrap();
      }
    };
  }
  get Y$u() {
    return (this.E9 & 1) > 0 && this.IsInSelectBuild;
  }
  get X$u() {
    return (this.E9 & 4) > 0;
  }
  get kJu() {
    return (this.E9 & 8) > 0 && this.IsInSelectBuild;
  }
  get ljc() {
    return (this.E9 & 2) > 0 && this.Y$u;
  }
  get sWc() {
    return (this.E9 & 16) > 0 && this.IsInSelectBuild;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UITexture], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIText]];
  }
  async InitializeAsync() {
    var e;
    if (!Info_1.Info.IsInTouch()) {
      e = this.GetItem(2);
      this.Hvd = new TrapDefenseRecyclePriceItem_1.TrapDefenseRecyclePriceItem();
      await this.Hvd.CreateThenShowByResourceIdAsync("UiItem_CoinItem", e);
    }
    this.CostNumText = this.GetText(5);
    this.EnoughItem = this.GetItem(7);
    this.NotEnoughItem = this.GetItem(8);
  }
  InitializeTemp() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.Sequence.BindOnEndSequenceEvent(this.vK1);
    this.E9 = TowerDefenseEventController_1.TowerDefenseEventController.BuildTipsType;
    this.sJc = this.GetItem(9);
    this.aJc = this.GetText(10);
    this._Oe();
    this.uzc();
    this.GetItem(4)?.SetUIActive(false);
  }
  OnShowBattleChildViewPanel(e) {
    this.HQa();
  }
  OnHideBattleChildViewPanel() {
    this.jQa();
  }
  OnTickBattleChildViewPanel(e) {
    if (this.lJc()) {
      this.uzc();
    }
    this.nGd();
  }
  OnBeforeDestroy() {
    this.Sequence.Clear();
  }
  HQa() {
    if (!this.zju) {
      ControllerHolder_1.ControllerHolder.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.塔防旋转, this.x6u);
      ControllerHolder_1.ControllerHolder.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.塔防回收机关, this.D6u);
      this.zju = true;
    }
  }
  jQa() {
    if (this.zju) {
      ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.塔防旋转, this.x6u);
      ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.塔防回收机关, this.D6u);
      this.zju = false;
    }
  }
  _Oe() {
    var e;
    this.Znd();
    this.OJu();
    if (Info_1.Info.IsInTouch()) {
      this.GetItem(1)?.SetUIActive(false);
      this.GetItem(2)?.SetUIActive(false);
      this.GetItem(0)?.SetUIActive(false);
      this.NeedShowBtnSequence = false;
    } else {
      e = this.esd();
      this.GetItem(1)?.SetUIActive(this.ljc);
      this.GetItem(2)?.SetUIActive(this.X$u);
      this.GetItem(0)?.SetUIActive(e);
      if ((e = this.ljc || this.X$u || e) !== this.NeedShowBtnSequence) {
        this.NeedShowBtnSequence = e;
        this.tsd(e);
      }
    }
  }
  u7u(e) {
    if (this.E9 !== e) {
      this.E9 = e;
      this._Oe();
    }
  }
  esd() {
    return !Info_1.Info.IsInTouch() && !!this.Y$u && (!this.kJu || ModelManager_1.ModelManager.TrapDefenseModel.BattleData.IsPurificationItemEnough);
  }
  tsd(e) {
    if (e) {
      this.Sequence.StopSequenceByKey("CloseBtn", false, true);
      this.Sequence.PlaySequencePurely("StartBtn");
    } else {
      this.Sequence.StopSequenceByKey("StartBtn", false, true);
      this.Sequence.PlaySequencePurely("CloseBtn");
    }
  }
  OJu() {
    var e;
    var t = this.GetItem(4);
    var i = this.GetTexture(6);
    if (this.kJu) {
      this.nGd();
      if ((e = ModelManager_1.ModelManager.TrapDefenseModel?.BattleInventoryData.GetItemData(TrapDefenseBattleDefine_1.TRAPDEFENSE_PURIFICATION_ID)) && e.Icon) {
        this.SetTextureByPath(e.Icon, i);
      }
      this.Sequence.StopSequenceByKey("CloseTip", false, true);
      this.Sequence.PlayOrReplaySequenceByName("StartTip");
      t?.SetUIActive(true);
    } else {
      this.Sequence.StopSequenceByKey("StartTip", false, true);
      this.Sequence.PlayOrReplaySequenceByName("CloseTip");
    }
  }
  nGd() {
    var e;
    var t;
    var i;
    if (this.kJu) {
      e = (i = ModelManager_1.ModelManager.TrapDefenseModel.BattleData).IsPurificationItemEnough;
      t = i.GetCurrentPurificationItemCount();
      i = i.GetPurificationItemConsume();
      this.EnoughItem.SetUIActive(e);
      this.NotEnoughItem.SetUIActive(!e);
      if (e) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.CostNumText, "TowerDefense_Main_BdCostGreen_Text", t, i);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.CostNumText, "TowerDefense_Main_BdCostRed_Text", t, i);
      }
    }
  }
  Znd() {
    var e = this.GetItem(3);
    if (this.sWc) {
      e?.SetUIActive(true);
      this.Sequence.StopSequenceByKey("CloseDisable", false, true);
      this.Sequence.PlaySequencePurely("StartDisable");
    } else {
      this.Sequence.StopSequenceByKey("StartDisable", false, true);
      this.Sequence.PlaySequencePurely("CloseDisable");
    }
  }
  uzc() {
    var e;
    if (this.hJc === 1 || this.hJc === 0 || this.hJc === 7) {
      this.Sequence.StopSequenceByKey("StartWarn", false, true);
      this.Sequence.PlaySequencePurely("CloseWarn");
    } else {
      if (this.hJc === 2 || this.hJc === 3 || this.hJc === 4) {
        e = TowerDefenseEventController_1.TowerDefenseEventController.RaycastResult;
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.aJc, cannotPlaceTextMap[e.PlacementType]);
      } else if (this.hJc === 5) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.aJc, "TowerDefense_Battle_Numlimit");
      } else if (this.hJc === 6) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.aJc, "TowerDefense_Battle_Coinlimit");
      }
      this.sJc?.SetUIActive(true);
      this.Sequence.StopSequenceByKey("CloseWarn", false, true);
      this.Sequence.PlaySequencePurely("StartWarn");
    }
  }
  lJc() {
    let e = 0;
    var t;
    if (this.sWc) {
      if ((t = TowerDefenseEventController_1.TowerDefenseEventController.RaycastResult).IsInvalidPlacement) {
        if (t.PlacementType === 1) {
          e = 2;
        } else if (t.PlacementType === 2) {
          e = 3;
        } else if (t.PlacementType === 4) {
          e = 4;
        }
      } else {
        e = ModelManager_1.ModelManager.TowerDefenseEventModel.HasPlaceToBuildTrap() ? TowerDefenseEventController_1.TowerDefenseEventController.IsEnoughGoldToBuildTrap() ? 1 : 6 : 5;
      }
    } else if (!this.IsInSelectBuild) {
      e = 7;
    }
    return e !== this.hJc && (this.hJc = e, true);
  }
  SetRecyclePrice(e) {
    if (this.Hvd) {
      this.Hvd.UpdatePrice(e);
    }
  }
  SetTipsType(e) {
    this.u7u(e);
  }
  ResetCannotMode() {
    this.hJc = 0;
  }
  SetIsInSelectBuild(e) {
    this.IsInSelectBuild = e;
    this._Oe();
  }
}
exports.TrapDefenseBuildTipsPanel = TrapDefenseBuildTipsPanel;
//# sourceMappingURL=TrapDefenseBuildTipsPanel.js.map