
var receitas = $(".receitas");
var dataReceitas = $(".data-receitas")
var despesas = $(".despesas");
var dataDespesas = $(".data-despesas")


var saldoInicial = 0;

var diasNoMes = 31;

var meses = $(".meses").val();
var mes = 0;

var hoje = new Date();
var diaHoje = hoje.getDate();


var ponteiroDia = 0;

var pontosGrafico = new Array();

var saldoAtual = saldoInicial;

var saldoMaisBaixo = saldoInicial;
var diaMaisBaixo = "";
var posicaoSaldoMaisBaixo = 0;

var saldosMaisBaixos = [];
var menorSaldoMes = saldoInicial;
var diaSaldoMaisBaixoMes = 0;
var posicaoPrimeiroMelhorSaldoAcimaZero = 0;






// var campoSalarios = $("#salarios");
// campoSalarios.on("keyup", calculaSaldoInicial);
//
// var campoBicos = $("#bicos");
// campoBicos.on("keyup", calculaLinha);
//
// var inputs = $("input");
// inputs.on("click", calculaLinha);

var inputs = $("input");
inputs.on("input", calculaLinha);


// var body = $("#body");
// body.on("keypress", calculaLinha);

var botaoAdicionaSaldo = $("#mais-saldos");
botaoAdicionaSaldo.click(adicionaSaldo);



function calculaSaldoInicial(){
  var saldos = $(".saldos");

  saldoInicial=0;
  for (var i = 0; i < saldos.length; i++) {
    if (!isNaN(parseFloat(saldos[i].value))) {
      saldoInicial = parseFloat(saldoInicial) + parseFloat(saldos[i].value);
    }
  };
  // console.log("O saldo inicial é R$ " + saldoInicial);
};




