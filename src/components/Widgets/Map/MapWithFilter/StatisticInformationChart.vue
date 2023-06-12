<template>
  <div class="card card-box">
    <div class="card-body">
      <div ref="highcharts"
           class="highcharts" />
    </div>
  </div>
</template>

<script>

let Highcharts
if (typeof window !== 'undefined') {
  import('highcharts')
    .then((highcharts) => {
      Highcharts = highcharts.default.Chart
    })
}

export default {
  name: 'StatisticInformationChart',
  props: {
    series: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      mounted: false,
      chartOptions: {
        chart: {
          // type: 'column'
        },
        title: {
          text: ''
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          title: {
            text: ''
          }
        },
        legend: {
          enabled: true
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: false,
              format: '{point.y}'
            }
          }
        },
        tooltip: {
          useHTML: true,
          formatter: function () {
            return '<b>' + this.point.name + '(' + this.point.series.name + ')</b>: ' + this.point.y
          }
          // headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          // pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },
        credits: {
          enabled: false
        },
        series: []
      }
    }
  },
  mounted() {
    this.chartOptions.series = this.series
    this.mounted = true
    this.$nextTick(() => {
      this.initChart()
    })
  },
  methods: {
    initChart () {
      Highcharts.chart(this.$refs.highcharts, this.chartOptions)
    }
  }
}
</script>

<style>
.highcharts svg {
  font-family: "IRANSans", sans-serif !important;
}
.highcharts .highcharts-tooltip * {
  font-family: "IRANSans", sans-serif !important;
}
</style>
