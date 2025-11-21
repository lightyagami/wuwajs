"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseResultInfoItem = exports.TrapDefensePauseView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
class TrapDefensePauseView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Layout = undefined;
    this.BtnBuff = undefined;
    this.BtnMonster = undefined;
    this.BtnSave = undefined;
    this.BtnEnd = undefined;
    this.I5t = () => {
      this.CloseMe();
    };
    this.wXu = () => {
      ModelManager_1.ModelManager.TrapDefenseModel.OpenViewKeySetting();
    };
    this.Os_ = () => {
      if (ModelManager_1.ModelManager.TrapDefenseModel.GetCurInstIsRogue()) {
        ModelManager_1.ModelManager.TrapDefenseModel.OpenViewBdSum();
      }
    };
    this.LXu = () => {
      ModelManager_1.ModelManager.TrapDefenseModel?.OpenViewMonster(undefined, 1);
    };
    this.AXu = () => {
      if (ModelManager_1.ModelManager.TrapDefenseModel.GetCurInstToLevelData().Config.IsCanSave) {
        ModelManager_1.ModelManager.TrapDefenseModel.NeedOpenMainView = true;
        ControllerHolder_1.ControllerHolder.TrapDefenseController.RequestTrapDefenseChallengeQuit(false);
      }
    };
    this.PXu = () => {
      ControllerHolder_1.ControllerHolder.TrapDefenseController.RequestTrapDefenseChallengeQuit(true).then(e => {
        if (e) {
          this.CloseMe();
        }
      });
    };
    this.Bqe = () => new TrapDefenseResultInfoItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIHorizontalLayout], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem]];
    this.BtnBindInfo = [[0, this.I5t], [1, this.wXu]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.BtnBuff = new TrapDefenseResultInfoBtn();
    this.BtnBuff.ClickCb = this.Os_;
    e.push(this.BtnBuff.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()));
    this.BtnMonster = new TrapDefenseResultInfoBtn();
    this.BtnMonster.ClickCb = this.LXu;
    e.push(this.BtnMonster.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()));
    this.BtnSave = new TrapDefenseResultInfoBtn();
    this.BtnSave.ClickCb = this.AXu;
    e.push(this.BtnSave.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()));
    this.BtnEnd = new TrapDefenseResultInfoBtn();
    this.BtnEnd.ClickCb = this.PXu;
    e.push(this.BtnEnd.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()));
    await Promise.all(e);
    this.BtnBuff.SetUiActive(ModelManager_1.ModelManager.TrapDefenseModel.GetCurInstIsRogue());
    var e = ModelManager_1.ModelManager.TrapDefenseModel.GetCurInstToLevelData();
    this.BtnSave.SetUiActive(e.Config.IsCanSave);
  }
  OnStart() {
    this.Layout = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.Bqe, this.GetItem(3).GetOwner());
    this.GetText(4)?.SetText("0");
    var e = [];
    e.push({
      Type: 0
    });
    e.push({
      Type: 1
    });
    this.Layout.RefreshByData(e, undefined, true);
    var e = ModelManager_1.ModelManager.TrapDefenseModel.GetCurInstToLevelData();
    var e = e.Config.NeedStarWhenPause;
    this.GetItem(9)?.SetUIActive(e);
    if (e) {
      ControllerHolder_1.ControllerHolder.TrapDefenseController.RequestTrapDefenseCurChallengeInfo().then(e => {
        this.GetText(4)?.SetText("" + e);
      });
    }
  }
  OnBeforeDestroy() {
    this.BtnBuff = undefined;
    this.BtnMonster = undefined;
    this.BtnSave = undefined;
    this.BtnEnd = undefined;
  }
}
exports.TrapDefensePauseView = TrapDefensePauseView;
class TrapDefenseResultInfoBtn extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ClickCb = undefined;
    this.jYe = () => {
      if (this.ClickCb) {
        this.ClickCb();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.jYe]];
  }
}
class TrapDefenseResultInfoItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIText], [3, UE.UISprite]];
  }
  Refresh(e, t, s) {
    var i;
    var r = (this.Data = e).Type;
    if (r === 0) {
      i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("TrapDefenseResultHealth");
      this.SetSpriteByPath(i, this.GetSprite(0), false);
      this.GetSprite(3)?.SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "TowerDefense_HomeHp_Text");
      i = e.Value ?? ModelManager_1.ModelManager.TrapDefenseModel.BattleData.GetHealth();
      this.GetText(2)?.SetText("" + i);
    } else {
      i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("TrapDefenseResultBatch");
      this.SetSpriteByPath(i, this.GetSprite(0), false);
      this.GetSprite(3)?.SetUIActive(false);
      i = e.Value ?? ModelManager_1.ModelManager.TrapDefenseModel.BattleData.GetBatch();
      r = r === 1 ? "TowerDefense_WaveCurCount_Text" : "TowerDefense_WaveCount_Text";
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), r);
      if (ModelManager_1.ModelManager.TrapDefenseModel.GetCurInstToLevelData().Config.ModeType !== 3) {
        r = e.MaxBatch ?? ModelManager_1.ModelManager.TrapDefenseModel.BattleData.GetMaxBatch();
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "TowerDefense_ESC_WaveCountNum_Text", i, r);
      } else {
        this.GetText(2)?.SetText("" + i);
      }
    }
  }
}
exports.TrapDefenseResultInfoItem = TrapDefenseResultInfoItem;
//# sourceMappingURL=TrapDefensePauseView.js.map