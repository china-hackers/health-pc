import Vue from "vue";
import Vuex from "vuex";
import bus from "@/lib/bus";
import { configData } from "@/mock/data";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // 图表配置
        configData: {
            // N等分，只支持4或者6
            daySplit: 4,
            // 图例
            legend: [],
            // 竖坐标配置
            yAxisData: []
        }
    },
    mutations: {
        UPDATE_CONFIG_DATA(state, data) {
            Object.assign(state.configData, data);
        }
    },
    actions: {
        async updateConfigData({ commit }) {
            // 此处换成ajax
            setTimeout(() => {
                let data = configData;
                commit("UPDATE_CONFIG_DATA", data);
                bus.$emit("config_data_ready");
            }, 0);
        }
    }
});
