"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueCommandEvolve = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const SurvivorsRogueCommandBase_1 = require("./SurvivorsRogueCommandBase");
class SurvivorsRogueCommandEvolve extends SurvivorsRogueCommandBase_1.SurvivorsRogueCommandBase {
  constructor() {
    super(...arguments);
    this.StepSize = 1;
  }
  ToString() {
    return "[Evolve] Count: " + this.Dwd().length;
  }
  OnStartExecute() {
    this.OpenView("SurvivorsRogueEvolveView", true);
  }
  Dwd() {
    return this.Data.QTd.YTd;
  }
  OnUpdate() {}
  Back2Fore() {}
  Fore2Back() {}
  OnExecute() {}
  OnFinish() {
    this.RequestCommand([Protocol_1.Aki.Protocol.tbd.Proto_NormalSelect]);
  }
  OnDelete() {}
  GetViewInfoList() {
    var e = [];
    var o = this.Dwd();
    var r = new Map();
    for (const n of o) {
      var v = n;
      let o = undefined;
      switch (v.R5n) {
        case "BTd":
          var t = v.BTd;
          o = {
            SourceType: 2,
            SourceId: t.Q6n,
            TitleId: "SurvivorsRoleEvolution_Title",
            EvolveId: v.v9n
          };
          break;
        case "OTd":
          {
            var t = v.OTd;
            var i = t.NTd > 0;
            o = {
              SourceType: 1,
              SourceId: t.zys,
              TitleId: i ? "SurvivorsWeaponEvolution_SuperTitle" : "SurvivorsWeaponEvolution_Title",
              EvolveId: v.v9n,
              BondType: 1,
              BondId: t.NTd
            };
            let e = r.get(t.zys);
            (e = e || new Array()).push(v.v9n);
            r.set(t.zys, e);
            break;
          }
      }
      if (o) {
        e.push(o);
      }
    }
    var s = e.sort((e, o) => e.SourceType !== o.SourceType ? o.SourceType - e.SourceType : e.SourceId !== o.SourceId ? e.SourceId - o.SourceId : e.EvolveId - o.EvolveId);
    for (let e = 0; e < s.length; e++) {
      var u = s[e];
      var a = s.at(e + 1);
      if (u.SourceType === 1 && (e === s.length - 1 || u.SourceId !== a?.SourceId)) {
        u.WeaponEvolveIds = r.get(u.SourceId);
        u.PlayTween = true;
      }
    }
    return s;
  }
}
exports.SurvivorsRogueCommandEvolve = SurvivorsRogueCommandEvolve;
//# sourceMappingURL=SurvivorsRogueCommandEvolve.js.map