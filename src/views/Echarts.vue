<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-row :gutter="20">
      <el-col :md="24" :lg="16">
        <div class="grid-content bg-purple">
          <el-card class="box-card card-chart">
            <div slot="header">
              <span>仪表盘</span>
            </div>
            <div class="content">
              <div id="cardCharts"></div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :md="24" :lg="8">
        <div class="grid-content bg-purple">
          <el-card class="box-card card-run">
            <el-form
              :model="formData"
              :rules="formRules"
              :label-position="labelPosition"
              ref="form"
              label-width="100px"
              hide-required-asterisk
            >
              <el-form-item label="报警阈值" prop="a_thr">
                <el-input v-model="arg_set.a_thr"></el-input>
                <span>(单位：μGy/h 或 μSy/h)</span>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm(true)">提交</el-button>
                <el-button @click="resetForm('arg_set')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Echarts from 'echarts'
import EchartsResize from 'element-resize-detector'
import { formatTime } from '@/utils/date.js'
import { debounce } from '@/utils/pref.js'

export default {
  name: 'system',
  mounted () {
    this.getEchartsData()
  },
  methods: {
    getEchartsData () {
      const myChart = Echarts.init(document.getElementById('cardCharts'))
      let now = formatTime(new Date())
      const DeviceValue = [[now, 15]]
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#888888'
            }
          },
          backgroundColor: 'rgba(0,153,68,0.7)',
          formatter: function (params) {
            const results = []
            for (let i = 0; i < params.length; i++) {
              const param = params[i]
              results.push(
                [
                  '<span style="font-weight: 600">' + '剂量率：' + param.data[1]
                ] + ' uGγ/h'
              )
            }
            return results.join('<br>')
          }
        },
        legend: {
          data: '测试'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '3%',
          containLabel: true
        },
        dataZoom: [
          {
            start: 25,
            show: false
          },
          {
            type: 'inside'
          }
        ],
        xAxis: {
          type: 'time',
          min: now,
          max: now,
          minInterval: 10 * 1000,
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#909399'
            }
          },
          nameTextStyle: {
            color: '#909399'
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              type: 'line',
              color: '#F2F6FC'
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#909399'
            }
          },
          nameTextStyle: {
            color: '#909399'
          },
          splitArea: {
            show: false
          }
        },
        color: ['#473B7B'],
        series: {
          name: '测试',
          type: 'line',
          data: DeviceValue,
          showSymbol: false,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#473B7B'
                },
                {
                  offset: 0.5,
                  color: '#3584A7'
                },
                {
                  offset: 1,
                  color: '#30D2BE'
                }
              ],
              global: false
            }
          }
        }
      }
      myChart.setOption(option)

      window.timer = setInterval(() => {
        now = formatTime(new Date())
        const data = (Math.random() * (19 - 14 + 1) + 14).toFixed(2)
        DeviceValue.push([now, data])
        myChart.setOption({
          xAxis: {
            max: now
          },
          series: {
            data: DeviceValue
          }
        })
        console.log(DeviceValue)
      }, 5000)

      // 推拉导航时元素容器大小的变更
      const resizeEcharts = EchartsResize()
      resizeEcharts.listenTo(document.getElementById('cardCharts'), ele => {
        this.$nextTick(() => {
          myChart.resize()
        })
      })
      window.addEventListener(
        'resize',
        debounce(() => {
          myChart.resize()
        }, 250)
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.card-chart {
  height: 45vh;
  min-height: 315px;

  #cardCharts {
    width: 100%;
    // height: 30vh;
    min-height: 200px;
  }
}
</style>