function calculaLinha(){
      // var saldos = $(".saldos");

      calculaSaldoInicial();
      pontosGrafico = [];
      saldoMaisBaixo = saldoInicial;

      meses = 1+parseInt($(".meses").val());
      //marca saldo inicial no gráfico
        var chart = new CanvasJS.Chart("chartContainer", {
          animationEnabled: true,
        	theme: "light2",
        	title:{
        		text: "Saldo pelos dias"
        	},
          axisX:{
                  lineThickness: 3,
                  // lineColor: "red",
                  valueFormatString: "DD MMM"
          },
        	axisY:{
        		includeZero: false
        	},
        	data: [{
        		type: "line",
        		dataPoints: [
                { x: diaHoje , y: saldoInicial}
            ]
        	}]

        });
        chart.render();

      //atualiza saldo atual
      saldoAtual = saldoInicial;

      //para cada mês (loop dos meses)
        for (var i = 0; i < meses; i++) {
          if (i==0){
            menorSaldoMes = saldoInicial;
          }else{

          }

      //se for o primeiro mês do gráfico, saltar para o dia de hoje
          if (i==0){ponteiroDia = diaHoje};

          mes = i;

      //para cada dia do mês (loop dos dias dentro do mês)
          for (var ii = 0; ponteiroDia < diasNoMes; ponteiroDia++) {
            // console.log("Trabalhando dia " + ponteiroDia + " do mês" + mes);
            // array[i]

      //calcula posição no eixo X (mês e dia)
            var posicaoX = (mes * diasNoMes) + ponteiroDia;
            var diaX = new Date();
            // console.log("diaX: " + diaX);
            // console.log("posicaoX: " + posicaoX);
            diaX.setDate(diaX.getDate() + posicaoX - diaHoje);

            var month = diaX.getMonth() +1 ;
            var day = diaX.getDate();
            var year = diaX.getFullYear();
            var labelDiaX =  day + "/" + month + "/" + year;

            // console.log(labelDiaX);

            var receitaDia = 0;

      //para cada receita (loop das receitas)
            for (var iii = 0; iii < receitas.length; iii++) {
      //se o dia de hoje é dia de receita
              if (ponteiroDia==dataReceitas[iii].value){
      //incrementa receita do dia
                receitaDia = parseFloat(receitaDia) + parseFloat(receitas[iii].value);
              };
            };

            var despesaDia = 0;

      //para cada despesa (loop das despesas)
            for (var iiii = 0; iiii < despesas.length; iiii++) {
      //se o dia de hoje é dia de despesa
              if (ponteiroDia==dataDespesas[iiii].value){
      //incrementa despesa do dia
                despesaDia = parseFloat(despesaDia) + parseFloat(despesas[iiii].value);
              };
            };


      //soma receita do dia e subtrai despesa do dia
            saldoAtual = saldoAtual + receitaDia - despesaDia

      //se for primeiro dia do mês
            if(ponteiroDia==0){
              menorSaldoMes=saldoAtual;
              diaSaldoMaisBaixoMes=labelDiaX;
            }


      //configura posicão Y para saldo do dia/atual
            var posicaoY = saldoAtual;
            // var ponto = "{ x: " + posicaoX + " , y: " + posicaoY + "}";

            pontosGrafico.push({
              x: posicaoX,
              y: posicaoY,
              label: labelDiaX
            });

      //se o saldo atual for menor que o saldo mais saldoMaisBaixo
            if (saldoAtual<saldoMaisBaixo){
      //atualiza saldo mais baixo
              saldoMaisBaixo = saldoAtual;
              diaMaisBaixo = labelDiaX;

      //atualiza posicao do saldo mais baixo
              posicaoSaldoMaisBaixo = pontosGrafico.length-1;
            }

      //se o saldo atual for maior que zero
            if (saldoAtual<menorSaldoMes){

      //atualiza o menorSaldoMes
              menorSaldoMes=saldoAtual;
              diaSaldoMaisBaixoMes=labelDiaX;
              posicaoPrimeiroMelhorSaldoAcimaZero = pontosGrafico.length-1
            }

            // data: [{
            // 		xValueFormatString: "DD MMM, YYYY"
            // }];

      //coloca ponto do gráfico ()

            // chart.options.data[0].dataPoints.push({ x: new Date(year, month-1, day) , y: posicaoY });
            // chart.options.data[0].dataPoints.push(ponto);



          };//fom do loop de dias
      //registra menor ponto do mes
      saldosMaisBaixos.push({
                              menorSaldoMes: menorSaldoMes,
                              diaSaldoMaisBaixoMes: diaSaldoMaisBaixoMes
                            });
      if(saldoAtual<0){
        menorSaldoMes=saldoAtual;
      }else{
        saldosMaisBaixos.push({
                                menorSaldoMes: saldoAtual,
                                diaSaldoMaisBaixoMes: diaSaldoMaisBaixoMes,
                                posicao: pontosGrafico.length
                              });
      }


      //volta para o primeiro dia do mês
          ponteiroDia = 0;

        };//fim do loop de mes

      //para cada dia registrado par ser plotado no gráfico
        for (var i = 0; i < pontosGrafico.length; i++) {

      //se for o saldo mais baixo do gráfico
          if (i==posicaoSaldoMaisBaixo) {

      //escreve o saldo no gráfico
            chart.options.data[0].dataPoints.push({ x: pontosGrafico[i].x , y: pontosGrafico[i].y , label: pontosGrafico[i].label, indexLabel: String(pontosGrafico[i].y) });
            // chart.options.data[0].dataPoints.push({ x: pontosGrafico[i].x , y: pontosGrafico[i].y , label: pontosGrafico[i].label});
          };
      //plota ponto no gráfico
          chart.options.data[0].dataPoints.push({ x: pontosGrafico[i].x , y: pontosGrafico[i].y , label: pontosGrafico[i].label});
        };

      //renderiza gráfico
          chart.render();



      //  pontosGrafico.push("{ x: " + posicaoX + " , y: " + posicaoY + "}");
      //  pontosGrafico.push("{ x: " + posicaoX + " , y: " + posicaoY + "}");

      //volta o salto para o saldo inicial caso o usuário atualize os valores
        saldoAtual = saldoInicial;
        atualizaSaldoMaisBaixo();
        // console.log("atualiza saldo " + saldoMaisBaixo);
};

