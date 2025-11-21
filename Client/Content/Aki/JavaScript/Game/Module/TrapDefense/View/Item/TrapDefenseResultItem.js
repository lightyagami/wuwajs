"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseResultBdUnlockItem = exports.TrapDefenseResultOrganUnlockItem = exports.TrapDefenseResultUnlockTab = exports.TrapDefenseShareTips = exports.TrapDefenseResultResultItem = exports.TrapDefenseResultContinueButton = exports.TrapDefenseResultButton = undefined;
const UE = require("ue");
const ShareRewardById_1 = require("../../../../../Core/Define/ConfigQuery/ShareRewardById");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const TrapDefenseBuildingDevelopData_1 = require("../../Data/TrapDefenseBuildingDevelopData");
const TrapDefenseDefine_1 = require("../../TrapDefenseDefine");
class TrapDefenseResultButton extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnClickCb = undefined;
    this.l4e = undefined;
    this.yXu = () => {
      if (this.OnClickCb) {
        this.OnClickCb();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem]];
    this.BtnBindInfo = [[0, this.yXu]];
  }
  BindRedDot(e, t) {
    this.l4e = e;
    var s = this.GetItem(1);
    RedDotController_1.RedDotController.BindRedDot(e, s, undefined, t);
  }
  UnBindRedDot() {
    var e;
    if (this.l4e) {
      e = this.GetItem(1);
      RedDotController_1.RedDotController.UnBindGivenUi(this.l4e, e);
    }
  }
}
exports.TrapDefenseResultButton = TrapDefenseResultButton;
class TrapDefenseResultContinueButton extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnClickCb = undefined;
    this.yXu = () => {
      if (this.OnClickCb) {
        this.OnClickCb();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.yXu]];
  }
  ShowText(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e);
  }
}
exports.TrapDefenseResultContinueButton = TrapDefenseResultContinueButton;
class TrapDefenseResultStarItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.Pe = undefined;
    this.Olc = () => {
      this.Pe.HasPlayed = true;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.BindSequenceCloseEvent(this.Olc);
  }
  Refresh(e, t, s) {
    this.Pe = e;
    this.GetItem(0)?.SetUIActive(e.IsAchieve && (!e.IsNew || !!e.HasPlayed));
  }
  PlayAnim() {
    if (this.Pe.IsNew && !this.Pe.HasPlayed) {
      if (this.Pe.PlayDelay <= 0) {
        this.GetItem(0)?.SetUIActive(true);
        this.SPe?.PlayOrReplaySequenceByName("Start");
      } else {
        TimerSystem_1.TimerSystem.Delay(() => {
          this.GetItem(0)?.SetUIActive(true);
          this.SPe?.PlayOrReplaySequenceByName("Start");
        }, this.Pe.PlayDelay);
      }
    }
  }
}
class TrapDefenseResultResultItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.eGe = undefined;
    this.Pe = undefined;
    this.FA_ = [];
    this.z0d = () => new TrapDefenseResultStarItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UITexture], [3, UE.UIHorizontalLayout], [4, UE.UIItem], [5, UE.UIItem]];
  }
  OnStart() {
    this.eGe = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.z0d);
  }
  Refresh(t, e, s) {
    this.Pe = t;
    this.GetItem(5)?.SetUIActive(t.Type !== 0);
    this.GetHorizontalLayout(3)?.RootUIComp.SetUIActive(t.Type === 0);
    if (t.Type === 0) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), TrapDefenseDefine_1.RESULT_STAR_TXT);
      if (this.FA_.length === 0) {
        for (let e = 1; e <= t.Value; e++) {
          var i = {
            IsAchieve: e <= t.Total,
            IsNew: e <= t.Total && e > t.History,
            HasPlayed: false,
            PlayDelay: e <= t.Total && e > t.History ? this.WCd(e - t.History, t.Total - t.History) : 0
          };
          this.FA_.push(i);
        }
      }
      this.eGe?.RefreshByData(this.FA_, undefined, true);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), TrapDefenseDefine_1.RESULT_COIN_TXT);
      this.GetText(1)?.SetText("" + t.Value);
    }
  }
  PlayStarIn() {
    if (this.Pe.Type === 0) {
      for (const e of this.eGe.GetLayoutItemList()) {
        e.PlayAnim();
      }
    }
  }
  EndStarAnim() {
    for (const e of this.FA_) {
      e.HasPlayed = true;
    }
  }
  WCd(e, t) {
    if (t <= 1 || e <= 1) {
      return 0;
    } else {
      return 50 + Math.floor((e - 2) * 100 / (t - 2));
    }
  }
}
exports.TrapDefenseResultResultItem = TrapDefenseResultResultItem;
class TrapDefenseShareTips extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UITexture]];
  }
  OnStart() {
    var e;
    var t = ShareRewardById_1.configShareRewardById.GetConfig(8);
    if (t) {
      [t, e] = [...t.Reward][0];
      t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(t).IconSmall;
      this.GetText(1)?.SetText("" + e);
      this.SetTextureByPath(t, this.GetTexture(2));
    }
  }
}
exports.TrapDefenseShareTips = TrapDefenseShareTips;
const tabTypeTxtMap = new Map([[0, TrapDefenseDefine_1.UNLOCK_ORGAN_TXT], [2, TrapDefenseDefine_1.UNLOCK_ORGAN_SHARE_TXT], [1, TrapDefenseDefine_1.UNLOCK_BD_TXT], [3, TrapDefenseDefine_1.UNLOCK_BD_SHARE_TXT]]);
class TrapDefenseResultUnlockTab extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.OrganLayout = undefined;
    this.BdLayout = undefined;
    this.IsShared = false;
    this.Qqd = false;
    this.VJc = () => new TrapDefenseResultOrganUnlockItem();
    this.jJc = () => new TrapDefenseResultBdUnlockItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIGridLayout], [2, UE.UIItem], [3, UE.UIGridLayout], [4, UE.UIItem]];
  }
  OnStart() {
    this.OrganLayout = new GenericLayout_1.GenericLayout(this.GetGridLayout(1), this.VJc, this.GetItem(2).GetOwner());
    this.BdLayout = new GenericLayout_1.GenericLayout(this.GetGridLayout(3), this.jJc, this.GetItem(4).GetOwner());
  }
  Refresh(e, t, s) {
    var i = e.Type;
    var r = tabTypeTxtMap.get(i);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), r);
    var r = i === 0 || i === 2;
    this.Qqd = i === 0 || i === 1;
    this.GetGridLayout(1).RootUIComp.SetUIActive(r);
    this.GetGridLayout(3).RootUIComp.SetUIActive(!r);
    this.IsShared = i === 2 || i === 3;
    (r ? this.OrganLayout : this.BdLayout).RefreshByData(e.DataList, undefined, true);
  }
  PlayUnlockAnim() {
    if (this.Qqd) {
      for (const e of this.OrganLayout.GetLayoutItemList()) {
        e.PlayUnlockAnim();
      }
      for (const t of this.BdLayout.GetLayoutItemList()) {
        t.PlayUnlockAnim();
      }
    }
  }
}
exports.TrapDefenseResultUnlockTab = TrapDefenseResultUnlockTab;
class TrapDefenseResultOrganUnlockItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.OrganData = undefined;
    this.LevelSequencePlayer = undefined;
    this.jYe = () => {
      if (this.Data.Type === 0) {
        UiManager_1.UiManager.OpenView("TrapDefenseBuildingMachineInfoView", this.OrganData);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.jYe]];
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(3));
  }
  Refresh(e, t, s) {
    var i;
    if ((this.Data = e).Type === 0 || e.Type === 2) {
      if (!this.OrganData || this.OrganData.Id !== e.Id) {
        i = ModelManager_1.ModelManager.TrapDefenseModel.DecomposeMachineId(e.Id);
        this.OrganData = TrapDefenseBuildingDevelopData_1.TrapDefenseBuildingDevelopItemData.Create(e.Id, i.MachineType);
      }
      this.GetItem(2)?.SetUIActive(!!e.IsFinish);
      this.GetItem(3)?.SetUIActive(e.IsNewUnlock === true);
      this.SetTextureByPath(this.OrganData.GetIconPath(), this.GetTexture(1));
      this.Data.IsNewUnlock = undefined;
    }
  }
  PlayUnlockAnim() {
    if (this.Data.Type === 0) {
      this.LevelSequencePlayer.PlayOrReplaySequenceByName("Unlock");
    }
  }
}
exports.TrapDefenseResultOrganUnlockItem = TrapDefenseResultOrganUnlockItem;
class TrapDefenseResultBdUnlockItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.OrganData = undefined;
    this.LevelSequencePlayer = undefined;
    this.jYe = () => {
      if (this.Data.Type !== 0) {
        UiManager_1.UiManager.OpenView("TrapDefenseBuildingGangsInfoView", this.Data.Id);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UITexture], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIItem]];
    this.BtnBindInfo = [[0, this.jYe]];
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(8));
  }
  Refresh(e, t, s) {
    var i;
    var r;
    if ((this.Data = e).Type !== 0 && e.Type !== 2) {
      i = ModelManager_1.ModelManager.TrapDefenseModel.RougeModeData.BdDataMap.get(e.Id);
      r = !!e.NeedUnlockBar;
      this.SetTextureByPath(i.Config.Icon, this.GetTexture(5));
      this.GetText(6)?.SetUIActive(r || e.ForShare === true);
      this.GetItem(7)?.SetUIActive(!!e.IsFinish);
      this.GetItem(8)?.SetUIActive(e.IsNewUnlock === true);
      this.Data.IsNewUnlock = undefined;
      if (r) {
        if (i) {
          this.x_t(i);
        }
      } else {
        this.ild(false);
        this.rld(false);
        if (i && e.ForShare === true) {
          r = i.GetCurrentActiveProgressNum();
          this.GetText(6)?.SetText("" + r);
        }
      }
    }
  }
  x_t(e) {
    var t = e.GetCurrentActiveProgressNum();
    var s = e.GetSumProgressForStageMode();
    var e = e.GetCurActiveQualityPool();
    var i = s === 0 ? 0 : t / s;
    if (this.Data.ForShare) {
      this.GetText(6)?.SetText("" + t);
    } else {
      this.GetText(6)?.SetText(t + "/" + s);
    }
    switch (e) {
      case 5:
        this.ild(true, i);
        break;
      case 4:
        this.rld(true, i, false);
        break;
      default:
        this.rld(true, i, true);
    }
  }
  ild(e, t) {
    var s = this.GetSprite(1);
    this.GetSprite(4)?.SetUIActive(e);
    s?.SetUIActive(e);
    if (t) {
      s?.SetFillAmount(t);
    }
  }
  rld(e, t, s) {
    var i = this.GetSprite(2);
    this.GetSprite(3)?.SetUIActive(e);
    i?.SetUIActive(e);
    if (s) {
      i?.SetChangeColor(s, i.changeColor);
    }
    if (t) {
      i?.SetFillAmount(t);
    }
  }
  PlayUnlockAnim() {
    if (this.Data.Type === 1) {
      this.LevelSequencePlayer.PlayOrReplaySequenceByName("Unlock");
    }
  }
}
exports.TrapDefenseResultBdUnlockItem = TrapDefenseResultBdUnlockItem;
//# sourceMappingURL=TrapDefenseResultItem.js.map