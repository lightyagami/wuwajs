"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleTokenSelectResultView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const RogueBattleTokenItem_1 = require("../Component/RogueBattleTokenItem");
const RogueBattleTopPanel_1 = require("../Component/RogueBattleTopPanel");
class RogueBattleTokenSelectResultView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lV_ = undefined;
    this.clo = undefined;
    this.Xy = 0;
    this.Bk1 = 1;
    this.hJt = () => {
      var e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpenParam);
      if (e !== undefined) {
        if ((e = e.Data.FEc.nR1).h5n === 1 || (this.Xy++, this.Xy >= e.fIc.length)) {
          ModelManager_1.ModelManager.MapRogueModel.ExecuteOpData(this.OpenParam);
          this.CloseMe();
        } else {
          this.lV_.RefreshByData(e.fIc.slice(this.Xy, this.Xy + this.Bk1));
        }
      }
    };
    this.Bqe = () => {
      return new RogueBattleTokenItem_1.RogueBattleTokenItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIItem], [2, UE.UIButtonComponent]];
    this.BtnBindInfo = [[2, this.hJt]];
  }
  async OnBeforeStartAsync() {
    var e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpenParam);
    if (e !== undefined) {
      e = e.Data.FEc.nR1;
      this.lV_ = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.Bqe);
      this.clo = new RogueBattleTopPanel_1.RogueBattleTopPanel();
      if (e.h5n === 1) {
        this.Xy = Number.MAX_VALUE;
        this.Bk1 = e.fIc.length;
        await this.lV_.RefreshByDataAsync(e.fIc);
      } else {
        this.Xy = 0;
        this.Bk1 = 1;
        await this.lV_.RefreshByDataAsync(e.fIc.slice(0, this.Bk1));
      }
      await this.clo.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
    }
  }
}
exports.RogueBattleTokenSelectResultView = RogueBattleTokenSelectResultView;
//# sourceMappingURL=RogueBattleTokenSelectResultView.js.map