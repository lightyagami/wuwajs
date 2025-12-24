"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WheelTowerRecordPopupView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const LoopScrollSmallItemGrid_1 = require("../../../../Common/SmallItemGrid/LoopScrollSmallItemGrid");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const WheelTowerScoreItem_1 = require("../Component/WheelTowerScoreItem");
class WheelTowerRecordPopupView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Kmf = undefined;
    this.Xmf = undefined;
    this.Ymf = undefined;
    this.osa = undefined;
    this.rsa = undefined;
    this.rki = () => {
      this.rsa?.();
      this.CloseMe();
    };
    this.p5t = () => {
      this.osa?.();
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIVerticalLayout], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent]];
    this.BtnBindInfo = [[6, this.rki], [7, this.p5t]];
  }
  async OnBeforeStartAsync() {
    this.Kmf = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(2), () => new ScoreItem(), undefined);
    var e = [];
    this.Xmf = new TeamItem();
    e.push(this.Xmf.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()));
    this.Ymf = new TeamItem();
    e.push(this.Ymf.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()));
    await Promise.all(e);
  }
  OnStart() {
    var e = this.OpenParam;
    this.osa = e.OnClickConfirm;
    this.rsa = e.OnClickCancel;
    var t = e.IsEndless ? "WheelBattleMode_Endless" : "WheelBattleMode_Normal";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "WheelTowerRecordPopup_Title", MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t), e.Round.toString());
    this.zmf(e);
    this.Xmf?.Refresh(e.BeforeData.TeamRoleIdList, e.BeforeData.BuffId);
    this.Ymf?.Refresh(e.AfterData.TeamRoleIdList, e.AfterData.BuffId);
    ModelManager_1.ModelManager.WheelTowerModel.BlockEndlessUnlockTips = false;
  }
  zmf(e) {
    e = [{
      Title: "WheelTowerRecordPopupScore",
      ScoreOld: e.BeforeData.RoundScore,
      ScoreNew: e.AfterData.RoundScore,
      NeedScoreIcon: false
    }, {
      Title: "WheelTowerRecordPopupTotalScore",
      ScoreOld: e.BeforeData.TotalScore,
      ScoreNew: e.AfterData.TotalScore,
      NeedScoreIcon: true
    }, {
      Title: "WheelTowerRecordPopupScoreRecord",
      ScoreOld: e.BeforeData.ScoreRecord,
      ScoreNew: e.AfterData.ScoreRecord,
      NeedScoreIcon: true
    }];
    this.Kmf?.RefreshByData(e);
  }
}
exports.WheelTowerRecordPopupView = WheelTowerRecordPopupView;
class ScoreItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem]];
  }
  Refresh(e, t, i) {
    var r;
    this.GetText(0)?.ShowTextNew(e.Title);
    this.GetText(1)?.SetText(e.ScoreOld.toString());
    this.GetText(2)?.SetText(e.ScoreNew.toString());
    if (e.NeedScoreIcon) {
      r = new WheelTowerScoreItem_1.WheelTowerScoreItem(this, this.GetItem(3));
      e = ModelManager_1.ModelManager.WheelTowerModel.GetTotalScoreLevel(e.ScoreNew);
      r.Refresh(e);
      this.GetItem(4)?.SetUIActive(e > 2);
    }
  }
}
class TeamItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.tFe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIItem], [2, UE.UITexture]];
  }
  OnStart() {
    this.tFe = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), () => new RoleGridItem(), undefined);
  }
  Refresh(e, t) {
    this.tFe?.RefreshByData(e);
    e = ConfigManager_1.ConfigManager.WheelTowerConfig.GetBuffConfigById(t);
    this.SetTextureShowUntilLoaded(e.Icon, this.GetTexture(2));
  }
}
class RoleGridItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  OnStart() {
    this.BindOnCanExecuteChange(() => false);
  }
  OnRefresh(e, t, i) {
    var e = ModelManager_1.ModelManager.WheelTowerModel.TryGetRealRoleId(e);
    var r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    var e = {
      Type: 2,
      Data: r,
      ItemConfigId: e,
      SkinId: r.GetRoleConfig().SkinId,
      BottomText: r.GetName(),
      ElementId: r.GetRoleConfig().ElementId
    };
    this.SetUseFixedAsync(true);
    this.Apply(e);
  }
}
//# sourceMappingURL=WheelTowerRecordPopupView.js.map