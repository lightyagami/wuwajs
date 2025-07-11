"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BabelTowerDeTermSelectItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class BabelTowerDeTermSelectItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.woc = undefined;
    this.Roc = undefined;
    this.zji = undefined;
    this.Aoc = false;
    this.Poc = 0;
    this.sGe = () => {
      var e = new DeTermItem();
      e.OnClickToggleCallBack = this.ZBl;
      e.CanClickCallBack = this.xoc;
      return e;
    };
    this.ZBl = (e, t) => {
      this.zji?.SetToggleState(0);
      this.zji = t;
      if (e === 0) {
        t = {
          State: 0,
          SelectIndex: ModelManager_1.ModelManager.BabelTowerModel.DeTermSelectIndex++
        };
        ModelManager_1.ModelManager.BabelTowerModel.DeTermSelectInfo.set(this.Poc, t);
      } else {
        t = {
          State: 0,
          SelectIndex: ModelManager_1.ModelManager.BabelTowerModel.DeTermSelectIndex++
        };
        ModelManager_1.ModelManager.BabelTowerModel.DeTermSelectInfo.set(this.Poc, t);
        t = {
          State: 2,
          SelectIndex: ModelManager_1.ModelManager.BabelTowerModel.DeTermSelectIndex++
        };
        ModelManager_1.ModelManager.BabelTowerModel.DeTermSelectInfo.set(e, t);
      }
      this.xMc();
      this.Poc = e;
      this.woc?.(e);
    };
    this.xoc = () => {
      var e = !this.Aoc;
      if (!e) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("BabelTowerNecessaryDeTerm");
      }
      return e;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIItem], [2, UE.UIGridLayout], [3, UE.UIItem]];
  }
  OnStart() {
    this.Roc = new GenericLayout_1.GenericLayout(this.GetGridLayout(2), this.sGe);
  }
  Refresh(i, e, t) {
    this.Aoc = i.IsNecessary;
    this.GetItem(1).SetUIActive(i.IsNecessary);
    this.woc = i.OnChangeSelectDeTerm;
    this.Roc?.RefreshByData(i.AllDeTerm, () => {
      for (const t of this.Roc.GetLayoutItemList()) {
        var e = ModelManager_1.ModelManager.BabelTowerModel.DeTermSelectInfo.get(t.DeTermId);
        if (e?.State === 1) {
          t.SetToggleState(2);
        }
        if (e?.State === 2 || e?.State === 3) {
          this.Poc = t.DeTermId;
          this.zji = t.GetDeTermToggle();
          t.SetToggleState(1);
        }
        if (e?.State === 0) {
          t.SetToggleState(0);
        }
        t.SetDailyQuestItem(t.DeTermId !== 0 && i.DailyDeTerm.includes(t.DeTermId));
      }
      if (this.zji) {
        this.xMc();
      }
    });
  }
  PlayPositionSequence(e) {
    for (const t of this.Roc.GetLayoutItemList()) {
      if (t.DeTermId === e) {
        t.PlayPositionSequence();
      }
    }
  }
  xMc() {
    for (const t of this.Roc.GetLayoutItemList()) {
      var e = ModelManager_1.ModelManager.BabelTowerModel.DeTermSelectInfo.get(t.DeTermId);
      t.UseChangeColor(e?.State === 0 && this.zji !== undefined);
    }
  }
  ClearSelect() {
    this.zji = undefined;
    this.Poc = 0;
    this.xMc();
  }
}
exports.BabelTowerDeTermSelectItem = BabelTowerDeTermSelectItem;
class DeTermItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.DeTermId = 0;
    this.OnClickToggleCallBack = undefined;
    this.CanClickCallBack = undefined;
    this.SPe = undefined;
    this.LRc = undefined;
    this.kqe = e => {
      if (e === 1) {
        this.OnClickToggleCallBack?.(this.DeTermId, this.GetExtendToggle(2));
      } else {
        this.OnClickToggleCallBack?.(0, undefined);
      }
    };
    this.yMa = () => {
      var e = {
        IsDeTerm: true,
        ConfigId: this.DeTermId,
        ShowWays: true
      };
      UiManager_1.UiManager.OpenView("BabelTowerItemInfoView", e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UISprite], [2, UE.UIExtendToggle], [4, UE.UIItem]];
    this.BtnBindInfo = [[2, this.kqe]];
  }
  async OnBeforeStartAsync() {
    this.LRc = new DeTermDailyQuestItem();
    await this.LRc.CreateByActorAsync(this.GetItem(4).GetOwner());
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.GetExtendToggle(2).CanExecuteChange.Bind(() => !this.CanClickCallBack || this.CanClickCallBack());
    this.GetExtendToggle(2).OnUndeterminedClicked.Add(this.yMa);
  }
  Refresh(e, t, i) {
    if (e <= 0) {
      this.GetExtendToggle(2).RootUIComp.SetUIActive(false);
    } else {
      this.DeTermId = e;
      this.GetExtendToggle(2).RootUIComp.SetUIActive(true);
      e = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerDeTerm(e).Texture;
      this.SetTextureByPath(e, this.GetTexture(0));
    }
  }
  SetToggleState(e) {
    this.GetExtendToggle(2).SetToggleStateForce(e);
  }
  UseChangeColor(e) {
    this.GetSprite(1).SetChangeColor(e, this.GetSprite(1).changeColor);
    this.GetTexture(0).SetChangeColor(e, this.GetTexture(0).changeColor);
  }
  PlayPositionSequence() {
    this.SPe?.StopCurrentSequence();
    this.SPe?.PlayLevelSequenceByName("Once_ComBuff");
  }
  SetDailyQuestItem(e) {
    this.LRc.SetUiActive(e);
  }
  GetDeTermToggle() {
    return this.GetExtendToggle(2);
  }
}
class DeTermDailyQuestItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIText], [0, UE.UISprite]];
  }
  OnStart() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "ScratchCard_TaskType_01");
  }
}
//# sourceMappingURL=BabelTowerDeTermSelectItem.js.map