function atualizaSaldoMaisBaixo(){
  // var tagRecado = "";
  // var tagRecadoEmprestar = "";
  // var tagRecadoInvestimento = "";

  // var detalhesInvestimentos = "";
  // var detalhesEmprestar = "";
  // var detalhesInvestimentosRecorrentes = "";

  calculaSaldoInicial();

  var rendimentoTerouroSelic = 0.065;
  var taxaEmprestimoSugerida = rendimentoTerouroSelic*2;

  var saldoAteNatal = saldoMaisBaixo;
  var saldoAteProximoNatal = saldoMaisBaixo;
  var saldoAteCarnaval = saldoMaisBaixo;

  var investirAteNatal = saldoMaisBaixo;
  var investirAteCarnaval = saldoMaisBaixo;
  var investirAteProximoNatal = saldoMaisBaixo;


//se o saldo for positivo, oferecer investimentos
  if (saldoMaisBaixo>0){
    tagRecado = "Se você investir esses R$ " + parseFloat(saldoMaisBaixo).toFixed(2) + ", com rendimentos de " + parseFloat((rendimentoTerouroSelic/12)*100).toFixed(2) + "% no mês, você terá:<br>";
    tagRecadoEmprestar = "Se você emprestar esses R$ " + parseFloat(saldoMaisBaixo).toFixed(2) + " a " + parseFloat((taxaEmprestimoSugerida/12)*100).toFixed(2) + "% por mês, você terá:<br>";
    tagRecadoInvestimento = "Se você investir esses R$ " + parseFloat(saldoMaisBaixo).toFixed(2) + " todo mês a " + parseFloat((rendimentoTerouroSelic/12)*100).toFixed(2) + "% ao mês, você terá:<br>";


//saldo até o natal
    for (var i = 0; i < ((12-hoje.getMonth())-1); i++) {
      saldoAteNatal = saldoAteNatal *(1+(rendimentoTerouroSelic/12));
      saldoAteNatal = parseFloat(saldoAteNatal).toFixed(2);
      // console.log(saldoAteNatal);
    }

//saldo até o carnaval
    for (var i = 0; i < ((14-hoje.getMonth())-1); i++) {
      saldoAteCarnaval = saldoAteCarnaval *(1+(rendimentoTerouroSelic/12));
      saldoAteCarnaval = parseFloat(saldoAteCarnaval).toFixed(2);
      // console.log(saldoAteCarnaval);
    }

//saldo até o natal do ano que vem
    for (var i = 0; i < ((24-hoje.getMonth())-1); i++) {
      saldoAteProximoNatal = saldoAteProximoNatal *(1+(rendimentoTerouroSelic/12));
      saldoAteProximoNatal = parseFloat(saldoAteProximoNatal).toFixed(2);
      // console.log(saldoAteProximoNatal);
    }

//investir até o natal
    for (var i = 0; i < ((12-hoje.getMonth())-1); i++) {
        investirAteNatal = investirAteNatal *(1+(rendimentoTerouroSelic/12));
        investirAteNatal = investirAteNatal + saldoMaisBaixo;
        investirAteNatal = parseFloat(investirAteNatal).toFixed(2);
    }

//investir até o carnaval
    for (var i = 0; i < ((14-hoje.getMonth())-1); i++) {
        investirAteCarnaval = investirAteCarnaval *(1+(rendimentoTerouroSelic/12));
        investirAteCarnaval = investirAteCarnaval + saldoMaisBaixo;
        investirAteCarnaval = parseFloat(investirAteCarnaval).toFixed(2);
    }

//até o natal do ano que vem
    for (var i = 0; i < ((24-hoje.getMonth())-1); i++) {
      investirAteProximoNatal = investirAteProximoNatal *(1+(rendimentoTerouroSelic/12));
      investirAteProximoNatal = investirAteProximoNatal + saldoMaisBaixo;
      investirAteProximoNatal = parseFloat(investirAteProximoNatal).toFixed(2);
      // console.log(saldoAteProximoNatal);
    }
//emprestar até o natal
var saldoDevedorNatal = saldoMaisBaixo;
var mesesDevedorNatal = (12-hoje.getMonth())-1;
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
var mesesDevedor = (14-hoje.getMonth())-1;
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
var mesesDevedor = (24-hoje.getMonth())-1;
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






    for (var i = 0; i < ((12-hoje.getMonth())-1); i++) {
      saldoDevedorNatal = saldoDevedorNatal *(1+((rendimentoTerouroSelic/12)*2));
      investirAteProximoNatal = investirAteProximoNatal + saldoMaisBaixo;
      investirAteProximoNatal = parseFloat(investirAteProximoNatal).toFixed(2);
    }



    detalhesInvestimentos = "R$ " + saldoAteNatal + " até o natal deste ano. " + ((12-hoje.getMonth())-1) + " (meses)<br>"
    detalhesInvestimentos = detalhesInvestimentos + "R$ " + saldoAteCarnaval + " até o carnaval. " + ((14-hoje.getMonth())-1) + " (meses)<br>"
    detalhesInvestimentos = detalhesInvestimentos + "R$ " + saldoAteProximoNatal + " até o natal do ano que vem. " + ((24-hoje.getMonth())-1) + " (meses)<br>"
    detalhesInvestimentos = detalhesInvestimentos + "<button>...investir...</button>"


    parcelaEmprestimoNatal = parseFloat(parcelaEmprestimoNatal).toFixed(2);
    parcelaEmprestimoCarnaval = parseFloat(parcelaEmprestimoCarnaval).toFixed(2);
    parcelaEmprestimoOutroNatal = parseFloat(parcelaEmprestimoOutroNatal).toFixed(2);
    detalhesEmprestar = "R$ " + totalEmprestimoNatal + ", recebendo R$ " + parcelaEmprestimoNatal + " por mês até o natal deste ano. " + ((12-hoje.getMonth())-1) + " (meses)<br>"
    detalhesEmprestar = detalhesEmprestar + "R$ " + totalEmprestimoCarnaval + ", recebendo R$ " + parcelaEmprestimoCarnaval + " por mês até o carnaval. " + ((14-hoje.getMonth())-1) + " (meses)<br>"
    detalhesEmprestar = detalhesEmprestar + "R$ " + totalEmprestimoProximoCarnaval + ", recebendo R$ " + parcelaEmprestimoOutroNatal + " por mês até o natal do ano que vem. " + ((24-hoje.getMonth())-1) + " (meses)<br>"
    detalhesEmprestar = detalhesEmprestar + "<button>...emprestar...</button>"


    detalhesInvestimentosRecorrentes = "R$ " + investirAteNatal + " até o natal deste ano. " + ((12-hoje.getMonth())-1) + " (meses)<br>"
    detalhesInvestimentosRecorrentes = detalhesInvestimentosRecorrentes + "R$ " + investirAteCarnaval + " até o carnaval. " + ((14-hoje.getMonth())-1) + " (meses)<br>"
    detalhesInvestimentosRecorrentes = detalhesInvestimentosRecorrentes + "R$ " + investirAteProximoNatal + " até o natal do ano que vem. " + ((24-hoje.getMonth())-1) + " (meses)<br>"
    detalhesInvestimentosRecorrentes = detalhesInvestimentosRecorrentes + "<button>...investir...</button>"



  }else{
    tagRecadoEmprestimos = "Está te faltando -R$ " + parseFloat(saldoMaisBaixo*(-1)).toFixed(2) + ".<br>";

    var capacidadePagamento = 0;

    for (var i = 0; i < receitas.length; i++) {
      capacidadePagamento =  parseFloat(capacidadePagamento) + parseFloat(receitas[i].value);
    }

    for (var i = 0; i < despesas.length; i++) {
      capacidadePagamento =  parseFloat(capacidadePagamento) - parseFloat(despesas[i].value);
    }

    var dataProximoSaldoBom;

    for (var i = posicaoSaldoMaisBaixo; i < pontosGrafico.length; i++) {
      if (pontosGrafico[i].y >= capacidadePagamento){
        dataProximoSaldoBom = (pontosGrafico[i].label);
        for (var ii = 0; ii < saldosMaisBaixos.length; ii++) {
          if (saldosMaisBaixos[ii].menorSaldoMes<0){
            existeSaldoBom = false;
          }else {
            posicaoPrimeiroMelhorSaldoAcimaZero = saldosMaisBaixos[ii].posicao;
            for (var iii = posicaoPrimeiroMelhorSaldoAcimaZero; iii < pontosGrafico.length; iii++) {
              if(pontosGrafico[iii].y>capacidadePagamento){
                posicaoPrimeiroMelhorSaldoAcimaZero = iii;
                break;
              }
            }

            existeSaldoBom = true;
            break;
          }
        }
        // existeSaldoBom = true;
        // console.log("tem saldo bom: " + saldosMaisBaixos[i].menorSaldoMes);
        break;
      }else{
        existeSaldoBom = false;
      }
    }

    // console.log(dataProximoSaldoBom);

    detalhesEmprestimos = "Como te sobra R$ " + parseFloat(capacidadePagamento).toFixed(2) + " todo mês, "

    if ((capacidadePagamento/3)>saldoMaisBaixo){
      console.log("1/3 da capacidade é maior que o saldo mais baixo");
      detalhesEmprestimos = detalhesEmprestimos + "sugerimos você voltar aqui no dia " + pontosGrafico[posicaoPrimeiroMelhorSaldoAcimaZero].label + " e investir esses R$ " + parseFloat(capacidadePagamento).toFixed(2) + " todo mês!<br>"
    }else{
      console.log("terço da capacidade de pagamento mensal menor que dívida");
      detalhesEmprestimos = detalhesEmprestimos + "peça um empréstimo pagando R$ " + parseFloat(capacidadePagamento/3).toFixed(2) + " todo mês!<br>"
      detalhesEmprestimos = detalhesEmprestimos + "<button>...pedir empréstimo...</button>"
    }


    atualizaMensagens(capacidadePagamento,rendimentoTerouroSelic,dataProximoSaldoBom);

  };//fim do IF de saldo positivo

  $("#saldo").text(parseFloat(saldoMaisBaixo).toFixed(2));

  $("#tagRecadoEmprestimos").css("display", "block").html(tagRecadoEmprestimos);
  $("#detalhesEmprestimos").css("display", "block").html(detalhesEmprestimos);

  $("#tagRecado").css("display", "block").html(tagRecado);
  $("#detalhesInvestimentos").css("display", "block").html(detalhesInvestimentos);

  $("#tagRecadoInvestimento").css("display", "block").html(tagRecadoInvestimento);
  $("#detalhesInvestimentosRecorrentes").css("display", "block").html(detalhesInvestimentosRecorrentes);

  $("#tagRecadoEmprestar").css("display", "block").html(tagRecadoEmprestar);
  $("#detalhesEmprestar").css("display", "block").html(detalhesEmprestar);





}








