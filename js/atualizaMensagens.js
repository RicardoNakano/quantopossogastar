function atualizaMensagens(saldoMaisBaixo,rendimentoTerouroSelic,dataProximoSaldoBom){
  // var saldoMaisBaixo = saldoMaisBaixo;
  var atualizaSaldoMaisBaixo = rendimentoTerouroSelic/2;
  var taxaEmprestimoSugerida = rendimentoTerouroSelic*2;

  var saldoAteNatal = saldoMaisBaixo;
  var saldoAteProximoNatal = saldoMaisBaixo;
  var saldoAteCarnaval = saldoMaisBaixo;

  var investirAteNatal = saldoMaisBaixo;
  var investirAteCarnaval = saldoMaisBaixo;
  var investirAteProximoNatal = saldoMaisBaixo;

  dataProximoSaldoBom = toDate(dataProximoSaldoBom)

  calculaSaldoInicial();

//se o saldo for positivo, oferecer investimentos
  if (saldoMaisBaixo>0 &&         existeSaldoBom ){
    console.log(existeSaldoBom);
    console.log(saldosMaisBaixos);
    tagRecado = "Se você investir esses R$ " + parseFloat(saldoMaisBaixo).toFixed(2) + ", com rendimentos de " + parseFloat((rendimentoTerouroSelic/12)*100).toFixed(2) + "% no mês, você terá:<br>";
    tagRecadoInvestimento = "Se você investir esses R$ " + parseFloat(saldoMaisBaixo).toFixed(2) + " todo mês a " + parseFloat((rendimentoTerouroSelic/12)*100).toFixed(2) + "% ao mês, você terá:<br>";
    tagRecadoEmprestar = "Se você emprestar esses R$ " + parseFloat(saldoMaisBaixo).toFixed(2) + " a " + parseFloat((taxaEmprestimoSugerida/12)*100).toFixed(2) + "% por mês, você terá:<br>";


//saldo até o natal
    for (var i = 0; i < ((12-dataProximoSaldoBom.getMonth())-1); i++) {
      saldoAteNatal = saldoAteNatal *(1+(rendimentoTerouroSelic/12));
      saldoAteNatal = parseFloat(saldoAteNatal).toFixed(2);
      // console.log(saldoAteNatal);
    }

//saldo até o carnaval
    for (var i = 0; i < ((14-dataProximoSaldoBom.getMonth())-1); i++) {
      saldoAteCarnaval = saldoAteCarnaval *(1+(rendimentoTerouroSelic/12));
      saldoAteCarnaval = parseFloat(saldoAteCarnaval).toFixed(2);
      // console.log(saldoAteCarnaval);
    }

//saldo até o natal do ano que vem
    for (var i = 0; i < ((24-dataProximoSaldoBom.getMonth())-1); i++) {
      saldoAteProximoNatal = saldoAteProximoNatal *(1+(rendimentoTerouroSelic/12));
      saldoAteProximoNatal = parseFloat(saldoAteProximoNatal).toFixed(2);
      // console.log(saldoAteProximoNatal);
    }

//investir até o natal
    for (var i = 0; i < ((12-dataProximoSaldoBom.getMonth())-1); i++) {
        investirAteNatal = investirAteNatal *(1+(rendimentoTerouroSelic/12));
        investirAteNatal = investirAteNatal + saldoMaisBaixo;
        investirAteNatal = parseFloat(investirAteNatal).toFixed(2);
    }

//investir até o carnaval
    for (var i = 0; i < ((14-dataProximoSaldoBom.getMonth())-1); i++) {
        investirAteCarnaval = investirAteCarnaval *(1+(rendimentoTerouroSelic/12));
        investirAteCarnaval = investirAteCarnaval + saldoMaisBaixo;
        investirAteCarnaval = parseFloat(investirAteCarnaval).toFixed(2);
    }

//até o natal do ano que vem
    for (var i = 0; i < ((24-dataProximoSaldoBom.getMonth())-1); i++) {
      investirAteProximoNatal = investirAteProximoNatal *(1+(rendimentoTerouroSelic/12));
      investirAteProximoNatal = investirAteProximoNatal + saldoMaisBaixo;
      investirAteProximoNatal = parseFloat(investirAteProximoNatal).toFixed(2);
      // console.log(saldoAteProximoNatal);
    }
//emprestar até o natal
var saldoDevedorNatal = saldoMaisBaixo;
var mesesDevedorNatal = (12-dataProximoSaldoBom.getMonth())-1;
var taxaEmprestimoSugeridaMes = (taxaEmprestimoSugerida/12)*mesesDevedorNatal;
var parcelaEmprestimoNatal = (
                          saldoDevedorNatal*
                            (
                              taxaEmprestimoSugeridaMes/
                                (
                                  1-
                                    (
                                      1/
                                        (
                                          Math.pow(
                                                    1/
                                                      (
                                                        1+taxaEmprestimoSugeridaMes
                                                      ),
                                                    mesesDevedorNatal*(-1)
                                                  )
                                        )
                                    )
                                )
                            )
                        );
var totalEmprestimoNatal = parseFloat(parcelaEmprestimoNatal*mesesDevedorNatal).toFixed(2);
// console.log("Parcela: " + parcelaEmprestimoNatal);


//emprestar até o carnaval
var saldoDevedor = saldoMaisBaixo;
var mesesDevedor = (14-dataProximoSaldoBom.getMonth())-1;
var taxaEmprestimoSugeridaMes = (taxaEmprestimoSugerida/12)*mesesDevedor;
var parcelaEmprestimoCarnaval = (
                          saldoDevedor*
                            (
                              taxaEmprestimoSugeridaMes/
                                (
                                  1-
                                    (
                                      1/
                                        (
                                          Math.pow(
                                                    1/
                                                      (
                                                        1+taxaEmprestimoSugeridaMes
                                                      ),
                                                    mesesDevedor*(-1)
                                                  )
                                        )
                                    )
                                )
                            )
                        );
// console.log("Parcela: " + parcelaEmprestimoCarnaval);
var totalEmprestimoCarnaval = parseFloat(parcelaEmprestimoCarnaval*mesesDevedor).toFixed(2);



//emprestar até o natal do ano que vem
var saldoDevedor = saldoMaisBaixo;
var mesesDevedor = (24-dataProximoSaldoBom.getMonth())-1;
var taxaEmprestimoSugeridaMes = (taxaEmprestimoSugerida/12)*mesesDevedor;
var parcelaEmprestimoOutroNatal = (
                          saldoDevedor*
                            (
                              taxaEmprestimoSugeridaMes/
                                (
                                  1-
                                    (
                                      1/
                                        (
                                          Math.pow(
                                                    1/
                                                      (
                                                        1+taxaEmprestimoSugeridaMes
                                                      ),
                                                    mesesDevedor*(-1)
                                                  )
                                        )
                                    )
                                )
                            )
                        );
// console.log("Parcela: " + parcelaEmprestimoCarnaval);
var totalEmprestimoProximoCarnaval = parseFloat(parcelaEmprestimoOutroNatal*mesesDevedor).toFixed(2);






    for (var i = 0; i < ((12-dataProximoSaldoBom.getMonth())-1); i++) {
      saldoDevedorNatal = saldoDevedorNatal *(1+((rendimentoTerouroSelic/12)*2));
      investirAteProximoNatal = investirAteProximoNatal + saldoMaisBaixo;
      investirAteProximoNatal = parseFloat(investirAteProximoNatal).toFixed(2);
    }



    detalhesInvestimentos = "R$ " + saldoAteNatal + " até o natal deste ano. " + ((12-dataProximoSaldoBom.getMonth())-1) + " (meses)<br>"
    detalhesInvestimentos = detalhesInvestimentos + "R$ " + saldoAteCarnaval + " até o carnaval. " + ((14-dataProximoSaldoBom.getMonth())-1) + " (meses)<br>"
    detalhesInvestimentos = detalhesInvestimentos + "R$ " + saldoAteProximoNatal + " até o natal do ano que vem. " + ((24-dataProximoSaldoBom.getMonth())-1) + " (meses)<br>"
    detalhesInvestimentos = detalhesInvestimentos + "<button>...investir...</button>"


    parcelaEmprestimoNatal = parseFloat(parcelaEmprestimoNatal).toFixed(2);
    parcelaEmprestimoCarnaval = parseFloat(parcelaEmprestimoCarnaval).toFixed(2);
    parcelaEmprestimoOutroNatal = parseFloat(parcelaEmprestimoOutroNatal).toFixed(2);
    detalhesEmprestar = "R$ " + totalEmprestimoNatal + ", recebendo R$ " + parcelaEmprestimoNatal + " por mês até o natal deste ano. " + ((12-dataProximoSaldoBom.getMonth())-1) + " (meses)<br>"
    detalhesEmprestar = detalhesEmprestar + "R$ " + totalEmprestimoCarnaval + ", recebendo R$ " + parcelaEmprestimoCarnaval + " por mês até o carnaval. " + ((14-dataProximoSaldoBom.getMonth())-1) + " (meses)<br>"
    detalhesEmprestar = detalhesEmprestar + "R$ " + totalEmprestimoProximoCarnaval + ", recebendo R$ " + parcelaEmprestimoOutroNatal + " por mês até o natal do ano que vem. " + ((24-dataProximoSaldoBom.getMonth())-1) + " (meses)<br>"
    detalhesEmprestar = detalhesEmprestar + "<button>...emprestar...</button>"


    detalhesInvestimentosRecorrentes = "R$ " + investirAteNatal + " até o natal deste ano. " + ((12-dataProximoSaldoBom.getMonth())-1) + " (meses)<br>"
    detalhesInvestimentosRecorrentes = detalhesInvestimentosRecorrentes + "R$ " + investirAteCarnaval + " até o carnaval. " + ((14-dataProximoSaldoBom.getMonth())-1) + " (meses)<br>"
    detalhesInvestimentosRecorrentes = detalhesInvestimentosRecorrentes + "R$ " + investirAteProximoNatal + " até o natal do ano que vem. " + ((24-dataProximoSaldoBom.getMonth())-1) + " (meses)<br>"
    detalhesInvestimentosRecorrentes = detalhesInvestimentosRecorrentes + "<button>...investir...</button>"


  }
};

function toDate(dateStr) {
  var parts = dateStr.split("/")
  return new Date(parts[2], parts[1] - 1, parts[0])
}
