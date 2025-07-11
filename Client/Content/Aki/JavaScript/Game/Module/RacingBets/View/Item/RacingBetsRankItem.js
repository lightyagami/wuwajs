"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsRankItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class RacingBetsRankItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.j6t = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIText], [3, UE.UISprite], [4, UE.UIText], [5, UE.UIText], [6, UE.UIButtonComponent]];
  }
  Refresh(t, e, s) {
    this.j6t = t;
    this.Xqe();
  }
  Xqe() {
    var t;
    var e;
    var s;
    if (this.j6t && (t = this.j6t, this.GetText(2).SetText(t.Name), this.GetText(0).SetText("" + t.RankNum), this.GetText(4).SetText("" + t.HitNum), this.GetText(5).SetText("" + t.CashNum), e = this.GetTexture(1), s = t.PlayerHeadPhoto, (s = ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(s)) !== undefined)) {
      this.SetTextureShowUntilLoaded(s.GetRoleHeadIconCircle(), e);
      if (t.RankNum <= 3) {
        this.GetSprite(3).SetColor(UE.Color.FromHex(RacingBetsRankItem.ColorValueList[t.RankNum]));
      } else {
        this.GetSprite(3).SetColor(UE.Color.FromHex(RacingBetsRankItem.ColorValueList[0]));
      }
    }
  }
}
(exports.RacingBetsRankItem = RacingBetsRankItem).ColorValueList = ["1d4970ff", "e4733eff", "b444c8ff", "0084ffff"];
//# sourceMappingURL=RacingBetsRankItem.js.map