function adicionaSaldo(){
  var saldos=$("#saldos");
  var linhaBotao=$("<li>");
  var botao=$("<button>").attr("id","mais-saldos").text("...mais...");
  var linha=$("<li>").text("...e também: ");
//<li>...no banco: <input value=300 class="saldos" id="banco" placeholder="digite quanto você tem de dinheiro no banco" type="number" pattern="(\d+)([\,])(\d{2})">
  var input=$("<input>").addClass("saldos").attr("value",300).attr("id","outros").attr("type","numbers").attr("pattern","(\d+)([\,])(\d{2})").attr("placeholder","digite outros dinheiros que você tenha")





  linhaBotao.append(botao);

  $(this).parent().remove();
  linha.append(input);
  saldos.append(linha);
  saldos.append(linhaBotao);

  calculaLinha();

  var botaoAdicionaSaldo = $("#mais-saldos");
  botaoAdicionaSaldo.click(adicionaSaldo);

  var inputs = $("input");
  inputs.on("input", calculaLinha);
}

function adicionaReceita(){
  var saldos=$("#receitas");

}

function adicionaDespesa(){
  var saldos=$("#despesas");

}


$(".botao-detalhar").click("mostraGrafico");

function mostraGrafico(){
  console.log("foi");
  $("#chartContainer").toggleToggle(2000);
}
