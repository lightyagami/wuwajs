"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchChangePointActionData = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FloroRanchActionBase_1 = require("./FloroRanchActionBase");
class FloroRanchChangePointActionData extends FloroRanchActionBase_1.FloroRanchActionDataBase {
  constructor(o) {
    super(o);
    this.Fre = undefined;
    this.Fre = o.L$u;
  }
  async OnExecute() {
    if (!this.IsIgnoreCasterAnim) {
      await this.CasterEntity.GetUiItemComponent().PlayNormalAnim();
    }
    await this.WaitIfPause();
    if (!this.IsExit()) {
      var o = [];
      var a = [];
      for (const t of this.Fre.hxs) {
        a.push(ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetEntity(t.Tru));
      }
      for (const e of a) {
        o.push(e.GetUiItemComponent().PlayHideAnim());
      }
      await Promise.all(o);
      await this.WaitIfPause();
      if (!this.IsExit()) {
        ModelManager_1.ModelManager.FloroRanchGamePlayModel.RefreshEntityList(this.Fre.hxs);
        o.length = 0;
        for (const i of a) {
          o.push(i.GetUiItemComponent().PlayShowAnim());
        }
        await Promise.all(o);
      }
    }
  }
}
exports.FloroRanchChangePointActionData = FloroRanchChangePointActionData;
//# sourceMappingURL=FloroRanchChangePointActionData.js.map