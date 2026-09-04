/**
 * BCB Design System — Tema Corporativo Highcharts
 * Implementação do Manual Corporativo de Padrão Visual para Tabelas e Gráficos do Banco Central do Brasil.
 * Configura paleta oficial de 12 cores sequenciais, tipografia Arial, gridlines a 50% e localização pt-BR.
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['highcharts'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('highcharts'));
  } else {
    root.HighchartsThemeBcb = factory(root.Highcharts);
  }
})(typeof window !== 'undefined' ? window : this, function (Highcharts) {
  'use strict';

  // 12 Cores Oficiais Sequenciais (Manual Corporativo do BCB)
  const PALETA_MESTRA_BCB = [
    '#2E4C59', // 1ª Cor (Azul) - RGB: 46, 76, 89
    '#F2B557', // 2ª Cor (Amarelo) - RGB: 242, 181, 87
    '#6BAEBF', // 3ª Cor (Ciano) - RGB: 107, 174, 191
    '#804C29', // 4ª Cor (Marrom) - RGB: 128, 76, 41
    '#87007C', // 5ª Cor (Púrpura) - RGB: 135, 0, 124
    '#D46C6B', // 6ª Cor (Coral) - RGB: 212, 108, 107
    '#088492', // 7ª Cor (Verde-Azul) - RGB: 8, 132, 146
    '#D295BE', // 8ª Cor (Rosa) - RGB: 210, 149, 190
    '#ECCAB1', // 9ª Cor (Pêssego) - RGB: 236, 202, 177
    '#AEAEAE', // 10ª Cor (Cinza) - RGB: 174, 174, 174
    '#736063', // 11ª Cor (Castanho) - RGB: 115, 96, 99
    '#C3A061'  // 12ª Cor (Ocre) - RGB: 195, 160, 97
  ];

  const HighchartsThemeBcb = {
    colors: PALETA_MESTRA_BCB,

    chart: {
      backgroundColor: '#FFFFFF',
      style: {
        fontFamily: 'Arial, sans-serif'
      }
    },

    title: {
      align: 'left',
      style: {
        color: '#606060',
        fontFamily: 'Arial, sans-serif',
        fontSize: '11pt',
        fontWeight: 'bold'
      }
    },

    subtitle: {
      align: 'left',
      style: {
        color: '#606060',
        fontFamily: 'Arial, sans-serif',
        fontSize: '9pt',
        fontStyle: 'italic'
      }
    },

    xAxis: {
      gridLineColor: 'rgba(96, 96, 96, 0.5)',
      gridLineWidth: 1,
      gridLineDashStyle: 'Dash',
      lineColor: '#606060',
      tickColor: '#606060',
      labels: {
        style: {
          color: '#606060',
          fontFamily: 'Arial, sans-serif',
          fontSize: '8pt'
        }
      },
      title: {
        style: {
          color: '#606060',
          fontFamily: 'Arial, sans-serif',
          fontSize: '8pt',
          fontWeight: 'bold'
        }
      }
    },

    yAxis: {
      gridLineColor: 'rgba(96, 96, 96, 0.5)',
      gridLineWidth: 1,
      gridLineDashStyle: 'Dash',
      lineColor: '#606060',
      tickColor: '#606060',
      labels: {
        style: {
          color: '#606060',
          fontFamily: 'Arial, sans-serif',
          fontSize: '8pt'
        }
      },
      title: {
        style: {
          color: '#606060',
          fontFamily: 'Arial, sans-serif',
          fontSize: '8pt',
          fontWeight: 'bold'
        }
      }
    },

    tooltip: {
      backgroundColor: '#FFFFFF',
      borderColor: '#2E4C59',
      borderRadius: 4,
      style: {
        color: '#606060',
        fontFamily: 'Arial, sans-serif',
        fontSize: '8.5pt'
      },
      valueDecimals: 2
    },

    legend: {
      itemStyle: {
        color: '#606060',
        fontFamily: 'Arial, sans-serif',
        fontSize: '8pt',
        fontWeight: 'normal'
      },
      itemHoverStyle: {
        color: '#2E4C59'
      },
      itemHiddenStyle: {
        color: '#AEAEAE'
      }
    },

    credits: {
      enabled: false
    },

    lang: {
      decimalPoint: ',',
      thousandsSep: '.',
      loading: 'Carregando...',
      months: [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ],
      shortMonths: [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
      ],
      weekdays: [
        'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
        'Quinta-feira', 'Sexta-feira', 'Sábado'
      ],
      exportButtonTitle: 'Exportar gráfico',
      printButtonTitle: 'Imprimir gráfico',
      rangeSelectorFrom: 'De',
      rangeSelectorTo: 'Até',
      rangeSelectorZoom: 'Período',
      downloadPNG: 'Download da imagem PNG',
      downloadJPEG: 'Download da imagem JPEG',
      downloadPDF: 'Download do documento PDF',
      downloadSVG: 'Download do vetor SVG',
      resetZoom: 'Redefinir zoom'
    }
  };

  // Aplica o tema automaticamente caso o Highcharts já esteja carregado
  if (Highcharts && typeof Highcharts.setOptions === 'function') {
    Highcharts.setOptions(HighchartsThemeBcb);
  }

  return HighchartsThemeBcb;
});
