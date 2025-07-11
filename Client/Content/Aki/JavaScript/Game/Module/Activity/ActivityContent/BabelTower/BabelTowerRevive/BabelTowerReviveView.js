"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BabelTowerReviveView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const BabelTowerBuffById_1 = require("../../../../../../Core/Define/ConfigQuery/BabelTowerBuffById");
const BabelTowerLevelById_1 = require("../../../../../../Core/Define/ConfigQuery/BabelTowerLevelById");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const ButtonItem_1 = require("../../../../Common/Button/ButtonItem");
const DeadReviveController_1 = require("../../../../DeadRevive/DeadReviveController");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const BabelTowerBuffItem_1 = require("../BabelTowerBuffView/BabelTowerBuffItem");
const BabelTowerController_1 = require("../BabelTowerController");
class BabelTowerReviveView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.v9t = undefined;
    this.p9t = undefined;
    this.fDo = undefined;
    this.p1l = () => {
      BabelTowerController_1.BabelTowerController.BabelTowerSettlementRequest();
      this.CloseMe();
    };
    this.xco = () => {
      DeadReviveController_1.DeadReviveController.ReviveRequest(false);
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIArtText], [3, UE.UIArtText], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.Pe = this.OpenParam;
    if (this.Pe) {
      this.v9t = new ButtonItem_1.ButtonItem();
      this.p9t = new ButtonItem_1.ButtonItem();
      this.fDo = new BabelTowerBuffItem_1.BabelTowerBuffItem();
      await Promise.all([this.v9t.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()), this.p9t.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()), this.fDo.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())]);
      this.v9t.SetFunction(this.p1l);
      this.p9t.SetFunction(this.xco);
      this.Refresh();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiCore", 43, "Data为空");
    }
  }
  Refresh() {
    var e = this.Pe;
    var i = BabelTowerLevelById_1.configBabelTowerLevelById.GetConfig(e.LevelId);
    var e = e.StarNum;
    var t = i.ReviveStar;
    var r = Math.max(0, e - t);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "Text_BabelTowerReviveStarsNeed_Text", t);
    var t = i.PassStar;
    var t = r < t;
    this.GetItem(9).SetUIActive(t);
    this.GetArtText(2).SetText(e.toString());
    var e = this.GetArtText(3);
    e.SetText(r.toString());
    e.SetChangeColor(!t, e.changeColor);
    var r = i.ReviveBuffId;
    this.fDo.Refresh({
      Id: r,
      IsDeTerm: false,
      CanClick: false,
      ShowStar: false
    }, false, 0);
    var t = BabelTowerBuffById_1.configBabelTowerBuffById.GetConfig(r);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), t.NameText);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), t.DesText);
  }
}
exports.BabelTowerReviveView = BabelTowerReviveView;
//# sourceMappingURL=BabelTowerReviveView.js.map